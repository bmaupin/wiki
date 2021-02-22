---
title: RHEL/CentOS quick reference
---

**See: [RHEL/CentOS quick reference](../../../../operating-systems/linux/rhel/rhel-quick-reference)**

## Services

**Note:** For RHEL 7+ see [Systemd](../../../../operating-systems/linux/systemd)

#### To stop/start/restart services:

```
sudo /sbin/service [service name] stop/start/restart
```

Ex:

```
sudo /sbin/service networking restart
```

#### To change startup services:

```
sudo /sbin/chkconfig --list
```

(lists startup services and runlevels)

```
sudo /sbin/chkconfig [service] [on/off/reset] [--level <runlevels>]
```

Ex:

```
sudo /sbin/chkconfig bluetooth off
```

(disables bluetooth service at all runlevels)

```
sudo /sbin/chkconfig cups off --level 5
```

(disables cups at runlevel 5)

```
sudo /sbin/chkconfig cups reset
```

(resets cups service to default runlevels (2,3,4,5))

```
sudo /sbin/chkconfig cups on –level 1234
```

(turns cups service on on runlevels 1,2,3,4)

## Networking

#### To change the hostname/IP address (RHEL 6 and below)

1. Edit /etc/hosts

   ```
   127.0.0.1        localhost.localdomain localhost
   192.168.0.100    myhost.example.com myhost
   ::1              localhost6.localdomain6 localhost6
   ```

   1. If this machine is using DHCP, instead of the IP address for the second line, you can use something like 127.0.1.1

1. Edit /etc/sysconfig/network

   ```
   NETWORKING=yes
   NETWORKING_IPV6=no
   HOSTNAME=myhost.example.com
   GATEWAY=192.168.0.1
   ```

1. Edit /etc/sysconfig/network-scripts/ifcfg-eth0
   (or eth1 for eth1, etc.)

   ```
   DEVICE=eth0
   ONBOOT=yes
   BOOTPROTO=static
   HWADDR=00:01:02:03:04:05
   IPADDR=192.168.0.100
   NETMASK=255.255.255.0
   NETWORK=192.168.0.0
   BROADCAST=192.168.0.255
   ```

   1. If this machine is using DHCP, leave the IPADDR line out, and the BOOTPROTO line should be:

      ```
      BOOTPROTO=dhcp
      ```

      Also, add this line:

      ```
      DHCP_HOSTNAME=myhost.example.com
      ```

      Optionally, add these lines:

      ```
      PEERDNS=no
      PEERNTP=no
      ```

#### Recreate NIC on a VM without incrementing device value (e.g. eth1, eth2)

Back up and remove /etc/udev/rules.d/70-persistent-net.rules, then reboot

## RHN (RHEL only)

#### If the system doesn't appear to be registered with RHN:

```
/usr/sbin/rhnreg_ks --force --profilename `hostname -f` --activationkey=ACTIVATION_KEY
```

If this doesn't work, /etc/sysconfig/rhn/up2date may have been changed from the original. To fix this:

1. Make sure the serverURL is set to https://xmlrpc.rhn.redhat.com/XMLRPC
   ```
   serverURL=https://xmlrpc.rhn.redhat.com/XMLRPC
   ```
1. If that doesn't work:
   1. Get the version of rhn-client-tools on the machine:
      ```
      rpm -qa rhn-client-tools
      ```
   1. On a machine that is registered with RHN, download that version of rhn-client-tools:
      ```
      yumdownloader rhn-client-tools-X.X.X
      ```
   1. Copy it to the original machine, and install it:
      ```
      scp rhn-client-tools-X.X.X mymachine:~
      rpm -iv --force rhn-client-tools-X.X.X
      ```
