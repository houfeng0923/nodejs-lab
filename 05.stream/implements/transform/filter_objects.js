var stream = require('stream');
var util = require('util');

// node v0.10+ use native Transform, else polyfill
var Transform = stream.Transform ||
  require('readable-stream').Transform;

/*
 * Filters an object stream properties
 *
 * @param filterProps array of props to filter
 */
function Filter(filterProps, options) {
  // allow use without new
  if (!(this instanceof Filter)) {
    return new Filter(filterProps, options);
  }

  // init Transform
  if (!options) options = {}; // ensure object
  options.objectMode = true; // forcing object mode !!!
  Transform.call(this, options);
  this.filterProps = filterProps;
}
util.inherits(Filter, Transform);

/* filter each object's sensitive properties */
Filter.prototype._transform = function (obj, enc, cb) {
  var self = this;
  // determine what keys to keep
  var filteredKeys = Object.keys(obj).filter(
    function (key) {
      // only those keys not in this list
      return (self.filterProps.indexOf(key) === -1);
    }
  );

  // create clone with only these keys
  var filteredObj = filteredKeys.reduce(
    function (accum, key) {
      accum[key] = obj[key];
      return accum;
    },{});

  // push the filtered obj out
  this.push(filteredObj);
  cb();
};


// try it out, output to stdout
// filter phone and email from objects
var filter = new Filter([ 'phone', 'email' ]);
filter
  .on('readable', function () {
    var obj;
    while (null !== (obj = filter.read())) {
      console.log(obj);
    }
  });

// now send some objects to filter through
filter.write({ name: 'Foo', phone: '555-1212',
               email: 'foo@foo.com', id: 123 });
filter.write({ name: 'Bar', phone: '555-1313',
               email: 'bar@bar.com', id: 456 });
filter.end();  // finish