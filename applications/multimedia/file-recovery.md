---
title: File recovery (testdisk/photorec)
---

## Recover a formatted/corrupted partition (testdisk)

#### References

- [TestDisk Step By Step](http://www.cgsecurity.org/wiki/TestDisk_Step_By_Step)
- [How To Fix: External Disk Drive Suddenly Became RAW](http://html5.litten.com/updated-how-to-fix-external-disk-drive-suddenly-became-raw/)
- [Advanced FAT Repair](http://www.cgsecurity.org/wiki/Advanced_FAT_Repair)
- [Advanced NTFS Boot and MFT Repair](http://www.cgsecurity.org/wiki/Advanced_NTFS_Boot_and_MFT_Repair)

#### Install testdisk

```
sudo apt install testdisk
```

#### Recover a partition

Only follow these steps if your partition has been formatted or corrupted and you cannot see any files:

1. First steps

   1. If this is an external drive, verify the drive is connected

      ```
      $ lsusb
      Bus 001 Device 008: ID 0930:6545 Toshiba Corp. Kingston DataTraveler 102 Flash Drive / HEMA Flash Drive 2 GB / PNY Attache 4GB Stick
      ```

   1. List the partition table

      ```
      $ sudo fdisk -l /dev/sdb

      Disk /dev/sdb: 15.6 GB, 15606349824 bytes
      64 heads, 32 sectors/track, 14883 cylinders, total 30481152 sectors
      Units = sectors of 1 * 512 = 512 bytes
      Sector size (logical/physical): 512 bytes / 512 bytes
      I/O size (minimum/optimal): 512 bytes / 512 bytes
      Disk identifier: 0x00000000

      Disk /dev/sdb doesn't contain a valid partition table
      ```

   1. Try to mount it
      ```
      $ sudo mkdir /mnt/sdb
      $ sudo mount /dev/sdb /mnt/sdb
      mount: you must specify the filesystem type
      $ sudo mount -t vfat /dev/sdb /mnt/sdb
      mount: wrong fs type, bad option, bad superblock on /dev/sdb,
             missing codepage or helper program, or other error
             In some cases useful info is found in syslog - try
             dmesg | tail  or so
      ```

1. Prepare the drive to be recovered

   1. Testdisk will modify the drive to be recovered. If you have enough space, it's best to create an image of the drive/partition and work with that instead:

      ```
      sudo dd if=/dev/sdb of=~/Desktop/flashdrive.img
      ```

   1. If creating an image of the drive isn't possible, unmount the drive to prevent anything else from writing to the drive if it is mounted:
      ```
      sudo umount /media/flashdrive
      ```

1. Run Testdisk

   - To run Testdisk on an image

     ```
     sudo testdisk flashdrive.img
     ```

   - To run Testdisk on a drive
     ```
     sudo testdisk /dev/sdb
     ```

1. If asked, select _Create_ to create a new log file

1. The drive to scan should already be selected. Select _Proceed_

1. Select the partition table type. The default value should be the correct one as Testdisk auto-detects the partition table type

1. Select _Analyse_ > _Quick Search_

1. If you see:

   ```
   The following partition can't be recovered:
        Partition               Start        End    Size in sectors
   >  HPFS - NTFS          14882  63 32 29765  62 31   30480352
   ```

   Select _Continue_ > press _Enter_ > _Deeper Search > Continue_

1. For each partition that is listed:

   ```
   Disk flash-drive.img - 15 GB / 14 GiB - CHS 1898 255 63
        Partition               Start        End    Size in sectors
   >  HPFS - NTFS              0   0 33  1897  80 39   30480352
      HPFS - NTFS              0   1  1  1896 254 63   30475242
   ```

   Highlight the partition using the arrow keys and press _P_ to list the files > _Quit_

1. If none of the partitions found shows a list of files, press _Enter_ > _Quit_ > _Quit_ > _Quit_. The partitions cannot be recovered.

   - If you wish to instead recover individual files, follow the instructions below (photorec). Unfortunately Photorec will not recover filenames or folders. See instructions below if you wish to recover filenames or folder structure.

1. If any of the partitions found shows a list of files, highlight the partition and press _Space_ (the highlight should turn green and there should be a _P_ for primary partition or \* if you'd like it to be bootable) > _Enter_ > _Write_ > _Y_

#### Recover filenames/folders from formatted/corrupted partitions

If Testdisk was unable to recover the partition, you still may be able to get a list of the files on the drive if you have a Windows VM running in Virtualbox:

1. Convert the disk image to a Virtualbox image file. See: [VirtualBox](https://sites.google.com/site/bmaupinwiki/home/applications/virtualization/virtualbox)

1. Attach the Virtualbox image file to the Windows VM and boot it

1. Download and install one of the following programs depending on your need:
   - [R-Studio](http://www.r-studio.com/)
     - Seems to do a good job of listing the files and folder structure
     - The demo version can only recover files < 256 KB
   - [ZAR](http://www.z-a-recovery.com/)
     - Doesn't seem to recover folder structure, but does recover some filenames
     - Size of recovered files is unlimited in the demo version, but you can only recover a limited number of files

## Recover files (photorec)

#### Install photorec (part of the testdisk package)

```
sudo apt install testdisk
```

#### Recover files

1. Create a new folder somewhere to store the recovered files

1. Connect the drive/insert the SD card to recover files from

   - To prevent overwriting the files you wish to recover:
     - If it's an SD card, lock it before inserting it
     - If it's a hard drive or partition, unmount it (after connecting it if it's an external drive)

1. Run photorec

   ```
   photorec
   ```

1. Select the drive to recover files from

1. If desired, go to _File Opt_ and only select the file types you wish to search for

1. Select the partition to recover files from and go to _Search_

1. Select the filesystem type

1. Select _Free_ space to recover deleted files

1. Browse to the destination folder and press _C_ to begin recovering files

#### Fixing recovered .mov files that won't play

[http://superuser.com/a/962793/93066](http://superuser.com/a/962793/93066)

1. Sort the list of recovered files alphabetically

1. If a file ending in .mov is immediately followed by a much smaller file ending in \_ftyp.mov, it can likely be fixed; the \_ftyp.mov file contains header information

1. To fix the video, combine the two files, placing the header file first. Ex:
   ```
   cat f2951104_ftyp.mov f0195200.mov > video.mov
   ```

#### Put recovered files in subfolders by extension

```
for file in recup_dir.*; do extension=${file##*.}; mkdir -p $extension; mv $file $extension; done
```

## Other

#### Recover text from a corrupted document

```
strings file.doc > file.doc.txt
```
