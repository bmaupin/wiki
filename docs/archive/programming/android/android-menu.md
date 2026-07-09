---
title: Android menu
---

[http://developer.android.com/guide/topics/ui/menus.html](http://developer.android.com/guide/topics/ui/menus.html)

Hello, Android p.61 -

1. create res/menu/menu.xml
   ```
   <?xml version="1.0" encoding="UTF-8"?>
   <menu xmlns:android="http://schemas.android.com/apk/res/android">
       <item android:id="@+id/menu_help"
           android:title="@string/menu_help_label"
           android:alphabeticShortcut="@string/menu_help_shortcut"
           android:icon="@android:drawable/ic_menu_help" />
       <item android:id="@+id/menu_about"
           android:title="@string/menu_about_label"
           android:alphabeticShortcut="@string/menu_about_shortcut"
           android:icon="@android:drawable/ic_menu_info_details" />
       <item android:id="@+id/menu_settings"
           android:title="@string/menu_settings_label"
           android:alphabeticShortcut="@string/menu_settings_shortcut"
           android:icon="@android:drawable/ic_menu_preferences" />
       <item android:id="@+id/menu_exit"
           android:title="@string/menu_exit_label"
           android:alphabeticShortcut="@string/menu_exit_shortcut"
           android:icon="@android:drawable/ic_menu_close_clear_cancel" />
   </menu>
   ```
1. add menu labels to res/values/strings.xml
   ```
   <string name="menu_about_label">About</string>
   <string name="menu_about_shortcut">a</string>
   <string name="menu_exit_label">Exit</string>
   <string name="menu_exit_shortcut">x</string>
   <string name="menu_help_label">Help</string>
   <string name="menu_help_shortcut">h</string>
   <string name="menu_settings_label">Settings</string>
   <string name="menu_settings_shortcut">s</string>
   ```
1. in your main Activity, override onCreateOptionsMenu to inflate the menu
   ```
   /* Inflates the menu */
   @Override
   public boolean onCreateOptionsMenu(Menu menu) {
       MenuInflater inflater = getMenuInflater();
       inflater.inflate(R.menu.menu, menu);
       return true;
   }
   ```
1. in your main Activity, override onOptionsItemSelected to handle menu selections
   ```
   /* Handles menu selections */
   @Override
   public boolean onOptionsItemSelected(MenuItem item) {
       switch (item.getItemId()) {
       case R.id.menu_about:
           startActivity(new Intent(this, About.class));
           return true;
       case R.id.menu_exit:
           finish();
           return true;
       }
       return false;
   }
   ```

- icons:

  - [android asset studio](http://android-ui-utils.googlecode.com/hg/asset-studio/dist/index.html)
  - built in icons, in android.jar/res/drawable\*/ic_menu\_\*

    note: it's not recommended to use the built-in Android icons (android.jar located in /opt/google/android-sdk-linux_86/platforms/android-\*)

    - see them online:

      [http://androiddrawableexplorer.appspot.com/](http://androiddrawableexplorer.appspot.com/)

    - Java Usage example:
      ```
      myMenuItem.setIcon(android.R.drawable.ic_menu_save);
      ```
    - Resource Usage example:
      ```
      android:icon="@android:drawable/ic_menu_save"
      ```

  - other icons
    - [http://www.iconfinder.com/search/?q=iconset:androiddevicons](http://www.iconfinder.com/search/?q=iconset:androiddevicons)
    - [http://www.androidicons.com/freebies.php](http://www.androidicons.com/freebies.php)
    - [http://www.glyfx.com/products/free_android2.html](http://www.glyfx.com/products/free_android2.html)
