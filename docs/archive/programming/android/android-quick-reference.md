---
title: Android quick reference
---

#### notifications (like growl, gnotify)

use Toast: [http://developer.android.com/guide/topics/ui/notifiers/toasts.html](http://developer.android.com/guide/topics/ui/notifiers/toasts.html)

```
import android.widget.Toast;
Toast.makeText(getApplicationContext(), someString, Toast.LENGTH_SHORT).show();
```

#### create a new Android project (in Eclipse)

1. File > New > Project
1. Android > Android Project > Next
1. Project Name: android_My_project
1. Build Target: (at least API 3)
1. Application Name: My project
1. Package name: (must start with domain extension (gov, edu, com) or country code (us, ca), followed by unique identifier, such as domain, followed by package name. use periods to separate words. first identifier (word) should always be lowercase. after that can be upper or lower, and can have underscores. identifiers my not start with numbers, and should have an underscore prepended to them if they do. hyphens are not allowed and should be replaced with underscores. also:

   "If any of the resulting package name components are keywords (§3.9) then append underscore to them."

   see: [http://java.sun.com/docs/books/jls/third_edition/html/packages.html#7.7](http://java.sun.com/docs/books/jls/third_edition/html/packages.html#7.7)

1. if you need a screen for your app (if it's not purely a widget, something else)

   Create Activity: MyProject

1. Min SDK Version: 3

#### storing Android projects in revision control system (e.g. SVN, git)

- exclude the bin and gen folders from the repo

#### exporting your Android app for use on an Android device

1. right-click on your Android project > Android Tools > Export Signed Application Package...
1. click Next
1. select Create new keystore
   1. Location: /home/_username_/workspace/android-test.keystore
   1. enter a password
   1. click Next
1. Alias: test
   1. enter a password
   1. Validity (years): 25
   1. First and Last Name: test
   1. click Next
1. choose a location for your .apk

#### using Bundles

```
Bundle bundle = new Bundle();
bundle.putString("stringKey", stringVariable);
bundle.putInt("intKey", intVariable);
String someString = bundle.getString("stringKey");
```

#### Building an Android project from elsewhere

1. Clone the project's git repo

   ```
   cd ~/workspace/git
   git clone ...
   ```

1. Clone the git repos for the project's dependencies

   ```
   cd ~/workspace/git
   git clone ...
   ```

1. Import the project and dependencies into Eclipse

   1. _File_ > _Import_ > _Android_ > _Existing Android Code Into Workspace_ > _Next_

   1. _Browse_ > browse to the git folder > _OK_

   1. Deselect any undesired projects (samples, tests, etc) > _Finish_

1. Configure the project dependencies in Eclipse

   1. Right-click the project > _Properties > Android_

   1. Under _Library_ if there are any errors, click _Add_ >select the appropriate library > _OK_ and then remove the old library reference by clicking _Remove_
