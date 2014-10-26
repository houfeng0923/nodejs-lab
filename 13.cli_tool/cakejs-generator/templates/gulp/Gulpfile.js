var gulp = require('gulp'),
    cp = require('child_process'),
    webPort = 8596,
    debugPort = 5856,
    pid;

function merge(a, b) {
    if (a && b) {
        for (var key in b) {
            a[key] = b[key];
        }
    }
    return a;
}

function startApp(env) {
    function start(env) {
        var proc = cp.spawn('node', ['--debug=' + debugPort, './bin/app.js'], {
            cwd: process.cwd(),
            stdio: [ 0, 1, 2 ],
            env: merge(process.env, {"NODE_ENV": env})
        });

        // restart
        pid = proc.pid;

        proc.on('error', function (err) {
            console.log('--')
            console.error('启动失败:' + err);
            console.log('--')
        })
    }

    if (pid) {
        cp.exec('kill -2 ' + pid, function (error, stdout, stderr) {
            start(env);
        })
    } else {
        start(env);
    }
}

gulp.task('inspector', function () {
    var proc = cp.spawn('node-inspector', ['--web-port', webPort, '--debug-port', debugPort ], {
        cwd: process.cwd(),
        stdio: [ 0, 1, 2 ]
    });

    proc.on('error', function (err) {
        console.log('--')
        console.error('请先执行[npm install -g node-inspector]安装node-inspector');
        console.log('--')
    })

})


gulp.task('watch', function () {
    gulp.watch(['app/**/*', 'config/*', 'app.js'], function () {
        startApp(process.env.NODE_ENV);
    });
});


gulp.task('default', ['startLocal', 'inspector', 'watch']);
gulp.task('startLocal', ['inspector', 'watch'], function () {
    startApp('local');
});
gulp.task('startDev', ['inspector', 'watch'], function () {
    startApp('development');
});
gulp.task('startProd', ['inspector', 'watch'], function () {
    startApp('production');
});



