var http = require('http');
var connect = require('connect');

var app = connect(
  function (req, res, next) {
    req.on('end', function () {
      if (req.url === '/asycerror') {
        setTimeout(function () {
          foo.bar();
        }, 10);
        return;
      }
      process.nextTick(function () {
        res.setHeader('content-type', 'text/json');
        res.end(JSON.stringify({
          method: req.method,
          url: req.url,
          headers: req.headers,
          Connection: res.getHeader('connection') || 'keep-alive',
          pid: process.pid,
        }));
      });
    });
    req.resume();
  },
  function (err, req, res, next) {
    var domainThrown = err.domain_thrown || err.domainThrown;
    var msg = 'domainThrown: ' + domainThrown + '\n' + err.stack;
    console.error('%s %s\n%s', req.method, req.url, msg);
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain');
    res.end(msg + '\n');
  }
);

var server = http.createServer(app);
module.exports = server;