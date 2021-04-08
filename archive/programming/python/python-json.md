---
title: Python JSON
---

```
# json module requires Python 2.6; for Python < 2.6 use simplejson
# also see: http://stackoverflow.com/a/16131316/399105
try:
    import json
except ImportError:
    import simplejson as json

url = 'https://query.yahooapis.com/v1/public/yql?q=select+%2A+from+yahoo.finance.historicaldata+where+symbol+%3D+%22MSFT%22+and+startDate+%3D+%222013-11-04%22+and+endDate+%3D+%222014-04-09%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
with contextlib.closing(urllib2.urlopen(url)) as u:
    j = json.load(u)

# j will be a dict containing the decoded JSON in unicode. Ex:

for item in j['query']['results']['quote']:
    print '%s\t%s' % (item['Date'], item['Adj_Close'])
```
