---
title: Install Ubuntu/Xubuntu
---

#### Basic installation

1. Back everything up

1. Download Ubuntu

   **Note:** For the best experience, download the latest LTS version

   - In most cases you'll want to [download Ubuntu](http://www.ubuntu.com/download/desktop)

   - If you're looking for a more lightweight alternative for an older computer you may want to instead [download Xubuntu](http://xubuntu.org/getxubuntu/)

1. Create the installation media

   - Copy Ubuntu/Xubuntu to a USB stick

     - [Using Linux](http://www.ubuntu.com/download/desktop/create-a-usb-stick-on-ubuntu)
     - [Using macOS](http://www.ubuntu.com/download/desktop/create-a-usb-stick-on-mac-osx)
     - [Using Windows](http://www.ubuntu.com/download/desktop/create-a-usb-stick-on-windows)

   - Or burn Ubuntu/Xubuntu to a DVD
     - [Using Linux](http://www.ubuntu.com/download/desktop/burn-a-dvd-on-ubuntu)
     - [Using macOS](http://www.ubuntu.com/download/desktop/burn-a-dvd-on-mac-osx)
     - [Using Windows](http://www.ubuntu.com/download/desktop/burn-a-dvd-on-windows)

1. [Install Ubuntu/Xubuntu](http://www.ubuntu.com/download/desktop/install-ubuntu-desktop)

#### Advanced installation

1. Boot to the BIOS and disable Secure Boot

   [https://askubuntu.com/a/843678/18665](https://askubuntu.com/a/843678/18665)

1. If it has Windows installed, boot the install media and select _Try Ubuntu_ (instead of _Install Ubuntu_)

   1. Open GParted, and delete all the partitions

   1. Then start the install

1. _Updates and other software_

   1. _Select Minimal installation_

   1. Check _Download updates while installing Ubuntu_

   1. Check _Install third-party software for graphics and Wi-Fi hardware and additional media formats_

1. _Installation Type_

   1. Select _Erase disk and install Ubuntu_

   1. To enable encryption

      1. Click _Advanced features_

      1. Select _Use LVM with the new Ubuntu installation_

      1. Check _Encrypt the new Ubuntu installation for security_ > _OK_

1. (Optional) Resize the swap partition

   Ubuntu may create a swap partition of only 1 GB, which isn't really enough if you want to use hibernate and seems a bit undersized in general

   1. Once the installation has finished, click _Continue Testing_

   1. Resize the swap partition

      - If you're using LVM

        1. Open a terminal window

        1. Reduce the size of the primary partition, e.g.

           (These examples will increase the swap partition to 32 GB)

           ```
           sudo lvreduce --resizefs -L 32G /dev/vgubuntu/root
           ```

        1. Increase the size of the swap. e.g.

           ```
           sudo lvextend -L 32G /dev/vgubuntu/swap_1
           ```

        1. Increase the size of the primary partition to use the remaining available free space

           ```
           sudo lvextend --resizefs -l +100%FREE /dev/vgubuntu/root
           ```

        1. Format the swap partition

           ```
           sudo mkswap /dev/vgubuntu/swap_1
           ```

      - If you're not using LVM, resize the swap partition using GParted

   1. Reboot
