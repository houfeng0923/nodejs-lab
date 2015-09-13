
var async = require('async')

var count = 0;

async.until(function(){
	return count>10
}, function(next){
	setTimeout(function(){
		console.log(count++);
		next();
	}, 500)
}, function(err,results){
	console.log(results);//null
})

// whilst doWhilst  doUntil 

/*
此外，还有  
forever   
waterfall 		逐步骤传参
compose 		f(),g(),h()  f(g(h()))
seq 			序列
applyEach
applyEachSeries
queue
priorityQueue
cargo
auto
retry
iterator
apply
nextTick
times
timesSeries
*/