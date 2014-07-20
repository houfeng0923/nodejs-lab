http = require 'http'
path = require 'path'
fs = require 'fs'
url = require 'url'

parseFile = require './parseFile'

host = '127.0.0.1'
port = '8080'

server = http.createServer (req,res) ->
  filename = url.parse(req.url).pathname
  filename = filename.replace /\.\./g , ''
  filename = path.normalize filename

  console.log "filename:#{filename}"


  parseFile filename , req , res

server.listen port, host , ()->
  console.log "listening:http://#{host}:#{port}"

