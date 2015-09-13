var co = require('co');

function sleep (ms) {
  return function (cb){ setTimeout(cb, ms)}
}

co(function *(){
  console.log('start sleep ....');
  yield sleep(1000);
  console.log('end');
})();