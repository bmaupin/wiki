---
title: Logrotate
---

#### Force log rotation

```
/usr/sbin/logrotate -f /path/to/logrotate.conf
```

Rotate everything:

```
/usr/sbin/logrotate -f /etc/logrotate.conf
```

Rotate one log:

```
/usr/sbin/logrotate -f /etc/logrotate.d/krb5kdc
```
