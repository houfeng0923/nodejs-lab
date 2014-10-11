stream
----


stream2.0 , v0.8 后为内置模块。
stream3.0 ,v0.11.5内置；对stream1做了兼容。


遵循unix 编程哲学

最早接触Stream是从早期的unix开始的， 数十年的实践证明Stream 思想可以很简单的开发出一些庞大的系统。
在unix里，Stream是通过 |实现的；在node中，作为内置的stream模块，很多核心模块和三方模块都使用到。和unix一样， node Stream主要的操作也是.pipe()，使用者可以使用反压力机制来控制读和写的平衡。 Stream 可以为开发者提供可以重复使用统一的接口，通过抽象的Stream接口来控制Stream之间的读写平衡。


特点：自动管理\缓存回压。。


stream 类型 : Readable, Writable, Duplex, Transform, Passthrough .
还有一个老版本的'classic' 类型。[参考](https://github.com/substack/stream-handbook#classic-streams)


#### hack
  readable.push()//push(null)//push('') : end readable

  stream.read(0) : will not consume any bytes .
  (在某写情景中，可能需要触发底层可读流机制的刷新，但不真正消费任何数据。在这种情况下，可以调用 stream.read(0)，它总会返回 null)

  objectMode:true



#### stream.Readable (接口)



  readable 模式 : flowing mode  no-flowing mode

  > When in flowing mode, data is read from the underlying system and provided to your program as fast as possible. In non-flowing mode, you must explicitly call stream.read() to get chunks of data out.



  ##### api

  .read([n]):
    >If you pass in a size argument, then it will return that many bytes. If size bytes are not available, then it will return null.
    If you do not specify a size argument, then it will return all the data in the internal buffer.

    >This method should only be called in non-flowing mode. In flowing-mode, this method is called automatically until the internal buffer is drained.


  .setEncoding()

    >process.stdin.setEncoding('utf8')
    如果未设置编码，'data'事件返回的可能是字符的一部分(buf),设置编码后，会返回完整字符。
    设置后：read()方法返回的是string；默认是Buffer


  .pipe(writable,{end:true}):

    >把Readable streams的数据写入一个Writable , Transform, 或者Duplex stream。
    return 参数流。
    如果 readable.pipe(transform) 流，由于参数既可读又可写，所以可以链式pipe调用：
    a.pipe(b).pipe(c)。  类似于 unix的 管道命令 ： ls -l | wc


  .unpipe(writable)

  .unshift(chunk)

  .resume()

  .pause()



  ##### stream event


   - 'readable'

    >当可读流中有数据可读取时，流会触发'readable' 事件，这样就可以调用.read()方法来读取相关数据，
    当可读流中没有数据可读取时，.read() 会返回null，这时可以结束.read() 的调用，等待下一次'readable' 事件的触发。
    >需要显式调用 read([n])方法来读取数据。

    >当内部缓冲区被排空(drained)，一旦有数据可读取时，将再次触发'readable'事件。（！！！！）

    > [04.read(n).js]

   - 'data'
    >If you attach a data event listener, then it will switch the stream into flowing mode, and data will be passed to your handler as soon as it is available.


   - 'end'
    >Note that the end event will not fire unless the data is completely consumed

   - 'close'

   - 'error'

#### stream.Writable (接口)

  ##### api

  .write(chunk,[encoding],[cb])
    当数据被写入缓冲区时，返回false。
    response.write('hello')

  .end([chunk],[encoding],[cb])
    response.end('');


  ##### event

  'drain'
  >当缓冲区内容全部写出后，触发 drain

  'end'

  'finish'
  >When the end() method has been called, and all data has been flushed to the underlying system, this event is emitted.

  'pipe'

  'unpipe'

  'error'


#### stream.Duplex

Duplex streams are streams that implement both the Readable and Writable interfaces.


#### stream.Transform


[what_are_transform_streams](http://codewinds.com/blog/2013-08-20-nodejs-transform-streams.html#what_are_transform_streams_)

内置：`zlib` `crypto`



#### implements

Readable    _read
Writable    _write
Duplex      _read, _write
Transform   _transform, _flush


_read:
  this.push([chunk],[encoding]): Note: This function should be called by Readable implementors, NOT by consumers of Readable streams.



#### 了解

 - [streaming http compression response negotiator](https://github.com/substack/oppressor)
 - [Simplified file library.](https://github.com/mikeal/filed)
 - [through2](http://t.cn/R7PAHBR)
 - [through2-map](https://github.com/brycebaril/through2-map)
 - [split](https://github.com/dominictarr/split)
 - [through](https://github.com/dominictarr/through)
 - [duplex](https://github.com/Raynos/duplexer)
 - [event stream](https://github.com/dominictarr/event-stream)
 - [bl](https://github.com/rvagg/bl)
 - [concat-stream](https://github.com/maxogden/concat-stream)
 - [stream-combiner](https://github.com/dominictarr/stream-combiner)

#### education

 - [stream-adventure](https://github.com/substack/stream-adventure)

#### reference

 - [stream-handbook](https://github.com/substack/stream-handbook)
 - [stream 使用手册](http://www.open-open.com/lib/view/open1389583594648.html)
 - [node-stream-playground](https://github.com/jeresig/node-stream-playground)


 - [nodejs-transform-streams](http://codewinds.com/blog/2013-08-20-nodejs-transform-streams.html)
 - [nodejs-duplex-streams](http://codewinds.com/blog/2013-08-31-nodejs-duplex-streams.html)
