---
title: RetroArch
---

## General

#### Overrides

- When making changes (like control mappings), save as game overrides to apply your changes to the game automatically the next time it's loaded

#### Shaders

- Bilinear is a good choice on smaller devices to preserve pixels
- The _presets_ directory has a good selection
  - ScaleFx is a good choice to smooth pixels

Once you find a shader you like, be sure to go back to _Shaders_ > _Save_ to save it, either as a game, core, or global preset

#### Playlists

To create a playlist:

1. Make sure your ROMs are from a no-intro set so they'll be appropriately matched by RetroArch
1. Make sure you have the needed cores installed for your ROMs
1. Put all your ROMs in a directory
1. In RetroArch go to _Import Content_ > _Scan Directory_

#### Thumbnails

Thumbnails are very finicky; you can try clicking the option to download them from within RetroArch, but this may not work (e.g. using RetroArch in Steam).

Instead, thumbnails seem to be designed to work with playlists. See above for creating playlists.

If you still don't see thumbnails, you can create them manually:

1. Go to the `thumbnails` directory in the RetroArch configuration folder
1. Create a directory with the name of the system, e.g. `Commodore - 64`

   ⚠️ The name of the system must exactly match the names of the systems in this repository: [https://github.com/libretro-thumbnails/libretro-thumbnails](https://github.com/libretro-thumbnails/libretro-thumbnails)

1. Within that directory, create these directories:

   - `Named_Boxarts`
   - `Named_Snaps`
   - `Named_Titles`

1. Within each of those directories, you can manually copy the thumbnail files from the RetroArch thumbnail repositories: [https://github.com/libretro-thumbnails/libretro-thumbnails](https://github.com/libretro-thumbnails/libretro-thumbnails)

## Vice

- Press <kbd>ScrLk</kbd> to disable RetroArch keys and allow using the keyboard in-game (also disables the mouse)
- The fire button should already be mapped to one of the gamepad buttons; if it's not working, go to _Core Options_ > _Input_ and change _Joystick Port_
