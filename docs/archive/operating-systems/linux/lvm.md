---
title: LVM
---

**Note:** These instructions are for RHEL/CentOS unless otherwise specified

Also see: [http://www.centos.org/docs/5/html/Cluster_Logical_Volume_Manager/](http://www.centos.org/docs/5/html/Cluster_Logical_Volume_Manager/)

The structure looks kind of like this:

- partition/physical volume
  - volume group
    - logical volume
      - filesystem (ex: ext3)

## Creating LVMs

#### Create a partition for use with lvm

Use fdisk

```
fdisk /dev/sdb
```

- `n` (add a new partition)
- `t` (change type)
- `8e` (for linux LVM)
- `p` (print partition table)
- `w` (write)

#### Show physical volumes

```
sudo pvdisplay
```

#### Initialize physical volume

```
sudo pvcreate /dev/sdb1
```

#### Show volume groups

```
sudo vgdisplay
```

#### Create volume group

```
sudo vgcreate VolGroup00 /dev/sdb1
```

#### Show all logical volumes

```
sudo lvdisplay
```

#### Show logical volumes in a volume group

```
sudo lvdisplay -v VolGroup00
```

#### Create new 40G logical volume

```
sudo lvcreate -L 40G -n LogVol07 VolGroup00
```

#### Create a new logical volume that uses 100% of the volume group space

```
sudo lvcreate -l 100%VG -n LogVol00 VolGroup01
```

#### Create a new logical volume that uses 100% of the free space in the volume group

```
sudo lvcreate -l 100%FREE -n LogVol00 VolGroup01
```

#### Format a filesystem

ext4:

```
sudo mkfs.ext4 /dev/mapper/VolGroup01-LogVol07
```

ext3:

```
sudo mke2fs -j /dev/mapper/VolGroup01-LogVol07
```

#### Put in fstab

```
/dev/VolGroup00/LogVol07 /u01                    ext4    defaults        1 2
/dev/VolGroup00/LogVol07 /u01                    ext3    defaults        1 2
```

#### Create the directory

```
sudo mkdir /u01
```

#### Mount

```
sudo mount -a
```

Or:

```
sudo mount /u01
```

## Removing LVMs

1. Unmount the filesystem

   ```
   sudo umount /u01
   ```

1. Remove the LVM

   ```
   sudo lvremove /dev/mapper/VolGroup01-LogVol00
   ```

1. Remove the volume group

   ```
   sudo vgremove VolGroup01
   ```

1. Remove the physical volume/partition

   ```
   sudo pvremove /dev/sdb1
   ```

1. Delete the partition table
   1. `sudo fdisk /dev/sdb`
   1. Press p to show the partition table
   1. Press d to delete the partition
   1. Press p to show the partition table
   1. Press w to write the partition table and quit

## Growing LVMs (and the filesystems they contain)

1. Unmount the filesystem

   ```
   sudo umount /u01
   ```

1. Grow the lvm

   ```
   sudo lvextend -L80G /dev/VolGroup00/LogVol07
   ```

1. Check the filesystem for errors

   ```
   sudo e2fsck -f /dev/VolGroup00/LogVol07
   ```

1. Resize the filesystem
   ```
   sudo resize2fs /dev/VolGroup00/LogVol07
   ```
