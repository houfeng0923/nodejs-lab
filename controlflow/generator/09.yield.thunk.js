function delay(milliseconds) {
  return function (fn){
    setTimeout(function (){
      fn(null);
    }, milliseconds);
  }
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
  var value = next.value;
  value(function (err){
    if(err){
      console.log(err);return;
    }
    scheduler(task);
  });
}