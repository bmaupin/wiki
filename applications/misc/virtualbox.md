---
title: VirtualBox
---

## Misc

#### Suspending a VM
- Don't suspend the VM from within the OS. Instead, close the VM window and select *Save the machine state*  
[http://askubuntu.com/a/63545/18665](http://askubuntu.com/a/63545/18665)



## Managing VMs from the command line

#### List the VMs
```
vboxmanage list vms
```


#### Get the power state of a VM
```
vboxmanage showvminfo "VM name" | grep ^State
```


#### Start a VM
```
vboxmanage startvm "VM name" --type headless
```


#### Safely shut down a VM
```
vboxmanage controlvm "VM name" acpipowerbutton
```


#### Show port forwarding rules
```
vboxmanage showvminfo "VM name" | grep Rule
```


#### Delete a port forwarding rule
```
$ vboxmanage showvminfo "VM name" | grep Rule
NIC 1 Rule(0):   name = Rule 1, protocol = tcp, host ip = , host port = 15672, guest ip = , guest port = 15672
$ vboxmanage controlvm "VM name" natpf1 delete "Rule 1"
$ vboxmanage showvminfo "VM name" | grep Rule
```


#### Create a port forwarding rule
```
$ vboxmanage controlvm "VM name" natpf1 "Rule 1,tcp,,15671,,15671"
$ vboxmanage showvminfo "VM name" | grep Rule
NIC 1 Rule(0):   name = Rule 1, protocol = tcp, host ip = , host port = 15671, guest ip = , guest port = 15671
```



## Storage

#### Grow virtual disk
**Note:** The virtual disk type must be VDI. If not, see below to convert it.
1. Power off the VM

1. Resize the disk
    ```
    vboxmanage modifyhd /path/to/image.vdi --resize 61440
    ```
    (size is in MB)

1. Power on the VM and resize the filesystem within the OS
    - [LVM](https://sites.google.com/site/bmaupinwiki/home/operating-systems/linux-unix/lvm)


#### Convert a virtual disk from VMDK to VDI
1. Clone the virtual disk to a new VDI image
    ```
    vboxmanage clonehd --format VDI /path/to/image.vmdk /path/to/image.vdi
    ```

1. Remove the old disk image
    - VirtualBox > select the VM > *Settings* > *Storage* > right-click the old disk image > *Remove Attachment*

1. Add the new disk image
    - Right-click *Controller: SATA* > *Add Hard Disk* > *Choose Existing Disk* > browse to the new disk image you created > *Open* > *OK*


#### Convert a raw disk image (created by dd) to VDI
```
vboxmanage convertfromraw /path/to/disk.img /path/to/disk/vdi
```



## Networking

#### To allow VMs to talk to each other as well as the outside network
This method requires a DHCP server for your outside network with available addresses:
1. Select the VM > *Settings* > *Network* > *Adapter 1* > *Attached to* > *Bridged Adapter*

1. *Name* > select the appropriate adapter to be bridged (e.g. eth0 for a wired connection, wlan0 for wireless) > *OK*

If that isn't an option:
1. Power off the VM (required to add or remove network adapters)

1. Set the first network adapter for the VM to *NAT* (the default)
    1. Select the VM > *Settings* > *Network* > *Adapter 1* > *Attached to* > *NAT*

1. Set the second network adapter for the VM to Host-only Adapter
    1. *Adapter 2* > check *Enable Network Adapter* > *Attached to* > *Host-only Adapter* > *OK*
        - If *OK* is greyed out and you see *Invalid settings detected*:
            1. *Cancel* > *File* > *Host Network Manager* > *Create* > *Close*

            1. Repeat the above instructions to add a new network adapter to the newly created VM

1. Power on the VM

1. Configure the second NIC
    - Ubuntu/Debian:
        - Configuration should be automatic

    - RHEL/CentOS:
        1. Copy the configuration from the first NIC
            ```
            sudo cp /etc/sysconfig/network-scripts/ifcfg-eth0 /etc/sysconfig/network-scripts/ifcfg-eth1
            ```

        1. Get the MAC address for the new adapter (the one with eth1 in the name), or you can get it from the Virtualbox settings:
            ```
            cat /etc/udev/rules.d/70-persistent-net.rules
            ```

        1. Edit /etc/sysconfig/network-scripts/ifcfg-eth1
            ```
            sudo vi /etc/sysconfig/network-scripts/ifcfg-eth1
            ```

            1. Update DEVICE:
                ```
                DEVICE=eth1
                ```

            1. Update HWADDR. Ex:
                ```
                HWADDR=08:00:27:89:14:B8
                ```

            1. Delete the UUID line

        1. Restart the network
            ```
            sudo service network restart
            ```



## Guest additions

#### Install VirtualBox guest additions on Ubuntu
1. After installing Ubuntu, install prerequisite packages for the VirtualBox Guest Additions
    ```
    sudo apt-get -y install build-essential dkms linux-headers-generic
    ```

1. Install the VirtualBox Guest Additions:  
    [http://askubuntu.com/a/22745/18665](http://askubuntu.com/a/22745/18665)
    1. *Devices* > *Insert Guest Additions CD image*

    1. Open a terminal and run:
        ```
        /media/$USER/VBOXADDITIONS_X.X.X_XXXXXX/autorun.sh
        ```

    1. Reboot

    1. If you get error messages related to guest additions or they don't appear to be working, try reinstalling them and reboot again


## Troubleshooting

#### If you are unable to attach USB devices
Your user must be part of the vboxusers group
1. Use the id command to list your group membership
    ```
    id
    ```

1. If vboxusers isn't in the list of groups, run this command to add your user
    ```
    sudo usermod -a -G vboxusers $USER
    ```

1. Log out and log back in to update your membership. If you'd rather not log out:
    1. Completely close VirtualBox

    1. Run this command in a terminal to update your groups temporarily:
        ```
        su - $USER
        ```

    1. Run the virtualbox command to open VirtualBox with the new groups
        ```
        virtualbox
        ```


#### Errors when trying to start a VM from the command line
- `VBoxManage: error: This VM was configured to use 3D acceleration.`
    - Edit the .vbox file for the VM and set ```
        accelerate3D="false"
        ```

- `VBoxManage: error: Failed to load unit 'HGCM' (VERR_SSM_UNEXPECTED_DATA)`
    1. Delete the saved state:
        ```
        vboxmanage discardstate "VM name"
        ```

    1. Then try to start the VM again
