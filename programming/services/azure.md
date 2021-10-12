---
title: Azure
---

## Misc

#### Deleting a resource

The best way to delete a resource cleanly is to delete the resource group associated with that resource:

1. Go to _Resource groups_

2. Click the menu icon to the right of the resource group you'd like to delete > _Delete resource group_

## App Service

#### Build process

The build process is run by [Oryx](https://github.com/microsoft/Oryx)

Oryx will build the application based on the detected language. See its documentation on how it detects and builds languages.

#### Deployment process

The deployment process is run by [kudu](https://github.com/projectkudu/kudu)

#### Deploying Java apps using Local Git

Local Git isn't officially supported for Java apps. To get it working:

1. Create a `.deployment` file with this content:

   ```ini
   [config]
   command = bash deployment.sh
   ```

1. Create a `deployment.sh` file with this content:

   ```bash
   # Echo all commands in this script
   set -x

   # Install Java (the Azure App Service build runs using https://github.com/microsoft/Oryx)
   /opt/oryx/oryx prep -s "$DEPLOYMENT_SOURCE" 2>&1

   # Gradle needs to know where Java is
   export JAVA_HOME=$(ls -d /tmp/oryx/platforms/java/*)

   # Clean any previous builds and build the jar file
   ./gradlew clean bootJar 2>&1

   # Get the path to the app jar file
   APP_JAR=$(find build/ -name "*.jar" -not -name "*-plain.jar")

   # Copy the app jar file to /home/site/wwwroot/app.jar which will be run by default
   # (https://github.com/Azure-App-Service/java/blob/dbba8f05c433df825a06d7a27bbf5060b1c4d812/shared/init_container.sh#L146)
   cp "${DEPLOYMENT_SOURCE}/${APP_JAR}" "${DEPLOYMENT_TARGET}/app.jar"
   ```

   Customize as needed, e.g. for Maven you might use this instead:

   ```bash
   ./mvnw clean package 2>&1
   APP_JAR=$(find target/ -name "*.jar" -not -name "*-plain.jar")
   ```

   You can also use the [built-in Oryx build logic for Java](https://github.com/microsoft/Oryx/blob/main/doc/runtimes/java.md) by replacing the `oryx` line with this:

   ```bash
   /opt/oryx/oryx build --platform java --output "$DEPLOYMENT_TARGET" "$DEPLOYMENT_SOURCE" 2>&1
   ```

   However, it seems to run `mvn clean compile` so you'll still need to run `mvn clean package` manually in order to generate the `.jar` file.

## Web apps

#### Create a new web app from a Github repo

1. _Create a resource_

2. _Web_ > _Web App_

   - **Note:** Don't choose _Web App for Containers_. This will only allow you to deploy your app by creating and updating a container for the app itself

3. Once the app resource has been created, go to _Deployment_ > _Deployment options_ to set up a repository for automated deployments

4. Define any environment variables as desired (see below)

#### Set environment variables

1. _Settings_ > _Application settings_ > _Application settings_

2. Make sure to click _Save_ when you're done

#### Monitoring web app deployments from Github

Go to _Deployment_ > _Deployment options_

#### SSH into web app container instance

[https://docs.microsoft.com/en-us/azure/app-service/containers/app-service-linux-ssh-support#open-ssh-session-from-remote-shell](https://docs.microsoft.com/en-us/azure/app-service/containers/app-service-linux-ssh-support#open-ssh-session-from-remote-shell)

#### View logs

1. Enable logging

   1. _Monitoring_ > _Diagnostics logs_

   2. _Docker Container logging_ > change it to something other than _Off_

   3. _Save_

2. SSH into the container instance (see above)

3. Logs will be located in /home/LogFiles

   - The log naming is inconsistent, but the log you want will be one of the more recent ones and should grow in size

## VMs

#### Restrict access to a VM

1. _Settings_ > _Networking_

2. Under _Inbound port rules_ click on the specific entry you'd like to restrict

3. Change the _Source_ as desired > _Save_
