function *fib(){
  var i=0,j=1;
  while(true){
    yield i;
    j = i + (i=j);
  }
}


var g = fib();
for(var i=0;i<10;i++){
  console.log(g.next().value);
}