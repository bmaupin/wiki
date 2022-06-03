---
title: Compiling RetroArch for 3DS
---

#### Compiling using libretro-super

[https://docs.libretro.com/development/retroarch/compilation/3ds/](https://docs.libretro.com/development/retroarch/compilation/3ds/)

1. Clone libretro-super

   ```
   git clone https://github.com/libretro/libretro-super.git
   ```

1. Build a core

   1. Fetch the core

      ```
      ./libretro-fetch.sh fceumm
      ```

      (Replace `fceumm` with the name of the core you want to build)

   1. Build the core

      ```
      cd libretro-super
      docker run --rm -v "$PWD:/build" devkitpro/devkitarm sh -c "cd /build; ./libretro-build-ctr.sh fceumm"
      ```

      (Replace `fceumm` with the name of the core you want to build)

1. Build Salamander

   1. Fetch RetroArch

      From `libretro-super`:

      ```
      ./libretro-fetch.sh retroarch
      cd retroarch
      ```

   1. (Optional) Fetch the latest tag

      From `libretro-super/retroarch`:

      ```
      git checkout v1.10.3
      ```

   1. Build RetroArch

      From `libretro-super/retroarch`:

      ```
      docker run --rm -v "$PWD:/build" --network=host devkitpro/devkitarm sh -c "cd /build; make -f Makefile.ctr.salamander USE_CTRULIB_2=1"
      ```

1. Build RetroArch

   1. Copy the core

      From `libretro-super/retroarch`:

      ```
      cp ../dist/ctr/fceumm_libretro_ctr.a libretro_ctr.a
      ```

      (Replace `fceumm_libretro_ctr.a` based on the core you built)

   1. (Optional) Enable the console

      The bottom screen can display the RetroArch logs; to do this, edit Makefile.ctr:

      ```
      CONSOLE_LOG             = 1
      ```

      ⚠ This currently doesn't work due to [https://github.com/libretro/RetroArch/issues/13973](https://github.com/libretro/RetroArch/issues/13973)

   1. Build RetroArch

      From `libretro-super/retroarch`:

      ```
      docker run --rm -v "$PWD:/build" --network=host devkitpro/devkitarm sh -c "cd /build; make -f Makefile.ctr USE_CTRULIB_2=1"
      ```

      The built CIA will be at `libretro-super/retroarch/retroarch_3ds.cia`

      Or you can remotely run the file at `libretro-super/retroarch/retroarch_3ds.3dsx` using the instructions here: [3DS debugging](3ds-debugging)
