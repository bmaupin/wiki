---
title: Android hacking
---

## Misc

#### Download APKs
Use [https://www.apkmirror.com/](https://www.apkmirror.com/)


#### Remount /system as read-write
```
adb shell
su
mount -o remount,rw /system
```

When you're done making changes:
```
mount -o remount,ro /system
```


#### Enable developer options
*Settings* > *About phone* > tap *Build number* 7 times. You should see the message: "You are now a developer!"


#### Unroot
1. If you don't have SuperSU installed, install it
    - [https://play.google.com/store/apps/details?id=eu.chainfire.supersu](https://play.google.com/store/apps/details?id=eu.chainfire.supersu)

    - Or download the latest SuperSU flash file and extract the APK from the common folder  
        [http://download.chainfire.eu/supersu](http://download.chainfire.eu/supersu)

1. Open SuperSU

1. *Settings* > scroll down to *Full unroot* > *Continue*



## Firmware/ROMs

#### Download stock firmware
[https://mirrors.lolinet.com/firmware/](https://mirrors.lolinet.com/firmware/)


#### Flash stock firmware
```
wget https://raw.githubusercontent.com/dlenski/motoflash2sh/master/motoflash2sh.py
python motoflash2sh.py /path/to/flashfile.xml
sudo sh flashfile.sh
```


#### Extract system.img
**Note:** This also applies to oem.img and vendor.img

Motorola firmware:
```
simg2img system.img_sparsechunk.* system.raw.img.moto
dd if=system.raw.img.moto of=system.raw.img ibs=131072 skip=1
rm system.raw.img.moto
sudo mkdir -p /mnt/system
sudo mount system.raw.img /mnt/system
```

LineageOS/CyanogenMod:  
[https://wiki.lineageos.org/extracting_blobs_from_zips.html](https://wiki.lineageos.org/extracting_blobs_from_zips.html)
```
git clone https://github.com/xpirt/sdat2img
python sdat2img/sdat2img.py system.transfer.list system.new.dat system.img
```

Other firmware:
```
simg2img system.img_sparsechunk.* system.raw.img
sudo mkdir -p /mnt/system
sudo mount system.raw.img /mnt/system
```


#### Extract boot.img
**Note:** This also applies to recovery.img and TWRP images

[http://unix.stackexchange.com/a/65316/14436](http://unix.stackexchange.com/a/65316/14436)
1. Setup
    ```
    wget http://android-serialport-api.googlecode.com/files/android_bootimg_tools.tar.gz
    tar xvf android_bootimg_tools.tar.gz
    sudo cp unpackbootimg /usr/local/bin/
    rm android_bootimg_tools.tar.gz mkbootimg unpackbootimg
    ```

1. Unpack the boot image
    ```
    mkdir boot
    unpackbootimg -i boot.img -o boot
    cd boot
    ```

1. Determine the ramdisk compression
    ```
    file boot.img-ramdisk.gz
    ```

1. Extract the ramdisk
    - lzma
        ```
        mv twrp-osprey-2.8.7-r4.img-ramdisk.gz twrp-osprey-2.8.7-r4.img-ramdisk.lzma
        xz -d twrp-osprey-2.8.7-r4.img-ramdisk.lzma
        cpio -idv < twrp-osprey-2.8.7-r4.img-ramdisk
        ```

    - gzip
        ```
        gunzip -c boot.img-ramdisk.gz | cpio -i
        ```
