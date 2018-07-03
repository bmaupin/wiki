---
title: OpenLDAP notes
---

#### Change ownership of database files
```
sudo chown ldap:ldap /path/to/var/openldap-data/ -R
sudo chown ldap:ldap /path/to/var/log/bdb/ -R
```


#### Importing via slapadd
This is the recommended way as it is much faster than importing via ldapadd
```
slapadd -b "dc=example,dc=com" -q -w -l /path/to/directory.ldif
```


#### Importing via ldapadd
```
sudo /sbin/service ldap start

cat >slapcat_ldapadd.ldif <<EOF
/^contextCSN: /d
/^creatorsName: /d
/^createTimestamp: /d
/^modifiersName: /d
/^modifyTimestamp: /d
/^structuralObjectClass: /d
/^entryUUID: /d
/^entryCSN: /d
EOF

cat directory.ldif | sed -f slapcat_ldapadd.ldif > directory-ldapadd.ldif

ldapadd -D "cn=root,dc=example,dc=com" -x -W -f directory-ldapadd.ldif
```


#### Exporting via slapcat
```
sudo /sbin/service ldap stop
/path/to/slapcat -b 'dc=example,dc=com' [-f /path/to/slapd.conf] -l /path/to/dump.ldif
```

You can also do a partial dump using the -a flag.  for example to only get entries from a specific ou/branch:
```
slapcat -a '(entryDN:dnSubtreeMatch:=ou=People,dc=example,dc=com)'
```


#### Basic ACL
```
# necessary for SASL
access to dn.exact=""
    by * read

# necessary for authentication
access to attrs="userPassword"
    by * auth
    by * break

access to *
    by dn="uid=myaccount,ou=accounts,dc=example,dc=com" read
    by * break
```


#### Encoding userPassword attribute
If the password is to be stored in LDAP, the most secure algorithm is currently salted SHA (SSHA) ([http://www.openldap.org/doc/admin24/security.html#Password%20Storage](http://www.openldap.org/doc/admin24/security.html#Password%20Storage))

To generate an SSHA-encrypted password:
```
slappasswd -h {SSHA} -s password
```

To use the OpenLDAP monitor:
[http://www.openldap.org/doc/admin24/monitoringslapd.html](http://www.openldap.org/doc/admin24/monitoringslapd.html)
First, it must be enabled. The core schema must be included, and this line must be in slapd.conf:

```
database monitor
```

The monitor is then accessible from the subtree cn=Monitor. Make sure that the permissions are set up for the account and machine that you are using in the ACL.

Test it:
```
ldapsearch -x -D uid=myaccount,cn=accounts,dc=example,dc=com -b cn=Monitor -s base 1.1 -W
ldapsearch -x -D uid=myaccount,cn=accounts,dc=example,dc=com -b cn=listeners,cn=Monitor -W
ldapsearch -x -D uid=myaccount,cn=accounts,dc=example,dc=com -b cn=connections,cn=Monitor '+' -W
```


#### To change an LDAP replica server to the master
1. Comment any syncrepl, updateref, and overlay syncprov lines in /etc/openldap/slapd.conf
2. restart ldap/slapd


#### If a client is having problems with the LDAP server cert:
(This is probably not the best idea; a better idea would be to add the LDAP certs to the LDAP CA cert file/path)

Add the following line to ldap.conf (in RHEL, this is /etc/openldap/ldap.conf):
```
TLS_REQCERT never
```


#### Decoding base64-encoded attributes (userPassword, etc)
Many strings in OpenLDAP are encoded in base64. To decode them in bash:

```
echo -n dGVzdA== | base64 -d && echo
```

#### Search the root DSE
```
ldapsearch -H ldaps://ldap.example.com -x -b "" -s base "(objectclass=*)" \* +
```
