

var count = 0;

function condition () {
	if(count>10) return false;
	return true
}

function task (ret) {
	setTimeout(cont(), 500)
	console.log(count++);
	ret(null);
}


function start () {
	while(condition()){
		task(cont());
	}
	console.log('over');
}

start();
