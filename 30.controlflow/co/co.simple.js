co(function *( input ) {
    var now = Date.now();
    yield sleep200;
    console.log(Date.now() - now);
});

function co(fn){
    var gen = fn();
    next();
    function next(res){
        var ret;
        ret = gen.next(res);
        // 全部结束
        if(ret.done){
            return;
        }
        // 执行回调
        if (typeof ret.value == 'function') {
            ret.value(function(){
                next.apply(this, arguments);
            });
            return;
        }
        throw 'yield target no supported!';
    }
}

function sleep200(cb){
    setTimeout(cb, 200)
}