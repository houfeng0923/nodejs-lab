 

var buf = new Buffer(2);
console.log(buf);
buf = new Buffer([1,2]);
console.log(buf);

buf  = new Buffer('houfeng','utf8');
console.log(buf);
console.log(buf.toString());

buf = new Buffer(12);
var len = buf.write('1+1=2');
console.log(buf.toString('utf8',0,len)); 


console.log('isBuffer:'+Buffer.isBuffer(buf));

var str = '侯峰';
console.log('str length:'+str.length);
buf = new Buffer(str);
console.log('buf bytelen:'+Buffer.byteLength(str));
console.log('buf length:' +buf.length);
//buf.length :非内容长度，而是分配的长度。


var buf1 = new Buffer(26);
var buf2 = new Buffer(26);

//Unicode 编码
for(var i=0;i<26;i++){
	buf1[i] = 97 + i;
	buf2[i] =  33;// !
}
console.log(buf1.toString());
buf1.copy(buf2,3,0,20)
console.log(buf2.toString());

buf1 = buf1.slice(0,10);//sindex,eindex
console.log(buf1.toString());



