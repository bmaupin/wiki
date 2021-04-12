---
title: CVS
---

#### Make a commit

The message has to come first:

```
cvs commit -m "Message" /path/to/file
```

#### Commit multiple files

```
cvs commit -m "Message" /path/to/file1 /path/to/file2
```

#### Add a new file

```
cvs add /path/to/file
cvs commit -m "Message" /path/to/file
```

#### Show the differences between two revisions of a file

```
cvs diff -r 1.23 -r 1.19 /path/to/file
```
