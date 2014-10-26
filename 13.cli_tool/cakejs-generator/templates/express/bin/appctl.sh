#!/bin/bash

# Custom the application name, like tcif, index, itier
export PATH=/opt/taobao/install/node.js/bin:/bin:/usr/bin:$PATH
SCRIPT_DIR=`dirname $0`
cd $SCRIPT_DIR
SCRIPT_DIR=`pwd`
cd $SCRIPT_DIR/../../../
BASE_HOME=`pwd`
PWD=`pwd`
PROJECT_NAME=`basename ${BASE_HOME}`
STATUSROOT_HOME=$BASE_HOME/target/${PROJECT_NAME}
NODEJS=/opt/taobao/install/node.js/bin/node
STDOUT_LOG=${BASE_HOME}/logs/nodejs_stdout.log
ulimit -c unlimited
if [ -f $SCRIPT_DIR/.env ]; then
    export NODE_ENV=`cat $SCRIPT_DIR/.env`
else
    export NODE_ENV="production"
fi


checkuser() {
  user=`id -nu`
  if [ ${user} != 'admin' ]
  then
    echo "Stopped! Only admin is allowed to perform this action!"
    exit 3
  fi
}

PROG_NAME=$0
ACTION=$1
usage() {
  echo "Usage: $PROG_NAME {start|stop|restart}"
  exit 1;
}

#checkuser

if [ $# -lt 1 ]; then
  usage
fi



#start nodejs
start()
{
         $NODEJS $SCRIPT_DIR/server.js >$STDOUT_LOG 2>&1 &
         echo "App started"
}

stop()
{
ps -ef |grep node.js | grep ${PROJECT_NAME} |grep -v grep|awk '{print $2}'|xargs kill -9
echo "App stopped."
}



case "$ACTION" in
  start)
    start
  ;;
  stop)
    stop
  ;;
  restart)
    stop
    start
  ;;
esac
