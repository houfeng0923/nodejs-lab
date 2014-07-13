var fs = require('fs');
var path = require('path');
var md_parser = require("node-markdown").Markdown;

function getReadMeInfo(basepath, cb) {
  fs.readdir(basepath,cont(err,files));
  var readmeFile = files.filter(function(file) {
    return file == 'README.md'
  })[0];
  if (!readmeFile) return cb(null, null);
  var readmePath = path.join(basepath, readmeFile);
  fs.stat(readmePath,cont(err,stats));
  if(stats.isFile()){
    fs.readFile(readmePath,'utf-8',cont(err,data));
    var html = md_parser(data);
    cb(null,html);
  }
}

getReadMeInfo('./atom', cont(err, html));
console.log(html);
