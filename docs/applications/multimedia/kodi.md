---
title: Kodi
---

## Misc

#### Videos don't stretch to fill the screen on the Nexus Player
*Settings* > *Video* > *Acceleration* > turn off *MediaCodec (Surface)*



## TV shows

#### Updating content for a show
This can fix a variety of problems, such as duplicate episodes:
1. Right-click the show > *TV show information* > *Refresh*
    - If prompted to ignore local information, select *No*


#### Missing shows/episodes
- If a show is missing, it may be because the episodes themselves need to be fixed
    - The most important part is making sure the filenames include the season and episode number, e.g. S01E05
        - For more information, see: [http://kodi.wiki/view/Naming_video_files/TV_shows](http://kodi.wiki/view/Naming_video_files/TV_shows)

- If a show isn’t listed on thetvdb.com, the minimal configuration is:
    - tvshow.nfo ([http://kodi.wiki/view/NFO_files/TV_shows](http://kodi.wiki/view/NFO_files/TV_shows))
        ```xml
        <?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
        <tvshow>
            <title>Tout le monde en parlait</title>
        </tvshow>
        ```
    - An .nfo file per episode named exactly as the episode ([http://kodi.wiki/view/NFO_files/TV_episodes](http://kodi.wiki/view/NFO_files/TV_episodes))
        ```xml
        <?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
        <episodedetails>
            <title>La saga des Nordiques (1 de 2)</title>
            <season>10</season>
            <episode>4</episode>
        </episodedetails>
        ```


#### Missing artwork
[http://kodi.wiki/view/Artwork](http://kodi.wiki/view/Artwork)
1. Download artwork for the TV show and save it as poster.jpg/png in the TV show folder

1. To update the artwork, follow the steps above for *Updating content for a show*


## Movies

#### Title is for a different movie
1. Right-click > *Movie information* > *Refresh*
    1. If the correct title is listed, select it

    1. Otherwise, select *Manual*, type in the proper title, and see if it’s listed in the search results


#### Title is in the wrong language
The default language for movies is English. If you would like the movies to be in a different language:
1. Go to *Videos* > *Files* > right-click the source for the movies > *Change content* > *Settings*
    - If you want to use the original language for all of your movies, enable *Keep Original Title* > *OK* > *OK*

    - If instead you would like all of your movies to be in the same language, go to *Preferred Language* and select the desired language > *OK* > *OK*

1. This setting will only apply to newly added movies. To fix movies already in your library:
    1. Go to *Movies* > right-click the movie with the title you'd like to update > *Movie information* > *Refresh* > select the title
