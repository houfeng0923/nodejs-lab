// process.stdin.resume();
console.log('child run');
process.on('SIGINT', function() {
  console.log('Got SIGINT. Press Control-D to exit.');
});
