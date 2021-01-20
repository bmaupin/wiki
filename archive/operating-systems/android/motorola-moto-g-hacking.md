---
title: Motorola Moto G hacking
---

**Note:** The notes here apply to the following phones:

- Moto G 2013 (1st gen)
- Moto G 2014 (2nd gen)
- Moto G 2015 (3rd gen)

#### Boot to fastboot mode

Power off the phone, press and hold volume down button, press and hold power button, wait for about 4 seconds and then release both buttons

#### Boot to recovery mode

1. Boot to fastboot mode (see above)
1. Boot to recovery mode

   **Note:** recovery mode may be a little slow to load, just wait a minute or two and it should load

   - Moto G 2015

     1. Press volume down until you see _RECOVERY MODE_
     1. Press power

   - Moto G 2013
     1. Press volume down and select _Recovery_
     1. Press volume up

1. If you get to a screen that says "No command"
   1. Press and hold the power button for 2-3 seconds
   1. Without releasing power button, press volume up button and release the volume up button
   1. Release the power button

#### Rooting

1. Unlock the bootloader (see below)

1. Download:

   1. Compatible recovery

      - Moto G 2015

        [http://forum.xda-developers.com/2015-moto-g/orig-development/twrp-twrp-moto-g-2015-t3170537](http://forum.xda-developers.com/2015-moto-g/orig-development/twrp-twrp-moto-g-2015-t3170537)

      - Moto G 2014

        [http://forum.xda-developers.com/moto-g-2014/orig-development/recovery-twrp-2-8-2-0-touch-recovery-t2979149](http://forum.xda-developers.com/moto-g-2014/orig-development/recovery-twrp-2-8-2-0-touch-recovery-t2979149)

      - Moto G 2014 LTE

        [http://forum.xda-developers.com/moto-g-lte/orig-development/recovery-twrp-2-8-6-0-touch-recovery-t3088800](http://forum.xda-developers.com/moto-g-lte/orig-development/recovery-twrp-2-8-6-0-touch-recovery-t3088800)

      - Moto G 2013

        [http://forum.xda-developers.com/moto-g/development/recovery-twrp-2-8-2-0-touch-recovery-t2980621](http://forum.xda-developers.com/moto-g/development/recovery-twrp-2-8-2-0-touch-recovery-t2980621)

      - Moto G 2013 LTE

        [http://forum.xda-developers.com/moto-g/4g-development/collection-somcom3xs-experimental-corner-t2996266](http://forum.xda-developers.com/moto-g/4g-development/collection-somcom3xs-experimental-corner-t2996266)

   1. Latest stable SuperSU

      [https://forum.xda-developers.com/apps/supersu](https://forum.xda-developers.com/apps/supersu)

1. Boot into fastboot mode (see above)
1. Boot the recovery
   ```
   sudo /path/to/android-sdk-linux/platform-tools/fastboot boot twrp-2.8.7.0.-falcon_STOCK_NOTHEME.img
   ```
1. Prepare the recovery for flashing SuperSU

   - TWRP

     1. _Advanced_ > _ADB Sideload_
     1. Swipe to Start Sideload

   - CWM
     1. Go to _install zip_ > _install zip from sideload_

1. Flash SuperSU

   ```
   sudo adb sideload UPDATE-SuperSU-vX.XX.zip
   ```

   - If you see this error:
     ```
     error: insufficient permissions for device
     ```
     Run this command and try again:
     ```
     sudo adb kill-server
     ```

1. Reboot

#### Installing Android OTA updates on a modified device

Note that this will only work if you have stock firmware. If you have installed a custom ROM (Cyanogenmod, etc), you will first need to flash the stock ROM.

1. If the OTA fails, get it working

   1. Look at the latest last_log in /cache/recovery to see which file is causing the update to fail
   1. Download the latest SuperSU

      [http://download.chainfire.eu/supersu](http://download.chainfire.eu/supersu)

   1. Unzip it and look at /META-INF/com/google/android/update-binary to determine how to restore stock files
      1. Update to 5.1
         1. Try:
            ```
            mv /system/bin/app_process32_original /system/bin/app_process32
            ```
      1. Update to 5.0
         1. Try:
            ```
            mv /system/etc/install-recovery_original.sh /system/etc/install-recovery.sh
            ```
   1. If that doesn’t work, try the steps here:

      [http://laviefrugale.blogspot.ca/2015/05/moto-g-ota-update-error.html](http://laviefrugale.blogspot.ca/2015/05/moto-g-ota-update-error.html)

1. Restore root

   1. If you flashed recovery.img, just follow the usual rooting instructions (see above)

   1. If you didn’t flash recovery.img, follow the usual rooting instructions, but you don’t need to download or flash the recovery. You just need to flash SuperSU

1. Remove boot logo warning message (see below)

## Boot animations/logos

#### Flash boot logo

1. Download the desired boot logo (normally this is a file named logo.bin)

1. Boot to fastboot (see above)
1. Flash the logo
   ```
   sudo /path/to/android-sdk-linux/platform-tools/fastboot flash logo logo.bin
   ```

#### Remove boot logo warning message

If you've unlocked the bootloader, you'll get an ugly warning message when booting your phone. To get rid of the warning message:

1. Download the fixed boot logo and unzip it

   - Moto G 2015

     [https://mega.nz/#F!284FHASY!bqTsSxGq05PbpdFEyl84RQ](https://mega.nz/#F!284FHASY!bqTsSxGq05PbpdFEyl84RQ)

   - Moto G 2013

     [https://mega.nz/#F!W1wglJzb!tFux0yXbZlrbIMwtQEojug](https://mega.nz/#F!W1wglJzb!tFux0yXbZlrbIMwtQEojug)

1. Flash the fixed logo (see above)

#### Change boot animation/logo

Motorola has released a variety of boot animations for the Moto G. To change to one of the other boot animations, follow the instructions here:
[https://github.com/bmaupin/motorola-boot-animations/wiki/Installation](https://github.com/bmaupin/motorola-boot-animations/wiki/Installation)

## One-time tasks

#### Unlock bootloader

This will allow you to make modifications to your phone. It only needs to be done once. Be aware that it will void your warranty.

1. Enable developer options

   1. See: [Android hacking](../../../operating-systems/android/android-hacking)

1. Enable OEM unlock

   1. _Settings_ > _Developer options_ > check _Enable OEM unlock_

1. Follow instructions here:

   [https://motorola-global-portal.custhelp.com/app/standalone/bootloadeEnable OEM unlockr/unlock-your-device-a](https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a)

1. (Optional) Remove boot logo warning message (see above)
