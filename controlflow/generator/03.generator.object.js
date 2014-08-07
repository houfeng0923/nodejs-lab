function *gen(){
  console.log('gen');
  var x = yield 1;
  console.log('gen:',x);
  yield x;
  yield 2;
}

var g = gen();

console.log(g.next().value);  //generator function  执行到 yield 1;
console.log(g.next(3).value); // generator function 执行赋值 x ,并向下执行到 yield x;




try{
  g.throw('不活了')
}catch(e){
  console.log(e);
}





function *gen2(){
  yield 0;
  yield* gen();
}

var g2 = gen2();

console.log(g2.next());
console.log(g2.next());
console.log(g2.next(44));
console.log(g2.next());