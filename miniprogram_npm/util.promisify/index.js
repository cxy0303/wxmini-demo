module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1570762043945, function(require, module, exports) {


var define = require('define-properties');
var util = require('util');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var polyfill = getPolyfill();
var shim = require('./shim');

/* eslint-disable no-unused-vars */
var boundPromisify = function promisify(orig) {
/* eslint-enable no-unused-vars */
	return polyfill.apply(util, arguments);
};
define(boundPromisify, {
	custom: polyfill.custom,
	customPromisifyArgs: polyfill.customPromisifyArgs,
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundPromisify;

}, function(modId) {var map = {"./implementation":1570762043946,"./polyfill":1570762043947,"./shim":1570762043948}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043946, function(require, module, exports) {


var isES5 = typeof Object.defineProperty === 'function'
	&& typeof Object.defineProperties === 'function'
	&& typeof Object.getPrototypeOf === 'function'
	&& typeof Object.setPrototypeOf === 'function';

if (!isES5) {
	throw new TypeError('util.promisify requires a true ES5 environment');
}

var getOwnPropertyDescriptors = require('object.getownpropertydescriptors');

if (typeof Promise !== 'function') {
	throw new TypeError('`Promise` must be globally available for util.promisify to work.');
}

var slice = Function.call.bind(Array.prototype.slice);
var concat = Function.call.bind(Array.prototype.concat);
var forEach = Function.call.bind(Array.prototype.forEach);

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';

var kCustomPromisifiedSymbol = hasSymbols ? Symbol('util.promisify.custom') : null;
var kCustomPromisifyArgsSymbol = hasSymbols ? Symbol('customPromisifyArgs') : null;

module.exports = function promisify(orig) {
	if (typeof orig !== 'function') {
		var error = new TypeError('The "original" argument must be of type function');
		error.name = 'TypeError [ERR_INVALID_ARG_TYPE]';
		error.code = 'ERR_INVALID_ARG_TYPE';
		throw error;
	}

	if (hasSymbols && orig[kCustomPromisifiedSymbol]) {
		var customFunction = orig[kCustomPromisifiedSymbol];
		if (typeof customFunction !== 'function') {
			throw new TypeError('The [util.promisify.custom] property must be a function');
		}
		Object.defineProperty(customFunction, kCustomPromisifiedSymbol, {
			configurable: true,
			enumerable: false,
			value: customFunction,
			writable: false
		});
		return customFunction;
	}

	// Names to create an object from in case the callback receives multiple
	// arguments, e.g. ['stdout', 'stderr'] for child_process.exec.
	var argumentNames = orig[kCustomPromisifyArgsSymbol];

	var promisified = function fn() {
		var args = slice(arguments);
		var self = this; // eslint-disable-line no-invalid-this
		return new Promise(function (resolve, reject) {
			orig.apply(self, concat(args, function (err) {
				var values = arguments.length > 1 ? slice(arguments, 1) : [];
				if (err) {
					reject(err);
				} else if (typeof argumentNames !== 'undefined' && values.length > 1) {
					var obj = {};
					forEach(argumentNames, function (name, index) {
						obj[name] = values[index];
					});
					resolve(obj);
				} else {
					resolve(values[0]);
				}
			}));
		});
	};

	Object.setPrototypeOf(promisified, Object.getPrototypeOf(orig));

	Object.defineProperty(promisified, kCustomPromisifiedSymbol, {
		configurable: true,
		enumerable: false,
		value: promisified,
		writable: false
	});
	return Object.defineProperties(promisified, getOwnPropertyDescriptors(orig));
};

module.exports.custom = kCustomPromisifiedSymbol;
module.exports.customPromisifyArgs = kCustomPromisifyArgsSymbol;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043947, function(require, module, exports) {


var util = require('util');
var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (typeof util.promisify === 'function') {
		return util.promisify;
	}
	return implementation;
};

}, function(modId) { var map = {"./implementation":1570762043946}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043948, function(require, module, exports) {


var util = require('util');
var getPolyfill = require('./polyfill');

module.exports = function shimUtilPromisify() {
	var polyfill = getPolyfill();
	if (polyfill !== util.promisify) {
		util.promisify = polyfill;
		Object.defineProperty(util, 'promisify', { value: polyfill });
	}
	return polyfill;
};

}, function(modId) { var map = {"./polyfill":1570762043947}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1570762043945);
})()
//# sourceMappingURL=index.js.map