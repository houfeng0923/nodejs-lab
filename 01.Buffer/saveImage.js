
var request = require('request');


var params = {
    url: 'http://gtms04.alicdn.com/tps/i4/TB1Qh2eLVXXXXcFaXXX39xqTXXX-200-226.png',
    encoding: null, // 二进制数据 encoding需设置为null
    method: 'GET'
};

request(params, function(err, result, body){  // typeof body == object
    var str = new Buffer(body, 'binary').toString('base64'); // to base64 ok
    var type = result.headers['content-type']; // 'image/png'
    var base64 = 'data:' + type + ';base64,' + str; // 完整base64 数据；保存到文件需要去掉头
    fs.writeFile('./n.png', body, 'binary', function(err){
        console.log(err);
    });
    // or
    fs.writeFile('./n.png', str, 'base64', function(err){
        console.log(err);
    });
});
