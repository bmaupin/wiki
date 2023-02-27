---
title: Handbrake
---

#### Documentation

[https://handbrake.fr/docs/](https://handbrake.fr/docs/)

#### Install Handbrake

```
sudo apt install handbrake
```

#### Re-encoding videos

1. Open Handbrake

2. _Source_ > browse to video

3. Under _Presets List_ on the right select one of the presets under _General_

   - The _Fast 1080p30_ preset is more or less the default preset
   - Choose one of the _Very Fast_ presets for a smaller file size and slightly reduced quality
   - Choose one of the _480p_ presets for playback on an older SD television

4. Change settings as needed (most of the defaults are fine except as noted in bold)

   - _Dimensions_

     - _Auto Crop_ (enabled by default): the video will be automatically cropped to remove black bars on any side

   - _Filters_

     - **If your video is interlaced, make sure you select _Deinterlace_ > _Decomb_** (this may be set by default for some presets)

   - _Video_

     - Encoder: x264 (default) - this is the best default choice for most devices
       - Some older devices like Sony DVD players only support _MPEG-4_. Try that if x264 doesn't work.
       - _x265_ will give better video quality and smaller file sizes, but isn't supported by many devices yet; only use it if you know your device supports it
     - Framerate: 30 (default)
     - Container: mp4 (default)
     - Quality RF: (default is normally fine) - a higher number gives lower quality (on a logarithmic scale)
     - Profile: (default is normally fine)
       - Set to _baseline_ for older devices with weaker CPUs, but this will greatly increase the size of the video
     - Size: Using x264 and RF: 20 will average about 925 MB per hour of video (this can vary greatly; this is only an average)

   - _Audio_

     - **For some reason, Handbrake will often do an unnecessary audio reencode by default.** If the source audio (to the left of the arrow) doesn't have more channels than you need, and the destination audio (to the right of the arrow) doesn't say _Passthrough_, remove the default audio track(s), click _Add_ to add a new track, and for _Encoder_ choose the appropriate _Passthru_ option
     - If your device doesn't support the source codec or if you want to reencode the audio, the AAC (default) codec is fine for most purposes
       - If you play the video and the audio doesn't work, try reencoding it with a different codec

   - _Subtitles_

     - **For many presets, Handbrake will only add subtitles if the audio tracks are in a foreign language**
     - To keep any of the source subtitle tracks, click _Add_ > _Embedded Subtitle List_ and choose the desired source tracks, or click _Add All_ to keep them all
     - If your subtitles are in a different file you can choose _Import SRT_ or _Import SSA_ to import them into the destination file (recommended)

5. When you're ready to start encoding, click _Start_

6. To add more videos while the first one is encoding, simply repeat the above steps, but instead of clicking _Start_, click _Enqueue_. You can view the queue at any time by clicking _Queue_.

7. If you didn't change the default location, the newly encoded videos will be placed in your Videos folder

#### Ripping DVDs

1.  Install library for reading encrypted DVDs (libdvdcss)

    - Ubuntu

      ```
      sudo apt -y install libdvdread4
      sudo /usr/share/doc/libdvdread4/install-css.sh
      ```

      (Reboot may be necessary)

    - Mac

      1. Install Homebrew

         - Go here and follow installation instructions: [http://brew.sh/](http://brew.sh/)

         - If you see a window prompt to install Xcode, choose not to install it (all necessary dependencies will be installed by the script)

      2. Install libdvdcss

         ```
         brew install libdvdcss
         ```

      3. Close and reopen Handbrake

2.  Insert the DVD

3.  Open Handbrake

4.  Select the source drive (e.g. /dev/scd0)

5.  Follow the instructions above to configure Handbrake and start the encoding

#### Re-encode a video, burning the subtitles in

1. Open Handbrake, click _Source_, and browse to the MKV video you just created

2. Choose a desired preset in the list on the right. _Normal_ is usually sufficient

3. In the _Video_ tab, change the _RF_ slider to adjust the quality as desired (a lower number means higher quality). The default (20) is normally fine.

4. In the _Subtitles_ tab, select the _SSA_ subtitle from the _Track_ dropdown, then click the _+Subtitle_ button

5. The subtitle should appear in the Track list. Fill in the circle in the _Burned In_ column by clicking it to make sure the subtitles will be burned in.

6. When you're ready to start encoding, click _Start_.

7. When encoding is finished, the resulting video file will be in the Videos subfolder in your Home folder.

8. By default, Handbrake will use an .m4v extension. Some applications require an .m4v extension to enable certain features (chapters, AC3 audio, SRT subtitles), while other applications require an .mp4 extension to properly handle the video. Change the extension as necessary.
