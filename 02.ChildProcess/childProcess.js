
var child_process = require('child_process');


//-----------spawn--------------------

// window 下 dir　不是可以执行，需要使用　cmd
// ps: /c 是 执行完关闭命令窗口
// var cmd_ls = spawn('cmd',['/c','dir']);
var cmd_ls = child_process.spawn('ls',['-l','/e']);

cmd_ls.stdout.setEncoding('utf8');
cmd_ls.stdout.on('data',function(data){
	console.log('spawn out:\n',data);
})

cmd_ls.stderr.on('data',function(data){
	console.log('spawn error:\n',data.toString());
})

cmd_ls.on('exit',function(code,signal){
	console.log('spawn exit:',code,signal);
})


//-----------exec-------------------- 
// exec 相对灵活，等于一个shell的命令行，管道操作也可以一次完成
// ps . 便捷性的代价是，exec执行的时候，options有：maxBuffer 项，
// 超出 设定长度，就会抛出异常（maxBuffer exceeded),并杀死child
// 此时child执行进度未知。
// 由此可以看出和 spawn不同，spawn是当有out的时候，就触发data返回
// 所以不存在这个问题；



var ls = child_process.exec('ls -l',function(err,stdout,stderr){
	console.log('exec: out callback\n',stdout);
});

// ls.stdout.setEncoding('utf8')
ls.stdout.on('data',function(data){
	console.log('exec out:\n',data.toString());
})


// ------------fork-------------
// 类似 child.spawn('node',['./child.js'])
// 不同点是 父子进程会建立 IPC 管道 用于通信

var module = child_process.fork('./sub-child');
// var module = child_process.fork('e:\\nodejs\\test\\sub-child.coffee',{execPath:'C:\\Users\\houfeng.hf\\AppData\\Roaming\\npm\\coffee.cmd'});
// var module = child_process.fork('./sub-child.js',{execPath:'C:\\Program Files\\nodejs\\node.exe'});

console.log('module.pid:',module.pid);

module.on('message',function(msg){
 	console.log('receive sub process msg:',msg);
 	// module.kill()
 	process.exit()
}) 

module.on('disconnect',function(){
	console.log('fork sub-child.js process disconnect.',arguments);
})

module.send('hello sub')



