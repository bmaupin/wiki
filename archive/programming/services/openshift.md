---
title: OpenShift v3
---


## Basics

#### Workflow
1. After you create a new app (see below for instructions), OpenShift will first build it
    1. OpenShift spins up a new build container. Because this container is just for building, its resources will be listed under compute-resources-timebound if you go to *Resources* > *Quota*
    2. OpenShift will choose an appropriate Docker image based on the framework/DB you picked from the catalog
        - For example, if you picked Nodejs, a Docker image with Node.js will automatically be selected (e.g. openshift/nodejs:latest)
    3. Once the build container is running, it performs the build by taking your git repository and combining it with the Docker image into a new Docker image using a process called S2I ([Source-to-Image](https://docs.openshift.com/online/creating_images/s2i.html))
        - You can see this image by going to *Builds* > *Images*. The image stream will be something like project/appname:tag

2. OpenShift will then deploy your app
    1. OpenShift will now create a deployment container. This container will create and start the container that's actually responsible for running your application, based on the new Docker image it created during the build step
        - The deployment container, like the build container, will use terminating resources and will be listed under compute-resources-timebound if you go to *Resources* > *Quota*
        - The application container will use non-terminating resources and will be listed under compute-resources if you go to *Resources* > *Quota*

#### Terminology
- A **project** can have multiple applications
- An **application** can have multiple pods
- A **pod** is built from a docker image plus a repo, then deployed
- An **[Image Stream](https://docs.openshift.com/online/architecture/core_concepts/builds_and_image_streams.html#image-streams)** is an abstract, flexible way to reference an actual Docker Image



## Applications

#### Set up a new app
1. Create a new project
2. *Add to Project* > *Browse Catalog*
3. Pick a framework, etc
4. Continue to fill out the form as instructed
    - You'll typically at a minimum need to provide the application name and git repository


#### Stop an app
1. Go to *Applications* > *Deployments*
2. Click on the build number of the application you wish to stop
3. Find the circle that shows how many pods are running, and click the down arrow until it says *0 pods*



## Builds

#### Get webhook URL

1. Using `oc`, get the build configuration

    ```
    oc describe buildconfig
    ```

2. Look for *Webhook GitHub* or *Webhook Generic* and copy the URL

3. In the OpenShift web interface, go to *Applications* > *Builds* > click the build for your application > *Actions* > *Edit* > *Show advanced options*

4. Scroll down to *Triggers* > click the toggle button next to the secret for the webhook (GitHub or Generic) > copy the secret

5. Replace the secret in the webhook URL with the secret you copied and configure it in your Git/build server as desired



## Secrets

#### Configure SSH keys for a private Git repository
[https://blog.openshift.com/private-git-repositories-part-2a-repository-ssh-keys/](https://blog.openshift.com/private-git-repositories-part-2a-repository-ssh-keys/)



## CLI reference

#### Set up CLI tools
[https://docs.openshift.com/online/cli_reference/get_started_cli.html](https://docs.openshift.com/online/cli_reference/get_started_cli.html)


#### Login
In the web interface click *?* > *Command Line Tools* and copy the line starting with `oc login`


#### SSH to a pod
1. List pods

        oc get pods

2. SSH to the desired pod

        oc rsh podname


#### List everything in a project

    oc get all


#### Delete everything in a project

1. Delete everything except secrets and persistent volume claims

        oc delete all --all

2. Delete any secrets

        oc get secrets
        oc delete secrets ...

3. Delete persistent volume claims

        oc delete pvc --all


#### Delete an app
Note: this can be done from the Web UI, you'd just have to delete all the components individually

1. Get the label for the app you want to delete (look in the `LABELS` column)
    ```
    oc get all --show-labels
    ```

2. Delete the app by deleting everything with that label
    ```
    oc delete all -l app=APPLABEL
    ```

3. Delete secrets and persistent volume claims
    ```
    oc get secrets
    oc delete secrets ...
    oc get pvc
    oc delete pvc ...
    ```



## Templates

#### Create a template from an existing project

Follow the steps here: [https://github.com/bmaupin/kleanup#usage](https://github.com/bmaupin/kleanup#usage)

See also: [https://docs.openshift.com/container-platform/latest/dev_guide/templates.html#export-as-template](https://docs.openshift.com/container-platform/latest/dev_guide/templates.html#export-as-template)



## Common Problems

#### Build is pending and never starts
Builds seem to frequently hang. Provided there are no errors this can often be fixed by manually redoing the build:

1. Go to *Builds* > *Builds* and click the build number
2. Go to *Events* and make sure there are no errors
3. Go to *Details* and make sure the *Duration* is greater than 5 minutes. If not, wait a little bit longer.
4. If there are no errors, at the top click *Cancel Build* > *Rebuild*
