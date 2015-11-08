var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.setPrompt('>>>');
rl.prompt();
rl.question("What do you think of Node.js? ", function(answer) {
    // TODO: Log the answer in a database
    console.log("Thank you for your valuable feedback:", answer);
    // rl.close();
});


rl.on("SIGINT", function(){ // ^c
    rl.question('Are you sure you want to exit?', function(answer) {
    if (answer.match(/^y(es)?$/i)) rl.close();
  });
});



