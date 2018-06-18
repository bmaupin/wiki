---
title: MySQL
---

## Resources

#### Tuning
- [10 MySQL settings to tune after installation](http://www.percona.com/blog/2014/01/28/10-mysql-settings-to-tune-after-installation/)
- [MySQLTuner-perl](https://github.com/major/MySQLTuner-perl)



## Misc

#### Naming convention
- Use lower case names for databases and tables
- Use _ to separate words in database and table names


#### To log into MySQL

    mysql -h host -u username -p

(You can leave -h host out if the MySQL server is on the local host)


#### Show global variables
(Shows important info about the mysql server)

    mysql> show variables;


#### Show active connections
Logged in as root (or a user with process privileges):

    mysql> show processlist;

To filter out inactive connections:

    mysql> \P grep -v Sleep
    mysql> show processlist;

Or (from the command line):

    $ mysqladmin status -u username -p



## Users and privileges

#### Show users

    mysql> select user,host from mysql.user [where user...];


#### Show privileges for a user

    show grants for username@'192.168.0.%';


#### Create a user with full privileges on all databases

    mysql> grant all on *.* to username@'192.168.0.%' identified by 'password';

Or:

    mysql> grant all on *.* to username@'localhost' identified by 'password';


#### Create a user with privileges to create other users
Append `with grant option;` to any user creation statement.

Ex:

    mysql> grant all on *.* to username@'192.168.0.%' identified by 'password' with grant option;


#### Create a user with full privileges on a particular database

    mysql> grant all on database.* to username@'192.168.0.%' identified by 'password';


#### Change a user's password

    mysql> update mysql.user set password=password('password') where user='username' [and host='192.168.0.%'];
    mysql> flush privileges;


#### Delete a user

    mysql> drop user username@'192.168.0.%';
    mysql> flush privileges;



## Databases

#### Use a database

    mysql> use database_name;


#### Show information about a database

    mysql> use database_name;
    mysql> status;


#### Export a database

    mysqldump [-h host] -u username -p [options] database_name [tables]> database_name-`date +%Y%m%d`.sql

Common options:
- `--databases`
    - Treats arguments following the database name as databases instead of tables, dumping the entire database (all tables)
- `--opt`
    - Adds a bunch of default options that make the dump easier to import
- `--quote-names`
    - Put database, table, and column names in single quotes
- `--routines`
    - Include stored routines (functions and procedures) in the database dump
- `--single-transaction`
    - Dumps the database at a consistent state if it's using a transactional engine (like InnoDB)


#### Import a database

    mysql [-h host] -u username -p [options] database_name < database_export.sql


#### Database storage engines
[InnoDB or MyISAM](http://stackoverflow.com/a/6796566/399105)



## Character set and collation

- In general, use utf8 character set and utf8_general_ci collation (the default) for best performance
- If you need sorting to be extremely accurate for non-English characters, use utf8_unicode_ci collation
- Source: [http://stackoverflow.com/q/766809/399105](http://stackoverflow.com/q/766809/399105)

#### Set database character set at creation time

    create database test character set utf8;


#### Set database character set and collation at creation time

    create database test character set utf8 collate utf8_bin;


#### Overriding default DB character set when creating a table

    create table ... default charset=utf8;



## Configuration

#### Option files
- /etc/my.cnf
    - This is the global option file and applies system-wide
- ~/.my.cnf
    - This is the user option file and applies only to the currently logged-in user
    - Useful information for this file would be the mysql username and password to be used
