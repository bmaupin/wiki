---
title: Compiling RetroArch for PSP
---

#### Compiling using libretro-super

[https://docs.libretro.com/development/retroarch/compilation/psp/#core-compilation](https://docs.libretro.com/development/retroarch/compilation/psp/#core-compilation)

1. Clone libretro-super

    ```
    git clone https://github.com/libretro/libretro-super.git
    ```

1. Build RetroArch

    - Build a specific core

        ```
        cd libretro-super
        docker run --rm -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 ./libretro-build-psp1.sh quicknes
        ```

    - Build all cores

        ```
        cd libretro-super
        docker run --rm -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 ./libretro-build-psp1.sh
        ```

    The build will be in retroarch/pkg/psp1/. You can copy the contents of this folder into the folder where RetroArch
    is installed on the PSP (e.g. PSP/GAME/RetroArch).


#### Compile a single core manually

1. Get the latest tag for RetroArch

    [https://github.com/libretro/RetroArch/tags](https://github.com/libretro/RetroArch/tags)

    This is recommended because sometimes the master branch of RetroArch can be broken

1. Clone RetroArch

    ```
    git clone --depth=1 -b TAG https://github.com/libretro/RetroArch.git retroarch
    ```

    (Replace `TAG` with the latest tag from the previous step)

1. Clone the core

    For example:
    ```
    git clone https://github.com/libretro/QuickNES_Core.git
    ```

1. Compile the core library

    For example:
    ```
    cd QuickNES_Core
    docker run --rm -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 sh -c "make platform=psp1 clean && make platform=psp1"
    ```

1. Copy the core library into the RetroArch repo

    ```
    rm ../retroarch/dist-scripts/*_psp1.a
    cp *_psp1.a ../retroarch/dist-scripts
    cd ..
    ```

1. Compile the core with RetroArch

    ```
    cd retroarch
    docker run --rm -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 sh -c "(cd dist-scripts; ./dist-cores.sh psp1)"
    ```

    The build will be in retroarch/pkg/psp1/. You can copy the contents of this folder into the folder where RetroArch
    is installed on the PSP (e.g. PSP/GAME/RetroArch).


#### Compile a single core manually for [debugging with PSPLink](psp-debugging.html)

Refer to the previous section with the following differences:

1. After cloning RetroArch, configure it for a debug build

    ```
    cd retroarch
    # Enable building of the .prx file
    sed -i 's/BUILD_PRX          = 0/BUILD_PRX          = 1/' Makefile.psp1
    # Don't delete the .elf file when compiling
    sed -i s'/rm -f ..\/retroarchpsp.elf/true || rm -f ..\/retroarchpsp.elf/' dist-scripts/dist-cores.sh
    ```

    For older versions of RetroArch (< v1.7.0), you may also need to run these commands:

    ```
    # Enable debugging symbols for the salamander core (the one that loads the other cores)
    sed -i 's/.salamander ||/.salamander DEBUG=1 ||/' dist-scripts/dist-cores.sh
    # Enable debugging symbols for the RetroArch core
    sed -i 's/-j3 ||/-j3 DEBUG=1 ||/' dist-scripts/dist-cores.sh
    ```

1. When compiling the core library, enable debugging symbols by appending `DEBUG=1`

    ```
    cd path/to/core
    docker run --rm -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 sh -c "make platform=psp1 clean && make platform=psp1 DEBUG=1"
    ```

1. When compiling the core, enable debugging symbols for the salamander core with `-e OPTS=DEBUG=1`

    ```
    cd retroarch
    docker run --rm -v "$PWD:/build" -e OPTS=DEBUG=1 bmaupin/pspdev:gcc-4.6.4 sh -c "(cd dist-scripts; ./dist-cores.sh psp1)"
    ```

    The files you will need for debugging will be:

    - retroarch/retroarchpsp.elf
    - retroarch/retroarchpsp.prx
