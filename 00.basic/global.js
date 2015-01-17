/*
全局的命名空间对象。

在浏览器中，全局作用域是顶级作用域。这意味着在浏览器的全局作用域下var something会定义一个全局变量。
在 Node 里，顶级作用域不是全局的，在一个 Node 模块的顶级作用域中 var something 只会定义一个该模块的局部变量

*/
global.test = 'houfeng';
 
//---Test Global object
console.log("Global Objects :以下对象可以在所有module中使用，有些对象不能在global作用域下使用而仅可以在module作用域下使用。");
console.log("[global]:the global namespace object.");
console.log("in node.js ,the top-level scope is not the global scope.var something inside a Node module will be local to that module !");

  

 
console.log(__filename);
console.log(__dirname); 
//console.log(process)
//console.log(global);
//console.log(global.process);
//console.log(module);

//Timer
var timer = setTimeout(function(args){
    console.log('setTimeout('+args+') .. 2 s');
    clearTimeout(timer);    
},2000,["hello",'world']);


var timer2 = setInterval(
    (function(times) {
        var start = 1;
        return function(args){
            console.log('setInterval('+args+')....'); 
            if(times<start++) {
                clearInterval(timer2);
            }
        }
})(5),500,['i','love','you']);

console.log('a+b=%j',3);
//计时
 console.time('mei')
//do some things
 console.timeEnd('mei')

// console.trace(new Error('err'))

// console.log(console.assert.toString());
 // console.assert(false,1==1);
