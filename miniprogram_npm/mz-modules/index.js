module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1570762043795, function(require, module, exports) {


module.exports = {
  mkdirp: require('./mkdirp'),
  rimraf: require('./rimraf'),
  glob: require('./glob'),
  sleep: require('./sleep'),
  nextTick: require('./nextTick'),
  setImmediate: require('./setImmediate'),
  pump: require('./pump'),
};

}, function(modId) {var map = {"./mkdirp":1570762043796,"./rimraf":1570762043798,"./glob":1570762043799,"./sleep":1570762043800,"./nextTick":1570762043801,"./setImmediate":1570762043802,"./pump":1570762043803}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043796, function(require, module, exports) {


const mkdirp = require('mkdirp');
const wrap = require('./lib/wrap');

module.exports = wrap(mkdirp);

}, function(modId) { var map = {"mkdirp":1570762043796,"./lib/wrap":1570762043797}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043797, function(require, module, exports) {


module.exports = mod => {
  const wrapped = (args1, args2, args3, args4) => {
    // arrow function can't bind arguments, and can't use rest in node@4, sign
    const args = [ args1, args2, args3, args4 ];
    for (let i = args.length - 1; i >= 0; i--) {
      if (args[i] !== undefined) break;
      args.pop();
    }

    return new Promise((resolve, reject) => {
      args.push(function mZmodulesWrapCallback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      mod.apply(null, args);
    });
  };

  for (const key in mod) {
    wrapped[key] = mod[key];
  }

  return wrapped;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043798, function(require, module, exports) {


const rimraf = require('rimraf');
const wrap = require('./lib/wrap');

module.exports = wrap(rimraf);

}, function(modId) { var map = {"rimraf":1570762043798,"./lib/wrap":1570762043797}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043799, function(require, module, exports) {


const glob = require('glob');
const wrap = require('./lib/wrap');

module.exports = wrap(glob);

}, function(modId) { var map = {"glob":1570762043799,"./lib/wrap":1570762043797}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043800, function(require, module, exports) {


module.exports = require('ko-sleep');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043801, function(require, module, exports) {


module.exports = () => Promise.resolve();

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043802, function(require, module, exports) {


module.exports = () => new Promise(resolve => setImmediate(resolve));

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1570762043803, function(require, module, exports) {


const pump = require('pump');
const wrap = require('./lib/wrap');

module.exports = wrap(pump);

}, function(modId) { var map = {"pump":1570762043803,"./lib/wrap":1570762043797}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1570762043795);
})()
//# sourceMappingURL=index.js.map