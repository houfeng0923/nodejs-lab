var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
// mongoose.connect('mongodb://root:root@localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('yay!');
});

var catSchema = mongoose.Schema({
    name: String
})
/**
 * Validations
 */

catSchema.path('name').required(true, 'cate name cannot be blank');


/**
 * Pre-remove hook
 */

catSchema.pre('remove', function (next) {
  // remove related data
  next();
});


// helper methods
catSchema.methods = {}

// modelService api
catSchema.statics = {}









var Cat = mongoose.model('Cat', catSchema);
var kitty = new Cat({ name: 'houfeng' });
console.log(kitty);
console.log(kitty.id);
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});

Cat.find(function (err,cats){
  if(err) return console.log(err);
  console.log(cats);
  // console.log(cats[0].id); // ok
  // cats.forEach(function (cat){
  //  var c =  new Cat(cat)
  //  console.log(c.id);
  // })
  db.close();
})





/*
可以直接 使用 对象的 id 属性。 http://mongoosejs.com/docs/guide.html#id

*/
