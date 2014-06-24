var fs = require('fs'),
	path = require('path'),
	async = require('async');

module.exports = function(dir,cb){

	async.waterfall([
		async.apply(fs.readdir,dir),
		function(files,next){
			var paths = files.map(function(file){
				return path.join(dir,file);
			});
			async.map(paths,fs.stat,function(err,states){
				next(err,states,files);
			});
		},
		function(states,files,next){
			var largestState = 
			states.filter(function(state){
				return state.isFile();
			}).reduce(function(prev,next){
				return prev.size > next.size ? prev : next ;
			});

			var largestFile = files[states.indexOf(largestState)];
			next(null,largestFile);

		}
	],cb);

}