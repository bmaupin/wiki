---
title: ScummVM
---

#### Getting CD audio working
1. Make sure your files are in the correct format
    1. See what audio formats your version of ScummVM supports

            $ scummvm -v
            Features compiled in: Vorbis MP3 ALSA SEQ sndio TiMidity RGB zLib MPEG2 Theora FreeType2 JPEG PNG

    2. Convert the files if necessary

2. Make sure the files are named correctly
    - track1.mp3, or track1.flac, or track1.wav, or track1.ogg


#### Getting Roland MT-32 emulation working
Highly recommended for much improved sound in the games that support it (e.g. Loom)
[http://wiki.scummvm.org/index.php/User_Manual/Appendix:_Music_and_sound#MT-32_emulation](http://wiki.scummvm.org/index.php/User_Manual/Appendix:_Music_and_sound#MT-32_emulation)
1. Download MT32_PCM.ROM and MT32_CONTROL.ROM

2. Copy them to the game's data directory
    1. Alternatively, you can place them in ScummVM's extra folder. This is defined in *Options* > *Paths* > *Extra Path*

3. Go to *Options* > *MT-32* > change *MT-32 Device* to *MT-32 Emulator*
