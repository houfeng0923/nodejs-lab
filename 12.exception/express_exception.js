// 一种策略：编码规范
app.get('/', function (req, res, next) { // 总是接收 next 参数
    mysql.query('SELECT * FROM users', function (err, results) {
        // 不要这样做
        if (err) throw err;

        // 应该将 err 传递给 errorHandler 处理
        if (err) return next(err);
    });
});

app.use(function (err, req, res, next) {
 // 带有四个参数的 middleware 专门用来处理异常
    res.render(500, err.stack);
});



// 另一种策略：工具解决
// 通过domain模块来捕获异步异常
// 参考： [domain-middleware](https://github.com/expressjs/domain-middleware)
//        [Node.js 异步异常的处理与domain模块解析](http://deadhorse.me/nodejs/2013/04/13/exception_and_domain.html)




