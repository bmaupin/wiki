---
title: OAuth
---

## Vocabulary

- OAuth: loosely structured authorisation framework
  - It is not a specification and intentionally leaves many aspects undefinied in order to be more future-proof
  - The basic OAuth RFC is minimal and has been added to through a number of optional extensions
- Resource server: the server containing the resource to be accessed
- Authorisation server: the OAuth server
- Endpoints: various URLs on the OAuth server
- Grant type (also known as flow): the method used to request access
- Scope: permissions to the resource that are being requested
- Token: used to get access to the resource
- Claim: information about an entity (e.g. a user)
  - Claims are the fields in the token
- OpenID Connect (OIDC): OAuth extension
- JSON Web Token (JWT): a common type of token used with OAuth

## Resources

- [https://jwt.io/](https://jwt.io/) can be used to decode JWT tokens

## OAuth endpoints

#### Required endpoints

- /authorize: TODO
- /token: endpoint used to trade an authorisation code or refresh token for an access token
- /userinfo (OIDC only): returns information about an authenticated user

#### Optional endpoints

- /.well-known/oauth-authorization-server: returns metadata about the OAuth server
- /introspect: returns information about a token (contents, whether it's valid, expired, revoked, etc.)
  - This can be especially useful for OAuth environments that don't use JWTs since it may not be possible to read their contents otherwise (e.g. for opaque tokens)
- /revoke: endpoint to revoke an access or refresh token

## Grant types/flows

#### Authorisation code

Used for server-side applications only.

#### PKCE

An extension to Authorisation code flow used for applications that have a client-side component (in addition to server-side), e.g. mobile apps or single-page applications (SPAs).

#### Client credentials

Used for machine-to-machine auth where a user is not involved, e.g. for one API to access another API. The client system is acting on behalf of itself, not on behalf of a user. Client credentials flow is the simplest and allows machine-to-machine to be secured with the benefits of OAuth; ecosystem (libraries, etc), existing knowledge, and a common framework that allows swapping one backend for another if needed.

⚠️ Client credentials flow should never be used for mobile or single-page applications (SPAs)

1. Client system requests an access token from the authorisation server using a client ID and secret
1. Authorisation server returns an access token
1. Client system sends access token to resource server for access
1. Resource server validates the access token and grants access if the token is valid

ⓘ Client credentials flow does not need refresh tokens. Some OAuth servers may send a refresh token with the access token, but it's just as easy to get a new access token using the client ID/secret.

#### Device code

Used for devices that don't have a browser.

#### Implicit

Deprecated; use Authorization code with PKCE instead.

## Tokens

#### Types of tokens

- Access token: used to access protected resources
  - Access tokens may be opaque tokens or JWTs
- Refresh token: given alongside the access token, can be used to get a new access token when the access token expires
  - Typically has a longer lifetime than the access token
  - Refresh tokens are normally opaque tokens
- ID token (OIDC only)
  - ID tokens must be JWTs

#### Token formats

- Opaque tokens
  - A string that may be meaningless and/or undecipherable
  - This can be given to the /introspect endpoint to get more information
- JSON Web Tokens (JWTs)
  - JWTs are a type of token commonly used with OAuth (but not required)
  - JWTs are base-64 encoded but are not encrypted
  - Unlike opaque tokens, JWTs contain the token claims formatted as JSON
  - JWTs can be decoded and the contents can be read
  - JWTs

#### JSON Web Tokens (JWTs)

Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

This contains three parts, separated by periods (`.`):

- Header (base-64-encoded JSON)
  - Algorigthm (`alg`)
  - Key ID (`kid`)
- Payload (base-64-encoded JSON)
- Signature

ⓘ You may get an `invalid input` error when trying to decode the Base 64. This is because the JWT leaves out the base 64 padding (the equals signs (`=`)).

#### Validating JWTs

⚠️ JWTs should never be used unless first validated

👉 In order to prevent mistakes, JWTs should be validated using a well-known library and not manually.

Validating JWTs includes ensuring the signature is valid and the token is not expired.

#### Token security

- Tokens should be treated like credentials
- Tokens should only be sent over TLS
- Tokens should be securely stored: [Storing OAuth Tokens](https://fusionauth.io/articles/oauth/oauth-token-storage)
- Tokens should not contain any sensitive information (government IDs, credit cards, etc). Instead, the token should be exchanged for the sensitive information needed.

## OpenID Connect (OIDC)

OIDC is an extension to OAuth designed to add identity and profile information to OAuth so it can be better used for user authentication in order to replace SAML.

Whereas OAuth is loosely defined, OIDC is much more strictly defined, for example:

- It requires JWT tokens and defines what fields should be included
- It requires an additional /userinfo endpoint
- It requires an additional token (ID token)

This is done so that OIDC can be interoperable between different OAuth servers; otherwise it wouldn't be useful for user authentication.

OIDC does not include the Client credentials grant type since OIDC requires a user.
