path = require 'path'
fs = require 'fs'
zlib = require 'zlib'
MIME = require('./mime').types

DEFAULT_PAGE = 'index.html'
COMPRESS_TYPES = ['html','js','css','tpl']

BASE_PATH = 'static'
MAX_AGE = 10 # seconds



parseFile = (filepath,stats, req,res) ->


  # if directory
  if stats.isDirectory()
    fs.readdir filepath, (err,files) ->
      parseDir filepath,files,res
    return
    # filepath = path.join filepath,DEFAULT_PAGE
    # getFile filepath,req,res
    # return

  lastModifed = stats.mtime.toUTCString()
  ext = (path.extname filepath)[1..]
  mimetype = MIME[ext] ? 'text/plain'


  res.setHeader 'Server','Tengine'
  res.setHeader 'Last-Modified',lastModifed
  # text/html ... is necessary for set charset
  res.setHeader 'Content-Type',"#{mimetype};charset=UTF-8"

  # add cache-control
  expires = new Date()
  expires.setTime (expires.getTime() + MAX_AGE*1000)
  res.setHeader 'Expires',expires.toUTCString()
  res.setHeader 'Cache-Control',"max-age=#{MAX_AGE}"


  # add modified
  modifiedSince = req.headers['If-Modified-Since'.toLowerCase()]
  if modifiedSince and lastModifed is lastModifed
    res.writeHead 304
    res.end()
    return

  # reader file
  reader = fs.createReadStream filepath
  reader.on 'error',(err)->
    res.writeHead 500
    res.end err
    return

  # gzip
  # setHeader before write
  #
  # oppressor = require('oppressor');
  # reader = reader.pipe oppressor(req) if ext in COMPRESS_TYPES
  #
  acceptEncoding = req.headers['Accept-Encoding'.toLowerCase()] ? ''
  if acceptEncoding.match /\bgzip\b/ and ext in COMPRESS_TYPES
    res.setHeader 'Content-Encoding','gzip'
    reader = reader.pipe zlib.createGzip()

  res.writeHead 200
  reader.pipe(res);




parseDir  = (basepath,files,res) ->
  relativepath = path.relative BASE_PATH , basepath
  if relativepath
    parentpath = path.join relativepath , '../'

  # console.log relativepath,parentpath

  dirHtml = '<!DOCTYPE html><html><body><ul>'
  dirHtml += "<li><a href='/#{parentpath}'>../</a></li>" if parentpath?
  files.forEach (file) ->
    url = path.normalize "/#{relativepath}/#{file}"
    stats = fs.statSync path.join(basepath,file)
    dirFlag = `stats.isDirectory() ? '/':''`
    dirHtml += "<li><a href='#{url}'>#{dirFlag}#{file}</a></li>"
  dirHtml += '</ul></body></html>'
  res.writeHead 200,{'Content-Type':'text/html;charset=UTF-8'}
  res.end dirHtml


module.exports = (filepath,req,res) ->
  filepath = path.join BASE_PATH , filepath
  fs.stat filepath , (err,stats) ->
    unless err
      parseFile filepath , stats , req , res
      return

    # error 404
    # if err.code == 'ENOENT'
    #   res.writeHead 404, 'Content-Type':'text/html;charset=UTF-8'
    #   res.end '文件不存在'
    # else
    #   res.writeHead 403
    #   res.end()
    if err.code = 'ENOENT'
      opts = url.parse req.url
      opts.host = '42.156.172.43'
      opts.headers = req.headers
      opts.method = req.method
      opts.agent = false

      requestWrapper = http.request opts,(response)->
        response.pipe res, end:true
      req.pipe requestWrapper,end:true