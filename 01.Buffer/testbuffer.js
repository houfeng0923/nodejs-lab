

var array = [];
var buf = new Buffer([0]); // 长度为1，值为0x00 的 buffer

var lenbuf = new Buffer(4); // 长度为4，值为 0x00 的 buffer
lenbuf.writeInt32BE(44,0);  // 向buf 起始位置 写入 4Byte长的 int 值 ：44 （字节序为大端：BE，反之 LE)

//将两个buf 存入 临时数组
array.push(buf);
array.push(lenbuf);



// 通过Buffer.concat 将数组中buf对象集合 合并为一个buf对象
var result = Buffer.concat(array);

console.log(result);

// 解析------------

// 获取原buf中 从索引为1起始的后续buf .!!! 与result公用内存。
var lenbuf = result.slice(1);
console.log(lenbuf);

// 以 4Byte 大字端 int 方式读取buf值  ：44
console.log(lenbuf.readInt32BE(0));



console.log(Buffer.isBuffer(lenbuf));

console.log(Buffer.isEncoding('hex'));//?

console.log( Buffer.byteLength('大连','utf8') );//默认utf8


console.log('----------------');


var writeBuf = new Buffer(12);

len = writeBuf.write('\u00bd + \u00bc = \u00be', 0);
console.log(len + " bytes: " + writeBuf.toString('utf8', 0, len));


console.log('----------toJSON---------------');

var jsonString = '{"city":"杭州"}';
var jsonBuf = new Buffer(jsonString);

var json = JSON.stringify(jsonBuf);

console.log(json);
console.log(jsonBuf.toString());



console.log(new Buffer(['hello','world']));









