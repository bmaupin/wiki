---
title: Systemd
---

Systemd is the default init system for modern Linux systems, as of:
- Debian 8 (Jessie)
- Fedora 15
- RHEL/CentOS 7
- Ubuntu 15.04


#### List all services

    systemctl list-unit-files --type=service


#### Service start/stop/status

    systemctl start/stop/status servicename.service

Ex:

    systemctl status sshd.service


#### Enable/disable service at boot

    systemctl enable/disable servicename.service

Ex:

    systemctl enable sshd.service


#### Check if service is enabled at boot

    systemctl is-enabled servicename.service

Ex:

    systemctl is-enabled sshd.service


#### Change default runlevel
- No GUI, multiple users (RHEL old runlevel 3)

        systemctl set-default multi-user.target

- GUI (RHEL old runlevel 5, Debian/Ubuntu old runlevel 2-5)

        systemctl set-default graphical.target
