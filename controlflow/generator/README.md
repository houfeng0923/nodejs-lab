

[Generator](http://wiki.ecmascript.org/doku.php?id=harmony:generators)是ES6的新特性，通过yield关键字，让函数执行流挂起。


node的实现与ES6标准有偏差。

#### 支持情况

 - Chrome 35+ (about://flags中开启)
 - Firefox 31+ (默认开启)
 - nodejs harmony


node --harmony  01.hello.js
node --harmony_generators  01.hello.js


#### Generator Object

 - next()
 {value:'',done:true}

 - send(n)
 v8不支持。使用 next(n) .

 - throw()
 我们熟知的javascript异常抛错是一样的。

 - close()
 node下也没有实现，并且没有替代的方案。

#### reference

 - http://www.atatech.org/articles/19439?rnd=1491237003

 - http://jlongster.com/A-Study-on-Solving-Callbacks-with-JavaScript-Generators


#### 资料

 - http://gitlab.alibaba-inc.com/node/buc-client/tree/master