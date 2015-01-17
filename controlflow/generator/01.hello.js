function* gen(){
  yield 'hello';
  yield 'world';
  return 'end';
}

console.log(typeof gen);  //function


console.log(gen.constructor.name); //GeneratorFunction


var g = gen();// Generator Object.MDN上也称它为generator-iterator。

// console.log(Promise); // node >= 0.11.13
console.log(g.next()); // { value: 'hello', done: false }
console.log(g.next()); // { value: 'world', done: false }
console.log(g.next()); // { value: 'end', done: true
console.log(g.next()); // { value: undefined, done: true }
console.log(g.next()); // { value: undefined, done: true }