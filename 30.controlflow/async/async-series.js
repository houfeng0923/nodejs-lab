
// async 可运行于node & brower

// 主要关注 control flow
// 特点：task类函数 最后参数为 callback

var async = require('async')

// series([fun1,fun2],cb);
// series({step1:fun1,step2:fun2},cb)
async.series([
	function(cb){
		setTimeout(function(){
			cb(null,'ready')
		}, 1100)
	},
	function(cb){
		cb(null,'fight')
	},
	function(cb){
		cb(null,'win')
	}
],function(err,results){
	console.log(results);
})

