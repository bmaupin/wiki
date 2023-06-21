---
title: Gnome extension development
---

## Development documentation

#### Official documentation

[GNOME Shell Extensions](https://gjs.guide/extensions/)

#### Development process

1. Symlink directory of extension to the Gnome Shell extensions directory, e.g.

   ```
   cd spotify-ad-blocker
   ln -s $(pwd) ~/.local/share/gnome-shell/extensions/spotify-ad-block@danigm.net
   ```

1. Next, Gnome needs to load the extension

   ([https://gjs.guide/extensions/development/creating.html#enabling-the-extension](https://gjs.guide/extensions/development/creating.html#enabling-the-extension))

   The extension can't be loaded or updated at runtime, so you have two choices:

   - If you're using Wayland, run a nested instance of Gnome Shell

   ```
   dbus-run-session -- gnome-shell --nested --wayland
   ```

   - If you're using X server, restart Gnome Shell

   ```
   killall -3 gnome-shell
   ```

1. Enable the extension, e.g.

   ```
   gnome-extensions enable spotify-ad-block@danigm.net
   ```

1. After making changes to the extension, repeat the steps above (under _Gnome needs to load the extension_) so Gnome will reload the extension with the new changes

#### Debugging

([https://gjs.guide/extensions/development/debugging.html](https://gjs.guide/extensions/development/debugging.html))

- Use `console.log` to log messages
- To see messages

  ```
  journalctl /usr/bin/gnome-shell -f
  ```

#### Overview

[Anatomy of an Extension](https://gjs.guide/extensions/overview/anatomy.html#extension-zip)

#### Preferences and schema

[Preferences](https://gjs.guide/extensions/development/preferences.html#preferences-window)

## API documentation

#### `imports.gi.*`

See [https://gjs-docs.gnome.org/](https://gjs-docs.gnome.org/)

Alternatives:

- [https://www.roojs.com/seed/gir-1.2-gtk-3.0/gjs/index.html](https://www.roojs.com/seed/gir-1.2-gtk-3.0/gjs/index.html)
- [https://www.roojs.org/seed/gir-1.2-gtk-3.0/seed/index.html](https://www.roojs.org/seed/gir-1.2-gtk-3.0/seed/index.html)

#### `imports.misc.*`, `imports.ui.*`

See [https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/main/js](https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/main/js)

- e.g. `imports.ui.status.volume`: [https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/volume.js](https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/status/volume.js)
