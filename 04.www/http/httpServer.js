//使用 path fs  http  创建静态web服务器

var http = require('http'),
  path = require('path'),
  fs = require('fs'),
  zlib = require('zlib'),
  extensions = {
    '.html':'text/html',
    '.js':'application/javascript',
    '.css':'text/css',
    '.png':'image/png',
    '.jpg':'image/jpeg',
    '.gif':'image/gif'

  },
  Expires = {
    fileMatch:/^\.(gif|png|jpg|js|css)$/ig,
    maxAge:60*60*24
  },
  Compress = {//gzip
    match:/^.(css|js|html)$/ig
  },
  Welcome = {
    file:'index.html'
  }
  ;




http.createServer(function(req,res){
  console.log('url:'+req.url);

  var filePath = req.url.substring(1);
  if(filePath.indexOf('?')>-1) filePath = filePath.substring(0,filePath.indexOf('?'))
  var localpath = __dirname + '\\public\\'  + filePath;


  //防止用户通过curl工具访问本文件js
  localpath = path.normalize(localpath.replace(/\.\./g,''));

  // if(localpath.slice(-1)=='\\'){
  //  localpath += Welcome.file;
  // }

  console.log('localpath:'+localpath);

  getFile(localpath,req,res);
  // path.exists(localpath, function(exists){ });

}).listen(8080,function(){
  console.log('listening :http://localhost:8080/');
});


function getFile (localpath,req,res) {


  fs.stat(localpath,function(err,state) {
    if(err){ //not exist
      console.log(err);
      res.writeHead(404,'Not Found',{'Content-Type':'text/plain'});
      res.end('not found');
      return;
    }
    if(state.isDirectory()){
       localpath =  path.join(localpath,Welcome.file);
       getFile(localpath,req,res);
       return;
    }
    var ext = path.extname(localpath);
    var mimetype = extensions[ext]||'text/plain';
    // console.log(ext+','+extensions[ext]);

    var lastModified = state.mtime.toUTCString();
    var ifModifiedSince = "If-Modified-Since".toLowerCase();

    // 设置server
    res.setHeader('Server','Tengine');

    //设置最后修改时间
    res.setHeader('Last-Modified',lastModified);

    //浏览器在发送请求之前由于检测到Cache-Control和Expires
    //（Cache-Control的优先级高于Expires，但有的浏览器不支持Cache-Control，这时采用Expires），
    //如果没有过期，则不会发送请求，而直接从缓存中读取文件。
    //
    //ps:验证缓存的时候，使用firefox并且不要按f5或刷新或回车！
    //想关阅读：
    //http://superuser.com/questions/313131/how-do-i-stop-chrome-sending-cache-control-max-age-0-when-i-hit-enter
    //http://stackoverflow.com/questions/18557251/why-does-browser-still-sends-request-for-cache-control-public-with-max-age
    if(ext.match(Expires.fileMatch)){
      var expire = new Date();
      expire.setTime(expire.getTime()+Expires.maxAge*1000);
      res.setHeader('Expires',expire.toUTCString());
      res.setHeader('Cache-Control','max-age='+Expires.maxAge);
    }

    if(req.headers[ifModifiedSince]&&lastModified==req.headers[ifModifiedSince]){
      res.writeHead(304,'Not Modified!');
      res.end();
    }else{
      var acceptEncoding = req.headers['Accept-Encoding'.toLowerCase()] || "";
      var matched = ext.match(Compress.match);
      var raw = fs.createReadStream(localpath);

      if(matched && acceptEncoding.match(/\bgzip\b/)){//gzip
        res.writeHead(200, "Ok", {'Content-Encoding': 'gzip','Content-Type':mimetype});
        raw.pipe(zlib.createGzip()).pipe(res);
      }else if(matched && acceptEncoding.match(/\bdeflate\b/)){
        res.writeHead(200, "Ok", {'Content-Encoding': 'deflate','Content-Type':mimetype});
        raw.pipe(zlib.createDeflate()).pipe(res);
      }else{
        res.writeHead(200,{'Content-Type':mimetype});
        raw.pipe(res);
      }

      // fs.readFile(localpath,'binary', function(err,contents){
      //  if(err){
      //    res.writeHead(500 ,'Internal Server Error', {'Content-Type': 'text/plain'});
      //    res.end();
      //    return;
      //  }
      //  res.writeHead(200,{'Content-Type':mimetype});
      //  res.end(contents,'binary');
      // });

    }
  })
}
