
var findLargest = require('./findLargest');


try{	
	findLargest('../',function(file){
		console.log(file);
	});
}catch(e){
	console.error(e);
}
