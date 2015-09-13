var koa = require('koa');

var app = koa();

 // app.use(cors())
app.use(function*(next){
    console.log('cors');
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Headers','X-Requested-With');
    this.set('Access-Control-Allow-Methods', 'GET');
    yield next;
});


app.use(function *body(next){
  this.body = 'hello koa';
  console.log(this.response.body);
  yield next;
});


app.listen(process.argv[2]||80);
// http.createServer(app.callback()).listen(80);
// http.createServer(app.callback()).listen(443);