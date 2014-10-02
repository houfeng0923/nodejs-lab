var co = require('co');


// yield GeneratorObject

function *testReturn(ms){
  // sleep 串行
  var data =  [
    yield sleep(ms),
    yield sleep(ms),
    yield sleep(ms),
    yield sleep(ms),
    3
  ];
  return data;
};

co(function *(){
  var data = yield testReturn(100);
  console.log(data);
})();




// helper

function sleep (ms) {
  return function (fn){
    console.log('sleep ',ms);
    setTimeout(function (){
      fn(null,ms);
    }, ms);
  }
}

