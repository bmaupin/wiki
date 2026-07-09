---
title: Python dates/times
---

#### Notes:

- If you're trying to time your script, use datetime

#### Also see:

- [http://pleac.sourceforge.net/pleac_python/datesandtimes.html](http://pleac.sourceforge.net/pleac_python/datesandtimes.html)
- [http://www.saltycrane.com/blog/2008/11/python-datetime-time-conversions/](http://www.saltycrane.com/blog/2008/11/python-datetime-time-conversions/)

#### Get the current time

```
datetime.datetime.now()
time.localtime()
```

#### Convert unix/epoch time to datetime object

```
import datetime
some_time = datetime.datetime.fromtimestamp(unix_time)
```

#### Convert datetime object to unix/epoch time

```
import time
time.mktime(some_time.timetuple())
```

(where some_time is the datetime object)

#### Convert timestamp string to datetime object

```
import datetime
date = '20100319'

# python < 2.5 doesn't have datetime.datetime.strptime()
if sys.version_info < (2, 5):
    import time
    somedate = datetime.datetime(*(time.strptime(date, '%Y%m%d')[0:6]))
else:
    somedate = datetime.datetime.strptime(date, '%Y%m%d')
```

#### Print datetime object

```
print(dt.strftime('%Y-%m-%d %H:%M:%S'))
'2013-08-16 15:01:26'
```

#### Differences between datetime and time:

datetime:

- Has microseconds (time doesn't)
- The difference between datetime objects can be calculated

time:

- Can tell time zone (datetime can't?)
