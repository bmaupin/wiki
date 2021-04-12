---
title: Eclipse setup
---

1. Download Eclipse (minimal installation)

   1. Go here: [http://download.eclipse.org/eclipse/downloads/](http://download.eclipse.org/eclipse/downloads/)

   1. Under _Latest Release_ click the version number

   1. Scroll down to _Platform Runtime Binary_ (this downloads a minimal installation) and download the latest Linux (x86_64/GTK+) release

1. Extract the download

   ```
   tar xvf eclipse-platform...tar.gz
   sudo mv eclipse /opt
   ```

1. Specify the Java version (so it doesn't break if the default system Java gets changed)

   ```
   sed -i.bak 's#-vmargs#-vm\n/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java\n-vmargs#' /opt/eclipse/eclipse.ini
   ```

1. Adjust heap size, if necessary/desired

   - To adjust it from the default of 512 MB to 1 GB:
     ```
     sed -i 's/^-Xmx512m$/-Xmx1024m/g' /opt/eclipse/eclipse.ini
     ```

1. If necessary, create an application launcher icon (for Unity, Xfce, etc)

   ```
   echo "[Desktop Entry]
   Type=Application
   Name=Eclipse
   Icon=/opt/eclipse/icon.xpm
   Exec=/opt/eclipse/eclipse
   Terminal=false" >> ~/.local/share/applications/eclipse.desktop
   ```

1. Install additional features/plugins

   1. _Help_ > _Install New Software_

   1. Install features in Eclipse repository

      1. _Work with_ > _name of current Eclipse version_ (e.g. Luna)

      1. Check any desired features

         - Java

           - _Eclipse Java Development Tools_ > _Eclipse Java Development Tools_

         - PHP

           1. _Programming Languages_ > _PHP Development Tools (PDT)_

         - SVN (Subversive)

           1. _Collaboration_ > _Subversive SVN Team Provider_

         - XML
           1. _Programming Languages_ > _Eclipse XML Editors and Tools_

      1. Click _Next_, and then follow the instructions to complete installation

      1. Further instructions for SVN

         1. While waiting, install libsvn-java and subversion
            ```
            sudo apt-get -y install libsvn-java subversion
            ```
         1. Then get svn version
            ```
            svn --version
            ```
         1. Set the path to the Java SVN libraries

            ```
            sed -i 's#-vmargs#-vmargs\n-Dsubversion.native.library=/usr/lib/x86_64-linux-gnu/jni/#' /opt/eclipse/eclipse.ini
            ```

         1. Once Eclipse restarts, Open _Perspective_ > _Other_ > _SVN Repository Exploring_

         1. A window should pop up with different subversive SVN connectors

         1. Check the version of the _JavaHL_ connector (SVNKit is slower and uses more memory) that corresponds with the version of subversion you have installed, click _Finish_, and then follow the instructions to complete installation

   1. Install other plugins

      1. Pydev (Python)

         [http://pydev.org/updates/](http://pydev.org/updates/)

      1. Android

         [http://developer.android.com/sdk/installing/installing-adt.html](http://developer.android.com/sdk/installing/installing-adt.html)

         If you get the error "sdk platform tools is missing": [
         http://stackoverflow.com/questions/4527414/huh-sdk-platform-tools-component-is-missing](http://stackoverflow.com/questions/4527414/huh-sdk-platform-tools-component-is-missing)

1. _Window_ > _Preferences_ > _General_ > _Editors_ > _Text Editors_ > _Spelling_ > uncheck _Enable spell checking_ > _OK_
1. _Window_ > _Preferences_ > _General_ > _Startup and Shutdown_ > uncheck all plugins > _OK_

1. Use dark theme, if desired

   1. Change Eclipse to the dark theme

      - _Window_ > _Preferences_ > _General_ > _Appearance_ > _Theme_ > Dark

   1. Fix plugin colors

      - The easiest way to do this is to install a theme, like Solarized:

        1. Download this file: [https://raw.githubusercontent.com/bmaupin/solarized-dark-high-contrast/master/eclipse/solarized-dark-high-contrast.epf](https://raw.githubusercontent.com/bmaupin/solarized-dark-high-contrast/master/eclipse/solarized-dark-high-contrast.epf)

        1. In Eclipse go to _File_ > _Import_ > _General_ > _Preferences_ > _Next_ > browse to the file > _Finish_

1. Configure editors

   - Java

     1. _Window_ > _Preferences_ > _Java_ > _Code Style_ > _Formatter_ > _Edit_

     1. _Profile name_ > Custom

     1. _Indentation > Tab policy_ > _Spaces only_

     1. _Line Wrapping_ > check _Never join already wrapped lines_ > _OK_

     1. _Java_ > _Editor_ > _Save Actions_ > check _Perform the selected actions on save_, _Format source code_, _Additional actions_ > _Configure_

     1. Check _Remove trailing whitespace_, _Correct indentation_ > _OK_

     1. _Java_ > _Code Style_ > _Clean Up_ > _Edit_

     1. _Code Organizing_ > check _Format source code_, _Remove trailing whitespace_, _Correct indentation_, _Organize imports_ > _Profile name_ > Custom > _OK_ > _OK_
