---
title: Android hacking
---

#### Download APKs
Use [https://www.apkmirror.com/](https://www.apkmirror.com/)


#### Remount /system as read-write
```
adb shell
su
mount -o remount,rw /system
```

When you're done making changes:
```
mount -o remount,ro /system
```


#### Enable developer options
*Settings* > *About phone* > tap *Build number* 7 times. You should see the message: "You are now a developer!"


#### Unroot
1. If you don't have SuperSU installed, install it
    - [https://play.google.com/store/apps/details?id=eu.chainfire.supersu](https://play.google.com/store/apps/details?id=eu.chainfire.supersu)

    - Or download the latest SuperSU flash file and extract the APK from the common folder  
        [http://download.chainfire.eu/supersu](http://download.chainfire.eu/supersu)

1. Open SuperSU

1. *Settings* > scroll down to *Full unroot* > *Continue*
