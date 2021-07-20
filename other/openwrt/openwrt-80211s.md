---
title: OpenWrt 802.11s mesh
---

## 802.11s mesh

[https://openwrt.org/docs/guide-user/network/wifi/mesh/80211s](https://openwrt.org/docs/guide-user/network/wifi/mesh/80211s)

To use 802.11s mesh, you'll need OpenWrt 19.07+ with the `wpad-mesh-openssl` or `wpad-mesh-wolfssl` package installed. See steps below.

#### Buying a device for 802.11s mesh

For secondary mesh devices (that will just act as access points), at a bare minimum you will need a device with 4 MB of flash and 32 MB of RAM. However, this will require building a custom OpenWrt package for your device and/or doing all of the configuration over SSH.

It will be much easier with a device with at least 8 MB of flash and 64 MB of RAM, which are also the minimum requirements for a primary mesh device. For more information, see [Buying a device for use with OpenWrt](openwrt.html#buying-a-device-for-use-with-openwrt)

#### Adding mesh support to a device already running OpenWrt

1. Set up internet access on the device

   You can either plug the device into another router that already has internet, or follow these steps to join an existing wireless network:

   1. Go to _Network_ > _Wireless_ > _Scan_
   1. Find your existing wireless netowrk and click _Join Network_
   1. Type your _WPA passphrase_ and click _Submit_ > _Save_ > _Save & Apply_
   1. In the _Wireless Overview_ make sure the wireless connection is working

1. Install the mesh packages
   1. Go to _System_ > _Software_
   1. Go to the _Installed_ tab and in the _Filter_ type `wpad`
   1. If you have either `wpad-basic` or `wpad-mini` installed, click _Remove_ to uninstall them
   1. Go to the _Available_ tab and click _Update lists_
   1. In the _Filter_ type `wpad-mesh`
   1. Install either `wpad-mesh-openssl` (for devices with a lot of storage/memory) or `wpad-mesh-wolfssl` (for devices with low storage/memory)
   1. If you joined an existing wireless network to get internet access, go to _Network_ > _Wireless_ and click _Remove_ by that network

#### Building OpenWrt 19.07 with mesh support for a device with limited storage/RAM

The example below is for the TP-Link TL-WRN841N v8; customize it to suit your needs as per the documentation: [Beginners guide to building your own firmware](https://openwrt.org/docs/guide-user/additional-software/beginners-build-guide)

1. Download and extract the source, e.g.

   ```
   wget https://downloads.openwrt.org/releases/19.07.5/targets/ath79/tiny/openwrt-imagebuilder-19.07.5-ath79-tiny.Linux-x86_64.tar.xz
   tar -xvf openwrt-imagebuilder-19.07.5-ath79-tiny.Linux-x86_64.tar.xz
   cd openwrt-imagebuilder-19.07.5-ath79-tiny.Linux-x86_64/
   ```

1. Figure out which value to use for `PROFILE`

   ```
   make info
   ```

1. Build the package, e.g.

   ```
   make image PROFILE=tplink_tl-wr841-v8 PACKAGES="uhttpd uhttpd-mod-ubus libiwinfo-lua luci-base luci-mod-admin-full luci-theme-bootstrap wpad-mesh-wolfssl -wpad-basic -wpad-mini -ppp -ppp-mod-pppoe -kmod-pppoe -ip6tables -odhcp6c -kmod-ipv6 -kmod-ip6tables -odhcpd-ipv6only -odhcpd -iptables -opkg -uclient-fetch -libuclient20160123 -firewall -kmod-ipt-core -kmod-ipt-offload -kmod-nf-conntrack -kmod-nf-flow -kmod-nf-ipt -kmod-nf-reject -dnsmasq"
   ```

   - If you see this error: `[mktplinkfw] *** error: images are too big by 799789 bytes`

     See here to see some packages you can remove to save space: [https://openwrt.org/docs/guide-user/additional-software/saving_space](https://openwrt.org/docs/guide-user/additional-software/saving_space). You may be able to remove more packages depending on your needs; see above for an example.

     ⚠️ Devices with 4 MB of flash storage may not have enough space for the LUCI web interface and the mesh package. Thankfully, it is fairly easy to set up the mesh over SSH (see below).

1. Get the built image from bin/targets, e.g. bin/targets/ath79/tiny

1. Flash the image

#### Set up the mesh network using LUCI

Devices:

- Primary mesh device
  - This is the device that is connected to the internet (e.g. via a network cable to a cable/DSL modem)
  - This device acts as a router and will manage the DHCP, DNS, and firewall for the network
  - This device can also act as a wireless AP (access point)
- Secondary mesh device(s)
  - These devices will extend the wireless network and act as wireless APs

1. If you're just setting up the router after flashing it, see _Installation and initial configuration_ here to do the initial setup: [OpenWrt](https://bmaupin.github.io/wiki/other/openwrt/openwrt.html#installation-and-initial-configuration)

1. Configure the LAN interface

   1. Set the IP

      On the primary mesh device you'll want to set a static IP (e.g. 192.168.0.1). On the secondary mesh devices you can also set a static IP on the same subnet (e.g. 192.168.0.2) or you can use DHCP instead.

      - Set a static IP: see _Change the IP address_ here: [OpenWrt](https://bmaupin.github.io/wiki/other/openwrt/openwrt.html#change-the-ip-address)

      - Use DHCP: _Network_ > _Interfaces_ > _LAN_ > _Edit_ > _Protocol_ > _DHCP client_ > _Save_ > _Apply unchecked_

   1. For all secondary mesh devices with a static IP:

      1. _Network_ > _Interfaces_ > _LAN_ > _Edit_

      1. _IPv4 gateway_ > Set to the IP of the primary mesh device (e.g. 192.168.0.1)

      1. _Use custom DNS servers_ > Add the IP of the primary mesh device

      1. _Save_ > _Save & Apply_

1. (Optional) Disable unnecessary services

   For secondary mesh devices, you can optionally disable some services that will be provided by the primary mesh device

   1. _System_ > _Startup_
   1. Click _Enabled_ for each of these services (if you see _Disabled_, it means they're already disabled):

      - dnsmasq
      - firewall
      - odhcpd

      (If you built your own OpenWrt package without these services (`-dnsmasq`, `-firewall`, `-odhcpd`), they will not be displayed on the _Startup_ screen)

1. Configure the mesh wireless network

   1. _Network_ > _Wireless_
   1. Either _Add_ a new network or _Edit_ an existing network

      It shouldn't matter whether the mesh network is the primary or secondary network

   1. Under _Device Configuration_ > _General Setup_

      1. Set _Channel_ to a specific channel (this must be the same on all mesh devices)

   1. Under _Device Configuration_ > _Advanced Settings_

      1. Set _Country Code_

   1. Under _Interface Configuration_ > _General Setup_

      1. Set _Mode_ to _802.11s_
      1. Set the _Mesh Id_

         This can be any string (e.g. `80211s-mesh`), but it must be the same on all mesh devices

         I like to use a random value (e.g. generated using `openssl rand -hex 6`) since the mesh network will be visible by clients

      1. Set _Network_ to _lan_

         This will prevent the firewall from blocking traffic between the mesh routers so all devices on the mesh network can see each other

   1. Under _Interface Configuration_ > _Wireless Security_
      1. Set _Encryption_ to _WPA3-SAE_
      1. Set _Key_ to a randomly generated secure string
   1. _Save_ > _Save & Apply_

   1. If you see _Wireless network is disabled_ under the mesh network, click _Enable_

1. Configure the wireless network for clients

   Skip this step if you already have a wireless network for clients

   1. _Network_ > _Wireless_
   1. Either _Add_ a new network or _Edit_ an existing network

      Make sure you don't edit the mesh network you just created 😄

   1. Under _Interface Configuration_ > _General Setup_

      1. Set _Mode_ to _Access Point_
      1. Set _ESSID_ to the same value on all routers

         This will make the network look the same to clients so they can automatically switch between any of the mesh routers

      1. Set _Network_ to _lan_

   1. Under _Wireless Security_

      1. Set _Encryption_ to _WPA2-PSK_
      1. Set _Key_ to the same values on all routers

   1. _Save_ > _Save & Apply_

#### Set up the mesh network over SSH

1. Connect to the device, e.g.

   ```
   ssh root@192.168.1.1
   ```

1. (As needed) Set the root password

   ```
   passwd
   ```

1. (As needed) Change the IP address

   Make sure each router on the mesh network has a different IP on the same subnet (e.g. 192.168.0.2)

   1. Edit `/etc/config/network`

      ```
      vi /etc/config/network
      ```

   1. Under `config interface 'lan'` set `option ipaddr`

   1. Restart the network

      ```
      service network reload
      ```

1. For all secondary mesh devices:

   ```
   uci set network.lan.gateway='192.168.0.1'
   uci add_list network.lan.dns='192.168.0.1'
   ```

   (Replace the IP address with the IP of the mesh device that is connected to the internet)

1. Configure the mesh wireless network

   1. Edit `/etc/config/network`

      ```
      vi /etc/config/network
      ```

   1. Under `config wifi-device 'radio0'`:

      1. Remove this line to enable the wireless radio:

         ```
                 option disabled '1'
         ```

      1. Update the options to set the channel and country, e.g.

         ```
                 option channel '1'
                 option country 'IO'
         ```

   1. Still in `/etc/config/wireless`, add a new section to create the mesh interface

      ```
      config wifi-iface 'mesh'
              option device 'radio0'
              option network 'lan'
              option key 'gqjfjfn7smcKu&bx'
              option mesh_rssi_threshold '0'
              option mesh_fwding '1'
              option mode 'mesh'
              option mesh_id 'ef4ef8ebb23d'
              option encryption 'sae'
      ```

      (Replace `key` and `mesh_id` with your own values)

1. Restart the wireless interface

   ```
   wifi
   ```

1. (Optional) Tail the logs to make sure it worked

   ```
   logread -l 20 -f
   ```

   e.g.

   ```
   # logread -l 20 -f
   Fri Jan  8 18:31:12 2021 daemon.notice wpa_supplicant[2257]: wlan0: MESH-GROUP-STARTED ssid="ef4ef8ebb23d" id=0
   Fri Jan  8 18:31:12 2021 daemon.notice wpa_supplicant[2257]: wlan0: new peer notification for 24:a4:3c:ae:df:83
   Fri Jan  8 18:31:13 2021 daemon.notice wpa_supplicant[2257]: wlan0: mesh plink with 24:a4:3c:ae:df:83 established
   Fri Jan  8 18:31:13 2021 daemon.notice wpa_supplicant[2257]: wlan0: MESH-PEER-CONNECTED 24:a4:3c:ae:df:83
   ```

1. (Optional) View the mesh status

   ```
   iw dev wlan0 station dump
   ```

   e.g.

   ```
   # iw dev wlan0 station dump
   Station 24:a4:3c:ae:df:83 (on wlan0)
       inactive time:	10 ms
       rx bytes:	11614506
       rx packets:	50030
       tx bytes:	13971217
       tx packets:	23604
       tx retries:	1760
       tx failed:	0
       rx drop misc:	3220
       signal:  	-52 [-54, -56] dBm
       signal avg:	-54 [-56, -58] dBm
       Toffset:	21971078389 us
       tx bitrate:	115.6 MBit/s MCS 13 short GI
       rx bitrate:	57.8 MBit/s MCS 11 short GI
       rx duration:	0 us
       expected throughput:	42.388Mbps
       mesh llid:	0
       mesh plid:	0
       mesh plink:	ESTAB
       mesh local PS mode:	ACTIVE
       mesh peer PS mode:	ACTIVE
       mesh non-peer PS mode:	ACTIVE
       authorized:	yes
       authenticated:	yes
       associated:	yes
       preamble:	long
       WMM/WME:	yes
       MFP:		yes
       TDLS peer:	no
       DTIM period:	2
       beacon interval:100
       connected time:	1429 seconds
   ```

1. Configure the wireless network for clients

   TODO
