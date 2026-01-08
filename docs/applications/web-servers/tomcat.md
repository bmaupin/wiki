---
title: Apache Tomcat
---

#### Environment variables
- `CATALINA_BASE`
    - The root of a particular Tomcat instance (the same as `$CATALINA_HOME` if multiple instances aren't configured)
    - This points to the location of configuration files, logs, startup scripts, web apps, and work/temp folders
- `CATALINA_HOME`
    - The root of your Tomcat installation
    - This points to where the Tomcat binaries are located

The environment variables are normally set in the startup scripts for Tomcat
- RHEL 7:
    - See: /etc/tomcat/tomcat.conf
- RHEL 6:
    - See: /etc/tomcat6/tomcat6.conf


#### Undeploy (delete) a deployed Tomcat application
RHEL 6:
1. Set `CATALINA_BASE` and `CATALINA_HOME`
    ```
    source /etc/tomcat6/tomcat6.conf
    ```

1. If the application was deployed as a WAR file:
    1. Remove the application from $CATALINA_BASE/webapps
        ```
        sudo mv $CATALINA_BASE/webapps/myapp.war $CATALINA_BASE/myapp.war-`date +%Y%m%d`
        ```

    1. If Tomcat is running, it should automatically remove the deployed app from $CATALINA_BASE/webapps and $CATALINA_BASE/work/Catalina/localhost. Watch the folder and wait for it to be removed:
        ```
        ls $CATALINA_BASE/webapps
        ls $CATALINA_BASE/work/Catalina/localhost
        ```

        When the app is undeployed, the subfolder with the same name as your WAR file will disappear (e.g. $CATALINA_BASE/webapps/myapp, $CATALINA_BASE/work/Catalina/localhost/myapp)

1. If the application is deployed using a context fragment (i.e. via an XML file in $CATALINA_HOME/conf/Catalina/localhost):
    1. Get the location of the war file
        ```
        $ grep docBase $CATALINA_HOME/conf/Catalina/localhost/idp.xml
        <Context docBase="/opt/shibboleth-idp/war/idp.war"
        ```

    1. If you want to fully remove the application (you won't be replacing it with a new version):  
    **Warning:** This will also remove the context fragment XML file
        1. Remove the old WAR file
            ```
            sudo mv /opt/shibboleth-idp/war/idp.war /opt/shibboleth-idp/war/idp.war-`date +%Y%m%d`
            ```

        1. If Tomcat is running, it should automatically remove the deployed app from $CATALINA_BASE/work/Catalina/localhost and the context fragment from $CATALINA_HOME/conf/Catalina/localhost:
            ```
            ls $CATALINA_HOME/conf/Catalina/localhost
            ls $CATALINA_BASE/work/Catalina/localhost
            ```

    1. If you intend on updating the application with a new WAR file:
        1. Make a backup copy of the old WAR file
            ```
            sudo cp /opt/shibboleth-idp/war/idp.war /opt/shibboleth-idp/war/idp.war-`date +%Y%m%d`
            ```


#### Update a deployed Tomcat application
1. Undeploy the old WAR file
    1. See above

1. Once the app is undeployed, deploy the new WAR file
    1. If the old WAR file was in the webapps folder:
        1. Put the new WAR file in place
            ```
            sudo cp myapp.war $CATALINA_BASE/webapps
            ```
        1. Watch the webapps folder to make sure the app is deployed
            ```
            ls $CATALINA_BASE/webapps
            ```

            If you don't see a subfolder with the same name as your WAR file (e.g. $CATALINA_BASE/webapps/myapp) within a minute or so, check the logs for errors

    1. If the old WAR file was deployed using a context fragment:
        1. Put the new WAR file in place
            ```
            sudo cp idp.war /opt/shibboleth-idp/war
            ```
        1. Watch the work folder to make sure the app is deployed
            ```
            ls -l $CATALINA_HOME/work/Catalina/localhost/idp/
            ```


#### Customizing application context
1. Copy the filename of the application's WAR file from $CATALINA_BASE/webapps (e.g. myApp.war)

1. Create a new context fragment file in $CATALINA_HOME/conf/Catalina/localhost
    - Use the same filename as the war file, but replace the .war extension with .xml (e.g. myApp.xml)

1. Add the xml header and an empty `<Context>` element

    ```xml
    <?xml version="1.0"?>
    <Context>
    </Context>
    ```

1. Add any customizations as desired

    ```xml
    <Context swallowOutput="true">
        <WatchedResource>...
    ```

1. If this is a new context file, it should automatically be picked up and applied by Tomcat. Otherwise, Tomcat may need
to be restarted

    ```
    sudo systemctl restart tomcat
    ```
