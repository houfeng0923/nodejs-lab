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