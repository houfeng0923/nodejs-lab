
var koa = require('koa');

var app = koa();

app.use(errorHandler());

app.use(function* () {
 if (this.path === '/error') throw new Error('ooops');
 this.body = 'OK';
});

function errorHandler() {
 return function* (next) {
   // try catch all downstream errors here
   try{
    yield next;
   }catch(err){
    this.state = 500;
    this.body = 'internal server error1';
    // this.throw(500,'internal server error2'); // msg invalid

    // Each Koa app is an EventEmitter instance.
    // can emit on app for log
    // this.app.emit('error', err, this);
   }
 };
}

app.listen(process.argv[2]||80);
