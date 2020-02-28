const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');

var http = require('http');
var https = require('https');


// secure: true,
var ssl = {
  key: fs.readFileSync('/Users/houfeng/Library/Application Support/mkcert/localhost+4-key.pem'),
  cert: fs.readFileSync('/Users/houfeng/Library/Application Support/mkcert/localhost+4.pem')
};

// ssl = {
//   key: fs.readFileSync('./ssl/ssl-self/server.key'),
//   cert: fs.readFileSync('./ssl/ssl-self/server.crt'),
// };


// proxy middleware options
const options = {
  // target: 'http://127.0.0.1:4201',
  // target: 'https://dev-erebor.nextop.cn',
  target: 'https://test-erebor.nextop.cn',
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  logLevel: 'debug',
  onProxyRes: function(proxyResp, req, resp) {
    if (req.protocol === 'http') {
      let cookies = proxyResp.headers['set-cookie'];
      if (cookies) {
        cookies = cookies.map(cookie => cookie.replace(/;\s*Secure/gi, ''));
      }
      proxyResp.headers['set-cookie'] = cookies;
    }
  },
};

// create the proxy (without context)
const proxy = createProxyMiddleware('/', options);
const app = express();

const httpServer = ssl ? https.createServer(ssl, app) : http.createServer(app);
const port = ssl ? 443 : 3000;

httpServer.listen(port);
// mount `exampleProxy` in web server
app.use(proxy);
app.on('upgrade', proxy.upgrade); // <-- subscribe to http 'upgrade'

// http://localhost:3000
// https://localhost
