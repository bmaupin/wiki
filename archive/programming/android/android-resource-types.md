---
title: Android resource types
---

see: [http://developer.android.com/guide/topics/resources/available-resources.html](http://developer.android.com/guide/topics/resources/available-resources.html)

## general

#### assigning IDs to resources

```
android:id="@+id/some_resource"
```

#### referencing resources with IDs in XML

```
android:text="@id/some_resource"
```

#### referencing resources with IDs in code

```
R.id.some_resource
```

#### referencing resources in XML

- many resources in the various subfolders under res can be referenced from other XML resource files in the various subfolders under res such as:
  - res/layout
  - res/menu
  - res/xml

## strings

see: [http://developer.android.com/guide/topics/resources/string-resource.html](http://developer.android.com/guide/topics/resources/string-resource.html)

res/values/strings.xml

#### strings.xml example

```
<resources>
    <string name="hello">Hello World!</string>
    <string name="app_name">My Android App</string>
</resources>
```

#### referencing strings in XML

```
<TextView
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:text="@string/app_name"
    />
```

#### referencing strings in Java

```
String string = getString(R.string.app_name);
```

to retain rich text formatting:

```
String string = getText(R.string.app_name);
```

## string arrays

see: [http://developer.android.com/guide/topics/resources/string-resource.html#StringArray](http://developer.android.com/guide/topics/resources/string-resource.html#StringArray)

res/values/arrays.xml

#### arrays.xml example

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string-array name="string_array_name">
        <item>text_string</item>
        <item>text_string_2</item>
    </string-array>
</resources>
```

#### referencing arrays in Java

```
Resources res = getResources();
String[] planets = res.getStringArray(R.array.string_array_name);
```

## colors

res/values/colors.xml

**note:** android has its own built-in color definitions, which you can use like this:

```
@android:color/white
@android:color/black
```

#### colors.xml example

```
<resources>
    <color name="red_background">#FF0000</color>
</resources>
```

#### referencing colors in XML example

```
android:background="@color/red_background"
```
