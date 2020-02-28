

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

- [网络调试利器: whistle](https://github.com/avwo/whistle/blob/master/README-zh_CN.md)


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


## 延伸 `http-proxy` (>1.16.2) ECONNRESET

```
Error: read ECONNRESET
    at TLSWrap.onStreamRead (internal/stream_base_commons.js:205:27)
Emitted 'error' event on TLSSocket instance at:
    at errorOrDestroy (internal/streams/destroy.js:108:12)
    at TLSSocket.onerror (_stream_readable.js:746:7)
    at TLSSocket.emit (events.js:321:20)
    at emitErrorNT (internal/streams/destroy.js:92:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:60:3)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  errno: 'ECONNRESET',
  code: 'ECONNRESET',
  syscall: 'read'
}
```
> ECONNRESET

> 该错误被描述为“connection reset by peer”，即“对方复位连接”，这种情况一般发生在服务进程较客户进程提前终止。当服务进程终止时会向客户 TCP 发送 FIN 分节，客户 TCP 回应 ACK，服务 TCP 将转入 FIN_WAIT2 状态。此时如果客户进程没有处理该 FIN （如阻塞在其它调用上而没有关闭 Socket 时），则客户 TCP 将处于 CLOSE_WAIT 状态。当客户进程再次向 FIN_WAIT2 状态的服务 TCP 发送数据时，则服务 TCP 将立刻响应 RST。一般来说，这种情况还可以会引发另外的应用程序异常，客户进程在发送完数据后，往往会等待从网络IO接收数据，很典型的如 read 或 readline 调用，此时由于执行时序的原因，如果该调用发生在 RST 分节收到前执行的话，那么结果是客户进程会得到一个非预期的 EOF 错误。此时一般会输出“server terminated prematurely”－“服务器过早终止”错误。


背景: 目标服务器重启, 返回 502 html, 客户端通过代理服务器建立 wss 连接, 抛出以上错误.
**再次验证,发现只有当代理服务器使用 selfSigned 证书开启 https 时才会发生.**
本地代理服务器实例 proxy( http-proxy ) 已经注册 `error` 事件:

```
// ember-cli
proxy.on('error', (e) => {
  options.ui.writeLine(`Error proxying to ${options.proxy}`);
  options.ui.writeError(e);
});

```
ws 连接时, `upgrade` 协商失败(正常返回101), 目标服务器网关返回 502 http response, socket write 响应内容是出错.

直接解决方法: 对 upgrade 后的socket对象,注册 error 事件监听

```
socket.on('error', () => {});
```

或在 http-proxy 中修改: [Fix socket read error when websocket upgrade failed by houfeng0923 · Pull Request #1439 · http-party/node-http-proxy](https://github.com/http-party/node-http-proxy/pull/1439/files)



相似问题:

- [close  after setImmediate or setTimeout, on OSX](https://gitmemory.com/issue/nodejs/node/23169/475158831)
- [ECONNRESET分析与解决_网络_liang16286的专栏-CSDN博客](https://blog.csdn.net/liang16286/article/details/50946210)
- [Python TCP socket 编程：recv 或 send 返回 ECONNRESET？_网络_alenliu&#039;s blog-CSDN博客](https://blog.csdn.net/woay2008/article/details/83189117?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-9&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-9)
> 当服务端执行close函数时，socket 的接收缓冲区还有数据，这时候 TCP 会发送 RST 报文复位连接，而不会正常断开连接！。
- [“三次握手，四次挥手”你真的懂吗？](https://zhuanlan.zhihu.com/p/53374516)