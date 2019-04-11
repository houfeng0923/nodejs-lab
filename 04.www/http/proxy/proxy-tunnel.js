var http = require('http');
var https = require('https');
var fs = require('fs');
var net = require('net');
var url = require('url');

function connect(cReq, cSock) {
  console.log('https proxy');
    var u = url.parse('http://' + cReq.url);
    var pSock = net.connect(u.port, u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        pSock.pipe(cSock);
    }).on('error', function(e) {
        cSock.end();
    });

    cSock.pipe(pSock);
}


function request(cReq, cRes) {
  console.log('http proxy');
    var u = url.parse(cReq.url);

    var options = {
        hostname : u.hostname,
        port     : u.port || 80,
        path     : u.path,
        method     : cReq.method,
        headers     : cReq.headers
    };
    // console.log(cReq);
    console.log(options);
    var pReq = http.request(options, function(pRes) {
        cRes.writeHead(pRes.statusCode, pRes.headers);
        pRes.pipe(cRes);
    }).on('error', function(e) {
        cRes.end();
    });

    cReq.pipe(pReq);
}


var options = {
  key: fs.readFileSync('/Users/houfeng/Library/Application Support/mkcert/localhost+4-key.pem'),
  cert: fs.readFileSync('/Users/houfeng/Library/Application Support/mkcert/localhost+4.pem')
};

https.createServer(options)
.on('request', request)
.on('connect', connect).listen(8888, '0.0.0.0');


// https://imququ.com/post/web-proxy.html
