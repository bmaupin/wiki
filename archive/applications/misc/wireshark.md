---
title: Wireshark
---

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

#### View absolute dates/times instead of relative

_View_ > _Time Display Format_ > _Date and Time of Day_

#### Traffic flow graph

_Statistics_ > _Flow Graph_

#### Show one specific connection/session from start to finish

1. Right-click one of the packets in the connection > _Follow_ > _TCP Stream_

1. A window will pop up with the TCP stream contents, which you can close
