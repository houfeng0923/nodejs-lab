stream
----


stream v2.0

遵循unix 编程哲学

最早接触Stream是从早期的unix开始的， 数十年的实践证明Stream 思想可以很简单的开发出一些庞大的系统。
在unix里，Stream是通过 |实现的；在node中，作为内置的stream模块，很多核心模块和三方模块都使用到。和unix一样， node Stream主要的操作也是.pipe()，使用者可以使用反压力机制来控制读和写的平衡。 Stream 可以为开发者提供可以重复使用统一的接口，通过抽象的Stream接口来控制Stream之间的读写平衡。


特点：自动管理\缓存回压。。


stream 种类 : readable, writable,  duplex , transform


stream api
----

readable.pipe(writable): 把Readable streams的数据写入一个Writable , Transform, 或者Duplex stream。

return 参数流。
如果 readable.pipe(transform) 流，由于参数既可读又可写，所以可以链式pipe调用：
a.pipe(b).pipe(c)。
类似于 unix的 管道命令 ： ls -l | wc




readable: flowing mode  no-flowing mode


hack:
  readable.read(0)
  stream.push()//push(null)




stream event
----
'readable'
'data'




了解

 - [streaming http compression response negotiator](https://github.com/substack/oppressor)
 - [Simplified file library.](https://github.com/mikeal/filed)


reference
----

 - [stream 使用手册](http://www.open-open.com/lib/view/open1389583594648.html)
 - [node-stream-playground](https://github.com/jeresig/node-stream-playground)