var koa = require('koa');
var fs = require('fs');
var app = koa();

app.use(function *(next){
  if(this.path !== '/json') return yield next;
  this.body = {foo:'bar'};
});

app.use(function *(next){
  if(this.path !== '/stream') return yield next;

// When setting a stream as a body, Koa will automatically add any error handlers
// so you don't have to worry about error handling.
  this.body = fs.createReadStream(process.argv[3], 'utf8');
});

app.listen(80);