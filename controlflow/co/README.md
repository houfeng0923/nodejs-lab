


#### [co](https://github.com/visionmedia/co)

注：基于 co v 3.* 版本

co是 coroutine 的缩写，即协同程序。通过co模块最大化 Generator 的用途。

co在实现了近似“同步”的编程写法的同时，也引入了很多相应的概念(独有)：

 - thunk：仅有一个node风格的回调作为参数的函数。参考tj/node-thunkify。Promise、Generator都可以转换为一个thunk。
 - yieldable：可以被yield的对象，包括thunk、Promise、Generator、GeneratorFunction，以及包含以上类型对象的Object和Array。


#### [thunkify](https://github.com/visionmedia/node-thunkify)

几乎所有的node原生模块，以及大量的npm模块，都可以利用TJ的thunkify模块进行封装。
Turn a regular node function into one which returns a thunk, useful for generator-based flow control such as co.

注意点：

对于实例对象方法的封装，需要注意方法执行的ctx：

var cat = new Schema();
//...
cat.create2 = thunkify(cat.create);




#### async

ES5 : promise/deferred / wind



#### co v4

co v4 增加了 es7 promise 支持。 co调用不在返回thunk，而是直接返回Promise对象(ES7原生)。

在co内，yield 支持 Promise(ES7原生,Q等 )

co return pojo , `then` receive pojo; co return promise ,`then` receive resolved val;



如果需要控制函数执行，使用  co.wrap

参考 [21.mongodb/co] , 进一步了解co3 co4 不同



#### reference

 - [co wiki](https://github.com/visionmedia/co/wiki)

 - [co 原理](http://doc.alif2e.com/?p=8004#co的实现原理)

 - [co 4.* 变化]()

 - http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/