
var co = require('co');
var fs = require('co-fs');



co(function *(){
  var a = yield fs.readFile('README.md','utf8');
  var b = yield fs.readFile('01.fs.js','utf8');
  var c = yield fs.readFile('package.json','utf8');
  console.log(a);
  console.log(b);
  console.log(c);
})()
