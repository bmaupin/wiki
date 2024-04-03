---
title: Wireshark
---

## Install Wireshark

#### Install Wireshark on Ubuntu

```
sudo apt install wireshark
```

#### If Wireshark cannot see network traffic

1. In a terminal, run `sudo dpkg-reconfigure wireshark-common`

   1. _Should non-superusers be able to capture packets?_ > _<Yes>_

1. Run `sudo usermod -a -G wireshark $USER`

Then to apply the changes immediately without logging out:

1. In a terminal, run

   ```
   newgrp wireshark
   wireshark
   ```

## Use Wireshark

#### Capturing packets using tcpdump for viewing using Wireshark

[https://www.wireshark.org/docs/wsug_html_chunked/AppToolstcpdump.html](https://www.wireshark.org/docs/wsug_html_chunked/AppToolstcpdump.html)

#### Filtering

- Type your filter in the text box near the top that says _Apply a display filter_ and press Enter

- Filter by source IP:

  ```
  ip.src==192.168.0.1
  ```

- Filter by destination IP:

  ```
  ip.dst==192.168.0.1
  ```

- Combine filters using and/or:
  ```
  ip.src==192.168.0.1 and ip.dst==192.168.0.1
  ip.src==192.168.0.1 or ip.dst==192.168.0.1
  ```

#### Add a new column (e.g. destination port)

1. Right click the column headers > _Column Preferences..._

1. Click the plus sign near the lower left to add a new column (don't worry about title or type yet) > _OK_

1. Right click the new column > _Edit Column_

1. Select the column _Type_, e.g. _Destination Port_

1. Change the column _Title_ as desired

1. _OK_

#### View absolute dates/times instead of relative

_View_ > _Time Display Format_ > _Date and Time of Day_

#### Traffic flow graph

_Statistics_ > _Flow Graph_

#### Show one specific connection/session from start to finish

1. Right-click one of the packets in the connection > _Follow_ > _TCP Stream_

1. A window will pop up with the TCP stream contents, which you can close

#### Decrypt HTTPS traffic

1. Start a capture in Wireshark

1. The client will need to dump its TLS key to a file

   For example, with curl, use `SSLKEYLOGFILE`, e.g.

   ```
   SSLKEYLOGFILE=deleteme-tlskey-curl curl ...
   ```

1. Configure Wireshark with the location of the TLS key file

   1. _Edit_ > _Preferences_ > _Protocols_ > _TLS_

   1. Configure _(Pre)-Master-Secret log filename_ to point to the TLS Key file location

1. The list of captures should immediately be updated with the decrypted packets, which should be highlighted green and the protocol should start with _HTTP_
