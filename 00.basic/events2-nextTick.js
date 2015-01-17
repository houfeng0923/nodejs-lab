
function fun (argument) {
	console.log('nextTick');
}

process.nextTick(function() {
	fun();
});


require('http');
console.log('require');

for (var i = 0; i < 3; i++) {
	console.log('log'+i);
}
//-------------------



var events = require('events');
var EventEmitter =  events.EventEmitter; //Function

function Person () {
	var self = this;
	// EventEmitter.call(this)//EventEmitter 在源码中是空函数，所以可有可无
	process.nextTick(function() {
		self.emit('create');
	});
	this.wakeup = function() {
		console.log('exec wakeup()');
		this.emit('wakeup');
		this.emit('cry')
	}
}


//三种继承方式
// Person.prototype = new EventEmitter();
// Person.prototype.__proto__ = EventEmitter.prototype;
require('util').inherits(Person,EventEmitter);


console.log('create Person ');
var p = new Person();
console.log('bind listener');
p.on('create',function() {
	console.log('create handler');
})
p.on('cry',function() {
	console.log('cry handler ');
})
p.on('wakeup',function() {
	console.log('wakeup handler');
})

p.wakeup();

console.log('end');

