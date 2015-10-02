var co = require('co');
var thunkify  = require('thunkify')
var mongoose = require('mongoose');
mongoose = require('mongoose-q')();

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var catSchema = mongoose.Schema({
    name: String
})
mongoose.model('Cat', catSchema);



var Cat = mongoose.model('Cat')




  // co v4
  var a = [];

  console.log('start');
  a.push('... ');
  // setTimeout(function (){
  //   console.log(a);
  // },3000)



  function test(){ // not ok
    var pp = require('Q').defer();
    Cat.find().execQ().then(function (list){
    // setTimeout(function(){
      pp.resolve(arguments);
    })
    return pp.promise;
  }

  // test = function (){ // ok
  //   return new Promise(function (resolve,reject){
  //     Cat.find().execQ().then(function (list){
  //       resolve(list);
  //     },function (err){
  //       reject(err)
  //     });
  //   })
  // }

  // test = function (){ // not ok
  //   return require('Q').Promise(function (resolve,reject){

  //     Cat.find().exec().then(function (list){
  //       resolve(list)
  //     })
  //   })
  // }



  // var fn = co.wrap(function *(){
  //   // Cat.create2 = thunkify(Cat.create);
  //   // var newCat = yield Cat.create2({name:'co-wawa22'}); // ok

  //   // var newCat = yield Cat.find().exec(); // not ok!
  //   // var newCat = yield Cat.find().execQ(); // not ok!
  //   var newCat = yield test();
  //   // console.log(newCat);
  //   // 即 mongoose 或 mongoose-q 的 promise 不支持？
  //   //
  //   // a.push('co ');
  //   return newCat;
  // });


  // fn = co.wrap(function *(){
  //    var Promise = require('mpromise');
  //    var p = new Promise();
  //    setTimeout(function (){
  //     p.fulfill('sdfsf'); // not resolve

  //    }, 100)
  //    return  yield p; //    yield p  isn't ok ;
  // })





  // ok

  // fn = co.wrap(function *(){
  //   var mpromise = Cat.create({'name':'co-test2'});
  //   var esPromise = yield new Promise(function (resolve,reject){
  //     mpromise.then(function (){
  //       resolve('success');
  //     },function (){
  //       reject('error');
  //     })
  //   });
  //   return esPromise;
  // });



  function testPromise () {
    var Q = require('q');
    var p = Q.defer();
    setTimeout(function (){
      // console.log('time out');
      p.resolve('ok');
    }, 100)
    return p.promise; // ok

    // var Q = require('q'); // is ok
    // var p = Q.Promise(function (resolve,reject){
    // var p = new Promise(function (resolve,reject){
    //   console.log('p run....');
    //   setTimeout(function (){
    //     console.log('set time out ....');
    //     resolve('ok')
    //   }, 1000)
    // });
    // console.dir(p);
    // return p;
  }
  fn = co.wrap(function *(){
    p = yield testPromise();
    //
    // console.log('after promise'); // run after testPromise fulfilled !
    return p;
  })




  fn().then(function (cat){
    // a.push('then ');
    // console.log(a);
    console.log('then',cat);
    db.close();
  },function (err){
    // a.push('err ');
    console.log(err);
    db.close();
  })
