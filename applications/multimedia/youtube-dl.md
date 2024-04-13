---
title: youtube-dl
---

#### Install youtube-dl

1. Download the latest _youtube-dl_ file from here: [https://github.com/ytdl-org/ytdl-nightly/releases](https://github.com/ytdl-org/ytdl-nightly/releases)

1. Move it to `~/bin` and make it executable

   ```
   mv youtube-dl ~/bin
   chmod +x ~/bin/youtube-dl
   ```

#### List available formats

```
youtube-dl -F URL
```

#### Download video

If there's a format that includes audio and video, you can just use that format code, e.g.

```
youtube-dl -f 22 https://example.com/video
```

Otherwise, you can give the video and audio format codes and youtube-dl will combine them, e.g.

```
youtube-dl -f 135+140 https://example.com/video
```

#### Save a download archive file

This is useful when downloading many videos to make sure you don't accidentally download the same one multiple times:

```
youtube-dl --download-archive archive.txt ...
```

TODO: Is this still needed? youtube-dl seems to be smart enough to tell if a video's already been downloaded

#### Auto selecting video stream and changing output filename

```
youtube-dl -f 'worstvideo[height=540]+AACHEv1-2_0-English' -o '%(series)s - S%(season_number)02dE%(episode_number)02d - %(title)s.%(ext)s' --download-archive archive.txt URL
```

#### Download playlist

Just use the URL of the playlist and youtube-dl will download it:

```
youtube-dl --playlist-start 4 -i -f 'worstvideo[height=540]+AACHEv1-2_0-English' -o '%(series)s - S%(season_number)02dE%(episode_number)02d - %(title)s.%(ext)s' --download-archive archive.txt URL
```

- (Recommended) `-i`: "Continue on download errors, for example to skip unavailable videos in a playlist"

#### Download multiple files without a playlist

1. Get the URLs for all the files you want to download and put them in a text file

1. Figure out the format you want using the steps above with one of the video URLs

1. Download all the videos by looping through the text file, e.g.

   ```
   starting_episode=1; episode=$starting_episode; for url in $(cat playlist.txt); do youtube-dl -f 'worstvideo[height=540]+audio-English' -o "S01E0${episode}.mp4" "$url"; episode=$((episode+1)); done
   ```

   - Replace `starting_episode`, `playlist.txt`, `worstvideo[height=540]+audio-English`, and `S01E0${episode}.mp4` as appropriate
