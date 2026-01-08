---
title: VMware Workstation/Player
---

#### Start a VM from the command line

```
vmrun start ~/vmware/myvm/myvm.vmx
```

From SSH:

```
vmrun start ~/vmware/myvm/myvm.vmx nogui
```

#### Uninstall a particular element of VMware

```
sudo ~/Downloads/packages/VMware-Player-3.0.0-203739.x86_64.bundle -u vmware-player
sudo ./VMware-Player-3.0.1-227600.x86_64.bundle -u vmware-workstation
```

Other options:

- `-l` list installed products
- `-t` list installed components

#### Increase the size of a VMware disk

1. First, increase the size of the disk:

   ```
   vmware-vdiskmanager -x 20GB myDisk.vmdk
   ```

   (**Note:** vmware-vdiskmanager doesn't come with VMware Player!)

1. Then, increase the size of the partition using gparted live cd:

   [http://gparted.sourceforge.net/](http://gparted.sourceforge.net/)

#### Decrease the size of a VMware disk

**Note:** This needs additional testing and may not work

This is a lot harder to do because VMware doesn't really provide a way to do this

1. First, decrease the size of the partition to something _less_ than the final size you want using gparted live cd:

   [http://gparted.sourceforge.net/](http://gparted.sourceforge.net/)

1. Then shutdown the VM, close vmware, and move all its vmdk files elsewhere

   ```
   cd ~/vmware
   mkdir temp
   mv win7/\*.vmdk temp
   ```

1. Then, open VMware, delete the old disk from the VM. Add a new one with the desired size. Then add the old one back by adding an existing virtual disk.

1. Use gparted live again to copy the partition from the old (larger) disk to the new (smaller) disk. You can also use it to resize the partition at the same time to fill up all of the new disk

1. Shut down, remove the old (larger) disk from the VM
