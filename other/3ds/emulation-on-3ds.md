---
title: Emulation on 3DS
---

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

- Under _Finalizing Setup_, all of the steps are optional
  - (Recommended) DSP1: allows homebrew applications to have sound
  - (Recommended) FBI: allows you to install CIA files
  - (Recommended) Homebrew Launcher Loader: this gives you an icon to directly open the Homebrew Launcher; otherwise it's a multi-step process involving opening Download Play, using a button combo, and selecting a specific menu item
  - (Recommended) Luma3DS Updater: makes the update process of Luma3DS (the CFW) easier; Luma3DS needs to be updated any time Nintendo releases new 3DS firmware
  - (Optional) Anemone3DS: install if you want custom themes
  - (Optional) Checkpoint: install if you want to be able to back up and restore saves for DS and 3DS games
  - (Optional) ctr-no-timeoffset: install if you want to bypass penalties from certain games for your system clock changing
  - (Optional) GodMode9

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
- NDS ROMs can be converted to an installable CIA using a tool like [Forwarder3-DS](https://gbatemp.net/threads/nds-forwarder-cias-for-your-home-menu.426174/)

#### Game Boy Advance

- The 3DS can natively play GBA games
  - Game Boy Advance games are not in the 3DS eShop, except for 10 games that were released only to early adopters of the 3DS
  - Those 10 games and others can be found as or converted to CIA files using a tool like New Super Ultimate Injector (see below)
- GBA ROMs can be emulated using RetroArch
- GBA ROMs can be emulated using TWiLight Menu++

#### Nintendo 64

[https://github.com/masterfeizz/DaedalusX64-3DS](https://github.com/masterfeizz/DaedalusX64-3DS)

#### Other systems

- Many Game Boy, Game Boy Color, NES, SNES (New 3DS only), Game Gear, and TurboGrafx-16 (Japan only) titles are available in the eShop
  - These titles and others can be found as or converted to CIA files using a tool like New Super Ultimate Injector (see below)
- RetroArch can emulate the largest number of systems, including PlayStation 1

  [https://emulation.gametechwiki.com/index.php/Emulators_on_3DS#RetroArch](https://emulation.gametechwiki.com/index.php/Emulators_on_3DS#RetroArch)

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

#### RetroArch

- Install RetroArch

  [https://docs.libretro.com/guides/install-3ds2ds/](https://docs.libretro.com/guides/install-3ds2ds/)

#### TWiLight Menu++

- Install TWiLight Menu++

  [https://github.com/DS-Homebrew/TWiLightMenu/wiki/installing-%283ds%29](https://github.com/DS-Homebrew/TWiLightMenu/wiki/installing-%283ds%29)

- Exit a game

  - Hold L + R + Down + B for 2 seconds

## Tools

#### New Super Ultimate Injector (NSUI)

- Run on Linux using Wine: [https://gist.github.com/bmaupin/93d31e1b2d738ae656b9d3617e19622b](https://gist.github.com/bmaupin/93d31e1b2d738ae656b9d3617e19622b)

- Create a new CIA

  1. _File_ > _New_ > select the system as appropriate
  1. _Project_ > _Load ROM_ > select the ROM
  1. Under _CIA metadata_ > _Game icon_ click _Download Title Screen from database_
     - If you get this error: `The request was aborted: Could not create SSL/TLS secure channel.`
       1. Go here: [https://github.com/libretro-thumbnails](https://github.com/libretro-thumbnails)
       1. Go to the specific repo for the system
       1. Click _Go to file_ and start typing the name of the file
       1. Download the appropriate file under `Named_Titles`
       1. In NSUI, click _Load image from file_ to use the local file
  1. Under _CIA banner_ click _Download Title Screen from database_
  1. Under _Game patches and extras_ uncheck _Enable Download Play_ (this doubles the size of the file)
  1. _Project_ > _Export CIA_
