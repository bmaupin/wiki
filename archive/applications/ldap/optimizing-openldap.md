---
title: Optimizing OpenLDAP
---

For more information, see:
[http://www.openldap.org/doc/admin24/tuning.html](http://www.openldap.org/doc/admin24/tuning.html)


#### Determining what database backend is being used
1. Look at slapd.conf for the server in question
2. Find the line beginning with `database`. This will tell you what database backend is being used:
    ```
    database mdb
    ```


#### Optimizations for mdb (recommended)
1. Maximum database size (`maxsize`)
    - For more information, see [slapd-mdb man page](http://www.openldap.org/software/man.cgi?query=slapd-mdb)
    - The maximum database size is configured in slapd.conf in the database configuration section (after the line beginning with "database") like so:
        ```
        # 100 GB max database size
        maxsize 107374182400
        ```
    - The default maxsize is 10 MB
    - This parameter is the maximum size the database will be allowed to grow. It's best to set this to a very large value (as in the example above) to allow room for growth
        - "It is important to set this to as large a value as possible, (relative to anticipated growth of the actual data over time) since growing the size later may not be practical when the system is under heavy load." ([slapd-mdb man page](http://www.openldap.org/software/man.cgi?query=slapd-mdb))
        - This value isn't limited by the memory of the machine, since the amount of physical memory used will only be as much as the actual size of the database, not the maxsize value, which is allocated virtually [http://www.openldap.org/lists/openldap-technical/201208/msg00177.html](http://www.openldap.org/lists/openldap-technical/201208/msg00177.html)


#### Optimizations for bdb/hdb
1. `DB_CONFIG`
    - For more information, see [OpenLDAP FAQ: What are the DB_CONFIG configuration directives?](http://www.openldap.org/faq/data/cache/1072.html)
    - This file is located in the data directory, which is defined in slapd.conf with the "directory" directive:
        ```
        directory /usr/local/var/openldap-data
        ```
        **Warning:** Any time any of the values in DB_CONFIG are changed, the database must be reconfigured by running db_recover when slapd isn't running (if you run db_recover while slapd is running, database corruption will likely result):
        ```
        sudo /sbin/service ldap stop
        sudo /usr/local/bin/db_recover -h /usr/local/var/openldap-data
        sudo /sbin/service ldap start
        ```

    1. Database cache size (set_cachesize)
        - For more information, see:
            - [OpenLDAP Admin Guide: Berkeley DB Cache](http://www.openldap.org/doc/admin24/tuning.html#Berkeley%20DB%20Cache)
            - [http://docs.oracle.com/cd/E17076_02/html/programmer_reference/general_am_conf.html#am_conf_cachesize](http://docs.oracle.com/cd/E17076_02/html/programmer_reference/general_am_conf.html#am_conf_cachesize)
        - **Note:** This is one of the most important configuration parameters and needs to be configured in conjunction with the entry cache size and IDL cache size (see below).
            - The database cache size is configured in DB_CONFIG like so:
                ```
                set_cachesize 4 0 1
                ```
                - The first parameter is how big the cache should be in gigabytes (this is in addition to the size of the cache in bytes)
                - The second parameter is how big the cache should be in bytes (this in addition to the size of the cache in gigabytes)
                - The last parameter is the number of chunks to split the cache into. This is mostly used for operating systems or architectures with restrictions on memory or storage used by individual processes or files. On 64-bit systems, it shouldn't be necessary to split the cache, and so you should set this value to 1. ([http://www.openldap.org/lists/openldap-software/200903/msg00145.html](http://www.openldap.org/lists/openldap-software/200903/msg00145.html))
                    - "The maximum size of a single cache is 4GB on 32-bit systems and 10TB on 64-bit systems." ([http://docs.oracle.com/cd/E17076_02/html/api_reference/C/dbset_cachesize.html](http://docs.oracle.com/cd/E17076_02/html/api_reference/C/dbset_cachesize.html))
            - If you are able to set an entry cache size (see below) large enough to hold all of the entries in your directory as well as the necessary corresponding IDL cache size (see below), the optimal database cache size "is just the size of the id2entry.bdb file, plus about 10% for growth." ([http://www.openldap.org/doc/admin24/tuning.html](http://www.openldap.org/doc/admin24/tuning.html))
                - This will give you the cache size values to use (these may need to be adjusted to reflect the cache size limits based on the architecture, as mentioned above):
                    ```
                    for mbytes in `sudo du -c -m /usr/local/var/openldap-data/id2entry.bdb | grep \
                    total | cut -f 1`; do python -c "from math import ceil; gbytes = \
                    ceil(($mbytes*1.1)/102.4); print 'set_cachesize %i %i 1' % (gbytes/10, \
                    (gbytes%10)*100*(2**20))"; done
                    ```
                    (Takes the size of id2entry.bdb, adds 10%, rounds up to nearest 100 MB, formats it)
            - If you are unable to set an entry cache size large enough to hold all of the entries in your directory (as well as the necessary corresponding IDL cache size), the next best configuration is to create a database cache size large enough to hold the entire database.
                - To determine the size of the database, go to the database directory and run this command:
                    ```
                    du -c -h *.bdb
                    ```
                    Ex:
                    ```
                    sudo -s
                    cd /usr/local/var/openldap-data
                    du -c -h *.bdb | grep total
                    ```
            - The database cache size should be, at a minimum, "large enough for your 'working set.' That means, large enough to hold all of the most frequently accessed data, plus a few less-frequently accessed items." ([http://www.openldap.org/doc/admin24/tuning.html](http://www.openldap.org/doc/admin24/tuning.html))

    2. Database locks (set_lk_max_locks, set_lk_max_lockers, set_lk_max_objects)
        - For more information, see [http://docs.oracle.com/cd/E17076_02/html/programmer_reference/lock_max.html](http://docs.oracle.com/cd/E17076_02/html/programmer_reference/lock_max.html)
        - The default values for the database locks, lockers, and lock objects is 1000 unless otherwise specified in DB_CONFIG
            - The default value for database lockers (not locks or lock objects) is normally sufficient
        - There is no easy way to determine the number of locks, lockers, or lock objects the database will need ahead of time
        - The best way to determine how many locks, lock objects, and lockers you need is to wait until slapd has been running for a while, and then run the following command:
            ```
            sudo db_stat -c -h /usr/local/var/openldap-data | head -n 16
            ```
            1. Look for these lines:
                ```
                4469 Maximum number of locks at any one time
                257 Maximum number of lockers at any one time
                2273 Maximum number of lock objects at any one time
                ```
            2. "As long as usage is within 85% of the configured values, it should not be necessary to modify the settings." (http://wiki.zimbra.com/wiki/OpenLDAP_Performance_Tuning_6.0)
            3. If you need to modify these settings, they can be added to (or modified in) DB_CONFIG like so:
                ```
                set_lk_max_locks 5500
                set_lk_max_objects 1500
                set_lk_max_lockers 3000
                ```
        - If you see one of the following errors, you will need to increase the amount of locks, lockers, or lock objects as applicable:
            - `Lock table is out of available locks`
            - `Lock table is out of available locker entries`
            - `Lock table is out of available object entries`

2. Entry cache size (`cachesize`)
    - For more information, see [OpenLDAP Admin Guide: Entry Cache](http://www.openldap.org/doc/admin24/tuning.html#%7B%7Bslapd%7D%7D%288%29%20Entry%20Cache%20%28cachesize%29)
    - **Note:** This is one of the most important configuration parameters and needs to be configured in conjunction with the database cache size (see above) and IDL cache size (see below).
        - The entry cache size is configured in slapd.conf in the database configuration section (after the line beginning with "database") like so:
            ```
            cachesize 100000
            ```
        - The entry cache keeps parsed entries in memory. If a requested entry is in the entry cache, this will give the fastest response time.
        - "Parsed entries in memory are generally about twice as large as they are on disk." ([http://www.openldap.org/doc/admin24/tuning.html](http://www.openldap.org/doc/admin24/tuning.html))
        - The default entry cache size is 1000 entries
        - The optimal entry cache size is large enough to hold all the entries in the directory, with some room for growth (10% or so).
            - To get the total number of entries in the directory, run this search:
                ```
                ldapsearch -b dc=example,dc=com dn 2>/dev/null | grep ^dn | wc -l
                ```
        - If you do not have sufficient memory to set a cache size large enough to hold all of the entries in the directory, the next best entry cache size is one large enough to hold the "working set" (the most frequently accessed entries, plus a few less-frequently accessed items).

3. IDL Cache (`idlcachesize`)
    - For more information, see [OpenLDAP Admin Guide: IDL Cache](http://www.openldap.org/doc/admin24/tuning.html#%7B%7BTERM:IDL%7D%7D%20Cache%20%28idlcachesize%29)
    - The IDL cache size is configured in slapd.conf in the database configuration section (after the line beginning with "database") like so:
        ```
        idlcachesize 300000
        ```
    - IDL stands for Index Data Lookups
    - "Each IDL holds the search results from a given query, so the IDL cache will end up holding the most frequently requested search results." ([http://www.openldap.org/doc/admin24/tuning.html](http://www.openldap.org/doc/admin24/tuning.html))
    - The default IDL cache size is 0
    - For back-bdb, "it is generally recommended to match the 'cachesize' setting." (ibid)
    - For back-hdb: "An hdb database needs a large idl-cachesize for good search performance, typically three times the cachesize (entry cache size) or larger." ([http://www.openldap.org/software/man.cgi?query=slapd-hdb](http://www.openldap.org/software/man.cgi?query=slapd-hdb))
    - "When you have enough IDL cache configured, back-hdb is generally a bit faster than back-bdb." ([http://www.openldap.org/lists/openldap-software/200404/msg00432.html](http://www.openldap.org/lists/openldap-software/200404/msg00432.html))


#### Misc optimizations
1. Threads (`threads`)
    - For more information, see [OpenLDAP Admin Guide: Threads](http://www.openldap.org/doc/admin24/tuning.html#%7B%7Bslapd%7D%7D%288%29%20Threads)
    - The threads parameter is configured in slapd.conf, normally near the top of the file, and not under any particular database section
    - The general rule of thumb is 4 threads for every real core (physical, not logical cores).
    - "The more threads that are configured per core, the slower slapd(8) responds for 'read' operations."
        - This seems to be because "thread scheduling overhead is too high relative to the CPU cost of a single LDAP read operation" ([http://www.openldap.org/lists/openldap-devel/200704/msg00039.html](http://www.openldap.org/lists/openldap-devel/200704/msg00039.html))
    - "The upper bound for good read performance appears to be 16 threads (which also happens to be the default setting)."

2. Put each database and logs on separate disks
    - See: [http://www.openldap.org/doc/admin24/tuning.html#Disks](http://www.openldap.org/doc/admin24/tuning.html#Disks)

3. Don't sync log file with every log write
    - For more information, see [http://www.openldap.org/doc/admin24/tuning.html#Improving%20throughput](http://www.openldap.org/doc/admin24/tuning.html#Improving%20throughput)
    - Prepend a `-` in front of the name of the LDAP log file in syslog.conf:
        ```
        # OpenLDAP log
        local4.*    -/var/log/ldap.log
        ```

4. Use an alternate malloc
    - For more information, see:
        - [http://highlandsun.com/hyc/malloc/](http://highlandsun.com/hyc/malloc/)
        - [http://www.openldap.org/lists/openldap-devel/200611/msg00004.html](http://www.openldap.org/lists/openldap-devel/200611/msg00004.html)

    - glibc's malloc doesn't handle memory allocation very well for some applications, particularly OpenLDAP. Two better alternatives are:
        1. tcmalloc, included with gperftools ([https://github.com/gperftools/gperftools](https://github.com/gperftools/gperftools))
            - tcmalloc seems to use less memory and perform faster than glibc's malloc

        2. hoard ([http://www.hoard.org/](http://www.hoard.org/))
            - hoard seems to be a little bit faster than tcmalloc when used with OpenLDAP, but it seems to use a little more memory as well

    - To use them, simply compile them and then use LD_PRELOAD to load them before loading slapd. This can be done in the ldap init script like so:
        ```
        # enable gperftools tcmalloc for improved memory allocation
        if [ -e /usr/local/lib/libtcmalloc_minimal.so ] ; then
            export LD_PRELOAD=/usr/local/lib/libtcmalloc_minimal.so
        fi
        ```
