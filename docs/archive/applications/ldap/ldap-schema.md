---
title: LDAP schema
---

**This is not intended as a comprehensive reference!**

Information retrieved from *.schema files in OpenLDAP schema folder by searching for ^objectclass

- Parentheses indicates parent objectClass
- Bold indicates required attribute


#### person (top) - core.schema
- cn
- sn
- userPassword
- description


#### account (top) - cosine.schema
- userid
- description


#### organizationalRole (top) - core.schema
- cn
- telephoneNumber
- street
- postalCode
- postalAddress
- description


#### simpleSecurityObject (top) - core.schema
- userPassword


#### posixAccount (top) - nis.schema
- cn
- uid
- uidNumber
- gidNumber
- homeDirectory
- userPassword
- loginShell
- description


#### inetOrgPerson (organizationalPerson) - inetorgperson.schema
- displayName
- givenName
- homePhone
- homePostalAddress
- initials
- mail
- uid
