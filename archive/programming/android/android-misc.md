---
title: Android misc
---

## definitions

- **activity:** a single screen, a "form." Your app is made up of one or more activities.
- **view:** a visual component, a "control," i.e. text boxes, lists, buttons, check boxes.

also see: [http://developer.android.com/guide/appendix/glossary.html](http://developer.android.com/guide/appendix/glossary.html)

## misc

#### helpful notes

- "One of the most important techniques for writing efficient code in Android is to avoid the repetitive creation and destruction of objects. Any object created in your onDraw method will be created and destroyed every time the screen refreshes. Improve efficiency by making as many of these objects (particularly instances of Paint and Drawable) class-scoped and by moving their creation into the constructor." (Wrox Professional Android 2 Application Development, p. 101)
- always be sure to increment android:versionCode in AndroidManifest.xml when updating app
- if database has changed, increment db version number in db helper class

#### using custom fonts:

1. create a fonts subfolder in the assets folder
1. put your custom font in that folder
1. in your Activity class, when you override onCreate:
   1. set your font as a new typeface:
      ```
      Typeface face=Typeface.createFromAsset(getAssets(), "fonts/myfont.ttf");
      ```
   1. create your TextView:
      ```
      final TextView myTextView = (TextView)findViewById(R.id.myTextView);
      ```
   1. finally, set the Typeface of your TextView to the Typeface you created:
      ```
      myTextView.setTypeface(face);
      ```

#### storing variables/settings

use SharedPreferences:
[http://developer.android.com/guide/topics/data/data-storage.html#pref](http://developer.android.com/guide/topics/data/data-storage.html#pref)
