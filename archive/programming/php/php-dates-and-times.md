---
title: PHP Dates and Times
---

#### Get current time as epoch timestamp

```
$now = time();
```

#### Get formatted current time

```
$now = date("Y-m-d H:i:s");
```

#### Convert epoch time to readable format

```
$time = date("Y-m-d H:i:s", $epoch);
```

#### Convert Microsoft's [FILETIME](https://docs.microsoft.com/windows/win32/api/minwinbase/ns-minwinbase-filetime) to epoch

```
$epoch = ($filetime / 10000000) - 11644473600;
```
