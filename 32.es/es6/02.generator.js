// generator is iterator !
// 所有的生成器都有内建.next()和[Symbol.iterator]()方法的实现。你只须编写循环部分的行为。


function* forever(){
    var index = 0;
    while(true){
        yield index++;
    }
}

for(var i of forever()){ // [object Generator]
    console.log(i, Date.now());
}