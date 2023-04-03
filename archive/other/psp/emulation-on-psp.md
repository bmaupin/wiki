---
title: Emulation on PSP
---

**Note:** Some of these emulators may be outdated or unmaintained. Before installing
any particular emulator, check these resources to see what the current recommendations
are:

- [Emulators List - 2019](http://wololo.net/talk/viewtopic.php?f=47&t=44039)
- [Emulators on PSP](http://emulation.gametechwiki.com/index.php/Emulators_on_PSP)
- [Emulation General wiki](http://emulation.gametechwiki.com/index.php/Main_Page)

## Is the PSP a good device for emulation?

#### Advantages

- Convenient size
- Buttons are sized well (the Vita buttons are smaller)
- Plays PSP and most PlayStation 1 games natively
- Powerful enough to emulate most 8 and 16-bit consoles
- Second-hand systems are fairly inexpensive to purchase
- Buttons use rubber membranes (i.e. they're not clicky)
- Landscape orientation is comfortable to hold

#### Disadvantages

- Official replacement batteries are no longer available and most third-party batteries are low quality
  - The battery from Insten is okay but doesn't last nearly as long as the OEM battery
  - The battery from Cameron Sino lasts as long as the Insten battery but the battery temperature measurement is broken
  - Stay away from any batteries with a listed capacity higher than 1200/1800 mAh (e.g. 2400 mAh, 3600 mAh) as they are fakes with a very low capacity
- Build quality varies between models. The PSP-1000 seems to have good build quality, while the PSP-3000 is worse: shell is painted and the paint rubs off, battery cover pops off easily, system creaks a bit, connectors near some of the screws break easily, memory card sometimes disconnects during play
- Built-in Wifi doesn't work with newer Wifi standards
- PSP screens have noticeable ghosting, particularly the PSP-1000
- Due to the age of most PSP devices, many of them can be in rough shape
  - Replacement shells are available but they're nearly all very poor quality (parts don't fit together well, etc)

#### Other notes

- Uses a proprietary memory card, but an adaptor for a micro SD card can be purchased very cheaply

## Prerequisites

#### Install custom firmware (CFW)

See [https://pspunk.com/psp-cfw/](https://pspunk.com/psp-cfw/)

## RetroArch

#### System support

[http://emulation.gametechwiki.com/index.php/Emulators_on_PSP#RetroArch](http://emulation.gametechwiki.com/index.php/Emulators_on_PSP#RetroArch)

- Game Boy/Game Boy Color: Use Gambatte
- GBA: Use gpSP
  - Download a GBA BIOS and copy it to /PSP/RETROARCH/SYSTEM/gba_bios.bin (MD5: `a860e8c0b6d573d191e4ec7db1b1e4f6`)
  - Most games will require frame skipping. See the core options to enable it.
- NES: Use QuickNES
- SNES: Don't use RetroArch; see below for alternative options
- Sega Master System, Game Gear, Genesis/Mega Drive: Use Picodrive
  - In the core options, set the renderer to fast if needed to improve performance
  - In the core options, you can also set the sound quality to a lower value to improve performance

#### Install RetroArch

1. Download the latest package for PSP

   [https://retroarch.com/?page=platforms](https://retroarch.com/?page=platforms)

1. On the PSP, create a folder under /PSP/GAME/, e.g. /PSP/GAME/RetroArch

1. Extract the package and copy the contents to the folder you created

   - For example, you should see this file on your PSP: /PSP/GAME/RetroArch/EBOOT.PBP

1. (Recommended) Remove unusable cores. In the RetroArch/cores folder:
   - Delete mgba_libretro.PBP
     - It runs too slow on the PSP to be usable. Use gpSP instead
   - Delete fceumm_libretro.PBP
     - Use QuickNES instead

#### Buttons

- To return to the RetroArch menu while in a game, press and hold Start for a few seconds
  - To change this, go to _Settings_ > _Input_ > _Menu Toggle Gamepad Combo_
- By default, O button is select, X is cancel
  - To change this, go to _Settings_ > _Input_ > _Menu Swap OK & Cancel Buttons_

## snes9xTYL (SNES)

#### Install snes9xTYL

1. Download snes9xTYL

   [https://github.com/esmjanus/snes9xTYL/blob/mecm/Release/Releases.md](https://github.com/esmjanus/snes9xTYL/blob/mecm/Release/Releases.md)

1. Extract the s9xTYLme_mod folder from the archive to /PSP/GAME/ on your PSP

   - For example, you should see this file on your PSP: /PSP/GAME/s9xTYLme_mod/EBOOT.PBP

## VICE (Commodore 64)

**NOTE:** Loading games in VICE can take several minutes with true drive emulation enabled (the default). Disabling true
drive emulation can help drastically speed up loading times at the risk of compatibility issues (_System_ >
_True drive emulation_ > _Disabled_)

More info: [http://vice-emu.sourceforge.net/vice_2.html#SEC15](http://vice-emu.sourceforge.net/vice_2.html#SEC15)

#### Install VICE

1. Download VICE PSP v2

   ~~[https://psp.akop.org/vice.htm](https://psp.akop.org/vice.htm) > _2.00 and above_~~

   [https://github.com/rsn8887/pspvice/releases](https://github.com/rsn8887/pspvice/releases)

1. Extract the vice folder in the archive to /PSP/GAME/ on your PSP

   - For example, you should see this file on your PSP: /PSP/GAME/vice/EBOOT.PBP

#### VICE key mappings

- X is mapped to the joystick fire button
- O is mapped to the space key
- Start is mapped to RUN/STOP
- Press both trigger buttons to return to the menu
  - While in the menu, press O to return to the game
- To press any other key:
  1. Hold the right trigger button
  1. Move to the key you'd like to select
  1. Press □ to select the key

## DaedalusX64 (N64)

Use this for N64 emulation:

[https://github.com/DaedalusX64/daedalus](https://github.com/DaedalusX64/daedalus)

## ~~TempGBA4PSP-mod (Game Boy Advance)~~

(Use [RetroArch](#retroarch) instead)

#### Install TempGBA4PSP-mod

1. Download TempGBA4PSP-mod

   [https://github.com/phoe-nix/TempGBA4PSP-mod/releases](https://github.com/phoe-nix/TempGBA4PSP-mod/releases)

1. Extract the TempGBA folder in the archive to /PSP/GAME/ on your PSP

   - For example, you should see this file on your PSP: /PSP/GAME/TempGBA/EBOOT.PBP

#### TempGBA4PSP-mod mod notes

- Copy all ROMs to /PSP/GAME/TempGBA/roms/

- O button is select, X is cancel

## ~~gpSP mod (Game Boy Advance)~~

(Use [RetroArch](#retroarch) instead)

#### Install gpSP mod

1. Download gpSP mod 20090720

   [https://psp.brewology.com/downloads/download.php?id=9929](https://psp.brewology.com/downloads/download.php?id=9929)

1. In the archive, extract /PSP/GAME/gpSP_mod to the same path on the PSP

   - For example, you should see this file on your PSP: /PSP/GAME/gpSP_mod/EBOOT.PBP

1. Download a GBA BIOS and copy it to /PSP/GAME/gpSP_mod/gba_bios.bin

#### gpSP mod notes

- Copy all ROMs to /PSP/GAME/gpSP_mod/roms/

- O button is select, X is cancel

#### Different gpSP versions

More info

- ~~[http://emulation.gametechwiki.com/index.php/GpSP](http://emulation.gametechwiki.com/index.php/GpSP)~~ (the info in this link is outdated)
- ~~[https://github.com/bibanon/android-development-codex/wiki/gPSP](https://github.com/bibanon/android-development-codex/wiki/gPSP)~~ (the info in this link is outdated)

Mirrors

- ~~[Source for gpSP mod 20090720](http://web.archive.org/web/20100114113349/http://www.csync.net/service/file/view.cgi?id=1248059846)~~ (the link is no longer valid)
- [Mirror for gpSP mod 20090329](https://github.com/BASLQC/gPSP-mod)
  - Based on gpSP kai with improvements
- [Mirror for gpSP kai](https://github.com/uberushaximus/gpsp-kai)
  - Based on original gpSP
  - [Original repo](https://osdn.net/projects/gpsp-kai/scm/svn/tree/head/trunk/)
- [Mirror for original gpSP source](https://github.com/BASLQC/gPSP)
  - Another mirror: [https://github.com/cedricwaltercson/gpsp](https://github.com/cedricwaltercson/gpsp)

## ~~PicoDrive (Master System, Game Gear, Genesis/Mega Drive)~~

(Use [RetroArch](#retroarch) instead)

1. Download PicoDrive

   [http://notaz.gp2x.de/releases/PicoDrive/PicoDrive_psp_151b.zip](http://notaz.gp2x.de/releases/PicoDrive/PicoDrive_psp_151b.zip)

1. Extract the PicoDrive folder from the archive to /PSP/GAME/ on your PSP

   - For example, you should see this file on your PSP: /PSP/GAME/PicoDrive/EBOOT.PBP
