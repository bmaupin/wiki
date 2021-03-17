---
title: Ubuntu service management
---

**Note:** For Ubuntu 15.04+, see [Systemd](../../../../operating-systems/linux/systemd)

## General

#### Determine whether a service is using Upstart or System V:

```
ls -l /etc/init.d/SERVICENAME
```

Ex:

```
ls -l /etc/init.d/cups
```

If it's a symlink pointing to `/lib/init/upstart-job`, it's using Upstart. Otherwise, it's using System V/init.

## Upstart services

#### Manage the status of a particular Upstart service:

```
sudo service plymouth start/stop/restart/status
```

Or:

```
sudo initctl start/stop/restart/status plymouth
```

#### Show status of all Upstart services:

```
sudo initctl list
```

#### Show configuration for an Upstart service:

```
sudo initctl show-config plymouth
```

## System V services

#### Manage the status of a particular System V service:

```
sudo service apache2 start/stop/restart/status
```

#### Show status of all System V services:

```
sudo service --status-all
```

#### Enable/disable a System V service to automatically start at boot:

```
sudo update-rc.d apache2 enable/disable
```
