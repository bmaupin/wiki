---
title: 3DS tools
---

## Extraction

#### Extract NCCH (content) from CIA

```
ctrtool --contents=contents /path/to/file.cia
mv contents.* ncch.bin
```

#### Extract NCCH

```
3dstool -xtf cxi ncch.bin --header header.bin --exh exheader.bin --exefs exefs.bin --logo logo.bin --romfs romfs.bin
```

#### Extract RomFS

```
3dstool -xtf romfs romfs.bin --romfs-dir romfs/
```

#### Extract code, icon from ExeFS

```
3dstool -xtf exefs exefs.bin --exefs-dir exefs/
```

## Creation

#### Create RomFS file

```
3dstool -ctf romfs romfs.bin --romfs-dir romfs/
```

#### Make NCCH from the ELF plus RomFS file

```
makerom -f ncch -o ncch.bin -elf file.elf -romfs romfs.bin -rsf file.rsf
```

#### Make CIA from NCCH

```
makerom -f cia -o file.cia -content ncch.bin:0:0
```

## ftpd

#### Installing

Download and install the latest .cia (or .3dsx) from [https://github.com/mtheall/ftpd/releases](https://github.com/mtheall/ftpd/releases)

#### Running

1. Make sure wifi is enabled on the 3DS

1. Start ftpd

#### Connecting from Gnome file browser

1. Make sure ftpd is running

   The FTP address will be displayed on the screen

1. Click _Other Locations_ in the lower left

1. _Connect to Server_: type in the FTP address

   ⚠ Make sure to add the port as well (typically 5000), e.g. `ftp://192.168.0.123:5000`

   - If you get this error: _No route to host_

     Open a terminal and ping the 3DS, e.g. `ping -c 1 192.168.0.123`
