---
title: Android
---

## Android Studio

#### Install Android Studio

1. Follow the instructions here to install Android Studio: [https://developer.android.com/studio/install](https://developer.android.com/studio/install)

1. Create a desktop entry: _Tools_ > _Create Desktop Entry_

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

1. Create keyboard shortcut to auto format and save

   [Auto format code in Android Studio/Intellij IDEA](https://medium.com/nerd-for-tech/auto-format-code-in-android-studio-intellij-idea-1f0450ee44a3)

#### Disable spell checking

1. _File_ > _Settings_ > _Editor_ > _Inspections_ > _Proofreading_ > _Typo_

1. Uncheck everything under _Options_ > _OK_

## Layouts

#### Which layout to use and when

- Use a `LinearLayout` whenever you want a simple group of items that can be automatically arranged horizontally or vertically
  - This works well with orientation changes; you can have a unique parent `LinearLayout` per orientation (portrait/landscape) with the orientation set appropriate to the orientation. Then put the child items in a separate file, grouped under a `<merge>` tag, and include them in the parent layout. This way you can reuse the same items for different orientations and you only need to redefine the parent layout.
- Use a `ConstraintLayout` when you want to place items in a specific relation to other items, and where the relation of the placement will be the same for different screen orientations. If the relation of one item to another will change for different screen orientations, `ConstraintLayout` will require you to duplicate all the children for each orientation, because the constraints are on the child items and not on the `ConstraintLayout` itself.
- Many things can be done using only layouts, but you will quickly run into limitations; for example, you can make an element square by making sure its height and width are the same, but you can't then tie the height/width based on the percentage of its parent. Essentially, as soon as you run into a limitation, you should probably think about creating only a basic layout and then doing anything else in the code. This will probably also be more maintainable.
