---
title: Ubuntu setup
---

## 14.04+

#### Remove Amazon icon

```
sudo chmod 000 /usr/share/applications/ubuntu-amazon-default.desktop
```

#### Disable online search results

```
gsettings set com.canonical.Unity.Lenses remote-content-search 'none'
```

#### Change Deja Dup (Backup) full backup period

```
gsettings set org.gnome.DejaDup full-backup-period 180
gsettings get org.gnome.DejaDup full-backup-period
```

## General

#### Set up firewall

```
sudo ufw default deny
```

(defaults to blocking all incoming connections)

```
sudo ufw enable
```

(enables firewall)

```
sudo ufw status
```

#### Install vim

```
sudo apt-get install vim
echo "set expandtab
set tabstop=4
set shiftwidth=4" >> ~/.vimrc
```

(inserts spaces when tab is pressed, inserts 4 spaces, use 4 spaces for indentation)

#### ~~Disable unnecessary startup services~~

~~`sudo mv /etc/rc2.d/S25bluetooth /etc/rc2.d/K25bluetooth`~~

#### Disable update-apt-xapian-index

(used for synaptic quick search function: [http://reformedmusings.wordpress.com/2009/06/05/fixing-update-apt-xapian-in-ubuntu-9-04-jaunty/](http://reformedmusings.wordpress.com/2009/06/05/fixing-update-apt-xapian-in-ubuntu-9-04-jaunty/))

```
sudo chmod 644 /etc/cron.weekly/apt-xapian-index
```

#### Configure grub

```
sudo sed -i.bak 's/^#GRUB_DISABLE_RECOVERY="true"$/GRUB_DISABLE_RECOVERY="true"/' /etc/default/grub
sudo chmod -x /etc/grub.d/20_memtest86+
sudo update-grub
```

#### ~~(Optional) Install java jdk and Java browser plugin~~

~~`sudo apt-get install -y openjdk-6-jdk openjdk-7-jdk icedtea-7-plugin`~~

#### (Optional) Verify java install

```
java -version
```

#### (Optional) Install Eclipse

[Eclipse setup](https://sites.google.com/site/bmaupinwiki/home/programming/tools/eclipse-setup)

#### (Optional) Install Google Chrome

Download ubuntu/debian package from [http://www.google.com/chrome](http://www.google.com/chrome)

This will automatically install the chrome repository for automatic updates

## 12.04+

#### Install updated graphics drivers

[https://wiki.ubuntu.com/Valve](https://wiki.ubuntu.com/Valve)

#### Enable the system tray

```
gsettings set com.canonical.Unity.Panel systray-whitelist "['all']"
```

## 11.04+

#### Install broadcom 43 wireless drivers

[https://help.ubuntu.com/community/WifiDocs/Driver/bcm43xx](https://help.ubuntu.com/community/WifiDocs/Driver/bcm43xx)

- Depends on chipset. Probably either:

  ```
  sudo apt-get install bcmwl-kernel-source
  ```

  Or:

  ```
  sudo apt-get install b43-fwcutter firmware-b43-installer
  ```

Also see:

- [http://askubuntu.com/a/60395/18665](http://askubuntu.com/a/60395/18665)
- [https://help.ubuntu.com/community/BroadcomSTA%28Wireless%29](https://help.ubuntu.com/community/BroadcomSTA%28Wireless%29)

## 10.10+

#### Install aptitude

```
sudo apt-get install aptitude
```

## 10.04+

#### Change window button locations

1. Alt + F2
1. gconf-editor
1. Apps > Metacity > General
1. Change `button_layout` from `close,minimize,maximize:` to `:minimize,maximize,close`

#### Remove the messages indicator applet

```
sudo apt-get remove indicator-messages
```

#### Remove the user indicator applet

```
sudo apt-get remove indicator-me
```

#### Disable unnecessary startup programs

1. _System_ > _Preferences_ > _Startup Applications_
1. Disable: bluetooth manager, evolution alarm notifier, gnome login sound, personal file sharing, power manager (if not a laptop), remote desktop, user folders update, visual assistance
