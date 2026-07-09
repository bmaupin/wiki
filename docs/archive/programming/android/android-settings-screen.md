---
title: Android settings screen
---

**note:** this assumes you've already set up a menu with at least a Preferences/Settings option. If you haven't, see here: [android menu](https://sites.google.com/site/bmaupinwiki/home/programming/android/android-menu)

1. create a new class, extending PreferenceActivity
   ```
   public class Preferences extends PreferenceActivity {
   ```
1. create res/xml/preferences.xml containing settings values you want

   - types of preferences include:

     - CheckBoxPreference (simple checkbox)
     - ListPreference (choose one option from a list)
     - EditTextPreference (allows you to edit a string)
     - DialogPreference (custom dialog)
     - MultiSelectListPreference (check multiple options from a list)
     - another embedded PreferenceScreen

   - for a sample preferences.xml, see here:

     - [http://developer.android.com/reference/android/preference/PreferenceScreen.html](http://developer.android.com/reference/android/preference/PreferenceScreen.html)
     - [http://www.kaloer.com/android-preferences](http://www.kaloer.com/android-preferences)

   - ListPreference requires reference to an array of entries and an array of entry values, stored in /res/values/arrays.xml

     see here for a sample arrays.xml:

     [http://developer.android.com/resources/samples/ApiDemos/res/values/arrays.html](http://developer.android.com/resources/samples/ApiDemos/res/values/arrays.html)

   - store keys of preferences in strings.xml

1. within the onCreate method of the Preferences class, add this line to get the preferences from the XML file:
   ```
   addPreferencesFromResource(R.xml.preferences);
   ```
1. add a method to the Preferences class to retrieve the values for your preferences, like this:
   ```
   public static String getDefaultLang(Context context) {
       return PreferenceManager.getDefaultSharedPreferences(context)
              .getString("defaultLang", "english");
   }
   ```
1. add your new Preferences class as an Activity to AndroidManifest.xml:

   ```
   <activity android:name=".Preferences"
             android:label="@string/preferences_title"
             android:theme="@android:style/Theme">
   </activity>
   ```

   (here the default theme is specified to ensure the title is displayed)

1. in your main Activity class, in the onOptionsItemSelected method, add an intent to make sure your Preferences class gets called when the user clicks the Preferences/Settings button in the menu:
   ```
   case R.id.menu_preferences:
       startActivity(new Intent(this, Preferences.class));
       return true;
   }
   ```
1. lastly, call the method(s) you created in your Preferences class to retrieve the values for your preferences, in onCreate and/or elsewhere:
   ```
   defaultLang = Preferences.getDefaultLang(this);
   ```

#### to refer to a particular preference in your PreferenceActivity:

```
Preference somePreference = findPreference(getString(R.string.preferences_some_preference);
```

(the resource string you refer to is what you used as the key for the preference)
