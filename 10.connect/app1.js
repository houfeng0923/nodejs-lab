
var connect = require('connect');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

var app = connect()
  .use(favicon(__dirname + '/public/favicon.ico'))
  .use(cookieParser())
  .use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
  .use(function(req, res, next){
    var sess = req.session;
    console.log(req.cookies);
    console.log(sess);
    if (sess.views) {
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: ' + sess.views + '</p>');
      // res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
      res.end();
      sess.views++;
    } else {
      sess.views = 1;
      res.end('welcome to the session demo. refresh!');
    }
  })
.listen(3000);
//http.createServer(app).listen(3000)
/*var server = http.createServer();
server.on('request',app);
server.listen(3000);*/