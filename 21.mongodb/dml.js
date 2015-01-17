var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
// mongoose.connect('mongodb://root:root@localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



var catSchema = mongoose.Schema({
    name: String
})
mongoose.model('Cat', catSchema);

db.once('open', function callback () {
  console.log('yay!');
  // mongoose.connection.collections.cats.drop()
  // or 通过  var Cat = mongoose.model('Cat') 获取定义的 model
  var Cat = mongoose.model('Cat')
  Cat.collection.drop()

  db.close();
});




// !!!!!!!!!!!!!!!!!!!

// 不需要 services，使用 mongo  model method/statics 扩展方法
