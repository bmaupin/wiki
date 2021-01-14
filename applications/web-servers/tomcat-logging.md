---
title: Tomcat logging
---

## Tomcat logs

- catalina.out

  - System.err/out logs are sent to catalina.out, but since a logging API should be used instead, catalina.out should be empty. To force System.err/out logs to be sent to the logging system, set this in context.xml ([https://tomcat.apache.org/tomcat-8.5-doc/logging.html#Console](https://tomcat.apache.org/tomcat-8.5-doc/logging.html#Console)):
    ```xml
    <Context swallowOutput="true">
    ```

- Access logs

  - Access logs are handled separately using AccessLogValve in server.xml. They will rotate on a daily basis by default, but are never compressed or cleaned up. You'll need to use logrotate or a cron job to clean them up:
    ```
    #Ansible: Compress tomcat access logs
    @daily find /var/log/tomcat/*.txt -type f -mtime +0 -exec gzip {} \; 2> /dev/null
    #Ansible: Delete tomcat access logs
    @daily find /var/log/tomcat/*.txt.gz -type f -mtime +30 -exec rm {} \; 2> /dev/null
    ```

- Other logs (catalina.log, localhost.log, manager.log, host-manager.log):

  - By default logs aren't compressed or cleaned up.

  - (Recommended) to use log4j2 for logging:

    - Follow the steps here: [http://stackoverflow.com/a/35618384/399105](http://stackoverflow.com/a/35618384/399105)

    - Use the log4j2.xml from here (compresses logs and removes them after 10 days): [https://gist.github.com/bmaupin/475a0cd6e8b374d876f5085846761fb6](https://gist.github.com/bmaupin/475a0cd6e8b374d876f5085846761fb6)

  - Alternatively, for a very simple log rotation implementation, replace `$CATALINA_BASE`/conf/logging.properties with the file from here: [https://gist.github.com/bmaupin/987205b7ee8a0b664cfb04a9505feb5a](https://gist.github.com/bmaupin/987205b7ee8a0b664cfb04a9505feb5a)

## Application logs

#### log4j 1

- Configuration

  - The tomcat logging configuration is in `$CATALINA_BASE`/conf, but the application logging configuration is in `$CATALINA_BASE`/webapps/_APPNAME_/WEB-INF/classes

  - At startup, log4j will look for a log4j.properties or log4j.xml file for configuration

  - If no log4j configuration files exist or if no root logger is defined in them (log4j.rootLogger or log4j.rootCategory), log4j will create log4j.log and trace.log files in the current working directory where Tomcat is started from

  - Category is synonymous with Logger (in version 1.2, Logger class has replaced the Category class), so these mean the same thing:
    ```properties
    rootCategory=WARN, A1, F1
    rootLogger=WARN, A1, F1
    ```

- Troubleshooting

  - To enable log4j debug logs for troubleshooting:

    1. Edit tomcat bin/setenv.sh and add this to `CATALINA_OPTS` or `JVM_OPTS`:

       ```
       -Dlog4j.debug
       ```

    1. Restart tomcat

- Migration

  - log4j 1 logs can be redirected to logback using log4j-over-slf4j: [http://www.slf4j.org/legacy.html#log4j-over-slf4j](http://www.slf4j.org/legacy.html#log4j-over-slf4j)

    **Note:** log4j-over-slf4j doesn't implement the entire log4j API, so it's possible that it may not work for a particular application

    - To install:

      1. Remove log4j\*.jar files from `$CATALINA_BASE`/webapps/_APPNAME_/WEB-INF/lib

      1. Download slf4j

         [http://www.slf4j.org/download.html](http://www.slf4j.org/download.html)

      1. Copy log4j-over-slf4j-X.X.X.jar and slf4j-api-X.X.X.jar to `$CATALINA_BASE`/webapps/_APPNAME_/WEB-INF/lib

      1. Restart tomcat
