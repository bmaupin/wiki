---
title: Audio encoding/reencoding settings
---

#### Reencode mp3 using lame
- CD quality
    - Use the -V 2 flag:
        ```
        | lame -V 2 - outfile.mp3
        ```

    - Version 3.97 and older:
        ```
        --vbr-new -V 2
        ```


#### Converting wma files to mp3
1.
```
sudo vim /usr/local/bin/wma2mp3
```

2.
```bash
#!/bin/bash
find . -type f -iname '*.wma' -execdir ffmpeg -i {} -aq 2 -map_meta_data 0:0 {}.mp3 \;
```

3.
```
chmod +x /usr/local/bin/wma2mp3
```


#### Converting m4a files to mp3
[https://github.com/bmaupin/converttomp3/blob/master/ConvertToMP3.py](https://github.com/bmaupin/converttomp3/blob/master/ConvertToMP3.py)
