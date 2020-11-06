---
title: OpenWrt
---

#### Installation and initial configuration

[https://openwrt.org/docs/guide-quick-start/factory_installation](https://openwrt.org/docs/guide-quick-start/factory_installation)

1. Make sure your device is in the list of supported devices  
[https://openwrt.org/toh/start](https://openwrt.org/toh/start)

2. Download the latest firmware for your device
    1. Still in the Supported Devices page, click on the link in the Device Page column
    2. Download the latest rel ease for your model and hardware number

3. Flash OpenWrt
    1. Follow the instructions on the device page

4. Connect to the device  
[https://openwrt.org/docs/guide-quick-start/webadmingui](https://openwrt.org/docs/guide-quick-start/webadmingui)
    1. If your device has network ports, wireless will be disabled by default. Connect to the device with a network cable
    2. Browse to the device url (http://192.168.1.1) and log in (root, no password)

5. Set the root password
    1. *System* > *Administration*
    2. Set *Password*
    3. *Save & Apply*

6. Set the time zone
    1. *System* > *System*
    2. Set *Timezone*
    3. *Save & Apply*

7. Set the country code
    1. *Network* > *Wireless* > *Edit* > *Advanced Settings*
    2. Set *Country Code*
    3. *Save & Apply*

8. Configure wireless  
[https://openwrt.org/docs/guide-quick-start/basic_wifi](https://openwrt.org/docs/guide-quick-start/basic_wifi)
    1. *Network* > *Wireless* > *Edit* > *Interface Configuration*
    2. *General Setup*
        1. Set *ESSID*
        2. *Save & Apply*
    3. *Wireless Security*
        1. *Encryption* > *WPA2-PSK*
        2. Set *Key*
        3. *Save & Apply*

9. Enable wireless
    1. *Network* > *Wireless* > *Enable*
    
10. Reboot  
This makes sure the time zone takes effect if you're using it in your firewall rules (iptables' `timestart`)
    1. *System* > *Reboot* > *Perform reboot*


#### Change the IP range

1. *Network* > *Interfaces* > *LAN* > *Edit*
2. Change *IPv4 address*
3. *Save & Apply*
4. Reconnect wireless and reconnect to the new address


#### Add a host file blacklist

1. Download a host file blacklist (e.g. [https://github.com/StevenBlack/hosts](https://github.com/StevenBlack/hosts))
1. Copy the host file to the device
    ```
    scp hosts root@192.168.0.100:/tmp/hosts
    ```
1. SSH to the device
    ```
    ssh root@192.168.0.100
    ```
1. Restart dnsmasq
    ```
    service dnsmasq restart
    ```


## WDS (wireless distribution system)

WDS can be used to extend a wireless network by adding an additional wireless router. Although a mesh network is superior, WDS is an alternative option when a mesh isn't possible.


#### Set up a secondary router as a WDS access point (recommended)

On the secondary router:

1. Disable DHCP server
    1. *Network* > *Interfaces* > *LAN* > *Edit*
    1. Under *DHCP Server* > *General Setup* check *Ignore interface*
    1. Under *DHCP Server* > *IPv6 Settings*
        1. Set *Router Advertisement-Service* to *disabled*
        1. Set *DHCPv6-Service* to *disabled*
    1. *Save & Apply*

1. Set a static IP on the same network as the primary router

    Make sure you use a different IP as the primary router (e.g. 192.168.0.2)

    1. *Network* > *Interfaces* > *LAN* > *Edit*
    1. Change *IPv4 address*
    1. *Save & Apply*
    1. Wait until the configuration has been applied; if you see *Configuration has been rolled back!*, click *Apply unchecked*
    1. Connect to the device at the new address

1. Reconfigure the primary wireless network on the secondary router

    1. *Network* > *Wireless* > *Edit* (at this point there should only be one network on the wireless interface)
    1. Under *Interface Configuration* > *General Setup*
        1. Make sure *Mode* is set to *Access Point*
        1. (Optional) Set *ESSID* to the same SSID as the primary router

            This will make the network look like the same network as the primary router so clients can automatically use either one
        1. Make sure *Network* is set to *lan*

            This should ensure that devices that connect to the secondary router won't get blocked by the firewall from seeing devices on the primary router
    1. Under *Wireless Security*
        1. Set *Encryption* and *Key* to the same values as the primary wireless network

            This is required if you use the same SSID
    1. *Save & Apply*
    1. Wait until the configuration has been applied; if you see *Configuration has been rolled back!*, click *Apply unchecked*
    1. Connect to the new network (if you're connected wirelessly)

1. Add a secondary wireless network for WDS
    1. *Network* > *Wireless* > *Add*
    1. Under *Interface Configuration* > *General Setup*
        1. Set *Mode* to *Access Point (WDS)*
        1. Set *ESSID* to a **different** value than the SSID used by the primary router

            This is a safeguard to prevent clients from connecting to this network because it will cause the WDS connection between the two routers to have problems
        1. Set *Network* to *lan*

            This will make sure the firewall doesn't block the WDS connection between the secondary and primary routers

    1. Under *Wireless Security*
        1. Set *Encryption* to a security mechanism supported by the primary router

        1. Set *Key* to a different value from the key used by the primary network

            This is another safeguard to prevent clients to connecting to this network
    1. *Save & Apply*

1. Configure DNS forwarding
    1. *Network* > *DHCP and DNS*
    1. Set *DNS forwardings* to the IP address of the primary router
    1. *Save & Apply*

1. Configure IPv4 gateway
    1. *Network* > *Interfaces* > *LAN* > *Edit*
    1. Set *IPv4 gateway* to the IP address of the primary router
    1. *Save & Apply*

1. Enable Spanning Tree Protocol
    1. *Network* > *Interfaces* > *LAN* > *Edit*
    1. Go to the *Physical Settings* tab
    1. Check *Enable STP*
    1. *Save & Apply*

1. (Recommended) Schedule a periodic wireless restart

    Unfortunately WDS can periodically get disconnected, so this is a workaround to alleviate that

    1. *System* > *Scheduled Tasks*
    1. Create a scheduled task to periodically restart the wireless

        For example, this would restart the wireless every day at 6:05:

        ```
        5 6 * * * /sbin/wifi down && /sbin/wifi up
        ```
    1. *Submit*
    1. Restart the cron service

        *System* > *Startup* > find *cron* and click *Restart*

On the primary router:

1. Configure the primary router as a WDS client according to the vendor's documentation
    - If the primary router only has an option to "enable" WDS, this typically means it will be enabled as a WDS client
    - Don't set a static IP or disable the DHCP server (we did that on the secondary router instead)
    - Vendor links
        - TP-Link: https://www.tp-link.com/en/support/faq/1555/
        - TP-Link (legacy): https://www.tp-link.com/us/support/faq/227/

On the secondary router:

1. (Recommended) Hide the SSID

    This is another safeguard to prevent clients to connecting to this network

    1. *Network* > *Wireless*
    1. Click *Edit* by the WDS network
    1. Under *Interface Configuration* > *General Setup* check *Hide ESSID*

#### Set up a secondary router as a WDS client

[https://openwrt.org/docs/guide-user/network/wifi/atheroswds#luci](https://openwrt.org/docs/guide-user/network/wifi/atheroswds#luci)

⚠️ This is only recommended if the stock firmware on the primary router has support for running as a WDS access point or if you do not have administrative access to the primary router. If the stock firmware on the primary router does not have support for running as a WDS access point, devices connected to the primary router may be unable to see devices on the secondary router (e.g. network printers or the secondary router admin interface).

On the primary router:

1. Configure the primary router to act as a WDS access point
    - If the primary router only has an option to "enable" WDS, this may actually configure it as a client. If so, follow the steps in the above section instead.

On the secondary router:

1. Follow all of these steps using the instructions in the previous section:
    1. Disable DHCP server
    1. Set a static IP on the same network as the primary router
    1. Configure DNS forwarding
    1. Configure IPv4 gateway
    1. Enable Spanning Tree Protocol

1. Join the network of the primary router

    This creates a new wireless network on the secondary router that acts as a client of the network on the primary router

    1. *Network* > *Wireless* > *Scan*
    1. Find the network of the primary router and click *Join Network*
    1. Enter the *WPA passphrase* of the existing network
    1. Set the firewall zone to *lan*
    1. *Submit*
    1. Under *Device Configuration* and *Operating frequency* set *Channel* to *auto*
    1. Under *Interface Configuration* change *Mode* to *Client (WDS)*
    1. Under *Interface Configuration* change *Network* to *lan*
    1. *Save & Apply*

1. (Optional) Remove the wwan interface

    This gets automatically created when you join the network of the primary router and can be safely removed

    1. *Network* > *Interfaces*
    1. By *WWAN* click *Delete* > *OK*

1. (Optional) Rename the secondary router SSID

    If you wish for the secondary router to use the same SSID so it looks like part of the same network for clients:

    1. *Network* > *Wireless*
    1. By the network for the secondary router (the one with *Mode: Master*) click *Edit*
    1. Under *Interface Configuration* set *ESSID* to the same SSID as the primary router
    1. *Save & Apply*
    1. Wait until the configuration has been applied; if you see *Configuration has been rolled back!*, click *Apply unchecked*
