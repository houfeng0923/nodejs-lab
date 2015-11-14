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
console.log('--------------');
// let 不支持
// for of 支持 for...of循环可以自动遍历Generator函数，且此时不再需要调用next方法。
for(var i of fib()){
  if(i>10) break;
  console.log(i);
}