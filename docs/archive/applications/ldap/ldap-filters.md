---
title: LDAP filters
---

#### Not
```
(!(objectClass=user))
```


#### And
```
(&(objectClass=person)(!(objectClass=user)))
```

#### Or
```
(|(objectClass=person)(objectClass=user))
```


#### Sources:
- [http://confluence.atlassian.com/display/DEV/How+to+write+LDAP+search+filters](http://confluence.atlassian.com/display/DEV/How+to+write+LDAP+search+filters)
- [http://www.zytrax.com/books/ldap/apa/search.html](http://www.zytrax.com/books/ldap/apa/search.html)
