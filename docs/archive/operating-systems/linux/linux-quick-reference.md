---
title: Linux quick reference
---

#### Create a symbolic link

```
ln -s FILE LINK
```

Ex:

```
ln -s /path/to/file . # same as ln -s /path/to/file file
ls -l file
file -> /path/to/file
```

#### Create a formatted date string

```
date +%Y%m%d
```

#### Run command with pipes or redirection as root

```
sudo sh -c 'ls -hal /root/ > /root/test.out'
```

#### Run command for each line of stdout using xargs

```
somecommand | xargs -i echo {}
```

#### Run command as another user

```
sudo -u USERNAME COMMAND
```

To set that user's home variable

```
sudo -Hu USERNAME COMMAND
```

To set that user's full environment

```
sudo -iu USERNAME COMMAND
```

#### Send output to stdout and a file

Use tee

```
somecommand | tee log.txt
```

To append:

```
somecommand | tee -a log.txt
```

#### Run a command detached from the terminal

Use nohup

```
nohup /path/to/some/command &
tail -F nohup.out
```

#### See if a particular port is listening locally:

```
netstat -lntp | grep PORT
```

Ex:

```
netstat -lntp | grep 8443
```

#### See which process is using a device

```
sudo lsof | grep /path/to/mount
```

If that doesn't work:

```
fuser /path/to/mount
```

#### Run a command with low CPU priority

```
nice -n 19 /path/to/command
```

#### Create a patch

```
diff -Naur oldfile newfile > patch
```

or:

```
diff -Naur olddir newdir > patch
```

#### Apply a patch

1. Get the path of the file the patch will apply to

   ```
   head patch | grep ^+++
   ```

1. Change to whatever folder necessary so the path will be correct for the patch to apply, and apply the patch using:

   ```
   patch -p0 < patch
   ```

1. If the patch has folders that don't exist on your system, change to a folder that does, and add 1 for every folder in the patch path that doesn't apply

   Ex:

   - patch file path: +++ somefolder/software/file
   - your setup: /home/user/software/file

   ```
   cd /home/user
   patch -p1 < patch
   ```

#### Get ntpd status

```
ntpq -p localhost
```

#### Configure DNS

Edit /etc/resolv.conf:

```
domain example.com
search example.com
nameserver 192.168.0.1
nameserver 192.168.0.2
```

#### To split large files/folders in order to fit them on a FAT filesystem:

```
tar cvz large-file.iso | split -b 3990m -d - large-file.iso.tgz.
```

For greater compression:

~~`tar cvJ large-file.iso | split -b 3990m -d - large-file.iso.txz.`~~

(Use .7z? [Xz format inadequate for long-term archiving](https://www.nongnu.org/lzip/xz_inadequate.html))

#### To join them back together:

```
cat large-file.iso.tgz\* > large-file.iso.tgz
```

Then be sure to untar the file:

```
tar xvf large-file.iso.tgz
```

#### Format a USB drive

1. Get the device (Ex: /dev/sdc):

   ```
   sudo fdisk -l
   ```

1. Unmount it:

   ```
   sudo umount /dev/sdc1
   ```

1. Repartition it:

   1. `sudo fdisk /dev/sdc`

   1. Delete the existing partition

      ```
      d
      ```

   1. Create a new partition

      ```
      n
      ```

   1. Press _Enter_ 4 times

   1. (Optional) change the partition type

      1. Change the partition type

         ```
         t
         ```

      1. Choose the desired partition type

         - HPFS/NTFS/exFAT (recommended, supported by Linux, OS X, and Windows)

           ```
           7
           ```

         - FAT32:

           ```
           b
           ```

   1. Print the partition table to verify

      ```
      p
      ```

   1. Write the partition table and exit

      ```
      w
      ```

1. Format it:

   1. As exFAT (recommended, supported by Linux, OS X, and Windows):

      1. Make sure exFAT support is installed:

         ```
         mkfs.exfat -v
         ```

         If it isn't, install exFAT support:

         ```
         sudo apt-get install exfat-utils exfat-fuse
         ```

      1. Format as exFAT:

         ```
         sudo mkfs.exfat /dev/sdc1
         ```

   1. As NTFS (for use with Linux and Windows, read-only on OS X):

      ```
      sudo mkfs.ntfs -f /dev/sdc1
      ```

   1. As ext4 (for use with Linux only):

      ```
      sudo mkfs.ext4 /dev/sdc1
      ```

#### Using dd

Specific bs (block size) value won't change the output, but a higher value will probably work faster. By default dd will try to get the block size automatically from `st_blksize`, which is normally fast enough:

```
stat -c=%s disk.img
```

This is normally fast enough. If that returns a low number, you can use `bs=1M`

#### Get memory usage of a process

```
p=eclipse; ps aux | grep -i $p | egrep -v grep | awk '{total = total + $6}END{print total/1024, "MB"}'
```

#### Formatting

1. Unmount the device

   ```
   sudo umount /media/user/device
   ```

1. Format

   - FAT32

     ```
     sudo mkfs.vfat /dev/sdb1
     ```

#### Rsync to a FAT32 partition

[http://serverfault.com/a/144475/58568](http://serverfault.com/a/144475/58568)

Use `--modify-window=1`:

```
rsync -rtv --modify-window=1 source/ /media/user/device/
```

#### Compress old log files

```
find /var/log/something -type f -mtime +30 ! -iname "\*.gz" -exec gzip {} \;
```

Use `-f` to force overwriting old files:

```
find /var/log/something -type f -mtime +30 ! -iname "\*.gz" -exec gzip -f {} \;
```

#### Preserve timestamp of a file after editing

1. Before editing the file, get the original timestamp

   ```
   original_timestamp=`stat -c "%Y" /path/to/file`
   ```

1. Edit the file

1. Restore the original timestamp

   ```
   touch -d @$original_timestamp /path/to/file
   ```
