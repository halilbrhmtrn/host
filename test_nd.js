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
var VERSION = "0.0.39.31";
var COOKIE_NAME = "_ga";
// TODO revert the following staging env check after moving to new branch structure
var TREATMENTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/treatments_staging.json" : "https://ndvivense.glov.ai/treatments.json";
var TREATMENT_WEIGHTS_LOCATION = isStaging ? "https://ndvivense.glov.ai/weights_staging.json" : "https://ndvivense.glov.ai/weights.json";
var STYLESHEET_LOCATION = isStaging ? "https://ndvivense.glov.ai/nd-styles_staging.css" : "https://ndvivense.glov.ai/nd-styles.css?id=".concat(replaceAll(new Date().toISOString().substring(0, 13).replace("T", ""), "-", ""));
var E_RULES_LOCATION = isStaging ? "https://ndvivense.glov.ai/eligibility_rules_staging.json" : "https://ndvivense.glov.ai/eligibility_rules.json";
var PRODUCT_INFO_LOCATION = "https://ndvivense.glov.ai/social-proof.txt";
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
  ELIGIBILITY_RULES: "BG_E_Rules"
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
    var productInfo, productInfoCSV;
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
            return productInfo.text();
          case 9:
            productInfoCSV = _context5.sent;
            return _context5.abrupt("return", csvToArray(productInfoCSV));
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
    return n.tagName && Array.from(n.classList).some(function (c) {
      return c.includes("bn-");
    });
  });
};

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function csvToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
  // Delimiters.
  "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
  // Quoted fields.
  "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
  // Standard fields.
  "([^\"\\" + strDelimiter + "\\r\\n]*))", "gi");

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec(strData)) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }
    var strMatchedValue = void 0;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}
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
  PageTypeDepend: "Productpage",
  method: "GADataLayer",
  selector: "vivenseProducts.*.price",
  name: "pdp.price",
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
  observer: "listingItemBlock",
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
  observer: "checkoutForm",
  name: "__checkoutFormObserver",
  children: ["cart.skucount", "cart.totalPrice", "cart.totalPriceFinal", "cart.couponNotApplicable", "cart.skus", "cart.prices", "cart.quantities", "cart.categories", "cart.isempty", "cart.couponApplicableAmount"],
  operand: "docQueryObserve"
},
// Mobile observer for the full form block as it is completely replaced
{
  PageTypeDepend: "basket",
  method: "DocQuery",
  selector: "#checkoutForm",
  observer: "checkoutForm",
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
  selector: "offers.price",
  name: "pdp.price"
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
            return getFromBeagleInfoLayer(key, true, 25, 1000);
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
                return _context2.abrupt("return", ruleSatisfied);
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
        var _i, _Object$entries, _Object$entries$_i, key, rules, satisfiedRuleIds, _iterator2, _step2, rule;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                addToBeagleInfoLayer("m", "assessing-eligibility-rules");
                _i = 0, _Object$entries = Object.entries(this.eligibilityRules);
              case 2:
                if (!(_i < _Object$entries.length)) {
                  _context3.next = 31;
                  break;
                }
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], rules = _Object$entries$_i[1];
                satisfiedRuleIds = [];
                this.setUpListeners(key, rules);
                _iterator2 = BeagleRuleEngine_createForOfIteratorHelper(rules);
                _context3.prev = 7;
                _iterator2.s();
              case 9:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 19;
                  break;
                }
                rule = _step2.value;
                _context3.next = 13;
                return this.checkRule(rule);
              case 13:
                if (!_context3.sent) {
                  _context3.next = 17;
                  break;
                }
                satisfiedRuleIds.push(rule.name);
                // Page type rules are exclusive; if one is true all others are false by default, no need to assess the rest
                if (!(key === "PageType")) {
                  _context3.next = 17;
                  break;
                }
                return _context3.abrupt("break", 19);
              case 17:
                _context3.next = 9;
                break;
              case 19:
                _context3.next = 24;
                break;
              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](7);
                _iterator2.e(_context3.t0);
              case 24:
                _context3.prev = 24;
                _iterator2.f();
                return _context3.finish(24);
              case 27:
                addToBeagleInfoLayer("__eRules.".concat(key), satisfiedRuleIds);
              case 28:
                _i++;
                _context3.next = 2;
                break;
              case 31:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[7, 21, 24, 27]]);
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
                          _context4.next = 21;
                          break;
                        case 19:
                          // remove from eligible rules
                          filtered = current.filter(function (k) {
                            return k !== rule.name;
                          });
                          addToBeagleInfoLayer("__eRules.".concat(key), filtered);
                        case 21:
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
        var _this$extractRuleAttr, dataLayerRules, elementRules, _i2, _Object$entries2, _Object$entries2$_i, operator, _rules, boundAssesEligibilityRulesCallBack, _loop2, _i3, _Object$entries3;
        return regenerator_default().wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$extractRuleAttr = this.extractRuleAttributes(rules), dataLayerRules = _this$extractRuleAttr.dataLayerRules, elementRules = _this$extractRuleAttr.elementRules;
                for (_i2 = 0, _Object$entries2 = Object.entries(dataLayerRules); _i2 < _Object$entries2.length; _i2++) {
                  _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), operator = _Object$entries2$_i[0], _rules = _Object$entries2$_i[1];
                  boundAssesEligibilityRulesCallBack = this.assesEligibilityRulesCallBack.bind(this, key, _rules);
                  addDataListener(operator, boundAssesEligibilityRulesCallBack);
                }
                _loop2 = function _loop2() {
                  var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                    selector = _Object$entries3$_i[0],
                    rules = _Object$entries3$_i[1];
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
                for (_i3 = 0, _Object$entries3 = Object.entries(elementRules); _i3 < _Object$entries3.length; _i3++) {
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
  }
  _createClass(TreatmentRepository, [{
    key: "getMatchedTreatments",
    value: function () {
      var _getMatchedTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var treatments, treatmentWeights, userSegment, userSegmentWeights, _iterator, _step, _userSegmentWeights$t, treatment, _iterator2, _step2, action, _i, _Object$keys, _userSegmentWeights$t2, _userSegmentWeights$t3, variantKey;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                treatments = this.treatments, treatmentWeights = this.treatmentWeights;
                _context.next = 3;
                return computeSegment(treatmentWeights);
              case 3:
                userSegment = _context.sent;
                if (userSegment) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return", null);
              case 6:
                if (!treatmentWeights) {
                  _context.next = 44;
                  break;
                }
                userSegmentWeights = userSegment && treatmentWeights[userSegment] ? treatmentWeights[userSegment] : treatmentWeights["default"];
                _iterator = BeagleTreatmentRepository_createForOfIteratorHelper(treatments);
                _context.prev = 9;
                _iterator.s();
              case 11:
                if ((_step = _iterator.n()).done) {
                  _context.next = 36;
                  break;
                }
                treatment = _step.value;
                treatment.weight = ((_userSegmentWeights$t = userSegmentWeights[treatment === null || treatment === void 0 ? void 0 : treatment.id]) === null || _userSegmentWeights$t === void 0 ? void 0 : _userSegmentWeights$t.weight) || 0;
                if (treatment.actions.some(function (a) {
                  return a.variants;
                })) {
                  _context.next = 16;
                  break;
                }
                return _context.abrupt("continue", 34);
              case 16:
                _iterator2 = BeagleTreatmentRepository_createForOfIteratorHelper(treatment.actions);
                _context.prev = 17;
                _iterator2.s();
              case 19:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 26;
                  break;
                }
                action = _step2.value;
                if (action.variants) {
                  _context.next = 23;
                  break;
                }
                return _context.abrupt("continue", 24);
              case 23:
                for (_i = 0, _Object$keys = Object.keys(action.variants); _i < _Object$keys.length; _i++) {
                  variantKey = _Object$keys[_i];
                  if ((_userSegmentWeights$t2 = userSegmentWeights[treatment.id]) !== null && _userSegmentWeights$t2 !== void 0 && _userSegmentWeights$t2.variants && (_userSegmentWeights$t3 = userSegmentWeights[treatment.id]) !== null && _userSegmentWeights$t3 !== void 0 && _userSegmentWeights$t3.variants[variantKey]) {
                    action.variants[variantKey].weight = userSegmentWeights[treatment.id].variants[variantKey];
                  }
                }
              case 24:
                _context.next = 19;
                break;
              case 26:
                _context.next = 31;
                break;
              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](17);
                _iterator2.e(_context.t0);
              case 31:
                _context.prev = 31;
                _iterator2.f();
                return _context.finish(31);
              case 34:
                _context.next = 11;
                break;
              case 36:
                _context.next = 41;
                break;
              case 38:
                _context.prev = 38;
                _context.t1 = _context["catch"](9);
                _iterator.e(_context.t1);
              case 41:
                _context.prev = 41;
                _iterator.f();
                return _context.finish(41);
              case 44:
                BeagleTreatmentRepository_logger.log("".concat(treatments.length, " treatments user segment matched"));
                if (treatments.length) {
                  _context.next = 47;
                  break;
                }
                return _context.abrupt("return", []);
              case 47:
                return _context.abrupt("return", treatments);
              case 48:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 38, 41, 44], [17, 28, 31, 34]]);
      }));
      function getMatchedTreatments() {
        return _getMatchedTreatments.apply(this, arguments);
      }
      return getMatchedTreatments;
    }()
  }], [{
    key: "getTreatments",
    value: function () {
      var _getTreatments = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var TREATMENTS, treatmentsObj, treatments, timestamp, treatmentWithTimestamp, elapsedDays, _treatmentWithTimestamp;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                BeagleTreatmentRepository_logger.log("Loading treatments");
                TREATMENTS = SESSION_STORAGE_KEYS.TREATMENTS;
                treatmentsObj = JSON.parse(window.sessionStorage.getItem(TREATMENTS));
                treatments = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.treatments;
                timestamp = treatmentsObj === null || treatmentsObj === void 0 ? void 0 : treatmentsObj.timestamp;
                if (!(!treatments || !timestamp)) {
                  _context2.next = 16;
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
                window.sessionStorage.setItem(TREATMENTS, JSON.stringify(treatmentWithTimestamp));
                return _context2.abrupt("return", treatments);
              case 16:
                if (!timestamp) {
                  _context2.next = 29;
                  break;
                }
                elapsedDays = (Date.now() - timestamp) / (1000 * 3600 * 24);
                if (!(elapsedDays > TREATMENTS_DURATION)) {
                  _context2.next = 29;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Treatments are expired");
                _context2.next = 22;
                return fetchTreatments();
              case 22:
                treatments = _context2.sent;
                if (treatments) {
                  _context2.next = 26;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Failed to fetch treatments");
                return _context2.abrupt("return", null);
              case 26:
                _treatmentWithTimestamp = {
                  timestamp: Date.now(),
                  treatments: treatments
                };
                window.sessionStorage.setItem(TREATMENTS, JSON.stringify(_treatmentWithTimestamp));
                return _context2.abrupt("return", treatments);
              case 29:
                BeagleTreatmentRepository_logger.success("Treatments are loaded from local storage");
                return _context2.abrupt("return", treatments);
              case 31:
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
        var weights;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                weights = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.WEIGHTS);
                if (!weights) {
                  _context3.next = 4;
                  break;
                }
                return _context3.abrupt("return", JSON.parse(weights));
              case 4:
                _context3.next = 6;
                return fetchTreatmentWeights();
              case 6:
                weights = _context3.sent;
                if (weights) {
                  _context3.next = 10;
                  break;
                }
                BeagleTreatmentRepository_logger.failed("Failed to fetch weights");
                return _context3.abrupt("return", null);
              case 10:
                window.sessionStorage.setItem(SESSION_STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
                return _context3.abrupt("return", weights);
              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](0);
                BeagleTreatmentRepository_logger.warn(_context3.t0.message);
                return _context3.abrupt("return", null);
              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 14]]);
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
        var _iterator, _step, treatment;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator = robotEngine_createForOfIteratorHelper(this.matchedTreatments);
                _context.prev = 1;
                _iterator.s();
              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 15;
                  break;
                }
                treatment = _step.value;
                _context.prev = 5;
                _context.next = 8;
                return this.engageRobot(treatment);
              case 8:
                _context.next = 13;
                break;
              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](5);
                robotEngine_logger.failed("Error engaging robot ".concat(treatment.id, ": ").concat(_context.t0.message || _context.t0));
              case 13:
                _context.next = 3;
                break;
              case 15:
                _context.next = 20;
                break;
              case 17:
                _context.prev = 17;
                _context.t1 = _context["catch"](1);
                _iterator.e(_context.t1);
              case 20:
                _context.prev = 20;
                _iterator.f();
                return _context.finish(20);
              case 23:
                this.initiateReapplyRobotMap();
              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 17, 20, 23], [5, 10]]);
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
        var id, actions, eligibilityRuleSet, device, dependant_on_treatment, reapply_event, reapply_event_page_type, businessRuleSet, weight, delay, debugMode, debugFilteredTreatments, engagementLock, identifier, isMobile, reApplyTreatmentsMap, matchedTreatments, pageType, prepareAndApply, reapply_event_array, _iterator2, _step2, reapplyEvent, previousValue, treatmentSkipRatio, _matchedTreatments$fi, dependantOnTreatmentWeight, determiningIdentifier, treatmentPct, businessRuleId;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = treatment.id, actions = treatment.actions, eligibilityRuleSet = treatment.eligibilityRuleSet, device = treatment.device, dependant_on_treatment = treatment.dependant_on_treatment, reapply_event = treatment.reapply_event, reapply_event_page_type = treatment.reapply_event_page_type, businessRuleSet = treatment.businessRuleSet, weight = treatment.weight, delay = treatment.delay;
                debugMode = this.debugMode, debugFilteredTreatments = this.debugFilteredTreatments, engagementLock = this.engagementLock, identifier = this.identifier, isMobile = this.isMobile, reApplyTreatmentsMap = this.reApplyTreatmentsMap, matchedTreatments = this.matchedTreatments, pageType = this.pageType, prepareAndApply = this.prepareAndApply; // one engagement at a time
                if (!engagementLock[id]) {
                  _context3.next = 5;
                  break;
                }
                robotEngine_logger.log("Treatment ".concat(id, " engagement in progress, skipping"));
                return _context3.abrupt("return");
              case 5:
                engagementLock[id] = true;
                if (!(debugMode !== 1 && !weight && !dependant_on_treatment)) {
                  _context3.next = 9;
                  break;
                }
                engagementLock[id] = false;
                return _context3.abrupt("return");
              case 9:
                if (!(debugMode && debugFilteredTreatments && !debugFilteredTreatments.includes(id))) {
                  _context3.next = 12;
                  break;
                }
                engagementLock[id] = false;
                return _context3.abrupt("return");
              case 12:
                if (!(device === "mobile" && !isMobile)) {
                  _context3.next = 16;
                  break;
                }
                robotEngine_logger.failed("Treatment device 'mobile' mismatch");
                engagementLock[id] = false;
                return _context3.abrupt("return");
              case 16:
                if (!(device === "desktop" && isMobile)) {
                  _context3.next = 20;
                  break;
                }
                robotEngine_logger.failed("Treatment device 'desktop' mismatch");
                engagementLock[id] = false;
                return _context3.abrupt("return");
              case 20:
                if (reapply_event) {
                  if (!reapply_event_page_type || reapply_event_page_type === pageType) {
                    reapply_event_array = reapply_event;
                    if (!Array.isArray(reapply_event)) reapply_event_array = [reapply_event];
                    robotEngine_logger.log("Reapply event '".concat(reapply_event, "' found for treatment: ").concat(id));
                    _iterator2 = robotEngine_createForOfIteratorHelper(reapply_event_array);
                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        reapplyEvent = _step2.value;
                        previousValue = reApplyTreatmentsMap[reapplyEvent] ? reApplyTreatmentsMap[reapplyEvent] : [];
                        if (previousValue.includes(id)) {
                          robotEngine_logger.log("Treatment already added for reapply event");
                        } else reApplyTreatmentsMap[reapplyEvent] = [].concat(_toConsumableArray(previousValue), [id]);
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  }
                }
                robotEngine_logger.log("Starting base rule set check for treatment: " + id);
                _context3.t0 = !eligibilityRuleSet;
                if (_context3.t0) {
                  _context3.next = 27;
                  break;
                }
                _context3.next = 26;
                return this.checkEligibilityRuleSet(eligibilityRuleSet);
              case 26:
                _context3.t0 = _context3.sent;
              case 27:
                if (!_context3.t0) {
                  _context3.next = 63;
                  break;
                }
                treatmentSkipRatio = weight === 100 ? 0 : 100 - weight || TREATMENT_RATIO;
                if (dependant_on_treatment) {
                  // If dependant on treatment is found and has weight; use its skip ratio
                  dependantOnTreatmentWeight = (_matchedTreatments$fi = matchedTreatments.find(function (t) {
                    return t.id === dependant_on_treatment;
                  })) === null || _matchedTreatments$fi === void 0 ? void 0 : _matchedTreatments$fi.weight;
                  treatmentSkipRatio = dependantOnTreatmentWeight === 100 ? 0 : 100 - dependantOnTreatmentWeight || TREATMENT_RATIO;
                }
                robotEngine_logger.log("Treatment skip ratio: " + treatmentSkipRatio);
                // Determining identifier for calculating treatment percentage (treatmentPct)
                determiningIdentifier = dependant_on_treatment || id; // treatmentPct is the percentage value for the treatment used to determine if it should be skipped or not
                // treatmentPct is 100 when debug mode is 1, ensuring no treatments are skipped
                if (!(debugMode === 1)) {
                  _context3.next = 36;
                  break;
                }
                _context3.t1 = 100;
                _context3.next = 39;
                break;
              case 36:
                _context3.next = 38;
                return determinePct(identifier + determiningIdentifier);
              case 38:
                _context3.t1 = _context3.sent;
              case 39:
                treatmentPct = _context3.t1;
                robotEngine_logger.log("TreatmentPct: " + treatmentPct + " with debug mode ".concat(debugMode ? "on" : "off"));
                businessRuleId = null;
                if (!businessRuleSet) {
                  _context3.next = 48;
                  break;
                }
                robotEngine_logger.log("Starting sub variant rule set check for treatment: " + id);
                _context3.next = 46;
                return this.checkBusinessRules(businessRuleSet);
              case 46:
                businessRuleId = _context3.sent;
                if (businessRuleId !== null) {
                  robotEngine_logger.log("Applying business rule transformation with id: ", businessRuleId);
                } else robotEngine_logger.log("Applying treatment with default values");
              case 48:
                if (!(treatmentPct < treatmentSkipRatio)) {
                  _context3.next = 53;
                  break;
                }
                robotEngine_logger.log("Treatment ".concat(id, " skipped due to treatment split ratio"));
                addTreatment(id, businessRuleId, null, "skipped", dependant_on_treatment);
                engagementLock[id] = false;
                return _context3.abrupt("return");
              case 53:
                if (delay) {
                  _context3.next = 60;
                  break;
                }
                _context3.next = 56;
                return prepareAndApply(id, identifier, actions, businessRuleId, debugMode);
              case 56:
                engagementLock[id] = false;
                this.addRuleSetDataListeners(treatment);
                _context3.next = 61;
                break;
              case 60:
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2() {
                  return regenerator_default().wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return prepareAndApply(id, identifier, actions, businessRuleId, debugMode);
                        case 2:
                          engagementLock[id] = false;
                          _this.addRuleSetDataListeners(treatment);
                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })), delay);
              case 61:
                _context3.next = 65;
                break;
              case 63:
                robotEngine_logger.failed("Rule check failed for treatment:", id);
                engagementLock[treatment.id] = false;
              case 65:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function engageRobot(_x) {
        return _engageRobot.apply(this, arguments);
      }
      return engageRobot;
    }()
  }, {
    key: "prepareAndApply",
    value: function () {
      var _prepareAndApply = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee4(id, identifier, actions, businessRuleId, debugMode) {
        var _yield$prepareActions, _yield$prepareActions2, prepared, variant, res;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return prepareActions(identifier, actions, businessRuleId, debugMode);
              case 2:
                _yield$prepareActions = _context4.sent;
                _yield$prepareActions2 = _slicedToArray(_yield$prepareActions, 2);
                prepared = _yield$prepareActions2[0];
                variant = _yield$prepareActions2[1];
                _context4.next = 8;
                return BeagleApplyActions(prepared);
              case 8:
                res = _context4.sent;
                if (res === false) {
                  addTreatment(id, businessRuleId, variant, "failed");
                } else {
                  addTreatment(id, businessRuleId, variant, "applied");
                }
              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      function prepareAndApply(_x2, _x3, _x4, _x5, _x6) {
        return _prepareAndApply.apply(this, arguments);
      }
      return prepareAndApply;
    }()
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
                var _iterator3 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step3;
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var treatment = _step3.value;
                    robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from infinite_scroll"));
                    _this2.engageRobot(treatment);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              });
              observer.observe(window.top.document.documentElement);
            }
            break;
          case "timeout":
            {
              setTimeout(function () {
                var _iterator4 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                  _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var treatment = _step4.value;
                    robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from timeout"));
                    _this2.engageRobot(treatment);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }, 500);
            }
            break;
          case "element_change":
            {
              var _iterator5 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                _step5;
              try {
                var _loop2 = function _loop2() {
                  var treatment = _step5.value;
                  var reapplySelectorList = Array.isArray(treatment.reapply_selector) ? treatment.reapply_selector : [treatment.reapply_selector];
                  var _iterator6 = robotEngine_createForOfIteratorHelper(reapplySelectorList),
                    _step6;
                  try {
                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                      var selector = _step6.value;
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
                    _iterator6.e(err);
                  } finally {
                    _iterator6.f();
                  }
                };
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  _loop2();
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
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
                  var _iterator7 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step7;
                  try {
                    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                      var treatment = _step7.value;
                      robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from on_scroll"));
                      _this2.engageRobot(treatment);
                    }
                  } catch (err) {
                    _iterator7.e(err);
                  } finally {
                    _iterator7.f();
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
                  var _iterator8 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
                    _step8;
                  try {
                    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                      var treatment = _step8.value;
                      robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from query_search_change"));
                      _this2.engageRobot(treatment);
                    }
                  } catch (err) {
                    _iterator8.e(err);
                  } finally {
                    _iterator8.f();
                  }
                }
              });
              _observer2.observe(document, OBSERVER_CONFIG);
            }
            break;
          case "interval":
            var _iterator9 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
              _step9;
            try {
              var _loop3 = function _loop3() {
                var treatment = _step9.value;
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
                          robotEngine_logger.log("Retrying treatment ".concat(treatment.id, " from interval"));
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
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                _loop3();
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
            break;
          case "info_layer_change":
            var _iterator10 = robotEngine_createForOfIteratorHelper(reApplyTreatments),
              _step10;
            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                var treatment = _step10.value;
                var boundEngageTreatment = _this2.engageRobot.bind(_this2, treatment);
                addDataListener(treatment.reapply_selector, boundEngageTreatment);
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
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
      var _addRuleSetDataListeners = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee6(treatment) {
        var _treatment$eligibilit, eligibilityRuleSet, _treatment$businessRu, businessRuleSet, id, selectors, boundEngageTreatment, _iterator11, _step11, selector;
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
                _iterator11 = robotEngine_createForOfIteratorHelper(selectors);
                try {
                  for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                    selector = _step11.value;
                    addDataListener("__eRules.".concat(selector), boundEngageTreatment);
                  }
                } catch (err) {
                  _iterator11.e(err);
                } finally {
                  _iterator11.f();
                }
                this.addedDataListenerIds.push(id);
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function addRuleSetDataListeners(_x7) {
        return _addRuleSetDataListeners.apply(this, arguments);
      }
      return addRuleSetDataListeners;
    }()
  }, {
    key: "extractDataListenerSelectors",
    value: function extractDataListenerSelectors(ruleSet) {
      var previousSelectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var selectors = previousSelectors || [];
      var _iterator12 = robotEngine_createForOfIteratorHelper(ruleSet),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var rule = _step12.value;
          if (typeof rule === "string") {
            if (rule.startsWith("!")) rule = rule.slice(1);
            selectors.push(rule.split(".")[0]);
            continue;
          }
          this.extractDataListenerSelectors(rule.set, selectors);
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
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
                robotEngine_logger.log("Checking eligibility ".concat(eligibilityRule));
                oppositeFlag = false;
                _eligibilityRule$spli = eligibilityRule.split("."), _eligibilityRule$spli2 = _slicedToArray(_eligibilityRule$spli, 2), eligibilityScope = _eligibilityRule$spli2[0], eligibilityName = _eligibilityRule$spli2[1];
                if (eligibilityScope.startsWith("!")) {
                  oppositeFlag = true;
                  eligibilityScope = eligibilityScope.slice(1);
                }
                _context7.next = 6;
                return getFromBeagleInfoLayer("__eRules.".concat(eligibilityScope));
              case 6:
                res = _context7.sent;
                if (!(!res || !Array.isArray(res))) {
                  _context7.next = 9;
                  break;
                }
                return _context7.abrupt("return", false);
              case 9:
                if (!(oppositeFlag && res.includes(eligibilityName))) {
                  _context7.next = 11;
                  break;
                }
                return _context7.abrupt("return", false);
              case 11:
                if (!(!oppositeFlag && !res.includes(eligibilityName))) {
                  _context7.next = 13;
                  break;
                }
                return _context7.abrupt("return", false);
              case 13:
                robotEngine_logger.log("".concat(eligibilityRule, " is eligible"));
                return _context7.abrupt("return", true);
              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      function checkEligibility(_x8) {
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
          _iterator13,
          _step13,
          eligibilityRule,
          _args8 = arguments;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                eligibilitySetType = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : null;
                previousIsEligible = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : null;
                robotEngine_logger.log("Checking robot eligibility");
                if (Array.isArray(eligibilityRuleSet)) {
                  _context8.next = 6;
                  break;
                }
                robotEngine_logger.failed("Eligibility Rule Set ".concat(eligibilityRuleSet, " is not an array"));
                return _context8.abrupt("return", false);
              case 6:
                isEligible = previousIsEligible;
                _iterator13 = robotEngine_createForOfIteratorHelper(eligibilityRuleSet);
                _context8.prev = 8;
                _iterator13.s();
              case 10:
                if ((_step13 = _iterator13.n()).done) {
                  _context8.next = 57;
                  break;
                }
                eligibilityRule = _step13.value;
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
                robotEngine_logger.failed("Unknown eligibilitySetType: ", eligibilitySetType);
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
                _iterator13.e(_context8.t3);
              case 62:
                _context8.prev = 62;
                _iterator13.f();
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
      function checkEligibilityRuleSet(_x9) {
        return _checkEligibilityRuleSet.apply(this, arguments);
      }
      return checkEligibilityRuleSet;
    }() // Return index of businessRule, this is the businessRuleId
  }, {
    key: "checkBusinessRules",
    value: function () {
      var _checkBusinessRules = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee9(businessRuleSet) {
        var _iterator14, _step14, _step14$value, index, businessRule;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _iterator14 = robotEngine_createForOfIteratorHelper(businessRuleSet.entries());
                _context9.prev = 1;
                _iterator14.s();
              case 3:
                if ((_step14 = _iterator14.n()).done) {
                  _context9.next = 11;
                  break;
                }
                _step14$value = _slicedToArray(_step14.value, 2), index = _step14$value[0], businessRule = _step14$value[1];
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
                _iterator14.e(_context9.t0);
              case 16:
                _context9.prev = 16;
                _iterator14.f();
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
      function checkBusinessRules(_x10) {
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
            return treatmentRepository.getMatchedTreatments();
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
            // await Promise.all([
            //   eligibilityRulesAssessPromise, persistProductInfoPromise,
            // ]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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QUFRLENBQUM7VUFDM0MsQ0FBQyxNQUFNO1lBQ0xqYyxNQUFNLENBQUNULElBQUksQ0FBQywrQkFBK0IsQ0FBQztZQUM1Q1csa0JBQWtCLEVBQUU7WUFDcEJ1d0IsV0FBVyxHQUFHLElBQUk7VUFDcEI7VUFBQztVQUFBO1FBQUE7VUFBQSxNQUNRUyxJQUFJLEtBQUssS0FBSztZQUFBO1lBQUE7VUFBQTtVQUN2Qmx4QixNQUFNLENBQUNULElBQUksQ0FBQyx1QkFBdUIsQ0FBQztVQUNwQ1csa0JBQWtCLEVBQUU7VUFDcEJ1d0IsV0FBVyxHQUFHLElBQUk7VUFBQztVQUFBO1FBQUE7VUFBQSxNQUViLElBQUl4dkIsS0FBSyxDQUFDLDJCQUEyQixDQUFDO1FBQUE7VUFBQTtVQUFBO1FBQUE7VUFBQTtVQUFBO1VBRzlDakIsTUFBTSxDQUFDSCxJQUFJLENBQUMsbUNBQW1DLEVBQUUsWUFBSXdCLE9BQU8sQ0FBQztVQUM3RHRCLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxZQUFJc0IsT0FBTyxDQUFDO1VBQ3RDLElBQUksQ0FBQ212QixZQUFZLElBQUlELE9BQU8sRUFBRUEsT0FBTyxDQUFDWSxRQUFRLENBQUMsS0FBSyxDQUFDO1VBQ3JELElBQUksQ0FBQ1YsV0FBVyxFQUFFdndCLGtCQUFrQixFQUFFO1FBQUM7UUFBQTtVQUFBO01BQUE7SUFBQTtFQUFBO0FBQUEsQ0FFMUMsSUFBRyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Qcm9wZXJ0eUtleS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvc3RyaW5nVXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU1vbml0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2RhdGFMYXllckNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VsZW1lbnRDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9mdW5jdGlvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Nlc3Npb25DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS91cmxDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbnZDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvYXN5bmMtbXV0ZXgvaW5kZXgubWpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU9uL3JvYm90RW5naW5lLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlT24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVDbGllbnRTREsvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi90eXBlb2YuanNcIilbXCJkZWZhdWx0XCJdO1xuZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7IC8qISByZWdlbmVyYXRvci1ydW50aW1lIC0tIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLiAtLSBsaWNlbnNlIChNSVQpOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL0xJQ0VOU0UgKi9cbiAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzO1xuICB2YXIgZXhwb3J0cyA9IHt9LFxuICAgIE9wID0gT2JqZWN0LnByb3RvdHlwZSxcbiAgICBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAob2JqLCBrZXksIGRlc2MpIHtcbiAgICAgIG9ialtrZXldID0gZGVzYy52YWx1ZTtcbiAgICB9LFxuICAgICRTeW1ib2wgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCA/IFN5bWJvbCA6IHt9LFxuICAgIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIixcbiAgICBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCIsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICBjb25maWd1cmFibGU6ICEwLFxuICAgICAgd3JpdGFibGU6ICEwXG4gICAgfSksIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3IsXG4gICAgICBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSksXG4gICAgICBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShnZW5lcmF0b3IsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KVxuICAgIH0pLCBnZW5lcmF0b3I7XG4gIH1cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkgJiYgKEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUpO1xuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAoXCJ0aHJvd1wiICE9PSByZWNvcmQudHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZyxcbiAgICAgICAgICB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIFwib2JqZWN0XCIgPT0gX3R5cGVvZih2YWx1ZSkgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgIH1cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoXCJleGVjdXRpbmdcIiA9PT0gc3RhdGUpIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICBpZiAoXCJjb21wbGV0ZWRcIiA9PT0gc3RhdGUpIHtcbiAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gbWV0aG9kKSB0aHJvdyBhcmc7XG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnRleHQubWV0aG9kID0gbWV0aG9kLCBjb250ZXh0LmFyZyA9IGFyZzs7KSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwibmV4dFwiID09PSBjb250ZXh0Lm1ldGhvZCkgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO2Vsc2UgaWYgKFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHtcbiAgICAgICAgICBpZiAoXCJzdXNwZW5kZWRTdGFydFwiID09PSBzdGF0ZSkgdGhyb3cgc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0LmFyZztcbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIFwicmV0dXJuXCIgPT09IGNvbnRleHQubWV0aG9kICYmIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgc3RhdGUgPSBcImV4ZWN1dGluZ1wiO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IFwiY29tcGxldGVkXCIgOiBcInN1c3BlbmRlZFlpZWxkXCIsIHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSAmJiAoc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kLFxuICAgICAgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKHVuZGVmaW5lZCA9PT0gbWV0aG9kKSByZXR1cm4gY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIFwidGhyb3dcIiA9PT0gbWV0aG9kTmFtZSAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSAmJiAoY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCwgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCksIFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHx8IFwicmV0dXJuXCIgIT09IG1ldGhvZE5hbWUgJiYgKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICdcIiArIG1ldGhvZE5hbWUgKyBcIicgbWV0aG9kXCIpKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSByZXR1cm4gY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZywgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgIHJldHVybiBpbmZvID8gaW5mby5kb25lID8gKGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlLCBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jLCBcInJldHVyblwiICE9PSBjb250ZXh0Lm1ldGhvZCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCkgOiBpbmZvIDogKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpO1xuICB9XG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcbiAgICAxIGluIGxvY3MgJiYgKGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXSksIDIgaW4gbG9jcyAmJiAoZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl0sIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiLCBkZWxldGUgcmVjb3JkLmFyZywgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XSwgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTtcbiAgfVxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaXRlcmFibGUubmV4dCkgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBmb3IgKDsgKytpIDwgaXRlcmFibGUubGVuZ3RoOykge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiAhMFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpLCBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGdlbkZ1biAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuICEhY3RvciAmJiAoY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTtcbiAgfSwgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAoZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO1xuICB9LCBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgdm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKSwgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSksIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCksXG4gICAgICBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzLnJldmVyc2UoKSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGZvciAoOyBrZXlzLmxlbmd0aDspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSByZXR1cm4gbmV4dC52YWx1ZSA9IGtleSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgfTtcbiAgfSwgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXMsIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgXCJ0XCIgPT09IG5hbWUuY2hhckF0KDApICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkgJiYgKHRoaXNbbmFtZV0gPSB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIGRpc3BhdGNoRXhjZXB0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IFwidGhyb3dcIiwgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbiwgY29udGV4dC5uZXh0ID0gbG9jLCBjYXVnaHQgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXSxcbiAgICAgICAgICByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICBpZiAoXCJyb290XCIgPT09IGVudHJ5LnRyeUxvYykgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKSxcbiAgICAgICAgICAgIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbmFsbHlFbnRyeSAmJiAoXCJicmVha1wiID09PSB0eXBlIHx8IFwiY29udGludWVcIiA9PT0gdHlwZSkgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jICYmIChmaW5hbGx5RW50cnkgPSBudWxsKTtcbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gdHlwZSwgcmVjb3JkLmFyZyA9IGFyZywgZmluYWxseUVudHJ5ID8gKHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jLCBDb250aW51ZVNlbnRpbmVsKSA6IHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIHJldHVybiBcImJyZWFrXCIgPT09IHJlY29yZC50eXBlIHx8IFwiY29udGludWVcIiA9PT0gcmVjb3JkLnR5cGUgPyB0aGlzLm5leHQgPSByZWNvcmQuYXJnIDogXCJyZXR1cm5cIiA9PT0gcmVjb3JkLnR5cGUgPyAodGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnLCB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCIsIHRoaXMubmV4dCA9IFwiZW5kXCIpIDogXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUgJiYgYWZ0ZXJMb2MgJiYgKHRoaXMubmV4dCA9IGFmdGVyTG9jKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykgcmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpLCByZXNldFRyeUVudHJ5KGVudHJ5KSwgQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cbm1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG9iaik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIvLyBUT0RPKEJhYmVsIDgpOiBSZW1vdmUgdGhpcyBmaWxlLlxuXG52YXIgcnVudGltZSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZVwiKSgpO1xubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuXG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL3BhY2thZ2VzL3J1bnRpbWUvcnVudGltZS5qcyNMNzM2PVxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5pbXBvcnQgdG9QcmltaXRpdmUgZnJvbSBcIi4vdG9QcmltaXRpdmUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgY29uc3QgcmVwbGFjZUFsbCA9IChzdHIsIGZpbmQsIHJlcGxhY2UgPSBcIlwiKSA9PiB7XG4gIGlmICghc3RyKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICBpZiAoaW5kZXggPCAwKSByZXR1cm4gc3RyO1xuXG4gIHdoaWxlIChzdHIuaW5kZXhPZihmaW5kKSA+PSAwKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgICBzdHIgPSAoaW5kZXggPiAwID8gc3RyLnN1YnN0cmluZygwLCBpbmRleCkgOiBcIlwiKSArIHJlcGxhY2UgKyBzdHIuc3Vic3RyaW5nKGluZGV4ICsgZmluZC5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJraXNoVG9Mb3dlciA9IChzdHIpID0+IHtcbiAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcbiAgbGV0IHN0cmluZyA9IHN0cjtcbiAgY29uc3QgbGV0dGVycyA9IHtcIsSwXCI6IFwiaVwiLCBcIklcIjogXCLEsVwiLCBcIsWeXCI6IFwixZ9cIiwgXCLEnlwiOiBcIsSfXCIsIFwiw5xcIjogXCLDvFwiLCBcIsOWXCI6IFwiw7ZcIiwgXCLDh1wiOiBcIsOnXCJ9O1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKChbxLBJxZ7EnsOcw4fDll0pKS9nLCBmdW5jdGlvbihsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyc1tsZXR0ZXJdO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4vc3RyaW5nVXRpbHNcIjtcbmNvbnN0IGlzU3RhZ2luZyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcInN0YWdpbmcudml2ZW5zZVwiKSA6IHRydWU7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIwLjAuMzkuMzFcIjtcbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA9IFwiX2dhXCI7XG4vLyBUT0RPIHJldmVydCB0aGUgZm9sbG93aW5nIHN0YWdpbmcgZW52IGNoZWNrIGFmdGVyIG1vdmluZyB0byBuZXcgYnJhbmNoIHN0cnVjdHVyZVxuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNUWUxFU0hFRVRfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzX3N0YWdpbmcuY3NzXCIgOiBgaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXMuY3NzP2lkPSR7cmVwbGFjZUFsbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEzKS5yZXBsYWNlKFwiVFwiLCBcIlwiKSwgXCItXCIsIFwiXCIpfWA7XG5leHBvcnQgY29uc3QgRV9SVUxFU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlc19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlcy5qc29uXCI7XG5leHBvcnQgY29uc3QgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OID0gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3NvY2lhbC1wcm9vZi50eHRcIjtcbmV4cG9ydCBjb25zdCBMT0dfQVBJX1VSTCA9IFwiaHR0cHM6Ly9ldXJvcGUtd2VzdDMtbmV4dGRheS0zNGViMy5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2xvZ1wiO1xuZXhwb3J0IGNvbnN0IExPT0tVUF9BUElfVVJMID0gXCJodHRwczovL2NhdGFsb2ctYXBpLmFkb3JhYWkuY29tXCI7XG5leHBvcnQgY29uc3QgTU9CSUxFX01FRElBX1FVRVJZID0gXCIobWF4LXdpZHRoOiA0NDBweClcIjtcbi8vIENvbnRyb2wgZ3JvdXAgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFNQTElUX1JBVElPID0gNTA7XG4vLyBTa2lwcGVkIHRyZWF0bWVudCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19EVVJBVElPTiA9IDE7XG5leHBvcnQgY29uc3QgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04gPSAxO1xuZXhwb3J0IGNvbnN0IExJU1RfTU9ERV9CRUFHTEVfS0VZUyA9IFtcInBhZ2V0eXBlXCIsIFwiY2F0ZWdvcnlcIiwgXCJhbGx0aW1lUExQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBMUENhdGVnb3J5TW9kZVwiLFxuICBcImFsbHRpbWVQRFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUERQQ2F0ZWdvcnlNb2RlXCIsIFwiYWxsdGltZUNhcnRDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uQ2FydENhdGVnb3J5TW9kZVwiXTtcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFRJTUVPVVRfQ09VTlQ6IFwiQkdfVGltZW91dENvdW50XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG4gIFdFSUdIVFM6IFwiQkdfV2VpZ2h0c1wiLFxuICBFTElHSUJJTElUWV9SVUxFUzogXCJCR19FX1J1bGVzXCIsXG59O1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZUyA9IHtcbiAgREVCVUdfTU9ERTogXCJCR19EZWJ1Z1wiLFxuICBPVVRfT0ZfU0NPUEU6IFwiQkdfT3V0T2ZTY29wZVwiLFxuICBJU19MQUJFTF9TRU5UOiBcIkJHX0xhYmVsU2VudFwiLFxuICBVU0VSX0lEOiBcIkJHX1VzZXJJZF8wMFwiLFxuICBEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFOiBcIkJHX0NvbGxlY3Rpb25EYXRhU2l6ZVwiLFxuICBJU19BRE1JTjogXCJHTFZfSXNBZG1pblwiLFxufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9TVE9SQUdFX1BSRUZJWCA9IFwiQkdfU2VnX1wiO1xuIiwiaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVN9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3Iob3JpZ2luID0gXCJCZWFnbGUgQ2xpZW50IFNES1wiLCB0ZXN0aW5nID0gZmFsc2UpIHtcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcbiAgICBpZiAodGVzdGluZykge1xuICAgICAgdGhpcy5ERUJVRyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuREVCVUcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkRFQlVHX01PREUpO1xuICAgIH1cbiAgfVxuXG4gIGluZm8oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLmluZm8oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBsb2coLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKERFQlVHKSB7XG4gICAgICBjb25zb2xlLmxvZyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBmYWlsZWQoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiByZWRcIiwgYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBzdWNjZXNzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogZ3JlZW5cIiwgYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICB3YXJuKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS53YXJuKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgZXJyb3IoLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLmVycm9yKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IG51bGwgPT0gYXJyID8gbnVsbCA6IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIFN5bWJvbCAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuICBpZiAobnVsbCAhPSBfaSkge1xuICAgIHZhciBfcyxcbiAgICAgIF9lLFxuICAgICAgX3gsXG4gICAgICBfcixcbiAgICAgIF9hcnIgPSBbXSxcbiAgICAgIF9uID0gITAsXG4gICAgICBfZCA9ICExO1xuICAgIHRyeSB7XG4gICAgICBpZiAoX3ggPSAoX2kgPSBfaS5jYWxsKGFycikpLm5leHQsIDAgPT09IGkpIHtcbiAgICAgICAgaWYgKE9iamVjdChfaSkgIT09IF9pKSByZXR1cm47XG4gICAgICAgIF9uID0gITE7XG4gICAgICB9IGVsc2UgZm9yICg7ICEoX24gPSAoX3MgPSBfeC5jYWxsKF9pKSkuZG9uZSkgJiYgKF9hcnIucHVzaChfcy52YWx1ZSksIF9hcnIubGVuZ3RoICE9PSBpKTsgX24gPSAhMCkge1xuICAgICAgICA7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9ICEwLCBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBudWxsICE9IF9pW1wicmV0dXJuXCJdICYmIChfciA9IF9pW1wicmV0dXJuXCJdKCksIE9iamVjdChfcikgIT09IF9yKSkgcmV0dXJuO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuICByZXR1cm4gYXJyMjtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGtleSA9IHRvUHJvcGVydHlLZXkoa2V5KTtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIFNUWUxFU0hFRVRfTE9DQVRJT04sXG4gIFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRTX0xPQ0FUSU9OLFxuICBFX1JVTEVTX0xPQ0FUSU9OLFxuICBQUk9EVUNUX0lORk9fTE9DQVRJT04sXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVV0aWxzXCIpO1xuY29uc3QgbW9udGhzID0ge1xuICBcIm9jYWtcIjogMCxcbiAgXCLFn3ViYXRcIjogMSxcbiAgXCJtYXJ0XCI6IDIsXG4gIFwibmlzYW5cIjogMyxcbiAgXCJtYXnEsXNcIjogNCxcbiAgXCJoYXppcmFuXCI6IDUsXG4gIFwidGVtbXV6XCI6IDYsXG4gIFwiYcSfdXN0b3NcIjogNyxcbiAgXCJleWzDvGxcIjogOCxcbiAgXCJla2ltXCI6IDksXG4gIFwia2FzxLFtXCI6IDEwLFxuICBcImFyYWzEsWtcIjogMTEsXG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRG9jdW1lbnRIaWRlID0gKCkgPT4ge1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1lYXNlXCIpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1oaWRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFRvRWFzZU91dCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIGVsLnRleHRDb250ZW50ID0gYC5nbG92LWVhc2Uge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtbW96LWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW8tYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtbXMtYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICBhbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICB9XG4gIFxuICBAa2V5ZnJhbWVzIHNtb290aCB7XG4gICAgMCUgeyBvcGFjaXR5OiAwO31cbiAgICAyNSUgeyBvcGFjaXR5OiAwLjI1O31cbiAgICA1MCUgeyBvcGFjaXR5OiAwLjU7fVxuICAgIDc1JSB7IG9wYWNpdHk6IDAuNzU7fVxuICAgIDEwMCUgeyBvcGFjaXR5OiAxO31cbiAgfVxuICBALXdlYmtpdC1rZXlmcmFtZXMgc21vb3RoIHtcbiAgICAwJSB7IG9wYWNpdHk6IDA7fVxuICAgIDI1JSB7IG9wYWNpdHk6IDAuMjU7fVxuICAgIDUwJSB7IG9wYWNpdHk6IDAuNTt9XG4gICAgNzUlIHsgb3BhY2l0eTogMC43NTt9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7fVxuICB9YDtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucHJlcGVuZChlbCk7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UU19MT0NBVElPTik7XG4gICAgaWYgKCF0cmVhdG1lbnRzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzLmpzb24oKTtcbiAgICByZXR1cm4ganNvblRyZWF0bWVudFdlaWdodHM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50IHdlaWdodHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hQbHVzKEVfUlVMRVNfTE9DQVRJT04pO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlcykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0SW5mbyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdCBpbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2hQbHVzKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgaWYgKCFwcm9kdWN0SW5mbykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QgcHJvZHVjdEluZm9DU1YgPSBhd2FpdCBwcm9kdWN0SW5mby50ZXh0KCk7XG4gICAgcmV0dXJuIGNzdlRvQXJyYXkocHJvZHVjdEluZm9DU1YpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVvdXQgPSAodGltZSkgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZSk7XG4gIHJldHVybiBjb250cm9sbGVyO1xufTtcblxuY29uc3QgZmV0Y2hQbHVzID0gKHVybCwgb3B0aW9ucyA9IHt9LCByZXRyaWVzID0gNSkgPT5cbiAgZmV0Y2godXJsLCB7Li4ub3B0aW9ucywgc2lnbmFsOiB0aW1lb3V0KDUwMDApLnNpZ25hbH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5zdGF0dXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIHRpbWVkIG91dCBSZXRyeWluZy4uLjogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIGZhaWxlZDogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdENvb2tpZUlkZW50aWZpZXIgPSAoY29va2llU3RyaW5nLCBjb29raWVOYW1lKSA9PiB7XG4gIGlmICghY29va2llU3RyaW5nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBjb29raWVTdHJpbmdcbiAgICAgIC5zcGxpdChcIjtcIilcbiAgICAgIC5tYXAoKHYpID0+IHYuc3BsaXQoXCI9XCIpKVxuICAgICAgLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgIGlmICh2WzBdICYmIHZbMV0pIHtcbiAgICAgICAgICBhY2NbZGVjb2RlVVJJQ29tcG9uZW50KHZbMF0udHJpbSgpKV0gPSBkZWNvZGVVUklDb21wb25lbnQodlsxXS50cmltKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG5cbiAgbGV0IGlkZW50aWZpZXIgPSBwYXJzZWRbY29va2llTmFtZV07XG4gIGlmICghaWRlbnRpZmllcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChjb29raWVOYW1lID09PSBcIl9nYVwiKSB7XG4gICAgLy8gZXh0cmFjdCB1bmlxdWUgaWRlbnRpZmllciBmcm9tIEdBIGNvb2tpZVxuICAgIGNvbnN0IGlkZW50aWZpZXJJbmRleCA9IDI7XG4gICAgaWRlbnRpZmllciA9IGlkZW50aWZpZXIuc3BsaXQoXCIuXCIpW2lkZW50aWZpZXJJbmRleF07XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXI7XG59O1xuXG5leHBvcnQgY29uc3QgZGV0ZXJtaW5lUGN0ID0gYXN5bmMgKGlkZW50aWZpZXIpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBoYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGlkZW50aWZpZXIpO1xuICAgIGlmIChoYXNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcGN0ID0gaGFzaCAlIDEwMDtcbiAgICBpZiAocGN0ID49IDAgJiYgcGN0IDwgMTAwKSB7XG4gICAgICByZXR1cm4gcGN0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4aXRTY3JvbGxMaXN0ZW5lciA9IChjYWxsQmFjaykgPT4ge1xuICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAobGFzdFNjcm9sbFRvcCAtIDQwMCA+IHNjcm9sbFRvcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChleGl0U2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgY2FsbEJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGV4aXRTY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKGxvb3AsIDUwMCk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXBwbHkgdHJlYXRtZW50cyB0byB0aGUgcGFnZSBvbiBzcGVjaWZpYyBtZWRpYSB0eXBlLlxuICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbWVkaWFRdWVyeUNvbmRpdGlvbiB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICogQHBhcmFtIHtET01Ob2RlTGlzdCB9IGVsZW1lbnRzIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYucHJvZHVjdF9pbmZvXCIpXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVDaGFuZ2VzTWFwIHsgXCJtYXJnaW4tdG9wXCIgOiBcIjEwcmVtXCJ9XG4gKiBAcmV0dXJuc1xuICovXG5cbmV4cG9ydCBjb25zdCBzdHlsZUFwcGxpY2F0b3IgPSAoZWxlbWVudHMsIHN0eWxlQ2hhbmdlc01hcCkgPT4ge1xuICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGUgY2hhbmdlc1wiLCBzdHlsZUNoYW5nZXNNYXAsIFwidG8gZWxlbWVudHNcIiwgZWxlbWVudHMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlQ2hhbmdlc01hcCkpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluamVjdFN0eWxlU2hlZXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICBzdHlsZVNoZWV0LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICBzdHlsZVNoZWV0LnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlU2hlZXQuaHJlZiA9IFNUWUxFU0hFRVRfTE9DQVRJT047XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlQWN0aW9ucyA9IGFzeW5jIChpZGVudGlmaWVyLCBhY3Rpb25zVG9QcmVwYXJlLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHZhcmlhbnRLZXldIG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyB2YXJpYW50S2V5KTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiAhYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSBNYXRoLmZsb29yKDEwMCAvIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5sZW5ndGgpICogKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbVBjdCA8IGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICB2YXJpYW50ID0gdmFyaWFudEtleTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiaWRcIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJ3ZWlnaHRcIiAmJiBrZXkgIT09IFwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zXCIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhcmlhbnRzW3ZhcmlhbnRLZXldW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthY3Rpb25zLCB2YXJpYW50XTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyA9ICgpID0+IHtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBRywgU0VTU0lPTl9USU1FU1RBTVAsIFNFU1NJT05fSElTVE9SWX0gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCBwb3B1cERpc3BsYXlGbGFnID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpO1xuICBjb25zdCBzZXNzaW9uVGltZXN0YW1wID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCk7XG4gIGNvbnN0IHNlc3Npb25IaXN0b3J5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX0hJU1RPUlkpO1xuXG4gIGlmIChwb3B1cERpc3BsYXlGbGFnID09PSBudWxsKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDApO1xuICB9XG4gIGlmICghc2Vzc2lvblRpbWVzdGFtcCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVAsIERhdGUubm93KCkpO1xuICB9XG4gIGlmICghc2Vzc2lvbkhpc3RvcnkpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZV0pO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBzZXNzaW9uSGlzdG9yeV0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29uZGl0aW9uQ2hlY2tlciA9IChydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgaWYgKGNvbmRpdGlvbiA9PT0gXCJub3RFeGlzdFwiKSB7XG4gICAgaWYgKCFydW5UaW1lVmFsdWUpIHtcbiAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHxcbiAgICBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gbnVsbCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IHJ1blRpbWVWYWx1ZSBvciBjb25kaXRpb24gaXMgbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAoY29uZGl0aW9uKSB7XG4gICAgY2FzZSBcImV4aXN0XCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImluY2x1ZGVzXCI6XG4gICAgY2FzZSBcImNvbnRhaW5zXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RJbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJub3RDb250YWluc1wiOlxuICAgICAgaWYgKCFydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID4gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPD0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImJldHdlZW5cIjoge1xuICAgICAgbGV0IFttaW4sIG1heF0gPSB2YWx1ZS5zcGxpdChcIixcIik7XG4gICAgICBtaW4gPSBwYXJzZUludChtaW4pO1xuICAgICAgbWF4ID0gcGFyc2VJbnQobWF4KTtcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gbWluICYmIHJ1blRpbWVWYWx1ZSA8PSBtYXgpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FzZSBcInJlZ2V4XCI6IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh2YWx1ZSwgXCJpXCIpO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QocnVuVGltZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBjb25kaXRpb24gaXMgbm90IGRlZmluZWQgXCIsIGNvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXREZWJ1Z01vZGUgPSAob29zUmVhc29uKSA9PiB7XG4gIGNvbnN0IHtERUJVR19NT0RFLCBPVVRfT0ZfU0NPUEV9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShPVVRfT0ZfU0NPUEUsIG9vc1JlYXNvbik7XG4gIH1cblxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0xXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDEpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MlwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiAyO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTBcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oREVCVUdfTU9ERSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgY3VycmVudCA9IHBhcnNlSW50KHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShERUJVR19NT0RFKSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIChjdXJyZW50ID8gXCJvblwiIDogXCJvZmZcIikpO1xuICByZXR1cm4gKGN1cnJlbnQgfHwgMCk7XG59O1xuXG4vLyBnZXQgR0EgY2xpZW50IGlkIHVzaW5nIGdhLmdldEFsbCgpXG5leHBvcnQgY29uc3QgZ2V0R2FDbGllbnRJZCA9ICgpID0+IHtcbiAgY29uc3QgZ2EgPSB3aW5kb3cuZ2E7XG4gIC8vIGlmIGdhIGFuZCBnYS5nZXRBbGwoKSBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIG51bGxcbiAgaWYgKGdhICYmIGdhLmdldEFsbCkge1xuICAgIGNvbnN0IHRyYWNrZXJzID0gZ2EuZ2V0QWxsKCk7XG4gICAgaWYgKHRyYWNrZXJzICYmIHRyYWNrZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRyYWNrZXJzWzBdLmdldChcImNsaWVudElkXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIGdldCBkZXRlcm1pbmlzdGljIG51bWVyaWMgaGFzaCBmcm9tIHN0cmluZyB0aGF0IGNvbmF0aW5zIG9ubHkgbnVtYmVyc1xuZXhwb3J0IGNvbnN0IGdldFVuc2VjdXJlSGFzaCA9IChzdHIpID0+IHtcbiAgbGV0IGhhc2ggPSAwO1xuICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICB9XG4gIC8vIHJldHVybiBhYnNvbHV0ZSB2YWx1ZVxuICByZXR1cm4gTWF0aC5hYnMoaGFzaCk7XG59O1xuXG4vLyBnZW5lcmF0ZSBhIDMyLWJpdCByYW5kb20gaW50ZWdlclxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKTtcbn07XG5cbi8vIGdldCBjdXJyZW50IHVuaXggZXBvY2ggdGltZSBpbiBzZWNvbmRzXG5leHBvcnQgY29uc3QgZ2V0VW5peFRpbWUgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGdldElkZW50aWZpZXIgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gbG9jYWwgc3RvcmFnZVwiLCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhIGluIGZpcnN0IGF0dGVtcHRcIiwgaWQpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhXCIsIGlkKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgIGlmIChpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IHJlYWQgR0EgY2xpZW50IGlkXCIpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBpbiBnZXRJZGVudGlmaWVyXCIsIGUpO1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGF5ID0gKG1zKSA9PiBuZXcgUHJvbWlzZSgocmVzKSA9PiBzZXRUaW1lb3V0KHJlcywgbXMpKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERlbGl2ZXJ5RGF0ZSA9IChkYXRlKSA9PiB7XG4gIGlmICghZGF0ZSB8fCB0eXBlb2YgZGF0ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGRhdGU7XG5cbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHN0YXJ0TW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIGVuZE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBzdGFydERheTogdW5kZWZpbmVkLFxuICAgIGVuZERheTogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGxldCBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspLShbXFxcXGRdKylcXFxccz8oW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID09PSA0KSB7XG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFszXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKyktKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5sZW5ndGggIT09IDUpIHJldHVybiBkYXRlO1xuXG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbMl0udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFs0XS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCFyZXN1bHQuc3RhcnRNb250aEluZGV4IHx8ICFyZXN1bHQuZW5kTW9udGhJbmRleCkgcmV0dXJuIGRhdGU7XG5cbiAgICBjb25zdCBzdGFydFllYXIgPSByZXN1bHQuc3RhcnRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG4gICAgY29uc3QgZW5kWWVhciA9IHJlc3VsdC5lbmRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG5cbiAgICBjb25zdCBlc3RpbWF0ZWRTdGFydCA9IG5ldyBEYXRlKHN0YXJ0WWVhciwgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCwgcmVzdWx0LnN0YXJ0RGF5KTtcbiAgICBjb25zdCBlc3RpbWF0ZWRFbmQgPSBuZXcgRGF0ZShlbmRZZWFyLCByZXN1bHQuZW5kTW9udGhJbmRleCwgcmVzdWx0LmVuZERheSk7XG5cblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZFN0YXJ0IC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICBjb25zdCBlbmREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkRW5kIC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJXZWVrcyA9IHN0YXJ0RGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoc3RhcnREaWZmT3ZlckRheXMgLyA3KTtcbiAgICBjb25zdCBlbmREaWZmT3ZlcldlZWtzID0gZW5kRGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoZW5kRGlmZk92ZXJEYXlzIC8gNyk7XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPT09IDApIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gLSAke2VuZERpZmZPdmVyRGF5c30gR8O8bmA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID49IDEpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gR8O8biAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IGVuZERpZmZPdmVyV2Vla3MpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlkbGVUaW1lciA9IGFzeW5jICh0aW1lT3V0LCBjYWxsQmFjaykgPT4ge1xuICBsZXQgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcblxuICB3aW5kb3cudG9wLmRvY3VtZW50Lm9udG91Y2hzdGFydCA9IHJlc2V0VGltZXI7XG5cbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcbiAgICBjbGVhclRpbWVvdXQoaWRsZVRpbWVvdXQpO1xuICAgIGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyVHlwZSA9ICgpID0+IHtcbiAgY29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9jaHJvbWV8Y2hyb21pdW18Y3Jpb3MvaSkpIHtcbiAgICByZXR1cm4gXCJjaHJvbWVcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3h8Znhpb3MvaSkpIHtcbiAgICByZXR1cm4gXCJmaXJlZm94XCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9zYWZhcmkvaSkpIHtcbiAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL29wclxcLy9pKSkge1xuICAgIHJldHVybiBcIm9wZXJhXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9lZGcvaSkpIHtcbiAgICByZXR1cm4gXCJlZGdlXCI7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBpc093bk11dGF0aW9uID0gKG11dGF0aW9uTGlzdCkgPT4ge1xuICBjb25zdCBub2RlcyA9IFsuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0ucmVtb3ZlZE5vZGVzKV07XG4gIHJldHVybiBub2Rlcy5zb21lKChuKSA9PiB7XG4gICAgcmV0dXJuIG4udGFnTmFtZSAmJiBBcnJheS5mcm9tKG4uY2xhc3NMaXN0KS5zb21lKChjKSA9PiBjLmluY2x1ZGVzKFwiYm4tXCIpKTtcbiAgfSk7XG59O1xuXG4vLyByZWY6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEyOTMxNjMvMjM0M1xuLy8gVGhpcyB3aWxsIHBhcnNlIGEgZGVsaW1pdGVkIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mXG4vLyBhcnJheXMuIFRoZSBkZWZhdWx0IGRlbGltaXRlciBpcyB0aGUgY29tbWEsIGJ1dCB0aGlzXG4vLyBjYW4gYmUgb3ZlcnJpZGVuIGluIHRoZSBzZWNvbmQgYXJndW1lbnQuXG5mdW5jdGlvbiBjc3ZUb0FycmF5KCBzdHJEYXRhLCBzdHJEZWxpbWl0ZXIgKSB7XG4gIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZGVsaW1pdGVyIGlzIGRlZmluZWQuIElmIG5vdCxcbiAgLy8gdGhlbiBkZWZhdWx0IHRvIGNvbW1hLlxuICBzdHJEZWxpbWl0ZXIgPSAoc3RyRGVsaW1pdGVyIHx8IFwiLFwiKTtcblxuICAvLyBDcmVhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcGFyc2UgdGhlIENTViB2YWx1ZXMuXG4gIGNvbnN0IG9ialBhdHRlcm4gPSBuZXcgUmVnRXhwKFxuICAgICAgKFxuICAgICAgLy8gRGVsaW1pdGVycy5cbiAgICAgICAgXCIoXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJ8XFxcXHI/XFxcXG58XFxcXHJ8XilcIiArXG5cbiAgICAgICAgICAgICAgLy8gUXVvdGVkIGZpZWxkcy5cbiAgICAgICAgICAgICAgXCIoPzpcXFwiKFteXFxcIl0qKD86XFxcIlxcXCJbXlxcXCJdKikqKVxcXCJ8XCIgK1xuXG4gICAgICAgICAgICAgIC8vIFN0YW5kYXJkIGZpZWxkcy5cbiAgICAgICAgICAgICAgXCIoW15cXFwiXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJcXFxcclxcXFxuXSopKVwiXG4gICAgICApLFxuICAgICAgXCJnaVwiLFxuICApO1xuXG5cbiAgLy8gQ3JlYXRlIGFuIGFycmF5IHRvIGhvbGQgb3VyIGRhdGEuIEdpdmUgdGhlIGFycmF5XG4gIC8vIGEgZGVmYXVsdCBlbXB0eSBmaXJzdCByb3cuXG4gIGNvbnN0IGFyckRhdGEgPSBbW11dO1xuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSB0byBob2xkIG91ciBpbmRpdmlkdWFsIHBhdHRlcm5cbiAgLy8gbWF0Y2hpbmcgZ3JvdXBzLlxuICBsZXQgYXJyTWF0Y2hlcyA9IG51bGw7XG5cblxuICAvLyBLZWVwIGxvb3Bpbmcgb3ZlciB0aGUgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXNcbiAgLy8gdW50aWwgd2UgY2FuIG5vIGxvbmdlciBmaW5kIGEgbWF0Y2guXG4gIHdoaWxlIChhcnJNYXRjaGVzID0gb2JqUGF0dGVybi5leGVjKCBzdHJEYXRhICkpIHtcbiAgICAvLyBHZXQgdGhlIGRlbGltaXRlciB0aGF0IHdhcyBmb3VuZC5cbiAgICBjb25zdCBzdHJNYXRjaGVkRGVsaW1pdGVyID0gYXJyTWF0Y2hlc1sxXTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZ2l2ZW4gZGVsaW1pdGVyIGhhcyBhIGxlbmd0aFxuICAgIC8vIChpcyBub3QgdGhlIHN0YXJ0IG9mIHN0cmluZykgYW5kIGlmIGl0IG1hdGNoZXNcbiAgICAvLyBmaWVsZCBkZWxpbWl0ZXIuIElmIGlkIGRvZXMgbm90LCB0aGVuIHdlIGtub3dcbiAgICAvLyB0aGF0IHRoaXMgZGVsaW1pdGVyIGlzIGEgcm93IGRlbGltaXRlci5cbiAgICBpZiAoXG4gICAgICBzdHJNYXRjaGVkRGVsaW1pdGVyLmxlbmd0aCAmJlxuICAgICAgICAgICAgICBzdHJNYXRjaGVkRGVsaW1pdGVyICE9PSBzdHJEZWxpbWl0ZXJcbiAgICApIHtcbiAgICAgIC8vIFNpbmNlIHdlIGhhdmUgcmVhY2hlZCBhIG5ldyByb3cgb2YgZGF0YSxcbiAgICAgIC8vIGFkZCBhbiBlbXB0eSByb3cgdG8gb3VyIGRhdGEgYXJyYXkuXG4gICAgICBhcnJEYXRhLnB1c2goIFtdICk7XG4gICAgfVxuXG4gICAgbGV0IHN0ck1hdGNoZWRWYWx1ZTtcblxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIGRlbGltaXRlciBvdXQgb2YgdGhlIHdheSxcbiAgICAvLyBsZXQncyBjaGVjayB0byBzZWUgd2hpY2gga2luZCBvZiB2YWx1ZSB3ZVxuICAgIC8vIGNhcHR1cmVkIChxdW90ZWQgb3IgdW5xdW90ZWQpLlxuICAgIGlmIChhcnJNYXRjaGVzWzJdKSB7XG4gICAgICAvLyBXZSBmb3VuZCBhIHF1b3RlZCB2YWx1ZS4gV2hlbiB3ZSBjYXB0dXJlXG4gICAgICAvLyB0aGlzIHZhbHVlLCB1bmVzY2FwZSBhbnkgZG91YmxlIHF1b3Rlcy5cbiAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbMl0ucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKCBcIlxcXCJcXFwiXCIsIFwiZ1wiICksXG4gICAgICAgICAgXCJcXFwiXCIsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBmb3VuZCBhIG5vbi1xdW90ZWQgdmFsdWUuXG4gICAgICBzdHJNYXRjaGVkVmFsdWUgPSBhcnJNYXRjaGVzWzNdO1xuICAgIH1cblxuXG4gICAgLy8gTm93IHRoYXQgd2UgaGF2ZSBvdXIgdmFsdWUgc3RyaW5nLCBsZXQncyBhZGRcbiAgICAvLyBpdCB0byB0aGUgZGF0YSBhcnJheS5cbiAgICBhcnJEYXRhW2FyckRhdGEubGVuZ3RoIC0gMV0ucHVzaCggc3RyTWF0Y2hlZFZhbHVlICk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBhcnNlZCBkYXRhLlxuICByZXR1cm4gKCBhcnJEYXRhICk7XG59XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVcIixcbiAgdmVyc2lvbjogMSxcbiAgbWFpbnRlbmFuY2VPcGVyYXRpb25Db3VudDogMTAwMCwgLy8gYWZmZWN0cyB2ZXJzaW9uXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJkYXRhXCIsXG4gICAgaW5kZXhlczogW3tcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJkYXRhX3ZhbHVlXCIsIFwic2Vzc2lvbl9pZFwiXSxcbiAgICB9XSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJpZFwiLCBhdXRvSW5jcmVtZW50OiB0cnVlfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5pbXBvcnQge2dldEJyb3dzZXJUeXBlfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyXCIpO1xuY29uc3QgX3dpbmRvdyA9IHtcbiAgYWxsdGltZTogXCJhbGx0aW1lXCIsIHNlc3Npb246IFwic2Vzc2lvblwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gaW5pdGlhbGl6ZWQgZGIgd2l0aDogXCIsIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIC8vIFRPRE8sIHVuY29tbWVudCBuZXh0IGxpbmUgb25jZSBleGlzdGluZyBzdGFsZSBkYnMgYXJlIHB1cmdlZFxuICAgIC8vIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSk7XG4gICAgaWYgKCFvcGVuUmVxdWVzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW5kZXhlZGRiIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgb3BlblJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIFRPRE8gdXBncmFkZSBleGlzdGluZyBkYiBpbnN0ZWFkIG9mIGRlbGV0ZSBhbmQgY3JlYXRlIGZyb20gc2NyYXRjaFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvcGVuUmVxdWVzdC5yZXN1bHQuZGVsZXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gb3BlblJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgIGlmIChjb25maWcuc3RvcmUuaW5kZXhlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjcmVhdGUgb2JqZWN0IHN0b3JlIG9uIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBiZWFnbGUgaW5kZXhlZCBEQlwiLCBvcGVuUmVxdWVzdC5lcnJvcik7XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRiID0gb3BlblJlcXVlc3QucmVzdWx0O1xuICAgICAgaWYgKGRiLnZlcnNpb24gIT09IDEpIHtcbiAgICAgICAgLy8gVE9ETywgcmVtb3ZlIGRlbGV0ZSByZXF1ZXN0IG9uY2UgZXhpc3Rpbmcgc3RhbGUgZGJzIGFyZSBwdXJnZWRcbiAgICAgICAgY29uc3QgZGVsZXRlUmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoY29uZmlnLmRiTmFtZSk7XG4gICAgICAgIGRlbGV0ZVJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHRoaXMuaW5kZXhlZERCID0gZGI7XG4gICAgfTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkluZGV4ZWREQiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0VHJhbnNhY3Rpb24ocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBhd2FpdCB0aGlzLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCB0eCA9IHRoaXMuaW5kZXhlZERCLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCAocmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikpO1xuICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZShkYXRhTmFtZSwgZGF0YVZhbHVlKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmluaXRUcmFuc2FjdGlvbih0cnVlKTtcbiAgICBjb25zdCBzZXNzaW9uSWQgPSB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKTsgLy8gZGF0ZSBjdXJyZW50IC0yIHNhYXQgIHlpbC1heS1ndW5cbiAgICBjb25zdCB0aW1lID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG5cbiAgICBjb25zdCBwYXlsb2FkID0ge1wiZGF0YV9uYW1lXCI6IGRhdGFOYW1lLCBcImRhdGFfdmFsdWVcIjogZGF0YVZhbHVlLCBcInNlc3Npb25faWRcIjogc2Vzc2lvbklkLCB0aW1lfTtcbiAgICBzdG9yZS5wdXQocGF5bG9hZCk7XG4gIH1cblxuICBtaW5tYXgoZGF0YU5hbWUsIG9wLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IHN0b3JlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RvcmVkID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAob3AgPT09IFwibWluXCIgJiYgdmFsdWVbXCJkYXRhX3ZhbHVlXCJdIDwgc3RvcmVkKSB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtYXhcIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPiBzdG9yZWQpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0b3JlZCA9IHZhbHVlW1wiZGF0YV92YWx1ZVwiXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShzdG9yZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbWluKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gdGhpcy5taW5tYXgoZGF0YU5hbWUsIFwibWluXCIsIHdpbmRvdyk7XG4gIH1cblxuICBtYXgoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtYXhcIiwgd2luZG93KTtcbiAgfVxuXG4gIGdyb3VwQnkoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBpZiAoXCJkYXRhX3ZhbHVlXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKCFtYXAuaGFzKHZhbHVlW1wiZGF0YV92YWx1ZVwiXSkpIG1hcC5zZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdLCAwKTtcbiAgICAgICAgICAgICAgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIG1hcC5nZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShtYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbW9kZShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93KTtcbiAgICBpZiAoZGF0YS5rZXlzKCkubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IG1heCA9IHtuYW1lOiB1bmRlZmluZWQsIHZhbHVlOiAtMX07XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBkYXRhKSB7XG4gICAgICBpZiAobWF4LnZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbWF4Lm5hbWUgPSBrZXk7XG4gICAgICAgIG1heC52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXg7XG4gIH1cblxuICBjb3VudChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN1bShkYXRhTmFtZSwgd2luZG93ID0gXCJhbGx0aW1lXCIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IHRvdGFsID0gMC4wMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICB0b3RhbCArPSBwYXJzZUZsb2F0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHRvdGFsLnRvRml4ZWQoMikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lLCBkYXRhVmFsdWUgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZGF0YVZhbHVlKSB7XG4gICAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlX3Nlc3Npb25cIilcbiAgICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCBkYXRhVmFsdWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpLnRvU3RyaW5nKCldKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZVwiKVxuICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCBkYXRhVmFsdWVdKSk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdyA9PT0gX3dpbmRvdy5zZXNzaW9uKSB7XG4gICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpLnRvU3RyaW5nKCldKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXhWYWx1ZSA9IGdldEJyb3dzZXJUeXBlKCkgPT09IFwic2FmYXJpXCIgPyBkYXRhTmFtZSA6IFtkYXRhTmFtZV07XG5cbiAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZVwiKVxuICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KGluZGV4VmFsdWUpKTtcbiAgfVxuXG4gIGFzeW5jIGF2ZyhkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgY29uc3QgdG90YWwgPSBhd2FpdCB0aGlzLnN1bShkYXRhTmFtZSwgd2luZG93KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMuY291bnQoZGF0YU5hbWUsIHdpbmRvdyk7XG5cbiAgICBpZiAoIXRvdGFsIHx8ICFjb3VudCkgcmV0dXJuIDA7XG5cbiAgICByZXR1cm4gKHRvdGFsIC8gY291bnQpLnRvRml4ZWQoMik7XG4gIH1cblxuICBhc3luYyBsYXN0KGRhdGFOYW1lLCBzaXplID0gMSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBjdXJzb3IgPSBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpLm9wZW5DdXJzb3IoW2RhdGFOYW1lXSwgXCJwcmV2XCIpO1xuICAgICAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgICAgICBjdXJzb3IgPSBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAgICAgLm9wZW5DdXJzb3IoW2RhdGFOYW1lLCB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKV0sIFwicHJldlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBjdXJzb3Iub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChyZXN1bHQgJiYgaW5kZXggPCBzaXplKSB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50U2Vzc2lvbklkKCkge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0SG91cnMoZC5nZXRIb3VycygpIC0gMik7XG5cbiAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpICsgXCItXCIgK1xuICAgICAgKGQuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpICsgXCItXCIgK1xuICAgICAgZC5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBDb2xsZWN0b3JBcGkgZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uL2FwaVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvblwiKTtcbmNvbnN0IGNvbGxlY3RvckFwaSA9IG5ldyBDb2xsZWN0b3JBcGkoKTtcblxuLy8ga2VlcCBhIHRhYmxlIGluIGluZGV4ZGIgdGhlIGZvcm1hdCBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBkYXRhX3ZhbHVlLCBzdG9yZWRfdmFsdWVdXG5cbmV4cG9ydCBjb25zdCBxdWVyeUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdykgPT4ge1xuICBsb2dnZXIubG9nKFwicXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpO1xuICBpZiAoIWNvbGxlY3RvckFwaSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJJbmRleGVkREIgbm8gc3VwcG9ydGVkL0luaXRpYWxpemVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gd2luZG93IGNhbiBiZSBlaXRoZXIgc2FtZWRheSBvciBhbGx0aW1lXG5cbiAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1pblwiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLm1pbihiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtYXhcIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5tYXgoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiYXZnXCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkuYXZnKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImNkXCIpIHtcbiAgICByZXR1cm4gKGF3YWl0IGNvbGxlY3RvckFwaS5ncm91cEJ5KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KSkuc2l6ZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjdlwiKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGNvbGxlY3RvckFwaS5ncm91cEJ5KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcblxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBbLCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgY291bnQgKz0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtb2RlXCIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY29sbGVjdG9yQXBpLm1vZGUoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGRhdGEubmFtZTtcbiAgfVxuXG4gIGlmIChxdWVyeU1ldGhvZC5pbmRleE9mKFwibGFzdFwiKSA+PSAwKSB7XG4gICAgY29uc3QgbWF0Y2ggPSBxdWVyeU1ldGhvZC5tYXRjaChcImxhc3RcXFxcKChbXFxcXGRdKylcXFxcKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaC5sZW5ndGggPT09IDIgfHwgcGFyc2VJbnQobWF0Y2hbMV0pIDwgMSApIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5sYXN0KGJhc2VGZWF0dXJlTmFtZSwgbWF0Y2hbMV0sIHdpbmRvdyk7XG4gICAgY29uc3QgZGF0YVZhbHVlcyA9IHF1ZXJ5UHJvbWlzZS5tYXAoKG9iaikgPT4gb2JqLmRhdGFfdmFsdWUpO1xuICAgIHJldHVybiBkYXRhVmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAge1wiTGlzdGluZ3BhZ2VcIiA9PiAyMX1cbiAgICB7XCJIb21lcGFnZVwiID0+IDEyfVxuICAgIC0tIGV4YW1wbGUgd2lsbCBoYXZlOlxuICAgIG1vZGU6IExpc3RpbmdwYWdlXG4gICAgY2Q6IDJcbiAgICBjdjogMjErMTJcbiAgICBsYXN0KDMpIChuLCBuLTEsIG4tMilcbiAgKi9cblxuICAvLyAxMDAwbGlrIHRlbWl6bGVuZWNlayAobWFpbnRPcENvdW50IC0+IHZlcnNpb24pXG5cbiAgLy8gcXVlcnlNZXRob2QgY2FuIGJlIFwibW9kZVwiLCBcImNkXCIgKGNvdW50IGRpc3RpbnQpIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlc1xuICAvLyBxdWVyeU1ldGhvZCBjYW4gYmUgXCJjdlwiIChzdW0gb2YgY291bnQgdmFsdWVzKSwgXCJjdXJyZW50XCIsIG9yIFwicHJldlwiIGZvciBhbnkgZGF0YSB0eXBlIChzdG9yZWQgdmlhIGxhc3QpXG4gIGxvZ2dlci5mYWlsZWQoYHVua25vd24gcXVlcnlNZXRob2Q9JHtxdWVyeU1ldGhvZH0gaW4gQmVhZ2xlRGF0YUNvbGxlY3Rpb25gKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpID0+IHtcbiAgbG9nZ2VyLmxvZyhcInVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKTtcbiAgaWYgKCFjb2xsZWN0b3JBcGkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiSW5kZXhlZERCIG5vIHN1cHBvcnRlZC9Jbml0aWFsaXplZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGF3YWl0IGNvbGxlY3RvckFwaS5zYXZlKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG5cblxuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwibWluXCIsIFwibWF4XCIsIFwiY250XCIsIFwic3VtXCIgZm9yIG51bWVyaWMgZGF0YSB0eXBlcywgbWluLW1heCBjb21wYXJlcyB3aXRoIG9ubHkgZXhpc3RpbmcsIGF2ZyB1cGRhdGVzIGNudCBhbmQgc3VtXG4gIC8vIC0tPiBtaW46IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwibWluXCIsIChsZWFzdCBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IG1heDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJtYXhcIiwgKGdyZWF0ZXN0IG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gc3VtOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInN1bVwiLCAoc3VtIG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gY250OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImNudFwiLCAoZXhpc3RpbmcgKyAxKV1cbiAgLy9cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImNvdW50X3ZhbHVlc1wiIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlcywga2VlcCBhIGNvdW50ZXIgZm9yIGVhY2ggdmFsdWVcbiAgLy8gLS0+IGNvdW50X3ZhbHVlczogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgZGF0YV92YWx1ZSwgKGV4aXN0aW5nICsgMSldXG4gIC8vXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJsYXN0XCIgZm9yIGFueSBkYXRhIHR5cGUgLS0+IGtlZXBzIDIgdmFsdWVzIGZvciBjdXJyZW50IGFuZCB0aGUgcHJldmlvdXNcbiAgLy8gZGVsZXRlOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInByZXZcIiwgKGV4aXN0aW5nIHZhbHVlKV1cbiAgLy8gbW92ZTogZXhpc3RpbmcgW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjdXJyZW50XCIsIChleGlzdGluZyB2YWx1ZSldIC0tPiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInByZXZcIiwgKGV4aXN0aW5nIHZhbHVlKV1cbiAgLy8gcHV0OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImN1cnJlbnRcIiwgKGluY29taW5nIHN0b3JlZF92YWx1ZSldXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtmb3JtYXREZWxpdmVyeURhdGUsIGlzT3duTXV0YXRpb259IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtxdWVyeUluQ29sbGVjdG9yLCB1cGRhdGVJbkNvbGxlY3Rvcn0gZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxud2luZG93LmJlYWdsZUluZm9MYXllciA9IHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgfHwge1xuICBhOiB7fSwgZToge30sIGY6IHt9LCBfX2h3bTogMCxcbn07XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJcIik7XG5cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5jb25zdCBzZWFyY2hQYXRocyA9IFtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHQSBEYXRhIExheWVyIFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlBhZ2VUeXBlXCIsIG5hbWU6IFwiUGFnZVR5cGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBkcC5ncm91cFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwidXBwZXJDYXNlVFJcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUHJvZHVjdElEXCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5kZXRhaWwuYWN0aW9uRmllbGQubGlzdFwiLCBuYW1lOiBcInBkcC5saXN0YWxpYXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouc2t1XCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5kaXNjb3VudFJhdGVcIiwgbmFtZTogXCJwZHAuZGlzY291bnRSYXRlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmZhc3REZWxpdmVyeVwiLCBuYW1lOiBcInBkcC5mYXN0RGVsaXZlcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInNlYXJjaF9zdWNjZXNzXCIsIG5hbWU6IFwicGxwLnNlYXJjaFN1Y2Nlc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuaWRcIiwgXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBcInBscC5uYW1lXCIsIFwicGxwLmdyb3VwXCIsIFwicGxwLmNsYXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBscC5pZFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGxwLmdyb3VwXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJMaXN0aW5ncGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtbWFpbi1kZXRhaWxzXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwid2VsY29tZV91c2VybmFtZVxcXCJdXCIsIG5hbWU6IFwidmlldy5pc0xvZ2dlZEluXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZW1wdHlfYmFza2V0X3RleHRcXFwiXVwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC50b3RhbEJhc2VQcmljZVwiLCBcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfdG90YWxfcHJpY2VcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltpZCo9XFxcImNhcnRfcXVhbnRpdHlcXFwiXSwgW2NsYXNzKj1cXFwiYmFza2V0X2xlbmd0aFxcXCJdXCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LXRpdGxlXFxcIl0sIFtjbGFzcyo9XFxcImhlYWRlci1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwidml2ZW5zZS1zaG93cm9vbXNcXFwiXSA+ICpcIiwgbmFtZTogXCJwZHAuc2hvd3Jvb21jb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5Q291bnRFbHRzXCIsIGV4Y2x1c2l2ZTogW1wicGRwLmhhc05vU2hvd3Jvb21zXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWNhcmRbZGF0YS1wcm9kdWN0LXNrdV1cIiwgbmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByb2R1Y3Qtc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWxpc3RcIiwgb2JzZXJ2ZXI6IFwibGlzdGluZ0l0ZW1CbG9ja1wiLCBuYW1lOiBcIl9fbGlzdGluZ0l0ZW1CbG9ja09ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgb2JzZXJ2ZXI6IFwiY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG9ic2VydmVyOiBcImNoZWNrb3V0Rm9ybVwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF9zdW1tYXJ5X3RvdGFsXFxcIl0sIFtjbGFzcyo9XFxcInRvdGFsX3Jvd1xcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlcl9mb2xsb3dfbnVtYlxcXCJdLCBbY2xhc3MqPVxcXCJjYXJ0LXRpdGxlLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UudnZzVHhuSWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucGF5bWVudF90eXBlX3RpdGxlLCAuY2FydC10aXRsZS1pbmZvXCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdF9za3VfY29kZVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU09SRyBFbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwic2t1XCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1wblwiLCBuYW1lOiBcInBkcC5tcG5cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJuYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJKU09ORmlsdGVyT3RoZXJcIiwgdmFsdWU6IFwiQHR5cGU9UHJvZHVjdFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVZhbGlkVW50aWxcIiwgbmFtZTogXCJwZHAucHJpY2VWYWxpZFVudGlsXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiaXRlbUxpc3RFbGVtZW50LioubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm51bWJlck9mSXRlbXNcIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiYnJlYWRjcnVtYi5pdGVtTGlzdEVsZW1lbnQuKi5pdGVtLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBXaW5kb3cgY3VzdG9tIGVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJmYXZvcml0ZVByb2R1Y3RzXCIsIG5hbWU6IFwidmlldy5mYXZvcml0ZWRNUE5zXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcInRvU3RyaW5nXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXTtcblxuY29uc3QgZmVhdHVyZUVuZ2luZWVyaW5nT3BzID0ge1xuICBcInZpZXdfZXBvY2hcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibWluXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtaW5cIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS52aWV3X2Vwb2NoX21pblwifSxcbiAgXSxcbiAgXCJQYWdlVHlwZVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJjb3VudF92YWx1ZXNcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImN2XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcImFsbHRpbWVcIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9hbGx0aW1lXCJ9LFxuICBdLFxuICBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMubGFzdENhcnRDb3Vwb25BcHBsaWNhYmxlXCJ9LFxuICBdLFxuICBcInBkcC5jYXRlZ29yeVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJjb3VudF92YWx1ZXNcIn0sXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtb2RlXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X21vZGVfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9sYXN0X3Nlc3Npb25cIn0sXG4gIF0sXG4gIFwiY2FydC5za3VzXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0Q2FydFZpZXdcIn0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3QgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00gPSAoKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmZvTGF5ZXIuX19od20gKz0gMTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUb0JlYWdsZUluZm9MYXllciA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gaWYgdmFsdWUgaXMgc3RyaW5nLCBhZGQgYXMgYSBjbGVhbiBzdHJpbmcsIGlmIG9iamVjdCBhZGQgdGhlIHNhbWVcbiAgY29uc3QgdHlwZWRWYWx1ZSA9IHR5cGVvZiAodmFsdWUpID09PSBcInN0cmluZ1wiID8gdmFsdWUudG9TdHJpbmcoKS50cmltKCkgOiB2YWx1ZTtcbiAgLy8gaWYga2V5IGNvbnRhaW5zIC4gY3JlYXRlIG5lc3RlZCBvYmplY3RcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgb2JqW2tleV0gPSB7fTtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIG9ialtsYXN0S2V5XSA9IHR5cGVkVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgaW5mb0xheWVyW2tleV0gPSB0eXBlZFZhbHVlO1xuICB9XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBpZiAodHlwZWRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVkVmFsdWUgIT09IG51bGwpIHtcbiAgICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgdHlwZWRWYWx1ZSk7XG4gICAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCB0eXBlZFZhbHVlKTtcbiAgfVxufTtcblxuY29uc3QgREFUQV9MSVNURU5FUlMgPSB7fTtcblxuZXhwb3J0IGNvbnN0IGFkZERhdGFMaXN0ZW5lciA9IChrZXksIGxpc3RlbmVyKSA9PiB7XG4gIGlmICghREFUQV9MSVNURU5FUlNba2V5XSkge1xuICAgIERBVEFfTElTVEVORVJTW2tleV0gPSBbXTtcbiAgfVxuICBEQVRBX0xJU1RFTkVSU1trZXldLnB1c2gobGlzdGVuZXIpO1xufTtcblxuY29uc3QgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBEQVRBX0xJU1RFTkVSU1trZXldO1xuICBpZiAobGlzdGVuZXJzICYmIEFycmF5LmlzQXJyYXkobGlzdGVuZXJzKSAmJiBsaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsb2dnZXIubG9nKGBwYXNzVmFsdWVUb0xpc3RlbmVycyAtLT4gdmFsdWUgJHt2YWx1ZX0gdG8gbGlzdGVuZXIgJHtpfSBvZiBrZXkgJHtrZXl9YCk7XG4gICAgICAgIGxpc3RlbmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgYmxvY2tpbmcgPSBmYWxzZSwgcG9sbEludGVydmFsID0gNTAsIHRpbWVvdXQgPSAxMDAwMCkgPT4ge1xuICAvLyBUT0RPOiBjaGVjayBmZWF0dXJlRW5naW5lZXJpbmcgYW5kIHNlYXJjaCBsaXN0IGlmIGFsbCBtYXJrZWQgYXMgZm91bmQgYnV0IHZhbHVlIGlzIG1pc3NpbmdcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHJldHVybiBudWxsIGlmIGtleSBpcyBtaXNzaW5nIG9yIG5vdCBhbiBhcnJheSBvciBoYXMgbm8gZWxlbWVudHNcbiAgaWYgKCFrZXkpIHJldHVybiBudWxsO1xuICBsZXQgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXlcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG9idGFpbkRhdGEpO1xuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYmxvY2tpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gICAgICAgIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleSwgY2xlYXIgaW50ZXJ2YWwgYW5kIHJlc29sdmVcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKG9idGFpbkRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChrZXkgPT09IHNlYXJjaEVsZW1lbnQubmFtZSAmJiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpKSB7XG4gICAgICAgICAgICAvLyBkYXRhIGlzIG1pc3NpbmcgYnV0IGVsZW1lbnQgaXMgbWFya2VkIGFzIGZvdW5kIG9yIGlnbm9yZWRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHBvbGxJbnRlcnZhbCk7XG4gICAgICAvLyBhZGQgdGltZW91dFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfSwgdGltZW91dCk7IC8vIHdhaXQgYmxvY2tpbmcgZm9yIFwidGltZW91dFwiIG1zZWNzXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyByZW1vdmUga2V5IGZyb20gaW5mb0xheWVyXG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIHJldHVybjtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIGxvZ2dlci5sb2coXCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyXCIsIGBSZW1vdmluZyAke2xhc3RLZXl9IGZyb20gJHtKU09OLnN0cmluZ2lmeShvYmopfWApO1xuICAgIGRlbGV0ZSBvYmpbbGFzdEtleV07XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGluZm9MYXllcltrZXldO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgbnVsbCk7XG4gIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgbnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVHJlYXRtZW50ID0gKGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgc3RhdHVzLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gbnVsbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHt9O1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlSWQgIT09IHVuZGVmaW5lZCkgdmFsdWUuYnVzaW5lc3NSdWxlSWQgPSBidXNpbmVzc1J1bGVJZDtcbiAgaWYgKHZhcmlhbnQpIHZhbHVlLnZhcmlhbnQgPSB2YXJpYW50O1xuXG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcImFwcGxpZWRcIjpcbiAgICAgIGluZm9MYXllci5hW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNraXBwZWRcIjpcbiAgICAgIHZhbHVlLmRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50O1xuICAgICAgaW5mb0xheWVyLmVbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZmFpbGVkXCI6XG4gICAgICBpbmZvTGF5ZXIuZltpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG59O1xuXG5jb25zdCBQQVJTRVNFQVJDSE1BWFJFVFJZID0gMTA7XG5jb25zdCBQQVJTRVNFQVJDSFNUQVJUREVMQVkgPSAxMDtcbmxldCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIgPSBhc3luYyAoKSA9PiB7XG4gIC8vIENvbGxlY3QgY29yZSBkYXRhXG4gIHByZXBhcmVDb3JlRGF0YSgpO1xuXG4gIC8vIFRyaWdnZXItc3RhcnQgdGhlIHBhcnNlciBsb29wXG4gIHBhcnNlckNhbGxlcigpO1xuXG4gIC8vIEFkZCBtZXRyaWNzXG4gIGFkZE1ldHJpY3MoKTtcbn07XG5cbmNvbnN0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJhc2VGZWF0dXJlTmFtZXMgPSBPYmplY3Qua2V5cyhmZWF0dXJlRW5naW5lZXJpbmdPcHMpO1xuICBmb3IgKGNvbnN0IGJhc2VGZWF0dXJlTmFtZSBvZiBiYXNlRmVhdHVyZU5hbWVzKSB7XG4gICAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gICAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgICAgaWYgKEZFT3AucXVlcnlNZXRob2QgPT09IG51bGwgfHwgRkVPcC5xdWVyeU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBGRU9wLnF1ZXJ5TWV0aG9kLCBGRU9wLndpbmRvdyk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKEZFT3AuZmVhdHVyZU5hbWUsIHF1ZXJ5UmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpID0+IHtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGF3YWl0IHVwZGF0ZUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgRkVPcC51cGRhdGVNZXRob2QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcHJvY2Vzc0Zvcm1hdHRlciA9ICh2YWx1ZSwgZm9ybWF0dGVyKSA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFmb3JtYXR0ZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzd2l0Y2ggKGZvcm1hdHRlcikge1xuICAgIGNhc2UgXCJ1cHBlckNhc2VUUlwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoXCJ0ci1UUlwiKTtcbiAgICBjYXNlIFwiZm9ybWF0RGVsaXZlcnlEYXRlXCI6XG4gICAgICByZXR1cm4gZm9ybWF0RGVsaXZlcnlEYXRlKHZhbHVlKTtcbiAgICBjYXNlIFwibnVtZXJpY09ubHlcIjpcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgY2FzZSBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZShcInRyLVRSXCIpLnNwbGl0KFwiIFwiKVswXTtcbiAgICBjYXNlIFwiZGVhcnJheVwiOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgXCJ0b1N0cmluZ1wiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaE9iaiA9IChvYmosIHNlYXJjaEVsZW1lbnQpID0+IHtcbiAgbGV0IHZhbHVlO1xuICBsZXQgbGF5ZXJWYWx1ZTtcblxuICB0cnkge1xuICAgIHN3aXRjaCAoc2VhcmNoRWxlbWVudC5vcGVyYW5kKSB7XG4gICAgICBjYXNlIFwiSlNPTkZpbHRlck90aGVyXCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJQYXJhbXMgPSBzZWFyY2hFbGVtZW50LnZhbHVlLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICBpZiAoZmlsdGVyUGFyYW1zLmxlbmd0aCAhPT0gMikgYnJlYWs7XG4gICAgICAgICAgY29uc3QgZmlsdGVyTmFtZSA9IGZpbHRlclBhcmFtc1swXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGZpbHRlclBhcmFtc1sxXTtcbiAgICAgICAgICBpZiAoIWZpbHRlck5hbWUgfHwgIWZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoID0ganNvbkdldChvYmosIGZpbHRlck5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFmaWx0ZXJNYXRjaCB8fCBmaWx0ZXJNYXRjaCAhPT0gZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgaWYgKHZhbHVlICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeU9ic2VydmVcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICBjb25zdCB0b0JlVXBkYXRlZCA9IFtdO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBzZWFyY2hQYXRocy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PT0gY2hpbGQpO1xuICAgICAgICAgICAgLy8gYWRkIGNoaWxkRWxlbWVudHMgaW50byB0b0JlVXBkYXRlZFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQucHVzaCguLi5jaGlsZEVsZW1lbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBydW4gb25seSBpZiB0aGUgZWxlbWVudCBoYXMgYWRkZWQgb3IgcmVtb3ZlZCBjaGlsZHJlblxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgZnVuY3Rpb24obXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgICAgaWYgKGlzT3duTXV0YXRpb24obXV0YXRpb25MaXN0KSkgcmV0dXJuO1xuICAgICAgICAgICAgdG9CZVVwZGF0ZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50LmlzRm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllcihlbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyUmVzdGFydCA9IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA+PSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyUmVzdGFydCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwic2VhcmNoT2JqOiB0cmlnZ2VyZWQgYSByZXN0YXJ0IG9mIHNlYXJjaHBhdGhzIGR1ZTogXCIsIHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgIHBhcnNlckNhbGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodmFsdWUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUlubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgYXR0cmliVmFsdWVMaXN0ID0gW107XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWVjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYXR0cmliVmFsdWUgPSB2YWx1ZWNoaWxkLmdldEF0dHJpYnV0ZShzZWFyY2hFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZSkge1xuICAgICAgICAgICAgICBhdHRyaWJWYWx1ZUxpc3QucHVzaChhdHRyaWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJpYlZhbHVlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXR0cmliVmFsdWVMaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHNldFZhbHVlID0gdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwO1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZXRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5Q291bnRFbHRzXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2VhcmNoRWxlbWVudC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGxldCBzdW1QcmljZSA9IDA7XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgc3VtUHJpY2UrPXBhcnNlSW50KGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdW1QcmljZSA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBzdW1QcmljZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGFycmF5SW5uZXJUZXh0ID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBhcnJheUlubmVyVGV4dC5wdXNoKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUlubmVyVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXJyYXlJbm5lclRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9IC8vIHN3aXRjaFxuXG4gICAgaWYgKGxheWVyVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBsYXllclZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpIHtcbiAgICAgICAgbGF5ZXJWYWx1ZSA9IHByb2Nlc3NGb3JtYXR0ZXIobGF5ZXJWYWx1ZSwgc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpO1xuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoc2VhcmNoRWxlbWVudC5uYW1lLCBsYXllclZhbHVlKTtcbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG5cbiAgICAgIC8vIG1hcmsgZXhjbHVzaXZlIGVsZW1lbnRzIGFzIGZvdW5kXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSkgJiYgc2VhcmNoRWxlbWVudC5leGNsdXNpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGV4Y2x1c2l2ZUVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUuaW5jbHVkZXMoZXhjbHVzaXZlRWxlbWVudC5uYW1lKSkge1xuICAgICAgICAgICAgZXhjbHVzaXZlRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwic2VhcmNoT2JqIGVycm9yOiBcIiArIGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGN1c3RvbURhdGFEZXJpdmF0aW9ucyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUsIDUwLCAxMDAwKTtcblxuICB0cnkge1xuICAgIC8vIGNhcnQgdG90YWwgcHJvZHVjdCBwcmljZSBpcyBub3QgYXZhaWxhYmxlIGFueXdoZXJlLCBzcGVjaWFsIGRpc2NvdW50cyBldGMgYXJlIGhhcmQgdG8gc2NyYXBlLCBzbyByZWNhbGN1bGF0ZSBpdFxuICAgIGNvbnN0IFtpc0NhcnRFbXB0eSwgdG90YWxCYXNlUHJpY2UsIGNvdXBvbk5vdEFwcGxpY2FibGUsIHByaWNlcywgcXVhbnRpdGllc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5pc2VtcHR5XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxCYXNlUHJpY2VcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucHJpY2VzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucXVhbnRpdGllc1wiKSxcbiAgICBdKTtcblxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcblxuICAgIGlmICghdG90YWxCYXNlUHJpY2UgJiYgcHJpY2VzICYmIEFycmF5LmlzQXJyYXkocHJpY2VzKSAmJiBwcmljZXMubGVuZ3RoID4gMCAmJiBxdWFudGl0aWVzICYmIEFycmF5LmlzQXJyYXkocXVhbnRpdGllcykgJiYgcXVhbnRpdGllcy5sZW5ndGggPiAwICYmIHByaWNlcy5sZW5ndGggPT09IHF1YW50aXRpZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3RhbFByaWNlICs9IHBhcnNlSW50KHByaWNlc1tpXSkgKiBwYXJzZUludChxdWFudGl0aWVzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxQcmljZSA9IHBhcnNlSW50KHRvdGFsQmFzZVByaWNlKTtcbiAgICB9XG5cbiAgICBsZXQgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlICYmIGNvdXBvbk5vdEFwcGxpY2FibGUpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSB0b3RhbFByaWNlIC0gcGFyc2VJbnQoY291cG9uTm90QXBwbGljYWJsZSk7XG4gICAgfSBlbHNlIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHBhcnNlSW50KHRvdGFsUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIiwgY291cG9uQXBwbGljYWJsZUFtb3VudCk7XG5cbiAgICBpZiAoaXNDYXJ0RW1wdHkpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbFByaWNlXCIsIDApO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgMCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiY3VzdG9tRGF0YURlcml2YXRpb25zIGNhbm5vdCBjb21wdXRlIGNvdXBvbkFwcGxpY2FibGVQcmljZTogXCIgKyBlKTtcbiAgfVxuXG4gIC8vIFByb2R1Y3QgcGFnZSAtLT4gdHJhbnNmZXIgc2t1cyB0byBzaW5nbGUgbG9jYXRpb25cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJQcm9kdWN0cGFnZVwiKSB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIik7XG4gICAgaWYgKHNrdSE9PW51bGwgJiYgc2t1IT09dW5kZWZpbmVkKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBbc2t1XSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJiYXNrZXRcIikge1xuICAgIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5za3VzXCIpO1xuICAgIGlmIChza3VMaXN0IT09bnVsbCAmJiBBcnJheS5pc0FycmF5KHNrdUxpc3QpICYmIHNrdUxpc3QubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBza3VMaXN0KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHBhcnNlU2VhcmNoUGF0aHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRvbVN0YXR1cyA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIC8vIGNoZWNrIGlmIGRvY3VtZW50IGFuZCBkb20gaXMgbG9hZGVkIGFuZCByZWFkeSBmb3Igc2NyYXBwaW5nXG4gIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGluaXRpYWxpemVkIHdpdGggZG9tIHN0YXR1czogIFwiICsgZG9tU3RhdHVzKTtcblxuICBjb25zdCB3aW50b3AgPSB3aW5kb3cudG9wO1xuICBjb25zdCBkYXRhTGF5ZXIgPSB3aW50b3AuZGF0YUxheWVyO1xuICBjb25zdCB3aW5kb2MgPSB3aW50b3AuZG9jdW1lbnQ7XG4gIGxldCBzb3JnQXJyYXlJbm5lcjtcblxuICBjb25zdCBmb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBwcmV2Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgbm90Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcblxuICAvLyBQYWdlVHlwZSBjYW4gYmUgaW5mZXJyZWQgZnJvbSBVUkwsIGlmIGZvdW5kIHVzZSBpdCBmcm9tIHRoZXJlXG4gIGxldCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG5cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSkge1xuICAgIHByZXZGb3VuZE5hbWVzLmFkZChcIlBhZ2VUeXBlXCIpO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHNlYXJjaCBsaXN0cyBhbmQgbWFyayBmb3VuZCBuYW1lc1xuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICBwcmV2Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChmb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpIHx8IHByZXZGb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAvLyBoYWQgYWxyZWFkeSBmb3VuZCB0aGlzIGVsZW1lbnQgb24gYW5vdGhlciBwYXJzZSBpdGVtXG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQgIT09IFwiKlwiKSB7XG4gICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG4gICAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZC5pbmRleE9mKGN1cnJlbnRQYWdlVHlwZSkgPCAwKSB7XG4gICAgICAgIC8vIHNraXAgc2VhcmNoRWxlbWVudCBiZWNhdXNlIG9mIFBhZ2VUeXBlRGVwZW5kXG4gICAgICAgIHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiU2luZ2xlV1RcIikgeyAvLyBTQ0FOIFdpbmRvdyBmb3IgU2luZ2xlIEVsZW1lbnRzXG4gICAgICBzZWFyY2hBbmRTZXQod2ludG9wLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkdBRGF0YUxheWVyXCIpIHsgLy8gU0NBTiBHQSBEQVRBIExBWUVSXG4gICAgICBmb3IgKGNvbnN0IGRhdGFMYXllckl0ZW0gb2YgZGF0YUxheWVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChkYXRhTGF5ZXJJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1NvcmdcIikgeyAvLyBTQ0FOIFNPUkcgQVJSQVlcbiAgICAgIGlmICghc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc29yZ0FycmF5SW5uZXIgPSBnZXRTT1JHQXJyYXkoKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgc29yZ0l0ZW0gb2Ygc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KHNvcmdJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1F1ZXJ5XCIpIHsgLy8gU0NBTiBET0NVTUVOVFxuICAgICAgc2VhcmNoQW5kU2V0KHdpbmRvYywgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSAvLyBET0NRVUVSWSBwYXJzZVxuICB9XG5cbiAgaWYgKG5vdEZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgZm91bmQgYWxsIGVsZW1lbnRzIC0gc2V0dGluZyByZXRyeSB0byBtYXhcIik7XG4gIH0gZWxzZSBpZiAoZm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgLy8gdXBkYXRlIHJldHJ5IGNvdW50ZXIgYW5kIGRlbGF5IG9ubHkgaWYgZG9tIGlzIGFjdGl2ZVxuICAgIGlmIChkb21TdGF0dXMgPT09IFwiY29tcGxldGVcIiB8fCBkb21TdGF0dXMgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICo9IDI7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKz0gMTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQgYnV0IG5vdCBmb3VuZCBhbnksIHNldHRpbmcgZGVsYXkgYW5kIHJldHJ5IHRvIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwiIGFuZCBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKyBcIiBmb3Igbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl1cIixcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZDogbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl0gYW5kIGZvdW5kIFwiICtcbiAgICAgIGZvdW5kTmFtZXMuc2l6ZSxcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hBbmRTZXQgPSAob2JqLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKSA9PiB7XG4gIGlmIChzZWFyY2hPYmoob2JqLCBzZWFyY2hFbGVtZW50KSkge1xuICAgIGZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfVxufTtcblxuLy8gcGFyc2Ugc291cmNlXG5jb25zdCBwYXJzZXJDYWxsZXIgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgYXdhaXQgcGFyc2VTZWFyY2hQYXRocygpO1xuICBpZiAocGFyc2VTZWFyY2hQYXRoc1JldHJ5IDwgUEFSU0VTRUFSQ0hNQVhSRVRSWSkge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzOiBzY2hlZHVsZWQgdG8gYmUgcmVjYWxsZWQgaW4gXCIgKyBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKyBcIm1zXCIpO1xuICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCBwYXJzZXJDYWxsZXIoKTtcbiAgICB9LCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkpO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzOiByZWFjaGVkIG1heCByZXRyeSwgY2FsbGluZyByZW1haW5kZXIgaGlzdG9yaWNhbCBkYXRhXCIpO1xuICAgIGF3YWl0IGN1c3RvbURhdGFEZXJpdmF0aW9ucygpO1xuICAgIGF3YWl0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IoKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSk7XG4gIH1cbn07XG5cbi8vIEV4dHJhY3QgdmFsdWUgZnJvbSBqc29uIG9iamVjdCB1c2luZyBnaXZlbiBwYXRoXG4vLyBJZiBhbiBlbGVtZW50IGlzICosIGNvbmNhdGVuYXRlIHJlY3Vyc2l2ZWx5IGFsbCBzdWItcGF0aCB2YWx1ZXMgYXMgc3RyaW5nXG5jb25zdCBqc29uR2V0ID0gKG9iaiwgcGF0aCkgPT4ge1xuICBpZiAoIW9iaikgcmV0dXJuIG51bGw7XG4gIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHBhdGhBcnJheVtpXSA9PT0gXCIqXCIpIHtcbiAgICAgICAgY29uc3Qgc3ViUGF0aCA9IHBhdGhBcnJheS5zbGljZShpICsgMSkuam9pbihcIi5cIik7XG4gICAgICAgIGNvbnN0IHN1YkFycmF5ID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IGluIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFtzdWJLZXldICE9PSB1bmRlZmluZWQgJiYgY3VycmVudFtzdWJLZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWYWx1ZSA9IGpzb25HZXQoY3VycmVudFtzdWJLZXldLCBzdWJQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdWJWYWx1ZSAhPT0gbnVsbCAmJiBzdWJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHN1YkFycmF5LnB1c2goc3ViVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViQXJyYXk7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtwYXRoQXJyYXlbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBwcmVwYXJlQ29yZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IG5hdlB0ciA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I7XG5cbiAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnREYXRhPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50O1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlBsYXRmb3JtXCIsIHBsYXRmb3JtKTtcblxuICAvKiB3aW5kb3cgdmlldyBhcmVhICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1BSYXRpb1wiLCB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG5cbiAgY29uc3QgYXZhaWxXaW5kb3cgPSB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbFdpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbEhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93QXZhaWxcIiwgYXZhaWxXaW5kb3cpO1xuXG4gIGNvbnN0IHdpbmRvd0RlcHRoID0gd2luZG93UHRyLnNjcmVlbj8uY29sb3JEZXB0aCArIFwiLVwiICsgd2luZG93UHRyLnNjcmVlbj8ucGl4ZWxEZXB0aDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93RGVwdGhcIiwgd2luZG93RGVwdGgpO1xuXG4gIGNvbnN0IHZwb3J0U2hhcGUgPSB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LndpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LmhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93VnBvcnRcIiwgdnBvcnRTaGFwZSk7XG5cbiAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgIGxldCB3aWR0aCA9IHBhcnNlSW50KHNjcmVlbi53aWR0aCk7XG4gICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHBhcnNlSW50KHNjcmVlbi5oZWlnaHQpIDogMDtcbiAgICBpZiAod2lkdGggIT09IDAgJiYgaGVpZ2h0ICE9PSAwKSB7XG4gICAgICBjb25zdCBpT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChwbGF0Zm9ybSk7XG4gICAgICBpZiAoaU9TICYmIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICAgIC8vIGlvcyBwcm92aWRlcyBEUElzLCBuZWVkIHRvIG11bHRpcGx5XG4gICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZCh3aWR0aCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5yb3VuZChoZWlnaHQgKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvcmllbnRhdGlvbkFuZ2xlID0gd2luZG93UHRyLnNjcmVlbj8ub3JpZW50YXRpb24/LmFuZ2xlO1xuICAgICAgICBpZiAoTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDkwIHx8IE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSAyNzApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGxhbmRzY2FwZSBvcmllbnRhdGlvbiBzd2l0Y2ggdmFsdWVzIGZvciBhbGwgZXhjZXB0IGlvc1xuICAgICAgICAgIGNvbnN0IHRlbXAgPSB3aWR0aDtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodDtcbiAgICAgICAgICBoZWlnaHQgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dcIiwgd2lkdGggKyBcInhcIiArIGhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyogbmF2aWdhdG9yICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhpc3RTaXplXCIsIHdpbmRvd1B0ci5oaXN0b3J5Py5sZW5ndGgpO1xuXG4gIC8vIGNoZWNrIGlmIHVzZXJBZ2VudERhdGEgaXMgc3VwcG9ydGVkIGFuZCB1c2VyQWdlbnQgaXMgbm90IGF2YWlsYWJsZSwgdXNlIGl0XG4gIGlmICghbmF2UHRyLnVzZXJBZ2VudCkge1xuICAgIGlmIChuYXZQdHIudXNlckFnZW50RGF0YSkge1xuICAgICAgLy8gdHVybiBicmFuZHMgYXJyYXkgaW50byBzdHJpbmdcbiAgICAgIGxldCBuYXZBZ2VudCA9IG5hdlB0cj8udXNlckFnZW50RGF0YT8uYnJhbmRzPy5tYXAoZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gZS5icmFuZCArIFwiOlwiICsgZS52ZXJzaW9uO1xuICAgICAgfSkuam9pbigpO1xuICAgICAgLy8gYWRkIG1vYmlsZSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSAobmF2UHRyPy51c2VyQWdlbnREYXRhPy5tb2JpbGUgPyBcIm1vYmlcIiA6IFwiIFwiKTtcbiAgICAgIC8vIGFkZCBwbGF0Zm9ybSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSBwbGF0Zm9ybTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdkFnZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2UHRyLnVzZXJBZ2VudCk7XG4gIH1cblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIV0NvcmVzXCIsIG5hdlB0ci5oYXJkd2FyZUNvbmN1cnJlbmN5KTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2TGFuZ3VhZ2VcIiwgbmF2UHRyLmxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIuYnJvd3Nlckxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIuc3lzdGVtTGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci51c2VyTGFuZ3VhZ2UsXG4gICk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlRvdWNoXCIsIG5hdlB0ci5tYXhUb3VjaFBvaW50cyk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlZlbmRvclwiLCBuYXZQdHIudmVuZG9yKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuaW50ZXJuZXRTcGVlZFwiLCB3aW5kb3dQdHIubmF2aWdhdG9yPy5jb25uZWN0aW9uPy5kb3dubGluayk7XG5cbiAgLyogbWlzY2VsbGFuZW91cyAqL1xuICBjb25zdCBjdXJyZW50VVJMID0gbmV3IFVSTCh3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInVcIiwgY3VycmVudFVSTC5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIGN1cnJlbnRVUkwuaG9zdG5hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRvbnR0cmFja1wiLCBuYXZQdHIuZG9Ob3RUcmFjayB8fCB3aW5kb3dQdHIuZG9Ob3RUcmFjayB8fCBuYXZQdHIubXNEb05vdFRyYWNrKTtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgY29uc3QgZmlyc3RTZXNzaW9uUmVmZXJyZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIpO1xuICBpZiAoIWZpcnN0U2Vzc2lvblJlZmVycmVyKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIGZpcnN0U2Vzc2lvblJlZmVycmVyKTtcbiAgfVxuXG4gIC8qIFZpdmVuc2Ugc3BlY2lmaWMgKi9cbiAgbGV0IHBhZ2VUeXBlO1xuICAvLyBpZiB1cmwgbGlrZSB4IHRoZW4gc2V0IFBhZ2VUeXBlID0geVxuICBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZmF2b3JpbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImZhdm9yaXRlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYmFza2V0XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1vemV0aS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHVyY2hhc2VcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJvZGVtZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGF5bWVudFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImFkZHJlc3NcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBhc3RvcmRlcnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUta2F5aXQuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInJlZ2lzdGVyXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWdpcmlzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic2lnbmluXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwia3Vwb25sYXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9jb3Vwb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwicHJvZmlsLWd1bmNlbGxlLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2luZm9cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2FkZHJlc3Nlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImR1eXVydS10ZXJjaWhsZXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX25vdGlmaWNhdGlvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJpbmRpcmltbGktbW9iaWx5YS1rYW1wYW55YWxhcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNwZWNpYWxfY2FtcGFpZ25zXCI7XG4gIH1cblxuICBpZiAocGFnZVR5cGUpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHBhZ2VUeXBlKTtcbiAgfVxufTtcblxuY29uc3QgYWRkTWV0cmljcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB3aW5kb3dQdHIgPSB3aW5kb3cudG9wO1xuICBjb25zdCBwZXJmTWV0cmljcyA9IHt9O1xuICBjb25zdCBwZXJmTmF2aWdhdGlvbk1ldHJpY3MgPSB3aW5kb3dQdHIucGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIilbMF07XG4gIGlmICh3aW5kb3dQdHIucGVyZm9ybWFuY2UgJiYgcGVyZk5hdmlnYXRpb25NZXRyaWNzKSB7XG4gICAgcGVyZk1ldHJpY3MuY29ubmVjdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5yZXF1ZXN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MucmVzcG9uc2VFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MucmVxdWVzdFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kb20gPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kb21JbnRlcmFjdGl2ZSAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kb21Db21wbGV0ZSk7XG4gICAgcGVyZk1ldHJpY3MubG9hZCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZHVyYXRpb24gPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5kdXJhdGlvbik7XG4gIH1cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtZXRyaWNzXCIsIHBlcmZNZXRyaWNzKTtcbn07XG5cbi8vIFRPRE86IG1vdmUgdGhpcyB0byBhbiBcImVsZW1lbnQgY29sbGVjdG9yXCIgbW9kdWxlLCB0aGVuIGRhdGEgaXMgZXh0cmFjdGVkIGZyb20gcHJlLWNvbGxlY3RlZCBlbGVtZW50c1xuY29uc3QgZ2V0U09SR0FycmF5ID0gKCkgPT4ge1xuICBjb25zdCBzY2hlbWFPcmdFbHRzID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW3R5cGU9XFxcImFwcGxpY2F0aW9uL2xkK2pzb25cXFwiXVwiKTtcbiAgY29uc3Qgc29yZ0FycmF5ID0gW107XG5cbiAgZm9yIChjb25zdCBzVGFnIG9mIHNjaGVtYU9yZ0VsdHMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY250bnQgPSBzVGFnLnRleHRDb250ZW50O1xuICAgICAgY29uc3QganNvbmNvbnRlbnQgPSBKU09OLnBhcnNlKGNudG50KTtcbiAgICAgIHNvcmdBcnJheS5wdXNoKGpzb25jb250ZW50KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNvcmdBcnJheTtcbn07XG4iLCJpbXBvcnQge0xPR19BUElfVVJMfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlTW9uaXRvclwiKTtcbmNvbnN0IEhFQURFUlMgPSB7XG4gIHR5cGU6IFwidGV4dC9wbGFpblwiLFxufTtcblxuZXhwb3J0IGNsYXNzIE1vbml0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIG1vbml0b3JcIik7XG5cbiAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IG51bGw7XG5cbiAgICB0aGlzLmluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8vIEF0dGVtcHRzIHRvIHNlbmQgdGhlIGluaXRpYWwgbG9nIGJvZHkgKGJlYWdsZUluZm9MYXllcidzIGluaXRpYWwgcG9wdWxhdGlvbikgaW1tZWRpYXRlbHlcbiAgYXN5bmMgc2VuZExvZ3MoaW1tZWRpYXRlKSB7XG4gICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIGltbWVkaWF0ZSBzZW5kaW5nIGJsb2NrXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gYXdhaXRpbmcgc2NyYXBpbmdcIik7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlLCA1MCwgMTAwMCk7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIHNlbmRpbmcgbG9nc1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNlbmQgaW5pdGlhbCBsb2cgYm9keSBhbmQgaW5jcmVtZW50YWwgdXBkYXRlIGxvZ3Mgb24gY2xvc2VcbiAgYXN5bmMgaGFuZGxlQ2xvc2VFdmVudCgpIHtcbiAgICAvLyBpZiBpbml0aWFsIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHNlbmQgdXBkYXRlcyBhbmQgaW5mb2xheWVyIGluIG9uZSBiYXRjaFxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIC8vIGlmIG1haW4gbG9nIGhhcyBiZWVuIHNlbnQsIHNlbmQgaW5jcmVtZW50YWwgdXBkYXRlcyBvbmx5XG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpO1xuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlTWFpbkxvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlTWFpbkxvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXF1ZXN0IGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCkge1xuICAgIGlmICghdGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc1VwZGF0ZXNTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgbm90IGJlZW4gc2VudCB5ZXQsIHRoZXJlIGlzIG5vIGluY3JlbWVudGFsIHlldFxuICAgICAgLy8gb3IgaWYgdGhlIHVwZGF0ZXMgaGF2ZSBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNDaGFuZ2VkID0gYXdhaXQgdGhpcy5jaGVja0ZvckxhdGVzdENoYW5nZXMoKTtcbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZ3MgY2hhbmdlIHN0YXR1czogXCIsIGhhc0NoYW5nZWQpO1xuICAgIGlmICghaGFzQ2hhbmdlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbG9nRGF0YSA9IGF3YWl0IHRoaXMucGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpO1xuICAgIGlmIChsb2dEYXRhKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU2VuZGluZyBpbmNyZW1lbnRhbCBsb2dzXCIsIGxvZ0RhdGEpO1xuICAgICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhsb2dEYXRhKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVBcnJpdmFsTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIG9yIGFycml2YWwgbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZUFycml2YWxMb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGJsb2IgdG8gc2VuZDogXCIsIHJlcXVlc3RCbG9iKTtcbiAgICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MocmVxdWVzdEJsb2IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpIHtcbiAgICBjb25zdCBod20gPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19od21cIik7XG4gICAgaWYgKHRoaXMuaGlnaFdhdGVyTWFyayAhPT0gaHdtKSB7XG4gICAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod207XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUFycml2YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFt1cmwsIGhhc2gsIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDAsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgdTogdXJsLFxuICAgICAgb25IYXNoUGN0OiBoYXNoLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZU1haW5Mb2dEYXRhKCkge1xuICAgIGNvbnN0IGJvZHkgPSB7fTtcbiAgICBpZiAoIXdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSkge1xuICAgICAgaWYgKCFrZXkuc3RhcnRzV2l0aChcIl9cIikgJiYgdmFsdWUgIT09IG51bGwpIGJvZHlba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBib2R5LmxjID0gMTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW2EsIGUsIGYsIHMsIG0sIGNvb2tpZUdhSWQsIHZpZXdfZXBvY2hdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImFcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJmXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwibVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAyLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIGEsIGUsIGYsIHMsIG0sXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGluaXRpYWxpemVFeGl0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgbGV0IHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gbnVsbDtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGV4aXQgZXZlbnQgbGlzdGVuZXJcIik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIGJlZm9yZXVubG9hZCBldmVudFwiKTtcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIHBhZ2VoaWRlIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICAvLyBJZiBwYWdlIGlzIG5vdCB2aXNpYmxlIGFuZCBkb2Vzbid0IGJlY29tZSB2aXNpYmxlIHdpdGhpbiAzMCBzZWNvbmRzLCBzZW5kIGxvZ3NcbiAgICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW4gdGltZW91dFwiKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICAgICAgfSwgMzAwMDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBDbGVhciB0aW1lb3V0IHdoZW4gcGFnZSBpcyB2aXNpYmxlIHRvIG1ha2Ugc3VyZSB3ZSBzZW5kIHRoZSBsYXRlc3QgbG9ncyBwb3NzaWJsZVxuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gbnVsbDtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICB9XG5cbiAgcXVldWVMb2dzKGxvZ0RhdGEpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5zZW5kQmVhY29uIHx8IHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmZXRjaChMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHF1ZXVlZCA9IG5hdmlnYXRvci5zZW5kQmVhY29uKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICBjb25zdCBxdWV1ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCFxdWV1ZWQpIHF1ZXVlZCA9IG5hdmlnYXRvci5zZW5kQmVhY29uKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBxdWV1ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICBpZiAoIXF1ZXVlZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiTG9ncyBub3QgcXVldWVkXCIpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vbml0b3I7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tEYXRhTGF5ZXJSdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBhd2FpdCBkYXRhTGF5ZXJGaW5kZXIob3BlcmF0b3IpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRhdGFMYXllckZpbmRlciA9IGFzeW5jIChrZXkpID0+IHtcbiAgbG9nZ2VyLmxvZyhcIlNlYXJjaGluZyBiZWFnbGVJbmZvTGF5ZXIgZm9yIGtleSBcIiwga2V5KTtcbiAgY29uc3QgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXksIHRydWUsIDI1LCAxMDAwKTtcbiAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5zdWNjZXNzKGBGb3VuZCBrZXkgJHtrZXl9IHdpdGggdmFsdWUgJHtyZXN9YCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBsb2dnZXIuZmFpbGVkKGBLZXkgJHtrZXl9IG5vdCBmb3VuZCBpbiBiZWFnbGVJbmZvTGF5ZXJgKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVsZW1lbnRDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbGVtZW50UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWUsIHNlbGVjdG9yLCBzZWxlY3RvckFsbCwgc2VsZWN0b3JGYWxsYmFjayA9IG51bGx9ID0gcnVsZTtcbiAgbGV0IG1haW5TZWxlY3RvciA9IHNlbGVjdG9yO1xuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIG1haW5TZWxlY3RvciA9IHNlbGVjdG9yRmFsbGJhY2sgPyBzZWxlY3RvckZhbGxiYWNrIDogbWFpblNlbGVjdG9yO1xuICB9XG5cbiAgaWYgKG9wZXJhdG9yID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvciksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICB9XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoc2VsZWN0b3JBbGwgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGlmIChtYWluU2VsZWN0b3IpIGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKTtcbiAgZWxzZSBpZiAoc2VsZWN0b3JBbGwpIGVsZW1lbnQgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidGV4dC1udW1iZXJcIjoge1xuICAgICAgbGV0IHRlbXBWYWw7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xuICAgICAgICB0ZW1wVmFsID0gZWxlbWVudC5yZWR1Y2UoKHJldHVyblZhbCwgZWxlbSkgPT4ge1xuICAgICAgICAgIHJldHVyblZhbCArPSBwYXJzZUludChlbGVtLnRleHRDb250ZW50LnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wVmFsID0gcGFyc2VJbnQod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikudGV4dENvbnRlbnRcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgfVxuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcGFyc2VJbnQodGVtcFZhbCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiY2xhc3NMaXN0XCI6XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImNvdW50XCI6IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihlbGVtZW50Lmxlbmd0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigwLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSBcInN0eWxlXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgY29uc3Qgc3R5bGVLZXkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50U3R5bGVzW3N0eWxlS2V5XTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCBzdHlsZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJPcGVyYXRvciBub3QgZGVmaW5lZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVGdW5jdGlvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0Z1bmN0aW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgaWYgKCFvcGVyYXRvcikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJSdWxlIGZ1bmN0aW9uIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBydWxlRnVuY3Rpb24gPSBGdW5jdGlvbihvcGVyYXRvcik7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IHJ1bGVGdW5jdGlvbigpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVTZXNzaW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrU2Vzc2lvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZHVyYXRpb25cIjpcbiAgICAgIHJldHVybiBkdXJhdGlvbkhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImhpc3RvcnlcIjpcbiAgICAgIHJldHVybiBoaXN0b3J5SGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IGdldFNlc3Npb25UaW1lc3RhbXAgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fVElNRVNUQU1QKSkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBzZXNzaW9uIHRpbWVzdGFtcFwiLCBlcnIpO1xuICAgIHJldHVybiBEYXRlLm5vdygpO1xuICB9XG59O1xuXG5jb25zdCBkdXJhdGlvbkhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBkdXJhdGlvbiA9IChEYXRlLm5vdygpIC0gZ2V0U2Vzc2lvblRpbWVzdGFtcCgpKSAvIDEwMDA7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGR1cmF0aW9uLCBjb25kaXRpb24sIHBhcnNlSW50KHZhbHVlKSk7XG59O1xuXG5jb25zdCBoaXN0b3J5SGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRIaXN0b3J5ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9ISVNUT1JZKT8uc3BsaXQoXCIsXCIpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihjdXJyZW50SGlzdG9yeSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVVybENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1VybFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJwYXRoXCI6IHtcbiAgICAgIGNvbnN0IHJlcXVlc3RVUkw9IHdpbmRvdy50b3AubG9jYXRpb24uaHJlZjtcbiAgICAgIGNvbnN0IHBhdGggPSBuZXcgVVJMKHJlcXVlc3RVUkwpLnBhdGhuYW1lO1xuICAgICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgcGF0aCAke3BhdGh9IG1hdGNoZXMgcnVsZSBwYXRoICR7dmFsdWV9YCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihwYXRoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUll9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVudkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0VudlJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkZXZpY2VfdHlwZVwiOiB7XG4gICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcyA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIjtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGlzTW9iaWxlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVfY2FjaGVcIixcbiAgdmVyc2lvbjogMSxcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImluZm9DYWNoZVwiLFxuICAgIGluZGV4ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJpeF9za3VcIixcbiAgICAgICAgZmllbGRzOiBcInNrdVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcInNrdVwifSxcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQge2ZldGNoUHJvZHVjdEluZm99IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeVwiKTtcbmNsYXNzIEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGlmICghb3BlblJlcXVlc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImluZGV4ZWRkYiBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIG9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC5vbGRWZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3BlblJlcXVlc3QucmVzdWx0LmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZGVsZXRlIG91dGRhdGVkIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdG9yZSA9IG9wZW5SZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSwgY29uZmlnLnN0b3JlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5maWVsZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgYmVhZ2xlX2NhY2hlIGluZGV4ZWQgREJcIiwgb3BlblJlcXVlc3QuZXJyb3IpO1xuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLmluZGV4ZWREQiA9IG9wZW5SZXF1ZXN0LnJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgcmV0dXJuIHR4Lm9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUocGF5bG9hZCkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIGZvciAoY29uc3QgbG9hZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgIGxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICBzdG9yZS5wdXQobG9hZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBheWxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgc3RvcmUucHV0KHBheWxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNsZWFyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY2xlYXJSZXF1ZXN0ID0gc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgY2xlYXJSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNsZWFyUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGNsZWFyaW5nIHN0b3JlOiAke3N0b3JlLm5hbWV9YCk7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHNrdSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBnZXRSZXF1ZXN0ID0gc3RvcmUuZ2V0KHNrdSk7XG4gICAgICAgIGdldFJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGdldFJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgIGxvZ2dlci5sb2coYEZvdW5kIHZhbHVlICR7cmVzdWx0fSBmb3Iga2V5ICR7c2t1fWApO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGdldHRpbmcgdmFsdWUgZm9yIGtleTogJHtza3V9YCwgZ2V0UmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjb3VudCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY291bnRSZXF1ZXN0ID0gc3RvcmUuY291bnQoKTtcbiAgICAgICAgY291bnRSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudFJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgIGxvZ2dlci5sb2coYENvdW50ZWQgJHtyZXN1bHR9IGVudHJpZXNgKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvdW50UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBjb3VudGluZyBlbnRyaWVzOiBcIiwgY291bnRSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldEN1cnNvcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY3Vyc29yUmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICAgICAgY3Vyc29yUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBjdXJzb3JSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgY3Vyc29yXCIsIGN1cnNvclJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcGVyc2lzdFByb2R1Y3RJbmZvKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImNoZWNrLWV4aXN0aW5nLXByb2QtaW5mb1wiKTtcbiAgICBjb25zdCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgY29uc3QgY3Vyc29yID0gYXdhaXQgdGhpcy5nZXRDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGN1cnNvci52YWx1ZS50aW1lc3RhbXA7XG4gICAgICBjb25zdCBlbGFwc2VkU2Vjb25kcyA9IChEYXRlLm5vdygpIC8gMTAwMCkgLSB0aW1lc3RhbXA7XG4gICAgICBpZiAoZWxhcHNlZFNlY29uZHMgPCA3MjAwKSByZXR1cm47XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGlzIGV4cGlyZWRcIik7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoaW5nLXByb2QtaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb1Byb21pc2UgPSBmZXRjaFByb2R1Y3RJbmZvKCk7XG4gICAgY29uc3QgY2xlYXJQcm9taXNlID0gdGhpcy5jbGVhcigpO1xuICAgIGNvbnN0IFtwcm9kdWN0SW5mb0FycmF5XSA9IGF3YWl0IFByb21pc2UuYWxsKFtwcm9kdWN0SW5mb1Byb21pc2UsIGNsZWFyUHJvbWlzZV0pO1xuICAgIGlmICghcHJvZHVjdEluZm9BcnJheSB8fCAhcHJvZHVjdEluZm9BcnJheS5sZW5ndGgpIHJldHVybjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLXByb2QtaW5mb1wiKTtcbiAgICBhd2FpdCB0aGlzLnNhdmUodGhpcy5wcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBlcnNpc3RlZC1wcm9kLWluZm9cIik7XG4gIH1cblxuICBwcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkge1xuICAgIGNvbnN0IHBheWxvYWRzID0gW107XG4gICAgY29uc3QgZmllbGROYW1lcyA9IHByb2R1Y3RJbmZvQXJyYXkuc2hpZnQoKTtcbiAgICBmaWVsZE5hbWVzLnNoaWZ0KCk7XG4gICAgZm9yIChjb25zdCBpbmZvIG9mIHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7c2t1OiBpbmZvLnNoaWZ0KCl9O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBheWxvYWRbZmllbGROYW1lc1tpXV0gPSBpbmZvW2ldIHx8IDA7XG4gICAgICB9XG4gICAgICBwYXlsb2Fkcy5wdXNoKHBheWxvYWQpO1xuICAgIH1cbiAgICByZXR1cm4gcGF5bG9hZHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeTtcbiIsImltcG9ydCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IGZyb20gXCIuL2luZGV4XCI7XG5cbmNvbnN0IFN0b3JlID0gKGZ1bmN0aW9uKCkge1xuICBsZXQgaW5zdGFuY2UgPSBudWxsO1xuICByZXR1cm4ge1xuICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5KCk7XG4gICAgICAgIC8vIEhpZGUgdGhlIGNvbnN0cnVjdG9yIHNvIHRoZSByZXR1cm5lZCBvYmplY3QgY2FuJ3QgYmUgbmV3J2QuLi5cbiAgICAgICAgaW5zdGFuY2UuY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG4gIH07XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUHJvZHVjdEluZm9DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tQcm9kdWN0SW5mb1J1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICBpZiAoIXNrdUxpc3QgfHwgKHR5cGVvZiBza3VMaXN0ID09PSBcIm9iamVjdFwiICYmICFPYmplY3Qua2V5cyhza3VMaXN0KS5sZW5ndGgpKSByZXR1cm4gZmFsc2U7XG4gIGxldCBydW50aW1lVmFsdWUgPSBudWxsO1xuICBjb25zdCBza3UgPSBza3VMaXN0W09iamVjdC5rZXlzKHNrdUxpc3QpWzBdXT8uaWQ7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidHJhbnNhY3Rpb25JbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBUcmFuc2FjdGlvbkNvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUcmFuc2FjdGlvbkNvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIEFkZFRvQ2FydENvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRBZGRUb0NhcnRDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFByZXZpZXdDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbkNvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRBZGRUb0NhcnRDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0UHJldmlld0NvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCJjb25zdCBFX1RJTUVPVVQgPSBuZXcgRXJyb3IoJ3RpbWVvdXQgd2hpbGUgd2FpdGluZyBmb3IgbXV0ZXggdG8gYmVjb21lIGF2YWlsYWJsZScpO1xuY29uc3QgRV9BTFJFQURZX0xPQ0tFRCA9IG5ldyBFcnJvcignbXV0ZXggYWxyZWFkeSBsb2NrZWQnKTtcbmNvbnN0IEVfQ0FOQ0VMRUQgPSBuZXcgRXJyb3IoJ3JlcXVlc3QgZm9yIGxvY2sgY2FuY2VsZWQnKTtcblxudmFyIF9fYXdhaXRlciQyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBTZW1hcGhvcmUge1xuICAgIGNvbnN0cnVjdG9yKF92YWx1ZSwgX2NhbmNlbEVycm9yID0gRV9DQU5DRUxFRCkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IF92YWx1ZTtcbiAgICAgICAgdGhpcy5fY2FuY2VsRXJyb3IgPSBfY2FuY2VsRXJyb3I7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVycyA9IFtdO1xuICAgIH1cbiAgICBhY3F1aXJlKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdLnB1c2goeyByZXNvbHZlLCByZWplY3QgfSk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrLCB3ZWlnaHQgPSAxKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgcmVsZWFzZV0gPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2sod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLnB1c2gocmVzb2x2ZSk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSA8PSAwO1xuICAgIH1cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgIH1cbiAgICByZWxlYXNlKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gd2VpZ2h0O1xuICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzLmZvckVhY2goKHF1ZXVlKSA9PiBxdWV1ZS5mb3JFYWNoKChlbnRyeSkgPT4gZW50cnkucmVqZWN0KHRoaXMuX2NhbmNlbEVycm9yKSkpO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgIH1cbiAgICBfZGlzcGF0Y2goKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBjb25zdCBxdWV1ZUVudHJ5ID0gKF9hID0gdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFxdWV1ZUVudHJ5KVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNXZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSAtPSB3ZWlnaHQ7XG4gICAgICAgICAgICB3ZWlnaHQgPSB0aGlzLl92YWx1ZSArIDE7XG4gICAgICAgICAgICBxdWV1ZUVudHJ5LnJlc29sdmUoW3ByZXZpb3VzVmFsdWUsIHRoaXMuX25ld1JlbGVhc2VyKHByZXZpb3VzV2VpZ2h0KV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RyYWluVW5sb2NrV2FpdGVycygpO1xuICAgIH1cbiAgICBfbmV3UmVsZWFzZXIod2VpZ2h0KSB7XG4gICAgICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBfZHJhaW5VbmxvY2tXYWl0ZXJzKCkge1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLmZvckVhY2goKHdhaXRlcikgPT4gd2FpdGVyKCkpO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIkMSA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgTXV0ZXgge1xuICAgIGNvbnN0cnVjdG9yKGNhbmNlbEVycm9yKSB7XG4gICAgICAgIHRoaXMuX3NlbWFwaG9yZSA9IG5ldyBTZW1hcGhvcmUoMSwgY2FuY2VsRXJyb3IpO1xuICAgIH1cbiAgICBhY3F1aXJlKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDEodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbLCByZWxlYXNlcl0gPSB5aWVsZCB0aGlzLl9zZW1hcGhvcmUuYWNxdWlyZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlbGVhc2VyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUucnVuRXhjbHVzaXZlKCgpID0+IGNhbGxiYWNrKCkpO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLndhaXRGb3JVbmxvY2soKTtcbiAgICB9XG4gICAgcmVsZWFzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpKVxuICAgICAgICAgICAgdGhpcy5fc2VtYXBob3JlLnJlbGVhc2UoKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmNhbmNlbCgpO1xuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZnVuY3Rpb24gd2l0aFRpbWVvdXQoc3luYywgdGltZW91dCwgdGltZW91dEVycm9yID0gRV9USU1FT1VUKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWNxdWlyZTogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QodGltZW91dEVycm9yKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCBzeW5jLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsZWFzZSA9IEFycmF5LmlzQXJyYXkodGlja2V0KSA/IHRpY2tldFsxXSA6IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aWNrZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrLCB3ZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlbGVhc2UgPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRpY2tldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXRbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodGlja2V0WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxlYXNlKHdlaWdodCkge1xuICAgICAgICAgICAgc3luYy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzeW5jLmNhbmNlbCgpO1xuICAgICAgICB9LFxuICAgICAgICB3YWl0Rm9yVW5sb2NrOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBzeW5jLndhaXRGb3JVbmxvY2sod2VpZ2h0KS50aGVuKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KHRpbWVvdXRFcnJvciksIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzTG9ja2VkOiAoKSA9PiBzeW5jLmlzTG9ja2VkKCksXG4gICAgICAgIGdldFZhbHVlOiAoKSA9PiBzeW5jLmdldFZhbHVlKCksXG4gICAgICAgIHNldFZhbHVlOiAodmFsdWUpID0+IHN5bmMuc2V0VmFsdWUodmFsdWUpLFxuICAgIH07XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGlzbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gdHJ5QWNxdWlyZShzeW5jLCBhbHJlYWR5QWNxdWlyZWRFcnJvciA9IEVfQUxSRUFEWV9MT0NLRUQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHJldHVybiB3aXRoVGltZW91dChzeW5jLCAwLCBhbHJlYWR5QWNxdWlyZWRFcnJvcik7XG59XG5cbmV4cG9ydCB7IEVfQUxSRUFEWV9MT0NLRUQsIEVfQ0FOQ0VMRUQsIEVfVElNRU9VVCwgTXV0ZXgsIFNlbWFwaG9yZSwgdHJ5QWNxdWlyZSwgd2l0aFRpbWVvdXQgfTtcbiIsImltcG9ydCB7Y2hlY2tEYXRhTGF5ZXJSdWxlfSBmcm9tIFwiLi9kYXRhTGF5ZXJDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRWxlbWVudFJ1bGV9IGZyb20gXCIuL2VsZW1lbnRDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRnVuY3Rpb25SdWxlfSBmcm9tIFwiLi9mdW5jdGlvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tTZXNzaW9uUnVsZX0gZnJvbSBcIi4vc2Vzc2lvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tVcmxSdWxlfSBmcm9tIFwiLi91cmxDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRW52UnVsZX0gZnJvbSBcIi4vZW52Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Byb2R1Y3RJbmZvUnVsZX0gZnJvbSBcIi4vcHJvZHVjdEluZm9DaGVja2VyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7YWRkRGF0YUxpc3RlbmVyLCBhZGRUb0JlYWdsZUluZm9MYXllciwgZ2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtNdXRleH0gZnJvbSBcImFzeW5jLW11dGV4XCI7XG5pbXBvcnQge2ZldGNoRWxpZ2liaWxpdHlSdWxlc30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUnVsZUVuZ2luZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlcywgYmFzZVJ1bGVTZXR9ID0gYm9keTtcbiAgICB0aGlzLmJhc2VSdWxlU2V0ID0gYmFzZVJ1bGVTZXQ7XG4gICAgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzID0gZWxpZ2liaWxpdHlSdWxlcztcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMubXV0ZXggPSBuZXcgTXV0ZXgoKTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZXMoKSB7XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHRoaXMuYmFzZVJ1bGVTZXQpIHtcbiAgICAgIGNvbnN0IHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKTtcbiAgICAgIGlmICghcnVsZVNhdGlzZmllZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlKHJ1bGUpIHtcbiAgICBjb25zdCB7Y2hhaW4sIGNoYWluX2NvbmRpdGlvbiwgdHlwZX0gPSBydWxlO1xuICAgIGxldCBydWxlU2F0aXNmaWVkID0gbnVsbDtcbiAgICAvLyBjaGVjayBydWxlXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwic2Vzc2lvblwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tTZXNzaW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbGVtZW50UnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGF0YUxheWVyXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja0RhdGFMYXllclJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInVybFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tVcmxSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tGdW5jdGlvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVudmlyb25tZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VudlJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja1Byb2R1Y3RJbmZvUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZmFpbGVkKGBObyBzdWNoIHJ1bGUgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY2hhaW4pIHtcbiAgICAgIHN3aXRjaCAoY2hhaW5fY29uZGl0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAmJiBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkIHx8IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICE9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBjaGFpbiBjb25kaXRpb25cIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydWxlU2F0aXNmaWVkO1xuICB9XG5cbiAgYXN5bmMgYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImFzc2Vzc2luZy1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmVsaWdpYmlsaXR5UnVsZXMpKSB7XG4gICAgICBjb25zdCBzYXRpc2ZpZWRSdWxlSWRzID0gW107XG4gICAgICB0aGlzLnNldFVwTGlzdGVuZXJzKGtleSwgcnVsZXMpO1xuICAgICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGlmIChhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKSkge1xuICAgICAgICAgIHNhdGlzZmllZFJ1bGVJZHMucHVzaChydWxlLm5hbWUpO1xuICAgICAgICAgIC8vIFBhZ2UgdHlwZSBydWxlcyBhcmUgZXhjbHVzaXZlOyBpZiBvbmUgaXMgdHJ1ZSBhbGwgb3RoZXJzIGFyZSBmYWxzZSBieSBkZWZhdWx0LCBubyBuZWVkIHRvIGFzc2VzcyB0aGUgcmVzdFxuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBzYXRpc2ZpZWRSdWxlSWRzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKSB7XG4gICAgaWYgKCFrZXkgfHwgIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCByZWxlYXNlID0gYXdhaXQgdGhpcy5tdXRleC5hY3F1aXJlKCk7XG4gICAgbG9nZ2VyLmxvZyhgTG9jayBhY3F1aXJlZCBmb3Iga2V5ICR7a2V5fWApO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgY29uc3QgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCkgfHwgW107XG4gICAgICAgIGlmIChpc0VsaWdpYmxlKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgY3VycmVudC5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGN1cnJlbnQpO1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIGZyb20gZWxpZ2libGUgcnVsZXNcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGN1cnJlbnQuZmlsdGVyKChrKSA9PiBrICE9PSBydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBmaWx0ZXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGFzc2Vzc2luZyBydWxlcyBmb3Iga2V5OiAke2tleX0gLSAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2dnZXIubG9nKGBSZWxlYXNpbmcgbG9jayBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKSB7XG4gICAgY29uc3Qge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9ID0gdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMpO1xuICAgIGZvciAoY29uc3QgW29wZXJhdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZGF0YUxheWVyUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjay5iaW5kKHRoaXMsIGtleSwgcnVsZXMpO1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKG9wZXJhdG9yLCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50UnVsZXMpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgbGV0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb25SZWNvcmQgb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgbm9kZXMgPSBbLi4ubm9kZXMsIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQuYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQucmVtb3ZlZE5vZGVzKV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXhjbHVkZSBtdXRhdGlvbnMgdGhhdCBvbmx5IHVwZGF0ZSB0ZXh0XG4gICAgICAgIGlmIChub2Rlcy5ldmVyeSgobikgPT4gbi50YWdOYW1lID09PSB1bmRlZmluZWQpKSByZXR1cm47XG4gICAgICAgIHRoaXMuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcyk7XG4gICAgICB9KTtcbiAgICAgIGxldCBlbGVtZW50VG9PYnNlcnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICBlbGVtZW50VG9PYnNlcnZlID0gZWxlbWVudFRvT2JzZXJ2ZSA/IGVsZW1lbnRUb09ic2VydmUucGFyZW50Tm9kZSA6IGRvY3VtZW50LmJvZHk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnRUb09ic2VydmUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBleHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMsIGRhdGFMYXllclJ1bGVzID0ge30sIGVsZW1lbnRSdWxlcyA9IHt9KSB7XG4gICAgaWYgKCFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICBjb25zdCB7dHlwZX0gPSBydWxlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgICBpZiAoIWRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdKSB7XG4gICAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXS5wdXNoKHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICAgIGlmICghZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3IgfHwgcnVsZS5zZWxlY3RvckFsbF0pIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGxdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGxdLnB1c2gocnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAocnVsZS5jaGFpbikge1xuICAgICAgICB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhbcnVsZS5jaGFpbl0sIGRhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEVsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBlbGlnaWJpbGl0eVJ1bGVzID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMpO1xuICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXMpIHJldHVybiBKU09OLnBhcnNlKGVsaWdpYmlsaXR5UnVsZXMpO1xuICAgICAgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoRWxpZ2liaWxpdHlSdWxlcygpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMsIEpTT04uc3RyaW5naWZ5KGVsaWdpYmlsaXR5UnVsZXMpKTtcbiAgICAgIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgZWxpZ2liaWxpdHkgcnVsZXM6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlNlZ21lbnRhdGlvbkNvbXB1dGVyXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cykge1xuICBsb2dnZXIubG9nKFwiRGV0ZXJtaW5pbmcgdXNlciBzZWdtZW50XCIpO1xuICB0cnkge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBPYmplY3Qua2V5cyh0cmVhdG1lbnRXZWlnaHRzKSkge1xuICAgICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgICBpZiAoIXJ1bGVTZXQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgc2VnbWVudFJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7YmFzZVJ1bGVTZXQ6IHJ1bGVTZXQsIGJ1c2luZXNzUnVsZVNldDogW119KTtcbiAgICAgIGlmIChhd2FpdCBzZWdtZW50UnVsZUVuZ2luZS5jaGVja1J1bGVzKCkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgVXNlciBzZWdtZW50IG1hdGNoZWQ6ICR7c2VnbWVudH1gKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIHNlZ21lbnQpO1xuICAgICAgICByZXR1cm4gc2VnbWVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLmxvZyhcIlVzZXIgc2VnbWVudCBub3QgbWF0Y2hlZCwgcmV0dXJuaW5nIGRlZmF1bHRcIik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIFwiZGVmYXVsdFwiKTtcbiAgICByZXR1cm4gXCJkZWZhdWx0XCI7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY29tcHV0ZSB1c2VyIHNlZ21lbnRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVMsIFRSRUFUTUVOVFNfRFVSQVRJT059IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7ZmV0Y2hUcmVhdG1lbnRzLCBmZXRjaFRyZWF0bWVudFdlaWdodHN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5XCIpO1xuXG5jbGFzcyBUcmVhdG1lbnRSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IGJvZHk7XG4gICAgdGhpcy50cmVhdG1lbnRzID0gdHJlYXRtZW50cztcblxuICAgIHRoaXMudHJlYXRtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50cygpIHtcbiAgICBsb2dnZXIubG9nKFwiTG9hZGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHtUUkVBVE1FTlRTfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuICAgIGNvbnN0IHRyZWF0bWVudHNPYmogPSBKU09OLnBhcnNlKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFRSRUFUTUVOVFMpKTtcbiAgICBsZXQgdHJlYXRtZW50cyA9IHRyZWF0bWVudHNPYmo/LnRyZWF0bWVudHM7XG4gICAgY29uc3QgdGltZXN0YW1wID0gdHJlYXRtZW50c09iaj8udGltZXN0YW1wO1xuICAgIGlmICghdHJlYXRtZW50cyB8fCAhdGltZXN0YW1wKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBub3QgZm91bmQgaW4gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHNcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbGFwc2VkRGF5cyA9IChEYXRlLm5vdygpIC0gdGltZXN0YW1wKSAvICgxMDAwICogMzYwMCAqIDI0KTtcbiAgICAgIGlmIChlbGFwc2VkRGF5cyA+IFRSRUFUTUVOVFNfRFVSQVRJT04pIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgYXJlIGV4cGlyZWRcIik7XG4gICAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzXCIpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgIHRyZWF0bWVudHMsXG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiVHJlYXRtZW50cyBhcmUgbG9hZGVkIGZyb20gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRXZWlnaHRzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VpZ2h0cyA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLldFSUdIVFMpO1xuICAgICAgaWYgKHdlaWdodHMpIHJldHVybiBKU09OLnBhcnNlKHdlaWdodHMpO1xuICAgICAgd2VpZ2h0cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50V2VpZ2h0cygpO1xuICAgICAgaWYgKCF3ZWlnaHRzKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggd2VpZ2h0c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5XRUlHSFRTLCBKU09OLnN0cmluZ2lmeSh3ZWlnaHRzKSk7XG4gICAgICByZXR1cm4gd2VpZ2h0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hdGNoZWRUcmVhdG1lbnRzKCkge1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IHRoaXM7XG4gICAgY29uc3QgdXNlclNlZ21lbnQgPSBhd2FpdCBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKTtcbiAgICBpZiAoIXVzZXJTZWdtZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgY29uc3QgdXNlclNlZ21lbnRXZWlnaHRzID0gKHVzZXJTZWdtZW50ICYmIHRyZWF0bWVudFdlaWdodHNbdXNlclNlZ21lbnRdKSA/XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzW3VzZXJTZWdtZW50XSA6IHRyZWF0bWVudFdlaWdodHNbXCJkZWZhdWx0XCJdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICB0cmVhdG1lbnQud2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudD8uaWRdPy53ZWlnaHQgfHwgMDtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnQuYWN0aW9ucy5zb21lKChhKSA9PiBhLnZhcmlhbnRzKSkgY29udGludWU7XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIHRyZWF0bWVudC5hY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24udmFyaWFudHMpIGNvbnRpbnVlO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFudEtleSBvZiBPYmplY3Qua2V5cyhhY3Rpb24udmFyaWFudHMpKSB7XG4gICAgICAgICAgICBpZiAodXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzICYmIHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0udmFyaWFudHNbdmFyaWFudEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhgJHt0cmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIHNlZ21lbnQgbWF0Y2hlZGApO1xuICAgIGlmICghdHJlYXRtZW50cy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVhdG1lbnRSZXBvc2l0b3J5O1xuIiwiaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJSZXBsYWNlVXRpbHNcIik7XG5cbmNvbnN0IHJlcGxhY2VyID0gYXN5bmMgKHZhbHVlLCByZXBsYWNlRm4pID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBbaSwgdmFsXSBvZiB2YWx1ZS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBsYWNlRm4gPSBBcnJheS5pc0FycmF5KHJlcGxhY2VGbikgPyByZXBsYWNlRm5baV0gOiByZXBsYWNlRm4gfHwgXCJcIjtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihjdXJyZW50UmVwbGFjZUZuKTtcbiAgICAgICAgdmFsdWVbaV0gPSByZXBsYWNlQWxsKHZhbCwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZVtpXSA9IHJlcGxhY2VGbkV4ZWN1dG9yKGN1cnJlbnRSZXBsYWNlRm4sIHZhbCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSkge1xuICAgIGZvciAoY29uc3QgckZuIG9mIHJlcGxhY2VGbikge1xuICAgICAgaWYgKHR5cGVvZiByRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IockZuKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyRm4sIHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbik7XG4gICAgICB2YWx1ZSA9IHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSwgc2luZ2xlID0gZmFsc2UpIHtcbiAgaWYgKHJlcGxhY2VGbiAmJiB2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkV4ZWN1dGluZyByZXBsYWNlIGZ1bmN0aW9uOiBcIiwgcmVwbGFjZUZuKTtcbiAgICBjb25zdCByZXBsYWNlRnVuY3Rpb24gPSBGdW5jdGlvbihyZXBsYWNlRm4pO1xuICAgIGlmIChzaW5nbGUpIHJldHVybiB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICAgIHJldHVybiByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKSB7XG4gIGNvbnN0IHtzdG9yYWdlLCBrZXksIGtleUZhbGxiYWNrLCB0eXBlfSA9IHJlcGxhY2VGbjtcbiAgc3dpdGNoIChzdG9yYWdlKSB7XG4gICAgY2FzZSBcInNlc3Npb25cIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBudWxsO1xuICAgICAgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlGYWxsYmFjayk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSBKU09OLnBhcnNlKHJlcGxhY2VWYWwpO1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSByZXBsYWNlVmFsW3JlcGxhY2VWYWwubGVuZ3RoIC0gMV1bdHlwZV07XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkIG5vdCBwYXJzZSAke3JlcGxhY2VWYWx9YCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgICBjYXNlIFwiaW5mby1sYXllclwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5RmFsbGJhY2spO1xuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VyO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gYXN5bmMgKGNvbmRpdGlvbikgPT4ge1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgY29uc3Qge2F0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCBvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGUsIHZhbHVlLCBjaGFpbn0gPSBjb25kaXRpb247XG4gIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbmRpdGlvbkVsZW1lbnRzKSB7XG4gICAgaWYgKGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pKSB7XG4gICAgICBlbGlnaWJsZUVsZW1lbnRzLnB1c2goJChlbGVtZW50KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGlnaWJsZUVsZW1lbnRzO1xufTtcblxuY29uc3QgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciA9IGFzeW5jIChlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFNrdSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KGVsZW1lbnRTa3UpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltvcGVyYXRvcl07XG4gICAgICAvLyBydW5UaW1lVmFsdWUgbWF5IGJlIDBcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHwgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDoge1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiaW1wb3J0IHtzdHlsZUFwcGxpY2F0b3IsIGRlbGF5LCBpZGxlVGltZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtyZXBsYWNlQWxsLCB0dXJraXNoVG9Mb3dlcn0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWSwgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIElETEVfVElNRU9VVH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHJlcGxhY2VyIGZyb20gXCIuL3JlcGxhY2UtdXRpbHNcIjtcbmltcG9ydCBjaGVja0FjdGlvbkNvbmRpdGlvbiBmcm9tIFwiLi9hY3Rpb24tY29uZGl0aW9uLXV0aWxcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb25zKGFjdGlvbnMpIHtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUFwcGx5QWN0aW9uc1wiKTtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBR30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYWN0aW9uOiBcIiwgSlNPTi5zdHJpbmdpZnkoYWN0aW9uKSk7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBhdHRyaWJ1dGUsXG4gICAgICBwcm9kdWN0SW5mb1N0b3JhZ2UsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4pO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVtb3Zpbmc6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkNhbm5vdCBmb3VuZCBlbGVtZW50IHdpdGggc2VsZWN0b3I6IFwiLCBzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGJlZm9yZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBpZiAoU3RyaW5nKHZhbHVlKS5pbmNsdWRlcyhcIm5kLWFkZC10by13aW5cIikpIHtcbiAgICAgICAgICAgICQoXCIubmQtYWRkLXRvLXdpblwiKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWZ0ZXJcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGFmdGVyOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYWZ0ZXIodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXBwZW5kXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGVuZGluZyB2YWx1ZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb2RhbFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIGlmIChlbG0gPT0gZS50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3BsYXlNb2RhbCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBvcHVwXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgIT09IDApIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlBvcHVwIGFscmVhZHkgZGlzcGxheWVkIGluIHNlc3Npb25cIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIFBvcHVwOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHBUeXBlKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImV4aXRJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBleGl0IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbciwgZF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiAhci5pbmNsdWRlcyhkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlkbGVUaW1lcihJRExFX1RJTUVPVVQsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImNvcHlJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBjb3B5IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFwcGVuZCBwb3B1cCB0byBib2R5IGFmdGVyIHRpbWVvdXQgZXhwaXJlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYFR5cGU6ICR7dHlwZX0gbm90IGZvdW5kIGZvciBvcGVyYXRvcjogJHtvcGVyYXRvcn1gKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzZXRhdHRyaWJ1dGVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNldHRpbmcgYXR0cmlidXRlOiBcIiwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgICBjYXNlIFwic3JjXCI6XG4gICAgICAgICAgZWxlbWVudC5jc3MoXCJjb250ZW50XCIsIGB1cmwoJHt2YWx1ZS50cmltKCl9KWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHlWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG5cbiAgICAgICAgICBlbGVtZW50LmNzcyhwcm9wZXJ0eSwgcHJvcGVydHlWYWx1ZSwgXCIhaW1wb3J0YW50XCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmhhbmRsZWQgYXR0cmlidXRlOiBTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kKGA8c2NyaXB0PiR7dmFsdWV9PC9zY3JpcHQ+YCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coYE1vdmluZyAke21vdmVfc2VsZWN0b3JfMX0gdG8gJHttb3ZlX3NlbGVjdG9yXzJ9YCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzb3VyY2UucmVtb3ZlKCk7XG4gICAgICBkZXN0aW5hdGlvbi5wcmVwZW5kKHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJwcm9kdWN0SW5mb0xvb2t1cFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBvcGVyYXRvciBleGlzdHMgeWV0XCIsIG9wZXJhdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpID0+IHtcbiAgICAvLyBnZXQga2V5cyBvZiBwcm9kdWN0SW5mb1xuICAgIGNvbnN0IHNrdUxpc3QgPSBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIgP1xuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wiLCB0cnVlKSA6XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3VMaXN0WzBdKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIGNvbnN0IGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UgPSBhc3luYyAoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFRpdGxlcyA9ICFBcnJheS5pc0FycmF5KHRpdGxlcykgPyBbdGl0bGVzXSA6IHRpdGxlcztcbiAgICBmb3IgKGNvbnN0IHBhcnNlZFRpdGxlIG9mIHBhcnNlZFRpdGxlcykge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBwYXJzZWRUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgIGlmIChpZCAmJiBpZCA9PT0gXCJuZC1wb3B1cF9fd3JhcHBlclwiKSB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKFwibmQtbW9kYWxfX3dyYXBwZXJcIikpIHtcbiAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQb3B1cCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSA+IDApIHJldHVybjtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMSk7XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5kLXBvcHVwX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG5cbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9LCAxNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheU1vZGFsID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKSkgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgaXNNb2RhbD1mYWxzZSkgPT4ge1xuICAgIC8vIENyZWF0ZSBwb3B1cCB3cmFwcGVyXG4gICAgY29uc3QgcG9wdXBXcmFwcGVyID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKTtcbiAgICBpZiAoaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1tb2RhbF9fd3JhcHBlclwiKTtcbiAgICBpZiAoIWlzTW9kYWwpIHBvcHVwV3JhcHBlci5pZCA9IFwibmQtcG9wdXBfX3dyYXBwZXJcIjtcblxuICAgIC8vIENyZWF0ZSBwb3B1cCBjbG9zZSBidXR0b25cbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b25TdHlsZSA9IGlzTW9kYWwgPyBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VfX2NvbG9yZWRcIiA6IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZVwiO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChwb3B1cENsb3NlQnV0dG9uU3R5bGUpO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgaWYgKGlzTW9kYWwpIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGVudFNlbGVjdG9yKSk7XG4gICAgICB3aGlsZSAodmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIGNvbnRlbnRzLnNoaWZ0KCkuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgZnJvbSBhY3Rpb24gYW5kIGFwcGVuZCBjbG9zZSBidXR0b25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBwb3B1cCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlQnV0dG9uKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBwb3B1cCBpZiBleGlzdHMgYmVmb3JlIGFwcGVuZGluZyBuZXcgb25lXG4gICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2FwTm9kZXMgPSBmdW5jdGlvbiBzd2FwTm9kZXMobjEsIG4yKSB7XG4gICAgY29uc3QgcDEgPSBuMS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHAyID0gbjIucGFyZW50Tm9kZTtcbiAgICBsZXQgaTE7XG4gICAgbGV0IGkyO1xuXG4gICAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAxLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4xKSkge1xuICAgICAgICBpMSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcbiAgICAgICAgaTIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xuICAgICAgaTIrKztcbiAgICB9XG4gICAgcDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcbiAgfTtcblxuICBjb25zdCB3YWl0Rm9ySlF1ZXJ5ID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJqUXVlcnkgbm90IGZvdW5kLCByZXRyeWluZ1wiKTtcbiAgICAgICAgY29uc3QgalF1ZXJ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25BcHBsaWNhdG9yID0gYXN5bmMgKGFjdGlvbnMpID0+IHtcbiAgICBpZiAoYXdhaXQgd2FpdEZvckpRdWVyeSgpKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3Rpb24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGFwcGx5QWN0aW9ucyBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgVFJFQVRNRU5UX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGRldGVybWluZVBjdCxcbiAgcHJlcGFyZUFjdGlvbnMsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZX0gPSBib2R5O1xuICAgIHRoaXMuZW5nYWdlbWVudExvY2sgPSB7fTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLnJlQXBwbHlUcmVhdG1lbnRzTWFwID0ge307XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcyA9IFtdO1xuICAgIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB0aGlzLmRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gZGVidWdGaWx0ZXJlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90cygpIHtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZW5nYWdpbmcgcm9ib3QgJHt0cmVhdG1lbnQuaWR9OiAke2Vyci5tZXNzYWdlIHx8IGVycn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3QodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgZWxpZ2liaWxpdHlSdWxlU2V0LFxuICAgICAgZGV2aWNlLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIHJlYXBwbHlfZXZlbnQsXG4gICAgICByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIHdlaWdodCxcbiAgICAgIGRlbGF5LFxuICAgIH0gPSB0cmVhdG1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgZGVidWdNb2RlLFxuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBlbmdhZ2VtZW50TG9jayxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBpc01vYmlsZSxcbiAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwLFxuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgICBwYWdlVHlwZSxcbiAgICAgIHByZXBhcmVBbmRBcHBseSxcbiAgICB9ID0gdGhpcztcblxuICAgIC8vIG9uZSBlbmdhZ2VtZW50IGF0IGEgdGltZVxuICAgIGlmIChlbmdhZ2VtZW50TG9ja1tpZF0pIHtcbiAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBlbmdhZ2VtZW50IGluIHByb2dyZXNzLCBza2lwcGluZ2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSB0cnVlO1xuXG4gICAgaWYgKGRlYnVnTW9kZSAhPT0gMSAmJiAhd2VpZ2h0ICYmICFkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyAmJiAhZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdtb2JpbGUnIG1pc21hdGNoXCIpO1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnZGVza3RvcCcgbWlzbWF0Y2hcIik7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlYXBwbHlfZXZlbnQpIHtcbiAgICAgIGlmICghcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgfHwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgPT09IHBhZ2VUeXBlKSB7XG4gICAgICAgIGxldCByZWFwcGx5X2V2ZW50X2FycmF5ID0gcmVhcHBseV9ldmVudDtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlYXBwbHlfZXZlbnQpKSByZWFwcGx5X2V2ZW50X2FycmF5ID0gW3JlYXBwbHlfZXZlbnRdO1xuICAgICAgICBsb2dnZXIubG9nKGBSZWFwcGx5IGV2ZW50ICcke3JlYXBwbHlfZXZlbnR9JyBmb3VuZCBmb3IgdHJlYXRtZW50OiAke2lkfWApO1xuICAgICAgICBmb3IgKGNvbnN0IHJlYXBwbHlFdmVudCBvZiByZWFwcGx5X2V2ZW50X2FycmF5KSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gP1xuICAgICAgICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA6IFtdO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBhbHJlYWR5IGFkZGVkIGZvciByZWFwcGx5IGV2ZW50XCIpO1xuICAgICAgICAgIH0gZWxzZSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID0gWy4uLnByZXZpb3VzVmFsdWUsIGlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBiYXNlIHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbGV0IHRyZWF0bWVudFNraXBSYXRpbyA9IHdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSB3ZWlnaHQgfHwgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgIGlmIChkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICAgIC8vIElmIGRlcGVuZGFudCBvbiB0cmVhdG1lbnQgaXMgZm91bmQgYW5kIGhhcyB3ZWlnaHQ7IHVzZSBpdHMgc2tpcCByYXRpb1xuICAgICAgICBjb25zdCBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbmQoKHQpID0+IHQuaWQgPT09IGRlcGVuZGFudF9vbl90cmVhdG1lbnQpPy53ZWlnaHQ7XG4gICAgICAgIHRyZWF0bWVudFNraXBSYXRpbyA9IGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0ID09PSAxMDAgPyAwIDogKDEwMCAtIGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0IHx8XG4gICAgICAgICAgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgc2tpcCByYXRpbzogXCIgKyB0cmVhdG1lbnRTa2lwUmF0aW8pO1xuICAgICAgLy8gRGV0ZXJtaW5pbmcgaWRlbnRpZmllciBmb3IgY2FsY3VsYXRpbmcgdHJlYXRtZW50IHBlcmNlbnRhZ2UgKHRyZWF0bWVudFBjdClcbiAgICAgIGNvbnN0IGRldGVybWluaW5nSWRlbnRpZmllciA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQgfHwgaWQ7XG5cbiAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIHRyZWF0bWVudCB1c2VkIHRvIGRldGVybWluZSBpZiBpdCBzaG91bGQgYmUgc2tpcHBlZCBvciBub3RcbiAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyAxMDAgd2hlbiBkZWJ1ZyBtb2RlIGlzIDEsIGVuc3VyaW5nIG5vIHRyZWF0bWVudHMgYXJlIHNraXBwZWRcbiAgICAgIGNvbnN0IHRyZWF0bWVudFBjdCA9IGRlYnVnTW9kZSA9PT0gMSA/IDEwMCA6IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgZGV0ZXJtaW5pbmdJZGVudGlmaWVyKTtcbiAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnRQY3Q6IFwiICsgdHJlYXRtZW50UGN0ICsgYCB3aXRoIGRlYnVnIG1vZGUgJHtkZWJ1Z01vZGUgPyBcIm9uXCIgOiBcIm9mZlwifWApO1xuICAgICAgbGV0IGJ1c2luZXNzUnVsZUlkID0gbnVsbDtcbiAgICAgIGlmIChidXNpbmVzc1J1bGVTZXQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICBidXNpbmVzc1J1bGVJZCA9IGF3YWl0IHRoaXMuY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCk7XG4gICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgIH0gZWxzZSBsb2dnZXIubG9nKFwiQXBwbHlpbmcgdHJlYXRtZW50IHdpdGggZGVmYXVsdCB2YWx1ZXNcIik7XG4gICAgICB9XG4gICAgICBpZiAodHJlYXRtZW50UGN0IDwgdHJlYXRtZW50U2tpcFJhdGlvKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBza2lwcGVkIGR1ZSB0byB0cmVhdG1lbnQgc3BsaXQgcmF0aW9gKTtcbiAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgbnVsbCwgXCJza2lwcGVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKTtcbiAgICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgY2hlY2sgZmFpbGVkIGZvciB0cmVhdG1lbnQ6XCIsIGlkKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW3RyZWF0bWVudC5pZF0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpIHtcbiAgICBjb25zdCBbcHJlcGFyZWQsIHZhcmlhbnRdID0gYXdhaXQgcHJlcGFyZUFjdGlvbnMoaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkKTtcbiAgICBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiYXBwbGllZFwiKTtcbiAgICB9XG4gIH1cblxuICBpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpIHtcbiAgICBjb25zdCB7cmVBcHBseVRyZWF0bWVudHNNYXAsIG1hdGNoZWRUcmVhdG1lbnRzfSA9IHRoaXM7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVBcHBseVRyZWF0bWVudHNNYXApKSB7XG4gICAgICBjb25zdCB0cmVhdG1lbnRJZHMgPSByZUFwcGx5VHJlYXRtZW50c01hcFtrZXldO1xuICAgICAgY29uc3QgcmVBcHBseVRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKHQpID0+IHRyZWF0bWVudElkcy5pbmNsdWRlcyh0LmlkKSk7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiaW5maW5pdGVfc2Nyb2xsXCI6IHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW5maW5pdGVfc2Nyb2xsYCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGltZW91dFwiOiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gdGltZW91dGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5U2VsZWN0b3JMaXN0ID0gQXJyYXkuaXNBcnJheSh0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvcikgP1xuICAgICAgICAgICAgICAgIHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yIDogW3RyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgcmVhcHBseVNlbGVjdG9yTGlzdCkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBlbGVtZW50X2NoYW5nZWApO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib25fc2Nyb2xsXCI6IHtcbiAgICAgICAgICAvLyBhZGQgd2luZG93IHNjcm9sbCBsaXN0ZW5lciwgY2FsbCBlbmdhZ2VSb2JvdCBvbiBzY3JvbGwsIGRvIG5vdCB0cmlnZ2VyIG1vcmUgdGhhbiBvbmNlIHBlciAyNTBtc1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRpbWUgPSAwO1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgaWYgKG5vdyAtIGxhc3RTY3JvbGxUaW1lID4gMjUwICYmIE1hdGguYWJzKGxhc3RTY3JvbGxUb3AgLSBzdCkgPiA1KSB7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIG9uX3Njcm9sbGApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicXVlcnlfc2VhcmNoX2NoYW5nZVwiOiB7XG4gICAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoICE9PSBxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHF1ZXJ5X3NlYXJjaF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlcnZhbFwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgaWYgKGFwcGxpZWQ/Llt0cmVhdG1lbnQuaWRdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbnRlcnZhbGApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgIH0sIDI1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImluZm9fbGF5ZXJfY2hhbmdlXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgICAgICAgICBhZGREYXRhTGlzdGVuZXIodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJlYXBwbHkgZXZlbnQgbm90IGZvdW5kOiBcIiwga2V5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlU2V0ID0gW10sIGJ1c2luZXNzUnVsZVNldCA9IFtdLCBpZH0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMuaW5jbHVkZXMoaWQpKSByZXR1cm47XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKFsuLi5lbGlnaWJpbGl0eVJ1bGVTZXQsIC4uLmJ1c2luZXNzUnVsZVNldF0pO1xuICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihgX19lUnVsZXMuJHtzZWxlY3Rvcn1gLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgfVxuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMucHVzaChpZCk7XG4gIH1cblxuICBleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGVTZXQsIHByZXZpb3VzU2VsZWN0b3JzID0gbnVsbCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHByZXZpb3VzU2VsZWN0b3JzIHx8IFtdO1xuICAgIGZvciAobGV0IHJ1bGUgb2YgcnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBydWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChydWxlLnN0YXJ0c1dpdGgoXCIhXCIpKSBydWxlID0gcnVsZS5zbGljZSgxKTtcbiAgICAgICAgc2VsZWN0b3JzLnB1c2gocnVsZS5zcGxpdChcIi5cIilbMF0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlLnNldCwgc2VsZWN0b3JzKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi4obmV3IFNldChzZWxlY3RvcnMpKV07XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSkge1xuICAgIGxvZ2dlci5sb2coYENoZWNraW5nIGVsaWdpYmlsaXR5ICR7ZWxpZ2liaWxpdHlSdWxlfWApO1xuICAgIGxldCBvcHBvc2l0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgW2VsaWdpYmlsaXR5U2NvcGUsIGVsaWdpYmlsaXR5TmFtZV0gPSBlbGlnaWJpbGl0eVJ1bGUuc3BsaXQoXCIuXCIpO1xuICAgIGlmIChlbGlnaWJpbGl0eVNjb3BlLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBvcHBvc2l0ZUZsYWcgPSB0cnVlO1xuICAgICAgZWxpZ2liaWxpdHlTY29wZSA9IGVsaWdpYmlsaXR5U2NvcGUuc2xpY2UoMSk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7ZWxpZ2liaWxpdHlTY29wZX1gKTtcbiAgICBpZiAoIXJlcyB8fCAhQXJyYXkuaXNBcnJheShyZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9wcG9zaXRlRmxhZyAmJiByZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghb3Bwb3NpdGVGbGFnICYmICFyZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGxvZ2dlci5sb2coYCR7ZWxpZ2liaWxpdHlSdWxlfSBpcyBlbGlnaWJsZWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0LCBlbGlnaWJpbGl0eVNldFR5cGUgPSBudWxsLCBwcmV2aW91c0lzRWxpZ2libGUgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJvYm90IGVsaWdpYmlsaXR5XCIpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFbGlnaWJpbGl0eSBSdWxlIFNldCAke2VsaWdpYmlsaXR5UnVsZVNldH0gaXMgbm90IGFuIGFycmF5YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpc0VsaWdpYmxlID0gcHJldmlvdXNJc0VsaWdpYmxlO1xuICAgIGZvciAoY29uc3QgZWxpZ2liaWxpdHlSdWxlIG9mIGVsaWdpYmlsaXR5UnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaWYgKGlzRWxpZ2libGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzd2l0Y2ggKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSAmJiBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIGVsaWdpYmlsaXR5U2V0VHlwZTogXCIsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlLnNldCwgZWxpZ2liaWxpdHlSdWxlLnR5cGUsIGlzRWxpZ2libGUpO1xuICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzRWxpZ2libGU7XG4gIH1cblxuICAvLyBSZXR1cm4gaW5kZXggb2YgYnVzaW5lc3NSdWxlLCB0aGlzIGlzIHRoZSBidXNpbmVzc1J1bGVJZFxuICBhc3luYyBjaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGJ1c2luZXNzUnVsZV0gb2YgYnVzaW5lc3NSdWxlU2V0LmVudHJpZXMoKSkge1xuICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoW2J1c2luZXNzUnVsZV0pKSByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBUcmVhdG1lbnRSZXBvc2l0b3J5IGZyb20gXCIuLi9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4vcm9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU9uQ29tcG9uZW50XCIpO1xuXG5jb25zdCBiZWFnbGVPbiA9IGFzeW5jIChpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKSA9PiB7XG4gIGNvbnN0IHBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UgPSBTdG9yZS5nZXRJbnN0YW5jZSgpLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xuXG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlID0gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG4gIGNvbnN0IHRyZWF0bWVudFdlaWdodHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRXZWlnaHRzKCk7XG5cbiAgaW5qZWN0U3R5bGVTaGVldCgpO1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcygpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJvbi1pbml0XCIpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IG51bGw7XG4gIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICBzZWFyY2hQYXJhbXMuaW5kZXhPZihcIltcIikgKyAxLFxuICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgfVxuXG4gIGNvbnN0IFt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICB0cmVhdG1lbnRzUHJvbWlzZSwgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UsXG4gIF0pO1xuXG4gIGlmICghdHJlYXRtZW50cyB8fCAhdHJlYXRtZW50V2VpZ2h0cykge1xuICAgIGxldCBtID0gXCJcIjtcbiAgICBpZiAoIXRyZWF0bWVudHMpIG0gPSBtICsgXCJuby1yb2JvdHNcIjtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIG0gPSBtID09PSBcIlwiID8gXCJuby1yb2JvdC13ZWlnaHRzXCIgOiBcIiAtIG5vLXJvYm90LXdlaWdodHNcIjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgbSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHMvd2VpZ2h0c1wiKTtcbiAgfVxuICBsb2dnZXIuc3VjY2VzcyhcIkZvdW5kIHRyZWF0bWVudHM6IFwiLCB0cmVhdG1lbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC10cmVhdG1lbnRzXCIpO1xuXG4gIGNvbnN0IHRyZWF0bWVudFJlcG9zaXRvcnkgPSBuZXcgVHJlYXRtZW50UmVwb3NpdG9yeSh7XG4gICAgdHJlYXRtZW50cyxcbiAgICB0cmVhdG1lbnRXZWlnaHRzLFxuICB9KTtcblxuICBjb25zdCBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IHRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoKTtcbiAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzID09PSBudWxsKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwibm8tdXNlci1zZWdtZW50XCIpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIW1hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aCkge1xuICAgIGxvZ2dlci5sb2coXCJObyB0cmVhdG1lbnRzIG1hdGNoZWQsIHJldHVybmluZyB3aXRob3V0IGZ1cnRoZXIgYWN0aW9uXCIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm5vLXJvYm90LW1hdGNoZWRcIik7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZvdW5kLW1hdGNoZWQtcm9ib3RzXCIpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2U7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm5vLXJ1bGVzLWFzc2Vzc2VkXCIpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBhc3NlcyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJydWxlcy1hc3Nlc3NlZFwiKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwcm9kdWN0LWludG8tbm8tcGVyc2lzdFwiKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGVyc2lzdCBwcm9kdWN0IGluZm9cIik7XG4gIH1cblxuICAvLyBhd2FpdCBQcm9taXNlLmFsbChbXG4gIC8vICAgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UsIHBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UsXG4gIC8vIF0pO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImVuZ2FnaW5nLXJvYm90c1wiKTtcbiAgY29uc3Qgcm9ib3RFbmdpbmUgPSBuZXcgUm9ib3RFbmdpbmUoe1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgIGRlYnVnTW9kZSxcbiAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICBpZGVudGlmaWVyLFxuICAgIHBhZ2VUeXBlLFxuICB9KTtcbiAgYXdhaXQgcm9ib3RFbmdpbmUuZW5nYWdlUm9ib3RzKCk7XG4gIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJyb2JvdHMtZW5nYWdlZFwiKTtcbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJBcHBsaWVkIHRyZWF0bWVudHM6IFwiLCBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgUnVsZUVuZ2luZS5nZXRFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGlmICghZWxpZ2liaWxpdHlSdWxlcykgcmV0dXJuO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICBjb25zdCBydWxlRW5naW5lID0gbmV3IFJ1bGVFbmdpbmUoe2VsaWdpYmlsaXR5UnVsZXN9KTtcbiAgYXdhaXQgcnVsZUVuZ2luZS5hc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzZWQtZWxpZ2liaWxpdHktcnVsZXNcIik7XG59XG5leHBvcnQgZGVmYXVsdCBiZWFnbGVPbjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IE1vbml0b3IgZnJvbSBcIi4uL0JlYWdsZU1vbml0b3IvaW5kZXhcIjtcbmltcG9ydCBiZWFnbGVPbiBmcm9tIFwiLi4vQmVhZ2xlT25cIjtcbmltcG9ydCB7XG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBTUExJVF9SQVRJTyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04sXG4gIFZFUlNJT04sXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGdldElkZW50aWZpZXIsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbiAgZGV0ZXJtaW5lUGN0LFxuICBnZXREZWJ1Z01vZGUsXG4gIHN3aXRjaFRvRWFzZU91dCxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmxldCBTSFVURE9XTiA9IGZhbHNlO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIHN3aXRjaFRvRWFzZU91dCgpO1xuICBsZXQgbW9uaXRvciA9IG51bGw7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgaW5pdGlhbGl6aW5nXCIpO1xuICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcblxuICBsZXQgZWFybHlMb2dTZW50ID0gZmFsc2U7XG4gIGxldCBoaWRlUmVtb3ZlZCA9IGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBJTklUIFRBU0tTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgaW5pdGlhbGl6aW5nXCIpO1xuICAgIG1vbml0b3IgPSBuZXcgTW9uaXRvcigpO1xuICAgIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIoKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvb2tpZVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiLCBjb29raWVQY3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiLCBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2XCIsIFZFUlNJT04pO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic3JcIiwgU1BMSVRfUkFUSU8pO1xuXG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IG1vbml0b3IucGFja0FuZFF1ZXVlQXJyaXZhbExvZygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgfSwgMjAwMCk7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFkgUFJVTkUgT1VULU9GLVNDT1BFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgY29uc3Qgb29zUmVhc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUpO1xuXG4gICAgLy8gaWYgY2Fubm90IGdldCBjcml0aWNhbCBpbmZvLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgdW5zdXBwb3J0ZWRcbiAgICBpZiAoXG4gICAgICBjb29raWVQY3QgPT09IG51bGwgfHxcbiAgICAgICFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fFxuICAgICAgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIHR5cGVvZiBTdHJpbmc/LnByb3RvdHlwZT8ucGFkU3RhcnQgIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwidW5zdXBwb3J0ZWRcIilcbiAgICApIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCBkZXZpY2VcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZC1kZXZpY2VcIik7XG4gICAgfVxuXG4gICAgY29uc3QgaXNMYWJlbFNlbnQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQpO1xuICAgIGNvbnN0IHRpbWVvdXRDb3VudGVyID0gcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5UKSkgfHwgMDtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnIG1vZGUgaXMgb24sIGFsc28gYWRkcyBkYm0gdG8gYmVhZ2xlSW5mb0xheWVyIGFuZCBzZXRzIG9vc1JlYXNvblxuICAgIGNvbnN0IGRlYnVnTW9kZSA9IGdldERlYnVnTW9kZShcImVtcGxveWVlXCIpO1xuXG4gICAgLy8gaWYgdGltZWQtb3V0IHRvbyBtYW55IHRpbWVzIGZvciB2ZXJ5IGZpcnN0IGludGVyYWN0c2lvbnMsIG1ha2Ugb3V0IG9mIHNjb3BlIGZvciB0aGUgc2Vzc2lvblxuICAgIGlmICghZGVidWdNb2RlICYmICFvb3NSZWFzb24gJiYgIWlzTGFiZWxTZW50ICYmIHRpbWVvdXRDb3VudGVyID4gTUFYX1RJTUVPVVRfUEVSX1NFU1NJT05cbiAgICApIHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcInVuc3VwcG9ydGVkXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm1heC10aW1lb3V0XCIpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEFETUlOIFVTRVIgQ0hFQ0sgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyBUT0RPOiByZW5hbWUgc2hvd3Jvb20gbG9naWMgdG8gYWRtaW4sIGFuZCBtYXAgdnZzSXNTaG93cm9vbSB0byBhIGNvbmZpZ3VyYWJsZSBhZG1pbiBwYXJhbVxuXG4gICAgLy8gaWYgYWRtaW4gdXNlciwgbWFrZSBvdXQgb2Ygc2NvcGUgYW5kIG1hcmsgYXMgZW1wbG95ZWVcbiAgICBjb25zdCBwcm9jZXNzQWRtaW5Vc2VyID0gKCkgPT4ge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwiZW1wbG95ZWVcIik7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0FETUlOLCB0cnVlKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgYWRtaW5cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhZG1pbi1lbXBsb3llZVwiKTtcbiAgICB9O1xuXG4gICAgbGV0IGlzQWRtaW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0FETUlOKTtcbiAgICAvLyBpZiBub3QgZm91bmQgaW4gbG9jYWxTdG9yYWdlLCBjaGVjayBiZWFnbGVJbmZvTGF5ZXIgd2l0aCBibG9ja2luZyBtZG9lXG4gICAgaWYgKGlzQWRtaW4gPT09IG51bGwgfHwgaXNBZG1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpc0FkbWluID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSk7XG4gICAgLy8gcGVybWFuZW50IGxhYmVsIGNhbiBiZSBmYWxzZSwgYnV0IGFkbWluIHVzZXIgY2FuIHN0aWxsIGxvZ2luIGFuZCB0dXJuIHRydWUsIGxhemlseSBmaXggdGhpc1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gXCJmYWxzZVwiIHx8IGlzQWRtaW4gPT09IGZhbHNlKSB7XG4gICAgICAvLyBhc3luYyBjYWxsIHRvIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIHRoZW4gc2V0IGxvY2FsU3RvcmFnZVxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSkudGhlbigoaXNBZG1pbikgPT4ge1xuICAgICAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBwcm9jZXNzQWRtaW5Vc2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0FkbWluICYmIChpc0FkbWluID09PSBcInRydWVcIiB8fCBpc0FkbWluID09PSB0cnVlKSkge1xuICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWFkbWluLXN0YXR1c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1lYXNlXCIpKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbnRpLWZsaWNrZXItdGltZW91dFwiKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IE9OL09GRiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gaXNPbiBjYW4gYmUgdHJ1ZSAoT04pLCBmYWxzZSAoT0ZGKVxuICAgIGxldCBpc09uID0gbnVsbDtcblxuICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJEZWJ1ZyBtb2RlIG9uOiBhbGwgYXBwbGljYWJsZSB0cmVhdG1lbnRzIHdpbGwgYmUgYXBwbGllZFwiKTtcbiAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcImVtcGxveWVlXCIpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVXNlciBpcyBvdXQgb2Ygc2NvcGVcIik7XG4gICAgICAvLyBzZXQgaXNPbiB0byB0cnVlL2ZhbHNlIHdoZW4gbm90IGRlYnVnTW9kZSBidXQgb3V0IG9mIHNjb3BlIGkuZS4gbmRfZGVidWc9MCBmb3IgdGVzdGFiaWxpdHlcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbikge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB1bmtub3duXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBvdXQgb2Ygc2NvcGUgcmVhc29uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBncmVhdGVyIHRoYW4gU1BMSVRfUkFUSU8sIHRoZW4gaW4gT04gbW9kZVxuICAgICAgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTykge1xuICAgICAgICBpc09uID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidHJ1ZVwifSk7XG4gICAgICB9IGVsc2UgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTy8yKSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZmFsc2UyXCJ9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZmFsc2UxXCJ9KTtcbiAgICAgIH1cblxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJpc09uXCIsIGlzT24pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19MQUJFTF9TRU5ULCB0cnVlKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBpc09uLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBFQVJMWS1QUk9DRVNTIENPTlZFUlNJT04gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyBhd2FpdCBjcml0aWNhbCBpbmZvIGJlZm9yZSBzZW5kaW5nIGxvZ3MgZm9yIHByb3BlciBhbmFseXRpY3MgbWVhc3VyZW1lbnRzXG4gICAgY29uc3QgcGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gICAgaWYgKHBhZ2VUeXBlID09PSBcInB1cmNoYXNlXCIpIHtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5yZXZlbnVlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICAvLyBzZW5kIGxvZ3MgaW1tZWRpYXRlbHkgb24gcHVyY2hhc2UgcGFnZSwgYW5kIGZvcmNlIHdhaXRcbiAgICAgIGF3YWl0IG1vbml0b3Iuc2VuZExvZ3ModHJ1ZSk7XG4gICAgICAvLyBpZiBwdXJjaGFzZSBpcyBjb21wbGV0ZSwgZG8gbm90IGFwcGx5IGFueSB0cmVhdG1lbnRzIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgU0hVVERPV04gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZW5kIGxvZ3Mgd2hlbiByZWFkeSwgc3RhcnQgc2NyYXBpbmcgYW5kIHNlbmRpbmcgYXN5bmNseVxuICAgICAgbW9uaXRvci5zZW5kTG9ncyhmYWxzZSk7XG4gICAgfVxuICAgIGVhcmx5TG9nU2VudCA9IHRydWU7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gUk9CT1QgUEFUSHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgaWYgKGlzT24gPT09IHRydWUpIHtcbiAgICAgIGlmICghU0hVVERPV04pIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkJlYWdsZSBPTiBHcm91cCBQYXRoXCIpO1xuICAgICAgICBiZWFnbGVPbihpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9OIEdyb3VwIFNIVVRET1dOIFBhdGhcIik7XG4gICAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc09uID09PSBmYWxzZSkge1xuICAgICAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgT0ZGIEdyb3VwIFBhdGhcIik7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgIGhpZGVSZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaXNPbiBpcyB1bmRlZmluZWQgb3IgbnVsbFwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiQmVhZ2xlIEVhcmx5IFNjb3BlLW91dCBvciBFUlJPUjogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIGlmICghaGlkZVJlbW92ZWQpIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG59KSgpO1xuIl0sIm5hbWVzIjpbInJlcGxhY2VBbGwiLCJzdHIiLCJmaW5kIiwicmVwbGFjZSIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxlbmd0aCIsInR1cmtpc2hUb0xvd2VyIiwic3RyaW5nIiwibGV0dGVycyIsImxldHRlciIsInRvTG93ZXJDYXNlIiwiaXNTdGFnaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5jbHVkZXMiLCJWRVJTSU9OIiwiQ09PS0lFX05BTUUiLCJUUkVBVE1FTlRTX0xPQ0FUSU9OIiwiVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04iLCJTVFlMRVNIRUVUX0xPQ0FUSU9OIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiRV9SVUxFU19MT0NBVElPTiIsIlBST0RVQ1RfSU5GT19MT0NBVElPTiIsIkxPR19BUElfVVJMIiwiTE9PS1VQX0FQSV9VUkwiLCJNT0JJTEVfTUVESUFfUVVFUlkiLCJTUExJVF9SQVRJTyIsIlRSRUFUTUVOVF9SQVRJTyIsIlRSRUFUTUVOVFNfRFVSQVRJT04iLCJNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiIsIkxJU1RfTU9ERV9CRUFHTEVfS0VZUyIsIklETEVfVElNRU9VVCIsIlNFU1NJT05fU1RPUkFHRV9LRVlTIiwiU0VTU0lPTl9USU1FU1RBTVAiLCJTRVNTSU9OX0hJU1RPUlkiLCJUUkVBVE1FTlRTIiwiUE9QVVBfRElTUExBWV9GTEFHIiwiU0tVX0lORk9fQkFTS0VUIiwiVElNRU9VVF9DT1VOVCIsIlNFU1NJT05fUkVGRVJSRVIiLCJXRUlHSFRTIiwiRUxJR0lCSUxJVFlfUlVMRVMiLCJMT0NBTF9TVE9SQUdFX0tFWVMiLCJERUJVR19NT0RFIiwiT1VUX09GX1NDT1BFIiwiSVNfTEFCRUxfU0VOVCIsIlVTRVJfSUQiLCJEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFIiwiSVNfQURNSU4iLCJDVVNUT01fU1RPUkFHRV9QUkVGSVgiLCJMb2dnZXIiLCJvcmlnaW4iLCJ0ZXN0aW5nIiwiREVCVUciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYXJncyIsImNvbnNvbGUiLCJpbmZvIiwibG9nIiwibWVzc2FnZUNvbmZpZyIsImZvckVhY2giLCJhcmd1bWVudCIsInR5cGUiLCJ3YXJuIiwiZXJyb3IiLCJhZGRUb0JlYWdsZUluZm9MYXllciIsImxvZ2dlciIsIm1vbnRocyIsInJlbW92ZURvY3VtZW50SGlkZSIsInRvcCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwic3dpdGNoVG9FYXNlT3V0IiwiZWwiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJwcmVwZW5kIiwiYWRkIiwiZmV0Y2hUcmVhdG1lbnRzIiwiZmV0Y2hQbHVzIiwidHJlYXRtZW50cyIsIkVycm9yIiwianNvbiIsImpzb25UcmVhdG1lbnQiLCJmYWlsZWQiLCJtZXNzYWdlIiwiZmV0Y2hUcmVhdG1lbnRXZWlnaHRzIiwidHJlYXRtZW50V2VpZ2h0cyIsImpzb25UcmVhdG1lbnRXZWlnaHRzIiwiZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzIiwiZWxpZ2liaWxpdHlSdWxlcyIsImpzb25FbGlnaWJpbGl0eVJ1bGVzIiwiZmV0Y2hQcm9kdWN0SW5mbyIsInByb2R1Y3RJbmZvIiwidGV4dCIsInByb2R1Y3RJbmZvQ1NWIiwiY3N2VG9BcnJheSIsInRpbWVvdXQiLCJ0aW1lIiwiY29udHJvbGxlciIsIkFib3J0Q29udHJvbGxlciIsInNldFRpbWVvdXQiLCJhYm9ydCIsInVybCIsIm9wdGlvbnMiLCJyZXRyaWVzIiwiZmV0Y2giLCJzaWduYWwiLCJ0aGVuIiwicmVzIiwib2siLCJzdGF0dXMiLCJjYXRjaCIsImV4dHJhY3RDb29raWVJZGVudGlmaWVyIiwiY29va2llU3RyaW5nIiwiY29va2llTmFtZSIsInBhcnNlZCIsInNwbGl0IiwibWFwIiwidiIsInJlZHVjZSIsImFjYyIsImRlY29kZVVSSUNvbXBvbmVudCIsInRyaW0iLCJpZGVudGlmaWVyIiwiaWRlbnRpZmllckluZGV4IiwiZGV0ZXJtaW5lUGN0IiwiaGFzaCIsImdldFVuc2VjdXJlSGFzaCIsInBjdCIsImV4aXRTY3JvbGxMaXN0ZW5lciIsImNhbGxCYWNrIiwibG9vcCIsInNjcm9sbFRvcCIsImxhc3RTY3JvbGxUb3AiLCJjbGVhckludGVydmFsIiwiZXhpdFNjcm9sbEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJzdHlsZUFwcGxpY2F0b3IiLCJlbGVtZW50cyIsInN0eWxlQ2hhbmdlc01hcCIsImkiLCJlbGVtZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInZhbHVlIiwic3R5bGUiLCJpbmplY3RTdHlsZVNoZWV0Iiwic3R5bGVTaGVldCIsInJlbCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInByZXBhcmVBY3Rpb25zIiwiYWN0aW9uc1RvUHJlcGFyZSIsImJ1c2luZXNzUnVsZUlkIiwiZGVidWdNb2RlIiwiYWN0aW9ucyIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInZhcmlhbnQiLCJhY3Rpb24iLCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMiLCJ2YXJpYW50cyIsImJ1c2luZXNzVHJhbnNmb3JtYXRpb24iLCJpZCIsImtleXMiLCJ2YXJpYW50S2V5IiwicmFuZG9tUGN0Iiwid2VpZ2h0IiwiTWF0aCIsImZsb29yIiwiaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMiLCJwb3B1cERpc3BsYXlGbGFnIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXNzaW9uVGltZXN0YW1wIiwic2Vzc2lvbkhpc3RvcnkiLCJzZXRJdGVtIiwibm93IiwicGF0aG5hbWUiLCJjb25kaXRpb25DaGVja2VyIiwicnVuVGltZVZhbHVlIiwiY29uZGl0aW9uIiwic3VjY2VzcyIsInVuZGVmaW5lZCIsIm1pbiIsIm1heCIsInBhcnNlSW50IiwicmVnZXgiLCJSZWdFeHAiLCJ0ZXN0IiwiZ2V0RGVidWdNb2RlIiwib29zUmVhc29uIiwicXVlcnlTdHJpbmciLCJzZWFyY2giLCJyZW1vdmVJdGVtIiwiY3VycmVudCIsImdldEdhQ2xpZW50SWQiLCJnYSIsImdldEFsbCIsInRyYWNrZXJzIiwiZ2V0IiwiY2hhciIsImNoYXJDb2RlQXQiLCJhYnMiLCJnZXRSYW5kb21JbnQiLCJyYW5kb20iLCJnZXRVbml4VGltZSIsImdldElkZW50aWZpZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsImV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwiLCJlIiwiZGVsYXkiLCJtcyIsImZvcm1hdERlbGl2ZXJ5RGF0ZSIsImRhdGUiLCJyZXN1bHQiLCJzdGFydE1vbnRoSW5kZXgiLCJlbmRNb250aEluZGV4Iiwic3RhcnREYXkiLCJlbmREYXkiLCJtYXRjaCIsInRvZGF5Iiwic3RhcnRZZWFyIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImVuZFllYXIiLCJlc3RpbWF0ZWRTdGFydCIsImVzdGltYXRlZEVuZCIsInN0YXJ0RGlmZk92ZXJEYXlzIiwiY2VpbCIsImVuZERpZmZPdmVyRGF5cyIsInN0YXJ0RGlmZk92ZXJXZWVrcyIsImVuZERpZmZPdmVyV2Vla3MiLCJlcnIiLCJpZGxlVGltZXIiLCJ0aW1lT3V0IiwicmVzZXRUaW1lciIsImNsZWFyVGltZW91dCIsImlkbGVUaW1lb3V0Iiwib250b3VjaHN0YXJ0IiwiZ2V0QnJvd3NlclR5cGUiLCJ1c2VyQWdlbnQiLCJuYXZpZ2F0b3IiLCJpc093bk11dGF0aW9uIiwibXV0YXRpb25MaXN0Iiwibm9kZXMiLCJBcnJheSIsImZyb20iLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwic29tZSIsIm4iLCJ0YWdOYW1lIiwiYyIsInN0ckRhdGEiLCJzdHJEZWxpbWl0ZXIiLCJvYmpQYXR0ZXJuIiwiYXJyRGF0YSIsImFyck1hdGNoZXMiLCJleGVjIiwic3RyTWF0Y2hlZERlbGltaXRlciIsInB1c2giLCJzdHJNYXRjaGVkVmFsdWUiLCJjb25maWciLCJkYk5hbWUiLCJ2ZXJzaW9uIiwibWFpbnRlbmFuY2VPcGVyYXRpb25Db3VudCIsInN0b3JlIiwibmFtZSIsImluZGV4ZXMiLCJmaWVsZHMiLCJrZXlQYXRoIiwiYXV0b0luY3JlbWVudCIsIl93aW5kb3ciLCJhbGx0aW1lIiwic2Vzc2lvbiIsIkJlYWdsZURhdGFDb2xsZWN0aW9uV3JhcHBlciIsImluZGV4ZWREQiIsImluaXQiLCJvcGVuUmVxdWVzdCIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJldmVudCIsIm9sZFZlcnNpb24iLCJkZWxldGVPYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwiaWR4IiwiY3JlYXRlSW5kZXgiLCJvbmVycm9yIiwib25zdWNjZXNzIiwiZGIiLCJkZWxldGVSZXF1ZXN0IiwiZGVsZXRlRGF0YWJhc2UiLCJyZWplY3QiLCJpbnRlcnZhbCIsInJlYWR3cml0ZSIsImdldENvbm5lY3Rpb24iLCJ0eCIsInRyYW5zYWN0aW9uIiwib2JqZWN0U3RvcmUiLCJkYXRhTmFtZSIsImRhdGFWYWx1ZSIsImluaXRUcmFuc2FjdGlvbiIsInNlc3Npb25JZCIsImdldEN1cnJlbnRTZXNzaW9uSWQiLCJyb3VuZCIsInBheWxvYWQiLCJwdXQiLCJvcCIsInN0b3JlZCIsImdldEN1cnNvciIsImN1cnNvciIsInRhcmdldCIsImNvbnRpbnVlIiwibWlubWF4IiwiTWFwIiwiaGFzIiwic2V0IiwiZ3JvdXBCeSIsImRhdGEiLCJjb3VudCIsInRvdGFsIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJvcGVuQ3Vyc29yIiwiSURCS2V5UmFuZ2UiLCJvbmx5IiwidG9TdHJpbmciLCJpbmRleFZhbHVlIiwic3VtIiwic2l6ZSIsInZhbHVlcyIsImQiLCJzZXRIb3VycyIsImdldEhvdXJzIiwicGFkU3RhcnQiLCJnZXREYXRlIiwiQ29sbGVjdG9yQXBpIiwiY29sbGVjdG9yQXBpIiwicXVlcnlJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZSIsInF1ZXJ5TWV0aG9kIiwicXVlcnlQcm9taXNlIiwiYXZnIiwibW9kZSIsImxhc3QiLCJkYXRhVmFsdWVzIiwib2JqIiwiZGF0YV92YWx1ZSIsInVwZGF0ZUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVWYWx1ZSIsInVwZGF0ZU1ldGhvZCIsInNhdmUiLCJiZWFnbGVJbmZvTGF5ZXIiLCJhIiwiZiIsIl9faHdtIiwic2VhcmNoUGF0aHMiLCJQYWdlVHlwZURlcGVuZCIsIm1ldGhvZCIsInNlbGVjdG9yIiwiZm9ybWF0dGVyIiwiZXhjbHVzaXZlIiwib3BlcmFuZCIsIm9ic2VydmVyIiwiY2hpbGRyZW4iLCJmZWF0dXJlRW5naW5lZXJpbmdPcHMiLCJmZWF0dXJlTmFtZSIsImluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNIiwiaW5mb0xheWVyIiwidHlwZWRWYWx1ZSIsImxhc3RLZXkiLCJwb3AiLCJ1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yIiwicGFzc1ZhbHVlVG9MaXN0ZW5lcnMiLCJEQVRBX0xJU1RFTkVSUyIsImFkZERhdGFMaXN0ZW5lciIsImxpc3RlbmVyIiwibGlzdGVuZXJzIiwiaXNBcnJheSIsImdldEZyb21CZWFnbGVJbmZvTGF5ZXIiLCJibG9ja2luZyIsInBvbGxJbnRlcnZhbCIsIm9idGFpbkRhdGEiLCJqc29uR2V0Iiwic2VhcmNoRWxlbWVudCIsImlzRm91bmQiLCJpc0lnbm9yZSIsInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIiLCJhZGRUcmVhdG1lbnQiLCJkZXBlbmRhbnRfb25fdHJlYXRtZW50IiwiUEFSU0VTRUFSQ0hNQVhSRVRSWSIsIlBBUlNFU0VBUkNIU1RBUlRERUxBWSIsInBhcnNlU2VhcmNoUGF0aHNEZWxheSIsInBhcnNlU2VhcmNoUGF0aHNSZXRyeSIsImluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIiLCJwcmVwYXJlQ29yZURhdGEiLCJwYXJzZXJDYWxsZXIiLCJhZGRNZXRyaWNzIiwiY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvciIsImJhc2VGZWF0dXJlTmFtZXMiLCJGRURhdGEiLCJGRU9wIiwicXVlcnlSZXNwb25zZSIsInByb2Nlc3NGb3JtYXR0ZXIiLCJ0b1VwcGVyQ2FzZSIsInNlYXJjaE9iaiIsImxheWVyVmFsdWUiLCJmaWx0ZXJQYXJhbXMiLCJmaWx0ZXJOYW1lIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJNYXRjaCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b0JlVXBkYXRlZCIsImNoaWxkIiwiY2hpbGRFbGVtZW50cyIsImZpbHRlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJ0cmlnZ2VyUmVzdGFydCIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiaW5uZXJUZXh0IiwiYXR0cmliVmFsdWVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInZhbHVlY2hpbGQiLCJhdHRyaWJWYWx1ZSIsImdldEF0dHJpYnV0ZSIsInNldFZhbHVlIiwic3VtUHJpY2UiLCJjaGlsZFRleHQiLCJhcnJheUlubmVyVGV4dCIsImV4Y2x1c2l2ZUVsZW1lbnQiLCJjdXN0b21EYXRhRGVyaXZhdGlvbnMiLCJjdXJyZW50UGFnZVR5cGUiLCJhbGwiLCJpc0NhcnRFbXB0eSIsInRvdGFsQmFzZVByaWNlIiwiY291cG9uTm90QXBwbGljYWJsZSIsInByaWNlcyIsInF1YW50aXRpZXMiLCJ0b3RhbFByaWNlIiwiY291cG9uQXBwbGljYWJsZUFtb3VudCIsInNrdSIsInNrdUxpc3QiLCJwYXJzZVNlYXJjaFBhdGhzIiwiZG9tU3RhdHVzIiwicmVhZHlTdGF0ZSIsIndpbnRvcCIsImRhdGFMYXllciIsIndpbmRvYyIsImZvdW5kTmFtZXMiLCJTZXQiLCJwcmV2Rm91bmROYW1lcyIsIm5vdEZvdW5kTmFtZXMiLCJzZWFyY2hBbmRTZXQiLCJkYXRhTGF5ZXJJdGVtIiwic29yZ0FycmF5SW5uZXIiLCJnZXRTT1JHQXJyYXkiLCJzb3JnSXRlbSIsImpvaW4iLCJwYXRoIiwicGF0aEFycmF5Iiwic3ViUGF0aCIsInNsaWNlIiwic3ViQXJyYXkiLCJzdWJLZXkiLCJzdWJWYWx1ZSIsIndpbmRvd1B0ciIsIm5hdlB0ciIsInBsYXRmb3JtIiwidXNlckFnZW50RGF0YSIsImRldmljZVBpeGVsUmF0aW8iLCJhdmFpbFdpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIndpbmRvd0RlcHRoIiwiY29sb3JEZXB0aCIsInBpeGVsRGVwdGgiLCJ2cG9ydFNoYXBlIiwidmlzdWFsVmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsImlPUyIsIm9yaWVudGF0aW9uQW5nbGUiLCJvcmllbnRhdGlvbiIsImFuZ2xlIiwidGVtcCIsImhpc3RvcnkiLCJuYXZBZ2VudCIsImJyYW5kcyIsImJyYW5kIiwibW9iaWxlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJ1c2VyTGFuZ3VhZ2UiLCJtYXhUb3VjaFBvaW50cyIsInZlbmRvciIsImNvbm5lY3Rpb24iLCJkb3dubGluayIsImN1cnJlbnRVUkwiLCJVUkwiLCJob3N0bmFtZSIsImRvTm90VHJhY2siLCJtc0RvTm90VHJhY2siLCJyZWZlcnJlciIsImZpcnN0U2Vzc2lvblJlZmVycmVyIiwicGFnZVR5cGUiLCJwZXJmTWV0cmljcyIsInBlcmZOYXZpZ2F0aW9uTWV0cmljcyIsInBlcmZvcm1hbmNlIiwiZ2V0RW50cmllc0J5VHlwZSIsImNvbm5lY3QiLCJjb25uZWN0RW5kIiwiY29ubmVjdFN0YXJ0IiwicmVxdWVzdCIsInJlc3BvbnNlRW5kIiwicmVxdWVzdFN0YXJ0IiwiZG9tIiwiZG9tSW50ZXJhY3RpdmUiLCJkb21Db21wbGV0ZSIsImxvYWQiLCJsb2FkRXZlbnRFbmQiLCJsb2FkRXZlbnRTdGFydCIsImR1cmF0aW9uIiwic2NoZW1hT3JnRWx0cyIsInNvcmdBcnJheSIsInNUYWciLCJjbnRudCIsImpzb25jb250ZW50IiwiSEVBREVSUyIsIk1vbml0b3IiLCJoYXNBcnJpdmFsTG9nU2VudCIsImhhc01haW5Mb2dTZW50IiwiaGFzVXBkYXRlc1NlbnQiLCJoaWdoV2F0ZXJNYXJrIiwiaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycyIsImltbWVkaWF0ZSIsInBhY2tBbmRRdWV1ZU1haW5Mb2ciLCJwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZyIsInBhY2thZ2VNYWluTG9nRGF0YSIsInJlcXVlc3RCbG9iIiwiY2hlY2tGb3JMYXRlc3RDaGFuZ2VzIiwicXVldWVMb2dzIiwiaGFzQ2hhbmdlZCIsInBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEiLCJsb2dEYXRhIiwicGFja2FnZUFycml2YWxMb2dEYXRhIiwiaHdtIiwiY29va2llR2FJZCIsInZpZXdfZXBvY2giLCJib2R5IiwibGMiLCJ1Iiwib25IYXNoUGN0IiwiQmxvYiIsInN0YXJ0c1dpdGgiLCJzIiwibSIsInZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsb3NlRXZlbnQiLCJjYXB0dXJlIiwidmlzaWJpbGl0eVN0YXRlIiwic2VuZEJlYWNvbiIsInF1ZXVlZCIsInF1ZXVlSW50ZXJ2YWwiLCJjaGVja0RhdGFMYXllclJ1bGUiLCJydWxlIiwib3BlcmF0b3IiLCJkYXRhTGF5ZXJGaW5kZXIiLCJydW50aW1lVmFsdWUiLCJjaGVja0VsZW1lbnRSdWxlIiwic2VsZWN0b3JBbGwiLCJzZWxlY3RvckZhbGxiYWNrIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiRnVuY3Rpb24iLCJjaGVja1Nlc3Npb25SdWxlIiwiZHVyYXRpb25IYW5kbGVyIiwiaGlzdG9yeUhhbmRsZXIiLCJnZXRTZXNzaW9uVGltZXN0YW1wIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiaXNNb2JpbGUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkiLCJ0aW1lc3RhbXAiLCJjbGVhclJlcXVlc3QiLCJjbGVhciIsImdldFJlcXVlc3QiLCJjb3VudFJlcXVlc3QiLCJjdXJzb3JSZXF1ZXN0IiwiZXhpc3RpbmdQcm9kSW5mbyIsImVsYXBzZWRTZWNvbmRzIiwicHJvZHVjdEluZm9Qcm9taXNlIiwiY2xlYXJQcm9taXNlIiwicHJvZHVjdEluZm9BcnJheSIsInByZXBhcmVQYXlsb2FkcyIsInBheWxvYWRzIiwiZmllbGROYW1lcyIsInNoaWZ0IiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJjaGVja1Byb2R1Y3RJbmZvUnVsZSIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRUb0NhcnRDb3VudCIsImdldFByZXZpZXdDb3VudCIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwiTXV0ZXgiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJhZGRlZERhdGFMaXN0ZW5lcnMiLCJtdXRleCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbiIsImNoYWluX2NvbmRpdGlvbiIsInJ1bGVzIiwic2F0aXNmaWVkUnVsZUlkcyIsInNldFVwTGlzdGVuZXJzIiwiYWNxdWlyZSIsInJlbGVhc2UiLCJpc0VsaWdpYmxlIiwiZmlsdGVyZWQiLCJrIiwiZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzIiwiZGF0YUxheWVyUnVsZXMiLCJlbGVtZW50UnVsZXMiLCJib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJiaW5kIiwibXV0YXRpb25SZWNvcmQiLCJldmVyeSIsImVsZW1lbnRUb09ic2VydmUiLCJwYXJlbnROb2RlIiwiY29tcHV0ZVNlZ21lbnQiLCJzZWdtZW50IiwicnVsZVNldCIsInNlZ21lbnRSdWxlRW5naW5lIiwiYnVzaW5lc3NSdWxlU2V0IiwiY2hlY2tSdWxlcyIsIlRyZWF0bWVudFJlcG9zaXRvcnkiLCJ1c2VyU2VnbWVudCIsInVzZXJTZWdtZW50V2VpZ2h0cyIsInRyZWF0bWVudCIsInRyZWF0bWVudHNPYmoiLCJ0cmVhdG1lbnRXaXRoVGltZXN0YW1wIiwiZWxhcHNlZERheXMiLCJ3ZWlnaHRzIiwicmVwbGFjZXIiLCJyZXBsYWNlRm4iLCJ2YWwiLCJjdXJyZW50UmVwbGFjZUZuIiwicmVwbGFjZU9iamVjdEV4dHJhY3RvciIsInJlcGxhY2VWYWwiLCJyZXBsYWNlRm5FeGVjdXRvciIsInJGbiIsInNpbmdsZSIsInJlcGxhY2VGdW5jdGlvbiIsInN0b3JhZ2UiLCJrZXlGYWxsYmFjayIsImNoZWNrQWN0aW9uQ29uZGl0aW9uIiwiZWxpZ2libGVFbGVtZW50cyIsImF0dHJpYnV0ZSIsImlubmVyX2NvbmRpdGlvbiIsImNvbmRpdGlvbkVsZW1lbnRzIiwiYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciIsIiQiLCJlbGVtZW50U2t1IiwiYXBwbHlBY3Rpb25zIiwidHJhbnNmb3JtZXIiLCJhcHBseUV2ZW50IiwiY29udGVudFNlbGVjdG9yIiwibWRDb25kaXRpb24iLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJwVHlwZSIsInByb2R1Y3RJbmZvU3RvcmFnZSIsIm1jIiwiU3RyaW5nIiwiYmVmb3JlIiwiYWZ0ZXIiLCJhcHBlbmQiLCJvZmYiLCJjcmVhdGVQb3B1cCIsImVsbSIsInN0b3BQcm9wYWdhdGlvbiIsImRpc3BsYXlNb2RhbCIsImdldFByb2R1Y3RJbmZvIiwiZGlzcGxheVBvcHVwIiwiciIsInB1c2hTdGF0ZSIsInN0YXRlIiwib25jZSIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsImNzcyIsInByb3BlcnR5IiwicHJvcGVydHlWYWx1ZSIsImF0dHIiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJzZW50ZW5jZSIsIndvcmQiLCJjaGFyQXQiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInJlcGxhY2VXaXRoVmFsIiwiaHRtbFN0ciIsInRpdGxlcyIsInBhcnNlZFRpdGxlcyIsInBhcnNlZFRpdGxlIiwiaGlkZGVuIiwiaGFuZGxlUG9wdXBDbGljayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb2RhbENsaWNrIiwiY29udGFpbnMiLCJoaWRlIiwicVBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJjb250ZW50cyIsInNyYyIsInRlbXBsYXRlIiwiaW5uZXJIVE1MIiwicG9wdXAiLCJjb250ZW50IiwiZmlyc3RDaGlsZCIsInAxIiwicDIiLCJpMSIsImkyIiwiaXNFcXVhbE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJ3YWl0Rm9ySlF1ZXJ5IiwialF1ZXJ5IiwialF1ZXJ5SW50ZXJ2YWwiLCJhY3Rpb25BcHBsaWNhdG9yIiwiT0JTRVJWRVJfQ09ORklHIiwiYXR0cmlidXRlcyIsIlJvYm90RW5naW5lIiwiZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMiLCJtYXRjaGVkVHJlYXRtZW50cyIsImVuZ2FnZW1lbnRMb2NrIiwicmVBcHBseVRyZWF0bWVudHNNYXAiLCJhZGRlZERhdGFMaXN0ZW5lcklkcyIsImVuZ2FnZVJvYm90IiwiaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAiLCJlbGlnaWJpbGl0eVJ1bGVTZXQiLCJkZXZpY2UiLCJyZWFwcGx5X2V2ZW50IiwicmVhcHBseV9ldmVudF9wYWdlX3R5cGUiLCJwcmVwYXJlQW5kQXBwbHkiLCJyZWFwcGx5X2V2ZW50X2FycmF5IiwicmVhcHBseUV2ZW50IiwicHJldmlvdXNWYWx1ZSIsImNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0IiwidHJlYXRtZW50U2tpcFJhdGlvIiwiZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQiLCJ0IiwiZGV0ZXJtaW5pbmdJZGVudGlmaWVyIiwidHJlYXRtZW50UGN0IiwiY2hlY2tCdXNpbmVzc1J1bGVzIiwiYWRkUnVsZVNldERhdGFMaXN0ZW5lcnMiLCJwcmVwYXJlZCIsInRyZWF0bWVudElkcyIsInJlQXBwbHlUcmVhdG1lbnRzIiwiUmVzaXplT2JzZXJ2ZXIiLCJyZWFwcGx5U2VsZWN0b3JMaXN0IiwicmVhcHBseV9zZWxlY3RvciIsImxhc3RTY3JvbGxUaW1lIiwiZ2V0VGltZSIsInN0IiwicGFnZVlPZmZzZXQiLCJyZWFwcGx5SW50ZXJ2YWwiLCJhcHBsaWVkIiwiYm91bmRFbmdhZ2VUcmVhdG1lbnQiLCJzZWxlY3RvcnMiLCJleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzIiwicHJldmlvdXNTZWxlY3RvcnMiLCJlbGlnaWJpbGl0eVJ1bGUiLCJvcHBvc2l0ZUZsYWciLCJlbGlnaWJpbGl0eVNjb3BlIiwiZWxpZ2liaWxpdHlOYW1lIiwiZWxpZ2liaWxpdHlTZXRUeXBlIiwicHJldmlvdXNJc0VsaWdpYmxlIiwiY2hlY2tFbGlnaWJpbGl0eSIsImJ1c2luZXNzUnVsZSIsImJlYWdsZU9uIiwicGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSIsInBlcnNpc3RQcm9kdWN0SW5mbyIsImVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzIiwidHJlYXRtZW50c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRzIiwidHJlYXRtZW50V2VpZ2h0c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRXZWlnaHRzIiwic2VhcmNoUGFyYW1zIiwibGFzdEluZGV4T2YiLCJpdGVtIiwidHJlYXRtZW50UmVwb3NpdG9yeSIsImdldE1hdGNoZWRUcmVhdG1lbnRzIiwicm9ib3RFbmdpbmUiLCJlbmdhZ2VSb2JvdHMiLCJnZXRFbGlnaWJpbGl0eVJ1bGVzIiwicnVsZUVuZ2luZSIsIlNIVVRET1dOIiwibW9uaXRvciIsImVhcmx5TG9nU2VudCIsImhpZGVSZW1vdmVkIiwiY29va2llUGN0IiwicGFja0FuZFF1ZXVlQXJyaXZhbExvZyIsInByb3RvdHlwZSIsIkdMT1ZfT04iLCJpc0xhYmVsU2VudCIsInRpbWVvdXRDb3VudGVyIiwicHJvY2Vzc0FkbWluVXNlciIsImlzQWRtaW4iLCJpc09uIiwic2VuZExvZ3MiXSwic291cmNlUm9vdCI6IiJ9
