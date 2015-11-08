var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.setPrompt('houfeng>');
rl.prompt();

rl.on('line', function(line){
    switch(line.trim()) {
        case 'copy':
            console.log("复制");
            break;
        case 'hello':
            rl.write("Write");
            console.log('world!');
            break;
        case 'close':
            rl.close();
            break;
        default:
            console.log('没有找到命令！');
            break;
    }
    rl.prompt();
});


rl.on("close", function(){
    console.log('readline closed');
    process.exit(0);
});

// rl.write('close\n');
// rl.write(null, {ctrl: true, name: 'c'}); //^c
