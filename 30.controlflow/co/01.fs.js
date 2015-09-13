
var co = require('co');
var fs = require('fs');

function read(file) {
  return function(fn){
    fs.readFile(file, 'utf8', fn);
  }
}

co(function *(){
  var a = yield read('README.md');
  var b = yield read('01.fs.js');
  var c = yield read('package.json');
  console.log(a);
  console.log(b);
  console.log(c);
})()
