var fs = require('fs');
var path = require('path');
var md_parser = require("node-markdown").Markdown;

function getReadMeInfo(basepath, cb) {
  // callback 1
  fs.readdir(basepath, function(err, files) {
    var readmeFile = files.filter(function(file) {
      return file == 'README.md'
    })[0];
    if (!readmeFile) return cb(null, null);
    var readmePath = path.join(basepath, readmeFile);
    // callback 2
    fs.stat(readmePath, function(err, stats) {
      if (stats.isFile()) {
        // callback 3
        fs.readFile(readmePath, 'utf-8', function(err, data) {
          var html = md_parser(data);
          cb(null, html);
        });
      }
    });
  });
}
getReadMeInfo('./atom', function(err, html) {
  console.log(html);
});
