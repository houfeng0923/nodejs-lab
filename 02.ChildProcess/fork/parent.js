// fork  coffee


var child_process = require('child_process');

// ------------fork-------------
// 类似 child.spawn('node',['./child.js'])
// 不同点是 父子进程会建立 IPC 管道 用于通信

// var module = child_process.fork('./child');
// var module = child_process.spawn('coffee',['./child2.coffee'],{stdio:['ipc']}); // linux ok only;
var module = child_process.spawn('coffee',['./child2.coffee'],{stdio:[0, 1, 2, 'ipc']});  

console.log('module.pid:',module.pid);

module.on('message',function(msg){
 	console.log('receive sub process msg:',msg);
 	// module.kill()
 	// process.exit() // sub process  will live 
}) 

module.on('disconnect',function(){
	console.log('fork sub-child.js process disconnect.',arguments);
})

module.send('hello sub')

