---
title: VMware vSphere vMA
---

## Fastpass

#### Using fastpass to run commands:

1. First set up fastpass by adding servers that can be used by fastpass (this only needs to be done once):

   ```
   vifp addserver vmware-01.example.org --username admin
   ```

1. Set one of the servers you added as a fastpass target for running commands on:

   ```
   vifptarget -s vmware-01.example.org
   ```

1. Run command: run any command as usual, and it will run on the targeted fastpass server

#### Add multiple servers to fastpass at once:

```
for n in $(seq -f "%02g" 1 32); do vifp addserver vmware-$n.example.org --username admin --password adminpass; done
```

#### Run commands on multiple servers at once (configure and restart syslog):

```
for n in $(seq -f "%02g" 1 32); do echo vmware-$n.example.org; vifptarget -s vmware-$n.example.org; esxcli system syslog config set --loghost='tcp://splunk.example.org:1514'; esxcli system syslog reload; esxcli network firewall ruleset set --ruleset-id=syslog --enabled=true; esxcli network firewall refresh; esxcli system syslog config get; done
```

#### List servers added to fastpass:

```
vifp listservers
```

#### List fastpass targets:

```
vifptarget -d
```

#### Clear fastpass targets:

```
vifptarget -c
```

## Misc

#### Change the DNS servers on multiple ESXi hosts:

```
for n in $(seq -f "%02g" 1 32); do vifptarget -s vmware-$n.example.org; vicfg-dns -D 192.168.0.10,192.168.0.11; vicfg-dns; done
```

#### Change the management network subnet mask on multiple ESXi hosts:

```
for n in $(seq -f "%02g" 1 32); do echo vmware-$n.example.org; vifptarget -s vmware-$n.example.org; vicfg-vmknic --ip `vicfg-vmknic -l | grep vmk0 | awk '{print $5}'` -n 255.255.255.0 "Management Network"; done
```

#### Change the default gateway on multiple ESXi hosts:

```
for n in $(seq -f "%02g" 1 32); do echo vmware-$n.example.org; vifptarget -s vmware-$n.example.org; vicfg-route 192.168.0.1; vicfg-route -l | grep default; done
```

#### Remove a NIC from a dvSwitch on multiple ESXi hosts:

```
for n in $(seq -f "%02g" 1 32); do echo vmware-$n.example.org; vifptarget -s vmware-$n.example.org; esxcfg-vswitch -Q VMNIC -V ` esxcfg-vswitch -l | grep VMNIC | egrep -v DVSWITCH | cut -c 4-7` DVSWITCH; done
```

(replace _DVSWITCH_ with the name of the dvSwitch and _VMNIC_ with the vmnic to remove)
