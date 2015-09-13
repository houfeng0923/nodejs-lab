

client
----

```
var es = new EventSource('/test?n=*');
es.onmessage = function(obj) {
  console.log(obj.data);
};
es.onopen = function(event) {
};
es.onerror = function(err) {
};


```

server
----

```
router.get('/test/', function(req, res) {
  var n = req.query.n;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  // setInterval
  res.write('...');
});

```


命名事件
----

```
evtSource.addEventListener("ping", function(e) {
  var newElement = document.createElement("li");
  var obj = JSON.parse(e.data);
  newElement.innerHTML = "ping at " + obj.time;
  eventList.appendChild(newElement);
}, false);
```

服务端返回数据格式 [参考](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events#.E5.91.BD.E5.90.8D.E4.BA.8B.E4.BB.B6)




reference
---

 - [Using_server-sent_events](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events)
 - [code-demo](https://github.com/remy/eventsource-h5d)