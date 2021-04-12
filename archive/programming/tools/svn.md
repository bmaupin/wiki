---
title: Subversion (SVN)
---

## Misc

#### Check out a repository

```
svn co https://repo/url/trunk local_destination_folder
```

<p></p>
```
svn co file:///opt/svnroot/my_repo .
```

#### Import an unversioned folder into svn

```
svn import folder_name https://repo/url/trunk -m "initial import"
```

#### Choose to not add a file/folder to the svn repository:

```
export SVN_EDITOR=vim && svn propedit svn:ignore .
```

Add the names/paths to the files (one per line), save, exit (`:wq!`)

#### Set Id keyword

```
svn propset svn:keywords "Id" ./path/to/file
```

#### Merge

```
svn merge -r OLD_REVISION:REVISION_YOU_WANT_TO_GO_TO SOURCE DESTINATION
```

Ex:

```
svn merge -r 1428:1521 ../../trunk/wp-includes/ wp-includes
```

or:

```
svn merge HTTP_SOURCE_1 HTTP_SOURCE_2 DESTINATION
```

Ex:

```
svn merge https://svn.example.com/myproject/trunk/ https://svn.example.com/myproject/test myproject/prod
```

or:

```
svn merge -r OLD_REVISION:REVISION_YOU_WANT_TO_GO_TO DESTINATION
```

Ex:

```
svn merge -r 1428:1521 wp-includes
```

#### View details about a specific commit

```
svn log -r REVISION
```

Include affected paths:

```
svn log -v -r REVISION
```

#### Restore a deleted file/folder

1. Use svn log to get the revision where the file/folder was deleted

   ```
   $ svn log -r 3881
   ------------------------------------------------------------------------
   r3881 | user | 2015-03-27 11:59:04 -0400 (Fri, 27 Mar 2015) | 1 line

   Delete myfolder
   ```

1. Use svn cp to copy the file from the last known good revision to the current working copy

   ```
   svn cp ^/trunk/myfolder@3880 trunk
   ```

1. Verify everything and then commit

#### Get a different revision of a file

```
svn update -r REVISION PATH
```

Ex:

```
svn update -r 4186 attribute-filter.xml
```

## Creating repos

#### Create a repository

```
svnadmin create /opt/svnroot/MYPROJECT
```

#### Create trunk

```
svn mkdir file:///opt/svnroot/MYPROJECT/trunk -m "created trunk"
```
