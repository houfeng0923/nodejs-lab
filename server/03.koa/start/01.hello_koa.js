var koa = require('koa');

var app = koa();


app.use(function *body(next){
  this.body = 'hello koa';
  console.log(this.response.body);
  yield next;
});


app.listen(process.argv[2]||80);
// http.createServer(app.callback()).listen(80);
// http.createServer(app.callback()).listen(443);