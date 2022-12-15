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
            console.time("gl-parserCaller");
            _context8.next = 3;
            return parseSearchPaths();
          case 3:
            if (!(parseSearchPathsRetry < PARSESEARCHMAXRETRY)) {
              _context8.next = 8;
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
            _context8.next = 14;
            break;
          case 8:
            BeagleInfoLayer_logger.log("parseSearchPaths: reached max retry, calling remainder historical data");
            _context8.next = 11;
            return customDataDerivations();
          case 11:
            _context8.next = 13;
            return collectDerivationsFromCollector();
          case 13:
            addToBeagleInfoLayer("__CompletedScraping", true);
          case 14:
            console.timeEnd("gl-parserCaller");
          case 15:
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
            console.time("gl-prepareCoreData");
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
            console.timeEnd("gl-prepareCoreData");
          case 30:
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
  console.time("gl-addMetrics");
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
  console.timeEnd("gl-addMetrics");
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
                console.time("gl-assesEligibilityRules");
                addToBeagleInfoLayer("m", "assessing-eligibility-rules");
                _i = 0, _Object$entries = Object.entries(this.eligibilityRules);
              case 3:
                if (!(_i < _Object$entries.length)) {
                  _context3.next = 32;
                  break;
                }
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], rules = _Object$entries$_i[1];
                satisfiedRuleIds = [];
                this.setUpListeners(key, rules);
                _iterator2 = BeagleRuleEngine_createForOfIteratorHelper(rules);
                _context3.prev = 8;
                _iterator2.s();
              case 10:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 20;
                  break;
                }
                rule = _step2.value;
                _context3.next = 14;
                return this.checkRule(rule);
              case 14:
                if (!_context3.sent) {
                  _context3.next = 18;
                  break;
                }
                satisfiedRuleIds.push(rule.name);
                // Page type rules are exclusive; if one is true all others are false by default, no need to assess the rest
                if (!(key === "PageType")) {
                  _context3.next = 18;
                  break;
                }
                return _context3.abrupt("break", 20);
              case 18:
                _context3.next = 10;
                break;
              case 20:
                _context3.next = 25;
                break;
              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](8);
                _iterator2.e(_context3.t0);
              case 25:
                _context3.prev = 25;
                _iterator2.f();
                return _context3.finish(25);
              case 28:
                addToBeagleInfoLayer("__eRules.".concat(key), satisfiedRuleIds);
              case 29:
                _i++;
                _context3.next = 3;
                break;
              case 32:
                console.timeEnd("gl-assesEligibilityRules");
              case 33:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 22, 25, 28]]);
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
          console.time("gl-start");
          switchToEaseOut();
          monitor = null;
          logger = new src_logger();
          logger.info("Beagle initializing");
          window.dataLayer = window.dataLayer || [];
          earlyLogSent = false;
          hideRemoved = false;
          _context.prev = 8;
          /* ======================================== INIT TASKS ===================================== */

          console.time("gl-init-tasks");
          addToBeagleInfoLayer("GLOV_ON", "not-sent | initializing");
          monitor = new BeagleMonitor();
          initializeBeagleInfoLayer();
          _context.next = 15;
          return getIdentifier();
        case 15:
          identifier = _context.sent;
          logger.log("Found identifier: ", identifier);
          addToBeagleInfoLayer("cookieGaId", identifier);
          _context.next = 20;
          return determinePct(identifier);
        case 20:
          cookiePct = _context.sent;
          addToBeagleInfoLayer("onHashPct", cookiePct);
          addToBeagleInfoLayer("view_epoch", Date.now() + Math.random());
          addToBeagleInfoLayer("v", VERSION);
          addToBeagleInfoLayer("sr", SPLIT_RATIO);

          // data-less log to detect bounces
          _context.next = 27;
          return monitor.packAndQueueArrivalLog();
        case 27:
          setTimeout(function () {
            removeDocumentHide();
          }, 2000);
          console.timeEnd("gl-init-tasks");
          /* ================================= EARLY PRUNE OUT-OF-SCOPE ============================== */

          console.time("gl-early-prune");
          oosReason = window.localStorage.getItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE); // if cannot get critical info, make out of scope and unsupported
          if (!(cookiePct === null || !navigator.sendBeacon || typeof navigator.sendBeacon !== "function" || typeof (String === null || String === void 0 ? void 0 : (_String$prototype = String.prototype) === null || _String$prototype === void 0 ? void 0 : _String$prototype.padStart) !== "function" || oosReason && oosReason === "unsupported")) {
            _context.next = 36;
            break;
          }
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.OUT_OF_SCOPE, "unsupported");
          addToBeagleInfoLayer("GLOV_ON", "unsupported | device");
          throw new Error("unsupported-device");
        case 36:
          isLabelSent = window.localStorage.getItem(LOCAL_STORAGE_KEYS.IS_LABEL_SENT);
          timeoutCounter = parseInt(sessionStorage.getItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT)) || 0; // check if debug mode is on, also adds dbm to beagleInfoLayer and sets oosReason
          debugMode = getDebugMode("employee"); // if timed-out too many times for very first interactsions, make out of scope for the session
          if (!(!debugMode && !oosReason && !isLabelSent && timeoutCounter > MAX_TIMEOUT_PER_SESSION)) {
            _context.next = 43;
            break;
          }
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "unsupported"
          });
          addToBeagleInfoLayer("GLOV_ON", "unsupported | timeout");
          throw new Error("max-timeout");
        case 43:
          console.timeEnd("gl-early-prune");

          /* =================================== ADMIN USER CHECK ==================================== */

          // TODO: rename showroom logic to admin, and map vvsIsShowroom to a configurable admin param

          // if admin user, make out of scope and mark as employee
          console.time("gl-admin-user-check");
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
            _context.next = 53;
            break;
          }
          _context.next = 50;
          return getFromBeagleInfoLayer("vvsIsShowroom", true);
        case 50:
          isAdmin = _context.sent;
          _context.next = 54;
          break;
        case 53:
          if (isAdmin === "false" || isAdmin === false) {
            // async call to getFromBeagleInfoLayer, then set localStorage
            getFromBeagleInfoLayer("vvsIsShowroom", true).then(function (isAdmin) {
              if (isAdmin && (isAdmin === "true" || isAdmin === true)) {
                processAdminUser();
              }
            });
          }
        case 54:
          if (!(isAdmin && (isAdmin === "true" || isAdmin === true))) {
            _context.next = 58;
            break;
          }
          processAdminUser();
          _context.next = 65;
          break;
        case 58:
          if (!(isAdmin === null || isAdmin === undefined)) {
            _context.next = 64;
            break;
          }
          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("no-admin-status");
        case 64:
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, false);
        case 65:
          if (window.top.document.documentElement.classList.contains("glov-ease")) {
            _context.next = 69;
            break;
          }
          sessionStorage.setItem(SESSION_STORAGE_KEYS.TIMEOUT_COUNT, timeoutCounter + 1);
          addToBeagleInfoLayer("GLOV_ON", "not-sent | timeout");
          throw new Error("anti-flicker-timeout");
        case 69:
          console.timeEnd("gl-admin-user-check");

          /* ===================================== ON/OFF CHECK ====================================== */

          // isOn can be true (ON), false (OFF)
          console.time("gl-on-off-check");
          isOn = null;
          if (!debugMode) {
            _context.next = 79;
            break;
          }
          logger.log("Debug mode on: all applicable treatments will be applied");
          isOn = true;
          window.dataLayer.push({
            event: "GLOV",
            GLOV_ON: "employee"
          });
          addToBeagleInfoLayer("GLOV_ON", "employee | tester");
          _context.next = 95;
          break;
        case 79:
          if (!(oosReason && oosReason === "employee")) {
            _context.next = 86;
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
          _context.next = 95;
          break;
        case 86:
          if (!oosReason) {
            _context.next = 91;
            break;
          }
          addToBeagleInfoLayer("GLOV_ON", "not-sent | unknown");
          throw new Error("Unknown out of scope reason");
        case 91:
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
        case 95:
          console.timeEnd("gl-on-off-check");

          /* ================================= EARLY-PROCESS CONVERSION ============================== */

          console.time("gl-early-process-conversion");

          // await critical info before sending logs for proper analytics measurements
          _context.next = 99;
          return getFromBeagleInfoLayer("PageType", true);
        case 99:
          pageType = _context.sent;
          if (!(pageType === "purchase")) {
            _context.next = 110;
            break;
          }
          _context.next = 103;
          return getFromBeagleInfoLayer("purchase.revenue", true, 50, 5000);
        case 103:
          _context.next = 105;
          return getFromBeagleInfoLayer("purchase.paymentType", true, 50, 5000);
        case 105:
          _context.next = 107;
          return monitor.sendLogs(true);
        case 107:
          // if purchase is complete, do not apply any treatments on the confirmation page
          SHUTDOWN = true;
          _context.next = 111;
          break;
        case 110:
          // send logs when ready, start scraping and sending asyncly
          monitor.sendLogs(false);
        case 111:
          earlyLogSent = true;
          console.timeEnd("gl-early-process-conversion");

          /* ======================================= ROBOT PATHs ===================================== */
          console.time("gl-robot-paths");
          if (!(isOn === true)) {
            _context.next = 118;
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
          _context.next = 125;
          break;
        case 118:
          if (!(isOn === false)) {
            _context.next = 124;
            break;
          }
          logger.info("Beagle OFF Group Path");
          removeDocumentHide();
          hideRemoved = true;
          _context.next = 125;
          break;
        case 124:
          throw new Error("isOn is undefined or null");
        case 125:
          console.timeEnd("gl-robot-paths");
          _context.next = 134;
          break;
        case 128:
          _context.prev = 128;
          _context.t0 = _context["catch"](8);
          logger.warn("Beagle Early Scope-out or ERROR: ", _context.t0.message);
          addToBeagleInfoLayer("m", _context.t0.message);
          if (!earlyLogSent && monitor) monitor.sendLogs(false);
          if (!hideRemoved) removeDocumentHide();
        case 134:
          console.timeEnd("gl-start");
        case 135:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[8, 128]]);
}))();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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Q0xsYyxNQUFNLENBQUNULElBQUksQ0FBQywrQkFBK0IsQ0FBQztZQUM1Q1csa0JBQWtCLEVBQUU7WUFDcEJ3d0IsV0FBVyxHQUFHLElBQUk7VUFDcEI7VUFBQztVQUFBO1FBQUE7VUFBQSxNQUNRUyxJQUFJLEtBQUssS0FBSztZQUFBO1lBQUE7VUFBQTtVQUN2Qm54QixNQUFNLENBQUNULElBQUksQ0FBQyx1QkFBdUIsQ0FBQztVQUNwQ1csa0JBQWtCLEVBQUU7VUFDcEJ3d0IsV0FBVyxHQUFHLElBQUk7VUFBQztVQUFBO1FBQUE7VUFBQSxNQUViLElBQUl6dkIsS0FBSyxDQUFDLDJCQUEyQixDQUFDO1FBQUE7VUFFOUMzQixPQUFPLENBQUMwWixPQUFPLENBQUMsZ0JBQWdCLENBQUM7VUFBQztVQUFBO1FBQUE7VUFBQTtVQUFBO1VBRWxDaFosTUFBTSxDQUFDSCxJQUFJLENBQUMsbUNBQW1DLEVBQUUsWUFBSXdCLE9BQU8sQ0FBQztVQUM3RHRCLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxZQUFJc0IsT0FBTyxDQUFDO1VBQ3RDLElBQUksQ0FBQ292QixZQUFZLElBQUlELE9BQU8sRUFBRUEsT0FBTyxDQUFDWSxRQUFRLENBQUMsS0FBSyxDQUFDO1VBQ3JELElBQUksQ0FBQ1YsV0FBVyxFQUFFeHdCLGtCQUFrQixFQUFFO1FBQUM7VUFFekNaLE9BQU8sQ0FBQzBaLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFBQztRQUFBO1VBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQSxDQUM3QixJQUFHLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9QcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9zdHJpbmdVdGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZURhdGFDb2xsZWN0aW9uL3N0b3JlLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZURhdGFDb2xsZWN0aW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZURhdGFDb2xsZWN0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlTW9uaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZGF0YUxheWVyQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvZWxlbWVudENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2Z1bmN0aW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvc2Vzc2lvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3VybENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VudkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9wcm9kdWN0SW5mb0NoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9hc3luYy1tdXRleC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL3JlcGxhY2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVBcHBseUFjdGlvbnMvYWN0aW9uLWNvbmRpdGlvbi11dGlsLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlT24vcm9ib3RFbmdpbmUuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVPbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUNsaWVudFNESy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuL3R5cGVvZi5qc1wiKVtcImRlZmF1bHRcIl07XG5mdW5jdGlvbiBfcmVnZW5lcmF0b3JSdW50aW1lKCkge1xuICBcInVzZSBzdHJpY3RcIjsgLyohIHJlZ2VuZXJhdG9yLXJ1bnRpbWUgLS0gQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuIC0tIGxpY2Vuc2UgKE1JVCk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9ibG9iL21haW4vTElDRU5TRSAqL1xuICBtb2R1bGUuZXhwb3J0cyA9IF9yZWdlbmVyYXRvclJ1bnRpbWUgPSBmdW5jdGlvbiBfcmVnZW5lcmF0b3JSdW50aW1lKCkge1xuICAgIHJldHVybiBleHBvcnRzO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7XG4gIHZhciBleHBvcnRzID0ge30sXG4gICAgT3AgPSBPYmplY3QucHJvdG90eXBlLFxuICAgIGhhc093biA9IE9wLmhhc093blByb3BlcnR5LFxuICAgIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5IHx8IGZ1bmN0aW9uIChvYmosIGtleSwgZGVzYykge1xuICAgICAgb2JqW2tleV0gPSBkZXNjLnZhbHVlO1xuICAgIH0sXG4gICAgJFN5bWJvbCA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sXG4gICAgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiLFxuICAgIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIixcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgICB3cml0YWJsZTogITBcbiAgICB9KSwgb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcixcbiAgICAgIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKSxcbiAgICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGdlbmVyYXRvciwgXCJfaW52b2tlXCIsIHtcbiAgICAgIHZhbHVlOiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpXG4gICAgfSksIGdlbmVyYXRvcjtcbiAgfVxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJiBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiYgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSAmJiAoSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSk7XG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChcInRocm93XCIgIT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnLFxuICAgICAgICAgIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgXCJvYmplY3RcIiA9PSBfdHlwZW9mKHZhbHVlKSAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpID8gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pIDogUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodW53cmFwcGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkLCByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgfVxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgXCJfaW52b2tlXCIsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShtZXRob2QsIGFyZykge1xuICAgICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID0gcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICAgIHJldHVybiBmdW5jdGlvbiAobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChcImV4ZWN1dGluZ1wiID09PSBzdGF0ZSkgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIGlmIChcImNvbXBsZXRlZFwiID09PSBzdGF0ZSkge1xuICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSBtZXRob2QpIHRocm93IGFyZztcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29udGV4dC5tZXRob2QgPSBtZXRob2QsIGNvbnRleHQuYXJnID0gYXJnOzspIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJuZXh0XCIgPT09IGNvbnRleHQubWV0aG9kKSBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7ZWxzZSBpZiAoXCJ0aHJvd1wiID09PSBjb250ZXh0Lm1ldGhvZCkge1xuICAgICAgICAgIGlmIChcInN1c3BlbmRlZFN0YXJ0XCIgPT09IHN0YXRlKSB0aHJvdyBzdGF0ZSA9IFwiY29tcGxldGVkXCIsIGNvbnRleHQuYXJnO1xuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuICAgICAgICB9IGVsc2UgXCJyZXR1cm5cIiA9PT0gY29udGV4dC5tZXRob2QgJiYgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICBzdGF0ZSA9IFwiZXhlY3V0aW5nXCI7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID0gY29udGV4dC5kb25lID8gXCJjb21wbGV0ZWRcIiA6IFwic3VzcGVuZGVkWWllbGRcIiwgcmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBcInRocm93XCIgPT09IHJlY29yZC50eXBlICYmIChzdGF0ZSA9IFwiY29tcGxldGVkXCIsIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2ROYW1lID0gY29udGV4dC5tZXRob2QsXG4gICAgICBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2ROYW1lXTtcbiAgICBpZiAodW5kZWZpbmVkID09PSBtZXRob2QpIHJldHVybiBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgXCJ0aHJvd1wiID09PSBtZXRob2ROYW1lICYmIGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdICYmIChjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkLCBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSwgXCJ0aHJvd1wiID09PSBjb250ZXh0Lm1ldGhvZCkgfHwgXCJyZXR1cm5cIiAhPT0gbWV0aG9kTmFtZSAmJiAoY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBtZXRob2RcIikpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG4gICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHJldHVybiBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgcmV0dXJuIGluZm8gPyBpbmZvLmRvbmUgPyAoY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWUsIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2MsIFwicmV0dXJuXCIgIT09IGNvbnRleHQubWV0aG9kICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKSA6IGluZm8gOiAoY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCk7XG4gIH1cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuICAgIDEgaW4gbG9jcyAmJiAoZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdKSwgMiBpbiBsb2NzICYmIChlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXSwgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdKSwgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCIsIGRlbGV0ZSByZWNvcmQuYXJnLCBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbe1xuICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgIH1dLCB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyksIHRoaXMucmVzZXQoITApO1xuICB9XG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBpdGVyYWJsZS5uZXh0KSByZXR1cm4gaXRlcmFibGU7XG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIGZvciAoOyArK2kgPCBpdGVyYWJsZS5sZW5ndGg7KSB7XG4gICAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHJldHVybiBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV0sIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHQudmFsdWUgPSB1bmRlZmluZWQsIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6ICEwXG4gICAgfTtcbiAgfVxuICByZXR1cm4gR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZVByb3BlcnR5KEdwLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbixcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIiksIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZ2VuRnVuICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gISFjdG9yICYmIChjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgPT09IChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkpO1xuICB9LCBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKSA6IChnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpKSwgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApLCBnZW5GdW47XG4gIH0sIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fYXdhaXQ6IGFyZ1xuICAgIH07XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSksIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvciwgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICB2b2lkIDAgPT09IFByb21pc2VJbXBsICYmIChQcm9taXNlSW1wbCA9IFByb21pc2UpO1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCksIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpLCBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KSwgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIHZhciBvYmplY3QgPSBPYmplY3QodmFsKSxcbiAgICAgIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXMucmV2ZXJzZSgpLCBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgZm9yICg7IGtleXMubGVuZ3RoOykge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHJldHVybiBuZXh0LnZhbHVlID0ga2V5LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICB9O1xuICB9LCBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcywgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIGlmICh0aGlzLnByZXYgPSAwLCB0aGlzLm5leHQgPSAwLCB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkLCB0aGlzLmRvbmUgPSAhMSwgdGhpcy5kZWxlZ2F0ZSA9IG51bGwsIHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMuYXJnID0gdW5kZWZpbmVkLCB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KSwgIXNraXBUZW1wUmVzZXQpIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICBcInRcIiA9PT0gbmFtZS5jaGFyQXQoMCkgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSAmJiAodGhpc1tuYW1lXSA9IHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgdGhpcy5kb25lID0gITA7XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHRoaXMudHJ5RW50cmllc1swXS5jb21wbGV0aW9uO1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcm9vdFJlY29yZC50eXBlKSB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gZGlzcGF0Y2hFeGNlcHRpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB0aHJvdyBleGNlcHRpb247XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiLCByZWNvcmQuYXJnID0gZXhjZXB0aW9uLCBjb250ZXh0Lm5leHQgPSBsb2MsIGNhdWdodCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCAhIWNhdWdodDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldLFxuICAgICAgICAgIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgIGlmIChcInJvb3RcIiA9PT0gZW50cnkudHJ5TG9jKSByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpLFxuICAgICAgICAgICAgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzRmluYWxseSkgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFicnVwdDogZnVuY3Rpb24gYWJydXB0KHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiYgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmluYWxseUVudHJ5ICYmIChcImJyZWFrXCIgPT09IHR5cGUgfHwgXCJjb250aW51ZVwiID09PSB0eXBlKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MgJiYgKGZpbmFsbHlFbnRyeSA9IG51bGwpO1xuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSB0eXBlLCByZWNvcmQuYXJnID0gYXJnLCBmaW5hbGx5RW50cnkgPyAodGhpcy5tZXRob2QgPSBcIm5leHRcIiwgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MsIENvbnRpbnVlU2VudGluZWwpIDogdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIFwiYnJlYWtcIiA9PT0gcmVjb3JkLnR5cGUgfHwgXCJjb250aW51ZVwiID09PSByZWNvcmQudHlwZSA/IHRoaXMubmV4dCA9IHJlY29yZC5hcmcgOiBcInJldHVyblwiID09PSByZWNvcmQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmcsIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIiwgdGhpcy5uZXh0ID0gXCJlbmRcIikgOiBcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSAmJiBhZnRlckxvYyAmJiAodGhpcy5uZXh0ID0gYWZ0ZXJMb2MpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiBmaW5pc2goZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSByZXR1cm4gdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyksIHJlc2V0VHJ5RW50cnkoZW50cnkpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbiBfY2F0Y2godHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIGRlbGVnYXRlWWllbGQoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfSwgXCJuZXh0XCIgPT09IHRoaXMubWV0aG9kICYmICh0aGlzLmFyZyA9IHVuZGVmaW5lZCksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9LCBleHBvcnRzO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiAobW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cyksIF90eXBlb2Yob2JqKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIi8vIFRPRE8oQmFiZWwgOCk6IFJlbW92ZSB0aGlzIGZpbGUuXG5cbnZhciBydW50aW1lID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lXCIpKCk7XG5tb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG5cbi8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9ibG9iL21haW4vcGFja2FnZXMvcnVudGltZS9ydW50aW1lLmpzI0w3MzY9XG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7XG4gIGlmIChfdHlwZW9mKGlucHV0KSAhPT0gXCJvYmplY3RcIiB8fCBpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIGlucHV0O1xuICB2YXIgcHJpbSA9IGlucHV0W1N5bWJvbC50b1ByaW1pdGl2ZV07XG4gIGlmIChwcmltICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcmVzID0gcHJpbS5jYWxsKGlucHV0LCBoaW50IHx8IFwiZGVmYXVsdFwiKTtcbiAgICBpZiAoX3R5cGVvZihyZXMpICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTtcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmltcG9ydCB0b1ByaW1pdGl2ZSBmcm9tIFwiLi90b1ByaW1pdGl2ZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gX3R5cGVvZihrZXkpID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsImV4cG9ydCBjb25zdCByZXBsYWNlQWxsID0gKHN0ciwgZmluZCwgcmVwbGFjZSA9IFwiXCIpID0+IHtcbiAgaWYgKCFzdHIpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2YoZmluZCk7XG4gIGlmIChpbmRleCA8IDApIHJldHVybiBzdHI7XG5cbiAgd2hpbGUgKHN0ci5pbmRleE9mKGZpbmQpID49IDApIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICAgIHN0ciA9IChpbmRleCA+IDAgPyBzdHIuc3Vic3RyaW5nKDAsIGluZGV4KSA6IFwiXCIpICsgcmVwbGFjZSArIHN0ci5zdWJzdHJpbmcoaW5kZXggKyBmaW5kLmxlbmd0aCk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuZXhwb3J0IGNvbnN0IHR1cmtpc2hUb0xvd2VyID0gKHN0cikgPT4ge1xuICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSByZXR1cm4gc3RyO1xuICBsZXQgc3RyaW5nID0gc3RyO1xuICBjb25zdCBsZXR0ZXJzID0ge1wixLBcIjogXCJpXCIsIFwiSVwiOiBcIsSxXCIsIFwixZ5cIjogXCLFn1wiLCBcIsSeXCI6IFwixJ9cIiwgXCLDnFwiOiBcIsO8XCIsIFwiw5ZcIjogXCLDtlwiLCBcIsOHXCI6IFwiw6dcIn07XG4gIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oKFvEsEnFnsSew5zDh8OWXSkpL2csIGZ1bmN0aW9uKGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXJzW2xldHRlcl07XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi9zdHJpbmdVdGlsc1wiO1xuY29uc3QgaXNTdGFnaW5nID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwic3RhZ2luZy52aXZlbnNlXCIpIDogdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjAuMC4zOS4zMVwiO1xuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FID0gXCJfZ2FcIjtcbi8vIFRPRE8gcmV2ZXJ0IHRoZSBmb2xsb3dpbmcgc3RhZ2luZyBlbnYgY2hlY2sgYWZ0ZXIgbW92aW5nIHRvIG5ldyBicmFuY2ggc3RydWN0dXJlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3RyZWF0bWVudHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHNfc3RhZ2luZy5qc29uXCIgOiBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvd2VpZ2h0cy5qc29uXCI7XG5leHBvcnQgY29uc3QgU1RZTEVTSEVFVF9MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXNfc3RhZ2luZy5jc3NcIiA6IGBodHRwczovL25kdml2ZW5zZS5nbG92LmFpL25kLXN0eWxlcy5jc3M/aWQ9JHtyZXBsYWNlQWxsKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTMpLnJlcGxhY2UoXCJUXCIsIFwiXCIpLCBcIi1cIiwgXCJcIil9YDtcbmV4cG9ydCBjb25zdCBFX1JVTEVTX0xPQ0FUSU9OID0gaXNTdGFnaW5nID8gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL2VsaWdpYmlsaXR5X3J1bGVzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBQUk9EVUNUX0lORk9fTE9DQVRJT04gPSBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvc29jaWFsLXByb29mLnR4dFwiO1xuZXhwb3J0IGNvbnN0IExPR19BUElfVVJMID0gXCJodHRwczovL2V1cm9wZS13ZXN0My1uZXh0ZGF5LTM0ZWIzLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGkvbG9nXCI7XG5leHBvcnQgY29uc3QgTE9PS1VQX0FQSV9VUkwgPSBcImh0dHBzOi8vY2F0YWxvZy1hcGkuYWRvcmFhaS5jb21cIjtcbmV4cG9ydCBjb25zdCBNT0JJTEVfTUVESUFfUVVFUlkgPSBcIihtYXgtd2lkdGg6IDQ0MHB4KVwiO1xuLy8gQ29udHJvbCBncm91cCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgU1BMSVRfUkFUSU8gPSA1MDtcbi8vIFNraXBwZWQgdHJlYXRtZW50IHBlcmNlbnRhZ2VcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfUkFUSU8gPSA1MDtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRTX0RVUkFUSU9OID0gMTtcbmV4cG9ydCBjb25zdCBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTiA9IDE7XG5leHBvcnQgY29uc3QgTElTVF9NT0RFX0JFQUdMRV9LRVlTID0gW1wicGFnZXR5cGVcIiwgXCJjYXRlZ29yeVwiLCBcImFsbHRpbWVQTFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUExQQ2F0ZWdvcnlNb2RlXCIsXG4gIFwiYWxsdGltZVBEUENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25QRFBDYXRlZ29yeU1vZGVcIiwgXCJhbGx0aW1lQ2FydENhdGVnb3J5TW9kZVwiLCBcInNlc3Npb25DYXJ0Q2F0ZWdvcnlNb2RlXCJdO1xuZXhwb3J0IGNvbnN0IElETEVfVElNRU9VVCA9IDE1MDAwO1xuXG5leHBvcnQgY29uc3QgU0VTU0lPTl9TVE9SQUdFX0tFWVMgPSB7XG4gIFNFU1NJT05fVElNRVNUQU1QOiBcIkJHX1Nlc3Npb25UaW1lc3RhbXBcIixcbiAgU0VTU0lPTl9ISVNUT1JZOiBcIkJHX1Nlc3Npb25IaXN0b3J5XCIsXG4gIFRSRUFUTUVOVFM6IFwiQkdfVHJlYXRtZW50c1wiLFxuICBQT1BVUF9ESVNQTEFZX0ZMQUc6IFwiQkdfUG9wdXBEaXNwbGF5RmxhZ1wiLFxuICBTS1VfSU5GT19CQVNLRVQ6IFwiQkdfUHJvZHVjdEluZm9CYXNrZXRcIixcbiAgVElNRU9VVF9DT1VOVDogXCJCR19UaW1lb3V0Q291bnRcIixcbiAgU0VTU0lPTl9SRUZFUlJFUjogXCJCR19TZXNzaW9uUmVmZXJyZXJcIixcbiAgV0VJR0hUUzogXCJCR19XZWlnaHRzXCIsXG4gIEVMSUdJQklMSVRZX1JVTEVTOiBcIkJHX0VfUnVsZXNcIixcbn07XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9LRVlTID0ge1xuICBERUJVR19NT0RFOiBcIkJHX0RlYnVnXCIsXG4gIE9VVF9PRl9TQ09QRTogXCJCR19PdXRPZlNjb3BlXCIsXG4gIElTX0xBQkVMX1NFTlQ6IFwiQkdfTGFiZWxTZW50XCIsXG4gIFVTRVJfSUQ6IFwiQkdfVXNlcklkXzAwXCIsXG4gIERBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkU6IFwiQkdfQ29sbGVjdGlvbkRhdGFTaXplXCIsXG4gIElTX0FETUlOOiBcIkdMVl9Jc0FkbWluXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX1NUT1JBR0VfUFJFRklYID0gXCJCR19TZWdfXCI7XG4iLCJpbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4gPSBcIkJlYWdsZSBDbGllbnQgU0RLXCIsIHRlc3RpbmcgPSBmYWxzZSkge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICB0aGlzLkRFQlVHID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ERUJVRyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuREVCVUdfTU9ERSk7XG4gICAgfVxuICB9XG5cbiAgaW5mbyguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuaW5mbyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGZhaWxlZCguLi5hcmdzKSB7XG4gICAgY29uc3Qge0RFQlVHLCBvcmlnaW59ID0gdGhpcztcbiAgICBpZiAoIURFQlVHKSByZXR1cm47XG4gICAgbGV0IG1lc3NhZ2VDb25maWcgPSBcIiVjJXMgICBcIjtcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJndW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnQ7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVkICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlcyAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlbyAgIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VDb25maWcsIFwiY29sb3I6IHJlZFwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHN1Y2Nlc3MoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiBncmVlblwiLCBgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLndhcm4oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzKSB7XG4gICAgY29uc3Qge29yaWdpbn0gPSB0aGlzO1xuICAgIGNvbnNvbGUuZXJyb3IoYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gbnVsbCA9PSBhcnIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IF9pKSB7XG4gICAgdmFyIF9zLFxuICAgICAgX2UsXG4gICAgICBfeCxcbiAgICAgIF9yLFxuICAgICAgX2FyciA9IFtdLFxuICAgICAgX24gPSAhMCxcbiAgICAgIF9kID0gITE7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfeCA9IChfaSA9IF9pLmNhbGwoYXJyKSkubmV4dCwgMCA9PT0gaSkge1xuICAgICAgICBpZiAoT2JqZWN0KF9pKSAhPT0gX2kpIHJldHVybjtcbiAgICAgICAgX24gPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShfbiA9IChfcyA9IF94LmNhbGwoX2kpKS5kb25lKSAmJiAoX2Fyci5wdXNoKF9zLnZhbHVlKSwgX2Fyci5sZW5ndGggIT09IGkpOyBfbiA9ICEwKSB7XG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gITAsIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIG51bGwgIT0gX2lbXCJyZXR1cm5cIl0gJiYgKF9yID0gX2lbXCJyZXR1cm5cIl0oKSwgT2JqZWN0KF9yKSAhPT0gX3IpKSByZXR1cm47XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2FycjtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAga2V5ID0gdG9Qcm9wZXJ0eUtleShrZXkpO1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqO1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgU1RZTEVTSEVFVF9MT0NBVElPTixcbiAgVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04sXG4gIFRSRUFUTUVOVFNfTE9DQVRJT04sXG4gIEVfUlVMRVNfTE9DQVRJT04sXG4gIFBST0RVQ1RfSU5GT19MT0NBVElPTixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlVXRpbHNcIik7XG5jb25zdCBtb250aHMgPSB7XG4gIFwib2Nha1wiOiAwLFxuICBcIsWfdWJhdFwiOiAxLFxuICBcIm1hcnRcIjogMixcbiAgXCJuaXNhblwiOiAzLFxuICBcIm1hecSxc1wiOiA0LFxuICBcImhhemlyYW5cIjogNSxcbiAgXCJ0ZW1tdXpcIjogNixcbiAgXCJhxJ91c3Rvc1wiOiA3LFxuICBcImV5bMO8bFwiOiA4LFxuICBcImVraW1cIjogOSxcbiAgXCJrYXPEsW1cIjogMTAsXG4gIFwiYXJhbMSxa1wiOiAxMSxcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEb2N1bWVudEhpZGUgPSAoKSA9PiB7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3Qgc3dpdGNoVG9FYXNlT3V0ID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgZWwudGV4dENvbnRlbnQgPSBgLmdsb3YtZWFzZSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tb3otYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtby1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIC1tcy1hbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICAgIGFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgc21vb3RoIHtcbiAgICAwJSB7IG9wYWNpdHk6IDA7fVxuICAgIDI1JSB7IG9wYWNpdHk6IDAuMjU7fVxuICAgIDUwJSB7IG9wYWNpdHk6IDAuNTt9XG4gICAgNzUlIHsgb3BhY2l0eTogMC43NTt9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7fVxuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzbW9vdGgge1xuICAgIDAlIHsgb3BhY2l0eTogMDt9XG4gICAgMjUlIHsgb3BhY2l0eTogMC4yNTt9XG4gICAgNTAlIHsgb3BhY2l0eTogMC41O31cbiAgICA3NSUgeyBvcGFjaXR5OiAwLjc1O31cbiAgICAxMDAlIHsgb3BhY2l0eTogMTt9XG4gIH1gO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5wcmVwZW5kKGVsKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImdsb3YtZWFzZVwiKTtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdsb3YtaGlkZVwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3QgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoUGx1cyhUUkVBVE1FTlRTX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXRyZWF0bWVudHMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IGpzb25UcmVhdG1lbnQgPSBhd2FpdCB0cmVhdG1lbnRzLmpzb24oKTtcbiAgICByZXR1cm4ganNvblRyZWF0bWVudDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCB0cmVhdG1lbnRzXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJlYXRtZW50V2VpZ2h0cyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgdHJlYXRtZW50IHdlaWdodHNcIik7XG4gICAgY29uc3QgdHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IGZldGNoUGx1cyhUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTik7XG4gICAgaWYgKCF0cmVhdG1lbnRXZWlnaHRzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50V2VpZ2h0cyA9IGF3YWl0IHRyZWF0bWVudFdlaWdodHMuanNvbigpO1xuICAgIHJldHVybiBqc29uVHJlYXRtZW50V2VpZ2h0cztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCB0cmVhdG1lbnQgd2VpZ2h0c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaEVsaWdpYmlsaXR5UnVsZXMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIGVsaWdpYmlsaXR5IHJ1bGVzXCIpO1xuICAgIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBmZXRjaFBsdXMoRV9SVUxFU19MT0NBVElPTik7XG4gICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uRWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGVsaWdpYmlsaXR5UnVsZXMuanNvbigpO1xuICAgIHJldHVybiBqc29uRWxpZ2liaWxpdHlSdWxlcztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBmZXRjaCBlbGlnaWJpbGl0eSBydWxlc1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFByb2R1Y3RJbmZvID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBwcm9kdWN0IGluZm9cIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBmZXRjaFBsdXMoUFJPRFVDVF9JTkZPX0xPQ0FUSU9OKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb0NTViA9IGF3YWl0IHByb2R1Y3RJbmZvLnRleHQoKTtcbiAgICByZXR1cm4gY3N2VG9BcnJheShwcm9kdWN0SW5mb0NTVik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggcHJvZHVjdCBpbmZvXCIsIGVyci5tZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgdGltZW91dCA9ICh0aW1lKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lKTtcbiAgcmV0dXJuIGNvbnRyb2xsZXI7XG59O1xuXG5jb25zdCBmZXRjaFBsdXMgPSAodXJsLCBvcHRpb25zID0ge30sIHJldHJpZXMgPSA1KSA9PlxuICBmZXRjaCh1cmwsIHsuLi5vcHRpb25zLCBzaWduYWw6IHRpbWVvdXQoNTAwMCkuc2lnbmFsfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLnN0YXR1cyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAocmV0cmllcyA+IDApIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggdGltZWQgb3V0IFJldHJ5aW5nLi4uOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUGx1cyh1cmwsIG9wdGlvbnMsIHJldHJpZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmV0Y2ggZmFpbGVkOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSk7XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q29va2llSWRlbnRpZmllciA9IChjb29raWVTdHJpbmcsIGNvb2tpZU5hbWUpID0+IHtcbiAgaWYgKCFjb29raWVTdHJpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IGNvb2tpZVN0cmluZ1xuICAgICAgLnNwbGl0KFwiO1wiKVxuICAgICAgLm1hcCgodikgPT4gdi5zcGxpdChcIj1cIikpXG4gICAgICAucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgaWYgKHZbMF0gJiYgdlsxXSkge1xuICAgICAgICAgIGFjY1tkZWNvZGVVUklDb21wb25lbnQodlswXS50cmltKCkpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2WzFdLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICBsZXQgaWRlbnRpZmllciA9IHBhcnNlZFtjb29raWVOYW1lXTtcbiAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNvb2tpZU5hbWUgPT09IFwiX2dhXCIpIHtcbiAgICAvLyBleHRyYWN0IHVuaXF1ZSBpZGVudGlmaWVyIGZyb20gR0EgY29va2llXG4gICAgY29uc3QgaWRlbnRpZmllckluZGV4ID0gMjtcbiAgICBpZGVudGlmaWVyID0gaWRlbnRpZmllci5zcGxpdChcIi5cIilbaWRlbnRpZmllckluZGV4XTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcjtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXRlcm1pbmVQY3QgPSBhc3luYyAoaWRlbnRpZmllcikgPT4ge1xuICB0cnkge1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGhhc2ggPSBnZXRVbnNlY3VyZUhhc2goaWRlbnRpZmllcik7XG4gICAgaWYgKGhhc2ggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwY3QgPSBoYXNoICUgMTAwO1xuICAgIGlmIChwY3QgPj0gMCAmJiBwY3QgPCAxMDApIHtcbiAgICAgIHJldHVybiBwY3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXhpdFNjcm9sbExpc3RlbmVyID0gKGNhbGxCYWNrKSA9PiB7XG4gIGNvbnN0IGxvb3AgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChsYXN0U2Nyb2xsVG9wIC0gNDAwID4gc2Nyb2xsVG9wKSB7XG4gICAgICBjbGVhckludGVydmFsKGV4aXRTY3JvbGxJbnRlcnZhbCk7XG4gICAgICBjYWxsQmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbGFzdFNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZXhpdFNjcm9sbEludGVydmFsID0gc2V0SW50ZXJ2YWwobG9vcCwgNTAwKTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhcHBseSB0cmVhdG1lbnRzIHRvIHRoZSBwYWdlIG9uIHNwZWNpZmljIG1lZGlhIHR5cGUuXG4gKiBAcGFyYW0ge01lZGlhUXVlcnlMaXN0fSBtZWRpYVF1ZXJ5Q29uZGl0aW9uIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTAwcHgpXCIpXG4gKiBAcGFyYW0ge0RPTU5vZGVMaXN0IH0gZWxlbWVudHMgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRpdi5wcm9kdWN0X2luZm9cIilcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUNoYW5nZXNNYXAgeyBcIm1hcmdpbi10b3BcIiA6IFwiMTByZW1cIn1cbiAqIEByZXR1cm5zXG4gKi9cblxuZXhwb3J0IGNvbnN0IHN0eWxlQXBwbGljYXRvciA9IChlbGVtZW50cywgc3R5bGVDaGFuZ2VzTWFwKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZSBjaGFuZ2VzXCIsIHN0eWxlQ2hhbmdlc01hcCwgXCJ0byBlbGVtZW50c1wiLCBlbGVtZW50cyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVDaGFuZ2VzTWFwKSkge1xuICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5qZWN0U3R5bGVTaGVldCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3R5bGVTaGVldCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIHN0eWxlU2hlZXQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIHN0eWxlU2hlZXQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgc3R5bGVTaGVldC5ocmVmID0gU1RZTEVTSEVFVF9MT0NBVElPTjtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVBY3Rpb25zID0gYXN5bmMgKGlkZW50aWZpZXIsIGFjdGlvbnNUb1ByZXBhcmUsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYWN0aW9uc1RvUHJlcGFyZSkpO1xuICBsZXQgdmFyaWFudCA9IG51bGw7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICBjb25zdCB7YnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zLCB2YXJpYW50c30gPSBhY3Rpb247XG4gICAgaWYgKCFidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMgJiYgIXZhcmlhbnRzKSBjb250aW51ZTtcbiAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09PSBidXNpbmVzc1J1bGVJZCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGJ1c2luZXNzVHJhbnNmb3JtYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwiaWRcIikge1xuICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZhcmlhbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpbmRleCwgdmFyaWFudEtleV0gb2YgT2JqZWN0LmtleXModmFyaWFudHMpLmVudHJpZXMoKSkge1xuICAgICAgICBjb25zdCByYW5kb21QY3QgPSBhd2FpdCBkZXRlcm1pbmVQY3QoaWRlbnRpZmllciArIHZhcmlhbnRLZXkpO1xuICAgICAgICBpZiAoZGVidWdNb2RlICYmICFhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0KSB7XG4gICAgICAgICAgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCA9IE1hdGguZmxvb3IoMTAwIC8gT2JqZWN0LmtleXModmFyaWFudHMpLmxlbmd0aCkgKiAoaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tUGN0IDwgYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIHZhcmlhbnQgPSB2YXJpYW50S2V5O1xuICAgICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiBvZiB2YXJpYW50c1t2YXJpYW50S2V5XS5idXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1c2luZXNzVHJhbnNmb3JtYXRpb24uaWQgPT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbltrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBcIndlaWdodFwiICYmIGtleSAhPT0gXCJidXNpbmVzc1J1bGVUcmFuc2Zvcm1hdGlvbnNcIikge1xuICAgICAgICAgICAgICAgIGFjdGlvbltrZXldID0gdmFyaWFudHNbdmFyaWFudEtleV1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2FjdGlvbnMsIHZhcmlhbnRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzID0gKCkgPT4ge1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHLCBTRVNTSU9OX1RJTUVTVEFNUCwgU0VTU0lPTl9ISVNUT1JZfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHBvcHVwRGlzcGxheUZsYWcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRyk7XG4gIGNvbnN0IHNlc3Npb25UaW1lc3RhbXAgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fVElNRVNUQU1QKTtcbiAgY29uc3Qgc2Vzc2lvbkhpc3RvcnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fSElTVE9SWSk7XG5cbiAgaWYgKHBvcHVwRGlzcGxheUZsYWcgPT09IG51bGwpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMCk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uVGltZXN0YW1wKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCwgRGF0ZS5ub3coKSk7XG4gIH1cbiAgaWYgKCFzZXNzaW9uSGlzdG9yeSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXSk7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX0hJU1RPUlksIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHNlc3Npb25IaXN0b3J5XSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb25kaXRpb25DaGVja2VyID0gKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBpZiAoY29uZGl0aW9uID09PSBcIm5vdEV4aXN0XCIpIHtcbiAgICBpZiAoIXJ1blRpbWVWYWx1ZSkge1xuICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fFxuICAgIHJ1blRpbWVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgY29uZGl0aW9uID09PSBudWxsIHx8XG4gICAgY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogcnVuVGltZVZhbHVlIG9yIGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoIChjb25kaXRpb24pIHtcbiAgICBjYXNlIFwiZXhpc3RcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiaW5jbHVkZXNcIjpcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGNvbnRhaW5zIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEluY2x1ZGVzXCI6XG4gICAgY2FzZSBcIm5vdENvbnRhaW5zXCI6XG4gICAgICBpZiAoIXJ1blRpbWVWYWx1ZS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgY29udGFpbiB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibm90RXF1YWxcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGVxdWFsIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGVxdWFscyB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlclRoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPiB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc1RoYW5cIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3MgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiZ3JlYXRlckVxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwibGVzc0VxdWFsc1wiOlxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA8PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgaXMgbm90IGxlc3Mgb3IgZXF1YWwgdGhhbiB2YWx1ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIFwiYmV0d2VlblwiOiB7XG4gICAgICBsZXQgW21pbiwgbWF4XSA9IHZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIG1pbiA9IHBhcnNlSW50KG1pbik7XG4gICAgICBtYXggPSBwYXJzZUludChtYXgpO1xuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA+PSBtaW4gJiYgcnVuVGltZVZhbHVlIDw9IG1heCkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBiZXR3ZWVuIG1pbiBhbmQgbWF4XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYXNlIFwicmVnZXhcIjoge1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbHVlLCBcImlcIik7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdChydW5UaW1lVmFsdWUpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IGNvbmRpdGlvbiBpcyBub3QgZGVmaW5lZCBcIiwgY29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldERlYnVnTW9kZSA9IChvb3NSZWFzb24pID0+IHtcbiAgY29uc3Qge0RFQlVHX01PREUsIE9VVF9PRl9TQ09QRX0gPSBMT0NBTF9TVE9SQUdFX0tFWVM7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9XCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKE9VVF9PRl9TQ09QRSwgb29zUmVhc29uKTtcbiAgfVxuXG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTFcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oREVCVUdfTU9ERSwgMSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvblwiKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0yXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDI7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MFwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShERUJVR19NT0RFKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9mZlwiKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBjdXJyZW50ID0gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKERFQlVHX01PREUpKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgKGN1cnJlbnQgPyBcIm9uXCIgOiBcIm9mZlwiKSk7XG4gIHJldHVybiAoY3VycmVudCB8fCAwKTtcbn07XG5cbi8vIGdldCBHQSBjbGllbnQgaWQgdXNpbmcgZ2EuZ2V0QWxsKClcbmV4cG9ydCBjb25zdCBnZXRHYUNsaWVudElkID0gKCkgPT4ge1xuICBjb25zdCBnYSA9IHdpbmRvdy5nYTtcbiAgLy8gaWYgZ2EgYW5kIGdhLmdldEFsbCgpIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gbnVsbFxuICBpZiAoZ2EgJiYgZ2EuZ2V0QWxsKSB7XG4gICAgY29uc3QgdHJhY2tlcnMgPSBnYS5nZXRBbGwoKTtcbiAgICBpZiAodHJhY2tlcnMgJiYgdHJhY2tlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJhY2tlcnNbMF0uZ2V0KFwiY2xpZW50SWRcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gZ2V0IGRldGVybWluaXN0aWMgbnVtZXJpYyBoYXNoIGZyb20gc3RyaW5nIHRoYXQgY29uYXRpbnMgb25seSBudW1iZXJzXG5leHBvcnQgY29uc3QgZ2V0VW5zZWN1cmVIYXNoID0gKHN0cikgPT4ge1xuICBsZXQgaGFzaCA9IDA7XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gIH1cbiAgLy8gcmV0dXJuIGFic29sdXRlIHZhbHVlXG4gIHJldHVybiBNYXRoLmFicyhoYXNoKTtcbn07XG5cbi8vIGdlbmVyYXRlIGEgMzItYml0IHJhbmRvbSBpbnRlZ2VyXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tSW50ID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApO1xufTtcblxuLy8gZ2V0IGN1cnJlbnQgdW5peCBlcG9jaCB0aW1lIGluIHNlY29uZHNcbmV4cG9ydCBjb25zdCBnZXRVbml4VGltZSA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0SWRlbnRpZmllciA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCk7XG4gICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiZ2V0SWRlbnRpZmllcjogZ290IGlkZW50aWZpZXIgZnJvbSBsb2NhbCBzdG9yYWdlXCIsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkID0gZ2V0R2FDbGllbnRJZCgpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2EgaW4gZmlyc3QgYXR0ZW1wdFwiLCBpZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgICAgICBpZiAoaWQgIT09IG51bGwgJiYgaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gZ2FcIiwgaWQpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChleHRyYWN0SWRlbnRpZmllckludGVydmFsKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuVVNFUl9JRCwgaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAyNSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgaWYgKGlkID09PSBudWxsIHx8IGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgcmVhZCBHQSBjbGllbnQgaWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGluIGdldElkZW50aWZpZXJcIiwgZSk7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBtcykpO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGVsaXZlcnlEYXRlID0gKGRhdGUpID0+IHtcbiAgaWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZGF0ZTtcblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgc3RhcnRNb250aEluZGV4OiB1bmRlZmluZWQsXG4gICAgZW5kTW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIHN0YXJ0RGF5OiB1bmRlZmluZWQsXG4gICAgZW5kRGF5OiB1bmRlZmluZWQsXG4gIH07XG5cbiAgbGV0IG1hdGNoID0gZGF0ZS5tYXRjaChcIihbXFxcXGRdKyktKFtcXFxcZF0rKVxcXFxzPyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPT09IDQpIHtcbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICByZXN1bHQuc3RhcnRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzNdLnRvTG93ZXJDYXNlKCldO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gcmVzdWx0LnN0YXJ0TW9udGhJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKS0oW1xcXFxkXSspXFxcXHMrKFtcXFxcd8Sxw7zEn8Wfw7bDp8Sww5bDh8Sew5zFnl0rKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCAhPT0gNSkgcmV0dXJuIGRhdGU7XG5cbiAgICByZXN1bHQuc3RhcnREYXkgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFsyXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kRGF5ID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHJlc3VsdC5lbmRNb250aEluZGV4ID0gbW9udGhzW21hdGNoWzRdLnRvTG93ZXJDYXNlKCldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBpZiAoIXJlc3VsdC5zdGFydE1vbnRoSW5kZXggfHwgIXJlc3VsdC5lbmRNb250aEluZGV4KSByZXR1cm4gZGF0ZTtcblxuICAgIGNvbnN0IHN0YXJ0WWVhciA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcbiAgICBjb25zdCBlbmRZZWFyID0gcmVzdWx0LmVuZE1vbnRoSW5kZXggPj0gdG9kYXkuZ2V0TW9udGgoKSA/IHRvZGF5LmdldEZ1bGxZZWFyKCkgOiB0b2RheS5nZXRGdWxsWWVhcigpICsgMTtcblxuICAgIGNvbnN0IGVzdGltYXRlZFN0YXJ0ID0gbmV3IERhdGUoc3RhcnRZZWFyLCByZXN1bHQuc3RhcnRNb250aEluZGV4LCByZXN1bHQuc3RhcnREYXkpO1xuICAgIGNvbnN0IGVzdGltYXRlZEVuZCA9IG5ldyBEYXRlKGVuZFllYXIsIHJlc3VsdC5lbmRNb250aEluZGV4LCByZXN1bHQuZW5kRGF5KTtcblxuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkU3RhcnQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyRGF5cyA9IE1hdGguY2VpbChNYXRoLmFicyhlc3RpbWF0ZWRFbmQgLSB0b2RheSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuXG4gICAgY29uc3Qgc3RhcnREaWZmT3ZlcldlZWtzID0gc3RhcnREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChzdGFydERpZmZPdmVyRGF5cyAvIDcpO1xuICAgIGNvbnN0IGVuZERpZmZPdmVyV2Vla3MgPSBlbmREaWZmT3ZlckRheXMgPCA3ID8gMCA6IE1hdGguY2VpbChlbmREaWZmT3ZlckRheXMgLyA3KTtcblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IDAgJiYgZW5kRGlmZk92ZXJXZWVrcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSAtICR7ZW5kRGlmZk92ZXJEYXlzfSBHw7xuYDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPj0gMSkge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJEYXlzfSBHw7xuIC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gZW5kRGlmZk92ZXJXZWVrcykge1xuICAgICAgcmV0dXJuIGAke3N0YXJ0RGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IC0gJHtlbmREaWZmT3ZlcldlZWtzfSBIYWZ0YWA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaWRsZVRpbWVyID0gYXN5bmMgKHRpbWVPdXQsIGNhbGxCYWNrKSA9PiB7XG4gIGxldCBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQoY2FsbEJhY2ssIHRpbWVPdXQpO1xuXG4gIHdpbmRvdy50b3AuZG9jdW1lbnQub250b3VjaHN0YXJ0ID0gcmVzZXRUaW1lcjtcblxuICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xuICAgIGNsZWFyVGltZW91dChpZGxlVGltZW91dCk7XG4gICAgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJUeXBlID0gKCkgPT4ge1xuICBjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2Nocm9tZXxjaHJvbWl1bXxjcmlvcy9pKSkge1xuICAgIHJldHVybiBcImNocm9tZVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvZmlyZWZveHxmeGlvcy9pKSkge1xuICAgIHJldHVybiBcImZpcmVmb3hcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL3NhZmFyaS9pKSkge1xuICAgIHJldHVybiBcInNhZmFyaVwiO1xuICB9XG5cbiAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvb3ByXFwvL2kpKSB7XG4gICAgcmV0dXJuIFwib3BlcmFcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2VkZy9pKSkge1xuICAgIHJldHVybiBcImVkZ2VcIjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3duTXV0YXRpb24gPSAobXV0YXRpb25MaXN0KSA9PiB7XG4gIGNvbnN0IG5vZGVzID0gWy4uLkFycmF5LmZyb20obXV0YXRpb25MaXN0WzBdLmFkZGVkTm9kZXMpLCAuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5yZW1vdmVkTm9kZXMpXTtcbiAgcmV0dXJuIG5vZGVzLnNvbWUoKG4pID0+IHtcbiAgICByZXR1cm4gbi50YWdOYW1lICYmIEFycmF5LmZyb20obi5jbGFzc0xpc3QpLnNvbWUoKGMpID0+IGMuaW5jbHVkZXMoXCJibi1cIikpO1xuICB9KTtcbn07XG5cbi8vIHJlZjogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTI5MzE2My8yMzQzXG4vLyBUaGlzIHdpbGwgcGFyc2UgYSBkZWxpbWl0ZWQgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Zcbi8vIGFycmF5cy4gVGhlIGRlZmF1bHQgZGVsaW1pdGVyIGlzIHRoZSBjb21tYSwgYnV0IHRoaXNcbi8vIGNhbiBiZSBvdmVycmlkZW4gaW4gdGhlIHNlY29uZCBhcmd1bWVudC5cbmZ1bmN0aW9uIGNzdlRvQXJyYXkoIHN0ckRhdGEsIHN0ckRlbGltaXRlciApIHtcbiAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBkZWxpbWl0ZXIgaXMgZGVmaW5lZC4gSWYgbm90LFxuICAvLyB0aGVuIGRlZmF1bHQgdG8gY29tbWEuXG4gIHN0ckRlbGltaXRlciA9IChzdHJEZWxpbWl0ZXIgfHwgXCIsXCIpO1xuXG4gIC8vIENyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBwYXJzZSB0aGUgQ1NWIHZhbHVlcy5cbiAgY29uc3Qgb2JqUGF0dGVybiA9IG5ldyBSZWdFeHAoXG4gICAgICAoXG4gICAgICAvLyBEZWxpbWl0ZXJzLlxuICAgICAgICBcIihcXFxcXCIgKyBzdHJEZWxpbWl0ZXIgKyBcInxcXFxccj9cXFxcbnxcXFxccnxeKVwiICtcblxuICAgICAgICAgICAgICAvLyBRdW90ZWQgZmllbGRzLlxuICAgICAgICAgICAgICBcIig/OlxcXCIoW15cXFwiXSooPzpcXFwiXFxcIlteXFxcIl0qKSopXFxcInxcIiArXG5cbiAgICAgICAgICAgICAgLy8gU3RhbmRhcmQgZmllbGRzLlxuICAgICAgICAgICAgICBcIihbXlxcXCJcXFxcXCIgKyBzdHJEZWxpbWl0ZXIgKyBcIlxcXFxyXFxcXG5dKikpXCJcbiAgICAgICksXG4gICAgICBcImdpXCIsXG4gICk7XG5cblxuICAvLyBDcmVhdGUgYW4gYXJyYXkgdG8gaG9sZCBvdXIgZGF0YS4gR2l2ZSB0aGUgYXJyYXlcbiAgLy8gYSBkZWZhdWx0IGVtcHR5IGZpcnN0IHJvdy5cbiAgY29uc3QgYXJyRGF0YSA9IFtbXV07XG5cbiAgLy8gQ3JlYXRlIGFuIGFycmF5IHRvIGhvbGQgb3VyIGluZGl2aWR1YWwgcGF0dGVyblxuICAvLyBtYXRjaGluZyBncm91cHMuXG4gIGxldCBhcnJNYXRjaGVzID0gbnVsbDtcblxuXG4gIC8vIEtlZXAgbG9vcGluZyBvdmVyIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gbWF0Y2hlc1xuICAvLyB1bnRpbCB3ZSBjYW4gbm8gbG9uZ2VyIGZpbmQgYSBtYXRjaC5cbiAgd2hpbGUgKGFyck1hdGNoZXMgPSBvYmpQYXR0ZXJuLmV4ZWMoIHN0ckRhdGEgKSkge1xuICAgIC8vIEdldCB0aGUgZGVsaW1pdGVyIHRoYXQgd2FzIGZvdW5kLlxuICAgIGNvbnN0IHN0ck1hdGNoZWREZWxpbWl0ZXIgPSBhcnJNYXRjaGVzWzFdO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBnaXZlbiBkZWxpbWl0ZXIgaGFzIGEgbGVuZ3RoXG4gICAgLy8gKGlzIG5vdCB0aGUgc3RhcnQgb2Ygc3RyaW5nKSBhbmQgaWYgaXQgbWF0Y2hlc1xuICAgIC8vIGZpZWxkIGRlbGltaXRlci4gSWYgaWQgZG9lcyBub3QsIHRoZW4gd2Uga25vd1xuICAgIC8vIHRoYXQgdGhpcyBkZWxpbWl0ZXIgaXMgYSByb3cgZGVsaW1pdGVyLlxuICAgIGlmIChcbiAgICAgIHN0ck1hdGNoZWREZWxpbWl0ZXIubGVuZ3RoICYmXG4gICAgICAgICAgICAgIHN0ck1hdGNoZWREZWxpbWl0ZXIgIT09IHN0ckRlbGltaXRlclxuICAgICkge1xuICAgICAgLy8gU2luY2Ugd2UgaGF2ZSByZWFjaGVkIGEgbmV3IHJvdyBvZiBkYXRhLFxuICAgICAgLy8gYWRkIGFuIGVtcHR5IHJvdyB0byBvdXIgZGF0YSBhcnJheS5cbiAgICAgIGFyckRhdGEucHVzaCggW10gKTtcbiAgICB9XG5cbiAgICBsZXQgc3RyTWF0Y2hlZFZhbHVlO1xuXG4gICAgLy8gTm93IHRoYXQgd2UgaGF2ZSBvdXIgZGVsaW1pdGVyIG91dCBvZiB0aGUgd2F5LFxuICAgIC8vIGxldCdzIGNoZWNrIHRvIHNlZSB3aGljaCBraW5kIG9mIHZhbHVlIHdlXG4gICAgLy8gY2FwdHVyZWQgKHF1b3RlZCBvciB1bnF1b3RlZCkuXG4gICAgaWYgKGFyck1hdGNoZXNbMl0pIHtcbiAgICAgIC8vIFdlIGZvdW5kIGEgcXVvdGVkIHZhbHVlLiBXaGVuIHdlIGNhcHR1cmVcbiAgICAgIC8vIHRoaXMgdmFsdWUsIHVuZXNjYXBlIGFueSBkb3VibGUgcXVvdGVzLlxuICAgICAgc3RyTWF0Y2hlZFZhbHVlID0gYXJyTWF0Y2hlc1syXS5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoIFwiXFxcIlxcXCJcIiwgXCJnXCIgKSxcbiAgICAgICAgICBcIlxcXCJcIixcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIGZvdW5kIGEgbm9uLXF1b3RlZCB2YWx1ZS5cbiAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbM107XG4gICAgfVxuXG5cbiAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIG91ciB2YWx1ZSBzdHJpbmcsIGxldCdzIGFkZFxuICAgIC8vIGl0IHRvIHRoZSBkYXRhIGFycmF5LlxuICAgIGFyckRhdGFbYXJyRGF0YS5sZW5ndGggLSAxXS5wdXNoKCBzdHJNYXRjaGVkVmFsdWUgKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgcGFyc2VkIGRhdGEuXG4gIHJldHVybiAoIGFyckRhdGEgKTtcbn1cbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgZGJOYW1lOiBcImJlYWdsZVwiLFxuICB2ZXJzaW9uOiAxLFxuICBtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50OiAxMDAwLCAvLyBhZmZlY3RzIHZlcnNpb25cbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImRhdGFcIixcbiAgICBpbmRleGVzOiBbe1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZVwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcInNlc3Npb25faWRcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCIsIFwiZGF0YV92YWx1ZVwiXSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZV9zZXNzaW9uXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH1dLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcImlkXCIsIGF1dG9JbmNyZW1lbnQ6IHRydWV9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7Z2V0QnJvd3NlclR5cGV9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXJcIik7XG5jb25zdCBfd2luZG93ID0ge1xuICBhbGx0aW1lOiBcImFsbHRpbWVcIiwgc2Vzc2lvbjogXCJzZXNzaW9uXCIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBpbml0aWFsaXplZCBkYiB3aXRoOiBcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBpbmRleGVkREJcIik7XG4gICAgLy8gVE9ETywgdW5jb21tZW50IG5leHQgbGluZSBvbmNlIGV4aXN0aW5nIHN0YWxlIGRicyBhcmUgcHVyZ2VkXG4gICAgLy8gY29uc3Qgb3BlblJlcXVlc3QgPSB3aW5kb3cudG9wLmluZGV4ZWREQj8ub3Blbihjb25maWcuZGJOYW1lLCBjb25maWcudmVyc2lvbik7XG4gICAgY29uc3Qgb3BlblJlcXVlc3QgPSB3aW5kb3cudG9wLmluZGV4ZWREQj8ub3Blbihjb25maWcuZGJOYW1lKTtcbiAgICBpZiAoIW9wZW5SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbmRleGVkZGIgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0LnJlc3VsdC5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBvcGVuUmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGJlYWdsZSBpbmRleGVkIERCXCIsIG9wZW5SZXF1ZXN0LmVycm9yKTtcbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGIgPSBvcGVuUmVxdWVzdC5yZXN1bHQ7XG4gICAgICBpZiAoZGIudmVyc2lvbiAhPT0gMSkge1xuICAgICAgICAvLyBUT0RPLCByZW1vdmUgZGVsZXRlIHJlcXVlc3Qgb25jZSBleGlzdGluZyBzdGFsZSBkYnMgYXJlIHB1cmdlZFxuICAgICAgICBjb25zdCBkZWxldGVSZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShjb25maWcuZGJOYW1lKTtcbiAgICAgICAgZGVsZXRlUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgdGhpcy5pbmRleGVkREIgPSBkYjtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBhc3luYyBzYXZlKGRhdGFOYW1lLCBkYXRhVmFsdWUpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHNlc3Npb25JZCA9IHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpOyAvLyBkYXRlIGN1cnJlbnQgLTIgc2FhdCAgeWlsLWF5LWd1blxuICAgIGNvbnN0IHRpbWUgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB7XCJkYXRhX25hbWVcIjogZGF0YU5hbWUsIFwiZGF0YV92YWx1ZVwiOiBkYXRhVmFsdWUsIFwic2Vzc2lvbl9pZFwiOiBzZXNzaW9uSWQsIHRpbWV9O1xuICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgfVxuXG4gIG1pbm1heChkYXRhTmFtZSwgb3AsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgc3RvcmVkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzdG9yZWQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtaW5cIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPCBzdG9yZWQpIHx8XG4gICAgICAgICAgICAgICAgKG9wID09PSBcIm1heFwiICYmIHZhbHVlW1wiZGF0YV92YWx1ZVwiXSA+IHN0b3JlZClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVkID0gdmFsdWVbXCJkYXRhX3ZhbHVlXCJdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHN0b3JlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtaW4oZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtaW5cIiwgd2luZG93KTtcbiAgfVxuXG4gIG1heChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWlubWF4KGRhdGFOYW1lLCBcIm1heFwiLCB3aW5kb3cpO1xuICB9XG5cbiAgZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoIW1hcC5oYXModmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSkgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIDApO1xuICAgICAgICAgICAgICBtYXAuc2V0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSwgbWFwLmdldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0pICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKG1hcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBtb2RlKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncm91cEJ5KGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGlmIChkYXRhLmtleXMoKS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgbWF4ID0ge25hbWU6IHVuZGVmaW5lZCwgdmFsdWU6IC0xfTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGRhdGEpIHtcbiAgICAgIGlmIChtYXgudmFsdWUgPCB2YWx1ZSkge1xuICAgICAgICBtYXgubmFtZSA9IGtleTtcbiAgICAgICAgbWF4LnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heDtcbiAgfVxuXG4gIGNvdW50KGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3VtKGRhdGFOYW1lLCB3aW5kb3cgPSBcImFsbHRpbWVcIikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBsZXQgdG90YWwgPSAwLjAwO1xuICAgICAgICB0aGlzLmdldEN1cnNvcihzdG9yZSwgZGF0YU5hbWUsIHdpbmRvdykub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgaWYgKFwiZGF0YV92YWx1ZVwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRvdGFsICs9IHBhcnNlRmxvYXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImtleSBub3QgZm91bmQgaW4gY3Vyc29yIHZhbHVlcyBcIiArIGRhdGFOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodG90YWwudG9GaXhlZCgyKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUsIGRhdGFWYWx1ZSA9IHVuZGVmaW5lZCkge1xuICAgIGlmIChkYXRhVmFsdWUpIHtcbiAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIGRhdGFWYWx1ZV0pKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KFtkYXRhTmFtZSwgdGhpcy5nZXRDdXJyZW50U2Vzc2lvbklkKCkudG9TdHJpbmcoKV0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleFZhbHVlID0gZ2V0QnJvd3NlclR5cGUoKSA9PT0gXCJzYWZhcmlcIiA/IGRhdGFOYW1lIDogW2RhdGFOYW1lXTtcblxuICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpXG4gICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoaW5kZXhWYWx1ZSkpO1xuICB9XG5cbiAgYXN5bmMgYXZnKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICBjb25zdCB0b3RhbCA9IGF3YWl0IHRoaXMuc3VtKGRhdGFOYW1lLCB3aW5kb3cpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5jb3VudChkYXRhTmFtZSwgd2luZG93KTtcblxuICAgIGlmICghdG90YWwgfHwgIWNvdW50KSByZXR1cm4gMDtcblxuICAgIHJldHVybiAodG90YWwgLyBjb3VudCkudG9GaXhlZCgyKTtcbiAgfVxuXG4gIGFzeW5jIGxhc3QoZGF0YU5hbWUsIHNpemUgPSAxLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVcIikub3BlbkN1cnNvcihbZGF0YU5hbWVdLCBcInByZXZcIik7XG4gICAgICAgIGlmICh3aW5kb3cgPT09IF93aW5kb3cuc2Vzc2lvbikge1xuICAgICAgICAgIGN1cnNvciA9IHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiKVxuICAgICAgICAgICAgICAub3BlbkN1cnNvcihbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpXSwgXCJwcmV2XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGN1cnNvci5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiBpbmRleCA8IHNpemUpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRTZXNzaW9uSWQoKSB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgZC5zZXRIb3VycyhkLmdldEhvdXJzKCkgLSAyKTtcblxuICAgIHJldHVybiBkLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArXG4gICAgICAoZC5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIikgKyBcIi1cIiArXG4gICAgICBkLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IENvbGxlY3RvckFwaSBmcm9tIFwiLi4vQmVhZ2xlRGF0YUNvbGxlY3Rpb24vYXBpXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZURhdGFDb2xsZWN0aW9uXCIpO1xuY29uc3QgY29sbGVjdG9yQXBpID0gbmV3IENvbGxlY3RvckFwaSgpO1xuXG4vLyBrZWVwIGEgdGFibGUgaW4gaW5kZXhkYiB0aGUgZm9ybWF0IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIGRhdGFfdmFsdWUsIHN0b3JlZF92YWx1ZV1cblxuZXhwb3J0IGNvbnN0IHF1ZXJ5SW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBxdWVyeU1ldGhvZCwgd2luZG93KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJxdWVyeUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdyk7XG4gIGlmICghY29sbGVjdG9yQXBpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkluZGV4ZWREQiBubyBzdXBwb3J0ZWQvSW5pdGlhbGl6ZWRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB3aW5kb3cgY2FuIGJlIGVpdGhlciBzYW1lZGF5IG9yIGFsbHRpbWVcblxuICBpZiAocXVlcnlNZXRob2QgPT09IFwibWluXCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkubWluKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1heFwiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLm1heChiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJhdmdcIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5hdmcoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiY2RcIikge1xuICAgIHJldHVybiAoYXdhaXQgY29sbGVjdG9yQXBpLmdyb3VwQnkoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpKS5zaXplO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImN2XCIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY29sbGVjdG9yQXBpLmdyb3VwQnkoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuXG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IFssIHZhbHVlXSBvZiBkYXRhKSB7XG4gICAgICBjb3VudCArPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1vZGVcIikge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb2xsZWN0b3JBcGkubW9kZShiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gZGF0YS5uYW1lO1xuICB9XG5cbiAgaWYgKHF1ZXJ5TWV0aG9kLmluZGV4T2YoXCJsYXN0XCIpID49IDApIHtcbiAgICBjb25zdCBtYXRjaCA9IHF1ZXJ5TWV0aG9kLm1hdGNoKFwibGFzdFxcXFwoKFtcXFxcZF0rKVxcXFwpXCIpO1xuICAgIGlmICghbWF0Y2ggfHwgIW1hdGNoLmxlbmd0aCA9PT0gMiB8fCBwYXJzZUludChtYXRjaFsxXSkgPCAxICkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLmxhc3QoYmFzZUZlYXR1cmVOYW1lLCBtYXRjaFsxXSwgd2luZG93KTtcbiAgICBjb25zdCBkYXRhVmFsdWVzID0gcXVlcnlQcm9taXNlLm1hcCgob2JqKSA9PiBvYmouZGF0YV92YWx1ZSk7XG4gICAgcmV0dXJuIGRhdGFWYWx1ZXM7XG4gIH1cblxuICAvKipcbiAgICB7XCJMaXN0aW5ncGFnZVwiID0+IDIxfVxuICAgIHtcIkhvbWVwYWdlXCIgPT4gMTJ9XG4gICAgLS0gZXhhbXBsZSB3aWxsIGhhdmU6XG4gICAgbW9kZTogTGlzdGluZ3BhZ2VcbiAgICBjZDogMlxuICAgIGN2OiAyMSsxMlxuICAgIGxhc3QoMykgKG4sIG4tMSwgbi0yKVxuICAqL1xuXG4gIC8vIDEwMDBsaWsgdGVtaXpsZW5lY2VrIChtYWludE9wQ291bnQgLT4gdmVyc2lvbilcblxuICAvLyBxdWVyeU1ldGhvZCBjYW4gYmUgXCJtb2RlXCIsIFwiY2RcIiAoY291bnQgZGlzdGludCkgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzXG4gIC8vIHF1ZXJ5TWV0aG9kIGNhbiBiZSBcImN2XCIgKHN1bSBvZiBjb3VudCB2YWx1ZXMpLCBcImN1cnJlbnRcIiwgb3IgXCJwcmV2XCIgZm9yIGFueSBkYXRhIHR5cGUgKHN0b3JlZCB2aWEgbGFzdClcbiAgbG9nZ2VyLmZhaWxlZChgdW5rbm93biBxdWVyeU1ldGhvZD0ke3F1ZXJ5TWV0aG9kfSBpbiBCZWFnbGVEYXRhQ29sbGVjdGlvbmApO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUsIHVwZGF0ZU1ldGhvZCkgPT4ge1xuICBsb2dnZXIubG9nKFwidXBkYXRlSW5Db2xsZWN0b3JcIiwgYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpO1xuICBpZiAoIWNvbGxlY3RvckFwaSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJJbmRleGVkREIgbm8gc3VwcG9ydGVkL0luaXRpYWxpemVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXdhaXQgY29sbGVjdG9yQXBpLnNhdmUoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlKTtcblxuXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJtaW5cIiwgXCJtYXhcIiwgXCJjbnRcIiwgXCJzdW1cIiBmb3IgbnVtZXJpYyBkYXRhIHR5cGVzLCBtaW4tbWF4IGNvbXBhcmVzIHdpdGggb25seSBleGlzdGluZywgYXZnIHVwZGF0ZXMgY250IGFuZCBzdW1cbiAgLy8gLS0+IG1pbjogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJtaW5cIiwgKGxlYXN0IG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gbWF4OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcIm1heFwiLCAoZ3JlYXRlc3Qgb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBzdW06IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwic3VtXCIsIChzdW0gb2YgZXhpc3RpbmcgYW5kIGluY29taW5nIHN0b3JlZF92YWx1ZSldXG4gIC8vIC0tPiBjbnQ6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY250XCIsIChleGlzdGluZyArIDEpXVxuICAvL1xuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwiY291bnRfdmFsdWVzXCIgZm9yIHN0cmluZy9jYXRlZ29yaWNhbCBkYXRhIHR5cGVzLCBrZWVwIGEgY291bnRlciBmb3IgZWFjaCB2YWx1ZVxuICAvLyAtLT4gY291bnRfdmFsdWVzOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBkYXRhX3ZhbHVlLCAoZXhpc3RpbmcgKyAxKV1cbiAgLy9cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImxhc3RcIiBmb3IgYW55IGRhdGEgdHlwZSAtLT4ga2VlcHMgMiB2YWx1ZXMgZm9yIGN1cnJlbnQgYW5kIHRoZSBwcmV2aW91c1xuICAvLyBkZWxldGU6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwicHJldlwiLCAoZXhpc3RpbmcgdmFsdWUpXVxuICAvLyBtb3ZlOiBleGlzdGluZyBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImN1cnJlbnRcIiwgKGV4aXN0aW5nIHZhbHVlKV0gLS0+IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwicHJldlwiLCAoZXhpc3RpbmcgdmFsdWUpXVxuICAvLyBwdXQ6IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwiY3VycmVudFwiLCAoaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2Zvcm1hdERlbGl2ZXJ5RGF0ZSwgaXNPd25NdXRhdGlvbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge3F1ZXJ5SW5Db2xsZWN0b3IsIHVwZGF0ZUluQ29sbGVjdG9yfSBmcm9tIFwiLi4vQmVhZ2xlRGF0YUNvbGxlY3Rpb25cIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG53aW5kb3cuYmVhZ2xlSW5mb0xheWVyID0gd2luZG93LmJlYWdsZUluZm9MYXllciB8fCB7XG4gIGE6IHt9LCBlOiB7fSwgZjoge30sIF9faHdtOiAwLFxufTtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllclwiKTtcblxuLy8gVE9ETzogY29udmVydCB0byBuYW1lIC0tPiBhcnJheSBvZiBzZWxlY3RvcnNcbmNvbnN0IHNlYXJjaFBhdGhzID0gW1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdBIERhdGEgTGF5ZXIgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUGFnZVR5cGVcIiwgbmFtZTogXCJQYWdlVHlwZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImlzQWRtaW5cIiwgbmFtZTogXCJ2dnNJc1Nob3dyb29tXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGRwLmdyb3VwXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2xhc3NcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9pZHNcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJ1cHBlckNhc2VUUlwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJQcm9kdWN0SURcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfY2F0ZWdvcnlcIiwgbmFtZTogXCJwZHAuY2F0ZWdvcnlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLmRldGFpbC5hY3Rpb25GaWVsZC5saXN0XCIsIG5hbWU6IFwicGRwLmxpc3RhbGlhc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5za3VcIiwgbmFtZTogXCJwZHAuc2t1XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmRpc2NvdW50UmF0ZVwiLCBuYW1lOiBcInBkcC5kaXNjb3VudFJhdGVcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouZmFzdERlbGl2ZXJ5XCIsIG5hbWU6IFwicGRwLmZhc3REZWxpdmVyeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5pc0luU2hvd3Jvb21cIiwgbmFtZTogXCJwZHAuaXNJblNob3dyb29tXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwic2VhcmNoX3N1Y2Nlc3NcIiwgbmFtZTogXCJwbHAuc2VhcmNoU3VjY2Vzc1wiLCBleGNsdXNpdmU6IFtcInBscC5pZFwiLCBcInBscC5hcHByb3hpbWF0ZUNvdW50XCIsIFwicGxwLm5hbWVcIiwgXCJwbHAuZ3JvdXBcIiwgXCJwbHAuY2xhc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGxwLmlkXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNhdGVnb3J5X3Byb2R1Y3RfY291bnRcIiwgbmFtZTogXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X25hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJwcm9kdWN0Z3JvdXBcIiwgbmFtZTogXCJwbHAuZ3JvdXBcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZV9jYXRlZ29yeVwiLCBuYW1lOiBcInBscC5jbGFzc1wiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmlkXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInB1cmNoYXNlLnByaWNlc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5xdWFudGl0eVwiLCBuYW1lOiBcInB1cmNoYXNlLnF1YW50aXRpZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLiouY2F0ZWdvcnlcIiwgbmFtZTogXCJwdXJjaGFzZS5jYXRlZ29yaWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLm9yZGVySWRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLmFjdGlvbkZpZWxkLnJldmVudWVcIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5kaW1lbnNpb24xNVwiLCBuYW1lOiBcInB1cmNoYXNlLnBheW1lbnRUeXBlXCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRG9jdW1lbnQgUXVlcmllc1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicGFnZV9wcmV2aWV3X3dyYXBwZXJfcHJvZHVjdGlvblxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiSG9tZXBhZ2VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjYXRlZ29yeV9wYWdlX3dyYXBwZXJcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkxpc3RpbmdwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdC1tYWluLWRldGFpbHNcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwiUGFnZVR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIiwgdmFsdWU6IFwiUHJvZHVjdHBhZ2VcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ3ZWxjb21lX3VzZXJuYW1lXFxcIl1cIiwgbmFtZTogXCJ2aWV3LmlzTG9nZ2VkSW5cIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJlbXB0eV9iYXNrZXRfdGV4dFxcXCJdXCIsIG5hbWU6IFwiY2FydC5pc2VtcHR5XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LnRvdGFsQmFzZVByaWNlXCIsIFwiY2FydC5za3Vjb3VudFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiYm9keSA+IC5kZXNrdG9wX2xheW91dF93cmFwcGVyIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY29wdW9uTm90QXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF90b3RhbF9wcmljZVxcXCJdXCIsIG5hbWU6IFwiY2FydC50b3RhbEJhc2VQcmljZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2lkKj1cXFwiY2FydF9xdWFudGl0eVxcXCJdLCBbY2xhc3MqPVxcXCJiYXNrZXRfbGVuZ3RoXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZGVsaXZlcnktZGF0ZVxcXCJdXCIsIG5hbWU6IFwicGRwLmRlbGl2ZXJ5RGF0ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVGb3JtYXR0ZWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwiZm9ybWF0RGVsaXZlcnlEYXRlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtdGl0bGVcXFwiXSwgW2NsYXNzKj1cXFwiaGVhZGVyLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJ2aXZlbnNlLXNob3dyb29tc1xcXCJdID4gKlwiLCBuYW1lOiBcInBkcC5zaG93cm9vbWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlDb3VudEVsdHNcIiwgZXhjbHVzaXZlOiBbXCJwZHAuaGFzTm9TaG93cm9vbXNcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiN2aXZlbnNlLXNob3dyb29tLXRhYiBwOm5vdCgudml2ZW5zZS1zaG93cm9vbXMpXCIsIG5hbWU6IFwicGRwLmhhc05vU2hvd3Jvb21zXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJwZHAuc2hvd3Jvb21jb3VudFwiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJjb3VudC1vZi1wcm9kdWN0XFxcIl1cIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInN1YmNhdGVnb3JpZXMtdGl0bGVcXFwiXVwiLCBuYW1lOiBcInBscC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtY2FyZFtkYXRhLXByb2R1Y3Qtc2t1XVwiLCBuYW1lOiBcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtcHJvZHVjdC1za3VcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLnByb2R1Y3QtbGlzdFwiLCBvYnNlcnZlcjogXCJsaXN0aW5nSXRlbUJsb2NrXCIsIG5hbWU6IFwiX19saXN0aW5nSXRlbUJsb2NrT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmVtcHR5LWNhcnQtY29udGFpbmVyLCAuZW1wdHktY2FydFwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmJyYWNrZXQtdGV4dCwgLnByb2R1Y3QtY291bnRcIiwgbmFtZTogXCJjYXJ0LnNrdWNvdW50XCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnRJdGVtUXVhbnRpdHlcIiwgbmFtZTogXCJjYXJ0LnF1YW50aXRpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByZXZpb3VzXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiI2JpbGxfdG90YWxcIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlci1maW5hbC1udW1iZXJcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2FydC1wcmljZVxcXCJdIC5ub3QtYWxsb3dlZC1jb3Vwb25cIiwgbmFtZTogXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIC8vIE5vdGUgdGhhdCBzZXF1ZW50aWFsIHNlYXJjaCB3aWxsIG1hcmsgY291cG9uQXBwbGljYWJsZSBhcyBmb3VuZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LnNrdXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXNrdVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQuY2F0ZWdvcmllc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtbGFzdC1icmVhZGNydW1iXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5wcmljZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByaWNlXCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCJdfSxcbiAgLy8gRGVza3RvcCBvYnNlcnZlciBmb3IgdGhlIHJpZ2h0IHBhbmVsLCBhcyBpdCBpcyB0aGUgb25lIGNoYW5naW5nXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LXJpZ2h0LWNvbnRhaW5lclwiLCBvYnNlcnZlcjogXCJjaGVja291dEZvcm1cIiwgbmFtZTogXCJfX2NoZWNrb3V0Rm9ybU9ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJjYXJ0LnNrdWNvdW50XCIsIFwiY2FydC50b3RhbFByaWNlXCIsIFwiY2FydC50b3RhbFByaWNlRmluYWxcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgXCJjYXJ0LnNrdXNcIiwgXCJjYXJ0LnByaWNlc1wiLCBcImNhcnQucXVhbnRpdGllc1wiLCBcImNhcnQuY2F0ZWdvcmllc1wiLCBcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiXSwgb3BlcmFuZDogXCJkb2NRdWVyeU9ic2VydmVcIn0sXG4gIC8vIE1vYmlsZSBvYnNlcnZlciBmb3IgdGhlIGZ1bGwgZm9ybSBibG9jayBhcyBpdCBpcyBjb21wbGV0ZWx5IHJlcGxhY2VkXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNjaGVja291dEZvcm1cIiwgb2JzZXJ2ZXI6IFwiY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiYmFza2V0X3N1bW1hcnlfdG90YWxcXFwiXSwgW2NsYXNzKj1cXFwidG90YWxfcm93XFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5yZXZlbnVlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcIm9yZGVyX2ZvbGxvd19udW1iXFxcIl0sIFtjbGFzcyo9XFxcImNhcnQtdGl0bGUtYm90dG9tXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS52dnNUeG5JZFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wYXltZW50X3R5cGVfdGl0bGUsIC5jYXJ0LXRpdGxlLWluZm9cIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJsb3dlckNhc2VUUkZpcnN0V29yZFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0X3NrdV9jb2RlXFxcIl1cIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJwdXJjaGFzZS5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTT1JHIEVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJza3VcIiwgbmFtZTogXCJwZHAuc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibXBuXCIsIG5hbWU6IFwicGRwLm1wblwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm5hbWVcIiwgbmFtZTogXCJwZHAubmFtZVwiLCBvcGVyYW5kOiBcIkpTT05GaWx0ZXJPdGhlclwiLCB2YWx1ZTogXCJAdHlwZT1Qcm9kdWN0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwib2ZmZXJzLnByaWNlXCIsIG5hbWU6IFwicGRwLnByaWNlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwib2ZmZXJzLnByaWNlVmFsaWRVbnRpbFwiLCBuYW1lOiBcInBkcC5wcmljZVZhbGlkVW50aWxcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJpdGVtTGlzdEVsZW1lbnQuKi5uYW1lXCIsIG5hbWU6IFwidmlldy5icmVhZGNydW1iXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm5hbWVcIiwgbmFtZTogXCJwbHAubmFtZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1haW5FbnRpdHkubnVtYmVyT2ZJdGVtc1wiLCBuYW1lOiBcInBscC5pdGVtQ291bnRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJicmVhZGNydW1iLml0ZW1MaXN0RWxlbWVudC4qLml0ZW0ubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFdpbmRvdyBjdXN0b20gZWxlbWVudHNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIlNpbmdsZVdUXCIsIHNlbGVjdG9yOiBcImZhdm9yaXRlUHJvZHVjdHNcIiwgbmFtZTogXCJ2aWV3LmZhdm9yaXRlZE1QTnNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwidG9TdHJpbmdcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJ1c2VySWRcIiwgbmFtZTogXCJ2dnNVc2VySWRcIn0sXG5dO1xuXG5jb25zdCBmZWF0dXJlRW5naW5lZXJpbmdPcHMgPSB7XG4gIFwidmlld19lcG9jaFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJtaW5cIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1pblwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnZpZXdfZXBvY2hfbWluXCJ9LFxuICBdLFxuICBcIlBhZ2VUeXBlXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJjdlwiLCB3aW5kb3c6IFwiYWxsdGltZVwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LlBhZ2VUeXBlX2NvdW50X2FsbHRpbWVcIn0sXG4gIF0sXG4gIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5sYXN0Q2FydENvdXBvbkFwcGxpY2FibGVcIn0sXG4gIF0sXG4gIFwicGRwLmNhdGVnb3J5XCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImNvdW50X3ZhbHVlc1wifSxcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcIm1vZGVcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5wZHBfY2F0ZWdvcnlfbW9kZV9zZXNzaW9uXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X2xhc3Rfc2Vzc2lvblwifSxcbiAgXSxcbiAgXCJjYXJ0LnNrdXNcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibGFzdFwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wifSxcbiAgXSxcbn07XG5cbmV4cG9ydCBjb25zdCBpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSA9ICgpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluZm9MYXllci5fX2h3bSArPSAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG5cbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyBpZiB2YWx1ZSBpcyBzdHJpbmcsIGFkZCBhcyBhIGNsZWFuIHN0cmluZywgaWYgb2JqZWN0IGFkZCB0aGUgc2FtZVxuICBjb25zdCB0eXBlZFZhbHVlID0gdHlwZW9mICh2YWx1ZSkgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS50b1N0cmluZygpLnRyaW0oKSA6IHZhbHVlO1xuICAvLyBpZiBrZXkgY29udGFpbnMgLiBjcmVhdGUgbmVzdGVkIG9iamVjdFxuICBpZiAoa2V5LmluZGV4T2YoXCIuXCIpID4gLTEpIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICBjb25zdCBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICBsZXQgb2JqID0gaW5mb0xheWVyO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIW9ialtrZXldKSBvYmpba2V5XSA9IHt9O1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgb2JqW2xhc3RLZXldID0gdHlwZWRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBpbmZvTGF5ZXJba2V5XSA9IHR5cGVkVmFsdWU7XG4gIH1cbiAgLy8gdXBkYXRlIGh3bSB0byBpbmRpY2F0ZSBjaGFuZ2VcbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGlmICh0eXBlZFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZWRWYWx1ZSAhPT0gbnVsbCkge1xuICAgIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCB0eXBlZFZhbHVlKTtcbiAgICBwYXNzVmFsdWVUb0xpc3RlbmVycyhrZXksIHR5cGVkVmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBEQVRBX0xJU1RFTkVSUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgYWRkRGF0YUxpc3RlbmVyID0gKGtleSwgbGlzdGVuZXIpID0+IHtcbiAgaWYgKCFEQVRBX0xJU1RFTkVSU1trZXldKSB7XG4gICAgREFUQV9MSVNURU5FUlNba2V5XSA9IFtdO1xuICB9XG4gIERBVEFfTElTVEVORVJTW2tleV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5jb25zdCBwYXNzVmFsdWVUb0xpc3RlbmVycyA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IERBVEFfTElTVEVORVJTW2tleV07XG4gIGlmIChsaXN0ZW5lcnMgJiYgQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYHBhc3NWYWx1ZVRvTGlzdGVuZXJzIC0tPiB2YWx1ZSAke3ZhbHVlfSB0byBsaXN0ZW5lciAke2l9IG9mIGtleSAke2tleX1gKTtcbiAgICAgICAgbGlzdGVuZXIodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5LCBibG9ja2luZyA9IGZhbHNlLCBwb2xsSW50ZXJ2YWwgPSA1MCwgdGltZW91dCA9IDEwMDAwKSA9PiB7XG4gIC8vIFRPRE86IGNoZWNrIGZlYXR1cmVFbmdpbmVlcmluZyBhbmQgc2VhcmNoIGxpc3QgaWYgYWxsIG1hcmtlZCBhcyBmb3VuZCBidXQgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgLy8gcmV0dXJuIG51bGwgaWYga2V5IGlzIG1pc3Npbmcgb3Igbm90IGFuIGFycmF5IG9yIGhhcyBubyBlbGVtZW50c1xuICBpZiAoIWtleSkgcmV0dXJuIG51bGw7XG4gIGxldCBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob2J0YWluRGF0YSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoa2V5ID09PSBzZWFyY2hFbGVtZW50Lm5hbWUgJiYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCB8fCBzZWFyY2hFbGVtZW50LmlzSWdub3JlKSkge1xuICAgICAgLy8gZGF0YSBpcyBtaXNzaW5nIGJ1dCBlbGVtZW50IGlzIG1hcmtlZCBhcyBmb3VuZCBvciBpZ25vcmVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChibG9ja2luZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIG9idGFpbkRhdGEgPSBqc29uR2V0KGluZm9MYXllciwga2V5KTtcbiAgICAgICAgaWYgKG9idGFpbkRhdGEgIT09IG51bGwgJiYgb2J0YWluRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZm91bmQgZGF0YSBmb3Iga2V5LCBjbGVhciBpbnRlcnZhbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUob2J0YWluRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgcG9sbEludGVydmFsKTtcbiAgICAgIC8vIGFkZCB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9LCB0aW1lb3V0KTsgLy8gd2FpdCBibG9ja2luZyBmb3IgXCJ0aW1lb3V0XCIgbXNlY3NcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXIgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIC8vIHJlbW92ZSBrZXkgZnJvbSBpbmZvTGF5ZXJcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgcmV0dXJuO1xuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgbG9nZ2VyLmxvZyhcInJlbW92ZUZyb21CZWFnbGVJbmZvTGF5ZXJcIiwgYFJlbW92aW5nICR7bGFzdEtleX0gZnJvbSAke0pTT04uc3RyaW5naWZ5KG9iail9YCk7XG4gICAgZGVsZXRlIG9ialtsYXN0S2V5XTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgaW5mb0xheWVyW2tleV07XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIHVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3Ioa2V5LCBudWxsKTtcbiAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCBudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUcmVhdG1lbnQgPSAoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBzdGF0dXMsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0ge307XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCAmJiBidXNpbmVzc1J1bGVJZCAhPT0gdW5kZWZpbmVkKSB2YWx1ZS5idXNpbmVzc1J1bGVJZCA9IGJ1c2luZXNzUnVsZUlkO1xuICBpZiAodmFyaWFudCkgdmFsdWUudmFyaWFudCA9IHZhcmlhbnQ7XG5cbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiYXBwbGllZFwiOlxuICAgICAgaW5mb0xheWVyLmFbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2tpcHBlZFwiOlxuICAgICAgdmFsdWUuZGVwZW5kYW50X29uX3RyZWF0bWVudCA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQ7XG4gICAgICBpbmZvTGF5ZXIuZVtpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGluZm9MYXllci5mW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00oKTtcbn07XG5cbmNvbnN0IFBBUlNFU0VBUkNITUFYUkVUUlkgPSAxMDtcbmNvbnN0IFBBUlNFU0VBUkNIU1RBUlRERUxBWSA9IDEwO1xubGV0IHBhcnNlU2VhcmNoUGF0aHNEZWxheSA9IFBBUlNFU0VBUkNIU1RBUlRERUxBWTtcbmxldCBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciA9IGFzeW5jICgpID0+IHtcbiAgLy8gQ29sbGVjdCBjb3JlIGRhdGFcbiAgcHJlcGFyZUNvcmVEYXRhKCk7XG5cbiAgLy8gVHJpZ2dlci1zdGFydCB0aGUgcGFyc2VyIGxvb3BcbiAgcGFyc2VyQ2FsbGVyKCk7XG5cbiAgLy8gQWRkIG1ldHJpY3NcbiAgYWRkTWV0cmljcygpO1xufTtcblxuY29uc3QgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvciA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYmFzZUZlYXR1cmVOYW1lcyA9IE9iamVjdC5rZXlzKGZlYXR1cmVFbmdpbmVlcmluZ09wcyk7XG4gIGZvciAoY29uc3QgYmFzZUZlYXR1cmVOYW1lIG9mIGJhc2VGZWF0dXJlTmFtZXMpIHtcbiAgICBjb25zdCBGRURhdGEgPSBmZWF0dXJlRW5naW5lZXJpbmdPcHNbYmFzZUZlYXR1cmVOYW1lXTtcbiAgICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgICBpZiAoRkVPcC5xdWVyeU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnF1ZXJ5TWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBxdWVyeVJlc3BvbnNlID0gYXdhaXQgcXVlcnlJbkNvbGxlY3RvcihiYXNlRmVhdHVyZU5hbWUsIEZFT3AucXVlcnlNZXRob2QsIEZFT3Aud2luZG93KTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoRkVPcC5mZWF0dXJlTmFtZSwgcXVlcnlSZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSkgPT4ge1xuICAvLyBwcm9jZXNzIGRlcGVuZGVudCBoaXN0b3JpY2FsIGRhdGEgZm9yIHNjYW4tZm91bmQgZWxlbWVudHNcbiAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gIGlmIChGRURhdGEgJiYgQXJyYXkuaXNBcnJheShGRURhdGEpICYmIEZFRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBGRU9wIG9mIEZFRGF0YSkge1xuICAgICAgaWYgKEZFT3AudXBkYXRlTWV0aG9kID09PSBudWxsIHx8IEZFT3AudXBkYXRlTWV0aG9kID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgYXdhaXQgdXBkYXRlSW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCBGRU9wLnVwZGF0ZU1ldGhvZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRm9ybWF0dGVyID0gKHZhbHVlLCBmb3JtYXR0ZXIpID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgIWZvcm1hdHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZm9ybWF0dGVyKSB7XG4gICAgY2FzZSBcInVwcGVyQ2FzZVRSXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZShcInRyLVRSXCIpO1xuICAgIGNhc2UgXCJmb3JtYXREZWxpdmVyeURhdGVcIjpcbiAgICAgIHJldHVybiBmb3JtYXREZWxpdmVyeURhdGUodmFsdWUpO1xuICAgIGNhc2UgXCJudW1lcmljT25seVwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBjYXNlIFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIjpcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKFwidHItVFJcIikuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNhc2UgXCJkZWFycmF5XCI6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdmFsdWVbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcInRvU3RyaW5nXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50cmltKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3Qgc2VhcmNoT2JqID0gKG9iaiwgc2VhcmNoRWxlbWVudCkgPT4ge1xuICBsZXQgdmFsdWU7XG4gIGxldCBsYXllclZhbHVlO1xuXG4gIHRyeSB7XG4gICAgc3dpdGNoIChzZWFyY2hFbGVtZW50Lm9wZXJhbmQpIHtcbiAgICAgIGNhc2UgXCJKU09ORmlsdGVyT3RoZXJcIjpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlID0ganNvbkdldChvYmosIHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlclBhcmFtcyA9IHNlYXJjaEVsZW1lbnQudmFsdWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIGlmIChmaWx0ZXJQYXJhbXMubGVuZ3RoICE9PSAyKSBicmVhaztcbiAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyUGFyYW1zWzBdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyUGFyYW1zWzFdO1xuICAgICAgICAgIGlmICghZmlsdGVyTmFtZSB8fCAhZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2ggPSBqc29uR2V0KG9iaiwgZmlsdGVyTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWZpbHRlck1hdGNoIHx8IGZpbHRlck1hdGNoICE9PSBmaWx0ZXJWYWx1ZSkgYnJlYWs7XG5cbiAgICAgICAgICBpZiAodmFsdWUgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5T2JzZXJ2ZVwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgIGNvbnN0IHRvQmVVcGRhdGVkID0gW107XG4gICAgICAgICAgc2VhcmNoRWxlbWVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHNlYXJjaFBhdGhzLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09PSBjaGlsZCk7XG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRFbGVtZW50cyBpbnRvIHRvQmVVcGRhdGVkXG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5wdXNoKC4uLmNoaWxkRWxlbWVudHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHJ1biBvbmx5IGlmIHRoZSBlbGVtZW50IGhhcyBhZGRlZCBvciByZW1vdmVkIGNoaWxkcmVuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyBmdW5jdGlvbihtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBmb3VuZCBzdGF0dXMgb2YgdGhlIGVsZW1lbnRzIGluIHRoZSBjaGlsZHJlbiBsaXN0XG4gICAgICAgICAgICBpZiAoaXNPd25NdXRhdGlvbihtdXRhdGlvbkxpc3QpKSByZXR1cm47XG4gICAgICAgICAgICB0b0JlVXBkYXRlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuaXNGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyKGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJSZXN0YXJ0ID0gcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID49IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG4gICAgICAgICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPSAwO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJzZWFyY2hPYmo6IHRyaWdnZXJlZCBhIHJlc3RhcnQgb2Ygc2VhcmNocGF0aHMgZHVlOiBcIiwgc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgICAgcGFyc2VyQ2FsbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh2YWx1ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZUxpc3QgPSBbXTtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZWNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IHZhbHVlY2hpbGQuZ2V0QXR0cmlidXRlKHNlYXJjaEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYlZhbHVlKSB7XG4gICAgICAgICAgICAgIGF0dHJpYlZhbHVlTGlzdC5wdXNoKGF0dHJpYlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXR0cmliVmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhdHRyaWJWYWx1ZUxpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3Ioc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHNldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlDb3VudEVsdHNcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuaW5uZXJUZXh0ICYmIHZhbHVlLmlubmVyVGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZWFyY2hFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5U3VtTnVtSW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgbGV0IHN1bVByaWNlID0gMDtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBzdW1QcmljZSs9cGFyc2VJbnQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN1bVByaWNlID4gMCkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHN1bVByaWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUFycmF5SW5uZXJUZXh0XCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yQWxsKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgY29uc3QgYXJyYXlJbm5lclRleHQgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBjaGlsZC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGFycmF5SW5uZXJUZXh0LnB1c2goY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycmF5SW5uZXJUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBhcnJheUlubmVyVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoID4gMCA6IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH0gLy8gc3dpdGNoXG5cbiAgICBpZiAobGF5ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGxheWVyVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmZvcm1hdHRlcikge1xuICAgICAgICBsYXllclZhbHVlID0gcHJvY2Vzc0Zvcm1hdHRlcihsYXllclZhbHVlLCBzZWFyY2hFbGVtZW50LmZvcm1hdHRlcik7XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihzZWFyY2hFbGVtZW50Lm5hbWUsIGxheWVyVmFsdWUpO1xuICAgICAgc2VhcmNoRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcblxuICAgICAgLy8gbWFyayBleGNsdXNpdmUgZWxlbWVudHMgYXMgZm91bmRcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaEVsZW1lbnQuZXhjbHVzaXZlKSAmJiBzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgZXhjbHVzaXZlRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZS5pbmNsdWRlcyhleGNsdXNpdmVFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAgICAgICBleGNsdXNpdmVFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJzZWFyY2hPYmogZXJyb3I6IFwiICsgZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgY3VzdG9tRGF0YURlcml2YXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuXG4gIHRyeSB7XG4gICAgLy8gY2FydCB0b3RhbCBwcm9kdWN0IHByaWNlIGlzIG5vdCBhdmFpbGFibGUgYW55d2hlcmUsIHNwZWNpYWwgZGlzY291bnRzIGV0YyBhcmUgaGFyZCB0byBzY3JhcGUsIHNvIHJlY2FsY3VsYXRlIGl0XG4gICAgY29uc3QgW2lzQ2FydEVtcHR5LCB0b3RhbEJhc2VQcmljZSwgY291cG9uTm90QXBwbGljYWJsZSwgcHJpY2VzLCBxdWFudGl0aWVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmlzZW1wdHlcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbEJhc2VQcmljZVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5wcmljZXNcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5xdWFudGl0aWVzXCIpLFxuICAgIF0pO1xuXG4gICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuXG4gICAgaWYgKCF0b3RhbEJhc2VQcmljZSAmJiBwcmljZXMgJiYgQXJyYXkuaXNBcnJheShwcmljZXMpICYmIHByaWNlcy5sZW5ndGggPiAwICYmIHF1YW50aXRpZXMgJiYgQXJyYXkuaXNBcnJheShxdWFudGl0aWVzKSAmJiBxdWFudGl0aWVzLmxlbmd0aCA+IDAgJiYgcHJpY2VzLmxlbmd0aCA9PT0gcXVhbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcGFyc2VJbnQocHJpY2VzW2ldKSAqIHBhcnNlSW50KHF1YW50aXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxCYXNlUHJpY2UpO1xuICAgIH1cblxuICAgIGxldCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICBpZiAoIWlzQ2FydEVtcHR5ICYmIHRvdGFsUHJpY2UgJiYgY291cG9uTm90QXBwbGljYWJsZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHRvdGFsUHJpY2UgLSBwYXJzZUludChjb3Vwb25Ob3RBcHBsaWNhYmxlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlKSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gcGFyc2VJbnQodG90YWxQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSAwO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiLCBjb3Vwb25BcHBsaWNhYmxlQW1vdW50KTtcblxuICAgIGlmIChpc0NhcnRFbXB0eSkge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnRvdGFsUHJpY2VcIiwgMCk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCAwKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJjdXN0b21EYXRhRGVyaXZhdGlvbnMgY2Fubm90IGNvbXB1dGUgY291cG9uQXBwbGljYWJsZVByaWNlOiBcIiArIGUpO1xuICB9XG5cbiAgLy8gUHJvZHVjdCBwYWdlIC0tPiB0cmFuc2ZlciBza3VzIHRvIHNpbmdsZSBsb2NhdGlvblxuICBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcIlByb2R1Y3RwYWdlXCIpIHtcbiAgICBjb25zdCBza3UgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicGRwLnNrdVwiKTtcbiAgICBpZiAoc2t1IT09bnVsbCAmJiBza3UhPT11bmRlZmluZWQpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIFtza3VdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBhZ2VUeXBlID09PSBcImJhc2tldFwiKSB7XG4gICAgY29uc3Qgc2t1TGlzdCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LnNrdXNcIik7XG4gICAgaWYgKHNrdUxpc3QhPT1udWxsICYmIEFycmF5LmlzQXJyYXkoc2t1TGlzdCkgJiYgc2t1TGlzdC5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHNrdUxpc3QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcGFyc2VTZWFyY2hQYXRocyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tU3RhdHVzID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgLy8gY2hlY2sgaWYgZG9jdW1lbnQgYW5kIGRvbSBpcyBsb2FkZWQgYW5kIHJlYWR5IGZvciBzY3JhcHBpbmdcbiAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgaW5pdGlhbGl6ZWQgd2l0aCBkb20gc3RhdHVzOiAgXCIgKyBkb21TdGF0dXMpO1xuXG4gIGNvbnN0IHdpbnRvcCA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IGRhdGFMYXllciA9IHdpbnRvcC5kYXRhTGF5ZXI7XG4gIGNvbnN0IHdpbmRvYyA9IHdpbnRvcC5kb2N1bWVudDtcbiAgbGV0IHNvcmdBcnJheUlubmVyO1xuXG4gIGNvbnN0IGZvdW5kTmFtZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHByZXZGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBub3RGb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuXG4gIC8vIFBhZ2VUeXBlIGNhbiBiZSBpbmZlcnJlZCBmcm9tIFVSTCwgaWYgZm91bmQgdXNlIGl0IGZyb20gdGhlcmVcbiAgbGV0IGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcblxuICBpZiAoY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgcHJldkZvdW5kTmFtZXMuYWRkKFwiUGFnZVR5cGVcIik7XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggc2VhcmNoIGxpc3RzIGFuZCBtYXJrIGZvdW5kIG5hbWVzXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQpIHtcbiAgICAgIHByZXZGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgIGlmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkgfHwgcHJldkZvdW5kTmFtZXMuaGFzKHNlYXJjaEVsZW1lbnQubmFtZSkpIHtcbiAgICAgIC8vIGhhZCBhbHJlYWR5IGZvdW5kIHRoaXMgZWxlbWVudCBvbiBhbm90aGVyIHBhcnNlIGl0ZW1cbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZCAhPT0gXCIqXCIpIHtcbiAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlVHlwZSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJQYWdlVHlwZVwiKTtcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZVR5cGUpIHtcbiAgICAgICAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWFyY2hFbGVtZW50LlBhZ2VUeXBlRGVwZW5kLmluZGV4T2YoY3VycmVudFBhZ2VUeXBlKSA8IDApIHtcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hFbGVtZW50IGJlY2F1c2Ugb2YgUGFnZVR5cGVEZXBlbmRcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWFyY2hFbGVtZW50Lm1ldGhvZCA9PT0gXCJTaW5nbGVXVFwiKSB7IC8vIFNDQU4gV2luZG93IGZvciBTaW5nbGUgRWxlbWVudHNcbiAgICAgIHNlYXJjaEFuZFNldCh3aW50b3AsIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiR0FEYXRhTGF5ZXJcIikgeyAvLyBTQ0FOIEdBIERBVEEgTEFZRVJcbiAgICAgIGZvciAoY29uc3QgZGF0YUxheWVySXRlbSBvZiBkYXRhTGF5ZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KGRhdGFMYXllckl0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jU29yZ1wiKSB7IC8vIFNDQU4gU09SRyBBUlJBWVxuICAgICAgaWYgKCFzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzb3JnQXJyYXlJbm5lciA9IGdldFNPUkdBcnJheSgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzb3JnSXRlbSBvZiBzb3JnQXJyYXlJbm5lcikge1xuICAgICAgICBzZWFyY2hBbmRTZXQoc29yZ0l0ZW0sIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiRG9jUXVlcnlcIikgeyAvLyBTQ0FOIERPQ1VNRU5UXG4gICAgICBzZWFyY2hBbmRTZXQod2luZG9jLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IC8vIERPQ1FVRVJZIHBhcnNlXG4gIH1cblxuICBpZiAobm90Rm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gUEFSU0VTRUFSQ0hNQVhSRVRSWTtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBmb3VuZCBhbGwgZWxlbWVudHMgLSBzZXR0aW5nIHJldHJ5IHRvIG1heFwiKTtcbiAgfSBlbHNlIGlmIChmb3VuZE5hbWVzLnNpemUgPT09IDApIHtcbiAgICAvLyB1cGRhdGUgcmV0cnkgY291bnRlciBhbmQgZGVsYXkgb25seSBpZiBkb20gaXMgYWN0aXZlXG4gICAgaWYgKGRvbVN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvbVN0YXR1cyA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgKj0gMjtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArPSAxO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZCBidXQgbm90IGZvdW5kIGFueSwgc2V0dGluZyBkZWxheSBhbmQgcmV0cnkgdG8gXCIgK1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCIgYW5kIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSArIFwiIGZvciBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXVwiLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgcHJvY2Vzc2VkOiBub3Rmb3VuZDogW1wiICtcbiAgICAgIEFycmF5LmZyb20obm90Rm91bmROYW1lcykuam9pbihcIiB8IFwiKSArIFwiXSBhbmQgZm91bmQgXCIgK1xuICAgICAgZm91bmROYW1lcy5zaXplLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaEFuZFNldCA9IChvYmosIHNlYXJjaEVsZW1lbnQsIGZvdW5kTmFtZXMsIG5vdEZvdW5kTmFtZXMpID0+IHtcbiAgaWYgKHNlYXJjaE9iaihvYmosIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgZm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBub3RGb3VuZE5hbWVzLmFkZChzZWFyY2hFbGVtZW50Lm5hbWUpO1xuICB9XG59O1xuXG4vLyBwYXJzZSBzb3VyY2VcbmNvbnN0IHBhcnNlckNhbGxlciA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLnRpbWUoXCJnbC1wYXJzZXJDYWxsZXJcIik7XG4gIGF3YWl0IHBhcnNlU2VhcmNoUGF0aHMoKTtcbiAgaWYgKHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA8IFBBUlNFU0VBUkNITUFYUkVUUlkpIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogc2NoZWR1bGVkIHRvIGJlIHJlY2FsbGVkIGluIFwiICsgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICsgXCJtc1wiKTtcbiAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgYXdhaXQgcGFyc2VyQ2FsbGVyKCk7XG4gICAgfSwgcGFyc2VTZWFyY2hQYXRoc0RlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRoczogcmVhY2hlZCBtYXggcmV0cnksIGNhbGxpbmcgcmVtYWluZGVyIGhpc3RvcmljYWwgZGF0YVwiKTtcbiAgICBhd2FpdCBjdXN0b21EYXRhRGVyaXZhdGlvbnMoKTtcbiAgICBhd2FpdCBjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yKCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUpO1xuICB9XG4gIGNvbnNvbGUudGltZUVuZChcImdsLXBhcnNlckNhbGxlclwiKTtcbn07XG5cbi8vIEV4dHJhY3QgdmFsdWUgZnJvbSBqc29uIG9iamVjdCB1c2luZyBnaXZlbiBwYXRoXG4vLyBJZiBhbiBlbGVtZW50IGlzICosIGNvbmNhdGVuYXRlIHJlY3Vyc2l2ZWx5IGFsbCBzdWItcGF0aCB2YWx1ZXMgYXMgc3RyaW5nXG5jb25zdCBqc29uR2V0ID0gKG9iaiwgcGF0aCkgPT4ge1xuICBpZiAoIW9iaikgcmV0dXJuIG51bGw7XG4gIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHBhdGhBcnJheVtpXSA9PT0gXCIqXCIpIHtcbiAgICAgICAgY29uc3Qgc3ViUGF0aCA9IHBhdGhBcnJheS5zbGljZShpICsgMSkuam9pbihcIi5cIik7XG4gICAgICAgIGNvbnN0IHN1YkFycmF5ID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IGluIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFtzdWJLZXldICE9PSB1bmRlZmluZWQgJiYgY3VycmVudFtzdWJLZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWYWx1ZSA9IGpzb25HZXQoY3VycmVudFtzdWJLZXldLCBzdWJQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdWJWYWx1ZSAhPT0gbnVsbCAmJiBzdWJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHN1YkFycmF5LnB1c2goc3ViVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViQXJyYXk7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtwYXRoQXJyYXlbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBwcmVwYXJlQ29yZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUudGltZShcImdsLXByZXBhcmVDb3JlRGF0YVwiKTtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgbmF2UHRyID0gd2luZG93UHRyLm5hdmlnYXRvcjtcblxuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnVzZXJBZ2VudERhdGE/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8ucGxhdGZvcm0gfHxcbiAgICB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnQ7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2UGxhdGZvcm1cIiwgcGxhdGZvcm0pO1xuXG4gIC8qIHdpbmRvdyB2aWV3IGFyZWEgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93UFJhdGlvXCIsIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcblxuICBjb25zdCBhdmFpbFdpbmRvdyA9IHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsV2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci5zY3JlZW4/LmF2YWlsSGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dBdmFpbFwiLCBhdmFpbFdpbmRvdyk7XG5cbiAgY29uc3Qgd2luZG93RGVwdGggPSB3aW5kb3dQdHIuc2NyZWVuPy5jb2xvckRlcHRoICsgXCItXCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5waXhlbERlcHRoO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dEZXB0aFwiLCB3aW5kb3dEZXB0aCk7XG5cbiAgY29uc3QgdnBvcnRTaGFwZSA9IHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8ud2lkdGggKyBcInhcIiArIHdpbmRvd1B0ci52aXN1YWxWaWV3cG9ydD8uaGVpZ2h0O1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dWcG9ydFwiLCB2cG9ydFNoYXBlKTtcblxuICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQoc2NyZWVuLndpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gcGFyc2VJbnQoc2NyZWVuLmhlaWdodCkgOiAwO1xuICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KHBsYXRmb3JtKTtcbiAgICAgIGlmIChpT1MgJiYgd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgLy8gaW9zIHByb3ZpZGVzIERQSXMsIG5lZWQgdG8gbXVsdGlwbHlcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogd2luZG93UHRyLmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQW5nbGUgPSB3aW5kb3dQdHIuc2NyZWVuPy5vcmllbnRhdGlvbj8uYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyhvcmllbnRhdGlvbkFuZ2xlKSA9PT0gOTAgfHwgTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDI3MCkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIHN3aXRjaCB2YWx1ZXMgZm9yIGFsbCBleGNlcHQgaW9zXG4gICAgICAgICAgY29uc3QgdGVtcCA9IHdpZHRoO1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0O1xuICAgICAgICAgIGhlaWdodCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1wiLCB3aWR0aCArIFwieFwiICsgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiBuYXZpZ2F0b3IgKi9cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2SGlzdFNpemVcIiwgd2luZG93UHRyLmhpc3Rvcnk/Lmxlbmd0aCk7XG5cbiAgLy8gY2hlY2sgaWYgdXNlckFnZW50RGF0YSBpcyBzdXBwb3J0ZWQgYW5kIHVzZXJBZ2VudCBpcyBub3QgYXZhaWxhYmxlLCB1c2UgaXRcbiAgaWYgKCFuYXZQdHIudXNlckFnZW50KSB7XG4gICAgaWYgKG5hdlB0ci51c2VyQWdlbnREYXRhKSB7XG4gICAgICAvLyB0dXJuIGJyYW5kcyBhcnJheSBpbnRvIHN0cmluZ1xuICAgICAgbGV0IG5hdkFnZW50ID0gbmF2UHRyPy51c2VyQWdlbnREYXRhPy5icmFuZHM/Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBlLmJyYW5kICsgXCI6XCIgKyBlLnZlcnNpb247XG4gICAgICB9KS5qb2luKCk7XG4gICAgICAvLyBhZGQgbW9iaWxlIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IChuYXZQdHI/LnVzZXJBZ2VudERhdGE/Lm1vYmlsZSA/IFwibW9iaVwiIDogXCIgXCIpO1xuICAgICAgLy8gYWRkIHBsYXRmb3JtIGluZm9cbiAgICAgIG5hdkFnZW50ICs9IHBsYXRmb3JtO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2QWdlbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZBZ2VudFwiLCBuYXZQdHIudXNlckFnZW50KTtcbiAgfVxuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhXQ29yZXNcIiwgbmF2UHRyLmhhcmR3YXJlQ29uY3VycmVuY3kpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZMYW5ndWFnZVwiLCBuYXZQdHIubGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5icm93c2VyTGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci5zeXN0ZW1MYW5ndWFnZSB8fFxuICAgICAgbmF2UHRyLnVzZXJMYW5ndWFnZSxcbiAgKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VG91Y2hcIiwgbmF2UHRyLm1heFRvdWNoUG9pbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2VmVuZG9yXCIsIG5hdlB0ci52ZW5kb3IpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5pbnRlcm5ldFNwZWVkXCIsIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LmNvbm5lY3Rpb24/LmRvd25saW5rKTtcblxuICAvKiBtaXNjZWxsYW5lb3VzICovXG4gIGNvbnN0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy50b3AubG9jYXRpb24uaHJlZik7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidVwiLCBjdXJyZW50VVJMLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRcIiwgY3VycmVudFVSTC5ob3N0bmFtZSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZG9udHRyYWNrXCIsIG5hdlB0ci5kb05vdFRyYWNrIHx8IHdpbmRvd1B0ci5kb05vdFRyYWNrIHx8IG5hdlB0ci5tc0RvTm90VHJhY2spO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICBjb25zdCBmaXJzdFNlc3Npb25SZWZlcnJlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9SRUZFUlJFUik7XG4gIGlmICghZmlyc3RTZXNzaW9uUmVmZXJyZXIpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIsIHdpbmRvd1B0ci5kb2N1bWVudC5yZWZlcnJlcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJmclwiLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICB9IGVsc2Uge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgZmlyc3RTZXNzaW9uUmVmZXJyZXIpO1xuICB9XG5cbiAgLyogVml2ZW5zZSBzcGVjaWZpYyAqL1xuICBsZXQgcGFnZVR5cGU7XG4gIC8vIGlmIHVybCBsaWtlIHggdGhlbiBzZXQgUGFnZVR5cGUgPSB5XG4gIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJmYXZvcmlsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiZmF2b3JpdGVzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1saXN0ZXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJiYXNrZXRcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzLW96ZXRpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwdXJjaGFzZVwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcIm9kZW1lLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwYXltZW50XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiYWRyZXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYWRkcmVzc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXNsZXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGFzdG9yZGVyc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInV5ZS1rYXlpdC5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicmVnaXN0ZXJcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUtZ2lyaXNpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJzaWduaW5cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJrdXBvbmxhcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2NvdXBvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJwcm9maWwtZ3VuY2VsbGUuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfaW5mb1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfYWRkcmVzc2VzXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZHV5dXJ1LXRlcmNpaGxlcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInByb2ZpbGVfbm90aWZpY2F0aW9uc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImluZGlyaW1saS1tb2JpbHlhLWthbXBhbnlhbGFyaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic3BlY2lhbF9jYW1wYWlnbnNcIjtcbiAgfVxuXG4gIGlmIChwYWdlVHlwZSkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgcGFnZVR5cGUpO1xuICB9XG4gIGNvbnNvbGUudGltZUVuZChcImdsLXByZXBhcmVDb3JlRGF0YVwiKTtcbn07XG5cbmNvbnN0IGFkZE1ldHJpY3MgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS50aW1lKFwiZ2wtYWRkTWV0cmljc1wiKTtcbiAgY29uc3Qgd2luZG93UHRyID0gd2luZG93LnRvcDtcbiAgY29uc3QgcGVyZk1ldHJpY3MgPSB7fTtcbiAgY29uc3QgcGVyZk5hdmlnYXRpb25NZXRyaWNzID0gd2luZG93UHRyLnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdO1xuICBpZiAod2luZG93UHRyLnBlcmZvcm1hbmNlICYmIHBlcmZOYXZpZ2F0aW9uTWV0cmljcykge1xuICAgIHBlcmZNZXRyaWNzLmNvbm5lY3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmNvbm5lY3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MucmVxdWVzdCA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlc3BvbnNlRW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLnJlcXVlc3RTdGFydCk7XG4gICAgcGVyZk1ldHJpY3MuZG9tID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tSW50ZXJhY3RpdmUgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZG9tQ29tcGxldGUpO1xuICAgIHBlcmZNZXRyaWNzLmxvYWQgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5sb2FkRXZlbnRFbmQgLSBwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuZHVyYXRpb24pO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibWV0cmljc1wiLCBwZXJmTWV0cmljcyk7XG4gIGNvbnNvbGUudGltZUVuZChcImdsLWFkZE1ldHJpY3NcIik7XG59O1xuXG4vLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gXCJlbGVtZW50IGNvbGxlY3RvclwiIG1vZHVsZSwgdGhlbiBkYXRhIGlzIGV4dHJhY3RlZCBmcm9tIHByZS1jb2xsZWN0ZWQgZWxlbWVudHNcbmNvbnN0IGdldFNPUkdBcnJheSA9ICgpID0+IHtcbiAgY29uc3Qgc2NoZW1hT3JnRWx0cyA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPVxcXCJhcHBsaWNhdGlvbi9sZCtqc29uXFxcIl1cIik7XG4gIGNvbnN0IHNvcmdBcnJheSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgc1RhZyBvZiBzY2hlbWFPcmdFbHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNudG50ID0gc1RhZy50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IGpzb25jb250ZW50ID0gSlNPTi5wYXJzZShjbnRudCk7XG4gICAgICBzb3JnQXJyYXkucHVzaChqc29uY29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBzb3JnQXJyYXk7XG59O1xuIiwiaW1wb3J0IHtMT0dfQVBJX1VSTH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU1vbml0b3JcIik7XG5jb25zdCBIRUFERVJTID0ge1xuICB0eXBlOiBcInRleHQvcGxhaW5cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBNb25pdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBtb25pdG9yXCIpO1xuXG4gICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzTWFpbkxvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gZmFsc2U7XG5cbiAgICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBBdHRlbXB0cyB0byBzZW5kIHRoZSBpbml0aWFsIGxvZyBib2R5IChiZWFnbGVJbmZvTGF5ZXIncyBpbml0aWFsIHBvcHVsYXRpb24pIGltbWVkaWF0ZWx5XG4gIGFzeW5jIHNlbmRMb2dzKGltbWVkaWF0ZSkge1xuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBpbW1lZGlhdGUgc2VuZGluZyBibG9ja1wiKTtcbiAgICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlTWFpbkxvZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gbm9uLWNyaXRpY2FsIHNlbmQgcGF0aCAtIGF3YWl0aW5nIHNjcmFwaW5nXCIpO1xuICAgICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fQ29tcGxldGVkU2NyYXBpbmdcIiwgdHJ1ZSwgNTAsIDEwMDApO1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBzZW5kaW5nIGxvZ3NcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZW5kIGluaXRpYWwgbG9nIGJvZHkgYW5kIGluY3JlbWVudGFsIHVwZGF0ZSBsb2dzIG9uIGNsb3NlXG4gIGFzeW5jIGhhbmRsZUNsb3NlRXZlbnQoKSB7XG4gICAgLy8gaWYgaW5pdGlhbCBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCBzZW5kIHVwZGF0ZXMgYW5kIGluZm9sYXllciBpbiBvbmUgYmF0Y2hcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICAvLyBpZiBtYWluIGxvZyBoYXMgYmVlbiBzZW50LCBzZW5kIGluY3JlbWVudGFsIHVwZGF0ZXMgb25seVxuICAgIGF3YWl0IHRoaXMucGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZU1haW5Mb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBhbHJlYWR5IGJlZW4gc2VudCwgZG8gbm90IHNlbmQgYWdhaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgbWFpbiBsb2dcbiAgICBjb25zdCByZXF1ZXN0QmxvYiA9IGF3YWl0IHRoaXMucGFja2FnZU1haW5Mb2dEYXRhKCk7XG5cbiAgICBpZiAocmVxdWVzdEJsb2IpIHtcbiAgICAgIC8vIHByZXBhcmUgY2hhbmdlIGRldGVjdGlvbiBoYXNoZXMgYXQgdGhlIHRpbWUgb2YgbWFpbiBsb2cgcHJlcGFyYXRpb25cbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgICBsb2dnZXIubG9nKFwiUmVxdWVzdCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZygpIHtcbiAgICBpZiAoIXRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNVcGRhdGVzU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgaGFzIG5vdCBiZWVuIHNlbnQgeWV0LCB0aGVyZSBpcyBubyBpbmNyZW1lbnRhbCB5ZXRcbiAgICAgIC8vIG9yIGlmIHRoZSB1cGRhdGVzIGhhdmUgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ2hhbmdlZCA9IGF3YWl0IHRoaXMuY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCk7XG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2dzIGNoYW5nZSBzdGF0dXM6IFwiLCBoYXNDaGFuZ2VkKTtcbiAgICBpZiAoIWhhc0NoYW5nZWQpIHJldHVybjtcblxuICAgIGNvbnN0IGxvZ0RhdGEgPSBhd2FpdCB0aGlzLnBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEoKTtcbiAgICBpZiAobG9nRGF0YSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNlbmRpbmcgaW5jcmVtZW50YWwgbG9nc1wiLCBsb2dEYXRhKTtcbiAgICAgIHRoaXMuaGFzVXBkYXRlc1NlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5xdWV1ZUxvZ3MobG9nRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlQXJyaXZhbExvZygpIHtcbiAgICBpZiAodGhpcy5oYXNNYWluTG9nU2VudCB8fCB0aGlzLmhhc0Fycml2YWxMb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBvciBhcnJpdmFsIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBsb2dnZXIubG9nKFwiQXJyaXZhbCBibG9iIHRvIHNlbmQ6IFwiLCByZXF1ZXN0QmxvYik7XG4gICAgICB0aGlzLmhhc0Fycml2YWxMb2dTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKHJlcXVlc3RCbG9iKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja0ZvckxhdGVzdENoYW5nZXMoKSB7XG4gICAgY29uc3QgaHdtID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9faHdtXCIpO1xuICAgIGlmICh0aGlzLmhpZ2hXYXRlck1hcmsgIT09IGh3bSkge1xuICAgICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VBcnJpdmFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbdXJsLCBoYXNoLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ1XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZpZXdfZXBvY2hcIiksXG4gICAgXSk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgY29va2llR2FJZDogY29va2llR2FJZCxcbiAgICAgIGxjOiAwLFxuICAgICAgdmlld19lcG9jaDogdmlld19lcG9jaCxcbiAgICAgIHU6IHVybCxcbiAgICAgIG9uSGFzaFBjdDogaGFzaCxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgbG9nIGRhdGE6IFwiLCBib2R5KTtcblxuICAgIHJldHVybiBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoYm9keSldLCBIRUFERVJTKTtcbiAgfVxuXG4gIGFzeW5jIHBhY2thZ2VNYWluTG9nRGF0YSgpIHtcbiAgICBjb25zdCBib2R5ID0ge307XG4gICAgaWYgKCF3aW5kb3cuYmVhZ2xlSW5mb0xheWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMod2luZG93LmJlYWdsZUluZm9MYXllcikpIHtcbiAgICAgIGlmICgha2V5LnN0YXJ0c1dpdGgoXCJfXCIpICYmIHZhbHVlICE9PSBudWxsKSBib2R5W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgYm9keS5sYyA9IDE7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCkge1xuICAgIGNvbnN0IFthLCBlLCBmLCBzLCBtLCBjb29raWVHYUlkLCB2aWV3X2Vwb2NoXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImVcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiZlwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIm1cIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMixcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICBhLCBlLCBmLCBzLCBtLFxuICAgIH07XG5cbiAgICBsb2dnZXIubG9nKFwiVXBkYXRlIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxldCB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IG51bGw7XG4gICAgbG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyBleGl0IGV2ZW50IGxpc3RlbmVyXCIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBiZWZvcmV1bmxvYWQgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBwYWdlaGlkZSBldmVudFwiKTtcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNsb3NlRXZlbnQoKTtcbiAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgLy8gSWYgcGFnZSBpcyBub3QgdmlzaWJsZSBhbmQgZG9lc24ndCBiZWNvbWUgdmlzaWJsZSB3aXRoaW4gMzAgc2Vjb25kcywgc2VuZCBsb2dzXG4gICAgICAgIHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0ID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkluIHRpbWVvdXRcIik7XG4gICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgICAgIH0sIDMwMDAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gQ2xlYXIgdGltZW91dCB3aGVuIHBhZ2UgaXMgdmlzaWJsZSB0byBtYWtlIHN1cmUgd2Ugc2VuZCB0aGUgbGF0ZXN0IGxvZ3MgcG9zc2libGVcbiAgICAgIGNsZWFyVGltZW91dCh2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCk7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IG51bGw7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgfVxuXG4gIHF1ZXVlTG9ncyhsb2dEYXRhKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3Iuc2VuZEJlYWNvbiB8fCB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZmV0Y2goTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgY29uc3QgcXVldWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghcXVldWVkKSBxdWV1ZWQgPSBuYXZpZ2F0b3Iuc2VuZEJlYWNvbihMT0dfQVBJX1VSTCwgbG9nRGF0YSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3MgcXVldWVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKHF1ZXVlSW50ZXJ2YWwpO1xuICAgICAgaWYgKCFxdWV1ZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkxvZ3Mgbm90IHF1ZXVlZFwiKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb25pdG9yO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7Z2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlSW5mb0xheWVyQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRGF0YUxheWVyUnVsZSA9IGFzeW5jIChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgY29uc3QgcnVudGltZVZhbHVlID0gYXdhaXQgZGF0YUxheWVyRmluZGVyKG9wZXJhdG9yKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRhTGF5ZXJGaW5kZXIgPSBhc3luYyAoa2V5KSA9PiB7XG4gIGxvZ2dlci5sb2coXCJTZWFyY2hpbmcgYmVhZ2xlSW5mb0xheWVyIGZvciBrZXkgXCIsIGtleSk7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5LCB0cnVlLCAyNSwgMTAwMCk7XG4gIGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuc3VjY2VzcyhgRm91bmQga2V5ICR7a2V5fSB3aXRoIHZhbHVlICR7cmVzfWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgbG9nZ2VyLmZhaWxlZChgS2V5ICR7a2V5fSBub3QgZm91bmQgaW4gYmVhZ2xlSW5mb0xheWVyYCk7XG4gIHJldHVybiBudWxsO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbGVtZW50Q2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRWxlbWVudFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlLCBzZWxlY3Rvciwgc2VsZWN0b3JBbGwsIHNlbGVjdG9yRmFsbGJhY2sgPSBudWxsfSA9IHJ1bGU7XG4gIGxldCBtYWluU2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgaWYgKG1haW5TZWxlY3RvciAmJiAhd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikpIHtcbiAgICBtYWluU2VsZWN0b3IgPSBzZWxlY3RvckZhbGxiYWNrID8gc2VsZWN0b3JGYWxsYmFjayA6IG1haW5TZWxlY3RvcjtcbiAgfVxuXG4gIGlmIChvcGVyYXRvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgfVxuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQgb24gcGFnZVwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHNlbGVjdG9yQWxsICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxldCBlbGVtZW50O1xuICBpZiAobWFpblNlbGVjdG9yKSBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3Rvcik7XG4gIGVsc2UgaWYgKHNlbGVjdG9yQWxsKSBlbGVtZW50ID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JBbGwpKTtcblxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRleHQtbnVtYmVyXCI6IHtcbiAgICAgIGxldCB0ZW1wVmFsO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgdGVtcFZhbCA9IGVsZW1lbnQucmVkdWNlKChyZXR1cm5WYWwsIGVsZW0pID0+IHtcbiAgICAgICAgICByZXR1cm5WYWwgKz0gcGFyc2VJbnQoZWxlbS50ZXh0Q29udGVudC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcFZhbCA9IHBhcnNlSW50KHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpLnRleHRDb250ZW50XG4gICAgICAgICAgICAucmVwbGFjZShcIlRMXCIsIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJ1blRpbWVWYWx1ZSA9IHBhcnNlSW50KHRlbXBWYWwpO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcImNsYXNzTGlzdFwiOlxuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJjb3VudFwiOiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiBlbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudC5sZW5ndGgsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKDEsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgXCJzdHlsZVwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGNvbnN0IHN0eWxlS2V5ID0gdmFsdWUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN0eWxlVmFsdWUgPSB2YWx1ZS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudFN0eWxlc1tzdHlsZUtleV07XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgc3R5bGVWYWx1ZSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiT3BlcmF0b3Igbm90IGRlZmluZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRnVuY3Rpb25DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tGdW5jdGlvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGlmICghb3BlcmF0b3IpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgcnVsZUZ1bmN0aW9uID0gRnVuY3Rpb24ob3BlcmF0b3IpO1xuICBjb25zdCBydW50aW1lVmFsdWUgPSBydWxlRnVuY3Rpb24oKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocnVudGltZVZhbHVlLCBjb25kaXRpb24sIHZhbHVlKTtcbn07XG4iLCJpbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlU2Vzc2lvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1Nlc3Npb25SdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gZHVyYXRpb25IYW5kbGVyKGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIGNhc2UgXCJoaXN0b3J5XCI6XG4gICAgICByZXR1cm4gaGlzdG9yeUhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRTZXNzaW9uVGltZXN0YW1wID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgRGF0ZShwYXJzZUludCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1RJTUVTVEFNUCkpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgc2Vzc2lvbiB0aW1lc3RhbXBcIiwgZXJyKTtcbiAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgfVxufTtcblxuY29uc3QgZHVyYXRpb25IYW5kbGVyID0gKGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSAoRGF0ZS5ub3coKSAtIGdldFNlc3Npb25UaW1lc3RhbXAoKSkgLyAxMDAwO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihkdXJhdGlvbiwgY29uZGl0aW9uLCBwYXJzZUludCh2YWx1ZSkpO1xufTtcblxuY29uc3QgaGlzdG9yeUhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBjdXJyZW50SGlzdG9yeSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fSElTVE9SWSk/LnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoY3VycmVudEhpc3RvcnksIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVVcmxDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tVcmxSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwicGF0aFwiOiB7XG4gICAgICBjb25zdCByZXF1ZXN0VVJMPSB3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWY7XG4gICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyZXF1ZXN0VVJMKS5wYXRobmFtZTtcbiAgICAgIGxvZ2dlci5sb2coYENoZWNraW5nIHBhdGggJHtwYXRofSBtYXRjaGVzIHJ1bGUgcGF0aCAke3ZhbHVlfWApO1xuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIocGF0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVFbnZDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbnZSdWxlID0gKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZGV2aWNlX3R5cGVcIjoge1xuICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShNT0JJTEVfTUVESUFfUVVFUlkpLm1hdGNoZXMgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCI7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihpc01vYmlsZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgXCJQTEFDRUhPTERFUlwiOiB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwiY29uc3QgY29uZmlnID0ge1xuICBkYk5hbWU6IFwiYmVhZ2xlX2NhY2hlXCIsXG4gIHZlcnNpb246IDEsXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJpbmZvQ2FjaGVcIixcbiAgICBpbmRleGVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiaXhfc2t1XCIsXG4gICAgICAgIGZpZWxkczogXCJza3VcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJza3VcIn0sXG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IHtmZXRjaFByb2R1Y3RJbmZvfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9zdG9yZS5jb25maWdcIjtcbmltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnlcIik7XG5jbGFzcyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIGluZGV4ZWREQlwiKTtcbiAgICBjb25zdCBvcGVuUmVxdWVzdCA9IHdpbmRvdy50b3AuaW5kZXhlZERCPy5vcGVuKGNvbmZpZy5kYk5hbWUsIGNvbmZpZy52ZXJzaW9uKTtcbiAgICBpZiAoIW9wZW5SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbmRleGVkZGIgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gVE9ETyB1cGdyYWRlIGV4aXN0aW5nIGRiIGluc3RlYWQgb2YgZGVsZXRlIGFuZCBjcmVhdGUgZnJvbSBzY3JhdGNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0LnJlc3VsdC5kZWxldGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGRlbGV0ZSBvdXRkYXRlZCBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBvcGVuUmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUsIGNvbmZpZy5zdG9yZS5vcHRpb25zKTtcbiAgICAgICAgaWYgKGNvbmZpZy5zdG9yZS5pbmRleGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBpZHggb2YgY29uZmlnLnN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHguZmllbGRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGNyZWF0ZSBvYmplY3Qgc3RvcmUgb24gZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGJlYWdsZV9jYWNoZSBpbmRleGVkIERCXCIsIG9wZW5SZXF1ZXN0LmVycm9yKTtcbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgdGhpcy5pbmRleGVkREIgPSBvcGVuUmVxdWVzdC5yZXN1bHQ7XG4gICAgfTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkluZGV4ZWREQiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0VHJhbnNhY3Rpb24ocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBhd2FpdCB0aGlzLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCB0eCA9IHRoaXMuaW5kZXhlZERCLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCAocmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikpO1xuICAgIHJldHVybiB0eC5vYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSk7XG4gIH1cblxuICBhc3luYyBzYXZlKHBheWxvYWQpIHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICBmb3IgKGNvbnN0IGxvYWQgb2YgcGF5bG9hZCkge1xuICAgICAgICBsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgc3RvcmUucHV0KGxvYWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgIHN0b3JlLnB1dChwYXlsb2FkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjbGVhcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKHRydWUpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsZWFyUmVxdWVzdCA9IHN0b3JlLmNsZWFyKCk7XG4gICAgICAgIGNsZWFyUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjbGVhclJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBjbGVhcmluZyBzdG9yZTogJHtzdG9yZS5uYW1lfWApO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldChza3UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgZ2V0UmVxdWVzdCA9IHN0b3JlLmdldChza3UpO1xuICAgICAgICBnZXRSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBnZXRSZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgICBsb2dnZXIubG9nKGBGb3VuZCB2YWx1ZSAke3Jlc3VsdH0gZm9yIGtleSAke3NrdX1gKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGdldFJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBnZXR0aW5nIHZhbHVlIGZvciBrZXk6ICR7c2t1fWAsIGdldFJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY291bnQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50UmVxdWVzdCA9IHN0b3JlLmNvdW50KCk7XG4gICAgICAgIGNvdW50UmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRSZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgICBsb2dnZXIubG9nKGBDb3VudGVkICR7cmVzdWx0fSBlbnRyaWVzYCk7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBjb3VudFJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRXJyb3IgY291bnRpbmcgZW50cmllczogXCIsIGNvdW50UmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXRDdXJzb3IoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnNvclJlcXVlc3QgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XG4gICAgICAgIGN1cnNvclJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgY3Vyc29yUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBnZXR0aW5nIGN1cnNvclwiLCBjdXJzb3JSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHBlcnNpc3RQcm9kdWN0SW5mbygpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJjaGVjay1leGlzdGluZy1wcm9kLWluZm9cIik7XG4gICAgY29uc3QgZXhpc3RpbmdQcm9kSW5mbyA9IGF3YWl0IHRoaXMuY291bnQoKTtcbiAgICBpZiAoZXhpc3RpbmdQcm9kSW5mbykge1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBmb3VuZFwiKTtcbiAgICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IHRoaXMuZ2V0Q3Vyc29yKCk7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBjdXJzb3IudmFsdWUudGltZXN0YW1wO1xuICAgICAgY29uc3QgZWxhcHNlZFNlY29uZHMgPSAoRGF0ZS5ub3coKSAvIDEwMDApIC0gdGltZXN0YW1wO1xuICAgICAgaWYgKGVsYXBzZWRTZWNvbmRzIDwgNzIwMCkgcmV0dXJuO1xuICAgICAgbG9nZ2VyLmxvZyhcIkV4aXN0aW5nIHByb2R1Y3QgaW5mbyBpcyBleHBpcmVkXCIpO1xuICAgIH1cbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGluZy1wcm9kLWluZm9cIik7XG4gICAgY29uc3QgcHJvZHVjdEluZm9Qcm9taXNlID0gZmV0Y2hQcm9kdWN0SW5mbygpO1xuICAgIGNvbnN0IGNsZWFyUHJvbWlzZSA9IHRoaXMuY2xlYXIoKTtcbiAgICBjb25zdCBbcHJvZHVjdEluZm9BcnJheV0gPSBhd2FpdCBQcm9taXNlLmFsbChbcHJvZHVjdEluZm9Qcm9taXNlLCBjbGVhclByb21pc2VdKTtcbiAgICBpZiAoIXByb2R1Y3RJbmZvQXJyYXkgfHwgIXByb2R1Y3RJbmZvQXJyYXkubGVuZ3RoKSByZXR1cm47XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC1wcm9kLWluZm9cIik7XG4gICAgYXdhaXQgdGhpcy5zYXZlKHRoaXMucHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwZXJzaXN0ZWQtcHJvZC1pbmZvXCIpO1xuICB9XG5cbiAgcHJlcGFyZVBheWxvYWRzKHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICBjb25zdCBwYXlsb2FkcyA9IFtdO1xuICAgIGNvbnN0IGZpZWxkTmFtZXMgPSBwcm9kdWN0SW5mb0FycmF5LnNoaWZ0KCk7XG4gICAgZmllbGROYW1lcy5zaGlmdCgpO1xuICAgIGZvciAoY29uc3QgaW5mbyBvZiBwcm9kdWN0SW5mb0FycmF5KSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0ge3NrdTogaW5mby5zaGlmdCgpfTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXlsb2FkW2ZpZWxkTmFtZXNbaV1dID0gaW5mb1tpXSB8fCAwO1xuICAgICAgfVxuICAgICAgcGF5bG9hZHMucHVzaChwYXlsb2FkKTtcbiAgICB9XG4gICAgcmV0dXJuIHBheWxvYWRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnk7XG4iLCJpbXBvcnQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSBmcm9tIFwiLi9pbmRleFwiO1xuXG5jb25zdCBTdG9yZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSgpO1xuICAgICAgICAvLyBIaWRlIHRoZSBjb25zdHJ1Y3RvciBzbyB0aGUgcmV0dXJuZWQgb2JqZWN0IGNhbid0IGJlIG5ldydkLi4uXG4gICAgICAgIGluc3RhbmNlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9LFxuICB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVByb2R1Y3RJbmZvQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUHJvZHVjdEluZm9SdWxlID0gYXN5bmMgKHJ1bGUpID0+e1xuICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcnVsZVwiLCBKU09OLnN0cmluZ2lmeShydWxlKSk7XG4gIGNvbnN0IHtvcGVyYXRvciwgY29uZGl0aW9uLCB2YWx1ZX0gPSBydWxlO1xuICBjb25zdCBza3VMaXN0ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgaWYgKCFza3VMaXN0IHx8ICh0eXBlb2Ygc2t1TGlzdCA9PT0gXCJvYmplY3RcIiAmJiAhT2JqZWN0LmtleXMoc2t1TGlzdCkubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuICBsZXQgcnVudGltZVZhbHVlID0gbnVsbDtcbiAgY29uc3Qgc2t1ID0gc2t1TGlzdFtPYmplY3Qua2V5cyhza3VMaXN0KVswXV0/LmlkO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgbG9nZ2VyLmxvZyhcIkdldHRpbmcgVHJhbnNhY3Rpb25Db3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0VHJhbnNhY3Rpb25Db3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJhZGRUb0NhcnRJbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBBZGRUb0NhcnRDb3VudCBmb3Igc2t1IFwiLCBza3UpO1xuICAgICAgcnVudGltZVZhbHVlID0gYXdhaXQgZ2V0QWRkVG9DYXJ0Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwicHJvZHVjdFZpZXdDb3VudFwiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBwcm9kdWN0Vmlld0NvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRQcmV2aWV3Q291bnQoc2t1KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcblxuY29uc3QgZ2V0VHJhbnNhY3Rpb25Db3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnNhbGVDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0QWRkVG9DYXJ0Q291bnQgPSBhc3luYyAoc2t1KSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoc2t1KTtcbiAgaWYgKHNrdSAmJiBwcm9kdWN0SW5mbykge1xuICAgIHJldHVybiBwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1O1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiY29uc3QgRV9USU1FT1VUID0gbmV3IEVycm9yKCd0aW1lb3V0IHdoaWxlIHdhaXRpbmcgZm9yIG11dGV4IHRvIGJlY29tZSBhdmFpbGFibGUnKTtcbmNvbnN0IEVfQUxSRUFEWV9MT0NLRUQgPSBuZXcgRXJyb3IoJ211dGV4IGFscmVhZHkgbG9ja2VkJyk7XG5jb25zdCBFX0NBTkNFTEVEID0gbmV3IEVycm9yKCdyZXF1ZXN0IGZvciBsb2NrIGNhbmNlbGVkJyk7XG5cbnZhciBfX2F3YWl0ZXIkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUsIF9jYW5jZWxFcnJvciA9IEVfQ0FOQ0VMRUQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHRoaXMuX2NhbmNlbEVycm9yID0gX2NhbmNlbEVycm9yO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnMgPSBbXTtcbiAgICB9XG4gICAgYWNxdWlyZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlc1t3ZWlnaHQgLSAxXS5wdXNoKHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0ID0gMSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbdmFsdWUsIHJlbGVhc2VdID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzTG9ja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPD0gMDtcbiAgICB9XG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgcmVsZWFzZSh3ZWlnaHQgPSAxKSB7XG4gICAgICAgIGlmICh3ZWlnaHQgPD0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcy5mb3JFYWNoKChxdWV1ZSkgPT4gcXVldWUuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LnJlamVjdCh0aGlzLl9jYW5jZWxFcnJvcikpKTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXMgPSBbXTtcbiAgICB9XG4gICAgX2Rpc3BhdGNoKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGZvciAobGV0IHdlaWdodCA9IHRoaXMuX3ZhbHVlOyB3ZWlnaHQgPiAwOyB3ZWlnaHQtLSkge1xuICAgICAgICAgICAgY29uc3QgcXVldWVFbnRyeSA9IChfYSA9IHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghcXVldWVFbnRyeSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzV2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgLT0gd2VpZ2h0O1xuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy5fdmFsdWUgKyAxO1xuICAgICAgICAgICAgcXVldWVFbnRyeS5yZXNvbHZlKFtwcmV2aW91c1ZhbHVlLCB0aGlzLl9uZXdSZWxlYXNlcihwcmV2aW91c1dlaWdodCldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICB9XG4gICAgX25ld1JlbGVhc2VyKHdlaWdodCkge1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2RyYWluVW5sb2NrV2FpdGVycygpIHtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXS5mb3JFYWNoKCh3YWl0ZXIpID0+IHdhaXRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgX19hd2FpdGVyJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNsYXNzIE11dGV4IHtcbiAgICBjb25zdHJ1Y3RvcihjYW5jZWxFcnJvcikge1xuICAgICAgICB0aGlzLl9zZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEsIGNhbmNlbEVycm9yKTtcbiAgICB9XG4gICAgYWNxdWlyZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQxKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgWywgcmVsZWFzZXJdID0geWllbGQgdGhpcy5fc2VtYXBob3JlLmFjcXVpcmUoKTtcbiAgICAgICAgICAgIHJldHVybiByZWxlYXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLnJ1bkV4Y2x1c2l2ZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS53YWl0Rm9yVW5sb2NrKCk7XG4gICAgfVxuICAgIHJlbGVhc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKSlcbiAgICAgICAgICAgIHRoaXMuX3NlbWFwaG9yZS5yZWxlYXNlKCk7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5jYW5jZWwoKTtcbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHdpdGhUaW1lb3V0KHN5bmMsIHRpbWVvdXQsIHRpbWVvdXRFcnJvciA9IEVfVElNRU9VVCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjcXVpcmU6ICh3ZWlnaHQpID0+IHtcbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgc3luYy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGVhc2UgPSBBcnJheS5pc0FycmF5KHRpY2tldCkgPyB0aWNrZXRbMV0gOiB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGlja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGxldCByZWxlYXNlID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIHRoaXMuYWNxdWlyZSh3ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWNrZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHRpY2tldFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlID0gdGlja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZSh3ZWlnaHQpIHtcbiAgICAgICAgICAgIHN5bmMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3luYy5jYW5jZWwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2FpdEZvclVubG9jazogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3luYy53YWl0Rm9yVW5sb2NrKHdlaWdodCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdCh0aW1lb3V0RXJyb3IpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogKCkgPT4gc3luYy5pc0xvY2tlZCgpLFxuICAgICAgICBnZXRWYWx1ZTogKCkgPT4gc3luYy5nZXRWYWx1ZSgpLFxuICAgICAgICBzZXRWYWx1ZTogKHZhbHVlKSA9PiBzeW5jLnNldFZhbHVlKHZhbHVlKSxcbiAgICB9O1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpc25lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIHRyeUFjcXVpcmUoc3luYywgYWxyZWFkeUFjcXVpcmVkRXJyb3IgPSBFX0FMUkVBRFlfTE9DS0VEKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICByZXR1cm4gd2l0aFRpbWVvdXQoc3luYywgMCwgYWxyZWFkeUFjcXVpcmVkRXJyb3IpO1xufVxuXG5leHBvcnQgeyBFX0FMUkVBRFlfTE9DS0VELCBFX0NBTkNFTEVELCBFX1RJTUVPVVQsIE11dGV4LCBTZW1hcGhvcmUsIHRyeUFjcXVpcmUsIHdpdGhUaW1lb3V0IH07XG4iLCJpbXBvcnQge2NoZWNrRGF0YUxheWVyUnVsZX0gZnJvbSBcIi4vZGF0YUxheWVyQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VsZW1lbnRSdWxlfSBmcm9tIFwiLi9lbGVtZW50Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0Z1bmN0aW9uUnVsZX0gZnJvbSBcIi4vZnVuY3Rpb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrU2Vzc2lvblJ1bGV9IGZyb20gXCIuL3Nlc3Npb25DaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrVXJsUnVsZX0gZnJvbSBcIi4vdXJsQ2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja0VudlJ1bGV9IGZyb20gXCIuL2VudkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tQcm9kdWN0SW5mb1J1bGV9IGZyb20gXCIuL3Byb2R1Y3RJbmZvQ2hlY2tlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2FkZERhdGFMaXN0ZW5lciwgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsIGdldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7TXV0ZXh9IGZyb20gXCJhc3luYy1tdXRleFwiO1xuaW1wb3J0IHtmZXRjaEVsaWdpYmlsaXR5UnVsZXN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVJ1bGVFbmdpbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2VsaWdpYmlsaXR5UnVsZXMsIGJhc2VSdWxlU2V0fSA9IGJvZHk7XG4gICAgdGhpcy5iYXNlUnVsZVNldCA9IGJhc2VSdWxlU2V0O1xuICAgIHRoaXMuZWxpZ2liaWxpdHlSdWxlcyA9IGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcnMgPSBbXTtcbiAgICB0aGlzLm11dGV4ID0gbmV3IE11dGV4KCk7XG4gIH1cblxuICBhc3luYyBjaGVja1J1bGVzKCkge1xuICAgIGZvciAoY29uc3QgcnVsZSBvZiB0aGlzLmJhc2VSdWxlU2V0KSB7XG4gICAgICBjb25zdCBydWxlU2F0aXNmaWVkID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICBpZiAoIXJ1bGVTYXRpc2ZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZShydWxlKSB7XG4gICAgY29uc3Qge2NoYWluLCBjaGFpbl9jb25kaXRpb24sIHR5cGV9ID0gcnVsZTtcbiAgICBsZXQgcnVsZVNhdGlzZmllZCA9IG51bGw7XG4gICAgLy8gY2hlY2sgcnVsZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInNlc3Npb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrU2Vzc2lvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVsZW1lbnRcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRWxlbWVudFJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tEYXRhTGF5ZXJSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrVXJsUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcnVsZVNhdGlzZmllZCA9IGNoZWNrRnVuY3Rpb25SdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlbnZpcm9ubWVudFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbnZSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gYXdhaXQgY2hlY2tQcm9kdWN0SW5mb1J1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgTm8gc3VjaCBydWxlIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNoYWluKSB7XG4gICAgICBzd2l0Y2ggKGNoYWluX2NvbmRpdGlvbikge1xuICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgcnVsZVNhdGlzZmllZCA9IHJ1bGVTYXRpc2ZpZWQgJiYgYXdhaXQgdGhpcy5jaGVja1J1bGUoY2hhaW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCB8fCBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAhPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk5vIHN1Y2ggY2hhaW4gY29uZGl0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZVNhdGlzZmllZDtcbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICBjb25zb2xlLnRpbWUoXCJnbC1hc3Nlc0VsaWdpYmlsaXR5UnVsZXNcIik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICAgIGZvciAoY29uc3QgW2tleSwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZWxpZ2liaWxpdHlSdWxlcykpIHtcbiAgICAgIGNvbnN0IHNhdGlzZmllZFJ1bGVJZHMgPSBbXTtcbiAgICAgIHRoaXMuc2V0VXBMaXN0ZW5lcnMoa2V5LCBydWxlcyk7XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpKSB7XG4gICAgICAgICAgc2F0aXNmaWVkUnVsZUlkcy5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgLy8gUGFnZSB0eXBlIHJ1bGVzIGFyZSBleGNsdXNpdmU7IGlmIG9uZSBpcyB0cnVlIGFsbCBvdGhlcnMgYXJlIGZhbHNlIGJ5IGRlZmF1bHQsIG5vIG5lZWQgdG8gYXNzZXNzIHRoZSByZXN0XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJQYWdlVHlwZVwiKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIHNhdGlzZmllZFJ1bGVJZHMpO1xuICAgIH1cbiAgICBjb25zb2xlLnRpbWVFbmQoXCJnbC1hc3Nlc0VsaWdpYmlsaXR5UnVsZXNcIik7XG4gIH1cblxuICBhc3luYyBhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKSB7XG4gICAgaWYgKCFrZXkgfHwgIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCByZWxlYXNlID0gYXdhaXQgdGhpcy5tdXRleC5hY3F1aXJlKCk7XG4gICAgbG9nZ2VyLmxvZyhgTG9jayBhY3F1aXJlZCBmb3Iga2V5ICR7a2V5fWApO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgY29uc3QgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKHJ1bGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCkgfHwgW107XG4gICAgICAgIGlmIChpc0VsaWdpYmxlKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuaW5jbHVkZXMocnVsZS5uYW1lKSkgY29udGludWU7XG4gICAgICAgICAgY3VycmVudC5wdXNoKHJ1bGUubmFtZSk7XG4gICAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGN1cnJlbnQpO1xuICAgICAgICAgIGlmIChrZXkgPT09IFwiUGFnZVR5cGVcIikgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIGZyb20gZWxpZ2libGUgcnVsZXNcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGN1cnJlbnQuZmlsdGVyKChrKSA9PiBrICE9PSBydWxlLm5hbWUpO1xuICAgICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gLCBmaWx0ZXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGFzc2Vzc2luZyBydWxlcyBmb3Iga2V5OiAke2tleX0gLSAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2dnZXIubG9nKGBSZWxlYXNpbmcgbG9jayBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgIHJlbGVhc2UoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKSB7XG4gICAgY29uc3Qge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9ID0gdGhpcy5leHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMpO1xuICAgIGZvciAoY29uc3QgW29wZXJhdG9yLCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXMoZGF0YUxheWVyUnVsZXMpKSB7XG4gICAgICBjb25zdCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrID0gdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjay5iaW5kKHRoaXMsIGtleSwgcnVsZXMpO1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKG9wZXJhdG9yLCBib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhlbGVtZW50UnVsZXMpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbkxpc3QpID0+IHtcbiAgICAgICAgbGV0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb25SZWNvcmQgb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgbm9kZXMgPSBbLi4ubm9kZXMsIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQuYWRkZWROb2RlcyksIC4uLkFycmF5LmZyb20obXV0YXRpb25SZWNvcmQucmVtb3ZlZE5vZGVzKV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXhjbHVkZSBtdXRhdGlvbnMgdGhhdCBvbmx5IHVwZGF0ZSB0ZXh0XG4gICAgICAgIGlmIChub2Rlcy5ldmVyeSgobikgPT4gbi50YWdOYW1lID09PSB1bmRlZmluZWQpKSByZXR1cm47XG4gICAgICAgIHRoaXMuYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2soa2V5LCBydWxlcyk7XG4gICAgICB9KTtcbiAgICAgIGxldCBlbGVtZW50VG9PYnNlcnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICBlbGVtZW50VG9PYnNlcnZlID0gZWxlbWVudFRvT2JzZXJ2ZSA/IGVsZW1lbnRUb09ic2VydmUucGFyZW50Tm9kZSA6IGRvY3VtZW50LmJvZHk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnRUb09ic2VydmUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICBleHRyYWN0UnVsZUF0dHJpYnV0ZXMocnVsZXMsIGRhdGFMYXllclJ1bGVzID0ge30sIGVsZW1lbnRSdWxlcyA9IHt9KSB7XG4gICAgaWYgKCFydWxlcyB8fCAhcnVsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICBjb25zdCB7dHlwZX0gPSBydWxlO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkYXRhTGF5ZXJcIjpcbiAgICAgICAgICBpZiAoIWRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdKSB7XG4gICAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhTGF5ZXJSdWxlc1tydWxlLm9wZXJhdG9yXS5wdXNoKHJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICAgIGlmICghZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3IgfHwgcnVsZS5zZWxlY3RvckFsbF0pIHtcbiAgICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGxdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnRSdWxlc1tydWxlLnNlbGVjdG9yIHx8IHJ1bGUuc2VsZWN0b3JBbGxdLnB1c2gocnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAocnVsZS5jaGFpbikge1xuICAgICAgICB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhbcnVsZS5jaGFpbl0sIGRhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge2RhdGFMYXllclJ1bGVzLCBlbGVtZW50UnVsZXN9O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEVsaWdpYmlsaXR5UnVsZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBlbGlnaWJpbGl0eVJ1bGVzID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMpO1xuICAgICAgaWYgKGVsaWdpYmlsaXR5UnVsZXMpIHJldHVybiBKU09OLnBhcnNlKGVsaWdpYmlsaXR5UnVsZXMpO1xuICAgICAgZWxpZ2liaWxpdHlSdWxlcyA9IGF3YWl0IGZldGNoRWxpZ2liaWxpdHlSdWxlcygpO1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuRUxJR0lCSUxJVFlfUlVMRVMsIEpTT04uc3RyaW5naWZ5KGVsaWdpYmlsaXR5UnVsZXMpKTtcbiAgICAgIHJldHVybiBlbGlnaWJpbGl0eVJ1bGVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBnZXQgZWxpZ2liaWxpdHkgcnVsZXM6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7YWRkVG9CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlNlZ21lbnRhdGlvbkNvbXB1dGVyXCIpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcHV0ZVNlZ21lbnQodHJlYXRtZW50V2VpZ2h0cykge1xuICBsb2dnZXIubG9nKFwiRGV0ZXJtaW5pbmcgdXNlciBzZWdtZW50XCIpO1xuICB0cnkge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBPYmplY3Qua2V5cyh0cmVhdG1lbnRXZWlnaHRzKSkge1xuICAgICAgY29uc3QgcnVsZVNldCA9IHRyZWF0bWVudFdlaWdodHNbc2VnbWVudF0/LnJ1bGVTZXQ7XG4gICAgICBpZiAoIXJ1bGVTZXQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qgc2VnbWVudFJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7YmFzZVJ1bGVTZXQ6IHJ1bGVTZXQsIGJ1c2luZXNzUnVsZVNldDogW119KTtcbiAgICAgIGlmIChhd2FpdCBzZWdtZW50UnVsZUVuZ2luZS5jaGVja1J1bGVzKCkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgVXNlciBzZWdtZW50IG1hdGNoZWQ6ICR7c2VnbWVudH1gKTtcbiAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIHNlZ21lbnQpO1xuICAgICAgICByZXR1cm4gc2VnbWVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLmxvZyhcIlVzZXIgc2VnbWVudCBub3QgbWF0Y2hlZCwgcmV0dXJuaW5nIGRlZmF1bHRcIik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzXCIsIFwiZGVmYXVsdFwiKTtcbiAgICByZXR1cm4gXCJkZWZhdWx0XCI7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY29tcHV0ZSB1c2VyIHNlZ21lbnRcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVMsIFRSRUFUTUVOVFNfRFVSQVRJT059IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7ZmV0Y2hUcmVhdG1lbnRzLCBmZXRjaFRyZWF0bWVudFdlaWdodHN9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtjb21wdXRlU2VnbWVudH0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5XCIpO1xuXG5jbGFzcyBUcmVhdG1lbnRSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoYm9keSkge1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IGJvZHk7XG4gICAgdGhpcy50cmVhdG1lbnRzID0gdHJlYXRtZW50cztcblxuICAgIHRoaXMudHJlYXRtZW50V2VpZ2h0cyA9IHRyZWF0bWVudFdlaWdodHM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0VHJlYXRtZW50cygpIHtcbiAgICBsb2dnZXIubG9nKFwiTG9hZGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHtUUkVBVE1FTlRTfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuICAgIGNvbnN0IHRyZWF0bWVudHNPYmogPSBKU09OLnBhcnNlKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFRSRUFUTUVOVFMpKTtcbiAgICBsZXQgdHJlYXRtZW50cyA9IHRyZWF0bWVudHNPYmo/LnRyZWF0bWVudHM7XG4gICAgY29uc3QgdGltZXN0YW1wID0gdHJlYXRtZW50c09iaj8udGltZXN0YW1wO1xuICAgIGlmICghdHJlYXRtZW50cyB8fCAhdGltZXN0YW1wKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBub3QgZm91bmQgaW4gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgIGlmICghdHJlYXRtZW50cykge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHNcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB0cmVhdG1lbnRzLFxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICAgIH1cbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbGFwc2VkRGF5cyA9IChEYXRlLm5vdygpIC0gdGltZXN0YW1wKSAvICgxMDAwICogMzYwMCAqIDI0KTtcbiAgICAgIGlmIChlbGFwc2VkRGF5cyA+IFRSRUFUTUVOVFNfRFVSQVRJT04pIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudHMgYXJlIGV4cGlyZWRcIik7XG4gICAgICAgIHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFRyZWF0bWVudHMoKTtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB0cmVhdG1lbnRzXCIpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyZWF0bWVudFdpdGhUaW1lc3RhbXAgPSB7XG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgIHRyZWF0bWVudHMsXG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRSRUFUTUVOVFMsIEpTT04uc3RyaW5naWZ5KHRyZWF0bWVudFdpdGhUaW1lc3RhbXApKTtcbiAgICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5zdWNjZXNzKFwiVHJlYXRtZW50cyBhcmUgbG9hZGVkIGZyb20gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRXZWlnaHRzKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VpZ2h0cyA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLldFSUdIVFMpO1xuICAgICAgaWYgKHdlaWdodHMpIHJldHVybiBKU09OLnBhcnNlKHdlaWdodHMpO1xuICAgICAgd2VpZ2h0cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50V2VpZ2h0cygpO1xuICAgICAgaWYgKCF3ZWlnaHRzKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggd2VpZ2h0c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5XRUlHSFRTLCBKU09OLnN0cmluZ2lmeSh3ZWlnaHRzKSk7XG4gICAgICByZXR1cm4gd2VpZ2h0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hdGNoZWRUcmVhdG1lbnRzKCkge1xuICAgIGNvbnN0IHt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzfSA9IHRoaXM7XG4gICAgY29uc3QgdXNlclNlZ21lbnQgPSBhd2FpdCBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKTtcbiAgICBpZiAoIXVzZXJTZWdtZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodHJlYXRtZW50V2VpZ2h0cykge1xuICAgICAgY29uc3QgdXNlclNlZ21lbnRXZWlnaHRzID0gKHVzZXJTZWdtZW50ICYmIHRyZWF0bWVudFdlaWdodHNbdXNlclNlZ21lbnRdKSA/XG4gICAgICB0cmVhdG1lbnRXZWlnaHRzW3VzZXJTZWdtZW50XSA6IHRyZWF0bWVudFdlaWdodHNbXCJkZWZhdWx0XCJdO1xuICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgdHJlYXRtZW50cykge1xuICAgICAgICB0cmVhdG1lbnQud2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudD8uaWRdPy53ZWlnaHQgfHwgMDtcbiAgICAgICAgaWYgKCF0cmVhdG1lbnQuYWN0aW9ucy5zb21lKChhKSA9PiBhLnZhcmlhbnRzKSkgY29udGludWU7XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIHRyZWF0bWVudC5hY3Rpb25zKSB7XG4gICAgICAgICAgaWYgKCFhY3Rpb24udmFyaWFudHMpIGNvbnRpbnVlO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFudEtleSBvZiBPYmplY3Qua2V5cyhhY3Rpb24udmFyaWFudHMpKSB7XG4gICAgICAgICAgICBpZiAodXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzICYmIHVzZXJTZWdtZW50V2VpZ2h0c1t0cmVhdG1lbnQuaWRdPy52YXJpYW50c1t2YXJpYW50S2V5XSkge1xuICAgICAgICAgICAgICBhY3Rpb24udmFyaWFudHNbdmFyaWFudEtleV0ud2VpZ2h0ID0gdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0udmFyaWFudHNbdmFyaWFudEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhgJHt0cmVhdG1lbnRzLmxlbmd0aH0gdHJlYXRtZW50cyB1c2VyIHNlZ21lbnQgbWF0Y2hlZGApO1xuICAgIGlmICghdHJlYXRtZW50cy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmVhdG1lbnRSZXBvc2l0b3J5O1xuIiwiaW1wb3J0IHtyZXBsYWNlQWxsfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJSZXBsYWNlVXRpbHNcIik7XG5cbmNvbnN0IHJlcGxhY2VyID0gYXN5bmMgKHZhbHVlLCByZXBsYWNlRm4pID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBbaSwgdmFsXSBvZiB2YWx1ZS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBsYWNlRm4gPSBBcnJheS5pc0FycmF5KHJlcGxhY2VGbikgPyByZXBsYWNlRm5baV0gOiByZXBsYWNlRm4gfHwgXCJcIjtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihjdXJyZW50UmVwbGFjZUZuKTtcbiAgICAgICAgdmFsdWVbaV0gPSByZXBsYWNlQWxsKHZhbCwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZVtpXSA9IHJlcGxhY2VGbkV4ZWN1dG9yKGN1cnJlbnRSZXBsYWNlRm4sIHZhbCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSkge1xuICAgIGZvciAoY29uc3QgckZuIG9mIHJlcGxhY2VGbikge1xuICAgICAgaWYgKHR5cGVvZiByRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IockZuKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyRm4sIHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlRm4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKHJlcGxhY2VGbik7XG4gICAgICB2YWx1ZSA9IHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZVZhbCk7XG4gICAgfSBlbHNlIHZhbHVlID0gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gcmVwbGFjZUZuRXhlY3V0b3IocmVwbGFjZUZuLCB2YWx1ZSwgc2luZ2xlID0gZmFsc2UpIHtcbiAgaWYgKHJlcGxhY2VGbiAmJiB2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkV4ZWN1dGluZyByZXBsYWNlIGZ1bmN0aW9uOiBcIiwgcmVwbGFjZUZuKTtcbiAgICBjb25zdCByZXBsYWNlRnVuY3Rpb24gPSBGdW5jdGlvbihyZXBsYWNlRm4pO1xuICAgIGlmIChzaW5nbGUpIHJldHVybiB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICAgIHJldHVybiByZXBsYWNlQWxsKHZhbHVlLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VGdW5jdGlvbigpKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKSB7XG4gIGNvbnN0IHtzdG9yYWdlLCBrZXksIGtleUZhbGxiYWNrLCB0eXBlfSA9IHJlcGxhY2VGbjtcbiAgc3dpdGNoIChzdG9yYWdlKSB7XG4gICAgY2FzZSBcInNlc3Npb25cIjoge1xuICAgICAgbGV0IHJlcGxhY2VWYWwgPSBudWxsO1xuICAgICAgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAoIXJlcGxhY2VWYWwpIHJlcGxhY2VWYWwgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlGYWxsYmFjayk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSBKU09OLnBhcnNlKHJlcGxhY2VWYWwpO1xuICAgICAgICAgIHJlcGxhY2VWYWwgPSByZXBsYWNlVmFsW3JlcGxhY2VWYWwubGVuZ3RoIC0gMV1bdHlwZV07XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkIG5vdCBwYXJzZSAke3JlcGxhY2VWYWx9YCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlVmFsO1xuICAgIH1cbiAgICBjYXNlIFwiaW5mby1sYXllclwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5RmFsbGJhY2spO1xuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VyO1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQWN0aW9uQ29uZGl0aW9uVXRpbHNcIik7XG5cbmNvbnN0IGNoZWNrQWN0aW9uQ29uZGl0aW9uID0gYXN5bmMgKGNvbmRpdGlvbikgPT4ge1xuICBsb2dnZXIubG9nKFwiQWN0aW9uIGNvbmRpdGlvbiBmb3VuZDogXCIsIGNvbmRpdGlvbik7XG4gIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBbXTtcbiAgY29uc3Qge2F0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCBvcGVyYXRvciwgc2VsZWN0b3IsIHR5cGUsIHZhbHVlLCBjaGFpbn0gPSBjb25kaXRpb247XG4gIGNvbnN0IGNvbmRpdGlvbkVsZW1lbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbmRpdGlvbkVsZW1lbnRzKSB7XG4gICAgaWYgKGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgdHlwZSwgb3BlcmF0b3IsIGF0dHJpYnV0ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSwgY2hhaW4pKSB7XG4gICAgICBlbGlnaWJsZUVsZW1lbnRzLnB1c2goJChlbGVtZW50KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGlnaWJsZUVsZW1lbnRzO1xufTtcblxuY29uc3QgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciA9IGFzeW5jIChlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicHJvZHVjdEluZm9Mb29rdXBcIjoge1xuICAgICAgY29uc3QgZWxlbWVudFNrdSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KGVsZW1lbnRTa3UpO1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcHJvZHVjdEluZm8/LltvcGVyYXRvcl07XG4gICAgICAvLyBydW5UaW1lVmFsdWUgbWF5IGJlIDBcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHwgcnVuVGltZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlByb2R1Y3QgaW5mbyBpcyBlbXB0eVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDoge1xuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGlmICghY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoY2hhaW4pIHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCBjaGFpbi50eXBlLCBjaGFpbi5vcGVyYXRvcixcbiAgICAgICAgICAgIGNoYWluLmF0dHJpYnV0ZSwgY2hhaW4uaW5uZXJfY29uZGl0aW9uLCBjaGFpbi52YWx1ZSwgY2hhaW4uY2hhaW4pO1xuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrQWN0aW9uQ29uZGl0aW9uO1xuIiwiaW1wb3J0IHtzdHlsZUFwcGxpY2F0b3IsIGRlbGF5LCBpZGxlVGltZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtyZXBsYWNlQWxsLCB0dXJraXNoVG9Mb3dlcn0gZnJvbSBcIi4uL3N0cmluZ1V0aWxzXCI7XG5pbXBvcnQge01PQklMRV9NRURJQV9RVUVSWSwgU0VTU0lPTl9TVE9SQUdFX0tFWVMsIElETEVfVElNRU9VVH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHJlcGxhY2VyIGZyb20gXCIuL3JlcGxhY2UtdXRpbHNcIjtcbmltcG9ydCBjaGVja0FjdGlvbkNvbmRpdGlvbiBmcm9tIFwiLi9hY3Rpb24tY29uZGl0aW9uLXV0aWxcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb25zKGFjdGlvbnMpIHtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUFwcGx5QWN0aW9uc1wiKTtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBR30gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCB0cmFuc2Zvcm1lciA9IGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgYWN0aW9uOiBcIiwgSlNPTi5zdHJpbmdpZnkoYWN0aW9uKSk7XG4gICAgY29uc3Qge1xuICAgICAgb3BlcmF0b3IsXG4gICAgICB0eXBlLFxuICAgICAgYXBwbHlFdmVudCxcbiAgICAgIGNvbnRlbnRTZWxlY3RvcixcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3JGYWxsYmFjayxcbiAgICAgIG1kQ29uZGl0aW9uLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8xLFxuICAgICAgbW92ZV9zZWxlY3Rvcl8yLFxuICAgICAgcmVwbGFjZUZuLFxuICAgICAgcFR5cGUsXG4gICAgICBhdHRyaWJ1dGUsXG4gICAgICBwcm9kdWN0SW5mb1N0b3JhZ2UsXG4gICAgfSA9IGFjdGlvbjtcbiAgICBpZiAob3BlcmF0b3IgPT09IFwibm9vcFwiKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm9vcCBPcGVyYXRvcjogTm8gb3BlcmF0aW9uIGlzIGFwcGxpZWQgb24gdGFyZ2V0IFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQge3ZhbHVlfSA9IGFjdGlvbjtcbiAgICAvLyBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCB0byB0cmFuc2Zvcm1lciwgc2VsZWN0b3IgaXMgcmVsYXRpdmUgdG8gcGFzc2VkIGVsZW1lbnRcbiAgICBlbGVtZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZmluZChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1jID0gbWRDb25kaXRpb24gPyB3aW5kb3cubWF0Y2hNZWRpYShtZENvbmRpdGlvbikubWF0Y2hlcyA6IHRydWU7XG4gICAgaWYgKCFtYykge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIk1lZGlhIGNvbmRpdGlvbiBtaXNtYXRjaDogXCIsIG1kQ29uZGl0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMSAmJiAhbW92ZV9zZWxlY3Rvcl8yKSB8fFxuICAgICAgKG1vdmVfc2VsZWN0b3JfMiAmJiAhbW92ZV9zZWxlY3Rvcl8xKVxuICAgICkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIkJvdGggbW92ZSBzZWxlY3RvcnMgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobW92ZV9zZWxlY3Rvcl8xICYmIG1vdmVfc2VsZWN0b3JfMikge1xuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDEgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEkKG1vdmVfc2VsZWN0b3JfMikubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJNb3ZlIHNlbGVjdG9yIDIgbm90IGZvdW5kOiBcIiwgbW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IHNwZWNpZmllZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoISQoc2VsZWN0b3JGYWxsYmFjaykubGVuZ3RoICYmIG9wZXJhdG9yID09PSBcInJlbW92ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBcIm5vLXNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kOiBcIiwgc2VsZWN0b3IpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJUcnlpbmcgZmFsbGJhY2sgc2VsZWN0b3I6IFwiLCBzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoc2VsZWN0b3JGYWxsYmFjaykgZWxlbWVudCA9ICQoc2VsZWN0b3JGYWxsYmFjayk7XG4gICAgICAgICAgaWYgKCFlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhbGxiYWNrIHNlbGVjdG9yIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZUZuKSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHJlcGxhY2VyKHZhbHVlLCByZXBsYWNlRm4pO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVtb3Zpbmc6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgbG9nZ2VyLmxvZyhcIkNhbm5vdCBmb3VuZCBlbGVtZW50IHdpdGggc2VsZWN0b3I6IFwiLCBzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGJlZm9yZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBpZiAoU3RyaW5nKHZhbHVlKS5pbmNsdWRlcyhcIm5kLWFkZC10by13aW5cIikpIHtcbiAgICAgICAgICAgICQoXCIubmQtYWRkLXRvLXdpblwiKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5iZWZvcmUodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWZ0ZXJcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiSW5zZXJ0aW5nIGFmdGVyOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYWZ0ZXIodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXBwZW5kXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGVuZGluZyB2YWx1ZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb2RhbFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIGlmIChlbG0gPT0gZS50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3BsYXlNb2RhbCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBvcHVwXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHKSkgIT09IDApIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlBvcHVwIGFscmVhZHkgZGlzcGxheWVkIGluIHNlc3Npb25cIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIFBvcHVwOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHBUeXBlKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gYXdhaXQgZ2V0UHJvZHVjdEluZm8ocFR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImV4aXRJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBleGl0IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbciwgZF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiclwiLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiAhci5pbmNsdWRlcyhkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IFwiYmdfbGltYm9cIikgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiYmdfbGltYm9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlkbGVUaW1lcihJRExFX1RJTUVPVVQsIGRpc3BsYXlQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImNvcHlJbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFkZGluZyBjb3B5IGludGVudCBsaXN0ZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFwcGVuZCBwb3B1cCB0byBib2R5IGFmdGVyIHRpbWVvdXQgZXhwaXJlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYFR5cGU6ICR7dHlwZX0gbm90IGZvdW5kIGZvciBvcGVyYXRvcjogJHtvcGVyYXRvcn1gKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImVkaXRcIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgdGV4dDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50LnRleHQodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJFZGl0aW5nIGh0bWw6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0eWxlQXBwbGljYXRvclwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBzdHlsZTogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlQ2hhbmdlc01hcCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlN0eWxlIENoYW5nZXMgTWFwOiBcIiwgc3R5bGVDaGFuZ2VzTWFwKTtcbiAgICAgICAgICAgIHN0eWxlQXBwbGljYXRvcihlbGVtZW50LCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFkZENsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgYWRkZGluZyBjbGFzcyB0byAke2VsZW1lbnR9IG5hbWVkICR7dmFsdWV9YCk7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVDbGFzc1wiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYHJlbW92ZSBjbGFzcyBmcm9tICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvY3VtZW50VGl0bGVcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBjaGFuZ2luZyBkb2N1bWVudCB0aXRsZSBmcm9tICR7ZWxlbWVudH0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgICBpZiAoYXBwbHlFdmVudCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCA9PSBcInRhYkNoYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcImNhdGNoaW5nIGV2ZW50IHRhYmNoYW5nZS4uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGl0bGUgPSB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGUsIHZhbHVlLCBvcmlnaW5hbFRpdGxlKTtcbiAgICAgICAgICAgICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVua25vd24gZWRpdCB0eXBlOiBcIiwgdHlwZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJzZXRhdHRyaWJ1dGVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlNldHRpbmcgYXR0cmlidXRlOiBcIiwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgICBjYXNlIFwic3JjXCI6XG4gICAgICAgICAgZWxlbWVudC5jc3MoXCJjb250ZW50XCIsIGB1cmwoJHt2YWx1ZS50cmltKCl9KWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHZhbHVlLnNwbGl0KFwiOlwiKVswXS50cmltKCk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgICAgY29uc3QgcHJvcGVydHlWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG5cbiAgICAgICAgICBlbGVtZW50LmNzcyhwcm9wZXJ0eSwgcHJvcGVydHlWYWx1ZSwgXCIhaW1wb3J0YW50XCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEZ1bmN0aW9uKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJVbmhhbmRsZWQgYXR0cmlidXRlOiBTZXR0aW5nIGF0dHJpYnV0ZTogXCIsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwicmVwbGFjZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nOiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5yZXBsYWNlQWxsKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInN3YXBcIikge1xuICAgICAgbG9nZ2VyLmxvZyhcIlN3YXBwaW5nOiBcIiwgbW92ZV9zZWxlY3Rvcl8xLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgY29uc3QgbjEgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IG4yID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzd2FwTm9kZXMobjEsIG4yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluamVjdHNjcmlwdFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW5qZWN0aW5nIHNjcmlwdDogXCIsIHZhbHVlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kKGA8c2NyaXB0PiR7dmFsdWV9PC9zY3JpcHQ+YCk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJtb3ZlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coYE1vdmluZyAke21vdmVfc2VsZWN0b3JfMX0gdG8gJHttb3ZlX3NlbGVjdG9yXzJ9YCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8xKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBzb3VyY2UucmVtb3ZlKCk7XG4gICAgICBkZXN0aW5hdGlvbi5wcmVwZW5kKHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJwcm9kdWN0SW5mb0xvb2t1cFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICBlbGVtZW50LmJlZm9yZShyZXMpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwidGV4dC10cmFuc2Zvcm1cIikge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgQXJyYXkuZnJvbShlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJUZXh0Py5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICBlLmlubmVyVGV4dCA9IHR1cmtpc2hUb0xvd2VyKGUuaW5uZXJUZXh0KS5zcGxpdChcIlxcblwiKS5tYXAoKHNlbnRlbmNlKSA9PlxuICAgICAgICAgICAgICAgIHNlbnRlbmNlLnNwbGl0KFwiIFwiKS5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBvcGVyYXRvciBleGlzdHMgeWV0XCIsIG9wZXJhdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVwbGFjZVdpdGhWYWwgPSAodmFsdWUsIGh0bWxTdHIpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgaHRtbFN0ci5pbmNsdWRlcyhcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIpKSB7XG4gICAgICBodG1sU3RyID0gcmVwbGFjZUFsbChodG1sU3RyLCBcInt7UkVQTEFDRV9QUk9EVUNUSU5GT319XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxTdHI7XG4gIH07XG4gIGNvbnN0IGdldFByb2R1Y3RJbmZvID0gYXN5bmMgKHR5cGUsIHZhbHVlLCBwcm9kdWN0SW5mb1N0b3JhZ2UpID0+IHtcbiAgICAvLyBnZXQga2V5cyBvZiBwcm9kdWN0SW5mb1xuICAgIGNvbnN0IHNrdUxpc3QgPSBwcm9kdWN0SW5mb1N0b3JhZ2UgPT09IFwiYmFza2V0XCIgP1xuICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2ZlYXR1cmVzLlNLVXNvbkxhc3RDYXJ0Vmlld1wiLCB0cnVlKSA6XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBpZiAoIXNrdUxpc3QgfHwgc2t1TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyBza3UgZm91bmRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3VMaXN0WzBdKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0cmFuc2FjdGlvbkluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgdHJhbnNjYXRpb25JbjJXZWVrcyBcIiwgcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNS50b1N0cmluZygpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpLCB2YWx1ZSk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmcgQWRkVG9DYXJ0Q291bnQgXCIsIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgICAgcmVzID0gcmVwbGFjZVdpdGhWYWwocHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBwcm9kdWN0Vmlld0NvdW50IGZvclwiLCBwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJubyBzdWNoIHR5cGUgZm91bmQgZm9yIHByb2R1Y3RJbmZvTG9va3VwIG9wZXJhdG9yOiBcIisgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIGNvbnN0IGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UgPSBhc3luYyAoZXZlbnQsIHRpdGxlcywgb3JpZ2luYWxUaXRsZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFRpdGxlcyA9ICFBcnJheS5pc0FycmF5KHRpdGxlcykgPyBbdGl0bGVzXSA6IHRpdGxlcztcbiAgICBmb3IgKGNvbnN0IHBhcnNlZFRpdGxlIG9mIHBhcnNlZFRpdGxlcykge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBwYXJzZWRUaXRsZTtcbiAgICAgICAgYXdhaXQgZGVsYXkoMjAwMCk7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICB3aW5kb3cudG9wLmRvY3VtZW50LnRpdGxlID0gb3JpZ2luYWxUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZShldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgIGlmIChpZCAmJiBpZCA9PT0gXCJuZC1wb3B1cF9fd3JhcHBlclwiKSB7XG4gICAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKFwibmQtbW9kYWxfX3dyYXBwZXJcIikpIHtcbiAgICAgICQoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuaGlkZSgpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQb3B1cCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSA+IDApIHJldHVybjtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRywgMSk7XG4gICAgY29uc3QgcVBvcHVwID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dydC1zaGFkb3ctaG9zdFwiKTtcbiAgICBpZiAocVBvcHVwKSBxUG9wdXAuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5kLXBvcHVwX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG5cbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgZGlzcGxheVBvcHVwLCB7XG4gICAgICBvbmNlOiB0cnVlLFxuICAgIH0pO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZGlzcGxheVBvcHVwKTtcbiAgICB3aW5kb3cudG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9LCAxNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheU1vZGFsID0gKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpID0+IHtcbiAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHJldHVybjtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZC1tb2RhbF9fd3JhcHBlclwiKSkgY3JlYXRlUG9wdXAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgdHJ1ZSk7XG4gICAgd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiYmxvY2tcIjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvciwgaXNNb2RhbD1mYWxzZSkgPT4ge1xuICAgIC8vIENyZWF0ZSBwb3B1cCB3cmFwcGVyXG4gICAgY29uc3QgcG9wdXBXcmFwcGVyID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1wb3B1cF9fd3JhcHBlclwiKTtcbiAgICBpZiAoaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJuZC1tb2RhbF9fd3JhcHBlclwiKTtcbiAgICBpZiAoIWlzTW9kYWwpIHBvcHVwV3JhcHBlci5pZCA9IFwibmQtcG9wdXBfX3dyYXBwZXJcIjtcblxuICAgIC8vIENyZWF0ZSBwb3B1cCBjbG9zZSBidXR0b25cbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b25TdHlsZSA9IGlzTW9kYWwgPyBcIm5kLXBvcHVwX19idXR0b24tY2xvc2VfX2NvbG9yZWRcIiA6IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZVwiO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChwb3B1cENsb3NlQnV0dG9uU3R5bGUpO1xuICAgIHBvcHVwQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG4gICAgaWYgKGlzTW9kYWwpIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3B1cENsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gQXJyYXkuZnJvbSh3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGVudFNlbGVjdG9yKSk7XG4gICAgICB3aGlsZSAodmFsdWUuaW5jbHVkZXMoXCJ7e1JFUExBQ0V9fVwiKSAmJiBjb250ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInt7UkVQTEFDRX19XCIsIGNvbnRlbnRzLnNoaWZ0KCkuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcG9wdXAgZnJvbSBhY3Rpb24gYW5kIGFwcGVuZCBjbG9zZSBidXR0b25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBwb3B1cCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cENsb3NlQnV0dG9uKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBwb3B1cCBpZiBleGlzdHMgYmVmb3JlIGFwcGVuZGluZyBuZXcgb25lXG4gICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2FwTm9kZXMgPSBmdW5jdGlvbiBzd2FwTm9kZXMobjEsIG4yKSB7XG4gICAgY29uc3QgcDEgPSBuMS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHAyID0gbjIucGFyZW50Tm9kZTtcbiAgICBsZXQgaTE7XG4gICAgbGV0IGkyO1xuXG4gICAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAxLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4xKSkge1xuICAgICAgICBpMSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcbiAgICAgICAgaTIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwMS5pc0VxdWFsTm9kZShwMikgJiYgaTEgPCBpMikge1xuICAgICAgaTIrKztcbiAgICB9XG4gICAgcDEuaW5zZXJ0QmVmb3JlKG4yLCBwMS5jaGlsZHJlbltpMV0pO1xuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcbiAgfTtcblxuICBjb25zdCB3YWl0Rm9ySlF1ZXJ5ID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJqUXVlcnkgbm90IGZvdW5kLCByZXRyeWluZ1wiKTtcbiAgICAgICAgY29uc3QgalF1ZXJ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDI1KTtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGpRdWVyeUludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25BcHBsaWNhdG9yID0gYXN5bmMgKGFjdGlvbnMpID0+IHtcbiAgICBpZiAoYXdhaXQgd2FpdEZvckpRdWVyeSgpKSB7XG4gICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3Rpb24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBlbGlnaWJsZUVsZW1lbnRzID0gYXdhaXQgY2hlY2tBY3Rpb25Db25kaXRpb24oYWN0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxpZ2libGVFbGVtZW50cykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24sIGVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBhd2FpdCB0cmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKGBDb3VsZG4ndCBhcHBseSBhY3Rpb24gJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfSB3aXRoIGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiSnF1ZXJ5IG5vdCBmb3VuZCBvbiB3aW5kb3dcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFwcGx5IGFjdGlvbnNcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWN0aW9uQXBwbGljYXRvcihhY3Rpb25zKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5QWN0aW9ucztcbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IGFwcGx5QWN0aW9ucyBmcm9tIFwiLi4vQmVhZ2xlQXBwbHlBY3Rpb25zL2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUcmVhdG1lbnQsXG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZERhdGFMaXN0ZW5lcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgVFJFQVRNRU5UX1JBVElPLFxuICBNT0JJTEVfTUVESUFfUVVFUlksXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGRldGVybWluZVBjdCxcbiAgcHJlcGFyZUFjdGlvbnMsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUm9ib3RFbmdpbmVcIik7XG5jb25zdCBPQlNFUlZFUl9DT05GSUcgPSB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ib3RFbmdpbmUge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge2RlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLCBkZWJ1Z01vZGUsIG1hdGNoZWRUcmVhdG1lbnRzLCBpZGVudGlmaWVyLCBwYWdlVHlwZX0gPSBib2R5O1xuICAgIHRoaXMuZW5nYWdlbWVudExvY2sgPSB7fTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLnJlQXBwbHlUcmVhdG1lbnRzTWFwID0ge307XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcyA9IFtdO1xuICAgIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cztcbiAgICB0aGlzLmRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gZGVidWdGaWx0ZXJlZFRyZWF0bWVudHM7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcztcbiAgfVxuXG4gIGFzeW5jIGVuZ2FnZVJvYm90cygpIHtcbiAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0aGlzLm1hdGNoZWRUcmVhdG1lbnRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgZW5nYWdpbmcgcm9ib3QgJHt0cmVhdG1lbnQuaWR9OiAke2Vyci5tZXNzYWdlIHx8IGVycn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3QodHJlYXRtZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgZWxpZ2liaWxpdHlSdWxlU2V0LFxuICAgICAgZGV2aWNlLFxuICAgICAgZGVwZW5kYW50X29uX3RyZWF0bWVudCxcbiAgICAgIHJlYXBwbHlfZXZlbnQsXG4gICAgICByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSxcbiAgICAgIGJ1c2luZXNzUnVsZVNldCxcbiAgICAgIHdlaWdodCxcbiAgICAgIGRlbGF5LFxuICAgIH0gPSB0cmVhdG1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgZGVidWdNb2RlLFxuICAgICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgICBlbmdhZ2VtZW50TG9jayxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBpc01vYmlsZSxcbiAgICAgIHJlQXBwbHlUcmVhdG1lbnRzTWFwLFxuICAgICAgbWF0Y2hlZFRyZWF0bWVudHMsXG4gICAgICBwYWdlVHlwZSxcbiAgICAgIHByZXBhcmVBbmRBcHBseSxcbiAgICB9ID0gdGhpcztcblxuICAgIC8vIG9uZSBlbmdhZ2VtZW50IGF0IGEgdGltZVxuICAgIGlmIChlbmdhZ2VtZW50TG9ja1tpZF0pIHtcbiAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBlbmdhZ2VtZW50IGluIHByb2dyZXNzLCBza2lwcGluZ2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSB0cnVlO1xuXG4gICAgaWYgKGRlYnVnTW9kZSAhPT0gMSAmJiAhd2VpZ2h0ICYmICFkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRlYnVnTW9kZSAmJiBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyAmJiAhZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRldmljZSA9PT0gXCJtb2JpbGVcIiAmJiAhaXNNb2JpbGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdtb2JpbGUnIG1pc21hdGNoXCIpO1xuICAgICAgZW5nYWdlbWVudExvY2tbaWRdID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZXZpY2UgPT09IFwiZGVza3RvcFwiICYmIGlzTW9iaWxlKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50IGRldmljZSAnZGVza3RvcCcgbWlzbWF0Y2hcIik7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlYXBwbHlfZXZlbnQpIHtcbiAgICAgIGlmICghcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgfHwgcmVhcHBseV9ldmVudF9wYWdlX3R5cGUgPT09IHBhZ2VUeXBlKSB7XG4gICAgICAgIGxldCByZWFwcGx5X2V2ZW50X2FycmF5ID0gcmVhcHBseV9ldmVudDtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlYXBwbHlfZXZlbnQpKSByZWFwcGx5X2V2ZW50X2FycmF5ID0gW3JlYXBwbHlfZXZlbnRdO1xuICAgICAgICBsb2dnZXIubG9nKGBSZWFwcGx5IGV2ZW50ICcke3JlYXBwbHlfZXZlbnR9JyBmb3VuZCBmb3IgdHJlYXRtZW50OiAke2lkfWApO1xuICAgICAgICBmb3IgKGNvbnN0IHJlYXBwbHlFdmVudCBvZiByZWFwcGx5X2V2ZW50X2FycmF5KSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gP1xuICAgICAgICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA6IFtdO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBhbHJlYWR5IGFkZGVkIGZvciByZWFwcGx5IGV2ZW50XCIpO1xuICAgICAgICAgIH0gZWxzZSByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdID0gWy4uLnByZXZpb3VzVmFsdWUsIGlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJTdGFydGluZyBiYXNlIHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlU2V0IHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0KSkge1xuICAgICAgbGV0IHRyZWF0bWVudFNraXBSYXRpbyA9IHdlaWdodCA9PT0gMTAwID8gMCA6ICgxMDAgLSB3ZWlnaHQgfHwgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgIGlmIChkZXBlbmRhbnRfb25fdHJlYXRtZW50KSB7XG4gICAgICAgIC8vIElmIGRlcGVuZGFudCBvbiB0cmVhdG1lbnQgaXMgZm91bmQgYW5kIGhhcyB3ZWlnaHQ7IHVzZSBpdHMgc2tpcCByYXRpb1xuICAgICAgICBjb25zdCBkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbmQoKHQpID0+IHQuaWQgPT09IGRlcGVuZGFudF9vbl90cmVhdG1lbnQpPy53ZWlnaHQ7XG4gICAgICAgIHRyZWF0bWVudFNraXBSYXRpbyA9IGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0ID09PSAxMDAgPyAwIDogKDEwMCAtIGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0IHx8XG4gICAgICAgICAgVFJFQVRNRU5UX1JBVElPKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnQgc2tpcCByYXRpbzogXCIgKyB0cmVhdG1lbnRTa2lwUmF0aW8pO1xuICAgICAgLy8gRGV0ZXJtaW5pbmcgaWRlbnRpZmllciBmb3IgY2FsY3VsYXRpbmcgdHJlYXRtZW50IHBlcmNlbnRhZ2UgKHRyZWF0bWVudFBjdClcbiAgICAgIGNvbnN0IGRldGVybWluaW5nSWRlbnRpZmllciA9IGRlcGVuZGFudF9vbl90cmVhdG1lbnQgfHwgaWQ7XG5cbiAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIHRyZWF0bWVudCB1c2VkIHRvIGRldGVybWluZSBpZiBpdCBzaG91bGQgYmUgc2tpcHBlZCBvciBub3RcbiAgICAgIC8vIHRyZWF0bWVudFBjdCBpcyAxMDAgd2hlbiBkZWJ1ZyBtb2RlIGlzIDEsIGVuc3VyaW5nIG5vIHRyZWF0bWVudHMgYXJlIHNraXBwZWRcbiAgICAgIGNvbnN0IHRyZWF0bWVudFBjdCA9IGRlYnVnTW9kZSA9PT0gMSA/IDEwMCA6IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyICsgZGV0ZXJtaW5pbmdJZGVudGlmaWVyKTtcbiAgICAgIGxvZ2dlci5sb2coXCJUcmVhdG1lbnRQY3Q6IFwiICsgdHJlYXRtZW50UGN0ICsgYCB3aXRoIGRlYnVnIG1vZGUgJHtkZWJ1Z01vZGUgPyBcIm9uXCIgOiBcIm9mZlwifWApO1xuICAgICAgbGV0IGJ1c2luZXNzUnVsZUlkID0gbnVsbDtcbiAgICAgIGlmIChidXNpbmVzc1J1bGVTZXQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIHN1YiB2YXJpYW50IHJ1bGUgc2V0IGNoZWNrIGZvciB0cmVhdG1lbnQ6IFwiICsgaWQpO1xuICAgICAgICBidXNpbmVzc1J1bGVJZCA9IGF3YWl0IHRoaXMuY2hlY2tCdXNpbmVzc1J1bGVzKGJ1c2luZXNzUnVsZVNldCk7XG4gICAgICAgIGlmIChidXNpbmVzc1J1bGVJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBidXNpbmVzcyBydWxlIHRyYW5zZm9ybWF0aW9uIHdpdGggaWQ6IFwiLCBidXNpbmVzc1J1bGVJZCk7XG4gICAgICAgIH0gZWxzZSBsb2dnZXIubG9nKFwiQXBwbHlpbmcgdHJlYXRtZW50IHdpdGggZGVmYXVsdCB2YWx1ZXNcIik7XG4gICAgICB9XG4gICAgICBpZiAodHJlYXRtZW50UGN0IDwgdHJlYXRtZW50U2tpcFJhdGlvKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYFRyZWF0bWVudCAke2lkfSBza2lwcGVkIGR1ZSB0byB0cmVhdG1lbnQgc3BsaXQgcmF0aW9gKTtcbiAgICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgbnVsbCwgXCJza2lwcGVkXCIsIGRlcGVuZGFudF9vbl90cmVhdG1lbnQpO1xuICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgcHJlcGFyZUFuZEFwcGx5KGlkLCBpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKTtcbiAgICAgICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlJ1bGUgY2hlY2sgZmFpbGVkIGZvciB0cmVhdG1lbnQ6XCIsIGlkKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW3RyZWF0bWVudC5pZF0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpIHtcbiAgICBjb25zdCBbcHJlcGFyZWQsIHZhcmlhbnRdID0gYXdhaXQgcHJlcGFyZUFjdGlvbnMoaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBwbHlBY3Rpb25zKHByZXBhcmVkKTtcbiAgICBpZiAocmVzID09PSBmYWxzZSkge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJmYWlsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFRyZWF0bWVudChpZCwgYnVzaW5lc3NSdWxlSWQsIHZhcmlhbnQsIFwiYXBwbGllZFwiKTtcbiAgICB9XG4gIH1cblxuICBpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCgpIHtcbiAgICBjb25zdCB7cmVBcHBseVRyZWF0bWVudHNNYXAsIG1hdGNoZWRUcmVhdG1lbnRzfSA9IHRoaXM7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVBcHBseVRyZWF0bWVudHNNYXApKSB7XG4gICAgICBjb25zdCB0cmVhdG1lbnRJZHMgPSByZUFwcGx5VHJlYXRtZW50c01hcFtrZXldO1xuICAgICAgY29uc3QgcmVBcHBseVRyZWF0bWVudHMgPSBtYXRjaGVkVHJlYXRtZW50cy5maWx0ZXIoKHQpID0+IHRyZWF0bWVudElkcy5pbmNsdWRlcyh0LmlkKSk7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiaW5maW5pdGVfc2Nyb2xsXCI6IHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gaW5maW5pdGVfc2Nyb2xsYCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGltZW91dFwiOiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gdGltZW91dGApO1xuICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZWxlbWVudF9jaGFuZ2VcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5U2VsZWN0b3JMaXN0ID0gQXJyYXkuaXNBcnJheSh0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvcikgP1xuICAgICAgICAgICAgICAgIHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yIDogW3RyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgcmVhcHBseVNlbGVjdG9yTGlzdCkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBlbGVtZW50X2NoYW5nZWApO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwgT0JTRVJWRVJfQ09ORklHKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib25fc2Nyb2xsXCI6IHtcbiAgICAgICAgICAvLyBhZGQgd2luZG93IHNjcm9sbCBsaXN0ZW5lciwgY2FsbCBlbmdhZ2VSb2JvdCBvbiBzY3JvbGwsIGRvIG5vdCB0cmlnZ2VyIG1vcmUgdGhhbiBvbmNlIHBlciAyNTBtc1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICBsZXQgbGFzdFNjcm9sbFRpbWUgPSAwO1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgaWYgKG5vdyAtIGxhc3RTY3JvbGxUaW1lID4gMjUwICYmIE1hdGguYWJzKGxhc3RTY3JvbGxUb3AgLSBzdCkgPiA1KSB7XG4gICAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIG9uX3Njcm9sbGApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicXVlcnlfc2VhcmNoX2NoYW5nZVwiOiB7XG4gICAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoICE9PSBxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIHF1ZXJ5X3NlYXJjaF9jaGFuZ2VgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlcnZhbFwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZWFwcGx5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgaWYgKGFwcGxpZWQ/Llt0cmVhdG1lbnQuaWRdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbnRlcnZhbGApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVhcHBseUludGVydmFsKTtcbiAgICAgICAgICAgIH0sIDI1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImluZm9fbGF5ZXJfY2hhbmdlXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgICAgICAgICBhZGREYXRhTGlzdGVuZXIodHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlJlYXBwbHkgZXZlbnQgbm90IGZvdW5kOiBcIiwga2V5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlU2V0ID0gW10sIGJ1c2luZXNzUnVsZVNldCA9IFtdLCBpZH0gPSB0cmVhdG1lbnQ7XG4gICAgaWYgKHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMuaW5jbHVkZXMoaWQpKSByZXR1cm47XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKFsuLi5lbGlnaWJpbGl0eVJ1bGVTZXQsIC4uLmJ1c2luZXNzUnVsZVNldF0pO1xuICAgIGNvbnN0IGJvdW5kRW5nYWdlVHJlYXRtZW50ID0gdGhpcy5lbmdhZ2VSb2JvdC5iaW5kKHRoaXMsIHRyZWF0bWVudCk7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGFkZERhdGFMaXN0ZW5lcihgX19lUnVsZXMuJHtzZWxlY3Rvcn1gLCBib3VuZEVuZ2FnZVRyZWF0bWVudCk7XG4gICAgfVxuICAgIHRoaXMuYWRkZWREYXRhTGlzdGVuZXJJZHMucHVzaChpZCk7XG4gIH1cblxuICBleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGVTZXQsIHByZXZpb3VzU2VsZWN0b3JzID0gbnVsbCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHByZXZpb3VzU2VsZWN0b3JzIHx8IFtdO1xuICAgIGZvciAobGV0IHJ1bGUgb2YgcnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBydWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChydWxlLnN0YXJ0c1dpdGgoXCIhXCIpKSBydWxlID0gcnVsZS5zbGljZSgxKTtcbiAgICAgICAgc2VsZWN0b3JzLnB1c2gocnVsZS5zcGxpdChcIi5cIilbMF0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXh0cmFjdERhdGFMaXN0ZW5lclNlbGVjdG9ycyhydWxlLnNldCwgc2VsZWN0b3JzKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi4obmV3IFNldChzZWxlY3RvcnMpKV07XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSkge1xuICAgIGxvZ2dlci5sb2coYENoZWNraW5nIGVsaWdpYmlsaXR5ICR7ZWxpZ2liaWxpdHlSdWxlfWApO1xuICAgIGxldCBvcHBvc2l0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgW2VsaWdpYmlsaXR5U2NvcGUsIGVsaWdpYmlsaXR5TmFtZV0gPSBlbGlnaWJpbGl0eVJ1bGUuc3BsaXQoXCIuXCIpO1xuICAgIGlmIChlbGlnaWJpbGl0eVNjb3BlLnN0YXJ0c1dpdGgoXCIhXCIpKSB7XG4gICAgICBvcHBvc2l0ZUZsYWcgPSB0cnVlO1xuICAgICAgZWxpZ2liaWxpdHlTY29wZSA9IGVsaWdpYmlsaXR5U2NvcGUuc2xpY2UoMSk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7ZWxpZ2liaWxpdHlTY29wZX1gKTtcbiAgICBpZiAoIXJlcyB8fCAhQXJyYXkuaXNBcnJheShyZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9wcG9zaXRlRmxhZyAmJiByZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghb3Bwb3NpdGVGbGFnICYmICFyZXMuaW5jbHVkZXMoZWxpZ2liaWxpdHlOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgIGxvZ2dlci5sb2coYCR7ZWxpZ2liaWxpdHlSdWxlfSBpcyBlbGlnaWJsZWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlU2V0LCBlbGlnaWJpbGl0eVNldFR5cGUgPSBudWxsLCBwcmV2aW91c0lzRWxpZ2libGUgPSBudWxsKSB7XG4gICAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJvYm90IGVsaWdpYmlsaXR5XCIpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKGBFbGlnaWJpbGl0eSBSdWxlIFNldCAke2VsaWdpYmlsaXR5UnVsZVNldH0gaXMgbm90IGFuIGFycmF5YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpc0VsaWdpYmxlID0gcHJldmlvdXNJc0VsaWdpYmxlO1xuICAgIGZvciAoY29uc3QgZWxpZ2liaWxpdHlSdWxlIG9mIGVsaWdpYmlsaXR5UnVsZVNldCkge1xuICAgICAgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKCFlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSk7XG4gICAgICAgICAgaWYgKCFpc0VsaWdpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgaWYgKGlzRWxpZ2libGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzd2l0Y2ggKGVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlIHx8IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgICAgICBpc0VsaWdpYmxlID0gaXNFbGlnaWJsZSAmJiBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlLCBlbGlnaWJpbGl0eVNldFR5cGUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJVbmtub3duIGVsaWdpYmlsaXR5U2V0VHlwZTogXCIsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGlnaWJpbGl0eVJ1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoZWxpZ2liaWxpdHlSdWxlLnNldCwgZWxpZ2liaWxpdHlSdWxlLnR5cGUsIGlzRWxpZ2libGUpO1xuICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzRWxpZ2libGU7XG4gIH1cblxuICAvLyBSZXR1cm4gaW5kZXggb2YgYnVzaW5lc3NSdWxlLCB0aGlzIGlzIHRoZSBidXNpbmVzc1J1bGVJZFxuICBhc3luYyBjaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KSB7XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGJ1c2luZXNzUnVsZV0gb2YgYnVzaW5lc3NSdWxlU2V0LmVudHJpZXMoKSkge1xuICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQoW2J1c2luZXNzUnVsZV0pKSByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCBUcmVhdG1lbnRSZXBvc2l0b3J5IGZyb20gXCIuLi9CZWFnbGVUcmVhdG1lbnRSZXBvc2l0b3J5L2luZGV4XCI7XG5pbXBvcnQge1xuICBhZGRUb0JlYWdsZUluZm9MYXllcixcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtcbiAgaW5pdGlhdGVTZXNzaW9uU3RvcmFnZXMsXG4gIGluamVjdFN0eWxlU2hlZXQsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgUm9ib3RFbmdpbmUgZnJvbSBcIi4vcm9ib3RFbmdpbmVcIjtcbmltcG9ydCBSdWxlRW5naW5lIGZyb20gXCIuLi9CZWFnbGVSdWxlRW5naW5lXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4uL0dsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkvc3RvcmVcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZU9uQ29tcG9uZW50XCIpO1xuXG5jb25zdCBiZWFnbGVPbiA9IGFzeW5jIChpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKSA9PiB7XG4gIGNvbnN0IHBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UgPSBTdG9yZS5nZXRJbnN0YW5jZSgpLnBlcnNpc3RQcm9kdWN0SW5mbygpO1xuXG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlID0gYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGNvbnN0IHRyZWF0bWVudHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRzKCk7XG4gIGNvbnN0IHRyZWF0bWVudFdlaWdodHNQcm9taXNlID0gVHJlYXRtZW50UmVwb3NpdG9yeS5nZXRUcmVhdG1lbnRXZWlnaHRzKCk7XG5cbiAgaW5qZWN0U3R5bGVTaGVldCgpO1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcygpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJvbi1pbml0XCIpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyA9IG51bGw7XG4gIGlmIChkZWJ1Z01vZGUgJiYgc2VhcmNoUGFyYW1zLmluY2x1ZGVzKFwiZmlsdGVyPVwiKSkge1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gc2VhcmNoUGFyYW1zLnNsaWNlKFxuICAgICAgICBzZWFyY2hQYXJhbXMuaW5kZXhPZihcIltcIikgKyAxLFxuICAgICAgICBzZWFyY2hQYXJhbXMubGFzdEluZGV4T2YoXCJdXCIpLFxuICAgICkuc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgfVxuXG4gIGNvbnN0IFt0cmVhdG1lbnRzLCB0cmVhdG1lbnRXZWlnaHRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICB0cmVhdG1lbnRzUHJvbWlzZSwgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UsXG4gIF0pO1xuXG4gIGlmICghdHJlYXRtZW50cyB8fCAhdHJlYXRtZW50V2VpZ2h0cykge1xuICAgIGxldCBtID0gXCJcIjtcbiAgICBpZiAoIXRyZWF0bWVudHMpIG0gPSBtICsgXCJuby1yb2JvdHNcIjtcbiAgICBpZiAoIXRyZWF0bWVudFdlaWdodHMpIG0gPSBtID09PSBcIlwiID8gXCJuby1yb2JvdC13ZWlnaHRzXCIgOiBcIiAtIG5vLXJvYm90LXdlaWdodHNcIjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgbSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHMvd2VpZ2h0c1wiKTtcbiAgfVxuICBsb2dnZXIuc3VjY2VzcyhcIkZvdW5kIHRyZWF0bWVudHM6IFwiLCB0cmVhdG1lbnRzKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hlZC10cmVhdG1lbnRzXCIpO1xuXG4gIGNvbnN0IHRyZWF0bWVudFJlcG9zaXRvcnkgPSBuZXcgVHJlYXRtZW50UmVwb3NpdG9yeSh7XG4gICAgdHJlYXRtZW50cyxcbiAgICB0cmVhdG1lbnRXZWlnaHRzLFxuICB9KTtcblxuICBjb25zdCBtYXRjaGVkVHJlYXRtZW50cyA9IGF3YWl0IHRyZWF0bWVudFJlcG9zaXRvcnkuZ2V0TWF0Y2hlZFRyZWF0bWVudHMoKTtcbiAgaWYgKG1hdGNoZWRUcmVhdG1lbnRzID09PSBudWxsKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwibm8tdXNlci1zZWdtZW50XCIpO1xuICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIW1hdGNoZWRUcmVhdG1lbnRzLmxlbmd0aCkge1xuICAgIGxvZ2dlci5sb2coXCJObyB0cmVhdG1lbnRzIG1hdGNoZWQsIHJldHVybmluZyB3aXRob3V0IGZ1cnRoZXIgYWN0aW9uXCIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm5vLXJvYm90LW1hdGNoZWRcIik7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZvdW5kLW1hdGNoZWQtcm9ib3RzXCIpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2U7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm5vLXJ1bGVzLWFzc2Vzc2VkXCIpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBhc3NlcyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJydWxlcy1hc3Nlc3NlZFwiKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJwcm9kdWN0LWludG8tbm8tcGVyc2lzdFwiKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGVyc2lzdCBwcm9kdWN0IGluZm9cIik7XG4gIH1cblxuICAvLyBhd2FpdCBQcm9taXNlLmFsbChbXG4gIC8vICAgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UsIHBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2UsXG4gIC8vIF0pO1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImVuZ2FnaW5nLXJvYm90c1wiKTtcbiAgY29uc3Qgcm9ib3RFbmdpbmUgPSBuZXcgUm9ib3RFbmdpbmUoe1xuICAgIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzLFxuICAgIGRlYnVnTW9kZSxcbiAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICBpZGVudGlmaWVyLFxuICAgIHBhZ2VUeXBlLFxuICB9KTtcbiAgYXdhaXQgcm9ib3RFbmdpbmUuZW5nYWdlUm9ib3RzKCk7XG4gIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJyb2JvdHMtZW5nYWdlZFwiKTtcbiAgbG9nZ2VyLnN1Y2Nlc3MoXCJBcHBsaWVkIHRyZWF0bWVudHM6IFwiLCBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKSB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoaW5nLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgUnVsZUVuZ2luZS5nZXRFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gIGlmICghZWxpZ2liaWxpdHlSdWxlcykgcmV0dXJuO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLWVsaWdpYmlsaXR5LXJ1bGVzXCIpO1xuICBjb25zdCBydWxlRW5naW5lID0gbmV3IFJ1bGVFbmdpbmUoe2VsaWdpYmlsaXR5UnVsZXN9KTtcbiAgYXdhaXQgcnVsZUVuZ2luZS5hc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiYXNzZXNzZWQtZWxpZ2liaWxpdHktcnVsZXNcIik7XG59XG5leHBvcnQgZGVmYXVsdCBiZWFnbGVPbjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IE1vbml0b3IgZnJvbSBcIi4uL0JlYWdsZU1vbml0b3IvaW5kZXhcIjtcbmltcG9ydCBiZWFnbGVPbiBmcm9tIFwiLi4vQmVhZ2xlT25cIjtcbmltcG9ydCB7XG4gIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBTUExJVF9SQVRJTyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04sXG4gIFZFUlNJT04sXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGdldElkZW50aWZpZXIsXG4gIHJlbW92ZURvY3VtZW50SGlkZSxcbiAgZGV0ZXJtaW5lUGN0LFxuICBnZXREZWJ1Z01vZGUsXG4gIHN3aXRjaFRvRWFzZU91dCxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmxldCBTSFVURE9XTiA9IGZhbHNlO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUudGltZShcImdsLXN0YXJ0XCIpO1xuICBzd2l0Y2hUb0Vhc2VPdXQoKTtcbiAgbGV0IG1vbml0b3IgPSBudWxsO1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIGluaXRpYWxpemluZ1wiKTtcbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cbiAgbGV0IGVhcmx5TG9nU2VudCA9IGZhbHNlO1xuICBsZXQgaGlkZVJlbW92ZWQgPSBmYWxzZTtcblxuICB0cnkge1xuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gSU5JVCBUQVNLUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBjb25zb2xlLnRpbWUoXCJnbC1pbml0LXRhc2tzXCIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgaW5pdGlhbGl6aW5nXCIpO1xuICAgIG1vbml0b3IgPSBuZXcgTW9uaXRvcigpO1xuICAgIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIoKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gYXdhaXQgZ2V0SWRlbnRpZmllcigpO1xuICAgIGxvZ2dlci5sb2coXCJGb3VuZCBpZGVudGlmaWVyOiBcIiwgaWRlbnRpZmllcik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjb29raWVHYUlkXCIsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvb2tpZVBjdCA9IGF3YWl0IGRldGVybWluZVBjdChpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm9uSGFzaFBjdFwiLCBjb29raWVQY3QpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiLCBEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2XCIsIFZFUlNJT04pO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwic3JcIiwgU1BMSVRfUkFUSU8pO1xuXG4gICAgLy8gZGF0YS1sZXNzIGxvZyB0byBkZXRlY3QgYm91bmNlc1xuICAgIGF3YWl0IG1vbml0b3IucGFja0FuZFF1ZXVlQXJyaXZhbExvZygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgfSwgMjAwMCk7XG4gICAgY29uc29sZS50aW1lRW5kKFwiZ2wtaW5pdC10YXNrc1wiKTtcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFkgUFJVTkUgT1VULU9GLVNDT1BFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgY29uc29sZS50aW1lKFwiZ2wtZWFybHktcHJ1bmVcIik7XG5cbiAgICBjb25zdCBvb3NSZWFzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSk7XG5cbiAgICAvLyBpZiBjYW5ub3QgZ2V0IGNyaXRpY2FsIGluZm8sIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCB1bnN1cHBvcnRlZFxuICAgIGlmIChcbiAgICAgIGNvb2tpZVBjdCA9PT0gbnVsbCB8fFxuICAgICAgIW5hdmlnYXRvci5zZW5kQmVhY29uIHx8XG4gICAgICB0eXBlb2YgbmF2aWdhdG9yLnNlbmRCZWFjb24gIT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgdHlwZW9mIFN0cmluZz8ucHJvdG90eXBlPy5wYWRTdGFydCAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAob29zUmVhc29uICYmIG9vc1JlYXNvbiA9PT0gXCJ1bnN1cHBvcnRlZFwiKVxuICAgICkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IGRldmljZVwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkLWRldmljZVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0xhYmVsU2VudCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfTEFCRUxfU0VOVCk7XG4gICAgY29uc3QgdGltZW91dENvdW50ZXIgPSBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQpKSB8fCAwO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWcgbW9kZSBpcyBvbiwgYWxzbyBhZGRzIGRibSB0byBiZWFnbGVJbmZvTGF5ZXIgYW5kIHNldHMgb29zUmVhc29uXG4gICAgY29uc3QgZGVidWdNb2RlID0gZ2V0RGVidWdNb2RlKFwiZW1wbG95ZWVcIik7XG5cbiAgICAvLyBpZiB0aW1lZC1vdXQgdG9vIG1hbnkgdGltZXMgZm9yIHZlcnkgZmlyc3QgaW50ZXJhY3RzaW9ucywgbWFrZSBvdXQgb2Ygc2NvcGUgZm9yIHRoZSBzZXNzaW9uXG4gICAgaWYgKCFkZWJ1Z01vZGUgJiYgIW9vc1JlYXNvbiAmJiAhaXNMYWJlbFNlbnQgJiYgdGltZW91dENvdW50ZXIgPiBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTlxuICAgICkge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidW5zdXBwb3J0ZWRcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwidW5zdXBwb3J0ZWQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibWF4LXRpbWVvdXRcIik7XG4gICAgfVxuICAgIGNvbnNvbGUudGltZUVuZChcImdsLWVhcmx5LXBydW5lXCIpO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQURNSU4gVVNFUiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIC8vIFRPRE86IHJlbmFtZSBzaG93cm9vbSBsb2dpYyB0byBhZG1pbiwgYW5kIG1hcCB2dnNJc1Nob3dyb29tIHRvIGEgY29uZmlndXJhYmxlIGFkbWluIHBhcmFtXG5cbiAgICAvLyBpZiBhZG1pbiB1c2VyLCBtYWtlIG91dCBvZiBzY29wZSBhbmQgbWFyayBhcyBlbXBsb3llZVxuICAgIGNvbnNvbGUudGltZShcImdsLWFkbWluLXVzZXItY2hlY2tcIik7XG4gICAgY29uc3QgcHJvY2Vzc0FkbWluVXNlciA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFLCBcImVtcGxveWVlXCIpO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgdHJ1ZSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IGFkbWluXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWRtaW4tZW1wbG95ZWVcIik7XG4gICAgfTtcblxuICAgIGxldCBpc0FkbWluID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTik7XG4gICAgLy8gaWYgbm90IGZvdW5kIGluIGxvY2FsU3RvcmFnZSwgY2hlY2sgYmVhZ2xlSW5mb0xheWVyIHdpdGggYmxvY2tpbmcgbWRvZVxuICAgIGlmIChpc0FkbWluID09PSBudWxsIHx8IGlzQWRtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNBZG1pbiA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpO1xuICAgIC8vIHBlcm1hbmVudCBsYWJlbCBjYW4gYmUgZmFsc2UsIGJ1dCBhZG1pbiB1c2VyIGNhbiBzdGlsbCBsb2dpbiBhbmQgdHVybiB0cnVlLCBsYXppbHkgZml4IHRoaXNcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IFwiZmFsc2VcIiB8fCBpc0FkbWluID09PSBmYWxzZSkge1xuICAgICAgLy8gYXN5bmMgY2FsbCB0byBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLCB0aGVuIHNldCBsb2NhbFN0b3JhZ2VcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2dnNJc1Nob3dyb29tXCIsIHRydWUpLnRoZW4oKGlzQWRtaW4pID0+IHtcbiAgICAgICAgaWYgKGlzQWRtaW4gJiYgKGlzQWRtaW4gPT09IFwidHJ1ZVwiIHx8IGlzQWRtaW4gPT09IHRydWUpKSB7XG4gICAgICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgIHByb2Nlc3NBZG1pblVzZXIoKTtcbiAgICB9IGVsc2UgaWYgKGlzQWRtaW4gPT09IG51bGwgfHwgaXNBZG1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuby1hZG1pbi1zdGF0dXNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuSVNfQURNSU4sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImdsb3YtZWFzZVwiKSkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5USU1FT1VUX0NPVU5ULCB0aW1lb3V0Q291bnRlciArIDEpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB0aW1lb3V0XCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYW50aS1mbGlja2VyLXRpbWVvdXRcIik7XG4gICAgfVxuICAgIGNvbnNvbGUudGltZUVuZChcImdsLWFkbWluLXVzZXItY2hlY2tcIik7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IE9OL09GRiBDSEVDSyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gaXNPbiBjYW4gYmUgdHJ1ZSAoT04pLCBmYWxzZSAoT0ZGKVxuICAgIGNvbnNvbGUudGltZShcImdsLW9uLW9mZi1jaGVja1wiKTtcblxuICAgIGxldCBpc09uID0gbnVsbDtcblxuICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJEZWJ1ZyBtb2RlIG9uOiBhbGwgYXBwbGljYWJsZSB0cmVhdG1lbnRzIHdpbGwgYmUgYXBwbGllZFwiKTtcbiAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwiZW1wbG95ZWUgfCB0ZXN0ZXJcIik7XG4gICAgfSBlbHNlIGlmIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcImVtcGxveWVlXCIpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVXNlciBpcyBvdXQgb2Ygc2NvcGVcIik7XG4gICAgICAvLyBzZXQgaXNPbiB0byB0cnVlL2ZhbHNlIHdoZW4gbm90IGRlYnVnTW9kZSBidXQgb3V0IG9mIHNjb3BlIGkuZS4gbmRfZGVidWc9MCBmb3IgdGVzdGFiaWxpdHlcbiAgICAgIGlzT24gPSBjb29raWVQY3QgPj0gU1BMSVRfUkFUSU87XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbikge1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCB1bmtub3duXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBvdXQgb2Ygc2NvcGUgcmVhc29uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBncmVhdGVyIHRoYW4gU1BMSVRfUkFUSU8sIHRoZW4gaW4gT04gbW9kZVxuICAgICAgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTykge1xuICAgICAgICBpc09uID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwidHJ1ZVwifSk7XG4gICAgICB9IGVsc2UgaWYgKGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTy8yKSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZmFsc2UyXCJ9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzT24gPSBmYWxzZTtcbiAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZmFsc2UxXCJ9KTtcbiAgICAgIH1cblxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJpc09uXCIsIGlzT24pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19MQUJFTF9TRU5ULCB0cnVlKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBpc09uLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBjb25zb2xlLnRpbWVFbmQoXCJnbC1vbi1vZmYtY2hlY2tcIik7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gRUFSTFktUFJPQ0VTUyBDT05WRVJTSU9OID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgY29uc29sZS50aW1lKFwiZ2wtZWFybHktcHJvY2Vzcy1jb252ZXJzaW9uXCIpO1xuXG4gICAgLy8gYXdhaXQgY3JpdGljYWwgaW5mbyBiZWZvcmUgc2VuZGluZyBsb2dzIGZvciBwcm9wZXIgYW5hbHl0aWNzIG1lYXN1cmVtZW50c1xuICAgIGNvbnN0IHBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUpO1xuICAgIGlmIChwYWdlVHlwZSA9PT0gXCJwdXJjaGFzZVwiKSB7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucmV2ZW51ZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgdHJ1ZSwgNTAsIDUwMDApO1xuICAgICAgLy8gc2VuZCBsb2dzIGltbWVkaWF0ZWx5IG9uIHB1cmNoYXNlIHBhZ2UsIGFuZCBmb3JjZSB3YWl0XG4gICAgICBhd2FpdCBtb25pdG9yLnNlbmRMb2dzKHRydWUpO1xuICAgICAgLy8gaWYgcHVyY2hhc2UgaXMgY29tcGxldGUsIGRvIG5vdCBhcHBseSBhbnkgdHJlYXRtZW50cyBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIFNIVVRET1dOID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2VuZCBsb2dzIHdoZW4gcmVhZHksIHN0YXJ0IHNjcmFwaW5nIGFuZCBzZW5kaW5nIGFzeW5jbHlcbiAgICAgIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIH1cbiAgICBlYXJseUxvZ1NlbnQgPSB0cnVlO1xuXG4gICAgY29uc29sZS50aW1lRW5kKFwiZ2wtZWFybHktcHJvY2Vzcy1jb252ZXJzaW9uXCIpO1xuXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFJPQk9UIFBBVEhzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICBjb25zb2xlLnRpbWUoXCJnbC1yb2JvdC1wYXRoc1wiKTtcblxuICAgIGlmIChpc09uID09PSB0cnVlKSB7XG4gICAgICBpZiAoIVNIVVRET1dOKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJCZWFnbGUgT04gR3JvdXAgUGF0aFwiKTtcbiAgICAgICAgYmVhZ2xlT24oaWRlbnRpZmllciwgZGVidWdNb2RlLCBwYWdlVHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuaW5mbyhcIkJlYWdsZSBPTiBHcm91cCBTSFVURE9XTiBQYXRoXCIpO1xuICAgICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgICAgaGlkZVJlbW92ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPbiA9PT0gZmFsc2UpIHtcbiAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9GRiBHcm91cCBQYXRoXCIpO1xuICAgICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlzT24gaXMgdW5kZWZpbmVkIG9yIG51bGxcIik7XG4gICAgfVxuICAgIGNvbnNvbGUudGltZUVuZChcImdsLXJvYm90LXBhdGhzXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybihcIkJlYWdsZSBFYXJseSBTY29wZS1vdXQgb3IgRVJST1I6IFwiLCBlcnIubWVzc2FnZSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIGVyci5tZXNzYWdlKTtcbiAgICBpZiAoIWVhcmx5TG9nU2VudCAmJiBtb25pdG9yKSBtb25pdG9yLnNlbmRMb2dzKGZhbHNlKTtcbiAgICBpZiAoIWhpZGVSZW1vdmVkKSByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgfVxuICBjb25zb2xlLnRpbWVFbmQoXCJnbC1zdGFydFwiKTtcbn0pKCk7XG4iXSwibmFtZXMiOlsicmVwbGFjZUFsbCIsInN0ciIsImZpbmQiLCJyZXBsYWNlIiwiaW5kZXgiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwidHVya2lzaFRvTG93ZXIiLCJzdHJpbmciLCJsZXR0ZXJzIiwibGV0dGVyIiwidG9Mb3dlckNhc2UiLCJpc1N0YWdpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpbmNsdWRlcyIsIlZFUlNJT04iLCJDT09LSUVfTkFNRSIsIlRSRUFUTUVOVFNfTE9DQVRJT04iLCJUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiIsIlNUWUxFU0hFRVRfTE9DQVRJT04iLCJEYXRlIiwidG9JU09TdHJpbmciLCJFX1JVTEVTX0xPQ0FUSU9OIiwiUFJPRFVDVF9JTkZPX0xPQ0FUSU9OIiwiTE9HX0FQSV9VUkwiLCJMT09LVVBfQVBJX1VSTCIsIk1PQklMRV9NRURJQV9RVUVSWSIsIlNQTElUX1JBVElPIiwiVFJFQVRNRU5UX1JBVElPIiwiVFJFQVRNRU5UU19EVVJBVElPTiIsIk1BWF9USU1FT1VUX1BFUl9TRVNTSU9OIiwiTElTVF9NT0RFX0JFQUdMRV9LRVlTIiwiSURMRV9USU1FT1VUIiwiU0VTU0lPTl9TVE9SQUdFX0tFWVMiLCJTRVNTSU9OX1RJTUVTVEFNUCIsIlNFU1NJT05fSElTVE9SWSIsIlRSRUFUTUVOVFMiLCJQT1BVUF9ESVNQTEFZX0ZMQUciLCJTS1VfSU5GT19CQVNLRVQiLCJUSU1FT1VUX0NPVU5UIiwiU0VTU0lPTl9SRUZFUlJFUiIsIldFSUdIVFMiLCJFTElHSUJJTElUWV9SVUxFUyIsIkxPQ0FMX1NUT1JBR0VfS0VZUyIsIkRFQlVHX01PREUiLCJPVVRfT0ZfU0NPUEUiLCJJU19MQUJFTF9TRU5UIiwiVVNFUl9JRCIsIkRBVEFfQ09MTEVDVElPTl9EQVRBX1NJWkUiLCJJU19BRE1JTiIsIkNVU1RPTV9TVE9SQUdFX1BSRUZJWCIsIkxvZ2dlciIsIm9yaWdpbiIsInRlc3RpbmciLCJERUJVRyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcmdzIiwiY29uc29sZSIsImluZm8iLCJsb2ciLCJtZXNzYWdlQ29uZmlnIiwiZm9yRWFjaCIsImFyZ3VtZW50IiwidHlwZSIsIndhcm4iLCJlcnJvciIsImFkZFRvQmVhZ2xlSW5mb0xheWVyIiwibG9nZ2VyIiwibW9udGhzIiwicmVtb3ZlRG9jdW1lbnRIaWRlIiwidG9wIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJzd2l0Y2hUb0Vhc2VPdXQiLCJlbCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInByZXBlbmQiLCJhZGQiLCJmZXRjaFRyZWF0bWVudHMiLCJmZXRjaFBsdXMiLCJ0cmVhdG1lbnRzIiwiRXJyb3IiLCJqc29uIiwianNvblRyZWF0bWVudCIsImZhaWxlZCIsIm1lc3NhZ2UiLCJmZXRjaFRyZWF0bWVudFdlaWdodHMiLCJ0cmVhdG1lbnRXZWlnaHRzIiwianNvblRyZWF0bWVudFdlaWdodHMiLCJmZXRjaEVsaWdpYmlsaXR5UnVsZXMiLCJlbGlnaWJpbGl0eVJ1bGVzIiwianNvbkVsaWdpYmlsaXR5UnVsZXMiLCJmZXRjaFByb2R1Y3RJbmZvIiwicHJvZHVjdEluZm8iLCJ0ZXh0IiwicHJvZHVjdEluZm9DU1YiLCJjc3ZUb0FycmF5IiwidGltZW91dCIsInRpbWUiLCJjb250cm9sbGVyIiwiQWJvcnRDb250cm9sbGVyIiwic2V0VGltZW91dCIsImFib3J0IiwidXJsIiwib3B0aW9ucyIsInJldHJpZXMiLCJmZXRjaCIsInNpZ25hbCIsInRoZW4iLCJyZXMiLCJvayIsInN0YXR1cyIsImNhdGNoIiwiZXh0cmFjdENvb2tpZUlkZW50aWZpZXIiLCJjb29raWVTdHJpbmciLCJjb29raWVOYW1lIiwicGFyc2VkIiwic3BsaXQiLCJtYXAiLCJ2IiwicmVkdWNlIiwiYWNjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidHJpbSIsImlkZW50aWZpZXIiLCJpZGVudGlmaWVySW5kZXgiLCJkZXRlcm1pbmVQY3QiLCJoYXNoIiwiZ2V0VW5zZWN1cmVIYXNoIiwicGN0IiwiZXhpdFNjcm9sbExpc3RlbmVyIiwiY2FsbEJhY2siLCJsb29wIiwic2Nyb2xsVG9wIiwibGFzdFNjcm9sbFRvcCIsImNsZWFySW50ZXJ2YWwiLCJleGl0U2Nyb2xsSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInN0eWxlQXBwbGljYXRvciIsImVsZW1lbnRzIiwic3R5bGVDaGFuZ2VzTWFwIiwiaSIsImVsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsdWUiLCJzdHlsZSIsImluamVjdFN0eWxlU2hlZXQiLCJzdHlsZVNoZWV0IiwicmVsIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicHJlcGFyZUFjdGlvbnMiLCJhY3Rpb25zVG9QcmVwYXJlIiwiYnVzaW5lc3NSdWxlSWQiLCJkZWJ1Z01vZGUiLCJhY3Rpb25zIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidmFyaWFudCIsImFjdGlvbiIsImJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucyIsInZhcmlhbnRzIiwiYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbiIsImlkIiwia2V5cyIsInZhcmlhbnRLZXkiLCJyYW5kb21QY3QiLCJ3ZWlnaHQiLCJNYXRoIiwiZmxvb3IiLCJpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyIsInBvcHVwRGlzcGxheUZsYWciLCJzZXNzaW9uU3RvcmFnZSIsInNlc3Npb25UaW1lc3RhbXAiLCJzZXNzaW9uSGlzdG9yeSIsInNldEl0ZW0iLCJub3ciLCJwYXRobmFtZSIsImNvbmRpdGlvbkNoZWNrZXIiLCJydW5UaW1lVmFsdWUiLCJjb25kaXRpb24iLCJzdWNjZXNzIiwidW5kZWZpbmVkIiwibWluIiwibWF4IiwicGFyc2VJbnQiLCJyZWdleCIsIlJlZ0V4cCIsInRlc3QiLCJnZXREZWJ1Z01vZGUiLCJvb3NSZWFzb24iLCJxdWVyeVN0cmluZyIsInNlYXJjaCIsInJlbW92ZUl0ZW0iLCJjdXJyZW50IiwiZ2V0R2FDbGllbnRJZCIsImdhIiwiZ2V0QWxsIiwidHJhY2tlcnMiLCJnZXQiLCJjaGFyIiwiY2hhckNvZGVBdCIsImFicyIsImdldFJhbmRvbUludCIsInJhbmRvbSIsImdldFVuaXhUaW1lIiwiZ2V0SWRlbnRpZmllciIsIlByb21pc2UiLCJyZXNvbHZlIiwiZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCIsImUiLCJkZWxheSIsIm1zIiwiZm9ybWF0RGVsaXZlcnlEYXRlIiwiZGF0ZSIsInJlc3VsdCIsInN0YXJ0TW9udGhJbmRleCIsImVuZE1vbnRoSW5kZXgiLCJzdGFydERheSIsImVuZERheSIsIm1hdGNoIiwidG9kYXkiLCJzdGFydFllYXIiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZW5kWWVhciIsImVzdGltYXRlZFN0YXJ0IiwiZXN0aW1hdGVkRW5kIiwic3RhcnREaWZmT3ZlckRheXMiLCJjZWlsIiwiZW5kRGlmZk92ZXJEYXlzIiwic3RhcnREaWZmT3ZlcldlZWtzIiwiZW5kRGlmZk92ZXJXZWVrcyIsImVyciIsImlkbGVUaW1lciIsInRpbWVPdXQiLCJyZXNldFRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiaWRsZVRpbWVvdXQiLCJvbnRvdWNoc3RhcnQiLCJnZXRCcm93c2VyVHlwZSIsInVzZXJBZ2VudCIsIm5hdmlnYXRvciIsImlzT3duTXV0YXRpb24iLCJtdXRhdGlvbkxpc3QiLCJub2RlcyIsIkFycmF5IiwiZnJvbSIsImFkZGVkTm9kZXMiLCJyZW1vdmVkTm9kZXMiLCJzb21lIiwibiIsInRhZ05hbWUiLCJjIiwic3RyRGF0YSIsInN0ckRlbGltaXRlciIsIm9ialBhdHRlcm4iLCJhcnJEYXRhIiwiYXJyTWF0Y2hlcyIsImV4ZWMiLCJzdHJNYXRjaGVkRGVsaW1pdGVyIiwicHVzaCIsInN0ck1hdGNoZWRWYWx1ZSIsImNvbmZpZyIsImRiTmFtZSIsInZlcnNpb24iLCJtYWludGVuYW5jZU9wZXJhdGlvbkNvdW50Iiwic3RvcmUiLCJuYW1lIiwiaW5kZXhlcyIsImZpZWxkcyIsImtleVBhdGgiLCJhdXRvSW5jcmVtZW50IiwiX3dpbmRvdyIsImFsbHRpbWUiLCJzZXNzaW9uIiwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIiwiaW5kZXhlZERCIiwiaW5pdCIsIm9wZW5SZXF1ZXN0Iiwib3BlbiIsIm9udXBncmFkZW5lZWRlZCIsImV2ZW50Iiwib2xkVmVyc2lvbiIsImRlbGV0ZU9iamVjdFN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJpZHgiLCJjcmVhdGVJbmRleCIsIm9uZXJyb3IiLCJvbnN1Y2Nlc3MiLCJkYiIsImRlbGV0ZVJlcXVlc3QiLCJkZWxldGVEYXRhYmFzZSIsInJlamVjdCIsImludGVydmFsIiwicmVhZHdyaXRlIiwiZ2V0Q29ubmVjdGlvbiIsInR4IiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsImRhdGFOYW1lIiwiZGF0YVZhbHVlIiwiaW5pdFRyYW5zYWN0aW9uIiwic2Vzc2lvbklkIiwiZ2V0Q3VycmVudFNlc3Npb25JZCIsInJvdW5kIiwicGF5bG9hZCIsInB1dCIsIm9wIiwic3RvcmVkIiwiZ2V0Q3Vyc29yIiwiY3Vyc29yIiwidGFyZ2V0IiwiY29udGludWUiLCJtaW5tYXgiLCJNYXAiLCJoYXMiLCJzZXQiLCJncm91cEJ5IiwiZGF0YSIsImNvdW50IiwidG90YWwiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsIm9wZW5DdXJzb3IiLCJJREJLZXlSYW5nZSIsIm9ubHkiLCJ0b1N0cmluZyIsImluZGV4VmFsdWUiLCJzdW0iLCJzaXplIiwidmFsdWVzIiwiZCIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJwYWRTdGFydCIsImdldERhdGUiLCJDb2xsZWN0b3JBcGkiLCJjb2xsZWN0b3JBcGkiLCJxdWVyeUluQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lIiwicXVlcnlNZXRob2QiLCJxdWVyeVByb21pc2UiLCJhdmciLCJtb2RlIiwibGFzdCIsImRhdGFWYWx1ZXMiLCJvYmoiLCJkYXRhX3ZhbHVlIiwidXBkYXRlSW5Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZVZhbHVlIiwidXBkYXRlTWV0aG9kIiwic2F2ZSIsImJlYWdsZUluZm9MYXllciIsImEiLCJmIiwiX19od20iLCJzZWFyY2hQYXRocyIsIlBhZ2VUeXBlRGVwZW5kIiwibWV0aG9kIiwic2VsZWN0b3IiLCJmb3JtYXR0ZXIiLCJleGNsdXNpdmUiLCJvcGVyYW5kIiwib2JzZXJ2ZXIiLCJjaGlsZHJlbiIsImZlYXR1cmVFbmdpbmVlcmluZ09wcyIsImZlYXR1cmVOYW1lIiwiaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00iLCJpbmZvTGF5ZXIiLCJ0eXBlZFZhbHVlIiwibGFzdEtleSIsInBvcCIsInVwZGF0ZURlcml2YXRpb25zSW5Db2xsZWN0b3IiLCJwYXNzVmFsdWVUb0xpc3RlbmVycyIsIkRBVEFfTElTVEVORVJTIiwiYWRkRGF0YUxpc3RlbmVyIiwibGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJpc0FycmF5IiwiZ2V0RnJvbUJlYWdsZUluZm9MYXllciIsImJsb2NraW5nIiwicG9sbEludGVydmFsIiwib2J0YWluRGF0YSIsImpzb25HZXQiLCJzZWFyY2hFbGVtZW50IiwiaXNGb3VuZCIsImlzSWdub3JlIiwicmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllciIsImFkZFRyZWF0bWVudCIsImRlcGVuZGFudF9vbl90cmVhdG1lbnQiLCJQQVJTRVNFQVJDSE1BWFJFVFJZIiwiUEFSU0VTRUFSQ0hTVEFSVERFTEFZIiwicGFyc2VTZWFyY2hQYXRoc0RlbGF5IiwicGFyc2VTZWFyY2hQYXRoc1JldHJ5IiwiaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllciIsInByZXBhcmVDb3JlRGF0YSIsInBhcnNlckNhbGxlciIsImFkZE1ldHJpY3MiLCJjb2xsZWN0RGVyaXZhdGlvbnNGcm9tQ29sbGVjdG9yIiwiYmFzZUZlYXR1cmVOYW1lcyIsIkZFRGF0YSIsIkZFT3AiLCJxdWVyeVJlc3BvbnNlIiwicHJvY2Vzc0Zvcm1hdHRlciIsInRvVXBwZXJDYXNlIiwic2VhcmNoT2JqIiwibGF5ZXJWYWx1ZSIsImZpbHRlclBhcmFtcyIsImZpbHRlck5hbWUiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlck1hdGNoIiwicXVlcnlTZWxlY3RvciIsInRvQmVVcGRhdGVkIiwiY2hpbGQiLCJjaGlsZEVsZW1lbnRzIiwiZmlsdGVyIiwiTXV0YXRpb25PYnNlcnZlciIsInRyaWdnZXJSZXN0YXJ0Iiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJpbm5lclRleHQiLCJhdHRyaWJWYWx1ZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwidmFsdWVjaGlsZCIsImF0dHJpYlZhbHVlIiwiZ2V0QXR0cmlidXRlIiwic2V0VmFsdWUiLCJzdW1QcmljZSIsImNoaWxkVGV4dCIsImFycmF5SW5uZXJUZXh0IiwiZXhjbHVzaXZlRWxlbWVudCIsImN1c3RvbURhdGFEZXJpdmF0aW9ucyIsImN1cnJlbnRQYWdlVHlwZSIsImFsbCIsImlzQ2FydEVtcHR5IiwidG90YWxCYXNlUHJpY2UiLCJjb3Vwb25Ob3RBcHBsaWNhYmxlIiwicHJpY2VzIiwicXVhbnRpdGllcyIsInRvdGFsUHJpY2UiLCJjb3Vwb25BcHBsaWNhYmxlQW1vdW50Iiwic2t1Iiwic2t1TGlzdCIsInBhcnNlU2VhcmNoUGF0aHMiLCJkb21TdGF0dXMiLCJyZWFkeVN0YXRlIiwid2ludG9wIiwiZGF0YUxheWVyIiwid2luZG9jIiwiZm91bmROYW1lcyIsIlNldCIsInByZXZGb3VuZE5hbWVzIiwibm90Rm91bmROYW1lcyIsInNlYXJjaEFuZFNldCIsImRhdGFMYXllckl0ZW0iLCJzb3JnQXJyYXlJbm5lciIsImdldFNPUkdBcnJheSIsInNvcmdJdGVtIiwiam9pbiIsInRpbWVFbmQiLCJwYXRoIiwicGF0aEFycmF5Iiwic3ViUGF0aCIsInNsaWNlIiwic3ViQXJyYXkiLCJzdWJLZXkiLCJzdWJWYWx1ZSIsIndpbmRvd1B0ciIsIm5hdlB0ciIsInBsYXRmb3JtIiwidXNlckFnZW50RGF0YSIsImRldmljZVBpeGVsUmF0aW8iLCJhdmFpbFdpbmRvdyIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIndpbmRvd0RlcHRoIiwiY29sb3JEZXB0aCIsInBpeGVsRGVwdGgiLCJ2cG9ydFNoYXBlIiwidmlzdWFsVmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsImlPUyIsIm9yaWVudGF0aW9uQW5nbGUiLCJvcmllbnRhdGlvbiIsImFuZ2xlIiwidGVtcCIsImhpc3RvcnkiLCJuYXZBZ2VudCIsImJyYW5kcyIsImJyYW5kIiwibW9iaWxlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJ1c2VyTGFuZ3VhZ2UiLCJtYXhUb3VjaFBvaW50cyIsInZlbmRvciIsImNvbm5lY3Rpb24iLCJkb3dubGluayIsImN1cnJlbnRVUkwiLCJVUkwiLCJob3N0bmFtZSIsImRvTm90VHJhY2siLCJtc0RvTm90VHJhY2siLCJyZWZlcnJlciIsImZpcnN0U2Vzc2lvblJlZmVycmVyIiwicGFnZVR5cGUiLCJwZXJmTWV0cmljcyIsInBlcmZOYXZpZ2F0aW9uTWV0cmljcyIsInBlcmZvcm1hbmNlIiwiZ2V0RW50cmllc0J5VHlwZSIsImNvbm5lY3QiLCJjb25uZWN0RW5kIiwiY29ubmVjdFN0YXJ0IiwicmVxdWVzdCIsInJlc3BvbnNlRW5kIiwicmVxdWVzdFN0YXJ0IiwiZG9tIiwiZG9tSW50ZXJhY3RpdmUiLCJkb21Db21wbGV0ZSIsImxvYWQiLCJsb2FkRXZlbnRFbmQiLCJsb2FkRXZlbnRTdGFydCIsImR1cmF0aW9uIiwic2NoZW1hT3JnRWx0cyIsInNvcmdBcnJheSIsInNUYWciLCJjbnRudCIsImpzb25jb250ZW50IiwiSEVBREVSUyIsIk1vbml0b3IiLCJoYXNBcnJpdmFsTG9nU2VudCIsImhhc01haW5Mb2dTZW50IiwiaGFzVXBkYXRlc1NlbnQiLCJoaWdoV2F0ZXJNYXJrIiwiaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycyIsImltbWVkaWF0ZSIsInBhY2tBbmRRdWV1ZU1haW5Mb2ciLCJwYWNrQW5kUXVldWVJbmNyZW1lbnRhbExvZyIsInBhY2thZ2VNYWluTG9nRGF0YSIsInJlcXVlc3RCbG9iIiwiY2hlY2tGb3JMYXRlc3RDaGFuZ2VzIiwicXVldWVMb2dzIiwiaGFzQ2hhbmdlZCIsInBhY2thZ2VJbmNyZW1lbnRhbExvZ0RhdGEiLCJsb2dEYXRhIiwicGFja2FnZUFycml2YWxMb2dEYXRhIiwiaHdtIiwiY29va2llR2FJZCIsInZpZXdfZXBvY2giLCJib2R5IiwibGMiLCJ1Iiwib25IYXNoUGN0IiwiQmxvYiIsInN0YXJ0c1dpdGgiLCJzIiwibSIsInZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsb3NlRXZlbnQiLCJjYXB0dXJlIiwidmlzaWJpbGl0eVN0YXRlIiwic2VuZEJlYWNvbiIsInF1ZXVlZCIsInF1ZXVlSW50ZXJ2YWwiLCJjaGVja0RhdGFMYXllclJ1bGUiLCJydWxlIiwib3BlcmF0b3IiLCJkYXRhTGF5ZXJGaW5kZXIiLCJydW50aW1lVmFsdWUiLCJjaGVja0VsZW1lbnRSdWxlIiwic2VsZWN0b3JBbGwiLCJzZWxlY3RvckZhbGxiYWNrIiwibWFpblNlbGVjdG9yIiwidGVtcFZhbCIsInJldHVyblZhbCIsImVsZW0iLCJlbGVtZW50U3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsImNoZWNrRnVuY3Rpb25SdWxlIiwicnVsZUZ1bmN0aW9uIiwiRnVuY3Rpb24iLCJjaGVja1Nlc3Npb25SdWxlIiwiZHVyYXRpb25IYW5kbGVyIiwiaGlzdG9yeUhhbmRsZXIiLCJnZXRTZXNzaW9uVGltZXN0YW1wIiwiY3VycmVudEhpc3RvcnkiLCJjaGVja1VybFJ1bGUiLCJyZXF1ZXN0VVJMIiwiY2hlY2tFbnZSdWxlIiwiaXNNb2JpbGUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIkdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkiLCJ0aW1lc3RhbXAiLCJjbGVhclJlcXVlc3QiLCJjbGVhciIsImdldFJlcXVlc3QiLCJjb3VudFJlcXVlc3QiLCJjdXJzb3JSZXF1ZXN0IiwiZXhpc3RpbmdQcm9kSW5mbyIsImVsYXBzZWRTZWNvbmRzIiwicHJvZHVjdEluZm9Qcm9taXNlIiwiY2xlYXJQcm9taXNlIiwicHJvZHVjdEluZm9BcnJheSIsInByZXBhcmVQYXlsb2FkcyIsInBheWxvYWRzIiwiZmllbGROYW1lcyIsInNoaWZ0IiwiU3RvcmUiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJjaGVja1Byb2R1Y3RJbmZvUnVsZSIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRUb0NhcnRDb3VudCIsImdldFByZXZpZXdDb3VudCIsInNhbGVDbnRWaXNpdG9yc0luMTUiLCJjYXJ0Q250VmlzaXRvcnNJbjE1Iiwidmlld0NudFZpc2l0b3JzSW4xIiwiTXV0ZXgiLCJSdWxlRW5naW5lIiwiYmFzZVJ1bGVTZXQiLCJhZGRlZERhdGFMaXN0ZW5lcnMiLCJtdXRleCIsImNoZWNrUnVsZSIsInJ1bGVTYXRpc2ZpZWQiLCJjaGFpbiIsImNoYWluX2NvbmRpdGlvbiIsInJ1bGVzIiwic2F0aXNmaWVkUnVsZUlkcyIsInNldFVwTGlzdGVuZXJzIiwiYWNxdWlyZSIsInJlbGVhc2UiLCJpc0VsaWdpYmxlIiwiZmlsdGVyZWQiLCJrIiwiZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzIiwiZGF0YUxheWVyUnVsZXMiLCJlbGVtZW50UnVsZXMiLCJib3VuZEFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJiaW5kIiwibXV0YXRpb25SZWNvcmQiLCJldmVyeSIsImVsZW1lbnRUb09ic2VydmUiLCJwYXJlbnROb2RlIiwiY29tcHV0ZVNlZ21lbnQiLCJzZWdtZW50IiwicnVsZVNldCIsInNlZ21lbnRSdWxlRW5naW5lIiwiYnVzaW5lc3NSdWxlU2V0IiwiY2hlY2tSdWxlcyIsIlRyZWF0bWVudFJlcG9zaXRvcnkiLCJ1c2VyU2VnbWVudCIsInVzZXJTZWdtZW50V2VpZ2h0cyIsInRyZWF0bWVudCIsInRyZWF0bWVudHNPYmoiLCJ0cmVhdG1lbnRXaXRoVGltZXN0YW1wIiwiZWxhcHNlZERheXMiLCJ3ZWlnaHRzIiwicmVwbGFjZXIiLCJyZXBsYWNlRm4iLCJ2YWwiLCJjdXJyZW50UmVwbGFjZUZuIiwicmVwbGFjZU9iamVjdEV4dHJhY3RvciIsInJlcGxhY2VWYWwiLCJyZXBsYWNlRm5FeGVjdXRvciIsInJGbiIsInNpbmdsZSIsInJlcGxhY2VGdW5jdGlvbiIsInN0b3JhZ2UiLCJrZXlGYWxsYmFjayIsImNoZWNrQWN0aW9uQ29uZGl0aW9uIiwiZWxpZ2libGVFbGVtZW50cyIsImF0dHJpYnV0ZSIsImlubmVyX2NvbmRpdGlvbiIsImNvbmRpdGlvbkVsZW1lbnRzIiwiYWN0aW9uQ29uZGl0aW9uQ2hlY2tlciIsIiQiLCJlbGVtZW50U2t1IiwiYXBwbHlBY3Rpb25zIiwidHJhbnNmb3JtZXIiLCJhcHBseUV2ZW50IiwiY29udGVudFNlbGVjdG9yIiwibWRDb25kaXRpb24iLCJtb3ZlX3NlbGVjdG9yXzEiLCJtb3ZlX3NlbGVjdG9yXzIiLCJwVHlwZSIsInByb2R1Y3RJbmZvU3RvcmFnZSIsIm1jIiwiU3RyaW5nIiwiYmVmb3JlIiwiYWZ0ZXIiLCJhcHBlbmQiLCJvZmYiLCJjcmVhdGVQb3B1cCIsImVsbSIsInN0b3BQcm9wYWdhdGlvbiIsImRpc3BsYXlNb2RhbCIsImdldFByb2R1Y3RJbmZvIiwiZGlzcGxheVBvcHVwIiwiciIsInB1c2hTdGF0ZSIsInN0YXRlIiwib25jZSIsImh0bWwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwiaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSIsImNzcyIsInByb3BlcnR5IiwicHJvcGVydHlWYWx1ZSIsImF0dHIiLCJuMSIsIm4yIiwic3dhcE5vZGVzIiwic291cmNlIiwiZGVzdGluYXRpb24iLCJzZW50ZW5jZSIsIndvcmQiLCJjaGFyQXQiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInJlcGxhY2VXaXRoVmFsIiwiaHRtbFN0ciIsInRpdGxlcyIsInBhcnNlZFRpdGxlcyIsInBhcnNlZFRpdGxlIiwiaGlkZGVuIiwiaGFuZGxlUG9wdXBDbGljayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb2RhbENsaWNrIiwiY29udGFpbnMiLCJoaWRlIiwicVBvcHVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJpc01vZGFsIiwicG9wdXBXcmFwcGVyIiwicG9wdXBDbG9zZUJ1dHRvbiIsInBvcHVwQ2xvc2VCdXR0b25TdHlsZSIsIm9uY2xpY2siLCJjb250ZW50cyIsInNyYyIsInRlbXBsYXRlIiwiaW5uZXJIVE1MIiwicG9wdXAiLCJjb250ZW50IiwiZmlyc3RDaGlsZCIsInAxIiwicDIiLCJpMSIsImkyIiwiaXNFcXVhbE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJ3YWl0Rm9ySlF1ZXJ5IiwialF1ZXJ5IiwialF1ZXJ5SW50ZXJ2YWwiLCJhY3Rpb25BcHBsaWNhdG9yIiwiT0JTRVJWRVJfQ09ORklHIiwiYXR0cmlidXRlcyIsIlJvYm90RW5naW5lIiwiZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMiLCJtYXRjaGVkVHJlYXRtZW50cyIsImVuZ2FnZW1lbnRMb2NrIiwicmVBcHBseVRyZWF0bWVudHNNYXAiLCJhZGRlZERhdGFMaXN0ZW5lcklkcyIsImVuZ2FnZVJvYm90IiwiaW5pdGlhdGVSZWFwcGx5Um9ib3RNYXAiLCJlbGlnaWJpbGl0eVJ1bGVTZXQiLCJkZXZpY2UiLCJyZWFwcGx5X2V2ZW50IiwicmVhcHBseV9ldmVudF9wYWdlX3R5cGUiLCJwcmVwYXJlQW5kQXBwbHkiLCJyZWFwcGx5X2V2ZW50X2FycmF5IiwicmVhcHBseUV2ZW50IiwicHJldmlvdXNWYWx1ZSIsImNoZWNrRWxpZ2liaWxpdHlSdWxlU2V0IiwidHJlYXRtZW50U2tpcFJhdGlvIiwiZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQiLCJ0IiwiZGV0ZXJtaW5pbmdJZGVudGlmaWVyIiwidHJlYXRtZW50UGN0IiwiY2hlY2tCdXNpbmVzc1J1bGVzIiwiYWRkUnVsZVNldERhdGFMaXN0ZW5lcnMiLCJwcmVwYXJlZCIsInRyZWF0bWVudElkcyIsInJlQXBwbHlUcmVhdG1lbnRzIiwiUmVzaXplT2JzZXJ2ZXIiLCJyZWFwcGx5U2VsZWN0b3JMaXN0IiwicmVhcHBseV9zZWxlY3RvciIsImxhc3RTY3JvbGxUaW1lIiwiZ2V0VGltZSIsInN0IiwicGFnZVlPZmZzZXQiLCJyZWFwcGx5SW50ZXJ2YWwiLCJhcHBsaWVkIiwiYm91bmRFbmdhZ2VUcmVhdG1lbnQiLCJzZWxlY3RvcnMiLCJleHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzIiwicHJldmlvdXNTZWxlY3RvcnMiLCJlbGlnaWJpbGl0eVJ1bGUiLCJvcHBvc2l0ZUZsYWciLCJlbGlnaWJpbGl0eVNjb3BlIiwiZWxpZ2liaWxpdHlOYW1lIiwiZWxpZ2liaWxpdHlTZXRUeXBlIiwicHJldmlvdXNJc0VsaWdpYmxlIiwiY2hlY2tFbGlnaWJpbGl0eSIsImJ1c2luZXNzUnVsZSIsImJlYWdsZU9uIiwicGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSIsInBlcnNpc3RQcm9kdWN0SW5mbyIsImVsaWdpYmlsaXR5UnVsZXNBc3Nlc3NQcm9taXNlIiwiYXNzZXNFbGlnaWJpbGl0eVJ1bGVzIiwidHJlYXRtZW50c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRzIiwidHJlYXRtZW50V2VpZ2h0c1Byb21pc2UiLCJnZXRUcmVhdG1lbnRXZWlnaHRzIiwic2VhcmNoUGFyYW1zIiwibGFzdEluZGV4T2YiLCJpdGVtIiwidHJlYXRtZW50UmVwb3NpdG9yeSIsImdldE1hdGNoZWRUcmVhdG1lbnRzIiwicm9ib3RFbmdpbmUiLCJlbmdhZ2VSb2JvdHMiLCJnZXRFbGlnaWJpbGl0eVJ1bGVzIiwicnVsZUVuZ2luZSIsIlNIVVRET1dOIiwibW9uaXRvciIsImVhcmx5TG9nU2VudCIsImhpZGVSZW1vdmVkIiwiY29va2llUGN0IiwicGFja0FuZFF1ZXVlQXJyaXZhbExvZyIsInByb3RvdHlwZSIsIkdMT1ZfT04iLCJpc0xhYmVsU2VudCIsInRpbWVvdXRDb3VudGVyIiwicHJvY2Vzc0FkbWluVXNlciIsImlzQWRtaW4iLCJpc09uIiwic2VuZExvZ3MiXSwic291cmNlUm9vdCI6IiJ9
