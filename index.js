var sysPath  = require('path');

function ES6ModuleTranspiler(config) {
  var es6Cfg = (config != null && config.plugins != null && config.plugins.es6ModuleTranspiler);

  this.match = new RegExp((es6Cfg && es6Cfg.match) || /.*/);
  this.wrapper = es6Cfg && es6Cfg.wrapper && ('to' + es6Cfg.wrapper.toUpperCase()) || 'toAMD';
  this.moduleName = es6Cfg && es6Cfg.moduleName;
  this.options = es6Cfg && es6Cfg.options || undefined;
}

ES6ModuleTranspiler.prototype.brunchPlugin = true;
ES6ModuleTranspiler.prototype.type = 'javascript';
ES6ModuleTranspiler.prototype.extension = 'js';
ES6ModuleTranspiler.prototype.transpiler = require('es6-module-transpiler').Compiler;
ES6ModuleTranspiler.prototype.compile = function(data, path, callback) {
  if (this.match.test(path)) {
    var ext, name;

    ext = sysPath.extname(path);
    name = sysPath.join(sysPath.dirname(path), sysPath.basename(path, ext)).replace(/[\\]/g, '/');
    if (this.moduleName) name = this.moduleName(name);
    try {
      return callback(null, { data: new this.transpiler(data, name, this.options)[this.wrapper]() });
    } catch (e) {
      return callback(e.toString());
    }
  } else {
    return callback(null, { data: data });
  }
};

module.exports = ES6ModuleTranspiler;
