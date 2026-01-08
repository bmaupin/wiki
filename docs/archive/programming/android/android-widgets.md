---
title: Android widgets
---

[http://developer.android.com/guide/topics/appwidgets/index.html](http://developer.android.com/guide/topics/appwidgets/index.html)

[http://developer.android.com/guide/practices/ui_guidelines/widget_design.html](http://developer.android.com/guide/practices/ui_guidelines/widget_design.html)

Hello, Android p. 217

1. create a new android project with no activity
1. create a receiver in AndroidManifest.xml
1. create widget definition in res/xml/widget.xml
   - [http://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo.html](http://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo.html)
1. create the layout for the widget in res/layout
1. create the widget class, extending android.appwidget.AppWidgetProvider
