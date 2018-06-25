---
title: Apache LDAP modules
---

#### Modules
- [mod_authnz_ldap](http://httpd.apache.org/docs/2.2/mod/mod_authnz_ldap.html) (preferred)
    - Provided by apache
    - For Apache versions 2.1 and later
    - "This module is a port of the 2.0 mod_auth_ldap module to the 2.2 Authn/Authz framework. New features include using LDAP attribute values and complicated search filters in the Require directive."
    - To enable:

            AuthType basic
            AuthBasicProvider ldap

- [mod_auth_ldap](http://httpd.apache.org/docs/2.0/mod/mod_auth_ldap.html)
    - Provided by apache
    - For Apache versions before 2.1
- [mod_authz_ldap](http://authzldap.othello.ch/)
    - Third-party module
    - Identified by AuthzLDAP* directives


#### Convert from mod_authz_ldap to mod_authnz_ldap:

| mod_authz_ldap | mod_authnz_ldap |
| -------------- | --------------- |
| `AuthName "Restricted Directory"` | `AuthName "Restricted Directory"` |
| `AuthType Basic` | `AuthType Basic` |
| `AuthzLDAPMethod ldap` | `AuthBasicProvider ldap` |
| `AuthzLDAPBindDN uid=webauth,ou=accounts,dc=example,dc=com` | `AuthLDAPBindDN uid=webauth,ou=accounts,dc=example,dc=com` |
| `AuthzLDAPBindPassword webauthpass` | `AuthLDAPBindPassword webauthpass` |
| `AuthzLDAPServer "ldap.example.com"`<br>`AuthzLDAPUserBase ou=accounts,dc=example,dc=com`<br>`AuthzLDAPUserKey uid` | `AuthLDAPURL ldaps://ldap.example.com/ou=accounts,dc=example,dc=com?uid` |
| `Require user jsmith` | `Require ldap-user jsmith` |
