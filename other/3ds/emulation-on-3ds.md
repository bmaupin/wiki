---
title: Emulation on 3DS
---

## Is the 3DS a good device for emulation?

#### Advantages

- Easily hacked to install homebrew/emulators
- Natively plays 3DS, DS, and GBA games
- Powerful enough to emulate most 8-bit consoles
- The New 3DS models are powerful enough to emulate most 16-bit consoles and some limited ability to emulate Nintendo 64 and PlayStation 1
- Decent build quality typical of Nintendo consoles
- Clamshell design protects the screens
- Landscape orientation is comfortable to hold
- Second screen is convenient for emulator menus, logs, etc
- Uses a standard micro SD card instead of a proprietary memory stick
- Decent battery life and official replacement batteries are still available for purchase
- Individual games can be installed to the home screen if desired (see _New Super Ultimate Injector_ below)
- Games can be installed by scanning a QR code with the camera

#### Disadvantages

- Clamshell design makes it a bit bulky
  - Second screen is nice to have but most of the time it's unused
- The top section can be a bit wobbly due to the hinge design
- Buttons/D-pad are significantly smaller than those on older game consoles that are being emulated
- Buttons/D-pad are clicky on some 3DS devices (e.g. the New 2DS XL)
  - Clicky buttons have less travel and a different feel because they lack the rubber membranes that most older game consoles had under the buttons/D-pad; of course this is just a matter of preference
- Proprietary charging port
  - USB-A to 3DS charging cables can be purchased cheaply

## Misc

#### Important notes

- This document mostly uses the term "3DS" but is also applicable to the 2DS
- Many emulators are only capable of running on a New 3DS

#### Glossary

- .3dsx files
  - These are files that can be run using the Homebrew Launcher
- .cia/CIA files
  - These are files containing software (or games) packages specifically for the 3DS. They are installed using a tool called FBI (see below). Once they're installed they can be deleted from the SD card.

#### Installing custom firmware (CFW)

This is a prerequisite for anything mentioned on this page.

