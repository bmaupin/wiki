---
title: Vagrant
---

#### Install Vagrant

[https://www.vagrantup.com/docs/installation/](https://www.vagrantup.com/docs/installation/)

1. Install VirtualBox

   [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

2. Install Vagrant

   ```
   sudo apt install vagrant
   ```

#### Set up a new vagrant box

1. See if hashicorp has a box for the latest Ubuntu LTS: [https://app.vagrantup.com/hashicorp](https://app.vagrantup.com/hashicorp)

   If not, check here: [https://app.vagrantup.com/ubuntu](https://app.vagrantup.com/ubuntu)

1. Initialize the Vagrant box

   ```
   vagrant init ubuntu/focal64
   ```

   (this will create a Vagrantfile in the local directory)

1. (Optional) Customize the Vagrantfile

   For example, if you wish to specify the amount of CPUs or memory:

   ```
   Vagrant.configure("2") do |config|
     config.vm.provider "virtualbox" do |vb|
       vb.memory = 1024
       vb.cpus = 1
     end
   end
   ```

#### Start a vagrant box

```
vagrant up
```

#### Mount a local folder inside the vagrant box

The local folder is automatically mounted inside the running vagrant box under /vagrant

#### Connect to a running vagrant box

```
vagrant ssh
```

#### Shut down a vagrant box

```
vagrant halt
```

#### Delete a vagrant box

```
vagrant destroy
```
