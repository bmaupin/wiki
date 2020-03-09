---
title: Compiling for PSP
---

#### Compiling release builds for PSP

1. Navigate to the directory containing the Makefile and build

    This is easiest using Docker so you don't have to install the entire PSP SDK on your machine:

    ```
    docker run --rm -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 sh -c "make clean && make -j3"
    ```


#### Compiling debug builds for PSP

To compile software for [debugging with PSPLink](psp-debugging.html):

1. In addition to the .elf file (which should normally be built), you need to build a .prx file
    1. At the top of the Makefile, add this:

        ```
        BUILD_PRX = 1
        ```

1. As is typical when compiling debug builds for other platforms, you'll need to use the proper compile parameters
    - Include debugging information (`-g`)
    - Don't optimize (`-O0`)

    Often, you can just set `DEBUG=1` and it will automatically set any necessary debugging parameters for you

1. Depending on your PSP firmware version, don't set `-DFW15`

1. Navigate to the directory containing the Makefile and build

    This is easiest using Docker so you don't have to install the entire PSP SDK on your machine:

    ```
    docker run --rm -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 sh -c "make clean && make -j3 DEBUG=1"
    ```
