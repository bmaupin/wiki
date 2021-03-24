---
title: Android adb
---

#### important filesystem locations

/data/data/
this is where all of the data for each application is stored

#### connecting to emulator filesystem using adb

```
cd /opt/google/android-sdk-linux_86/platform-tools
./adb shell
```

#### list devices

```
./adb devices
```

#### if you see ???????????? no permissions for a device

```
./adb kill-server && sudo ./adb start-server
```

#### connect to the android device connected to USB (if there's only one)

```
./adb -d
```

#### connect to the android emulator (if there's only one)

```
./adb -e
```

#### to use adb with a physical device

make sure you've enabled USB debugging: menu > Settings > Applications > Development > USB debugging
