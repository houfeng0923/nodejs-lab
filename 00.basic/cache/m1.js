console.log('m1 load');

var path = require('path');

// console.log(path.dirname(module.parent.filename));

console.log(path.join('/aa','..','..','..','..')); // '/'
module.exports = {};