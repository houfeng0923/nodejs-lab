pm2
====

### config

#### auto restart

PM2 will automatically restart your application if it crashes.

#### dev

pm2-dev  // 开发模式 


 --watch   （pm2 stop —watch <index>)  [参考](http://wohugb.gitbooks.io/pm2/content/features/watch_&_restart.html)



#### node argv

pm2 start --node-args="--harmony” index.js  -- dev  --name “webhook"
// - -   dev   传递给node进程参数 


超出内存限制自动重启：--max-memory-restart 20M 

支持 json 配置 



#### reload

在cluster模式下，reload 可以实现 0 sec downtime .

[graceful reload](http://pm2.keymetrics.io/docs/usage/cluster-mode/#graceful-reload)
 # Send exit message then reload (for networked apps)
process.on(‘message’,fun) //，处理后续请求，资源释放，结束进程。

If your app is well-designed (stateless) you'll be able to process many more queries.
Important concepts to make a Node.js app stateless:
Sessions must not be stored in memory but shared via a database (Redis, Mongo, whatever)
[WebSocket/Socket.io should communicate via a database](http://socket.io/docs/using-multiple-nodes/#passing-events-between-nodes)

#### startup on server reboot

[startup](http://pm2.keymetrics.io/docs/usage/startup/)


### 性能监控


node 相关参考：http://n.thepana.com/2014/01/27/performance-monitor/
- v8-profiler
- node-heapdump
- node-mtrace
- dtrace
- node-memwatch


### webhook 实践

启动配置：

pm2 start --node-args="--harmony" index.js   --name "webhook"

--max-memory-restart 500M 


### 参考

 - [ebook](http://wohugb.gitbooks.io/pm2/content/quick-start/install.html)
 - [usage](https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md)
 - [美团酒店Node全栈开发实践](http://tech.meituan.com/node-fullstack-development-practice.html)

