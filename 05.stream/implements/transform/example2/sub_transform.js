var util = require('util');
// node v0.10+ use native Transform, else polyfill
var Transform = require('stream').Transform || require('readable-stream').Transform;
util.inherits(UCProtocol, Transform);

function UCProtocol() {
    Transform.call(this);
}

UCProtocol.prototype._transform = function(chunk, encoding, done) {
    for (var i = 0; i < chunk.length; i++) {
        if (chunk[i] <= 122 && chunk[i] >= 97) {
            chunk[i] -= 32;
        }
    }
    this.push(chunk);
    done();
};

var uc = new UCProtocol();

process.stdin.pipe(uc).pipe(process.stdout);



// duplex 实现版本(simple,参考 Transform实现)


var Duplex = require('stream').Duplex;;
var util = require('util');
util.inherits(Spigot,Duplex);
function Spigot () {
  Duplex.call(this)
}

Spigot.prototype._write = function (chunk, encoding, done) {
  this.chunk = chunk;
  this.encoding = encoding;
  this._read();
}
Spigot.prototype._read = function (size){
  if(this.chunk === undefined) return;
  if(this.chunk){
    var str = this.chunk.toString().toUpperCase();
    this.chunk = null;
    this.push(new Buffer(str));
  }else{
    this.push(null)
  }
}
var s = new Spigot();
process.stdin.pipe(s).pipe(process.stdout)


