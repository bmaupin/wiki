---
title: Android views
---

#### get a view by resource ID

```
context.findViewById(R.id.my_view);
```

or:

```
myParentView.findViewById(R.id.my_child_view);
```

#### add a resource ID to a view in XML

```
android:id="@+id/my_view"
```

#### listview

- binding a ListActivity to a ListView:
  - [http://developer.android.com/reference/android/app/ListActivity.html](http://developer.android.com/reference/android/app/ListActivity.html)
  - [http://www.vogella.de/articles/AndroidListView/article.html](http://www.vogella.de/articles/AndroidListView/article.html)
- don't use wrap_content for listview layout_height

  [https://stackoverflow.com/a/7588931/399105](https://stackoverflow.com/a/7588931/399105)

- if you use a custom adapter, and a custom getView method in that adapter, make use of convertView and a viewHolder to further speed up your listview

  [http://dl.google.com/googleio/2010/android-world-of-listview-android.pdf](http://dl.google.com/googleio/2010/android-world-of-listview-android.pdf)

  - page 16

#### create a webview

[http://developer.android.com/resources/tutorials/views/hello-webview.html](http://developer.android.com/resources/tutorials/views/hello-webview.html)
