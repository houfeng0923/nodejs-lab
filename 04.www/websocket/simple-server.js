let net = require('net');
let util = require('util');
let events = require('events');
let crypto = require('crypto');
const MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

const CONNECTING = 0;
const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;
const MaxBufferLength = 2 * 1024 * 1024;
function WSServer(options, fn) {
  let wsServer = net.createServer(socket => {
    let conn = new Connection(socket);
    fn && fn(conn);
  });
  return wsServer.listen(options.port);
}

function Connection(socket) {
  this.socket = socket;
  this.buffer = new Buffer(0);
  this.readState = CONNECTING;

  socket.on('readable', () => {
    let found = false;
    let buf = socket.read();
    if (!buf) return;
    this.buffer = Buffer.concat([this.buffer, buf], this.buffer.length + buf.length);

    if (this.readState === CONNECTING) {
      if (!this.readHandshake()) return;
    }

    // ...
  });

  socket.on('close', function() {
    console.log('socket close!');
    buffer = null;
  });

  socket.on('error', function(err) {
    console.error('socket error', err);
    buffer = null;
  });
}

Connection.prototype.readHandshake = function() {
  if (this.buffer.length > MaxBufferLength) {
    this.socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    return false;
  }
  // Search for '\r\n\r\n'
  for (i = 0; i < this.buffer.length - 3; i++) {
    if (this.buffer[i] === 13 && this.buffer[i + 2] === 13 && this.buffer[i + 1] === 10 && this.buffer[i + 3] === 10) {
      found = true;
      break;
    }
  }

  if (!found) {
    // Wait for more data
    return false;
  }
  if (this.answerHandshake(this.buffer.slice(0, i + 4))) {
    this.buffer = this.buffer.slice(i + 4);
    this.readState = OPEN;
    this.emit('connect');
    return true;
  }
};

Connection.prototype.answerHandshake = function(buf) {
  let lines = buf.toString().split('\r\n');
  let requestHeaders = {};
  // Ignore bad-formed lines and ignore the first line (HTTP header)
  for (let i = 1; i < lines.length; i++) {
    let match;
    if ((match = lines[i].match(/^([a-z-]+): (.+)$/i))) {
      requestHeaders[match[1].toLowerCase()] = match[2];
    }
  }
  // check headers
  if (
    !('host' in requestHeaders) ||
    !('sec-websocket-key' in requestHeaders) ||
    !('upgrade' in requestHeaders) ||
    !('connection' in requestHeaders)
  ) {
    return false;
  }

  if (
    requestHeaders.upgrade.toLowerCase() !== 'websocket' ||
    requestHeaders.connection
      .toLowerCase()
      .split(', ')
      .indexOf('upgrade') === -1
  ) {
    return false;
  }
  if (requestHeaders['sec-websocket-version'] !== '13') {
    return false;
  }

  // response
  let sha1 = crypto.createHash('sha1');
  sha1.end(`${requestHeaders['sec-websocket-key']}${MAGIC}`);
  let key = sha1.read().toString('base64');
  let responseHeaders = {
    Upgrade: 'websocket',
    Connection: 'Upgrade',
    'Sec-Websocket-Accept': key,
  };
  let response = 'HTTP/1.1 101 Switching Protocols\r\n'
  + Object.keys(responseHeaders).map((h) => `${h}: ${responseHeaders[h]}`).join('\r\n')
  + '\r\n\r\n';
  this.socket.write(response);
  return true;
};

util.inherits(Connection, events.EventEmitter);

// start

new WSServer({
  port: 8002,
}, function(conn) {
  conn.on('connect', () => {
    console.log('ws connect');
  });
  // todo
  conn.on('message', () => {});
});
