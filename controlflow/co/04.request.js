var co = require('co');
var thunkify = require('thunkify');
var request = require('request');
var get = thunkify(request.get);

// request.get('http://www.baidu.com',function (err,response,body){ })


co(function *(){
  var a = yield get('http://www.baidu.com');
  // var b = yield get('http://www.alibaba.com');
  // var c = yield get('http://www.qq.com');
  console.log(a[0].statusCode); // console.log(a[1]);
  // console.log(b[0].statusCode);
  // console.log(c[0].statusCode);
})()


// co(function *(){
//   var a = get('http://www.baidu.com');
//   var b = get('http://www.alibaba.com');
//   var c = get('http://www.qq.com');
//   var res = yield [a, b, c];
//   console.log(res);
// })()
