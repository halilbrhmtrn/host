!function(){var e={757:function(e,t,n){e.exports=n(666)},666:function(e){var t=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,n){return e[t]=n}}function s(e,t,n,r){var o=t&&t.prototype instanceof v?t:v,a=Object.create(o.prototype),i=new I(r||[]);return a._invoke=function(e,t,n){var r=f;return function(o,a){if(r===p)throw new Error("Generator is already running");if(r===h){if("throw"===o)throw a;return N()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=E(i,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var u=l(e,t,n);if("normal"===u.type){if(r=n.done?h:d,u.arg===g)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=h,n.method="throw",n.arg=u.arg)}}}(e,n,i),a}function l(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=s;var f="suspendedStart",d="suspendedYield",p="executing",h="completed",g={};function v(){}function m(){}function y(){}var w={};u(w,a,(function(){return this}));var b=Object.getPrototypeOf,k=b&&b(b(L([])));k&&k!==n&&r.call(k,a)&&(w=k);var S=y.prototype=v.prototype=Object.create(w);function x(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function A(e,t){function n(o,a,i,c){var u=l(e[o],e,a);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==typeof f&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,i,c)}),(function(e){n("throw",e,i,c)})):t.resolve(f).then((function(e){s.value=e,i(s)}),(function(e){return n("throw",e,i,c)}))}c(u.arg)}var o;this._invoke=function(e,r){function a(){return new t((function(t,o){n(e,r,t,o)}))}return o=o?o.then(a,a):a()}}function E(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator.return&&(n.method="return",n.arg=t,E(e,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=l(r,e.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,g;var a=o.arg;return a?a.done?(n[e.resultName]=a.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function I(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function L(e){if(e){var n=e[a];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}return{next:N}}function N(){return{value:t,done:!0}}return m.prototype=y,u(S,"constructor",y),u(y,"constructor",m),m.displayName=u(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,u(e,c,"GeneratorFunction")),e.prototype=Object.create(S),e},e.awrap=function(e){return{__await:e}},x(A.prototype),u(A.prototype,i,(function(){return this})),e.AsyncIterator=A,e.async=function(t,n,r,o,a){void 0===a&&(a=Promise);var i=new A(s(t,n,r,o),a);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},x(S),u(S,c,"Generator"),u(S,a,(function(){return this})),u(S,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=L,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(_),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),_(n),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;_(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:L(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}function r(n){return function(t){if(Array.isArray(t))return e(t)}(n)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||t(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw o}}return a}}(e,n)||t(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t,n,r,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function c(e){a(i,r,o,c,u,"next",e)}function u(e){a(i,r,o,c,u,"throw",e)}c(void 0)}))}}var c=n(757),u=n.n(c),s="https://europe-west3-ndvivense.cloudfunctions.net/api/logResponse",l="(max-width: 440px)",f="__glov_session_id",d="ND_PageViews",p="ND_SessionTimestamp",h="ND_PopupDisplayFlag",g="ND_CABasketPrice";function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,t,n){return t&&m(e.prototype,t),n&&m(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var w=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Adora Client SDK",n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];v(this,e),this.origin=t,this.DEBUG=n}return y(e,[{key:"log",value:function(){var e=this.DEBUG,t=this.origin;if(e){for(var n,r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];(n=console).log.apply(n,["[".concat(t,"]")].concat(o))}}}]),e}(),b=w;function k(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var x=new b("Adora Utils"),A=function(){document.documentElement.className=document.documentElement.classList.remove("adora-hide")},E=function(){var e=i(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x.log("Fetching treatments"),e.next=3,fetch("https://host-b96.pages.dev/treatments.json");case 3:return t=e.sent,e.next=6,t.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(e,t){if(!e)return null;var n=e.split(";").map((function(e){return e.split("=")})).reduce((function(e,t){return t[0]&&t[1]&&(e[decodeURIComponent(t[0].trim())]=decodeURIComponent(t[1].trim())),e}),{})[t];return n?("_ga"===t&&(n=n.split(".")[2]),n):null},_=function(){var e=i(u().mark((function e(t){var n,r,o,a,i;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",-1);case 2:return n=(new TextEncoder).encode(t),e.next=5,crypto.subtle.digest("SHA-1",n);case 5:return r=e.sent,o=Array.from(new Uint8Array(r)),a=o.map((function(e){return e.toString(16).padStart(2,"0")})).join(""),i=parseInt(a,16),e.abrupt("return",i%100);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(e){var t=document.documentElement.scrollTop,n=setInterval((function(){var r=document.documentElement.scrollTop;t-400>r?(clearInterval(n),e()):t=r}),500)},L=function(e,t){x.log("Applying style changes",t,"to elements",e);for(var n=0;n<e.length;n++)for(var r=e[n],a=0,i=Object.entries(t);a<i.length;a++){var c=o(i[a],2),u=c[0],s=c[1];r.style[u]=s}},N=function(){var e=i(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=document.createElement("link")).rel="stylesheet",t.type="text/css",t.href="https://host-b96.pages.dev/nd-styles.css",document.head.appendChild(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(e,t){var n,r=k(e);try{for(r.s();!(n=r.n()).done;){var o=n.value,a=o.subVariants;if(a){var i,c=k(a);try{for(c.s();!(i=c.n()).done;){var u=i.value;if(u.id===t){for(var s in u)"id"!==s&&(o[s]=u[s]);return e}}}catch(e){c.e(e)}finally{c.f()}}}}catch(e){r.e(e)}finally{r.f()}return e},j=function(e,t,n){if("notExist"===t)return e?(x.log("conditionChecker: -not satisfied- target does exist"),!1):(x.log("conditionChecker: -satisfied- target does not exist"),!0);if(!e||!t)return x.log("conditionChecker: runTimeValue or condition is not defined"),!1;switch(t){case"exist":return e?(x.log("conditionChecker: -satisfied- target does exist"),!0):(x.log("conditionChecker: -not satisfied- target does not exist"),!1);case"contains":return e.includes(n)?(x.log("conditionChecker: -satisfied- target contains value"),!0):(x.log("conditionChecker: -not satisfied- target does not contain value"),!1);case"notContains":return e.includes(n)?(x.log("conditionChecker: -not satisfied- target contains value"),!1):(x.log("conditionChecker: -satisfied- target does not contain value"),!0);case"equal":return e===n?(x.log("conditionChecker: -satisfied- target equals value"),!0):(x.log("conditionChecker: -not satisfied- target does not equal value"),!1);case"notEqual":return e!==n?(x.log("conditionChecker: -satisfied- target does not equal value"),!0):(x.log("conditionChecker: -not satisfied- target equals value"),!1);case"greaterThan":return e>n?(x.log("conditionChecker: -satisfied- target is greater than value"),!0):(x.log("conditionChecker: -not satisfied- target is not greater than value"),!1);case"lessThan":return e<n?(x.log("conditionChecker: -satisfied- target is less than value"),!0):(x.log("conditionChecker: -not satisfied- target is not less than value"),!1);case"greaterEquals":return e>=n?(x.log("conditionChecker: -satisfied- target is greater or equal than value"),!0):(x.log("conditionChecker: -not satisfied- target is not greater or equal than value"),!1);case"lessEquals":return e<=n?(x.log("conditionChecker: -satisfied- target is less or equal than value"),!0):(x.log("conditionChecker: -not satisfied- target is not less or equal than value"),!1);case"between":var r=o(n.split(","),2),a=r[0],i=r[1];return a=parseInt(a),i=parseInt(i),e>=a&&e<=i?(x.log("conditionChecker: -satisfied- target is between min and max"),!0):(x.log("conditionChecker: -not satisfied- target is not between min and max"),!1);default:return x.log("conditionChecker: condition is not defined ",t),!1}},R=function(){crypto.randomUUID=function(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)}))}};function T(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function P(){return P=i(u().mark((function e(t){var n,r,o,a,i,c,s,f=arguments;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f.length>1&&void 0!==f[1]&&f[1],n=new b("Apply Treatments"),r=h,o=function(e){n.log("Applying treatment: ",JSON.stringify(e));var t=e.operator,o=e.type,a=e.applyEvent,u=e.contentSelector,f=e.selector,d=e.selectorFallback,p=e.mdCondition,h=e.move_selector_1,g=e.move_selector_2,v=e.replaceFn,m=e.value;if((!p||window.matchMedia(p).matches)&&f&&(!h||$(h).length)&&(!g||$(g).length)){var y=$(f);if(y.length||(d&&(y=$(d)),y.length)){if(v&&m.includes("{{REPLACE}}")){n.log("Executing replace function: ",v);var w=Function(v);m=m.replace("{{REPLACE}}",w())}if("remove"===t)y&&(n.log("Removing: ",f),y.remove()),n.log("Cannot found element with selector: ",f);else if("insert"===t)switch(o){case"before":n.log("Inserting before: ",m),y.before(m);break;case"after":n.log("Inserting after: ",m),y.after(m);break;case"popup":if(0!==parseInt(sessionStorage.getItem(r))){n.log("Popup already displayed in session");break}if(n.log("Creating Popup: ",m),c(m,u),a){var b,k=window.matchMedia(l).matches,S=T(a);try{for(S.s();!(b=S.n()).done;)switch(b.value){case"exitIntent":n.log("Adding exit intent listener"),k?I(i):document.documentElement.addEventListener("mouseleave",i,{once:!0});break;case"copyIntent":n.log("Adding copy intent listener"),document.documentElement.addEventListener("copy",i,{once:!0})}}catch(e){S.e(e)}finally{S.f()}}else setTimeout((function(){i()}),timeout)}else if("edit"===t)switch(o){case"text":n.log("Editing text: ",m),document.querySelector(f).textContent=m;break;case"styleApplicator":n.log("Applying style: ",m);var x=document.querySelectorAll(f),A=JSON.parse(m);n.log("Style Changes Map: ",A),L(x,A);break;case"addClass":n.log("addding class to ".concat(y," named ").concat(m)),y.addClass(m);break;case"removeClass":n.log("remove class from ".concat(y," named ").concat(m)),y.removeClass(m)}else if("setattribute"===t)switch(n.log("Setting attribute: ",attribute,m),attribute){case"src":y.css("content","url(".concat(m.trim(),")"));break;case"style":var E=m.split(":")[0].trim(),C=m.split(":")[1].trim();y.css(E,C,"!important")}else if("replace"===t)n.log("Replacing: ",m),y.replaceAll(m);else if("swap"===t){n.log("Swapping: ",h,g);var _=document.querySelector(h),N=document.querySelector(g);s(_,N)}else"injectscript"===t?(n.log("Injecting script: ",m),y.append("<script>".concat(m,"<\/script>"))):n.log("No such operator exists yet",t)}}},a=function e(t){var n=t.target.id;n&&"nd-popup__wrapper"===n&&($("#nd-popup__wrapper").remove(),window.removeEventListener("click",e,!0))},i=function e(){sessionStorage.setItem(r,1),document.getElementById("nd-popup__wrapper").style.display="block",window.addEventListener("click",a,!0),document.documentElement.removeEventListener("mouseleave",e,{once:!0}),document.documentElement.removeEventListener("copy",e,{once:!0})},c=function(e,t){var n=document.createElement("div");n.classList.add("nd-popup__wrapper"),n.id="nd-popup__wrapper";var r=document.createElement("button");if(r.classList.add("nd-popup__button-close"),r.innerText="X",r.onclick=function(){$("#nd-popup__wrapper").remove(),window.removeEventListener("click",a,!0)},t)for(var o=Array.from(document.querySelectorAll(t));e.includes("{{REPLACE}}")&&o.length>0;)e=e.replace("{{REPLACE}}",o.shift().src);var i=document.createElement("template");i.innerHTML=e.trim();var c=i.content.firstChild;c.appendChild(r),n.appendChild(c),$("#nd-popup__wrapper").remove(),document.body.appendChild(n)},s=function(e,t){var n,r,o=e.parentNode,a=t.parentNode;if(o&&a&&!o.isEqualNode(t)&&!a.isEqualNode(e)){for(var i=0;i<o.children.length;i++)o.children[i].isEqualNode(e)&&(n=i);for(var c=0;c<a.children.length;c++)a.children[c].isEqualNode(t)&&(r=c);o.isEqualNode(a)&&n<r&&r++,o.insertBefore(t,o.children[n]),a.insertBefore(e,a.children[r])}},function e(t){if(window.jQuery){var r,a=T(t);try{for(a.s();!(r=a.n()).done;){var i=r.value;try{o(i)}catch(e){n.log("Couldn't apply treatment ".concat(i.id," with error ").concat(e.message)),t[i].id=-1;continue}}}catch(e){a.e(e)}finally{a.f()}}else setTimeout((function(){e(t)}),10)}(t);case 11:case"end":return e.stop()}}),e)}))),P.apply(this,arguments)}var U=function(e){return P.apply(this,arguments)},D=function(e,t){var n=new URL(window.location.href),r={n:"glov-session_id-".concat(e),u:n.href,d:n.hostname,r:document.referrer,w:window.innerWidth,c:document.cookie,wdl:window.dataLayer||[],t:Date.now(),v:"0.0.22",a:t};return new Blob([JSON.stringify(r)],{type:"application/json"})},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=new b("Adora Monitor"),n=!1,r=f,o=sessionStorage.getItem(r);o||("randomUUID"in crypto||R(),o=crypto.randomUUID(),sessionStorage.setItem(r,o)),t.log("Session ID: ".concat(o)),window.addEventListener("pagehide",(function(r){navigator.userAgent.includes("Safari")&&r.persisted&&(n||(n=!0,t.log("logging from pagehide event with sessionId: ".concat(o)),navigator.sendBeacon(s,D(o,e)))),r.persisted||n||(n=!0,t.log("logging from pagehide event with sessionId: ".concat(o)),navigator.sendBeacon(s,D(o,e)))}),{capture:!0}),setTimeout((function(){n||(n=!0,t.log("logging from timeout with sessionId: ".concat(o)),navigator.sendBeacon(s,D(o,e)))}),5e3)},F=new b("Adora Treatment Repository"),B=function(){function e(t){v(this,e);var n=t.cookiePct,r=t.requestURL,o=t.treatments;this.treatments=o,this.cookiePct=n;var a=r&&r.includes("ajax/mobile-search/loadOtherPages.php")?decodeURIComponent(new URL(r).search.replace("?originalPath=","")):new URL(r).pathname;this.path=a}var t;return y(e,[{key:"getMatchedTreatments",value:function(){var e=this,t=this.getUserSegment(),n=this.treatments.filter((function(e){return e.apply_on_user_segment==t||"*"===e.apply_on_user_segment}));if(F.log("".concat(n.length," treatments segment matched")),!n)return[];var r=n.filter((function(t){return e.hasMoveAction(t)})),o="";return r&&r.forEach((function(t){var n=t.apply_on_action,r=n.move_selector_1,a=n.move_selector_2;o+=e.getMoveScript(r,a),t.apply_on_action.value=o,t.apply_on_selector="body"})),n}},{key:"hasMoveAction",value:function(e){if(!e)throw new Error("treatment is not defined");return!1}},{key:"getUserSegment",value:function(){if(-1===this.cookiePct)throw F.info("New user has no segment"),new Error("New User");return this.cookiePct<50?"A":"B"}},{key:"getMoveScript",value:function(e,t){return"\n    // ref https://stackoverflow.com/questions/2943140/how-to-swap-html-elements-in-javascript\n    function swapNodes(n1, n2) {\n\n        var p1 = n1.parentNode;\n        var p2 = n2.parentNode;\n        var i1, i2;\n    \n        if ( !p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1) ) return;\n    \n        for (var i = 0; i < p1.children.length; i++) {\n            if (p1.children[i].isEqualNode(n1)) {\n                i1 = i;\n            }\n        }\n        for (var i = 0; i < p2.children.length; i++) {\n            if (p2.children[i].isEqualNode(n2)) {\n                i2 = i;\n            }\n        }\n    \n        if ( p1.isEqualNode(p2) && i1 < i2 ) {\n            i2++;\n        }\n        p1.insertBefore(n2, p1.children[i1]);\n        p2.insertBefore(n1, p2.children[i2]);\n    }\n    let $move_selector_1 = document.querySelector('".concat(e,"');\n    let $move_selector_2 = document.querySelector('").concat(t,"');\n    swapNodes($move_selector_1, $move_selector_2);\n    ")}}],[{key:"getTreatments",value:(t=i(u().mark((function e(){var t,n,r,o,a,i;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(F.log("Loading treatments"),t="ND_Treatments",n=JSON.parse(localStorage.getItem(t)),r=null==n?void 0:n.treatments,o=null==n?void 0:n.timestamp,r&&o){e.next=13;break}return F.log("Treatments not found in local storage"),e.next=9,E();case 9:return r=e.sent,a={timestamp:Date.now(),treatments:r},localStorage.setItem(t,JSON.stringify(a)),e.abrupt("return",r);case 13:if(!o){e.next=23;break}if(!((Date.now()-o)/864e5>7)){e.next=23;break}return F.log("Treatments are expired"),e.next=19,E();case 19:return r=e.sent,i={timestamp:Date.now(),treatments:r},localStorage.setItem(t,JSON.stringify(i)),e.abrupt("return",r);case 23:return F.log("Treatments are loaded from local storage"),e.abrupt("return",r);case 25:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})}]),e}(),V=B,J=new b("AdoraCounterChecker"),G=function(e,t){try{switch(t){case"session":return sessionStorage.getItem(e);case"local":return localStorage.getItem(e)}}catch(t){return J.log("Could not get counter ".concat(e),t),null}};function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var H=new b("AdoraDataLayerChecker"),K=function e(t){var n=0;!window.dataLayer&&n<50&&(H.log("datalayer is not found on window retrying ".concat(n," times")),setTimeout((function(){n++,e(t)}),10)),H.log("Checking rule",JSON.stringify(t));var r=t.operator,o=t.condition,a=t.value,i=Y(r);return j(i,o,a)},Y=function(e){H.log("Searching dataLayer for key",e);var t,n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?z(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}(window.dataLayer);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(Object.keys(r).includes(e))return H.log("Found key ".concat(e," with value ").concat(r[e])),r[e]}}catch(e){n.e(e)}finally{n.f()}return H.log("Key ".concat(e," not found in dataLayer")),null},Q=new b("AdoraElementChecker"),W=new b("AdoraFunctionChecker"),X=new b("AdoraSessionChecker"),Z=new b("AdoraUrlChecker");function ee(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return te(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?te(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}function te(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var ne=new b("Adora Treatment Repository"),re=function(){function e(t){v(this,e);var n=t.baseRuleSet,r=t.subVariantRuleSet,o=t.callback,a=void 0===o?null:o;this.baseRuleSet=n,this.subVariantRuleSet=r,this.callback=a}return y(e,[{key:"checkRules",value:function(){var e,t=ee(this.baseRuleSet);try{for(t.s();!(e=t.n()).done;){var n=e.value;if(!this.checkRule(n))return!1}}catch(e){t.e(e)}finally{t.f()}return!0}},{key:"checkSubVariantRules",value:function(){var e,t=ee(this.subVariantRuleSet);try{for(t.s();!(e=t.n()).done;){var n=e.value;if(this.checkRule(n))return n.subVariantId}}catch(e){t.e(e)}finally{t.f()}return!1}},{key:"checkRule",value:function(e){var t=e.chain,n=e.chain_condition,r=e.type,o=null;switch(r){case"session":o=function(e){X.log("Checking rule",JSON.stringify(e));var t=e.operator,n=e.condition,r=e.value;return"duration"===t?function(e,t){var n=(Date.now()-function(){try{return new Date(parseInt(sessionStorage.getItem(p)))}catch(e){return X.log("Could not get session timestamp",e),Date.now()}}())/1e3;return j(n,e,parseInt(t))}(n,r):null}(e);break;case"counter":o=function(e){J.log("Checking rule",JSON.stringify(e));var t=e.operator,n=e.condition,r=e.value;switch(t){case"pageView":return function(e,t){var n=G(d,"session");return J.log("Page views counter value: ",n),!!n&&j(n,e,t)}(n,r);case"CABasketPrice":return function(e,t){var n=G(g,"local");return J.log("Coupon applicable basket price counter value: ",n),!!n&&j(n,e,t)}(n,r);default:return J.log("No such operator",t),!1}}(e);break;case"element":o=function(e){Q.log("Checking rule",JSON.stringify(e));var t,n=e.operator,r=e.condition,o=e.value,a=e.selector,i=e.selectorAll;if(null===n)return j(document.querySelector(a),r,o);if(a&&!document.querySelector(a))return Q.log("Selector not found on page"),!1;if(i&&!document.querySelectorAll(i))return Q.log("Selector not found on page"),!1;if(a?t=document.querySelector(a):i&&(t=Array.from(document.querySelectorAll(i))),"text-number"===n){var c;c=Array.isArray(t)?t.reduce((function(e,t){return e+parseInt(t.textContent.replace("TL","").replace(".",""))}),0):parseInt(document.querySelector(a).textContent.replace("TL","").replace(".",""));var u=parseInt(c);return j(u,r,o)}return Q.log("Operator not defined"),!1}(e);break;case"dataLayer":o=K(e);break;case"url":o=function(e){Z.log("Checking rule",JSON.stringify(e));var t=e.operator,n=e.condition,r=e.value;if("path"===t){var o=window.location.href,a=o.includes("ajax/mobile-search/loadOtherPages.php")?decodeURIComponent(new URL(o).search.replace("?originalPath=","")):new URL(o).pathname;return Z.log("Checking path ".concat(a," matches rule path ").concat(r)),j(a,n,r)}}(e);break;case"function":o=function(e){W.log("Checking rule",JSON.stringify(e));var t=e.operator,n=e.condition,r=e.value;if(!t)return W.log("Rule function not defined"),!1;var o=Function(t)();return j(o,n,r)}(e);break;default:ne.log("No such rule type: ".concat(r))}if(t)switch(n){case"and":o=o&&this.checkRule(t);break;case"or":o=o||this.checkRule(t);break;case"xor":o=o!=this.checkRule(t);break;default:ne.log("No such chain condition")}return o}}]),e}();function oe(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return ae(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ae(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}function ae(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var ie={subtree:!0,childList:!0};i(u().mark((function e(){var t,n,a,c,s,f,v,m,y,w,k,S,x,E,I,L,j,R,T,q;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new b).log("Adora initiated"),n=window.matchMedia(l).matches,[Object,Object.prototype,Function,Function.prototype,Array,Array.prototype,String,String.prototype,Number,Number.prototype,Boolean,Boolean.prototype].forEach(Object.freeze),N(),a=function(){if(!document.documentElement.classList.contains("adora-hide")){var e=document.createElement("style");e.textContent=".adora-hide { opacity: 0 !important }",document.documentElement.appendChild(e),document.documentElement.classList.add("adora-hide")}},void 0,void 0,void 0,void 0,void 0,void 0,P=d,D=h,F=p,$=sessionStorage.getItem(P),B=sessionStorage.getItem(F),J=sessionStorage.getItem(D),$?sessionStorage.setItem(P,parseInt($)+1):sessionStorage.setItem(P,1),B||sessionStorage.setItem(F,Date.now()),null===J&&sessionStorage.setItem(D,0),c=V.getTreatments(),a(),setTimeout((function(){A()}),2e3),s=function(){var e=i(u().mark((function e(r,o){var a,i,c,s,l,f,d;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.actions,i=r.baseRuleSet,c=r.device,s=r.subVariantRuleSet,"mobile"!==c||n){e.next=3;break}return e.abrupt("return");case 3:if("desktop"!==c||!n){e.next=5;break}return e.abrupt("return");case 5:if(l=new re({baseRuleSet:i,subVariantRuleSet:s}),t.log("Starting base rule set check for treatment: "+r.id),i&&!l.checkRules()){e.next=18;break}if(s){e.next=12;break}return U(a),o.push({treatmentId:r.id,subVariantId:null,actions:a}),e.abrupt("return");case 12:t.log("Starting sub variant rule set check for treatment: "+r.id),f=l.checkSubVariantRules(),d=a,f&&(t.log("Applying sub variant with id: ",f),d=O(a,f)),U(d),o.push({treatmentId:r.id,subVariantId:f,actions:d});case 18:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),window.location.href.includes("/siparis-listesi.html")?(f=Array.from(document.querySelectorAll(".price")),t.log("Price elements: ",f),f&&(v=f.reduce((function(e,t){return e+parseInt(t.textContent.replace("TL","").replace(".",""))}),0),t.log("Coupon applicable total price: ",v),v&&window.localStorage.setItem(g,v))):window.location.href.includes("/siparis-ozeti.html")&&window.localStorage.removeItem(g),e.prev=12,m=C(document.cookie,"_ga"),t.log("Found cookie identifier: ",m),e.next=17,Promise.all([c,_(m)]);case 17:if(y=e.sent,w=o(y,2),k=w[0],S=w[1],t.log("Found treatments: ",k),t.log("Found cookie percentage: ",S),t.log("Split_ratio: ",1),t.log("cookiePct < SPLIT_RATIO",S<1),!(S<1)){e.next=27;break}throw new Error("Control group: no treatments applied");case 27:if(x=new V({treatments:k,requestURL:window.location.href,cookiePct:S}),(E=x.getMatchedTreatments()).length){e.next=33;break}return A(),M(),e.abrupt("return");case 33:I=[],L=oe(E),e.prev=35,L.s();case 37:if((j=L.n()).done){e.next=49;break}return R=j.value,e.prev=39,e.next=42,s(R,I);case 42:e.next=47;break;case 44:e.prev=44,e.t0=e.catch(39),t.log("Error executing rules",e.t0);case 47:e.next=37;break;case 49:e.next=54;break;case 51:e.prev=51,e.t1=e.catch(35),L.e(e.t1);case 54:return e.prev=54,L.f(),e.finish(54);case 57:A(),M(I),T=new MutationObserver((function(e){var n,o=oe(e);try{for(o.s();!(n=o.n()).done;){var a=n.value;if(a.addedNodes&&a.addedNodes.length>0){t.log("New element nodes added detected");var i,c=oe(a.addedNodes);try{for(c.s();!(i=c.n()).done;){var u=i.value;if(1!==u.nodeType&&(!u.classList||!u.classList.contains("nd-popup__wrapper")&&!u.classList.contains("nd-banner"))){var l=void 0;l=u.parentNode&&u.parentNode!==document.body?u.parentNode:u;var f,d=oe(E);try{for(d.s();!(f=d.n()).done;){var p,h=f.value,g=h.baseRuleSet,v=void 0===g?[]:g,m=h.subVariantRuleSet,y=void 0===m?[]:m,w=h.id,b=oe([].concat(r(v),r(y)).map((function(e){return e.selector?e.selector:e.selectorAll?e.selectorAll:null})));try{for(b.s();!(p=b.n()).done;){var k=p.value;l.querySelectorAll(k).length>0&&(t.log("Selector ".concat(k," found under new node ").concat(u)),t.log("Re applying treatment: ",w),s(h))}}catch(e){b.e(e)}finally{b.f()}}}catch(e){d.e(e)}finally{d.f()}}}}catch(e){c.e(e)}finally{c.f()}}}}catch(e){o.e(e)}finally{o.f()}})),(q=document.querySelector("div.shortcut_column.basket_wrapper.my-cart"))&&(t.log("Starting mutation observer"),T.observe(q,ie)),e.next=68;break;case 64:e.prev=64,e.t2=e.catch(12),A(),t.log(e.t2.message);case 68:case"end":return e.stop()}var P,D,F,$,B,J}),e,null,[[12,64],[35,51,54,57],[39,44]])})))()}()}();
