---
title: Splunk search
---

## Misc

See:
- [Search command cheat sheet](http://docs.splunk.com/Documentation/Splunk/latest/SearchReference/SearchCheatsheet)
- [Splunk for SQL Users](http://www.innovato.com/splunk/SQLSplunk.html)
- [Popular search commands](http://docs.splunk.com/Documentation/Splunk/latest/SearchReference/ListOfPopularSearchCommands)


#### Get unique values
```
SEARCH | stats count by FIELD
```

or:
```
SEARCH | top FIELD1, FIELD2 limit=100
```
- Default limit is 10
- If more than one field is given, it gives the top values for the combination of the fields


#### Show only certain fields
```
SEARCH | fields FIELD1, FIELD2
```


#### Subsearches
Once you've got the search returning the results you want, you can put it in brackets and use it as a parameter for another search

```
SEARCH [search SUBSEARCH]
```

Ex:
```
sourcetype=SOMESOURCE [search sourcetype=somesource 192.168.0.1 | fields SOMEFIELD | format]
```


#### Format search results to be used as a filter in another search
Use `format`

```
SEARCH | fields FIELD1 | format
```

Returns:
```
((field1=value1) OR (field1=value2) OR (field1=value3))
```


#### Additional search filtering
Use `where`

Ex:
```
| metadata type=hosts | where lastTime > 1297713600
```


#### Reverse search results
Use `reverse`

Ex:
```
SEARCH | reverse
```



## Time

#### Filter by specific hour
Use `date_hour`

Ex:
```
SEARCH | AND date_hour = 6
```

Note that date_hour uses the timezone of the client, not the server



## Macros

#### Openldap macros
These search for a filter in a given connection, and return all the logs for that connection, instead of just the line matching the filter.  the last part makes sure it matches the same connection from the same host.

One filter:
```
sourcetype=openldap [search sourcetype=openldap $filter$ | fields conn, host | format]
```

Usage:
```
`openldap(FILTER)`
```

Ex:
```
`openldap(192.168.0.1)`
```

Two filters:
```
sourcetype=openldap [search sourcetype=openldap [search sourcetype=openldap $filter1$ | fields conn, host | format] $filter2$ | fields conn, host | format]
```

Usage:
```
`openldap(FILTER1, FILTER2)`
```

Ex:
```
`openldap(192.168.0.1, some_uid)`
```
