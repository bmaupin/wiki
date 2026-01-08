---
title: Android application persistence
---

#### to store data that will persist between application instances:

- use one of the methods described here:[
  http://developer.android.com/guide/topics/data/data-storage.html](http://developer.android.com/guide/topics/data/data-storage.html)

  e.g. shared preferences, database, etc.

#### to store key, value data only for an application's lifetime:

- use onSaveInstanceState and onRestoreInstanceState

  examples:

  - [http://stackoverflow.com/questions/151777/how-do-i-save-an-android-applications-state/151940#151940](https://stackoverflow.com/a/151940/399105)
  - [http://www.eigo.co.uk/Managing-State-in-an-Android-Activity.aspx#Store-State-in-State-Bundle](http://www.eigo.co.uk/Managing-State-in-an-Android-Activity.aspx#Store-State-in-State-Bundle)

#### to store object instances for an application's lifetime:

- use onRetainNonConfigurationInstance:
  [http://www.eigo.co.uk/Managing-State-in-an-Android-Activity.aspx#How-to-Store-Object-Instances](http://www.eigo.co.uk/Managing-State-in-an-Android-Activity.aspx#How-to-Store-Object-Instances)

#### to cache data temporarily:

- use a singleton
  - source: [http://developer.android.com/reference/android/app/Application.html](http://developer.android.com/reference/android/app/Application.html)
  - note that singletons can be destroyed at any time by the system
- you can instantiate Android's Application class, but it provides no benefits over creating a singleton; it has no life cycle, and the system can destroy it at any time
  [http://stackoverflow.com/questions/3826905/singletons-vs-application-context-in-android#comment-8239632](https://stackoverflow.com/q/3826905/399105)

#### to connect to the same database in different activities of the same application:

- open the database connection in each activity's OnResume method, close it in the OnPause method:
  [http://stackoverflow.com/questions/1556930/sharing-sqlite-database-between-multiple-android-activities/1557465#1557465](https://stackoverflow.com/a/1557465/399105)
  - this is because you can't have multiple connections to the same database (at least not write connections) due to locking
  - even if it did work, it wouldn't be wise. opening and closing the database is the best and safest way
    [http://stackoverflow.com/questions/1905846/android-accessing-single-database-from-multiple-activities-in-application/1906047#1906047](https://stackoverflow.com/a/1906047/399105)
