var util = require('util');
var Transform = require('stream').Transform;
util.inherits(Split, Transform);
util.inherits(OUProtocol, Transform);

function Split() {
    this.bytes = [];
    Transform.call(this);
}

Split.prototype._transform = function(chunk, encoding, done) {
    for (var i = 0; i < chunk.length; i++) {
        this.bytes.push(chunk[i]);
        if (chunk[i] === 10) {
            this.push(new Buffer(this.bytes));
            this.bytes = [];
        }
    }
    done();
};

Split.prototype._flush = function(done) {
    if (this.bytes.length) {
        this.push(new Buffer(this.bytes));
    }
    this.bytes = [];
    done();
};

function OUProtocol() {
    this.index = 0;
    Transform.call(this);
}

OUProtocol.prototype._transform = function(chunk, encoding, done) {
    if (this.index % 2 === 0) {
        for (var i = 0; i < chunk.length; i++) {
            if (chunk[i] >= 65 && chunk[i] <= 90) {
                chunk[i] += 32;
            }
        }
    } else {
        for (var i = 0; i < chunk.length; i++) {
            if (chunk[i] <= 122 && chunk[i] >= 97) {
                chunk[i] -= 32;
            }
        }
    }
    this.push(chunk);
    this.index++;
    done();
};

var split = new Split();
var ou = new OUProtocol();

process.stdin.pipe(split).pipe(ou).pipe(process.stdout);