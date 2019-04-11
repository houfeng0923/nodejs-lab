// https://github.com/node-modules/graceful


var connect = require('connect');
var graceful = require('graceful');

var app = connect()
.use()
.use(function(req, res){
  if (Math.random() > 0.5) {
    foo.bar();
  }
  setTimeout(function() {
    if (Math.random() > 0.5) {
      throw new Error('Asynchronous error from timeout');
    } else {
      res.end('Hello from Connect!');
    }
  }, 100);
  setTimeout(function() {
    if (Math.random() > 0.5) {
      throw new Error('Mock second error');
    }
  }, 200);
})
.use(function(err, req, res, next) {
  res.end(err.message);
});

app = app.listen(1984);

graceful({
  server: app,  // server : [app1,app2]
  killTimeout: 30000,
});
