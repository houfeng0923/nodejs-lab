var koa = require('koa')
  , router = require('koa-router')
  , app = koa();

app.use(router(app));



app.get('/users/:id', function *(next) {
  var user = yield User.findOne(this.params.id);
  this.body = user;
});