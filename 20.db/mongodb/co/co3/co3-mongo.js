var co = require('co');
var thunkify  = require('thunkify')
var mongoose = require('mongoose');

// mongoose = require('mongoose-q')();

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var catSchema = mongoose.Schema({
    name: String
})
mongoose.model('Cat', catSchema);



var Cat = mongoose.model('Cat')

// var c1 = new Cat({name:'wawwa'});
// c1.save(function (err,cat){
//   if(err) console.error(err);
//   else console.log('saved:',cat);
// });

// db.once('open', function callback () {
//   console.log('yay!');
// });


 // Cat.create({name:'co-wawa22'},function (err,resp){
 //  console.log(err,resp);
 // });



// return promise

// Cat.create({name:'co-wawa22'}).then(function (resp){
//   console.log(resp);
// })



// co3 支持 promise like  ok

co(function *(){
  var newCat = yield  Cat.create({name:'co-wawa22'}); // yield promise
  console.log(newCat);
  // return newCat;
  db.close();
  // mongoose-q test
  // var newCat = yield  Cat.createQ({name:'co-wawa22'}); // yield promise
})()



// ok
//
// Cat.create2 = thunkify(Cat.create);
// Cat.create2({name:'co-wawa22'})(function (err,resp){
//   console.log(err,resp);
// })



// thunkify ok
//
// co(function *(){
//   Cat.create2 = thunkify(Cat.create);
//   var newCat = yield Cat.create2({name:'co-wawa22'});
//   console.log(newCat);
//   // return newCat;
//   db.close();
// })()







