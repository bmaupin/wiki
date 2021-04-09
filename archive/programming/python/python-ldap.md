---
title: Python LDAP
---

use [python-ldap](http://www.python-ldap.org/)

#### LDAPObject.search() returns:

```
[[dn, {key: [value, value], key: [value]}], [dn, {key: value}]]
```

<p></p>
```
search_results[entry_index][0][DN]
```
<p></p>
```
search_results[entry_index][1][attribute][value_index][value]
```

![](https://sites.google.com/site/bmaupinwiki/home/programming/python/python-ldap/python-ldap-67.png)
