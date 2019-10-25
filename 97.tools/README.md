

### modules

### dev/debug tool

- [devtool 废弃](https://github.com/Jam3/devtool)

```
node --inspect --inspect-brk app.js
// --inspect-brk : break on start


open chrome://inspect

```



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

#### env config

- [motdotla/dotenv](https://github.com/motdotla/dotenv)
  包含一篇介绍代码和配置分离的观点的文章: [The Twelve-Factor App （简体中文）](https://12factor.net/zh_cn/config)

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

- Chokidar!
- [watchman](https://facebook.github.io/watchman/)


### screenshot

- webshot


### log

- [Bunyan]()
- [pinojs/pino](https://github.com/pinojs/pino#benchmarks)


### uuid generator

- node-uuid
- nanoid

- [generator of random: chancejs](https://chancejs.com/)



## refs


- [挑选npm模块很费事？掌握这些技巧就能事半功倍！ - InfoQ](https://www.infoq.cn/article/FzmL_IDSGe7iRy7QwzWP?utm_source=rss&utm_medium=article)