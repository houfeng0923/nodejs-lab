// https://github.com/BYVoid/continuation




var fs = require('fs');


// ------------ cont ----------------

function test () {

	setTimeout(cont(),1000);

	fs.readdir(__dirname,cont(err,files));

	console.log(files);
	
}

test();



// -------------- obtain (cont + throw) -------------

function f1 () {
	fs.readdir(__dirname , obtain(file) );
}


// --------------- parallel -------------------

var contents = {};

var asyncTestFunc = function(next){
	setTimeout(function(){ //可以包含原始回调
		console.log('this');
	},0)
	setTimeout(cont(),2000)
	fs.readdir(__dirname,cont(err,files))
	files.forEach(function(file,i){ //　原生forEach 回调 可以使用; 
		//但是要注意，在 function内部，使用 cont ， obtain 需要考虑下上下文了
		//这里是在forEach中，如果内部逻辑有异步操作，那么continuation只能在forEach
		//内部处理，结果是 forEach很快执行完，内部异步还在继续执行！
		console.log(file,i);
	})
	// 比较奇怪，传入的是 obtain，这里使用方式却应该是 cont！
	// 理解：查看编译后的js，传入的obtain解析后是形如：function(argument,error,files)的函数，
	// 所以，这里还是第一个参数还是需要传入error的。
	next(null,files) 
};


parallel(
	asyncTestFunc(obtain(contents.files))
	// fs.readFile('./continuation.js',obtain(contents.file1)),
	// fs.readFile('./async.js',obtain(contents.file2))
);

console.log(contents);




// 不要在 构造器中使用 cont