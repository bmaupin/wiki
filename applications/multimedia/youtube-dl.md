---
title: youtube-dl
---

#### Install youtube-dl
(Recommended) Follow the instructions here: [http://rg3.github.io/youtube-dl/download.html](http://rg3.github.io/youtube-dl/download.html)


#### List available formats
```
youtube-dl -F URL
```


#### Download video
```
youtube-dl -f 1914+AACHEv1-2_0-English URL
```


#### Auto selecting video stream and changing output filename
```
youtube-dl -f 'worstvideo[height=540]+AACHEv1-2_0-English' -o '%(series)s - S%(season_number)02dE%(episode_number)02d - %(title)s.%(ext)s' --download-archive archive.txt URL
```


#### Download playlist
```
youtube-dl --playlist-start 4 -f 'worstvideo[height=540]+AACHEv1-2_0-English' -o '%(series)s - S%(season_number)02dE%(episode_number)02d - %(title)s.%(ext)s' --download-archive archive.txt URL
```
