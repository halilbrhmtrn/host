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
            console.time("gl-dataLayerFinder-15");
            _context2.next = 4;
            return getFromBeagleInfoLayer(key, true, 25, 1000);
          case 4:
            res = _context2.sent;
            console.timeEnd("gl-dataLayerFinder-15");
            if (!(res !== null && res !== undefined)) {
              _context2.next = 9;
              break;
            }
            dataLayerChecker_logger.success("Found key ".concat(key, " with value ").concat(res));
            return _context2.abrupt("return", res);
          case 9:
            dataLayerChecker_logger.failed("Key ".concat(key, " not found in beagleInfoLayer"));
            return _context2.abrupt("return", null);
          case 11:
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
                _context2.next = _context2.t0 === "session" ? 5 : _context2.t0 === "element" ? 7 : _context2.t0 === "dataLayer" ? 11 : _context2.t0 === "url" ? 15 : _context2.t0 === "function" ? 17 : _context2.t0 === "environment" ? 19 : _context2.t0 === "productInfoLookup" ? 21 : 25;
                break;
              case 5:
                ruleSatisfied = checkSessionRule(rule);
                return _context2.abrupt("break", 27);
              case 7:
                console.time("gl-checkElementRule");
                ruleSatisfied = checkElementRule(rule);
                console.timeEnd("gl-checkElementRule");
                return _context2.abrupt("break", 27);
              case 11:
                _context2.next = 13;
                return checkDataLayerRule(rule);
              case 13:
                ruleSatisfied = _context2.sent;
                return _context2.abrupt("break", 27);
              case 15:
                ruleSatisfied = checkUrlRule(rule);
                return _context2.abrupt("break", 27);
              case 17:
                ruleSatisfied = checkFunctionRule(rule);
                return _context2.abrupt("break", 27);
              case 19:
                ruleSatisfied = checkEnvRule(rule);
                return _context2.abrupt("break", 27);
              case 21:
                _context2.next = 23;
                return checkProductInfoRule(rule);
              case 23:
                ruleSatisfied = _context2.sent;
                return _context2.abrupt("break", 27);
              case 25:
                BeagleRuleEngine_logger.failed("No such rule type: ".concat(type));
                return _context2.abrupt("return", null);
              case 27:
                if (!chain) {
                  _context2.next = 53;
                  break;
                }
                _context2.t1 = chain_condition;
                _context2.next = _context2.t1 === "and" ? 31 : _context2.t1 === "or" ? 38 : _context2.t1 === "xor" ? 45 : 51;
                break;
              case 31:
                _context2.t2 = ruleSatisfied;
                if (!_context2.t2) {
                  _context2.next = 36;
                  break;
                }
                _context2.next = 35;
                return this.checkRule(chain);
              case 35:
                _context2.t2 = _context2.sent;
              case 36:
                ruleSatisfied = _context2.t2;
                return _context2.abrupt("break", 53);
              case 38:
                _context2.t3 = ruleSatisfied;
                if (_context2.t3) {
                  _context2.next = 43;
                  break;
                }
                _context2.next = 42;
                return this.checkRule(chain);
              case 42:
                _context2.t3 = _context2.sent;
              case 43:
                ruleSatisfied = _context2.t3;
                return _context2.abrupt("break", 53);
              case 45:
                _context2.t4 = ruleSatisfied;
                _context2.next = 48;
                return this.checkRule(chain);
              case 48:
                _context2.t5 = _context2.sent;
                ruleSatisfied = _context2.t4 != _context2.t5;
                return _context2.abrupt("break", 53);
              case 51:
                BeagleRuleEngine_logger.failed("No such chain condition");
                return _context2.abrupt("break", 53);
              case 53:
                return _context2.abrupt("return", ruleSatisfied);
              case 54:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWMscUNBQWlDO0FBQy9DO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxHQUFHLEVBQUUseUJBQXlCLFNBQVMseUJBQXlCO0FBQ2hFLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FB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ZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Qcm9wZXJ0eUtleS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvc3RyaW5nVXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9hcGkuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVEYXRhQ29sbGVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU1vbml0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2RhdGFMYXllckNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL2VsZW1lbnRDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9mdW5jdGlvbkNoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVSdWxlRW5naW5lL3Nlc3Npb25DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS91cmxDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9lbnZDaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5jb25maWcuanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZS5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZVJ1bGVFbmdpbmUvcHJvZHVjdEluZm9DaGVja2VyLmpzIiwid2VicGFjazovL2NvcmUvLi9ub2RlX21vZHVsZXMvYXN5bmMtbXV0ZXgvaW5kZXgubWpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlUnVsZUVuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUluZm9MYXllci9zZWdtZW50LWNvbXB1dGVyLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlVHJlYXRtZW50UmVwb3NpdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9yZXBsYWNlLXV0aWxzLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlQXBwbHlBY3Rpb25zL2FjdGlvbi1jb25kaXRpb24tdXRpbC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZUFwcGx5QWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL0JlYWdsZU9uL3JvYm90RW5naW5lLmpzIiwid2VicGFjazovL2NvcmUvLi9zcmMvQmVhZ2xlT24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29yZS8uL3NyYy9CZWFnbGVDbGllbnRTREsvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi90eXBlb2YuanNcIilbXCJkZWZhdWx0XCJdO1xuZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7IC8qISByZWdlbmVyYXRvci1ydW50aW1lIC0tIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLiAtLSBsaWNlbnNlIChNSVQpOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL0xJQ0VOU0UgKi9cbiAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzO1xuICB2YXIgZXhwb3J0cyA9IHt9LFxuICAgIE9wID0gT2JqZWN0LnByb3RvdHlwZSxcbiAgICBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAob2JqLCBrZXksIGRlc2MpIHtcbiAgICAgIG9ialtrZXldID0gZGVzYy52YWx1ZTtcbiAgICB9LFxuICAgICRTeW1ib2wgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCA/IFN5bWJvbCA6IHt9LFxuICAgIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIixcbiAgICBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCIsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICBjb25maWd1cmFibGU6ICEwLFxuICAgICAgd3JpdGFibGU6ICEwXG4gICAgfSksIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3IsXG4gICAgICBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSksXG4gICAgICBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShnZW5lcmF0b3IsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KVxuICAgIH0pLCBnZW5lcmF0b3I7XG4gIH1cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkgJiYgKEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUpO1xuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAoXCJ0aHJvd1wiICE9PSByZWNvcmQudHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZyxcbiAgICAgICAgICB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIFwib2JqZWN0XCIgPT0gX3R5cGVvZih2YWx1ZSkgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgIH1cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoXCJleGVjdXRpbmdcIiA9PT0gc3RhdGUpIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICBpZiAoXCJjb21wbGV0ZWRcIiA9PT0gc3RhdGUpIHtcbiAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gbWV0aG9kKSB0aHJvdyBhcmc7XG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnRleHQubWV0aG9kID0gbWV0aG9kLCBjb250ZXh0LmFyZyA9IGFyZzs7KSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwibmV4dFwiID09PSBjb250ZXh0Lm1ldGhvZCkgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO2Vsc2UgaWYgKFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHtcbiAgICAgICAgICBpZiAoXCJzdXNwZW5kZWRTdGFydFwiID09PSBzdGF0ZSkgdGhyb3cgc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0LmFyZztcbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIFwicmV0dXJuXCIgPT09IGNvbnRleHQubWV0aG9kICYmIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgc3RhdGUgPSBcImV4ZWN1dGluZ1wiO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IFwiY29tcGxldGVkXCIgOiBcInN1c3BlbmRlZFlpZWxkXCIsIHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSAmJiAoc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kLFxuICAgICAgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKHVuZGVmaW5lZCA9PT0gbWV0aG9kKSByZXR1cm4gY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIFwidGhyb3dcIiA9PT0gbWV0aG9kTmFtZSAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSAmJiAoY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCwgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCksIFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHx8IFwicmV0dXJuXCIgIT09IG1ldGhvZE5hbWUgJiYgKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICdcIiArIG1ldGhvZE5hbWUgKyBcIicgbWV0aG9kXCIpKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSByZXR1cm4gY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZywgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgIHJldHVybiBpbmZvID8gaW5mby5kb25lID8gKGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlLCBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jLCBcInJldHVyblwiICE9PSBjb250ZXh0Lm1ldGhvZCAmJiAoY29udGV4dC5tZXRob2QgPSBcIm5leHRcIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCkgOiBpbmZvIDogKGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpO1xuICB9XG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcbiAgICAxIGluIGxvY3MgJiYgKGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXSksIDIgaW4gbG9jcyAmJiAoZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl0sIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiLCBkZWxldGUgcmVjb3JkLmFyZywgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XSwgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTtcbiAgfVxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaXRlcmFibGUubmV4dCkgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBmb3IgKDsgKytpIDwgaXRlcmFibGUubGVuZ3RoOykge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiAhMFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpLCBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGdlbkZ1biAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuICEhY3RvciAmJiAoY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTtcbiAgfSwgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAoZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO1xuICB9LCBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgdm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKSwgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSksIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCksXG4gICAgICBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzLnJldmVyc2UoKSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGZvciAoOyBrZXlzLmxlbmd0aDspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSByZXR1cm4gbmV4dC52YWx1ZSA9IGtleSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7XG4gICAgfTtcbiAgfSwgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXMsIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgXCJ0XCIgPT09IG5hbWUuY2hhckF0KDApICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkgJiYgKHRoaXNbbmFtZV0gPSB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIGRpc3BhdGNoRXhjZXB0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IFwidGhyb3dcIiwgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbiwgY29udGV4dC5uZXh0ID0gbG9jLCBjYXVnaHQgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXSxcbiAgICAgICAgICByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICBpZiAoXCJyb290XCIgPT09IGVudHJ5LnRyeUxvYykgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKSxcbiAgICAgICAgICAgIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uIGFicnVwdCh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbmFsbHlFbnRyeSAmJiAoXCJicmVha1wiID09PSB0eXBlIHx8IFwiY29udGludWVcIiA9PT0gdHlwZSkgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jICYmIChmaW5hbGx5RW50cnkgPSBudWxsKTtcbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gdHlwZSwgcmVjb3JkLmFyZyA9IGFyZywgZmluYWxseUVudHJ5ID8gKHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jLCBDb250aW51ZVNlbnRpbmVsKSA6IHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIHJldHVybiBcImJyZWFrXCIgPT09IHJlY29yZC50eXBlIHx8IFwiY29udGludWVcIiA9PT0gcmVjb3JkLnR5cGUgPyB0aGlzLm5leHQgPSByZWNvcmQuYXJnIDogXCJyZXR1cm5cIiA9PT0gcmVjb3JkLnR5cGUgPyAodGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnLCB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCIsIHRoaXMubmV4dCA9IFwiZW5kXCIpIDogXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUgJiYgYWZ0ZXJMb2MgJiYgKHRoaXMubmV4dCA9IGFmdGVyTG9jKSwgQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykgcmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpLCByZXNldFRyeUVudHJ5KGVudHJ5KSwgQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cbm1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG9iaik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIvLyBUT0RPKEJhYmVsIDgpOiBSZW1vdmUgdGhpcyBmaWxlLlxuXG52YXIgcnVudGltZSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZVwiKSgpO1xubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuXG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL3BhY2thZ2VzL3J1bnRpbWUvcnVudGltZS5qcyNMNzM2PVxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5pbXBvcnQgdG9QcmltaXRpdmUgZnJvbSBcIi4vdG9QcmltaXRpdmUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgY29uc3QgcmVwbGFjZUFsbCA9IChzdHIsIGZpbmQsIHJlcGxhY2UgPSBcIlwiKSA9PiB7XG4gIGlmICghc3RyKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKGZpbmQpO1xuICBpZiAoaW5kZXggPCAwKSByZXR1cm4gc3RyO1xuXG4gIHdoaWxlIChzdHIuaW5kZXhPZihmaW5kKSA+PSAwKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihmaW5kKTtcbiAgICBzdHIgPSAoaW5kZXggPiAwID8gc3RyLnN1YnN0cmluZygwLCBpbmRleCkgOiBcIlwiKSArIHJlcGxhY2UgKyBzdHIuc3Vic3RyaW5nKGluZGV4ICsgZmluZC5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJraXNoVG9Mb3dlciA9IChzdHIpID0+IHtcbiAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0cjtcbiAgbGV0IHN0cmluZyA9IHN0cjtcbiAgY29uc3QgbGV0dGVycyA9IHtcIsSwXCI6IFwiaVwiLCBcIklcIjogXCLEsVwiLCBcIsWeXCI6IFwixZ9cIiwgXCLEnlwiOiBcIsSfXCIsIFwiw5xcIjogXCLDvFwiLCBcIsOWXCI6IFwiw7ZcIiwgXCLDh1wiOiBcIsOnXCJ9O1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKChbxLBJxZ7EnsOcw4fDll0pKS9nLCBmdW5jdGlvbihsZXR0ZXIpIHtcbiAgICByZXR1cm4gbGV0dGVyc1tsZXR0ZXJdO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCB7cmVwbGFjZUFsbH0gZnJvbSBcIi4vc3RyaW5nVXRpbHNcIjtcbmNvbnN0IGlzU3RhZ2luZyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcInN0YWdpbmcudml2ZW5zZVwiKSA6IHRydWU7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIwLjAuMzkuMzFcIjtcbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA9IFwiX2dhXCI7XG4vLyBUT0RPIHJldmVydCB0aGUgZm9sbG93aW5nIHN0YWdpbmcgZW52IGNoZWNrIGFmdGVyIG1vdmluZyB0byBuZXcgYnJhbmNoIHN0cnVjdHVyZVxuZXhwb3J0IGNvbnN0IFRSRUFUTUVOVFNfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvdHJlYXRtZW50c19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS90cmVhdG1lbnRzLmpzb25cIjtcbmV4cG9ydCBjb25zdCBUUkVBVE1FTlRfV0VJR0hUU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS93ZWlnaHRzX3N0YWdpbmcuanNvblwiIDogXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3dlaWdodHMuanNvblwiO1xuZXhwb3J0IGNvbnN0IFNUWUxFU0hFRVRfTE9DQVRJT04gPSBpc1N0YWdpbmcgPyBcImh0dHBzOi8vbmR2aXZlbnNlLmdsb3YuYWkvbmQtc3R5bGVzX3N0YWdpbmcuY3NzXCIgOiBgaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9uZC1zdHlsZXMuY3NzP2lkPSR7cmVwbGFjZUFsbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEzKS5yZXBsYWNlKFwiVFwiLCBcIlwiKSwgXCItXCIsIFwiXCIpfWA7XG5leHBvcnQgY29uc3QgRV9SVUxFU19MT0NBVElPTiA9IGlzU3RhZ2luZyA/IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlc19zdGFnaW5nLmpzb25cIiA6IFwiaHR0cHM6Ly9uZHZpdmVuc2UuZ2xvdi5haS9lbGlnaWJpbGl0eV9ydWxlcy5qc29uXCI7XG5leHBvcnQgY29uc3QgUFJPRFVDVF9JTkZPX0xPQ0FUSU9OID0gXCJodHRwczovL25kdml2ZW5zZS5nbG92LmFpL3NvY2lhbC1wcm9vZi50eHRcIjtcbmV4cG9ydCBjb25zdCBMT0dfQVBJX1VSTCA9IFwiaHR0cHM6Ly9ldXJvcGUtd2VzdDMtbmV4dGRheS0zNGViMy5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2xvZ1wiO1xuZXhwb3J0IGNvbnN0IExPT0tVUF9BUElfVVJMID0gXCJodHRwczovL2NhdGFsb2ctYXBpLmFkb3JhYWkuY29tXCI7XG5leHBvcnQgY29uc3QgTU9CSUxFX01FRElBX1FVRVJZID0gXCIobWF4LXdpZHRoOiA0NDBweClcIjtcbi8vIENvbnRyb2wgZ3JvdXAgcGVyY2VudGFnZVxuZXhwb3J0IGNvbnN0IFNQTElUX1JBVElPID0gNTA7XG4vLyBTa2lwcGVkIHRyZWF0bWVudCBwZXJjZW50YWdlXG5leHBvcnQgY29uc3QgVFJFQVRNRU5UX1JBVElPID0gNTA7XG5leHBvcnQgY29uc3QgVFJFQVRNRU5UU19EVVJBVElPTiA9IDE7XG5leHBvcnQgY29uc3QgTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04gPSAxO1xuZXhwb3J0IGNvbnN0IExJU1RfTU9ERV9CRUFHTEVfS0VZUyA9IFtcInBhZ2V0eXBlXCIsIFwiY2F0ZWdvcnlcIiwgXCJhbGx0aW1lUExQQ2F0ZWdvcnlNb2RlXCIsIFwic2Vzc2lvblBMUENhdGVnb3J5TW9kZVwiLFxuICBcImFsbHRpbWVQRFBDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uUERQQ2F0ZWdvcnlNb2RlXCIsIFwiYWxsdGltZUNhcnRDYXRlZ29yeU1vZGVcIiwgXCJzZXNzaW9uQ2FydENhdGVnb3J5TW9kZVwiXTtcbmV4cG9ydCBjb25zdCBJRExFX1RJTUVPVVQgPSAxNTAwMDtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRV9LRVlTID0ge1xuICBTRVNTSU9OX1RJTUVTVEFNUDogXCJCR19TZXNzaW9uVGltZXN0YW1wXCIsXG4gIFNFU1NJT05fSElTVE9SWTogXCJCR19TZXNzaW9uSGlzdG9yeVwiLFxuICBUUkVBVE1FTlRTOiBcIkJHX1RyZWF0bWVudHNcIixcbiAgUE9QVVBfRElTUExBWV9GTEFHOiBcIkJHX1BvcHVwRGlzcGxheUZsYWdcIixcbiAgU0tVX0lORk9fQkFTS0VUOiBcIkJHX1Byb2R1Y3RJbmZvQmFza2V0XCIsXG4gIFRJTUVPVVRfQ09VTlQ6IFwiQkdfVGltZW91dENvdW50XCIsXG4gIFNFU1NJT05fUkVGRVJSRVI6IFwiQkdfU2Vzc2lvblJlZmVycmVyXCIsXG4gIFdFSUdIVFM6IFwiQkdfV2VpZ2h0c1wiLFxuICBFTElHSUJJTElUWV9SVUxFUzogXCJCR19FX1J1bGVzXCIsXG59O1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZUyA9IHtcbiAgREVCVUdfTU9ERTogXCJCR19EZWJ1Z1wiLFxuICBPVVRfT0ZfU0NPUEU6IFwiQkdfT3V0T2ZTY29wZVwiLFxuICBJU19MQUJFTF9TRU5UOiBcIkJHX0xhYmVsU2VudFwiLFxuICBVU0VSX0lEOiBcIkJHX1VzZXJJZF8wMFwiLFxuICBEQVRBX0NPTExFQ1RJT05fREFUQV9TSVpFOiBcIkJHX0NvbGxlY3Rpb25EYXRhU2l6ZVwiLFxuICBJU19BRE1JTjogXCJHTFZfSXNBZG1pblwiLFxufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9TVE9SQUdFX1BSRUZJWCA9IFwiQkdfU2VnX1wiO1xuIiwiaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWVN9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3Iob3JpZ2luID0gXCJCZWFnbGUgQ2xpZW50IFNES1wiLCB0ZXN0aW5nID0gZmFsc2UpIHtcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcbiAgICBpZiAodGVzdGluZykge1xuICAgICAgdGhpcy5ERUJVRyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuREVCVUcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLkRFQlVHX01PREUpO1xuICAgIH1cbiAgfVxuXG4gIGluZm8oLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLmluZm8oYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBsb2coLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKERFQlVHKSB7XG4gICAgICBjb25zb2xlLmxvZyhgWyR7b3JpZ2lufV1gLCAuLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBmYWlsZWQoLi4uYXJncykge1xuICAgIGNvbnN0IHtERUJVRywgb3JpZ2lufSA9IHRoaXM7XG4gICAgaWYgKCFERUJVRykgcmV0dXJuO1xuICAgIGxldCBtZXNzYWdlQ29uZmlnID0gXCIlYyVzICAgXCI7XG5cbiAgICBhcmdzLmZvckVhY2goKGFyZ3VtZW50KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGFyZ3VtZW50O1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgIG1lc3NhZ2VDb25maWcgKz0gXCIlZCAgIFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJXMgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJW8gICBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlQ29uZmlnLCBcImNvbG9yOiByZWRcIiwgYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICBzdWNjZXNzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7REVCVUcsIG9yaWdpbn0gPSB0aGlzO1xuICAgIGlmICghREVCVUcpIHJldHVybjtcbiAgICBsZXQgbWVzc2FnZUNvbmZpZyA9IFwiJWMlcyAgIFwiO1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmd1bWVudCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBhcmd1bWVudDtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYmlnaW50XCI6XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICBtZXNzYWdlQ29uZmlnICs9IFwiJWQgICBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVzICAgXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWVzc2FnZUNvbmZpZyArPSBcIiVvICAgXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZUNvbmZpZywgXCJjb2xvcjogZ3JlZW5cIiwgYFske29yaWdpbn1dYCwgLi4uYXJncyk7XG4gIH1cblxuICB3YXJuKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB7b3JpZ2lufSA9IHRoaXM7XG4gICAgY29uc29sZS53YXJuKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG5cbiAgZXJyb3IoLi4uYXJncykge1xuICAgIGNvbnN0IHtvcmlnaW59ID0gdGhpcztcbiAgICBjb25zb2xlLmVycm9yKGBbJHtvcmlnaW59XWAsIC4uLmFyZ3MpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IG51bGwgPT0gYXJyID8gbnVsbCA6IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIFN5bWJvbCAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuICBpZiAobnVsbCAhPSBfaSkge1xuICAgIHZhciBfcyxcbiAgICAgIF9lLFxuICAgICAgX3gsXG4gICAgICBfcixcbiAgICAgIF9hcnIgPSBbXSxcbiAgICAgIF9uID0gITAsXG4gICAgICBfZCA9ICExO1xuICAgIHRyeSB7XG4gICAgICBpZiAoX3ggPSAoX2kgPSBfaS5jYWxsKGFycikpLm5leHQsIDAgPT09IGkpIHtcbiAgICAgICAgaWYgKE9iamVjdChfaSkgIT09IF9pKSByZXR1cm47XG4gICAgICAgIF9uID0gITE7XG4gICAgICB9IGVsc2UgZm9yICg7ICEoX24gPSAoX3MgPSBfeC5jYWxsKF9pKSkuZG9uZSkgJiYgKF9hcnIucHVzaChfcy52YWx1ZSksIF9hcnIubGVuZ3RoICE9PSBpKTsgX24gPSAhMCkge1xuICAgICAgICA7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9ICEwLCBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBudWxsICE9IF9pW1wicmV0dXJuXCJdICYmIChfciA9IF9pW1wicmV0dXJuXCJdKCksIE9iamVjdChfcikgIT09IF9yKSkgcmV0dXJuO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuICByZXR1cm4gYXJyMjtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGtleSA9IHRvUHJvcGVydHlLZXkoa2V5KTtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQge2FkZFRvQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIExPQ0FMX1NUT1JBR0VfS0VZUyxcbiAgU0VTU0lPTl9TVE9SQUdFX0tFWVMsXG4gIFNUWUxFU0hFRVRfTE9DQVRJT04sXG4gIFRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OLFxuICBUUkVBVE1FTlRTX0xPQ0FUSU9OLFxuICBFX1JVTEVTX0xPQ0FUSU9OLFxuICBQUk9EVUNUX0lORk9fTE9DQVRJT04sXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVV0aWxzXCIpO1xuY29uc3QgbW9udGhzID0ge1xuICBcIm9jYWtcIjogMCxcbiAgXCLFn3ViYXRcIjogMSxcbiAgXCJtYXJ0XCI6IDIsXG4gIFwibmlzYW5cIjogMyxcbiAgXCJtYXnEsXNcIjogNCxcbiAgXCJoYXppcmFuXCI6IDUsXG4gIFwidGVtbXV6XCI6IDYsXG4gIFwiYcSfdXN0b3NcIjogNyxcbiAgXCJleWzDvGxcIjogOCxcbiAgXCJla2ltXCI6IDksXG4gIFwia2FzxLFtXCI6IDEwLFxuICBcImFyYWzEsWtcIjogMTEsXG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRG9jdW1lbnRIaWRlID0gKCkgPT4ge1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1lYXNlXCIpO1xuICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2xvdi1oaWRlXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFRvRWFzZU91dCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIGVsLnRleHRDb250ZW50ID0gYC5nbG92LWVhc2Uge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtbW96LWFuaW1hdGlvbjogc21vb3RoIDJzIGVhc2UtaW47XG4gICAgLW8tYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICAtbXMtYW5pbWF0aW9uOiBzbW9vdGggMnMgZWFzZS1pbjtcbiAgICBhbmltYXRpb246IHNtb290aCAycyBlYXNlLWluO1xuICB9XG4gIFxuICBAa2V5ZnJhbWVzIHNtb290aCB7XG4gICAgMCUgeyBvcGFjaXR5OiAwO31cbiAgICAyNSUgeyBvcGFjaXR5OiAwLjI1O31cbiAgICA1MCUgeyBvcGFjaXR5OiAwLjU7fVxuICAgIDc1JSB7IG9wYWNpdHk6IDAuNzU7fVxuICAgIDEwMCUgeyBvcGFjaXR5OiAxO31cbiAgfVxuICBALXdlYmtpdC1rZXlmcmFtZXMgc21vb3RoIHtcbiAgICAwJSB7IG9wYWNpdHk6IDA7fVxuICAgIDI1JSB7IG9wYWNpdHk6IDAuMjU7fVxuICAgIDUwJSB7IG9wYWNpdHk6IDAuNTt9XG4gICAgNzUlIHsgb3BhY2l0eTogMC43NTt9XG4gICAgMTAwJSB7IG9wYWNpdHk6IDE7fVxuICB9YDtcbiAgd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucHJlcGVuZChlbCk7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnbG92LWVhc2VcIik7XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJnbG92LWhpZGVcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUcmVhdG1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyB0cmVhdG1lbnRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UU19MT0NBVElPTik7XG4gICAgaWYgKCF0cmVhdG1lbnRzKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBjb25zdCBqc29uVHJlYXRtZW50ID0gYXdhaXQgdHJlYXRtZW50cy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25UcmVhdG1lbnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50c1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRyZWF0bWVudFdlaWdodHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9nZ2VyLmxvZyhcIkZldGNoaW5nIHRyZWF0bWVudCB3ZWlnaHRzXCIpO1xuICAgIGNvbnN0IHRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCBmZXRjaFBsdXMoVFJFQVRNRU5UX1dFSUdIVFNfTE9DQVRJT04pO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvblRyZWF0bWVudFdlaWdodHMgPSBhd2FpdCB0cmVhdG1lbnRXZWlnaHRzLmpzb24oKTtcbiAgICByZXR1cm4ganNvblRyZWF0bWVudFdlaWdodHM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggdHJlYXRtZW50IHdlaWdodHNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvZ2dlci5sb2coXCJGZXRjaGluZyBlbGlnaWJpbGl0eSBydWxlc1wiKTtcbiAgICBjb25zdCBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hQbHVzKEVfUlVMRVNfTE9DQVRJT04pO1xuICAgIGlmICghZWxpZ2liaWxpdHlSdWxlcykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QganNvbkVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbkVsaWdpYmlsaXR5UnVsZXM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZmV0Y2ggZWxpZ2liaWxpdHkgcnVsZXNcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0SW5mbyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2dnZXIubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdCBpbmZvXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgZmV0Y2hQbHVzKFBST0RVQ1RfSU5GT19MT0NBVElPTik7XG4gICAgaWYgKCFwcm9kdWN0SW5mbykgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgY29uc3QgcHJvZHVjdEluZm9DU1YgPSBhd2FpdCBwcm9kdWN0SW5mby50ZXh0KCk7XG4gICAgcmV0dXJuIGNzdlRvQXJyYXkocHJvZHVjdEluZm9DU1YpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGZldGNoIHByb2R1Y3QgaW5mb1wiLCBlcnIubWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVvdXQgPSAodGltZSkgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZSk7XG4gIHJldHVybiBjb250cm9sbGVyO1xufTtcblxuY29uc3QgZmV0Y2hQbHVzID0gKHVybCwgb3B0aW9ucyA9IHt9LCByZXRyaWVzID0gNSkgPT5cbiAgZmV0Y2godXJsLCB7Li4ub3B0aW9ucywgc2lnbmFsOiB0aW1lb3V0KDUwMDApLnNpZ25hbH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5zdGF0dXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIHRpbWVkIG91dCBSZXRyeWluZy4uLjogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIHJldHVybiBmZXRjaFBsdXModXJsLCBvcHRpb25zLCByZXRyaWVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZldGNoIGZhaWxlZDogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdENvb2tpZUlkZW50aWZpZXIgPSAoY29va2llU3RyaW5nLCBjb29raWVOYW1lKSA9PiB7XG4gIGlmICghY29va2llU3RyaW5nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBjb29raWVTdHJpbmdcbiAgICAgIC5zcGxpdChcIjtcIilcbiAgICAgIC5tYXAoKHYpID0+IHYuc3BsaXQoXCI9XCIpKVxuICAgICAgLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgIGlmICh2WzBdICYmIHZbMV0pIHtcbiAgICAgICAgICBhY2NbZGVjb2RlVVJJQ29tcG9uZW50KHZbMF0udHJpbSgpKV0gPSBkZWNvZGVVUklDb21wb25lbnQodlsxXS50cmltKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG5cbiAgbGV0IGlkZW50aWZpZXIgPSBwYXJzZWRbY29va2llTmFtZV07XG4gIGlmICghaWRlbnRpZmllcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChjb29raWVOYW1lID09PSBcIl9nYVwiKSB7XG4gICAgLy8gZXh0cmFjdCB1bmlxdWUgaWRlbnRpZmllciBmcm9tIEdBIGNvb2tpZVxuICAgIGNvbnN0IGlkZW50aWZpZXJJbmRleCA9IDI7XG4gICAgaWRlbnRpZmllciA9IGlkZW50aWZpZXIuc3BsaXQoXCIuXCIpW2lkZW50aWZpZXJJbmRleF07XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXI7XG59O1xuXG5leHBvcnQgY29uc3QgZGV0ZXJtaW5lUGN0ID0gYXN5bmMgKGlkZW50aWZpZXIpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBoYXNoID0gZ2V0VW5zZWN1cmVIYXNoKGlkZW50aWZpZXIpO1xuICAgIGlmIChoYXNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcGN0ID0gaGFzaCAlIDEwMDtcbiAgICBpZiAocGN0ID49IDAgJiYgcGN0IDwgMTAwKSB7XG4gICAgICByZXR1cm4gcGN0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4aXRTY3JvbGxMaXN0ZW5lciA9IChjYWxsQmFjaykgPT4ge1xuICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAobGFzdFNjcm9sbFRvcCAtIDQwMCA+IHNjcm9sbFRvcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChleGl0U2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgY2FsbEJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGxhc3RTY3JvbGxUb3AgPSB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGV4aXRTY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKGxvb3AsIDUwMCk7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXBwbHkgdHJlYXRtZW50cyB0byB0aGUgcGFnZSBvbiBzcGVjaWZpYyBtZWRpYSB0eXBlLlxuICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbWVkaWFRdWVyeUNvbmRpdGlvbiB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICogQHBhcmFtIHtET01Ob2RlTGlzdCB9IGVsZW1lbnRzIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXYucHJvZHVjdF9pbmZvXCIpXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVDaGFuZ2VzTWFwIHsgXCJtYXJnaW4tdG9wXCIgOiBcIjEwcmVtXCJ9XG4gKiBAcmV0dXJuc1xuICovXG5cbmV4cG9ydCBjb25zdCBzdHlsZUFwcGxpY2F0b3IgPSAoZWxlbWVudHMsIHN0eWxlQ2hhbmdlc01hcCkgPT4ge1xuICBsb2dnZXIubG9nKFwiQXBwbHlpbmcgc3R5bGUgY2hhbmdlc1wiLCBzdHlsZUNoYW5nZXNNYXAsIFwidG8gZWxlbWVudHNcIiwgZWxlbWVudHMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlQ2hhbmdlc01hcCkpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluamVjdFN0eWxlU2hlZXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICBzdHlsZVNoZWV0LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICBzdHlsZVNoZWV0LnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlU2hlZXQuaHJlZiA9IFNUWUxFU0hFRVRfTE9DQVRJT047XG4gIHdpbmRvdy50b3AuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlQWN0aW9ucyA9IGFzeW5jIChpZGVudGlmaWVyLCBhY3Rpb25zVG9QcmVwYXJlLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGlvbnNUb1ByZXBhcmUpKTtcbiAgbGV0IHZhcmlhbnQgPSBudWxsO1xuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBhY3Rpb25zKSB7XG4gICAgY29uc3Qge2J1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucywgdmFyaWFudHN9ID0gYWN0aW9uO1xuICAgIGlmICghYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zICYmICF2YXJpYW50cykgY29udGludWU7XG4gICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsICYmIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBidXNpbmVzc1RyYW5zZm9ybWF0aW9uIG9mIGJ1c2luZXNzUnVsZVRyYW5zZm9ybWF0aW9ucykge1xuICAgICAgICBpZiAoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbi5pZCA9PT0gYnVzaW5lc3NSdWxlSWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBidXNpbmVzc1RyYW5zZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcImlkXCIpIHtcbiAgICAgICAgICAgICAgYWN0aW9uW2tleV0gPSBidXNpbmVzc1RyYW5zZm9ybWF0aW9uW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2YXJpYW50cykge1xuICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHZhcmlhbnRLZXldIG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyB2YXJpYW50S2V5KTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiAhYWN0aW9uLnZhcmlhbnRzW3ZhcmlhbnRLZXldLndlaWdodCkge1xuICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSBNYXRoLmZsb29yKDEwMCAvIE9iamVjdC5rZXlzKHZhcmlhbnRzKS5sZW5ndGgpICogKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbVBjdCA8IGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQpIHtcbiAgICAgICAgICB2YXJpYW50ID0gdmFyaWFudEtleTtcbiAgICAgICAgICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1c2luZXNzVHJhbnNmb3JtYXRpb24gb2YgdmFyaWFudHNbdmFyaWFudEtleV0uYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zKSB7XG4gICAgICAgICAgICAgIGlmIChidXNpbmVzc1RyYW5zZm9ybWF0aW9uLmlkID09IGJ1c2luZXNzUnVsZUlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoYnVzaW5lc3NUcmFuc2Zvcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiaWRcIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IGJ1c2luZXNzVHJhbnNmb3JtYXRpb25ba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFudHNbdmFyaWFudEtleV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJ3ZWlnaHRcIiAmJiBrZXkgIT09IFwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zXCIpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25ba2V5XSA9IHZhcmlhbnRzW3ZhcmlhbnRLZXldW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthY3Rpb25zLCB2YXJpYW50XTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyA9ICgpID0+IHtcbiAgY29uc3Qge1BPUFVQX0RJU1BMQVlfRkxBRywgU0VTU0lPTl9USU1FU1RBTVAsIFNFU1NJT05fSElTVE9SWX0gPSBTRVNTSU9OX1NUT1JBR0VfS0VZUztcblxuICBjb25zdCBwb3B1cERpc3BsYXlGbGFnID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpO1xuICBjb25zdCBzZXNzaW9uVGltZXN0YW1wID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1RJTUVTVEFNUCk7XG4gIGNvbnN0IHNlc3Npb25IaXN0b3J5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX0hJU1RPUlkpO1xuXG4gIGlmIChwb3B1cERpc3BsYXlGbGFnID09PSBudWxsKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcsIDApO1xuICB9XG4gIGlmICghc2Vzc2lvblRpbWVzdGFtcCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9USU1FU1RBTVAsIERhdGUubm93KCkpO1xuICB9XG4gIGlmICghc2Vzc2lvbkhpc3RvcnkpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fSElTVE9SWSwgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZV0pO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9ISVNUT1JZLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBzZXNzaW9uSGlzdG9yeV0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29uZGl0aW9uQ2hlY2tlciA9IChydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpID0+IHtcbiAgaWYgKGNvbmRpdGlvbiA9PT0gXCJub3RFeGlzdFwiKSB7XG4gICAgaWYgKCFydW5UaW1lVmFsdWUpIHtcbiAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChydW5UaW1lVmFsdWUgPT09IG51bGwgfHxcbiAgICBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gbnVsbCB8fFxuICAgIGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IHJ1blRpbWVWYWx1ZSBvciBjb25kaXRpb24gaXMgbm90IGRlZmluZWRcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAoY29uZGl0aW9uKSB7XG4gICAgY2FzZSBcImV4aXN0XCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImluY2x1ZGVzXCI6XG4gICAgY2FzZSBcImNvbnRhaW5zXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBjb250YWlucyB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBjb250YWluIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgXCJub3RJbmNsdWRlc1wiOlxuICAgIGNhc2UgXCJub3RDb250YWluc1wiOlxuICAgICAgaWYgKCFydW5UaW1lVmFsdWUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgIGxvZ2dlci5zdWNjZXNzKFwiY29uZGl0aW9uQ2hlY2tlcjogLXNhdGlzZmllZC0gdGFyZ2V0IGRvZXMgbm90IGNvbnRhaW4gdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgY29udGFpbnMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmZhaWxlZChcImNvbmRpdGlvbkNoZWNrZXI6IC1ub3Qgc2F0aXNmaWVkLSB0YXJnZXQgZG9lcyBub3QgZXF1YWwgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcIm5vdEVxdWFsXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBsb2dnZXIuc3VjY2VzcyhcImNvbmRpdGlvbkNoZWNrZXI6IC1zYXRpc2ZpZWQtIHRhcmdldCBkb2VzIG5vdCBlcXVhbCB2YWx1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBlcXVhbHMgdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlID4gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NUaGFuXCI6XG4gICAgICBpZiAocnVuVGltZVZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImdyZWF0ZXJFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgZ3JlYXRlciBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBncmVhdGVyIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImxlc3NFcXVhbHNcIjpcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPD0gdmFsdWUpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgbGVzcyBvciBlcXVhbCB0aGFuIHZhbHVlXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiAtbm90IHNhdGlzZmllZC0gdGFyZ2V0IGlzIG5vdCBsZXNzIG9yIGVxdWFsIHRoYW4gdmFsdWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBcImJldHdlZW5cIjoge1xuICAgICAgbGV0IFttaW4sIG1heF0gPSB2YWx1ZS5zcGxpdChcIixcIik7XG4gICAgICBtaW4gPSBwYXJzZUludChtaW4pO1xuICAgICAgbWF4ID0gcGFyc2VJbnQobWF4KTtcbiAgICAgIGlmIChydW5UaW1lVmFsdWUgPj0gbWluICYmIHJ1blRpbWVWYWx1ZSA8PSBtYXgpIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoXCJjb25kaXRpb25DaGVja2VyOiAtc2F0aXNmaWVkLSB0YXJnZXQgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiY29uZGl0aW9uQ2hlY2tlcjogLW5vdCBzYXRpc2ZpZWQtIHRhcmdldCBpcyBub3QgYmV0d2VlbiBtaW4gYW5kIG1heFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FzZSBcInJlZ2V4XCI6IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh2YWx1ZSwgXCJpXCIpO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QocnVuVGltZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJjb25kaXRpb25DaGVja2VyOiBjb25kaXRpb24gaXMgbm90IGRlZmluZWQgXCIsIGNvbmRpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXREZWJ1Z01vZGUgPSAob29zUmVhc29uKSA9PiB7XG4gIGNvbnN0IHtERUJVR19NT0RFLCBPVVRfT0ZfU0NPUEV9ID0gTE9DQUxfU1RPUkFHRV9LRVlTO1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPVwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShPVVRfT0ZfU0NPUEUsIG9vc1JlYXNvbik7XG4gIH1cblxuICBpZiAocXVlcnlTdHJpbmcuaW5jbHVkZXMoXCJuZF9kZWJ1Zz0xXCIpKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKERFQlVHX01PREUsIDEpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIFwib25cIik7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgaWYgKHF1ZXJ5U3RyaW5nLmluY2x1ZGVzKFwibmRfZGVidWc9MlwiKSkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShERUJVR19NT0RFLCAyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRibVwiLCBcIm9uXCIpO1xuICAgIHJldHVybiAyO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5pbmNsdWRlcyhcIm5kX2RlYnVnPTBcIikpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oREVCVUdfTU9ERSk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkYm1cIiwgXCJvZmZcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgY3VycmVudCA9IHBhcnNlSW50KHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShERUJVR19NT0RFKSk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGJtXCIsIChjdXJyZW50ID8gXCJvblwiIDogXCJvZmZcIikpO1xuICByZXR1cm4gKGN1cnJlbnQgfHwgMCk7XG59O1xuXG4vLyBnZXQgR0EgY2xpZW50IGlkIHVzaW5nIGdhLmdldEFsbCgpXG5leHBvcnQgY29uc3QgZ2V0R2FDbGllbnRJZCA9ICgpID0+IHtcbiAgY29uc3QgZ2EgPSB3aW5kb3cuZ2E7XG4gIC8vIGlmIGdhIGFuZCBnYS5nZXRBbGwoKSBpcyBub3QgZGVmaW5lZCwgcmV0dXJuIG51bGxcbiAgaWYgKGdhICYmIGdhLmdldEFsbCkge1xuICAgIGNvbnN0IHRyYWNrZXJzID0gZ2EuZ2V0QWxsKCk7XG4gICAgaWYgKHRyYWNrZXJzICYmIHRyYWNrZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRyYWNrZXJzWzBdLmdldChcImNsaWVudElkXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIGdldCBkZXRlcm1pbmlzdGljIG51bWVyaWMgaGFzaCBmcm9tIHN0cmluZyB0aGF0IGNvbmF0aW5zIG9ubHkgbnVtYmVyc1xuZXhwb3J0IGNvbnN0IGdldFVuc2VjdXJlSGFzaCA9IChzdHIpID0+IHtcbiAgbGV0IGhhc2ggPSAwO1xuICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICB9XG4gIC8vIHJldHVybiBhYnNvbHV0ZSB2YWx1ZVxuICByZXR1cm4gTWF0aC5hYnMoaGFzaCk7XG59O1xuXG4vLyBnZW5lcmF0ZSBhIDMyLWJpdCByYW5kb20gaW50ZWdlclxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUludCA9ICgpID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKTtcbn07XG5cbi8vIGdldCBjdXJyZW50IHVuaXggZXBvY2ggdGltZSBpbiBzZWNvbmRzXG5leHBvcnQgY29uc3QgZ2V0VW5peFRpbWUgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGdldElkZW50aWZpZXIgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgaWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQpO1xuICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImdldElkZW50aWZpZXI6IGdvdCBpZGVudGlmaWVyIGZyb20gbG9jYWwgc3RvcmFnZVwiLCBpZCk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZCA9IGdldEdhQ2xpZW50SWQoKTtcbiAgICAgIGlmIChpZCAhPT0gbnVsbCAmJiBpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhIGluIGZpcnN0IGF0dGVtcHRcIiwgaWQpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgaWQgPSBnZXRHYUNsaWVudElkKCk7XG4gICAgICAgICAgaWYgKGlkICE9PSBudWxsICYmIGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJnZXRJZGVudGlmaWVyOiBnb3QgaWRlbnRpZmllciBmcm9tIGdhXCIsIGlkKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZXh0cmFjdElkZW50aWZpZXJJbnRlcnZhbCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLlVTRVJfSUQsIGlkKTtcbiAgICAgICAgICAgIHJlc29sdmUoaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGV4dHJhY3RJZGVudGlmaWVySW50ZXJ2YWwpO1xuICAgICAgICAgIGlmIChpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IHJlYWQgR0EgY2xpZW50IGlkXCIpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBpbiBnZXRJZGVudGlmaWVyXCIsIGUpO1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGF5ID0gKG1zKSA9PiBuZXcgUHJvbWlzZSgocmVzKSA9PiBzZXRUaW1lb3V0KHJlcywgbXMpKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERlbGl2ZXJ5RGF0ZSA9IChkYXRlKSA9PiB7XG4gIGlmICghZGF0ZSB8fCB0eXBlb2YgZGF0ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGRhdGU7XG5cbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHN0YXJ0TW9udGhJbmRleDogdW5kZWZpbmVkLFxuICAgIGVuZE1vbnRoSW5kZXg6IHVuZGVmaW5lZCxcbiAgICBzdGFydERheTogdW5kZWZpbmVkLFxuICAgIGVuZERheTogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGxldCBtYXRjaCA9IGRhdGUubWF0Y2goXCIoW1xcXFxkXSspLShbXFxcXGRdKylcXFxccz8oW1xcXFx3xLHDvMSfxZ/DtsOnxLDDlsOHxJ7DnMWeXSspXCIpO1xuICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID09PSA0KSB7XG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5lbmREYXkgPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFszXS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IHJlc3VsdC5zdGFydE1vbnRoSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2ggPSBkYXRlLm1hdGNoKFwiKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKyktKFtcXFxcZF0rKVxcXFxzKyhbXFxcXHfEscO8xJ/Fn8O2w6fEsMOWw4fEnsOcxZ5dKylcIik7XG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5sZW5ndGggIT09IDUpIHJldHVybiBkYXRlO1xuXG4gICAgcmVzdWx0LnN0YXJ0RGF5ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHJlc3VsdC5zdGFydE1vbnRoSW5kZXggPSBtb250aHNbbWF0Y2hbMl0udG9Mb3dlckNhc2UoKV07XG4gICAgcmVzdWx0LmVuZERheSA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICByZXN1bHQuZW5kTW9udGhJbmRleCA9IG1vbnRoc1ttYXRjaFs0XS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCFyZXN1bHQuc3RhcnRNb250aEluZGV4IHx8ICFyZXN1bHQuZW5kTW9udGhJbmRleCkgcmV0dXJuIGRhdGU7XG5cbiAgICBjb25zdCBzdGFydFllYXIgPSByZXN1bHQuc3RhcnRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG4gICAgY29uc3QgZW5kWWVhciA9IHJlc3VsdC5lbmRNb250aEluZGV4ID49IHRvZGF5LmdldE1vbnRoKCkgPyB0b2RheS5nZXRGdWxsWWVhcigpIDogdG9kYXkuZ2V0RnVsbFllYXIoKSArIDE7XG5cbiAgICBjb25zdCBlc3RpbWF0ZWRTdGFydCA9IG5ldyBEYXRlKHN0YXJ0WWVhciwgcmVzdWx0LnN0YXJ0TW9udGhJbmRleCwgcmVzdWx0LnN0YXJ0RGF5KTtcbiAgICBjb25zdCBlc3RpbWF0ZWRFbmQgPSBuZXcgRGF0ZShlbmRZZWFyLCByZXN1bHQuZW5kTW9udGhJbmRleCwgcmVzdWx0LmVuZERheSk7XG5cblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJEYXlzID0gTWF0aC5jZWlsKE1hdGguYWJzKGVzdGltYXRlZFN0YXJ0IC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICBjb25zdCBlbmREaWZmT3ZlckRheXMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoZXN0aW1hdGVkRW5kIC0gdG9kYXkpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcblxuICAgIGNvbnN0IHN0YXJ0RGlmZk92ZXJXZWVrcyA9IHN0YXJ0RGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoc3RhcnREaWZmT3ZlckRheXMgLyA3KTtcbiAgICBjb25zdCBlbmREaWZmT3ZlcldlZWtzID0gZW5kRGlmZk92ZXJEYXlzIDwgNyA/IDAgOiBNYXRoLmNlaWwoZW5kRGlmZk92ZXJEYXlzIC8gNyk7XG5cbiAgICBpZiAoc3RhcnREaWZmT3ZlcldlZWtzID09PSAwICYmIGVuZERpZmZPdmVyV2Vla3MgPT09IDApIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gLSAke2VuZERpZmZPdmVyRGF5c30gR8O8bmA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RGlmZk92ZXJXZWVrcyA9PT0gMCAmJiBlbmREaWZmT3ZlcldlZWtzID49IDEpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyRGF5c30gR8O8biAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICAgIH1cblxuICAgIGlmIChzdGFydERpZmZPdmVyV2Vla3MgPT09IGVuZERpZmZPdmVyV2Vla3MpIHtcbiAgICAgIHJldHVybiBgJHtzdGFydERpZmZPdmVyV2Vla3N9IEhhZnRhYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7c3RhcnREaWZmT3ZlcldlZWtzfSAtICR7ZW5kRGlmZk92ZXJXZWVrc30gSGFmdGFgO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlkbGVUaW1lciA9IGFzeW5jICh0aW1lT3V0LCBjYWxsQmFjaykgPT4ge1xuICBsZXQgaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxCYWNrLCB0aW1lT3V0KTtcblxuICB3aW5kb3cudG9wLmRvY3VtZW50Lm9udG91Y2hzdGFydCA9IHJlc2V0VGltZXI7XG5cbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcbiAgICBjbGVhclRpbWVvdXQoaWRsZVRpbWVvdXQpO1xuICAgIGlkbGVUaW1lb3V0ID0gc2V0VGltZW91dChjYWxsQmFjaywgdGltZU91dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyVHlwZSA9ICgpID0+IHtcbiAgY29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9jaHJvbWV8Y2hyb21pdW18Y3Jpb3MvaSkpIHtcbiAgICByZXR1cm4gXCJjaHJvbWVcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3h8Znhpb3MvaSkpIHtcbiAgICByZXR1cm4gXCJmaXJlZm94XCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9zYWZhcmkvaSkpIHtcbiAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQubWF0Y2goL29wclxcLy9pKSkge1xuICAgIHJldHVybiBcIm9wZXJhXCI7XG4gIH1cblxuICBpZiAodXNlckFnZW50Lm1hdGNoKC9lZGcvaSkpIHtcbiAgICByZXR1cm4gXCJlZGdlXCI7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBpc093bk11dGF0aW9uID0gKG11dGF0aW9uTGlzdCkgPT4ge1xuICBjb25zdCBub2RlcyA9IFsuLi5BcnJheS5mcm9tKG11dGF0aW9uTGlzdFswXS5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvbkxpc3RbMF0ucmVtb3ZlZE5vZGVzKV07XG4gIHJldHVybiBub2Rlcy5zb21lKChuKSA9PiB7XG4gICAgcmV0dXJuIG4udGFnTmFtZSAmJiBBcnJheS5mcm9tKG4uY2xhc3NMaXN0KS5zb21lKChjKSA9PiBjLmluY2x1ZGVzKFwiYm4tXCIpKTtcbiAgfSk7XG59O1xuXG4vLyByZWY6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEyOTMxNjMvMjM0M1xuLy8gVGhpcyB3aWxsIHBhcnNlIGEgZGVsaW1pdGVkIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mXG4vLyBhcnJheXMuIFRoZSBkZWZhdWx0IGRlbGltaXRlciBpcyB0aGUgY29tbWEsIGJ1dCB0aGlzXG4vLyBjYW4gYmUgb3ZlcnJpZGVuIGluIHRoZSBzZWNvbmQgYXJndW1lbnQuXG5mdW5jdGlvbiBjc3ZUb0FycmF5KCBzdHJEYXRhLCBzdHJEZWxpbWl0ZXIgKSB7XG4gIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZGVsaW1pdGVyIGlzIGRlZmluZWQuIElmIG5vdCxcbiAgLy8gdGhlbiBkZWZhdWx0IHRvIGNvbW1hLlxuICBzdHJEZWxpbWl0ZXIgPSAoc3RyRGVsaW1pdGVyIHx8IFwiLFwiKTtcblxuICAvLyBDcmVhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcGFyc2UgdGhlIENTViB2YWx1ZXMuXG4gIGNvbnN0IG9ialBhdHRlcm4gPSBuZXcgUmVnRXhwKFxuICAgICAgKFxuICAgICAgLy8gRGVsaW1pdGVycy5cbiAgICAgICAgXCIoXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJ8XFxcXHI/XFxcXG58XFxcXHJ8XilcIiArXG5cbiAgICAgICAgICAgICAgLy8gUXVvdGVkIGZpZWxkcy5cbiAgICAgICAgICAgICAgXCIoPzpcXFwiKFteXFxcIl0qKD86XFxcIlxcXCJbXlxcXCJdKikqKVxcXCJ8XCIgK1xuXG4gICAgICAgICAgICAgIC8vIFN0YW5kYXJkIGZpZWxkcy5cbiAgICAgICAgICAgICAgXCIoW15cXFwiXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJcXFxcclxcXFxuXSopKVwiXG4gICAgICApLFxuICAgICAgXCJnaVwiLFxuICApO1xuXG5cbiAgLy8gQ3JlYXRlIGFuIGFycmF5IHRvIGhvbGQgb3VyIGRhdGEuIEdpdmUgdGhlIGFycmF5XG4gIC8vIGEgZGVmYXVsdCBlbXB0eSBmaXJzdCByb3cuXG4gIGNvbnN0IGFyckRhdGEgPSBbW11dO1xuXG4gIC8vIENyZWF0ZSBhbiBhcnJheSB0byBob2xkIG91ciBpbmRpdmlkdWFsIHBhdHRlcm5cbiAgLy8gbWF0Y2hpbmcgZ3JvdXBzLlxuICBsZXQgYXJyTWF0Y2hlcyA9IG51bGw7XG5cblxuICAvLyBLZWVwIGxvb3Bpbmcgb3ZlciB0aGUgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXNcbiAgLy8gdW50aWwgd2UgY2FuIG5vIGxvbmdlciBmaW5kIGEgbWF0Y2guXG4gIHdoaWxlIChhcnJNYXRjaGVzID0gb2JqUGF0dGVybi5leGVjKCBzdHJEYXRhICkpIHtcbiAgICAvLyBHZXQgdGhlIGRlbGltaXRlciB0aGF0IHdhcyBmb3VuZC5cbiAgICBjb25zdCBzdHJNYXRjaGVkRGVsaW1pdGVyID0gYXJyTWF0Y2hlc1sxXTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZ2l2ZW4gZGVsaW1pdGVyIGhhcyBhIGxlbmd0aFxuICAgIC8vIChpcyBub3QgdGhlIHN0YXJ0IG9mIHN0cmluZykgYW5kIGlmIGl0IG1hdGNoZXNcbiAgICAvLyBmaWVsZCBkZWxpbWl0ZXIuIElmIGlkIGRvZXMgbm90LCB0aGVuIHdlIGtub3dcbiAgICAvLyB0aGF0IHRoaXMgZGVsaW1pdGVyIGlzIGEgcm93IGRlbGltaXRlci5cbiAgICBpZiAoXG4gICAgICBzdHJNYXRjaGVkRGVsaW1pdGVyLmxlbmd0aCAmJlxuICAgICAgICAgICAgICBzdHJNYXRjaGVkRGVsaW1pdGVyICE9PSBzdHJEZWxpbWl0ZXJcbiAgICApIHtcbiAgICAgIC8vIFNpbmNlIHdlIGhhdmUgcmVhY2hlZCBhIG5ldyByb3cgb2YgZGF0YSxcbiAgICAgIC8vIGFkZCBhbiBlbXB0eSByb3cgdG8gb3VyIGRhdGEgYXJyYXkuXG4gICAgICBhcnJEYXRhLnB1c2goIFtdICk7XG4gICAgfVxuXG4gICAgbGV0IHN0ck1hdGNoZWRWYWx1ZTtcblxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIGRlbGltaXRlciBvdXQgb2YgdGhlIHdheSxcbiAgICAvLyBsZXQncyBjaGVjayB0byBzZWUgd2hpY2gga2luZCBvZiB2YWx1ZSB3ZVxuICAgIC8vIGNhcHR1cmVkIChxdW90ZWQgb3IgdW5xdW90ZWQpLlxuICAgIGlmIChhcnJNYXRjaGVzWzJdKSB7XG4gICAgICAvLyBXZSBmb3VuZCBhIHF1b3RlZCB2YWx1ZS4gV2hlbiB3ZSBjYXB0dXJlXG4gICAgICAvLyB0aGlzIHZhbHVlLCB1bmVzY2FwZSBhbnkgZG91YmxlIHF1b3Rlcy5cbiAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbMl0ucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKCBcIlxcXCJcXFwiXCIsIFwiZ1wiICksXG4gICAgICAgICAgXCJcXFwiXCIsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBmb3VuZCBhIG5vbi1xdW90ZWQgdmFsdWUuXG4gICAgICBzdHJNYXRjaGVkVmFsdWUgPSBhcnJNYXRjaGVzWzNdO1xuICAgIH1cblxuXG4gICAgLy8gTm93IHRoYXQgd2UgaGF2ZSBvdXIgdmFsdWUgc3RyaW5nLCBsZXQncyBhZGRcbiAgICAvLyBpdCB0byB0aGUgZGF0YSBhcnJheS5cbiAgICBhcnJEYXRhW2FyckRhdGEubGVuZ3RoIC0gMV0ucHVzaCggc3RyTWF0Y2hlZFZhbHVlICk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBhcnNlZCBkYXRhLlxuICByZXR1cm4gKCBhcnJEYXRhICk7XG59XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVcIixcbiAgdmVyc2lvbjogMSxcbiAgbWFpbnRlbmFuY2VPcGVyYXRpb25Db3VudDogMTAwMCwgLy8gYWZmZWN0cyB2ZXJzaW9uXG4gIHN0b3JlOiB7XG4gICAgbmFtZTogXCJkYXRhXCIsXG4gICAgaW5kZXhlczogW3tcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVcIixcbiAgICAgIGZpZWxkczogW1wiZGF0YV9uYW1lXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfc2Vzc2lvblwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJzZXNzaW9uX2lkXCJdLFxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlXCIsXG4gICAgICBmaWVsZHM6IFtcImRhdGFfbmFtZVwiLCBcImRhdGFfdmFsdWVcIl0sXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJpeF9kYXRhTmFtZV9kYXRhVmFsdWVfc2Vzc2lvblwiLFxuICAgICAgZmllbGRzOiBbXCJkYXRhX25hbWVcIiwgXCJkYXRhX3ZhbHVlXCIsIFwic2Vzc2lvbl9pZFwiXSxcbiAgICB9XSxcbiAgICBvcHRpb25zOiB7a2V5UGF0aDogXCJpZFwiLCBhdXRvSW5jcmVtZW50OiB0cnVlfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCBjb25maWcgZnJvbSBcIi4vc3RvcmUuY29uZmlnXCI7XG5pbXBvcnQge2dldEJyb3dzZXJUeXBlfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyXCIpO1xuY29uc3QgX3dpbmRvdyA9IHtcbiAgYWxsdGltZTogXCJhbGx0aW1lXCIsIHNlc3Npb246IFwic2Vzc2lvblwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVhZ2xlRGF0YUNvbGxlY3Rpb25XcmFwcGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRleGVkREIgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gaW5pdGlhbGl6ZWQgZGIgd2l0aDogXCIsIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIC8vIFRPRE8sIHVuY29tbWVudCBuZXh0IGxpbmUgb25jZSBleGlzdGluZyBzdGFsZSBkYnMgYXJlIHB1cmdlZFxuICAgIC8vIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSk7XG4gICAgaWYgKCFvcGVuUmVxdWVzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW5kZXhlZGRiIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgb3BlblJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIFRPRE8gdXBncmFkZSBleGlzdGluZyBkYiBpbnN0ZWFkIG9mIGRlbGV0ZSBhbmQgY3JlYXRlIGZyb20gc2NyYXRjaFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvcGVuUmVxdWVzdC5yZXN1bHQuZGVsZXRlT2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBkZWxldGUgb3V0ZGF0ZWQgZGF0YWJhc2VcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gb3BlblJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lLCBjb25maWcuc3RvcmUub3B0aW9ucyk7XG4gICAgICAgIGlmIChjb25maWcuc3RvcmUuaW5kZXhlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3QgaWR4IG9mIGNvbmZpZy5zdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleChpZHgubmFtZSwgaWR4LmZpZWxkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjcmVhdGUgb2JqZWN0IHN0b3JlIG9uIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb3BlblJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBiZWFnbGUgaW5kZXhlZCBEQlwiLCBvcGVuUmVxdWVzdC5lcnJvcik7XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRiID0gb3BlblJlcXVlc3QucmVzdWx0O1xuICAgICAgaWYgKGRiLnZlcnNpb24gIT09IDEpIHtcbiAgICAgICAgLy8gVE9ETywgcmVtb3ZlIGRlbGV0ZSByZXF1ZXN0IG9uY2UgZXhpc3Rpbmcgc3RhbGUgZGJzIGFyZSBwdXJnZWRcbiAgICAgICAgY29uc3QgZGVsZXRlUmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoY29uZmlnLmRiTmFtZSk7XG4gICAgICAgIGRlbGV0ZVJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHRoaXMuaW5kZXhlZERCID0gZGI7XG4gICAgfTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDI1KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5kZXhlZERCKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkluZGV4ZWREQiBub3QgaW5pdGlhbGl6ZWQgd2l0aGluIHRoZSBhbGxvdHRlZCB0aW1lXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbml0VHJhbnNhY3Rpb24ocmVhZHdyaXRlID0gZmFsc2UpIHtcbiAgICBhd2FpdCB0aGlzLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCB0eCA9IHRoaXMuaW5kZXhlZERCLnRyYW5zYWN0aW9uKGNvbmZpZy5zdG9yZS5uYW1lLCAocmVhZHdyaXRlID8gXCJyZWFkd3JpdGVcIiA6IFwicmVhZG9ubHlcIikpO1xuICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoY29uZmlnLnN0b3JlLm5hbWUpO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xuICB9XG5cbiAgYXN5bmMgc2F2ZShkYXRhTmFtZSwgZGF0YVZhbHVlKSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB0aGlzLmluaXRUcmFuc2FjdGlvbih0cnVlKTtcbiAgICBjb25zdCBzZXNzaW9uSWQgPSB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKTsgLy8gZGF0ZSBjdXJyZW50IC0yIHNhYXQgIHlpbC1heS1ndW5cbiAgICBjb25zdCB0aW1lID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG5cbiAgICBjb25zdCBwYXlsb2FkID0ge1wiZGF0YV9uYW1lXCI6IGRhdGFOYW1lLCBcImRhdGFfdmFsdWVcIjogZGF0YVZhbHVlLCBcInNlc3Npb25faWRcIjogc2Vzc2lvbklkLCB0aW1lfTtcbiAgICBzdG9yZS5wdXQocGF5bG9hZCk7XG4gIH1cblxuICBtaW5tYXgoZGF0YU5hbWUsIG9wLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IHN0b3JlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RvcmVkID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAob3AgPT09IFwibWluXCIgJiYgdmFsdWVbXCJkYXRhX3ZhbHVlXCJdIDwgc3RvcmVkKSB8fFxuICAgICAgICAgICAgICAgIChvcCA9PT0gXCJtYXhcIiAmJiB2YWx1ZVtcImRhdGFfdmFsdWVcIl0gPiBzdG9yZWQpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0b3JlZCA9IHZhbHVlW1wiZGF0YV92YWx1ZVwiXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShzdG9yZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbWluKGRhdGFOYW1lLCB3aW5kb3cgPSBfd2luZG93LmFsbHRpbWUpIHtcbiAgICByZXR1cm4gdGhpcy5taW5tYXgoZGF0YU5hbWUsIFwibWluXCIsIHdpbmRvdyk7XG4gIH1cblxuICBtYXgoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiB0aGlzLm1pbm1heChkYXRhTmFtZSwgXCJtYXhcIiwgd2luZG93KTtcbiAgfVxuXG4gIGdyb3VwQnkoZGF0YU5hbWUsIHdpbmRvdyA9IF93aW5kb3cuYWxsdGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICBpZiAoXCJkYXRhX3ZhbHVlXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKCFtYXAuaGFzKHZhbHVlW1wiZGF0YV92YWx1ZVwiXSkpIG1hcC5zZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdLCAwKTtcbiAgICAgICAgICAgICAgbWFwLnNldCh2YWx1ZVtcImRhdGFfdmFsdWVcIl0sIG1hcC5nZXQodmFsdWVbXCJkYXRhX3ZhbHVlXCJdKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwia2V5IG5vdCBmb3VuZCBpbiBjdXJzb3IgdmFsdWVzIFwiICsgZGF0YU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShtYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbW9kZShkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZ3JvdXBCeShkYXRhTmFtZSwgd2luZG93KTtcbiAgICBpZiAoZGF0YS5rZXlzKCkubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IG1heCA9IHtuYW1lOiB1bmRlZmluZWQsIHZhbHVlOiAtMX07XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBkYXRhKSB7XG4gICAgICBpZiAobWF4LnZhbHVlIDwgdmFsdWUpIHtcbiAgICAgICAgbWF4Lm5hbWUgPSBrZXk7XG4gICAgICAgIG1heC52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXg7XG4gIH1cblxuICBjb3VudChkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN1bShkYXRhTmFtZSwgd2luZG93ID0gXCJhbGx0aW1lXCIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgbGV0IHRvdGFsID0gMC4wMDtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3Ioc3RvcmUsIGRhdGFOYW1lLCB3aW5kb3cpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIGlmIChcImRhdGFfdmFsdWVcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICB0b3RhbCArPSBwYXJzZUZsb2F0KHZhbHVlW1wiZGF0YV92YWx1ZVwiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJrZXkgbm90IGZvdW5kIGluIGN1cnNvciB2YWx1ZXMgXCIgKyBkYXRhTmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHRvdGFsLnRvRml4ZWQoMikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q3Vyc29yKHN0b3JlLCBkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lLCBkYXRhVmFsdWUgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZGF0YVZhbHVlKSB7XG4gICAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmluZGV4KFwiaXhfZGF0YU5hbWVfZGF0YVZhbHVlX3Nlc3Npb25cIilcbiAgICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCBkYXRhVmFsdWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpLnRvU3RyaW5nKCldKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX2RhdGFWYWx1ZVwiKVxuICAgICAgICAgIC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoW2RhdGFOYW1lLCBkYXRhVmFsdWVdKSk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdyA9PT0gX3dpbmRvdy5zZXNzaW9uKSB7XG4gICAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZV9zZXNzaW9uXCIpXG4gICAgICAgICAgLm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seShbZGF0YU5hbWUsIHRoaXMuZ2V0Q3VycmVudFNlc3Npb25JZCgpLnRvU3RyaW5nKCldKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXhWYWx1ZSA9IGdldEJyb3dzZXJUeXBlKCkgPT09IFwic2FmYXJpXCIgPyBkYXRhTmFtZSA6IFtkYXRhTmFtZV07XG5cbiAgICByZXR1cm4gc3RvcmUuaW5kZXgoXCJpeF9kYXRhTmFtZVwiKVxuICAgICAgICAub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KGluZGV4VmFsdWUpKTtcbiAgfVxuXG4gIGFzeW5jIGF2ZyhkYXRhTmFtZSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgY29uc3QgdG90YWwgPSBhd2FpdCB0aGlzLnN1bShkYXRhTmFtZSwgd2luZG93KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMuY291bnQoZGF0YU5hbWUsIHdpbmRvdyk7XG5cbiAgICBpZiAoIXRvdGFsIHx8ICFjb3VudCkgcmV0dXJuIDA7XG5cbiAgICByZXR1cm4gKHRvdGFsIC8gY291bnQpLnRvRml4ZWQoMik7XG4gIH1cblxuICBhc3luYyBsYXN0KGRhdGFOYW1lLCBzaXplID0gMSwgd2luZG93ID0gX3dpbmRvdy5hbGx0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmluaXRUcmFuc2FjdGlvbigpLnRoZW4oKHN0b3JlKSA9PiB7XG4gICAgICAgIGxldCBjdXJzb3IgPSBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lXCIpLm9wZW5DdXJzb3IoW2RhdGFOYW1lXSwgXCJwcmV2XCIpO1xuICAgICAgICBpZiAod2luZG93ID09PSBfd2luZG93LnNlc3Npb24pIHtcbiAgICAgICAgICBjdXJzb3IgPSBzdG9yZS5pbmRleChcIml4X2RhdGFOYW1lX3Nlc3Npb25cIilcbiAgICAgICAgICAgICAgLm9wZW5DdXJzb3IoW2RhdGFOYW1lLCB0aGlzLmdldEN1cnJlbnRTZXNzaW9uSWQoKV0sIFwicHJldlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBjdXJzb3Iub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGlmIChyZXN1bHQgJiYgaW5kZXggPCBzaXplKSB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5jb250aW51ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50U2Vzc2lvbklkKCkge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0SG91cnMoZC5nZXRIb3VycygpIC0gMik7XG5cbiAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpICsgXCItXCIgK1xuICAgICAgKGQuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpICsgXCItXCIgK1xuICAgICAgZC5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCBDb2xsZWN0b3JBcGkgZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uL2FwaVwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVEYXRhQ29sbGVjdGlvblwiKTtcbmNvbnN0IGNvbGxlY3RvckFwaSA9IG5ldyBDb2xsZWN0b3JBcGkoKTtcblxuLy8ga2VlcCBhIHRhYmxlIGluIGluZGV4ZGIgdGhlIGZvcm1hdCBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBkYXRhX3ZhbHVlLCBzdG9yZWRfdmFsdWVdXG5cbmV4cG9ydCBjb25zdCBxdWVyeUluQ29sbGVjdG9yID0gYXN5bmMgKGJhc2VGZWF0dXJlTmFtZSwgcXVlcnlNZXRob2QsIHdpbmRvdykgPT4ge1xuICBsb2dnZXIubG9nKFwicXVlcnlJbkNvbGxlY3RvclwiLCBiYXNlRmVhdHVyZU5hbWUsIHF1ZXJ5TWV0aG9kLCB3aW5kb3cpO1xuICBpZiAoIWNvbGxlY3RvckFwaSkge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJJbmRleGVkREIgbm8gc3VwcG9ydGVkL0luaXRpYWxpemVkXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gd2luZG93IGNhbiBiZSBlaXRoZXIgc2FtZWRheSBvciBhbGx0aW1lXG5cbiAgaWYgKHF1ZXJ5TWV0aG9kID09PSBcIm1pblwiKSB7XG4gICAgY29uc3QgcXVlcnlQcm9taXNlID0gYXdhaXQgY29sbGVjdG9yQXBpLm1pbihiYXNlRmVhdHVyZU5hbWUsIHdpbmRvdyk7XG4gICAgcmV0dXJuIHF1ZXJ5UHJvbWlzZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtYXhcIikge1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5tYXgoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIHJldHVybiBxdWVyeVByb21pc2U7XG4gIH0gZWxzZSBpZiAocXVlcnlNZXRob2QgPT09IFwiYXZnXCIpIHtcbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBhd2FpdCBjb2xsZWN0b3JBcGkuYXZnKGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcbiAgICByZXR1cm4gcXVlcnlQcm9taXNlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5TWV0aG9kID09PSBcImNkXCIpIHtcbiAgICByZXR1cm4gKGF3YWl0IGNvbGxlY3RvckFwaS5ncm91cEJ5KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KSkuc2l6ZTtcbiAgfSBlbHNlIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJjdlwiKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGNvbGxlY3RvckFwaS5ncm91cEJ5KGJhc2VGZWF0dXJlTmFtZSwgd2luZG93KTtcblxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBbLCB2YWx1ZV0gb2YgZGF0YSkge1xuICAgICAgY291bnQgKz0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGlmIChxdWVyeU1ldGhvZCA9PT0gXCJtb2RlXCIpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY29sbGVjdG9yQXBpLm1vZGUoYmFzZUZlYXR1cmVOYW1lLCB3aW5kb3cpO1xuICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGRhdGEubmFtZTtcbiAgfVxuXG4gIGlmIChxdWVyeU1ldGhvZC5pbmRleE9mKFwibGFzdFwiKSA+PSAwKSB7XG4gICAgY29uc3QgbWF0Y2ggPSBxdWVyeU1ldGhvZC5tYXRjaChcImxhc3RcXFxcKChbXFxcXGRdKylcXFxcKVwiKTtcbiAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaC5sZW5ndGggPT09IDIgfHwgcGFyc2VJbnQobWF0Y2hbMV0pIDwgMSApIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHF1ZXJ5UHJvbWlzZSA9IGF3YWl0IGNvbGxlY3RvckFwaS5sYXN0KGJhc2VGZWF0dXJlTmFtZSwgbWF0Y2hbMV0sIHdpbmRvdyk7XG4gICAgY29uc3QgZGF0YVZhbHVlcyA9IHF1ZXJ5UHJvbWlzZS5tYXAoKG9iaikgPT4gb2JqLmRhdGFfdmFsdWUpO1xuICAgIHJldHVybiBkYXRhVmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAge1wiTGlzdGluZ3BhZ2VcIiA9PiAyMX1cbiAgICB7XCJIb21lcGFnZVwiID0+IDEyfVxuICAgIC0tIGV4YW1wbGUgd2lsbCBoYXZlOlxuICAgIG1vZGU6IExpc3RpbmdwYWdlXG4gICAgY2Q6IDJcbiAgICBjdjogMjErMTJcbiAgICBsYXN0KDMpIChuLCBuLTEsIG4tMilcbiAgKi9cblxuICAvLyAxMDAwbGlrIHRlbWl6bGVuZWNlayAobWFpbnRPcENvdW50IC0+IHZlcnNpb24pXG5cbiAgLy8gcXVlcnlNZXRob2QgY2FuIGJlIFwibW9kZVwiLCBcImNkXCIgKGNvdW50IGRpc3RpbnQpIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlc1xuICAvLyBxdWVyeU1ldGhvZCBjYW4gYmUgXCJjdlwiIChzdW0gb2YgY291bnQgdmFsdWVzKSwgXCJjdXJyZW50XCIsIG9yIFwicHJldlwiIGZvciBhbnkgZGF0YSB0eXBlIChzdG9yZWQgdmlhIGxhc3QpXG4gIGxvZ2dlci5mYWlsZWQoYHVua25vd24gcXVlcnlNZXRob2Q9JHtxdWVyeU1ldGhvZH0gaW4gQmVhZ2xlRGF0YUNvbGxlY3Rpb25gKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlSW5Db2xsZWN0b3IgPSBhc3luYyAoYmFzZUZlYXR1cmVOYW1lLCBiYXNlRmVhdHVyZVZhbHVlLCB1cGRhdGVNZXRob2QpID0+IHtcbiAgbG9nZ2VyLmxvZyhcInVwZGF0ZUluQ29sbGVjdG9yXCIsIGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgdXBkYXRlTWV0aG9kKTtcbiAgaWYgKCFjb2xsZWN0b3JBcGkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiSW5kZXhlZERCIG5vIHN1cHBvcnRlZC9Jbml0aWFsaXplZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGF3YWl0IGNvbGxlY3RvckFwaS5zYXZlKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSk7XG5cblxuICAvLyB1cGRhdGVNZXRob2QgY2FuIGJlIFwibWluXCIsIFwibWF4XCIsIFwiY250XCIsIFwic3VtXCIgZm9yIG51bWVyaWMgZGF0YSB0eXBlcywgbWluLW1heCBjb21wYXJlcyB3aXRoIG9ubHkgZXhpc3RpbmcsIGF2ZyB1cGRhdGVzIGNudCBhbmQgc3VtXG4gIC8vIC0tPiBtaW46IFtzZXNzaW9uX2lkLCBkYXRhX25hbWUsIFwibWluXCIsIChsZWFzdCBvZiBleGlzdGluZyBhbmQgaW5jb21pbmcgc3RvcmVkX3ZhbHVlKV1cbiAgLy8gLS0+IG1heDogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJtYXhcIiwgKGdyZWF0ZXN0IG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gc3VtOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInN1bVwiLCAoc3VtIG9mIGV4aXN0aW5nIGFuZCBpbmNvbWluZyBzdG9yZWRfdmFsdWUpXVxuICAvLyAtLT4gY250OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImNudFwiLCAoZXhpc3RpbmcgKyAxKV1cbiAgLy9cbiAgLy8gdXBkYXRlTWV0aG9kIGNhbiBiZSBcImNvdW50X3ZhbHVlc1wiIGZvciBzdHJpbmcvY2F0ZWdvcmljYWwgZGF0YSB0eXBlcywga2VlcCBhIGNvdW50ZXIgZm9yIGVhY2ggdmFsdWVcbiAgLy8gLS0+IGNvdW50X3ZhbHVlczogW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgZGF0YV92YWx1ZSwgKGV4aXN0aW5nICsgMSldXG4gIC8vXG4gIC8vIHVwZGF0ZU1ldGhvZCBjYW4gYmUgXCJsYXN0XCIgZm9yIGFueSBkYXRhIHR5cGUgLS0+IGtlZXBzIDIgdmFsdWVzIGZvciBjdXJyZW50IGFuZCB0aGUgcHJldmlvdXNcbiAgLy8gZGVsZXRlOiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInByZXZcIiwgKGV4aXN0aW5nIHZhbHVlKV1cbiAgLy8gbW92ZTogZXhpc3RpbmcgW3Nlc3Npb25faWQsIGRhdGFfbmFtZSwgXCJjdXJyZW50XCIsIChleGlzdGluZyB2YWx1ZSldIC0tPiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcInByZXZcIiwgKGV4aXN0aW5nIHZhbHVlKV1cbiAgLy8gcHV0OiBbc2Vzc2lvbl9pZCwgZGF0YV9uYW1lLCBcImN1cnJlbnRcIiwgKGluY29taW5nIHN0b3JlZF92YWx1ZSldXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IHtmb3JtYXREZWxpdmVyeURhdGUsIGlzT3duTXV0YXRpb259IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZU30gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtxdWVyeUluQ29sbGVjdG9yLCB1cGRhdGVJbkNvbGxlY3Rvcn0gZnJvbSBcIi4uL0JlYWdsZURhdGFDb2xsZWN0aW9uXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcblxud2luZG93LmJlYWdsZUluZm9MYXllciA9IHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIgfHwge1xuICBhOiB7fSwgZToge30sIGY6IHt9LCBfX2h3bTogMCxcbn07XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVJbmZvTGF5ZXJcIik7XG5cbi8vIFRPRE86IGNvbnZlcnQgdG8gbmFtZSAtLT4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5jb25zdCBzZWFyY2hQYXRocyA9IFtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHQSBEYXRhIExheWVyIFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcIlBhZ2VUeXBlXCIsIG5hbWU6IFwiUGFnZVR5cGVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJpc0FkbWluXCIsIG5hbWU6IFwidnZzSXNTaG93cm9vbVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInVzZXJJZFwiLCBuYW1lOiBcInZ2c1VzZXJJZFwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfbmFtZVwiLCBuYW1lOiBcInBkcC5uYW1lXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInByb2R1Y3Rncm91cFwiLCBuYW1lOiBcInBkcC5ncm91cFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlX2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNsYXNzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImNvbnRlbnRfaWRzXCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwidXBwZXJDYXNlVFJcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiUHJvZHVjdElEXCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2NhdGVnb3J5XCIsIG5hbWU6IFwicGRwLmNhdGVnb3J5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5kZXRhaWwuYWN0aW9uRmllbGQubGlzdFwiLCBuYW1lOiBcInBkcC5saXN0YWxpYXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouc2t1XCIsIG5hbWU6IFwicGRwLnNrdVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5jYXRlZ29yeVwiLCBuYW1lOiBcInBkcC5jYXRlZ29yeVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5kaXNjb3VudFJhdGVcIiwgbmFtZTogXCJwZHAuZGlzY291bnRSYXRlXCIsIGZvcm1hdHRlcjogXCJkZWFycmF5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VQcm9kdWN0cy4qLmZhc3REZWxpdmVyeVwiLCBuYW1lOiBcInBkcC5mYXN0RGVsaXZlcnlcIiwgZm9ybWF0dGVyOiBcImRlYXJyYXlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwidml2ZW5zZVByb2R1Y3RzLiouaXNJblNob3dyb29tXCIsIG5hbWU6IFwicGRwLmlzSW5TaG93cm9vbVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJ2aXZlbnNlUHJvZHVjdHMuKi5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwiLCBmb3JtYXR0ZXI6IFwiZGVhcnJheVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInNlYXJjaF9zdWNjZXNzXCIsIG5hbWU6IFwicGxwLnNlYXJjaFN1Y2Nlc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuaWRcIiwgXCJwbHAuYXBwcm94aW1hdGVDb3VudFwiLCBcInBscC5uYW1lXCIsIFwicGxwLmdyb3VwXCIsIFwicGxwLmNsYXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjb250ZW50X2lkc1wiLCBuYW1lOiBcInBscC5pZFwiLCBleGNsdXNpdmU6IFtcInBscC5zZWFyY2hTdWNjZXNzXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJjYXRlZ29yeV9wcm9kdWN0X2NvdW50XCIsIG5hbWU6IFwicGxwLmFwcHJveGltYXRlQ291bnRcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiY29udGVudF9uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwicHJvZHVjdGdyb3VwXCIsIG5hbWU6IFwicGxwLmdyb3VwXCIsIGV4Y2x1c2l2ZTogW1wicGxwLnNlYXJjaFN1Y2Nlc3NcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcInZpdmVuc2VfY2F0ZWdvcnlcIiwgbmFtZTogXCJwbHAuY2xhc3NcIiwgZXhjbHVzaXZlOiBbXCJwbHAuc2VhcmNoU3VjY2Vzc1wiXX0sXG5cbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UucHJvZHVjdHMuKi5pZFwiLCBuYW1lOiBcInB1cmNoYXNlLnNrdXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucHJpY2VcIiwgbmFtZTogXCJwdXJjaGFzZS5wcmljZXNcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiR0FEYXRhTGF5ZXJcIiwgc2VsZWN0b3I6IFwiZWNvbW1lcmNlLnB1cmNoYXNlLnByb2R1Y3RzLioucXVhbnRpdHlcIiwgbmFtZTogXCJwdXJjaGFzZS5xdWFudGl0aWVzXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5wcm9kdWN0cy4qLmNhdGVnb3J5XCIsIG5hbWU6IFwicHVyY2hhc2UuY2F0ZWdvcmllc1wifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuaWRcIiwgbmFtZTogXCJwdXJjaGFzZS5vcmRlcklkXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkdBRGF0YUxheWVyXCIsIHNlbGVjdG9yOiBcImVjb21tZXJjZS5wdXJjaGFzZS5hY3Rpb25GaWVsZC5yZXZlbnVlXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJHQURhdGFMYXllclwiLCBzZWxlY3RvcjogXCJlY29tbWVyY2UucHVyY2hhc2UuYWN0aW9uRmllbGQuZGltZW5zaW9uMTVcIiwgbmFtZTogXCJwdXJjaGFzZS5wYXltZW50VHlwZVwifSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIERvY3VtZW50IFF1ZXJpZXNcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInBhZ2VfcHJldmlld193cmFwcGVyX3Byb2R1Y3Rpb25cXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIkhvbWVwYWdlXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY2F0ZWdvcnlfcGFnZV93cmFwcGVyXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJMaXN0aW5ncGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3QtbWFpbi1kZXRhaWxzXFxcIl1cIiwgbmFtZTogXCJQYWdlVHlwZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5VmFsdWVJZkhhc0lubmVyVGV4dFwiLCB2YWx1ZTogXCJQcm9kdWN0cGFnZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIipcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcInByb2R1Y3RcXFwiXVwiLCBuYW1lOiBcIlBhZ2VUeXBlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlWYWx1ZUlmSGFzSW5uZXJUZXh0XCIsIHZhbHVlOiBcIlByb2R1Y3RwYWdlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwid2VsY29tZV91c2VybmFtZVxcXCJdXCIsIG5hbWU6IFwidmlldy5pc0xvZ2dlZEluXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlIYXNJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJIb21lcGFnZXxQcm9kdWN0cGFnZXxMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiZW1wdHlfYmFza2V0X3RleHRcXFwiXVwiLCBuYW1lOiBcImNhcnQuaXNlbXB0eVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC50b3RhbEJhc2VQcmljZVwiLCBcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcImJvZHkgPiAuZGVza3RvcF9sYXlvdXRfd3JhcHBlciAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvcHVvbk5vdEFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkhvbWVwYWdlfFByb2R1Y3RwYWdlfExpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJiYXNrZXRfdG90YWxfcHJpY2VcXFwiXVwiLCBuYW1lOiBcImNhcnQudG90YWxCYXNlUHJpY2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXSwgZm9ybWF0dGVyOiBcIm51bWVyaWNPbmx5XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiSG9tZXBhZ2V8UHJvZHVjdHBhZ2V8TGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltpZCo9XFxcImNhcnRfcXVhbnRpdHlcXFwiXSwgW2NsYXNzKj1cXFwiYmFza2V0X2xlbmd0aFxcXCJdXCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdfSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImRlbGl2ZXJ5LWRhdGVcXFwiXVwiLCBuYW1lOiBcInBkcC5kZWxpdmVyeURhdGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJkZWxpdmVyeS1kYXRlXFxcIl1cIiwgbmFtZTogXCJwZHAuZGVsaXZlcnlEYXRlRm9ybWF0dGVkXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZm9ybWF0dGVyOiBcImZvcm1hdERlbGl2ZXJ5RGF0ZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJwcm9kdWN0LXRpdGxlXFxcIl0sIFtjbGFzcyo9XFxcImhlYWRlci1ib3R0b21cXFwiXVwiLCBuYW1lOiBcInBkcC5uYW1lXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwidml2ZW5zZS1zaG93cm9vbXNcXFwiXSA+ICpcIiwgbmFtZTogXCJwZHAuc2hvd3Jvb21jb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5Q291bnRFbHRzXCIsIGV4Y2x1c2l2ZTogW1wicGRwLmhhc05vU2hvd3Jvb21zXCJdfSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjdml2ZW5zZS1zaG93cm9vbS10YWIgcDpub3QoLnZpdmVuc2Utc2hvd3Jvb21zKVwiLCBuYW1lOiBcInBkcC5oYXNOb1Nob3dyb29tc1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SGFzSW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wicGRwLnNob3dyb29tY291bnRcIl19LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwiY291bnQtb2YtcHJvZHVjdFxcXCJdXCIsIG5hbWU6IFwicGxwLml0ZW1Db3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIkxpc3RpbmdwYWdlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJzdWJjYXRlZ29yaWVzLXRpdGxlXFxcIl1cIiwgbmFtZTogXCJwbHAubmFtZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWNhcmRbZGF0YS1wcm9kdWN0LXNrdV1cIiwgbmFtZTogXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLXByb2R1Y3Qtc2t1XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5wcm9kdWN0LWxpc3RcIiwgb2JzZXJ2ZXI6IFwibGlzdGluZ0l0ZW1CbG9ja1wiLCBuYW1lOiBcIl9fbGlzdGluZ0l0ZW1CbG9ja09ic2VydmVyXCIsIGNoaWxkcmVuOiBbXCJfX2ZlYXR1cmVzLlNLVXNvblBhZ2VcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5lbXB0eS1jYXJ0LWNvbnRhaW5lciwgLmVtcHR5LWNhcnRcIiwgbmFtZTogXCJjYXJ0LmlzZW1wdHlcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiLCBleGNsdXNpdmU6IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5icmFja2V0LXRleHQsIC5wcm9kdWN0LWNvdW50XCIsIG5hbWU6IFwiY2FydC5za3Vjb3VudFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0SXRlbVF1YW50aXR5XCIsIG5hbWU6IFwiY2FydC5xdWFudGl0aWVzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmV2aW91c1wiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIiNiaWxsX3RvdGFsXCIsIG5hbWU6IFwiY2FydC50b3RhbFByaWNlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlJbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl0sIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwib3JkZXItZmluYWwtbnVtYmVyXFxcIl1cIiwgbmFtZTogXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGV4Y2x1c2l2ZTogW1wiY2FydC5pc2VtcHR5XCJdLCBmb3JtYXR0ZXI6IFwibnVtZXJpY09ubHlcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImNhcnQtcHJpY2VcXFwiXSAubm90LWFsbG93ZWQtY291cG9uXCIsIG5hbWU6IFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlTdW1OdW1Jbm5lclRleHRcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIl19LFxuICAvLyBOb3RlIHRoYXQgc2VxdWVudGlhbCBzZWFyY2ggd2lsbCBtYXJrIGNvdXBvbkFwcGxpY2FibGUgYXMgZm91bmRcbiAge1BhZ2VUeXBlRGVwZW5kOiBcImJhc2tldFwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwiY2FydC5za3VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1za3VcIiwgZXhjbHVzaXZlOiBbXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIl19LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1pbnNpZGVcIiwgbmFtZTogXCJjYXJ0LmNhdGVnb3JpZXNcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiLCB2YWx1ZTogXCJkYXRhLWxhc3QtYnJlYWRjcnVtYlwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJiYXNrZXRcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIi5jYXJ0LWluc2lkZVwiLCBuYW1lOiBcImNhcnQucHJpY2VzXCIsIG9wZXJhbmQ6IFwiZG9jUXVlcnlBdHRyaWJWYWx1ZUxpc3RcIiwgdmFsdWU6IFwiZGF0YS1wcmljZVwiLCBleGNsdXNpdmU6IFtcImNhcnQuaXNlbXB0eVwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiXX0sXG4gIC8vIERlc2t0b3Agb2JzZXJ2ZXIgZm9yIHRoZSByaWdodCBwYW5lbCwgYXMgaXQgaXMgdGhlIG9uZSBjaGFuZ2luZ1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIuY2FydC1yaWdodC1jb250YWluZXJcIiwgb2JzZXJ2ZXI6IFwiY2hlY2tvdXRGb3JtXCIsIG5hbWU6IFwiX19jaGVja291dEZvcm1PYnNlcnZlclwiLCBjaGlsZHJlbjogW1wiY2FydC5za3Vjb3VudFwiLCBcImNhcnQudG90YWxQcmljZVwiLCBcImNhcnQudG90YWxQcmljZUZpbmFsXCIsIFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIsIFwiY2FydC5za3VzXCIsIFwiY2FydC5wcmljZXNcIiwgXCJjYXJ0LnF1YW50aXRpZXNcIiwgXCJjYXJ0LmNhdGVnb3JpZXNcIiwgXCJjYXJ0LmlzZW1wdHlcIiwgXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIl0sIG9wZXJhbmQ6IFwiZG9jUXVlcnlPYnNlcnZlXCJ9LFxuICAvLyBNb2JpbGUgb2JzZXJ2ZXIgZm9yIHRoZSBmdWxsIGZvcm0gYmxvY2sgYXMgaXQgaXMgY29tcGxldGVseSByZXBsYWNlZFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiYmFza2V0XCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIjY2hlY2tvdXRGb3JtXCIsIG9ic2VydmVyOiBcImNoZWNrb3V0Rm9ybVwiLCBuYW1lOiBcIl9fY2hlY2tvdXRGb3JtT2JzZXJ2ZXJcIiwgY2hpbGRyZW46IFtcImNhcnQuc2t1Y291bnRcIiwgXCJjYXJ0LnRvdGFsUHJpY2VcIiwgXCJjYXJ0LnRvdGFsUHJpY2VGaW5hbFwiLCBcImNhcnQuY291cG9uTm90QXBwbGljYWJsZVwiLCBcImNhcnQuc2t1c1wiLCBcImNhcnQucHJpY2VzXCIsIFwiY2FydC5xdWFudGl0aWVzXCIsIFwiY2FydC5jYXRlZ29yaWVzXCIsIFwiY2FydC5pc2VtcHR5XCIsIFwiY2FydC5jb3Vwb25BcHBsaWNhYmxlQW1vdW50XCJdLCBvcGVyYW5kOiBcImRvY1F1ZXJ5T2JzZXJ2ZVwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwicHVyY2hhc2VcIiwgbWV0aG9kOiBcIkRvY1F1ZXJ5XCIsIHNlbGVjdG9yOiBcIltjbGFzcyo9XFxcImJhc2tldF9zdW1tYXJ5X3RvdGFsXFxcIl0sIFtjbGFzcyo9XFxcInRvdGFsX3Jvd1xcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UucmV2ZW51ZVwiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5SW5uZXJUZXh0XCIsIGZvcm1hdHRlcjogXCJudW1lcmljT25seVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCJbY2xhc3MqPVxcXCJvcmRlcl9mb2xsb3dfbnVtYlxcXCJdLCBbY2xhc3MqPVxcXCJjYXJ0LXRpdGxlLWJvdHRvbVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2UudnZzVHhuSWRcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcInB1cmNoYXNlXCIsIG1ldGhvZDogXCJEb2NRdWVyeVwiLCBzZWxlY3RvcjogXCIucGF5bWVudF90eXBlX3RpdGxlLCAuY2FydC10aXRsZS1pbmZvXCIsIG5hbWU6IFwicHVyY2hhc2UucGF5bWVudFR5cGVcIiwgb3BlcmFuZDogXCJkb2NRdWVyeUlubmVyVGV4dFwiLCBmb3JtYXR0ZXI6IFwibG93ZXJDYXNlVFJGaXJzdFdvcmRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiW2NsYXNzKj1cXFwicHJvZHVjdF9za3VfY29kZVxcXCJdXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXJyYXlJbm5lclRleHRcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJwdXJjaGFzZVwiLCBtZXRob2Q6IFwiRG9jUXVlcnlcIiwgc2VsZWN0b3I6IFwiLmNhcnQtaW5zaWRlXCIsIG5hbWU6IFwicHVyY2hhc2Uuc2t1c1wiLCBvcGVyYW5kOiBcImRvY1F1ZXJ5QXR0cmliVmFsdWVMaXN0XCIsIHZhbHVlOiBcImRhdGEtc2t1XCJ9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU09SRyBFbGVtZW50c1xuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwic2t1XCIsIG5hbWU6IFwicGRwLnNrdVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm1wblwiLCBuYW1lOiBcInBkcC5tcG5cIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJQcm9kdWN0cGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJuYW1lXCIsIG5hbWU6IFwicGRwLm5hbWVcIiwgb3BlcmFuZDogXCJKU09ORmlsdGVyT3RoZXJcIiwgdmFsdWU6IFwiQHR5cGU9UHJvZHVjdFwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVwiLCBuYW1lOiBcInBkcC5wcmljZVwifSxcbiAge1BhZ2VUeXBlRGVwZW5kOiBcIlByb2R1Y3RwYWdlXCIsIG1ldGhvZDogXCJEb2NTb3JnXCIsIHNlbGVjdG9yOiBcIm9mZmVycy5wcmljZVZhbGlkVW50aWxcIiwgbmFtZTogXCJwZHAucHJpY2VWYWxpZFVudGlsXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiUHJvZHVjdHBhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiaXRlbUxpc3RFbGVtZW50LioubmFtZVwiLCBuYW1lOiBcInZpZXcuYnJlYWRjcnVtYlwifSxcblxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwibWFpbkVudGl0eS5uYW1lXCIsIG5hbWU6IFwicGxwLm5hbWVcIn0sXG4gIHtQYWdlVHlwZURlcGVuZDogXCJMaXN0aW5ncGFnZVwiLCBtZXRob2Q6IFwiRG9jU29yZ1wiLCBzZWxlY3RvcjogXCJtYWluRW50aXR5Lm51bWJlck9mSXRlbXNcIiwgbmFtZTogXCJwbHAuaXRlbUNvdW50XCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiTGlzdGluZ3BhZ2VcIiwgbWV0aG9kOiBcIkRvY1NvcmdcIiwgc2VsZWN0b3I6IFwiYnJlYWRjcnVtYi5pdGVtTGlzdEVsZW1lbnQuKi5pdGVtLm5hbWVcIiwgbmFtZTogXCJ2aWV3LmJyZWFkY3J1bWJcIn0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBXaW5kb3cgY3VzdG9tIGVsZW1lbnRzXG4gIHtQYWdlVHlwZURlcGVuZDogXCIqXCIsIG1ldGhvZDogXCJTaW5nbGVXVFwiLCBzZWxlY3RvcjogXCJmYXZvcml0ZVByb2R1Y3RzXCIsIG5hbWU6IFwidmlldy5mYXZvcml0ZWRNUE5zXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwiaXNBZG1pblwiLCBuYW1lOiBcInZ2c0lzU2hvd3Jvb21cIiwgZm9ybWF0dGVyOiBcInRvU3RyaW5nXCJ9LFxuICB7UGFnZVR5cGVEZXBlbmQ6IFwiKlwiLCBtZXRob2Q6IFwiU2luZ2xlV1RcIiwgc2VsZWN0b3I6IFwidXNlcklkXCIsIG5hbWU6IFwidnZzVXNlcklkXCJ9LFxuXTtcblxuY29uc3QgZmVhdHVyZUVuZ2luZWVyaW5nT3BzID0ge1xuICBcInZpZXdfZXBvY2hcIjogW1xuICAgIHt1cGRhdGVNZXRob2Q6IFwibWluXCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtaW5cIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS52aWV3X2Vwb2NoX21pblwifSxcbiAgXSxcbiAgXCJQYWdlVHlwZVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJjb3VudF92YWx1ZXNcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImN2XCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkuUGFnZVR5cGVfY291bnRfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwiY3ZcIiwgd2luZG93OiBcImFsbHRpbWVcIiwgZmVhdHVyZU5hbWU6IFwiaGlzdG9yeS5QYWdlVHlwZV9jb3VudF9hbGx0aW1lXCJ9LFxuICBdLFxuICBcImNhcnQuY291cG9uQXBwbGljYWJsZUFtb3VudFwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJsYXN0KDEpXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcIl9fZmVhdHVyZXMubGFzdENhcnRDb3Vwb25BcHBsaWNhYmxlXCJ9LFxuICBdLFxuICBcInBkcC5jYXRlZ29yeVwiOiBbXG4gICAge3VwZGF0ZU1ldGhvZDogXCJjb3VudF92YWx1ZXNcIn0sXG4gICAge3VwZGF0ZU1ldGhvZDogXCJsYXN0XCJ9LFxuICAgIHtxdWVyeU1ldGhvZDogXCJtb2RlXCIsIHdpbmRvdzogXCJzZXNzaW9uXCIsIGZlYXR1cmVOYW1lOiBcImhpc3RvcnkucGRwX2NhdGVnb3J5X21vZGVfc2Vzc2lvblwifSxcbiAgICB7cXVlcnlNZXRob2Q6IFwibGFzdCgxKVwiLCB3aW5kb3c6IFwic2Vzc2lvblwiLCBmZWF0dXJlTmFtZTogXCJoaXN0b3J5LnBkcF9jYXRlZ29yeV9sYXN0X3Nlc3Npb25cIn0sXG4gIF0sXG4gIFwiY2FydC5za3VzXCI6IFtcbiAgICB7dXBkYXRlTWV0aG9kOiBcImxhc3RcIn0sXG4gICAge3F1ZXJ5TWV0aG9kOiBcImxhc3QoMSlcIiwgd2luZG93OiBcInNlc3Npb25cIiwgZmVhdHVyZU5hbWU6IFwiX19mZWF0dXJlcy5TS1Vzb25MYXN0Q2FydFZpZXdcIn0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3QgaW5jcmVhc2VCZWFnbGVJbmZvTGF5ZXJIV00gPSAoKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuICAvLyB1cGRhdGUgaHdtIHRvIGluZGljYXRlIGNoYW5nZVxuICBpbmZvTGF5ZXIuX19od20gKz0gMTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUb0JlYWdsZUluZm9MYXllciA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGluZm9MYXllciA9IHdpbmRvdy50b3AuYmVhZ2xlSW5mb0xheWVyO1xuXG4gIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgLy8gaWYgdmFsdWUgaXMgc3RyaW5nLCBhZGQgYXMgYSBjbGVhbiBzdHJpbmcsIGlmIG9iamVjdCBhZGQgdGhlIHNhbWVcbiAgY29uc3QgdHlwZWRWYWx1ZSA9IHR5cGVvZiAodmFsdWUpID09PSBcInN0cmluZ1wiID8gdmFsdWUudG9TdHJpbmcoKS50cmltKCkgOiB2YWx1ZTtcbiAgLy8gaWYga2V5IGNvbnRhaW5zIC4gY3JlYXRlIG5lc3RlZCBvYmplY3RcbiAgaWYgKGtleS5pbmRleE9mKFwiLlwiKSA+IC0xKSB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgbGV0IG9iaiA9IGluZm9MYXllcjtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFvYmpba2V5XSkgb2JqW2tleV0gPSB7fTtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIG9ialtsYXN0S2V5XSA9IHR5cGVkVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgaW5mb0xheWVyW2tleV0gPSB0eXBlZFZhbHVlO1xuICB9XG4gIC8vIHVwZGF0ZSBod20gdG8gaW5kaWNhdGUgY2hhbmdlXG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICBpZiAodHlwZWRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVkVmFsdWUgIT09IG51bGwpIHtcbiAgICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgdHlwZWRWYWx1ZSk7XG4gICAgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMoa2V5LCB0eXBlZFZhbHVlKTtcbiAgfVxufTtcblxuY29uc3QgREFUQV9MSVNURU5FUlMgPSB7fTtcblxuZXhwb3J0IGNvbnN0IGFkZERhdGFMaXN0ZW5lciA9IChrZXksIGxpc3RlbmVyKSA9PiB7XG4gIGlmICghREFUQV9MSVNURU5FUlNba2V5XSkge1xuICAgIERBVEFfTElTVEVORVJTW2tleV0gPSBbXTtcbiAgfVxuICBEQVRBX0xJU1RFTkVSU1trZXldLnB1c2gobGlzdGVuZXIpO1xufTtcblxuY29uc3QgcGFzc1ZhbHVlVG9MaXN0ZW5lcnMgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBEQVRBX0xJU1RFTkVSU1trZXldO1xuICBpZiAobGlzdGVuZXJzICYmIEFycmF5LmlzQXJyYXkobGlzdGVuZXJzKSAmJiBsaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsb2dnZXIubG9nKGBwYXNzVmFsdWVUb0xpc3RlbmVycyAtLT4gdmFsdWUgJHt2YWx1ZX0gdG8gbGlzdGVuZXIgJHtpfSBvZiBrZXkgJHtrZXl9YCk7XG4gICAgICAgIGxpc3RlbmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSwgYmxvY2tpbmcgPSBmYWxzZSwgcG9sbEludGVydmFsID0gNTAsIHRpbWVvdXQgPSAxMDAwMCkgPT4ge1xuICAvLyBUT0RPOiBjaGVjayBmZWF0dXJlRW5naW5lZXJpbmcgYW5kIHNlYXJjaCBsaXN0IGlmIGFsbCBtYXJrZWQgYXMgZm91bmQgYnV0IHZhbHVlIGlzIG1pc3NpbmdcbiAgY29uc3QgaW5mb0xheWVyID0gd2luZG93LnRvcC5iZWFnbGVJbmZvTGF5ZXI7XG4gIC8vIHJldHVybiBudWxsIGlmIGtleSBpcyBtaXNzaW5nIG9yIG5vdCBhbiBhcnJheSBvciBoYXMgbm8gZWxlbWVudHNcbiAgaWYgKCFrZXkpIHJldHVybiBudWxsO1xuICBsZXQgb2J0YWluRGF0YSA9IGpzb25HZXQoaW5mb0xheWVyLCBrZXkpO1xuICBpZiAob2J0YWluRGF0YSAhPT0gbnVsbCAmJiBvYnRhaW5EYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBmb3VuZCBkYXRhIGZvciBrZXlcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG9idGFpbkRhdGEpO1xuICB9XG5cbiAgZm9yIChjb25zdCBzZWFyY2hFbGVtZW50IG9mIHNlYXJjaFBhdGhzKSB7XG4gICAgaWYgKGtleSA9PT0gc2VhcmNoRWxlbWVudC5uYW1lICYmIChzZWFyY2hFbGVtZW50LmlzRm91bmQgfHwgc2VhcmNoRWxlbWVudC5pc0lnbm9yZSkpIHtcbiAgICAgIC8vIGRhdGEgaXMgbWlzc2luZyBidXQgZWxlbWVudCBpcyBtYXJrZWQgYXMgZm91bmQgb3IgaWdub3JlZFxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYmxvY2tpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBvYnRhaW5EYXRhID0ganNvbkdldChpbmZvTGF5ZXIsIGtleSk7XG4gICAgICAgIGlmIChvYnRhaW5EYXRhICE9PSBudWxsICYmIG9idGFpbkRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGZvdW5kIGRhdGEgZm9yIGtleSwgY2xlYXIgaW50ZXJ2YWwgYW5kIHJlc29sdmVcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZXNvbHZlKG9idGFpbkRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2VhcmNoRWxlbWVudCBvZiBzZWFyY2hQYXRocykge1xuICAgICAgICAgIGlmIChrZXkgPT09IHNlYXJjaEVsZW1lbnQubmFtZSAmJiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpKSB7XG4gICAgICAgICAgICAvLyBkYXRhIGlzIG1pc3NpbmcgYnV0IGVsZW1lbnQgaXMgbWFya2VkIGFzIGZvdW5kIG9yIGlnbm9yZWRcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHBvbGxJbnRlcnZhbCk7XG4gICAgICAvLyBhZGQgdGltZW91dFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfSwgdGltZW91dCk7IC8vIHdhaXQgYmxvY2tpbmcgZm9yIFwidGltZW91dFwiIG1zZWNzXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyID0gKGtleSkgPT4ge1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcbiAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAvLyByZW1vdmUga2V5IGZyb20gaW5mb0xheWVyXG4gIGlmIChrZXkuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlzLnBvcCgpO1xuICAgIGxldCBvYmogPSBpbmZvTGF5ZXI7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghb2JqW2tleV0pIHJldHVybjtcbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIGxvZ2dlci5sb2coXCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyXCIsIGBSZW1vdmluZyAke2xhc3RLZXl9IGZyb20gJHtKU09OLnN0cmluZ2lmeShvYmopfWApO1xuICAgIGRlbGV0ZSBvYmpbbGFzdEtleV07XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGluZm9MYXllcltrZXldO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG4gIC8vIHByb2Nlc3MgZGVwZW5kZW50IGhpc3RvcmljYWwgZGF0YSBmb3Igc2Nhbi1mb3VuZCBlbGVtZW50c1xuICB1cGRhdGVEZXJpdmF0aW9uc0luQ29sbGVjdG9yKGtleSwgbnVsbCk7XG4gIHBhc3NWYWx1ZVRvTGlzdGVuZXJzKGtleSwgbnVsbCk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVHJlYXRtZW50ID0gKGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgc3RhdHVzLCBkZXBlbmRhbnRfb25fdHJlYXRtZW50ID0gbnVsbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHt9O1xuICBjb25zdCBpbmZvTGF5ZXIgPSB3aW5kb3cudG9wLmJlYWdsZUluZm9MYXllcjtcblxuICBpZiAoYnVzaW5lc3NSdWxlSWQgIT09IG51bGwgJiYgYnVzaW5lc3NSdWxlSWQgIT09IHVuZGVmaW5lZCkgdmFsdWUuYnVzaW5lc3NSdWxlSWQgPSBidXNpbmVzc1J1bGVJZDtcbiAgaWYgKHZhcmlhbnQpIHZhbHVlLnZhcmlhbnQgPSB2YXJpYW50O1xuXG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcImFwcGxpZWRcIjpcbiAgICAgIGluZm9MYXllci5hW2lkXSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNraXBwZWRcIjpcbiAgICAgIHZhbHVlLmRlcGVuZGFudF9vbl90cmVhdG1lbnQgPSBkZXBlbmRhbnRfb25fdHJlYXRtZW50O1xuICAgICAgaW5mb0xheWVyLmVbaWRdID0gdmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZmFpbGVkXCI6XG4gICAgICBpbmZvTGF5ZXIuZltpZF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGluY3JlYXNlQmVhZ2xlSW5mb0xheWVySFdNKCk7XG59O1xuXG5jb25zdCBQQVJTRVNFQVJDSE1BWFJFVFJZID0gMTA7XG5jb25zdCBQQVJTRVNFQVJDSFNUQVJUREVMQVkgPSAxMDtcbmxldCBwYXJzZVNlYXJjaFBhdGhzRGVsYXkgPSBQQVJTRVNFQVJDSFNUQVJUREVMQVk7XG5sZXQgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIgPSBhc3luYyAoKSA9PiB7XG4gIC8vIENvbGxlY3QgY29yZSBkYXRhXG4gIHByZXBhcmVDb3JlRGF0YSgpO1xuXG4gIC8vIFRyaWdnZXItc3RhcnQgdGhlIHBhcnNlciBsb29wXG4gIHBhcnNlckNhbGxlcigpO1xuXG4gIC8vIEFkZCBtZXRyaWNzXG4gIGFkZE1ldHJpY3MoKTtcbn07XG5cbmNvbnN0IGNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJhc2VGZWF0dXJlTmFtZXMgPSBPYmplY3Qua2V5cyhmZWF0dXJlRW5naW5lZXJpbmdPcHMpO1xuICBmb3IgKGNvbnN0IGJhc2VGZWF0dXJlTmFtZSBvZiBiYXNlRmVhdHVyZU5hbWVzKSB7XG4gICAgY29uc3QgRkVEYXRhID0gZmVhdHVyZUVuZ2luZWVyaW5nT3BzW2Jhc2VGZWF0dXJlTmFtZV07XG4gICAgaWYgKEZFRGF0YSAmJiBBcnJheS5pc0FycmF5KEZFRGF0YSkgJiYgRkVEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgICAgaWYgKEZFT3AucXVlcnlNZXRob2QgPT09IG51bGwgfHwgRkVPcC5xdWVyeU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgcXVlcnlSZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SW5Db2xsZWN0b3IoYmFzZUZlYXR1cmVOYW1lLCBGRU9wLnF1ZXJ5TWV0aG9kLCBGRU9wLndpbmRvdyk7XG4gICAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKEZFT3AuZmVhdHVyZU5hbWUsIHF1ZXJ5UmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciA9IGFzeW5jIChiYXNlRmVhdHVyZU5hbWUsIGJhc2VGZWF0dXJlVmFsdWUpID0+IHtcbiAgLy8gcHJvY2VzcyBkZXBlbmRlbnQgaGlzdG9yaWNhbCBkYXRhIGZvciBzY2FuLWZvdW5kIGVsZW1lbnRzXG4gIGNvbnN0IEZFRGF0YSA9IGZlYXR1cmVFbmdpbmVlcmluZ09wc1tiYXNlRmVhdHVyZU5hbWVdO1xuICBpZiAoRkVEYXRhICYmIEFycmF5LmlzQXJyYXkoRkVEYXRhKSAmJiBGRURhdGEubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgRkVPcCBvZiBGRURhdGEpIHtcbiAgICAgIGlmIChGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gbnVsbCB8fCBGRU9wLnVwZGF0ZU1ldGhvZCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIGF3YWl0IHVwZGF0ZUluQ29sbGVjdG9yKGJhc2VGZWF0dXJlTmFtZSwgYmFzZUZlYXR1cmVWYWx1ZSwgRkVPcC51cGRhdGVNZXRob2QpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcHJvY2Vzc0Zvcm1hdHRlciA9ICh2YWx1ZSwgZm9ybWF0dGVyKSA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFmb3JtYXR0ZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzd2l0Y2ggKGZvcm1hdHRlcikge1xuICAgIGNhc2UgXCJ1cHBlckNhc2VUUlwiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoXCJ0ci1UUlwiKTtcbiAgICBjYXNlIFwiZm9ybWF0RGVsaXZlcnlEYXRlXCI6XG4gICAgICByZXR1cm4gZm9ybWF0RGVsaXZlcnlEYXRlKHZhbHVlKTtcbiAgICBjYXNlIFwibnVtZXJpY09ubHlcIjpcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgY2FzZSBcImxvd2VyQ2FzZVRSRmlyc3RXb3JkXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZShcInRyLVRSXCIpLnNwbGl0KFwiIFwiKVswXTtcbiAgICBjYXNlIFwiZGVhcnJheVwiOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgXCJ0b1N0cmluZ1wiOlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IHNlYXJjaE9iaiA9IChvYmosIHNlYXJjaEVsZW1lbnQpID0+IHtcbiAgbGV0IHZhbHVlO1xuICBsZXQgbGF5ZXJWYWx1ZTtcblxuICB0cnkge1xuICAgIHN3aXRjaCAoc2VhcmNoRWxlbWVudC5vcGVyYW5kKSB7XG4gICAgICBjYXNlIFwiSlNPTkZpbHRlck90aGVyXCI6XG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZSA9IGpzb25HZXQob2JqLCBzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJQYXJhbXMgPSBzZWFyY2hFbGVtZW50LnZhbHVlLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICBpZiAoZmlsdGVyUGFyYW1zLmxlbmd0aCAhPT0gMikgYnJlYWs7XG4gICAgICAgICAgY29uc3QgZmlsdGVyTmFtZSA9IGZpbHRlclBhcmFtc1swXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGZpbHRlclBhcmFtc1sxXTtcbiAgICAgICAgICBpZiAoIWZpbHRlck5hbWUgfHwgIWZpbHRlclZhbHVlKSBicmVhaztcblxuICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoID0ganNvbkdldChvYmosIGZpbHRlck5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFmaWx0ZXJNYXRjaCB8fCBmaWx0ZXJNYXRjaCAhPT0gZmlsdGVyVmFsdWUpIGJyZWFrO1xuXG4gICAgICAgICAgaWYgKHZhbHVlICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeU9ic2VydmVcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcblxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvdW5kIHN0YXR1cyBvZiB0aGUgZWxlbWVudHMgaW4gdGhlIGNoaWxkcmVuIGxpc3RcbiAgICAgICAgICBjb25zdCB0b0JlVXBkYXRlZCA9IFtdO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBzZWFyY2hQYXRocy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PT0gY2hpbGQpO1xuICAgICAgICAgICAgLy8gYWRkIGNoaWxkRWxlbWVudHMgaW50byB0b0JlVXBkYXRlZFxuICAgICAgICAgICAgdG9CZVVwZGF0ZWQucHVzaCguLi5jaGlsZEVsZW1lbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBydW4gb25seSBpZiB0aGUgZWxlbWVudCBoYXMgYWRkZWQgb3IgcmVtb3ZlZCBjaGlsZHJlblxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgZnVuY3Rpb24obXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgZm91bmQgc3RhdHVzIG9mIHRoZSBlbGVtZW50cyBpbiB0aGUgY2hpbGRyZW4gbGlzdFxuICAgICAgICAgICAgaWYgKGlzT3duTXV0YXRpb24obXV0YXRpb25MaXN0KSkgcmV0dXJuO1xuICAgICAgICAgICAgdG9CZVVwZGF0ZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBlbGVtZW50LmlzRm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmVtb3ZlRnJvbUJlYWdsZUluZm9MYXllcihlbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyUmVzdGFydCA9IHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA+PSBQQVJTRVNFQVJDSE1BWFJFVFJZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ID0gUEFSU0VTRUFSQ0hTVEFSVERFTEFZO1xuICAgICAgICAgICAgcGFyc2VTZWFyY2hQYXRoc1JldHJ5ID0gMDtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyUmVzdGFydCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwic2VhcmNoT2JqOiB0cmlnZ2VyZWQgYSByZXN0YXJ0IG9mIHNlYXJjaHBhdGhzIGR1ZTogXCIsIHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgIHBhcnNlckNhbGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodmFsdWUsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUlubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS5pbm5lclRleHQgJiYgdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUF0dHJpYlZhbHVlTGlzdFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgYXR0cmliVmFsdWVMaXN0ID0gW107XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWVjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYXR0cmliVmFsdWUgPSB2YWx1ZWNoaWxkLmdldEF0dHJpYnV0ZShzZWFyY2hFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhdHRyaWJWYWx1ZSkge1xuICAgICAgICAgICAgICBhdHRyaWJWYWx1ZUxpc3QucHVzaChhdHRyaWJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJpYlZhbHVlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXR0cmliVmFsdWVMaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeUhhc0lubmVyVGV4dFwiOlxuICAgICAgICB2YWx1ZSA9IG9iai5xdWVyeVNlbGVjdG9yKHNlYXJjaEVsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHNldFZhbHVlID0gdmFsdWUuaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGggPiAwO1xuICAgICAgICAgIGxheWVyVmFsdWUgPSBzZXRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvY1F1ZXJ5Q291bnRFbHRzXCI6XG4gICAgICAgIHZhbHVlID0gb2JqLnF1ZXJ5U2VsZWN0b3JBbGwoc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGF5ZXJWYWx1ZSA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVZhbHVlSWZIYXNJbm5lclRleHRcIjpcbiAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvcihzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmlubmVyVGV4dCAmJiB2YWx1ZS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsYXllclZhbHVlID0gc2VhcmNoRWxlbWVudC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2NRdWVyeVN1bU51bUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGxldCBzdW1QcmljZSA9IDA7XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICAgICAgICBpZiAoY2hpbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgc3VtUHJpY2UrPXBhcnNlSW50KGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdW1QcmljZSA+IDApIHtcbiAgICAgICAgICAgIGxheWVyVmFsdWUgPSBzdW1QcmljZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG9jUXVlcnlBcnJheUlubmVyVGV4dFwiOlxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWUgPSBvYmoucXVlcnlTZWxlY3RvckFsbChzZWFyY2hFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGFycmF5SW5uZXJUZXh0ID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gY2hpbGQuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjaGlsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBhcnJheUlubmVyVGV4dC5wdXNoKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUlubmVyVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXllclZhbHVlID0gYXJyYXlJbm5lclRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSBqc29uR2V0KG9iaiwgc2VhcmNoRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA+IDAgOiB2YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgIGxheWVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9IC8vIHN3aXRjaFxuXG4gICAgaWYgKGxheWVyVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBsYXllclZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpIHtcbiAgICAgICAgbGF5ZXJWYWx1ZSA9IHByb2Nlc3NGb3JtYXR0ZXIobGF5ZXJWYWx1ZSwgc2VhcmNoRWxlbWVudC5mb3JtYXR0ZXIpO1xuICAgICAgfVxuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoc2VhcmNoRWxlbWVudC5uYW1lLCBsYXllclZhbHVlKTtcbiAgICAgIHNlYXJjaEVsZW1lbnQuaXNGb3VuZCA9IHRydWU7XG5cbiAgICAgIC8vIG1hcmsgZXhjbHVzaXZlIGVsZW1lbnRzIGFzIGZvdW5kXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hFbGVtZW50LmV4Y2x1c2l2ZSkgJiYgc2VhcmNoRWxlbWVudC5leGNsdXNpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGV4Y2x1c2l2ZUVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICAgICAgICBpZiAoc2VhcmNoRWxlbWVudC5leGNsdXNpdmUuaW5jbHVkZXMoZXhjbHVzaXZlRWxlbWVudC5uYW1lKSkge1xuICAgICAgICAgICAgZXhjbHVzaXZlRWxlbWVudC5pc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuaXNGb3VuZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwic2VhcmNoT2JqIGVycm9yOiBcIiArIGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGN1c3RvbURhdGFEZXJpdmF0aW9ucyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VycmVudFBhZ2VUeXBlID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHRydWUsIDUwLCAxMDAwKTtcblxuICB0cnkge1xuICAgIC8vIGNhcnQgdG90YWwgcHJvZHVjdCBwcmljZSBpcyBub3QgYXZhaWxhYmxlIGFueXdoZXJlLCBzcGVjaWFsIGRpc2NvdW50cyBldGMgYXJlIGhhcmQgdG8gc2NyYXBlLCBzbyByZWNhbGN1bGF0ZSBpdFxuICAgIGNvbnN0IFtpc0NhcnRFbXB0eSwgdG90YWxCYXNlUHJpY2UsIGNvdXBvbk5vdEFwcGxpY2FibGUsIHByaWNlcywgcXVhbnRpdGllc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5pc2VtcHR5XCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQudG90YWxCYXNlUHJpY2VcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5jb3Vwb25Ob3RBcHBsaWNhYmxlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucHJpY2VzXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNhcnQucXVhbnRpdGllc1wiKSxcbiAgICBdKTtcblxuICAgIGxldCB0b3RhbFByaWNlID0gMDtcblxuICAgIGlmICghdG90YWxCYXNlUHJpY2UgJiYgcHJpY2VzICYmIEFycmF5LmlzQXJyYXkocHJpY2VzKSAmJiBwcmljZXMubGVuZ3RoID4gMCAmJiBxdWFudGl0aWVzICYmIEFycmF5LmlzQXJyYXkocXVhbnRpdGllcykgJiYgcXVhbnRpdGllcy5sZW5ndGggPiAwICYmIHByaWNlcy5sZW5ndGggPT09IHF1YW50aXRpZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3RhbFByaWNlICs9IHBhcnNlSW50KHByaWNlc1tpXSkgKiBwYXJzZUludChxdWFudGl0aWVzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxQcmljZSA9IHBhcnNlSW50KHRvdGFsQmFzZVByaWNlKTtcbiAgICB9XG5cbiAgICBsZXQgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IDA7XG4gICAgaWYgKCFpc0NhcnRFbXB0eSAmJiB0b3RhbFByaWNlICYmIGNvdXBvbk5vdEFwcGxpY2FibGUpIHtcbiAgICAgIGNvdXBvbkFwcGxpY2FibGVBbW91bnQgPSB0b3RhbFByaWNlIC0gcGFyc2VJbnQoY291cG9uTm90QXBwbGljYWJsZSk7XG4gICAgfSBlbHNlIGlmICghaXNDYXJ0RW1wdHkgJiYgdG90YWxQcmljZSkge1xuICAgICAgY291cG9uQXBwbGljYWJsZUFtb3VudCA9IHBhcnNlSW50KHRvdGFsUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3Vwb25BcHBsaWNhYmxlQW1vdW50ID0gMDtcbiAgICB9XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbkFwcGxpY2FibGVBbW91bnRcIiwgY291cG9uQXBwbGljYWJsZUFtb3VudCk7XG5cbiAgICBpZiAoaXNDYXJ0RW1wdHkpIHtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiY2FydC50b3RhbFByaWNlXCIsIDApO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJjYXJ0LmNvdXBvbk5vdEFwcGxpY2FibGVcIiwgMCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiY3VzdG9tRGF0YURlcml2YXRpb25zIGNhbm5vdCBjb21wdXRlIGNvdXBvbkFwcGxpY2FibGVQcmljZTogXCIgKyBlKTtcbiAgfVxuXG4gIC8vIFByb2R1Y3QgcGFnZSAtLT4gdHJhbnNmZXIgc2t1cyB0byBzaW5nbGUgbG9jYXRpb25cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJQcm9kdWN0cGFnZVwiKSB7XG4gICAgY29uc3Qgc2t1ID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInBkcC5za3VcIik7XG4gICAgaWYgKHNrdSE9PW51bGwgJiYgc2t1IT09dW5kZWZpbmVkKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBbc2t1XSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlVHlwZSA9PT0gXCJiYXNrZXRcIikge1xuICAgIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY2FydC5za3VzXCIpO1xuICAgIGlmIChza3VMaXN0IT09bnVsbCAmJiBBcnJheS5pc0FycmF5KHNrdUxpc3QpICYmIHNrdUxpc3QubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBhZGRUb0JlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uUGFnZVwiLCBza3VMaXN0KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHBhcnNlU2VhcmNoUGF0aHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRvbVN0YXR1cyA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIC8vIGNoZWNrIGlmIGRvY3VtZW50IGFuZCBkb20gaXMgbG9hZGVkIGFuZCByZWFkeSBmb3Igc2NyYXBwaW5nXG4gIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIGluaXRpYWxpemVkIHdpdGggZG9tIHN0YXR1czogIFwiICsgZG9tU3RhdHVzKTtcblxuICBjb25zdCB3aW50b3AgPSB3aW5kb3cudG9wO1xuICBjb25zdCBkYXRhTGF5ZXIgPSB3aW50b3AuZGF0YUxheWVyO1xuICBjb25zdCB3aW5kb2MgPSB3aW50b3AuZG9jdW1lbnQ7XG4gIGxldCBzb3JnQXJyYXlJbm5lcjtcblxuICBjb25zdCBmb3VuZE5hbWVzID0gbmV3IFNldCgpO1xuICBjb25zdCBwcmV2Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgbm90Rm91bmROYW1lcyA9IG5ldyBTZXQoKTtcblxuICAvLyBQYWdlVHlwZSBjYW4gYmUgaW5mZXJyZWQgZnJvbSBVUkwsIGlmIGZvdW5kIHVzZSBpdCBmcm9tIHRoZXJlXG4gIGxldCBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG5cbiAgaWYgKGN1cnJlbnRQYWdlVHlwZSkge1xuICAgIHByZXZGb3VuZE5hbWVzLmFkZChcIlBhZ2VUeXBlXCIpO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHNlYXJjaCBsaXN0cyBhbmQgbWFyayBmb3VuZCBuYW1lc1xuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kKSB7XG4gICAgICBwcmV2Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHNlYXJjaEVsZW1lbnQgb2Ygc2VhcmNoUGF0aHMpIHtcbiAgICBpZiAoc2VhcmNoRWxlbWVudC5pc0ZvdW5kIHx8IHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChmb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpIHx8IHByZXZGb3VuZE5hbWVzLmhhcyhzZWFyY2hFbGVtZW50Lm5hbWUpKSB7XG4gICAgICAvLyBoYWQgYWxyZWFkeSBmb3VuZCB0aGlzIGVsZW1lbnQgb24gYW5vdGhlciBwYXJzZSBpdGVtXG4gICAgICBzZWFyY2hFbGVtZW50LmlzRm91bmQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEVsZW1lbnQuUGFnZVR5cGVEZXBlbmQgIT09IFwiKlwiKSB7XG4gICAgICBpZiAoIWN1cnJlbnRQYWdlVHlwZSkge1xuICAgICAgICBjdXJyZW50UGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIik7XG4gICAgICAgIGlmICghY3VycmVudFBhZ2VUeXBlKSB7XG4gICAgICAgICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2VhcmNoRWxlbWVudC5QYWdlVHlwZURlcGVuZC5pbmRleE9mKGN1cnJlbnRQYWdlVHlwZSkgPCAwKSB7XG4gICAgICAgIC8vIHNraXAgc2VhcmNoRWxlbWVudCBiZWNhdXNlIG9mIFBhZ2VUeXBlRGVwZW5kXG4gICAgICAgIHNlYXJjaEVsZW1lbnQuaXNJZ25vcmUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRWxlbWVudC5tZXRob2QgPT09IFwiU2luZ2xlV1RcIikgeyAvLyBTQ0FOIFdpbmRvdyBmb3IgU2luZ2xlIEVsZW1lbnRzXG4gICAgICBzZWFyY2hBbmRTZXQod2ludG9wLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkdBRGF0YUxheWVyXCIpIHsgLy8gU0NBTiBHQSBEQVRBIExBWUVSXG4gICAgICBmb3IgKGNvbnN0IGRhdGFMYXllckl0ZW0gb2YgZGF0YUxheWVyKSB7XG4gICAgICAgIHNlYXJjaEFuZFNldChkYXRhTGF5ZXJJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1NvcmdcIikgeyAvLyBTQ0FOIFNPUkcgQVJSQVlcbiAgICAgIGlmICghc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc29yZ0FycmF5SW5uZXIgPSBnZXRTT1JHQXJyYXkoKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgc29yZ0l0ZW0gb2Ygc29yZ0FycmF5SW5uZXIpIHtcbiAgICAgICAgc2VhcmNoQW5kU2V0KHNvcmdJdGVtLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlYXJjaEVsZW1lbnQubWV0aG9kID09PSBcIkRvY1F1ZXJ5XCIpIHsgLy8gU0NBTiBET0NVTUVOVFxuICAgICAgc2VhcmNoQW5kU2V0KHdpbmRvYywgc2VhcmNoRWxlbWVudCwgZm91bmROYW1lcywgbm90Rm91bmROYW1lcyk7XG4gICAgfSAvLyBET0NRVUVSWSBwYXJzZVxuICB9XG5cbiAgaWYgKG5vdEZvdW5kTmFtZXMuc2l6ZSA9PT0gMCkge1xuICAgIHBhcnNlU2VhcmNoUGF0aHNSZXRyeSA9IFBBUlNFU0VBUkNITUFYUkVUUlk7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHMgZm91bmQgYWxsIGVsZW1lbnRzIC0gc2V0dGluZyByZXRyeSB0byBtYXhcIik7XG4gIH0gZWxzZSBpZiAoZm91bmROYW1lcy5zaXplID09PSAwKSB7XG4gICAgLy8gdXBkYXRlIHJldHJ5IGNvdW50ZXIgYW5kIGRlbGF5IG9ubHkgaWYgZG9tIGlzIGFjdGl2ZVxuICAgIGlmIChkb21TdGF0dXMgPT09IFwiY29tcGxldGVcIiB8fCBkb21TdGF0dXMgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICAgICAgcGFyc2VTZWFyY2hQYXRoc0RlbGF5ICo9IDI7XG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKz0gMTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwicGFyc2VTZWFyY2hQYXRocyBwcm9jZXNzZWQgYnV0IG5vdCBmb3VuZCBhbnksIHNldHRpbmcgZGVsYXkgYW5kIHJldHJ5IHRvIFwiICtcbiAgICAgIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwiIGFuZCBcIiArXG4gICAgICBwYXJzZVNlYXJjaFBhdGhzUmV0cnkgKyBcIiBmb3Igbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl1cIixcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coXCJwYXJzZVNlYXJjaFBhdGhzIHByb2Nlc3NlZDogbm90Zm91bmQ6IFtcIiArXG4gICAgICBBcnJheS5mcm9tKG5vdEZvdW5kTmFtZXMpLmpvaW4oXCIgfCBcIikgKyBcIl0gYW5kIGZvdW5kIFwiICtcbiAgICAgIGZvdW5kTmFtZXMuc2l6ZSxcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2hBbmRTZXQgPSAob2JqLCBzZWFyY2hFbGVtZW50LCBmb3VuZE5hbWVzLCBub3RGb3VuZE5hbWVzKSA9PiB7XG4gIGlmIChzZWFyY2hPYmoob2JqLCBzZWFyY2hFbGVtZW50KSkge1xuICAgIGZvdW5kTmFtZXMuYWRkKHNlYXJjaEVsZW1lbnQubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgbm90Rm91bmROYW1lcy5hZGQoc2VhcmNoRWxlbWVudC5uYW1lKTtcbiAgfVxufTtcblxuLy8gcGFyc2Ugc291cmNlXG5jb25zdCBwYXJzZXJDYWxsZXIgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgY29uc29sZS50aW1lKFwiZ2wtcGFyc2VyQ2FsbGVyXCIpO1xuICBhd2FpdCBwYXJzZVNlYXJjaFBhdGhzKCk7XG4gIGlmIChwYXJzZVNlYXJjaFBhdGhzUmV0cnkgPCBQQVJTRVNFQVJDSE1BWFJFVFJZKSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHNjaGVkdWxlZCB0byBiZSByZWNhbGxlZCBpbiBcIiArIHBhcnNlU2VhcmNoUGF0aHNEZWxheSArIFwibXNcIik7XG4gICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGF3YWl0IHBhcnNlckNhbGxlcigpO1xuICAgIH0sIHBhcnNlU2VhcmNoUGF0aHNEZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZyhcInBhcnNlU2VhcmNoUGF0aHM6IHJlYWNoZWQgbWF4IHJldHJ5LCBjYWxsaW5nIHJlbWFpbmRlciBoaXN0b3JpY2FsIGRhdGFcIik7XG4gICAgYXdhaXQgY3VzdG9tRGF0YURlcml2YXRpb25zKCk7XG4gICAgYXdhaXQgY29sbGVjdERlcml2YXRpb25zRnJvbUNvbGxlY3RvcigpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiX19Db21wbGV0ZWRTY3JhcGluZ1wiLCB0cnVlKTtcbiAgfVxuICBjb25zb2xlLnRpbWVFbmQoXCJnbC1wYXJzZXJDYWxsZXJcIik7XG59O1xuXG4vLyBFeHRyYWN0IHZhbHVlIGZyb20ganNvbiBvYmplY3QgdXNpbmcgZ2l2ZW4gcGF0aFxuLy8gSWYgYW4gZWxlbWVudCBpcyAqLCBjb25jYXRlbmF0ZSByZWN1cnNpdmVseSBhbGwgc3ViLXBhdGggdmFsdWVzIGFzIHN0cmluZ1xuY29uc3QganNvbkdldCA9IChvYmosIHBhdGgpID0+IHtcbiAgaWYgKCFvYmopIHJldHVybiBudWxsO1xuICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcGF0aEFycmF5ID0gcGF0aC5zcGxpdChcIi5cIik7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChwYXRoQXJyYXlbaV0gPT09IFwiKlwiKSB7XG4gICAgICAgIGNvbnN0IHN1YlBhdGggPSBwYXRoQXJyYXkuc2xpY2UoaSArIDEpLmpvaW4oXCIuXCIpO1xuICAgICAgICBjb25zdCBzdWJBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBpbiBjdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRbc3ViS2V5XSAhPT0gdW5kZWZpbmVkICYmIGN1cnJlbnRbc3ViS2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3Qgc3ViVmFsdWUgPSBqc29uR2V0KGN1cnJlbnRbc3ViS2V5XSwgc3ViUGF0aCk7XG4gICAgICAgICAgICBpZiAoc3ViVmFsdWUgIT09IG51bGwgJiYgc3ViVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBzdWJBcnJheS5wdXNoKHN1YlZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YkFycmF5O1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnRbcGF0aEFycmF5W2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgcHJlcGFyZUNvcmVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLnRpbWUoXCJnbC1wcmVwYXJlQ29yZURhdGFcIik7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IG5hdlB0ciA9IHdpbmRvd1B0ci5uYXZpZ2F0b3I7XG5cbiAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3dQdHIubmF2aWdhdG9yPy51c2VyQWdlbnREYXRhPy5wbGF0Zm9ybSB8fFxuICAgIHdpbmRvd1B0ci5uYXZpZ2F0b3I/LnBsYXRmb3JtIHx8XG4gICAgd2luZG93UHRyLm5hdmlnYXRvcj8udXNlckFnZW50O1xuXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlBsYXRmb3JtXCIsIHBsYXRmb3JtKTtcblxuICAvKiB3aW5kb3cgdmlldyBhcmVhICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLndpbmRvd1BSYXRpb1wiLCB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG5cbiAgY29uc3QgYXZhaWxXaW5kb3cgPSB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbFdpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIuc2NyZWVuPy5hdmFpbEhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93QXZhaWxcIiwgYXZhaWxXaW5kb3cpO1xuXG4gIGNvbnN0IHdpbmRvd0RlcHRoID0gd2luZG93UHRyLnNjcmVlbj8uY29sb3JEZXB0aCArIFwiLVwiICsgd2luZG93UHRyLnNjcmVlbj8ucGl4ZWxEZXB0aDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93RGVwdGhcIiwgd2luZG93RGVwdGgpO1xuXG4gIGNvbnN0IHZwb3J0U2hhcGUgPSB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LndpZHRoICsgXCJ4XCIgKyB3aW5kb3dQdHIudmlzdWFsVmlld3BvcnQ/LmhlaWdodDtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2Uud2luZG93VnBvcnRcIiwgdnBvcnRTaGFwZSk7XG5cbiAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgIGxldCB3aWR0aCA9IHBhcnNlSW50KHNjcmVlbi53aWR0aCk7XG4gICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHBhcnNlSW50KHNjcmVlbi5oZWlnaHQpIDogMDtcbiAgICBpZiAod2lkdGggIT09IDAgJiYgaGVpZ2h0ICE9PSAwKSB7XG4gICAgICBjb25zdCBpT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChwbGF0Zm9ybSk7XG4gICAgICBpZiAoaU9TICYmIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICAgIC8vIGlvcyBwcm92aWRlcyBEUElzLCBuZWVkIHRvIG11bHRpcGx5XG4gICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZCh3aWR0aCAqIHdpbmRvd1B0ci5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5yb3VuZChoZWlnaHQgKiB3aW5kb3dQdHIuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvcmllbnRhdGlvbkFuZ2xlID0gd2luZG93UHRyLnNjcmVlbj8ub3JpZW50YXRpb24/LmFuZ2xlO1xuICAgICAgICBpZiAoTWF0aC5hYnMob3JpZW50YXRpb25BbmdsZSkgPT09IDkwIHx8IE1hdGguYWJzKG9yaWVudGF0aW9uQW5nbGUpID09PSAyNzApIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIGxhbmRzY2FwZSBvcmllbnRhdGlvbiBzd2l0Y2ggdmFsdWVzIGZvciBhbGwgZXhjZXB0IGlvc1xuICAgICAgICAgIGNvbnN0IHRlbXAgPSB3aWR0aDtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodDtcbiAgICAgICAgICBoZWlnaHQgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS53aW5kb3dcIiwgd2lkdGggKyBcInhcIiArIGhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyogbmF2aWdhdG9yICovXG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkhpc3RTaXplXCIsIHdpbmRvd1B0ci5oaXN0b3J5Py5sZW5ndGgpO1xuXG4gIC8vIGNoZWNrIGlmIHVzZXJBZ2VudERhdGEgaXMgc3VwcG9ydGVkIGFuZCB1c2VyQWdlbnQgaXMgbm90IGF2YWlsYWJsZSwgdXNlIGl0XG4gIGlmICghbmF2UHRyLnVzZXJBZ2VudCkge1xuICAgIGlmIChuYXZQdHIudXNlckFnZW50RGF0YSkge1xuICAgICAgLy8gdHVybiBicmFuZHMgYXJyYXkgaW50byBzdHJpbmdcbiAgICAgIGxldCBuYXZBZ2VudCA9IG5hdlB0cj8udXNlckFnZW50RGF0YT8uYnJhbmRzPy5tYXAoZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gZS5icmFuZCArIFwiOlwiICsgZS52ZXJzaW9uO1xuICAgICAgfSkuam9pbigpO1xuICAgICAgLy8gYWRkIG1vYmlsZSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSAobmF2UHRyPy51c2VyQWdlbnREYXRhPy5tb2JpbGUgPyBcIm1vYmlcIiA6IFwiIFwiKTtcbiAgICAgIC8vIGFkZCBwbGF0Zm9ybSBpbmZvXG4gICAgICBuYXZBZ2VudCArPSBwbGF0Zm9ybTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdkFnZW50XCIsIG5hdkFnZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2QWdlbnRcIiwgbmF2UHRyLnVzZXJBZ2VudCk7XG4gIH1cblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRldmljZS5uYXZIV0NvcmVzXCIsIG5hdlB0ci5oYXJkd2FyZUNvbmN1cnJlbmN5KTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UubmF2TGFuZ3VhZ2VcIiwgbmF2UHRyLmxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIuYnJvd3Nlckxhbmd1YWdlIHx8XG4gICAgICBuYXZQdHIuc3lzdGVtTGFuZ3VhZ2UgfHxcbiAgICAgIG5hdlB0ci51c2VyTGFuZ3VhZ2UsXG4gICk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlRvdWNoXCIsIG5hdlB0ci5tYXhUb3VjaFBvaW50cyk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZGV2aWNlLm5hdlZlbmRvclwiLCBuYXZQdHIudmVuZG9yKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkZXZpY2UuaW50ZXJuZXRTcGVlZFwiLCB3aW5kb3dQdHIubmF2aWdhdG9yPy5jb25uZWN0aW9uPy5kb3dubGluayk7XG5cbiAgLyogbWlzY2VsbGFuZW91cyAqL1xuICBjb25zdCBjdXJyZW50VVJMID0gbmV3IFVSTCh3aW5kb3cudG9wLmxvY2F0aW9uLmhyZWYpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInVcIiwgY3VycmVudFVSTC5ocmVmKTtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJkXCIsIGN1cnJlbnRVUkwuaG9zdG5hbWUpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcImRvbnR0cmFja1wiLCBuYXZQdHIuZG9Ob3RUcmFjayB8fCB3aW5kb3dQdHIuZG9Ob3RUcmFjayB8fCBuYXZQdHIubXNEb05vdFRyYWNrKTtcblxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcInJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgY29uc3QgZmlyc3RTZXNzaW9uUmVmZXJyZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fUkVGRVJSRVIpO1xuICBpZiAoIWZpcnN0U2Vzc2lvblJlZmVycmVyKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5TRVNTSU9OX1JFRkVSUkVSLCB3aW5kb3dQdHIuZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiZnJcIiwgd2luZG93UHRyLmRvY3VtZW50LnJlZmVycmVyKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImZyXCIsIGZpcnN0U2Vzc2lvblJlZmVycmVyKTtcbiAgfVxuXG4gIC8qIFZpdmVuc2Ugc3BlY2lmaWMgKi9cbiAgbGV0IHBhZ2VUeXBlO1xuICAvLyBpZiB1cmwgbGlrZSB4IHRoZW4gc2V0IFBhZ2VUeXBlID0geVxuICBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwiZmF2b3JpbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImZhdm9yaXRlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcInNpcGFyaXMtbGlzdGVzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwiYmFza2V0XCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwic2lwYXJpcy1vemV0aS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHVyY2hhc2VcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJvZGVtZS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicGF5bWVudFwiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImFkcmVzLWxpc3Rlc2kuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcImFkZHJlc3NcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJzaXBhcmlzbGVyaW0uaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInBhc3RvcmRlcnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJ1eWUta2F5aXQuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInJlZ2lzdGVyXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwidXllLWdpcmlzaS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwic2lnbmluXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwia3Vwb25sYXJpbS5odG1sXCIpID4gLTEpIHtcbiAgICBwYWdlVHlwZSA9IFwicHJvZmlsZV9jb3Vwb25zXCI7XG4gIH0gZWxzZSBpZiAoY3VycmVudFVSTC5wYXRobmFtZS5pbmRleE9mKFwicHJvZmlsLWd1bmNlbGxlLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2luZm9cIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJhZHJlc2xlcmltLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX2FkZHJlc3Nlc1wiO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRVUkwucGF0aG5hbWUuaW5kZXhPZihcImR1eXVydS10ZXJjaWhsZXJpLmh0bWxcIikgPiAtMSkge1xuICAgIHBhZ2VUeXBlID0gXCJwcm9maWxlX25vdGlmaWNhdGlvbnNcIjtcbiAgfSBlbHNlIGlmIChjdXJyZW50VVJMLnBhdGhuYW1lLmluZGV4T2YoXCJpbmRpcmltbGktbW9iaWx5YS1rYW1wYW55YWxhcmkuaHRtbFwiKSA+IC0xKSB7XG4gICAgcGFnZVR5cGUgPSBcInNwZWNpYWxfY2FtcGFpZ25zXCI7XG4gIH1cblxuICBpZiAocGFnZVR5cGUpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIlBhZ2VUeXBlXCIsIHBhZ2VUeXBlKTtcbiAgfVxuICBjb25zb2xlLnRpbWVFbmQoXCJnbC1wcmVwYXJlQ29yZURhdGFcIik7XG59O1xuXG5jb25zdCBhZGRNZXRyaWNzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUudGltZShcImdsLWFkZE1ldHJpY3NcIik7XG4gIGNvbnN0IHdpbmRvd1B0ciA9IHdpbmRvdy50b3A7XG4gIGNvbnN0IHBlcmZNZXRyaWNzID0ge307XG4gIGNvbnN0IHBlcmZOYXZpZ2F0aW9uTWV0cmljcyA9IHdpbmRvd1B0ci5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXTtcbiAgaWYgKHdpbmRvd1B0ci5wZXJmb3JtYW5jZSAmJiBwZXJmTmF2aWdhdGlvbk1ldHJpY3MpIHtcbiAgICBwZXJmTWV0cmljcy5jb25uZWN0ID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MuY29ubmVjdEVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5jb25uZWN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLnJlcXVlc3QgPSBNYXRoLnJvdW5kKHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXNwb25zZUVuZCAtIHBlcmZOYXZpZ2F0aW9uTWV0cmljcy5yZXF1ZXN0U3RhcnQpO1xuICAgIHBlcmZNZXRyaWNzLmRvbSA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUludGVyYWN0aXZlIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmRvbUNvbXBsZXRlKTtcbiAgICBwZXJmTWV0cmljcy5sb2FkID0gTWF0aC5yb3VuZChwZXJmTmF2aWdhdGlvbk1ldHJpY3MubG9hZEV2ZW50RW5kIC0gcGVyZk5hdmlnYXRpb25NZXRyaWNzLmxvYWRFdmVudFN0YXJ0KTtcbiAgICBwZXJmTWV0cmljcy5kdXJhdGlvbiA9IE1hdGgucm91bmQocGVyZk5hdmlnYXRpb25NZXRyaWNzLmR1cmF0aW9uKTtcbiAgfVxuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1ldHJpY3NcIiwgcGVyZk1ldHJpY3MpO1xuICBjb25zb2xlLnRpbWVFbmQoXCJnbC1hZGRNZXRyaWNzXCIpO1xufTtcblxuLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIFwiZWxlbWVudCBjb2xsZWN0b3JcIiBtb2R1bGUsIHRoZW4gZGF0YSBpcyBleHRyYWN0ZWQgZnJvbSBwcmUtY29sbGVjdGVkIGVsZW1lbnRzXG5jb25zdCBnZXRTT1JHQXJyYXkgPSAoKSA9PiB7XG4gIGNvbnN0IHNjaGVtYU9yZ0VsdHMgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT1cXFwiYXBwbGljYXRpb24vbGQranNvblxcXCJdXCIpO1xuICBjb25zdCBzb3JnQXJyYXkgPSBbXTtcblxuICBmb3IgKGNvbnN0IHNUYWcgb2Ygc2NoZW1hT3JnRWx0cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbnRudCA9IHNUYWcudGV4dENvbnRlbnQ7XG4gICAgICBjb25zdCBqc29uY29udGVudCA9IEpTT04ucGFyc2UoY250bnQpO1xuICAgICAgc29yZ0FycmF5LnB1c2goanNvbmNvbnRlbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gc29yZ0FycmF5O1xufTtcbiIsImltcG9ydCB7TE9HX0FQSV9VUkx9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRGcm9tQmVhZ2xlSW5mb0xheWVyfSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVNb25pdG9yXCIpO1xuY29uc3QgSEVBREVSUyA9IHtcbiAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG59O1xuXG5leHBvcnQgY2xhc3MgTW9uaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgbW9uaXRvclwiKTtcblxuICAgIHRoaXMuaGFzQXJyaXZhbExvZ1NlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmhhc01haW5Mb2dTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5oYXNVcGRhdGVzU2VudCA9IGZhbHNlO1xuXG4gICAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gQXR0ZW1wdHMgdG8gc2VuZCB0aGUgaW5pdGlhbCBsb2cgYm9keSAoYmVhZ2xlSW5mb0xheWVyJ3MgaW5pdGlhbCBwb3B1bGF0aW9uKSBpbW1lZGlhdGVseVxuICBhc3luYyBzZW5kTG9ncyhpbW1lZGlhdGUpIHtcbiAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gaW1tZWRpYXRlIHNlbmRpbmcgYmxvY2tcIik7XG4gICAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZU1haW5Mb2coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmxvZyhcIkluIG5vbi1jcml0aWNhbCBzZW5kIHBhdGggLSBhd2FpdGluZyBzY3JhcGluZ1wiKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX0NvbXBsZXRlZFNjcmFwaW5nXCIsIHRydWUsIDUwLCAxMDAwKTtcbiAgICAgIGxvZ2dlci5sb2coXCJJbiBub24tY3JpdGljYWwgc2VuZCBwYXRoIC0gc2VuZGluZyBsb2dzXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2VuZCBpbml0aWFsIGxvZyBib2R5IGFuZCBpbmNyZW1lbnRhbCB1cGRhdGUgbG9ncyBvbiBjbG9zZVxuICBhc3luYyBoYW5kbGVDbG9zZUV2ZW50KCkge1xuICAgIC8vIGlmIGluaXRpYWwgbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgc2VuZCB1cGRhdGVzIGFuZCBpbmZvbGF5ZXIgaW4gb25lIGJhdGNoXG4gICAgYXdhaXQgdGhpcy5wYWNrQW5kUXVldWVNYWluTG9nKCk7XG4gICAgLy8gaWYgbWFpbiBsb2cgaGFzIGJlZW4gc2VudCwgc2VuZCBpbmNyZW1lbnRhbCB1cGRhdGVzIG9ubHlcbiAgICBhd2FpdCB0aGlzLnBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nKCk7XG4gIH1cblxuICBhc3luYyBwYWNrQW5kUXVldWVNYWluTG9nKCkge1xuICAgIGlmICh0aGlzLmhhc01haW5Mb2dTZW50KSB7XG4gICAgICAvLyBpZiBtYWluIGxvZyBoYXMgYWxyZWFkeSBiZWVuIHNlbnQsIGRvIG5vdCBzZW5kIGFnYWluXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IG1haW4gbG9nXG4gICAgY29uc3QgcmVxdWVzdEJsb2IgPSBhd2FpdCB0aGlzLnBhY2thZ2VNYWluTG9nRGF0YSgpO1xuXG4gICAgaWYgKHJlcXVlc3RCbG9iKSB7XG4gICAgICAvLyBwcmVwYXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzaGVzIGF0IHRoZSB0aW1lIG9mIG1haW4gbG9nIHByZXBhcmF0aW9uXG4gICAgICBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlcXVlc3QgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNNYWluTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGFja0FuZFF1ZXVlSW5jcmVtZW50YWxMb2coKSB7XG4gICAgaWYgKCF0aGlzLmhhc01haW5Mb2dTZW50IHx8IHRoaXMuaGFzVXBkYXRlc1NlbnQpIHtcbiAgICAgIC8vIGlmIG1haW4gbG9nIGhhcyBub3QgYmVlbiBzZW50IHlldCwgdGhlcmUgaXMgbm8gaW5jcmVtZW50YWwgeWV0XG4gICAgICAvLyBvciBpZiB0aGUgdXBkYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPSBhd2FpdCB0aGlzLmNoZWNrRm9yTGF0ZXN0Q2hhbmdlcygpO1xuICAgIGxvZ2dlci5sb2coXCJVcGRhdGUgbG9ncyBjaGFuZ2Ugc3RhdHVzOiBcIiwgaGFzQ2hhbmdlZCk7XG4gICAgaWYgKCFoYXNDaGFuZ2VkKSByZXR1cm47XG5cbiAgICBjb25zdCBsb2dEYXRhID0gYXdhaXQgdGhpcy5wYWNrYWdlSW5jcmVtZW50YWxMb2dEYXRhKCk7XG4gICAgaWYgKGxvZ0RhdGEpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJTZW5kaW5nIGluY3JlbWVudGFsIGxvZ3NcIiwgbG9nRGF0YSk7XG4gICAgICB0aGlzLmhhc1VwZGF0ZXNTZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMucXVldWVMb2dzKGxvZ0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHBhY2tBbmRRdWV1ZUFycml2YWxMb2coKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFpbkxvZ1NlbnQgfHwgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCkge1xuICAgICAgLy8gaWYgbWFpbiBsb2cgb3IgYXJyaXZhbCBsb2cgaGFzIGFscmVhZHkgYmVlbiBzZW50LCBkbyBub3Qgc2VuZCBhZ2FpblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBtYWluIGxvZ1xuICAgIGNvbnN0IHJlcXVlc3RCbG9iID0gYXdhaXQgdGhpcy5wYWNrYWdlQXJyaXZhbExvZ0RhdGEoKTtcblxuICAgIGlmIChyZXF1ZXN0QmxvYikge1xuICAgICAgLy8gcHJlcGFyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhc2hlcyBhdCB0aGUgdGltZSBvZiBtYWluIGxvZyBwcmVwYXJhdGlvblxuICAgICAgbG9nZ2VyLmxvZyhcIkFycml2YWwgYmxvYiB0byBzZW5kOiBcIiwgcmVxdWVzdEJsb2IpO1xuICAgICAgdGhpcy5oYXNBcnJpdmFsTG9nU2VudCA9IHRydWU7XG4gICAgICB0aGlzLnF1ZXVlTG9ncyhyZXF1ZXN0QmxvYik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tGb3JMYXRlc3RDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh3bSA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJfX2h3bVwiKTtcbiAgICBpZiAodGhpcy5oaWdoV2F0ZXJNYXJrICE9PSBod20pIHtcbiAgICAgIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlQXJyaXZhbExvZ0RhdGEoKSB7XG4gICAgY29uc3QgW3VybCwgaGFzaCwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJvbkhhc2hQY3RcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiY29va2llR2FJZFwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIGNvb2tpZUdhSWQ6IGNvb2tpZUdhSWQsXG4gICAgICBsYzogMCxcbiAgICAgIHZpZXdfZXBvY2g6IHZpZXdfZXBvY2gsXG4gICAgICB1OiB1cmwsXG4gICAgICBvbkhhc2hQY3Q6IGhhc2gsXG4gICAgfTtcblxuICAgIGxvZ2dlci5sb2coXCJBcnJpdmFsIGxvZyBkYXRhOiBcIiwgYm9keSk7XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGJvZHkpXSwgSEVBREVSUyk7XG4gIH1cblxuICBhc3luYyBwYWNrYWdlTWFpbkxvZ0RhdGEoKSB7XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmICghd2luZG93LmJlYWdsZUluZm9MYXllcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHdpbmRvdy5iZWFnbGVJbmZvTGF5ZXIpKSB7XG4gICAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSAmJiB2YWx1ZSAhPT0gbnVsbCkgYm9keVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGJvZHkubGMgPSAxO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgYXN5bmMgcGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSgpIHtcbiAgICBjb25zdCBbYSwgZSwgZiwgcywgbSwgY29va2llR2FJZCwgdmlld19lcG9jaF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiYVwiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJlXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImZcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwic1wiKSxcbiAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJtXCIpLFxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiksXG4gICAgICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwidmlld19lcG9jaFwiKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBjb29raWVHYUlkOiBjb29raWVHYUlkLFxuICAgICAgbGM6IDIsXG4gICAgICB2aWV3X2Vwb2NoOiB2aWV3X2Vwb2NoLFxuICAgICAgYSwgZSwgZiwgcywgbSxcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZyhcIlVwZGF0ZSBsb2cgZGF0YTogXCIsIGJvZHkpO1xuXG4gICAgcmV0dXJuIG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShib2R5KV0sIEhFQURFUlMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUV4aXRFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgZXhpdCBldmVudCBsaXN0ZW5lclwiKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gYmVmb3JldW5sb2FkIGV2ZW50XCIpO1xuICAgICAgY2xlYXJUaW1lb3V0KHZpc2liaWxpdHlDaGFuZ2VUaW1lb3V0KTtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIubG9nKFwiSW4gcGFnZWhpZGUgZXZlbnRcIik7XG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVDbG9zZUV2ZW50KCk7XG4gICAgfSwge2NhcHR1cmU6IHRydWV9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy50b3AuZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIC8vIElmIHBhZ2UgaXMgbm90IHZpc2libGUgYW5kIGRvZXNuJ3QgYmVjb21lIHZpc2libGUgd2l0aGluIDMwIHNlY29uZHMsIHNlbmQgbG9nc1xuICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbiB0aW1lb3V0XCIpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQ2xvc2VFdmVudCgpO1xuICAgICAgICB9LCAzMDAwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFyIHRpbWVvdXQgd2hlbiBwYWdlIGlzIHZpc2libGUgdG8gbWFrZSBzdXJlIHdlIHNlbmQgdGhlIGxhdGVzdCBsb2dzIHBvc3NpYmxlXG4gICAgICBjbGVhclRpbWVvdXQodmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQpO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQgPSBudWxsO1xuICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG4gIH1cblxuICBxdWV1ZUxvZ3MobG9nRGF0YSkge1xuICAgIGlmICghbmF2aWdhdG9yLnNlbmRCZWFjb24gfHwgdHlwZW9mIG5hdmlnYXRvci5zZW5kQmVhY29uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZldGNoKExPR19BUElfVVJMLCBsb2dEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgIGNvbnN0IHF1ZXVlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXF1ZXVlZCkgcXVldWVkID0gbmF2aWdhdG9yLnNlbmRCZWFjb24oTE9HX0FQSV9VUkwsIGxvZ0RhdGEpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocXVldWVJbnRlcnZhbCk7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIHF1ZXVlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChxdWV1ZUludGVydmFsKTtcbiAgICAgIGlmICghcXVldWVkKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJMb2dzIG5vdCBxdWV1ZWRcIik7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9uaXRvcjtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUluZm9MYXllckNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0RhdGFMYXllclJ1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGRhdGFMYXllckZpbmRlcihvcGVyYXRvcik7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YUxheWVyRmluZGVyID0gYXN5bmMgKGtleSkgPT4ge1xuICBsb2dnZXIubG9nKFwiU2VhcmNoaW5nIGJlYWdsZUluZm9MYXllciBmb3Iga2V5IFwiLCBrZXkpO1xuICBjb25zb2xlLnRpbWUoXCJnbC1kYXRhTGF5ZXJGaW5kZXItMTVcIik7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoa2V5LCB0cnVlLCAyNSwgMTAwMCk7XG4gIGNvbnNvbGUudGltZUVuZChcImdsLWRhdGFMYXllckZpbmRlci0xNVwiKTtcbiAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ2dlci5zdWNjZXNzKGBGb3VuZCBrZXkgJHtrZXl9IHdpdGggdmFsdWUgJHtyZXN9YCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBsb2dnZXIuZmFpbGVkKGBLZXkgJHtrZXl9IG5vdCBmb3VuZCBpbiBiZWFnbGVJbmZvTGF5ZXJgKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVsZW1lbnRDaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tFbGVtZW50UnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWUsIHNlbGVjdG9yLCBzZWxlY3RvckFsbCwgc2VsZWN0b3JGYWxsYmFjayA9IG51bGx9ID0gcnVsZTtcbiAgbGV0IG1haW5TZWxlY3RvciA9IHNlbGVjdG9yO1xuICBpZiAobWFpblNlbGVjdG9yICYmICF3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKSkge1xuICAgIG1haW5TZWxlY3RvciA9IHNlbGVjdG9yRmFsbGJhY2sgPyBzZWxlY3RvckZhbGxiYWNrIDogbWFpblNlbGVjdG9yO1xuICB9XG5cbiAgaWYgKG9wZXJhdG9yID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvciksIGNvbmRpdGlvbiwgdmFsdWUpO1xuICB9XG4gIGlmIChtYWluU2VsZWN0b3IgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluU2VsZWN0b3IpKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIlNlbGVjdG9yIG5vdCBmb3VuZCBvbiBwYWdlXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoc2VsZWN0b3JBbGwgJiYgIXdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiU2VsZWN0b3Igbm90IGZvdW5kIG9uIHBhZ2VcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGlmIChtYWluU2VsZWN0b3IpIGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobWFpblNlbGVjdG9yKTtcbiAgZWxzZSBpZiAoc2VsZWN0b3JBbGwpIGVsZW1lbnQgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvckFsbCkpO1xuXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidGV4dC1udW1iZXJcIjoge1xuICAgICAgbGV0IHRlbXBWYWw7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSkge1xuICAgICAgICB0ZW1wVmFsID0gZWxlbWVudC5yZWR1Y2UoKHJldHVyblZhbCwgZWxlbSkgPT4ge1xuICAgICAgICAgIHJldHVyblZhbCArPSBwYXJzZUludChlbGVtLnRleHRDb250ZW50LnJlcGxhY2UoXCJUTFwiLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wVmFsID0gcGFyc2VJbnQod2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5TZWxlY3RvcikudGV4dENvbnRlbnRcbiAgICAgICAgICAgIC5yZXBsYWNlKFwiVExcIiwgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikpO1xuICAgICAgfVxuICAgICAgY29uc3QgcnVuVGltZVZhbHVlID0gcGFyc2VJbnQodGVtcFZhbCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW5UaW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiY2xhc3NMaXN0XCI6XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImNvdW50XCI6IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihlbGVtZW50Lmxlbmd0aCwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbkNoZWNrZXIoMSwgY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcigwLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSBcInN0eWxlXCI6IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgY29uc3Qgc3R5bGVLZXkgPSB2YWx1ZS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xuICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHZhbHVlLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50U3R5bGVzW3N0eWxlS2V5XTtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgY29uZGl0aW9uLCBzdHlsZVZhbHVlKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJPcGVyYXRvciBub3QgZGVmaW5lZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsImltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVGdW5jdGlvbkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0Z1bmN0aW9uUnVsZSA9IChydWxlKSA9PntcbiAgbG9nZ2VyLmxvZyhcIkNoZWNraW5nIHJ1bGVcIiwgSlNPTi5zdHJpbmdpZnkocnVsZSkpO1xuICBjb25zdCB7b3BlcmF0b3IsIGNvbmRpdGlvbiwgdmFsdWV9ID0gcnVsZTtcbiAgaWYgKCFvcGVyYXRvcikge1xuICAgIGxvZ2dlci5mYWlsZWQoXCJSdWxlIGZ1bmN0aW9uIG5vdCBkZWZpbmVkXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBydWxlRnVuY3Rpb24gPSBGdW5jdGlvbihvcGVyYXRvcik7XG4gIGNvbnN0IHJ1bnRpbWVWYWx1ZSA9IHJ1bGVGdW5jdGlvbigpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihydW50aW1lVmFsdWUsIGNvbmRpdGlvbiwgdmFsdWUpO1xufTtcbiIsImltcG9ydCB7U0VTU0lPTl9TVE9SQUdFX0tFWVN9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7Y29uZGl0aW9uQ2hlY2tlcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVTZXNzaW9uQ2hlY2tlclwiKTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrU2Vzc2lvblJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiZHVyYXRpb25cIjpcbiAgICAgIHJldHVybiBkdXJhdGlvbkhhbmRsZXIoY29uZGl0aW9uLCB2YWx1ZSk7XG4gICAgY2FzZSBcImhpc3RvcnlcIjpcbiAgICAgIHJldHVybiBoaXN0b3J5SGFuZGxlcihjb25kaXRpb24sIHZhbHVlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IGdldFNlc3Npb25UaW1lc3RhbXAgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlNFU1NJT05fVElNRVNUQU1QKSkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBzZXNzaW9uIHRpbWVzdGFtcFwiLCBlcnIpO1xuICAgIHJldHVybiBEYXRlLm5vdygpO1xuICB9XG59O1xuXG5jb25zdCBkdXJhdGlvbkhhbmRsZXIgPSAoY29uZGl0aW9uLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBkdXJhdGlvbiA9IChEYXRlLm5vdygpIC0gZ2V0U2Vzc2lvblRpbWVzdGFtcCgpKSAvIDEwMDA7XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKGR1cmF0aW9uLCBjb25kaXRpb24sIHBhcnNlSW50KHZhbHVlKSk7XG59O1xuXG5jb25zdCBoaXN0b3J5SGFuZGxlciA9IChjb25kaXRpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRIaXN0b3J5ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuU0VTU0lPTl9ISVNUT1JZKT8uc3BsaXQoXCIsXCIpO1xuICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihjdXJyZW50SGlzdG9yeSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuIiwiaW1wb3J0IHtjb25kaXRpb25DaGVja2VyfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVVybENoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja1VybFJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJwYXRoXCI6IHtcbiAgICAgIGNvbnN0IHJlcXVlc3RVUkw9IHdpbmRvdy50b3AubG9jYXRpb24uaHJlZjtcbiAgICAgIGNvbnN0IHBhdGggPSBuZXcgVVJMKHJlcXVlc3RVUkwpLnBhdGhuYW1lO1xuICAgICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgcGF0aCAke3BhdGh9IG1hdGNoZXMgcnVsZSBwYXRoICR7dmFsdWV9YCk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uQ2hlY2tlcihwYXRoLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHtNT0JJTEVfTUVESUFfUVVFUll9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZUVudkNoZWNrZXJcIik7XG5cbmV4cG9ydCBjb25zdCBjaGVja0VudlJ1bGUgPSAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCJkZXZpY2VfdHlwZVwiOiB7XG4gICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKE1PQklMRV9NRURJQV9RVUVSWSkubWF0Y2hlcyA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIjtcbiAgICAgIHJldHVybiBjb25kaXRpb25DaGVja2VyKGlzTW9iaWxlLCBjb25kaXRpb24sIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlBMQUNFSE9MREVSXCI6IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIGRiTmFtZTogXCJiZWFnbGVfY2FjaGVcIixcbiAgdmVyc2lvbjogMSxcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBcImluZm9DYWNoZVwiLFxuICAgIGluZGV4ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJpeF9za3VcIixcbiAgICAgICAgZmllbGRzOiBcInNrdVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG9wdGlvbnM6IHtrZXlQYXRoOiBcInNrdVwifSxcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQge2ZldGNoUHJvZHVjdEluZm99IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL3N0b3JlLmNvbmZpZ1wiO1xuaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeVwiKTtcbmNsYXNzIEdsb3ZQcm9kdWN0SW5mb1JlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGV4ZWREQiA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgaW5kZXhlZERCXCIpO1xuICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gd2luZG93LnRvcC5pbmRleGVkREI/Lm9wZW4oY29uZmlnLmRiTmFtZSwgY29uZmlnLnZlcnNpb24pO1xuICAgIGlmICghb3BlblJlcXVlc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImluZGV4ZWRkYiBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIG9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC5vbGRWZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBUT0RPIHVwZ3JhZGUgZXhpc3RpbmcgZGIgaW5zdGVhZCBvZiBkZWxldGUgYW5kIGNyZWF0ZSBmcm9tIHNjcmF0Y2hcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3BlblJlcXVlc3QucmVzdWx0LmRlbGV0ZU9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgZGVsZXRlIG91dGRhdGVkIGRhdGFiYXNlXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdG9yZSA9IG9wZW5SZXF1ZXN0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShjb25maWcuc3RvcmUubmFtZSwgY29uZmlnLnN0b3JlLm9wdGlvbnMpO1xuICAgICAgICBpZiAoY29uZmlnLnN0b3JlLmluZGV4ZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkeCBvZiBjb25maWcuc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5maWVsZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJDb3VsZCBub3QgY3JlYXRlIG9iamVjdCBzdG9yZSBvbiBkYXRhYmFzZVwiLCBlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgYmVhZ2xlX2NhY2hlIGluZGV4ZWQgREJcIiwgb3BlblJlcXVlc3QuZXJyb3IpO1xuICAgIH07XG5cbiAgICBvcGVuUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLmluZGV4ZWREQiA9IG9wZW5SZXF1ZXN0LnJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ZWREQikge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMjUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbmRleGVkREIpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSW5kZXhlZERCIG5vdCBpbml0aWFsaXplZCB3aXRoaW4gdGhlIGFsbG90dGVkIHRpbWVcIikpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRUcmFuc2FjdGlvbihyZWFkd3JpdGUgPSBmYWxzZSkge1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IHR4ID0gdGhpcy5pbmRleGVkREIudHJhbnNhY3Rpb24oY29uZmlnLnN0b3JlLm5hbWUsIChyZWFkd3JpdGUgPyBcInJlYWR3cml0ZVwiIDogXCJyZWFkb25seVwiKSk7XG4gICAgcmV0dXJuIHR4Lm9iamVjdFN0b3JlKGNvbmZpZy5zdG9yZS5uYW1lKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUocGF5bG9hZCkge1xuICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgIGZvciAoY29uc3QgbG9hZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgIGxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICBzdG9yZS5wdXQobG9hZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBheWxvYWQudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgc3RvcmUucHV0KHBheWxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNsZWFyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24odHJ1ZSkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY2xlYXJSZXF1ZXN0ID0gc3RvcmUuY2xlYXIoKTtcbiAgICAgICAgY2xlYXJSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNsZWFyUmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGNsZWFyaW5nIHN0b3JlOiAke3N0b3JlLm5hbWV9YCk7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0KHNrdSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5pbml0VHJhbnNhY3Rpb24oKS50aGVuKChzdG9yZSkgPT4ge1xuICAgICAgICBjb25zdCBnZXRSZXF1ZXN0ID0gc3RvcmUuZ2V0KHNrdSk7XG4gICAgICAgIGdldFJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGdldFJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgIGxvZ2dlci5sb2coYEZvdW5kIHZhbHVlICR7cmVzdWx0fSBmb3Iga2V5ICR7c2t1fWApO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYEVycm9yIGdldHRpbmcgdmFsdWUgZm9yIGtleTogJHtza3V9YCwgZ2V0UmVxdWVzdC5vbmVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjb3VudCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY291bnRSZXF1ZXN0ID0gc3RvcmUuY291bnQoKTtcbiAgICAgICAgY291bnRSZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudFJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgIGxvZ2dlci5sb2coYENvdW50ZWQgJHtyZXN1bHR9IGVudHJpZXNgKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvdW50UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJFcnJvciBjb3VudGluZyBlbnRyaWVzOiBcIiwgY291bnRSZXF1ZXN0Lm9uZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldEN1cnNvcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuaW5pdFRyYW5zYWN0aW9uKCkudGhlbigoc3RvcmUpID0+IHtcbiAgICAgICAgY29uc3QgY3Vyc29yUmVxdWVzdCA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICAgICAgY3Vyc29yUmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBjdXJzb3JSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkVycm9yIGdldHRpbmcgY3Vyc29yXCIsIGN1cnNvclJlcXVlc3Qub25lcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcGVyc2lzdFByb2R1Y3RJbmZvKCkge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImNoZWNrLWV4aXN0aW5nLXByb2QtaW5mb1wiKTtcbiAgICBjb25zdCBleGlzdGluZ1Byb2RJbmZvID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgIGlmIChleGlzdGluZ1Byb2RJbmZvKSB7XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGZvdW5kXCIpO1xuICAgICAgY29uc3QgY3Vyc29yID0gYXdhaXQgdGhpcy5nZXRDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGN1cnNvci52YWx1ZS50aW1lc3RhbXA7XG4gICAgICBjb25zdCBlbGFwc2VkU2Vjb25kcyA9IChEYXRlLm5vdygpIC8gMTAwMCkgLSB0aW1lc3RhbXA7XG4gICAgICBpZiAoZWxhcHNlZFNlY29uZHMgPCA3MjAwKSByZXR1cm47XG4gICAgICBsb2dnZXIubG9nKFwiRXhpc3RpbmcgcHJvZHVjdCBpbmZvIGlzIGV4cGlyZWRcIik7XG4gICAgfVxuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoaW5nLXByb2QtaW5mb1wiKTtcbiAgICBjb25zdCBwcm9kdWN0SW5mb1Byb21pc2UgPSBmZXRjaFByb2R1Y3RJbmZvKCk7XG4gICAgY29uc3QgY2xlYXJQcm9taXNlID0gdGhpcy5jbGVhcigpO1xuICAgIGNvbnN0IFtwcm9kdWN0SW5mb0FycmF5XSA9IGF3YWl0IFByb21pc2UuYWxsKFtwcm9kdWN0SW5mb1Byb21pc2UsIGNsZWFyUHJvbWlzZV0pO1xuICAgIGlmICghcHJvZHVjdEluZm9BcnJheSB8fCAhcHJvZHVjdEluZm9BcnJheS5sZW5ndGgpIHJldHVybjtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLXByb2QtaW5mb1wiKTtcbiAgICBhd2FpdCB0aGlzLnNhdmUodGhpcy5wcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInBlcnNpc3RlZC1wcm9kLWluZm9cIik7XG4gIH1cblxuICBwcmVwYXJlUGF5bG9hZHMocHJvZHVjdEluZm9BcnJheSkge1xuICAgIGNvbnN0IHBheWxvYWRzID0gW107XG4gICAgY29uc3QgZmllbGROYW1lcyA9IHByb2R1Y3RJbmZvQXJyYXkuc2hpZnQoKTtcbiAgICBmaWVsZE5hbWVzLnNoaWZ0KCk7XG4gICAgZm9yIChjb25zdCBpbmZvIG9mIHByb2R1Y3RJbmZvQXJyYXkpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7c2t1OiBpbmZvLnNoaWZ0KCl9O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBheWxvYWRbZmllbGROYW1lc1tpXV0gPSBpbmZvW2ldIHx8IDA7XG4gICAgICB9XG4gICAgICBwYXlsb2Fkcy5wdXNoKHBheWxvYWQpO1xuICAgIH1cbiAgICByZXR1cm4gcGF5bG9hZHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeTtcbiIsImltcG9ydCBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5IGZyb20gXCIuL2luZGV4XCI7XG5cbmNvbnN0IFN0b3JlID0gKGZ1bmN0aW9uKCkge1xuICBsZXQgaW5zdGFuY2UgPSBudWxsO1xuICByZXR1cm4ge1xuICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBHbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5KCk7XG4gICAgICAgIC8vIEhpZGUgdGhlIGNvbnN0cnVjdG9yIHNvIHRoZSByZXR1cm5lZCBvYmplY3QgY2FuJ3QgYmUgbmV3J2QuLi5cbiAgICAgICAgaW5zdGFuY2UuY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG4gIH07XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUHJvZHVjdEluZm9DaGVja2VyXCIpO1xuXG5leHBvcnQgY29uc3QgY2hlY2tQcm9kdWN0SW5mb1J1bGUgPSBhc3luYyAocnVsZSkgPT57XG4gIGxvZ2dlci5sb2coXCJDaGVja2luZyBydWxlXCIsIEpTT04uc3RyaW5naWZ5KHJ1bGUpKTtcbiAgY29uc3Qge29wZXJhdG9yLCBjb25kaXRpb24sIHZhbHVlfSA9IHJ1bGU7XG4gIGNvbnN0IHNrdUxpc3QgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICBpZiAoIXNrdUxpc3QgfHwgKHR5cGVvZiBza3VMaXN0ID09PSBcIm9iamVjdFwiICYmICFPYmplY3Qua2V5cyhza3VMaXN0KS5sZW5ndGgpKSByZXR1cm4gZmFsc2U7XG4gIGxldCBydW50aW1lVmFsdWUgPSBudWxsO1xuICBjb25zdCBza3UgPSBza3VMaXN0W09iamVjdC5rZXlzKHNrdUxpc3QpWzBdXT8uaWQ7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwidHJhbnNhY3Rpb25JbjJXZWVrc1wiOiB7XG4gICAgICBsb2dnZXIubG9nKFwiR2V0dGluZyBUcmFuc2FjdGlvbkNvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRUcmFuc2FjdGlvbkNvdW50KHNrdSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImFkZFRvQ2FydEluMldlZWtzXCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIEFkZFRvQ2FydENvdW50IGZvciBza3UgXCIsIHNrdSk7XG4gICAgICBydW50aW1lVmFsdWUgPSBhd2FpdCBnZXRBZGRUb0NhcnRDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJwcm9kdWN0Vmlld0NvdW50XCI6IHtcbiAgICAgIGxvZ2dlci5sb2coXCJHZXR0aW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yIHNrdSBcIiwgc2t1KTtcbiAgICAgIHJ1bnRpbWVWYWx1ZSA9IGF3YWl0IGdldFByZXZpZXdDb3VudChza3UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25kaXRpb25DaGVja2VyKHJ1bnRpbWVWYWx1ZSwgY29uZGl0aW9uLCB2YWx1ZSk7XG59O1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbkNvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8uc2FsZUNudFZpc2l0b3JzSW4xNTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5jb25zdCBnZXRBZGRUb0NhcnRDb3VudCA9IGFzeW5jIChza3UpID0+IHtcbiAgY29uc3QgcHJvZHVjdEluZm8gPSBhd2FpdCBTdG9yZS5nZXRJbnN0YW5jZSgpLmdldChza3UpO1xuICBpZiAoc2t1ICYmIHByb2R1Y3RJbmZvKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RJbmZvLmNhcnRDbnRWaXNpdG9yc0luMTU7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuY29uc3QgZ2V0UHJldmlld0NvdW50ID0gYXN5bmMgKHNrdSkgPT4ge1xuICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdSk7XG4gIGlmIChza3UgJiYgcHJvZHVjdEluZm8pIHtcbiAgICByZXR1cm4gcHJvZHVjdEluZm8udmlld0NudFZpc2l0b3JzSW4xO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCJjb25zdCBFX1RJTUVPVVQgPSBuZXcgRXJyb3IoJ3RpbWVvdXQgd2hpbGUgd2FpdGluZyBmb3IgbXV0ZXggdG8gYmVjb21lIGF2YWlsYWJsZScpO1xuY29uc3QgRV9BTFJFQURZX0xPQ0tFRCA9IG5ldyBFcnJvcignbXV0ZXggYWxyZWFkeSBsb2NrZWQnKTtcbmNvbnN0IEVfQ0FOQ0VMRUQgPSBuZXcgRXJyb3IoJ3JlcXVlc3QgZm9yIGxvY2sgY2FuY2VsZWQnKTtcblxudmFyIF9fYXdhaXRlciQyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBTZW1hcGhvcmUge1xuICAgIGNvbnN0cnVjdG9yKF92YWx1ZSwgX2NhbmNlbEVycm9yID0gRV9DQU5DRUxFRCkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IF92YWx1ZTtcbiAgICAgICAgdGhpcy5fY2FuY2VsRXJyb3IgPSBfY2FuY2VsRXJyb3I7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzID0gW107XG4gICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVycyA9IFtdO1xuICAgIH1cbiAgICBhY3F1aXJlKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0pXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzW3dlaWdodCAtIDFdLnB1c2goeyByZXNvbHZlLCByZWplY3QgfSk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrLCB3ZWlnaHQgPSAxKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgcmVsZWFzZV0gPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdhaXRGb3JVbmxvY2sod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLnB1c2gocmVzb2x2ZSk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSA8PSAwO1xuICAgIH1cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgIH1cbiAgICByZWxlYXNlKHdlaWdodCA9IDEpIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gd2VpZ2h0O1xuICAgICAgICB0aGlzLl9kaXNwYXRjaCgpO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuX3dlaWdodGVkUXVldWVzLmZvckVhY2goKHF1ZXVlKSA9PiBxdWV1ZS5mb3JFYWNoKChlbnRyeSkgPT4gZW50cnkucmVqZWN0KHRoaXMuX2NhbmNlbEVycm9yKSkpO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFF1ZXVlcyA9IFtdO1xuICAgIH1cbiAgICBfZGlzcGF0Y2goKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICBjb25zdCBxdWV1ZUVudHJ5ID0gKF9hID0gdGhpcy5fd2VpZ2h0ZWRRdWV1ZXNbd2VpZ2h0IC0gMV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFxdWV1ZUVudHJ5KVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNXZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSAtPSB3ZWlnaHQ7XG4gICAgICAgICAgICB3ZWlnaHQgPSB0aGlzLl92YWx1ZSArIDE7XG4gICAgICAgICAgICBxdWV1ZUVudHJ5LnJlc29sdmUoW3ByZXZpb3VzVmFsdWUsIHRoaXMuX25ld1JlbGVhc2VyKHByZXZpb3VzV2VpZ2h0KV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RyYWluVW5sb2NrV2FpdGVycygpO1xuICAgIH1cbiAgICBfbmV3UmVsZWFzZXIod2VpZ2h0KSB7XG4gICAgICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZSh3ZWlnaHQpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBfZHJhaW5VbmxvY2tXYWl0ZXJzKCkge1xuICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLmZvckVhY2goKHdhaXRlcikgPT4gd2FpdGVyKCkpO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdID0gW107XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBfX2F3YWl0ZXIkMSA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgTXV0ZXgge1xuICAgIGNvbnN0cnVjdG9yKGNhbmNlbEVycm9yKSB7XG4gICAgICAgIHRoaXMuX3NlbWFwaG9yZSA9IG5ldyBTZW1hcGhvcmUoMSwgY2FuY2VsRXJyb3IpO1xuICAgIH1cbiAgICBhY3F1aXJlKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyJDEodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBbLCByZWxlYXNlcl0gPSB5aWVsZCB0aGlzLl9zZW1hcGhvcmUuYWNxdWlyZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlbGVhc2VyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUucnVuRXhjbHVzaXZlKCgpID0+IGNhbGxiYWNrKCkpO1xuICAgIH1cbiAgICBpc0xvY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLndhaXRGb3JVbmxvY2soKTtcbiAgICB9XG4gICAgcmVsZWFzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpKVxuICAgICAgICAgICAgdGhpcy5fc2VtYXBob3JlLnJlbGVhc2UoKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmNhbmNlbCgpO1xuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZnVuY3Rpb24gd2l0aFRpbWVvdXQoc3luYywgdGltZW91dCwgdGltZW91dEVycm9yID0gRV9USU1FT1VUKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWNxdWlyZTogKHdlaWdodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHdlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QodGltZW91dEVycm9yKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCBzeW5jLmFjcXVpcmUod2VpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsZWFzZSA9IEFycmF5LmlzQXJyYXkodGlja2V0KSA/IHRpY2tldFsxXSA6IHRpY2tldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aWNrZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrLCB3ZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlbGVhc2UgPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlja2V0ID0geWllbGQgdGhpcy5hY3F1aXJlKHdlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRpY2tldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXRbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodGlja2V0WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxlYXNlKHdlaWdodCkge1xuICAgICAgICAgICAgc3luYy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzeW5jLmNhbmNlbCgpO1xuICAgICAgICB9LFxuICAgICAgICB3YWl0Rm9yVW5sb2NrOiAod2VpZ2h0KSA9PiB7XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBzeW5jLndhaXRGb3JVbmxvY2sod2VpZ2h0KS50aGVuKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KHRpbWVvdXRFcnJvciksIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzTG9ja2VkOiAoKSA9PiBzeW5jLmlzTG9ja2VkKCksXG4gICAgICAgIGdldFZhbHVlOiAoKSA9PiBzeW5jLmdldFZhbHVlKCksXG4gICAgICAgIHNldFZhbHVlOiAodmFsdWUpID0+IHN5bmMuc2V0VmFsdWUodmFsdWUpLFxuICAgIH07XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGlzbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gdHJ5QWNxdWlyZShzeW5jLCBhbHJlYWR5QWNxdWlyZWRFcnJvciA9IEVfQUxSRUFEWV9MT0NLRUQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHJldHVybiB3aXRoVGltZW91dChzeW5jLCAwLCBhbHJlYWR5QWNxdWlyZWRFcnJvcik7XG59XG5cbmV4cG9ydCB7IEVfQUxSRUFEWV9MT0NLRUQsIEVfQ0FOQ0VMRUQsIEVfVElNRU9VVCwgTXV0ZXgsIFNlbWFwaG9yZSwgdHJ5QWNxdWlyZSwgd2l0aFRpbWVvdXQgfTtcbiIsImltcG9ydCB7Y2hlY2tEYXRhTGF5ZXJSdWxlfSBmcm9tIFwiLi9kYXRhTGF5ZXJDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRWxlbWVudFJ1bGV9IGZyb20gXCIuL2VsZW1lbnRDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRnVuY3Rpb25SdWxlfSBmcm9tIFwiLi9mdW5jdGlvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tTZXNzaW9uUnVsZX0gZnJvbSBcIi4vc2Vzc2lvbkNoZWNrZXJcIjtcbmltcG9ydCB7Y2hlY2tVcmxSdWxlfSBmcm9tIFwiLi91cmxDaGVja2VyXCI7XG5pbXBvcnQge2NoZWNrRW52UnVsZX0gZnJvbSBcIi4vZW52Q2hlY2tlclwiO1xuaW1wb3J0IHtjaGVja1Byb2R1Y3RJbmZvUnVsZX0gZnJvbSBcIi4vcHJvZHVjdEluZm9DaGVja2VyXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmltcG9ydCB7YWRkRGF0YUxpc3RlbmVyLCBhZGRUb0JlYWdsZUluZm9MYXllciwgZ2V0RnJvbUJlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IHtNdXRleH0gZnJvbSBcImFzeW5jLW11dGV4XCI7XG5pbXBvcnQge2ZldGNoRWxpZ2liaWxpdHlSdWxlc30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge1NFU1NJT05fU1RPUkFHRV9LRVlTfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlUnVsZUVuZ2luZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7ZWxpZ2liaWxpdHlSdWxlcywgYmFzZVJ1bGVTZXR9ID0gYm9keTtcbiAgICB0aGlzLmJhc2VSdWxlU2V0ID0gYmFzZVJ1bGVTZXQ7XG4gICAgdGhpcy5lbGlnaWJpbGl0eVJ1bGVzID0gZWxpZ2liaWxpdHlSdWxlcztcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMubXV0ZXggPSBuZXcgTXV0ZXgoKTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUnVsZXMoKSB7XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHRoaXMuYmFzZVJ1bGVTZXQpIHtcbiAgICAgIGNvbnN0IHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCB0aGlzLmNoZWNrUnVsZShydWxlKTtcbiAgICAgIGlmICghcnVsZVNhdGlzZmllZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tSdWxlKHJ1bGUpIHtcbiAgICBjb25zdCB7Y2hhaW4sIGNoYWluX2NvbmRpdGlvbiwgdHlwZX0gPSBydWxlO1xuICAgIGxldCBydWxlU2F0aXNmaWVkID0gbnVsbDtcbiAgICAvLyBjaGVjayBydWxlXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwic2Vzc2lvblwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tTZXNzaW9uUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZWxlbWVudFwiOlxuICAgICAgICBjb25zb2xlLnRpbWUoXCJnbC1jaGVja0VsZW1lbnRSdWxlXCIpO1xuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tFbGVtZW50UnVsZShydWxlKTtcbiAgICAgICAgY29uc29sZS50aW1lRW5kKFwiZ2wtY2hlY2tFbGVtZW50UnVsZVwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGF0YUxheWVyXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja0RhdGFMYXllclJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInVybFwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tVcmxSdWxlKHJ1bGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICBydWxlU2F0aXNmaWVkID0gY2hlY2tGdW5jdGlvblJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImVudmlyb25tZW50XCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBjaGVja0VudlJ1bGUocnVsZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2R1Y3RJbmZvTG9va3VwXCI6XG4gICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBhd2FpdCBjaGVja1Byb2R1Y3RJbmZvUnVsZShydWxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZmFpbGVkKGBObyBzdWNoIHJ1bGUgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY2hhaW4pIHtcbiAgICAgIHN3aXRjaCAoY2hhaW5fY29uZGl0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICBydWxlU2F0aXNmaWVkID0gcnVsZVNhdGlzZmllZCAmJiBhd2FpdCB0aGlzLmNoZWNrUnVsZShjaGFpbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkIHx8IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAgIHJ1bGVTYXRpc2ZpZWQgPSBydWxlU2F0aXNmaWVkICE9IGF3YWl0IHRoaXMuY2hlY2tSdWxlKGNoYWluKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiTm8gc3VjaCBjaGFpbiBjb25kaXRpb25cIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydWxlU2F0aXNmaWVkO1xuICB9XG5cbiAgYXN5bmMgYXNzZXNFbGlnaWJpbGl0eVJ1bGVzKCkge1xuICAgIGNvbnNvbGUudGltZShcImdsLWFzc2VzRWxpZ2liaWxpdHlSdWxlc1wiKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJhc3Nlc3NpbmctZWxpZ2liaWxpdHktcnVsZXNcIik7XG4gICAgZm9yIChjb25zdCBba2V5LCBydWxlc10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5lbGlnaWJpbGl0eVJ1bGVzKSkge1xuICAgICAgY29uc3Qgc2F0aXNmaWVkUnVsZUlkcyA9IFtdO1xuICAgICAgdGhpcy5zZXRVcExpc3RlbmVycyhrZXksIHJ1bGVzKTtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSkpIHtcbiAgICAgICAgICBzYXRpc2ZpZWRSdWxlSWRzLnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgICAvLyBQYWdlIHR5cGUgcnVsZXMgYXJlIGV4Y2x1c2l2ZTsgaWYgb25lIGlzIHRydWUgYWxsIG90aGVycyBhcmUgZmFsc2UgYnkgZGVmYXVsdCwgbm8gbmVlZCB0byBhc3Nlc3MgdGhlIHJlc3RcbiAgICAgICAgICBpZiAoa2V5ID09PSBcIlBhZ2VUeXBlXCIpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgc2F0aXNmaWVkUnVsZUlkcyk7XG4gICAgfVxuICAgIGNvbnNvbGUudGltZUVuZChcImdsLWFzc2VzRWxpZ2liaWxpdHlSdWxlc1wiKTtcbiAgfVxuXG4gIGFzeW5jIGFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrKGtleSwgcnVsZXMpIHtcbiAgICBpZiAoIWtleSB8fCAhcnVsZXMgfHwgIXJ1bGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCB0aGlzLm11dGV4LmFjcXVpcmUoKTtcbiAgICBsb2dnZXIubG9nKGBMb2NrIGFjcXVpcmVkIGZvciBrZXkgJHtrZXl9YCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICBjb25zdCBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja1J1bGUocnVsZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKGBfX2VSdWxlcy4ke2tleX1gKSB8fCBbXTtcbiAgICAgICAgaWYgKGlzRWxpZ2libGUpIHtcbiAgICAgICAgICBpZiAoY3VycmVudC5pbmNsdWRlcyhydWxlLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBjdXJyZW50LnB1c2gocnVsZS5uYW1lKTtcbiAgICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtrZXl9YCwgY3VycmVudCk7XG4gICAgICAgICAgaWYgKGtleSA9PT0gXCJQYWdlVHlwZVwiKSBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZW1vdmUgZnJvbSBlbGlnaWJsZSBydWxlc1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gY3VycmVudC5maWx0ZXIoKGspID0+IGsgIT09IHJ1bGUubmFtZSk7XG4gICAgICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoYF9fZVJ1bGVzLiR7a2V5fWAsIGZpbHRlcmVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmZhaWxlZChgRXJyb3IgYXNzZXNzaW5nIHJ1bGVzIGZvciBrZXk6ICR7a2V5fSAtICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGxvZ2dlci5sb2coYFJlbGVhc2luZyBsb2NrIGZvciBrZXk6ICR7a2V5fWApO1xuICAgICAgcmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldFVwTGlzdGVuZXJzKGtleSwgcnVsZXMpIHtcbiAgICBjb25zdCB7ZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlc30gPSB0aGlzLmV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcyk7XG4gICAgZm9yIChjb25zdCBbb3BlcmF0b3IsIHJ1bGVzXSBvZiBPYmplY3QuZW50cmllcyhkYXRhTGF5ZXJSdWxlcykpIHtcbiAgICAgIGNvbnN0IGJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2sgPSB0aGlzLmFzc2VzRWxpZ2liaWxpdHlSdWxlc0NhbGxCYWNrLmJpbmQodGhpcywga2V5LCBydWxlcyk7XG4gICAgICBhZGREYXRhTGlzdGVuZXIob3BlcmF0b3IsIGJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2spO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtzZWxlY3RvciwgcnVsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGVsZW1lbnRSdWxlcykpIHtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uTGlzdCkgPT4ge1xuICAgICAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvblJlY29yZCBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICBub2RlcyA9IFsuLi5ub2RlcywgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5hZGRlZE5vZGVzKSwgLi4uQXJyYXkuZnJvbShtdXRhdGlvblJlY29yZC5yZW1vdmVkTm9kZXMpXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBleGNsdWRlIG11dGF0aW9ucyB0aGF0IG9ubHkgdXBkYXRlIHRleHRcbiAgICAgICAgaWYgKG5vZGVzLmV2ZXJ5KChuKSA9PiBuLnRhZ05hbWUgPT09IHVuZGVmaW5lZCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5hc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayhrZXksIHJ1bGVzKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGVsZW1lbnRUb09ic2VydmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIGVsZW1lbnRUb09ic2VydmUgPSBlbGVtZW50VG9PYnNlcnZlID8gZWxlbWVudFRvT2JzZXJ2ZS5wYXJlbnROb2RlIDogZG9jdW1lbnQuYm9keTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudFRvT2JzZXJ2ZSwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIGV4dHJhY3RSdWxlQXR0cmlidXRlcyhydWxlcywgZGF0YUxheWVyUnVsZXMgPSB7fSwgZWxlbWVudFJ1bGVzID0ge30pIHtcbiAgICBpZiAoIXJ1bGVzIHx8ICFydWxlcy5sZW5ndGgpIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgIGNvbnN0IHt0eXBlfSA9IHJ1bGU7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImRhdGFMYXllclwiOlxuICAgICAgICAgIGlmICghZGF0YUxheWVyUnVsZXNbcnVsZS5vcGVyYXRvcl0pIHtcbiAgICAgICAgICAgIGRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFMYXllclJ1bGVzW3J1bGUub3BlcmF0b3JdLnB1c2gocnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50XCI6XG4gICAgICAgICAgaWYgKCFlbGVtZW50UnVsZXNbcnVsZS5zZWxlY3RvciB8fCBydWxlLnNlbGVjdG9yQWxsXSkge1xuICAgICAgICAgICAgZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3IgfHwgcnVsZS5zZWxlY3RvckFsbF0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudFJ1bGVzW3J1bGUuc2VsZWN0b3IgfHwgcnVsZS5zZWxlY3RvckFsbF0ucHVzaChydWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChydWxlLmNoYWluKSB7XG4gICAgICAgIHRoaXMuZXh0cmFjdFJ1bGVBdHRyaWJ1dGVzKFtydWxlLmNoYWluXSwgZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7ZGF0YUxheWVyUnVsZXMsIGVsZW1lbnRSdWxlc307XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0RWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGVsaWdpYmlsaXR5UnVsZXMgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUyk7XG4gICAgICBpZiAoZWxpZ2liaWxpdHlSdWxlcykgcmV0dXJuIEpTT04ucGFyc2UoZWxpZ2liaWxpdHlSdWxlcyk7XG4gICAgICBlbGlnaWJpbGl0eVJ1bGVzID0gYXdhaXQgZmV0Y2hFbGlnaWJpbGl0eVJ1bGVzKCk7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTRVNTSU9OX1NUT1JBR0VfS0VZUy5FTElHSUJJTElUWV9SVUxFUywgSlNPTi5zdHJpbmdpZnkoZWxpZ2liaWxpdHlSdWxlcykpO1xuICAgICAgcmV0dXJuIGVsaWdpYmlsaXR5UnVsZXM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQ291bGQgbm90IGdldCBlbGlnaWJpbGl0eSBydWxlczogXCIsIGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHthZGRUb0JlYWdsZUluZm9MYXllcn0gZnJvbSBcIi4uL0JlYWdsZUluZm9MYXllclwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiU2VnbWVudGF0aW9uQ29tcHV0ZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wdXRlU2VnbWVudCh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gIGxvZ2dlci5sb2coXCJEZXRlcm1pbmluZyB1c2VyIHNlZ21lbnRcIik7XG4gIHRyeSB7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIE9iamVjdC5rZXlzKHRyZWF0bWVudFdlaWdodHMpKSB7XG4gICAgICBjb25zdCBydWxlU2V0ID0gdHJlYXRtZW50V2VpZ2h0c1tzZWdtZW50XT8ucnVsZVNldDtcbiAgICAgIGlmICghcnVsZVNldCkgY29udGludWU7XG4gICAgICBjb25zdCBzZWdtZW50UnVsZUVuZ2luZSA9IG5ldyBSdWxlRW5naW5lKHtiYXNlUnVsZVNldDogcnVsZVNldCwgYnVzaW5lc3NSdWxlU2V0OiBbXX0pO1xuICAgICAgaWYgKGF3YWl0IHNlZ21lbnRSdWxlRW5naW5lLmNoZWNrUnVsZXMoKSkge1xuICAgICAgICBsb2dnZXIubG9nKGBVc2VyIHNlZ21lbnQgbWF0Y2hlZDogJHtzZWdtZW50fWApO1xuICAgICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgc2VnbWVudCk7XG4gICAgICAgIHJldHVybiBzZWdtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsb2dnZXIubG9nKFwiVXNlciBzZWdtZW50IG5vdCBtYXRjaGVkLCByZXR1cm5pbmcgZGVmYXVsdFwiKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInNcIiwgXCJkZWZhdWx0XCIpO1xuICAgIHJldHVybiBcImRlZmF1bHRcIjtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmZhaWxlZChcIkNvdWxkIG5vdCBjb21wdXRlIHVzZXIgc2VnbWVudFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtTRVNTSU9OX1NUT1JBR0VfS0VZUywgVFJFQVRNRU5UU19EVVJBVElPTn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtmZXRjaFRyZWF0bWVudHMsIGZldGNoVHJlYXRtZW50V2VpZ2h0c30gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge2NvbXB1dGVTZWdtZW50fSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyL3NlZ21lbnQtY29tcHV0ZXJcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIkJlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnlcIik7XG5cbmNsYXNzIFRyZWF0bWVudFJlcG9zaXRvcnkge1xuICBjb25zdHJ1Y3Rvcihib2R5KSB7XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHN9ID0gYm9keTtcbiAgICB0aGlzLnRyZWF0bWVudHMgPSB0cmVhdG1lbnRzO1xuXG4gICAgdGhpcy50cmVhdG1lbnRXZWlnaHRzID0gdHJlYXRtZW50V2VpZ2h0cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRUcmVhdG1lbnRzKCkge1xuICAgIGxvZ2dlci5sb2coXCJMb2FkaW5nIHRyZWF0bWVudHNcIik7XG4gICAgY29uc3Qge1RSRUFUTUVOVFN9ID0gU0VTU0lPTl9TVE9SQUdFX0tFWVM7XG4gICAgY29uc3QgdHJlYXRtZW50c09iaiA9IEpTT04ucGFyc2Uod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oVFJFQVRNRU5UUykpO1xuICAgIGxldCB0cmVhdG1lbnRzID0gdHJlYXRtZW50c09iaj8udHJlYXRtZW50cztcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0cmVhdG1lbnRzT2JqPy50aW1lc3RhbXA7XG4gICAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0aW1lc3RhbXApIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnRzIG5vdCBmb3VuZCBpbiBsb2NhbCBzdG9yYWdlXCIpO1xuICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgaWYgKCF0cmVhdG1lbnRzKSB7XG4gICAgICAgIGxvZ2dlci5mYWlsZWQoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50c1wiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmVhdG1lbnRXaXRoVGltZXN0YW1wID0ge1xuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHRyZWF0bWVudHMsXG4gICAgICB9O1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgcmV0dXJuIHRyZWF0bWVudHM7XG4gICAgfVxuICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IGVsYXBzZWREYXlzID0gKERhdGUubm93KCkgLSB0aW1lc3RhbXApIC8gKDEwMDAgKiAzNjAwICogMjQpO1xuICAgICAgaWYgKGVsYXBzZWREYXlzID4gVFJFQVRNRU5UU19EVVJBVElPTikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiVHJlYXRtZW50cyBhcmUgZXhwaXJlZFwiKTtcbiAgICAgICAgdHJlYXRtZW50cyA9IGF3YWl0IGZldGNoVHJlYXRtZW50cygpO1xuICAgICAgICBpZiAoIXRyZWF0bWVudHMpIHtcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFpbGVkIHRvIGZldGNoIHRyZWF0bWVudHNcIik7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJlYXRtZW50V2l0aFRpbWVzdGFtcCA9IHtcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgdHJlYXRtZW50cyxcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVFJFQVRNRU5UUywgSlNPTi5zdHJpbmdpZnkodHJlYXRtZW50V2l0aFRpbWVzdGFtcCkpO1xuICAgICAgICByZXR1cm4gdHJlYXRtZW50cztcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nZ2VyLnN1Y2Nlc3MoXCJUcmVhdG1lbnRzIGFyZSBsb2FkZWQgZnJvbSBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldFRyZWF0bWVudFdlaWdodHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB3ZWlnaHRzID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuV0VJR0hUUyk7XG4gICAgICBpZiAod2VpZ2h0cykgcmV0dXJuIEpTT04ucGFyc2Uod2VpZ2h0cyk7XG4gICAgICB3ZWlnaHRzID0gYXdhaXQgZmV0Y2hUcmVhdG1lbnRXZWlnaHRzKCk7XG4gICAgICBpZiAoIXdlaWdodHMpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIkZhaWxlZCB0byBmZXRjaCB3ZWlnaHRzXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLldFSUdIVFMsIEpTT04uc3RyaW5naWZ5KHdlaWdodHMpKTtcbiAgICAgIHJldHVybiB3ZWlnaHRzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0TWF0Y2hlZFRyZWF0bWVudHMoKSB7XG4gICAgY29uc3Qge3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHN9ID0gdGhpcztcbiAgICBjb25zdCB1c2VyU2VnbWVudCA9IGF3YWl0IGNvbXB1dGVTZWdtZW50KHRyZWF0bWVudFdlaWdodHMpO1xuICAgIGlmICghdXNlclNlZ21lbnQpIHJldHVybiBudWxsO1xuICAgIGlmICh0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgICBjb25zdCB1c2VyU2VnbWVudFdlaWdodHMgPSAodXNlclNlZ21lbnQgJiYgdHJlYXRtZW50V2VpZ2h0c1t1c2VyU2VnbWVudF0pID9cbiAgICAgIHRyZWF0bWVudFdlaWdodHNbdXNlclNlZ21lbnRdIDogdHJlYXRtZW50V2VpZ2h0c1tcImRlZmF1bHRcIl07XG4gICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiB0cmVhdG1lbnRzKSB7XG4gICAgICAgIHRyZWF0bWVudC53ZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50Py5pZF0/LndlaWdodCB8fCAwO1xuICAgICAgICBpZiAoIXRyZWF0bWVudC5hY3Rpb25zLnNvbWUoKGEpID0+IGEudmFyaWFudHMpKSBjb250aW51ZTtcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgdHJlYXRtZW50LmFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIWFjdGlvbi52YXJpYW50cykgY29udGludWU7XG4gICAgICAgICAgZm9yIChjb25zdCB2YXJpYW50S2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvbi52YXJpYW50cykpIHtcbiAgICAgICAgICAgIGlmICh1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXT8udmFyaWFudHMgJiYgdXNlclNlZ21lbnRXZWlnaHRzW3RyZWF0bWVudC5pZF0/LnZhcmlhbnRzW3ZhcmlhbnRLZXldKSB7XG4gICAgICAgICAgICAgIGFjdGlvbi52YXJpYW50c1t2YXJpYW50S2V5XS53ZWlnaHQgPSB1c2VyU2VnbWVudFdlaWdodHNbdHJlYXRtZW50LmlkXS52YXJpYW50c1t2YXJpYW50S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKGAke3RyZWF0bWVudHMubGVuZ3RofSB0cmVhdG1lbnRzIHVzZXIgc2VnbWVudCBtYXRjaGVkYCk7XG4gICAgaWYgKCF0cmVhdG1lbnRzLmxlbmd0aCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiB0cmVhdG1lbnRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWF0bWVudFJlcG9zaXRvcnk7XG4iLCJpbXBvcnQge3JlcGxhY2VBbGx9IGZyb20gXCIuLi9zdHJpbmdVdGlsc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcihcIlJlcGxhY2VVdGlsc1wiKTtcblxuY29uc3QgcmVwbGFjZXIgPSBhc3luYyAodmFsdWUsIHJlcGxhY2VGbikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IFtpLCB2YWxdIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY3VycmVudFJlcGxhY2VGbiA9IEFycmF5LmlzQXJyYXkocmVwbGFjZUZuKSA/IHJlcGxhY2VGbltpXSA6IHJlcGxhY2VGbiB8fCBcIlwiO1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UmVwbGFjZUZuID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VWYWwgPSBhd2FpdCByZXBsYWNlT2JqZWN0RXh0cmFjdG9yKGN1cnJlbnRSZXBsYWNlRm4pO1xuICAgICAgICB2YWx1ZVtpXSA9IHJlcGxhY2VBbGwodmFsLCBcInt7UkVQTEFDRX19XCIsIHJlcGxhY2VWYWwpO1xuICAgICAgfSBlbHNlIHZhbHVlW2ldID0gcmVwbGFjZUZuRXhlY3V0b3IoY3VycmVudFJlcGxhY2VGbiwgdmFsKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlRm4pKSB7XG4gICAgZm9yIChjb25zdCByRm4gb2YgcmVwbGFjZUZuKSB7XG4gICAgICBpZiAodHlwZW9mIHJGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCByZXBsYWNlVmFsID0gYXdhaXQgcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyRm4pO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICAgIH0gZWxzZSB2YWx1ZSA9IHJlcGxhY2VGbkV4ZWN1dG9yKHJGbiwgdmFsdWUsIHRydWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHJlcGxhY2VGbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc3QgcmVwbGFjZVZhbCA9IGF3YWl0IHJlcGxhY2VPYmplY3RFeHRyYWN0b3IocmVwbGFjZUZuKTtcbiAgICAgIHZhbHVlID0gcmVwbGFjZUFsbCh2YWx1ZSwgXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlVmFsKTtcbiAgICB9IGVsc2UgdmFsdWUgPSByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiByZXBsYWNlRm5FeGVjdXRvcihyZXBsYWNlRm4sIHZhbHVlLCBzaW5nbGUgPSBmYWxzZSkge1xuICBpZiAocmVwbGFjZUZuICYmIHZhbHVlLmluY2x1ZGVzKFwie3tSRVBMQUNFfX1cIikpIHtcbiAgICBsb2dnZXIubG9nKFwiRXhlY3V0aW5nIHJlcGxhY2UgZnVuY3Rpb246IFwiLCByZXBsYWNlRm4pO1xuICAgIGNvbnN0IHJlcGxhY2VGdW5jdGlvbiA9IEZ1bmN0aW9uKHJlcGxhY2VGbik7XG4gICAgaWYgKHNpbmdsZSkgcmV0dXJuIHZhbHVlLnJlcGxhY2UoXCJ7e1JFUExBQ0V9fVwiLCByZXBsYWNlRnVuY3Rpb24oKSk7XG4gICAgcmV0dXJuIHJlcGxhY2VBbGwodmFsdWUsIFwie3tSRVBMQUNFfX1cIiwgcmVwbGFjZUZ1bmN0aW9uKCkpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZU9iamVjdEV4dHJhY3RvcihyZXBsYWNlRm4pIHtcbiAgY29uc3Qge3N0b3JhZ2UsIGtleSwga2V5RmFsbGJhY2ssIHR5cGV9ID0gcmVwbGFjZUZuO1xuICBzd2l0Y2ggKHN0b3JhZ2UpIHtcbiAgICBjYXNlIFwic2Vzc2lvblwiOiB7XG4gICAgICBsZXQgcmVwbGFjZVZhbCA9IG51bGw7XG4gICAgICByZXBsYWNlVmFsID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgIGlmICghcmVwbGFjZVZhbCkgcmVwbGFjZVZhbCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleUZhbGxiYWNrKTtcbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IEpTT04ucGFyc2UocmVwbGFjZVZhbCk7XG4gICAgICAgICAgcmVwbGFjZVZhbCA9IHJlcGxhY2VWYWxbcmVwbGFjZVZhbC5sZW5ndGggLSAxXVt0eXBlXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgQ291bGQgbm90IHBhcnNlICR7cmVwbGFjZVZhbH1gKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGxhY2VWYWw7XG4gICAgfVxuICAgIGNhc2UgXCJpbmZvLWxheWVyXCI6IHtcbiAgICAgIGxldCByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXkpO1xuICAgICAgaWYgKCFyZXBsYWNlVmFsKSByZXBsYWNlVmFsID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihrZXlGYWxsYmFjayk7XG4gICAgICByZXR1cm4gcmVwbGFjZVZhbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZXI7XG4iLCJpbXBvcnQge2NvbmRpdGlvbkNoZWNrZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuLi9HbG92UHJvZHVjdEluZm9SZXBvc2l0b3J5L3N0b3JlXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuLi9sb2dnZXJcIjtcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJBY3Rpb25Db25kaXRpb25VdGlsc1wiKTtcblxuY29uc3QgY2hlY2tBY3Rpb25Db25kaXRpb24gPSBhc3luYyAoY29uZGl0aW9uKSA9PiB7XG4gIGxvZ2dlci5sb2coXCJBY3Rpb24gY29uZGl0aW9uIGZvdW5kOiBcIiwgY29uZGl0aW9uKTtcbiAgY29uc3QgZWxpZ2libGVFbGVtZW50cyA9IFtdO1xuICBjb25zdCB7YXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIG9wZXJhdG9yLCBzZWxlY3RvciwgdHlwZSwgdmFsdWUsIGNoYWlufSA9IGNvbmRpdGlvbjtcbiAgY29uc3QgY29uZGl0aW9uRWxlbWVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29uZGl0aW9uRWxlbWVudHMpIHtcbiAgICBpZiAoYXdhaXQgYWN0aW9uQ29uZGl0aW9uQ2hlY2tlcihlbGVtZW50LCB0eXBlLCBvcGVyYXRvciwgYXR0cmlidXRlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlLCBjaGFpbikpIHtcbiAgICAgIGVsaWdpYmxlRWxlbWVudHMucHVzaCgkKGVsZW1lbnQpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsaWdpYmxlRWxlbWVudHM7XG59O1xuXG5jb25zdCBhY3Rpb25Db25kaXRpb25DaGVja2VyID0gYXN5bmMgKGVsZW1lbnQsIHR5cGUsIG9wZXJhdG9yLCBhdHRyaWJ1dGUsIGlubmVyX2NvbmRpdGlvbiwgdmFsdWUsIGNoYWluKSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJwcm9kdWN0SW5mb0xvb2t1cFwiOiB7XG4gICAgICBjb25zdCBlbGVtZW50U2t1ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gYXdhaXQgU3RvcmUuZ2V0SW5zdGFuY2UoKS5nZXQoZWxlbWVudFNrdSk7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBwcm9kdWN0SW5mbz8uW29wZXJhdG9yXTtcbiAgICAgIC8vIHJ1blRpbWVWYWx1ZSBtYXkgYmUgMFxuICAgICAgaWYgKHJ1blRpbWVWYWx1ZSA9PT0gbnVsbCB8fCBydW5UaW1lVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUHJvZHVjdCBpbmZvIGlzIGVtcHR5XCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIWNvbmRpdGlvbkNoZWNrZXIocnVuVGltZVZhbHVlLCBpbm5lcl9jb25kaXRpb24sIHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGNoYWluKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFjdGlvbkNvbmRpdGlvbkNoZWNrZXIoZWxlbWVudCwgY2hhaW4udHlwZSwgY2hhaW4ub3BlcmF0b3IsXG4gICAgICAgICAgICBjaGFpbi5hdHRyaWJ1dGUsIGNoYWluLmlubmVyX2NvbmRpdGlvbiwgY2hhaW4udmFsdWUsIGNoYWluLmNoYWluKTtcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb25zdCBydW5UaW1lVmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgaWYgKCFjb25kaXRpb25DaGVja2VyKHJ1blRpbWVWYWx1ZSwgaW5uZXJfY29uZGl0aW9uLCB2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChjaGFpbikge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhY3Rpb25Db25kaXRpb25DaGVja2VyKGVsZW1lbnQsIGNoYWluLnR5cGUsIGNoYWluLm9wZXJhdG9yLFxuICAgICAgICAgICAgY2hhaW4uYXR0cmlidXRlLCBjaGFpbi5pbm5lcl9jb25kaXRpb24sIGNoYWluLnZhbHVlLCBjaGFpbi5jaGFpbik7XG4gICAgICAgIGlmICghcmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tBY3Rpb25Db25kaXRpb247XG4iLCJpbXBvcnQge3N0eWxlQXBwbGljYXRvciwgZGVsYXksIGlkbGVUaW1lcn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQge3JlcGxhY2VBbGwsIHR1cmtpc2hUb0xvd2VyfSBmcm9tIFwiLi4vc3RyaW5nVXRpbHNcIjtcbmltcG9ydCB7TU9CSUxFX01FRElBX1FVRVJZLCBTRVNTSU9OX1NUT1JBR0VfS0VZUywgSURMRV9USU1FT1VUfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgcmVwbGFjZXIgZnJvbSBcIi4vcmVwbGFjZS11dGlsc1wiO1xuaW1wb3J0IGNoZWNrQWN0aW9uQ29uZGl0aW9uIGZyb20gXCIuL2FjdGlvbi1jb25kaXRpb24tdXRpbFwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQge2dldEZyb21CZWFnbGVJbmZvTGF5ZXJ9IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5hc3luYyBmdW5jdGlvbiBhcHBseUFjdGlvbnMoYWN0aW9ucykge1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlQXBwbHlBY3Rpb25zXCIpO1xuICBjb25zdCB7UE9QVVBfRElTUExBWV9GTEFHfSA9IFNFU1NJT05fU1RPUkFHRV9LRVlTO1xuXG4gIGNvbnN0IHRyYW5zZm9ybWVyID0gYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtZXIoYWN0aW9uLCBlbGVtZW50ID0gbnVsbCkge1xuICAgIGxvZ2dlci5sb2coXCJBcHBseWluZyBhY3Rpb246IFwiLCBKU09OLnN0cmluZ2lmeShhY3Rpb24pKTtcbiAgICBjb25zdCB7XG4gICAgICBvcGVyYXRvcixcbiAgICAgIHR5cGUsXG4gICAgICBhcHBseUV2ZW50LFxuICAgICAgY29udGVudFNlbGVjdG9yLFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBzZWxlY3RvckZhbGxiYWNrLFxuICAgICAgbWRDb25kaXRpb24sXG4gICAgICBtb3ZlX3NlbGVjdG9yXzEsXG4gICAgICBtb3ZlX3NlbGVjdG9yXzIsXG4gICAgICByZXBsYWNlRm4sXG4gICAgICBwVHlwZSxcbiAgICAgIGF0dHJpYnV0ZSxcbiAgICAgIHByb2R1Y3RJbmZvU3RvcmFnZSxcbiAgICB9ID0gYWN0aW9uO1xuICAgIGlmIChvcGVyYXRvciA9PT0gXCJub29wXCIpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJOb29wIE9wZXJhdG9yOiBObyBvcGVyYXRpb24gaXMgYXBwbGllZCBvbiB0YXJnZXQgXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxldCB7dmFsdWV9ID0gYWN0aW9uO1xuICAgIC8vIElmIGFuIGVsZW1lbnQgaXMgcGFzc2VkIHRvIHRyYW5zZm9ybWVyLCBzZWxlY3RvciBpcyByZWxhdGl2ZSB0byBwYXNzZWQgZWxlbWVudFxuICAgIGVsZW1lbnQgPSBlbGVtZW50ID8gZWxlbWVudC5maW5kKHNlbGVjdG9yKSA6ICQoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbWMgPSBtZENvbmRpdGlvbiA/IHdpbmRvdy5tYXRjaE1lZGlhKG1kQ29uZGl0aW9uKS5tYXRjaGVzIDogdHJ1ZTtcbiAgICBpZiAoIW1jKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiTWVkaWEgY29uZGl0aW9uIG1pc21hdGNoOiBcIiwgbWRDb25kaXRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAobW92ZV9zZWxlY3Rvcl8xICYmICFtb3ZlX3NlbGVjdG9yXzIpIHx8XG4gICAgICAobW92ZV9zZWxlY3Rvcl8yICYmICFtb3ZlX3NlbGVjdG9yXzEpXG4gICAgKSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiQm90aCBtb3ZlIHNlbGVjdG9ycyBhcmUgcmVxdWlyZWRcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChtb3ZlX3NlbGVjdG9yXzEgJiYgbW92ZV9zZWxlY3Rvcl8yKSB7XG4gICAgICBpZiAoISQobW92ZV9zZWxlY3Rvcl8xKS5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMSBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoISQobW92ZV9zZWxlY3Rvcl8yKS5sZW5ndGgpIHtcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIk1vdmUgc2VsZWN0b3IgMiBub3QgZm91bmQ6IFwiLCBtb3ZlX3NlbGVjdG9yXzIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3Qgc3BlY2lmaWVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgIGlmICghJChzZWxlY3RvckZhbGxiYWNrKS5sZW5ndGggJiYgb3BlcmF0b3IgPT09IFwicmVtb3ZlXCIpIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoc2VsZWN0b3IgIT09IFwibm8tc2VsZWN0b3JcIikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoXCJTZWxlY3RvciBub3QgZm91bmQ6IFwiLCBzZWxlY3Rvcik7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlRyeWluZyBmYWxsYmFjayBzZWxlY3RvcjogXCIsIHNlbGVjdG9yRmFsbGJhY2spO1xuICAgICAgICAgIGlmIChzZWxlY3RvckZhbGxiYWNrKSBlbGVtZW50ID0gJChzZWxlY3RvckZhbGxiYWNrKTtcbiAgICAgICAgICBpZiAoIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiRmFsbGJhY2sgc2VsZWN0b3Igbm90IGZvdW5kXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlRm4pIHtcbiAgICAgIHZhbHVlID0gYXdhaXQgcmVwbGFjZXIodmFsdWUsIHJlcGxhY2VGbik7XG4gICAgfVxuICAgIGlmIChvcGVyYXRvciA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgaWYgKGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJSZW1vdmluZzogXCIsIHNlbGVjdG9yKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSBsb2dnZXIubG9nKFwiQ2Fubm90IGZvdW5kIGVsZW1lbnQgd2l0aCBzZWxlY3RvcjogXCIsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImluc2VydFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJlZm9yZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYmVmb3JlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGlmIChTdHJpbmcodmFsdWUpLmluY2x1ZGVzKFwibmQtYWRkLXRvLXdpblwiKSkge1xuICAgICAgICAgICAgJChcIi5uZC1hZGQtdG8td2luXCIpLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmJlZm9yZSh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhZnRlclwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXCJJbnNlcnRpbmcgYWZ0ZXI6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5hZnRlcih2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhcHBlbmRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiQXBwZW5kaW5nIHZhbHVlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vZGFsXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudC5vZmYoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIGNyZWF0ZVBvcHVwKHZhbHVlLCBjb250ZW50U2VsZWN0b3IsIHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGVsbSA9PSBlLnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzcGxheU1vZGFsKHZhbHVlLCBjb250ZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicG9wdXBcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQT1BVUF9ESVNQTEFZX0ZMQUcpKSAhPT0gMCkge1xuICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiUG9wdXAgYWxyZWFkeSBkaXNwbGF5ZWQgaW4gc2Vzc2lvblwiKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgUG9wdXA6IFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAocFR5cGUpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBhd2FpdCBnZXRQcm9kdWN0SW5mbyhwVHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZXhpdEludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGV4aXQgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtyLCBkXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJyXCIsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcImRcIiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBkID09PSBcInN0cmluZ1wiICYmICFyLmluY2x1ZGVzKGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy50b3AuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICE9PSBcImJnX2xpbWJvXCIpIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcImJnX2xpbWJvXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnRvcC5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZGlzcGxheVBvcHVwLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5zdGF0ZSAhPT0gXCJiZ19saW1ib1wiKSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJiZ19saW1ib1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWRsZVRpbWVyKElETEVfVElNRU9VVCwgZGlzcGxheVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiY29weUludGVudFwiOlxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQWRkaW5nIGNvcHkgaW50ZW50IGxpc3RlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gYXBwZW5kIHBvcHVwIHRvIGJvZHkgYWZ0ZXIgdGltZW91dCBleHBpcmVzXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlQb3B1cCgpO1xuICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nZ2VyLmZhaWxlZChgVHlwZTogJHt0eXBlfSBub3QgZm91bmQgZm9yIG9wZXJhdG9yOiAke29wZXJhdG9yfWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiZWRpdFwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiRWRpdGluZyB0ZXh0OiBcIiwgdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQudGV4dCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkVkaXRpbmcgaHRtbDogXCIsIHZhbHVlKTtcbiAgICAgICAgICBlbGVtZW50Lmh0bWwodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3R5bGVBcHBsaWNhdG9yXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIHN0eWxlOiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVDaGFuZ2VzTWFwID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiU3R5bGUgQ2hhbmdlcyBNYXA6IFwiLCBzdHlsZUNoYW5nZXNNYXApO1xuICAgICAgICAgICAgc3R5bGVBcHBsaWNhdG9yKGVsZW1lbnQsIHN0eWxlQ2hhbmdlc01hcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWRkQ2xhc3NcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKGBhZGRkaW5nIGNsYXNzIHRvICR7ZWxlbWVudH0gbmFtZWQgJHt2YWx1ZX1gKTtcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlbW92ZUNsYXNzXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhgcmVtb3ZlIGNsYXNzIGZyb20gJHtlbGVtZW50fSBuYW1lZCAke3ZhbHVlfWApO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3ModmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG9jdW1lbnRUaXRsZVwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coYGNoYW5naW5nIGRvY3VtZW50IHRpdGxlIGZyb20gJHtlbGVtZW50fSB0byAke3ZhbHVlfWApO1xuICAgICAgICAgIGlmIChhcHBseUV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGFwcGx5RXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ID09IFwidGFiQ2hhbmdlXCIpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiY2F0Y2hpbmcgZXZlbnQgdGFiY2hhbmdlLi5cIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUaXRsZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGU7XG4gICAgICAgICAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZURvY3VtZW50VGl0bGVUYWJDaGFuZ2UoZSwgdmFsdWUsIG9yaWdpbmFsVGl0bGUpO1xuICAgICAgICAgICAgICAgICAgfSwgMTUwMDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIubG9nKFwiVW5rbm93biBlZGl0IHR5cGU6IFwiLCB0eXBlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInNldGF0dHJpYnV0ZVwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU2V0dGluZyBhdHRyaWJ1dGU6IFwiLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgIHN3aXRjaCAoYXR0cmlidXRlKSB7XG4gICAgICAgIGNhc2UgXCJzcmNcIjpcbiAgICAgICAgICBlbGVtZW50LmNzcyhcImNvbnRlbnRcIiwgYHVybCgke3ZhbHVlLnRyaW0oKX0pYCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdHlsZVwiOlxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jYXNlLWRlY2xhcmF0aW9uc1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gdmFsdWUuc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eVZhbHVlID0gdmFsdWUuc3BsaXQoXCI6XCIpWzFdLnRyaW0oKTtcblxuICAgICAgICAgIGVsZW1lbnQuY3NzKHByb3BlcnR5LCBwcm9wZXJ0eVZhbHVlLCBcIiFpbXBvcnRhbnRcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKFwiZnVuY3Rpb25cIikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gRnVuY3Rpb24odmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50LmF0dHIoYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIlVuaGFuZGxlZCBhdHRyaWJ1dGU6IFNldHRpbmcgYXR0cmlidXRlOiBcIiwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJyZXBsYWNlXCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJSZXBsYWNpbmc6IFwiLCB2YWx1ZSk7XG4gICAgICBlbGVtZW50LnJlcGxhY2VBbGwodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwic3dhcFwiKSB7XG4gICAgICBsb2dnZXIubG9nKFwiU3dhcHBpbmc6IFwiLCBtb3ZlX3NlbGVjdG9yXzEsIG1vdmVfc2VsZWN0b3JfMik7XG4gICAgICBjb25zdCBuMSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgbjIgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIHN3YXBOb2RlcyhuMSwgbjIpO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09IFwiaW5qZWN0c2NyaXB0XCIpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJJbmplY3Rpbmcgc2NyaXB0OiBcIiwgdmFsdWUpO1xuICAgICAgZWxlbWVudC5hcHBlbmQoYDxzY3JpcHQ+JHt2YWx1ZX08L3NjcmlwdD5gKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcIm1vdmVcIikge1xuICAgICAgbG9nZ2VyLmxvZyhgTW92aW5nICR7bW92ZV9zZWxlY3Rvcl8xfSB0byAke21vdmVfc2VsZWN0b3JfMn1gKTtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb3ZlX3NlbGVjdG9yXzEpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW92ZV9zZWxlY3Rvcl8yKTtcbiAgICAgIHNvdXJjZS5yZW1vdmUoKTtcbiAgICAgIGRlc3RpbmF0aW9uLnByZXBlbmQoc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSBcInByb2R1Y3RJbmZvTG9va3VwXCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldFByb2R1Y3RJbmZvKHBUeXBlLCB2YWx1ZSwgcHJvZHVjdEluZm9TdG9yYWdlKTtcbiAgICAgIGVsZW1lbnQuYmVmb3JlKHJlcyk7XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJ0ZXh0LXRyYW5zZm9ybVwiKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImNhcGl0YWxpemVcIjoge1xuICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBBcnJheS5mcm9tKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAoZS5pbm5lclRleHQ/LmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgICAgIGUuaW5uZXJUZXh0ID0gdHVya2lzaFRvTG93ZXIoZS5pbm5lclRleHQpLnNwbGl0KFwiXFxuXCIpLm1hcCgoc2VudGVuY2UpID0+XG4gICAgICAgICAgICAgICAgc2VudGVuY2Uuc3BsaXQoXCIgXCIpLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpLmpvaW4oXCIgXCIpLFxuICAgICAgICAgICAgICApLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5pbm5lclRleHQgPSB0dXJraXNoVG9Mb3dlcihlLmlubmVyVGV4dClcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAgICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiUExBQ0VIT0xERVJcIjoge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJObyBzdWNoIG9wZXJhdG9yIGV4aXN0cyB5ZXRcIiwgb3BlcmF0b3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXBsYWNlV2l0aFZhbCA9ICh2YWx1ZSwgaHRtbFN0cikgPT4ge1xuICAgIGlmICh2YWx1ZSAmJiBodG1sU3RyLmluY2x1ZGVzKFwie3tSRVBMQUNFX1BST0RVQ1RJTkZPfX1cIikpIHtcbiAgICAgIGh0bWxTdHIgPSByZXBsYWNlQWxsKGh0bWxTdHIsIFwie3tSRVBMQUNFX1BST0RVQ1RJTkZPfX1cIiwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbFN0cjtcbiAgfTtcbiAgY29uc3QgZ2V0UHJvZHVjdEluZm8gPSBhc3luYyAodHlwZSwgdmFsdWUsIHByb2R1Y3RJbmZvU3RvcmFnZSkgPT4ge1xuICAgIC8vIGdldCBrZXlzIG9mIHByb2R1Y3RJbmZvXG4gICAgY29uc3Qgc2t1TGlzdCA9IHByb2R1Y3RJbmZvU3RvcmFnZSA9PT0gXCJiYXNrZXRcIiA/XG4gICAgYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcIl9fZmVhdHVyZXMuU0tVc29uTGFzdENhcnRWaWV3XCIsIHRydWUpIDpcbiAgICBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiX19mZWF0dXJlcy5TS1Vzb25QYWdlXCIsIHRydWUpO1xuICAgIGxldCByZXMgPSBudWxsO1xuICAgIGlmICghc2t1TGlzdCB8fCBza3VMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9nZ2VyLmxvZyhcIk5vIHNrdSBmb3VuZFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwcm9kdWN0SW5mbyA9IGF3YWl0IFN0b3JlLmdldEluc3RhbmNlKCkuZ2V0KHNrdUxpc3RbMF0pO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInRyYW5zYWN0aW9uSW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyB0cmFuc2NhdGlvbkluMldlZWtzIFwiLCBwcm9kdWN0SW5mby5zYWxlQ250VmlzaXRvcnNJbjE1KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiYWRkVG9DYXJ0SW4yV2Vla3NcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby5jYXJ0Q250VmlzaXRvcnNJbjE1LnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIiksIHZhbHVlKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlJlcGxhY2luZyBBZGRUb0NhcnRDb3VudCBcIiwgcHJvZHVjdEluZm8uY2FydENudFZpc2l0b3JzSW4xNSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBcInByb2R1Y3RWaWV3Q291bnRcIjoge1xuICAgICAgICByZXMgPSByZXBsYWNlV2l0aFZhbChwcm9kdWN0SW5mby52aWV3Q250VmlzaXRvcnNJbjEudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKSwgdmFsdWUpO1xuICAgICAgICBsb2dnZXIubG9nKFwiUmVwbGFjaW5nIHByb2R1Y3RWaWV3Q291bnQgZm9yXCIsIHByb2R1Y3RJbmZvLnZpZXdDbnRWaXNpdG9yc0luMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmZhaWxlZChcIm5vIHN1Y2ggdHlwZSBmb3VuZCBmb3IgcHJvZHVjdEluZm9Mb29rdXAgb3BlcmF0b3I6IFwiKyB0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbiAgY29uc3QgaGFuZGxlRG9jdW1lbnRUaXRsZVRhYkNoYW5nZSA9IGFzeW5jIChldmVudCwgdGl0bGVzLCBvcmlnaW5hbFRpdGxlKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkVGl0bGVzID0gIUFycmF5LmlzQXJyYXkodGl0bGVzKSA/IFt0aXRsZXNdIDogdGl0bGVzO1xuICAgIGZvciAoY29uc3QgcGFyc2VkVGl0bGUgb2YgcGFyc2VkVGl0bGVzKSB7XG4gICAgICBpZiAod2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IHBhcnNlZFRpdGxlO1xuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKTtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICAgIGF3YWl0IGRlbGF5KDIwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnRvcC5kb2N1bWVudC50aXRsZSA9IG9yaWdpbmFsVGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgIHdpbmRvdy50b3AuZG9jdW1lbnQudGl0bGUgPSBvcmlnaW5hbFRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlKGV2ZW50LCB0aXRsZXMsIG9yaWdpbmFsVGl0bGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQb3B1cENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgaWQgPSBldmVudC50YXJnZXQuaWQ7XG4gICAgaWYgKGlkICYmIGlkID09PSBcIm5kLXBvcHVwX193cmFwcGVyXCIpIHtcbiAgICAgICQoXCIjbmQtcG9wdXBfX3dyYXBwZXJcIikucmVtb3ZlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QuY29udGFpbnMoXCJuZC1tb2RhbF9fd3JhcHBlclwiKSkge1xuICAgICAgJChcIi5uZC1tb2RhbF9fd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2ssIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBvcHVwID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBPUFVQX0RJU1BMQVlfRkxBRykpID4gMCkgcmV0dXJuO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUE9QVVBfRElTUExBWV9GTEFHLCAxKTtcbiAgICBjb25zdCBxUG9wdXAgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3J0LXNoYWRvdy1ob3N0XCIpO1xuICAgIGlmIChxUG9wdXApIHFQb3B1cC5zdHlsZVtcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmQtcG9wdXBfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcblxuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29weVwiLCBkaXNwbGF5UG9wdXAsIHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgfSk7XG4gICAgd2luZG93LnRvcC5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBkaXNwbGF5UG9wdXApO1xuICAgIHdpbmRvdy50b3AucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGRpc3BsYXlQb3B1cCwge1xuICAgICAgb25jZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlUG9wdXBDbGljaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVBvcHVwQ2xpY2ssIHRydWUpO1xuICAgIH0sIDE1MDAwKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5TW9kYWwgPSAodmFsdWUsIGNvbnRlbnRTZWxlY3RvcikgPT4ge1xuICAgIGlmICh3aW5kb3cudG9wLmRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xuICAgIGNvbnN0IHFQb3B1cCA9IHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncnQtc2hhZG93LWhvc3RcIik7XG4gICAgaWYgKHFQb3B1cCkgcVBvcHVwLnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpKSBjcmVhdGVQb3B1cCh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCB0cnVlKTtcbiAgICB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmQtbW9kYWxfX3dyYXBwZXJcIikuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJibG9ja1wiO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQb3B1cCA9ICh2YWx1ZSwgY29udGVudFNlbGVjdG9yLCBpc01vZGFsPWZhbHNlKSA9PiB7XG4gICAgLy8gQ3JlYXRlIHBvcHVwIHdyYXBwZXJcbiAgICBjb25zdCBwb3B1cFdyYXBwZXIgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLXBvcHVwX193cmFwcGVyXCIpO1xuICAgIGlmIChpc01vZGFsKSBwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcIm5kLW1vZGFsX193cmFwcGVyXCIpO1xuICAgIGlmICghaXNNb2RhbCkgcG9wdXBXcmFwcGVyLmlkID0gXCJuZC1wb3B1cF9fd3JhcHBlclwiO1xuXG4gICAgLy8gQ3JlYXRlIHBvcHVwIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHBvcHVwQ2xvc2VCdXR0b24gPSB3aW5kb3cudG9wLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvblN0eWxlID0gaXNNb2RhbCA/IFwibmQtcG9wdXBfX2J1dHRvbi1jbG9zZV9fY29sb3JlZFwiIDogXCJuZC1wb3B1cF9fYnV0dG9uLWNsb3NlXCI7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xvc2VCdXR0b25TdHlsZSk7XG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcbiAgICBpZiAoaXNNb2RhbCkge1xuICAgICAgcG9wdXBDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKFwiLm5kLW1vZGFsX193cmFwcGVyXCIpLmhpZGUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcHVwQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJChcIiNuZC1wb3B1cF9fd3JhcHBlclwiKS5yZW1vdmUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVQb3B1cENsaWNrLCB0cnVlKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnRTZWxlY3Rvcikge1xuICAgICAgY29uc3QgY29udGVudHMgPSBBcnJheS5mcm9tKHdpbmRvdy50b3AuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb250ZW50U2VsZWN0b3IpKTtcbiAgICAgIHdoaWxlICh2YWx1ZS5pbmNsdWRlcyhcInt7UkVQTEFDRX19XCIpICYmIGNvbnRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwie3tSRVBMQUNFfX1cIiwgY29udGVudHMuc2hpZnQoKS5zcmMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBwb3B1cCBmcm9tIGFjdGlvbiBhbmQgYXBwZW5kIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHRlbXBsYXRlID0gd2luZG93LnRvcC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IHBvcHVwID0gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHBvcHVwQ2xvc2VCdXR0b24pO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChwb3B1cCk7XG5cbiAgICAvLyBSZW1vdmUgb2xkIHBvcHVwIGlmIGV4aXN0cyBiZWZvcmUgYXBwZW5kaW5nIG5ldyBvbmVcbiAgICAkKFwiI25kLXBvcHVwX193cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgIHdpbmRvdy50b3AuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cFdyYXBwZXIpO1xuICB9O1xuXG4gIGNvbnN0IHN3YXBOb2RlcyA9IGZ1bmN0aW9uIHN3YXBOb2RlcyhuMSwgbjIpIHtcbiAgICBjb25zdCBwMSA9IG4xLnBhcmVudE5vZGU7XG4gICAgY29uc3QgcDIgPSBuMi5wYXJlbnROb2RlO1xuICAgIGxldCBpMTtcbiAgICBsZXQgaTI7XG5cbiAgICBpZiAoIXAxIHx8ICFwMiB8fCBwMS5pc0VxdWFsTm9kZShuMikgfHwgcDIuaXNFcXVhbE5vZGUobjEpKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocDEuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjEpKSB7XG4gICAgICAgIGkxID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAyLmNoaWxkcmVuW2ldLmlzRXF1YWxOb2RlKG4yKSkge1xuICAgICAgICBpMiA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHAxLmlzRXF1YWxOb2RlKHAyKSAmJiBpMSA8IGkyKSB7XG4gICAgICBpMisrO1xuICAgIH1cbiAgICBwMS5pbnNlcnRCZWZvcmUobjIsIHAxLmNoaWxkcmVuW2kxXSk7XG4gICAgcDIuaW5zZXJ0QmVmb3JlKG4xLCBwMi5jaGlsZHJlbltpMl0pO1xuICB9O1xuXG4gIGNvbnN0IHdhaXRGb3JKUXVlcnkgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcImpRdWVyeSBub3QgZm91bmQsIHJldHJ5aW5nXCIpO1xuICAgICAgICBjb25zdCBqUXVlcnlJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZiAod2luZG93LmpRdWVyeSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChqUXVlcnlJbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUpO1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoalF1ZXJ5SW50ZXJ2YWwpO1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0gZWxzZSByZXNvbHZlKHRydWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFjdGlvbkFwcGxpY2F0b3IgPSBhc3luYyAoYWN0aW9ucykgPT4ge1xuICAgIGlmIChhd2FpdCB3YWl0Rm9ySlF1ZXJ5KCkpIHtcbiAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGFjdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGFjdGlvbi5jb25kaXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGVsaWdpYmxlRWxlbWVudHMgPSBhd2FpdCBjaGVja0FjdGlvbkNvbmRpdGlvbihhY3Rpb24uY29uZGl0aW9uKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGlnaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbiwgZWxlbWVudCk7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHJlc3VsdCA9IGF3YWl0IHRyYW5zZm9ybWVyKGFjdGlvbik7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci5mYWlsZWQoYENvdWxkbid0IGFwcGx5IGFjdGlvbiAke0pTT04uc3RyaW5naWZ5KGFjdGlvbil9IHdpdGggZXJyb3IgJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJKcXVlcnkgbm90IGZvdW5kIG9uIHdpbmRvd1wiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQXBwbHkgYWN0aW9uc1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBhY3Rpb25BcHBsaWNhdG9yKGFjdGlvbnMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGRlZmF1bHQgYXBwbHlBY3Rpb25zO1xuIiwiaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgYXBwbHlBY3Rpb25zIGZyb20gXCIuLi9CZWFnbGVBcHBseUFjdGlvbnMvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGFkZFRyZWF0bWVudCxcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkRGF0YUxpc3RlbmVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBUUkVBVE1FTlRfUkFUSU8sXG4gIE1PQklMRV9NRURJQV9RVUVSWSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgZGV0ZXJtaW5lUGN0LFxuICBwcmVwYXJlQWN0aW9ucyxcbn0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoXCJCZWFnbGVSb2JvdEVuZ2luZVwiKTtcbmNvbnN0IE9CU0VSVkVSX0NPTkZJRyA9IHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2JvdEVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICBjb25zdCB7ZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsIGRlYnVnTW9kZSwgbWF0Y2hlZFRyZWF0bWVudHMsIGlkZW50aWZpZXIsIHBhZ2VUeXBlfSA9IGJvZHk7XG4gICAgdGhpcy5lbmdhZ2VtZW50TG9jayA9IHt9O1xuICAgIHRoaXMucGFnZVR5cGUgPSBwYWdlVHlwZTtcbiAgICB0aGlzLmRlYnVnTW9kZSA9IGRlYnVnTW9kZTtcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xuICAgIHRoaXMucmVBcHBseVRyZWF0bWVudHNNYXAgPSB7fTtcbiAgICB0aGlzLmFkZGVkRGF0YUxpc3RlbmVySWRzID0gW107XG4gICAgdGhpcy5tYXRjaGVkVHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzO1xuICAgIHRoaXMuZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cztcbiAgICB0aGlzLmlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoTU9CSUxFX01FRElBX1FVRVJZKS5tYXRjaGVzO1xuICB9XG5cbiAgYXN5bmMgZW5nYWdlUm9ib3RzKCkge1xuICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHRoaXMubWF0Y2hlZFRyZWF0bWVudHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZmFpbGVkKGBFcnJvciBlbmdhZ2luZyByb2JvdCAke3RyZWF0bWVudC5pZH06ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmluaXRpYXRlUmVhcHBseVJvYm90TWFwKCk7XG4gIH1cblxuICBhc3luYyBlbmdhZ2VSb2JvdCh0cmVhdG1lbnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGFjdGlvbnMsXG4gICAgICBlbGlnaWJpbGl0eVJ1bGVTZXQsXG4gICAgICBkZXZpY2UsXG4gICAgICBkZXBlbmRhbnRfb25fdHJlYXRtZW50LFxuICAgICAgcmVhcHBseV9ldmVudCxcbiAgICAgIHJlYXBwbHlfZXZlbnRfcGFnZV90eXBlLFxuICAgICAgYnVzaW5lc3NSdWxlU2V0LFxuICAgICAgd2VpZ2h0LFxuICAgICAgZGVsYXksXG4gICAgfSA9IHRyZWF0bWVudDtcbiAgICBjb25zdCB7XG4gICAgICBkZWJ1Z01vZGUsXG4gICAgICBkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyxcbiAgICAgIGVuZ2FnZW1lbnRMb2NrLFxuICAgICAgaWRlbnRpZmllcixcbiAgICAgIGlzTW9iaWxlLFxuICAgICAgcmVBcHBseVRyZWF0bWVudHNNYXAsXG4gICAgICBtYXRjaGVkVHJlYXRtZW50cyxcbiAgICAgIHBhZ2VUeXBlLFxuICAgICAgcHJlcGFyZUFuZEFwcGx5LFxuICAgIH0gPSB0aGlzO1xuXG4gICAgLy8gb25lIGVuZ2FnZW1lbnQgYXQgYSB0aW1lXG4gICAgaWYgKGVuZ2FnZW1lbnRMb2NrW2lkXSkge1xuICAgICAgbG9nZ2VyLmxvZyhgVHJlYXRtZW50ICR7aWR9IGVuZ2FnZW1lbnQgaW4gcHJvZ3Jlc3MsIHNraXBwaW5nYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IHRydWU7XG5cbiAgICBpZiAoZGVidWdNb2RlICE9PSAxICYmICF3ZWlnaHQgJiYgIWRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGVidWdNb2RlICYmIGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzICYmICFkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGV2aWNlID09PSBcIm1vYmlsZVwiICYmICFpc01vYmlsZSkge1xuICAgICAgbG9nZ2VyLmZhaWxlZChcIlRyZWF0bWVudCBkZXZpY2UgJ21vYmlsZScgbWlzbWF0Y2hcIik7XG4gICAgICBlbmdhZ2VtZW50TG9ja1tpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRldmljZSA9PT0gXCJkZXNrdG9wXCIgJiYgaXNNb2JpbGUpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoXCJUcmVhdG1lbnQgZGV2aWNlICdkZXNrdG9wJyBtaXNtYXRjaFwiKTtcbiAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVhcHBseV9ldmVudCkge1xuICAgICAgaWYgKCFyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSB8fCByZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSA9PT0gcGFnZVR5cGUpIHtcbiAgICAgICAgbGV0IHJlYXBwbHlfZXZlbnRfYXJyYXkgPSByZWFwcGx5X2V2ZW50O1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVhcHBseV9ldmVudCkpIHJlYXBwbHlfZXZlbnRfYXJyYXkgPSBbcmVhcHBseV9ldmVudF07XG4gICAgICAgIGxvZ2dlci5sb2coYFJlYXBwbHkgZXZlbnQgJyR7cmVhcHBseV9ldmVudH0nIGZvdW5kIGZvciB0cmVhdG1lbnQ6ICR7aWR9YCk7XG4gICAgICAgIGZvciAoY29uc3QgcmVhcHBseUV2ZW50IG9mIHJlYXBwbHlfZXZlbnRfYXJyYXkpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcmVBcHBseVRyZWF0bWVudHNNYXBbcmVhcHBseUV2ZW50XSA/XG4gICAgICAgICAgICByZUFwcGx5VHJlYXRtZW50c01hcFtyZWFwcGx5RXZlbnRdIDogW107XG4gICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiVHJlYXRtZW50IGFscmVhZHkgYWRkZWQgZm9yIHJlYXBwbHkgZXZlbnRcIik7XG4gICAgICAgICAgfSBlbHNlIHJlQXBwbHlUcmVhdG1lbnRzTWFwW3JlYXBwbHlFdmVudF0gPSBbLi4ucHJldmlvdXNWYWx1ZSwgaWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhcIlN0YXJ0aW5nIGJhc2UgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVTZXQgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQpKSB7XG4gICAgICBsZXQgdHJlYXRtZW50U2tpcFJhdGlvID0gd2VpZ2h0ID09PSAxMDAgPyAwIDogKDEwMCAtIHdlaWdodCB8fCBUUkVBVE1FTlRfUkFUSU8pO1xuICAgICAgaWYgKGRlcGVuZGFudF9vbl90cmVhdG1lbnQpIHtcbiAgICAgICAgLy8gSWYgZGVwZW5kYW50IG9uIHRyZWF0bWVudCBpcyBmb3VuZCBhbmQgaGFzIHdlaWdodDsgdXNlIGl0cyBza2lwIHJhdGlvXG4gICAgICAgIGNvbnN0IGRlcGVuZGFudE9uVHJlYXRtZW50V2VpZ2h0ID0gbWF0Y2hlZFRyZWF0bWVudHMuZmluZCgodCkgPT4gdC5pZCA9PT0gZGVwZW5kYW50X29uX3RyZWF0bWVudCk/LndlaWdodDtcbiAgICAgICAgdHJlYXRtZW50U2tpcFJhdGlvID0gZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQgPT09IDEwMCA/IDAgOiAoMTAwIC0gZGVwZW5kYW50T25UcmVhdG1lbnRXZWlnaHQgfHxcbiAgICAgICAgICBUUkVBVE1FTlRfUkFUSU8pO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudCBza2lwIHJhdGlvOiBcIiArIHRyZWF0bWVudFNraXBSYXRpbyk7XG4gICAgICAvLyBEZXRlcm1pbmluZyBpZGVudGlmaWVyIGZvciBjYWxjdWxhdGluZyB0cmVhdG1lbnQgcGVyY2VudGFnZSAodHJlYXRtZW50UGN0KVxuICAgICAgY29uc3QgZGV0ZXJtaW5pbmdJZGVudGlmaWVyID0gZGVwZW5kYW50X29uX3RyZWF0bWVudCB8fCBpZDtcblxuICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIHRoZSBwZXJjZW50YWdlIHZhbHVlIGZvciB0aGUgdHJlYXRtZW50IHVzZWQgdG8gZGV0ZXJtaW5lIGlmIGl0IHNob3VsZCBiZSBza2lwcGVkIG9yIG5vdFxuICAgICAgLy8gdHJlYXRtZW50UGN0IGlzIDEwMCB3aGVuIGRlYnVnIG1vZGUgaXMgMSwgZW5zdXJpbmcgbm8gdHJlYXRtZW50cyBhcmUgc2tpcHBlZFxuICAgICAgY29uc3QgdHJlYXRtZW50UGN0ID0gZGVidWdNb2RlID09PSAxID8gMTAwIDogYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIgKyBkZXRlcm1pbmluZ0lkZW50aWZpZXIpO1xuICAgICAgbG9nZ2VyLmxvZyhcIlRyZWF0bWVudFBjdDogXCIgKyB0cmVhdG1lbnRQY3QgKyBgIHdpdGggZGVidWcgbW9kZSAke2RlYnVnTW9kZSA/IFwib25cIiA6IFwib2ZmXCJ9YCk7XG4gICAgICBsZXQgYnVzaW5lc3NSdWxlSWQgPSBudWxsO1xuICAgICAgaWYgKGJ1c2luZXNzUnVsZVNldCkge1xuICAgICAgICBsb2dnZXIubG9nKFwiU3RhcnRpbmcgc3ViIHZhcmlhbnQgcnVsZSBzZXQgY2hlY2sgZm9yIHRyZWF0bWVudDogXCIgKyBpZCk7XG4gICAgICAgIGJ1c2luZXNzUnVsZUlkID0gYXdhaXQgdGhpcy5jaGVja0J1c2luZXNzUnVsZXMoYnVzaW5lc3NSdWxlU2V0KTtcbiAgICAgICAgaWYgKGJ1c2luZXNzUnVsZUlkICE9PSBudWxsKSB7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkFwcGx5aW5nIGJ1c2luZXNzIHJ1bGUgdHJhbnNmb3JtYXRpb24gd2l0aCBpZDogXCIsIGJ1c2luZXNzUnVsZUlkKTtcbiAgICAgICAgfSBlbHNlIGxvZ2dlci5sb2coXCJBcHBseWluZyB0cmVhdG1lbnQgd2l0aCBkZWZhdWx0IHZhbHVlc1wiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmVhdG1lbnRQY3QgPCB0cmVhdG1lbnRTa2lwUmF0aW8pIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgVHJlYXRtZW50ICR7aWR9IHNraXBwZWQgZHVlIHRvIHRyZWF0bWVudCBzcGxpdCByYXRpb2ApO1xuICAgICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCBudWxsLCBcInNraXBwZWRcIiwgZGVwZW5kYW50X29uX3RyZWF0bWVudCk7XG4gICAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgIGF3YWl0IHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSk7XG4gICAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBwcmVwYXJlQW5kQXBwbHkoaWQsIGlkZW50aWZpZXIsIGFjdGlvbnMsIGJ1c2luZXNzUnVsZUlkLCBkZWJ1Z01vZGUpO1xuICAgICAgICAgIGVuZ2FnZW1lbnRMb2NrW2lkXSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuYWRkUnVsZVNldERhdGFMaXN0ZW5lcnModHJlYXRtZW50KTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmFpbGVkKFwiUnVsZSBjaGVjayBmYWlsZWQgZm9yIHRyZWF0bWVudDpcIiwgaWQpO1xuICAgICAgZW5nYWdlbWVudExvY2tbdHJlYXRtZW50LmlkXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHByZXBhcmVBbmRBcHBseShpZCwgaWRlbnRpZmllciwgYWN0aW9ucywgYnVzaW5lc3NSdWxlSWQsIGRlYnVnTW9kZSkge1xuICAgIGNvbnN0IFtwcmVwYXJlZCwgdmFyaWFudF0gPSBhd2FpdCBwcmVwYXJlQWN0aW9ucyhpZGVudGlmaWVyLCBhY3Rpb25zLCBidXNpbmVzc1J1bGVJZCwgZGVidWdNb2RlKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcHBseUFjdGlvbnMocHJlcGFyZWQpO1xuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICBhZGRUcmVhdG1lbnQoaWQsIGJ1c2luZXNzUnVsZUlkLCB2YXJpYW50LCBcImZhaWxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkVHJlYXRtZW50KGlkLCBidXNpbmVzc1J1bGVJZCwgdmFyaWFudCwgXCJhcHBsaWVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYXRlUmVhcHBseVJvYm90TWFwKCkge1xuICAgIGNvbnN0IHtyZUFwcGx5VHJlYXRtZW50c01hcCwgbWF0Y2hlZFRyZWF0bWVudHN9ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZUFwcGx5VHJlYXRtZW50c01hcCkpIHtcbiAgICAgIGNvbnN0IHRyZWF0bWVudElkcyA9IHJlQXBwbHlUcmVhdG1lbnRzTWFwW2tleV07XG4gICAgICBjb25zdCByZUFwcGx5VHJlYXRtZW50cyA9IG1hdGNoZWRUcmVhdG1lbnRzLmZpbHRlcigodCkgPT4gdHJlYXRtZW50SWRzLmluY2x1ZGVzKHQuaWQpKTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJpbmZpbml0ZV9zY3JvbGxcIjoge1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSBpbmZpbml0ZV9zY3JvbGxgKTtcbiAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUod2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0aW1lb3V0XCI6IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHJlYXRtZW50IG9mIHJlQXBwbHlUcmVhdG1lbnRzKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJldHJ5aW5nIHRyZWF0bWVudCAke3RyZWF0bWVudC5pZH0gZnJvbSB0aW1lb3V0YCk7XG4gICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbGVtZW50X2NoYW5nZVwiOiB7XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlTZWxlY3Rvckxpc3QgPSBBcnJheS5pc0FycmF5KHRyZWF0bWVudC5yZWFwcGx5X3NlbGVjdG9yKSA/XG4gICAgICAgICAgICAgICAgdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3IgOiBbdHJlYXRtZW50LnJlYXBwbHlfc2VsZWN0b3JdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiByZWFwcGx5U2VsZWN0b3JMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB3aW5kb3cudG9wLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGVsZW1lbnRfY2hhbmdlYCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVuZ2FnZVJvYm90KHRyZWF0bWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCBPQlNFUlZFUl9DT05GSUcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvbl9zY3JvbGxcIjoge1xuICAgICAgICAgIC8vIGFkZCB3aW5kb3cgc2Nyb2xsIGxpc3RlbmVyLCBjYWxsIGVuZ2FnZVJvYm90IG9uIHNjcm9sbCwgZG8gbm90IHRyaWdnZXIgbW9yZSB0aGFuIG9uY2UgcGVyIDI1MG1zXG4gICAgICAgICAgbGV0IGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgICAgICAgIGxldCBsYXN0U2Nyb2xsVGltZSA9IDA7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cudG9wLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICBpZiAobm93IC0gbGFzdFNjcm9sbFRpbWUgPiAyNTAgJiYgTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA+IDUpIHtcbiAgICAgICAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgICAgICAgICAgICBsYXN0U2Nyb2xsVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gb25fc2Nyb2xsYCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJxdWVyeV9zZWFyY2hfY2hhbmdlXCI6IHtcbiAgICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggIT09IHF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXRyeWluZyB0cmVhdG1lbnQgJHt0cmVhdG1lbnQuaWR9IGZyb20gcXVlcnlfc2VhcmNoX2NoYW5nZWApO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5nYWdlUm9ib3QodHJlYXRtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIE9CU0VSVkVSX0NPTkZJRyk7XG4gICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImludGVydmFsXCI6XG4gICAgICAgICAgZm9yIChjb25zdCB0cmVhdG1lbnQgb2YgcmVBcHBseVRyZWF0bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlYXBwbHlJbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIsIHRydWUpO1xuICAgICAgICAgICAgICBpZiAoYXBwbGllZD8uW3RyZWF0bWVudC5pZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlYXBwbHlJbnRlcnZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmV0cnlpbmcgdHJlYXRtZW50ICR7dHJlYXRtZW50LmlkfSBmcm9tIGludGVydmFsYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5lbmdhZ2VSb2JvdCh0cmVhdG1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWFwcGx5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSwgMjUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb19sYXllcl9jaGFuZ2VcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHRyZWF0bWVudCBvZiByZUFwcGx5VHJlYXRtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICAgICAgICAgIGFkZERhdGFMaXN0ZW5lcih0cmVhdG1lbnQucmVhcHBseV9zZWxlY3RvciwgYm91bmRFbmdhZ2VUcmVhdG1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2dnZXIuZmFpbGVkKFwiUmVhcHBseSBldmVudCBub3QgZm91bmQ6IFwiLCBrZXkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZFJ1bGVTZXREYXRhTGlzdGVuZXJzKHRyZWF0bWVudCkge1xuICAgIGNvbnN0IHtlbGlnaWJpbGl0eVJ1bGVTZXQgPSBbXSwgYnVzaW5lc3NSdWxlU2V0ID0gW10sIGlkfSA9IHRyZWF0bWVudDtcbiAgICBpZiAodGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5pbmNsdWRlcyhpZCkpIHJldHVybjtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLmV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMoWy4uLmVsaWdpYmlsaXR5UnVsZVNldCwgLi4uYnVzaW5lc3NSdWxlU2V0XSk7XG4gICAgY29uc3QgYm91bmRFbmdhZ2VUcmVhdG1lbnQgPSB0aGlzLmVuZ2FnZVJvYm90LmJpbmQodGhpcywgdHJlYXRtZW50KTtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgYWRkRGF0YUxpc3RlbmVyKGBfX2VSdWxlcy4ke3NlbGVjdG9yfWAsIGJvdW5kRW5nYWdlVHJlYXRtZW50KTtcbiAgICB9XG4gICAgdGhpcy5hZGRlZERhdGFMaXN0ZW5lcklkcy5wdXNoKGlkKTtcbiAgfVxuXG4gIGV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMocnVsZVNldCwgcHJldmlvdXNTZWxlY3RvcnMgPSBudWxsKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gcHJldmlvdXNTZWxlY3RvcnMgfHwgW107XG4gICAgZm9yIChsZXQgcnVsZSBvZiBydWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKHJ1bGUuc3RhcnRzV2l0aChcIiFcIikpIHJ1bGUgPSBydWxlLnNsaWNlKDEpO1xuICAgICAgICBzZWxlY3RvcnMucHVzaChydWxlLnNwbGl0KFwiLlwiKVswXSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5leHRyYWN0RGF0YUxpc3RlbmVyU2VsZWN0b3JzKHJ1bGUuc2V0LCBzZWxlY3RvcnMpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLihuZXcgU2V0KHNlbGVjdG9ycykpXTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKSB7XG4gICAgbG9nZ2VyLmxvZyhgQ2hlY2tpbmcgZWxpZ2liaWxpdHkgJHtlbGlnaWJpbGl0eVJ1bGV9YCk7XG4gICAgbGV0IG9wcG9zaXRlRmxhZyA9IGZhbHNlO1xuICAgIGxldCBbZWxpZ2liaWxpdHlTY29wZSwgZWxpZ2liaWxpdHlOYW1lXSA9IGVsaWdpYmlsaXR5UnVsZS5zcGxpdChcIi5cIik7XG4gICAgaWYgKGVsaWdpYmlsaXR5U2NvcGUuc3RhcnRzV2l0aChcIiFcIikpIHtcbiAgICAgIG9wcG9zaXRlRmxhZyA9IHRydWU7XG4gICAgICBlbGlnaWJpbGl0eVNjb3BlID0gZWxpZ2liaWxpdHlTY29wZS5zbGljZSgxKTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihgX19lUnVsZXMuJHtlbGlnaWJpbGl0eVNjb3BlfWApO1xuICAgIGlmICghcmVzIHx8ICFBcnJheS5pc0FycmF5KHJlcykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAob3Bwb3NpdGVGbGFnICYmIHJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFvcHBvc2l0ZUZsYWcgJiYgIXJlcy5pbmNsdWRlcyhlbGlnaWJpbGl0eU5hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgbG9nZ2VyLmxvZyhgJHtlbGlnaWJpbGl0eVJ1bGV9IGlzIGVsaWdpYmxlYCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGVTZXQsIGVsaWdpYmlsaXR5U2V0VHlwZSA9IG51bGwsIHByZXZpb3VzSXNFbGlnaWJsZSA9IG51bGwpIHtcbiAgICBsb2dnZXIubG9nKFwiQ2hlY2tpbmcgcm9ib3QgZWxpZ2liaWxpdHlcIik7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVsaWdpYmlsaXR5UnVsZVNldCkpIHtcbiAgICAgIGxvZ2dlci5mYWlsZWQoYEVsaWdpYmlsaXR5IFJ1bGUgU2V0ICR7ZWxpZ2liaWxpdHlSdWxlU2V0fSBpcyBub3QgYW4gYXJyYXlgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGlzRWxpZ2libGUgPSBwcmV2aW91c0lzRWxpZ2libGU7XG4gICAgZm9yIChjb25zdCBlbGlnaWJpbGl0eVJ1bGUgb2YgZWxpZ2liaWxpdHlSdWxlU2V0KSB7XG4gICAgICBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoIWVsaWdpYmlsaXR5U2V0VHlwZSkge1xuICAgICAgICAgIGlzRWxpZ2libGUgPSBhd2FpdCB0aGlzLmNoZWNrRWxpZ2liaWxpdHkoZWxpZ2liaWxpdHlSdWxlKTtcbiAgICAgICAgICBpZiAoIWlzRWxpZ2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGlnaWJpbGl0eVNldFR5cGUpIHtcbiAgICAgICAgICBpZiAoaXNFbGlnaWJsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoZWxpZ2liaWxpdHlTZXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGlzRWxpZ2libGUgfHwgYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5KGVsaWdpYmlsaXR5UnVsZSwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgIGlzRWxpZ2libGUgPSBpc0VsaWdpYmxlICYmIGF3YWl0IHRoaXMuY2hlY2tFbGlnaWJpbGl0eShlbGlnaWJpbGl0eVJ1bGUsIGVsaWdpYmlsaXR5U2V0VHlwZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmZhaWxlZChcIlVua25vd24gZWxpZ2liaWxpdHlTZXRUeXBlOiBcIiwgZWxpZ2liaWxpdHlTZXRUeXBlKTtcbiAgICAgICAgICAgICAgaXNFbGlnaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsaWdpYmlsaXR5UnVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpc0VsaWdpYmxlID0gYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChlbGlnaWJpbGl0eVJ1bGUuc2V0LCBlbGlnaWJpbGl0eVJ1bGUudHlwZSwgaXNFbGlnaWJsZSk7XG4gICAgICAgIGlmICghaXNFbGlnaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNFbGlnaWJsZTtcbiAgfVxuXG4gIC8vIFJldHVybiBpbmRleCBvZiBidXNpbmVzc1J1bGUsIHRoaXMgaXMgdGhlIGJ1c2luZXNzUnVsZUlkXG4gIGFzeW5jIGNoZWNrQnVzaW5lc3NSdWxlcyhidXNpbmVzc1J1bGVTZXQpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgYnVzaW5lc3NSdWxlXSBvZiBidXNpbmVzc1J1bGVTZXQuZW50cmllcygpKSB7XG4gICAgICBpZiAoYXdhaXQgdGhpcy5jaGVja0VsaWdpYmlsaXR5UnVsZVNldChbYnVzaW5lc3NSdWxlXSkpIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSBcIi4uL2xvZ2dlclwiO1xuaW1wb3J0IFRyZWF0bWVudFJlcG9zaXRvcnkgZnJvbSBcIi4uL0JlYWdsZVRyZWF0bWVudFJlcG9zaXRvcnkvaW5kZXhcIjtcbmltcG9ydCB7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyLFxuICBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyLFxufSBmcm9tIFwiLi4vQmVhZ2xlSW5mb0xheWVyXCI7XG5pbXBvcnQge1xuICBpbml0aWF0ZVNlc3Npb25TdG9yYWdlcyxcbiAgaW5qZWN0U3R5bGVTaGVldCxcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBSb2JvdEVuZ2luZSBmcm9tIFwiLi9yb2JvdEVuZ2luZVwiO1xuaW1wb3J0IFJ1bGVFbmdpbmUgZnJvbSBcIi4uL0JlYWdsZVJ1bGVFbmdpbmVcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi4vR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeS9zdG9yZVwiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKFwiQmVhZ2xlT25Db21wb25lbnRcIik7XG5cbmNvbnN0IGJlYWdsZU9uID0gYXN5bmMgKGlkZW50aWZpZXIsIGRlYnVnTW9kZSwgcGFnZVR5cGUpID0+IHtcbiAgY29uc3QgcGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSA9IFN0b3JlLmdldEluc3RhbmNlKCkucGVyc2lzdFByb2R1Y3RJbmZvKCk7XG5cbiAgY29uc3QgZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UgPSBhc3Nlc0VsaWdpYmlsaXR5UnVsZXMoKTtcbiAgY29uc3QgdHJlYXRtZW50c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudHMoKTtcbiAgY29uc3QgdHJlYXRtZW50V2VpZ2h0c1Byb21pc2UgPSBUcmVhdG1lbnRSZXBvc2l0b3J5LmdldFRyZWF0bWVudFdlaWdodHMoKTtcblxuICBpbmplY3RTdHlsZVNoZWV0KCk7XG4gIGluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcIm9uLWluaXRcIik7XG5cbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgbGV0IGRlYnVnRmlsdGVyZWRUcmVhdG1lbnRzID0gbnVsbDtcbiAgaWYgKGRlYnVnTW9kZSAmJiBzZWFyY2hQYXJhbXMuaW5jbHVkZXMoXCJmaWx0ZXI9XCIpKSB7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMgPSBzZWFyY2hQYXJhbXMuc2xpY2UoXG4gICAgICAgIHNlYXJjaFBhcmFtcy5pbmRleE9mKFwiW1wiKSArIDEsXG4gICAgICAgIHNlYXJjaFBhcmFtcy5sYXN0SW5kZXhPZihcIl1cIiksXG4gICAgKS5zcGxpdChcIixcIikubWFwKChpdGVtKSA9PiBwYXJzZUludChpdGVtLCAxMCkpO1xuICB9XG5cbiAgY29uc3QgW3RyZWF0bWVudHMsIHRyZWF0bWVudFdlaWdodHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIHRyZWF0bWVudHNQcm9taXNlLCB0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSxcbiAgXSk7XG5cbiAgaWYgKCF0cmVhdG1lbnRzIHx8ICF0cmVhdG1lbnRXZWlnaHRzKSB7XG4gICAgbGV0IG0gPSBcIlwiO1xuICAgIGlmICghdHJlYXRtZW50cykgbSA9IG0gKyBcIm5vLXJvYm90c1wiO1xuICAgIGlmICghdHJlYXRtZW50V2VpZ2h0cykgbSA9IG0gPT09IFwiXCIgPyBcIm5vLXJvYm90LXdlaWdodHNcIiA6IFwiIC0gbm8tcm9ib3Qtd2VpZ2h0c1wiO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBtKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggdHJlYXRtZW50cy93ZWlnaHRzXCIpO1xuICB9XG4gIGxvZ2dlci5zdWNjZXNzKFwiRm91bmQgdHJlYXRtZW50czogXCIsIHRyZWF0bWVudHMpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJmZXRjaGVkLXRyZWF0bWVudHNcIik7XG5cbiAgY29uc3QgdHJlYXRtZW50UmVwb3NpdG9yeSA9IG5ldyBUcmVhdG1lbnRSZXBvc2l0b3J5KHtcbiAgICB0cmVhdG1lbnRzLFxuICAgIHRyZWF0bWVudFdlaWdodHMsXG4gIH0pO1xuXG4gIGNvbnN0IG1hdGNoZWRUcmVhdG1lbnRzID0gYXdhaXQgdHJlYXRtZW50UmVwb3NpdG9yeS5nZXRNYXRjaGVkVHJlYXRtZW50cygpO1xuICBpZiAobWF0Y2hlZFRyZWF0bWVudHMgPT09IG51bGwpIHtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJuby11c2VyLXNlZ21lbnRcIik7XG4gICAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghbWF0Y2hlZFRyZWF0bWVudHMubGVuZ3RoKSB7XG4gICAgbG9nZ2VyLmxvZyhcIk5vIHRyZWF0bWVudHMgbWF0Y2hlZCwgcmV0dXJuaW5nIHdpdGhvdXQgZnVydGhlciBhY3Rpb25cIik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwibm8tcm9ib3QtbWF0Y2hlZFwiKTtcbiAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZm91bmQtbWF0Y2hlZC1yb2JvdHNcIik7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwibm8tcnVsZXMtYXNzZXNzZWRcIik7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGFzc2VzIGVsaWdpYmlsaXR5IHJ1bGVzXCIpO1xuICB9XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInJ1bGVzLWFzc2Vzc2VkXCIpO1xuICB0cnkge1xuICAgIGF3YWl0IHBlcnNpc3RQcm9kdWN0SW5mb1Byb21pc2U7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInByb2R1Y3QtaW50by1uby1wZXJzaXN0XCIpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBwZXJzaXN0IHByb2R1Y3QgaW5mb1wiKTtcbiAgfVxuXG4gIC8vIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgLy8gICBlbGlnaWJpbGl0eVJ1bGVzQXNzZXNzUHJvbWlzZSwgcGVyc2lzdFByb2R1Y3RJbmZvUHJvbWlzZSxcbiAgLy8gXSk7XG5cbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZW5nYWdpbmctcm9ib3RzXCIpO1xuICBjb25zdCByb2JvdEVuZ2luZSA9IG5ldyBSb2JvdEVuZ2luZSh7XG4gICAgZGVidWdGaWx0ZXJlZFRyZWF0bWVudHMsXG4gICAgZGVidWdNb2RlLFxuICAgIG1hdGNoZWRUcmVhdG1lbnRzLFxuICAgIGlkZW50aWZpZXIsXG4gICAgcGFnZVR5cGUsXG4gIH0pO1xuICBhd2FpdCByb2JvdEVuZ2luZS5lbmdhZ2VSb2JvdHMoKTtcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlKCk7XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcInJvYm90cy1lbmdhZ2VkXCIpO1xuICBsb2dnZXIuc3VjY2VzcyhcIkFwcGxpZWQgdHJlYXRtZW50czogXCIsIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJhXCIpKTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGFzc2VzRWxpZ2liaWxpdHlSdWxlcygpIHtcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJtXCIsIFwiZmV0Y2hpbmctZWxpZ2liaWxpdHktcnVsZXNcIik7XG4gIGNvbnN0IGVsaWdpYmlsaXR5UnVsZXMgPSBhd2FpdCBSdWxlRW5naW5lLmdldEVsaWdpYmlsaXR5UnVsZXMoKTtcbiAgaWYgKCFlbGlnaWJpbGl0eVJ1bGVzKSByZXR1cm47XG4gIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwibVwiLCBcImZldGNoZWQtZWxpZ2liaWxpdHktcnVsZXNcIik7XG4gIGNvbnN0IHJ1bGVFbmdpbmUgPSBuZXcgUnVsZUVuZ2luZSh7ZWxpZ2liaWxpdHlSdWxlc30pO1xuICBhd2FpdCBydWxlRW5naW5lLmFzc2VzRWxpZ2liaWxpdHlSdWxlcygpO1xuICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgXCJhc3Nlc3NlZC1lbGlnaWJpbGl0eS1ydWxlc1wiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGJlYWdsZU9uO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi4vbG9nZ2VyXCI7XG5pbXBvcnQgTW9uaXRvciBmcm9tIFwiLi4vQmVhZ2xlTW9uaXRvci9pbmRleFwiO1xuaW1wb3J0IGJlYWdsZU9uIGZyb20gXCIuLi9CZWFnbGVPblwiO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcixcbiAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIsXG4gIGluaXRpYWxpemVCZWFnbGVJbmZvTGF5ZXIsXG59IGZyb20gXCIuLi9CZWFnbGVJbmZvTGF5ZXJcIjtcbmltcG9ydCB7XG4gIFNQTElUX1JBVElPLFxuICBTRVNTSU9OX1NUT1JBR0VfS0VZUyxcbiAgTE9DQUxfU1RPUkFHRV9LRVlTLFxuICBNQVhfVElNRU9VVF9QRVJfU0VTU0lPTixcbiAgVkVSU0lPTixcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0SWRlbnRpZmllcixcbiAgcmVtb3ZlRG9jdW1lbnRIaWRlLFxuICBkZXRlcm1pbmVQY3QsXG4gIGdldERlYnVnTW9kZSxcbiAgc3dpdGNoVG9FYXNlT3V0LFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcblxubGV0IFNIVVRET1dOID0gZmFsc2U7XG5cbihhc3luYyBmdW5jdGlvbigpIHtcbiAgY29uc29sZS50aW1lKFwiZ2wtc3RhcnRcIik7XG4gIHN3aXRjaFRvRWFzZU91dCgpO1xuICBsZXQgbW9uaXRvciA9IG51bGw7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgaW5pdGlhbGl6aW5nXCIpO1xuICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcblxuICBsZXQgZWFybHlMb2dTZW50ID0gZmFsc2U7XG4gIGxldCBoaWRlUmVtb3ZlZCA9IGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBJTklUIFRBU0tTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuICAgIGNvbnNvbGUudGltZShcImdsLWluaXQtdGFza3NcIik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIFwibm90LXNlbnQgfCBpbml0aWFsaXppbmdcIik7XG4gICAgbW9uaXRvciA9IG5ldyBNb25pdG9yKCk7XG4gICAgaW5pdGlhbGl6ZUJlYWdsZUluZm9MYXllcigpO1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBhd2FpdCBnZXRJZGVudGlmaWVyKCk7XG4gICAgbG9nZ2VyLmxvZyhcIkZvdW5kIGlkZW50aWZpZXI6IFwiLCBpZGVudGlmaWVyKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImNvb2tpZUdhSWRcIiwgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29va2llUGN0ID0gYXdhaXQgZGV0ZXJtaW5lUGN0KGlkZW50aWZpZXIpO1xuICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwib25IYXNoUGN0XCIsIGNvb2tpZVBjdCk7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJ2aWV3X2Vwb2NoXCIsIERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcInZcIiwgVkVSU0lPTik7XG4gICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJzclwiLCBTUExJVF9SQVRJTyk7XG5cbiAgICAvLyBkYXRhLWxlc3MgbG9nIHRvIGRldGVjdCBib3VuY2VzXG4gICAgYXdhaXQgbW9uaXRvci5wYWNrQW5kUXVldWVBcnJpdmFsTG9nKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICB9LCAyMDAwKTtcbiAgICBjb25zb2xlLnRpbWVFbmQoXCJnbC1pbml0LXRhc2tzXCIpO1xuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBFQVJMWSBQUlVORSBPVVQtT0YtU0NPUEUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBjb25zb2xlLnRpbWUoXCJnbC1lYXJseS1wcnVuZVwiKTtcblxuICAgIGNvbnN0IG9vc1JlYXNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWVMuT1VUX09GX1NDT1BFKTtcblxuICAgIC8vIGlmIGNhbm5vdCBnZXQgY3JpdGljYWwgaW5mbywgbWFrZSBvdXQgb2Ygc2NvcGUgYW5kIHVuc3VwcG9ydGVkXG4gICAgaWYgKFxuICAgICAgY29va2llUGN0ID09PSBudWxsIHx8XG4gICAgICAhbmF2aWdhdG9yLnNlbmRCZWFjb24gfHxcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3Iuc2VuZEJlYWNvbiAhPT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICB0eXBlb2YgU3RyaW5nPy5wcm90b3R5cGU/LnBhZFN0YXJ0ICE9PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgIChvb3NSZWFzb24gJiYgb29zUmVhc29uID09PSBcInVuc3VwcG9ydGVkXCIpXG4gICAgKSB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ1bnN1cHBvcnRlZFwifSk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLk9VVF9PRl9TQ09QRSwgXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcInVuc3VwcG9ydGVkIHwgZGV2aWNlXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWQtZGV2aWNlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTGFiZWxTZW50ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19MQUJFTF9TRU5UKTtcbiAgICBjb25zdCB0aW1lb3V0Q291bnRlciA9IHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCkpIHx8IDA7XG5cbiAgICAvLyBjaGVjayBpZiBkZWJ1ZyBtb2RlIGlzIG9uLCBhbHNvIGFkZHMgZGJtIHRvIGJlYWdsZUluZm9MYXllciBhbmQgc2V0cyBvb3NSZWFzb25cbiAgICBjb25zdCBkZWJ1Z01vZGUgPSBnZXREZWJ1Z01vZGUoXCJlbXBsb3llZVwiKTtcblxuICAgIC8vIGlmIHRpbWVkLW91dCB0b28gbWFueSB0aW1lcyBmb3IgdmVyeSBmaXJzdCBpbnRlcmFjdHNpb25zLCBtYWtlIG91dCBvZiBzY29wZSBmb3IgdGhlIHNlc3Npb25cbiAgICBpZiAoIWRlYnVnTW9kZSAmJiAhb29zUmVhc29uICYmICFpc0xhYmVsU2VudCAmJiB0aW1lb3V0Q291bnRlciA+IE1BWF9USU1FT1VUX1BFUl9TRVNTSU9OXG4gICAgKSB7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ1bnN1cHBvcnRlZFwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJ1bnN1cHBvcnRlZCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtYXgtdGltZW91dFwiKTtcbiAgICB9XG4gICAgY29uc29sZS50aW1lRW5kKFwiZ2wtZWFybHktcHJ1bmVcIik7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBBRE1JTiBVU0VSIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4gICAgLy8gVE9ETzogcmVuYW1lIHNob3dyb29tIGxvZ2ljIHRvIGFkbWluLCBhbmQgbWFwIHZ2c0lzU2hvd3Jvb20gdG8gYSBjb25maWd1cmFibGUgYWRtaW4gcGFyYW1cblxuICAgIC8vIGlmIGFkbWluIHVzZXIsIG1ha2Ugb3V0IG9mIHNjb3BlIGFuZCBtYXJrIGFzIGVtcGxveWVlXG4gICAgY29uc29sZS50aW1lKFwiZ2wtYWRtaW4tdXNlci1jaGVja1wiKTtcbiAgICBjb25zdCBwcm9jZXNzQWRtaW5Vc2VyID0gKCkgPT4ge1xuICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtldmVudDogXCJHTE9WXCIsIEdMT1ZfT046IFwiZW1wbG95ZWVcIn0pO1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5PVVRfT0ZfU0NPUEUsIFwiZW1wbG95ZWVcIik7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0FETUlOLCB0cnVlKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgYWRtaW5cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhZG1pbi1lbXBsb3llZVwiKTtcbiAgICB9O1xuXG4gICAgbGV0IGlzQWRtaW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0FETUlOKTtcbiAgICAvLyBpZiBub3QgZm91bmQgaW4gbG9jYWxTdG9yYWdlLCBjaGVjayBiZWFnbGVJbmZvTGF5ZXIgd2l0aCBibG9ja2luZyBtZG9lXG4gICAgaWYgKGlzQWRtaW4gPT09IG51bGwgfHwgaXNBZG1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpc0FkbWluID0gYXdhaXQgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSk7XG4gICAgLy8gcGVybWFuZW50IGxhYmVsIGNhbiBiZSBmYWxzZSwgYnV0IGFkbWluIHVzZXIgY2FuIHN0aWxsIGxvZ2luIGFuZCB0dXJuIHRydWUsIGxhemlseSBmaXggdGhpc1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gXCJmYWxzZVwiIHx8IGlzQWRtaW4gPT09IGZhbHNlKSB7XG4gICAgICAvLyBhc3luYyBjYWxsIHRvIGdldEZyb21CZWFnbGVJbmZvTGF5ZXIsIHRoZW4gc2V0IGxvY2FsU3RvcmFnZVxuICAgICAgZ2V0RnJvbUJlYWdsZUluZm9MYXllcihcInZ2c0lzU2hvd3Jvb21cIiwgdHJ1ZSkudGhlbigoaXNBZG1pbikgPT4ge1xuICAgICAgICBpZiAoaXNBZG1pbiAmJiAoaXNBZG1pbiA9PT0gXCJ0cnVlXCIgfHwgaXNBZG1pbiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBwcm9jZXNzQWRtaW5Vc2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0FkbWluICYmIChpc0FkbWluID09PSBcInRydWVcIiB8fCBpc0FkbWluID09PSB0cnVlKSkge1xuICAgICAgcHJvY2Vzc0FkbWluVXNlcigpO1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbiA9PT0gbnVsbCB8fCBpc0FkbWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU0VTU0lPTl9TVE9SQUdFX0tFWVMuVElNRU9VVF9DT1VOVCwgdGltZW91dENvdW50ZXIgKyAxKTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcIm5vdC1zZW50IHwgdGltZW91dFwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vLWFkbWluLXN0YXR1c1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZUy5JU19BRE1JTiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnRvcC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2xvdi1lYXNlXCIpKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNFU1NJT05fU1RPUkFHRV9LRVlTLlRJTUVPVVRfQ09VTlQsIHRpbWVvdXRDb3VudGVyICsgMSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHRpbWVvdXRcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhbnRpLWZsaWNrZXItdGltZW91dFwiKTtcbiAgICB9XG4gICAgY29uc29sZS50aW1lRW5kKFwiZ2wtYWRtaW4tdXNlci1jaGVja1wiKTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gT04vT0ZGIENIRUNLID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICAvLyBpc09uIGNhbiBiZSB0cnVlIChPTiksIGZhbHNlIChPRkYpXG4gICAgY29uc29sZS50aW1lKFwiZ2wtb24tb2ZmLWNoZWNrXCIpO1xuXG4gICAgbGV0IGlzT24gPSBudWxsO1xuXG4gICAgaWYgKGRlYnVnTW9kZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIkRlYnVnIG1vZGUgb246IGFsbCBhcHBsaWNhYmxlIHRyZWF0bWVudHMgd2lsbCBiZSBhcHBsaWVkXCIpO1xuICAgICAgaXNPbiA9IHRydWU7XG4gICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJlbXBsb3llZVwifSk7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJlbXBsb3llZSB8IHRlc3RlclwiKTtcbiAgICB9IGVsc2UgaWYgKG9vc1JlYXNvbiAmJiBvb3NSZWFzb24gPT09IFwiZW1wbG95ZWVcIikge1xuICAgICAgbG9nZ2VyLndhcm4oXCJVc2VyIGlzIG91dCBvZiBzY29wZVwiKTtcbiAgICAgIC8vIHNldCBpc09uIHRvIHRydWUvZmFsc2Ugd2hlbiBub3QgZGVidWdNb2RlIGJ1dCBvdXQgb2Ygc2NvcGUgaS5lLiBuZF9kZWJ1Zz0wIGZvciB0ZXN0YWJpbGl0eVxuICAgICAgaXNPbiA9IGNvb2tpZVBjdCA+PSBTUExJVF9SQVRJTztcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ZXZlbnQ6IFwiR0xPVlwiLCBHTE9WX09OOiBcImVtcGxveWVlXCJ9KTtcbiAgICAgIGFkZFRvQmVhZ2xlSW5mb0xheWVyKFwiR0xPVl9PTlwiLCBcImVtcGxveWVlIHwgdGVzdGVyXCIpO1xuICAgIH0gZWxzZSBpZiAob29zUmVhc29uKSB7XG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIkdMT1ZfT05cIiwgXCJub3Qtc2VudCB8IHVua25vd25cIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG91dCBvZiBzY29wZSByZWFzb25cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGdyZWF0ZXIgdGhhbiBTUExJVF9SQVRJTywgdGhlbiBpbiBPTiBtb2RlXG4gICAgICBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPKSB7XG4gICAgICAgIGlzT24gPSB0cnVlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJ0cnVlXCJ9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29va2llUGN0ID49IFNQTElUX1JBVElPLzIpIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJmYWxzZTJcIn0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNPbiA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe2V2ZW50OiBcIkdMT1ZcIiwgR0xPVl9PTjogXCJmYWxzZTFcIn0pO1xuICAgICAgfVxuXG4gICAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcImlzT25cIiwgaXNPbik7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlTLklTX0xBQkVMX1NFTlQsIHRydWUpO1xuICAgICAgYWRkVG9CZWFnbGVJbmZvTGF5ZXIoXCJHTE9WX09OXCIsIGlzT24udG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGNvbnNvbGUudGltZUVuZChcImdsLW9uLW9mZi1jaGVja1wiKTtcblxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBFQVJMWS1QUk9DRVNTIENPTlZFUlNJT04gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbiAgICBjb25zb2xlLnRpbWUoXCJnbC1lYXJseS1wcm9jZXNzLWNvbnZlcnNpb25cIik7XG5cbiAgICAvLyBhd2FpdCBjcml0aWNhbCBpbmZvIGJlZm9yZSBzZW5kaW5nIGxvZ3MgZm9yIHByb3BlciBhbmFseXRpY3MgbWVhc3VyZW1lbnRzXG4gICAgY29uc3QgcGFnZVR5cGUgPSBhd2FpdCBnZXRGcm9tQmVhZ2xlSW5mb0xheWVyKFwiUGFnZVR5cGVcIiwgdHJ1ZSk7XG4gICAgaWYgKHBhZ2VUeXBlID09PSBcInB1cmNoYXNlXCIpIHtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5yZXZlbnVlXCIsIHRydWUsIDUwLCA1MDAwKTtcbiAgICAgIGF3YWl0IGdldEZyb21CZWFnbGVJbmZvTGF5ZXIoXCJwdXJjaGFzZS5wYXltZW50VHlwZVwiLCB0cnVlLCA1MCwgNTAwMCk7XG4gICAgICAvLyBzZW5kIGxvZ3MgaW1tZWRpYXRlbHkgb24gcHVyY2hhc2UgcGFnZSwgYW5kIGZvcmNlIHdhaXRcbiAgICAgIGF3YWl0IG1vbml0b3Iuc2VuZExvZ3ModHJ1ZSk7XG4gICAgICAvLyBpZiBwdXJjaGFzZSBpcyBjb21wbGV0ZSwgZG8gbm90IGFwcGx5IGFueSB0cmVhdG1lbnRzIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgU0hVVERPV04gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZW5kIGxvZ3Mgd2hlbiByZWFkeSwgc3RhcnQgc2NyYXBpbmcgYW5kIHNlbmRpbmcgYXN5bmNseVxuICAgICAgbW9uaXRvci5zZW5kTG9ncyhmYWxzZSk7XG4gICAgfVxuICAgIGVhcmx5TG9nU2VudCA9IHRydWU7XG5cbiAgICBjb25zb2xlLnRpbWVFbmQoXCJnbC1lYXJseS1wcm9jZXNzLWNvbnZlcnNpb25cIik7XG5cbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gUk9CT1QgUEFUSHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuICAgIGNvbnNvbGUudGltZShcImdsLXJvYm90LXBhdGhzXCIpO1xuXG4gICAgaWYgKGlzT24gPT09IHRydWUpIHtcbiAgICAgIGlmICghU0hVVERPV04pIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkJlYWdsZSBPTiBHcm91cCBQYXRoXCIpO1xuICAgICAgICBiZWFnbGVPbihpZGVudGlmaWVyLCBkZWJ1Z01vZGUsIHBhZ2VUeXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiQmVhZ2xlIE9OIEdyb3VwIFNIVVRET1dOIFBhdGhcIik7XG4gICAgICAgIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICAgICAgICBoaWRlUmVtb3ZlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc09uID09PSBmYWxzZSkge1xuICAgICAgbG9nZ2VyLmluZm8oXCJCZWFnbGUgT0ZGIEdyb3VwIFBhdGhcIik7XG4gICAgICByZW1vdmVEb2N1bWVudEhpZGUoKTtcbiAgICAgIGhpZGVSZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaXNPbiBpcyB1bmRlZmluZWQgb3IgbnVsbFwiKTtcbiAgICB9XG4gICAgY29uc29sZS50aW1lRW5kKFwiZ2wtcm9ib3QtcGF0aHNcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKFwiQmVhZ2xlIEVhcmx5IFNjb3BlLW91dCBvciBFUlJPUjogXCIsIGVyci5tZXNzYWdlKTtcbiAgICBhZGRUb0JlYWdsZUluZm9MYXllcihcIm1cIiwgZXJyLm1lc3NhZ2UpO1xuICAgIGlmICghZWFybHlMb2dTZW50ICYmIG1vbml0b3IpIG1vbml0b3Iuc2VuZExvZ3MoZmFsc2UpO1xuICAgIGlmICghaGlkZVJlbW92ZWQpIHJlbW92ZURvY3VtZW50SGlkZSgpO1xuICB9XG4gIGNvbnNvbGUudGltZUVuZChcImdsLXN0YXJ0XCIpO1xufSkoKTtcbiJdLCJuYW1lcyI6WyJyZXBsYWNlQWxsIiwic3RyIiwiZmluZCIsInJlcGxhY2UiLCJpbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJ0dXJraXNoVG9Mb3dlciIsInN0cmluZyIsImxldHRlcnMiLCJsZXR0ZXIiLCJ0b0xvd2VyQ2FzZSIsImlzU3RhZ2luZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluY2x1ZGVzIiwiVkVSU0lPTiIsIkNPT0tJRV9OQU1FIiwiVFJFQVRNRU5UU19MT0NBVElPTiIsIlRSRUFUTUVOVF9XRUlHSFRTX0xPQ0FUSU9OIiwiU1RZTEVTSEVFVF9MT0NBVElPTiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIkVfUlVMRVNfTE9DQVRJT04iLCJQUk9EVUNUX0lORk9fTE9DQVRJT04iLCJMT0dfQVBJX1VSTCIsIkxPT0tVUF9BUElfVVJMIiwiTU9CSUxFX01FRElBX1FVRVJZIiwiU1BMSVRfUkFUSU8iLCJUUkVBVE1FTlRfUkFUSU8iLCJUUkVBVE1FTlRTX0RVUkFUSU9OIiwiTUFYX1RJTUVPVVRfUEVSX1NFU1NJT04iLCJMSVNUX01PREVfQkVBR0xFX0tFWVMiLCJJRExFX1RJTUVPVVQiLCJTRVNTSU9OX1NUT1JBR0VfS0VZUyIsIlNFU1NJT05fVElNRVNUQU1QIiwiU0VTU0lPTl9ISVNUT1JZIiwiVFJFQVRNRU5UUyIsIlBPUFVQX0RJU1BMQVlfRkxBRyIsIlNLVV9JTkZPX0JBU0tFVCIsIlRJTUVPVVRfQ09VTlQiLCJTRVNTSU9OX1JFRkVSUkVSIiwiV0VJR0hUUyIsIkVMSUdJQklMSVRZX1JVTEVTIiwiTE9DQUxfU1RPUkFHRV9LRVlTIiwiREVCVUdfTU9ERSIsIk9VVF9PRl9TQ09QRSIsIklTX0xBQkVMX1NFTlQiLCJVU0VSX0lEIiwiREFUQV9DT0xMRUNUSU9OX0RBVEFfU0laRSIsIklTX0FETUlOIiwiQ1VTVE9NX1NUT1JBR0VfUFJFRklYIiwiTG9nZ2VyIiwib3JpZ2luIiwidGVzdGluZyIsIkRFQlVHIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFyZ3MiLCJjb25zb2xlIiwiaW5mbyIsImxvZyIsIm1lc3NhZ2VDb25maWciLCJmb3JFYWNoIiwiYXJndW1lbnQiLCJ0eXBlIiwid2FybiIsImVycm9yIiwiYWRkVG9CZWFnbGVJbmZvTGF5ZXIiLCJsb2dnZXIiLCJtb250aHMiLCJyZW1vdmVEb2N1bWVudEhpZGUiLCJ0b3AiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInN3aXRjaFRvRWFzZU91dCIsImVsIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwicHJlcGVuZCIsImFkZCIsImZldGNoVHJlYXRtZW50cyIsImZldGNoUGx1cyIsInRyZWF0bWVudHMiLCJFcnJvciIsImpzb24iLCJqc29uVHJlYXRtZW50IiwiZmFpbGVkIiwibWVzc2FnZSIsImZldGNoVHJlYXRtZW50V2VpZ2h0cyIsInRyZWF0bWVudFdlaWdodHMiLCJqc29uVHJlYXRtZW50V2VpZ2h0cyIsImZldGNoRWxpZ2liaWxpdHlSdWxlcyIsImVsaWdpYmlsaXR5UnVsZXMiLCJqc29uRWxpZ2liaWxpdHlSdWxlcyIsImZldGNoUHJvZHVjdEluZm8iLCJwcm9kdWN0SW5mbyIsInRleHQiLCJwcm9kdWN0SW5mb0NTViIsImNzdlRvQXJyYXkiLCJ0aW1lb3V0IiwidGltZSIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJzZXRUaW1lb3V0IiwiYWJvcnQiLCJ1cmwiLCJvcHRpb25zIiwicmV0cmllcyIsImZldGNoIiwic2lnbmFsIiwidGhlbiIsInJlcyIsIm9rIiwic3RhdHVzIiwiY2F0Y2giLCJleHRyYWN0Q29va2llSWRlbnRpZmllciIsImNvb2tpZVN0cmluZyIsImNvb2tpZU5hbWUiLCJwYXJzZWQiLCJzcGxpdCIsIm1hcCIsInYiLCJyZWR1Y2UiLCJhY2MiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0cmltIiwiaWRlbnRpZmllciIsImlkZW50aWZpZXJJbmRleCIsImRldGVybWluZVBjdCIsImhhc2giLCJnZXRVbnNlY3VyZUhhc2giLCJwY3QiLCJleGl0U2Nyb2xsTGlzdGVuZXIiLCJjYWxsQmFjayIsImxvb3AiLCJzY3JvbGxUb3AiLCJsYXN0U2Nyb2xsVG9wIiwiY2xlYXJJbnRlcnZhbCIsImV4aXRTY3JvbGxJbnRlcnZhbCIsInNldEludGVydmFsIiwic3R5bGVBcHBsaWNhdG9yIiwiZWxlbWVudHMiLCJzdHlsZUNoYW5nZXNNYXAiLCJpIiwiZWxlbWVudCIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsInN0eWxlIiwiaW5qZWN0U3R5bGVTaGVldCIsInN0eWxlU2hlZXQiLCJyZWwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwcmVwYXJlQWN0aW9ucyIsImFjdGlvbnNUb1ByZXBhcmUiLCJidXNpbmVzc1J1bGVJZCIsImRlYnVnTW9kZSIsImFjdGlvbnMiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ2YXJpYW50IiwiYWN0aW9uIiwiYnVzaW5lc3NSdWxlVHJhbnNmb3JtYXRpb25zIiwidmFyaWFudHMiLCJidXNpbmVzc1RyYW5zZm9ybWF0aW9uIiwiaWQiLCJrZXlzIiwidmFyaWFudEtleSIsInJhbmRvbVBjdCIsIndlaWdodCIsIk1hdGgiLCJmbG9vciIsImluaXRpYXRlU2Vzc2lvblN0b3JhZ2VzIiwicG9wdXBEaXNwbGF5RmxhZyIsInNlc3Npb25TdG9yYWdlIiwic2Vzc2lvblRpbWVzdGFtcCIsInNlc3Npb25IaXN0b3J5Iiwic2V0SXRlbSIsIm5vdyIsInBhdGhuYW1lIiwiY29uZGl0aW9uQ2hlY2tlciIsInJ1blRpbWVWYWx1ZSIsImNvbmRpdGlvbiIsInN1Y2Nlc3MiLCJ1bmRlZmluZWQiLCJtaW4iLCJtYXgiLCJwYXJzZUludCIsInJlZ2V4IiwiUmVnRXhwIiwidGVzdCIsImdldERlYnVnTW9kZSIsIm9vc1JlYXNvbiIsInF1ZXJ5U3RyaW5nIiwic2VhcmNoIiwicmVtb3ZlSXRlbSIsImN1cnJlbnQiLCJnZXRHYUNsaWVudElkIiwiZ2EiLCJnZXRBbGwiLCJ0cmFja2VycyIsImdldCIsImNoYXIiLCJjaGFyQ29kZUF0IiwiYWJzIiwiZ2V0UmFuZG9tSW50IiwicmFuZG9tIiwiZ2V0VW5peFRpbWUiLCJnZXRJZGVudGlmaWVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJleHRyYWN0SWRlbnRpZmllckludGVydmFsIiwiZSIsImRlbGF5IiwibXMiLCJmb3JtYXREZWxpdmVyeURhdGUiLCJkYXRlIiwicmVzdWx0Iiwic3RhcnRNb250aEluZGV4IiwiZW5kTW9udGhJbmRleCIsInN0YXJ0RGF5IiwiZW5kRGF5IiwibWF0Y2giLCJ0b2RheSIsInN0YXJ0WWVhciIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJlbmRZZWFyIiwiZXN0aW1hdGVkU3RhcnQiLCJlc3RpbWF0ZWRFbmQiLCJzdGFydERpZmZPdmVyRGF5cyIsImNlaWwiLCJlbmREaWZmT3ZlckRheXMiLCJzdGFydERpZmZPdmVyV2Vla3MiLCJlbmREaWZmT3ZlcldlZWtzIiwiZXJyIiwiaWRsZVRpbWVyIiwidGltZU91dCIsInJlc2V0VGltZXIiLCJjbGVhclRpbWVvdXQiLCJpZGxlVGltZW91dCIsIm9udG91Y2hzdGFydCIsImdldEJyb3dzZXJUeXBlIiwidXNlckFnZW50IiwibmF2aWdhdG9yIiwiaXNPd25NdXRhdGlvbiIsIm11dGF0aW9uTGlzdCIsIm5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsInNvbWUiLCJuIiwidGFnTmFtZSIsImMiLCJzdHJEYXRhIiwic3RyRGVsaW1pdGVyIiwib2JqUGF0dGVybiIsImFyckRhdGEiLCJhcnJNYXRjaGVzIiwiZXhlYyIsInN0ck1hdGNoZWREZWxpbWl0ZXIiLCJwdXNoIiwic3RyTWF0Y2hlZFZhbHVlIiwiY29uZmlnIiwiZGJOYW1lIiwidmVyc2lvbiIsIm1haW50ZW5hbmNlT3BlcmF0aW9uQ291bnQiLCJzdG9yZSIsIm5hbWUiLCJpbmRleGVzIiwiZmllbGRzIiwia2V5UGF0aCIsImF1dG9JbmNyZW1lbnQiLCJfd2luZG93IiwiYWxsdGltZSIsInNlc3Npb24iLCJCZWFnbGVEYXRhQ29sbGVjdGlvbldyYXBwZXIiLCJpbmRleGVkREIiLCJpbml0Iiwib3BlblJlcXVlc3QiLCJvcGVuIiwib251cGdyYWRlbmVlZGVkIiwiZXZlbnQiLCJvbGRWZXJzaW9uIiwiZGVsZXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVPYmplY3RTdG9yZSIsImlkeCIsImNyZWF0ZUluZGV4Iiwib25lcnJvciIsIm9uc3VjY2VzcyIsImRiIiwiZGVsZXRlUmVxdWVzdCIsImRlbGV0ZURhdGFiYXNlIiwicmVqZWN0IiwiaW50ZXJ2YWwiLCJyZWFkd3JpdGUiLCJnZXRDb25uZWN0aW9uIiwidHgiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwiZGF0YU5hbWUiLCJkYXRhVmFsdWUiLCJpbml0VHJhbnNhY3Rpb24iLCJzZXNzaW9uSWQiLCJnZXRDdXJyZW50U2Vzc2lvbklkIiwicm91bmQiLCJwYXlsb2FkIiwicHV0Iiwib3AiLCJzdG9yZWQiLCJnZXRDdXJzb3IiLCJjdXJzb3IiLCJ0YXJnZXQiLCJjb250aW51ZSIsIm1pbm1heCIsIk1hcCIsImhhcyIsInNldCIsImdyb3VwQnkiLCJkYXRhIiwiY291bnQiLCJ0b3RhbCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwib3BlbkN1cnNvciIsIklEQktleVJhbmdlIiwib25seSIsInRvU3RyaW5nIiwiaW5kZXhWYWx1ZSIsInN1bSIsInNpemUiLCJ2YWx1ZXMiLCJkIiwic2V0SG91cnMiLCJnZXRIb3VycyIsInBhZFN0YXJ0IiwiZ2V0RGF0ZSIsIkNvbGxlY3RvckFwaSIsImNvbGxlY3RvckFwaSIsInF1ZXJ5SW5Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWUiLCJxdWVyeU1ldGhvZCIsInF1ZXJ5UHJvbWlzZSIsImF2ZyIsIm1vZGUiLCJsYXN0IiwiZGF0YVZhbHVlcyIsIm9iaiIsImRhdGFfdmFsdWUiLCJ1cGRhdGVJbkNvbGxlY3RvciIsImJhc2VGZWF0dXJlVmFsdWUiLCJ1cGRhdGVNZXRob2QiLCJzYXZlIiwiYmVhZ2xlSW5mb0xheWVyIiwiYSIsImYiLCJfX2h3bSIsInNlYXJjaFBhdGhzIiwiUGFnZVR5cGVEZXBlbmQiLCJtZXRob2QiLCJzZWxlY3RvciIsImZvcm1hdHRlciIsImV4Y2x1c2l2ZSIsIm9wZXJhbmQiLCJvYnNlcnZlciIsImNoaWxkcmVuIiwiZmVhdHVyZUVuZ2luZWVyaW5nT3BzIiwiZmVhdHVyZU5hbWUiLCJpbmNyZWFzZUJlYWdsZUluZm9MYXllckhXTSIsImluZm9MYXllciIsInR5cGVkVmFsdWUiLCJsYXN0S2V5IiwicG9wIiwidXBkYXRlRGVyaXZhdGlvbnNJbkNvbGxlY3RvciIsInBhc3NWYWx1ZVRvTGlzdGVuZXJzIiwiREFUQV9MSVNURU5FUlMiLCJhZGREYXRhTGlzdGVuZXIiLCJsaXN0ZW5lciIsImxpc3RlbmVycyIsImlzQXJyYXkiLCJnZXRGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYmxvY2tpbmciLCJwb2xsSW50ZXJ2YWwiLCJvYnRhaW5EYXRhIiwianNvbkdldCIsInNlYXJjaEVsZW1lbnQiLCJpc0ZvdW5kIiwiaXNJZ25vcmUiLCJyZW1vdmVGcm9tQmVhZ2xlSW5mb0xheWVyIiwiYWRkVHJlYXRtZW50IiwiZGVwZW5kYW50X29uX3RyZWF0bWVudCIsIlBBUlNFU0VBUkNITUFYUkVUUlkiLCJQQVJTRVNFQVJDSFNUQVJUREVMQVkiLCJwYXJzZVNlYXJjaFBhdGhzRGVsYXkiLCJwYXJzZVNlYXJjaFBhdGhzUmV0cnkiLCJpbml0aWFsaXplQmVhZ2xlSW5mb0xheWVyIiwicHJlcGFyZUNvcmVEYXRhIiwicGFyc2VyQ2FsbGVyIiwiYWRkTWV0cmljcyIsImNvbGxlY3REZXJpdmF0aW9uc0Zyb21Db2xsZWN0b3IiLCJiYXNlRmVhdHVyZU5hbWVzIiwiRkVEYXRhIiwiRkVPcCIsInF1ZXJ5UmVzcG9uc2UiLCJwcm9jZXNzRm9ybWF0dGVyIiwidG9VcHBlckNhc2UiLCJzZWFyY2hPYmoiLCJsYXllclZhbHVlIiwiZmlsdGVyUGFyYW1zIiwiZmlsdGVyTmFtZSIsImZpbHRlclZhbHVlIiwiZmlsdGVyTWF0Y2giLCJxdWVyeVNlbGVjdG9yIiwidG9CZVVwZGF0ZWQiLCJjaGlsZCIsImNoaWxkRWxlbWVudHMiLCJmaWx0ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwidHJpZ2dlclJlc3RhcnQiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImlubmVyVGV4dCIsImF0dHJpYlZhbHVlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZWNoaWxkIiwiYXR0cmliVmFsdWUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRWYWx1ZSIsInN1bVByaWNlIiwiY2hpbGRUZXh0IiwiYXJyYXlJbm5lclRleHQiLCJleGNsdXNpdmVFbGVtZW50IiwiY3VzdG9tRGF0YURlcml2YXRpb25zIiwiY3VycmVudFBhZ2VUeXBlIiwiYWxsIiwiaXNDYXJ0RW1wdHkiLCJ0b3RhbEJhc2VQcmljZSIsImNvdXBvbk5vdEFwcGxpY2FibGUiLCJwcmljZXMiLCJxdWFudGl0aWVzIiwidG90YWxQcmljZSIsImNvdXBvbkFwcGxpY2FibGVBbW91bnQiLCJza3UiLCJza3VMaXN0IiwicGFyc2VTZWFyY2hQYXRocyIsImRvbVN0YXR1cyIsInJlYWR5U3RhdGUiLCJ3aW50b3AiLCJkYXRhTGF5ZXIiLCJ3aW5kb2MiLCJmb3VuZE5hbWVzIiwiU2V0IiwicHJldkZvdW5kTmFtZXMiLCJub3RGb3VuZE5hbWVzIiwic2VhcmNoQW5kU2V0IiwiZGF0YUxheWVySXRlbSIsInNvcmdBcnJheUlubmVyIiwiZ2V0U09SR0FycmF5Iiwic29yZ0l0ZW0iLCJqb2luIiwidGltZUVuZCIsInBhdGgiLCJwYXRoQXJyYXkiLCJzdWJQYXRoIiwic2xpY2UiLCJzdWJBcnJheSIsInN1YktleSIsInN1YlZhbHVlIiwid2luZG93UHRyIiwibmF2UHRyIiwicGxhdGZvcm0iLCJ1c2VyQWdlbnREYXRhIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImF2YWlsV2luZG93Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0Iiwid2luZG93RGVwdGgiLCJjb2xvckRlcHRoIiwicGl4ZWxEZXB0aCIsInZwb3J0U2hhcGUiLCJ2aXN1YWxWaWV3cG9ydCIsIndpZHRoIiwiaGVpZ2h0IiwiaU9TIiwib3JpZW50YXRpb25BbmdsZSIsIm9yaWVudGF0aW9uIiwiYW5nbGUiLCJ0ZW1wIiwiaGlzdG9yeSIsIm5hdkFnZW50IiwiYnJhbmRzIiwiYnJhbmQiLCJtb2JpbGUiLCJoYXJkd2FyZUNvbmN1cnJlbmN5IiwibGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsInVzZXJMYW5ndWFnZSIsIm1heFRvdWNoUG9pbnRzIiwidmVuZG9yIiwiY29ubmVjdGlvbiIsImRvd25saW5rIiwiY3VycmVudFVSTCIsIlVSTCIsImhvc3RuYW1lIiwiZG9Ob3RUcmFjayIsIm1zRG9Ob3RUcmFjayIsInJlZmVycmVyIiwiZmlyc3RTZXNzaW9uUmVmZXJyZXIiLCJwYWdlVHlwZSIsInBlcmZNZXRyaWNzIiwicGVyZk5hdmlnYXRpb25NZXRyaWNzIiwicGVyZm9ybWFuY2UiLCJnZXRFbnRyaWVzQnlUeXBlIiwiY29ubmVjdCIsImNvbm5lY3RFbmQiLCJjb25uZWN0U3RhcnQiLCJyZXF1ZXN0IiwicmVzcG9uc2VFbmQiLCJyZXF1ZXN0U3RhcnQiLCJkb20iLCJkb21JbnRlcmFjdGl2ZSIsImRvbUNvbXBsZXRlIiwibG9hZCIsImxvYWRFdmVudEVuZCIsImxvYWRFdmVudFN0YXJ0IiwiZHVyYXRpb24iLCJzY2hlbWFPcmdFbHRzIiwic29yZ0FycmF5Iiwic1RhZyIsImNudG50IiwianNvbmNvbnRlbnQiLCJIRUFERVJTIiwiTW9uaXRvciIsImhhc0Fycml2YWxMb2dTZW50IiwiaGFzTWFpbkxvZ1NlbnQiLCJoYXNVcGRhdGVzU2VudCIsImhpZ2hXYXRlck1hcmsiLCJpbml0aWFsaXplRXhpdEV2ZW50TGlzdGVuZXJzIiwiaW1tZWRpYXRlIiwicGFja0FuZFF1ZXVlTWFpbkxvZyIsInBhY2tBbmRRdWV1ZUluY3JlbWVudGFsTG9nIiwicGFja2FnZU1haW5Mb2dEYXRhIiwicmVxdWVzdEJsb2IiLCJjaGVja0ZvckxhdGVzdENoYW5nZXMiLCJxdWV1ZUxvZ3MiLCJoYXNDaGFuZ2VkIiwicGFja2FnZUluY3JlbWVudGFsTG9nRGF0YSIsImxvZ0RhdGEiLCJwYWNrYWdlQXJyaXZhbExvZ0RhdGEiLCJod20iLCJjb29raWVHYUlkIiwidmlld19lcG9jaCIsImJvZHkiLCJsYyIsInUiLCJvbkhhc2hQY3QiLCJCbG9iIiwic3RhcnRzV2l0aCIsInMiLCJtIiwidmlzaWJpbGl0eUNoYW5nZVRpbWVvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xvc2VFdmVudCIsImNhcHR1cmUiLCJ2aXNpYmlsaXR5U3RhdGUiLCJzZW5kQmVhY29uIiwicXVldWVkIiwicXVldWVJbnRlcnZhbCIsImNoZWNrRGF0YUxheWVyUnVsZSIsInJ1bGUiLCJvcGVyYXRvciIsImRhdGFMYXllckZpbmRlciIsInJ1bnRpbWVWYWx1ZSIsImNoZWNrRWxlbWVudFJ1bGUiLCJzZWxlY3RvckFsbCIsInNlbGVjdG9yRmFsbGJhY2siLCJtYWluU2VsZWN0b3IiLCJ0ZW1wVmFsIiwicmV0dXJuVmFsIiwiZWxlbSIsImVsZW1lbnRTdHlsZXMiLCJnZXRDb21wdXRlZFN0eWxlIiwic3R5bGVLZXkiLCJzdHlsZVZhbHVlIiwiY2hlY2tGdW5jdGlvblJ1bGUiLCJydWxlRnVuY3Rpb24iLCJGdW5jdGlvbiIsImNoZWNrU2Vzc2lvblJ1bGUiLCJkdXJhdGlvbkhhbmRsZXIiLCJoaXN0b3J5SGFuZGxlciIsImdldFNlc3Npb25UaW1lc3RhbXAiLCJjdXJyZW50SGlzdG9yeSIsImNoZWNrVXJsUnVsZSIsInJlcXVlc3RVUkwiLCJjaGVja0VudlJ1bGUiLCJpc01vYmlsZSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiR2xvdlByb2R1Y3RJbmZvUmVwb3NpdG9yeSIsInRpbWVzdGFtcCIsImNsZWFyUmVxdWVzdCIsImNsZWFyIiwiZ2V0UmVxdWVzdCIsImNvdW50UmVxdWVzdCIsImN1cnNvclJlcXVlc3QiLCJleGlzdGluZ1Byb2RJbmZvIiwiZWxhcHNlZFNlY29uZHMiLCJwcm9kdWN0SW5mb1Byb21pc2UiLCJjbGVhclByb21pc2UiLCJwcm9kdWN0SW5mb0FycmF5IiwicHJlcGFyZVBheWxvYWRzIiwicGF5bG9hZHMiLCJmaWVsZE5hbWVzIiwic2hpZnQiLCJTdG9yZSIsImluc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsImNoZWNrUHJvZHVjdEluZm9SdWxlIiwiZ2V0VHJhbnNhY3Rpb25Db3VudCIsImdldEFkZFRvQ2FydENvdW50IiwiZ2V0UHJldmlld0NvdW50Iiwic2FsZUNudFZpc2l0b3JzSW4xNSIsImNhcnRDbnRWaXNpdG9yc0luMTUiLCJ2aWV3Q250VmlzaXRvcnNJbjEiLCJNdXRleCIsIlJ1bGVFbmdpbmUiLCJiYXNlUnVsZVNldCIsImFkZGVkRGF0YUxpc3RlbmVycyIsIm11dGV4IiwiY2hlY2tSdWxlIiwicnVsZVNhdGlzZmllZCIsImNoYWluIiwiY2hhaW5fY29uZGl0aW9uIiwicnVsZXMiLCJzYXRpc2ZpZWRSdWxlSWRzIiwic2V0VXBMaXN0ZW5lcnMiLCJhY3F1aXJlIiwicmVsZWFzZSIsImlzRWxpZ2libGUiLCJmaWx0ZXJlZCIsImsiLCJleHRyYWN0UnVsZUF0dHJpYnV0ZXMiLCJkYXRhTGF5ZXJSdWxlcyIsImVsZW1lbnRSdWxlcyIsImJvdW5kQXNzZXNFbGlnaWJpbGl0eVJ1bGVzQ2FsbEJhY2siLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXNDYWxsQmFjayIsImJpbmQiLCJtdXRhdGlvblJlY29yZCIsImV2ZXJ5IiwiZWxlbWVudFRvT2JzZXJ2ZSIsInBhcmVudE5vZGUiLCJjb21wdXRlU2VnbWVudCIsInNlZ21lbnQiLCJydWxlU2V0Iiwic2VnbWVudFJ1bGVFbmdpbmUiLCJidXNpbmVzc1J1bGVTZXQiLCJjaGVja1J1bGVzIiwiVHJlYXRtZW50UmVwb3NpdG9yeSIsInVzZXJTZWdtZW50IiwidXNlclNlZ21lbnRXZWlnaHRzIiwidHJlYXRtZW50IiwidHJlYXRtZW50c09iaiIsInRyZWF0bWVudFdpdGhUaW1lc3RhbXAiLCJlbGFwc2VkRGF5cyIsIndlaWdodHMiLCJyZXBsYWNlciIsInJlcGxhY2VGbiIsInZhbCIsImN1cnJlbnRSZXBsYWNlRm4iLCJyZXBsYWNlT2JqZWN0RXh0cmFjdG9yIiwicmVwbGFjZVZhbCIsInJlcGxhY2VGbkV4ZWN1dG9yIiwickZuIiwic2luZ2xlIiwicmVwbGFjZUZ1bmN0aW9uIiwic3RvcmFnZSIsImtleUZhbGxiYWNrIiwiY2hlY2tBY3Rpb25Db25kaXRpb24iLCJlbGlnaWJsZUVsZW1lbnRzIiwiYXR0cmlidXRlIiwiaW5uZXJfY29uZGl0aW9uIiwiY29uZGl0aW9uRWxlbWVudHMiLCJhY3Rpb25Db25kaXRpb25DaGVja2VyIiwiJCIsImVsZW1lbnRTa3UiLCJhcHBseUFjdGlvbnMiLCJ0cmFuc2Zvcm1lciIsImFwcGx5RXZlbnQiLCJjb250ZW50U2VsZWN0b3IiLCJtZENvbmRpdGlvbiIsIm1vdmVfc2VsZWN0b3JfMSIsIm1vdmVfc2VsZWN0b3JfMiIsInBUeXBlIiwicHJvZHVjdEluZm9TdG9yYWdlIiwibWMiLCJTdHJpbmciLCJiZWZvcmUiLCJhZnRlciIsImFwcGVuZCIsIm9mZiIsImNyZWF0ZVBvcHVwIiwiZWxtIiwic3RvcFByb3BhZ2F0aW9uIiwiZGlzcGxheU1vZGFsIiwiZ2V0UHJvZHVjdEluZm8iLCJkaXNwbGF5UG9wdXAiLCJyIiwicHVzaFN0YXRlIiwic3RhdGUiLCJvbmNlIiwiaHRtbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJoYW5kbGVEb2N1bWVudFRpdGxlVGFiQ2hhbmdlIiwiY3NzIiwicHJvcGVydHkiLCJwcm9wZXJ0eVZhbHVlIiwiYXR0ciIsIm4xIiwibjIiLCJzd2FwTm9kZXMiLCJzb3VyY2UiLCJkZXN0aW5hdGlvbiIsInNlbnRlbmNlIiwid29yZCIsImNoYXJBdCIsInRvTG9jYWxlVXBwZXJDYXNlIiwicmVwbGFjZVdpdGhWYWwiLCJodG1sU3RyIiwidGl0bGVzIiwicGFyc2VkVGl0bGVzIiwicGFyc2VkVGl0bGUiLCJoaWRkZW4iLCJoYW5kbGVQb3B1cENsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vZGFsQ2xpY2siLCJjb250YWlucyIsImhpZGUiLCJxUG9wdXAiLCJnZXRFbGVtZW50QnlJZCIsImlzTW9kYWwiLCJwb3B1cFdyYXBwZXIiLCJwb3B1cENsb3NlQnV0dG9uIiwicG9wdXBDbG9zZUJ1dHRvblN0eWxlIiwib25jbGljayIsImNvbnRlbnRzIiwic3JjIiwidGVtcGxhdGUiLCJpbm5lckhUTUwiLCJwb3B1cCIsImNvbnRlbnQiLCJmaXJzdENoaWxkIiwicDEiLCJwMiIsImkxIiwiaTIiLCJpc0VxdWFsTm9kZSIsImluc2VydEJlZm9yZSIsIndhaXRGb3JKUXVlcnkiLCJqUXVlcnkiLCJqUXVlcnlJbnRlcnZhbCIsImFjdGlvbkFwcGxpY2F0b3IiLCJPQlNFUlZFUl9DT05GSUciLCJhdHRyaWJ1dGVzIiwiUm9ib3RFbmdpbmUiLCJkZWJ1Z0ZpbHRlcmVkVHJlYXRtZW50cyIsIm1hdGNoZWRUcmVhdG1lbnRzIiwiZW5nYWdlbWVudExvY2siLCJyZUFwcGx5VHJlYXRtZW50c01hcCIsImFkZGVkRGF0YUxpc3RlbmVySWRzIiwiZW5nYWdlUm9ib3QiLCJpbml0aWF0ZVJlYXBwbHlSb2JvdE1hcCIsImVsaWdpYmlsaXR5UnVsZVNldCIsImRldmljZSIsInJlYXBwbHlfZXZlbnQiLCJyZWFwcGx5X2V2ZW50X3BhZ2VfdHlwZSIsInByZXBhcmVBbmRBcHBseSIsInJlYXBwbHlfZXZlbnRfYXJyYXkiLCJyZWFwcGx5RXZlbnQiLCJwcmV2aW91c1ZhbHVlIiwiY2hlY2tFbGlnaWJpbGl0eVJ1bGVTZXQiLCJ0cmVhdG1lbnRTa2lwUmF0aW8iLCJkZXBlbmRhbnRPblRyZWF0bWVudFdlaWdodCIsInQiLCJkZXRlcm1pbmluZ0lkZW50aWZpZXIiLCJ0cmVhdG1lbnRQY3QiLCJjaGVja0J1c2luZXNzUnVsZXMiLCJhZGRSdWxlU2V0RGF0YUxpc3RlbmVycyIsInByZXBhcmVkIiwidHJlYXRtZW50SWRzIiwicmVBcHBseVRyZWF0bWVudHMiLCJSZXNpemVPYnNlcnZlciIsInJlYXBwbHlTZWxlY3Rvckxpc3QiLCJyZWFwcGx5X3NlbGVjdG9yIiwibGFzdFNjcm9sbFRpbWUiLCJnZXRUaW1lIiwic3QiLCJwYWdlWU9mZnNldCIsInJlYXBwbHlJbnRlcnZhbCIsImFwcGxpZWQiLCJib3VuZEVuZ2FnZVRyZWF0bWVudCIsInNlbGVjdG9ycyIsImV4dHJhY3REYXRhTGlzdGVuZXJTZWxlY3RvcnMiLCJwcmV2aW91c1NlbGVjdG9ycyIsImVsaWdpYmlsaXR5UnVsZSIsIm9wcG9zaXRlRmxhZyIsImVsaWdpYmlsaXR5U2NvcGUiLCJlbGlnaWJpbGl0eU5hbWUiLCJlbGlnaWJpbGl0eVNldFR5cGUiLCJwcmV2aW91c0lzRWxpZ2libGUiLCJjaGVja0VsaWdpYmlsaXR5IiwiYnVzaW5lc3NSdWxlIiwiYmVhZ2xlT24iLCJwZXJzaXN0UHJvZHVjdEluZm9Qcm9taXNlIiwicGVyc2lzdFByb2R1Y3RJbmZvIiwiZWxpZ2liaWxpdHlSdWxlc0Fzc2Vzc1Byb21pc2UiLCJhc3Nlc0VsaWdpYmlsaXR5UnVsZXMiLCJ0cmVhdG1lbnRzUHJvbWlzZSIsImdldFRyZWF0bWVudHMiLCJ0cmVhdG1lbnRXZWlnaHRzUHJvbWlzZSIsImdldFRyZWF0bWVudFdlaWdodHMiLCJzZWFyY2hQYXJhbXMiLCJsYXN0SW5kZXhPZiIsIml0ZW0iLCJ0cmVhdG1lbnRSZXBvc2l0b3J5IiwiZ2V0TWF0Y2hlZFRyZWF0bWVudHMiLCJyb2JvdEVuZ2luZSIsImVuZ2FnZVJvYm90cyIsImdldEVsaWdpYmlsaXR5UnVsZXMiLCJydWxlRW5naW5lIiwiU0hVVERPV04iLCJtb25pdG9yIiwiZWFybHlMb2dTZW50IiwiaGlkZVJlbW92ZWQiLCJjb29raWVQY3QiLCJwYWNrQW5kUXVldWVBcnJpdmFsTG9nIiwicHJvdG90eXBlIiwiR0xPVl9PTiIsImlzTGFiZWxTZW50IiwidGltZW91dENvdW50ZXIiLCJwcm9jZXNzQWRtaW5Vc2VyIiwiaXNBZG1pbiIsImlzT24iLCJzZW5kTG9ncyJdLCJzb3VyY2VSb290IjoiIn0=
