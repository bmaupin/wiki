---
title: Disable Android apps
---

Inspired by: [iPhone dumbphone](https://stopa.io/post/297)

See also:

- [quietude](https://github.com/tstromberg/quietude)
- [adb-shell-android-bloatware-removal](https://github.com/Pinaki82/adb-shell-android-bloatware-removal)
- [Limit](https://limitphone.com/)
- [Andoff](https://docs.andoff.one/)
- [Lock Me Out](https://www.teqtic.com/lock-me-out)

## Disable an Android app so it can't be re-enabled from the phone

ⓘ This is a cool trick that will allow hiding apps from an Android phone without uninstalling them, so you can do it for apps that you wish to completely hide from the phone.

1. Figure out the package name

   ⓘ See below for a list of some package names

   See [View app's full package name?](https://android.stackexchange.com/questions/28767/view-apps-full-package-name/72942), e.g.

   ```
    $ adb shell "pm list packages" | grep -i chrome
    package:com.motorola.android.providers.chromehomepage
   ```

1. Disable the app, e.g.

   ⓘ This removes the app icon from the app tray and makes it show as _Disabled_ in settings

   ```
   adb shell pm disable-user --user 0 com.android.chrome
   ```

   💡 If you just want to hide the app from the list of apps but want to be able to re-enable it later from the settings in the phone, stop here

1. Hide the app, e.g.

   ⓘ Combined with the previous command, hides the application from settings so it can't be re-enabled from the phone. Despite the command, the app is not uninstalled from the phone, only uninstalled for the current user.

   👉 It may take a minute for the application to disappear from settings

   ```
   adb shell pm uninstall --user 0 com.android.chrome
   ```

## Re-enable an app disabled with the above method

1. Re-enable the application, e.g.

   ```
   adb shell pm enable --user 0 com.android.chrome
   ```

1. Unhide the application, e.g.

   ```
   adb shell cmd package install-existing --user 0 com.android.chrome
   ```

   If you get the error `Unknown command: install-existing`, use this command instead:

   ```
   adb shell pm install -r --user 0 $(adb shell pm dump com.android.chrome | grep path | awk '{print $2}')
   ```

## Some package names

- Chrome: `com.android.chrome`
- Firefox: `org.mozilla.firefox`
- Google (assistant, search, etc.): `com.google.android.googlequicksearchbox`
- HTML viewer (used by other apps to show web pages): `com.android.htmlviewer`
- Play Store: `com.android.vending`
- YouTube: `com.google.android.youtube`
