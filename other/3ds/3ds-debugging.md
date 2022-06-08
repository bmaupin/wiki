---
title: 3DS debugging
---

#### Prerequisites

- 3DS

  You should have the Homebrew Launcher installed on your 3DS. See [Emulation on 3DS](emulation-on-3ds) for more information.

- PC

  You either need [Docker](https://docs.docker.com/get-docker/) (recommended) or devkitARM installed on your PC

#### Run `.3dsx` files remotely

1. Connect 3dslink

   1. Make sure the 3DS is connected to your local network via Wifi

   1. On the 3DS, open HomeBrew Launcher and press <kbd>Y</kbd>

   1. Note the IP address

1. Start the application remotely

   1. On a PC, open a terminal and change to the directory containing the `.3dsx` file you would like to debug

   1. Run this command

      ```
      docker run --rm -v "$PWD:/build" --network=host devkitpro/devkitarm 3dslink /build/retroarch_3ds.3dsx
      ```

      (Change `retroarch_3ds.3dsx` with the name of the application)

      If you see this error:

      > No response from 3DS!

      Try again with the IP address of the 3DS, e.g.

      ```
      docker run --rm -v "$PWD:/build" --network=host devkitpro/devkitarm 3dslink /build/retroarch_3ds.3dsx -a 192.168.0.212
      ```

#### Run `.cia` files remotely

[https://github.com/Steveice10/FBI/tree/master/servefiles](https://github.com/Steveice10/FBI/tree/master/servefiles)

1. On a PC, download this file: [https://raw.githubusercontent.com/Steveice10/FBI/master/servefiles/servefiles.py](https://raw.githubusercontent.com/Steveice10/FBI/master/servefiles/servefiles.py)

1. On the 3DS, open FBI and go to _Remote Install_ > _Receive URLs over the network_

1. Send the file from the PC

   ```
   python /path/to/servefiles.py 192.168.0.212 FILE.cia
   ```

   (Replace `/path/to/servefiles.py` with the path to `servefiles.py`, `192.168.0.212` with the IP of the 3DS, and `FILE.cia` with the CIA file to install)

1. On the 3DS, press <kbd>A</kbd> to confirm the remote install

#### Debugging

1. Compile the application you wish to debug with debug symbols enabled

   You can check the file after compiling if you're not sure:

   ```
   $ file retroarch_3ds.elf
   retroarch_3ds.elf: ELF 32-bit LSB executable, ARM, EABI5 version 1 (SYSV), statically linked, with debug_info, not stripped
   ```

1. Set up the application you wish to debug

   - To debug `.cia` files, install the file on the 3DS using FBI
     - You can also use FBI to install the `.cia` file remotely using the instructions above
   - (Not recommended) To debug `.3dsx` files, simply open the Homebrew Launcher and then press <kbd>home</kbd> to return to the home screen

     ⚠ Unfortunately this isn't recommended as the application doesn't seem to exit cleanly when done debugging

1. Enable debugging on the 3DS

   1. On the 3DS, go to the main menu and press <kbd>L</kbd>+<kbd>down</kbd>+<kbd>Select</kbd> to bring up the Rosalina menu

   1. Go to _Debugger options_ > _Enable debugger_

   1. Then go to _Force-debug next application at launch_

   1. Make note of the IP address and port

   1. Exit Rosalina menu (pres <kbd>B</kbd>)

1. Start the application you wish to debug

   - To debug a `.cia` file that has already been installed, simply start the application from the 3DS home screen
   - To debug a `.3dsx` file, re-open Homebrew Launcher by pressing <kbd>home</kbd> and then use the instructions above to run the file remotely

1. On your PC, start gdb and connect to the 3DS

   1. Start the container with the workaround for [https://github.com/devkitPro/docker/issues/24](https://github.com/devkitPro/docker/issues/24)

      ```
      docker run -it --rm -v "$PWD:/build" devkitpro/devkitarm sh -c "PATH=/opt/devkitpro/devkitARM/bin:"$PATH"; apt -y install libpython2.7 libtinfo5; bash"
      ```

   1. Start the debugger and connect to the 3DS, e.g.

      ```
      cd /build
      arm-none-eabi-gdb retroarch_3ds.elf
      (gdb) target remote 192.168.0.212:4003
      ```

      (Replace IP and port with the ones you made a note of earlier)

   1. Start debugging

      1. Set a breakpoint, e.g.

         ```
         (gdb) b nameoffunction
         ```

      1. Continue until next breakpoint:

         ```
         (gdb) c
         ```

      Some helpful gdb commands:

      - `n` - Go line-by-line without stepping into functions
      - `s` - Go line-by-line and step into functions
      - `p` - Print the value of a variable, e.g.

        ```
        (gdb) p g_defaults.dirs[DEFAULT_DIR_ASSETS]
        $6 = "sdmc:/retroarch/assets"
        ```

      - `finish` - Go until the end of the current function
      - `d` - Delete all breakpoints

      To break while running (to insert a new breakpoint, etc), press <kbd>Ctrl</kbd>+<kbd>C</kbd>
