---
title: Compiling OpenLDAP
---

- For more information on compiling OpenLDAP, see: [http://www.openldap.org/doc/admin/install.html](http://www.openldap.org/doc/admin/install.html)
- For more information on compiling software in GNU/Linux, see: [compiling software in GNU/Linux](https://sites.google.com/site/bmaupinwiki/home/programming/other/compiling-software-in-linux)

1. Download the latest stable version of OpenLDAP from [http://www.openldap.org/software/download/](http://www.openldap.org/software/download/)

2. Extract it
```
tar xvf openldap-stable-YYYYMMDD.tgz
```

3. View the README file
```
less openldap-X.X.X/README
```

4. Make note of the required versions of the dependencies:
    - Berkeley DB
    - OpenSSL
    - Heimdal Kerberos
    - Cyrus SASL

    You can also see recommended versions here (the recommended versions in the README file take precedence as they may differ between versions):
    [http://www.openldap.org/doc/admin/appendix-recommended-versions.html](http://www.openldap.org/doc/admin/appendix-recommended-versions.html)

5. Build Berkeley DB
    - **Note:** we used to build this from source because many distros provide an older version of Berkeley DB, and newer versions generally provide better performance. At this point, OpenLDAP is shifting to using the mdb backend instead of bdb/hdb. You still may need to build from source if it isn't built with the correct flags for OpenLDAP (`--enable-posixmutexes --with-mutex=POSIX/pthreads`), but you can probably stick with an older known stable version, such as 4.7.25 or 4.8.30. note that two of the primary OpenLDAP developers have been using 4.7.25 (plus patches) for years:
    [http://www.openldap.org/its/index.cgi/Incoming?id=7378#followup8](http://www.openldap.org/its/index.cgi/Incoming?id=7378#followup8)

    1. First figure out whether you need to build Berkeley DB or can use the version provided by your distro
        - Was the build provided by your distro built using the following flags?:

            ```
            --enable-posixmutexes --with-mutex=POSIX/pthreads
            ```

            If not, you'll need to build it

    2. If you need to build Berkeley DB, make sure at a minimum you build it with the following flags:

        ```
        --enable-posixmutexes --with-mutex=POSIX/pthreads
        ```

        - For more information on those flags, see: [http://laviefrugale.blogspot.com/2010/05/compiling-berkeley-db-on-gnulinux.html](http://laviefrugale.blogspot.com/2010/05/compiling-berkeley-db-on-gnulinux.html)

    3. Building Berkeley DB
        1. Download it
            - [http://www.oracle.com/technetwork/database/berkeleydb/downloads/index.html](http://www.oracle.com/technetwork/database/berkeleydb/downloads/index.html)

            Make sure you also download any relevant patches

        2. Extract it

            ```
            tar xvf db-x.x.x.tar.gz
            ```

        3. Compile it.  These are the steps I'm using:

            ```
            cd db-x.x.x/build_unix
            patch -p0 < db-x.x.x.patch0 (and so on...)
            CFLAGS="-O2" ../dist/configure --prefix=/usr/local --enable-shared --disable-static --enable-posixmutexes --with-mutex=POSIX/pthreads
            make
            ```

        4. Install it

            ```
            make install
            ```

6. Build OpenSSL
    1. Do you need to build it?

        If you're using RHEL, the answer is probably yes.  See here for why:
        [http://www.openssl.org/support/faq.html#BUILD8](http://www.openssl.org/support/faq.html#BUILD8)

        Otherwise, you're probably fine with your distro's supplied version

    2. Building OpenSSL
        1. Download it
            - [http://www.openssl.org/source/](http://www.openssl.org/source/)

        2. Extract it

            ```
            tar xvf openssl-x.x.x.tar.gz
            ```

        3. Compile it.  These are the steps I'm using:

            ```
            cd openssl-x.x.x
            CFLAGS="-O2" ./config --prefix=/usr/local shared
            make
            ```

        4. Install it

            ```
            make install
            ```

7. Build Heimdal Kerberos
    - **Note:** Heimdal Kerberos 1.4 is missing a file needed for it to compile.  See here for details and a fix:
    [http://laviefrugale.blogspot.com/2011/03/heimdal-14-missing-libotpversion.html](http://laviefrugale.blogspot.com/2011/03/heimdal-14-missing-libotpversion.html)

    1. Why Heimdal Kerberos (as opposed to MIT or one of the other flavors)? See here: [http://www.openldap.org/lists/openldap-software/200804/msg00222.html](http://www.openldap.org/lists/openldap-software/200804/msg00222.html)

    2. Do you need to build it?

        Only if your distro doesn't provide a package for it (RHEL).  It's probably good to build it on RHEL anyway since OpenSSL is a dependency and you must compile it yourself for RHEL

    3. Building Heimdal Kerberos
        1. Install dependencies
            - byacc
            - OpenSSL libraries and header files
                - These should already be installed if you built OpenSSL in an earlier step.  Otherwise:
                    - deb-based distros: libssl-dev
                    - rpm-based distros: openssl-devel

        2. Download it
            - [http://www.h5l.org/dist/src/](http://www.h5l.org/dist/src/)

        3. Extract it

            ```
            tar xvf heimdal-x.x.x.tar.gz
            ```

        4. Compile it.  These are the steps I'm using:

            ```
            cd heimdal-x.x.x
            CFLAGS="-O2" CPPFLAGS="-I/usr/local/include/" LDFLAGS="-L/usr/local/lib" ./configure --prefix=/usr/local --sysconfdir=/usr/local/etc --enable-shared --disable-static --enable-pthread-support --with-openssl=/usr/local
            make
            ```

            - `--sysconfdir`
                - This is where Heimdal Kerberos will look for a kerberos keytab

        5. Install it

            ```
            make install
            ```

8. Build Cyrus SASL
    - **Note:** Cyrus SASL 2.1.25 is buggy.  Either make sure it's fully patched, or use an older version (like 2.1.23):
    [http://www.openldap.org/lists/openldap-technical/201202/msg00440.html](http://www.openldap.org/lists/openldap-technical/201202/msg00440.html)

    - **Note:** Cyrus SASL 2.1.23 has a bug that will prevent the GSSAPI module from compiling.  See here for details and a fix:
    [http://laviefrugale.blogspot.com/2011/04/libgssapiv2so2-undefined-symbol.html](http://laviefrugale.blogspot.com/2011/04/libgssapiv2so2-undefined-symbol.html)

    1. Do you need to build it?

        I don't know :)  I tried once building OpenLDAP against RHEL's Cyrus SASL, and I had problems.  I'm not sure if I did it wrong, there are problems with RHEL's Cyrus SASL, or it needs to be built because it depends on OpenSSL and Heimdal Kerberos, which must be built in RHEL.

        My suggestion: RHEL: build it.  Anything else: try your distro's package.

    2. Building Cyrus SASL
        1. Install dependencies
            - OpenSSL libraries and header files
                - See the Heimdal Kerberos dependencies instructions above.
            - Heimdal Kerberos libraries and header files
                - deb-based distros: heimdal-dev

    3. Download it
        - [ftp://ftp.cyrusimap.org/cyrus-sasl/](ftp://ftp.cyrusimap.org/cyrus-sasl/)
        - [ftp://ftp.andrew.cmu.edu/pub/cyrus-mail/](ftp://ftp.andrew.cmu.edu/pub/cyrus-mail/)

    4. Extract it

        ```
        tar xvf cyrus-sasl-x.x.x.tar.gz
        ```

    5. Compile it.  These are the steps I'm using:

        ```
        cd cyrus-sasl-x.x.x
        CFLAGS="-O2" CPPFLAGS="-I/usr/local/include" LDFLAGS="-L/usr/local/lib" ./configure --prefix=/usr/local --enable-shared --disable-static  --with-openssl=/usr/local --enable-gssapi=/usr/local --with-plugindir=/usr/local/lib/sasl2
        make
        ```

    6. Install it

        ```
        make install
        ```

9. Build OpenLDAP
    1. Do you need to build it?

        I hope so!  If not, why are you here?  Seriously, though, you will want to run the most recent stable version of OpenLDAP.  If your distro provides that, good for you.  Otherwise, you'll probably want to build it yourself. You'll probably also want to build it if you had to build any of the dependencies.

    2. Building OpenLDAP
        1. Install dependencies for building OpenLDAP
            - Berkeley DB libraries and header files
                - These should already be installed if you built Berkeley DB in an earlier step.  otherwise:
                    - deb-based distros: libdbX.X-dev
                    - rpm-based distros: dbX-devel
            - OpenSSL libraries and header files
                - See Cyrus SASL dependencies instructions above.
            - Heimdal Kerberos libraries and header files
                - See Cyrus SASL dependencies instructions above.
            - Cyrus SASL libraries and header files
                - These should already be installed if you built Cyrus SASL in an earlier step.  otherwise:
                    - deb-based distros: libsasl2-dev
                    - rpm-based distros: cyrus-sasl-devel

        2. Install dependencies for running OpenLDAP
            - Berkeley DB libraries and header files
                - These should already be installed if you built Berkeley DB in an earlier step.  otherwise:
                    - deb-based distros: dbX-util
                    - rpm-based distros: dbX
            - OpenSSL libraries and header files
                - These should already be installed if you built OpenSSL in an earlier step.  otherwise:
                    - deb- and rpm-based distros: openssl
            - Heimdal Kerberos libraries and header files
                - These should already be installed if you built OpenSSL in an earlier step.  otherwise:
                    - deb-based distros:
                        - heimdal-clients
                        - libgssapi2-heimdal
            - Cyrus SASL libraries and header files
                - These should already be installed if you built Cyrus SASL in an earlier step.  otherwise:
                    - deb-based distros: libsasl2-2
                    - rpm-based distros: cyrus-sasl

        3. You've already downloaded and extracted it (see near the beginning of this document), so compile it.  These are the steps I'm using:

            ```
            CFLAGS="-O2" CPPFLAGS="-I/usr/local/include" LDFLAGS="-L/usr/local/lib" ./configure --prefix=/usr/local --enable-shared --disable-static --with-cyrus-sasl --with-kerberos --with-tls --enable-dynamic --enable-slapd --enable-modules --enable-spasswd --enable-rlookups --enable-wrappers --enable-rewrite --enable-backends=mod --disable-shell --disable-sql --enable-overlays=mod --disable-ndb
            make
            ```

            - `--enable-dynamic`
                - enable linking built binaries with dynamic libs (default = no)
            - `--enable-modules`
                - enable dynamic module support (default = no)
            - `--enable-backends=mod`
                - enable all available backends
            - `--disable-ndb`
                - fixes "configure: error: could not locate mysql_config"

        4. Test it

            ```
            make test
            ```

        5. Install it

            ```
            make install
            ```

10. Optional: build tcmalloc (Google Performance Tools)
    - Google Performance Tools includes a memory allocator, tcmalloc, which handles memory allocation more efficiently than glibc's malloc. Using tcmalloc instead of malloc for OpenLDAP decreases memory usage and improves performance.

        For more information, see:
        [http://www.openldap.org/pub/hyc/scale2007.pdf](http://www.openldap.org/pub/hyc/scale2007.pdf)
        (the relevant information starts on page 23)

    1. Download it
        - [http://code.google.com/p/google-perftools/downloads/list](http://code.google.com/p/google-perftools/downloads/list)

    2. Extract it

        ```
        tar xvf google-perftools-x.x.x.tar.gz
        ```

    3. Compile it.  These are the steps I'm using:

        ```
        cd google-perftools-x.x.x
        CFLAGS="-O2" CXXFLAGS="-O2" ./configure --enable-minimal --prefix=/usr/local
        make
        ```

        - `--enable-minimal`
            - builds only tcmalloc-minimal, which includes tcmalloc but none of the other performance tools

    4. Install it

        ```
        make install
        ```

    5. Link it

        Call slapd like this:

        ```
        LD_PRELOAD=/usr/local/lib/libtcmalloc_minimal.so && /usr/local/libexec/slapd
        ```

        Or put it in your openldap init script:

        ```
        if [ -e /usr/local/lib/libtcmalloc_minimal.so ] ; then
            export LD_PRELOAD=/usr/local/lib/libtcmalloc_minimal.so
        fi
        ```
