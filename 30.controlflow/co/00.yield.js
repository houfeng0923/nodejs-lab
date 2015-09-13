var co = require('co');

// yield fun(fn)


// yield object
// 使用上与 array 同理
co(function *(){
  var user = yield {
    name : 'hou',
    test : sleep(1000)
  };
  // equivalent
  /*var user = {
    name : 'hou',
    test : yield sleep(1000)
  };*/
  console.log(user);
})();





// yield array

co(function *(ms){
  // sleep 并发
  var data = yield [
    sleep(ms),
    sleep(ms),
    sleep(ms),
    sleep(ms),
    3
  ];
  console.log(data); // [ 1000, 1000, 1000, 1000, 3 ]
})(1000,function done(){
  console.log('finished');
});



co(function *(ms){
  // sleep 串行
  var data =  [
    yield sleep(ms),
    yield sleep(ms),
    yield sleep(ms),
    yield sleep(ms),
    3
  ];
  console.log(data); // [ 500, 500, 500, 500, 3 ]
})(500);






// helper

function sleep (ms) {
  return function (fn){
    console.log('sleep ',ms);
    setTimeout(function (){
      fn(null,ms);
    }, ms);
  }
}
