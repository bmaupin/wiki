---
title: Apache HTTP Server
---

#### Install Apache

RHEL/Centos:

```
sudo yum install httpd
```

Ubuntu/Debian:

```
sudo apt install apache2
```

#### Configuration/folder structure

RHEL/Centos:

- Main configuration folder:
  /etc/httpd/
- Main configuration file:
  /etc/httpd/conf/httpd.conf
- Folder for module configuration files:
  /etc/httpd/conf.d/

  (all \*.conf files in this folder will be loaded)

Ubuntu/Debian:

- Main configuration folder:
  /etc/apache2/
- Main configuration file:
  /etc/apache2/apache2.conf
- Configuration file for listening ports:
  /etc/apache2/ports.conf
- Folder for module configuration files:
  /etc/apache2/mods-enabled/

  (all _.conf and _.load files in this folder will be loaded)

- Folder for sites/virtual hosts configuration files :
  /etc/apache2/sites-enabled/

  (all \*.conf files in this folder will be loaded)

- Folder for global configuration fragments :
  /etc/apache2/conf-enabled/

  (all \*.conf files in this folder will be loaded)

#### Enable a module:

RHEL/Centos:

1. Search for the module to install (most modules begin with `mod_`):

   ```
   sudo yum search mod_ssl
   ```

   Or search all available modules:

   ```
   sudo yum search mod_
   ```

1. Install the module

   ```
   sudo yum install mod_ssl
   ```

   This will automatically create a file in /etc/httpd/conf.d/ that will load the module so it can be used.

Ubuntu/Debian:

1. Search for the module to install (most modules begin with `libapache2-mod-`):

   ```
   apt-cache search libapache2-mod-php5
   ```

   Or search all available modules:

   ```
   apt-cache search libapache2-mod
   ```

1. Install the module
   ```
   sudo apt install libapache2-mod-php5
   ```
1. Enable the module
   ```
   sudo a2enmod php5
   ```

In Ubuntu/Debian, SSL is installed by default, it just needs to be enabled:

```
sudo a2enmod ssl
```

#### Enable a site (Ubuntu/Debian):

1. Back up the original configuration

   ```
   sudo cp /etc/apache2/sites-available/default-ssl /etc/apache2/sites-available/default-ssl.bak
   ```

1. Modify it as needed

   ```
   sudo vim /etc/apache2/sites-available/default-ssl
   ```

1. Enable the site
   ```
   sudo a2ensite default-ssl
   ```
