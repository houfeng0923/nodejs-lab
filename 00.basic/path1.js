var path = require('path');

console.log( path.relative(path.resolve('./htc'),path.resolve('./htc/hello/hello2/hello3')) )
console.log( path.relative('./hello/htc','./hello/htc').length )