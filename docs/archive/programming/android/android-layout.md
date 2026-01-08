---
title: Android layout
---

#### source of android layouts:

- /frameworks/base/core/res/res/layout folders in the source code
  - [http://www.netmite.com/android/mydroid/frameworks/base/core/res/res/layout/](http://www.netmite.com/android/mydroid/frameworks/base/core/res/res/layout/)
  - [http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.3.1_r1/frameworks/base/core/res/res/layout/simple_list_item_1.xml?av=f](http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.3.1_r1/frameworks/base/core/res/res/layout/simple_list_item_1.xml?av=f)

#### common layout objects

see: [http://developer.android.com/guide/topics/ui/layout-objects.html](http://developer.android.com/guide/topics/ui/layout-objects.html)

#### to hide the title bar:

in AndroidManifest.xml, use Theme.NoTitleBar:

```
<application android:icon="@drawable/icon"
             android:theme="@android:style/Theme.NoTitleBar">
```
