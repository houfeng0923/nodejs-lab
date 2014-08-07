function* gen(){
  yield 'hello';
  yield 'world';
}

console.log(typeof gen);  //function


console.log(gen.constructor.name); //GeneratorFunction


var g = gen();// Generator Object.MDN上也称它为generator-iterator。


console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());