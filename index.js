'use strict';
const path = require('path');
const XTemplate = require('xtemplate');

function getFunctionName(name) {
  return name.replace(/-(.)/g, function (m, m1) {
    return m1.toUpperCase();
  });
}

module.exports = function(content, map) {
  const filepath = this.resource;
	this.cacheable && this.cacheable();
  let name = path.basename(filepath);
  name = name.replace(path.extname(name), '');
  var functionName = getFunctionName(name);
  var compiledFunc = XTemplate.Compiler.compileToStr({
    name: filepath,
    isModule: 1,
    functionName,
    content: content
  });
	return "module.exports = " + compiledFunc.toString();
}
