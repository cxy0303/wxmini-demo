module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1570758701209, function(require, module, exports) {
var co = require('co')

exports = module.exports = deferImmediate
exports.defer =
exports.immediate =
exports.setImmediate = deferImmediate

function createCallback(ctx, gen, cb) {
  return function () {
    cb = cb || error
    co.call(ctx, gen).then(function () {
      cb()
    }, cb)
  }
}

function deferImmediate(gen, cb) {
  return setImmediate(createCallback(this, gen, cb))
}

exports.nextTick = function deferNextTick(gen, cb) {
  return process.nextTick(createCallback(this, gen, cb))
}

exports.timeout =
exports.setTimeout = function deferTimeout(gen, timeout, cb) {
  return setTimeout(createCallback(this, gen, cb), timeout)
}

exports.interval =
exports.setInterval = function deferInterval(gen, timeout, cb) {
  return setInterval(createCallback(this, gen, cb), timeout)
}

function error(err) {
  if (err) throw err
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1570758701209);
})()
//# sourceMappingURL=index.js.map