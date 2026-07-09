---
title: Firefox
---

#### Adding exceptions for SSL errors
- `ssl_error_no_cypher_overlap`
    1. In the address bar type *about:config* > Enter > *I'll be careful, I promise!*

    1. In the search bar type *security.tls.insecure_fallback_hosts*

    1. Double-click *security.tls.insecure_fallback_hosts*

    1. Add the hostname of the server. If there are multiple servers, separate them with commas

    1. Click *OK*

- `ssl_error_weak_server_ephemeral_dh_key`
    1. In the address bar type *about:config* > Enter > *I'll be careful, I promise!*

    1. In the search bar type *security.ssl3.dhe_rsa_aes*

    1. Double-click each item (*security.ssl3.dhe_rsa_aes_128_sha* and *security.ssl3.dhe_rsa_aes_256_sha*) so the *Value* is *false*

- `ssl_error_weak_server_cert_key`
    - There is no workaround. You must regenerate the server certificate with a key size of at least 2048
