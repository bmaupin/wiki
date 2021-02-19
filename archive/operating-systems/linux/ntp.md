---
title: NTP
---

**Note:** These instructions are for RHEL/CentOS unless otherwise specified

#### Check the status of ntpd

```
/usr/sbin/ntpq -p
```

Or:

```
ntpstat
```

#### Force a manual sync

```
sudo /sbin/service ntpd restart
```

If that doesn't work:

```
sudo /sbin/service ntpd stop; sudo ntpdate time.example.org; sudo /sbin/service ntpd start
```

On Ubuntu, if the NTP service isn't installed (it isn't installed by default):

```
sudo ntpdate pool.ntp.org
```

#### Get the list of servers we're syncing with

```
grep ^server /etc/ntp.conf
```

#### Install ntpd

```
sudo apt-get install ntp
```

(Debian/Ubuntu)
