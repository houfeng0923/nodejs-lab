// 当你为对象添加myObject.toString()方法后，就可以将对象转化为字符串，
// 同样地，当你向任意对象添加myObject[Symbol.iterator]()方法，就可以遍历这个对象了。
//
// 因为jQuery对象与数组相似
// 可以为其添加与数组一致的迭代器方法
// jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

// [Symbol.iterator] 避免被同名方法覆盖



// for-of循环首先调用集合的[Symbol.iterator]()方法，紧接着返回一个新的迭代器对象。
// 迭代器对象可以是任意具有.next()方法的对象；for-of循环将重复调用这个方法，每次循环调用一次。


var foreverIterator = {
    index: 0,
    [Symbol.iterator]: function () {
        return this;
    },
    next: function () {
        this.index++;
        return {done: false, value: this.index};
    }
};


for(var i of foreverIterator){
    console.log(i, Date.now());
}