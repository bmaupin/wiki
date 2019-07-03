---
title: Emulation on PSP
---

## RetroArch (Game Boy, NES, Genesis, Game Gear, etc.)

#### Install RetroArch

1. Download the latest package for PSP

    [https://retroarch.com/?page=platforms](https://retroarch.com/?page=platforms)

1. On the PSP, create a folder under /PSP/GAME/, e.g. /PSP/GAME/RetroArch

1. Extract the package and copy the contents to the folder you created

    - For example, you should see this file on your PSP: /PSP/GAME/RetroArch/EBOOT.PBP


#### RetroArch notes

- Don't use RetroArch for SNES or GBA games. See below for alternative options.
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



## gpSP (Game Boy Advance)

#### Install gpSP

1. Download gpSP mod 20090720

    [https://psp.brewology.com/downloads/download.php?id=9929](https://psp.brewology.com/downloads/download.php?id=9929)

1. In the archive, extract /PSP/GAME/gpSP_mod to the same path on the PSP

    - For example, you should see this file on your PSP: /PSP/GAME/gpSP_mod/EBOOT.PBP

1. Download a GBA BIOS and copy it to /PSP/GAME/gpSP_mod/gba_bios.bin


#### gpSP notes

- Copy all ROMs to /PSP/GAME/gpSP_mod/roms/

- O button is select, X is cancel


#### Different gpSP versions

More info
- [http://emulation.gametechwiki.com/index.php/GpSP](http://emulation.gametechwiki.com/index.php/GpSP)
- [https://github.com/bibanon/android-development-codex/wiki/gPSP](https://github.com/bibanon/android-development-codex/wiki/gPSP)

Mirrors
- [Mirror for original gpSP source](https://github.com/BASLQC/gPSP)
    - Another mirror: [https://github.com/cedricwaltercson/gpsp](https://github.com/cedricwaltercson/gpsp)
- [Mirror for gpSP kai](https://github.com/uberushaximus/gpsp-kai)
    - Based on original gpSP
    - [Original repo](https://osdn.net/projects/gpsp-kai/scm/svn/tree/head/trunk/)
- [Mirror for gpSP mod 20090329](https://github.com/BASLQC/gPSP-mod)
    - Based on gpSP kai with improvements



## VICE (Commodore 64)

**NOTE:** Loading games in VICE is very slow and can take several minutes. Be patient. Even if it seems to be frozen
it's probably still loading.


#### Install VICE

1. Download VICE PSP v2

    [https://psp.akop.org/vice.htm](https://psp.akop.org/vice.htm) > *2.00 and above*

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



## DeSmuME-PSP (Nintendo DS)

Use this for Nintendo DS emulation:

[https://github.com/TheMrIron2/DeSmuME-PSP](https://github.com/TheMrIron2/DeSmuME-PSP)



## Misc

#### References

- [Emulators on PSP](http://emulation.gametechwiki.com/index.php/Emulators_on_PSP)
- [List of All PSP Emulators](http://ky0uza.blogspot.com/2016/01/list-of-all-psp-emulator.html)
