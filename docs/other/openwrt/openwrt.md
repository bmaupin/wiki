---
title: OpenWrt
---

## Basics

#### Buying a device for use with OpenWrt

OpenWrt supports a large number of devices. When shopping for a device you can check if it's supported here: [https://openwrt.org/toh/start](https://openwrt.org/toh/start)

One device that's currently popular (as of 2021) due to its low cost and capable hardware is the [Xiaomi Mi Router 4A Gigabit Edition](https://openwrt.org/inbox/toh/xiaomi/xiaomi_mi_router_4a_gigabit_edition).

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

      **Note:** If you're flashing a different version of OpenWrt, make sure you don't keep the existing configuration as this will likely cause problems

1. Connect to the device

   [https://openwrt.org/docs/guide-quick-start/webadmingui](https://openwrt.org/docs/guide-quick-start/webadmingui)

   1. If your device has network ports, wireless will be disabled by default. Connect to the device with a network cable
   1. Browse to the device url (http://192.168.1.1) and log in (`root`, no password)

1. Set the root password

   1. _System_ > _Administration_
   1. Set _Password_
   1. _Save_

1. Set the time zone

   1. _System_ > _System_
   1. Set _Timezone_
   1. _Save & Apply_

1. Set the country code

   1. _Network_ > _Wireless_
   1. For each wireless radio:
      1. _Edit_ > _Advanced Settings_
      1. Set _Country Code_ > _Save_
   1. _Save & Apply_

1. Configure wireless

   [https://openwrt.org/docs/guide-quick-start/basic_wifi](https://openwrt.org/docs/guide-quick-start/basic_wifi)

   1. _Network_ > _Wireless_
   1. For each wireless radio:
      1. _Edit_ > _Interface Configuration_
      1. Set the _Channel_
      1. _General Setup_
         1. Set _ESSID_ > _Save_
      1. _Wireless Security_
         1. _Encryption_ > _WPA2-PSK/WPA3-SAE Mixed Mode_
         1. Set _Key_ > _Save_
   1. _Save & Apply_

1. Enable wireless

   1. _Network_ > _Wireless_ > _Enable_ (for each wireless radio)

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
   scp hosts root@192.168.0.1:/tmp/hosts
   ```
1. SSH to the device
   ```
   ssh root@192.168.0.1
   ```
1. Restart dnsmasq
   ```
   service dnsmasq restart
   ```

#### Create a scheduled task

1. First, make sure the system time is correct

   1. _System_ > _System_

   1. Make sure the _Timezone_ is properly set

   1. Make sure _Local Time_ is correct. If not, click _Sync with NTP-Server_

      If syncing with NTP doesn't work, see below for troubleshooting NTP issues

1. _System_ > _Scheduled Tasks_

1. Create the scheduled task

   For example, if you wanted to start the wireless network every day at 6:00 and shut it down at 21:00:

   ```
   0 6 * * * /sbin/wifi up
   0 21 * * * /sbin/wifi down
   ```

1. _Submit_

1. As mentioned on that page, if there were no scheduled tasks already, you need to restart the cron service:

   (I didn't see this message in OpenWrt 22 so it may no longer be necessary)

   _System_ > _Startup_ > find _cron_ and click _Restart_

## Firewall

#### Block a client from accessing the internet

This may be useful if you have a client that you only want accessible from your local network (e.g. a NAS device)

1. _Network_ > _Firewall_ > _Traffic Rules_ > _Add_

   1. _Protocol_ > _any_
   1. _Source zone_ > _lan_
   1. _Source address_ > choose the IP address of the device if it has a static IP

      Or if the device doesn't have a static IP, in _Advanced Settings_ set _Source MAC address_

   1. _Destination zone_ > _wan_
   1. _Action_ > _reject_
   1. _Save_

1. _Save & Apply_

#### Block a client from accessing the OpenWRT device

Follow the steps above under _Block a client from accessing the internet_, except set _Destination zone_ to _Device (input)_

## NTP

#### Set up NTP server

This can be useful to provide time synchronization to a device on your network that you have blocked off from the internet (e.g. a NAS device)

1. _System_ > _System_ > _Time Synchronization_

1. Check _Provide NTP server_

1. _Save & Apply_

1. Point any clients to the IP of your OpenWrt device to use it as an NTP server

#### Troubleshoot NTP issues

1. Before doing anything else, make sure DNS is working

   1. _Network_ > _Diagnostics_ > _Nslookup_

      If DNS isn't working, you'll need to get that fixed before NTP will work

Additional troubleshooting:

1. Get the command that's being used to run the NTP client (ntpd):

   ```
   tr '\0' ' ' < /proc/$(ps | grep [n]tp | awk '{print $1}')/cmdline; echo
   ```

   e.g.

   ```
   # tr '\0' ' ' < /proc/$(ps | grep [n]tp | awk '{print $1}')/cmdline; echo
   /usr/sbin/ntpd -n -N -S /usr/sbin/ntpd-hotplug -p 0.openwrt.pool.ntp.org -p 1.openwrt.pool.ntp.org -p 2.openwrt.pool.ntp.org -p 3.openwrt.pool.ntp.org
   ```

1. Watch the command line to see what the output is, e.g.

   ```
   # /usr/sbin/ntpd -n -N -S /usr/sbin/ntpd-hotplug -p 0.openwrt.pool.ntp.org -p 1.openwrt.pool.ntp.org -p 2.openwrt.pool.ntp.org -p 3.openwrt.pool.ntp.org
   ntpd: bad address '0.openwrt.pool.ntp.org'
   ntpd: bad address '1.openwrt.pool.ntp.org'
   ntpd: bad address '2.openwrt.pool.ntp.org'
   ntpd: bad address '3.openwrt.pool.ntp.org'
   ```

   (In this example, the router isn't able to find the NTP servers due to DNS misconfiguration)

## Flashing firmware via TFTP

#### Tips

- Make sure the firewall on the TFTP server is configured to allow TFTP traffic
- Disable Wifi on the TFTP server
- Make sure the file on the TFTP server is appropriately named (varies by device)
- Make sure the router is connected to the TFTP server on the appropriate port (varies by device)
- Connect the router directly to the TFTP server using a normal network cable (not a crossover cable)

#### TFTP server setup on Ubuntu

1. Install TFTP server

   ```
   sudo apt install atftpd
   ```

1. Copy the firmware to /srv/tftp/

1. Change permissions of the firmware

   ```
   sudo chown nobody:nogroup -R /srv/tftp
   ```

1. Tail the TFTP logs

   ```
   sudo journalctl -f | grep --line-buffered tftp
   ```
