---
title: 3DS tools
---

## Extraction

#### Extract `.cia` file

```
ctrtool --contents=contents /path/to/file.cia
mv contents.* contents.bin
```

#### Extract content file

```
3dstool -xtf cxi contents.bin --header header.bin --exh exheader.bin --exefs exefs.bin --logo logo.bin --romfs romfs.bin
```

#### Extract RomFS file

```
3dstool -xtf romfs romfs.bin --romfs-dir romfs/
```

## Creation

#### Create RomFS file

```
3dstool -ctf romfs romfs.bin --romfs-dir romfs/
```

#### Make NCCH from the ELF plus RomFS file

```
makerom -f ncch -o file.ncch -elf .file.elf -romfs romfs.bin -rsf file.rsf
```

#### Make CIA from NCCH

```
makerom -f cia -o file.cia -content file.ncch:0:0
```
