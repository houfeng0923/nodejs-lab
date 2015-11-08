var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  cluster.setupMaster({
    silent: true  // 设置为true，手动设置 pipe. stdin, stdout, and stderr of the child will be piped to the parent
  });
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for(var id in cluster.workers){
    var worker = cluster.workers[id];
    if(!worker.process.stdout) break;
    // 重写输出行内容：每行内容前增加 [worker println]
    var xcolor = require('xcolor');

    worker.process.stdout.setEncoding('utf-8');

    // method1 ： readline
    var readline = require('readline');
    var rl = readline.createInterface({
        input: worker.process.stdout
    });
    rl.on('line', function(line){
      var colorLine = xcolor('{{green}}[worker println] {{/green}}' + line);
      console.log(colorLine);
    });

    // method 2： stream
    // var byline = require('byline');
    // var through2 = require('through2');
    // byline.createStream(worker.process.stdout)
    // .pipe(through2(function (chunk, enc, callback) {
    //   var colorLine = xcolor('{{green}}[worker println] {{/green}}' + chunk + '\n');
    //   this.push(colorLine);
    //   callback();
    // })).pipe(process.stdout);

  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
  console.log('master pid:',process.pid);
} else {
  process.stdout.write('会议进行第一项:散会 。\n-- pid: '+process.pid+'\n');
}