


介绍 两款 流程控制类库 `async` , `continuation`

作为后续开发控制回调结构的主要方案


continuation
----

可以与`async`配合一起使用。(https://github.com/BYVoid/continuation/issues/17)


优点：
 - 简单，就两个语法糖 ： `cont` `obtain`
 - 兼容coffee，这个非常好
 - 提供提供的 `compile` api，也可以运行在浏览器端


缺点：

 - 类似coffee的预编译执行；（也不好说是缺点）
 - 在集合操作函数 (forEach) 内，无法使用该语法糖

async
----

  强大


reference
----

 - [Node.js回调黑洞全解：Async、Promise 和 Generator](http://zhuanlan.zhihu.com/thefrontendperiodicals/19750470)


Generator
----

