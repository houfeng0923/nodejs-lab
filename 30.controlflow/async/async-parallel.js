


var async = require('async')
var tasks = [
  function(cb){
    setTimeout(function(){
      cb(null,'first')
    }, 2000)
  },
  function(cb){
    setTimeout(function(){
      cb(null,'second')
    }, 1000)
  }
];
async.parallel(tasks, function(err,results){
  console.log(results);
})
/*
async.parallelLimit(tasks, 1,function(err,results){
  console.log(results);
})
*/
