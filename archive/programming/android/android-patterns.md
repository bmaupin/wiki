---
title: Android patterns
---

#### [Activities](http://developer.android.com/reference/android/app/Activity.html)

- ListActivity
  - Mostly deprecated; use a ListFragment instead (see below)

#### [Content providers](http://developer.android.com/guide/topics/providers/content-providers.html)

- Provides an interface for providing content that can be used by other applications or activities within the same application
- Clients access a content provider using [ContentResolver](http://developer.android.com/reference/android/content/ContentResolver.html)
- Asynchronously queried using a [CursorLoader](https://developer.android.com/training/load-data-background/setup-loader.html)

#### [Fragments](http://developer.android.com/guide/components/fragments.html)

- To use ListFragment with CursorLoader and ActionBarActivity:
  - Have the fragment itself (not the activity) implement LoaderManager.LoaderCallbacks and override the requisite methods
  - Set the list adapter in onCreateView in the fragment class
  - For more information, see:
    - [ListFragment](http://developer.android.com/reference/android/app/ListFragment.html)
    - [CursorLoader](https://developer.android.com/training/load-data-background/setup-loader.html)
    - [List View](http://developer.android.com/guide/topics/ui/layout/listview.html)
      - SimpleCursorAdapter
    - [ListActivity](http://developer.android.com/reference/android/app/ListActivity.html)
      - SimpleCursorAdapter
