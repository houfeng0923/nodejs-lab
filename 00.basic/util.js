var util = require('util');



var o = {name:'hou'}
var fun = function() {
	console.log(this.name);
}
//bind 
 fun.bind(o)()  
 
//同步输出。将阻塞进程并立即向 stderr 输出 string。
util.debug('message on stderr');

util.log('message on stdout');

console.log(util.inspect(util,false,null));



function SuperClass () {
	this.name = 'supername'; 
}

SuperClass.prototype = {
	constructor:SuperClass,
	getName:function() {
		return this.name;
	}
}

function SubClass () {
	this.name = 'subname';
}

util.inherits(SubClass,SuperClass);


var sub = new SubClass();
console.log(sub.getName());
console.log(SubClass.super_);//


 