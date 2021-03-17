---
title: Ubuntu quick reference
---

#### Remove old kernels

(By default will keep the current kernel plus two more)

```
sudo apt-get -y install bikeshed
sudo purge-old-kernels
```

Or:

1. Fully update the system

   ```
   sudo apt-get update
   sudo apt-get dist-upgrade
   ```

1. Reboot

1. Show the list of what's to be removed

   ```
   dpkg -l linux-image* linux-restricted* | grep ^i | egrep -v "linux-image-generic|linux-restricted-modules-common|`uname -r`" | awk '{print $2}' | paste -sd " "
   ```

1. Remove old kernels

   ```
   dpkg -l linux-image* linux-restricted* | grep ^i | egrep -v "linux-image-generic|linux-restricted-modules-common|`uname -r`" | awk '{print $2}' | paste -sd " " | xargs sudo apt-get remove
   ```
