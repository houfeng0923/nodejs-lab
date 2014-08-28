cluster
====


fork 和 IPC


IPC 进程通信方式： 。。。。

window: 命名管道
linux : domain socket


Node 中的 ipc 抽象为  stream 对象！


多进程共享端口
----

一般情况下，多个进程是无法同时使用一个系统端口的。
  提示：Error: listen EADDRINUSE

node 在底层 通过 ipc信道  send(fid) 句柄的时候，做了一些额外的工作，
使多个进程可以共享统一端口。

句柄的发送与还原:（发送的句柄 整数值）

  node进程间，只有消息的传递，不会真正的传递对象！


在独立启动的进程中，监听同一端口时，socket套接字的文件描述符并不相同。
node底层对每个端口监听都设置了 SO_REUSEADDR 选项， 含义是：不同进程可以监听相同端口。

so，对于send 发送的句柄还原出来的服务，文件描述符是相同的。








