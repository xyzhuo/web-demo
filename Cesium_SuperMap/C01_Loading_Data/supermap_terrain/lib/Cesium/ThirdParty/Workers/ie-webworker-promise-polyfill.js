/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */
define([],function(){function c(t){return"function"==typeof t}var n=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},r=0,e=void 0,o=void 0,u=function(t,e){h[r]=t,h[r+1]=e,2===(r+=2)&&(o?o(v):m())};var t="undefined"!=typeof window?window:void 0,i=t||{},s=i.MutationObserver||i.WebKitMutationObserver,a="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),f="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function l(){var t=setTimeout;return function(){return t(v,1)}}var h=new Array(1e3);function v(){for(var t=0;t<r;t+=2){(0,h[t])(h[t+1]),h[t]=void 0,h[t+1]=void 0}r=0}var p,_,d,y,m=void 0;function b(t,e){var n=this,r=new this.constructor(A);void 0===r[g]&&q(r);var o=n._state;if(o){var i=arguments[o-1];u(function(){return Y(o,r,i,n._result)})}else x(n,r,t,e);return r}function w(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(A);return M(e,t),e}m=a?function(){return process.nextTick(v)}:s?(_=0,d=new s(v),y=document.createTextNode(""),d.observe(y,{characterData:!0}),function(){y.data=_=++_%2}):f?((p=new MessageChannel).port1.onmessage=v,function(){return p.port2.postMessage(0)}):void 0===t&&"function"==typeof require?function(){try{var t=Function("return this")().require("vertx");return void 0!==(e=t.runOnLoop||t.runOnContext)?function(){e(v)}:l()}catch(t){return l()}}():l();var g=Math.random().toString(36).substring(2);function A(){}var j=void 0,S=1,E=2;function T(t,e,n){var r,o,i,s;e.constructor===t.constructor&&n===b&&e.constructor.resolve===w?(i=t,(s=e)._state===S?O(i,s._result):s._state===E?P(i,s._result):x(s,void 0,function(t){return M(i,t)},function(t){return P(i,t)})):void 0===n?O(t,e):c(n)?(r=e,o=n,u(function(e){var n=!1,t=function(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}(o,r,function(t){n||(n=!0,r!==t?M(e,t):O(e,t))},function(t){n||(n=!0,P(e,t))},e._label);!n&&t&&(n=!0,P(e,t))},t)):O(t,e)}function M(e,t){if(e===t)P(e,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(r=t),null===r||"object"!==o&&"function"!==o)O(e,t);else{var n=void 0;try{n=t.then}catch(t){return void P(e,t)}T(e,t,n)}var r,o}function C(t){t._onerror&&t._onerror(t._result),F(t)}function O(t,e){t._state===j&&(t._result=e,t._state=S,0!==t._subscribers.length&&u(F,t))}function P(t,e){t._state===j&&(t._state=E,t._result=e,u(C,t))}function x(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+S]=n,o[i+E]=r,0===i&&t._state&&u(F,t)}function F(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?Y(n,r,o,i):o(i);t._subscribers.length=0}}function Y(t,e,n,r){var o=c(n),i=void 0,s=void 0,u=!0;if(o){try{i=n(r)}catch(t){u=!1,s=t}if(e===i)return void P(e,new TypeError("A promises callback cannot return that same promise."))}else i=r;e._state!==j||(o&&u?M(e,i):!1===u?P(e,s):t===S?O(e,i):t===E&&P(e,i))}var k=0;function q(t){t[g]=k++,t._state=void 0,t._result=void 0,t._subscribers=[]}var D=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(A),this.promise[g]||q(this.promise),n(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?O(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&O(this.promise,this._result))):P(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;this._state===j&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(e,t){var n=this._instanceConstructor,r=n.resolve;if(r===w){var o=void 0,i=void 0,s=!1;try{o=e.then}catch(t){s=!0,i=t}if(o===b&&e._state!==j)this._settledAt(e._state,t,e._result);else if("function"!=typeof o)this._remaining--,this._result[t]=e;else if(n===K){var u=new n(A);s?P(u,i):T(u,e,o),this._willSettleAt(u,t)}else this._willSettleAt(new n(function(t){return t(e)}),t)}else this._willSettleAt(r(e),t)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===j&&(this._remaining--,t===E?P(r,n):this._result[e]=n),0===this._remaining&&O(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;x(t,void 0,function(t){return n._settledAt(S,e,t)},function(t){return n._settledAt(E,e,t)})},t}();var K=function(){function e(t){this[g]=k++,this._result=this._state=void 0,this._subscribers=[],A!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(e,t){try{t(function(t){M(e,t)},function(t){P(e,t)})}catch(t){P(e,t)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype.catch=function(t){return this.then(null,t)},e.prototype.finally=function(e){var n=this.constructor;return c(e)?this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){throw t})}):this.then(e,e)},e}();return K.prototype.then=b,K.all=function(t){return new D(this,t).promise},K.race=function(o){var i=this;return n(o)?new i(function(t,e){for(var n=o.length,r=0;r<n;r++)i.resolve(o[r]).then(t,e)}):new i(function(t,e){return e(new TypeError("You must pass an array to race."))})},K.resolve=w,K.reject=function(t){var e=new this(A);return P(e,t),e},K._setScheduler=function(t){o=t},K._setAsap=function(t){u=t},K._asap=u,K.polyfill=function(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=K},K.Promise=K});