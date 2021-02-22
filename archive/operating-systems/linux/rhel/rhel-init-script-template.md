---
title: RHEL init script template
---

```bash
#!/bin/bash

#
# Init file for myprogram by xxxx
#
# chkconfig: 2345 98 02
# description: My Program

# source function library
. /etc/rc.d/init.d/functions

prog="myprogram"
USER="myuser"
BIN="/usr/local/myprogram"
PIDFILE="/var/run/$prog.pid"
LOCKFILE="/var/lock/subsys/$prog"

start() {
        echo -n $"Starting $prog:"
        if [ -e $LOCKFILE ]; then
            if [ -e $PIDFILE ] && [ -e /proc/`cat $PIDFILE` ]; then
                echo -n $"cannot start $prog: $prog is already running."
                failure $"cannot start $prog: $prog is already running."
                echo
                return 1
            fi
        fi
        su - $USER -c "$BIN >/dev/null" && success || failure
        RETVAL=$?
        echo
        [ $RETVAL -eq 0 ] && touch $LOCKFILE
        return $RETVAL
}

stop() {
        echo -n $"Stopping $prog:"
        if [ ! -e $LOCKFILE ]; then
            echo -n $"cannot stop $prog: $prog is not running."
            failure $"cannot stop $prog: $prog is not running."
            echo
            return 1
        fi
        su - $USER -c "$BIN stop >/dev/null"  # Try to stop the server

        # ------ begin optional section to ensure process is killed ----
        count=0
        killflags=(HUP TERM KILL)
        killflag=0
        timeout=30
        # If the process isn't dead, wait a second, check again
        while [ `pidofproc -p $PIDFILE` ] && [ $count -lt $timeout ]; do
            sleep 1
            count=`expr $count + 1`  # Increment count
            # If it's still not dead after $timeout
            if [ $count -eq $timeout ] && [ $killflag -lt 3 ]; then
                pid=`pidofproc -p $PIDFILE`  # Get the parent PID
                # Get all child processes
                for child in $(ps -eo pid,ppid | awk "{ if ( \$2 == $pid ) { print \$1 }}"); do
                    kill -${killflags[$killflag]} $child  # Manually kill any child processes
                done
                killflag=`expr $killflag + 1`  # Go to the next kill flag
                count=0  # Reset the count
            fi
        done
        # ------ end optional section to ensure process is killed ------

        # Check to see whether the process is still running
        [ `pidofproc -p $PIDFILE` ] && failure || success
        RETVAL=$?
        echo
        [ $RETVAL -eq 0 ] && rm -f $LOCKFILE $PIDFILE
        return $RETVAL
}

case "$1" in
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
        status)
                status -p $PIDFILE $prog
                ;;
        *)
                echo $"Usage: $0 {start|stop|status|restart}"
esac
```
