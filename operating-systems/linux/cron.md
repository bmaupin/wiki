---
title: Cron
---

Helpful documentation: [https://help.ubuntu.com/community/CronHowto](https://help.ubuntu.com/community/CronHowto)

#### Notes

- Cronjobs must have a trailing newline at the end, or they won't run

- [`&>` won't work in cron](http://unix.stackexchange.com/a/52332/14436). Use something like this instead:
  ```
  command > output.txt 2>&1
  ```
- Cron won't have the same environment variables set. You can test your command using env:
  ```
  env -i sh -c 'cd /home/user/Desktop; JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64 /home/user/.gvm/grails/current/bin/grails run-script scripts/Test.groovy --stacktrace &> /home/user/Desktop/test.txt'
  ```
