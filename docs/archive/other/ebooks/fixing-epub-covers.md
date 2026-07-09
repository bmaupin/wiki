---
title: Fixing EPUB covers
---

#### Fixing covers that don't show

1. If this is for Google Play Books, read this:
   [No cover when uploading to Google Play Books](http://laviefrugale.blogspot.ca/2013/08/no-cover-when-uploading-to-google-play.html)

1. Otherwise, try fixing it using Calibre with the instructions in the same link ([No cover when uploading to Google Play Books](http://laviefrugale.blogspot.ca/2013/08/no-cover-when-uploading-to-google-play.html))

1. If that still doesn't work:

   1. Download and install [Sigil](http://sigil-ebook.com/)

   1. Open the EPUB with Sigil

   1. Disable autoformatting

      _Edit_ > _Preferences_ > _Clean Source_ > uncheck _Open_ and _Save_ > _OK_

   1. Find the cover file

      - It may be named cover.xhtml or cover.html
      - If you still can't find it, open the .opf file, go to the spine section, and it should be the first entry listed. The idref value should reference an entry in the manifest section.

   1. Edit the cover file, and copy the location of the cover image. Ex:

      ```xml
      <img src="../img/cover.jpg"
      ```

   1. Replace the contents of the cover file with the following, updating the path to the image file as necessary:
      ```xml
      <?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <title></title>
          <style type="text/css">body { background-color: #FFFFFF; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; text-align: center; } img { max-height: 100%; max-width: 100%; }</style>
        </head>
        <body>
          <img src="../img/cover.jpg" alt="Cover Image"/>
        </body>
      </html>
      ```
   1. Save and close

#### Fixing covers that have too much space around them

1. If this is for a particular eReader, make sure the cover image is at least as tall or wide as the eReader resolution. If the cover image is smaller, replace it with a larger one

   - For example, the Kobo Aura's resolution is 1024x758, so the image should be at least 1024 pixels in height or 758 pixels in width

1. Follow the instructions above for fixing covers that don't show

1. If the image looks vertically stretched:

   1. Calculate the aspect ratio of the image by dividing the height by the width

      Ex: 3300/2550 = 1.29

   1. If the aspect ratio is dramatically less than 4/3 (1.33), in the instructions for fixing covers, replace:

      ```
      height: 100%; max-width: 100%;
      ```

      With this:

      ```
      width: 100%; max-height: 100%;
      ```

#### Changes to covers don't show up on Kobo Aura

Kobo caches the cover images. After making the changes and replacing the file, reboot the Kobo by fully powering off (hold the power button until it says it's powered off) and then powering back on.
