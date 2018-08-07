---
title: Ubuntu/Debian package management
---

#### Remove a package and all of its dependencies
```
sudo apt autoremove PACKAGENAME
```


#### Download a package without installing it
```
sudo apt --download-only install PACKAGENAME
```

The package will be stored under /var/cache/apt/archives


#### Search for which package provides a specific file
```
sudo apt -y install apt-file
sudo apt-file update
apt-file search FILENAME
```


#### List the files a given package provides
```
sudo apt -y install apt-file
sudo apt-file update
apt-file list PACKAGENAME
```

Or for a downloaded package:
```
dpkg -c PACKAGE.deb
```


#### Upgrade a single package
```
sudo apt install PACKAGENAME
```


#### Reinstall a package
```
sudo apt install --reinstall PACKAGENAME
```


#### Install available updates
```
sudo apt update
sudo apt dist-upgrade
```


#### Install a specific program
```
sudo apt install PACKAGENAME
```


#### Search for a specific installable program
```
apt search PACKAGENAME
```


#### Remove a specific program
```
sudo apt remove PACKAGENAME
```

Or:
```
dpkg -r PACKAGENAME
```


#### Install a downloaded package
```
sudo dpkg –i PACKAGE.deb
```


#### To list installed packages:
```
dpkg -l
```
