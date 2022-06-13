---
title: Compiling for 3DS
---

#### Compile source

```
docker run --rm -v "$PWD:/build" devkitpro/devkitarm sh -c "cd /build; make"
```

#### Build CIA from ELF

1. Download `makerom` from [https://github.com/3DSGuy/Project_CTR/releases](https://github.com/3DSGuy/Project_CTR/releases)

   ⚠ Version v0.18.2 has a segmentation fault; v0.18 seems to work fine

   1. Copy it to your path (e.g. `~/bin`)

1. Download RSF from [https://gist.github.com/jakcron/9f9f02ffd94d98a72632](https://gist.github.com/jakcron/9f9f02ffd94d98a72632)

   Change this line:

   ```
   SystemModeExt                 : 128MB
   ```

   to:

   ```
   SystemModeExt                 : 124MB
   ```

1. Do the conversion

   ```
   makerom -f cia -o hello-world.cia -target t -elf hello-world.elf -rsf app.rsf
   ```
