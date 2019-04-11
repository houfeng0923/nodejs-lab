var spdy = require('spdy');
var https = require('https');
// client
var agent = spdy.createAgent({
  host: 'swagger.nextop.cn',
  port: 443,

  // Optional SPDY options
  spdy: {
    plain: false,
    ssl: true,

    // **optional** send X_FORWARDED_FOR
    'x-forwarded-for': '127.0.0.1'
  }
});

https.get({
  host: 'swagger.nextop.cn',
  agent: agent
}, function(response) {
  console.log('yikes');
  // Here it goes like with any other node.js HTTP request
  // ...
  // And once we're done - we may close TCP connection to server
  // NOTE: All non-closed requests will die!
  agent.close();
}).end();
