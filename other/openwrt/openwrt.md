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
      - Download the `factory` image if you're flashing over stock firmware
      - Download the `sysupgrade` image if you're flashing over an existing OpenWrt installation

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

#### Change the IP address

1. _Network_ > _Interfaces_ > _LAN_ > _Edit_
1. Change _IPv4 address_ > _Save_
1. At the bottom of the page, if there's a dropdown near _Save & Apply_, select _Apply unchecked_, then click _Apply unchecked_
   - Otherwise, click _Save & Apply_, and if you see _Configuration has been rolled back!_, click _Apply unchecked_
1. Connect to the device at the new address
   - If you're unable to connect, try rebooting the router

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
