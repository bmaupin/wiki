---
title: NFS server
---

**Note:** these instructions are for RHEL/CentOS unless otherwise specified

Also see: [http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-nfs-server-export.html](http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-nfs-server-export.html)

1. Install nfs
    ```
    sudo yum install nfs-utils
    ```

1. Ensure necessary services are running and enabled
    ```
    sudo /sbin/chkconfig portmap on
    sudo /sbin/chkconfig nfslock on
    sudo /sbin/chkconfig nfs on
    sudo /sbin/chkconfig --list portmap
    sudo /sbin/chkconfig --list nfslock
    sudo /sbin/chkconfig --list nfs
    sudo /sbin/service portmap start
    sudo /sbin/service nfslock start
    sudo /sbin/service nfs start
    ```

1. Add a new nfs export
    1. Edit /etc/exports

    1. Add a new line in this format:
        ```
        directory hostname(options)
        ```

        Where directory is the directory you want to export, hostname is the hostname of the machine you wish to be able to access the directory, and for options either sync or async (sync is recommended) and rw if you wish for it to be writable.  You can also use IP addresses instead of a hostname, or a range using CIDR notation, for example 192.168.0.0/24.

        Also, use option no_root_squash if you wish for the root user on the client to be able to write to the nfs mount.

        Ex:
        /opt/my_nfs_mount    nfs-client.example.com(rw,sync,no_root_squash)

    - The nfs service needs to be reloaded any time /etc/exports is modified:
        ```
        sudo /sbin/service nfs reload
        ```

1. Configure ports
    1. Edit /etc/sysconfig/nfs

    1. Add these lines:
        ```
        MOUNTD_PORT=4002
        STATD_PORT=4000
        STATD_OUTGOING_PORT=4004
        ```

    - The nfs service needs to be restarted any time /etc/sysconfig/nfs is modified:
        ```
        /sudo /sbin/service nfs restart
        ```

1. Restart the nfs daemon:
    ```
    sudo /sbin/service nfs restart
    ```

1. Configure firewall
    1. Edit /etc/sysconfig/iptables

    2. Add these lines:
        ```
        -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp -s 192.168.0.0/24 --dport 111 -j ACCEPT
        -A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp -s 192.168.0.0/24 --dport 111 -j ACCEPT
        -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp -s 192.168.0.0/24 --dport 2049 -j ACCEPT
        -A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp -s 192.168.0.0/24 --dport 2049 -j ACCEPT
        -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp -s 192.168.0.0/24 --dport 4000:4003 -j ACCEPT
        -A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp -s 192.168.0.0/24 --dport 4000:4003 -j ACCEPT
        ```

1. Restart the firewall
    ```
    sudo /sbin/service iptables restart
    ```
