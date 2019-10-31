---
title: OpenWrt
---

#### Installation and initial configuration

https://openwrt.org/docs/guide-quick-start/factory_installation

1. Make sure your device is in the list of supported devices  
https://openwrt.org/toh/start

2. Download the latest firmware for your device
    1. Still in the Supported Devices page, click on the link in the Device Page column
    2. Download the latest rel ease for your model and hardware number

3. Flash OpenWrt
    1. Follow the instructions on the device page

4. Connect to the device  
https://openwrt.org/docs/guide-quick-start/webadmingui
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
https://openwrt.org/docs/guide-quick-start/basic_wifi
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
