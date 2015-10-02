var timer = setTimeout(function (){}, 2000);
timer.unref();
// 如果不使用 unref 方法，那么即使 server 的所有连接都关闭，Node 也会保持运行直到 killTimer 的回调函数被调用。unref 可以创建一个"不保持程序运行"的计时器。