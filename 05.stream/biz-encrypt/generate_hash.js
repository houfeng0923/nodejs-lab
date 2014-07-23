var crypto = require('crypto');
var stream = require('stream');
var util = require('util');

// node v0.10+ use native Transform, else polyfill
var Transform = stream.Transform ||
  require('readable-stream').Transform;

function ShaSum(options) {
  // allow use without new
  if (!(this instanceof ShaSum)) {
    return new ShaSum(options);
  }

  // init Transform
  Transform.call(this, options);

  this.digester = crypto.createHash('sha1');
}
util.inherits(ShaSum, Transform);

/* during each chunk, update the digest */
ShaSum.prototype._transform = function (chunk, enc, cb) {
  // if is Buffer use it, otherwise coerce
  var buffer = (Buffer.isBuffer(chunk)) ?
    chunk :
    new Buffer(chunk, enc);
  this.digester.update(buffer); // update hash

  // we are not writing anything out at this
  // time, only at end during _flush
  // so we don't need to call push
  cb();
};

/* at the end, output the hex digest */
ShaSum.prototype._flush = function (cb) {
  this.push(this.digester.digest('hex'));
  cb();
};


// try it out
var shasum = new ShaSum();
shasum.pipe(process.stdout); // output to stdout
shasum.write('hello world\n'); // input line 1
shasum.write('another line');  // input line 2
shasum.end();  // finish



// http://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm
/*
var shasum = crypto.createHash('sha1');

var s = fs.ReadStream(filename);
s.on('data', function(d) {
  shasum.update(d);
});

s.on('end', function() {
  var d = shasum.digest('hex');
  console.log(d + '  ' + filename);
});
*/