---
title: RHEL/CentOS quick reference
---

## Networking

#### Get the IP address (RHEL 7+)

    ip addr show


#### Open a port (RHEL 7+)

    sudo firewall-cmd --get-active-zones
    sudo firewall-cmd --zone=public --add-port=8000/tcp --permanent
    sudo firewall-cmd --reload


#### Close a port (RHEL 7+)

    sudo firewall-cmd --get-active-zones
    sudo firewall-cmd --zone=public --remove-port=8000/tcp --permanent
    sudo firewall-cmd --reload



## SSH X11 Forwarding

#### Enable SSH X11 forwarding

1. Install prerequisite packages:

        sudo yum -y xorg-x11-xauth

2. Edit /etc/ssh/sshd_config and add this line:

        X11UseLocalhost no


#### Test SSH X11 forwarding

1. SSH to the server with the -X flag:

        ssh -X myserver

2. Install xclock

        sudo yum -y install xorg-x11-apps

3. Run xclock

        xclock


#### Use SSH X11 forwarding as another user

1. SSH to the server with the -X flag

        ssh -X myserver

2. Configure xauth

    - RHEL 7:

            xauth extract - $DISPLAY > /tmp/.Xauthority
            chmod 666 /tmp/.Xauthority
            sudo -iu someuser
            xauth merge /tmp/.Xauthority

    - RHEL 6:

            xauth extract -  :`echo $DISPLAY | cut -d : -f 2` > /tmp/.Xauthority
            chmod 666 /tmp/.Xauthority
            sudo -iu someuser
            xauth merge /tmp/.Xauthority

    - Alternatively (not recommended):

        1. Copy your .Xauthority file to that user's home folder

                sudo cp ~/.Xauthority ~someuser

        2. Change the ownership of the file to that user

                sudo chown someuser: ~someuser/.Xauthority

        3. Become that user

                sudo -iu someuser

3. Test X forwarding

        xclock

4. Cleanup (optional, recommended)

    - RHEL 7:

            xauth remove $DISPLAY
            rm /tmp/.Xauthority

    - RHEL 6:

            xauth remove  :`echo $DISPLAY | cut -d : -f 2`
            rm /tmp/.Xauthority

    - Alternatively (not recommended):

        1. Remove the .Xauthority file

                rm ~someuser/.Xauthority
