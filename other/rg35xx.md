---
title: RG35XX
---

#### Install GarlicOS

1. Go here: [https://www.patreon.com/posts/garlicos-for-76561333](https://www.patreon.com/posts/garlicos-for-76561333)

1. Scroll all the way to the bottom of the post and download _RG35XX-MicroSDCardImage.7z.001_ and _RG35XX-MicroSDCardImage.7z.002_

1. Open _RG35XX-MicroSDCardImage.7z.001_ using 7zip and extract it somewhere on your computer

1. Insert an SD card

   ⚠️ The SD card will be completely wiped during this process

1. Write `garlicos.img` to the SD card, e.g. using dd:

   1. Get the device of the SD card

      In Linux, I like to use GParted. Alternatively, you can use `mount`, e.g.

      ```
      $ mount
      ...
      /dev/mmcblk0p1 on /media/user/3834-6161 type exfat (rw,nosuid,nodev,relatime,uid=1000,gid=1000,fmask=0022,dmask=0022,iocharset=utf8,errors=remount-ro,uhelper=udisks2)
      ```

      In this case, the device is `/dev/mmcblk0`

   1. (Optional) Write a file to the SD card to make sure you have the correct device, e.g.

      ```
      touch /media/user/3834-6161/test
      ```

      You should be able to see the file in the file browser

   1. Unmount the SD card

   1. Write `garlicos.img` to the SD card, e.g.

      ```
      sudo dd if=garlic.img of=/dev/mmcblk0
      ```

      Wait for it to finish as it will probably take several minutes depending on the speed of your SD card

1. Use a tool to expand the ROMS partition on the SD card, e.g. using GParted

   ⓘ Because the GarlicOS image is 4 GB, it will only create a 3 GB ROMs parition on the SD card. You'll want to expand it to use the entire space of your SD card.

   1. Open GParted

   1. Choose your SD card from the dropdown near the top right

   1. Select the _ROMS_ partition > right-click > _Resize/Move_

   1. Drag the right side of the partition box all the way to the right > _Resize/Move_

   1. Click _Apply All Operations_ near the top

#### Download box art

1. (Optional) Download a custom mix

   Here's mine for showing just the box art (based on the format recommended by Retro Game Corps):

   ```xml
   <ImageComposition xsi:noNamespaceSchemaLocation="https://www.skraper.net/ImageComposition.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <Information ShortName="RG35XX box art" LongName="RG35XX box art" Description="2DBox" Author="Author" />
     <Viewport Color="#00FFFFFF" Width="640" Height="480" />
     <Drawings>
       <Item Type="Box2DFront">
         <Display X="26.5625%" Y="50%" Transparency="1" Width="53.125%" KeepRatio="true" Anchor="VCenterHCenter" />
       </Item>
     </Drawings>
   </ImageComposition>
   ```

   Other mixes available here:

   - [https://github.com/ebzero/garlic-onion-skraper-mix](https://github.com/ebzero/garlic-onion-skraper-mix)
   - [https://www.reddit.com/r/RG35XX/comments/120p5k7/comment/jdib20w/](https://www.reddit.com/r/RG35XX/comments/120p5k7/comment/jdib20w/)

1. Download Skraper from [http://skraper.net/](http://skraper.net/)

   ⚠️ For Linux, if you wish to use a custom mix to format the box art, download the Windows version and run it in Wine; custom mixes don't work in the Linux version

1. Open Skraper

1. First-time setup

   1. (Recommended) Create a new account and sign in

      ⚠️ If you choose not to create an account, Skraper will run extremely slowly since API calls will be throttled

      ⓘ Even with an account, opening Skraper for the first time can take a while

   1. Select Recalbox

   1. Browse to the directory of your ROMs

   1. Check _Include non-Recalbox rom folders_

1. Go to _Game list_

   1. Under _Gamelist type_ select _No backup, create new or overwrite existing_

1. Go to _Media_

   1. If there's a second media item, select it and delete it by clicking the delete button near the left

   1. Select the first media item

   1. Change _Media type_ as desired

      To use a custom mix, select _User provided mix_ and then browse to the custom mix file

   1. Set _Output folder_ to `%ROMROOTFOLDER%/Imgs`

   1. (Optional) Uncheck _Cleanup output folder before generating new medias_

1. (Optional) Go to _Miscellaneous_, uncheck _Use rom region first (when available)_ and set ROM region as desired (e.g. `us`)

1. When you're ready, click Play to begin scraping

1. Delete any gamelist.xml files created by Skraper, e.g.

   ```
   find /media/user/3834-6161/Roms/ -name gamelist.xml -delete
   ```

1. On the SD card, realign the text as needed to match the box art format

   1. Modify `CFW/skin/settings.json` on the SD card

      e.g. for my custom mix above, make these changes:

      ```json
      "text-alignment": "left",
      "text-margin": 352,
      ```

More information:

- [https://retrogamecorps.com/2023/01/03/anbernic-rg35xx-starter-guide/#Boxart](https://retrogamecorps.com/2023/01/03/anbernic-rg35xx-starter-guide/#Boxart)
- [https://www.reddit.com/r/RG35XX/comments/120p5k7/comment/jdib20w/](https://www.reddit.com/r/RG35XX/comments/120p5k7/comment/jdib20w/)
