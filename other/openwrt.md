---
title: OpenWrt
---

#### Installation and initial configuration

[https://openwrt.org/docs/guide-quick-start/factory_installation](https://openwrt.org/docs/guide-quick-start/factory_installation)

1. Make sure your device is in the list of supported devices

   [https://openwrt.org/toh/start](https://openwrt.org/toh/start)

1. Download the latest firmware for your device

   1. Still in the Supported Devices page, click on the link in the Device Page column
   1. Download the latest release for your model and hardware number

1. Flash OpenWrt

   1. Follow the instructions on the device page

1. Connect to the device

   [https://openwrt.org/docs/guide-quick-start/webadmingui](https://openwrt.org/docs/guide-quick-start/webadmingui)

   1. If your device has network ports, wireless will be disabled by default. Connect to the device with a network cable
   1. Browse to the device url (http://192.168.1.1) and log in (root, no password)

1. Set the root password

   1. _System_ > _Administration_
   1. Set _Password_
   1. _Save & Apply_

1. Set the time zone

   1. _System_ > _System_
   1. Set _Timezone_
   1. _Save & Apply_

1. Set the country code

   1. _Network_ > _Wireless_ > _Edit_ > _Advanced Settings_
   1. Set _Country Code_
   1. _Save & Apply_

1. Configure wireless

   [https://openwrt.org/docs/guide-quick-start/basic_wifi](https://openwrt.org/docs/guide-quick-start/basic_wifi)

   1. _Network_ > _Wireless_ > _Edit_ > _Interface Configuration_
   1. _General Setup_
      1. Set _ESSID_
      1. _Save & Apply_
   1. _Wireless Security_
      1. _Encryption_ > _WPA2-PSK_
      1. Set _Key_
      1. _Save & Apply_

1. Enable wireless

   1. _Network_ > _Wireless_ > _Enable_

1. Reboot

   This makes sure the time zone takes effect if you're using it in your firewall rules (iptables' `timestart`)

   1. _System_ > _Reboot_ > _Perform reboot_

#### Change the IP range

1. _Network_ > _Interfaces_ > _LAN_ > _Edit_
1. Change _IPv4 address_
1. _Save & Apply_
1. Reconnect wireless and reconnect to the new address

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

   1. _Network_ > _Interfaces_ > _LAN_ > _Edit_
   1. Under _DHCP Server_ > _General Setup_ check _Ignore interface_
   1. Under _DHCP Server_ > _IPv6 Settings_
      1. Set _Router Advertisement-Service_ to _disabled_
      1. Set _DHCPv6-Service_ to _disabled_
   1. _Save & Apply_

1. Set a static IP on the same network as the primary router

   Make sure you use a different IP as the primary router (e.g. 192.168.0.2)

   1. _Network_ > _Interfaces_ > _LAN_ > _Edit_
   1. Change _IPv4 address_
   1. _Save & Apply_
   1. Wait until the configuration has been applied; if you see _Configuration has been rolled back!_, click _Apply unchecked_
   1. Connect to the device at the new address

1. Reconfigure the primary wireless network on the secondary router

   1. _Network_ > _Wireless_ > _Edit_ (at this point there should only be one network on the wireless interface)
   1. Under _Interface Configuration_ > _General Setup_

      1. Make sure _Mode_ is set to _Access Point_
      1. (Optional) Set _ESSID_ to the same SSID as the primary router

         This will make the network look like the same network as the primary router so clients can automatically use either one

      1. Make sure _Network_ is set to _lan_

         This should ensure that devices that connect to the secondary router won't get blocked by the firewall from seeing devices on the primary router

   1. Under _Wireless Security_

      1. Set _Encryption_ and _Key_ to the same values as the primary wireless network

         This is required if you use the same SSID

   1. _Save & Apply_
   1. Wait until the configuration has been applied; if you see _Configuration has been rolled back!_, click _Apply unchecked_
   1. Connect to the new network (if you're connected wirelessly)

1. Add a secondary wireless network for WDS

   1. _Network_ > _Wireless_ > _Add_
   1. Under _Interface Configuration_ > _General Setup_

      1. Set _Mode_ to _Access Point (WDS)_
      1. Set _ESSID_ to a **different** value than the SSID used by the primary router

         This is a safeguard to prevent clients from connecting to this network because it will cause the WDS connection between the two routers to have problems

      1. Set _Network_ to _lan_

         This will make sure the firewall doesn't block the WDS connection between the secondary and primary routers

   1. Under _Wireless Security_

      1. Set _Encryption_ to a security mechanism supported by the primary router

      1. Set _Key_ to a different value from the key used by the primary network

         This is another safeguard to prevent clients to connecting to this network

   1. _Save & Apply_

1. Configure DNS forwarding

   1. _Network_ > _DHCP and DNS_
   1. Set _DNS forwardings_ to the IP address of the primary router
   1. _Save & Apply_

1. Configure IPv4 gateway

   1. _Network_ > _Interfaces_ > _LAN_ > _Edit_
   1. Set _IPv4 gateway_ to the IP address of the primary router
   1. _Save & Apply_

1. Enable Spanning Tree Protocol

   1. _Network_ > _Interfaces_ > _LAN_ > _Edit_
   1. Go to the _Physical Settings_ tab
   1. Check _Enable STP_
   1. _Save & Apply_

1. (Recommended) Schedule a periodic wireless restart

   Unfortunately WDS can periodically get disconnected, so this is a workaround to alleviate that

   1. _System_ > _Scheduled Tasks_
   1. Create a scheduled task to periodically restart the wireless

      For example, this would restart the wireless every day at 6:05:

      ```
      5 6 * * * /sbin/wifi down && /sbin/wifi up
      ```

   1. _Submit_
   1. Restart the cron service

      _System_ > _Startup_ > find _cron_ and click _Restart_

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

   1. _Network_ > _Wireless_
   1. Click _Edit_ by the WDS network
   1. Under _Interface Configuration_ > _General Setup_ check _Hide ESSID_

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

   1. _Network_ > _Wireless_ > _Scan_
   1. Find the network of the primary router and click _Join Network_
   1. Enter the _WPA passphrase_ of the existing network
   1. Set the firewall zone to _lan_
   1. _Submit_
   1. Under _Device Configuration_ and _Operating frequency_ set _Channel_ to _auto_
   1. Under _Interface Configuration_ change _Mode_ to _Client (WDS)_
   1. Under _Interface Configuration_ change _Network_ to _lan_
   1. _Save & Apply_

1. (Optional) Remove the wwan interface

   This gets automatically created when you join the network of the primary router and can be safely removed

   1. _Network_ > _Interfaces_
   1. By _WWAN_ click _Delete_ > _OK_

1. (Optional) Rename the secondary router SSID

   If you wish for the secondary router to use the same SSID so it looks like part of the same network for clients:

   1. _Network_ > _Wireless_
   1. By the network for the secondary router (the one with _Mode: Master_) click _Edit_
   1. Under _Interface Configuration_ set _ESSID_ to the same SSID as the primary router
   1. _Save & Apply_
   1. Wait until the configuration has been applied; if you see _Configuration has been rolled back!_, click _Apply unchecked_
