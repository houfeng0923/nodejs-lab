//数据流是 Node 中很多对象都有实现的一个抽象接口。 
//有些数据流可读，有些可写，有些可以同时读写。
//所有数据流都是 EventEmitter 的实例。

//stdin --  Readable Stream 
//event:'data','end','error','close',..
var stdin = process.stdin;

stdin.setEncoding('utf8');
console.log(stdin.readable);

stdin.pause();
stdin.resume();
stdin.pipe(process.stdout,{end:false});

stdin.on('end',function() {
	process.stdout.write('goodbye')
})

stdin.destroy();//stdin.destroySoon();
console.log(stdin.readable);


//stdout -- Writable Stream 
var stdout = process.stdout;
//event: 'drain','error','close','pipe',..

console.log(stdout.writable);
stdout.write('hello\n','utf8');

stdout.write(new Buffer('buffer'))

// stdout.end();
// stdout.end('end str','utf8');
// stdout.destroy();//destroySoon();