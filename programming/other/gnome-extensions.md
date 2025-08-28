---
title: Gnome extension development
---

## Documentation

#### Official documentation

[GNOME Shell Extensions](https://gjs.guide/extensions/)

#### Overview

[Anatomy of an Extension](https://gjs.guide/extensions/overview/anatomy.html#extension-zip)

#### Preferences and schema

[Preferences](https://gjs.guide/extensions/development/preferences.html#preferences-window)

## Development process

([https://gjs.guide/extensions/development/debugging.html](https://gjs.guide/extensions/development/debugging.html))

#### Setup

1. Modify the extension's version number

   ⚠️ If you don't do this first and you create a symlink (the next step), Gnome may automatically update the plugin, which will overwrite the entire directory. Here's a workaround to prevent it:

   1. Open `metadata.json`

   1. Change `version` to something big (e.g. `1000`)

1. Symlink directory of extension to the Gnome Shell extensions directory, e.g.

   ```
   cd spotify-ad-blocker
   ln -s $(pwd) ~/.local/share/gnome-shell/extensions/spotify-ad-block@danigm.net
   ```

#### Running and debugging in Wayland

⚠️ Unfortunately this method uses a separate DBUS session and many apps will not work inside the nested Gnome Shell, so you may need to use X server for developing some extensions if you want changes to the extension to refresh without having to log out of Gnome

1. Run a nested instance of Gnome Shell

   ```
   dbus-run-session -- gnome-shell --nested --wayland
   ```

   ⓘ The Gnome logs will appear in this terminal, so you may find it useful to grep for the specific logs you want:

   ```
   dbus-run-session -- gnome-shell --nested --wayland 2>&1 | grep spotify-ad-blocker
   ```

   👉 When the shell first opens, it may open to the activities overview, capturing the mouse. If this happens, press Esc

1. Open a terminal inside the nested Gnome Shell and enable the extension, e.g.

   ```
   gnome-extensions enable spotify-ad-block@danigm.net
   ```

1. If you make changes to the extension, simply close the nested Gnome shell and repeat the above instructions to get the latest changes

#### Running and debugging in X server

1. Enable the extension, e.g.

   ```
   gnome-extensions enable spotify-ad-block@danigm.net
   ```

1. Use `journalctl` to see messages

   ```
   journalctl /usr/bin/gnome-shell -f
   ```

1. If you make changes to the extension, restart Gnome Shell to pick up the changes

   1. Press Alt+F2

   1. Type `r` and press Enter

## API documentation

#### `imports.gi.*`

See [https://gjs-docs.gnome.org/](https://gjs-docs.gnome.org/)

Alternatives:

- [https://www.roojs.com/seed/gir-1.2-gtk-3.0/gjs/index.html](https://www.roojs.com/seed/gir-1.2-gtk-3.0/gjs/index.html)
- [https://www.roojs.org/seed/gir-1.2-gtk-3.0/seed/index.html](https://www.roojs.org/seed/gir-1.2-gtk-3.0/seed/index.html)

#### `imports.misc.*`, `imports.ui.*`

See [https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/main/js](https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/main/js)

- e.g. `imports.ui.status.volume`: [https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/volume.js](https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/volume.js)
