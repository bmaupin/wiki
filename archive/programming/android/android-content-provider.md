---
title: Android content provider
---

#### helpful documentation

- [http://developer.android.com/guide/topics/providers/content-providers.html#creating](http://developer.android.com/guide/topics/providers/content-providers.html#creating)

#### examples

- [http://developer.android.com/resources/samples/NotePad/src/com/example/android/notepad/NotePadProvider.html](http://developer.android.com/resources/samples/NotePad/src/com/example/android/notepad/NotePadProvider.html)
- [http://developer.android.com/resources/samples/NotePad/src/com/example/android/notepad/NotePad.html](http://developer.android.com/resources/samples/NotePad/src/com/example/android/notepad/NotePad.html)

#### planning a content provider

- a content provider is made up of a combination of data type paths (/people, /people/phones) and intance IDs (person 1, phone 1 of person 1)

- come up with URI paths for each data type and instance you wish to access
  Ex:
  - /people (to access all people)
  - /people/# (to access a specific person)
  - /people/#/phones (to access that person's phone numbers)
  - /people/#/phones/# (to access a specific phone number for a specific person)

#### creating a content provider

1. create a new class that extends android.content.ContentProvider

   ```
   public class MyProvider extends ContentProvider {
   ```

1. add the provider to the android manifest

   ```
   <provider android:name=".MyProvider"
             android:authorities="com.example.myapp.myprovider" >
             <grant-uri-permission android:pathPattern=".*" />
   </provider>
   ```

   - if desired, make the content provider private
     ```
     android:exported="false"
     ```

1. create some constants

   - AUTHORITY

     - use fully-qualified class name of the provider, lower-case

       Ex:

       ```
       public static final String AUTHORITY = "com.example.myapp.myprovider";
       ```

   - paths

     - create path constants for every path segment you defined when planning your URIs

       Ex:

       ```
       private static final String PATH_PEOPLE = "people";
       private static final String PATH_PHONES = "phones";
       ```

   - content URIs

     - create a content URI for each type of content accessible through your provider

       Ex:

       ```
       public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITY + "/" + PEOPLE);
       ```

   - URI patterns

     - create constants to identify each URI pattern

       Ex:

       ```
       private static final int PEOPLE = 1;
       private static final int PEOPLE_ID = 2;
       private static final int PEOPLE_PHONES = 3;
       private static final int PEOPLE_PHONES_ID = 4;
       ```

1. create a static URI matcher that matches URI patterns with the constants you created

   Ex:

   ```
   private static final UriMatcher sUriMatcher;

   static {
       sUriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
       sUriMatcher.addURI(AUTHORITY, PATH_PEOPLE, PEOPLE);
       sUriMatcher.addURI(AUTHORITY, PATH_PEOPLE + "/#", PEOPLE_ID);
       sUriMatcher.addURI(AUTHORITY, PATH_PEOPLE + "/#" + PATH_PHONES, PEOPLE_PHONES);
       sUriMatcher.addURI(AUTHORITY, PATH_PEOPLE + "/#" + PATH_PHONES + "/#", PEOPLE_PHONES_ID);
   }
   ```

1. override onCreate()

   - get an instance of your database helper class:
     ```
     dbHelper = new MyDatabaseHelper(getContext());
     ```

1. override query()

   - create a query builder instance:

     ```
     SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
     qb.setTables(MyDatabaseHelper.MY_TABLE_NAME);
     ```

   - modify the query for each URI pattern constant:
     ```
     switch (sUriMatcher.match(uri)) {
     case PEOPLE:
         break;
     case PEOPLE_ID...
     ```
