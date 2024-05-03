---
title: Puddletag
---

## General

#### Installing Puddletag

```
sudo apt install puddletag
```

Ubuntu 20.04:

```
sudo add-apt-repository ppa:ubuntuhandbook1/apps
sudo apt install puddletag
```

#### Making changes

- Changes made in the right side of the screen **are automatically saved**
- Or select one or more tracks, make changes in the left box, click _Save_
- You can also select a tag for multiple tracks using shift-click and paste the same value into all selected tracks

#### Renaming files

1. Put this in the text box near the upper left:
   - For Track number - Title:
     ```
     $num(%track%,2) - %title%
     ```
   - For Artist - Title:
     ```
     %artist% - %title%
     ```
1. Select all tracks to rename
1. Click the _F_ button to the right of the text box

#### Adding album artist column:

1. Right-click column names > _Select Columns..._
1. Click plus sign
1. Title: _Album Artist_
1. Field: _albumartist_
1. In the left, check _Album Artist_
1. _OK_

#### Auto numbering for tracks

1. Select all the tracks to autonumber
1. _Tools_ > _Autonumbering Wizard_ > _OK_

#### Look up tags using online sources

1. _Windows_ > _Tag Sources_
1. _Source_ > _MusicBrainz_
1. In the search box you can type _artist; album_, e.g:
   pimsleur; french plus
1. Click _Search_
1. Select all of the tracks you want to update
1. Select an album to preview the changes
1. If you want to apply the updates, click _Write_
1. Close the _Tag Sources_ window if desired

#### Replacing text

1. Select the tracks you want to update
1. _Actions_ > _Functions_ > _Replace_
1. Under _Fields_ choose the field you want to update or _\_\_all_ for all fields
1. Fill in the _Replace_ and _with_ fields > _OK_

#### String formatting

1. Select the tracks you want to update
1. _Actions_ > _Functions_ > _Format value_
1. Under _Fields_ choose the field you want to update or _\_\_all_ for all fields
1. Under _Format string_, you can rename a tag based on the contents of that tag or another tag, for example
   - _Lesson %title%_

## Tags

#### List all tags and versions

_Windows_ > make sure _Stored Tags_ is checked

#### Helpful tags

- Filename without extension: `__filename_no_ext`
  - This can be used, for example, to append a tag to the existing filename, e.g. `%__filename_no_ext% - %title%`

For more tags, see [https://docs.puddletag.net/source/tags.html](https://docs.puddletag.net/source/tags.html)

## Album art

#### See if a track has album art

1. Open the folder containing the tracks you want to update
1. If you don't see the _Artwork_ pane on the right, go to _Windows_ and check _Artwork_
1. Look at the _Artwork_ pane on the right to see if the album art is there

#### Add album art

1. If you don't see the _Artwork_ pane on the right, go to _Windows_ and check _Artwork_
1. Select all the tracks you wish to update
1. In the _Artwork_ pane on the right, right-click > _Add cover_
1. Browse to the cover you wish to add
1. Click the _Save_ button near the top left

#### Remove album art

1. If you don't see the _Artwork_ pane on the right, go to _Windows_ and check _Artwork_
1. Select all the tracks you wish to update
1. In the _Artwork_ pane on the right, click the arrows until you see _<blank>_
1. Click the _Save_ button near the top left

#### Change album art

ⓘ There's a _Change cover_ option in the _Artwork_ window but I couldn't get it to work to apply changes to all tracks. But this works:

1. Follow the steps above to remove album art
1. Follow the steps above to add album art
