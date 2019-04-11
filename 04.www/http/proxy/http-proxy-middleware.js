var fs = require('fs')
var https = require('https')
// var http2 = require('http2')
var spdy = require('spdy')
var express = require('express')
var proxy = require('http-proxy-middleware')

// proxy middleware options
var options = {
  target: 'https://swagger.nextop.cn/', // target host
  secure: false,
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  // pathRewrite: {
  //   '^/api/old-path': '/api/new-path', // rewrite path
  //   '^/api/remove/path': '/path' // remove base path
  // },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:3000': 'http://localhost:8000'
  }
}

// create the proxy (without context)
var exampleProxy = proxy(options)

// mount `exampleProxy` in web server
var app = express()
app.use('/api', exampleProxy)
// // http proxy
// app.listen(3000)


var httpsOptions = {
  key: fs.readFileSync('/Users/houfeng/Library/Application Support/mkcert/localhost+3-key.pem'),
  cert: fs.readFileSync('/Users/houfeng/Library/Application Support/mkcert/localhost+3.pem')
};

// // https proxy
// https.createServer(httpsOptions, app).listen(3000);

// http2 proxy // not work
// http2.createSecureServer(httpsOptions, app).listen(3000)


// http2 based on spdy module
httpsOptions.spdy = {
  protocols: ['h2', 'http/1.1'],
  // maxChunk: 1024*1024
};
spdy.createServer(httpsOptions, app).listen(3003)
