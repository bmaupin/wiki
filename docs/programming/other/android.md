---
title: Android
---

## Android Studio

#### Install and configure Android Studio

1. Follow the instructions here to install Android Studio: [https://developer.android.com/studio/install](https://developer.android.com/studio/install)

1. Follow steps here to customize Android Studio as desired: [IntelliJ IDEA](../tools/intellij)

## Layouts

#### Which layout to use and when

- Doing advanced layouts in XML can be fussy and annoying, but the alternative is to do it in the code, which can be equally fussy and annoying and also error-prone. I think trying to do the layouts in XML is probably better.
- Start with a `ConstraintLayout` since it has the most options for complex layouts, e.g.
  - Positioning items relative to other items
  - Setting the size of a child based on a percentage of the layout
  - Constraining the child item ratio (e.g. `1:1` for a square/circle item)
- The only advantage `LinearLayout` has is that it could allow you to align child items differently (vertically or horizontally) when the screen orientation changes without having to duplicate the layout for each child item. But based on experience, this means you'll end up having to resort to using code for features that you could do in XML with `ConstraintLayout`, so this probably isn't really ideal. In those cases, it's probably better to use `ConstraintLayout` and just duplicate the child elements.
