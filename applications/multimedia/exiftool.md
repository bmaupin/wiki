---
title: ExifTool
---

## About

ExifTool is a tool used to manipulate image metadata

## Organizing files

#### Organize multimedia files by date

Put files in a directory by year with subdirectories for each month:

```
exiftool '-Directory<DateTimeOriginal' -d %Y/%m /path
```

Replace `/path` with path to a file, directory, or a wildcard pattern. **Note** that it won't read directories recursively (e.g. contents of subdirectories) so you may need to modify the path, e.g. `/directory/*`.

If that doesn't work, it may be because the `DateTimeOriginal` tag isn't defined (e.g. for `.mp4` files):

1. List other date/time EXIF tags, e.g.

   ```
   exiftool -s video.mp4 | egrep -i "date|time"
   ```

1. Run the command using a different tag, e.g.

   ```
   exiftool '-Directory<CreateDate' -d %Y/%m DCIM/*
   ```

## Manipulating image metadata

#### Remove all metadata from file

```
exiftool -all= path/to/file
```

#### Rotate an image

Rotate an image 90° clockwise by changing the metadata (this does not modify the original image):

```
exiftool -Orientation="Rotate 90 CW" path/to/file
```

#### Set image timestamp based on filename

```
exiftool '-DateTimeOriginal<filename' /path
```

#### Set image timestamp to specific value

```
exiftool -AllDates="2017-06-30 18:25:07" image.jpg
```

#### Set file timestamps based on metadata

```
exiftool "-FileCreateDate<DateTimeOriginal" "-FileModifyDate<DateTimeOriginal" file
```

#### Fix EXIF metadata

[https://exiftool.org/faq.html#Q20](https://exiftool.org/faq.html#Q20)

When running exiftool, if you get an unrecoverable error, you can try to fix it by rebuilding the metadata from scratch:

```
exiftool -all= -tagsfromfile @ -all:all -unsafe -icc_profile bad.jpg
```

#### Copy EXIF metadata from one file to another

```
exiftool -TagsFromFile srcimage.jpg "-all:all>all:all" targetimage.jpg
```

#### Adjust file metadata dates by a certain amount

Add 1 year, 12 month, 28 days, 14 hours, 54 minutes, 32 seconds:

```
exiftool "-AllDates+=1:12:28 14:54:32" *.jpg
```

You can use WolframAlpha to calculate the amount to adjust, if needed: [https://www.wolframalpha.com/input/?i=2017-07-10+11%3A24%3A00+-+1980-07-05+20%3A24%3A00](https://www.wolframalpha.com/input/?i=2017-07-10+11%3A24%3A00+-+1980-07-05+20%3A24%3A00)
