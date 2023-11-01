---
title: RetroArch programming
---

[https://docs.libretro.com/](https://docs.libretro.com) > _For Developers_ > _RetroArch Development_

## Architecture

#### Commands

Commands are listed in command.h

Commands are used in retroarch.h

#### Drivers

The frontend is generic and uses drivers to communicate with specific devices.

For example, here are the drivers for the PSP:

- audio/drivers/psp_audio.c
- frontend/drivers/platform_psp.c
- frontend/drivers/platform_psp.o
- gfx/drivers/psp1_gfx.c
- gfx/drivers/psp1_gfx.h
- input/drivers_joypad/psp_joypad.c
- input/drivers/psp_input.c

## Misc

#### Locations

- Commands: command.h
  - These are commands using the command pattern
- Strings: intl/msg_hash_us.h
- UI skins: menu/drivers
