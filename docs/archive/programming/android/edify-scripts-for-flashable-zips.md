---
title: Edify scripts (for flashable zips)
---

Reference: [https://source.android.com/devices/tech/ota/inside_packages.html#edify-syntax](https://source.android.com/devices/tech/ota/inside_packages.html#edify-syntax)

#### If the script has any errors

- Before checking anything else, make sure all commands end in semicolons
  - In `if` statements, anything between and including `if` and `then` shouldn't end in semicolons

#### Create a progress bar

```
# Create and show a progress bar that can go up to 100%
show_progress(1,0);
```

#### Updating a progress bar

```
# Update progress to 50%
set_progress(0.5);
# Update progress to 100%
set_progress(1);
```

#### Check to see if a file exists

```
if
    sha1_check(read_file("/system/bin/bootanimation")) != ""
then
    ui_print("/system/bin/bootanimation exists");
endif;
```

```
if
    sha1_check(read_file("/system/bin/bootanimation.bak")) == ""
then
    ui_print("/system/bin/bootanimation.bak does not exist");
endif;
```

#### Check to see if a property exists

```
if
    getprop("ro.product.device") != ""
then
    ui_print("ro.product.device exists");
endif;
```

```
if
    getprop("not.a.prop") == ""
then
    ui_print("not.a.prop does not exist");
endif;
```

#### Get a property directly from a file

```
file_getprop("/system/build.prop", "ro.product.device");
```

#### Move a file

<span style="color:red">**Warning:**</span> this will overwrite the destination file

```
rename("/system/bin/bootanimation", "/system/bin/bootanimation.bak");
```

#### Copy a file

Edify doesn't have a command for this, but we can cheat :)

```
run_program("/sbin/cp", "/dev/block/bootdevice/by-name/logo", "/sdcard/logo.bin.bak");
```
