---
title: MIT Kerberos
---

#### Adding/modifying policies
```
add_policy -minlength 10 -minclasses 3 -history 5 admin_servs
```
```
modify_policy -minlength 10 -minclasses 3 -history 5 admin_servs
```

#### add_policy/modify_policy parameters

| Parameter name | Default value | Description |
| -------------- | ------------- | ----------- |
| maxlife | 0 | |
| minlife | 0 | |
| minlength | 0 | minimum password length |
| minclasses | 1 | minimum number of character classes (numbers, lower-case letters, upper-case letters, symbols) |
| history 1 | |


#### Dump/export the kerberos database
```
/path/to/kdb5_util dump /path/to/dump_file
```

Ex:
```
/usr/kerberos/sbin/kdb5_util dump /var/kerberos/krb5kdc/slave_datatrans
/usr/kerberos/sbin/kdb5_util dump `hostname -f`_krb_db-`date +%Y%m%d`
```


#### Load/import a kerberos database
1. Make sure you have a database dump to import using the above instructions

1. Become root
    ```
    sudo -s
    ```

1. Stop kerberos
    ```
    /sbin/service krb5kdc stop
    ```

1. Cd to kerberos directory
    ```
    cd /var/kerberos/krb5kdc
    ```

1. Back up the existing kerberos database
    ```
    cp principal principal.backup.`date +%Y%m%d`
    ```

1. Wipe old kerberos realm
    ```
    /usr/kerberos/sbin/kdb5_util destroy EXAMPLE.COM
    ```

1. Create new kerberos realm
    (you will need the kerberos master password)
    ```
    /usr/kerberos/sbin/kdb5_util create EXAMPLE.COM
    ```

1. Load new kerberos database
    ```
    /usr/kerberos/sbin/kdb5_util load -update /path/to/new/databse
    ```

1. Start kerberos
    ```
    /sbin/service krb5kdc start
    ```


#### Important files/directories

| /var/kerberos/krb5kdc | RHEL's default kerberos dir |
| /etc/krb5.conf | contains parameters used by the Kerberos libraries |
| *kerberos_dir*/principal | kerberos database file |
| *kerberos_dir*/slave_datatrans | kerberos database backup/dump file |
| *kerberos_dir*/var/kdc.conf | KDC-specific configuration file |


#### Synchronization/propagation/replication
- First, host principals must be created for all the replica KDCs and extracted to a keytab.

- Replication is handled by kpropd, the kerberos propagation daemon, which only runs on the replica servers

- Each KDC replica must have an ACL (kpropd.acl) with the master's principal (the ACL lists all the principals that are authorized to connect to kpropd)

- kpropd must be set up as a service on the replica servers, and set to run continuously for replication

- kpropd works by listening for dump files that are sent to the KDC replica servers by the KDC master

- Replication is handled over port 754 TCP

- Because the master won't automatically send dump files to the replica servers, a script must be written that dumps the database and sends it to the replica servers.  then it should be set up in cron so it runs periodically on the master server


#### Looking up kerberos records in DNS
```
dig SRV _kerberos._tcp.example.com
dig SRV _kerberos._udp.example.com
dig SRV _kpasswd._tcp.example.com
dig SRV _kpasswd._udp.example.com
```



## Keytabs

#### Explanation of keytabs
Each principal in the kerberos database is associated with a key. This key can be exported to a file called a keytab file which allows use of that principal without authenticating using a password. When a keytab is created using the `ktadd` command in `kadmin`, the key version number (kvno) is incremented in the kerberos database. The kvno of the keytab must match the version in the database. So if you already have created a keytab for a server and wish to export it to another keytab file without incrementing the version number, you must use `ktutil` to read in the keytab file containing the keytab corresponding to the current kvno, and then write they keytab out to a new file.


#### Create a keytab
1. Make sure the keytab directory exists
    ```
    sudo mkdir /root/keytabs
    ```

1. Log in to kadmin
    ```
    sudo /path/to/kadmin
    ```
    or:
    ```
    sudo /path/to/kadmin.local
    ```

1. Make sure the principals don't already exist
    ```
    listprincs FQDN
    ```

    Ex:
    ```
    listprincs server1.example.com
    ```

1. Create the principal for the machine/service
    ```
    ank [-policy POLICY_NAME] -randkey host/FQDN
    ```
    and/or:
    ```
    ank [-policy POLICY_NAME] -randkey SERVICE_NAME/FQDN
    ```

    Ex:
    ```
    ank -policy server -randkey host/ldap.example.com
    ank -policy server -randkey ldap/ldap.example.com
    ```

1. Create the keytab, adding all of the applicable principals to the keytab
    ```
    ktadd -k /root/keytabs/FQDN.keytab host/FQDN [SERVICE_NAME/FQDN]
    ```

    Ex:
    ```
    ktadd -k /root/keytabs/server1.example.com.keytab host/server1.example.com
    ktadd -k /root/keytabs/ldap.example.com.keytab host/ldap.example.com ldap/ldap.example.com
    ```

    (this last example is used because to use GSSAPI authentication (doing LDAP searches using the Kerberos ticket instead of having to authenticate again) as well as using passthrough authentication (having OpenLDAP pass authentication on to Kerberos), both of these two keys (host and ldap) are required in one keytab file, accessible by the kerberos libraries)
