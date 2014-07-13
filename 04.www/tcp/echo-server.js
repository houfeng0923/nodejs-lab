var net = require('net')

var server = net.createServer(function (socket){
  socket.pipe(socket);
});
server.listen(9000);
console.log('echo server running..');


// telent 127.0.0.1 9000
// hello
// hello