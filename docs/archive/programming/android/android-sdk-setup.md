---
title: Android SDK setup
---

## Android Studio

#### Installing Android Studio

1. Download Android Studio

   [https://developer.android.com/sdk/index.html](https://developer.android.com/sdk/index.html)

1. Unzip it

   ```
   unzip android-studio-ide-XXX.XXXXXXX-linux.zip
   ```

1. Move it

   ```
   sudo mv android-studio /opt/google/
   ```

1. Create an application launcher icon
   ```
   echo "[Desktop Entry]
   Type=Application
   Name=Android Studio
   Icon=/opt/google/android-studio/bin/studio.png
   Exec=/opt/google/android-studio/bin/studio.sh
   Terminal=false" >> ~/.local/share/applications/android-studio.desktop
   chmod +x ~/.local/share/applications/android-studio.desktop
   ```

#### Configuring Android Studio

1. Go to _File_ > _Settings_ > _Appearance & Behavior_

   1. _System Settings_ > _Updates_

      1. _Automatically check updates for_ > _Stable Channel_
      1. Make sure _Automatically check updates_ for is checked

   1. _Appearance_ > _Theme_ > _Darcula_

   1. _OK_

1. _File_ > _Project Structure_ > _SDK Location_ > _JDK location_
   1. Set to the version of Java you wish to use, for example:
      - /usr/lib/jvm/java-7-openjdk-amd64
      - /usr/lib/jvm/java-8-openjdk-amd64

#### Updating Android Studio

1. Make sure update location is configured (see _Configuring Android Studio_ above)

1. _Help_ > _Check for Updates_

   1. If it says _Update and Restart_, click that

   1. If it says _Download_, you must update manually:

      1. Exit Android Studio

      1. Go here:
         [http://tools.android.com/download/studio/stable](http://tools.android.com/download/studio/stable)

      1. Click the latest version and download it

      1. Remove the old version of Android Studio (settings won't be lost, they're saved in ~/.AndroidStudioX.X)

         ```
         sudo rm -rf /opt/google/android-studio
         ```

      1. Use the same instructions above to unzip and move Android Studio

      1. Open Android Studio

      1. If you get the _Complete Installation_ dialog, select _I want to import my settings from a previous version_ > _OK_

      1. After upgrading, remove the old ~/.AndroidStudioX.X folder to free up space

1. Install Android SDK updates

   1. _Help_ > _Check for Updates_

   1. Click _Update Now_ or _Update_ for any updates

1. Reconfigure Android Studio (see _Configuring Android Studio_ above)

#### Common issues

- Aidl is missing

  - [http://stackoverflow.com/a/30520628/399105](http://stackoverflow.com/a/30520628/399105)

- Failed to import new Gradle project: failed to find Build Tools revision
  - [http://stackoverflow.com/a/19432649/399105](http://stackoverflow.com/a/19432649/399105)

## Android SDK (old)

#### Installing the old SDK

1. Install prerequisites for 64-bit Ubuntu:

   ```
   sudo apt-get install -y libc6:i386 libgcc1:i386 libstdc++6:i386 libz1:i386
   ```

   ([http://askubuntu.com/a/498660/18665](http://askubuntu.com/a/498660/18665))

1. Install Java

   ```
   sudo apt-get install -y openjdk-6-jdk openjdk-7-jdk
   ```

1. Install Eclipse:

   [Eclipse setup](https://sites.google.com/site/bmaupinwiki/home/programming/tools/eclipse-setup)

1. Download the latest Android SDK standalone tar file:

   [http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html)

1. Extract it

   ```
   tar xvf android-sdk_rX.X.X-linux.tgz
   ```

1. Move it
   ```
   sudo mv android-sdk-linux /opt/google
   ```

#### When setting up the Android SDK, be sure to include the following packages:

- _Tools_/_Android SDK Tools_
- _Tools_/_Android SDK Platform-tools_
- _Tools_/_Android SDK Build-tools_
  - Install the latest version
- Under the latest API:
  - _Documentation for Android SDK_
    - This will be installed in /path/to/android-sdk-linux/docs
  - _Sources for Android SDK_
- Under whichever API(s) you're targeting:
  - _SDK Platform_
  - _ARM EABI System Image_
- _Extras_/_Android Support Library_
  - Install this if you're using Eclipse
- _Extras_/_Android Support Repository_
  - Install this if you're using Android Studio

#### Creating a new AVD (android virtual device)

1. Open the AVD manager
1. Click New...
1. Under Target, select the version of Android you want the AVD to be
1. For Name, name it HVGA_API_16 (using the API version you picked under target)
1. Give it an SD Card size of at least 9 MiB
1. Give it a device resolution of HVGA
1. Click Create AVD

#### Showing Android SDK buttons in Eclipse

- _Window_ > _Customize Perspective..._ > _Command Groups Availability_ > Check _Android SDK and AVD Manager_
