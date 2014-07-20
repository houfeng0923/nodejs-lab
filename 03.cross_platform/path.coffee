path = require "path"

console.log 'path.delimiter:'+ path.delimiter # ; :
console.log 'path.sep:'+path.sep # \\ /


console.log path.extname 'index.html'

console.log path.dirname 'nodejs/houfeng/readme.md'
console.log path.basename 'nodejs/houfeng/readme.md','.md'



console.log path.relative 'nodejs/houfeng/readme.md','nodejs/nuanshan/readme.md'


# 避免直接拼路径
# currFilePath = "e:\\" + "nodejs" + "\\" + "fire.nodejs" + "\\" + "cross-platform" + "\\" + "path.coffee"


file1path = path.join "nodejs","fire.nodejs","cross-platform","path.coffee"
console.log file1path # nodejs\fire.nodejs\cross-platform\path.coffee (window)

# absolute path
file2path = path.resolve "nodejs","fire.nodejs","cross-platform","path.coffee"
console.log file2path


file3path = path.normalize './nodejs/../nodejs/houfeng/readme.md'
console.log file3path