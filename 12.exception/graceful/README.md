[deprecated]

Graceful exit when uncaughtException emit, base on process.on('uncaughtException').




/recommend
将代码结构分为3个文件:

dispatch.js: master, 管理worker进程，报警等
worker.js: worker，实际工作进程的容器
app.js: web server, hsf, other services and other logic.