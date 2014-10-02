

###统一插件api：

connect()
.use(connect.cookieParser())
.use('/admin',middleware())
.use('/index',function (req,res,next){})
.use(function (req,res,next){})



###内置依赖：

 - parseurl : 类似 node 内置 require('url').parse(req.url);通过cache机制可以更高效。
 - finalhandler : next() .... done()


### plugins

connect3 开始 不再内置 插件，根据需要引入即可。使用方式变化不大。


#### http_parser 解析提供：

  req.method
  req.url
  req.headers.cookie (注意点：req.headers 中的key 都是小写的)
  ...


#### connect & plugin:
  req.query   (早期使用的是 query 内置中间件，3 后 不在提倡中间件，需要的使用可使用'parseurl'模块)
  req.body    (可以获取post提交的参数；早期使用 bodyParser 。[现在不提倡直接使用](https://github.com/strongloop/express/issues/897#issuecomment-2809653))
  req.cookies (早期使用 cookieParser 插件 ； response Set-Cookie 时，还需要 cookie  serialize )
  req.session
  ...

#### http cache

早期的 'static' 插件。3 使用的是 [serve-static](https://github.com/expressjs/serve-static)



