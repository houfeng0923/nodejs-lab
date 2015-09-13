var koa = require('koa');
var views = require('co-views');
var render = views(__dirname+'/views/',{
  map: { html: 'jade'}
});

var app = koa();

app.use(function *() {
  this.body = yield render(this.path);
});
app.listen(80);