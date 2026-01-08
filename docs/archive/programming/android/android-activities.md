---
title: Android activities
---

#### adding a new activity (screen):

1. add the necessary layout in res/layout/<activity>.xml
1. add the necessary strings in res/values/strings.xml
1. add the activity as a new class in src/<activity>.jar
   1. override onCreate
      1. point to your activity's layout:
         ```
         setContentView(R.layout.about);
         ```
1. add the activity to AndroidManifest.xml
   - minimum entry:
     ```
     <activity android:name=".About"
         android:label="@string/about_title">
     </activity>
     ```
   - set a theme if desired:
     ```
     android:theme="@android:style/Theme.Dialog"
     ```
1. set whatever button/click/tap/etc you want to point to your new activity
   - if using a menu selection:
     ```
     startActivity(new Intent(this, <activity>.class));
     ```

#### activity life cycle

see: [http://developer.android.com/guide/topics/fundamentals/activities.html#Lifecycle](http://developer.android.com/guide/topics/fundamentals/activities.html#Lifecycle)

- onCreate
  - put anything that only needs to be done once at the start of the activity here
- onPause
  - put anything that needs to be done when the activity is hidden here. an activity is hidden when you go to another activity (home screen, another app, or even another activity within your app such as preferences/settings)
  - write any crucial persistent data here, as this is the only method guaranteed to be called before an activity is killed
- onResume
  - put anything that needs to be done when the activity returns from being hidden here
- onDestroy
  - put anything that needs to be done when the activity is killed here

![](http://developer.android.com/images/activity_lifecycle.png)

#### handling activity state changes

to save persistent changes, in Activity class, override onPause method

- this is because onPause is the only method that's guaranteed to be called when an application is terminated
  source: [http://developer.android.com/guide/topics/fundamentals.html#actlife](http://developer.android.com/guide/topics/fundamentals.html#actlife)

#### handle configuration changes (screen orientation, etc.)

in AndroidManifest.xml, in the activity element, add this:

```
android:configChanges="orientation|keyboardHidden"
```

#### returning data from another activity

you can call another activity from your main activity, and return data from it when the second activity is finished. to do so:

1. in your main activity, create a private constant used internally to determine what you're requesting. Ex:

   ```
   private static final int REQUEST_SECOND_ACTIVITY_DATA = 0;
   ```

1. somewhere in your main activity (in the onOptionsItemSelected function if it's a menu option, for example), call the second activity like so:

   ```
   Intent intent = new Intent(this, SecondActivity.class);
   startActivityForResult(intent, REQUEST_SECOND_ACTIVITY_DATA);
   ```

1. in the second activity, create constants for the data (extras) you wish to return:

   ```
   static final String EXTRA_DATA1 = "android.intent.extra.DATA1";
   static final String EXTRA_DATA2 = "android.intent.extra.DATA2";
   ```

1. still in the second activity, create a new intent, and put the data you want to pass back to the main activity in the intent as extra data:

   ```
   Intent result = new Intent();
   result.putExtra(EXTRA_DATA1, "this is some data");
   result.putExtra(EXTRA_DATA2, "more data");
   ```

1. add this code in the second activity to finish it up:

   ```
   setResult(RESULT_OK, result);
   finish();
   ```

1. in the main activity, override onActivityResult, and make sure you handle the request constant you created in the first step:

   ```
   @Override
   protected void onActivityResultB(int requestCode, int resultCode, Intent data) {
       super.onActivityResult(requestCode, resultCode, data);

       switch(requestCode) {
           case (REQUEST_SECOND_ACTIVITY_DATA) : {
               if (resultCode == Activity.RESULT_OK) {

               }
               break;
   ```

1. you can get the extra data like this:
   ```
   if (resultCode == Activity.RESULT_OK) {
       String data1 = data.getStringExtra(SecondActivity.EXTRA_DATA1);
   ```

#### sending data to another activity

if calling a second activity from your main activity, you can send data to the second activity. here's how:

1. in your main activity, create constants for the data (extras) you wish to send:

   ```
   static final String EXTRA_SOME_DATA = "android.intent.extra.SOME_DATA";
   ```

1. create an intent for the second activity you wish to call:

   ```
   Intent intent = new Intent(this, SecondActivity.class);
   ```

1. put the extra data in the intent:

   ```
   intent.putExtra(EXTRA_SOME_DATA, someData);
   ```

1. start the second activity using the intent you created:

   ```
   startActivity(intent);
   ```

1. in the second activity, get the extra data:

   ```
   someData = getIntent().getExtras().getString(MainActivity.EXTRA_SOME_DATA);
   ```

   or, if you are sending more than just one piece of data:

   ```
   Bundle bundle = this.getIntent().getExtras();
   someData = bundle.getString(MainActivity.EXTRA_SOME_DATA);
   ```

#### starting one activity from another

```
startActivity(new Intent(this, ActivityToShow.class));
```
