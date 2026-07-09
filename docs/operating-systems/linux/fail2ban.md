---
title: Fail2ban
---

#### Install Fail2ban

```
sudo apt install fail2ban
```

#### Configure Fail2ban

Note: fail2ban now saves bans persistently in a database, so it's not necessary to modify /etc/fail2ban/action.d/iptables-multiport.conf:

```
$ grep ^dbfile /etc/fail2ban/fail2ban.conf
dbfile = /var/lib/fail2ban/fail2ban.sqlite3
```

1. Create a local configuration file

   ```
   sudo vim /etc/fail2ban/jail.local
   ```

1. Edit the contents as desired

   - To ban for 1 year:

     ```
     [DEFAULT]
     bantime = 31536000
     ```

   - To ban forever:

     ```
     [DEFAULT]
     bantime = -1
     ```

1. Restart fail2ban

   ```
   sudo service fail2ban restart
   ```

#### Get Fail2ban status

1. Get the list of jails

   ```
   sudo fail2ban-client status
   ```

1. Get the status of a particular jail

   ```
   sudo fail2ban-client status sshd
   ```
