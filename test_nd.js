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
var VERSION = "0.0.39.4";
var COOKIE_NAME = "_ga";
// TODO revert the following staging env check after moving to new branch structure
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
  ELIGIBILITY_RULES: "BG_E_Rules",
  MATCHED_TREATMENTS: "GLV_Matched"
};
var LOCAL_STORAGE_KEYS = {
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
            el = document.createElement("style");
            el.textContent = ".glov-ease {\n    -webkit-animation: smooth 2s ease-in;\n    -moz-animation: smooth 2s ease-in;\n    -o-animation: smooth 2s ease-in;\n    -ms-animation: smooth 2s ease-in;\n    animation: smooth 2s ease-in;\n  }\n  \n  @keyframes smooth {\n    0% { opacity: 0;}\n    25% { opacity: 0.25;}\n    50% { opacity: 0.5;}\n    75% { opacity: 0.75;}\n    100% { opacity: 1;}\n  }\n  @-webkit-keyframes smooth {\n    0% { opacity: 0;}\n    25% { opacity: 0.25;}\n    50% { opacity: 0.5;}\n    75% { opacity: 0.75;}\n    100% { opacity: 1;}\n  }";
            window.top.document.documentElement.prepend(el);
            window.top.document.documentElement.classList.add("glov-ease");
            window.top.document.documentElement.classList.remove("glov-hide");
          case 5:
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
                elapsedSeconds = Date.now() / 1000 - timestamp;
                if (!(elapsedSeconds < 7200)) {
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
                  var elementToObserve = document.querySelector(selector);
                  elementToObserve = elementToObserve ? elementToObserve.parentNode : document.body;
                  observer.observe(elementToObserve, {
                    subtree: true,
                    childList: true
                  });
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
              if (!elementRules[rule.selector || rule.selectorAll]) {
                elementRules[rule.selector || rule.selectorAll] = [];
              }
              elementRules[rule.selector || rule.selectorAll].push(rule);
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
            segment_computer_logger.log("User segment not matched, returning default");
            addToBeagleInfoLayer("s", "default");
            return _context.abrupt("return", "default");
          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](1);
            segment_computer_logger.failed("Could not compute user segment");
            return _context.abrupt("return", null);
          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 23]]);
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
    this.currentPageType = null;
  }
  _createClass(TreatmentRepository, [{
    key: "getMatchedTreatments",
    value: function () {
      var _getMatchedTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(debugMode) {
        var _this = this;
        var matchedTreatments, treatments, treatmentWeights, userSegment, userSegmentWeights, _iterator, _step, _userSegmentWeights$t, treatment, segmentedWeight, _userSegmentWeights$t2, _iterator2, _step2, action, _i, _Object$keys, _userSegmentWeights$t3, _userSegmentWeights$t4, variantKey;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                matchedTreatments = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.MATCHED_TREATMENTS);
                if (!matchedTreatments) {
                  _context2.next = 23;
                  break;
                }
                _context2.prev = 2;
                _context2.next = 5;
                return JSON.parse(matchedTreatments);
              case 5:
                matchedTreatments = _context2.sent;
                _context2.next = 8;
                return matchedTreatments.filter( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(mt) {
                    return regenerator_default().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this.checkPageType(mt.pageTypes);
                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 8:
                matchedTreatments = _context2.sent;
                BeagleTreatmentRepository_logger.log("".concat(matchedTreatments.length, " treatments user segment matched"));
                return _context2.abrupt("return", matchedTreatments);
              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](2);
                BeagleTreatmentRepository_logger.failed("Error getting matched robots:", _context2.t0.message);
                return _context2.abrupt("return", []);
              case 17:
                _context2.prev = 17;
                _context2.next = 20;
                return getFromBeagleInfoLayer("s");
              case 20:
                if (_context2.sent) {
                  _context2.next = 22;
                  break;
                }
                computeSegment(treatmentWeights);
              case 22:
                return _context2.finish(17);
              case 23:
                matchedTreatments = [];
                treatments = this.treatments, treatmentWeights = this.treatmentWeights;
                _context2.next = 27;
                return computeSegment(treatmentWeights);
              case 27:
                userSegment = _context2.sent;
                if (userSegment) {
                  _context2.next = 30;
                  break;
                }
                return _context2.abrupt("return", null);
              case 30:
                if (!treatmentWeights) {
                  _context2.next = 75;
                  break;
                }
                userSegmentWeights = treatmentWeights[userSegment] ? treatmentWeights[userSegment] : treatmentWeights["default"];
                _iterator = BeagleTreatmentRepository_createForOfIteratorHelper(treatments);
                _context2.prev = 33;
                _iterator.s();
              case 35:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 67;
                  break;
                }
                treatment = _step.value;
                segmentedWeight = (_userSegmentWeights$t = userSegmentWeights[treatment.id]) === null || _userSegmentWeights$t === void 0 ? void 0 : _userSegmentWeights$t.weight;
                if (segmentedWeight) {
                  _context2.next = 42;
                  break;
                }
                if (treatment.dependant_on_treatment) {
                  segmentedWeight = (_userSegmentWeights$t2 = userSegmentWeights[treatment.dependant_on_treatment]) === null || _userSegmentWeights$t2 === void 0 ? void 0 : _userSegmentWeights$t2.weight;
                } else if (debugMode && debugMode === 1) segmentedWeight = 100;
                if (segmentedWeight) {
                  _context2.next = 42;
                  break;
                }
                return _context2.abrupt("continue", 65);
              case 42:
                treatment.weight = segmentedWeight;
                if (treatment.actions.some(function (a) {
                  return a.variants;
                })) {
                  _context2.next = 46;
                  break;
                }
                matchedTreatments.push(treatment);
                return _context2.abrupt("continue", 65);
              case 46:
                _iterator2 = BeagleTreatmentRepository_createForOfIteratorHelper(treatment.actions);
                _context2.prev = 47;
                _iterator2.s();
              case 49:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 56;
                  break;
                }
                action = _step2.value;
                if (action.variants) {
                  _context2.next = 53;
                  break;
                }
                return _context2.abrupt("continue", 54);
              case 53:
                for (_i = 0, _Object$keys = Object.keys(action.variants); _i < _Object$keys.length; _i++) {
                  variantKey = _Object$keys[_i];
                  if ((_userSegmentWeights$t3 = userSegmentWeights[treatment.id]) !== null && _userSegmentWeights$t3 !== void 0 && _userSegmentWeights$t3.variants && (_userSegmentWeights$t4 = userSegmentWeights[treatment.id]) !== null && _userSegmentWeights$t4 !== void 0 && _userSegmentWeights$t4.variants[variantKey]) {
                    action.variants[variantKey].weight = userSegmentWeights[treatment.id].variants[variantKey];
                  }
                }
              case 54:
                _context2.next = 49;
                break;
              case 56:
                _context2.next = 61;
                break;
              case 58:
                _context2.prev = 58;
                _context2.t1 = _context2["catch"](47);
                _iterator2.e(_context2.t1);
              case 61:
                _context2.prev = 61;
                _iterator2.f();
                return _context2.finish(61);
              case 64:
                matchedTreatments.push(treatment);
              case 65:
                _context2.next = 35;
                break;
              case 67:
                _context2.next = 72;
                break;
              case 69:
                _context2.prev = 69;
                _context2.t2 = _context2["catch"](33);
                _iterator.e(_context2.t2);
              case 72:
                _context2.prev = 72;
                _iterator.f();
                return _context2.finish(72);
              case 75:
                window.sessionStorage.setItem(SESSION_STORAGE_KEYS.MATCHED_TREATMENTS, JSON.stringify(matchedTreatments));
                _context2.next = 78;
                return this.getMatchedTreatments(debugMode);
              case 78:
                return _context2.abrupt("return", _context2.sent);
              case 79:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 13, 17, 23], [33, 69, 72, 75], [47, 58, 61, 64]]);
      }));
      function getMatchedTreatments(_x) {
        return _getMatchedTreatments.apply(this, arguments);
      }
      return getMatchedTreatments;
    }()
  }, {
    key: "checkPageType",
    value: function () {
      var _checkPageType = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee3(pageTypes) {
        var CPT;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(pageTypes === null || pageTypes === undefined)) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return", true);
              case 2:
                if (Array.isArray(pageTypes)) {
                  _context3.next = 5;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Page Types should be an array");
                return _context3.abrupt("return", false);
              case 5:
                if (!(this.currentPageType === null || this.currentPageType === undefined)) {
                  _context3.next = 10;
                  break;
                }
                _context3.next = 8;
                return getFromBeagleInfoLayer("__eRules.PageType", true);
              case 8:
                CPT = _context3.sent;
                this.currentPageType = CPT === null || CPT === void 0 ? void 0 : CPT[0];
              case 10:
                if (this.currentPageType) {
                  _context3.next = 12;
                  break;
                }
                return _context3.abrupt("return", false);
              case 12:
                if (!pageTypes[0].startsWith("!")) {
                  _context3.next = 15;
                  break;
                }
                pageTypes = pageTypes.map(function (pt) {
                  return pt.substr(1);
                });
                return _context3.abrupt("return", !pageTypes.includes(this.currentPageType));
              case 15:
                return _context3.abrupt("return", pageTypes.includes(this.currentPageType));
              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function checkPageType(_x3) {
        return _checkPageType.apply(this, arguments);
      }
      return checkPageType;
    }()
  }], [{
    key: "getTreatments",
    value: function () {
      var _getTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var TREATMENTS, treatmentsObj, treatments, timestamp, treatmentWithTimestamp, elapsedDays, _treatmentWithTimestamp;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                BeagleTreatmentRepository_logger.log("Loading treatments");
                TREATMENTS = SESSION_STORAGE_KEYS.TREATMENTS;
                treatmentsObj = JSON.parse(window.sessionStorage.getItem(TREATMENTS));
                treatments = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.treatments;
                timestamp = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.timestamp;
                if (!(!treatments || !timestamp)) {
                  _context4.next = 16;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Treatments not found in local storage");
                _context4.next = 9;
                return fetchTreatments();
              case 9:
                treatments = _context4.sent;
                if (treatments) {
                  _context4.next = 13;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Failed to fetch treatments");
                return _context4.abrupt("return", null);
              case 13:
                treatmentWithTimestamp = {
                  timestamp: Date.now(),
                  treatments: treatments
                };
                window.sessionStorage.setItem(TREATMENTS, JSON.stringify(treatmentWithTimestamp));
                return _context4.abrupt("return", treatments);
              case 16:
                if (!timestamp) {
                  _context4.next = 29;
                  break;
                }
                elapsedDays = (Date.now() - timestamp) / (1000 * 3600 * 24);
                if (!(elapsedDays > TREATMENTS_DURATION)) {
                  _context4.next = 29;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Treatments are expired");
                _context4.next = 22;
                return fetchTreatments();
              case 22:
                treatments = _context4.sent;
                if (treatments) {
                  _context4.next = 26;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Failed to fetch treatments");
                return _context4.abrupt("return", null);
              case 26:
                _treatmentWithTimestamp = {
                  timestamp: Date.now(),
                  treatments: treatments
                };
                window.sessionStorage.setItem(TREATMENTS, JSON.stringify(_treatmentWithTimestamp));
                return _context4.abrupt("return", treatments);
              case 29:
                BeagleTreatmentRepository_logger.success("Treatments are loaded from local storage");
                return _context4.abrupt("return", treatments);
              case 31:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      function getTreatments() {
        return _getTreatments.apply(this, arguments);
      }
      return getTreatments;
    }()
  }, {
    key: "getTreatmentWeights",
    value: function () {
      var _getTreatmentWeights = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        var weights;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                weights = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.WEIGHTS);
                if (!weights) {
                  _context5.next = 4;
                  break;
                }
                return _context5.abrupt("return", JSON.parse(weights));
              case 4:
                _context5.next = 6;
                return fetchTreatmentWeights();
              case 6:
                weights = _context5.sent;
                if (weights) {
                  _context5.next = 10;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Failed to fetch weights");
                return _context5.abrupt("return", null);
              case 10:
                window.sessionStorage.setItem(SESSION_STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
                return _context5.abrupt("return", weights);
              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](0);
                BeagleTreatmentRepository_logger.warn(_context5.t0.message);
                return _context5.abrupt("return", null);
              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 14]]);
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
                        return store.getInstance().get(skuList[0]);
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

;// CONCATENATED MODULE: ./src/BeagleOn/index.js










var BeagleOn_logger = new src_logger("BeagleOnComponent");
var beagleOn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(identifier, debugMode, pageType) {
    var persistProductInfoPromise, eligibilityRulesAssessPromise, treatmentsPromise, treatmentWeightsPromise, searchParams, debugFilteredTreatments, _yield$Promise$all, _yield$Promise$all2, treatments, treatmentWeights, m, treatmentRepository, matchedTreatments, robotEngine;
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
            addToBeagleInfoLayer("m", "on-init");
            searchParams = window.location.search;
            debugFilteredTreatments = null;
            if (debugMode && searchParams.includes("filter=")) {
              debugFilteredTreatments = searchParams.slice(searchParams.indexOf("[") + 1, searchParams.lastIndexOf("]")).split(",").map(function (item) {
                return parseInt(item, 10);
              });
            }
            _context.next = 12;
            return Promise.all([treatmentsPromise, treatmentWeightsPromise]);
          case 12:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            treatments = _yield$Promise$all2[0];
            treatmentWeights = _yield$Promise$all2[1];
            if (!(!treatments || !treatmentWeights)) {
              _context.next = 22;
              break;
            }
            m = "";
            if (!treatments) m = m + "no-robots";
            if (!treatmentWeights) m = m === "" ? "no-robot-weights" : " - no-robot-weights";
            addToBeagleInfoLayer("m", m);
            throw new Error("Failed to fetch treatments/weights");
          case 22:
            BeagleOn_logger.success("Found treatments: ", treatments);
            addToBeagleInfoLayer("m", "fetched-treatments");
            treatmentRepository = new BeagleTreatmentRepository({
              treatments: treatments,
              treatmentWeights: treatmentWeights
            });
            _context.next = 27;
            return treatmentRepository.getMatchedTreatments(debugMode);
          case 27:
            matchedTreatments = _context.sent;
            if (!(matchedTreatments === null)) {
              _context.next = 32;
              break;
            }
            addToBeagleInfoLayer("m", "no-user-segment");
            removeDocumentHide();
            return _context.abrupt("return");
          case 32:
            if (matchedTreatments.length) {
              _context.next = 37;
              break;
            }
            BeagleOn_logger.log("No treatments matched, returning without further action");
            addToBeagleInfoLayer("m", "no-robot-matched");
            removeDocumentHide();
            return _context.abrupt("return");
          case 37:
            addToBeagleInfoLayer("m", "found-matched-robots");
            _context.prev = 38;
            _context.next = 41;
            return eligibilityRulesAssessPromise;
          case 41:
            _context.next = 47;
            break;
          case 43:
            _context.prev = 43;
            _context.t0 = _context["catch"](38);
            addToBeagleInfoLayer("m", "no-rules-assessed");
            throw new Error("Could not asses eligibility rules");
          case 47:
            addToBeagleInfoLayer("m", "rules-assessed");
            _context.prev = 48;
            _context.next = 51;
            return persistProductInfoPromise;
          case 51:
            _context.next = 57;
            break;
          case 53:
            _context.prev = 53;
            _context.t1 = _context["catch"](48);
            addToBeagleInfoLayer("m", "product-into-no-persist");
            throw new Error("Could not persist product info");
          case 57:
            addToBeagleInfoLayer("m", "engaging-robots");
            robotEngine = new RobotEngine({
              debugFilteredTreatments: debugFilteredTreatments,
              debugMode: debugMode,
              matchedTreatments: matchedTreatments,
              identifier: identifier,
              pageType: pageType
            });
            _context.next = 61;
            return robotEngine.engageRobots();
          case 61:
            removeDocumentHide();
            addToBeagleInfoLayer("m", "robots-engaged");
            _context.t2 = BeagleOn_logger;
            _context.next = 66;
            return getFromBeagleInfoLayer("a");
          case 66:
            _context.t3 = _context.sent;
            _context.t2.success.call(_context.t2, "Applied treatments: ", _context.t3);
          case 68:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[38, 43], [48, 53]]);
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
;// CONCATENATED MODULE: ./src/BeagleClientSDK/index.js


/* eslint-disable max-len */






var SHUTDOWN = false;
_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
  var monitor, logger, earlyLogSent, hideRemoved, _String$prototype, identifier, cookiePct, oosReason, isLabelSent, timeoutCounter, debugMode, processAdminUser, isAdmin, isOn, pageType;
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
          monitor = new BeagleMonitor();
          initializeBeagleInfoLayer();
          _context.next = 13;
          return getIdentifier();
        case 13:
          identifier = _context.sent;
          logger.log("Found identifier: ", identifier);
          addToBeagleInfoLayer("cookieGaId", identifier);
          _context.next = 18;
          return determinePct(identifier);
        case 18:
          cookiePct = _context.sent;
          addToBeagleInfoLayer("onHashPct", cookiePct);
          addToBeagleInfoLayer("view_epoch", Date.now() + Math.random());
          addToBeagleInfoLayer("v", VERSION);
          addToBeagleInfoLayer("sr", SPLIT_RATIO);

          // data-less log to detect bounces
          _context.next = 25;
          return monitor.packAndQueueArrivalLog();
        case 25:
          setTimeout(function () {
            removeDocumentHide();
          }, 2000);

          /* ================================= EARLY PRUNE OUT-OF-SCOPE ============================== */
          oosReason = window.localStorage.getItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE); // if cannot get critical info, make out of scope and unsupported
          if (!(cookiePct === null || !navigator.sendBeacon || typeof navigator.sendBeacon !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype = String.prototype) === null || _String$prototype === void 0 ? void 0 : _String$prototype.padStart) !== "function" || oosReason && oosReason === "unsupported")) {
            _context.next = 32;
            break;
          }
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "unsupported");
          addToBeagleInfoLayer("GLOV_ON", "unsupported | device");
          throw new Error("unsupported-device");
        case 32:
          isLabelSent = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_LABEL_SENT);
          timeoutCounter = parseInt(sessionStorage.getItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT)) || 0; // check if debug mode is on, also adds dbm to beagleInfoLayer and sets oosReason
          debugMode = getDebugMode("employee"); // if timed-out too many times for very first interactsions, make out of scope for the session
          if (!(!debugMode && !oosReason && !isLabelSent && timeoutCounter > MAX_TIMEOUT_PER_SESSION)) {
            _context.next = 39;
            break;
          }
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          addToBeagleInfoLayer("GLOV_ON", "unsupported | timeout");
          throw new Error("max-timeout");
        case 39:
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
            _context.next = 47;
            break;
          }
          _context.next = 44;
          return getFromBeagleInfoLayer("vvsIsShowroom", true);
        case 44:
          isAdmin = _context.sent;
          _context.next = 48;
          break;
        case 47:
          if (isAdmin === "false" || isAdmin === false) {
            // async call to getFromBeagleInfoLayer, then set localStorage
            getFromBeagleInfoLayer("vvsIsShowroom", true).then(function (isAdmin) {
              if (isAdmin && (isAdmin === "true" || isAdmin === true)) {
                processAdminUser();
              }
            });
          }
        case 48:
          if (!(isAdmin && (isAdmin === "true" || isAdmin === true))) {
            _context.next = 52;
            break;
          }
          processAdminUser();
          _context.next = 59;
          break;
        case 52:
          if (!(isAdmin === null || isAdmin === undefined)) {
            _context.next = 58;
            break;
          }
          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("no-admin-status");
        case 58:
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, false);
        case 59:
          if (window.top.document.documentElement.classList.contains("glov-ease")) {
            _context.next = 63;
            break;
          }
          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("anti-flicker-timeout");
        case 63:
          /* ===================================== ON/OFF CHECK ====================================== */
          // isOn can be true (ON), false (OFF)
          isOn = null;
          if (!debugMode) {
            _context.next = 71;
            break;
          }
          logger.log("Debug mode on: all applicable treatments will be applied");
          isOn = true;
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          addToBeagleInfoLayer("GLOV_ON", "employee | tester");
          _context.next = 87;
          break;
        case 71:
          if (!(oosReason && oosReason === "employee")) {
            _context.next = 78;
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
          _context.next = 87;
          break;
        case 78:
          if (!oosReason) {
            _context.next = 83;
            break;
          }
          addToBeagleInfoLayer("GLOV_ON", "not-sent | unknown");
          throw new Error("Unknown out of scope reason");
        case 83:
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
        case 87:
          _context.next = 89;
          return getFromBeagleInfoLayer("PageType", true);
        case 89:
          pageType = _context.sent;
          if (!(pageType === "purchase")) {
            _context.next = 100;
            break;
          }
          _context.next = 93;
          return getFromBeagleInfoLayer("purchase.revenue", true, 50, 5000);
        case 93:
          _context.next = 95;
          return getFromBeagleInfoLayer("purchase.paymentType", true, 50, 5000);
        case 95:
          _context.next = 97;
          return monitor.sendLogs(true);
        case 97:
          // if purchase is complete, do not apply any treatments on the confirmation page
          SHUTDOWN = true;
          _context.next = 101;
          break;
        case 100:
          // send logs when ready, start scraping and sending asyncly
          monitor.sendLogs(false);
        case 101:
          earlyLogSent = true;

          /* ======================================= ROBOT PATHs ===================================== */
          if (!(isOn === true)) {
            _context.next = 106;
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
          _context.next = 113;
          break;
        case 106:
          if (!(isOn === false)) {
            _context.next = 112;
            break;
          }
          logger.info("Beagle OFF Group Path");
          removeDocumentHide();
          hideRemoved = true;
          _context.next = 113;
          break;
        case 112:
          throw new Error("isOn is undefined or null");
        case 113:
          _context.next = 121;
          break;
        case 115:
          _context.prev = 115;
          _context.t0 = _context["catch"](7);
          logger.warn("Beagle Early Scope-out or ERROR: ", _context.t0.message);
          addToBeagleInfoLayer("m", _context.t0.message);
          if (!earlyLogSent && monitor) monitor.sendLogs(false);
          if (!hideRemoved) removeDocumentHide();
        case 121:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[7, 115]]);
}))();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Qcm9wZXJ0eUtleS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvc3RyaW5nVXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU1vbml0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2RhdGFMYXllckNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VsZW1lbnRDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9mdW5jdGlvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Nlc3Npb25DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS91cmxDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbnZDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvYXN5bmMtbXV0ZXgvaW5kZXgubWpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU9uL3JvYm90RW5naW5lLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlT24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVDbGllbnRTREsvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi90eXBlb2YuanNcIilbXCJkZWZhdWx0XCJdO1xuZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7IC8qISByZWdlbmVyYXRvci1ydW50aW1lIC0tIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLiAtLSBsaWNlbnNlIChNSVQpOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL0xJQ0VOU0UgKi9cbiAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzO1xuICB2YXIgZXhwb3J0cyA9IHt9LFxuICAgIE9wID0gT2JqZWN0LnByb3RvdHlwZSxcbiAgICBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAob2JqLCBrZXksIGRlc2MpIHtcbiAgICAgIG9ialtrZXldID0gZGVzYy52YWx1ZTtcbiAgICB9LFxuICAgICRTeW1ib2wgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCA/IFN5bWJvbCA6IHt9LFxuICAgIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIixcbiAgICBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCIsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICBjb25maWd1cmFibGU6ICEwLFxuICAgICAgd3JpdGFibGU6ICEwXG4gICAgfSksIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3IsXG4gICAgICBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSksXG4gICAgICBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShnZW5lcmF0b3IsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KVxuICAgIH0pLCBnZW5lcmF0b3I7XG4gIH1cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkgJiYgKEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUpO1xuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAoXCJ0aHJvd1wiICE9PSByZWNvcmQudHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZyxcbiAgICAgICAgICB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIFwib2JqZWN0XCIgPT0gX3R5cGVvZih2YWx1ZSkgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgIH1cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoXCJleGVjdXRpbmdcIiA9PT0gc3RhdGUpIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICBpZiAoXCJjb21wbGV0ZWRcIiA9PT0gc3RhdGUpIHtcbiAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gbWV0aG9kKSB0aHJvdyBhcmc7XG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnRleHQubWV0aG9kID0gbWV0aG9kLCBjb250ZXh0LmFyZyA9IGFyZzs7KSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwibmV4dFwiID09PSBjb250ZXh0Lm1ldGhvZCkgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO2Vsc2UgaWYgKFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHtcbiAgICAgICAgICBpZiAoXCJzdXNwZW5kZWRTdGFydFwiID09PSBzdGF0ZSkgdGhyb3cgc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0LmFyZztcbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIFwicmV0dXJuXCIgPT09IGNvbnRleHQubWV0aG9kICYmIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgc3RhdGUgPSBcImV4ZWN1dGluZ1wiO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IFwiY29tcGxldGVkXCIgOiBcInN1c3BlbmRlZFlpZWxkXCIsIHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSAmJiAoc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kLFxuICAgICAgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKHVuZGVmaW5lZCA9PT0gbWV0aG9kKSByZXR1cm4gY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIFwidGhyb3dcIiA9PT0gbWV0aG9kTmFtZSAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSAmJiAoY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCwgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCksIFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHx8IFwicmV0dXJuXCIgIT09IG1ldGhvZE5hbWUgJiYgKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICdcIiArIG1ldGhvZE5hbWUgKyBcIicgbWV0aG9kXCIpKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSByZXR1cm4gY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZywgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgIHJldHVybiBpbmZvID8gaW5mby5kb25lID8gKGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlLCBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jLCBcInJldHVyblwiICE9PSBjb250ZXh0Lm1ldGhvZCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCkgOiBpbmZvIDogKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpO1xuICB9XG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcbiAgICAxIGluIGxvY3MgJiYgKGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXSksIDIgaW4gbG9jcyAmJiAoZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl0sIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiLCBkZWxldGUgcmVjb3JkLmFyZywgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XSwgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTtcbiAgfVxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaXRlcmFibGUubmV4dCkgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBmb3IgKDsgKytpIDwgaXRlcmFibGUubGVuZ3RoOykge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiAhMFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpLCBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGdlbkZ1biAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuICEhY3RvciAmJiAoY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTtcbiAgfSwgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAoZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO1xuICB9LCBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgdm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKSwgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSksIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCksXG4gICAgICBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzLnJldmVyc2UoKSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGZvciAoOyBrZXlzLmxlbmd0aDspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSByZXR1cm4gbmV4dC52YWx1ZSA9IGtleSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgfTtcbiAgfSwgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXMsIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgXCJ0XCIgPT09IG5hbWUuY2hhckF0KDApICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkgJiYgKHRoaXNbbmFtZV0gPSB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIGRpc3BhdGNoRXhjZXB0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IFwidGhyb3dcIiwgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbiwgY29udGV4dC5uZXh0ID0gbG9jLCBjYXVnaHQgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXSxcbiAgICAgICAgICByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICBpZiAoXCJyb290XCIgPT09IGVudHJ5LnRyeUxvYykgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKSxcbiAgICAgICAgICAgIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbmFsbHlFbnRyeSAmJiAoXCJicmVha1wiID09PSB0eXBlIHx8IFwiY29udGludWVcIiA9PT0gdHlwZSkgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jICYmIChmaW5hbGx5RW50cnkgPSBudWxsKTtcbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gdHlwZSwgcmVjb3JkLmFyZyA9IGFyZywgZmluYWxseUVudHJ5ID8gKHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jLCBDb250aW51ZVNlbnRpbmVsKSA6IHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIHJldHVybiBcImJyZWFrXCIgPT09IHJlY29yZC50eXBlIHx8IFwiY29udGludWVcIiA9PT0gcmVjb3JkLnR5cGUgPyB0aGlzLm5leHQgPSByZWNvcmQuYXJnIDogXCJyZXR1cm5cIiA9PT0gcmVjb3JkLnR5cGUgPyAodGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnLCB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCIsIHRoaXMubmV4dCA9IFwiZW5kXCIpIDogXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUgJiYgYWZ0ZXJMb2MgJiYgKHRoaXMubmV4dCA9IGFmdGVyTG9jKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykgcmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpLCByZXNldFRyeUVudHJ5KGVudHJ5KSwgQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cbm1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG9iaik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIvLyBUT0RPKEJhYmVsIDgpOiBSZW1vdmUgdGhpcyBmaWxlLlxuXG52YXIgcnVudGltZSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZVwiKSgpO1xubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuXG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL3BhY2thZ2VzL3J1bnRpbWUvcnVudGltZS5qcyNMNzM2PVxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5pbXBvcnQgdG9QcmltaXRpdmUgZnJvbSBcIi4vdG9QcmltaXRpdmUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgY29uc3QgcmVwbGFjZUFsbCA9IChzdHIsIGZpbmQsIHJlcGxhY2UgPSBcIlwiKSA9PiB7XG4gIGlmICghc3RyKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICBpZiAoaW5kZXggPCAwKSByZXR1cm4gc3RyO1xuXG4gIHdoaWxlIChzdHIuaW5kZXhPZihmaW5kKSA+PSAwKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgICBzdHIgPSAoaW5kZXggPiAwID8gc3RyLnN1YnN0cmluZygwLCBpbmRleCkgOiBcIlwiKSArIHJlcGxhY2UgKyBzdHIuc3Vic3RyaW5nKGluZGV4ICsgZmluZC5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJraXNoVG9Mb3dlciA9IChzdHIpID0+IHtcbiAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcbiAgbGV0IHN0cmluZyA9IHN0cjtcbiAgY29uc3QgbGV0dGVycyA9IHtcIsSwXCI6IFwiaVwiLCBcIklcIjogXCLEsVwiLCBcIsWeXCI6IFwixZ9cIiwgXCLEnlwiOiBcIsSfXCIsIFwiw5xcIjogXCLDvFwiLCBcIsOWXCI6IFwiw7ZcIiwgXCLDh1wiOiBcIsOnXCJ9O1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKChbxLBJxZ7EnsOcw4fDll0pKS9nLCBmdW5jdGlvbihsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyc1tsZXR0ZXJdO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4vc3RyaW5nVXRpbHNcIjtcbmNvbnN0IGlzU3RhZ2luZyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcInN0YWdpbmcudml2ZW5zZVwiKSA6IHRydWU7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIwLjAuMzkuNFwiO1xuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbi8vIFRPRE8gcmV2ZXJ0IHRoZSBmb2xsb3dpbmcgc3RhZ2luZyBlbnYgY2hlY2sgYWZ0ZXIgbW92aW5nIHRvIG5ldyBicmFuY2ggc3RydWN0dXJlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0cy5qc29uXCI7XG5leHBvcnQgY29uc3QgU1RZTEVTSEVFVF9MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXNfc3RhZ2luZy5jc3NcIiA6IGBodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlcy5jc3M/aWQ9JHtyZXBsYWNlQWxsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTMpLnJlcGxhY2UoXCJUXCIsIFwiXCIpLCBcIi1cIiwgXCJcIil9YDtcbmV4cG9ydCBjb25zdCBFX1JVTEVTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBQUk9EVUNUX0lORk9fTE9DQVRJT04gPSBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvc29jaWFsLXByb29mLXYyLmpzb25cIjtcbmV4cG9ydCBjb25zdCBMT0dfQVBJX1VSTCA9IFwiaHR0cHM6Ly9ldXJvcGUtd2VzdDMtbmV4dGRheS0zNGViMy5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2xvZ1wiO1xuZXhwb3J0IGNvbnN0IExPT0tVUF9BUElfVVJMID0gXCJodHRwczovL2NhdGFsb2ctYXBpLmFkb3JhYWkuY29tXCI7XG5leHBvcnQgY29uc3QgTU9CSUxFX01FRElBX1FVRVJZID0gXCIobWF4LXdpZHRoOiA0NDBweClcIjtcbi8vIENvbnRyb2wgZ3JvdXAgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFNQTElUX1JBVElPID0gNTA7XG4vLyBTa2lwcGVkIHRyZWF0bWVudCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19EVVJBVElPTiA9IDE7XG5leHBvcnQgY29uc3QgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04gPSAxO1xuZXhwb3J0IGNvbnN0IExJU1RfTU9ERV9CRUFHTEVfS0VZUyA9IFtcInBhZ2V0eXBlXCIsIFwiY2F0ZWdvcnlcIiwgXCJhbGx0aW1lUExQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBMUENhdGVnb3J5TW9kZVwiLFxuICBcImFsbHRpbWVQRFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUERQQ2F0ZWdvcnlNb2RlXCIsIFwiYWxsdGltZUNhcnRDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uQ2FydENhdGVnb3J5TW9kZVwiXTtcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFRJTUVPVVRfQ09VTlQ6IFwiQkdfVGltZW91dENvdW50XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG4gIFdFSUdIVFM6IFwiQkdfV2VpZ2h0c1wiLFxuICBFTElHSUJJTElUWV9SVUxFUzogXCJCR19FX1J1bGVzXCIsXG4gIE1BVENIRURfVFJFQVRNRU5UUzogXCJHTFZfTWF0Y2hlZFwiLFxufTtcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0tFWVMgPSB7XG4gIERFQlVHX01PREU6IFwiQkdfRGVidWdcIixcbiAgT1VUX09GX1NDT1BFOiBcIkJHX091dE9mU2NvcGVcIixcbiAgSVNfTEFCRUxfU0VOVDogXCJCR19MYWJlbFNlbnRcIixcbiAgVVNFUl9JRDogXCJCR19Vc2VySWRfMDBcIixcbiAgREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRTogXCJCR19Db2xsZWN0aW9uRGF0YVNpemVcIixcbiAgSVNfQURNSU46IFwiR0xWX0lzQWRtaW5cIixcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fU1RPUkFHRV9QUkVGSVggPSBcIkJHX1NlZ19cIjtcbiIsImltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNsYXNzIExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKG9yaWdpbiA9IFwiQmVhZ2xlIENsaWVudCBTREtcIiwgdGVzdGluZyA9IGZhbHNlKSB7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgaWYgKHRlc3RpbmcpIHtcbiAgICAgIHRoaXMuREVCVUcgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkRFQlVHID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5ERUJVR19NT0RFKTtcbiAgICB9XG4gIH1cblxuICBpbmZvKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5pbmZvKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmIChERUJVRykge1xuICAgICAgY29uc29sZS5sb2coYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgZmFpbGVkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogcmVkXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgc3VjY2VzcyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IGdyZWVuXCIsIGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgd2FybiguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUud2FybihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGVycm9yKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS5lcnJvcihgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBudWxsID09IGFyciA/IG51bGwgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBTeW1ib2wgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcbiAgaWYgKG51bGwgIT0gX2kpIHtcbiAgICB2YXIgX3MsXG4gICAgICBfZSxcbiAgICAgIF94LFxuICAgICAgX3IsXG4gICAgICBfYXJyID0gW10sXG4gICAgICBfbiA9ICEwLFxuICAgICAgX2QgPSAhMTtcbiAgICB0cnkge1xuICAgICAgaWYgKF94ID0gKF9pID0gX2kuY2FsbChhcnIpKS5uZXh0LCAwID09PSBpKSB7XG4gICAgICAgIGlmIChPYmplY3QoX2kpICE9PSBfaSkgcmV0dXJuO1xuICAgICAgICBfbiA9ICExO1xuICAgICAgfSBlbHNlIGZvciAoOyAhKF9uID0gKF9zID0gX3guY2FsbChfaSkpLmRvbmUpICYmIChfYXJyLnB1c2goX3MudmFsdWUpLCBfYXJyLmxlbmd0aCAhPT0gaSk7IF9uID0gITApIHtcbiAgICAgICAgO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSAhMCwgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgbnVsbCAhPSBfaVtcInJldHVyblwiXSAmJiAoX3IgPSBfaVtcInJldHVyblwiXSgpLCBPYmplY3QoX3IpICE9PSBfcikpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfYXJyO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBTVFlMRVNIRUVUX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTixcbiAgVFJFQVRNRU5UU19MT0NBVElPTixcbiAgRV9SVUxFU19MT0NBVElPTixcbiAgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVdGlsc1wiKTtcbmNvbnN0IG1vbnRocyA9IHtcbiAgXCJvY2FrXCI6IDAsXG4gIFwixZ91YmF0XCI6IDEsXG4gIFwibWFydFwiOiAyLFxuICBcIm5pc2FuXCI6IDMsXG4gIFwibWF5xLFzXCI6IDQsXG4gIFwiaGF6aXJhblwiOiA1LFxuICBcInRlbW11elwiOiA2LFxuICBcImHEn3VzdG9zXCI6IDcsXG4gIFwiZXlsw7xsXCI6IDgsXG4gIFwiZWtpbVwiOiA5LFxuICBcImthc8SxbVwiOiAxMCxcbiAgXCJhcmFsxLFrXCI6IDExLFxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURvY3VtZW50SGlkZSA9ICgpID0+IHtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtZWFzZVwiKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hUb0Vhc2VPdXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBlbC50ZXh0Q29udGVudCA9IGAuZ2xvdi1lYXNlIHtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1vei1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1vLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW1zLWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgfVxuICBcbiAgQGtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDt9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4yNTt9XG4gICAgNTAlIHsgb3BhY2l0eTogMC41O31cbiAgICA3NSUgeyBvcGFjaXR5OiAwLjc1O31cbiAgICAxMDAlIHsgb3BhY2l0eTogMTt9XG4gIH1cbiAgQC13ZWJraXQta2V5ZnJhbWVzIHNtb290aCB7XG4gICAgMCUgeyBvcGFjaXR5OiAwO31cbiAgICAyNSUgeyBvcGFjaXR5OiAwLjI1O31cbiAgICA1MCUgeyBvcGFjaXR5OiAwLjU7fVxuICAgIDc1JSB7IG9wYWNpdHk6IDAuNzU7fVxuICAgIDEwMCUgeyBvcGFjaXR5OiAxO31cbiAgfWA7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnByZXBlbmQoZWwpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ2xvdi1lYXNlXCIpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1oaWRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50cyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudCA9IGF3YWl0IHRyZWF0bWVudHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnQgd2VpZ2h0c1wiKTtcbiAgICBjb25zdCB0cmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgZmV0Y2hQbHVzKFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnRXZWlnaHRzID0gYXdhaXQgdHJlYXRtZW50V2VpZ2h0cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnRXZWlnaHRzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHRyZWF0bWVudCB3ZWlnaHRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRWxpZ2liaWxpdHlSdWxlcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgZWxpZ2liaWxpdHkgcnVsZXNcIik7XG4gICAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoUGx1cyhFX1JVTEVTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25FbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZWxpZ2liaWxpdHlSdWxlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25FbGlnaWJpbGl0eVJ1bGVzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIGVsaWdpYmlsaXR5IHJ1bGVzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoUHJvZHVjdEluZm8gPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHByb2R1Y3QgaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IGZldGNoUGx1cyhQUk9EVUNUX0lORk9fTE9DQVRJT04pO1xuICAgIGlmICghcHJvZHVjdEluZm8pIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvSnNvbiA9IGF3YWl0IHByb2R1Y3RJbmZvLmpzb24oKTtcbiAgICByZXR1cm4gcHJvZHVjdEluZm9Kc29uO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVvdXQgPSAodGltZSkgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZSk7XG4gIHJldHVybiBjb250cm9sbGVyO1xufTtcblxuY29uc3QgZmV0Y2hQbHVzID0gKHVybCwgb3B0aW9ucyA9IHt9LCByZXRyaWVzID0gNSkgPT5cbiAgZmV0Y2godXJsLCB7Li4ub3B0aW9ucywgc2lnbmFsOiB0aW1lb3V0KDUwMDApLnNpZ25hbH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5zdGF0dXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIHRpbWVkIG91dCBSZXRyeWluZy4uLjogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIGZhaWxlZDogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdENvb2tpZUlkZW50aWZpZXIgPSAoY29va2llU3RyaW5nLCBjb29raWVOYW1lKSA9PiB7XG4gIGlmICghY29va2llU3RyaW5nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBjb29raWVTdHJpbmdcbiAgICAgIC5zcGxpdChcIjtcIilcbiAgICAgIC5tYXAoKHYpID0+IHYuc3BsaXQoXCI9XCIpKVxuICAgICAgLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgIGlmICh2WzBdICYmIHZbMV0pIHtcbiAgICAgICAgICBhY2NbZGVjb2RlVVJJQ29tcG9uZW50KHZbMF0udHJpbSgpKV0gPSBkZWNvZGVVUklDb21wb25lbnQodlsxXS50cmltKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG5cbiAgbGV0IGlkZW50aWZpZXIgPSBwYXJzZWRbY29va2llTmFtZV07XG4gIGlmICghaWRlbnRpZmllcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChjb29raWVOYW1lID09PSBcIl9nYVwiKSB7XG4gICAgLy8gZXh0cmFjdCB1bmlxdWUgaWRlbnRpZmllciBmcm9tIEdBIGNvb2tpZVxuICAgIGNvbnN0IGlkZW50aWZpZXJJbmRleCA9IDI7XG4gICAgaWRlbnRpZmllciA9IGlkZW50aWZpZXIuc3BsaXQoXCIuXCIpW2lkZW50aWZpZXJJbmRleF07XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXI7XG59O1xuXG5leHBvcnQgY29uc3QgZGV0ZXJtaW5lUGN0ID0gYXN5bmMgKGlkZW50aWZpZXIpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBoYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGlkZW50aWZpZXIpO1xuICAgIGlmIChoYXNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcGN0ID0gaGFzaCAlIDEwMDtcbiAgICBpZiAocGN0ID49IDAgJiYgcGN0IDwgMTAwKSB7XG4gICAgICByZXR1cm4gcGN0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4aXRTY3JvbGxMaXN0ZW5lciA9IChjYWxsQmFjaykgPT4ge1xuICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAobGFzdFNjcm9sbFRvcCAtIDQwMCA+IHNjcm9sbFRvcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChleGl0U2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgY2FsbEJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGV4aXRTY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKGxvb3AsIDUwMCk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXBwbHkgdHJlYXRtZW50cyB0byB0aGUgcGFnZSBvbiBzcGVjaWZpYyBtZWRpYSB0eXBlLlxuICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbWVkaWFRdWVyeUNvbmRpdGlvbiB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICogQHBhcmFtIHtET01Ob2RlTGlzdCB9IGVsZW1lbnRzIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYucHJvZHVjdF9pbmZvXCIpXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVDaGFuZ2VzTWFwIHsgXCJtYXJnaW4tdG9wXCIgOiBcIjEwcmVtXCJ9XG4gKiBAcmV0dXJuc1xuICovXG5cbmV4cG9ydCBjb25zdCBzdHlsZUFwcGxpY2F0b3IgPSAoZWxlbWVudHMsIHN0eWxlQ2hhbmdlc01hcCkgPT4ge1xuICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGUgY2hhbmdlc1wiLCBzdHlsZUNoYW5nZXNNYXAsIFwidG8gZWxlbWVudHNcIiwgZWxlbWVudHMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlQ2hhbmdlc01hcCkpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluamVjdFN0eWxlU2hlZXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICBzdHlsZVNoZWV0LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICBzdHlsZVNoZWV0LnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlU2hlZXQuaHJlZiA9IFNUWUxFU0hFRVRfTE9DQVRJT047XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlQWN0aW9ucyA9IGFzeW5jIChpZGVudGlmaWVyLCBhY3Rpb25zVG9QcmVwYXJlLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHZhcmlhbnRLZXldIG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyB2YXJpYW50S2V5KTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiAhYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSBNYXRoLmZsb29yKDEwMCAvIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5sZW5ndGgpICogKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbVBjdCA8IGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICB2YXJpYW50ID0gdmFyaWFudEtleTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiaWRcIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJ3ZWlnaHRcIiAmJiBrZXkgIT09IFwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zXCIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhcmlhbnRzW3ZhcmlhbnRLZXldW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthY3Rpb25zLCB2YXJpYW50XTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyA9ICgpID0+IHtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBRywgU0VTU0lPTl9USU1FU1RBTVAsIFNFU1NJT05fSElTVE9SWX0gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCBwb3B1cERpc3BsYXlGbGFnID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpO1xuICBjb25zdCBzZXNzaW9uVGltZXN0YW1wID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCk7XG4gIGNvbnN0IHNlc3Npb25IaXN0b3J5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX0hJU1RPUlkpO1xuXG4gIGlmIChwb3B1cERpc3BsYXlGbGFnID09PSBudWxsKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDApO1xuICB9XG4gIGlmICghc2Vzc2lvblRpbWVzdGFtcCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVAsIERhdGUubm93KCkpO1xuICB9XG4gIGlmICghc2Vzc2lvbkhpc3RvcnkpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZV0pO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBzZXNzaW9uSGlzdG9yeV0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29uZGl0aW9uQ2hlY2tlciA9IChydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgaWYgKGNvbmRpdGlvbiA9PT0gXCJub3RFeGlzdFwiKSB7XG4gICAgaWYgKCFydW5UaW1lVmFsdWUpIHtcbiAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHxcbiAgICBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gbnVsbCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IHJ1blRpbWVWYWx1ZSBvciBjb25kaXRpb24gaXMgbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAoY29uZGl0aW9uKSB7XG4gICAgY2FzZSBcImV4aXN0XCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImluY2x1ZGVzXCI6XG4gICAgY2FzZSBcImNvbnRhaW5zXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RJbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJub3RDb250YWluc1wiOlxuICAgICAgaWYgKCFydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID4gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPD0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImJldHdlZW5cIjoge1xuICAgICAgbGV0IFttaW4sIG1heF0gPSB2YWx1ZS5zcGxpdChcIixcIik7XG4gICAgICBtaW4gPSBwYXJzZUludChtaW4pO1xuICAgICAgbWF4ID0gcGFyc2VJbnQobWF4KTtcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gbWluICYmIHJ1blRpbWVWYWx1ZSA8PSBtYXgpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FzZSBcInJlZ2V4XCI6IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh2YWx1ZSwgXCJpXCIpO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QocnVuVGltZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBjb25kaXRpb24gaXMgbm90IGRlZmluZWQgXCIsIGNvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXREZWJ1Z01vZGUgPSAob29zUmVhc29uKSA9PiB7XG4gIGNvbnN0IHtERUJVR19NT0RFLCBPVVRfT0ZfU0NPUEV9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShPVVRfT0ZfU0NPUEUsIG9vc1JlYXNvbik7XG4gIH1cblxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0xXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDEpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MlwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiAyO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTBcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oREVCVUdfTU9ERSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgY3VycmVudCA9IHBhcnNlSW50KHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShERUJVR19NT0RFKSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIChjdXJyZW50ID8gXCJvblwiIDogXCJvZmZcIikpO1xuICByZXR1cm4gKGN1cnJlbnQgfHwgMCk7XG59O1xuXG4vLyBnZXQgR0EgY2xpZW50IGlkIHVzaW5nIGdhLmdldEFsbCgpXG5leHBvcnQgY29uc3QgZ2V0R2FDbGllbnRJZCA9ICgpID0+IHtcbiAgY29uc3QgZ2EgPSB3aW5kb3cuZ2E7XG4gIC8vIGlmIGdhIGFuZCBnYS5nZXRBbGwoKSBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIG51bGxcbiAgaWYgKGdhICYmIGdhLmdldEFsbCkge1xuICAgIGNvbnN0IHRyYWNrZXJzID0gZ2EuZ2V0QWxsKCk7XG4gICAgaWYgKHRyYWNrZXJzICYmIHRyYWNrZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRyYWNrZXJzWzBdLmdldChcImNsaWVudElkXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIGdldCBkZXRlcm1pbmlzdGljIG51bWVyaWMgaGFzaCBmcm9tIHN0cmluZyB0aGF0IGNvbmF0aW5zIG9ubHkgbnVtYmVyc1xuZXhwb3J0IGNvbnN0IGdldFVuc2VjdXJlSGFzaCA9IChzdHIpID0+IHtcbiAgbGV0IGhhc2ggPSAwO1xuICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICB9XG4gIC8vIHJldHVybiBhYnNvbHV0ZSB2YWx1ZVxuICByZXR1cm4gTWF0aC5hYnMoaGFzaCk7XG59O1xuXG4vLyBnZW5lcmF0ZSBhIDMyLWJpdCByYW5kb20gaW50ZWdlclxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKTtcbn07XG5cbi8vIGdldCBjdXJyZW50IHVuaXggZXBvY2ggdGltZSBpbiBzZWNvbmRzXG5leHBvcnQgY29uc3QgZ2V0VW5peFRpbWUgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGdldElkZW50aWZpZXIgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gbG9jYWwgc3RvcmFnZVwiLCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhIGluIGZpcnN0IGF0dGVtcHRcIiwgaWQpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhXCIsIGlkKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgIGlmIChpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IHJlYWQgR0EgY2xpZW50IGlkXCIpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBpbiBnZXRJZGVudGlmaWVyXCIsIGUpO1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGF5ID0gKG1zKSA9PiBuZXcgUHJvbWlzZSgocmVzKSA9PiBzZXRUaW1lb3V0KHJlcywgbXMpKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERlbGl2ZXJ5RGF0ZSA9IChkYXRlKSA9PiB7XG4gIGlmICghZGF0ZSB8fCB0eXBlb2YgZGF0ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGRhdGU7XG5cbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHN0YXJ0TW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIGVuZE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBzdGFydERheTogdW5kZWZpbmVkLFxuICAgIGVuZERheTogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGxldCBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspLShbXFxcXGRdKylcXFxccz8oW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID09PSA0KSB7XG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFszXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKyktKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5sZW5ndGggIT09IDUpIHJldHVybiBkYXRlO1xuXG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbMl0udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFs0XS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCFyZXN1bHQuc3RhcnRNb250aEluZGV4IHx8ICFyZXN1bHQuZW5kTW9udGhJbmRleCkgcmV0dXJuIGRhdGU7XG5cbiAgICBjb25zdCBzdGFydFllYXIgPSByZXN1bHQuc3RhcnRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG4gICAgY29uc3QgZW5kWWVhciA9IHJlc3VsdC5lbmRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG5cbiAgICBjb25zdCBlc3RpbWF0ZWRTdGFydCA9IG5ldyBEYXRlKHN0YXJ0WWVhciwgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCwgcmVzdWx0LnN0YXJ0RGF5KTtcbiAgICBjb25zdCBlc3RpbWF0ZWRFbmQgPSBuZXcgRGF0ZShlbmRZZWFyLCByZXN1bHQuZW5kTW9udGhJbmRleCwgcmVzdWx0LmVuZERheSk7XG5cblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZFN0YXJ0IC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICBjb25zdCBlbmREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkRW5kIC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJXZWVrcyA9IHN0YXJ0RGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoc3RhcnREaWZmT3ZlckRheXMgLyA3KTtcbiAgICBjb25zdCBlbmREaWZmT3ZlcldlZWtzID0gZW5kRGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoZW5kRGlmZk92ZXJEYXlzIC8gNyk7XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPT09IDApIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gLSAke2VuZERpZmZPdmVyRGF5c30gR8O8bmA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID49IDEpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gR8O8biAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IGVuZERpZmZPdmVyV2Vla3MpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlkbGVUaW1lciA9IGFzeW5jICh0aW1lT3V0LCBjYWxsQmFjaykgPT4ge1xuICBsZXQgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcblxuICB3aW5kb3cudG9wLmRvY3VtZW50Lm9udG91Y2hzdGFydCA9IHJlc2V0VGltZXI7XG5cbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcbiAgICBjbGVhclRpbWVvdXQoaWRsZVRpbWVvdXQpO1xuICAgIGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyVHlwZSA9ICgpID0+IHtcbiAgY29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9jaHJvbWV8Y2hyb21pdW18Y3Jpb3MvaSkpIHtcbiAgICByZXR1cm4gXCJjaHJvbWVcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3h8Znhpb3MvaSkpIHtcbiAgICByZXR1cm4gXCJmaXJlZm94XCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9zYWZhcmkvaSkpIHtcbiAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL29wclxcLy9pKSkge1xuICAgIHJldHVybiBcIm9wZXJhXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9lZGcvaSkpIHtcbiAgICByZXR1cm4gXCJlZGdlXCI7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBpc093bk11dGF0aW9uID0gKG11dGF0aW9uTGlzdCkgPT4ge1xuICBjb25zdCBub2RlcyA9IFsuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0ucmVtb3ZlZE5vZGVzKV07XG4gIHJldHVybiBub2Rlcy5zb21lKChuKSA9PiB7XG4gICAgcmV0dXJuIG4udGFnTmFtZSAmJiAobi5pZD8uaW5jbHVkZXMoXCJibi1cIikgfHwgQXJyYXkuZnJvbShuLmNsYXNzTGlzdCkuc29tZSgoYykgPT4gYy5pbmNsdWRlcyhcImJuLVwiKSB8fCBjLmluY2x1ZGVzKFwibmQtXCIpKSk7XG4gIH0pO1xufTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50OiAxMDAwLCAvLyBhZmZlY3RzIHZlcnNpb25cbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImRhdGFcIixcbiAgICBpbmRleGVzOiBbe1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZVwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcInNlc3Npb25faWRcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwiZGF0YV92YWx1ZVwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH1dLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcImlkXCIsIGF1dG9JbmNyZW1lbnQ6IHRydWV9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7Z2V0QnJvd3NlclR5cGV9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXJcIik7XG5jb25zdCBfd2luZG93ID0ge1xuICBhbGx0aW1lOiBcImFsbHRpbWVcIiwgc2Vzc2lvbjogXCJzZXNzaW9uXCIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBpbml0aWFsaXplZCBkYiB3aXRoOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBpbmRleGVkREJcIik7XG4gICAgLy8gVE9ETywgdW5jb21tZW50IG5leHQgbGluZSBvbmNlIGV4aXN0aW5nIHN0YWxlIGRicyBhcmUgcHVyZ2VkXG4gICAgLy8gY29uc3Qgb3BlblJlcXVlc3QgPSB3aW5kb3cudG9wLmluZGV4ZWREQj8ub3Blbihjb25maWcuZGJOYW1lLCBjb25maWcudmVyc2lvbik7XG4gICAgY29uc3Qgb3BlblJlcXVlc3QgPSB3aW5kb3cudG9wLmluZGV4ZWREQj8ub3Blbihjb25maWcuZGJOYW1lKTtcbiAgICBpZiAoIW9wZW5SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbmRleGVkZGIgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0LnJlc3VsdC5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBvcGVuUmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGJlYWdsZSBpbmRleGVkIERCXCIsIG9wZW5SZXF1ZXN0LmVycm9yKTtcbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGIgPSBvcGVuUmVxdWVzdC5yZXN1bHQ7XG4gICAgICBpZiAoZGIudmVyc2lvbiAhPT0gMSkge1xuICAgICAgICAvLyBUT0RPLCByZW1vdmUgZGVsZXRlIHJlcXVlc3Qgb25jZSBleGlzdGluZyBzdGFsZSBkYnMgYXJlIHB1cmdlZFxuICAgICAgICBjb25zdCBkZWxldGVSZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShjb25maWcuZGJOYW1lKTtcbiAgICAgICAgZGVsZXRlUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgdGhpcy5pbmRleGVkREIgPSBkYjtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBhc3luYyBzYXZlKGRhdGFOYW1lLCBkYXRhVmFsdWUpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHNlc3Npb25JZCA9IHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpOyAvLyBkYXRlIGN1cnJlbnQgLTIgc2FhdCAgeWlsLWF5LWd1blxuICAgIGNvbnN0IHRpbWUgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB7XCJkYXRhX25hbWVcIjogZGF0YU5hbWUsIFwiZGF0YV92YWx1ZVwiOiBkYXRhVmFsdWUsIFwic2Vzc2lvbl9pZFwiOiBzZXNzaW9uSWQsIHRpbWV9O1xuICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgfVxuXG4gIG1pbm1heChkYXRhTmFtZSwgb3AsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgc3RvcmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzdG9yZWQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtaW5cIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPCBzdG9yZWQpIHx8XG4gICAgICAgICAgICAgICAgKG9wID09PSBcIm1heFwiICYmIHZhbHVlW1wiZGF0YV92YWx1ZVwiXSA+IHN0b3JlZClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVkID0gdmFsdWVbXCJkYXRhX3ZhbHVlXCJdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHN0b3JlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtaW4oZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtaW5cIiwgd2luZG93KTtcbiAgfVxuXG4gIG1heChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWlubWF4KGRhdGFOYW1lLCBcIm1heFwiLCB3aW5kb3cpO1xuICB9XG5cbiAgZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoIW1hcC5oYXModmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSkgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIDApO1xuICAgICAgICAgICAgICBtYXAuc2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSwgbWFwLmdldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKG1hcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBtb2RlKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncm91cEJ5KGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGlmIChkYXRhLmtleXMoKS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgbWF4ID0ge25hbWU6IHVuZGVmaW5lZCwgdmFsdWU6IC0xfTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgIGlmIChtYXgudmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBtYXgubmFtZSA9IGtleTtcbiAgICAgICAgbWF4LnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heDtcbiAgfVxuXG4gIGNvdW50KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3VtKGRhdGFOYW1lLCB3aW5kb3cgPSBcImFsbHRpbWVcIikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSAwLjAwO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRvdGFsICs9IHBhcnNlRmxvYXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodG90YWwudG9GaXhlZCgyKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUsIGRhdGFWYWx1ZSA9IHVuZGVmaW5lZCkge1xuICAgIGlmIChkYXRhVmFsdWUpIHtcbiAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZV0pKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleFZhbHVlID0gZ2V0QnJvd3NlclR5cGUoKSA9PT0gXCJzYWZhcmlcIiA/IGRhdGFOYW1lIDogW2RhdGFOYW1lXTtcblxuICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpXG4gICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoaW5kZXhWYWx1ZSkpO1xuICB9XG5cbiAgYXN5bmMgYXZnKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCB0b3RhbCA9IGF3YWl0IHRoaXMuc3VtKGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5jb3VudChkYXRhTmFtZSwgd2luZG93KTtcblxuICAgIGlmICghdG90YWwgfHwgIWNvdW50KSByZXR1cm4gMDtcblxuICAgIHJldHVybiAodG90YWwgLyBjb3VudCkudG9GaXhlZCgyKTtcbiAgfVxuXG4gIGFzeW5jIGxhc3QoZGF0YU5hbWUsIHNpemUgPSAxLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVcIikub3BlbkN1cnNvcihbZGF0YU5hbWVdLCBcInByZXZcIik7XG4gICAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICAgIGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgICAub3BlbkN1cnNvcihbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpXSwgXCJwcmV2XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGN1cnNvci5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiBpbmRleCA8IHNpemUpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRTZXNzaW9uSWQoKSB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgZC5zZXRIb3VycyhkLmdldEhvdXJzKCkgLSAyKTtcblxuICAgIHJldHVybiBkLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArXG4gICAgICAoZC5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIikgKyBcIi1cIiArXG4gICAgICBkLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IENvbGxlY3RvckFwaSBmcm9tIFwiLi4vQmVhZ2xlRGF0YUNvbGxlY3Rpb24vYXBpXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZURhdGFDb2xsZWN0aW9uXCIpO1xuY29uc3QgY29sbGVjdG9yQXBpID0gbmV3IENvbGxlY3RvckFwaSgpO1xuXG4vLyBrZWVwIGEgdGFibGUgaW4gaW5kZXhkYiB0aGUgZm9ybWF0IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIGRhdGFfdmFsdWUsIHN0b3JlZF92YWx1ZV1cblxuZXhwb3J0IGNvbnN0IHF1ZXJ5SW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdyk7XG4gIGlmICghY29sbGVjdG9yQXBpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkluZGV4ZWREQiBubyBzdXBwb3J0ZWQvSW5pdGlhbGl6ZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB3aW5kb3cgY2FuIGJlIGVpdGhlciBzYW1lZGF5IG9yIGFsbHRpbWVcblxuICBpZiAocXVlcnlNZXRob2QgPT09IFwibWluXCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubWluKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1heFwiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLm1heChiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJhdmdcIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5hdmcoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiY2RcIikge1xuICAgIHJldHVybiAoYXdhaXQgY29sbGVjdG9yQXBpLmdyb3VwQnkoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpKS5zaXplO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImN2XCIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY29sbGVjdG9yQXBpLmdyb3VwQnkoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuXG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFssIHZhbHVlXSBvZiBkYXRhKSB7XG4gICAgICBjb3VudCArPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1vZGVcIikge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb2xsZWN0b3JBcGkubW9kZShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gZGF0YS5uYW1lO1xuICB9XG5cbiAgaWYgKHF1ZXJ5TWV0aG9kLmluZGV4T2YoXCJsYXN0XCIpID49IDApIHtcbiAgICBjb25zdCBtYXRjaCA9IHF1ZXJ5TWV0aG9kLm1hdGNoKFwibGFzdFxcXFwoKFtcXFxcZF0rKVxcXFwpXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgIW1hdGNoLmxlbmd0aCA9PT0gMiB8fCBwYXJzZUludChtYXRjaFsxXSkgPCAxICkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLmxhc3QoYmFzZUZlYXR1cmVOYW1lLCBtYXRjaFsxXSwgd2luZG93KTtcbiAgICBjb25zdCBkYXRhVmFsdWVzID0gcXVlcnlQcm9taXNlLm1hcCgob2JqKSA9PiBvYmouZGF0YV92YWx1ZSk7XG4gICAgcmV0dXJuIGRhdGFWYWx1ZXM7XG4gIH1cblxuICAvKipcbiAgICB7XCJMaXN0aW5ncGFnZVwiID0+IDIxfVxuICAgIHtcIkhvbWVwYWdlXCIgPT4gMTJ9XG4gICAgLS0gZXhhbXBsZSB3aWxsIGhhdmU6XG4gICAgbW9kZTogTGlzdGluZ3BhZ2VcbiAgICBjZDogMlxuICAgIGN2OiAyMSsxMlxuICAgIGxhc3QoMykgKG4sIG4tMSwgbi0yKVxuICAqL1xuXG4gIC8vIDEwMDBsaWsgdGVtaXpsZW5lY2VrIChtYWludE9wQ291bnQgLT4gdmVyc2lvbilcblxuICAvLyBxdWVyeU1ldGhvZCBjYW4gYmUgXCJtb2RlXCIsIFwiY2RcIiAoY291bnQgZGlzdGludCkgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzXG4gIC8vIHF1ZXJ5TWV0aG9kIGNhbiBiZSBcImN2XCIgKHN1bSBvZiBjb3VudCB2YWx1ZXMpLCBcImN1cnJlbnRcIiwgb3IgXCJwcmV2XCIgZm9yIGFueSBkYXRhIHR5cGUgKHN0b3JlZCB2aWEgbGFzdClcbiAgbG9nZ2VyLmZhaWxlZChgdW5rbm93biBxdWVyeU1ldGhvZD0ke3F1ZXJ5TWV0aG9kfSBpbiBCZWFnbGVEYXRhQ29sbGVjdGlvbmApO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCkgPT4ge1xuICBsb2dnZXIubG9nKFwidXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpO1xuICBpZiAoIWNvbGxlY3RvckFwaSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJJbmRleGVkREIgbm8gc3VwcG9ydGVkL0luaXRpYWxpemVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXdhaXQgY29sbGVjdG9yQXBpLnNhdmUoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKTtcblxuXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJtaW5cIiwgXCJtYXhcIiwgXCJjbnRcIiwgXCJzdW1cIiBmb3IgbnVtZXJpYyBkYXRhIHR5cGVzLCBtaW4tbWF4IGNvbXBhcmVzIHdpdGggb25seSBleGlzdGluZywgYXZnIHVwZGF0ZXMgY250IGFuZCBzdW1cbiAgLy8gLS0+IG1pbjogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJtaW5cIiwgKGxlYXN0IG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gbWF4OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcIm1heFwiLCAoZ3JlYXRlc3Qgb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBzdW06IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwic3VtXCIsIChzdW0gb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBjbnQ6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY250XCIsIChleGlzdGluZyArIDEpXVxuICAvL1xuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwiY291bnRfdmFsdWVzXCIgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzLCBrZWVwIGEgY291bnRlciBmb3IgZWFjaCB2YWx1ZVxuICAvLyAtLT4gY291bnRfdmFsdWVzOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBkYXRhX3ZhbHVlLCAoZXhpc3RpbmcgKyAxKV1cbiAgLy9cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImxhc3RcIiBmb3IgYW55IGRhdGEgdHlwZSAtLT4ga2VlcHMgMiB2YWx1ZXMgZm9yIGN1cnJlbnQgYW5kIHRoZSBwcmV2aW91c1xuICAvLyBkZWxldGU6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwicHJldlwiLCAoZXhpc3RpbmcgdmFsdWUpXVxuICAvLyBtb3ZlOiBleGlzdGluZyBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImN1cnJlbnRcIiwgKGV4aXN0aW5nIHZhbHVlKV0gLS0+IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwicHJldlwiLCAoZXhpc3RpbmcgdmFsdWUpXVxuICAvLyBwdXQ6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY3VycmVudFwiLCAoaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2Zvcm1hdERlbGl2ZXJ5RGF0ZSwgaXNPd25NdXRhdGlvbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge3F1ZXJ5SW5Db2xsZWN0b3IsIHVwZGF0ZUluQ29sbGVjdG9yfSBmcm9tIFwiLi4vQmVhZ2xlRGF0YUNvbGxlY3Rpb25cIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG53aW5kb3cuYmVhZ2xlSW5mb0xheWVyID0gd2luZG93LmJlYWdsZUluZm9MYXllciB8fCB7XG4gIGE6IHt9LCBlOiB7fSwgZjoge30sIF9faHdtOiAwLFxufTtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllclwiKTtcblxuLy8gVE9ETzogY29udmVydCB0byBuYW1lIC0tPiBhcnJheSBvZiBzZWxlY3RvcnNcbmNvbnN0IHNlYXJjaFBhdGhzID0gW1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdBIERhdGEgTGF5ZXIgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUGFnZVR5cGVcIiwgbmFtZTogXCJQYWdlVHlwZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2xhc3NcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJ1cHBlckNhc2VUUlwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLmRldGFpbC5hY3Rpb25GaWVsZC5saXN0XCIsIG5hbWU6IFwicGRwLmxpc3RhbGlhc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmRpc2NvdW50UmF0ZVwiLCBuYW1lOiBcInBkcC5kaXNjb3VudFJhdGVcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5pc0luU2hvd3Jvb21cIiwgbmFtZTogXCJwZHAuaXNJblNob3dyb29tXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwic2VhcmNoX3N1Y2Nlc3NcIiwgbmFtZTogXCJwbHAuc2VhcmNoU3VjY2Vzc1wiLCBleGNsdXNpdmU6IFtcInBscC5pZFwiLCBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIFwicGxwLm5hbWVcIiwgXCJwbHAuZ3JvdXBcIiwgXCJwbHAuY2xhc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNhdGVnb3J5X3Byb2R1Y3RfY291bnRcIiwgbmFtZTogXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBscC5jbGFzc1wiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInB1cmNoYXNlLnByaWNlc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5xdWFudGl0eVwiLCBuYW1lOiBcInB1cmNoYXNlLnF1YW50aXRpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwdXJjaGFzZS5jYXRlZ29yaWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLm9yZGVySWRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLnJldmVudWVcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5kaW1lbnNpb24xNVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRG9jdW1lbnQgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicGFnZV9wcmV2aWV3X3dyYXBwZXJfcHJvZHVjdGlvblxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiSG9tZXBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXRlZ29yeV9wYWdlX3dyYXBwZXJcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkxpc3RpbmdwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC1tYWluLWRldGFpbHNcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJlbXB0eV9iYXNrZXRfdGV4dFxcXCJdXCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIFwiY2FydC5za3Vjb3VudFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiYm9keSA+IC5kZXNrdG9wX2xheW91dF93cmFwcGVyIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY29wdW9uTm90QXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2lkKj1cXFwiY2FydF9xdWFudGl0eVxcXCJdLCBbY2xhc3MqPVxcXCJiYXNrZXRfbGVuZ3RoXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVGb3JtYXR0ZWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwiZm9ybWF0RGVsaXZlcnlEYXRlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtdGl0bGVcXFwiXSwgW2NsYXNzKj1cXFwiaGVhZGVyLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiN2aXZlbnNlLXNob3dyb29tLXRhYiBwOm5vdCgudml2ZW5zZS1zaG93cm9vbXMpXCIsIG5hbWU6IFwicGRwLmhhc05vU2hvd3Jvb21zXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJwZHAuc2hvd3Jvb21jb3VudFwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwic3Bhbi5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjc2FsZXMtcHJpY2VcIiwgbmFtZTogXCJwZHAucHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiZGl2LnByb2R1Y3QtcHJpY2UtYm94XCIsIG5hbWU6IFwiX19wcmljZU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJwZHAucHJpY2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWNhcmRbZGF0YS1wcm9kdWN0LXNrdV1cIiwgbmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByb2R1Y3Qtc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWxpc3RcIiwgbmFtZTogXCJfX2xpc3RpbmdJdGVtQmxvY2tPYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuZW1wdHktY2FydC1jb250YWluZXIsIC5lbXB0eS1jYXJ0XCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuYnJhY2tldC10ZXh0LCAucHJvZHVjdC1jb3VudFwiLCBuYW1lOiBcImNhcnQuc2t1Y291bnRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydEl0ZW1RdWFudGl0eVwiLCBuYW1lOiBcImNhcnQucXVhbnRpdGllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJldmlvdXNcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjYmlsbF90b3RhbFwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyLWZpbmFsLW51bWJlclxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXJ0LXByaWNlXFxcIl0gLm5vdC1hbGxvd2VkLWNvdXBvblwiLCBuYW1lOiBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAgLy8gTm90ZSB0aGF0IHNlcXVlbnRpYWwgc2VhcmNoIHdpbGwgbWFyayBjb3Vwb25BcHBsaWNhYmxlIGFzIGZvdW5kXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5jYXRlZ29yaWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1sYXN0LWJyZWFkY3J1bWJcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnByaWNlc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJpY2VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICAvLyBEZXNrdG9wIG9ic2VydmVyIGZvciB0aGUgcmlnaHQgcGFuZWwsIGFzIGl0IGlzIHRoZSBvbmUgY2hhbmdpbmdcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtcmlnaHQtY29udGFpbmVyXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiYmFza2V0X3N1bW1hcnlfdG90YWxcXFwiXSwgW2NsYXNzKj1cXFwidG90YWxfcm93XFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyX2ZvbGxvd19udW1iXFxcIl0sIFtjbGFzcyo9XFxcImNhcnQtdGl0bGUtYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS52dnNUeG5JZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wYXltZW50X3R5cGVfdGl0bGUsIC5jYXJ0LXRpdGxlLWluZm9cIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0X3NrdV9jb2RlXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTT1JHIEVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJza3VcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibXBuXCIsIG5hbWU6IFwicGRwLm1wblwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm5hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcIkpTT05GaWx0ZXJPdGhlclwiLCB2YWx1ZTogXCJAdHlwZT1Qcm9kdWN0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwib2ZmZXJzLnByaWNlVmFsaWRVbnRpbFwiLCBuYW1lOiBcInBkcC5wcmljZVZhbGlkVW50aWxcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJpdGVtTGlzdEVsZW1lbnQuKi5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm5hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubnVtYmVyT2ZJdGVtc1wiLCBuYW1lOiBcInBscC5pdGVtQ291bnRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJicmVhZGNydW1iLml0ZW1MaXN0RWxlbWVudC4qLml0ZW0ubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFdpbmRvdyBjdXN0b20gZWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImZhdm9yaXRlUHJvZHVjdHNcIiwgbmFtZTogXCJ2aWV3LmZhdm9yaXRlZE1QTnNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwidG9TdHJpbmdcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5dO1xuXG5jb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJjdlwiLCB3aW5kb3c6IFwiYWxsdGltZVwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X2FsbHRpbWVcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5sYXN0Q2FydENvdXBvbkFwcGxpY2FibGVcIn0sXG4gIF0sXG4gIFwicGRwLmNhdGVnb3J5XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbiAgXCJjYXJ0LnNrdXNcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wifSxcbiAgXSxcbn07XG5cbmV4cG9ydCBjb25zdCBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSA9ICgpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluZm9MYXllci5fX2h3bSArPSAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyBpZiB2YWx1ZSBpcyBzdHJpbmcsIGFkZCBhcyBhIGNsZWFuIHN0cmluZywgaWYgb2JqZWN0IGFkZCB0aGUgc2FtZVxuICBjb25zdCB0eXBlZFZhbHVlID0gdHlwZW9mICh2YWx1ZSkgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50b1N0cmluZygpLnRyaW0oKSA6IHZhbHVlO1xuICAvLyBpZiBrZXkgY29udGFpbnMgLiBjcmVhdGUgbmVzdGVkIG9iamVjdFxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSBvYmpba2V5XSA9IHt9O1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgb2JqW2xhc3RLZXldID0gdHlwZWRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpbmZvTGF5ZXJba2V5XSA9IHR5cGVkVmFsdWU7XG4gIH1cbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGlmICh0eXBlZFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZWRWYWx1ZSAhPT0gbnVsbCkge1xuICAgIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwYXNzVmFsdWVUb0xpc3RlbmVycyA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChsaXN0ZW5lcnMgJiYgQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiB2YWx1ZSAke3ZhbHVlfSB0byBsaXN0ZW5lciAke2l9IG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIC8vIFRPRE86IGNoZWNrIGZlYXR1cmVFbmdpbmVlcmluZyBhbmQgc2VhcmNoIGxpc3QgaWYgYWxsIG1hcmtlZCBhcyBmb3VuZCBidXQgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5IGlzIG1pc3Npbmcgb3Igbm90IGFuIGFycmF5IG9yIGhhcyBubyBlbGVtZW50c1xuICBpZiAoIWtleSkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob2J0YWluRGF0YSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9sbEludGVydmFsKTtcbiAgICAgIC8vIGFkZCB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCB0aW1lb3V0KTsgLy8gd2FpdCBibG9ja2luZyBmb3IgXCJ0aW1lb3V0XCIgbXNlY3NcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIHJlbW92ZSBrZXkgZnJvbSBpbmZvTGF5ZXJcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgcmV0dXJuO1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgbG9nZ2VyLmxvZyhcInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXJcIiwgYFJlbW92aW5nICR7bGFzdEtleX0gZnJvbSAke0pTT04uc3RyaW5naWZ5KG9iail9YCk7XG4gICAgZGVsZXRlIG9ialtsYXN0S2V5XTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgaW5mb0xheWVyW2tleV07XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCBudWxsKTtcbiAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCBudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUcmVhdG1lbnQgPSAoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBzdGF0dXMsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0ge307XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiBidXNpbmVzc1J1bGVJZCAhPT0gdW5kZWZpbmVkKSB2YWx1ZS5idXNpbmVzc1J1bGVJZCA9IGJ1c2luZXNzUnVsZUlkO1xuICBpZiAodmFyaWFudCkgdmFsdWUudmFyaWFudCA9IHZhcmlhbnQ7XG5cbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiYXBwbGllZFwiOlxuICAgICAgaW5mb0xheWVyLmFbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2tpcHBlZFwiOlxuICAgICAgdmFsdWUuZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQ7XG4gICAgICBpbmZvTGF5ZXIuZVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGluZm9MYXllci5mW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbn07XG5cbmNvbnN0IFBBUlNFU0VBUkNITUFYUkVUUlkgPSAxMDtcbmNvbnN0IFBBUlNFU0VBUkNIU1RBUlRERUxBWSA9IDEwO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbmxldCBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciA9IGFzeW5jICgpID0+IHtcbiAgLy8gQ29sbGVjdCBjb3JlIGRhdGFcbiAgcHJlcGFyZUNvcmVEYXRhKCk7XG5cbiAgLy8gVHJpZ2dlci1zdGFydCB0aGUgcGFyc2VyIGxvb3BcbiAgcGFyc2VyQ2FsbGVyKCk7XG5cbiAgLy8gQWRkIG1ldHJpY3NcbiAgYWRkTWV0cmljcygpO1xufTtcblxuY29uc3QgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvciA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYmFzZUZlYXR1cmVOYW1lcyA9IE9iamVjdC5rZXlzKGZlYXR1cmVFbmdpbmVlcmluZ09wcyk7XG4gIGZvciAoY29uc3QgYmFzZUZlYXR1cmVOYW1lIG9mIGJhc2VGZWF0dXJlTmFtZXMpIHtcbiAgICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgICBpZiAoRkVPcC5xdWVyeU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnF1ZXJ5TWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBxdWVyeVJlc3BvbnNlID0gYXdhaXQgcXVlcnlJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIEZFT3AucXVlcnlNZXRob2QsIEZFT3Aud2luZG93KTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoRkVPcC5mZWF0dXJlTmFtZSwgcXVlcnlSZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSkgPT4ge1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AudXBkYXRlTWV0aG9kID09PSBudWxsIHx8IEZFT3AudXBkYXRlTWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgYXdhaXQgdXBkYXRlSW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCBGRU9wLnVwZGF0ZU1ldGhvZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRm9ybWF0dGVyID0gKHZhbHVlLCBmb3JtYXR0ZXIpID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgIWZvcm1hdHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZm9ybWF0dGVyKSB7XG4gICAgY2FzZSBcInVwcGVyQ2FzZVRSXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZShcInRyLVRSXCIpO1xuICAgIGNhc2UgXCJmb3JtYXREZWxpdmVyeURhdGVcIjpcbiAgICAgIHJldHVybiBmb3JtYXREZWxpdmVyeURhdGUodmFsdWUpO1xuICAgIGNhc2UgXCJudW1lcmljT25seVwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBjYXNlIFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKFwidHItVFJcIikuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNhc2UgXCJkZWFycmF5XCI6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcInRvU3RyaW5nXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50cmltKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoT2JqID0gKG9iaiwgc2VhcmNoRWxlbWVudCkgPT4ge1xuICBsZXQgdmFsdWU7XG4gIGxldCBsYXllclZhbHVlO1xuXG4gIHRyeSB7XG4gICAgc3dpdGNoIChzZWFyY2hFbGVtZW50Lm9wZXJhbmQpIHtcbiAgICAgIGNhc2UgXCJKU09ORmlsdGVyT3RoZXJcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlclBhcmFtcyA9IHNlYXJjaEVsZW1lbnQudmFsdWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIGlmIChmaWx0ZXJQYXJhbXMubGVuZ3RoICE9PSAyKSBicmVhaztcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyUGFyYW1zWzBdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyUGFyYW1zWzFdO1xuICAgICAgICAgIGlmICghZmlsdGVyTmFtZSB8fCAhZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2ggPSBqc29uR2V0KG9iaiwgZmlsdGVyTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWZpbHRlck1hdGNoIHx8IGZpbHRlck1hdGNoICE9PSBmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBpZiAodmFsdWUgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5T2JzZXJ2ZVwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgIGNvbnN0IHRvQmVVcGRhdGVkID0gW107XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHNlYXJjaFBhdGhzLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09PSBjaGlsZCk7XG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRFbGVtZW50cyBpbnRvIHRvQmVVcGRhdGVkXG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5wdXNoKC4uLmNoaWxkRWxlbWVudHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHJ1biBvbmx5IGlmIHRoZSBlbGVtZW50IGhhcyBhZGRlZCBvciByZW1vdmVkIGNoaWxkcmVuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyBmdW5jdGlvbihtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgICBpZiAoaXNPd25NdXRhdGlvbihtdXRhdGlvbkxpc3QpKSByZXR1cm47XG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuaXNGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyKGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJSZXN0YXJ0ID0gcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID49IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJzZWFyY2hPYmo6IHRyaWdnZXJlZCBhIHJlc3RhcnQgb2Ygc2VhcmNocGF0aHMgZHVlOiBcIiwgc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgICAgcGFyc2VyQ2FsbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh2YWx1ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZUxpc3QgPSBbXTtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZWNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IHZhbHVlY2hpbGQuZ2V0QXR0cmlidXRlKHNlYXJjaEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYlZhbHVlKSB7XG4gICAgICAgICAgICAgIGF0dHJpYlZhbHVlTGlzdC5wdXNoKGF0dHJpYlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cmliVmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhdHRyaWJWYWx1ZUxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlDb3VudEVsdHNcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZWFyY2hFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgbGV0IHN1bVByaWNlID0gMDtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzdW1QcmljZSs9cGFyc2VJbnQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN1bVByaWNlID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHN1bVByaWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgY29uc3QgYXJyYXlJbm5lclRleHQgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGFycmF5SW5uZXJUZXh0LnB1c2goY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycmF5SW5uZXJUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhcnJheUlubmVyVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH0gLy8gc3dpdGNoXG5cbiAgICBpZiAobGF5ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGxheWVyVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmZvcm1hdHRlcikge1xuICAgICAgICBsYXllclZhbHVlID0gcHJvY2Vzc0Zvcm1hdHRlcihsYXllclZhbHVlLCBzZWFyY2hFbGVtZW50LmZvcm1hdHRlcik7XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihzZWFyY2hFbGVtZW50Lm5hbWUsIGxheWVyVmFsdWUpO1xuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcblxuICAgICAgLy8gbWFyayBleGNsdXNpdmUgZWxlbWVudHMgYXMgZm91bmRcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlKSAmJiBzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgZXhjbHVzaXZlRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5pbmNsdWRlcyhleGNsdXNpdmVFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAgICAgICBleGNsdXNpdmVFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJzZWFyY2hPYmogZXJyb3I6IFwiICsgZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgY3VzdG9tRGF0YURlcml2YXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuXG4gIHRyeSB7XG4gICAgLy8gY2FydCB0b3RhbCBwcm9kdWN0IHByaWNlIGlzIG5vdCBhdmFpbGFibGUgYW55d2hlcmUsIHNwZWNpYWwgZGlzY291bnRzIGV0YyBhcmUgaGFyZCB0byBzY3JhcGUsIHNvIHJlY2FsY3VsYXRlIGl0XG4gICAgY29uc3QgW2lzQ2FydEVtcHR5LCB0b3RhbEJhc2VQcmljZSwgY291cG9uTm90QXBwbGljYWJsZSwgcHJpY2VzLCBxdWFudGl0aWVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmlzZW1wdHlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbEJhc2VQcmljZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5wcmljZXNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5xdWFudGl0aWVzXCIpLFxuICAgIF0pO1xuXG4gICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuXG4gICAgaWYgKCF0b3RhbEJhc2VQcmljZSAmJiBwcmljZXMgJiYgQXJyYXkuaXNBcnJheShwcmljZXMpICYmIHByaWNlcy5sZW5ndGggPiAwICYmIHF1YW50aXRpZXMgJiYgQXJyYXkuaXNBcnJheShxdWFudGl0aWVzKSAmJiBxdWFudGl0aWVzLmxlbmd0aCA+IDAgJiYgcHJpY2VzLmxlbmd0aCA9PT0gcXVhbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcGFyc2VJbnQocHJpY2VzW2ldKSAqIHBhcnNlSW50KHF1YW50aXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxCYXNlUHJpY2UpO1xuICAgIH1cblxuICAgIGxldCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UgJiYgY291cG9uTm90QXBwbGljYWJsZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHRvdGFsUHJpY2UgLSBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gcGFyc2VJbnQodG90YWxQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiLCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50KTtcblxuICAgIGlmIChpc0NhcnRFbXB0eSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsUHJpY2VcIiwgMCk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCAwKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJjdXN0b21EYXRhRGVyaXZhdGlvbnMgY2Fubm90IGNvbXB1dGUgY291cG9uQXBwbGljYWJsZVByaWNlOiBcIiArIGUpO1xuICB9XG5cbiAgLy8gUHJvZHVjdCBwYWdlIC0tPiB0cmFuc2ZlciBza3VzIHRvIHNpbmdsZSBsb2NhdGlvblxuICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiKTtcbiAgICBpZiAoc2t1IT09bnVsbCAmJiBza3UhPT11bmRlZmluZWQpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIFtza3VdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnNrdXNcIik7XG4gICAgaWYgKHNrdUxpc3QhPT1udWxsICYmIEFycmF5LmlzQXJyYXkoc2t1TGlzdCkgJiYgc2t1TGlzdC5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHNrdUxpc3QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcGFyc2VTZWFyY2hQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tU3RhdHVzID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgLy8gY2hlY2sgaWYgZG9jdW1lbnQgYW5kIGRvbSBpcyBsb2FkZWQgYW5kIHJlYWR5IGZvciBzY3JhcHBpbmdcbiAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgaW5pdGlhbGl6ZWQgd2l0aCBkb20gc3RhdHVzOiAgXCIgKyBkb21TdGF0dXMpO1xuXG4gIGNvbnN0IHdpbnRvcCA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IGRhdGFMYXllciA9IHdpbnRvcC5kYXRhTGF5ZXI7XG4gIGNvbnN0IHdpbmRvYyA9IHdpbnRvcC5kb2N1bWVudDtcbiAgbGV0IHNvcmdBcnJheUlubmVyO1xuXG4gIGNvbnN0IGZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHByZXZGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBub3RGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuXG4gIC8vIFBhZ2VUeXBlIGNhbiBiZSBpbmZlcnJlZCBmcm9tIFVSTCwgaWYgZm91bmQgdXNlIGl0IGZyb20gdGhlcmVcbiAgbGV0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcblxuICBpZiAoY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgcHJldkZvdW5kTmFtZXMuYWRkKFwiUGFnZVR5cGVcIik7XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggc2VhcmNoIGxpc3RzIGFuZCBtYXJrIGZvdW5kIG5hbWVzXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHByZXZGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkgfHwgcHJldkZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkpIHtcbiAgICAgIC8vIGhhZCBhbHJlYWR5IGZvdW5kIHRoaXMgZWxlbWVudCBvbiBhbm90aGVyIHBhcnNlIGl0ZW1cbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZCAhPT0gXCIqXCIpIHtcbiAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kLmluZGV4T2YoY3VycmVudFBhZ2VUeXBlKSA8IDApIHtcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hFbGVtZW50IGJlY2F1c2Ugb2YgUGFnZVR5cGVEZXBlbmRcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJTaW5nbGVXVFwiKSB7IC8vIFNDQU4gV2luZG93IGZvciBTaW5nbGUgRWxlbWVudHNcbiAgICAgIHNlYXJjaEFuZFNldCh3aW50b3AsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiR0FEYXRhTGF5ZXJcIikgeyAvLyBTQ0FOIEdBIERBVEEgTEFZRVJcbiAgICAgIGZvciAoY29uc3QgZGF0YUxheWVySXRlbSBvZiBkYXRhTGF5ZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KGRhdGFMYXllckl0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jU29yZ1wiKSB7IC8vIFNDQU4gU09SRyBBUlJBWVxuICAgICAgaWYgKCFzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzb3JnQXJyYXlJbm5lciA9IGdldFNPUkdBcnJheSgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzb3JnSXRlbSBvZiBzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoc29yZ0l0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jUXVlcnlcIikgeyAvLyBTQ0FOIERPQ1VNRU5UXG4gICAgICBzZWFyY2hBbmRTZXQod2luZG9jLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IC8vIERPQ1FVRVJZIHBhcnNlXG4gIH1cblxuICBpZiAobm90Rm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBmb3VuZCBhbGwgZWxlbWVudHMgLSBzZXR0aW5nIHJldHJ5IHRvIG1heFwiKTtcbiAgfSBlbHNlIGlmIChmb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICAvLyB1cGRhdGUgcmV0cnkgY291bnRlciBhbmQgZGVsYXkgb25seSBpZiBkb20gaXMgYWN0aXZlXG4gICAgaWYgKGRvbVN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvbVN0YXR1cyA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKj0gMjtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArPSAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZCBidXQgbm90IGZvdW5kIGFueSwgc2V0dGluZyBkZWxheSBhbmQgcmV0cnkgdG8gXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCIgYW5kIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArIFwiIGZvciBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXVwiLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkOiBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXSBhbmQgZm91bmQgXCIgK1xuICAgICAgZm91bmROYW1lcy5zaXplLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaEFuZFNldCA9IChvYmosIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpID0+IHtcbiAgaWYgKHNlYXJjaE9iaihvYmosIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgZm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9XG59O1xuXG4vLyBwYXJzZSBzb3VyY2VcbmNvbnN0IHBhcnNlckNhbGxlciA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHBhcnNlckNhbGxlcigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHJlYWNoZWQgbWF4IHJldHJ5LCBjYWxsaW5nIHJlbWFpbmRlciBoaXN0b3JpY2FsIGRhdGFcIik7XG4gICAgYXdhaXQgY3VzdG9tRGF0YURlcml2YXRpb25zKCk7XG4gICAgYXdhaXQgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvcigpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlKTtcbiAgfVxufTtcblxuLy8gRXh0cmFjdCB2YWx1ZSBmcm9tIGpzb24gb2JqZWN0IHVzaW5nIGdpdmVuIHBhdGhcbi8vIElmIGFuIGVsZW1lbnQgaXMgKiwgY29uY2F0ZW5hdGUgcmVjdXJzaXZlbHkgYWxsIHN1Yi1wYXRoIHZhbHVlcyBhcyBzdHJpbmdcbmNvbnN0IGpzb25HZXQgPSAob2JqLCBwYXRoKSA9PiB7XG4gIGlmICghb2JqKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAocGF0aEFycmF5W2ldID09PSBcIipcIikge1xuICAgICAgICBjb25zdCBzdWJQYXRoID0gcGF0aEFycmF5LnNsaWNlKGkgKyAxKS5qb2luKFwiLlwiKTtcbiAgICAgICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50W3N1YktleV0gIT09IHVuZGVmaW5lZCAmJiBjdXJyZW50W3N1YktleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZhbHVlID0ganNvbkdldChjdXJyZW50W3N1YktleV0sIHN1YlBhdGgpO1xuICAgICAgICAgICAgaWYgKHN1YlZhbHVlICE9PSBudWxsICYmIHN1YlZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc3ViQXJyYXkucHVzaChzdWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJBcnJheTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhdGhBcnJheVtpXV07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHByZXBhcmVDb3JlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudERhdGE/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnQ7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2UGxhdGZvcm1cIiwgcGxhdGZvcm0pO1xuXG4gIC8qIHdpbmRvdyB2aWV3IGFyZWEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93UFJhdGlvXCIsIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcblxuICBjb25zdCBhdmFpbFdpbmRvdyA9IHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsV2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsSGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dBdmFpbFwiLCBhdmFpbFdpbmRvdyk7XG5cbiAgY29uc3Qgd2luZG93RGVwdGggPSB3aW5kb3dQdHIuc2NyZWVuPy5jb2xvckRlcHRoICsgXCItXCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5waXhlbERlcHRoO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dEZXB0aFwiLCB3aW5kb3dEZXB0aCk7XG5cbiAgY29uc3QgdnBvcnRTaGFwZSA9IHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8ud2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8uaGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dWcG9ydFwiLCB2cG9ydFNoYXBlKTtcblxuICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQoc2NyZWVuLndpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gcGFyc2VJbnQoc2NyZWVuLmhlaWdodCkgOiAwO1xuICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHBsYXRmb3JtKTtcbiAgICAgIGlmIChpT1MgJiYgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgLy8gaW9zIHByb3ZpZGVzIERQSXMsIG5lZWQgdG8gbXVsdGlwbHlcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQW5nbGUgPSB3aW5kb3dQdHIuc2NyZWVuPy5vcmllbnRhdGlvbj8uYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gOTAgfHwgTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDI3MCkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIHN3aXRjaCB2YWx1ZXMgZm9yIGFsbCBleGNlcHQgaW9zXG4gICAgICAgICAgY29uc3QgdGVtcCA9IHdpZHRoO1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0O1xuICAgICAgICAgIGhlaWdodCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1wiLCB3aWR0aCArIFwieFwiICsgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiBuYXZpZ2F0b3IgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SGlzdFNpemVcIiwgd2luZG93UHRyLmhpc3Rvcnk/Lmxlbmd0aCk7XG5cbiAgLy8gY2hlY2sgaWYgdXNlckFnZW50RGF0YSBpcyBzdXBwb3J0ZWQgYW5kIHVzZXJBZ2VudCBpcyBub3QgYXZhaWxhYmxlLCB1c2UgaXRcbiAgaWYgKCFuYXZQdHIudXNlckFnZW50KSB7XG4gICAgaWYgKG5hdlB0ci51c2VyQWdlbnREYXRhKSB7XG4gICAgICAvLyB0dXJuIGJyYW5kcyBhcnJheSBpbnRvIHN0cmluZ1xuICAgICAgbGV0IG5hdkFnZW50ID0gbmF2UHRyPy51c2VyQWdlbnREYXRhPy5icmFuZHM/Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmJyYW5kICsgXCI6XCIgKyBlLnZlcnNpb247XG4gICAgICB9KS5qb2luKCk7XG4gICAgICAvLyBhZGQgbW9iaWxlIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IChuYXZQdHI/LnVzZXJBZ2VudERhdGE/Lm1vYmlsZSA/IFwibW9iaVwiIDogXCIgXCIpO1xuICAgICAgLy8gYWRkIHBsYXRmb3JtIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IHBsYXRmb3JtO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2QWdlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZQdHIudXNlckFnZW50KTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhXQ29yZXNcIiwgbmF2UHRyLmhhcmR3YXJlQ29uY3VycmVuY3kpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZMYW5ndWFnZVwiLCBuYXZQdHIubGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5icm93c2VyTGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5zeXN0ZW1MYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLnVzZXJMYW5ndWFnZSxcbiAgKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VG91Y2hcIiwgbmF2UHRyLm1heFRvdWNoUG9pbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VmVuZG9yXCIsIG5hdlB0ci52ZW5kb3IpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pbnRlcm5ldFNwZWVkXCIsIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LmNvbm5lY3Rpb24/LmRvd25saW5rKTtcblxuICAvKiBtaXNjZWxsYW5lb3VzICovXG4gIGNvbnN0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy50b3AubG9jYXRpb24uaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidVwiLCBjdXJyZW50VVJMLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRcIiwgY3VycmVudFVSTC5ob3N0bmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZG9udHRyYWNrXCIsIG5hdlB0ci5kb05vdFRyYWNrIHx8IHdpbmRvd1B0ci5kb05vdFRyYWNrIHx8IG5hdlB0ci5tc0RvTm90VHJhY2spO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICBjb25zdCBmaXJzdFNlc3Npb25SZWZlcnJlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUik7XG4gIGlmICghZmlyc3RTZXNzaW9uUmVmZXJyZXIpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgZmlyc3RTZXNzaW9uUmVmZXJyZXIpO1xuICB9XG5cbiAgLyogVml2ZW5zZSBzcGVjaWZpYyAqL1xuICBsZXQgcGFnZVR5cGU7XG4gIC8vIGlmIHVybCBsaWtlIHggdGhlbiBzZXQgUGFnZVR5cGUgPSB5XG4gIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJmYXZvcmlsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiZmF2b3JpdGVzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJiYXNrZXRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLW96ZXRpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwdXJjaGFzZVwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcIm9kZW1lLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXltZW50XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYWRkcmVzc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGFzdG9yZGVyc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1rYXlpdC5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicmVnaXN0ZXJcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUtZ2lyaXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzaWduaW5cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJrdXBvbmxhcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2NvdXBvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJwcm9maWwtZ3VuY2VsbGUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfaW5mb1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfYWRkcmVzc2VzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZHV5dXJ1LXRlcmNpaGxlcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfbm90aWZpY2F0aW9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImluZGlyaW1saS1tb2JpbHlhLWthbXBhbnlhbGFyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic3BlY2lhbF9jYW1wYWlnbnNcIjtcbiAgfVxuXG4gIGlmIChwYWdlVHlwZSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgcGFnZVR5cGUpO1xuICB9XG59O1xuXG5jb25zdCBhZGRNZXRyaWNzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IHBlcmZNZXRyaWNzID0ge307XG4gIGNvbnN0IHBlcmZOYXZpZ2F0aW9uTWV0cmljcyA9IHdpbmRvd1B0ci5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXTtcbiAgaWYgKHdpbmRvd1B0ci5wZXJmb3JtYW5jZSAmJiBwZXJmTmF2aWdhdGlvbk1ldHJpY3MpIHtcbiAgICBwZXJmTWV0cmljcy5jb25uZWN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLnJlcXVlc3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXNwb25zZUVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXF1ZXN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmRvbSA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUludGVyYWN0aXZlIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUNvbXBsZXRlKTtcbiAgICBwZXJmTWV0cmljcy5sb2FkID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kdXJhdGlvbiA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmR1cmF0aW9uKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1ldHJpY3NcIiwgcGVyZk1ldHJpY3MpO1xufTtcblxuLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIFwiZWxlbWVudCBjb2xsZWN0b3JcIiBtb2R1bGUsIHRoZW4gZGF0YSBpcyBleHRyYWN0ZWQgZnJvbSBwcmUtY29sbGVjdGVkIGVsZW1lbnRzXG5jb25zdCBnZXRTT1JHQXJyYXkgPSAoKSA9PiB7XG4gIGNvbnN0IHNjaGVtYU9yZ0VsdHMgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT1cXFwiYXBwbGljYXRpb24vbGQranNvblxcXCJdXCIpO1xuICBjb25zdCBzb3JnQXJyYXkgPSBbXTtcblxuICBmb3IgKGNvbnN0IHNUYWcgb2Ygc2NoZW1hT3JnRWx0cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbnRudCA9IHNUYWcudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBqc29uY29udGVudCA9IEpTT04ucGFyc2UoY250bnQpO1xuICAgICAgc29yZ0FycmF5LnB1c2goanNvbmNvbnRlbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gc29yZ0FycmF5O1xufTtcbiIsImltcG9ydCB7TE9HX0FQSV9VUkx9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVNb25pdG9yXCIpO1xuY29uc3QgSEVBREVSUyA9IHtcbiAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG59O1xuXG5leHBvcnQgY2xhc3MgTW9uaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgbW9uaXRvclwiKTtcblxuICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gQXR0ZW1wdHMgdG8gc2VuZCB0aGUgaW5pdGlhbCBsb2cgYm9keSAoYmVhZ2xlSW5mb0xheWVyJ3MgaW5pdGlhbCBwb3B1bGF0aW9uKSBpbW1lZGlhdGVseVxuICBhc3luYyBzZW5kTG9ncyhpbW1lZGlhdGUpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gaW1tZWRpYXRlIHNlbmRpbmcgYmxvY2tcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBhd2FpdGluZyBzY3JhcGluZ1wiKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUsIDUwLCAxMDAwKTtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gc2VuZGluZyBsb2dzXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2VuZCBpbml0aWFsIGxvZyBib2R5IGFuZCBpbmNyZW1lbnRhbCB1cGRhdGUgbG9ncyBvbiBjbG9zZVxuICBhc3luYyBoYW5kbGVDbG9zZUV2ZW50KCkge1xuICAgIC8vIGlmIGluaXRpYWwgbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgc2VuZCB1cGRhdGVzIGFuZCBpbmZvbGF5ZXIgaW4gb25lIGJhdGNoXG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgLy8gaWYgbWFpbiBsb2cgaGFzIGJlZW4gc2VudCwgc2VuZCBpbmNyZW1lbnRhbCB1cGRhdGVzIG9ubHlcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCk7XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVNYWluTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VNYWluTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcXVlc3QgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKSB7XG4gICAgaWYgKCF0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzVXBkYXRlc1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgdGhlcmUgaXMgbm8gaW5jcmVtZW50YWwgeWV0XG4gICAgICAvLyBvciBpZiB0aGUgdXBkYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPSBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9ncyBjaGFuZ2Ugc3RhdHVzOiBcIiwgaGFzQ2hhbmdlZCk7XG4gICAgaWYgKCFoYXNDaGFuZ2VkKSByZXR1cm47XG5cbiAgICBjb25zdCBsb2dEYXRhID0gYXdhaXQgdGhpcy5wYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCk7XG4gICAgaWYgKGxvZ0RhdGEpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZW5kaW5nIGluY3JlbWVudGFsIGxvZ3NcIiwgbG9nRGF0YSk7XG4gICAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKGxvZ0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUFycml2YWxMb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgb3IgYXJyaXZhbCBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlQXJyaXZhbExvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh3bSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2h3bVwiKTtcbiAgICBpZiAodGhpcy5oaWdoV2F0ZXJNYXJrICE9PSBod20pIHtcbiAgICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgcywgbSwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJtXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDIsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgYSwgZSwgZiwgcywgbSxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gcGFnZWhpZGUgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIC8vIElmIHBhZ2UgaXMgbm90IHZpc2libGUgYW5kIGRvZXNuJ3QgYmVjb21lIHZpc2libGUgd2l0aGluIDMwIHNlY29uZHMsIHNlbmQgbG9nc1xuICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbiB0aW1lb3V0XCIpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgICAgICB9LCAzMDAwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFyIHRpbWVvdXQgd2hlbiBwYWdlIGlzIHZpc2libGUgdG8gbWFrZSBzdXJlIHdlIHNlbmQgdGhlIGxhdGVzdCBsb2dzIHBvc3NpYmxlXG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgIGlmICghcXVldWVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIG5vdCBxdWV1ZWRcIik7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9uaXRvcjtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllckNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0RhdGFMYXllclJ1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGtleSk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlLCBzZWxlY3Rvciwgc2VsZWN0b3JBbGwsIHNlbGVjdG9yRmFsbGJhY2sgPSBudWxsfSA9IHJ1bGU7XG4gIGxldCBtYWluU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBtYWluU2VsZWN0b3IgPSBzZWxlY3RvckZhbGxiYWNrID8gc2VsZWN0b3JGYWxsYmFjayA6IG1haW5TZWxlY3RvcjtcbiAgfVxuXG4gIGlmIChvcGVyYXRvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgfVxuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHNlbGVjdG9yQWxsICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxldCBlbGVtZW50O1xuICBpZiAobWFpblNlbGVjdG9yKSBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3Rvcik7XG4gIGVsc2UgaWYgKHNlbGVjdG9yQWxsKSBlbGVtZW50ID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRleHQtbnVtYmVyXCI6IHtcbiAgICAgIGxldCB0ZW1wVmFsO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgdGVtcFZhbCA9IGVsZW1lbnQucmVkdWNlKChyZXR1cm5WYWwsIGVsZW0pID0+IHtcbiAgICAgICAgICByZXR1cm5WYWwgKz0gcGFyc2VJbnQoZWxlbS50ZXh0Q29udGVudC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcFZhbCA9IHBhcnNlSW50KHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLnRleHRDb250ZW50XG4gICAgICAgICAgICAucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHBhcnNlSW50KHRlbXBWYWwpO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcImNsYXNzTGlzdFwiOlxuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJjb3VudFwiOiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiBlbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudC5sZW5ndGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDEsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgXCJzdHlsZVwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGNvbnN0IHN0eWxlS2V5ID0gdmFsdWUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN0eWxlVmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudFN0eWxlc1tzdHlsZUtleV07XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgc3R5bGVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiT3BlcmF0b3Igbm90IGRlZmluZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRnVuY3Rpb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tGdW5jdGlvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGlmICghb3BlcmF0b3IpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgcnVsZUZ1bmN0aW9uID0gRnVuY3Rpb24ob3BlcmF0b3IpO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBydWxlRnVuY3Rpb24oKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlU2Vzc2lvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Nlc3Npb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gZHVyYXRpb25IYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJoaXN0b3J5XCI6XG4gICAgICByZXR1cm4gaGlzdG9yeUhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRTZXNzaW9uVGltZXN0YW1wID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgRGF0ZShwYXJzZUludCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1RJTUVTVEFNUCkpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgc2Vzc2lvbiB0aW1lc3RhbXBcIiwgZXJyKTtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxufTtcblxuY29uc3QgZHVyYXRpb25IYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSAoRGF0ZS5ub3coKSAtIGdldFNlc3Npb25UaW1lc3RhbXAoKSkgLyAxMDAwO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihkdXJhdGlvbiwgY29uZGl0aW9uLCBwYXJzZUludCh2YWx1ZSkpO1xufTtcblxuY29uc3QgaGlzdG9yeUhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBjdXJyZW50SGlzdG9yeSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fSElTVE9SWSk/LnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoY3VycmVudEhpc3RvcnksIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVcmxDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tVcmxSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwicGF0aFwiOiB7XG4gICAgICBjb25zdCByZXF1ZXN0VVJMPSB3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWY7XG4gICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyZXF1ZXN0VVJMKS5wYXRobmFtZTtcbiAgICAgIGxvZ2dlci5sb2coYENoZWNraW5nIHBhdGggJHtwYXRofSBtYXRjaGVzIHJ1bGUgcGF0aCAke3ZhbHVlfWApO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocGF0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbnZDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbnZSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiY29uc3QgY29uZmlnID0ge1xuICBkYk5hbWU6IFwiYmVhZ2xlX2NhY2hlXCIsXG4gIHZlcnNpb246IDEsXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJpbmZvQ2FjaGVcIixcbiAgICBpbmRleGVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiaXhfc2t1XCIsXG4gICAgICAgIGZpZWxkczogXCJza3VcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJza3VcIn0sXG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IHtmZXRjaFByb2R1Y3RJbmZvfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnlcIik7XG5jbGFzcyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGluZGV4ZWREQlwiKTtcbiAgICBjb25zdCBvcGVuUmVxdWVzdCA9IHdpbmRvdy50b3AuaW5kZXhlZERCPy5vcGVuKGNvbmZpZy5kYk5hbWUsIGNvbmZpZy52ZXJzaW9uKTtcbiAgICBpZiAoIW9wZW5SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbmRleGVkZGIgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0LnJlc3VsdC5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBvcGVuUmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGJlYWdsZV9jYWNoZSBpbmRleGVkIERCXCIsIG9wZW5SZXF1ZXN0LmVycm9yKTtcbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgdGhpcy5pbmRleGVkREIgPSBvcGVuUmVxdWVzdC5yZXN1bHQ7XG4gICAgfTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkluZGV4ZWREQiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0VHJhbnNhY3Rpb24ocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBhd2FpdCB0aGlzLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCB0eCA9IHRoaXMuaW5kZXhlZERCLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCAocmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikpO1xuICAgIHJldHVybiB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gIH1cblxuICBhc3luYyBzYXZlKHBheWxvYWQpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICBmb3IgKGNvbnN0IGxvYWQgb2YgcGF5bG9hZCkge1xuICAgICAgICBsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgc3RvcmUucHV0KGxvYWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjbGVhcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsZWFyUmVxdWVzdCA9IHN0b3JlLmNsZWFyKCk7XG4gICAgICAgIGNsZWFyUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjbGVhclJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBjbGVhcmluZyBzdG9yZTogJHtzdG9yZS5uYW1lfWApO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldChza3UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgZ2V0UmVxdWVzdCA9IHN0b3JlLmdldChza3UpO1xuICAgICAgICBnZXRSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBnZXRSZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgICBsb2dnZXIubG9nKGBGb3VuZCB2YWx1ZSAke3Jlc3VsdH0gZm9yIGtleSAke3NrdX1gKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGdldFJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBnZXR0aW5nIHZhbHVlIGZvciBrZXk6ICR7c2t1fWAsIGdldFJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY291bnQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50UmVxdWVzdCA9IHN0b3JlLmNvdW50KCk7XG4gICAgICAgIGNvdW50UmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRSZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgICBsb2dnZXIubG9nKGBDb3VudGVkICR7cmVzdWx0fSBlbnRyaWVzYCk7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBjb3VudFJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgY291bnRpbmcgZW50cmllczogXCIsIGNvdW50UmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXRDdXJzb3IoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnNvclJlcXVlc3QgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XG4gICAgICAgIGN1cnNvclJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgY3Vyc29yUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBnZXR0aW5nIGN1cnNvclwiLCBjdXJzb3JSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHBlcnNpc3RQcm9kdWN0SW5mbygpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJjaGVjay1leGlzdGluZy1wcm9kLWluZm9cIik7XG4gICAgY29uc3QgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IHRoaXMuY291bnQoKTtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykge1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBmb3VuZFwiKTtcbiAgICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IHRoaXMuZ2V0Q3Vyc29yKCk7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBjdXJzb3IudmFsdWUudGltZXN0YW1wO1xuICAgICAgY29uc3QgZWxhcHNlZFNlY29uZHMgPSAoRGF0ZS5ub3coKSAvIDEwMDApIC0gdGltZXN0YW1wO1xuICAgICAgaWYgKGVsYXBzZWRTZWNvbmRzIDwgNzIwMCkgcmV0dXJuO1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBpcyBleHBpcmVkXCIpO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGluZy1wcm9kLWluZm9cIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Qcm9taXNlID0gZmV0Y2hQcm9kdWN0SW5mbygpO1xuICAgIGNvbnN0IGNsZWFyUHJvbWlzZSA9IHRoaXMuY2xlYXIoKTtcbiAgICBjb25zdCBbcHJvZHVjdEluZm9BcnJheV0gPSBhd2FpdCBQcm9taXNlLmFsbChbcHJvZHVjdEluZm9Qcm9taXNlLCBjbGVhclByb21pc2VdKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvQXJyYXkgfHwgIXByb2R1Y3RJbmZvQXJyYXkubGVuZ3RoKSByZXR1cm47XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC1wcm9kLWluZm9cIik7XG4gICAgYXdhaXQgdGhpcy5zYXZlKHRoaXMucHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwZXJzaXN0ZWQtcHJvZC1pbmZvXCIpO1xuICB9XG5cbiAgcHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICBjb25zdCBwYXlsb2FkcyA9IFtdO1xuICAgIGNvbnN0IGZpZWxkTmFtZXMgPSBwcm9kdWN0SW5mb0FycmF5LnNoaWZ0KCk7XG4gICAgZmllbGROYW1lcy5zaGlmdCgpO1xuICAgIGZvciAoY29uc3QgaW5mbyBvZiBwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0ge3NrdTogaW5mby5zaGlmdCgpfTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXlsb2FkW2ZpZWxkTmFtZXNbaV1dID0gaW5mb1tpXSB8fCAwO1xuICAgICAgfVxuICAgICAgcGF5bG9hZHMucHVzaChwYXlsb2FkKTtcbiAgICB9XG4gICAgcmV0dXJuIHBheWxvYWRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnk7XG4iLCJpbXBvcnQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSBmcm9tIFwiLi9pbmRleFwiO1xuXG5jb25zdCBTdG9yZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSgpO1xuICAgICAgICAvLyBIaWRlIHRoZSBjb25zdHJ1Y3RvciBzbyB0aGUgcmV0dXJuZWQgb2JqZWN0IGNhbid0IGJlIG5ldydkLi4uXG4gICAgICAgIGluc3RhbmNlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9LFxuICB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgaWYgKCFza3VMaXN0IHx8ICh0eXBlb2Ygc2t1TGlzdCA9PT0gXCJvYmplY3RcIiAmJiAhT2JqZWN0LmtleXMoc2t1TGlzdCkubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuICBsZXQgcnVudGltZVZhbHVlID0gbnVsbDtcbiAgY29uc3Qgc2t1ID0gc2t1TGlzdFtPYmplY3Qua2V5cyhza3VMaXN0KVswXV0/LmlkO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VHJhbnNhY3Rpb25Db3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJhZGRUb0NhcnRJbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBBZGRUb0NhcnRDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0QWRkVG9DYXJ0Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwicHJvZHVjdFZpZXdDb3VudFwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBwcm9kdWN0Vmlld0NvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRQcmV2aWV3Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiY29uc3QgRV9USU1FT1VUID0gbmV3IEVycm9yKCd0aW1lb3V0IHdoaWxlIHdhaXRpbmcgZm9yIG11dGV4IHRvIGJlY29tZSBhdmFpbGFibGUnKTtcbmNvbnN0IEVfQUxSRUFEWV9MT0NLRUQgPSBuZXcgRXJyb3IoJ211dGV4IGFscmVhZHkgbG9ja2VkJyk7XG5jb25zdCBFX0NBTkNFTEVEID0gbmV3IEVycm9yKCdyZXF1ZXN0IGZvciBsb2NrIGNhbmNlbGVkJyk7XG5cbnZhciBfX2F3YWl0ZXIkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUsIF9jYW5jZWxFcnJvciA9IEVfQ0FOQ0VMRUQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHRoaXMuX2NhbmNlbEVycm9yID0gX2NhbmNlbEVycm9yO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnMgPSBbXTtcbiAgICB9XG4gICAgYWNxdWlyZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXS5wdXNoKHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0ID0gMSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHJlbGVhc2VdID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPD0gMDtcbiAgICB9XG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgcmVsZWFzZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcy5mb3JFYWNoKChxdWV1ZSkgPT4gcXVldWUuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LnJlamVjdCh0aGlzLl9jYW5jZWxFcnJvcikpKTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICB9XG4gICAgX2Rpc3BhdGNoKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgY29uc3QgcXVldWVFbnRyeSA9IChfYSA9IHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghcXVldWVFbnRyeSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzV2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgLT0gd2VpZ2h0O1xuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy5fdmFsdWUgKyAxO1xuICAgICAgICAgICAgcXVldWVFbnRyeS5yZXNvbHZlKFtwcmV2aW91c1ZhbHVlLCB0aGlzLl9uZXdSZWxlYXNlcihwcmV2aW91c1dlaWdodCldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICB9XG4gICAgX25ld1JlbGVhc2VyKHdlaWdodCkge1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2RyYWluVW5sb2NrV2FpdGVycygpIHtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5mb3JFYWNoKCh3YWl0ZXIpID0+IHdhaXRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIE11dGV4IHtcbiAgICBjb25zdHJ1Y3RvcihjYW5jZWxFcnJvcikge1xuICAgICAgICB0aGlzLl9zZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEsIGNhbmNlbEVycm9yKTtcbiAgICB9XG4gICAgYWNxdWlyZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQxKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgWywgcmVsZWFzZXJdID0geWllbGQgdGhpcy5fc2VtYXBob3JlLmFjcXVpcmUoKTtcbiAgICAgICAgICAgIHJldHVybiByZWxlYXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLnJ1bkV4Y2x1c2l2ZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS53YWl0Rm9yVW5sb2NrKCk7XG4gICAgfVxuICAgIHJlbGVhc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKSlcbiAgICAgICAgICAgIHRoaXMuX3NlbWFwaG9yZS5yZWxlYXNlKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5jYW5jZWwoKTtcbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHdpdGhUaW1lb3V0KHN5bmMsIHRpbWVvdXQsIHRpbWVvdXRFcnJvciA9IEVfVElNRU9VVCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjcXVpcmU6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgc3luYy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGVhc2UgPSBBcnJheS5pc0FycmF5KHRpY2tldCkgPyB0aWNrZXRbMV0gOiB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGlja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCByZWxlYXNlID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWNrZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHRpY2tldFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZSh3ZWlnaHQpIHtcbiAgICAgICAgICAgIHN5bmMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3luYy5jYW5jZWwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2FpdEZvclVubG9jazogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3luYy53YWl0Rm9yVW5sb2NrKHdlaWdodCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCh0aW1lb3V0RXJyb3IpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogKCkgPT4gc3luYy5pc0xvY2tlZCgpLFxuICAgICAgICBnZXRWYWx1ZTogKCkgPT4gc3luYy5nZXRWYWx1ZSgpLFxuICAgICAgICBzZXRWYWx1ZTogKHZhbHVlKSA9PiBzeW5jLnNldFZhbHVlKHZhbHVlKSxcbiAgICB9O1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpc25lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIHRyeUFjcXVpcmUoc3luYywgYWxyZWFkeUFjcXVpcmVkRXJyb3IgPSBFX0FMUkVBRFlfTE9DS0VEKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICByZXR1cm4gd2l0aFRpbWVvdXQoc3luYywgMCwgYWxyZWFkeUFjcXVpcmVkRXJyb3IpO1xufVxuXG5leHBvcnQgeyBFX0FMUkVBRFlfTE9DS0VELCBFX0NBTkNFTEVELCBFX1RJTUVPVVQsIE11dGV4LCBTZW1hcGhvcmUsIHRyeUFjcXVpcmUsIHdpdGhUaW1lb3V0IH07XG4iLCJpbXBvcnQge2NoZWNrRGF0YUxheWVyUnVsZX0gZnJvbSBcIi4vZGF0YUxheWVyQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VsZW1lbnRSdWxlfSBmcm9tIFwiLi9lbGVtZW50Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0Z1bmN0aW9uUnVsZX0gZnJvbSBcIi4vZnVuY3Rpb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrU2Vzc2lvblJ1bGV9IGZyb20gXCIuL3Nlc3Npb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrVXJsUnVsZX0gZnJvbSBcIi4vdXJsQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VudlJ1bGV9IGZyb20gXCIuL2VudkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tQcm9kdWN0SW5mb1J1bGV9IGZyb20gXCIuL3Byb2R1Y3RJbmZvQ2hlY2tlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2FkZERhdGFMaXN0ZW5lciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuaW1wb3J0IHtmZXRjaEVsaWdpYmlsaXR5UnVsZXN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJ1bGVFbmdpbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXMsIGJhc2VSdWxlU2V0fSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLm11dGV4ID0gbmV3IE11dGV4KCk7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZCA/IHJ1bGUubmFtZSB8fCB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICAgIGNvbnN0IGtleVByb21pc2VzTWFwID0ge307XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5lbGlnaWJpbGl0eVJ1bGVzKSkge1xuICAgICAga2V5UHJvbWlzZXNNYXBba2V5XSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGtleVByb21pc2VzTWFwW2tleV0ucHVzaCh0aGlzLmNoZWNrUnVsZShydWxlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZVByb21pc2VzXSBvZiBPYmplY3QuZW50cmllcyhrZXlQcm9taXNlc01hcCkpIHtcbiAgICAgIGNvbnN0IHNhdGlzZmllZFJ1bGVJZHMgPSBhd2FpdCBQcm9taXNlLmFsbChydWxlUHJvbWlzZXMpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIHNhdGlzZmllZFJ1bGVJZHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGZhbHNlKSk7XG4gICAgICB0aGlzLnNldFVwTGlzdGVuZXJzKGtleSwgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpIHtcbiAgICBpZiAoIWtleSB8fCAhcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCB0aGlzLm11dGV4LmFjcXVpcmUoKTtcbiAgICBsb2dnZXIubG9nKGBMb2NrIGFjcXVpcmVkIGZvciBrZXkgJHtrZXl9YCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBjb25zdCBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gKSB8fCBbXTtcbiAgICAgICAgaWYgKGlzRWxpZ2libGUpIHtcbiAgICAgICAgICBpZiAoY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjdXJyZW50LnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgY3VycmVudCk7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJQYWdlVHlwZVwiKSBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZW1vdmUgZnJvbSBlbGlnaWJsZSBydWxlc1xuICAgICAgICAgIGlmICghY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGN1cnJlbnQuZmlsdGVyKChrKSA9PiBrICE9PSBydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBmaWx0ZXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGFzc2Vzc2luZyBydWxlcyBmb3Iga2V5OiAke2tleX0gLSAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2dnZXIubG9nKGBSZWxlYXNpbmcgbG9jayBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKSB7XG4gICAgY29uc3Qge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9ID0gdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMpO1xuICAgIGZvciAoY29uc3QgW29wZXJhdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZGF0YUxheWVyUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjay5iaW5kKHRoaXMsIGtleSwgcnVsZXMpO1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKG9wZXJhdG9yLCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50UnVsZXMpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgbGV0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb25SZWNvcmQgb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgbm9kZXMgPSBbLi4ubm9kZXMsIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQuYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQucmVtb3ZlZE5vZGVzKV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXhjbHVkZSBtdXRhdGlvbnMgdGhhdCBvbmx5IHVwZGF0ZSB0ZXh0XG4gICAgICAgIGlmIChub2Rlcy5ldmVyeSgobikgPT4gbi50YWdOYW1lID09PSB1bmRlZmluZWQpKSByZXR1cm47XG4gICAgICAgIHRoaXMuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcyk7XG4gICAgICB9KTtcbiAgICAgIGxldCBlbGVtZW50VG9PYnNlcnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICBlbGVtZW50VG9PYnNlcnZlID0gZWxlbWVudFRvT2JzZXJ2ZSA/IGVsZW1lbnRUb09ic2VydmUucGFyZW50Tm9kZSA6IGRvY3VtZW50LmJvZHk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnRUb09ic2VydmUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBleHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMsIGRhdGFMYXllclJ1bGVzID0ge30sIGVsZW1lbnRSdWxlcyA9IHt9KSB7XG4gICAgaWYgKCFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICBjb25zdCB7dHlwZX0gPSBydWxlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgICBpZiAoIWRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdKSB7XG4gICAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXS5wdXNoKHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICAgIGlmICghZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3IgfHwgcnVsZS5zZWxlY3RvckFsbF0pIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGxdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGxdLnB1c2gocnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAocnVsZS5jaGFpbikge1xuICAgICAgICB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhbcnVsZS5jaGFpbl0sIGRhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEVsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBlbGlnaWJpbGl0eVJ1bGVzID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMpO1xuICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXMpIHJldHVybiBKU09OLnBhcnNlKGVsaWdpYmlsaXR5UnVsZXMpO1xuICAgICAgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoRWxpZ2liaWxpdHlSdWxlcygpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMsIEpTT04uc3RyaW5naWZ5KGVsaWdpYmlsaXR5UnVsZXMpKTtcbiAgICAgIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgZWxpZ2liaWxpdHkgcnVsZXM6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlNlZ21lbnRhdGlvbkNvbXB1dGVyXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cykge1xuICBsb2dnZXIubG9nKFwiRGV0ZXJtaW5pbmcgdXNlciBzZWdtZW50XCIpO1xuICB0cnkge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBPYmplY3Qua2V5cyh0cmVhdG1lbnRXZWlnaHRzKSkge1xuICAgICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgICBpZiAoIXJ1bGVTZXQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgc2VnbWVudFJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7YmFzZVJ1bGVTZXQ6IHJ1bGVTZXQsIGJ1c2luZXNzUnVsZVNldDogW119KTtcbiAgICAgIGlmIChhd2FpdCBzZWdtZW50UnVsZUVuZ2luZS5jaGVja1J1bGVzKCkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgVXNlciBzZWdtZW50IG1hdGNoZWQ6ICR7c2VnbWVudH1gKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIHNlZ21lbnQpO1xuICAgICAgICByZXR1cm4gc2VnbWVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLmxvZyhcIlVzZXIgc2VnbWVudCBub3QgbWF0Y2hlZCwgcmV0dXJuaW5nIGRlZmF1bHRcIik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIFwiZGVmYXVsdFwiKTtcbiAgICByZXR1cm4gXCJkZWZhdWx0XCI7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY29tcHV0ZSB1c2VyIHNlZ21lbnRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVMsIFRSRUFUTUVOVFNfRFVSQVRJT059IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7ZmV0Y2hUcmVhdG1lbnRzLCBmZXRjaFRyZWF0bWVudFdlaWdodHN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIik7XG5cbmNsYXNzIFRyZWF0bWVudFJlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHN9ID0gYm9keTtcbiAgICB0aGlzLnRyZWF0bWVudHMgPSB0cmVhdG1lbnRzO1xuICAgIHRoaXMudHJlYXRtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHM7XG4gICAgdGhpcy5jdXJyZW50UGFnZVR5cGUgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudHMoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkxvYWRpbmcgdHJlYXRtZW50c1wiKTtcbiAgICBjb25zdCB7VFJFQVRNRU5UU30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcbiAgICBjb25zdCB0cmVhdG1lbnRzT2JqID0gSlNPTi5wYXJzZSh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShUUkVBVE1FTlRTKSk7XG4gICAgbGV0IHRyZWF0bWVudHMgPSB0cmVhdG1lbnRzT2JqPy50cmVhdG1lbnRzO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRyZWF0bWVudHNPYmo/LnRpbWVzdGFtcDtcbiAgICBpZiAoIXRyZWF0bWVudHMgfHwgIXRpbWVzdGFtcCkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgbm90IGZvdW5kIGluIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgIH07XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeSh0cmVhdG1lbnRXaXRoVGltZXN0YW1wKSk7XG4gICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICB9XG4gICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgY29uc3QgZWxhcHNlZERheXMgPSAoRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCkgLyAoMTAwMCAqIDM2MDAgKiAyNCk7XG4gICAgICBpZiAoZWxhcHNlZERheXMgPiBUUkVBVE1FTlRTX0RVUkFUSU9OKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIGFyZSBleHBpcmVkXCIpO1xuICAgICAgICB0cmVhdG1lbnRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRzKCk7XG4gICAgICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUUkVBVE1FTlRTLCBKU09OLnN0cmluZ2lmeSh0cmVhdG1lbnRXaXRoVGltZXN0YW1wKSk7XG4gICAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIuc3VjY2VzcyhcIlRyZWF0bWVudHMgYXJlIGxvYWRlZCBmcm9tIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50V2VpZ2h0cygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHdlaWdodHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5XRUlHSFRTKTtcbiAgICAgIGlmICh3ZWlnaHRzKSByZXR1cm4gSlNPTi5wYXJzZSh3ZWlnaHRzKTtcbiAgICAgIHdlaWdodHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudFdlaWdodHMoKTtcbiAgICAgIGlmICghd2VpZ2h0cykge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHdlaWdodHNcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuV0VJR0hUUywgSlNPTi5zdHJpbmdpZnkod2VpZ2h0cykpO1xuICAgICAgcmV0dXJuIHdlaWdodHM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpIHtcbiAgICBsZXQgbWF0Y2hlZFRyZWF0bWVudHMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5NQVRDSEVEX1RSRUFUTUVOVFMpO1xuICAgIGlmIChtYXRjaGVkVHJlYXRtZW50cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCBKU09OLnBhcnNlKG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgbWF0Y2hlZFRyZWF0bWVudHMgPSBhd2FpdCBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoYXN5bmMgKG10KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jaGVja1BhZ2VUeXBlKG10LnBhZ2VUeXBlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2dnZXIubG9nKGAke21hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIHNlZ21lbnQgbWF0Y2hlZGApO1xuICAgICAgICByZXR1cm4gbWF0Y2hlZFRyZWF0bWVudHM7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgbWF0Y2hlZCByb2JvdHM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKSkgY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cyk7XG4gICAgICB9XG4gICAgfVxuICAgIG1hdGNoZWRUcmVhdG1lbnRzID0gW107XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHN9ID0gdGhpcztcbiAgICBjb25zdCB1c2VyU2VnbWVudCA9IGF3YWl0IGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpO1xuICAgIGlmICghdXNlclNlZ21lbnQpIHJldHVybiBudWxsO1xuICAgIGlmICh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgICBjb25zdCB1c2VyU2VnbWVudFdlaWdodHMgPSB0cmVhdG1lbnRXZWlnaHRzW3VzZXJTZWdtZW50XSA/XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzW3VzZXJTZWdtZW50XSA6IHRyZWF0bWVudFdlaWdodHNbXCJkZWZhdWx0XCJdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICBsZXQgc2VnbWVudGVkV2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LndlaWdodDtcbiAgICAgICAgaWYgKCFzZWdtZW50ZWRXZWlnaHQpIHtcbiAgICAgICAgICBpZiAodHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHtcbiAgICAgICAgICAgIHNlZ21lbnRlZFdlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuZGVwZW5kYW50X29uX3RyZWF0bWVudF0/LndlaWdodDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z01vZGUgPT09IDEpIHNlZ21lbnRlZFdlaWdodCA9IDEwMDtcbiAgICAgICAgICBpZiAoIXNlZ21lbnRlZFdlaWdodCkgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdHJlYXRtZW50LndlaWdodCA9IHNlZ21lbnRlZFdlaWdodDtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnQuYWN0aW9ucy5zb21lKChhKSA9PiBhLnZhcmlhbnRzKSkge1xuICAgICAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLnB1c2godHJlYXRtZW50KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiB0cmVhdG1lbnQuYWN0aW9ucykge1xuICAgICAgICAgIGlmICghYWN0aW9uLnZhcmlhbnRzKSBjb250aW51ZTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhcmlhbnRLZXkgb2YgT2JqZWN0LmtleXMoYWN0aW9uLnZhcmlhbnRzKSkge1xuICAgICAgICAgICAgaWYgKHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50cyAmJiB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdLnZhcmlhbnRzW3ZhcmlhbnRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXRjaGVkVHJlYXRtZW50cy5wdXNoKHRyZWF0bWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLk1BVENIRURfVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkobWF0Y2hlZFRyZWF0bWVudHMpKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRNYXRjaGVkVHJlYXRtZW50cyhkZWJ1Z01vZGUpO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tQYWdlVHlwZShwYWdlVHlwZXMpIHtcbiAgICBpZiAocGFnZVR5cGVzID09PSBudWxsIHx8IHBhZ2VUeXBlcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFnZVR5cGVzKSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlBhZ2UgVHlwZXMgc2hvdWxkIGJlIGFuIGFycmF5XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZVR5cGUgPT09IG51bGwgfHwgdGhpcy5jdXJyZW50UGFnZVR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgQ1BUID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZVJ1bGVzLlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgICAgdGhpcy5jdXJyZW50UGFnZVR5cGUgPSBDUFQ/LlswXTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRQYWdlVHlwZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChwYWdlVHlwZXNbMF0uc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIHBhZ2VUeXBlcyA9IHBhZ2VUeXBlcy5tYXAoKHB0KSA9PiBwdC5zdWJzdHIoMSkpO1xuICAgICAgcmV0dXJuICFwYWdlVHlwZXMuaW5jbHVkZXModGhpcy5jdXJyZW50UGFnZVR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZVR5cGVzLmluY2x1ZGVzKHRoaXMuY3VycmVudFBhZ2VUeXBlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVhdG1lbnRSZXBvc2l0b3J5O1xuIiwiaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJSZXBsYWNlVXRpbHNcIik7XG5cbmNvbnN0IHJlcGxhY2VyID0gYXN5bmMgKHZhbHVlLCByZXBsYWNlRm4pID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBbaSwgdmFsXSBvZiB2YWx1ZS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBsYWNlRm4gPSBBcnJheS5pc0FycmF5KHJlcGxhY2VGbikgPyByZXBsYWNlRm5baV0gOiByZXBsYWNlRm4gfHwgXCJcIjtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihjdXJyZW50UmVwbGFjZUZuKTtcbiAgICAgICAgdmFsdWVbaV0gPSByZXBsYWNlQWxsKHZhbCwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZVtpXSA9IHJlcGxhY2VGbkV4ZWN1dG9yKGN1cnJlbnRSZXBsYWNlRm4sIHZhbCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSkge1xuICAgIGZvciAoY29uc3QgckZuIG9mIHJlcGxhY2VGbikge1xuICAgICAgaWYgKHR5cGVvZiByRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IockZuKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyRm4sIHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbik7XG4gICAgICB2YWx1ZSA9IHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSwgc2luZ2xlID0gZmFsc2UpIHtcbiAgaWYgKHJlcGxhY2VGbiAmJiB2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkV4ZWN1dGluZyByZXBsYWNlIGZ1bmN0aW9uOiBcIiwgcmVwbGFjZUZuKTtcbiAgICBjb25zdCByZXBsYWNlRnVuY3Rpb24gPSBGdW5jdGlvbihyZXBsYWNlRm4pO1xuICAgIGlmIChzaW5nbGUpIHJldHVybiB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICAgIHJldHVybiByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKSB7XG4gIGNvbnN0IHtzdG9yYWdlLCBrZXksIGtleUZhbGxiYWNrLCB0eXBlfSA9IHJlcGxhY2VGbjtcbiAgc3dpdGNoIChzdG9yYWdlKSB7XG4gICAgY2FzZSBcInNlc3Npb25cIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBudWxsO1xuICAgICAgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlGYWxsYmFjayk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSBKU09OLnBhcnNlKHJlcGxhY2VWYWwpO1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSByZXBsYWNlVmFsW3JlcGxhY2VWYWwubGVuZ3RoIC0gMV1bdHlwZV07XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkIG5vdCBwYXJzZSAke3JlcGxhY2VWYWx9YCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgICBjYXNlIFwiaW5mby1sYXllclwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5RmFsbGJhY2spO1xuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VyO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gYXN5bmMgKGNvbmRpdGlvbikgPT4ge1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgY29uc3Qge2F0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCBvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGUsIHZhbHVlLCBjaGFpbn0gPSBjb25kaXRpb247XG4gIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbmRpdGlvbkVsZW1lbnRzKSB7XG4gICAgaWYgKGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pKSB7XG4gICAgICBlbGlnaWJsZUVsZW1lbnRzLnB1c2goJChlbGVtZW50KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGlnaWJsZUVsZW1lbnRzO1xufTtcblxuY29uc3QgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciA9IGFzeW5jIChlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFNrdSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KGVsZW1lbnRTa3UpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltvcGVyYXRvcl07XG4gICAgICAvLyBydW5UaW1lVmFsdWUgbWF5IGJlIDBcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHwgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDoge1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiaW1wb3J0IHtzdHlsZUFwcGxpY2F0b3IsIGRlbGF5LCBpZGxlVGltZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtyZXBsYWNlQWxsLCB0dXJraXNoVG9Mb3dlcn0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWSwgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIElETEVfVElNRU9VVH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHJlcGxhY2VyIGZyb20gXCIuL3JlcGxhY2UtdXRpbHNcIjtcbmltcG9ydCBjaGVja0FjdGlvbkNvbmRpdGlvbiBmcm9tIFwiLi9hY3Rpb24tY29uZGl0aW9uLXV0aWxcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb25zKGFjdGlvbnMpIHtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUFwcGx5QWN0aW9uc1wiKTtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBR30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYWN0aW9uOiBcIiwgSlNPTi5zdHJpbmdpZnkoYWN0aW9uKSk7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBhdHRyaWJ1dGUsXG4gICAgICBwcm9kdWN0SW5mb1N0b3JhZ2UsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4pO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVtb3Zpbmc6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkNhbm5vdCBmb3VuZCBlbGVtZW50IHdpdGggc2VsZWN0b3I6IFwiLCBzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGJlZm9yZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBpZiAoU3RyaW5nKHZhbHVlKS5pbmNsdWRlcyhcIm5kLWFkZC10by13aW5cIikpIHtcbiAgICAgICAgICAgICQoXCIubmQtYWRkLXRvLXdpblwiKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWZ0ZXJcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGFmdGVyOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYWZ0ZXIodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXBwZW5kXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGVuZGluZyB2YWx1ZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb2RhbFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIGlmIChlbG0gPT0gZS50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3BsYXlNb2RhbCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBvcHVwXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgIT09IDApIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlBvcHVwIGFscmVhZHkgZGlzcGxheWVkIGluIHNlc3Npb25cIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIFBvcHVwOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHBUeXBlKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImV4aXRJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBleGl0IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbciwgZF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiAhci5pbmNsdWRlcyhkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlkbGVUaW1lcihJRExFX1RJTUVPVVQsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImNvcHlJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBjb3B5IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFwcGVuZCBwb3B1cCB0byBib2R5IGFmdGVyIHRpbWVvdXQgZXhwaXJlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYFR5cGU6ICR7dHlwZX0gbm90IGZvdW5kIGZvciBvcGVyYXRvcjogJHtvcGVyYXRvcn1gKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzZXRhdHRyaWJ1dGVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNldHRpbmcgYXR0cmlidXRlOiBcIiwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgICBjYXNlIFwic3JjXCI6XG4gICAgICAgICAgZWxlbWVudC5jc3MoXCJjb250ZW50XCIsIGB1cmwoJHt2YWx1ZS50cmltKCl9KWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHlWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG5cbiAgICAgICAgICBlbGVtZW50LmNzcyhwcm9wZXJ0eSwgcHJvcGVydHlWYWx1ZSwgXCIhaW1wb3J0YW50XCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmhhbmRsZWQgYXR0cmlidXRlOiBTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kKGA8c2NyaXB0PiR7dmFsdWV9PC9zY3JpcHQ+YCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coYE1vdmluZyAke21vdmVfc2VsZWN0b3JfMX0gdG8gJHttb3ZlX3NlbGVjdG9yXzJ9YCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzb3VyY2UucmVtb3ZlKCk7XG4gICAgICBkZXN0aW5hdGlvbi5wcmVwZW5kKHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJwcm9kdWN0SW5mb0xvb2t1cFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBvcGVyYXRvciBleGlzdHMgeWV0XCIsIG9wZXJhdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpID0+IHtcbiAgICAvLyBnZXQga2V5cyBvZiBwcm9kdWN0SW5mb1xuICAgIGNvbnN0IHNrdUxpc3QgPSBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIgP1xuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wiLCB0cnVlKSA6XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3VMaXN0WzBdKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIGNvbnN0IGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UgPSBhc3luYyAoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFRpdGxlcyA9ICFBcnJheS5pc0FycmF5KHRpdGxlcykgPyBbdGl0bGVzXSA6IHRpdGxlcztcbiAgICBmb3IgKGNvbnN0IHBhcnNlZFRpdGxlIG9mIHBhcnNlZFRpdGxlcykge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBwYXJzZWRUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgIGlmIChpZCAmJiBpZCA9PT0gXCJuZC1wb3B1cF9fd3JhcHBlclwiKSB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKFwibmQtbW9kYWxfX3dyYXBwZXJcIikpIHtcbiAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQb3B1cCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSA+IDApIHJldHVybjtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMSk7XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5kLXBvcHVwX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG5cbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9LCAxNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheU1vZGFsID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKSkgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgaXNNb2RhbD1mYWxzZSkgPT4ge1xuICAgIC8vIENyZWF0ZSBwb3B1cCB3cmFwcGVyXG4gICAgY29uc3QgcG9wdXBXcmFwcGVyID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKTtcbiAgICBpZiAoaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1tb2RhbF9fd3JhcHBlclwiKTtcbiAgICBpZiAoIWlzTW9kYWwpIHBvcHVwV3JhcHBlci5pZCA9IFwibmQtcG9wdXBfX3dyYXBwZXJcIjtcblxuICAgIC8vIENyZWF0ZSBwb3B1cCBjbG9zZSBidXR0b25cbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b25TdHlsZSA9IGlzTW9kYWwgPyBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VfX2NvbG9yZWRcIiA6IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZVwiO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChwb3B1cENsb3NlQnV0dG9uU3R5bGUpO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgaWYgKGlzTW9kYWwpIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGVudFNlbGVjdG9yKSk7XG4gICAgICB3aGlsZSAodmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIGNvbnRlbnRzLnNoaWZ0KCkuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgZnJvbSBhY3Rpb24gYW5kIGFwcGVuZCBjbG9zZSBidXR0b25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBwb3B1cCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlQnV0dG9uKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBwb3B1cCBpZiBleGlzdHMgYmVmb3JlIGFwcGVuZGluZyBuZXcgb25lXG4gICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2FwTm9kZXMgPSBmdW5jdGlvbiBzd2FwTm9kZXMobjEsIG4yKSB7XG4gICAgY29uc3QgcDEgPSBuMS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHAyID0gbjIucGFyZW50Tm9kZTtcbiAgICBsZXQgaTE7XG4gICAgbGV0IGkyO1xuXG4gICAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAxLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4xKSkge1xuICAgICAgICBpMSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcbiAgICAgICAgaTIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xuICAgICAgaTIrKztcbiAgICB9XG4gICAgcDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcbiAgfTtcblxuICBjb25zdCB3YWl0Rm9ySlF1ZXJ5ID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJqUXVlcnkgbm90IGZvdW5kLCByZXRyeWluZ1wiKTtcbiAgICAgICAgY29uc3QgalF1ZXJ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25BcHBsaWNhdG9yID0gYXN5bmMgKGFjdGlvbnMpID0+IHtcbiAgICBpZiAoYXdhaXQgd2FpdEZvckpRdWVyeSgpKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3Rpb24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGFwcGx5QWN0aW9ucyBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgVFJFQVRNRU5UX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGRldGVybWluZVBjdCxcbiAgcHJlcGFyZUFjdGlvbnMsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtNdXRleH0gZnJvbSBcImFzeW5jLW11dGV4XCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSb2JvdEVuZ2luZVwiKTtcbmNvbnN0IE9CU0VSVkVSX0NPTkZJRyA9IHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2JvdEVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7ZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsIGRlYnVnTW9kZSwgbWF0Y2hlZFRyZWF0bWVudHMsIGlkZW50aWZpZXIsIHBhZ2VUeXBlfSA9IGJvZHk7XG4gICAgdGhpcy5lbmdhZ2VtZW50TG9jayA9IHt9O1xuICAgIHRoaXMucGFnZVR5cGUgPSBwYWdlVHlwZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IGRlYnVnTW9kZTtcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xuICAgIHRoaXMucmVBcHBseVRyZWF0bWVudHNNYXAgPSB7fTtcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzID0gW107XG4gICAgdGhpcy5tYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cztcbiAgICB0aGlzLmlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3RzKCkge1xuICAgIGNvbnN0IHJvYm90UHJvbWlzZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodHJlYXRtZW50LmRlcGVuZGFudF9vbl90cmVhdG1lbnQpIGNvbnRpbnVlO1xuICAgICAgICByb2JvdFByb21pc2VzLnB1c2godGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBlbmdhZ2luZyByb2JvdCAke3RyZWF0bWVudC5pZH06ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChyb2JvdFByb21pc2VzKTtcbiAgICB0aGlzLmluaXRpYXRlUmVhcHBseVJvYm90TWFwKCk7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGFjdGlvbnMsXG4gICAgICBlbGlnaWJpbGl0eVJ1bGVTZXQsXG4gICAgICBkZXZpY2UsXG4gICAgICBkZXBlbmRhbnRfb25fdHJlYXRtZW50LFxuICAgICAgYnVzaW5lc3NSdWxlU2V0LFxuICAgICAgd2VpZ2h0LFxuICAgICAgZGVsYXksXG4gICAgICBoZWxwZXJzLFxuICAgIH0gPSB0cmVhdG1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgZGVidWdNb2RlLFxuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBlbmdhZ2VtZW50TG9jayxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBpc01vYmlsZSxcbiAgICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgICAgcHJlcGFyZUFuZEFwcGx5LFxuICAgIH0gPSB0aGlzO1xuXG4gICAgLy8gb25lIGVuZ2FnZW1lbnQgYXQgYSB0aW1lXG4gICAgZW5nYWdlbWVudExvY2tbaWRdID0gZW5nYWdlbWVudExvY2tbaWRdIHx8IG5ldyBNdXRleCgpO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBlbmdhZ2VtZW50TG9ja1tpZF0uYWNxdWlyZSgpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGVidWdNb2RlICYmIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzICYmICFkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ21vYmlsZScgbWlzbWF0Y2hcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdkZXNrdG9wJyBtaXNtYXRjaFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgYmFzZSBydWxlIHNldCBjaGVjayBmb3IgdHJlYXRtZW50OiBcIiArIGlkKTtcbiAgICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgICBjb25zdCB0cmVhdG1lbnRTa2lwUmF0aW8gPSB3ZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gd2VpZ2h0IHx8IFRSRUFUTUVOVF9SQVRJTyk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgc2tpcCByYXRpbzogXCIgKyB0cmVhdG1lbnRTa2lwUmF0aW8pO1xuICAgICAgICAvLyBEZXRlcm1pbmluZyBpZGVudGlmaWVyIGZvciBjYWxjdWxhdGluZyB0cmVhdG1lbnQgcGVyY2VudGFnZSAodHJlYXRtZW50UGN0KVxuICAgICAgICBjb25zdCBkZXRlcm1pbmluZ0lkZW50aWZpZXIgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50IHx8IGlkO1xuXG4gICAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIHRyZWF0bWVudCB1c2VkIHRvIGRldGVybWluZSBpZiBpdCBzaG91bGQgYmUgc2tpcHBlZCBvciBub3RcbiAgICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIDEwMCB3aGVuIGRlYnVnIG1vZGUgaXMgMSwgZW5zdXJpbmcgbm8gdHJlYXRtZW50cyBhcmUgc2tpcHBlZFxuICAgICAgICBjb25zdCB0cmVhdG1lbnRQY3QgPSBkZWJ1Z01vZGUgPT09IDEgPyAxMDAgOiBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIGRldGVybWluaW5nSWRlbnRpZmllcik7XG4gICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnRQY3Q6IFwiICsgdHJlYXRtZW50UGN0ICsgYCB3aXRoIGRlYnVnIG1vZGUgJHtkZWJ1Z01vZGUgPyBcIm9uXCIgOiBcIm9mZlwifWApO1xuICAgICAgICBsZXQgYnVzaW5lc3NSdWxlSWQgPSBudWxsO1xuICAgICAgICBpZiAoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICAgIGJ1c2luZXNzUnVsZUlkID0gYXdhaXQgdGhpcy5jaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJBcHBseWluZyB0cmVhdG1lbnQgd2l0aCBkZWZhdWx0IHZhbHVlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJlYXRtZW50UGN0IDwgdHJlYXRtZW50U2tpcFJhdGlvKSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgVHJlYXRtZW50ICR7aWR9IHNraXBwZWQgZHVlIHRvIHRyZWF0bWVudCBzcGxpdCByYXRpb2ApO1xuICAgICAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIG51bGwsIFwic2tpcHBlZFwiLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZUhlbHBlcnMoaGVscGVycywgbWF0Y2hlZFRyZWF0bWVudHMpO1xuICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgY2hlY2sgZmFpbGVkIGZvciB0cmVhdG1lbnQ6XCIsIGlkKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmVsZWFzZSgpO1xuICAgICAgdGhpcy5hZGRSZWFwcGx5RXZlbnQodHJlYXRtZW50KTtcbiAgICAgIHRoaXMuYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBlbmdhZ2VIZWxwZXJzKGhlbHBlcnMsIG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGVscGVycykgJiYgaGVscGVycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhlbHBlclJvYm90UHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIG1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICAgIGlmICghaGVscGVycy5pbmNsdWRlcyh0cmVhdG1lbnQuaWQpKSBjb250aW51ZTtcbiAgICAgICAgaGVscGVyUm9ib3RQcm9taXNlcy5wdXNoKHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChoZWxwZXJSb2JvdFByb21pc2VzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpIHtcbiAgICBjb25zdCBbcHJlcGFyZWQsIHZhcmlhbnRdID0gYXdhaXQgcHJlcGFyZUFjdGlvbnMoaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkKTtcbiAgICBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiYXBwbGllZFwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRSZWFwcGx5RXZlbnQodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge3BhZ2VUeXBlLCByZUFwcGx5VHJlYXRtZW50c01hcH0gPSB0aGlzO1xuICAgIGNvbnN0IHtpZCwgcmVhcHBseV9ldmVudCwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGV9ID0gdHJlYXRtZW50O1xuICAgIGlmIChyZWFwcGx5X2V2ZW50KSB7XG4gICAgICBpZiAoIXJlYXBwbHlfZXZlbnRfcGFnZV90eXBlIHx8IHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlID09PSBwYWdlVHlwZSkge1xuICAgICAgICBsZXQgcmVhcHBseV9ldmVudF9hcnJheSA9IHJlYXBwbHlfZXZlbnQ7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWFwcGx5X2V2ZW50KSkgcmVhcHBseV9ldmVudF9hcnJheSA9IFtyZWFwcGx5X2V2ZW50XTtcbiAgICAgICAgbG9nZ2VyLmxvZyhgUmVhcHBseSBldmVudCAnJHtyZWFwcGx5X2V2ZW50fScgZm91bmQgZm9yIHRyZWF0bWVudDogJHtpZH1gKTtcbiAgICAgICAgZm9yIChjb25zdCByZWFwcGx5RXZlbnQgb2YgcmVhcHBseV9ldmVudF9hcnJheSkge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID9cbiAgICAgICAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gOiBbXTtcbiAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgYWxyZWFkeSBhZGRlZCBmb3IgcmVhcHBseSBldmVudFwiKTtcbiAgICAgICAgICB9IGVsc2UgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA9IFsuLi5wcmV2aW91c1ZhbHVlLCBpZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpIHtcbiAgICBjb25zdCB7cmVBcHBseVRyZWF0bWVudHNNYXAsIG1hdGNoZWRUcmVhdG1lbnRzfSA9IHRoaXM7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVBcHBseVRyZWF0bWVudHNNYXApKSB7XG4gICAgICBjb25zdCB0cmVhdG1lbnRJZHMgPSByZUFwcGx5VHJlYXRtZW50c01hcFtrZXldO1xuICAgICAgY29uc3QgcmVBcHBseVRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKHQpID0+IHRyZWF0bWVudElkcy5pbmNsdWRlcyh0LmlkKSk7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiaW5maW5pdGVfc2Nyb2xsXCI6IHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW5maW5pdGVfc2Nyb2xsYCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGltZW91dFwiOiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gdGltZW91dGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5U2VsZWN0b3JMaXN0ID0gQXJyYXkuaXNBcnJheSh0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvcikgP1xuICAgICAgICAgICAgICAgIHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yIDogW3RyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgcmVhcHBseVNlbGVjdG9yTGlzdCkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBlbGVtZW50X2NoYW5nZWApO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib25fc2Nyb2xsXCI6IHtcbiAgICAgICAgICAvLyBhZGQgd2luZG93IHNjcm9sbCBsaXN0ZW5lciwgY2FsbCBlbmdhZ2VSb2JvdCBvbiBzY3JvbGwsIGRvIG5vdCB0cmlnZ2VyIG1vcmUgdGhhbiBvbmNlIHBlciAyNTBtc1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRpbWUgPSAwO1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgaWYgKG5vdyAtIGxhc3RTY3JvbGxUaW1lID4gMjUwICYmIE1hdGguYWJzKGxhc3RTY3JvbGxUb3AgLSBzdCkgPiA1KSB7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIG9uX3Njcm9sbGApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicXVlcnlfc2VhcmNoX2NoYW5nZVwiOiB7XG4gICAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoICE9PSBxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHF1ZXJ5X3NlYXJjaF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlcnZhbFwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgaWYgKGFwcGxpZWQ/Llt0cmVhdG1lbnQuaWRdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbnRlcnZhbGApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgIH0sIDI1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImluZm9fbGF5ZXJfY2hhbmdlXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgICAgICAgICBhZGREYXRhTGlzdGVuZXIodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJlYXBwbHkgZXZlbnQgbm90IGZvdW5kOiBcIiwga2V5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlU2V0ID0gW10sIGJ1c2luZXNzUnVsZVNldCA9IFtdLCBpZH0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMuaW5jbHVkZXMoaWQpKSByZXR1cm47XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKFsuLi5lbGlnaWJpbGl0eVJ1bGVTZXQsIC4uLmJ1c2luZXNzUnVsZVNldF0pO1xuICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihgX19lUnVsZXMuJHtzZWxlY3Rvcn1gLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgfVxuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMucHVzaChpZCk7XG4gIH1cblxuICBleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGVTZXQsIHByZXZpb3VzU2VsZWN0b3JzID0gbnVsbCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHByZXZpb3VzU2VsZWN0b3JzIHx8IFtdO1xuICAgIGZvciAobGV0IHJ1bGUgb2YgcnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBydWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChydWxlLnN0YXJ0c1dpdGgoXCIhXCIpKSBydWxlID0gcnVsZS5zbGljZSgxKTtcbiAgICAgICAgc2VsZWN0b3JzLnB1c2gocnVsZS5zcGxpdChcIi5cIilbMF0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlLnNldCwgc2VsZWN0b3JzKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi4obmV3IFNldChzZWxlY3RvcnMpKV07XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSkge1xuICAgIGxvZ2dlci5sb2coYENoZWNraW5nIGVsaWdpYmlsaXR5ICR7ZWxpZ2liaWxpdHlSdWxlfWApO1xuICAgIGxldCBvcHBvc2l0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgW2VsaWdpYmlsaXR5U2NvcGUsIGVsaWdpYmlsaXR5TmFtZV0gPSBlbGlnaWJpbGl0eVJ1bGUuc3BsaXQoXCIuXCIpO1xuICAgIGlmIChlbGlnaWJpbGl0eVNjb3BlLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBvcHBvc2l0ZUZsYWcgPSB0cnVlO1xuICAgICAgZWxpZ2liaWxpdHlTY29wZSA9IGVsaWdpYmlsaXR5U2NvcGUuc2xpY2UoMSk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7ZWxpZ2liaWxpdHlTY29wZX1gKTtcbiAgICBpZiAoIXJlcyB8fCAhQXJyYXkuaXNBcnJheShyZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9wcG9zaXRlRmxhZyAmJiByZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghb3Bwb3NpdGVGbGFnICYmICFyZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGxvZ2dlci5sb2coYCR7ZWxpZ2liaWxpdHlSdWxlfSBpcyBlbGlnaWJsZWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0LCBlbGlnaWJpbGl0eVNldFR5cGUgPSBudWxsLCBwcmV2aW91c0lzRWxpZ2libGUgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJvYm90IGVsaWdpYmlsaXR5XCIpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFbGlnaWJpbGl0eSBSdWxlIFNldCAke2VsaWdpYmlsaXR5UnVsZVNldH0gaXMgbm90IGFuIGFycmF5YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpc0VsaWdpYmxlID0gcHJldmlvdXNJc0VsaWdpYmxlO1xuICAgIGZvciAoY29uc3QgZWxpZ2liaWxpdHlSdWxlIG9mIGVsaWdpYmlsaXR5UnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaWYgKGlzRWxpZ2libGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzd2l0Y2ggKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSAmJiBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIGVsaWdpYmlsaXR5U2V0VHlwZTogXCIsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlLnNldCwgZWxpZ2liaWxpdHlSdWxlLnR5cGUsIGlzRWxpZ2libGUpO1xuICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzRWxpZ2libGU7XG4gIH1cblxuICAvLyBSZXR1cm4gaW5kZXggb2YgYnVzaW5lc3NSdWxlLCB0aGlzIGlzIHRoZSBidXNpbmVzc1J1bGVJZFxuICBhc3luYyBjaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGJ1c2luZXNzUnVsZV0gb2YgYnVzaW5lc3NSdWxlU2V0LmVudHJpZXMoKSkge1xuICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoW2J1c2luZXNzUnVsZV0pKSByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBUcmVhdG1lbnRSZXBvc2l0b3J5IGZyb20gXCIuLi9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4vcm9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU9uQ29tcG9uZW50XCIpO1xuXG5jb25zdCBiZWFnbGVPbiA9IGFzeW5jIChpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKSA9PiB7XG4gIGNvbnN0IHBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UgPSBTdG9yZS5nZXRJbnN0YW5jZSgpLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xuXG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlID0gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG4gIGNvbnN0IHRyZWF0bWVudFdlaWdodHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRXZWlnaHRzKCk7XG5cbiAgaW5qZWN0U3R5bGVTaGVldCgpO1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcygpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJvbi1pbml0XCIpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IG51bGw7XG4gIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICBzZWFyY2hQYXJhbXMuaW5kZXhPZihcIltcIikgKyAxLFxuICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgfVxuXG4gIGNvbnN0IFt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICB0cmVhdG1lbnRzUHJvbWlzZSwgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UsXG4gIF0pO1xuXG4gIGlmICghdHJlYXRtZW50cyB8fCAhdHJlYXRtZW50V2VpZ2h0cykge1xuICAgIGxldCBtID0gXCJcIjtcbiAgICBpZiAoIXRyZWF0bWVudHMpIG0gPSBtICsgXCJuby1yb2JvdHNcIjtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIG0gPSBtID09PSBcIlwiID8gXCJuby1yb2JvdC13ZWlnaHRzXCIgOiBcIiAtIG5vLXJvYm90LXdlaWdodHNcIjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgbSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHMvd2VpZ2h0c1wiKTtcbiAgfVxuICBsb2dnZXIuc3VjY2VzcyhcIkZvdW5kIHRyZWF0bWVudHM6IFwiLCB0cmVhdG1lbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC10cmVhdG1lbnRzXCIpO1xuXG4gIGNvbnN0IHRyZWF0bWVudFJlcG9zaXRvcnkgPSBuZXcgVHJlYXRtZW50UmVwb3NpdG9yeSh7XG4gICAgdHJlYXRtZW50cyxcbiAgICB0cmVhdG1lbnRXZWlnaHRzLFxuICB9KTtcblxuICBjb25zdCBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IHRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoZGVidWdNb2RlKTtcbiAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzID09PSBudWxsKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwibm8tdXNlci1zZWdtZW50XCIpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIW1hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aCkge1xuICAgIGxvZ2dlci5sb2coXCJObyB0cmVhdG1lbnRzIG1hdGNoZWQsIHJldHVybmluZyB3aXRob3V0IGZ1cnRoZXIgYWN0aW9uXCIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm5vLXJvYm90LW1hdGNoZWRcIik7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZvdW5kLW1hdGNoZWQtcm9ib3RzXCIpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2U7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm5vLXJ1bGVzLWFzc2Vzc2VkXCIpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBhc3NlcyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJydWxlcy1hc3Nlc3NlZFwiKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwcm9kdWN0LWludG8tbm8tcGVyc2lzdFwiKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGVyc2lzdCBwcm9kdWN0IGluZm9cIik7XG4gIH1cblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJlbmdhZ2luZy1yb2JvdHNcIik7XG4gIGNvbnN0IHJvYm90RW5naW5lID0gbmV3IFJvYm90RW5naW5lKHtcbiAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyxcbiAgICBkZWJ1Z01vZGUsXG4gICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgaWRlbnRpZmllcixcbiAgICBwYWdlVHlwZSxcbiAgfSk7XG4gIGF3YWl0IHJvYm90RW5naW5lLmVuZ2FnZVJvYm90cygpO1xuICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwicm9ib3RzLWVuZ2FnZWRcIik7XG4gIGxvZ2dlci5zdWNjZXNzKFwiQXBwbGllZCB0cmVhdG1lbnRzOiBcIiwgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIikpO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGluZy1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IFJ1bGVFbmdpbmUuZ2V0RWxpZ2liaWxpdHlSdWxlcygpO1xuICBpZiAoIWVsaWdpYmlsaXR5UnVsZXMpIHJldHVybjtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgY29uc3QgcnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtlbGlnaWJpbGl0eVJ1bGVzfSk7XG4gIGF3YWl0IHJ1bGVFbmdpbmUuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImFzc2Vzc2VkLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xufVxuZXhwb3J0IGRlZmF1bHQgYmVhZ2xlT247XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBNb25pdG9yIGZyb20gXCIuLi9CZWFnbGVNb25pdG9yL2luZGV4XCI7XG5pbXBvcnQgYmVhZ2xlT24gZnJvbSBcIi4uL0JlYWdsZU9uXCI7XG5pbXBvcnQge1xuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgU1BMSVRfUkFUSU8sXG4gIFNFU1NJT05fU1RPUkFHRV9LRVlTLFxuICBMT0NBTF9TVE9SQUdFX0tFWVMsXG4gIE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OLFxuICBWRVJTSU9OLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBnZXRJZGVudGlmaWVyLFxuICByZW1vdmVEb2N1bWVudEhpZGUsXG4gIGRldGVybWluZVBjdCxcbiAgZ2V0RGVidWdNb2RlLFxuICBzd2l0Y2hUb0Vhc2VPdXQsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5sZXQgU0hVVERPV04gPSBmYWxzZTtcblxuKGFzeW5jIGZ1bmN0aW9uKCkge1xuICBzd2l0Y2hUb0Vhc2VPdXQoKTtcbiAgbGV0IG1vbml0b3IgPSBudWxsO1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIGluaXRpYWxpemluZ1wiKTtcbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cbiAgbGV0IGVhcmx5TG9nU2VudCA9IGZhbHNlO1xuICBsZXQgaGlkZVJlbW92ZWQgPSBmYWxzZTtcblxuICB0cnkge1xuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gSU5JVCBUQVNLUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IGluaXRpYWxpemluZ1wiKTtcbiAgICBtb25pdG9yID0gbmV3IE1vbml0b3IoKTtcbiAgICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyKCk7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IGF3YWl0IGdldElkZW50aWZpZXIoKTtcbiAgICBsb2dnZXIubG9nKFwiRm91bmQgaWRlbnRpZmllcjogXCIsIGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiLCBpZGVudGlmaWVyKTtcbiAgICBjb25zdCBjb29raWVQY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiwgY29va2llUGN0KTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiwgRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidlwiLCBWRVJTSU9OKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNyXCIsIFNQTElUX1JBVElPKTtcblxuICAgIC8vIGRhdGEtbGVzcyBsb2cgdG8gZGV0ZWN0IGJvdW5jZXNcbiAgICBhd2FpdCBtb25pdG9yLnBhY2tBbmRRdWV1ZUFycml2YWxMb2coKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIH0sIDIwMDApO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEVBUkxZIFBSVU5FIE9VVC1PRi1TQ09QRSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGNvbnN0IG9vc1JlYXNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFKTtcblxuICAgIC8vIGlmIGNhbm5vdCBnZXQgY3JpdGljYWwgaW5mbywgbWFrZSBvdXQgb2Ygc2NvcGUgYW5kIHVuc3VwcG9ydGVkXG4gICAgaWYgKFxuICAgICAgY29va2llUGN0ID09PSBudWxsIHx8XG4gICAgICAhbmF2aWdhdG9yLnNlbmRCZWFjb24gfHxcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICB0eXBlb2YgU3RyaW5nPy5wcm90b3R5cGU/LnBhZFN0YXJ0ICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcInVuc3VwcG9ydGVkXCIpXG4gICAgKSB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ1bnN1cHBvcnRlZFwifSk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSwgXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgZGV2aWNlXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWQtZGV2aWNlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTGFiZWxTZW50ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19MQUJFTF9TRU5UKTtcbiAgICBjb25zdCB0aW1lb3V0Q291bnRlciA9IHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCkpIHx8IDA7XG5cbiAgICAvLyBjaGVjayBpZiBkZWJ1ZyBtb2RlIGlzIG9uLCBhbHNvIGFkZHMgZGJtIHRvIGJlYWdsZUluZm9MYXllciBhbmQgc2V0cyBvb3NSZWFzb25cbiAgICBjb25zdCBkZWJ1Z01vZGUgPSBnZXREZWJ1Z01vZGUoXCJlbXBsb3llZVwiKTtcblxuICAgIC8vIGlmIHRpbWVkLW91dCB0b28gbWFueSB0aW1lcyBmb3IgdmVyeSBmaXJzdCBpbnRlcmFjdHNpb25zLCBtYWtlIG91dCBvZiBzY29wZSBmb3IgdGhlIHNlc3Npb25cbiAgICBpZiAoIWRlYnVnTW9kZSAmJiAhb29zUmVhc29uICYmICFpc0xhYmVsU2VudCAmJiB0aW1lb3V0Q291bnRlciA+IE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OXG4gICAgKSB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ1bnN1cHBvcnRlZFwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtYXgtdGltZW91dFwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBRE1JTiBVU0VSIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVuYW1lIHNob3dyb29tIGxvZ2ljIHRvIGFkbWluLCBhbmQgbWFwIHZ2c0lzU2hvd3Jvb20gdG8gYSBjb25maWd1cmFibGUgYWRtaW4gcGFyYW1cblxuICAgIC8vIGlmIGFkbWluIHVzZXIsIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCBtYXJrIGFzIGVtcGxveWVlXG4gICAgY29uc3QgcHJvY2Vzc0FkbWluVXNlciA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcImVtcGxveWVlXCIpO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgdHJ1ZSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IGFkbWluXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWRtaW4tZW1wbG95ZWVcIik7XG4gICAgfTtcblxuICAgIGxldCBpc0FkbWluID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTik7XG4gICAgLy8gaWYgbm90IGZvdW5kIGluIGxvY2FsU3RvcmFnZSwgY2hlY2sgYmVhZ2xlSW5mb0xheWVyIHdpdGggYmxvY2tpbmcgbWRvZVxuICAgIGlmIChpc0FkbWluID09PSBudWxsIHx8IGlzQWRtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNBZG1pbiA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgIC8vIHBlcm1hbmVudCBsYWJlbCBjYW4gYmUgZmFsc2UsIGJ1dCBhZG1pbiB1c2VyIGNhbiBzdGlsbCBsb2dpbiBhbmQgdHVybiB0cnVlLCBsYXppbHkgZml4IHRoaXNcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IFwiZmFsc2VcIiB8fCBpc0FkbWluID09PSBmYWxzZSkge1xuICAgICAgLy8gYXN5bmMgY2FsbCB0byBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCB0aGVuIHNldCBsb2NhbFN0b3JhZ2VcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpLnRoZW4oKGlzQWRtaW4pID0+IHtcbiAgICAgICAgaWYgKGlzQWRtaW4gJiYgKGlzQWRtaW4gPT09IFwidHJ1ZVwiIHx8IGlzQWRtaW4gPT09IHRydWUpKSB7XG4gICAgICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgIHByb2Nlc3NBZG1pblVzZXIoKTtcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IG51bGwgfHwgaXNBZG1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1hZG1pbi1zdGF0dXNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtZWFzZVwiKSkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5ULCB0aW1lb3V0Q291bnRlciArIDEpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYW50aS1mbGlja2VyLXRpbWVvdXRcIik7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBPTi9PRkYgQ0hFQ0sgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIGlzT24gY2FuIGJlIHRydWUgKE9OKSwgZmFsc2UgKE9GRilcbiAgICBsZXQgaXNPbiA9IG51bGw7XG5cbiAgICBpZiAoZGVidWdNb2RlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRGVidWcgbW9kZSBvbjogYWxsIGFwcGxpY2FibGUgdHJlYXRtZW50cyB3aWxsIGJlIGFwcGxpZWRcIik7XG4gICAgICBpc09uID0gdHJ1ZTtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJlbXBsb3llZVwiKSB7XG4gICAgICBsb2dnZXIud2FybihcIlVzZXIgaXMgb3V0IG9mIHNjb3BlXCIpO1xuICAgICAgLy8gc2V0IGlzT24gdG8gdHJ1ZS9mYWxzZSB3aGVuIG5vdCBkZWJ1Z01vZGUgYnV0IG91dCBvZiBzY29wZSBpLmUuIG5kX2RlYnVnPTAgZm9yIHRlc3RhYmlsaXR5XG4gICAgICBpc09uID0gY29va2llUGN0ID49IFNQTElUX1JBVElPO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24pIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdW5rbm93blwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gb3V0IG9mIHNjb3BlIHJlYXNvblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIFNQTElUX1JBVElPLCB0aGVuIGluIE9OIG1vZGVcbiAgICAgIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8pIHtcbiAgICAgICAgaXNPbiA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInRydWVcIn0pO1xuICAgICAgfSBlbHNlIGlmIChjb29raWVQY3QgPj0gU1BMSVRfUkFUSU8vMikge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMlwifSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImZhbHNlMVwifSk7XG4gICAgICB9XG5cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiaXNPblwiLCBpc09uKTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfTEFCRUxfU0VOVCwgdHJ1ZSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgaXNPbi50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFktUFJPQ0VTUyBDT05WRVJTSU9OID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gYXdhaXQgY3JpdGljYWwgaW5mbyBiZWZvcmUgc2VuZGluZyBsb2dzIGZvciBwcm9wZXIgYW5hbHl0aWNzIG1lYXN1cmVtZW50c1xuICAgIGNvbnN0IHBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIGlmIChwYWdlVHlwZSA9PT0gXCJwdXJjaGFzZVwiKSB7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucmV2ZW51ZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgLy8gc2VuZCBsb2dzIGltbWVkaWF0ZWx5IG9uIHB1cmNoYXNlIHBhZ2UsIGFuZCBmb3JjZSB3YWl0XG4gICAgICBhd2FpdCBtb25pdG9yLnNlbmRMb2dzKHRydWUpO1xuICAgICAgLy8gaWYgcHVyY2hhc2UgaXMgY29tcGxldGUsIGRvIG5vdCBhcHBseSBhbnkgdHJlYXRtZW50cyBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIFNIVVRET1dOID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2VuZCBsb2dzIHdoZW4gcmVhZHksIHN0YXJ0IHNjcmFwaW5nIGFuZCBzZW5kaW5nIGFzeW5jbHlcbiAgICAgIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIH1cbiAgICBlYXJseUxvZ1NlbnQgPSB0cnVlO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFJPQk9UIFBBVEhzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGlmIChpc09uID09PSB0cnVlKSB7XG4gICAgICBpZiAoIVNIVVRET1dOKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJCZWFnbGUgT04gR3JvdXAgUGF0aFwiKTtcbiAgICAgICAgYmVhZ2xlT24oaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBPTiBHcm91cCBTSFVURE9XTiBQYXRoXCIpO1xuICAgICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgICAgaGlkZVJlbW92ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPbiA9PT0gZmFsc2UpIHtcbiAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9GRiBHcm91cCBQYXRoXCIpO1xuICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlzT24gaXMgdW5kZWZpbmVkIG9yIG51bGxcIik7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybihcIkJlYWdsZSBFYXJseSBTY29wZS1vdXQgb3IgRVJST1I6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIGVyci5tZXNzYWdlKTtcbiAgICBpZiAoIWVhcmx5TG9nU2VudCAmJiBtb25pdG9yKSBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICBpZiAoIWhpZGVSZW1vdmVkKSByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgfVxufSkoKTtcbiJdLCJuYW1lcyI6WyJyZXBsYWNlQWxsIiwic3RyIiwiZmluZCIsInJlcGxhY2UiLCJpbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJ0dXJraXNoVG9Mb3dlciIsInN0cmluZyIsImxldHRlcnMiLCJsZXR0ZXIiLCJ0b0xvd2VyQ2FzZSIsImlzU3RhZ2luZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluY2x1ZGVzIiwiVkVSU0lPTiIsIkNPT0tJRV9OQU1FIiwiVFJFQVRNRU5UU19MT0NBVElPTiIsIlRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OIiwiU1RZTEVTSEVFVF9MT0NBVElPTiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIkVfUlVMRVNfTE9DQVRJT04iLCJQUk9EVUNUX0lORk9fTE9DQVRJT04iLCJMT0dfQVBJX1VSTCIsIkxPT0tVUF9BUElfVVJMIiwiTU9CSUxFX01FRElBX1FVRVJZIiwiU1BMSVRfUkFUSU8iLCJUUkVBVE1FTlRfUkFUSU8iLCJUUkVBVE1FTlRTX0RVUkFUSU9OIiwiTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04iLCJMSVNUX01PREVfQkVBR0xFX0tFWVMiLCJJRExFX1RJTUVPVVQiLCJTRVNTSU9OX1NUT1JBR0VfS0VZUyIsIlNFU1NJT05fVElNRVNUQU1QIiwiU0VTU0lPTl9ISVNUT1JZIiwiVFJFQVRNRU5UUyIsIlBPUFVQX0RJU1BMQVlfRkxBRyIsIlNLVV9JTkZPX0JBU0tFVCIsIlRJTUVPVVRfQ09VTlQiLCJTRVNTSU9OX1JFRkVSUkVSIiwiV0VJR0hUUyIsIkVMSUdJQklMSVRZX1JVTEVTIiwiTUFUQ0hFRF9UUkVBVE1FTlRTIiwiTE9DQUxfU1RPUkFHRV9LRVlTIiwiREVCVUdfTU9ERSIsIk9VVF9PRl9TQ09QRSIsIklTX0xBQkVMX1NFTlQiLCJVU0VSX0lEIiwiREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRSIsIklTX0FETUlOIiwiQ1VTVE9NX1NUT1JBR0VfUFJFRklYIiwiTG9nZ2VyIiwib3JpZ2luIiwidGVzdGluZyIsIkRFQlVHIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFyZ3MiLCJjb25zb2xlIiwiaW5mbyIsImxvZyIsIm1lc3NhZ2VDb25maWciLCJmb3JFYWNoIiwiYXJndW1lbnQiLCJ0eXBlIiwid2FybiIsImVycm9yIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJsb2dnZXIiLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJ0b3AiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInN3aXRjaFRvRWFzZU91dCIsImVsIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwicHJlcGVuZCIsImFkZCIsImZldGNoVHJlYXRtZW50cyIsImZldGNoUGx1cyIsInRyZWF0bWVudHMiLCJFcnJvciIsImpzb24iLCJqc29uVHJlYXRtZW50IiwiZmFpbGVkIiwibWVzc2FnZSIsImZldGNoVHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudFdlaWdodHMiLCJqc29uVHJlYXRtZW50V2VpZ2h0cyIsImZldGNoRWxpZ2liaWxpdHlSdWxlcyIsImVsaWdpYmlsaXR5UnVsZXMiLCJqc29uRWxpZ2liaWxpdHlSdWxlcyIsImZldGNoUHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mbyIsInByb2R1Y3RJbmZvSnNvbiIsInRpbWVvdXQiLCJ0aW1lIiwiY29udHJvbGxlciIsIkFib3J0Q29udHJvbGxlciIsInNldFRpbWVvdXQiLCJhYm9ydCIsInVybCIsIm9wdGlvbnMiLCJyZXRyaWVzIiwiZmV0Y2giLCJzaWduYWwiLCJ0aGVuIiwicmVzIiwib2siLCJzdGF0dXMiLCJjYXRjaCIsImV4dHJhY3RDb29raWVJZGVudGlmaWVyIiwiY29va2llU3RyaW5nIiwiY29va2llTmFtZSIsInBhcnNlZCIsInNwbGl0IiwibWFwIiwidiIsInJlZHVjZSIsImFjYyIsImRlY29kZVVSSUNvbXBvbmVudCIsInRyaW0iLCJpZGVudGlmaWVyIiwiaWRlbnRpZmllckluZGV4IiwiZGV0ZXJtaW5lUGN0IiwiaGFzaCIsImdldFVuc2VjdXJlSGFzaCIsInBjdCIsImV4aXRTY3JvbGxMaXN0ZW5lciIsImNhbGxCYWNrIiwibG9vcCIsInNjcm9sbFRvcCIsImxhc3RTY3JvbGxUb3AiLCJjbGVhckludGVydmFsIiwiZXhpdFNjcm9sbEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJzdHlsZUFwcGxpY2F0b3IiLCJlbGVtZW50cyIsInN0eWxlQ2hhbmdlc01hcCIsImkiLCJlbGVtZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInZhbHVlIiwic3R5bGUiLCJpbmplY3RTdHlsZVNoZWV0Iiwic3R5bGVTaGVldCIsInJlbCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInByZXBhcmVBY3Rpb25zIiwiYWN0aW9uc1RvUHJlcGFyZSIsImJ1c2luZXNzUnVsZUlkIiwiZGVidWdNb2RlIiwiYWN0aW9ucyIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInZhcmlhbnQiLCJhY3Rpb24iLCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMiLCJ2YXJpYW50cyIsImJ1c2luZXNzVHJhbnNmb3JtYXRpb24iLCJpZCIsImtleXMiLCJ2YXJpYW50S2V5IiwicmFuZG9tUGN0Iiwid2VpZ2h0IiwiTWF0aCIsImZsb29yIiwiaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMiLCJwb3B1cERpc3BsYXlGbGFnIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXNzaW9uVGltZXN0YW1wIiwic2Vzc2lvbkhpc3RvcnkiLCJzZXRJdGVtIiwibm93IiwicGF0aG5hbWUiLCJjb25kaXRpb25DaGVja2VyIiwicnVuVGltZVZhbHVlIiwiY29uZGl0aW9uIiwic3VjY2VzcyIsInVuZGVmaW5lZCIsIm1pbiIsIm1heCIsInBhcnNlSW50IiwicmVnZXgiLCJSZWdFeHAiLCJ0ZXN0IiwiZ2V0RGVidWdNb2RlIiwib29zUmVhc29uIiwicXVlcnlTdHJpbmciLCJzZWFyY2giLCJyZW1vdmVJdGVtIiwiY3VycmVudCIsImdldEdhQ2xpZW50SWQiLCJnYSIsImdldEFsbCIsInRyYWNrZXJzIiwiZ2V0IiwiY2hhciIsImNoYXJDb2RlQXQiLCJhYnMiLCJnZXRSYW5kb21JbnQiLCJyYW5kb20iLCJnZXRVbml4VGltZSIsImdldElkZW50aWZpZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsImV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwiLCJlIiwiZGVsYXkiLCJtcyIsImZvcm1hdERlbGl2ZXJ5RGF0ZSIsImRhdGUiLCJyZXN1bHQiLCJzdGFydE1vbnRoSW5kZXgiLCJlbmRNb250aEluZGV4Iiwic3RhcnREYXkiLCJlbmREYXkiLCJtYXRjaCIsInRvZGF5Iiwic3RhcnRZZWFyIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImVuZFllYXIiLCJlc3RpbWF0ZWRTdGFydCIsImVzdGltYXRlZEVuZCIsInN0YXJ0RGlmZk92ZXJEYXlzIiwiY2VpbCIsImVuZERpZmZPdmVyRGF5cyIsInN0YXJ0RGlmZk92ZXJXZWVrcyIsImVuZERpZmZPdmVyV2Vla3MiLCJlcnIiLCJpZGxlVGltZXIiLCJ0aW1lT3V0IiwicmVzZXRUaW1lciIsImNsZWFyVGltZW91dCIsImlkbGVUaW1lb3V0Iiwib250b3VjaHN0YXJ0IiwiZ2V0QnJvd3NlclR5cGUiLCJ1c2VyQWdlbnQiLCJuYXZpZ2F0b3IiLCJpc093bk11dGF0aW9uIiwibXV0YXRpb25MaXN0Iiwibm9kZXMiLCJBcnJheSIsImZyb20iLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwic29tZSIsIm4iLCJ0YWdOYW1lIiwiYyIsImNvbmZpZyIsImRiTmFtZSIsInZlcnNpb24iLCJtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50Iiwic3RvcmUiLCJuYW1lIiwiaW5kZXhlcyIsImZpZWxkcyIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiX3dpbmRvdyIsImFsbHRpbWUiLCJzZXNzaW9uIiwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIiwiaW5kZXhlZERCIiwiaW5pdCIsIm9wZW5SZXF1ZXN0Iiwib3BlbiIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib2xkVmVyc2lvbiIsImRlbGV0ZU9iamVjdFN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJpZHgiLCJjcmVhdGVJbmRleCIsIm9uZXJyb3IiLCJvbnN1Y2Nlc3MiLCJkYiIsImRlbGV0ZVJlcXVlc3QiLCJkZWxldGVEYXRhYmFzZSIsInJlamVjdCIsImludGVydmFsIiwicmVhZHdyaXRlIiwiZ2V0Q29ubmVjdGlvbiIsInR4IiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsImRhdGFOYW1lIiwiZGF0YVZhbHVlIiwiaW5pdFRyYW5zYWN0aW9uIiwic2Vzc2lvbklkIiwiZ2V0Q3VycmVudFNlc3Npb25JZCIsInJvdW5kIiwicGF5bG9hZCIsInB1dCIsIm9wIiwic3RvcmVkIiwiZ2V0Q3Vyc29yIiwiY3Vyc29yIiwidGFyZ2V0IiwiY29udGludWUiLCJtaW5tYXgiLCJNYXAiLCJoYXMiLCJzZXQiLCJncm91cEJ5IiwiZGF0YSIsImNvdW50IiwidG90YWwiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsIm9wZW5DdXJzb3IiLCJJREJLZXlSYW5nZSIsIm9ubHkiLCJ0b1N0cmluZyIsImluZGV4VmFsdWUiLCJzdW0iLCJzaXplIiwidmFsdWVzIiwicHVzaCIsImQiLCJzZXRIb3VycyIsImdldEhvdXJzIiwicGFkU3RhcnQiLCJnZXREYXRlIiwiQ29sbGVjdG9yQXBpIiwiY29sbGVjdG9yQXBpIiwicXVlcnlJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZSIsInF1ZXJ5TWV0aG9kIiwicXVlcnlQcm9taXNlIiwiYXZnIiwibW9kZSIsImxhc3QiLCJkYXRhVmFsdWVzIiwib2JqIiwiZGF0YV92YWx1ZSIsInVwZGF0ZUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVWYWx1ZSIsInVwZGF0ZU1ldGhvZCIsInNhdmUiLCJiZWFnbGVJbmZvTGF5ZXIiLCJhIiwiZiIsIl9faHdtIiwic2VhcmNoUGF0aHMiLCJQYWdlVHlwZURlcGVuZCIsIm1ldGhvZCIsInNlbGVjdG9yIiwiZm9ybWF0dGVyIiwiZXhjbHVzaXZlIiwib3BlcmFuZCIsImNoaWxkcmVuIiwiZmVhdHVyZUVuZ2luZWVyaW5nT3BzIiwiZmVhdHVyZU5hbWUiLCJpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSIsImluZm9MYXllciIsInR5cGVkVmFsdWUiLCJsYXN0S2V5IiwicG9wIiwidXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciIsInBhc3NWYWx1ZVRvTGlzdGVuZXJzIiwiREFUQV9MSVNURU5FUlMiLCJhZGREYXRhTGlzdGVuZXIiLCJsaXN0ZW5lciIsImxpc3RlbmVycyIsImlzQXJyYXkiLCJnZXRGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYmxvY2tpbmciLCJwb2xsSW50ZXJ2YWwiLCJvYnRhaW5EYXRhIiwianNvbkdldCIsInNlYXJjaEVsZW1lbnQiLCJpc0ZvdW5kIiwiaXNJZ25vcmUiLCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYWRkVHJlYXRtZW50IiwiZGVwZW5kYW50X29uX3RyZWF0bWVudCIsIlBBUlNFU0VBUkNITUFYUkVUUlkiLCJQQVJTRVNFQVJDSFNUQVJUREVMQVkiLCJwYXJzZVNlYXJjaFBhdGhzRGVsYXkiLCJwYXJzZVNlYXJjaFBhdGhzUmV0cnkiLCJpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyIiwicHJlcGFyZUNvcmVEYXRhIiwicGFyc2VyQ2FsbGVyIiwiYWRkTWV0cmljcyIsImNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWVzIiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJwcm9jZXNzRm9ybWF0dGVyIiwidG9VcHBlckNhc2UiLCJzZWFyY2hPYmoiLCJsYXllclZhbHVlIiwiZmlsdGVyUGFyYW1zIiwiZmlsdGVyTmFtZSIsImZpbHRlclZhbHVlIiwiZmlsdGVyTWF0Y2giLCJxdWVyeVNlbGVjdG9yIiwidG9CZVVwZGF0ZWQiLCJjaGlsZCIsImNoaWxkRWxlbWVudHMiLCJmaWx0ZXIiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJ0cmlnZ2VyUmVzdGFydCIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiaW5uZXJUZXh0IiwiYXR0cmliVmFsdWVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInZhbHVlY2hpbGQiLCJhdHRyaWJWYWx1ZSIsImdldEF0dHJpYnV0ZSIsInNldFZhbHVlIiwic3VtUHJpY2UiLCJjaGlsZFRleHQiLCJhcnJheUlubmVyVGV4dCIsImV4Y2x1c2l2ZUVsZW1lbnQiLCJjdXN0b21EYXRhRGVyaXZhdGlvbnMiLCJjdXJyZW50UGFnZVR5cGUiLCJhbGwiLCJpc0NhcnRFbXB0eSIsInRvdGFsQmFzZVByaWNlIiwiY291cG9uTm90QXBwbGljYWJsZSIsInByaWNlcyIsInF1YW50aXRpZXMiLCJ0b3RhbFByaWNlIiwiY291cG9uQXBwbGljYWJsZUFtb3VudCIsInNrdSIsInNrdUxpc3QiLCJwYXJzZVNlYXJjaFBhdGhzIiwiZG9tU3RhdHVzIiwicmVhZHlTdGF0ZSIsIndpbnRvcCIsImRhdGFMYXllciIsIndpbmRvYyIsImZvdW5kTmFtZXMiLCJTZXQiLCJwcmV2Rm91bmROYW1lcyIsIm5vdEZvdW5kTmFtZXMiLCJzZWFyY2hBbmRTZXQiLCJkYXRhTGF5ZXJJdGVtIiwic29yZ0FycmF5SW5uZXIiLCJnZXRTT1JHQXJyYXkiLCJzb3JnSXRlbSIsImpvaW4iLCJwYXRoIiwicGF0aEFycmF5Iiwic3ViUGF0aCIsInNsaWNlIiwic3ViQXJyYXkiLCJzdWJLZXkiLCJzdWJWYWx1ZSIsIndpbmRvd1B0ciIsIm5hdlB0ciIsInBsYXRmb3JtIiwidXNlckFnZW50RGF0YSIsImRldmljZVBpeGVsUmF0aW8iLCJhdmFpbFdpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIndpbmRvd0RlcHRoIiwiY29sb3JEZXB0aCIsInBpeGVsRGVwdGgiLCJ2cG9ydFNoYXBlIiwidmlzdWFsVmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsImlPUyIsIm9yaWVudGF0aW9uQW5nbGUiLCJvcmllbnRhdGlvbiIsImFuZ2xlIiwidGVtcCIsImhpc3RvcnkiLCJuYXZBZ2VudCIsImJyYW5kcyIsImJyYW5kIiwibW9iaWxlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJ1c2VyTGFuZ3VhZ2UiLCJtYXhUb3VjaFBvaW50cyIsInZlbmRvciIsImNvbm5lY3Rpb24iLCJkb3dubGluayIsImN1cnJlbnRVUkwiLCJVUkwiLCJob3N0bmFtZSIsImRvTm90VHJhY2siLCJtc0RvTm90VHJhY2siLCJyZWZlcnJlciIsImZpcnN0U2Vzc2lvblJlZmVycmVyIiwicGFnZVR5cGUiLCJwZXJmTWV0cmljcyIsInBlcmZOYXZpZ2F0aW9uTWV0cmljcyIsInBlcmZvcm1hbmNlIiwiZ2V0RW50cmllc0J5VHlwZSIsImNvbm5lY3QiLCJjb25uZWN0RW5kIiwiY29ubmVjdFN0YXJ0IiwicmVxdWVzdCIsInJlc3BvbnNlRW5kIiwicmVxdWVzdFN0YXJ0IiwiZG9tIiwiZG9tSW50ZXJhY3RpdmUiLCJkb21Db21wbGV0ZSIsImxvYWQiLCJsb2FkRXZlbnRFbmQiLCJsb2FkRXZlbnRTdGFydCIsImR1cmF0aW9uIiwic2NoZW1hT3JnRWx0cyIsInNvcmdBcnJheSIsInNUYWciLCJjbnRudCIsImpzb25jb250ZW50IiwiSEVBREVSUyIsIk1vbml0b3IiLCJoYXNBcnJpdmFsTG9nU2VudCIsImhhc01haW5Mb2dTZW50IiwiaGFzVXBkYXRlc1NlbnQiLCJoaWdoV2F0ZXJNYXJrIiwiaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycyIsImltbWVkaWF0ZSIsInBhY2tBbmRRdWV1ZU1haW5Mb2ciLCJwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZyIsInBhY2thZ2VNYWluTG9nRGF0YSIsInJlcXVlc3RCbG9iIiwiY2hlY2tGb3JMYXRlc3RDaGFuZ2VzIiwicXVldWVMb2dzIiwiaGFzQ2hhbmdlZCIsInBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEiLCJsb2dEYXRhIiwicGFja2FnZUFycml2YWxMb2dEYXRhIiwiaHdtIiwiY29va2llR2FJZCIsInZpZXdfZXBvY2giLCJib2R5IiwibGMiLCJ1Iiwib25IYXNoUGN0IiwiQmxvYiIsInN0YXJ0c1dpdGgiLCJzIiwibSIsInZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsb3NlRXZlbnQiLCJjYXB0dXJlIiwidmlzaWJpbGl0eVN0YXRlIiwic2VuZEJlYWNvbiIsInF1ZXVlZCIsInF1ZXVlSW50ZXJ2YWwiLCJjaGVja0RhdGFMYXllclJ1bGUiLCJydWxlIiwib3BlcmF0b3IiLCJkYXRhTGF5ZXJGaW5kZXIiLCJydW50aW1lVmFsdWUiLCJjaGVja0VsZW1lbnRSdWxlIiwic2VsZWN0b3JBbGwiLCJzZWxlY3RvckZhbGxiYWNrIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiRnVuY3Rpb24iLCJjaGVja1Nlc3Npb25SdWxlIiwiZHVyYXRpb25IYW5kbGVyIiwiaGlzdG9yeUhhbmRsZXIiLCJnZXRTZXNzaW9uVGltZXN0YW1wIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiaXNNb2JpbGUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkiLCJ0aW1lc3RhbXAiLCJjbGVhclJlcXVlc3QiLCJjbGVhciIsImdldFJlcXVlc3QiLCJjb3VudFJlcXVlc3QiLCJjdXJzb3JSZXF1ZXN0IiwiZXhpc3RpbmdQcm9kSW5mbyIsImVsYXBzZWRTZWNvbmRzIiwicHJvZHVjdEluZm9Qcm9taXNlIiwiY2xlYXJQcm9taXNlIiwicHJvZHVjdEluZm9BcnJheSIsInByZXBhcmVQYXlsb2FkcyIsInBheWxvYWRzIiwiZmllbGROYW1lcyIsInNoaWZ0IiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJjaGVja1Byb2R1Y3RJbmZvUnVsZSIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRUb0NhcnRDb3VudCIsImdldFByZXZpZXdDb3VudCIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwiTXV0ZXgiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJhZGRlZERhdGFMaXN0ZW5lcnMiLCJtdXRleCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbiIsImNoYWluX2NvbmRpdGlvbiIsImtleVByb21pc2VzTWFwIiwicnVsZXMiLCJydWxlUHJvbWlzZXMiLCJzYXRpc2ZpZWRSdWxlSWRzIiwic2V0VXBMaXN0ZW5lcnMiLCJhY3F1aXJlIiwicmVsZWFzZSIsImlzRWxpZ2libGUiLCJmaWx0ZXJlZCIsImsiLCJleHRyYWN0UnVsZUF0dHJpYnV0ZXMiLCJkYXRhTGF5ZXJSdWxlcyIsImVsZW1lbnRSdWxlcyIsImJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsImJpbmQiLCJtdXRhdGlvblJlY29yZCIsImV2ZXJ5IiwiZWxlbWVudFRvT2JzZXJ2ZSIsInBhcmVudE5vZGUiLCJjb21wdXRlU2VnbWVudCIsInNlZ21lbnQiLCJydWxlU2V0Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJidXNpbmVzc1J1bGVTZXQiLCJjaGVja1J1bGVzIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsIm1hdGNoZWRUcmVhdG1lbnRzIiwibXQiLCJjaGVja1BhZ2VUeXBlIiwicGFnZVR5cGVzIiwidXNlclNlZ21lbnQiLCJ1c2VyU2VnbWVudFdlaWdodHMiLCJ0cmVhdG1lbnQiLCJzZWdtZW50ZWRXZWlnaHQiLCJnZXRNYXRjaGVkVHJlYXRtZW50cyIsIkNQVCIsInB0Iiwic3Vic3RyIiwidHJlYXRtZW50c09iaiIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkRGF5cyIsIndlaWdodHMiLCJyZXBsYWNlciIsInJlcGxhY2VGbiIsInZhbCIsImN1cnJlbnRSZXBsYWNlRm4iLCJyZXBsYWNlT2JqZWN0RXh0cmFjdG9yIiwicmVwbGFjZVZhbCIsInJlcGxhY2VGbkV4ZWN1dG9yIiwickZuIiwic2luZ2xlIiwicmVwbGFjZUZ1bmN0aW9uIiwic3RvcmFnZSIsImtleUZhbGxiYWNrIiwiY2hlY2tBY3Rpb25Db25kaXRpb24iLCJlbGlnaWJsZUVsZW1lbnRzIiwiYXR0cmlidXRlIiwiaW5uZXJfY29uZGl0aW9uIiwiY29uZGl0aW9uRWxlbWVudHMiLCJhY3Rpb25Db25kaXRpb25DaGVja2VyIiwiJCIsImVsZW1lbnRTa3UiLCJhcHBseUFjdGlvbnMiLCJ0cmFuc2Zvcm1lciIsImFwcGx5RXZlbnQiLCJjb250ZW50U2VsZWN0b3IiLCJtZENvbmRpdGlvbiIsIm1vdmVfc2VsZWN0b3JfMSIsIm1vdmVfc2VsZWN0b3JfMiIsInBUeXBlIiwicHJvZHVjdEluZm9TdG9yYWdlIiwibWMiLCJTdHJpbmciLCJiZWZvcmUiLCJhZnRlciIsImFwcGVuZCIsIm9mZiIsImNyZWF0ZVBvcHVwIiwiZWxtIiwic3RvcFByb3BhZ2F0aW9uIiwiZGlzcGxheU1vZGFsIiwiZ2V0UHJvZHVjdEluZm8iLCJkaXNwbGF5UG9wdXAiLCJyIiwicHVzaFN0YXRlIiwic3RhdGUiLCJvbmNlIiwidGV4dCIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsImNzcyIsInByb3BlcnR5IiwicHJvcGVydHlWYWx1ZSIsImF0dHIiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJzZW50ZW5jZSIsIndvcmQiLCJjaGFyQXQiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInJlcGxhY2VXaXRoVmFsIiwiaHRtbFN0ciIsInRpdGxlcyIsInBhcnNlZFRpdGxlcyIsInBhcnNlZFRpdGxlIiwiaGlkZGVuIiwiaGFuZGxlUG9wdXBDbGljayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb2RhbENsaWNrIiwiY29udGFpbnMiLCJoaWRlIiwicVBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJjb250ZW50cyIsInNyYyIsInRlbXBsYXRlIiwiaW5uZXJIVE1MIiwicG9wdXAiLCJjb250ZW50IiwiZmlyc3RDaGlsZCIsInAxIiwicDIiLCJpMSIsImkyIiwiaXNFcXVhbE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJ3YWl0Rm9ySlF1ZXJ5IiwialF1ZXJ5IiwialF1ZXJ5SW50ZXJ2YWwiLCJhY3Rpb25BcHBsaWNhdG9yIiwiT0JTRVJWRVJfQ09ORklHIiwiYXR0cmlidXRlcyIsIlJvYm90RW5naW5lIiwiZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMiLCJlbmdhZ2VtZW50TG9jayIsInJlQXBwbHlUcmVhdG1lbnRzTWFwIiwiYWRkZWREYXRhTGlzdGVuZXJJZHMiLCJyb2JvdFByb21pc2VzIiwiZW5nYWdlUm9ib3QiLCJpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCIsImVsaWdpYmlsaXR5UnVsZVNldCIsImRldmljZSIsImhlbHBlcnMiLCJwcmVwYXJlQW5kQXBwbHkiLCJjaGVja0VsaWdpYmlsaXR5UnVsZVNldCIsInRyZWF0bWVudFNraXBSYXRpbyIsImRldGVybWluaW5nSWRlbnRpZmllciIsInRyZWF0bWVudFBjdCIsImNoZWNrQnVzaW5lc3NSdWxlcyIsImVuZ2FnZUhlbHBlcnMiLCJhZGRSZWFwcGx5RXZlbnQiLCJhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyIsImhlbHBlclJvYm90UHJvbWlzZXMiLCJwcmVwYXJlZCIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJ0IiwiUmVzaXplT2JzZXJ2ZXIiLCJyZWFwcGx5U2VsZWN0b3JMaXN0IiwicmVhcHBseV9zZWxlY3RvciIsImxhc3RTY3JvbGxUaW1lIiwiZ2V0VGltZSIsInN0IiwicGFnZVlPZmZzZXQiLCJyZWFwcGx5SW50ZXJ2YWwiLCJhcHBsaWVkIiwiYm91bmRFbmdhZ2VUcmVhdG1lbnQiLCJzZWxlY3RvcnMiLCJleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzIiwicHJldmlvdXNTZWxlY3RvcnMiLCJlbGlnaWJpbGl0eVJ1bGUiLCJvcHBvc2l0ZUZsYWciLCJlbGlnaWJpbGl0eVNjb3BlIiwiZWxpZ2liaWxpdHlOYW1lIiwiZWxpZ2liaWxpdHlTZXRUeXBlIiwicHJldmlvdXNJc0VsaWdpYmxlIiwiY2hlY2tFbGlnaWJpbGl0eSIsImJ1c2luZXNzUnVsZSIsImJlYWdsZU9uIiwicGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSIsInBlcnNpc3RQcm9kdWN0SW5mbyIsImVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzIiwidHJlYXRtZW50c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRzIiwidHJlYXRtZW50V2VpZ2h0c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRXZWlnaHRzIiwic2VhcmNoUGFyYW1zIiwibGFzdEluZGV4T2YiLCJpdGVtIiwidHJlYXRtZW50UmVwb3NpdG9yeSIsInJvYm90RW5naW5lIiwiZW5nYWdlUm9ib3RzIiwiZ2V0RWxpZ2liaWxpdHlSdWxlcyIsInJ1bGVFbmdpbmUiLCJTSFVURE9XTiIsIm1vbml0b3IiLCJlYXJseUxvZ1NlbnQiLCJoaWRlUmVtb3ZlZCIsImNvb2tpZVBjdCIsInBhY2tBbmRRdWV1ZUFycml2YWxMb2ciLCJwcm90b3R5cGUiLCJHTE9WX09OIiwiaXNMYWJlbFNlbnQiLCJ0aW1lb3V0Q291bnRlciIsInByb2Nlc3NBZG1pblVzZXIiLCJpc0FkbWluIiwiaXNPbiIsInNlbmRMb2dzIl0sInNvdXJjZVJvb3QiOiIifQ==
