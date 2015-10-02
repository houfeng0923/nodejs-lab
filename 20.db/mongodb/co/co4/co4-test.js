var co = require('co');
var thunkify  = require('thunkify')
var fs = require('fs');

function sleep(ms){
  return function (fn){
    setTimeout(function (){
      fn();
    }, ms)
  }
}

co(function *(){
  // yield sleep(1000);
  // var p = yield new Promise(function (resolve,reject){
  //   sleep(2000)(function (){
  //     resolve('ok')

  //   })
  // });
  // console.log(p);
  // return p;

  var p = require('q').defer();
  setTimeout(function (){
    p.resolve('ok')
  }, 100)
  var r = yield p.promise
  // console.log(r);
  return p.promise

  // var Promise = require('mpromise');
  // var p = new Promise();
  // setTimeout(function (){
  //   p.fulfill('ok');
  // }, 1000);
  // var r = yield p;
  // return p
})
.then(function (r){
  console.log('then',r);
})

console.log('over');






  // function testPromise () {
  //   var Q = require('q');
  //   var p = Q.defer();
  //   setTimeout(function (){
  //     // console.log('time out');
  //     p.resolve('ok');
  //   }, 1000)
  //   return p.promise; // ok

  // }
  // fn = co.wrap(function *(){
  //   p = yield testPromise();
  //   return p;
  // })

  // fn().then(function (cat){
  //   console.log('then',cat);
  // },function (err){
  //   console.log(err);
  // })
