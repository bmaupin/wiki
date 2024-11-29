---
title: IntelliJ IDEA
---

#### Install or upgrade IntelliJ IDEA

1. Download IntelliJ from [https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download/)

1. Extract the downloaded file, e.g.

   ```
   tar -xvf ideaIU-2024.3.tar.gz
   ```

1. Move the directory somewhere, e.g.

   ```
   sudo mv idea-IU-243.21565.193/ /opt
   ```

1. Launch IntelliJ, e.g.

   ```
   /opt/idea-IU-243.21565.193/bin/idea.sh
   ```

1. Create or update desktop entry

   Menu > _Tools_ > _Create Desktop Entry_

1. If upgrading, remove old installation, e.g.

   ```
   sudo rm -rf /opt/idea-IU-221.5080.210/
   ```

#### Keyboard shortcuts

1. _File_ > _Settings_ > _Keymap_

   1. Override _Find Next_ shortcut

      **Note:** This will override the existing shortcut (_Go to Line:Column_)

      1. _Main Menu_ > _Edit_ > _Find_ > _Find Next_

      1. Right-click > _Add Keyboard Shortcut_

      1. Press <kbd>Ctrl</kbd>+<kbd>G</kbd>

      1. _OK_ > _Remove_

   1. Override _Replace_ shortcut

      **Note:** This will override the existing shortcut (_Type Hierarchy_)

      1. _Main Menu_ > _Edit_ > _Find_ > _Replace_

      1. Right-click > _Add Keyboard Shortcut_

      1. Press <kbd>Ctrl</kbd>+<kbd>H</kbd>

      1. _OK_ > _Remove_

   1. Create shortcuts for move line up/down

      1. _Main Menu_ > _Code_ > _Move Line Down_

         (There's also _Move Statement Down_, but it works less predictably)

      1. Right-click > _Add Keyboard Shortcut_

      1. Press <kbd>Alt</kbd>+down arrow

      1. _OK_ > _Remove_

      1. _Main Menu_ > _Code_ > _Move Line Up_

      1. Right-click > _Add Keyboard Shortcut_

      1. Press <kbd>Alt</kbd>+up arrow

      1. _OK_ > _Remove_

#### Enable auto format on save

- IntelliJ

  [Automatically reformat code on save](https://www.jetbrains.com/help/idea/reformat-and-rearrange-code.html#reformat-on-save)

  1. _File_ > _Settings_ > _Tools_ > _Actions on Save_

  1. Enable any desired options, e.g.

     - _Reformat code_
     - _Optimize imports_

  1. Disable formatting properties files

     (It doesn't seem to do anything except annoyingly remove blank lines, which can be useful to group properties)

     _Reformat code_ > _All file types_ > uncheck _Properties_

- Android Studio: [Auto format code in Android Studio/Intellij IDEA](https://medium.com/nerd-for-tech/auto-format-code-in-android-studio-intellij-idea-1f0450ee44a3)

#### Enable automatic update when Gradle config is changed

1. _File_ > _Settings_ > _Build, Execution, Deployment_ > _Build Tools_

1. Make sure _Reload project after changes in the build scripts_ is checked

1. Select _Any changes_ > _OK_

#### Disable spell checking

_File_ > _Settings_ > _Editor_ > _Inspections_

- (Recommended) Uncheck _Proofreading_ to turn off all proofreading
- Or to disable spell checking:

  _Proofreading_ > under _Proofreading_ uncheck _Typo_

#### Disable auto saving

ⓘ IntelliJ will auto save when you switch to another application, but this may trigger a lengthy rebuild in some projects and may be undesirable

1. _File_ > _Settings_ > _Appearance & Behavior_ > _System Settings_

1. Uncheck _Save files when switching to a different application or a built-in terminal_

#### Lombok support

(Doesn't apply to Android Studio) Follow the steps here: [https://stackoverflow.com/questions/14866765/building-with-lomboks-slf4j-and-intellij-cannot-find-symbol-log](https://stackoverflow.com/a/63926345/399105)
