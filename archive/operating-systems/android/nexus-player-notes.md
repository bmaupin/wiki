---
title: Nexus Player notes
---

#### Copy files to the Nexus Player

[http://cord-cutters.wonderhowto.com/how-to/sideload-apps-nexus-player-0160364/](http://cord-cutters.wonderhowto.com/how-to/sideload-apps-nexus-player-0160364/)

#### Install RetroArch

1. Install RetroArch from the Google Play Store

   You can install it from the Nexus Player, but if you wish to install it from another device:

   1. Go here:

      [https://play.google.com/store/apps/details?id=com.retroarch](https://play.google.com/store/apps/details?id=com.retroarch)

   1. _Install_ > _Choose a device_ > _Nexus Player_ > _Install_

1. Configure the Nexus Player gamepad

   1. With the Nexus remote:

      1. Open RetroArch

      1. _Settings tab_ (press right/left until it says _Settings_ at the top) > _Input_

         1. _User 1 Binds_
            1. _User 1 Bind All_
               1. Bind the keys using the gamepad
               1. For the letter buttons, go by the direction instead of the letter. For example, for _User 1 B button (down)_, press the bottom button on the gamepad (A) instead of the button labeled B on the gamepad
            1. _User 1 Save Autoconfig_

      1. Quit RetroArch

   1. With the Nexus Player gamepad:

      1. Open RetroArch

      1. _Settings tab_ > _Input_
         1. _Input Hotkey Binds_ > _Menu toggle_ > press the back button on the gamepad
            (This allows you to press the back button on the gamepad to open the RetroArch menu while you're playing a game)

   1. Now when you want to play games with RetroArch, open RetroArch using the Nexus Player gamepad. If you use the Nexus Player remote at any point while RetroArch is running, it will disable the gamepad for some reason.

1. ~~Disable the controller overlay~~

   1. ~~_Settings tab _> _Onscreen Overlay_ > _Display Overlay_ > _Off_~~

1. Install cores

   1. _Online Updater_ > _Core Updater_
   1. Install whichever cores you like. Some recommended cores:
      - Nestopia (NES)
      - Snes9x (SNES)
      - Mupen64Plus (Nintendo 64)
      - Genesis Plus GX (Genesis)

1. Put the ROMs in place

   1. Using ES File Explorer, create a folder to put the ROMs (e.g. /sdcard/Games/NES)

   1. Copy the ROMs using ES File Explorer (see instructions above for copying files)

1. Add the ROMs to RetroArch

   1. _Add Content_ > _Scan Directory_ > pick any option and browse to the folder where you put the ROMs

   1. _Settings tab_ > _Playlists_ > set each playlist to the correct core (so you don’t have to choose the first time you launch each game)

1. To load a game

   1. _Playlists tab_ > choose a device > choose a game

   1. If you added a ROM but it's not showing up in the playlist after scanning:

      1. On your PC, do a checksum on the ROM

         ```
         crc32 somerom.nes
         ```

      1. Find the database for your device here:

         [https://github.com/libretro/libretro-database](https://github.com/libretro/libretro-database)

      1. Use the search feature at the top of the page to find the game and its checksum

      1. Make sure the checksum matches. If it doesn't, download a different version of the ROM

1. Remap A and B buttons for NES

   1. Start an NES game and then press the back button to go back to the RetroArch menu

   1. Go down to _Controls_

   1. B button > A

   1. Y button > B

   1. A button > Turbo A or ---

   1. X button > Turbo B or ---

   1. _Save Core Remap File_

#### Boot to custom recovery

```
adb reboot bootloader
sudo fastboot boot twrp-3.2.1-0-fugu.img
```
