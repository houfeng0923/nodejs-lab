

promise
====

Q.defer()
----

类 $.Deferred()使用

    var deferred = Q.defer();

    // deferred.reject(err);
    // deferred.resolve(data);

    return deferred.promise;
    // if cb , not continuation-passing-style ;
    // if !cb , continuation-passing-style
    return deferred.promise.nodeify(cb);


Q.fcall(fn)
----

    return Q.fcall(function(){
      return 10;
    });



Q.all([])
----

    return Q.all(items.map(function (item){
      return promise;
    }));

Q.all([])  一个promise reject，立即 return，
Q.allSettled([]) 所有 promise 完成后，return。



Q.Promise()
----

  return Q.Promise(function (resolve,reject,notify){

  })


Q.when()
----

  Q.when(promise,function (data){})


Q.delay(msec)
----

  Q.delay(100).then(function (data){})



promise.then
====

    promise
      .then(function (data){},function (err){},function (process){})
      //.fail(function (err){}) // .catch()  for modern engine
      //.fin(function (){/* release resource */}) // .finally() for modern engine
      //.done(function (){})  // done 返回空 // if the chain ends with you, call done to terminate it.


    // Q.all() -> promise 返回多个值
    Q.all([promise1,promise2])
      .spread(function (result1,result2){})



Q.nfcall(fun,arg,arg)
====

  adapting node .

    Q.nfcall(fs.readFile,'t.txt','utf-8')










 - [Q](https://github.com/kriskowal/q)