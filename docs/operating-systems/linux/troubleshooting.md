---
title: Troubleshooting
---

## Troubleshooting network connectivity

#### Set up a test network server

Netcat will listen on a local port and dump all received data to the console.

e.g. to Start up a server on port 8000:

```
nc -kl 8000
```

- `-k`: Keep running even after a successful connection
- `-l`: Listen (by default it will connect to a remote port)

To return a response ([Minimal web server using netcat](https://stackoverflow.com/a/16640233/399105)):

```
while true; do echo -e "HTTP/1.1 200 OK\n\n $(date)" | nc -l -p 1234 -q 1; done
```

Or to return JSON:

```
while true; do echo -e "HTTP/1.1 200 OK\n\n{}" | nc -l -p 1234 -q 1; done
```

#### Test connection to a web server

Use curl, e.g.

```
curl http://localhost:8000
```

#### Test connection to a non-web server with telnet

e.g.

```
echo -n | telnet localhost 8000
```

- `echo -n` is optional but [without it telnet won't return to the command prompt on its own](https://stackoverflow.com/a/60897607/399105)

Some examples:

- Connection successful

  ```
  $ echo -n | telnet localhost 8000
  Trying 127.0.0.1...
  Connected to localhost.
  Escape character is '^]'.
  Connection closed by foreign host.
  ```

- Connection refused

  ```
  $ echo -n | telnet localhost 8001
  Trying 127.0.0.1...
  telnet: Unable to connect to remote host: Connection refused
  ```

- [Timeout](https://stackoverflow.com/a/904609/399105)

  ```
  $ echo -n | telnet 10.255.255.1 80
  Trying 10.255.255.1...
  telnet: Unable to connect to remote host: Connection timed out
  ```

#### Test connection to a non-web server with curl

If you don't have telnet (e.g. on a container), you can use curl with the `telnet://` protocol, e.g.

```
curl -v telnet://localhost:8000
```

👉 Be sure to use `-v`, otherwise the command won't return any output

ⓘ Curl isn't as ideal as telnet because there doesn't seem to be an easy way to get it to return without forcing a timeout, [which you can do using the `timeout` command](https://stackoverflow.com/a/42347622/399105), but this will return early if there's an actual timeout.

Some examples:

- Connection successful

  ```
  timeout 1s curl -v telnet://localhost:8000
  *   Trying 127.0.0.1:8000...
  * Connected to localhost (127.0.0.1) port 8000 (#0)
  ```

- Connection refused

  ```
  $ timeout 1s curl -v telnet://localhost:8001
  *   Trying 127.0.0.1:8001...
  * connect to 127.0.0.1 port 8001 failed: Connection refused
  * Failed to connect to localhost port 8001 after 0 ms: Connection refused
  * Closing connection 0
  curl: (7) Failed to connect to localhost port 8001 after 0 ms: Connection refused
  ```

- [Timeout](https://stackoverflow.com/a/904609/399105)

  ```
  $ curl -v telnet://10.255.255.1:80
  *   Trying 10.255.255.1:80...
  * connect to 10.255.255.1 port 80 failed: Connection timed out
  * Failed to connect to 10.255.255.1 port 80 after 133611 ms: Connection timed out
  * Closing connection 0
  curl: (28) Failed to connect to 10.255.255.1 port 80 after 133611 ms: Connection timed out
  ```
