var path = require('path');
// var path = require('./path');

var m1 = require('./m1'); // require('E:\\github\\fire.nodejs\\00.basic\\cache\\m2.js')

require(path.resolve(__dirname,'m1'))// require('E:\\github\\fire.nodejs\\00.basic\\cache\\m2.js')

// 重新加载
require(path.join(__dirname,'m1')); // require('e:\\github\\fire.nodejs\\00.basic\\cache\\m2.js')


/*
node:0.11.13 环境：（node 0.10是ok的，都是大写）
由于window不区分大小写，node path内部 进行了 toLowerCase 转化。。
但是 path.resolve 返回的是大写的 盘符。

当以 join方法 小写路径加载模块后，该模块内require的其他模块 也会是同样的小写绝对路径，
会造成一系列模块的重复加载。使用 node0.11.* 注意了。


 */