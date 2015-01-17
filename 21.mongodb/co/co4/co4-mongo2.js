var mongodb = require('mongodb'),
    mongodb = require('mongo-q')(mongodb);

var MongoClient = mongodb.MongoClient
  , assert = require('assert');

var co = require('co');
var thunkify  = require('thunkify')


// Connection URL
var url = 'mongodb://localhost/test';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
    // findDocuments(db, function() {
    //   db.close();
    // });


    //mongodeb callback isn't standard .callback :function(list){} ,not function(err,list){}
    co(function *(){
      // var p = yield thunkify(findDocuments)(db);
      var p =  yield findDocumentsQ(db);
      // console.log(p);
      return p;
    }).then(function (list){
      console.log(list.length);
      db.close();
    },function (err){
      console.log('err',err); // executed
      db.close();
    })


});


findDocumentsQ = function (db){
  // var collection = db.collection('cats');
    // Find some documents
  // var p = collection.find({}).toArrayQ();
  //
  // only es promise is ok
  // var p = new Promise(function (resolve,reject){
  //   collection.find({}).toArrayQ().then(function (list){
  //     resolve(list);
  //   })
  // });

  var p = require('q').defer();
  setTimeout(function (){
    // console.log('timeout');
    p.resolve('ok')
  }, 10);
  return p.promise;
  // return p;
}


var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('cats');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    // console.log(docs)
    callback(docs);
  });
}