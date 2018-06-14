---
title: Upstart
---

**Deprecated: see [systemd]({{ '/operating-systems/linux/systemd.html' | relative_url }})**

<hr>

#### Starting/stopping services

    sudo service ufw start
    sudo service ufw stop


#### Disabling an upstart service
1. Edit the upstart script located in /etc/init
2. Comment out the line beginning with "start on"
3. (Optional) Stop the service
    Ex:

        sudo service ufw stop


#### Misc
- Scripts are located in /etc/init
