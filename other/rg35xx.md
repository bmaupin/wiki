---
title: RG35XX
---

## Initial setup

#### Resources

[Retro Game Corps' RG35XX Starter Guide](https://retrogamecorps.com/2023/01/03/anbernic-rg35xx-starter-guide/)

#### Install GarlicOS

1. Go here: [https://www.patreon.com/posts/garlicos-for-76561333](https://www.patreon.com/posts/garlicos-for-76561333)

1. Scroll all the way to the bottom of the post and download _RG35XX-MicroSDCardImage.7z.001_ and _RG35XX-MicroSDCardImage.7z.002_

1. Open _RG35XX-MicroSDCardImage.7z.001_ using 7zip and extract it somewhere on your computer

1. Insert an SD card

   ⚠️ The SD card will be completely wiped during this process

1. Write `garlicos.img` to the SD card, e.g. using dd:

   1. Get the device of the SD card

      In Linux, I like to use GParted. Alternatively, you can use `mount`, e.g.

      ```
      $ mount
      ...
      /dev/mmcblk0p1 on /media/user/3834-6161 type exfat (rw,nosuid,nodev,relatime,uid=1000,gid=1000,fmask=0022,dmask=0022,iocharset=utf8,errors=remount-ro,uhelper=udisks2)
      ```

      In this case, the device is `/dev/mmcblk0`

   1. (Optional) Write a file to the SD card to make sure you have the correct device, e.g.

      ```
      touch /media/user/3834-6161/test
      ```

      You should be able to see the file in the file browser

   1. Unmount the SD card

   1. Write `garlicos.img` to the SD card, e.g.

      ```
      sudo dd if=garlic.img of=/dev/mmcblk0
      ```

      Wait for it to finish as it will probably take several minutes depending on the speed of your SD card

1. Use a tool to expand the ROMS partition on the SD card, e.g. using GParted

   ⓘ Because the GarlicOS image is 4 GB, it will only create a 3 GB ROMS parition on the SD card. You'll want to expand it to use the entire space of your SD card.

   1. Open GParted

   1. Choose your SD card from the dropdown near the top right

   1. Select the _ROMS_ partition > right-click > _Resize/Move_

   1. Drag the right side of the partition box all the way to the right > _Resize/Move_

   1. Click _Apply All Operations_ near the top

#### Set partition labels

By default, the partitions on the SD card after writing the GarlicOS image will have names but not labels. In some environments (such as in Gnome on Linux), this will cause the SD card partitions to show up by size, and not by name.

To label the partitions:

1. Open GParted

1. For each partition you wish to label:

   1. Right-click > _Unmount_

   1. Right-click > _Label File System_

   1. Give the file system a label and click _OK_

      Recommended: Use the same label as the partition name that you see in the _Name_ column. You can use lower-case letters (e.g. `System`) and if necessary, GParted will capitalise it (e.g. for FAT16 file systems).

1. Click _Apply All Operations_ at the top

If the label isn't applied for FAT32 file systems (e.g. the _Roms_ partition):

1. Get the device of the filesystem from GParted

1. Unmount the filesystem, e.g.

   ```
   sudo umount /dev/mmcblk0p4
   ```

1. Label the filesystem using `fatlabel`, e.g.

   ```
   sudo fatlabel /dev/mmcblk0p4 Roms
   ```

#### ROM directory names

See [https://onionui.github.io/docs/emulators](https://onionui.github.io/docs/emulators)

For example:

- Commodore 64: `COMMODORE`
- Game Boy: `GB`

## Skraper

Skraper is used to download box art or other game media

#### Install Skraper

ⓘ These instructions are specific to installing Skraper on Linux. Adjust them as needed.

1. Download Skraper from [http://skraper.net/](http://skraper.net/)

   ⚠️ For Linux, if you wish to use a custom mix to format the box art, download the Windows version and run it in Wine; custom mixes don't work in the Linux version

   ⚠️ The download button seems to be broken in Firefox; use another browser

1. Create a new Wine prefix

   ```
   export WINEPREFIX=~/.local/share/wineprefixes/skraper
   wineboot
   ```

1. Extract Skraper to the Wine prefix, e.g.

   ```
   7z x -o"$WINEPREFIX/drive_c/Program Files/Skraper" Skraper-1.1.1.7z
   ```

1. (Optional) Extract application icon

   ```
   cd "$WINEPREFIX/drive_c/Program Files/Skraper"
   7z x SkraperUI.exe .rsrc/ICON -aoa
   cd -
   ```

1. Create a desktop entry

   ```
   echo "[Desktop Entry]
   Type=Application
   Name=Skraper
   Exec=env WINEPREFIX=/home/$USER/.local/share/wineprefixes/skraper wine \"/home/$USER/.local/share/wineprefixes/skraper/drive_c/Program Files/Skraper/SkraperUI.exe\"
   Icon=/home/$USER/.local/share/wineprefixes/skraper/drive_c/Program Files/Skraper/.rsrc/ICON/1.ico
   Terminal=false" > ~/.local/share/applications/skraper.desktop
   ```

#### Download box art

1. (Optional) Download a custom mix

   Here's mine for showing just the box art (based on the format recommended by Retro Game Corps):

   ```xml
   <ImageComposition xsi:noNamespaceSchemaLocation="https://www.skraper.net/ImageComposition.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <Information ShortName="RG35XX box art" LongName="RG35XX box art" Description="2DBox" Author="Author" />
     <Viewport Color="#00FFFFFF" Width="640" Height="480" />
     <Drawings>
       <Item Type="Box2DFront">
         <Display X="26.5625%" Y="50%" Transparency="1" Width="53.125%" KeepRatio="true" Anchor="VCenterHCenter" />
       </Item>
     </Drawings>
   </ImageComposition>
   ```

   Other mixes available here:

   - [https://github.com/ebzero/garlic-onion-skraper-mix](https://github.com/ebzero/garlic-onion-skraper-mix)
   - [https://www.reddit.com/r/RG35XX/comments/120p5k7/comment/jdib20w/](https://www.reddit.com/r/RG35XX/comments/120p5k7/comment/jdib20w/)

1. Open Skraper

1. First-time setup

   1. (Recommended) Create a new account and sign in

      ⚠️ If you choose not to create an account, Skraper will run extremely slowly since API calls will be throttled

      ⓘ Even with an account, opening Skraper for the first time can take a while

   1. Select Recalbox

   1. Browse to the directory of your ROMs

      ⚠️ When pointing Skraper directly to my SD card in Linux, it seems to consistently create nested `Imgs` directories. It might be better to run Skraper on a local directory and copy the generated box art over to the SD card manually.

   1. Check _Include non-Recalbox rom folders_

1. If any systems are missing

   ⓘ This seems to happen if Skraper expects a different directory name than the one used by GarlicOS; for example, GarlicOS uses `FC` for NES, which Skraper doesn't seem to recognize automatically

   1. Click the add button near the lower left to add it

   1. In the _Games & Front-end_ tab set _Games/Roms folder_ as appropriate

1. For each of the systems on the left, uncheck _Use specific configuration for ..._

1. Select _All Systems_

1. Go to _Game list_

   1. Under _Gamelist type_ select _No backup, create new or overwrite existing_

   1. Change _Game list fullpath_ to create the game list in the Skraper program directory to avoid writing it to the SD card, e.g. `C:\Program Files\Skraper\gamelist.xml`

   1. Change _Sub-folders_ to _Ignore them, generate no image_

1. Go to _Media_

   1. If there's a second media item, select it and delete it by clicking the delete button near the left

   1. Select the first media item

   1. Change _Media type_ as desired

      To use a custom mix, select _User provided mix_ and then browse to the custom mix file

   1. Set _Output folder_ to `%ROMROOTFOLDER%/Imgs`

   1. (Optional) Uncheck _Cleanup output folder before generating new medias_

1. (Optional) Go to _Miscellaneous_, uncheck _Use rom region first (when available)_ and set ROM region as desired (e.g. `us`)

1. When you're ready, click Play to begin scraping

1. On the SD card, realign the text as needed to match the box art format

   1. Modify `CFW/skin/settings.json` on the SD card

      e.g. for my custom mix above, make these changes:

      ```json
      "text-alignment": "left",
      "text-margin": 352,
      ```

More information:

- [https://retrogamecorps.com/2023/01/03/anbernic-rg35xx-starter-guide/#Boxart](https://retrogamecorps.com/2023/01/03/anbernic-rg35xx-starter-guide/#Boxart)
- [https://www.reddit.com/r/RG35XX/comments/120p5k7/comment/jdib20w/](https://www.reddit.com/r/RG35XX/comments/120p5k7/comment/jdib20w/)

## GarlicOS

#### Power button

- Hold the power button until you see the boot logo to turn on the device
  - See [Troubleshooting](#troubleshooting) for more information
- Press the power button to turn off the device

  - GarlicOS will power on to where you left off, whether in-game or in the GarlicOS menu

  ⚠️ GarlicOS does not have a sleep mode, so it will fully power off the device if the power button is pressed. However, other firmware (such as the Anbernic firmware) may only put the device to sleep if the power button is pressed and may require holding the power button to fully power off.

#### Button combinations

- Press _Start_ at the main GarlicOS menu to set the time and language
- Press _Select_ in any of the GarlicOS menus to set overclocking/underclocking
- Press _Menu_ in any of the GarlicOS menus to switch between in-progress games
- Press _Menu_ while playing a game to save the state and stop the game
- Double-press _Menu_ while playing a game to switch between in-progress games
- Hold _Menu_ while playing a game to show the _Menu_ button combinations
- To go to the RetroArch menu while in-game, press _Menu_ and then after about a second press _X_

#### Aspect ratio

By default, most games will fill the whole screen instead of using the proper aspect ratio. To use the proper aspect ratio:

1. Start playing a game from the system for which you wish to change the aspect ratio
1. Go to the RetroArch settings (_Menu_ + _X_)
1. Press B to go to the Main Menu
1. Go to _Settings_ > _Video_ > _Scaling_
1. Enable _Keep Aspect Ratio_
1. Optionally, also enable _Integer Scale_

   ⓘ Normally setting the aspect ratio is enough; setting integer scale may be needed when using overlays (see [Overlays](#overlays))

1. Save overrides as desired (see [Overrides](#overrides))

#### Overlays

The following overlays are included in GarlicOS:

- Famicom (_fc.cfg_)
- Game Boy (_gb.cfg_)
- Game Boy Advance (_gba.cfg_)
- Game Boy Color (_gbc.cfg_)
- Super Famicom (_sfc.cfg_)

To enable an overlay:

1. (Recommended) Enable _Keep Aspect Radio_ and _Integer Scale_ (see [Aspect ratio](#aspect-ratio))
1. Start playing a game from the system for which you wish to enable the overlay
1. Go to the RetroArch settings (_Menu_ + _X_)
1. Go to _On-Screen Overlay_ > _Overlay Preset_ and select the appropriate overlay
1. Press B to go back to the Quick Menu
1. Save overrides as desired (see [Overrides](#overrides))

To install new overlays:

1. Download additional overlays, e.g. from [https://www.rg35xx.com/en/apps/mods-for-garlicos/](https://www.rg35xx.com/en/apps/mods-for-garlicos/)
1. Copy overlays to `CFW/retroarch/.retroarch/overlay/`

#### Saving

- GarlicOS will save the state any time you leave a game and reload it any time you start the game
- Use _Menu_ + _R2_ to save the state while playing (and _Menu_ + _L2_ to load)
  - The state slot will automatically increment, which is desirable
  - To limit the number of save states:
    1. While in game go to the RetroArch settings (_Menu_ + _X_)
    1. Go back one menu (_B_) > _Settings_ > _Saving_
    1. Set _Maxiumum Auto-Increment Save States To Keep_ to the desired value (e.g. `10`)
    1. Save overrides as desired (see [Overrides](#overrides))

#### Cheats

Cheats can be useful for experiencing older games that have not aged well in terms of difficulty or gameplay

💡 Cheats such as unlimited lives or not losing items when dying can be more convenient compared to save states

1. Download the `.cht` cheats file for the corresponding game from here: [https://github.com/libretro/libretro-database/tree/master/cht](https://github.com/libretro/libretro-database/tree/master/cht)

   1. Search for cheats using the file search box (not the search box at the very top of the page); it will be near the top on the left or the right depending on your device

      ⚠️ This will search cheats across all systems so make sure you select the correct game

   1. Click the _Download Raw File_ button near the top right of the file to download the cheat file

1. Copy the file to `CFW/retroarch/.retroarch/cheats/`

   💡 You can copy the cheats file directly into `cheats` and then load them manually (instructions below). But if you copy the cheats file into a subdirectory for the emulator (e.g. `cheats/FCEUmm` for NES) and the cheat file has the exact same name as the ROM (except for the extension), the cheats will be automatically loaded. The ROM directory should exist already if you've played at least one game for that system.

1. Start the game for which you wish to use cheats
1. Go to the RetroArch settings (_Menu_ + _X_) > _Cheats_
1. (Recommended) enable _Auto-Apply Cheats During Game Load_ and _Apply After Toggle_, then save overrides (see [Overrides](#overrides)). Otherwise you'll have to select _Apply Cheats_ every time you load the game and after enabling or disabling cheats.
1. If you copied the cheats file into the emulator directory with the same file name, the cheats should be listed. Otherwise:

   1. Go to _Load Cheat File (Replace)_
   1. Browse to the cheat file and press A to apply it

1. In the _Cheats_ menu, scroll down to the list of cheats
1. Use left/right on the D-pad to enable or disable individual cheats

## Overrides

Overrides allow you to customise the configuration of the emulators and save them for every time you play

#### Saving overrides for a particular system or game

1. Start playing a game from the system for which you wish to set overrides
1. Go to the RetroArch settings (_Menu_ + _X_)
1. Make any changes you'd like to save as overrides
1. Go back to the Quick Menu > _Overrides_
1. Choose the appropriate option

   - _Save Core Overrides_ will save the overrides for any game using that core

     ⚠️ Note that this will also affect other systems using that core; for example, Game Boy and Game Boy Color use the same core

   - _Save Content Directory Overrides_ will save the overrides for any game in that directory

     ⓘ This option is recommended if you want to save overrides for an entire system

   - _Save Game Overrides_ will save the overrides for just that game

     ⓘ This option is recommended if you want to save overrides for a specific game

     ⚠️ If you save game overrides and later change core or content directory overrides, those will not be updated in the game overrides; the game overrides will have to be updated manually

#### Make changes across all systems or games

If you wish to make a change that will apply across all systems or games, this is done differently in GarlicOS:

1. If you're playing a game, quit the game
1. Go to the main GarlicOS menu > _RetroArch_
1. Make any changes as needed, then go back to the _Main Menu_ (press _B_ as many times as needed) > _Quit RetroArch_

## Notes for specific systems

#### Commodore 64

- Commodore 64 games are very slow to load but it's best just to wait
- Press _Select_ in game to bring up the keyboard
  - This may be needed as some games may need other keys to start the game, such as _Run/Start_, Spacebar, or _F1_

#### Game Boy

- No BIOS is required but the Nintendo logo will show if one is present
- You can put Game Boy and Game Boy Color ROMs in the same directory (`GB`) to simplify the list of systems shown in GarlicOS. However, if you want to use different emulator settings between Game Boy and Game Boy Color, you'll need to put Game Boy Color ROMs in their own directory (`GBC`).
- To use the pale pea green colour of the original Game Boy:

  1. Start playing a Game Boy game
  1. Go to the RetroArch settings (_Menu_ + _X_)
  1. Go to _Core Options_
  1. Set _GB Colorization_ to _Internal_
  1. Set _Internal Palette_ to _Special 1_
  1. Save overrides as desired (see [Overrides](#overrides))

- To disable L1/R1 buttons changing the colour scheme:

  1. Start playing a Game Boy game
  1. Go to the RetroArch settings (_Menu_ + _X_)
  1. Go to _Controls_ > _Port 1 Controls_
  1. Set _L Button_ and _R Button_ to `---`
  1. Go back one menu (_B_) > _Manage Remap Files_

     ⓘ Unlike other settings which are saved in override files, changes to controls are saved in separate remap files

  1. Choose _Update Input Remap File_

#### Sega CD

- Sega CD requires 3 BIOS files to work
- Use ROM files that end with .chd for best results

## Troubleshooting

#### RG35XX won't charge

1. Make sure the SD card is in the first slot

   ⚠️ The RG35XX won't charge without the SD card, and if you plug it in without the SD card, you'll have to hold the power button for longer to turn it on

1. Plug in the charging cable

   - You should see a battery icon when you first plug it in to let you know it's charging
   - The small light on the left of the top of the device should also be lit while it's charging
   - You can also tap the power button while it's charging to see the battery icon and get an approximation of how much it's charged

1. If it's still not charging, try a different cable

   - USB-A to USB-C cables such as the one the device came with seem to be recommended

1. If it's still not charging, try a different charger

   - In particular, a charger with a lower amperage (e.g. 500mA) may have more success and is probably better for overall battery life

1. If a different charger doesn't work, try charging it from a PC USB port, preferably a USB-A port

1. If it's still not charging, press and hold the power button for at least ten seconds and try again

#### RG35XX won't power on

1. Make sure the SD card is in the first slot
1. Make sure the battery is charged
1. Press and hold the power button until you see the boot logo

   ⓘ Normally this should take about five seconds but it can take ten seconds or more; in particular, this seems to happen if you try charging the device without the SD card
