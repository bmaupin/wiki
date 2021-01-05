---
title: PSP debugging (PSPLink)
---

#### Setup

1. Check out PSPLink

   ```
   git clone https://github.com/pspdev/psplinkusb.git
   cd psplinkusb
   ```

1. Apply workaround

   https://github.com/pspdev/psplinkusb/issues/7

1. Compile

   ```
   docker run --rm -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 make release
   ```

1. Copy psplinkusb/release_oe/psplink/ to PSP/GAME on the PSP

#### Debugging

1. Connect PSPLink

   1. On the PSP, open PSPLINK

   1. In a terminal on your PC, CD to folder where the .prx file is you want to run

      ```
      cd /path/to/somewhere
      ```

   1. Start USB connection

      ```
      docker run -it --rm --privileged -v /dev/bus/usb:/dev/bus/usb -v "$PWD:/build" bmaupin/pspdev:gcc-4.6.4 usbhostfs_pc
      ```

   1. Wait for this message:

      ```
      Connected to device
      ```

   1. In a **second terminal**, connect to the PSP
      ```
      docker container exec -it $(docker container ls | grep usbhostfs_pc | awk '{print $1}') pspsh
      ```

1. Debug

   1. In a **third terminal**, start gdb on the .elf file you want to debug

      ```
      $ docker container exec -it $(docker container ls | grep usbhostfs_pc | awk '{print $1}') psp-gdb retroarchpsp.elf
      ```

      ```
      (gdb) target remote :10001
      ```

      Ignore these errors:

      ```
      Ignoring packet error, continuing...
      warning: unrecognized item "timeout" in "qSupported" response
      ```

   1. In the **second terminal** (where you ran `pspsh`)

      ```
      host0:/> debug retroarchpsp.prx
      ```

      - If you were successful, you should see something like this in the **third terminal**:

        ```
        0x0880413c in module_start ()
        ```

        If you see something like this instead, then go back and make sure your program was compiled with debugging symbols:

        ```
        0x0880413c in ?? ()
        ```

   1. In the **third terminal**

      1. If the app you're debugging isn't crashing, set a breakpoint somewhere

         ```
         (gdb) b nameoffunction
         ```

      1. Type `c` to start debugging
         ```
         (gdb) c
         ```

      If it gets stuck (it never returns to the (gdb) prompt), press Ctrl-C twice

      Some helpful gdb commands:

      - `n` - Go line-by-line without stepping into functions
      - `s` - Go line-by-line and step into functions
      - `finish` - Go until the end of the current function
