var fs  = require('fs'),
	path = require('path');


module.exports = function(dir,cb){
	var largestFile,
		largestState,
		states = [];
	fs.readdir(dir,obtain(files));

	/*
	files.forEach(function(file,i){
		fs.stat(path.join(dir,file),obtain(state));
		states.push(state);
	});
	*/

	for(var i=0;i<files.length;i++){
		fs.stat(path.join(dir,files[i]),obtain(state));
		states.push(state);
	}

	largestState = states
		.filter(function(state){ return state.isFile();})
		.reduce(function(prev,next){
			return prev.size > next.size ? prev : next ;
		});

	largestFile = files[states.indexOf(largestState)];

	cb(largestFile);

}