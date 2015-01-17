

[Generator](http://wiki.ecmascript.org/doku.php?id=harmony:generators)是ES6的新特性，通过yield关键字，让函数执行流挂起。

Generator执行结束后会将控制权交还给调用者。
Generator实际上是一种特殊的迭代器，不过nodejs下主流的场景是将异步回调变成同步模式。


node的实现与ES6标准有偏差。

#### 应用

 - 异步的同步化表达
    Generator函数的暂停执行的效果，意味着可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield语句下面，反正要等到调用next方法时再执行。所以，Generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。
 - 控制流管理(配合promise)
 - 部署iterator接口
 - 作为数据结构(Generator使得数据或者操作，具备了类似数组的接口)


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

 - http://t.cn/R7774mR-

 - http://jlongster.com/A-Study-on-Solving-Callbacks-with-JavaScript-Generators


#### 资料

 - http://t.cn/R7PL2n6-
 - http://wohugb.gitbooks.io/ecmascript-6/content/docs/generator.html