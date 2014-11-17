


设置log和db及自动启动(管理员权限)
----

  D:/mongodb>
  mkdir logs
  mkdir data

  D:/mongodb/bin>
  mongod --install --dbpath D:/mongodb/data  --serviceName MongoDB  --directoryperdb --logpath D:/mongodb/logs/mongodb.log

  net start MongoDB
  net stop MongoDB


  remove service:
  mongod --remove --serviceName "MongoDB"


备份
----

  bin/mongodump -h 192.168.161.172:27017 -d dbname -o
  -h 导出源
  -d 要导出的数据库名称
  -o 数据库要导出的位置



恢复某个数据库的数据
----

  mongorestore [-d dbname  /bakpath/dbbak]  --drop
  -d 使用的数据库名称
  后面直接加你刚才导出的目录，这样是直接恢复所有表

  如果-c 是恢复一个表


  mongorestore --drop
  说明：将备份的所有数据库恢复到数据库，
  --drop指定恢复数据之前删除原来数据库数据，否则会造成恢复后的数据中数据重复。


concepts
----

#### document / collection

mongodb在使用数据库表（mongodb中成为collection）时如果不存在的话会隐式地去创建。因为mongodb使用的是动态模式--[dynamic schema](http://docs.mongodb.org/manual/faq/fundamentals/#faq-schema-free)，用户无需在插入数据前指定collection的数据结构。


#### 安全验证

默认是没有用户名及密码，不用安全验证的。

启用认证：

在窗口中输入 :
`mongod --dbpath D:/mongodb/data --logpath D:/mongodb/logs/mongodb.log --auth `
增加 --auth 参数启动的服务 需要认证才能访问。

增加用户命令[参考](http://blog.csdn.net/wycf1314/article/details/10225921)

[more](http://blog.itpub.net/22664653/viewspace-715617/)

tools
----
 - [robomongo]



node.js driver
----
 - [Monk]()
 - [mongoose](http://mongoosejs.com/)
 - [mongoose-auto-increment](https://github.com/codetunnel/mongoose-auto-increment)