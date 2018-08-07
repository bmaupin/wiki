---
title: Ubuntu/Debian package management
---

#### To remove a package and all of its dependencies:
```
sudo apt-get autoremove PACKAGENAME
```


#### To download a package without installing it:
```
sudo apt-get --download-only install PACKAGENAME
```

The package will be stored under /var/cache/apt/archives


#### To search for which package provides a specific file:
```
sudo apt-get -y install apt-file
sudo apt-file update
apt-file search FILENAME
```


#### To list the files a given package provides:
```
sudo apt-get -y install apt-file
sudo apt-file update
apt-file list PACKAGENAME
```

Or for a downloaded package:
```
dpkg -c package.deb
```


#### To upgrade a single package:
```
sudo apt-get install PACKAGENAME
```


#### Reinstall a package
```
sudo apt-get install --reinstall PACKAGENAME
```


#### Install available updates
```
apt-get update
apt-get upgrade
```

Or:
```
sudo aptitude update
sudo aptitude safe-upgrade
```


#### To install a specific program:
```
sudo apt-get install PACKAGENAME
```


#### To search for a specific installable program:
```
sudo apt-get -y install aptitude
aptitude search PACKAGENAME
```

Or:
```
apt-cache search PACKAGENAME
```


#### To remove a specific program:
```
sudo apt-get remove PACKAGENAME
```

Or:
```
dpkg -r PACKAGENAME
```


#### To install a downloaded package:
```
sudo dpkg –i PACKAGENAME
```

Ex:
```
sudo dpkg –i samba.deb
```


#### To list installed packages:
```
dpkg -l
```
