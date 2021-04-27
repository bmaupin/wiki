---
title: Xfce
---

## Xfconf

#### Find a specific item in xfconf

    for channel in `xfconf-query | grep -v "Channels"`; do echo $channel; xfconf-query -lv -c $channel | grep -i FILTER; done

(Replace FILTER with a filter keyword for the item you're looking for)


#### Show the value of an item in xfconf

    xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/power-button-action


#### Show the value of all items in a channel

    xfconf-query -c xfce4-power-manager -l -v


#### Reset an item in xfconf to the default value

    xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/power-button-action -r


#### Recursively reset items

    xfconf-query -c xfce4-power-manager -p / -rR

Or:

    xfconf-query -c xfce4-power-manager -p /xfce4-power-manager -rR


#### Set the value of a property that already exists

    xfconf-query -c xfce4-keyboard-shortcuts -p /commands/custom/XF86AudioPlay -s "dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.PlayPause"


#### Set the value of a property and create it if it doesn't exist

    xfconf-query -c xfce4-keyboard-shortcuts -p /commands/custom/XF86AudioPlay -s "dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.PlayPause" -n -t string