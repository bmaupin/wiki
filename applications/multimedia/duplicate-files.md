---
title: Duplicate files
---

#### Remove duplicates

```
rdfind -dryrun true -deleteduplicates true /path1 /path2
```

- Replace `/path1 /path2` with one or more directories to search for duplicates
  - Put the directory containing the originals first and rdfind will delete the others
- Remove `-dryrun true` when you're ready to delete the duplicates

#### Replacing duplicates with symlinks

```
rdfind -dryrun true -makesymlinks true /path1 /path2
```

#### Removing duplicates interactively

```
fdupes -r -dP /path1 /path2
```

You may get an error if you're running an older version of fdupes; in that case, use this command:

```
fdupes -r -d /path1 /path2
```

- Replace `/path1 /path2` with one or more directories to search for duplicates
