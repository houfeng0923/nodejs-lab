


设置log和db及自动启动
----

  D:/mongodb>
  mkdir logs
  mkdir data

  D:/mongodb/bin>
  mongod --install --dbpath D:/mongodb/data  --serviceName MongoDB  --directoryperdb --logpath D:/mongodb/logs/mongodb.log

  net start MongoDB
  net stop MongoDB


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



node.js driver
----
 - [Monk]()
 - [mongoose](http://mongoosejs.com/)
 - [mongoose-auto-increment](https://github.com/codetunnel/mongoose-auto-increment)