---
title: Wine
---

#### Install Wine

[https://wiki.winehq.org/Download](https://wiki.winehq.org/Download)

#### Create a separate Wine environment (wineprefix)

- This is useful for installing an application temporarily; when you're done, just delete the wineprefix folder
- This is also useful for installing an application that requires DLL overrides or other customizations that might break other installed applications

```
mkdir -p ~/.local/share/wineprefixes
WINEPREFIX=~/.local/share/wineprefixes/irm wineboot
```

To make it 32-bit, add `WINEARCH=win32`:

```
WINEARCH=win32 WINEPREFIX=~/.local/share/wineprefixes/irm wineboot
```

#### Change Wine settings (Windows version, etc)

Use the winecfg command:

```
WINEPREFIX=~/.local/share/wineprefixes/irm winecfg
```

#### Install an application to a specific wineprefix

Prepend the WINEPREFIX environment variable:

```
WINEPREFIX=~/.local/share/wineprefixes/irm wine IRMServer.exe
```

#### Uninstall an application

```
WINEPREFIX=~/.local/share/wineprefixes/irm wine uninstaller
```
