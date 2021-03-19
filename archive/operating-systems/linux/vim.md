---
title: Vim
---

#### Open a file to a specific line

```
vim /path/to/file -c <line number>
```

#### Go to a specific line in vim

```
:<line number>
```

#### Temporarily disable inserting spaces when tab key is pressed

```
:set noexpandtab
```

#### Enable hex editing mode

```
:%!xxd
```

Open a file directly into hex edit mode (**warning:** this will first read the entire file into memory)

```
xxd system.raw.img | vim -
```

#### Turn off auto indent when pasting

[http://stackoverflow.com/a/2514520/399105](http://stackoverflow.com/a/2514520/399105)

```
:set paste
```

Turn auto indent back on

```
:set nopaste
```
