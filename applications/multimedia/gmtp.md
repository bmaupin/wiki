---
title: gMTP
---

#### Install gMTP

```
sudo apt install gmtp
```

#### Connect to a device

1. Plug the device into the computer

1. Open the file browser and unmount the device

1. Open gMTP and click _Connect_

   > ⓘ Wait a bit as the connection process may be a bit slow

#### Copy files to a device

1. (Optional) Open the files with [Puddletag](puddletag) and make sure these tags are set:

   - Artist
   - Title
   - Album
   - Track (unless the file will be part of a playlist)

1. For older devices (e.g. Creative Zen Mozaic) convert the MP3 tags to the proper format, e.g.

   ```
   find . -iname "*.mp3" -exec eyeD3 --encoding=utf16 --to-v2.3 {} \;
   ```

1. Connect the device (see above) and browse to the folder where you wish to copy the files (e.g. /Music)

1. If you wish to keep the directory structure, drag folders from the file browser to the gMTP window

   Otherwise, click the _Add_ button in gMTP

1. Click _Disconnect_ when you're done to make sure the changes are synced before unplugging the device

#### Working with playlists

1. Connect the device (see above)

1. In gMTP, click _Playlists_

1. Make the Playlists window bigger so you can see all the tags in the left side of the window

1. To create a new playlist, click _Add_, create the playlist, then click _Close_, finally click _Playlists_ again

   Otherwise, the new playlist may appear to have content in it already

1. Select the playlist from the top dropdown

1. Select one or more files on the left and click _Add File_

1. Rearrange the items on the right to reorder the playlist

1. Click _Close_ when done

1. Click _Disconnect_ when you're done to make sure the changes are synced before unplugging the device

#### Album art

1. Connect the device (see above)

1. In gMTP, click _Album Art_

1. Choose the album in the dropdown

1. Click _Upload_

   > ⓘ On the Creative Zen Mozaic this seems to frequently fail with the error "Couldn't send album art". This needs some testing but at the moment it seems to only work with very small image sizes (~10 kb). It may also only work with resolutions lower than the device resolution (128 x 160).

#### Albums

- Albums are automatically created by gMTP when MP3 files are imported
- To delete an album, delete the `.alb` file (it should be in the same directory as the MP3s)
- To create an album, the MP3 files must be deleted from the device and re-imported
