var WebSocket = require('ws');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

ws = new WebSocket('wss://localhost/advance/rest/realtime', {
  rejectUnauthorized: false,
});
// ws = new WebSocket('wss://test-erebor.nextop.cn/advance/rest/realtime');

ws.on('open', function open() {
  console.log('connected');
  ws.send(Date.now());
});

ws.on('error', function close(e) {
  console.log('error', e);
});

ws.on('message', function incoming(data) {
  console.log(`Roundtrip time: ${Date.now() - data} ms`);
});
