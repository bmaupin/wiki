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
