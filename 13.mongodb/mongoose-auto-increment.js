var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/test');
autoIncrement.initialize(mongoose.connection);


var catSchema = mongoose.Schema({
    name: String
})

catSchema.plugin(autoIncrement.plugin, {
    model: 'Cat',
    // field: 'name',
    startAt: 100
});

var Cat = mongoose.model('Cat', catSchema);


var kitty = new Cat({ name: 'hello kitty' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
