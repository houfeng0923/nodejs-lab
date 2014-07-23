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