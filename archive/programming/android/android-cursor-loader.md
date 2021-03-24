---
title: Android cursor loader
---

see: [http://developer.android.com/guide/topics/fundamentals/loaders.html](http://developer.android.com/guide/topics/fundamentals/loaders.html)

#### notes

- reasons to use CursorLoader:
  - you must use CursorLoader instead of Activity.managedQuery or Activity.startManagingCursor starting in android 3.0. you should use it if you want your app to be compatible with android 3.0 or greater.
  - queries are automatically handled asynchronously
  - CursorLoader auto updates, so no need to requery the cursor
- CursorLoader will handle the life cycle of the cursor for you. when using CursorLoader, you should never call close() on the cursor. this is handled for you

#### using cursor loaders with android < 3.0

1. you need to use the compatibility library

   [http://developer.android.com/sdk/compatibility-library.html](http://developer.android.com/sdk/compatibility-library.html)

   - follow these instructions on setting it up:[
     http://developer.android.com/sdk/compatibility-library.html#SettingUp](http://developer.android.com/sdk/compatibility-library.html#SettingUp)

1. your activity must extend FragmentActivity

1. you will probably need to import these classes:
   ```
   import android.support.v4.app.FragmentActivity;
   import android.support.v4.app.LoaderManager;
   ```
1. if you're using SimpleCursorAdapter, make sure you replace this line:

   ```
   import android.widget.SimpleCursorAdapter;
   ```

   with this:

   ```
   import android.support.v4.widget.SimpleCursorAdapter;
   ```

#### using cursor loaders

1. your activity needs to implement LoaderManager.LoaderCallbacks:

   ```
   public class MyActivity implements LoaderManager.LoaderCallbacks<Cursor> {
   ```

1. initialize the loader

   1. android < 3.0:

      ```
      getSupportLoaderManager().initLoader(0, null, this);
      ```

   1. android >= 3.0:
      ```
      getLoaderManager().initLoader(0, null, this);
      ```

1. implement the loader callback methods

   1. onCreateLoader

      - this is where you create the cursor

        Ex:

        ```
        @Override
        public Loader<Cursor> onCreateLoader(int id, Bundle args) {
            ...
            return new CursorLoader(this,
                    uri,
                    projection,
                    selection,
                    selectionArgs,
                    sortOrder
            );
        }
        ```

   1. onLoadFinished

      - this is called once the cursor's data is finished loading, and you can start using the cursor

      - An example for what to do when using a cursor adapter:
        ```
        @Override
        public void onLoadFinished(Loader<Cursor> loader, Cursor data) {
            // Swap the new cursor in.  (The framework will take care of closing the
            // old cursor once we return.)
            myAdapter.swapCursor(data);
        }
        ```

   1. onLoaderReset

      - this is called when a loader is being reset in order to create a new cursor to query different data. here you need to make sure you're done using the cursor

      - An example for what to do when using a cursor adapter:
        ```
        @Override
        public void onLoaderReset(Loader<Cursor> loader) {
            // This is called when the last Cursor provided to onLoadFinished()
            // above is about to be closed.  We need to make sure we are no
            // longer using it.
            myAdapter.swapCursor(null);
        }
        ```

#### resetting a cursor loader

reset the cursor loader when you want to start a new query with new criteria:

- android < 3.0:

  ```
  getSupportLoaderManager().restartLoader(0, null, this);
  ```

- android >= 3.0:
  ```
  getLoaderManager().restartLoader(0, null, this);
  ```
