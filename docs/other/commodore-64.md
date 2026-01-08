---
title: Commodore 64
---

## Commodore 64 emulator (Vice)

#### Install Vice

(Recommended) Install from source:
[https://gist.github.com/bmaupin/893aff71c3a525b17bba1e2f418c9fcf](https://gist.github.com/bmaupin/893aff71c3a525b17bba1e2f418c9fcf)

#### Run Vice

In a terminal:

```
x64
```

#### Enable drive sound emulation (just for fun)

_Settings_ > _Drive settings_ > check _Drive sound emulation_

#### Mount a .d64 disk image

_File_ > _Attach disk image_ > _Unit #8_ > check _Attach read only_ > browse to the .d64 file > _Open_

#### Keyboard shortcuts

- Switch between upper/lower case display

  <kbd>Ctrl</kbd>+<kbd>Shift</kbd>

- Switch between upper/lower case input

  <kbd>Caps Lock</kbd>

- Pause the emulator

  <kbd>Alt</kbd>+<kbd>P</kbd>

- Mapping (PC > C64)

  <kbd>Tab</kbd> > <kbd>Ctrl</kbd>

## Commodore 64 commands

#### List files on a disk

```
LOAD "$",8
LIST
```

#### Show the contents of a file

1. Load the file

   ```
   LOAD "FILENAME",8
   ```

1. List the contents
   1. List all the contents
      ```
      LIST
      ```
   1. List specific lines
      ```
      LIST 10 - 100
      ```

#### Run a file

1. Load the file

   ```
   LOAD "FILENAME",8
   ```

1. Run the file
   ```
   RUN
   ```

## .d64 images

**Note:** Install Vice first (see above) to provide the c1541 binary

#### List the contents of a .d64 image

```
c1541 -attach IMAGE.d64 -list
```

#### Extract all files from a .d64 image

```
c1541 -attach IMAGE.d64 -extract
for file in *; do mv "$file" "$file.prg"; done # (Optional)
```

#### Extract one file from a .d64 image

```
c1541 -attach IMAGE.d64 -read SOURCEFILE DESTFILE.prg
```

#### Extracting files from a corrupt image

If you get an error reading or extracting files from a d64 image using c1541:

1. If the image was created with d64copy (ZoomFloppy/OpenCBM) try recreating it using `-b`/`--bam-only`

1. If that's not possible or it doesn't work, check the file size

1. If the image file is bigger than 174848 bytes, open the file in a hex editor

1. Verify that there's no real data past 2AAFF. If it's just 00s or 01s then it's safe to trim

1. Trim the image

   ```
   dd if=image.d64 of=image-trimmed.d64 bs=1 count=174848
   ```

1. Try using c1541 again on the new trimmed image

## Commodore 64 graphics/image files

#### Identify Commodore 64 graphics/image files

Use DirMaster (runs fine in Linux using Wine):
[http://style64.org/dirmaster](http://style64.org/dirmaster)

#### Convert Commodore 64 graphics/image files

Use Pixcen (runs fine in Linux using Wine):
[http://censordesign.com/pixcen/](http://censordesign.com/pixcen/) (source code: [https://github.com/Hammarberg/pixcen](https://github.com/Hammarberg/pixcen))

## Misc

**Note:** Install Vice first (see above) to provide the petcat binary

#### View contents of Commodore 64 PRG files

```
petcat -2 -- FILENAME.prg
```

#### View contents of folder of Commodore 64 PRG files

```
for file in *; do petcat -2 -- "$file" | less; done
```

#### Convert a Commodore 64 PRG file to a text file

```
petcat -2 -o OUTPUT.txt -- INPUT.prg
```

#### Convert all Commodore 64 PRG files in a folder to text files

```
for file in *; do petcat -2 -o "${file%.prg}.txt" -- "$file"; done
```
