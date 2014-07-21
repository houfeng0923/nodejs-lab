
/*
var Readable = require('stream').Readable;

var rs = new Readable;
rs.push('beep ');
rs.push('boop\n');
rs.push(null); //表示数据发送完毕。
rs.pipe(process.stdout);*/

// 注意点：
// reader 先压入数据到可读流，发送完毕后，才pipe 写入流。此时内容还是预期输出了。。
// 原因是：可读流在接收者没有读取数据之前，会缓存压入数据。{highWaterMark:16*1024}


// 最好的方式是有数据接收的时候，才压入数据：
var Readable = require('stream').Readable;
var rs = new Readable();
var len = 0;
rs._read = function (){
  if(len++<100) rs.push('['+len+']');
  else rs.push(null);
}
// rs.pipe(process.stdout);

rs.setEncoding('utf-8')
rs.on('readable',function (){
  console.log('readable');
  var chunk;
  while (null !== (chunk = rs.read())) {
    console.log('got %d bytes of data', chunk.length);
    console.log(chunk);
  }
  // 运行上面代码：每次返回数据bytes为3~6个(每次push的内容长度)，所以设置9 read(9)返回null
  // console.log(rs.read(9).toString())

});
rs.on('end',function (){
  console.log('end');
})


