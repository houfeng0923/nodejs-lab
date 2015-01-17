/*
process 对象是一个全局对象，能从任何地方访问。它也是 EventEmitter 的实例。
*/

//  event : exit , uncaughtException , SIGINT 

process.on('exit', function () {
  process.nextTick(function () {
    console.log('不会执行到这里。');
  });
  console.log('即将退出。');
});

//throw new Error('haha');
process.on('uncaughtException',function(err){
	console.log('捕获到异常:'+ err);
});


process.stdout.write('hello i\'m stdout\n');

//一个代表 stderr 的可写流（Writable Stream）。对这个流的写操作是阻塞的。
process.stderr.write('i\'m stderr\n');

//标准输入流默认是暂停的，所以你必须调用 process.stdin.resume() 来读取 stdin。
//// 开始从标准输入读取数据，所以不会立即退出
process.stdin.resume();
process.stdin.setEncoding('utf-8');

process.stdin.on('data',function(chunk) {
	process.stdout.write('echo:'+chunk+'\n');
})

process.stdin.on('end',function() {
	process.stdout.write('stdin end\n');
})



//argv :一个包含命令行参数的数组。第一个元素是 'node'，第二个是 JavaScript 文件名，接下来是附加的命令行参数。
process.argv.forEach(function(val,index,array) {
	console.log(index+':'+val);
})

//node.exe 路径
console.log(process.execPath);

console.log('初始工作目录:'+process.cwd());

process.chdir('z:/');//更改进程当前工作目录
console.log('新的工作目录:'+process.cwd());


//一个包含用户环境变量的对象
// console.log(process.env);

// console.log('current pid:'+process.pid); 

console.log(process.version);//node 版本



setTimeout(function() {
	process.exit(-1);	
},1000);





// process.on('SIGINT',function() {
// 	console.log('收到信号');
// });

//Window 无效
process.on("SIGHUP", function(){
    console.log("收到 SIGHUP 信号");
});

//结束进程
// process.kill(process.pid)
//尽管本方法名为 process.kill，但它只用来发送信号，像 kill 系统调用那样。
//发送信号除了结束目标进程，还能做其它事情。
// process.kill(process.pid,'SIGHUP'); //发送信号

 
console.log('platform:'+process.platform);

console.log(process.memoryUsage());


process.nextTick(function() {
	console.log('nextTick callback');
});
 