Follow the instructions here: [https://3ds.hacks.guide/](https://3ds.hacks.guide/)

- Under [_Finalizing Setup_](https://3ds.hacks.guide/finalizing-setup), all of the steps are optional
  - (Recommended) DSP1: allows homebrew applications to have sound
  - (Recommended) FBI: allows you to install CIA files
  - (Recommended) Homebrew Launcher Loader: this gives you an icon to directly open the Homebrew Launcher; otherwise it's a multi-step process involving opening Download Play, using a button combo, and selecting a specific menu item
  - (Recommended) Universal-Updater: this allows you to install and update 3DS homebrew
  - (Optional) Anemone3DS: install if you want custom themes
  - (Optional) Checkpoint: install if you want to be able to back up and restore saves for DS and 3DS games
  - (Optional) ctr-no-timeoffset: install if you want to bypass penalties from certain games for your system clock changing
  - (Optional) GodMode9: this allows you to copy the CFW to the 3DS' internal memory instead of the SD card so you can boot the CFW without an SD card installed

#### Updating custom firmware (CFW)

⚠ If you get a notification that there's a new system update available, you'll want to update the CFW **before** installing the system update.

In most cases, it should be sufficient to update Luma3DS before installing the system update:

[https://github.com/LumaTeam/Luma3DS/wiki/Installation-and-upgrade](https://github.com/LumaTeam/Luma3DS/wiki/Installation-and-upgrade)

1. Get the installed version of Luma3DS
   1. Turn on your 3DS while holding <kbd>Select</kbd>
   1. Make note of the Luma3DS version
1. Compare that to the latest version here: [https://github.com/LumaTeam/Luma3DS/releases](https://github.com/LumaTeam/Luma3DS/releases)
1. Upgrade Luma3DS if necessary
   1. Download the latest version from [https://github.com/LumaTeam/Luma3DS/releases](https://github.com/LumaTeam/Luma3DS/releases)
   1. (Optional) Make a backup of the `boot.3dsx` and `boot.firm` files from your SD card
   1. Extract the new `boot.3dsx` and `boot.firm` files from the download to the root of your SD card
1. Install the 3DS system update by going to _System Settings_ > _Other Settings_ > _System Update_

If you're running an old version of boot9strap (less than v1.2), you'll need to update that first:

[Updating B9S](https://3ds.hacks.guide/updating-b9s.html)

## Emulation

**Note:** Some of these emulators may be outdated or unmaintained. Before installing
any particular emulator, check these resources to see what the current recommendations
are:

- [Emulators on 3DS](https://emulation.gametechwiki.com/index.php/Emulators_on_3DS)
- [Emulation General wiki](http://emulation.gametechwiki.com/index.php/Main_Page)

#### CIA files versus ROMs

Many games can be installed as CIA files, meaning they will show up as a separate entry in the 3DS home screen and can be launched directly. As with all CIA files they need to be installed using FBI.

Alternatively, ROMs can be played through other software such as RetroArch or TWiLight Menu++.

#### Nintendo DS (NDS)

- Nintendo DS games are not in the 3DS eShop
- The 3DS can play NDS cartridges natively
- NDS ROMs can be played natively using TWiLight Menu++ (see below)
- NDS ROMs can be converted to an installable CIA using a tool like [NDSForwarder](https://wiki.ds-homebrew.com/ds-index/forwarders)

#### Game Boy Advance

- The 3DS can natively play GBA games
  - Use a tool like NSUI (see below) to convert the game to a CIA file so it can be launched from the 3DS home screen. This creates a "forwarder" that opens the GBA game in the 3DS' native GBA mode.
- Or GBA games can be emulated using RetroArch or TWiLight Menu++ (see below)
  - This gives up perfect accuracy for more features like save states

#### Nintendo 64

[https://github.com/masterfeizz/DaedalusX64-3DS](https://github.com/masterfeizz/DaedalusX64-3DS)

#### Other systems

- Many Game Boy, Game Boy Color, NES, SNES (New 3DS only), Game Gear, and TurboGrafx-16 (Japan only) titles are available in the eShop
  - These titles and others can be found as or converted to CIA files using a tool like New Super Ultimate Injector (see below)
- RetroArch (see below) can emulate the largest number of systems, including PlayStation 1 ([https://emulation.gametechwiki.com/index.php/Emulators_on_3DS#RetroArch](https://emulation.gametechwiki.com/index.php/Emulators_on_3DS#RetroArch))
- TWiLight Menu++ can launch Nintendo DS, SNES, NES, Game Boy, Game Boy Advance, Game Gear, Master System, and Mega Drive/Genesis ROMs

## Software

#### FBI

- Install FBI

  [https://3ds.hacks.guide/finalizing-setup](https://3ds.hacks.guide/finalizing-setup)

- Install a CIA file

  1. Copy the CIA file to your SD card
  1. Open the Homebrew Launcher
  1. Open FBI
  1. Select _SD_ then browse to directory containing the CIA file(s) to install
  1. Select _&lt;current directory&gt;_
  1. Select _Install and delete all CIAs_

- Install from a QR code

  Anything that can typically be installed as a CIA file can be installed using a QR code to avoid having to copy the file to your SD card

  1. On another device, find the QR code for what you would like to install
  1. On the 3DS, make sure the wireless is enabled
  1. Open the Homebrew Launcher
  1. Open FBI
  1. Go to _Remote Install_ > _Scan QR Code_
  1. Point the camera at the QR code
  1. Select _Yes_ to install the software when prompted

#### Luma3DS

- Open Rosalina menu (shows battery percentage and other features)

  Press <kbd>L</kbd> + <kbd>down</kbd> + <kbd>select</kbd>

#### RetroArch

- Install RetroArch

  [https://docs.libretro.com/guides/install-3ds2ds/](https://docs.libretro.com/guides/install-3ds2ds/)

  1. Go to the RetroArch download page

     [https://www.retroarch.com/](https://www.retroarch.com/) > _Download_

  1. Scroll down to 3DS/2DS and click _Download (cia)_

  1. In the download archive, extract the _retroarch_ directory and copy it to your SD card

  1. (Optional) Extract cia/retroarch_3ds.cia to the cias folder on your SD card

     - This acts as a launcher for the cores but isn't necessary if you don't mind installing the first core manually

  1. To avoid very slow loading times, delete any unwanted cores from retroarch/cores or move them into another directory

  1. Using FBI, install the core(s) or retroarch_3ds.cia

- Controls

  - Tap the center bottom screen to turn it off

  - Tap the bottom of the bottom screen to go back to the RetroArch menu

- Mapping 3DS buttons to keyboard keys in RetroArch (e.g. when using DOSBox)

  1. Open RetroArch and load the game you wish to play

  1. Go back to the RetroArch menu > _Quick Menu_ > _Controls_ > _Port 1 Controls_

  1. _Device Type_ > _Keyboard + Mouse_

  1. Go to each of the buttons and assign them to a key, for example, to assign the A button to left Ctrl go to _Auto: L (btn)_ > _Keyboard Left Control_

  1. Go back to the previous menu and select _Save Game Remap File_

  1. To use the same mappings for another game, load that game and then go to _Quick Menu_ > _Controls_ > _Load Remap File_ > _Save Game Remap File_

#### TWiLight Menu++

- Install TWiLight Menu++

  [Installing TWiLight Menu++ (3DS)](https://wiki.ds-homebrew.com/twilightmenu/installing-3ds)

- Exit a game

  - Hold <kbd>L</kbd> + <kbd>R</kbd> + <kbd>down</kbd> + <kbd>B</kbd> for 2 seconds

- Access the settings

  1. Press <kbd>Select</kbd>
  1. Go all the way down to the icon on the bottom and press <kbd>A</kbd>
  1. Use <kbd>L</kbd> and <kbd>R</kbd> to change between the menu pages
  1. Press <kbd>B</kbd> to exit

- Playing games in widescreen

  See [Playing in Widescreen](https://wiki.ds-homebrew.com/twilightmenu/playing-in-widescreen)

## Tools

#### New Super Ultimate Injector (NSUI)

- Run on Linux using Wine: [https://gist.github.com/bmaupin/93d31e1b2d738ae656b9d3617e19622b](https://gist.github.com/bmaupin/93d31e1b2d738ae656b9d3617e19622b)

- Create a new CIA

  1. _File_ > _New_ > select the system as appropriate
  1. _Project_ > _Load ROM_ > select the ROM
  1. Under _CIA metadata_ > _Game icon_ click _Download Title Screen from database_

     - If you get this error: `The request was aborted: Could not create SSL/TLS secure channel.`

       Install .NET 4.6 and the registry fix from here: [https://gist.github.com/bmaupin/93d31e1b2d738ae656b9d3617e19622b](https://gist.github.com/bmaupin/93d31e1b2d738ae656b9d3617e19622b)

       Alternatively you can download the title manually:

       1. Go here: [https://github.com/libretro-thumbnails](https://github.com/libretro-thumbnails)
       1. Go to the specific repo for the system
       1. Click _Go to file_ and start typing the name of the file
       1. Download the appropriate file under `Named_Titles`
       1. In NSUI, click _Load image from file_ to use the local file

  1. Under _CIA banner_ click _Download Title Screen from database_
  1. Under _Game patches and extras_ uncheck _Enable Download Play_ (this doubles the size of the file)
  1. _Project_ > _Export CIA_
