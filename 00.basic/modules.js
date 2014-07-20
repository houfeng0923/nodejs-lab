//Node 使用CommonJS模块系统

var circle = require('./circle.js');

console.log(circle.area(101));


//核心模块  核心模块在 Node 源代码的 lib/ 文件夹中定义
//使用 require() 时，核心模块总是优先加载。
//例如，require('http') 总是返回内置的 HTTP 模块，即使该名称的文件存在。


//文件模块
//如果没有找到确切的文件，Node 将尝试给所需的文件名​​添加 .js 后缀再加载，然后再尝试 .node。
//.js 文件被视为 JavaScript 文本文件，而 .node 文件被视为已编译的插件模块，用 dlopen 加载。
// require('/home/foo.js') ; require('./circle.js')

//从 `node_modules` 文件夹中加载
//如果传递给 require() 有模块标识符不是原生模块，而且不以 '/'、'../' 或'./' 开头，
//那么 Node 从当前模块的父目录+/node_modules 这个位置尝试加载。
//如果还是没有找到，那么它跳到上层目录并依此类推，直到找到模块，或者达到根目录为止。
//For example, if the file at '/home/hf/projects/foo.js' called require('bar.js'), then node would look in the following locations, in this order:
/*
/home/hf/projects/node_modules/bar.js
/home/hf/node_modules/bar.js
/home/node_modules/bar.js
/node_modules/bar.js
*/
//这就允许程序将依赖关系本地化，防止它们冲突。
//优化
//首先，/node_modules 不会附加到一个以 /node_modules 结尾的文件夹后面。
//其次，如果调用 require() 的文件已经在一个 node_modules 层级里，那么最顶层的 node_modules 文件夹将被视为搜索树的根。


//以文件夹作为模块名
//第一种方式是在该文件夹中创建 package.json 文件，指定一个 main 模块
//如果在该目录中没有 package.json 文件，那么 Node 将尝试加载该目录中的 index.js 或 index.node 文件
var some = require('./some_lib');
some.test();

var some2 = require('./some_lib2/some2')
some2.test();

//缓存
//模块在首次被加载后会缓存起来。
//这意味着每次调用 require('foo') 将得到完全相同的对象，如果它被解析为同一个文件的话。


//require.resolve(''); //获取被载入模块的确切文件名
console.log(require.resolve('http'));
console.log(require.resolve('./circle.js'));



//module:当前模块引用
console.log(module.exports);




