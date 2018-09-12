// ES6新特性中的symbol也是值，但它不是字符串，也不是对象，而是是全新的——第七种类型的原始值。
//

// symbol是程序创建并且可以用作属性键的值，并且它能**避免命名冲突**的风险!!
var obj = {};

var mySymbol = Symbol('id'); // 创建一个新的symbol，它的值与其它任何值皆不相等。

obj[mySymbol] = "ok!"; // 保证不会冲突
console.log(obj[mySymbol]); // ok!

// 获取symbol方法：
// Symbol.for('id') ; 注册表获取
// Symbol.iterator  ; // 标准内置

typeof mySymbol //  "symbol"


// symbol不能被自动转换为字符串，这和语言中的其它类型不同。尝试拼接symbol与字符串将得到TypeError错误。

//   "your symbol is " + sym // TypeError: can't convert symbol to string



// [more](http://www.infoq.com/cn/articles/es6-in-depth-symbols)