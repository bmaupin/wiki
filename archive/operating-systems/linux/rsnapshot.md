---
title: rsnapshot
---

#### Install rsnapshot

```
sudo apt install rsnapshot
```

#### Configure rsnapshot

In order to configure rsnapshot, you need to edit /etc/rsnapshot.conf

**Important**

- rsnapshot.conf requires tabs (not spaces) between parameter elements
- Directories require a trailing slash (i.e. /path/to/myfolder/)

1. Specify the root directory for storing snapshots

   1. Modify the `snapshot_root` parameter

1. Uncomment `cmd_cp`

   [http://rsnapshot.org/howto/1.2/rsnapshot-HOWTO.en.html#cmd_cp](http://rsnapshot.org/howto/1.2/rsnapshot-HOWTO.en.html#cmd_cp)

1. Configure backup intervals

   [http://rsnapshot.org/howto/1.2/rsnapshot-HOWTO.en.html#interval](http://rsnapshot.org/howto/1.2/rsnapshot-HOWTO.en.html#interval)

   1. Intervals are listed by frequency and number

   1. The shortest intervals must be listed first

      Example (7 daily intervals, 4 weekly, 12 monthly):

      ```
      interval daily 7
      interval weekly 4
      interval monthly 12
      ```

1. Configure the locations you want backed up

   [http://rsnapshot.org/howto/1.2/rsnapshot-HOWTO.en.html#backup](http://rsnapshot.org/howto/1.2/rsnapshot-HOWTO.en.html#backup)

   1. Backups are relatively simple: source and destination. Path will be preserved. Localhost is the conventional destination folder when storing backups locally

      Example:

      ```
      backup /home/user/ localhost/
      backup /etc/default/grub localhost/
      backup /etc/default/ufw localhost/
      backup /etc/rsnapshot.conf localhost/
      backup /etc/ufw/ufw.conf localhost/
      backup /opt/eclipse/eclipse.ini localhost/
      ```

1. Test your rsnapshot configuration file

   ```
   sudo rsnapshot configtest
   sudo rsnapshot -t daily
   ```

1. Add rsnapshot to crontab to enable it

   ```
   $ sudo vim /etc/cron.d/rsnapshot

   # 0 */4 * * * root /usr/bin/rsnapshot hourly
   30 3   * * * root /usr/bin/rsnapshot daily
   0  3   * * 1 root /usr/bin/rsnapshot weekly
   30 2   1 * * root /usr/bin/rsnapshot monthly
   ```
