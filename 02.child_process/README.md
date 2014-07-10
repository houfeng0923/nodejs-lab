

`child_process` 模块可以创建子进程，以利用多核资源。是`cluster`模块的基础。


primary method
----


child.spawn(cmd,args,options)

  最基本的方法，其他都是封装此方法


child.exec(cmd,options,cb)

  启动一个shell去执行，相对重量级一点

child.execFile(execFile,args,options,cb)

  与exec不同，不启动一个shell


child.fork(modulePath,args,options)

  启动一个node 子进程；可通过返回对象 的 `send`(ipc启动情况下有效)方法来发送消息给子进程。

  该方法类似 `child.spawn('node',['./child.js'],{stdio:['ipc']})` (only linux sucess!!)。
  详细可参考 [child_process code source](https://github.com/joyent/node/blob/master/lib/child_process.js)


`fork/`目录下的代码示例说明

  fork 是 对 spawn的 封装，实现了 进程间 ipc 通信；在window下，成功 用spawn 模拟 fork
  （node命令比较easy,在使用coffee命令的时候踩了个坑[见 `fork\parent.js`];
  主要是对window下cmd的忽视,以及对linux下[shebang](http://zh.wikipedia.org/wiki/Shebang)的无知:( ）。

  另外，在coffee命令下(window & linux)，可以fork  `.js`模块 ，也可以fork `.coffee` 模块；[原理](https://github.com/jashkenas/coffeescript/blob/0a82ac7d696e43b88cd47b666f1b3975523b4892/src/register.coffee)

  coffee结论是：coffee下可以fork coffee脚本模块（跨平台支持）




options
----

options 可以设定子进程的环境和执行条件；

{
	stdio:'inherit' // 子进程使用父进程的io
}



kill
----


child.kill(signal='SIGTERM')




others
----

child.stdin
child.stdout
child.stderr
child.pid



reference
----

 -[Node.js中的child_process及进程通信](https://www.byvoid.com/zhs/blog/node-child-process-ipc)