---
title: Azure
---

## Misc

#### Deleting a resource
The best way to delete a resource cleanly is to delete the resource group associated with that resource:
1. Go to *Resource groups*

2. Click the menu icon to the right of the resource group you'd like to delete > *Delete resource group*


## Web apps

#### Create a new web app from a Github repo
1. *Create a resource*

2. *Web* > *Web App*
    - Don't choose *Web App for Containers*. This will only allow you to deploy your app by creating and updating a container for the app itself


#### Monitoring web app deployments from Github
Go to *Deployment* > *Deployment options*


#### Set environment variables
*Settings* > *Application settings* > *Application settings*


#### SSH into web app container instance
[https://docs.microsoft.com/en-us/azure/app-service/containers/app-service-linux-ssh-support#open-ssh-session-from-remote-shell](https://docs.microsoft.com/en-us/azure/app-service/containers/app-service-linux-ssh-support#open-ssh-session-from-remote-shell)


#### View logs
1. Enable logging
    1. *Monitoring* > *Diagnostics logs*

    2. *Docker Container logging* > change it to something other than *Off*

    3. *Save*

2. SSH into the container instance (see above)

3. Logs will be located in /home/LogFiles
    - The log naming is inconsistent, but the log you want will be one of the more recent ones and should grow in size


## VMs

#### Restrict access to a VM
1. *Settings* > *Networking*

2. Under *Inbound port rules* click on the specific entry you'd like to restrict

3. Change the *Source* as desired > *Save*
