var co = require('co');
var thunkify = require('thunkify');
var request = require('request');
var get = thunkify(request.get);


// Error handling

co(function *(){
  try {
    var res = yield get('http://badhost.invalid');
    console.log(res);
  } catch(e) {
    console.log(e.code) // ENOTFOUND
 }
})()