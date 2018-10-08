---
title: UFW (Uncomplicated firewall)
---

#### Set up firewall
```
# Block all incoming connections by default
sudo ufw default deny

# Enable firewall
sudo ufw enable

# Allow SSH connections from a specific subnet
sudo ufw allow from 192.168.1.0/24 proto tcp to any port ssh

sudo ufw status
```


#### Allow all traffic on a certain port
```
# TCP/UDP
sudo ufw allow 3389

# TCP only
sudo ufw allow 22/tcp

# TCP/UDP
sudo ufw allow from 192.168.1.0/24 to any port 3389

# TCP only
sudo ufw allow from 192.168.1.0/24 proto tcp to any port 22
```


#### Show firewall rules as a numbered list
```
sudo ufw status numbered
```


#### Delete firewall rules by number
```
sudo ufw delete 1
```
