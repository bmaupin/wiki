---
title: Handbrake
---

#### Documentation
[https://handbrake.fr/docs/](https://handbrake.fr/docs/)


#### Install Handbrake

    sudo apt-add-repository -y ppa:stebbins/handbrake-releases
    sudo apt update
    sudo apt install handbrake-gtk


#### Re-encoding videos
1. Open Handbrake

2. *Source* > browse to video

3. Under *Presets List* on the right select *Regular* > *High Profile*
    - If the device you'll be playing the video back on is older, you may need to select the Normal profile here if you have problems with a video encoded with High Profile.

4. Change settings as needed (most of the defaults are fine except as noted in bold)
    - Picture
        - **If your video is interlaced, make sure you select *Decomb* > *Default***
            - This is the default for the *High Profile* preset, but not for the *Normal* preset.
        - Auto Crop (enabled by default): the video will be automatically cropped to remove black bars on any side

    - Video
        - Encoder: x264 (default) - produces the highest quality and lowest file sizes
        - Framerate: *Same as source*
        - Container: mp4 (default)
        - Quality RF: 20 (default) - a higher number gives lower quality (on a logarithmic scale)
        - Size: Using x264 and RF: 20 will average about 925M per hour of video (this can vary greatly; this is only an average)

    - Audio Defaults
        - Encoder: AAC (default) - produces the highest quality at a given bitrate
        - Mixdown: for watching on a system with only 2 speakers, Dolby Pro Logic II (the default) is fine

    - Audio List
        - **If any passthrough tracks are listed, delete the AAC reencoded track (the one that says AAC to the right of the arrow)**
            - This will keep the audio from being reencoded and will ensure higher quality. Reencoding the audio isn't always necessary.
            - If you play the video and the audio doesn't work, try reencoding it and keeping both tracks (AAC and passthrough)
        - **If no passthrough tracks are listed, delete the AC3 reencoded track (the one that says AC3 to the right of the arrow)**

    - Adding subtitles
        1. Select the *Subtitle List* tab
        2. Click *Add* to add a subtitle track
        3. Select the subtitle track you added
        4. From the dropdown box, select the subtitle language you want that track to be
        5. Repeat these steps for any other subtitles you want

5. When you're ready to start encoding, click *Start*

6. To add more videos while the first one is encoding, simply repeat the above steps, but instead of clicking *Start*, click *Enqueue*. You can view the queue at any time by clicking *Queue*.

7. If you didn't change the default location, the newly encoded videos will be placed in your Videos folder


#### Ripping DVDs
1. Install library for reading encrypted DVDs (libdvdcss)
    - Ubuntu

            sudo apt-get -y install libdvdread4
            sudo /usr/share/doc/libdvdread4/install-css.sh

        (Reboot may be necessary)

    - Mac
        1. Install Homebrew
            - Go here and follow installation instructions:
                [http://brew.sh/](http://brew.sh/)

            - If you see a window prompt to install Xcode, choose not to install it (all necessary dependencies will be installed by the script)

        2. Install libdvdcss

                brew install libdvdcss

        3. Close and reopen Handbrake

2. Insert the DVD

3. Open Handbrake

4. Select the source drive (e.g. /dev/scd0)

5. Follow the instructions above to configure Handbrake and start the encoding


#### Re-encode a video, burning the subtitles in
1. Open Handbrake, click *Source*, and browse to the MKV video you just created

2. Choose a desired preset in the list on the right. *Normal* is usually sufficient

3. In the *Video* tab, change the *RF* slider to adjust the quality as desired (a lower number means higher quality). The default (20) is normally fine.

4. In the *Subtitles* tab, select the *SSA* subtitle from the *Track* dropdown, then click the *+Subtitle* button

5. The subtitle should appear in the Track list. Fill in the circle in the *Burned In* column by clicking it to make sure the subtitles will be burned in.

6. When you're ready to start encoding, click *Start*.

7. When encoding is finished, the resulting video file will be in the Videos subfolder in your Home folder.

8. By default, Handbrake will use an .m4v extension. Some applications require an .m4v extension to enable certain features (chapters, AC3 audio, SRT subtitles), while other applications require an .mp4 extension to properly handle the video. Change the extension as necessary.
