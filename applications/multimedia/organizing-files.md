---
title: Organizing files
---

## Duplicate files

#### Remove duplicates

```
rdfind -dryrun true -deleteduplicates true /path1 /path2
```

- Replace `/path1 /path2` with one or more directories to search for duplicates
  - Put the directory containing the originals first and rdfind will delete the others
- Remove `-dryrun true` when you're ready to delete the duplicates

#### Replacing duplicates with symlinks

```
rdfind -dryrun true -makesymlinks true /path1 /path2
```

#### Removing duplicates interactively

```
fdupes -r -dP /path1 /path2
```

You may get an error if you're running an older version of fdupes; in that case, use this command:

```
fdupes -r -d /path1 /path2
```

- Replace `/path1 /path2` with one or more directories to search for duplicates

## Organizing files

#### Remove all metadata from file

```
exiftool -all= path/to/file
```

#### Organize multimedia files by date

Put files in a directory by year with subdirectories for each month:

```
exiftool '-Directory<DateTimeOriginal' -d %Y/%m /path
```

Replace `/path` with path to a file, directory, or a wildcard pattern

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
