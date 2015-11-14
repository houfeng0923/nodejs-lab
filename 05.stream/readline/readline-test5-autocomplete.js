var readline = require('readline');
// auto complete test
function createCLI(opt) {

    var rl = readline.createInterface({
          input : opt.input,
         output : opt.output,
       terminal : true,
      completer : opt.completer ||
        // function completer(line) {
        //     var completions = '.help .error .exit .quit .q'.split(' ')
        //     var hits = completions.filter(function(c) { return c.indexOf(line) == 0 })
        //     // show all completions if none found
        //     return [hits.length ? hits : completions, line]
        // }
        function asyncCompleter(linePartial, callback){
          var completions = '.help .error .exit .quit .q'.split(' ')
            var hits = completions.filter(function(c) { return c.indexOf(linePartial) == 0 })
            // show all completions if none found
            callback(null, [hits.length ? hits : completions, linePartial]);
        }
    });

    rl.on('line', function(line) {
        if( !line.trim() ){   }
        else { this.output.write(line+'\n'); }
        this.prompt();
    }).on('close', function() {
      this.output.write('\n Have a great day!');
      process.exit(0);
    }).setPrompt(' > ');

    rl.output.write(' CLI initialized\n');
    return rl;
}

var cli = createCLI({
   input : process.stdin,
  output : process.stdout
});

cli.prompt();