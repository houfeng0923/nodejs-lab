
process.on 'message' , (msg) ->
  console.log 'from parent coffee:',msg
  process.send 'hello parent'
  process.disconnect()