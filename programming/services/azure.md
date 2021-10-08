---
title: Azure
---

## Misc

#### Deleting a resource

The best way to delete a resource cleanly is to delete the resource group associated with that resource:

1. Go to _Resource groups_

2. Click the menu icon to the right of the resource group you'd like to delete > _Delete resource group_

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
