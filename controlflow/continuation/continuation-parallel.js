function task1 (ret) {
	setTimeout(cont(), 2000);
	ret(null,'first')
}

function task2 (ret) {
	setTimeout(cont(), 1000)
	ret(null,'second')
}


function result () {
	var results;	
	parallel(
		task1(obtain(result1)),task2(obtain(result2))
	);
	results = [result1,result2];
	console.log(results);
}

result();