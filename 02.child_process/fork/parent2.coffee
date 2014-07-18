
# ------------- fork - spawn --------------

childProcess = require('child_process')


child = childProcess.spawn 'coffee',['./child2.coffee'], {'stdio':['ipc',process.stdout,'pipe']}
# linux ok  (not support  window )[https://github.com/joyent/node/commit/9826b15]
# {'stdio':[0,1,2,'ipc']} 也可以

# child = childProcess.fork './child2.coffee' # window linux ok (only coffee)
# child = childProcess.fork './child' # window linux  ok

child.on 'message' , (msg) ->
  console.log 'from sub coffee:',msg

process.on 'exit' , ->
  child.kill()

child.send 'hello sub'

# coffee 命令 可以加载 coffee 模块
mod = require('./mod.coffee')
mod()