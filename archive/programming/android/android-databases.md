---
title: Android databases
---

#### helpful docs:

- [http://developer.android.com/guide/topics/data/data-storage.html#db](http://developer.android.com/guide/topics/data/data-storage.html#db)
- [http://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html](http://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html)
- Hello, Android ch. 9 (p. 171-)
- Wrox Professional Android 2 ch. 7 (p. 209-)

#### examples:

- [http://developer.android.com/resources/samples/SearchableDictionary/src/com/example/android/searchabledict/DictionaryDatabase.html](http://developer.android.com/resources/samples/SearchableDictionary/src/com/example/android/searchabledict/DictionaryDatabase.html)
- [http://developer.android.com/resources/samples/NotePad/src/com/example/android/notepad/NotePadProvider.html](http://developer.android.com/resources/samples/NotePad/src/com/example/android/notepad/NotePadProvider.html)
- [http://github.com/thillerson/oreilly_android/blob/master/Course_1_Task_Manager/Week_5/src/com/oreilly/android/taskmanager/tasks/TasksSQLiteOpenHelper.java](http://github.com/thillerson/oreilly_android/blob/master/Course_1_Task_Manager/Week_5/src/com/oreilly/android/taskmanager/tasks/TasksSQLiteOpenHelper.java)

## creating the database

#### using a database in your app can be done many ways, but the main two ways (for our purposes) are:

1. creating a database within your app

   - it could possibly be said that this is the most "common" way, as most apps will be using that database to store preferences, notes, etc, and any other data the app needs will probably come from the internet

1. creating a database ahead of time and packaging it with your app
   - this is the most efficient method if you want to create an app whose data will be accessible offline ([http://stackoverflow.com/questions/2887119/populate-android-database-from-csv-file](http://stackoverflow.com/questions/2887119/populate-android-database-from-csv-file))

#### creating a SQLite database within your android app

1. create a new class that inherits from android.database.sqlite.SQLiteOpenHelper. see here for sample code:

   [https://github.com/bmaupin/android-sample-code/blob/master/DatabaseHelper.java](https://github.com/bmaupin/android-sample-code/blob/master/DatabaseHelper.java)

1. that's it! to access the database, you'll need to create a database object in your activity. see below under "using the database." also see "querying the database" and "modifying the database" below.

#### creating an SQLite database to package with an android application

- [http://stackoverflow.com/questions/513084/how-to-ship-an-android-application-with-a-database](http://stackoverflow.com/questions/513084/how-to-ship-an-android-application-with-a-database)
- [http://notes.theorbis.net/2010/02/batch-insert-to-sqlite-on-android.html](http://notes.theorbis.net/2010/02/batch-insert-to-sqlite-on-android.html)
- [http://www.reigndesign.com/blog/using-your-own-sqlite-database-in-android-applications/](http://www.reigndesign.com/blog/using-your-own-sqlite-database-in-android-applications/)
- [http://stackoverflow.com/questions/2387421/how-to-use-my-own-sqlite-database](http://stackoverflow.com/questions/2387421/how-to-use-my-own-sqlite-database)

1. gather/organize your data in whatever program you desire

1. export the data to CSV

1. install a SQLite GUI client, such as sqliteman (sudo aptitude install sqliteman)

1. open SQLite client, create your database

   - save it with a .db extension, i.e. mydatabase.db

1. create your table
   - make sure the first column is named "\_id" and has the PRIMARY KEY and AUTOINCREMENT flags
     - **note:** \_id should be lower case! otherwise android will complain, especially when using cursor adapters (SimpleCursorAdapter)
   - Ex:
     ```
     CREATE TABLE "main"."mytable" (
         "_id" INTEGER PRIMARY KEY AUTOINCREMENT,
         "title" TEXT NOT NULL,
         "description" TEXT NOT NULL,
         "tags" TEXT NOT NULL
     );
     ```
1. create a second, temporary table for importing

   - create it just like the first, without the \_id column

1. import your CSV file into the second table

1. copy the data from the second table into the first, like so:
   ```
   INSERT INTO mytable (title, description, tags) SELECT title, description, tags from mytable2;
   ```
1. delete (drop) the second table
   ```
   DROP TABLE mytable2;
   ```
1. create the android metadata table
   ```
   CREATE TABLE "android_metadata" ("locale" TEXT DEFAULT 'en_US');
   ```
1. populate the android metadata table
   ```
   INSERT INTO "android_metadata" VALUES ('en_US');
   ```
1. once you have your database the way you want it, put it in assets/databases

1. create a separate class for accessing your database. see here for sample code:
   [https://github.com/bmaupin/android-sample-code/blob/master/PrepackagedDbHelper.java](https://github.com/bmaupin/android-sample-code/blob/master/PrepackagedDbHelper.java)
1. see sections below on using, querying, and modifying the database

#### tips

- when creating your database cursor from your activity, call startManagingCursor, which will allow the activity to manage the cursor's life cycle for you:
  ```
  startManagingCursor(cursor);
  ```
- android will whine if you don't close your database. One way to handle this may be to close the database helper in your activity's onDestroy method:

  ```
  @Override
  protected void onDestroy() {
      super.onDestroy();
      Log.d(TAG, "onDestroy called");

      // close the database helper so android doesn't whine
      helper.close();
  }
  ```

  (this may not be the best solution, since Android may not always call the onDestroy method, but it's better than not closing the db at all...)

## using the database

#### creating a database object

```
DatabaseHelper dbHelper = new DatabaseHelper(context);
SQLiteDatabase db = dbHelper.getReadableDatabase();
```

#### closing a database object

```
dbHelper.close()
```

## querying the database

#### query format

query (String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit)

- SELECT columns FROM table WHERE selection
- to use selectionArgs, in your selection, you can put question marks:

  `id = ?`

  those will be replaced by the strings in selectionArgs

#### simple query

```
String table = "mytable";
String[] columns = {"id", "name"};
Cursor cursor = db.query(table, columns, null, null, null, null, null);
// the cursor doesn't automatically move to the first item
if (cursor.moveToFirst()) {
    while (!cursor.isAfterLast()) {
        someIntArray.add(cursor.getInt(0));
        someStringArray.add(cursor.getString(1));
        cursor.moveToNext();
    }
}
cursor.close();
```

#### raw query

```
String sql = "SELECT COALESCE(MAX(_id)+1, 0) FROM " + DB_TABLE_NAME;
Cursor cursor = db.rawQuery(sql, null);
if (cursor.moveToFirst()) {
    int existingRows = cursor.getInt(0);
}
cursor.close();
```

#### query from an activity

- in addition to the above, you'll need to call the constructor method of the database to get an instance of the database, somewhere in your activity, for instance in onCreate:
  ```
  DatabaseHelper helper = new DatabaseHelper(this);
  ```
- after creating the cursor, call the activity's startManagingCursor method so the activity will manage the lifecycle of the cursor:
  ```
  startManagingCursor(cursor);
  ```
  note: in Android 3.0, this is deprecated in favor of android.content.CursorLoader
- and don't forget to close the database somewhere in your activity. if nothing else, you can do this in the onDestroy method:
  ```
  helper.close();
  ```

## modifying the database

adding data
TITLE/DESCRIPTION are constants for the DB columns/fields

```
ContentValues cv=new ContentValues();
cv.put(TITLE, "some title");
cv.put(DESCRIPTION, "some value");
// the second parameter just has to be the name of any column in the database
db.insert(DB_TABLE_NAME, TITLE, cv);
```

#### updating data

TITLE/DESCRIPTION are constants for the DB columns/fields

```
String selection = TITLE + " = ?";
String[] selectionArgs = {thisTitle};
ContentValues cv=new ContentValues();
cv.put(DESCRIPTION, "new value");
db.update(DB_TABLE_NAME, cv, selection, selectionArgs);
```
