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

1. On a PC, download this file: [https://raw.githubusercontent.com/Steveice10/FBI/master/servefiles/servefiles.py](https://raw.githubusercontent.com/Steveice10/FBI/master/servefiles/servefiles.py

1. On the 3DS, open FBI and go to _Remote Install_ > _Receive URLs over the network_

1. Send the file from the PC

   ```
   python /path/to/servefiles.py 192.168.0.212 FILE.cia
   ```

   (Replace `/path/to/servefiles.py` with the path to `servefiles.py`, `192.168.0.212` with the IP of the 3DS, and `FILE.cia` with the CIA file to install)

1. On the 3DS, press <kbd>A</kbd> to confirm the remote install

#### Debugging

TODO
