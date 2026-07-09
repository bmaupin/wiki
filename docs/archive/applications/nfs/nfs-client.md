---
title: NFS client
---

**Note:** these instructions are for RHEL/CentOS unless otherwise specified

Also see: [http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-nfs-client-config.html](http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-nfs-client-config.html)

1. Install nfs
    ```
    sudo yum install nfs-utiils
    ```
1. Ensure portmap service is enabled and running
    ```
    sudo /sbin/chkconfig portmap on
    sudo /sbin/chkconfig --list portmap
    sudo /sbin/service portmap start
    ```

#### Mount nfs on boot
Add this in /etc/fstab:
```
nfs-server.example.com:/opt/nfs-mount            /opt/my-folder        nfs     rsize=8192,wsize=8192,timeo=14,retry=5,intr,tcp
```


#### Manually mount nfs
```
mount -t nfs nfs-server.example.com:/opt/nfs-mount /opt/my-folder
```
