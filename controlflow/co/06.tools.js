var thunkify = require( 'thunkify' );
var co = require( 'co' );
var fs = require( 'co-fs' );
var Request = require( 'co-request' );

var myModule = {

    /**
     * 延迟timeout毫秒
     */
    delay: thunkify(function( timeout, next ){
        setTimeout( function(){
            next();
        }, timeout );
    }),

    /**
     * 获取数据
     */
    getData: function(){
        return co( function*(){
            var ret = yield fs.readFile( 'package.json' );
            return ret;
            // var ret = yield Request('http://www.baidu.com');
            // return ret.body;
        });
    },

    /**
     * 延迟 timeout 毫秒之后获取数据
     */
    delayFetch: thunkify(function( timeout, next ){

        var self = this;
        timeout = timeout || 2000;

        co( function *(){
            yield self.delay( timeout );
            var data = yield self.getData();
            next( null, data );
        })();
    })
};

co(function *(){
    // yield myModule.delay(2000);
    // var body = yield myModule.getData()
    var body = yield myModule.delayFetch(2000);
    console.log(body);
    console.log('over');
})();
