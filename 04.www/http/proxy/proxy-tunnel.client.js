// by 'request'

// var request = require('request');
// // var Agent = require('socks5-http-client/lib/Agent');
// var url = 'https://www.facebook.com';

// url = 'https://www.baidu.com';

// var proxyurl = 'http://192.168.1.125:8123';
// proxyurl = 'http://127.0.0.1:8888'
// var proxiedRequest = request.defaults({'proxy': proxyurl});

// // 'request' 根据请求类型切换 http proxy /  https proxy  (proxy-tunnel.js 支持 两种 proxy)
// proxiedRequest.get(url, function (err, resp, body) {
//   console.log(body);
// });
// return;



// 'connect' 支持 http 和 https

var http = require('http');
var tls = require('tls');
var url = require('url');

function proxyRequest(requestUrl) {
  let u = url.parse(requestUrl);
  let ssl = u.protocol === 'https:';
  let thost = u.host;
  var req = http.request({
    // host: '192.168.1.124', port: 8123,
    host: '127.0.0.1', port: 8888,
    method: 'CONNECT',
    path:   u.hostname + (!ssl ? ':80' : ':443')
  });
  req.on('connect', function (res, socket, head) {
    var cts;
    if (ssl) {
        cts = tls.connect({
        socket: socket,
        host: thost,
      }, function () {
        // todo
        cts.write(`GET / HTTP/1.1\r\nHost: ${thost}\r\nConnection: Close\r\n\r\n`);
      });
    } else {
      cts = socket;
      cts.write(`GET / HTTP/1.1\r\nHost: ${thost}\r\nConnection: Close\r\n\r\n`);
    }

    cts.on('data', function (data) {
        console.log(data.toString());
    });
    cts.on('end', () => {
      process.exit();
    });
  });

  req.end();

}

proxyRequest(process.argv[2] || 'https://www.baidu.com/');
