

## 两种 proxy

- 普通代理:中间人 ,仅适用http (https 需要安装根证书,内容代理可见, 例如 fiddler,charles)

[server](./proxy-http.js), [client](./proxy-http.client.js);

- tunnel 隧道代理 CONNECT

隧道代理中代理只负责建立浏览器到目标服务器之间的隧道 socket，有了隧道，可以认为浏览器和目标服务器直连。浏览器发出的数据，无论是 HTTP 还是 HTTPS，甚至其他 TCP，目标服务器都可以原样收到.



## libs

```
var HttpProxyAgent = require('http-proxy-agent');
var HttpsProxyAgent = require('https-proxy-agent');
var SocksProxyAgent = require('socks-proxy-agent');
'socks5-http-client'/ 'socks5-https-client'
'tunnel-agent'
...

'request' proxy mode
```


## refs

- [Http 请求头中的 Proxy-Connection | JerryQu 的小站](https://imququ.com/post/the-proxy-connection-header-in-http-request.html)
- [HTTP 代理原理及实现（一） | JerryQu 的小站](https://imququ.com/post/web-proxy.html)
- [How to Proxy Requests in node.js | vanamco.com](https://www.vanamco.com/2014/06/24/proxy-requests-in-node-js/)
- [你想知道的HTTP Proxy](https://davidlovezoe.wordpress.com/2017/01/05/socket-http-proxy/)

- [你也能写个 Shadowsocks - 吴浩麟的技术博客 - SegmentFault 思否](https://segmentfault.com/a/1190000011862912)
- [科学上网的一些原理](http://hengyunabc.github.io/something-about-science-surf-the-internet/)

- [实战 SSH 端口转发](https://www.ibm.com/developerworks/cn/linux/l-cn-sshforward/)




## 延伸 transfer-encoding

问题: 通过本地代理访问 openApi 接口(基于 http2), 偶发 消息截断

api response headers:

```
server: CoreFX/8.8
date: Tue, 26 Feb 2019 03:33:58 GMT
content-type: application/json
x-ratelimit-reset: 1551152098117
x-ratelimit-remaining: 127
x-ratelimit-limit: 128
```

怀疑是 未设置`transfer-encoding` 或 `content-length` 所致. 下文提到:
`HTTP/2 支持多路复用，协议层有专门的逻辑处理文件边界，不需要这两个响应头了。`,
所以进一步怀疑是 proxy 支持的问题




- [HTTP 协议中的 Transfer-Encoding | JerryQu 的小站](https://imququ.com/post/transfer-encoding-header-in-http.html)