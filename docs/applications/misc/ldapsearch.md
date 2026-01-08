---
title: Ldapsearch
---

#### Install ldapsearch
Ubuntu/Debian:

    sudo apt-get -y install ldap-utils

RHEL/Centos:

    sudo yum -y install openldap-clients


#### Sample search with common parameters

    ldapsearch -o ldif-wrap=no -LLL -H ldaps://ldap.example.org -x -W -D uid=someuser,cn=accounts,dc=example,dc=org -b dc=example,dc=org sn=Lastname displayname mail

- `-o ldif-wrap=no`
    - Don't wrap results


#### Ignore certificate errors
Use `LDAPTLS_REQCERT=never`:

    LDAPTLS_REQCERT=never ldapsearch


#### Set a timeout

    ldapsearch -o nettimeout=5


#### Get information about an LDAP server

    ldapsearch -H ldaps://ldap.example.org -x -s base


#### Get the number of results returned

    # Don't use -LLL, search for the dn attribute
    ldapsearch ... dn | grep numEntries

Or:

    # Search for the dn attribute
    ldapsearch ... dn | grep ^dn | wc -l



## Active Directory

#### Bind DN
You can search using the userPrincipalName instead of having to enter the full DN. for example:

    ldapsearch -D first.last@example.org

Instead of:

    ldapsearch -D cn=first.last,ou=Users,dc=example,dc=org


#### Show referral
It should already be shown in the search results under `# search reference`


#### Show all results (instead of paged results of 1000 per page)
[https://serverfault.com/a/379865/58568](https://serverfault.com/a/379865/58568)

    ldapsearch -E pr=2147483647/noprompt
