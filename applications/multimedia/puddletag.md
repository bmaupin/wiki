---
title: Puddletag
---

## General

#### Installing Puddletag
```
sudo apt install puddletag
```


#### Making changes
- Changes made in the right side of the screen #### are automatically saved
- Or select one or more tracks, make changes in the left box, click *Save*
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
1. Click the *F* button to the right of the text box


#### Adding album artist column:
1. Right-click column names > *Select Columns...*
1. Click plus sign
1. Title: *Album Artist*
1. Field: *albumartist*
1. In the left, check *Album Artist*
1. *OK*


#### Auto numbering for tracks
1. Select all the tracks to autonumber
1. *Tools* > *Autonumbering Wizard* > *OK*


#### Look up tags using online sources
1. *Windows* > *Tag Sources*
1. *Source* > *MusicBrainz*
1. In the search box you can type *artist; album*, e.g:
    pimsleur; french plus
1. Click *Search*
1. Select all of the tracks you want to update
1. Select an album to preview the changes
1. If you want to apply the updates, click *Write*
1. Close the *Tag Sources* window if desired


#### Replacing text
1. Select the tracks you want to update
1. *Actions* > *Functions* > *Replace*
1. Under *Fields* choose the field you want to update or *__all* for all fields
1. Fill in the *Replace* and *with* fields > *OK*


#### String formatting
1. Select the tracks you want to update
1. *Actions* > *Functions* > *Format value*
1. Under *Fields* choose the field you want to update or *__all* for all fields
1. Under *Format string*, you can rename a tag based on the contents of that tag or another tag, for example
    - *Lesson %title%*


## Tags

#### List all tags and versions
*Windows* > make sure *Stored Tags* is checked
