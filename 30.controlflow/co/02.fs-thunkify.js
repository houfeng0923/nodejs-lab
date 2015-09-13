
var co = require('co');
var fs = require('fs');
var thunkify = require('thunkify');

var read  = thunkify(fs.readFile);


co(function *(){
  var a = yield read('README.md','utf8');
  var b = yield read('01.fs.js','utf8');
  var c = yield read('package.json','utf8');
  console.log(a);
  console.log(b);
  console.log(c);
})()


// thunkify 功能：将异步方法的配置和实际执行分离