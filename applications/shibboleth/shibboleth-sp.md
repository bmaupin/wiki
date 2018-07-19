---
title: Shibboleth SP
---

## Misc

#### Common URLs
- Metadata
    - https://sp.example.org/Shibboleth.sso/Metadata

- Login (forces a login to an IdP)
    - https://sp.example.org/Shibboleth.sso/Login

- Show session information (must log in first)
    - https://sp.example.org/Shibboleth.sso/Session


## Common errors

#### `Unknown or Unusable Identity Provider`

Typically the root cause will be listed in the error message itself, for example:

```
opensaml::saml2md::MetadataException: Unable to locate metadata for identity provider (https://idp.example.org/idp/shibboleth)
```
