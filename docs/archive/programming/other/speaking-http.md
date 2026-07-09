---
title: Speaking HTTP
---

## Speaking HTTP

#### Speaking HTTP (non-SSL) using telnet

```
telnet www.example.com 80
GET / HTTP/1.0
```

**Note:** make sure you press Enter twice!

or:

```
GET / HTTP/1.1
```

#### Speaking HTTPS (SSL) using openssl

```
openssl s_client -connect www.example.com:443
GET / HTTP/1.0
```

**Note:** make sure you press Enter twice!

or:

```
GET / HTTP/1.1
```

#### Speaking HTTP/HTTPS with python

```
import http.client
url = 'www.example.com'
conn = http.client.HTTPConnection(url)
# or http.client.HTTPSConnection(url) for HTTPS
# or http.client.HTTPSConnection(url, 8443) for an alternate port
conn.request('GET', '/')
r = conn.getresponse()
print r.status
print r.reason
print r.version
print r.getheaders()
d = r.read()
print d
```

## Misc

#### Proper format

(see: [http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_message](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_message))

```
GET *location* *http_version*
*headers* (optional)
(blank line)
*message body* (optional)
```

- There must be a space after the GET/POST request
- There must be a space after the location
- Specify the HTTP version when possible
  - Use HTTP/1.0 when possible
- There should be no spaces after the HTTP version
- After the request, you may need to send two carriage return/line feeds (i.e. `\r\n\r\n`)
  - For telnet and openssl, you can normally just press enter twice
