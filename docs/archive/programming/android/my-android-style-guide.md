---
title: My Android style guide
---

## java

#### casting

one space after the class you're casting to

Ex:

```
(EditText) layout.findViewById(...
```

#### switch statements

```
switch(id) {
case DIALOG_PAUSED_ID:
    // do the work to define the pause Dialog
    break;
case DIALOG_GAMEOVER_ID:
    // do the work to define the game over Dialog
    break;
default:
    dialog = null;
}
```

## xml

#### element closing brackets

```
<Button android:id="@+id/ok"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    />
```

## activities

#### order of methods in activity classes

- methods related to beginning of activity life cycle
  - onCreate
  - onNewIntent
  - onResume
  - onActivityResult
- Loader callback methods
  - onCreateLoader
  - onLoadFinished
  - onLoaderReset
- methods related to options menu
  - onCreateOptionsMenu
  - onOptionsItemSelected
- methods related to context menu
  - onCreateContextMenu
  - onContextItemSelected
- methods related to user input
  - onKeyDown
  - onTouchEvent
  - custom classes extending SimpleOnGestureListener
  - onListItemClick
- other methods
  - onContentChanged
- custom methods
- methods related to dialogs
  - onCreateDialog
  - onPrepareDialog
  - methods that create the dialogs
- methods related to end of activity life cycle
  - onPause
  - onDestroy

## misc

- use "dp" instead of "dip"

  [http://developer.android.com/guide/topics/resources/more-resources.html#Dimension](http://developer.android.com/guide/topics/resources/more-resources.html#Dimension)
