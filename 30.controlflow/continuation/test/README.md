## test

找出目录中最大文件

http://zhuanlan.zhihu.com/thefrontendperiodicals/19750470




```javascript

var findLargest = require('./findLargest')
findLargest('./path/to/dir', function (er, filename) {
  if (er) return console.error(er)
  console.log('largest file was:', filename)
})

```

