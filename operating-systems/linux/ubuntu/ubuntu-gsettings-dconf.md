---
title: Ubuntu gsettings (dconf)
---

#### Install dconf Editor (GUI for managing dconf settings)

```
sudo apt-get install dconf-editor
```

#### See a particular setting

```
gsettings get com.canonical.Unity.Lenses remote-content-search
gsettings get org.gnome.DejaDup full-backup-period
```

#### Change a particular setting

```
gsettings set com.canonical.Unity.Lenses remote-content-search 'none'
gsettings set org.gnome.DejaDup full-backup-period 180
```

#### Search for a particular schema

```
gsettings list-schemas  | egrep -i "deja|duplicity"
```

#### Search for a particular key (setting)

```
gsettings list-recursively | grep -i deja | sort -V
```

#### Recursively list all keys (settings) and values for a particular schema

```
gsettings list-recursively org.gnome.DejaDup | sort -V
```

#### List just the keys (settings) for a particular schema

```
gsettings list-keys org.gnome.DejaDup
```

#### List the children for a particular schema

```
gsettings list-children org.gnome.DejaDup
```

#### Get dconf settings from backed up dconf file

```
XDG_CONFIG_HOME=/path/to/home/.config dconf dump /
```

For this task, dconf is better than gsettings because gsettings will use the schema for the current version of Ubuntu, so some of the settings won't be accurate if they're being read from a different Ubuntu installation
