// https://github.com/flatiron/prompt

 //prompt-override.js

  var prompt = require('prompt'),
      optimist = require('optimist')

  //
  // set the overrides
  //
  prompt.override = optimist.argv

  //
  // Start the prompt
  //
  prompt.start();

  //
  // Get two properties from the user: username and email
  //
  prompt.get(['username', 'email'], function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  email: ' + result.email);
  })

  //: node prompt-override.js --username USER --email EMAIL