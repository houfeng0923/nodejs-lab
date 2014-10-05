var koa = require('koa');
var parse = require('co-body');

var app = koa();

app.use(function *parseBody(next){
  if(this.method!='post') return yield next;

  // max body size limit to `1kb`
  var body = yield parse(this, {limit: '1kb'});

  if(!body.name) this.throw(400,'.name required');

  this.body =  body.name.toUpperCase() ;
});


app.listen(80);