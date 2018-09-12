require('@risingstack/trace');

// your application's code
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
  console.log(process.argv[3])
  this.body = fs.createReadStream(process.argv[3], 'utf8');
});

app.listen(80);

// visit : https://trace.risingstack.com/app/#/infrastructure/584e897769cac80001debe64/management/integration-status 
