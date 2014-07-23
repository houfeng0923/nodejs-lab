process.stdin.on('readable', function () {
  console.log('r:');
  var buf;
  while(null!=(buf = process.stdin.read(1))){
    console.dir(buf&&buf.toString());
  }
  // process.stdin.read(0)

});


// https://github.com/substack/stream-handbook#consuming-a-readable-stream

//  补充：
//  使用 read() 时，每次都会读取缓冲区所有数据，所有当下次有数据可读时，readable事件会再次触发；
//  而使用 read(n) ，n<缓冲区可读数据时，由于不会排空缓冲区，所有不会触发 readable！ 手动的 read(0) 会调用底层的_read方法；
