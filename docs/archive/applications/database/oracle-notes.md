---
title: Oracle notes
---

**Note:** these instructions were compiled using Oracle 11.1 and may or may not be specific to that version

Very helpful docs: [http://www.oracle-base.com/index.php](http://www.oracle-base.com/index.php)


## Important locations

#### /etc/oratab
- Specifies which dbs to bring up at system startup

#### /u00
- Contains the files for installation

#### /u01, u02, ...
- Contains the actual database data
- Standard install location for the Oracle database server software (/u01/app/oracle/product/x.x.x)



## Setup

#### Standard user/group
oracle:oinstall


#### Set up environment

    ORACLE_BASE=/u01/app/oracle
    ORACLE_HOME=$ORACLE_BASE/product/x.x.x
    export ORACLE_BASE ORACLE_HOME

Optional:

    export ORACLE_SID=dbname

(where dbname is the name of the database you want to connect to


#### Configuring oracle to start databases on system startup
1. For each instance, in /etc/oratab, make sure there's a "Y" (and not an "N") after the last colon (:), like so:

        TEST:/u01/app/oracle/product/10.2.0:Y

2. Then you'll need to set up an init script. it essentially only needs to set $ORACLE_HOME and then call $ORACLE_HOME/bin/dbstart as the oracle user for startup and $ORACLE_HOME/bin/dbshut for shutdown, like so:

        ORACLE_HOME=/u01/app/oracle/product/10.2.0
        ...
        su - oracle -c "$ORACLE_HOME/bin/dbstart"

3. ~~For Oracle 10.2, the ORACLE_HOME_LISTNER environment variable must be set to $ORACLE_HOME in the init script for the listener to start, like so:~~

        ORACLE_HOME_LISTNER=$ORACLE_HOME

3. For Oracle 10.2/11.1, dbstart and dbshut need to be passed the $ORACLE_HOME variable for the listener to start, like so:

        su - oracle -c "$ORACLE_HOME/bin/dbshut $ORACLE_HOME"

    **Note:** this won't work for a custom listener!  in that case, the listener will have to be started/stopped within the script, like so:

        ORACLE_SID=MYSID
        ...
        su oracle -c "$ORACLE_HOME/bin/lsnrctl start LISTENER_$ORACLE_SID"
        su oracle -c "$ORACLE_HOME/bin/dbstart"
        ...
        su oracle -c "$ORACLE_HOME/bin/dbshut"
        su oracle -c "$ORACLE_HOME/bin/lsnrctl stop LISTENER_$ORACLE_SID"

See here for examples:
[http://www.oracle-base.com/articles/linux/AutomatingDatabaseStartupAndShutdownOnLinux.php](http://www.oracle-base.com/articles/linux/AutomatingDatabaseStartupAndShutdownOnLinux.php)



## Misc
- For a database to be up, it needs to be started.  this is accomplished by first making sure the database SID is marked as "Y" in /etc/oratab, then by calling the $ORACLE_HOME/bin/dbstart command.

- To be able to connect to a db, the listener for that db must be configured and running.  the listener is configured in $ORACLE_HOME/network/admin/listener.ora (and optionally? tnsnames.ora in the same folder).  it is started by calling dbstart with the $ORACLE_HOME variable (for certain versions of oracle), like so:

        dbstart $ORACLE_HOME

    or by running `$ORACLE_HOME/bin/lsnrctrl start LISTENER_NAME`

- The database can also be configured internally to be tied to a particular listener that is automatically brought up with the db.

- The only ways to automate the startup of a custom listener (one that isn't named listener in listener.ora) are:
    - Start the listener manually in the oracle init script (/etc/init.d/oracle)
    - Start the listener manually in the dbstart script (`$ORACLE_HOME/bin/dbstart`)
