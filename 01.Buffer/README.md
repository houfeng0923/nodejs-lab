
api
----


Buffer  大小不可变


Buffer 与 string 转换时，需要指定 encode

支持编码：ascii	 utf8   utf16le(ucs2)  base64	hex


Buffer.concat(array)

array 是扁平的buffer内容数组，不可以是其他类型数据

Buffer.byteLength(string)
buf.length 


buf.copy(targetBuf,targetStart,sourceStart,sourceEnd)

buf.fill('*',1,len) 填充整个buf


读取写入字符
----

buf.write(string,offset,len,encode)

该方法不会出现写入半个字符。

buf.toString(encoding,start,end)


读取写入 number
----

buf.readUInt8(offset)
buf.readUInt16LE()
buf.readUint16BE()
buf.readUInt32LE()
buf.readUint32BE()

buf.readInt8(offset)
buf.readInt16LE()
buf.readint16BE()
buf.readInt32LE()
buf.readint32BE()


buf.readFloatLE()
buf.readFloatBE()

buf.readDoubleLE()
buf.readDoubleBE()



buf.writeUInt8(val,offset)