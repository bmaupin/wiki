---
title: Android input
---

see: [http://developer.android.com/guide/topics/ui/ui-events.html](http://developer.android.com/guide/topics/ui/ui-events.html)

#### touch

to implement a simple tap, in your Activity, create a new onClickListener:

```
// Create an anonymous implementation of OnClickListener
private OnClickListener mCorkyListener = new OnClickListener() {
    public void onClick(View v) {
      // do something when the button is clicked
    }
};
```

...and use the setOnclickListener method to attach it to one of your Views:

```
protected void onCreate(Bundle savedValues) {
    ...
    // Capture our button from layout
    Button button = (Button)findViewById(R.id.corky);
    // Register the onClick listener with the implementation above
    button.setOnClickListener(mCorkyListener);
    ...
}
```

(code from [http://developer.android.com/guide/topics/ui/ui-events.html](http://developer.android.com/guide/topics/ui/ui-events.html))

if you want to implement other touch events (swipe, etc), in your Activity, override onTouchEvent:

```
@Override
public boolean onTouchEvent(MotionEvent event) {
    int action = event.getAction();
    Log.d(TAG, "onTouchEvent, action: " + action);
    switch (action) {
        case (MotionEvent.ACTION_DOWN): // Touch screen pressed
            // TODO Process touch event here or in another case...
            break;
        case (MotionEvent.ACTION_UP): // Touch screen touch ended
            break;
        case (MotionEvent.ACTION_MOVE): // Contact has moved across screen
            break;
        case (MotionEvent.ACTION_CANCEL) : // Touch event cancelled
            break;
        case (MotionEvent.ACTION_OUTSIDE): // Movement has occurred outside the
        // bounds of the screen element
        // being monitored
            break;
    }
    return super.onTouchEvent(event);
}
```

alternative: in the onCreate method of your Activity:

```
myTextView.setOnTouchListener(new OnTouchListener() {
    public boolean onTouch(View arg0, MotionEvent arg1) {
        // TODO Process touch event, return true if handled
        return false;
    }
});
```

#### keys

in your Activity, override onKeyDown:

```
@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
    Log.d(TAG, "onKeyDown: keycode=" + keyCode + ", event="
            + event);
    switch (keyCode) {
    case KeyEvent.KEYCODE_DPAD_UP:
        // TODO Process key press event here or in another case...
        break;
    case KeyEvent.KEYCODE_DPAD_DOWN:
        break;
    case KeyEvent.KEYCODE_DPAD_LEFT:
        break;
    case KeyEvent.KEYCODE_DPAD_RIGHT:
        break;
    case KeyEvent.KEYCODE_DPAD_CENTER:
        break;
    default:
        return super.onKeyDown(keyCode, event);
    }
    return true;
}
```

alternative (not recommended as this has issues with different keyboards): in the onCreate method of your Activity:

```
myView.setOnKeyListener(new OnKeyListener() {
    public boolean onKey(View v, int keyCode, KeyEvent event)
    {
        // TODO Process key press event, return true if handled
        return false;
    }
});
```
