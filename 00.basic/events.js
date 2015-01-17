//所有能触发事件的对象都是 events.EventEmitter 的实例。您可以通过 require("events"); 来访问此模块。

require('events').EventEmitter;

//当一个 EventEmitter 的实例遇到错误时，典型的动作是触发一个 'error' 事件。在 Node 中，错误事件被视为特殊情况，如果没有监听它，默认会打印一个错误堆栈并退出程序。
//所有 EventEmitter 的实例在添加新的监听器时都会触发 'newListener' 事件。
 
var dgram = require("dgram");
var emitter = dgram.createSocket("udp4");
//emitter.addListener/on()
//emitter.once()
//emitter.removeListener/removeAllListeners()

//默认情况下，添加超过 10 个监听器时 EventEmitters 会打印一条警告信息。这个默认设置有助于发现内存泄漏。显然，10 个监听器不一定够用，此函数允许放宽这一限制。设置为 0 表示不作限制。
emitter.setMaxListeners(100); 

//返回指定事件的监听器数组。该数组可以在运行时操作，比如删除监听器。
// emitter.listeners(event) 

//用提供的参数按（数组中的）顺序执行监听器。
//emitter.emit(event,arg1,...);


//test

emitter.on('newListener',function() {
	console.log('new listener added');
})


emitter.on('hou-event',function(args) {
	console.log('fire hou-event:'+args);
})


emitter.emit('hou-event',['hello','houfeng']);



