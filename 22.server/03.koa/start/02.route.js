// koa 本身没有路由功能
// 可使用中间件 ：var router = require('koa-router');
var koa = require('koa');

var app = koa();

// req.path
// this.path
app.use(function *(next){
  if(this.path !== '/')
   return yield next;

  this.body = 'hello koa';
});

app.use(function *(next){
  console.log(typeof next);
  if(this.path !== '/404')
    return yield next;

  this.body = 'page not found';
});
// 若 最后 this.body  为空，返回404状态。

app.use(function *(next){
  if(this.path !== '/500')
    return yield next;

  this.body = 'internal server error';
});

app.listen(process.argv[2]||80);