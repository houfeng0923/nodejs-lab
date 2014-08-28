


Node 会触发 uncaughtException 事件，如果这个事件依然没有得到响应，整个进程(process)就会 crash

    process.on('uncaughtException',function(err){})

即使自己的代码多么健壮，在引入第三方模块后，依然隐患很大。
特别是对于web应用，灾难是巨大的。

一个友好的错误处理机制应该满足三个条件:

 - 对于引发异常的用户，返回 500 页面
 - 其他用户不受影响，可以正常访问
 - 不影响整个进程的正常运行


#### uncaughtException 问题

当 Node 抛出 uncaughtException 异常时就会丢失当前环境的堆栈，导致 Node 不能正常进行内存回收。
也就是说，每一次 uncaughtException 都有可能导致内存泄露。(所以捕获到异常后，应该重启进程)

无法为抛出异常的用户请求返回一个 500 错误.


#### domain 捕获异步异常

    require('domain'); // > v0.8

```javascript

var domain = require('domain');
var d = domain.create();
d.run(function () {
    setTimeout(function () {
        throw new Error('async error'); // 抛出一个异步异常
    }, 1000);
});

d.on('error', function (err) {
    console.log('catch err:', err); // 这里可以捕获异步异常
});
```

这样 express 可以 通过优雅的方式 捕获异常，返回500错误

```javascript

var app = express();
var server = require('http').createServer(app);
var domain = require('domain');

app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function (err) { // 下面抛出的异常在这里被捕获
        res.send(500, err.stack); // 成功给用户返回了 500
    });
    reqDomain.run(next);
});

app.get('/', function () {
    setTimeout(function () {
        throw new Error('async exception'); // 抛出一个异步异常
    }, 1000);
});

```

**但是 domain 捕获到错误时依然会丢失堆栈信息，此时已经无法保证程序的健康运行，必须退出.**

```javascript

reqDomain.on('error', function () {
    try {
        // 强制退出机制
        var killTimer = setTimeout(function () {
            process.exit(1);
        }, 30000);
        killTimer.unref(); // 非常重要
        //  如果不使用 unref 方法，那么即使 server 的所有连接都关闭，Node 也会保持运行直到 killTimer 的回调函数被调用。
        // unref 可以创建一个"不保持程序运行"的计时器。


        // 自动退出机制，停止接收新链接，等待当前已建立连接的关闭
        server.close(function () {
          // 此时所有连接均已关闭，此时 Node 会自动退出，不需要再调用 process.exit(1) 来结束进程
        });
    } catch(e) {  // 处理异常时要小心的把异常处理逻辑用 try/catch 包住，避免处理异常时抛出新的异常
        console.log('err', e.stack);
    }
});

```



#### 结论

用 domain 来捕获大部分异常，并且通过 uncaughtException 避免程序 crash 是目前来说最理想的方案。




#### reference

 - [domain doc](http://nodejs.org/api/domain.html#domain_additions_to_error_objects)
 - [domain middleware](https://github.com/expressjs/domain-middleware)
 - [Node 出现 uncaughtException 之后的优雅退出方案](http://www.infoq.com/cn/articles/quit-scheme-of-node-uncaughtexception-emergence/)
 - [Node.js 异步异常的处理与domain模块解析](http://deadhorse.me/nodejs/2013/04/13/exception_and_domain.html)