
api
----


Buffer  大小不可变!!


Buffer 与 string 转换时，需要指定 encode
支持编码：ascii	 utf8   utf16le(ucs2)  base64	hex



Buffer.concat(array)

array 是扁平的buffer内容数组，不可以是其他类型数据

Buffer.byteLength(string)
buf.length


buf.copy(targetBuf,targetStart,sourceStart,sourceEnd)

buf.fill('*',1,len) 填充整个buf

newbuf = buf.slice(0)


读取写入字符
----

buf.write(string,offset,len,encode)

该方法不会出现写入半个字符。

buf.toString(encoding,start,end)


读取写入 number
----

多字节字节序：

 - Big Endian : 高位字节排放在内存的低地址端，低位字节排放在内存的高地址端；
  TCP/IP各层协议将字节序定义为Big-Endian，因此TCP/IP协议中使用的字节序通常称之为网络字节序。



buf.readUInt8(offset)
buf.readUInt16LE()
buf.readUInt16BE()
buf.readUInt32LE()
buf.readUInt32BE()

buf.readInt8(offset)
buf.readInt16LE()
buf.readInt16BE()
buf.readInt32LE()
buf.readInt32BE()


buf.readFloatLE()
buf.readFloatBE()

buf.readDoubleLE()
buf.readDoubleBE()



buf.writeUInt8(val,offset)




reference
----

 - [Node Buffer/Stream 内存策略分析](http://cnodejs.org/topic/4f16442ccae1f4aa27001067)