---
title: Android dialogs
---

see: [http://developer.android.com/guide/topics/ui/dialogs.html](http://developer.android.com/guide/topics/ui/dialogs.html)

#### creating a dialog

1. in your activity, create a unique ID constant for your dialog:
   ```
   // unique dialog id
   private static final int DIALOG_SELECT_COLOR_ID = 0;
   ```
1. in your activity, override onCreateDialog:
   ```
   @Override
   protected Dialog onCreateDialog(int id) {
       switch (id) {
           case DIALOG_SELECT_COLOR_ID:
               return createSelectColorDialog();
       }
       return null;
   }
   ```
1. create the function that creates the dialog:

   ```
   private Dialog createSelectColorDialog() {
       final CharSequence[] items = {"Red", "Green", "Blue"};

       AlertDialog.Builder builder = new AlertDialog.Builder(this);
       builder.setTitle("Pick a color");
       builder.setItems(items, new DialogInterface.OnClickListener() {
           public void onClick(DialogInterface dialog, int item) {
               Toast.makeText(getApplicationContext(), items[item], Toast.LENGTH_SHORT).show();
           }
       });
       AlertDialog ad = builder.create();
       return ad;
   }
   ```

1. lastly, in your activity call showDialog where you want to show the dialog:
   ```
   showDialog(DIALOG_SELECT_COLOR_ID);
   ```

#### use a custom view in your dialog

do this when you want to put one custom view (EditText) in your dialog

1. in the method that creates the dialog, create the view:
   ```
   private Dialog createSelectColorDialog() {
       final EditText tv = new EditText(this);
   ```
1. in your AlertDialog Builder, set the view to the custom view:
   ```
   AlertDialog.Builder builder = new AlertDialog.Builder(this);
   builder.setView(tv);
   ```

#### using a custom layout for your dialog

do this when you want to put multiple views in your dialog

1. in res/layout, create the XML for the custom layout

   Ex: res/layout/dialog_select_color.xml

1. give the main layout element of your layout a resource ID:

   ```
   <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
       android:id="@+id/dialog_select_color_layout"
   ```

1. in the method that creates the dialog, get the main layout element:

   ```
   private Dialog createSelectColorDialog() {
       View layout = LayoutInflater.from(this).inflate(
               R.layout.dialog_select_color,
               (ViewGroup) findViewById(R.id.dialog_select_color_layout));
   ```

1. in your AlertDialog Builder, set the view to the custom layout:
   ```
   AlertDialog.Builder builder = new AlertDialog.Builder(this);
   builder.setView(layout);
   ```
