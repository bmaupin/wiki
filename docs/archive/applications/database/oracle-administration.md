---
title: Oracle administration
---

## Administration

#### Connect to dbs through command line

    export ORACLE_SID=dbname
    /u01/app/oracle/product/x.x.x/bin/sqlplus /nolog
    SQL> connect username/password as sysdba

Or:

    export ORACLE_SID=dbname
    /u01/app/oracle/product/x.x.x/bin/sqlplus username/password as sysdba

(where db username is typically sys)

Note: you can leave the password out and oracle will prompt for it


#### Get the version of Oracle
Run the sqlplus command:

    $ export ORACLE_HOME=/u01/app/oracle/product/X.X.X; $ORACLE_HOME/bin/sqlplus 

    SQL*Plus: Release 11.2.0.2.0 Production on Thu Feb 25 11:26:32 2016


#### Start the database (once connected)

    SQL> startup


#### Stop the database

    SQL> shutdown


#### See if the listener's running
Set up the environment (above)

    /u01/app/oracle/product/x.x.x/bin/lsnrctl status


#### Start the listener
Set up the environment (above)

    /u01/app/oracle/product/x.x.x/bin/lsnrctl start


#### Change password

    sqlplus /nolog
    SQL> connect / as sysdba
    SQL> alter user username identified by "password";


#### Test password

    sqlplus /nolog
    SQL> connect username/password


#### Show all system parameters

    SQL> show parameters


#### Show specific system parameter

    SQL> show parameter parameter


#### Set system parameter

    SQL> alter system set parameter = value


## Users and privileges

#### Create a user with no privileges (privileges are granted separately)

    SQL> CREATE USER username IDENTIFIED BY password;


#### Grant admin privileges to user

    SQL> GRANT DBA TO username;



## Troubleshooting

#### General problems connecting to an Oracle database
Use tnsping to test the connection to the database:

    tnsping DB.EXAMPLE.ORG

- tnsping is provided as part of the full Oracle Database Client download. It is not included in the Instant Client.


#### ERROR: ORA-01031: insufficient privileges
1. Make sure the listener's running (see above)
2. Make sure the ORACLE_SID environment variable is set to the db you want to connect to
3. Make sure the db name in the ORACLE_SID environment variable is correct (it's case-sensitive; it may need to be all caps)


#### ERROR: ORA-12162: TNS:net service name is incorrectly specified
1. Make sure the ORACLE_SID environment variable is set to the db you want to connect to
