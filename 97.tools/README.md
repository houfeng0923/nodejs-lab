

### modules

### dev/debug tool

- [devtool](https://github.com/Jam3/devtool)

### globals

 - autod : 扫描代码，汇总dependencies

### console

 - colors
 - xcolor
 - colorful
 - chalk
 - log-symbols
 - text-table
 - cli-table

 - [blessed](https://github.com/chjj/blessed)
 - [blessed-contrib](https://github.com/yaronn/blessed-contrib)

#### shell

 - https://github.com/arturadib/shelljs

        shelljs.test('-e', 'xxxpath') //'-e', 'path': true if path exists


#### parse/read json like file

 - [strip-json-comments](https://github.com/sindresorhus/strip-json-comments)


#### prompt / sync-prompt

 - prompt + optimist

 - [Inquirer](https://github.com/SBoudrias/Inquirer.js)

### services

 - avatar services

    http://www.gravatar.com/avatar/174a650ef881bfd5885d086079c31200?s=44

```
var emailMD5 = crypto.createHash('md5').update('houfeng0923@gmail.com').digest("hex");
if(!s) { s = 48; }
return '<img src="http://www.gravatar.com/avatar/'+emailMD5+'?s='+s+'" class="gravatar"/>';
```

### fs  watch 

- watchman 
- Chokidar