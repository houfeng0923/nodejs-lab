var cluster = require("cluster");
var cores = require('os').cpus();

cluster.setupMaster({
  exec: "worker.js",
  // args : ["--use", "https"],   // string arguments passed to worker. (Default=process.argv.slice(2))
  // silent : true   // whether or not to send output to parent's stdio. (Default=false)
});

// cluster.fork();


for (var i = cores.length - 1; i >= 0; i--) {
  cluster.fork();
};

cluster.on("fork", function(worker) {
  console.log("Worker : [ %d ][ Status : Forking ]", worker.process.pid);
});

cluster.on("online", function(worker) {
  console.log("Worker : [ %d ][ Status : Online ]", worker.process.pid);
});

cluster.on("listening", function(worker, address) {
  console.log("Worker : [ %d ][ Status : Listening ][ Address : %s ][ Port : %d ]", worker.process.pid, address.address, address.port);
});

cluster.on("disconnect", function(worker) {
  console.log("Worker : [ %d ][ Status : Disconnected ]", worker.process.pid);
});


/*
 * Restart Dead Workers
 */
cluster.on("exit", function(worker, code, signal) {
  console.log("Worker : [ %d ][ Status : Exit ][ Signal : %s ][ Code : %s ]", worker.process.pid, signal, code);
  cluster.fork();
});
