---
title: Xubuntu setup
---

Also see [Ubuntu setup](ubuntu-setup)

## Recommended tweaks

#### Remove the duplicate login screen entry

```
sudo mv /usr/share/xsessions/xfce.desktop /usr/share/xsessions/xfce.desktop.bak &> /dev/null
```

#### Remove unnecessary applications

```
sudo apt-get -y remove abiword gmusicbrowser gnumeric mousepad orage xchat xfce4-notes
```

#### Install recommended applications

```
sudo apt-get -y install brasero deja-dup gedit gnote libreoffice-calc libreoffice-impress libreoffice-writer rhythmbox shotwell
```

#### Disable visual effects (if you have an older computer, this will speed it up slightly)

```
xfconf-query -c xfwm4 -p /general/use_compositing -t bool -s false
```

## Optional tweaks

#### If your computer doesn’t have bluetooth:

1. Xfce menu > _All Settings_ > _System_ > _Session and Startup_
1. Select the _Application Autostart_ tab
1. Uncheck _Blueman_ Applet

#### If your computer isn’t a laptop:

1. Xfce menu > _All Settings_ > _System_ > _Session and Startup_
1. Select the _Application Autostart_ tab
1. Uncheck _Power Manager_

#### If you want to hide the default desktop icons

1. Xfce menu > _All Settings_ > _Personal_ > _Desktop_ > _Icons_
1. Under _Default Icons_, uncheck any icons you wish to hide

#### Add system load monitor panel applet

1. Install the applet

   ```
   sudo apt-get -y install indicator-multiload
   ```

1. Xfce menu > _System Load Indicator_

1. Click the load indicator in the panel > _Preferences_

1. Make sure _Autostart_ is checked

1. Check any of the resources you want in _Monitored Resources_ (recommended: Processor, Memory)

## Other

#### After upgrading from Xubuntu 14.04 to 16.04

- If the menu is missing items

  1. Right-click the menu > _Remove_ > _Remove_

  1. Right-click an empty spot in the top panel > _Panel_ > _Panel Preferences_ > _Items_ > _+_ > _Whisker Menu_ > _Add_ > _Close_

  1. Under _Items_ select _Whisker Menu_ > click ↑ until it's at the top > _Close_

#### Start with a clean configuration (without losing any of your files or programs)

1. `mv ~/.config/xfce4 ~/.config/xfce4.bak`

1. Reboot

1. Log into _Xubuntu Session_ (not _Xfce Session_, if that's an option)
