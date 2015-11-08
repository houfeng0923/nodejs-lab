signals
====



#### SIGKILL

    is used to cause inmediate termination. Unlike SIGTERM it can't be handled or ignored by the process.
    (can not be listened)
    kill -9 <pid>
    kill -s SIGKILL <pid>


#### SIGTERM

    is used to cause a program termination. It is a way to politely ask a program to terminate. The program can either handle this signal, clean up resources and then exit, or it can ignore the signal.
    (SIGTERM is not supported on Windows, it can be listened on)

    kill -s SIGTERM <pid>
    kill <pid>
    kill -15 <pid>


#### SIGINT(in common use)

    ( like  SIGTERM )

    kill -s SIGINT <pid>
    CTRL + C

SIGTERM and SIGINT have default handlers on non-Windows platforms that resets the terminal mode before exiting with code 128 + signal number. If one of these signals has a listener installed, its default behaviour will be removed (node will no longer exit).

#### SIGHUP

    is generated on Windows when the console window is closed, and on other platforms under various similar conditions, see signal(7). It can have a listener installed, however Node.js will be unconditionally terminated by Windows about 10 seconds later. On non-Windows platforms, the default behaviour of SIGHUP is to terminate Node.js, but once a listener has been installed its default behaviour will be removed.



Note that Windows does not support sending Signals, but Node.js offers some emulation with process.kill(), and child_process.kill(): - Sending signal 0 can be used to search for the existence of a process - Sending SIGINT, SIGTERM, and SIGKILL cause the unconditional exit of the target process.




references
----

 - [What is the Windows equivalent of process.on('SIGINT') in node.js?](http://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js)
 - [graceful shutdown in node](http://joseoncode.com/2014/07/21/graceful-shutdown-in-node-dot-js/)
 - [process_signal_events](https://nodejs.org/api/process.html#process_signal_events)
 - [wiki signals](https://en.wikipedia.org/wiki/Unix_signal)