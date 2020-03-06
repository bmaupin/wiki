---
title: Emulation on PSP
---

**Note:** Some of these emulators may be outdated or unmaintained. Before installing
any particular emulator, check these resources to see what the current recommendations
are:

- [Emulators List - 2019](http://wololo.net/talk/viewtopic.php?f=47&t=44039)
- [Emulators on PSP](http://emulation.gametechwiki.com/index.php/Emulators_on_PSP)
- [Emulation General wiki](http://emulation.gametechwiki.com/index.php/Main_Page)



## RetroArch

#### System support

- Game Boy/Game Boy Color: Use Gambatte
- GBA: Use gpSP (faster) or TempGBA (higher compatibility)
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



#### Buttons

- To return to the RetroArch menu while in a game, press and hold Start for a few seconds
    - To change this, go to *Settings* > *Input* > *Menu Toggle Gamepad Combo*
- By default, O button is select, X is cancel
    - To change this, go to *Settings* > *Input* > *Menu Swap OK & Cancel Buttons*



## snes9xTYL (SNES)

#### Install snes9xTYL

1. Download snes9xTYL

    [https://github.com/esmjanus/snes9xTYL/blob/mecm/Release/Releases.md](https://github.com/esmjanus/snes9xTYL/blob/mecm/Release/Releases.md)

1. Extract the s9xTYLme_mod folder from the archive to /PSP/GAME/ on your PSP

    - For example, you should see this file on your PSP: /PSP/GAME/s9xTYLme_mod/EBOOT.PBP



## VICE (Commodore 64)

**NOTE:** Loading games in VICE can take several minutes with true drive emulation enabled (the default). Disabling true
drive emulation can help drastically speed up loading times at the risk of compatibility issues (*System* >
*True drive emulation* > *Disabled*)

More info: [http://vice-emu.sourceforge.net/vice_2.html#SEC15](http://vice-emu.sourceforge.net/vice_2.html#SEC15)


#### Install VICE

1. Download VICE PSP v2

    ~~[https://psp.akop.org/vice.htm](https://psp.akop.org/vice.htm) > *2.00 and above*~~

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



## ~~TempGBA4PSP-mod (Game Boy Advance)~~ (Use RetroArch)

#### Install TempGBA4PSP-mod

1. Download TempGBA4PSP-mod

    [https://github.com/phoe-nix/TempGBA4PSP-mod/releases](https://github.com/phoe-nix/TempGBA4PSP-mod/releases)

1. Extract the TempGBA folder in the archive to /PSP/GAME/ on your PSP

    - For example, you should see this file on your PSP: /PSP/GAME/TempGBA/EBOOT.PBP


#### TempGBA4PSP-mod mod notes

- Copy all ROMs to /PSP/GAME/TempGBA/roms/

- O button is select, X is cancel



## ~~gpSP mod (Game Boy Advance)~~ (Use RetroArch)

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



## ~~PicoDrive (Master System, Game Gear, Genesis/Mega Drive)~~ (Use RetroArch)

1. Download PicoDrive

    [http://notaz.gp2x.de/releases/PicoDrive/PicoDrive_psp_151b.zip](http://notaz.gp2x.de/releases/PicoDrive/PicoDrive_psp_151b.zip)

1. Extract the PicoDrive folder from the archive to /PSP/GAME/ on your PSP

    - For example, you should see this file on your PSP: /PSP/GAME/PicoDrive/EBOOT.PBP
