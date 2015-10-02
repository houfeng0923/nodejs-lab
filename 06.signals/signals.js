

// kill -s SIGHUP <pid>
process.on('SIGHUP', function() {
  console.log('Got a SIGHUP');
});

setInterval(function() {
    console.log('Daemon running');
}, 5000);

console.log('PID:', process.pid);