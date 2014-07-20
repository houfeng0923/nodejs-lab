var http = require('http')
var fs = require('fs')
var path = require('path')
var oppressor = require('oppressor')


/*
http.createServer(function (req,res){
  fs.readFile(path.join(__dirname,'README.md'),function (err,data){
    res.end(data);//read all file bytes
  })
}).listen(9000);
*/

// 程序不需要缓存整个文件
http.createServer(function (req,res){
  var fsReader = fs.createReadStream(path.join(__dirname,'README.md'));
  fsReader.pipe(res);
  // fsReader.pipe(oppressor(req)).pipe(res);
}).listen(9000);


