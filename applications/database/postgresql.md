---
title: PostgreSQL
---

#### Access the Postgres console

    psql

Psql uses the current user as the default user name. To specify a DB and user:

    psql db_name username

Ubuntu:

    sudo -u postgres psql


#### Change current database

    \connect db_name


#### Change password

    \password username

Ex:

    \password postgres


#### Create user

    CREATE USER tester WITH PASSWORD 'test_password';
    GRANT ALL PRIVILEGES ON DATABASE "test_database" to tester;


#### Create database

    CREATE DATABASE database_name;


#### Back up a database
(database backups are compressed by default)

    $ pg_dump -Fc dbname > filename


#### Restore from backup

    $ pg_restore -d dbname filename


#### List all tables

    \dt
