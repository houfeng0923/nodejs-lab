function delay(milliseconds) {
  var promise = new Promise(function (resolve,reject){
    setTimeout(resolve, milliseconds);
  })
  return promise;
}


function* longRunningTask() {
  console.log('start task1');
  yield delay(1000);
  console.log('end');

  console.log('start task2');
  yield delay(1000);
  console.log('end');
}


scheduler(longRunningTask());


function scheduler(task) {
  var next = task.next();
  if(next.done) return;
  next.value.then(function (){
    scheduler(task)
  }).catch(function (e){
    console.log(e);
  })
}