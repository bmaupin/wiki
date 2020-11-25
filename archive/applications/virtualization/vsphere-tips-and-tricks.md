---
title: VMware vSphere tips and tricks
---

#### Unable to remove a NIC from a VM

- Try powering it off first

#### VM NIC disconnected and unable to connect it

1. Change the NIC to a different network
1. Change the NIC back to the previous network, and it should connect (you should be able to change it back and connect it at the same time)

#### Unable to power on VM

In this case, the VM was powered on at the same time that it was moving to another server and was in a hung state. The solution:

1. Find out which datastore and host the VM is on
1. Remove the VM from inventory
1. Enable SSH on an ESXi host (can be any host in the cluster)
1. SSH to the host and register the VM:

   ```
   vim-cmd solo/registervm /vmfs/volumes/YOUR-DATASTORE/VM-NAME/VM-NAME.vmx
   ```

   (replace _YOUR-DATASTORE_ with the path of your datastore and _VM-NAME_ with the name of the VM)

1. If you don't see the VM in inventory, it should be there but may be out of order. You can always close and re-open the vSphere Client which should re-sort the VMs.
