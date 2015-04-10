// use emit :  EventProxy
// use cache : memory

/*
var ep = new EventProxy();
var status = "ready";
var getUsers = function (callback) {
    ep.once("userlist", callback);
    if (status === "ready") {
        status = "pending";
        db.select("SQL", function (results) {
            ep.emit("userlist", results);
            status = "ready";
        });
    }
};
*/


function avalanche (cachePrefix,fn) {
  var cache = {};
  var status = 'ready';
  var ep = new EventProxy();
  return function (){
    var args = [].slice.call(arguments,0,-1);
    var cacheKey = cachePrefix + args.join('');
    var callback = arguments[arguments.length-1];
    // if cache is async,use Promise instead
    if(cache[cacheKey]) {
      setImmediate(function (){
        callback(null,cache[cacheKey]);
      })
      return;
    }

    ep.once(cacheKey,callback);
    if(status=='ready'){
      status = 'pending';
      args.push(function (/*err,result*/){
        ep.emit.apply(ep,arguments);
        status = 'ready';
      });
      fn.apply(fn,args);
    }

  }
}


// service

getCityList = avalanche('citylist',function (province,callback){
  db.select('sql...',function (err,results){
    var list = results;
    // preprocess result
    callback(err,list);
  });
});


// controller

cityService.getCityList('shandong',function (err,list){
  console.log(list);
})