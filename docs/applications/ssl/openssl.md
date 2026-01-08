---
title: OpenSSL
---

## Misc

#### Testing SSL version
```
openssl s_client -connect www.example.org:443 -ssl3
```

Output if SSLv3 is disabled:
```
140412157757088:error:1408F10B:SSL routines:SSL3_GET_RECORD:wrong version number:s3_pkt.c:339:
```

Or:
```
140003543803552:error:14094410:SSL routines:ssl3_read_bytes:sslv3 alert handshake failure:s3_pkt.c:1472:SSL alert number 40
140003543803552:error:1409E0E5:SSL routines:ssl3_write_bytes:ssl handshake failure:s3_pkt.c:656:
```

For SSLv2, use `-ssl2` instead (requires [custom build of OpenSSL](https://gist.github.com/bmaupin/8caca3a1e8c3c5686141))

Output if SSLv2 is disabled:
```
139642876688032:error:1407F0E5:SSL routines:ssl2_write:ssl handshake failure:s2_pkt.c:409:
```



## PEM (base64-encoded DER)

#### Get information for a cert
```
openssl x509 -text -in /path/to/file.pem
```


#### Get information for a CSR
```
openssl req -noout -text -in /path/to/file.csr
```


#### Verify cert file
```
openssl verify /path/to/cert.pem
openssl verify -CAfile /path/to/ca-file.pem /path/to/file.pem
```


#### Verify cert on another server
```
openssl s_client -CAfile /path/to/ca-file.pem -connect server.example.com:636
```

Or:
```
openssl s_client -CApath /etc/ssl/certs/ -connect server.example.com:636
```


#### List the certificates on a remote server
```
openssl s_client -connect www.example.org:443 -showcerts
```


#### Verifying a private key matches a cert
```
openssl x509 -noout -text -in /path/to/file.pem
openssl rsa -noout -text -in /path/to/file.key
```

Make sure modulus and public exponents match, or:
```
openssl x509 -noout -modulus -in /path/to/file.pem | openssl md5
openssl rsa -noout -modulus -in /path/to/file.key | openssl md5
```

To check the CSR as well:
```
openssl req -noout -modulus -in /path/to/file.csr | openssl md5
```


#### Convert a certificate from PEM to DER
```
openssl x509 -in /path/to/file.pem -inform PEM -out /path/to/file.der -outform DER
```


#### Create a CSR and a new key
```
hostname=`hostname -f`; openssl req -sha256 -newkey rsa:2048 -keyout $hostname.key -subj "/C=GB/ST=Berkshire/L=Newbury/O=My Company Ltd/CN=$hostname" -out $hostname.csr -nodes
```


#### Create a new key
```
openssl genrsa -out /path/to/file.key 2048
```


#### Create a CSR from an existing key
```
openssl req -sha256 -new -key /path/to/file.key -out /path/to/file.csr
```

Specify the subject when generating:
```
openssl req -sha256 -new -key /path/to/file.key -subj "/C=GB/ST=Berkshire/L=Newbury/O=My Company Ltd/CN=myserver.example.org" -out /path/to/file.csr
```

List the subject:
```
openssl req -noout -subject -in /path/to/file.csr
```


#### Create a self-signed cert with no passphrase
```
hostname=`hostname -f`; openssl req -x509 -sha256 -newkey rsa:2048 -keyout $hostname.key -subj "/CN=$hostname" -out $hostname.pem -days 7300 -nodes
```


#### Sign a CSR with another cert/key pair
```
openssl x509 -sha256 -req -in host.example.org.csr -out host.example.org.pem -CA cacert.pem -CAkey cakey.pem -CAcreateserial
```



## DER (binary DER)

#### View detailed information about a DER cert
```
openssl x509 -inform der -text -in /path/to/cert.cer
```


#### Convert a DER cert to PEM
```
openssl x509 -inform der -in /path/to/cert.cer -out /path/to/cert.pem
```



## PKCS #12 keystores

#### Creating a pkcs12 keystore from a PEM cert and key
```
openssl pkcs12 -export -inkey /path/to/file.key -in /path/to/file.pem -chain -CAfile /path/to/ca-file.pem -out `hostname -f`.p12
keytool -storetype pkcs12 -list -keystore /path/to/file.p12
```

**Note:** openssl often adds a readable comments before the key, keytool does not support that, so remove the openssl comments if they exist before importing the key using keytool.


#### Viewing info about a pkcs12 keystore
```
openssl pkcs12 -info -in /path/to/file.p12
```


#### Viewing valid dates of a pkcs12 keystore
```
openssl pkcs12 -info -in /path/to/file.p12 | openssl x509 -noout -dates
```



## PKCS #7 keystores

#### Convert PKCS #7 keystore to PEM
This will output all of the certs in the PKCS #7 keystore into one PEM file:
```
openssl pkcs7 -print_certs -in certs.p7b -out certs.pem
```

If you get this error:
```
unable to load PKCS7 object
```

Try ading `-inform der`:
```
openssl pkcs7 -inform der -print_certs -in certs.p7b -out certs.pem
```



## Certificate formats

See: [http://en.wikipedia.org/wiki/X.509](http://en.wikipedia.org/wiki/X.509)

#### PEM (technically base64-encoded DER)
- Enclosed between `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`
- Normally has a .pem extension, could have .cer, .crt, or .der extension
- Default format for Apache, OpenLDAP


#### DER (technically binary DER)
- Normally has .cer, .crt, or .der extension


#### PKCS #7
- A keystore archive normally containing a cert along with its key and often the other certs in the cert chain
- Normally has .p7b or .p7c extension


#### PKCS #12 keystore
- A keystore archive normally containing a cert along with its key and often the other certs in the cert chain
- Normally has .p12 or .pfx extension (prefer .p12)
- Default type for Windows certs
