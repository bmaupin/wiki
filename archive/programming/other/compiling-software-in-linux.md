---
title: Compiling software in Linux
---

#### TL;DR

```
CFLAGS="-O2" ./configure --prefix=/usr/local --enable-shared --disable-static
make
sudo make install
```

## hints/tips

- compile using `-O2` optimizations
  - see the optimization section below for more information
- in general, it's not a bad idea to specifically enable shared libraries and disable static libraries
  - this is often done by passing the `--enable-shared --disable-static` flags to configure, but see the instructions for the software you're building to make sure
- try not to use LD_LIBRARY_PATH, when building or executing your program
  - see the shared libraries section below for more information

#### when building

point to folders that include necessary header files using `CPPFLAGS="-I<include folder> -I<include folder 2>"`
(looks for the necessary headers at compile time)

point to folders that include necessary library files using `LDFLAGS="-L<lib folder> -L<lib folder 2>"`
(this will look for the necessary libraries at compile time)

most software sources accept the flags `--enable-shared` (to explicitly enable shared (dynamic) libraries) and `--disable-static` (to disable static libraries). use them.

#### after building

install and run `ldd <executable>` for any binaries you may be using to make sure the shared libraries are found

if there are any that say not found, see the "shared libraries" section toward the end of this document

## basics/definitions

#### CFLAGS

pass options to the C compiler

#### CPPFLAGS

pass options to the C preprocessor

#### CXXFLAGS

pass options to the C++ compiler

#### CCFLAGS

pass options to the C and C++ compilers

I'm afraid this may apply to Sun's "cc" compiler only (or other versions of make such as nmake)

#### LDFLAGS

pass options to linker

#### linker

"a program that takes one or more objects generated by a compiler and combines them into a single executable program." ([http://en.wikipedia.org/wiki/Linker\_%28computing%29](http://en.wikipedia.org/wiki/Linker_%28computing%29))

#### .c files

c source code files

#### .h files

c header files

#### .o files

object files: what you get when you compile .c and .h files

#### to list symbols in object files

use nm

#### .a files

static library files, made from object files

static library files can contain multiple object files

#### to list object files in library files:

```
ar t <library file>
```

#### .so files

shared object files (dynamically linked library files)

"Dynamic libraries almost always offer some form of sharing, allowing the same library to be used by multiple programs at the same time." ([http://en.wikipedia.org/wiki/Library\_%28computing%29](http://en.wikipedia.org/wiki/Library_%28computing%29))

## shared libraries

#### see which libraries a binary is compiled with:

```
ldd <binary>
```

#### shared library search paths

best solution: add location of shared libaries to system search path:

1. add file to /etc/ld.so.conf.d containing location of custom shared library path
1. update the cache
   ```
   sudo /sbin/ldconfig
   ```

worst solution: add the path to LD_LIBRARY_PATH when you run the binary

- Ex:

  ```
  LD_LIBRARY_PATH="<custom library path>" && /PATH/TO/BINARY
  ```

  or:

  ```
  export LD_LIBRARY_PATH="<custom library path>"/PATH/TO/BINARY
  ```

- why LD_LIBRARY_PATH is bad:
  - [http://prefetch.net/articles/linkers.badldlibrary.html](http://prefetch.net/articles/linkers.badldlibrary.html)
  - [http://www.xahlee.org/UnixResource*dir/*/ldpath.html](http://www.xahlee.org/UnixResource_dir/_/ldpath.html)

alternative solution: rpath

- [http://en.wikipedia.org/wiki/Rpath\_%28linking%29](http://en.wikipedia.org/wiki/Rpath_%28linking%29)
- this is the runtime path, essentially the path the binary/library will search for libraries it depends on at run time.
- this may be useful if you're compiling software that relies on libraries in non-standard locations, e.g. /opt/openssl/lib instead of /usr/lib or /usr/local/lib
- rpath problems:
  - [http://wiki.debian.org/RpathIssue](http://wiki.debian.org/RpathIssue)

#### to check the rpath of a binary

```
readelf -d <binary> | grep RPATH
```

It should probably look something like this:

```
[user@server sbin]$ readelf -d /opt/openldap/libexec/slapd | grep RPATH

 0x000000000000000f (RPATH)              Library rpath: [/opt/openldap/lib:/opt/db4/lib:/opt/cyrus-sasl/lib:/opt/openssl/lib:/opt/heimdal/lib]
```

#### to set the rpath of a binary (during compile time)

you have several options:

1. use `-Wl,-rpath`
   ```
   LDFLAGS="-Wl,-rpath,<lib folder>"
   ```
1. use `-R`

   ```
   LDFLAGS="-L<lib folder> -R<lib folder>"
   ```

   may not work, check build logs to make sure there are no errors

1. use `LD_RUN_PATH` during compile

   ```
   LD_RUN_PATH="<lib folder>"
   ```

1. use `LD_LIBRARY_PATH` during compile (not recommended, but use as last resort)
   ```
   LD_LIBRARY_PATH="<lib folder>"
   ```

#### to see if a library is 64 or 32-bit:

```
readelf -h /path/to/library.so | grep Class
```

result will be 'ELF32' or 'ELF64'

## compile time optimization/debugging

build binaries with debugging information
use the `-g` flag, and no optimization

Ex:

```
CFLAGS="-g -O0" ./configure
```

there may be extra steps required to enable debugging symbols. You can use the "file" command on a binary to see if debugging symbols have or haven't been stripped (if they've been stripped then they aren't present). See the part of this document pertaining to the "file" command under the misc section for more information.

#### optimization

when compiling, use the -O2 flag to optimize code speed and size (will take longer to compile but run faster when compiled). don't use -O3, as this could actually increase the size of the code enough to slow it down.

Ex:

```
CFLAGS="-O2" ./configure
```

#### enable all compiler warnings

use `-Wall`. this is recommended because it can help catch bugs early.

Ex:

```
CFLAGS="-Wall -g -O2" ./configure
```

#### $RPM_OPT_FLAGS

this variable is used in RPM SPEC files, like so:

```
CFLAGS="$RPM_OPT_FLAGS" ./configure
```

value of $RPM_OPT_FLAGS in RHEL 5.6:

```
-O2 -g -m64 -mtune=generic
```

## debugging a running process

#### using gdb to attach to a running process

```
install gdb
ps -ef | grep slapd
gdb
attach <process id>
info threads
detach
```

## misc

#### get information about a binary

(architecture, whether it's dynamically or statically linked, whether or not debugging symbols have been stripped)

```
file /path/to/file
```

Ex:

```
$ file /opt/openldap/libexec/slapd
/opt/openldap/libexec/slapd: ELF 64-bit LSB executable, AMD x86-64, version 1 (SYSV), for GNU/Linux 2.6.9, dynamically linked (uses shared libs), for GNU/Linux 2.6.9, stripped
```