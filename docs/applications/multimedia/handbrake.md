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

3. Set _Preset_ as needed

   ⓘ See below for more details

   - Pick _General_ > _Very Fast 720p30_ for something you'll watch only once
   - Otherwise, pick _General_ > _Fast 1080p30_

4. Set other settings; most of the defaults are fine, except:

   ⓘ See below for more details

   1. Go to _Audio_ and check the source audio (to the left of the arrow)
      - If the source is 2.0 channels **and** less than 160 kbps, **or** if you want highest audio quality, remove the default audio track(s), click _Add_ to add a new track, and for _Encoder_ choose the appropriate _Passthru_ option
   1. To keep subtitles, go to _Subtitles_, click _Add_ > _Embedded Subtitle List_ and choose the desired source tracks, or click _Add All_ to keep them all

5. When you're ready to start encoding, click _Start_

6. To add more videos while the first one is encoding, simply repeat the above steps, but instead of clicking _Start_, click _Enqueue_. You can view the queue at any time by clicking _Queue_.

7. If you didn't change the default location, the newly encoded videos will be placed in your Videos folder

#### More details (most of the defaults are fine except as noted in bold)

👉 Smaller file sizes typically load quicker on streaming devices

- _Presets_

  - _Very Fast_ will give a much smaller file size and slightly reduced quality as compared to _Fast_
  - _Fast_ presets are good balance between file size and quality

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

  **⚠️ Handbrake does an audio re-encode by default**

  - If you care about file size and the source audio is more than 2.0 channels or more than 160 kbps, leave the default settings
    - This will re-encode the audio to 2 channels at 160 kbps
  - If you care about audio quality or the source audio is 2.0 channels and 160 kbps or lower, remove the default audio track(s), click _Add_ to add a new track, and for _Encoder_ choose the appropriate _Passthru_ option
    - This will pass through the source audio without re-encoding it
  - The AAC (default) codec is fine for most purposes
    - If you play the video and the audio doesn't work, try reencoding it with a different codec

- _Subtitles_

  - **For many presets, Handbrake will only add subtitles if the audio tracks are in a foreign language**
  - To keep any of the source subtitle tracks, click _Add_ > _Embedded Subtitle List_ and choose the desired source tracks, or click _Add All_ to keep them all
  - If your subtitles are in a different file you can choose _Import SRT_ or _Import SSA_ to import them into the destination file (recommended)
  - To burn in subtitles:

    1. In the _Subtitles_ tab, select the _SSA_ subtitle from the _Track_ dropdown, then click the _+Subtitle_ button

    1. The subtitle should appear in the Track list. Fill in the circle in the _Burned In_ column by clicking it to make sure the subtitles will be burned in.

    1. By default, Handbrake will use an .m4v extension. Some applications require an .m4v extension to enable certain features (chapters, AC3 audio, SRT subtitles), while other applications require an .mp4 extension to properly handle the video. Change the extension as necessary.

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
