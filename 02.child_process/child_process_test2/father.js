var spawn = require('child_process').spawn;
var child = spawn('node',['child.js']); 

setInterval(function(){
  child.kill('SIGINT');
},2000);
 

// chid.stdout  [readable:true] ; process.stdout [writable:true]
child.stdout.pipe(process.stdout); 

// window 下 SIGINT 不好使
child.on('exit',function(code,signal){
 console.log('process exit '+code+' '+signal);
});