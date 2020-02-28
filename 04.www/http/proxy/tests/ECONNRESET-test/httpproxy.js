var fs = require('fs');
var http = require('http');
var httpProxy = require('http-proxy-middleware/node_modules/http-proxy');

var proxy = new httpProxy.createProxyServer({
  target: 'https://test-erebor.nextop.cn',
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets

});
proxy.on('proxyRes', function (proxyResp, req, res) {
  // if (req.protocol === 'http') {
    let cookies = proxyResp.headers['set-cookie'];
    if (cookies) {
      cookies = cookies.map(cookie => cookie.replace(/;\s*Secure/gi, ''));
    }
    proxyResp.headers['set-cookie'] = cookies;
  // }
});

var proxyServer = http.createServer(function (req, res) {
  proxy.web(req, res);
  //
});
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

proxyServer.listen(8000);

// http://localhost:8000
