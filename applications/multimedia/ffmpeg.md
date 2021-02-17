---
title: Ffmpeg (convert audio and video in Linux)
---

**Important:** always use `-map 0` when using any copy options to make sure all streams are selected. Otherwise, only the first stream of each type will be copied, e.g.

    ffmpeg -i input.mkv -map 0 -c copy output.mkv
    ffmpeg -i input.mkv -map 0 -c:a copy output.mp3

## Misc

#### Remove a particular stream

1.  Use ffprobe to find the index of the stream you want to remove

        $ ffprobe input.mkv
        ...
            Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709), 1280x688, 1554 kb/s, 23.98 fps, 23.98 tbr, 90k tbn, 180k tbc (default)
            Stream #0:1(eng): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 111 kb/s (default)
            Stream #0:2(eng): Audio: ac3 (ac-3 / 0x332D6361), 48000 Hz, 5.1(side), fltp, 224 kb/s
            Stream #0:3(fra): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 111 kb/s
            Stream #0:4(eng): Subtitle: mov_text (tx3g / 0x67337874), 1280x60, 0 kb/s (default)
            Stream #0:5(fra): Subtitle: mov_text (tx3g / 0x67337874), 1280x60, 0 kb/s

1.  Remove all audio streams except for the French one (note: you must map the video and subtitle streams too or they'll be excluded)

        ffmpeg -i input.mp4 -map 0:v -c:v copy -map 0:3 -c:a copy -map 0:s -c:s copy output.mp4

## Video

#### Recommended:

First, try Handbrake. If for some reason that doesn’t work, use ffmpeg. Scenarios where you might need to use ffmpeg over Handbrake:

- Handbrake doesn't have video passthrough and only limited audio passthrough
- Handbrake can only import SRT subtitles

#### Avconv vs ffmpeg:

Short answer, ffmpeg is better because it also implements changes from avconv. Use it instead: [http://stackoverflow.com/a/9477756/399105](http://stackoverflow.com/a/9477756/399105)

#### Install ffmpeg (and ffprobe):

1. Go here and download the static build for the latest release for your architecture:
   [http://johnvansickle.com/ffmpeg/](http://johnvansickle.com/ffmpeg/)

1. Untar it and copy the files to /usr/local/bin

#### Install additional codecs for encoding (libx264, libmp3lame):

    sudo apt-get install ubuntu-restricted-extras

#### To just get the details for a particular video:

    ffprobe video.mp4

#### Optimal encoding:

(h264 video and AAC audio, adjust video quality as needed, -strict experimental required for AAC audio)

    ffmpeg -i video.wmv -map 0 -c:v libx264 -strict experimental -c:a aac -b:a 160k video.mp4

#### Batch encoding:

    for file in *; do ffmpeg -i "$file" -map 0 -c:v libx264 -strict experimental -c:a aac -b:a 160k "${file/wmv/mp4}"; done

#### To copy/passthrough a stream (audio or video) without reencoding it:

Use `-c copy`:

    ffmpeg -i video.wmv -map 0:3 -c:v libx264 -map 0:a -c:a copy video.mp4

#### Basic encoding using default formats (mpeg4 video and ac3 audio). (Not recommended except for compatibility):

    ffmpeg -i video.wmv -b:a 160k video.avi

#### Mapping streams (if the input contains more than one stream or when using multiple inputs):

    ffmpeg -i video.wmv -map 0:3 -c:v libx264 -map 0:a -strict experimental -c:a aac -b:a 160k video.mp4

#### Disable a stream (mostly for testing)

Use `-vn`/`-an`/`-sn` (to disable the video/audio/subtitle stream). Ex:

    ffmpeg -i video.avi -map 0 -vn -c:a copy video.mkv

#### If you get these errors when trying to copy a video stream:

    ffmpeg -i video.avi -i video.ass -c:v copy -c:a copy -c:s copy video.mkv
    [mpeg4 @ 0xb7a9a0] Invalid and inefficient vfw-avi packed B frames detected
    [matroska @ 0x7b54e0] Can't write packet with unknown timestamp
    av_interleaved_write_frame(): Invalid argument

Try reencoding just the video:

    ffmpeg -i video.avi -i video.ass -c:v libx264 -c:a copy -c:s copy video.mkv

#### If you get this error when processing SRT subtitle files:

    Invalid data found when processing input

Make sure the first subtitle entry begins with 1, and not 0

To fix using [fix-srt-subtitle.py](https://github.com/bmaupin/junkpile/blob/master/python/video-tools/fix-srt-subtitle.py):

    python ~/Desktop/fix-srt-subtitle.py video.srt video-fixed.srt

#### Cut video (recommended to reencode at the same time to properly handle i-frames):

    ffmpeg -i video.avi -ss 00:00:00 -t 1:04:17.680 -map 0 -c:v libx264 -c:a copy french1.mp4

`-ss` is starting time, `-t` is duration

#### Join video

[https://trac.ffmpeg.org/wiki/How%20to%20concatenate%20(join,%20merge)%20media%20files](<https://trac.ffmpeg.org/wiki/How%20to%20concatenate%20(join,%20merge)%20media%20files>)

1.  Make a file containing all the files to join, ex parts.txt containing:

        file video1.mkv
        file video2.mkv

1.  Join the files using the concat demuxer

        ffmpeg -f concat -i parts.txt -map 0 -c copy video.mkv

#### Extract one frame from a video as an image

    ffmpeg -ss 00:00:51 -i video.mp4 -frames:v 1 image.jpg

#### Extract audio from a video

    ffmpeg -i video.mkv -vn -sn -c:a copy video.mp3

## Audio

#### Convert an mp3 file to a wav file

    ffmpeg -i file.mp3 file.wav

#### Copy the metadata from one file and the audio from another into a third file

    ffmpeg -i file1.mp3 -i file2.mp3 -map_metadata 0 -map 1:a -c:a copy file3.mp3

Include the video track from the first file (an album cover image):

    ffmpeg -i file1.mp3 -i file2.mp3 -map_metadata 0 -map 1:a -c:a copy -map 0:v -c:v copy file3.mp3

#### Get the first 30 seconds of an audio file

[http://stackoverflow.com/a/7945753/399105](http://stackoverflow.com/a/7945753/399105)

    ffmpeg -i input.mp3 -c:a copy -ss 0 -t 30 output.mp3

#### Change/set the default audio stream

1.  List the streams

        ffpmeg -i input.mkv

1.  Set the default audio stream. For example, to set the third audio stream as default and remove default from the first audio stream (stream numbering starts at 0):

        ffmpeg -i input.mkv -map 0 -c copy -disposition:a:0 none -disposition:a:2 default output.mkv

#### Convert to VBR MP3

[https://trac.ffmpeg.org/wiki/Encode/MP3#VBREncoding](https://trac.ffmpeg.org/wiki/Encode/MP3#VBREncoding)

    ffmpeg -i input.wav -codec:a libmp3lame -qscale:a 2 output.mp3

## Subtitles

#### Extract subtitles from a video

    ffmpeg -i video.mkv -vn -an -c:s subrip video.srt

#### Get subtitles for a video

1. Open the video with VLC

1. _View_ > _Download Subtitles_ > _Search by hash_

1. If any subtitles are found, they'll be listed in the bottom of the window. Select one of the found subtitles > _Download selection_

1. Edit the downloaded SRT file and remove the first and last subtitles

#### Remove all subtitles from a video

Use `-sn`:

    ffmpeg -i input.mkv -c:v copy -c:a copy -sn output.mkv

#### Add (embed) subtitles to a video that has no subtitles

    ffmpeg -i input.mkv -i input.srt -c:v copy -c:a copy -c:s copy -metadata:s:s:0 language=eng output.mkv

#### Add (embed) multiple subtitles to a video that has no subtitles

    ffmpeg -i input.mkv -i input-fra.srt -i input-eng.srt -map 0:v -c:v copy -map 0:a -c:a copy -map 1:0 -map 2:0 -c:s copy -metadata:s:s:0 language=fra -metadata:s:s:1 language=eng -disposition:s:0 default -disposition:s:1 none output.mkv

#### Drop certain subtitles for a video with multiple subtitles

1.  Use ffprobe to list the subtitle streams in the video

        $ ffprobe input.mkv
        ...
            Stream #0:0: Video: h264 (High), yuv420p, 1280x544 [SAR 1:1 DAR 40:17], 24 fps, 24 tbr, 1k tbn, 48 tbc (default)
            Stream #0:1(fre): Audio: aac, 48000 Hz, 5.1, fltp (default)
            Stream #0:2(eng): Subtitle: subrip (default)
            Stream #0:3(swe): Subtitle: subrip

1.  Copy the video and audio streams as well as the selected subtitle stream

        ffmpeg -i input.mkv -map 0:v -c:v copy -map 0:a -c:a copy -map 0:2 -c:s copy output.mkv

#### Add a new subtitle to a file with embedded subtitles

    ffmpeg -i input.mkv -i input.srt -map 0:v -c:v copy -map 0:a -c:a copy -map 0:2 -map 1:0 -c:s copy -metadata:s:s:0 language=eng -metadata:s:s:1 language=fra -disposition:s:0 none -disposition:s:1 default output.mkv

#### Burning in subtitles

(Not recommended: they will be hard-coded into the video and can't be turned off or removed)

1. First, embed the subtitles into a MKV file (see previous section)

1. Then, re-encode the video using Handbrake, burning the subtitles in
   - See: [Handbrake](handbrake.html)
