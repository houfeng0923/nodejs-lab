'use strict';

var router = require('express').Router();

// 用于启动脚本的状态检查
router.get('/check.node', function(req, res) {
    res.send('success');
});

// 用于负载均衡的状态检查
router.get('/status.taobao', function(req, res, next) {
    res.send('success');

    /* 如果为JAVA + NodeJS应用，请将此请求转发给JAVA并直接返回
        http.get({
            host: '127.1',
            port: req.global.JAVA_PORT,
            agent: false,
            path: '/status.taobao'
        }, function(javaRes) {
            res.send(javaRes.statusCode);
        }).on('error', function(err) {
            err.status = 404;
            next(err);
        });
    */
});

module.exports = router;
