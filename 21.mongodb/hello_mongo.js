var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('yay!');
});

var catSchema = mongoose.Schema({
    name: String
})

var Cat = mongoose.model('Cat', catSchema);

var kitty = new Cat({ name: 'houfeng' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});

Cat.find(function (err,cats){
  if(err) return console.log(err);
  console.log(cats);

  db.close();
})
