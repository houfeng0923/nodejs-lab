var koa = require('koa');

var app = koa();


app.use(function *body(next){
  this.body = 'hello koa';
  yield next;
});


app.listen(process.argv[2]||80);