// by 'request'

var request = require('request');
// var Agent = require('socks5-http-client/lib/Agent');
var url = 'http://www.facebook.com';

url = 'https://www.baidu.com';

var proxy = 'http://127.0.0.1:8888';
proxy = 'http://192.168.1.124:8123';

var proxiedRequest = request.defaults({'proxy': proxy});

proxiedRequest.get(url, function (err, resp, body) {
  console.log(body);
});
return;

//2 by 'http'

var http = require('http');
var parse = require('url').parse;
function request(url) {
  var u = parse(url);

  var options = {
      host: '192.168.1.124', port: 8123,
      // hostname : '127.0.0.1', port     : 8888,
      path     : url,
      method   : 'GET',
      headers: {
        host: u.host
      }
  };

  var req = http.request(options, function(res) {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
      console.log('响应中已无数据');
    });
  }).on('error', function(e) {
      console.log('err', e);
  });
  req.end();
}
request('http://www.baidu.com/')
