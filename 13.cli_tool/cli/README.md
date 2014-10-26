命令行工具
====
命令行工具在简化任务或者自动化执行重复的任务方面很有用，而借助Node，开发者可以轻松的创建命令行工具而无需学习编写Shell脚本。

起步
----

 - shebang : `#! /usr/bin/env coffee` , not  `#! /usr/local/bin coffee`
 - package.json (bin)
 - sudo npm install -g
 - 最后把 *.coffee / *.js 的扩展名去掉并修改 pacakge.json `bin` 设置





专业 - `commander`
----

 - 命令行工具开发库 [commander](https://github.com/visionmedia/commander.js)
 - 控制台打印多彩字体库 [chalk](https://github.com/sindresorhus/chalk)


other
----

  linux 下 可以利用管道 `|` 做其他事情： `gitsearch -o houfeng0923 nodejs | less `



FAQ
---

 - 执行命令提示 :/usr/local/bin/node^M: bad interpreter: No such file or directory

 	这是不同系统编码格式引起的：在windows系统中编辑的.sh文件可能有不可见字符，所以在Linux系统下执行会报以上异常信息。

    vi gitsearch
    :set ff=unix
    :wq


reference

 -[用Node.js创建命令行工具](http://www.html-js.com/article/2087)
 -[Node.js命令行工具开发](http://t.cn/R7PARZd-)
 -[Request —— 让 Node.js http请求变得超简单](http://blog.segmentfault.com/younglaker/1190000000385867)