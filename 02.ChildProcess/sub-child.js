

process.on('message',function(msg){
	console.log('sub child receive msg:',msg);
	process.send('hello parent process');
	// process.disconnect();
	// process.exit(0);
})



 setInterval(function(){
 	console.log('interval');
 },400)