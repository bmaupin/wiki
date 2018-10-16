---
title: VMware ESXi
---

## Misc commands
(to be used with SSH--see below for enabling SSH)

#### Test connectivity (telnet isn't available)
[http://kb.vmware.com/kb/2020669%E2%80%8E](http://kb.vmware.com/kb/2020669%E2%80%8E)
```
nc-z IP PORT
```

Ex:
```
nc -z 192.168.1.10 3260
```


#### List VMs (get vmIds):
```
vim-cmd vmsvc/getallvms
```


#### VM status:
```
vim-cmd vmsvc/power.getstate VMID
```


#### Power on/off a VM:
```
vim-cmd vmsvc/power.[on/off] VMID
```


#### Get the IP address of a VM:
```
vim-cmd vmsvc/get.summary VMID | grep ipAddress
```


#### To list available commands:
```
vim-cmd help
vim-cmd vmsvc
```


#### Standard VM operations:
```
vim-cmd vmsvc/power.getstate VMID
vim-cmd vmsvc/power.on VMID
vim-cmd vmsvc/power.off VMID
vim-cmd vmsvc/power.suspend VMID
vim-cmd vmsvc/power.reset VMID
vim-cmd vmsvc/power.shutdown VMID
vim-cmd vmsvc/power.reboot VMID
vim-cmd vmsvc/power.hibernate VMID
vim-cmd vmsvc/snapshot.create VMID SNAPSHOTNAME SNAPSHOTDESCRIPTION INCLUDEMEMORY
```

Ex:
```
vim-cmd "vmsvc/snapshot.create XXXX FIRST_SNAPSHOT MY_FIRST_SNAPSHOT_1"
vim-cmd vmsvc/snapshot.revert VMID SNAPSHOTLEVEL SNAPSHOTINDEX
```

```
vim-cmd "vmsvc/snapshot.revert XXXX 1"
vim-cmd vmsvc/snapshot.removeall VMID
vim-cmd vmsvc/snapshot.remove VMID REMOVECHILDREN SNAPSHOTLEVEL SNAPSHOTINDEX
vim-cmd vmsvc/snapshot.get VMID
```


#### Remove a VM:
```
vim-cmd vmsvc/unregister VMID
```
Then delete the vm directory from the datastore (/vmfs/...)


#### Maintenance mode for ESX host:
**Note:** unfortunately this command will not evacuate/VMotion your VMs to rest of the cluster
```
vim-cmd hostsvc/maintenance_mode_enter
vim-cmd hostsvc/maintenance_mode_exit
```


#### Show the DCUI (direct console user interface)
(Thanks [Josh](http://bmaupin.wordpress.com/about/#comment-81))
```
dcui
```

Ctrl-C to exit



## Installation

#### Installation Problems
If you get an error stating you need to Disable the CPUID value or enable legacy OS support:
1. At the initial bootloader screen (when booting from the ISO), press TAB to edit the boot options
1. Hold down the left-arrow key to move the cursor back to the beginning of the boot options, and add "nocheckCPUIDLimit" right after "vmkernel.gz", so that the first part of the boot options BEFORE the first "---" reads: "mboot.c32 vmkernel.gz nocheckCPUIDLimit ---"
    1. In the new ESXi 4.0 bootloader, more modules have been added to the list, including a vmkboot.gz, which now loads before the vmkernel.gz module.
        This means the correct loader syntax would actually read: mboot.c32 vmkboot.gz nocheckCPUIDLimit — vmkernel.gz — [etc].
1. Press ENTER.
1. If you were able to get the install to work with the nocheckCPUIDlimit, during the boot, hit shift o, and a screen will appear with advanced options at the bottom. Enter the nocheckCPUIDlimit and press enter, the system will boot to 3i. After boot, connect to the server using the VI client, select the host, go to the Configuration tab, Software, choose Advanced Settings, expand Vmkernel, select Boot, and uncheck Vmkernel.Boot.checkCPUIDlimit. Click OK and the server will boot without intervention.


#### Enter the license
Select the host > Configuration > Software > 
Licensed Features > ESX Server License Type > Edit... > 
Assign a new license key to this host > Enter Key... > (enter key) > OK


#### To get to a terminal
1. At main ESXi screen, press Alt-F1
1. Type "unsupported"
1. Type in root password


#### Enable SSH (from terminal)
1. Edit /etc/inetd.conf
    ```
    vi /etc/inetd.conf
    ```
1. Uncomment ssh line (remove # from line that starts with #ssh)
1. Save the file (:wq)
1. Restart inetd
    ```
    kill -HUP `ps | grep inetd`
    ```


#### Add non-root user as an admin
1. Log in to infrastructure client
1. Select the host icon
1. In the right side of the screen, click on the "Users & Groups" tab
1. Right-click in the window, click Add...
1. Type in a login (and optionally user name)
1. Type a password
1. Type "root" into the Group box and click Add
1. Type "localadmin" into the Group box and click Add
1. Click OK
1. Click on the Permissions tab
1. Right-click in the window, click Add Permission...
1. In the left side of the screen, click Add
1. Select username, click Add, OK
1. In the dropdown box on the right, choose Administrator, then click OK


#### Set up SSH for non-root users
1. Log in to the console
1. Edit the inetd.conf
    ```
    vi /etc/inetd.conf
    ```
1. Search for the following line (type: "/ssh") (This is the line you uncommented to enable SSH in the first place.)
    ```
    ssh stream tcp nowait root /sbin/dropbearmulti dropbear ++min=0,swap,group=shell -i
    ```
1. Add -w to the end of this line: (type: "i" for insert mode):
    ```
    ssh stream tcp nowait root /sbin/dropbearmulti dropbear ++min=0,swap,group=shell -i -w
    ```
1. Exit and save the file (press escape, type ": x")
1. Edit the file /etc/passwd:
    1. Change the home directory from /home/[user] to /
    1. Change the login from /bin/false or /bin/nologin to /bin/ash
    1. Save the file
1. Restart the network:
    ```
    kill -HUP `ps | grep inetd`
    ```
Now you can log in with SSH using your new unprivileged user
Use `su -` to change to the root user.


#### Set up useful scripts
(Thanks [Josh](http://bmaupin.wordpress.com/about/#comment-81) for the improvements)

vi /opt/get-ips.sh

```
#!/bin/ash
for item in $(vim-cmd vmsvc/getallvms | egrep ^[0-9]+ | awk '{print $1}');do
    echo -en "${item} $(vim-cmd vmsvc/get.summary ${item} | grep ipAddress) \n"
done
```

vi /opt/get-power.sh

```
#!/bin/ash
for item in `vim-cmd vmsvc/getallvms | awk '{print $1}' | egrep -v Vmid`; do echo "${item}"; vim-cmd vmsvc/power.getstate "${item}"; done
```

chmod 744 /opt/get*.sh


#### Set up ESXi to do DHCP with a hostname
**Warning:** use caution when following these instructions so you don't accidentally duplicate an IP
1. Log in to infrastructure client, click on host, click configuration tab
1. Click networking, and then for virtual switch: vSwith0 click Properties...
1. Select Management Network, Edit
1. Click Use the following IP settings, click OK
1. Select Management Network and click Edit again
1. By VMkernel Default Gateway click Edit...
1. Click the DNS configuration tab, and type the hostname in Name, example.com in Domain and in the last box (look for hosts in the following domains) then do the steps below to "set up esxi to send dhcp hostname"


#### Set up ESXi to send DHCP hostname
1. SSH to the machine
1. 
    ```
    mkdir /tmp/oem/
    ```
1. 
    ```
    tar xzf /bootbank/oem.tgz -C /tmp/oem
    ```
1. 
    ```
    mkdir -p /tmp/oem/etc/rc.local.d
    ```
1. 
    ```
    vi /tmp/oem/etc/rc.local.d/send-hostname
    ```
    ```
    #! /bin/ash
    if [ -r /var/run/dhcp-vmk0.pid ]; then
        kill $(cat /var/run/dhcp-vmk0.pid)
        /bin/busybox udhcpc -i vmk0 -p /var/run/dhcp-vmk0.pid --retries=20 -H $(hostname | cut -d . -f 1)
    fi
    ```
1. 
    ```
    chmod +x /tmp/oem/etc/rc.local.d/send-hostname
    ```
1. 
    ```
    cd /tmp/oem
    ```
1. 
    ```
    tar cvzf /bootbank/oem.tgz *
    ```
1. 
    ```
    cp /tmp/oem/etc/rc.local.d/send-hostname /etc/rc.local.d/ /etc/rc.local.d/send-hostname
    ```


#### Create scratch folders
Example for adding folders named vmware-01 through -32:
1. Enable SSH on the ESXi host
1. SSH to the ESXi host
1. 
    ```
    cd /vmfs/volumes/scratch-datstore
    for n in $(seq -w 1 32); do mkdir vmware-$n; done
    ```
