---
title: RHEL/CentOS package management
---

#### To update packages:

```shell
sudo yum update
sudo yum upgrade
```


#### To install a specific program:

```shell
sudo yum install [package name]
```


#### To install a downloaded package:

```shell
sudo rpm –iv [package name]
```

Ex:

```shell
sudo rpm –iv samba.rpm
```


#### To search for installed packages:

```shell
rpm –qi [package name]
```


#### To show which files an installed package provides:

```shell
rpm -ql [package_name]
```

Ex:

```shell
rpm -ql tomcat5
```

Or using yum:

```shell
sudo yum -y install yum-utils
sudo repoquery --list [package]
```

(If this doesn't work, use yumdownloader to download the package and rpm -qlp to get its contents. See below.)


#### To show which files an rpm file provides:

```shell
rpm -qlp [file_name]
```

Ex:

```shell
rpm -qlp google-perftools-devel-1.2.1.i386.rpm
```


#### To show which package provides a given file:

```shell
sudo yum update
sudo yum provides */[filename]
```

Or:

```shell
rpm -qf /path/to/[filename]
```


#### To download an rpm:

```shell
sudo yum -y install yum-utils
sudo yumdownloader [package]
```


#### To download a source rpm:

- RHEL 5:
    [http://ftp.redhat.com/pub/redhat/linux/enterprise/5Server/en/os/SRPMS/](http://ftp.redhat.com/pub/redhat/linux/enterprise/5Server/en/os/SRPMS/)

- RHEL 6:
    [http://ftp.redhat.com/pub/redhat/linux/enterprise/6Server/en/os/SRPMS/](http://ftp.redhat.com/pub/redhat/linux/enterprise/6Server/en/os/SRPMS/)

- RHEL 7:
    [http://wiki.centos.org/Sources#head-8a21a9f0902893140b2561b36245c97e26ebe4e4](http://wiki.centos.org/Sources#head-8a21a9f0902893140b2561b36245c97e26ebe4e4)

Or, you can use yumdownloader (but the rhel-src repo must be set up):
[http://kbase.redhat.com/faq/docs/DOC-15838](http://kbase.redhat.com/faq/docs/DOC-15838)

```shell
yumdownloader --source [package]
```


#### Extract the contents of an rpm (without installing it):

```shell
rpm2cpio myrpmfile.rpm | cpio -idmv
```


#### Downgrade packages

```shell
sudo yum downgrade java-1.7.0-openjdk-devel java-1.7.0-openjdk
```


#### List the configured software repositories

```shell
sudo yum repolist
```


#### Uninstall a package along with unused dependencies

```shell
sudo yum remove --setopt=clean_requirements_on_remove=1 package
```



## Yum

#### Yum options/flags:
- `provides`
    - Shows what package provides the given file
- `search`
    - Searches the yum database for packages containing the given string
- `list`
    - Lists all available packages.  when run as a normal non-root user, only shows     installed packages.  works well with grep.
- `info`
    - Lists details about a specific package or group of packages


#### Set up excludes
In yum.conf, create a space-separated list of package name-matching patterns to exclude:

```
exclude=php* kernel*
```


#### Ignore excludes

```shell
yum update --disableexcludes=all
```



## Repositories

#### List available repositories

```shell
sudo subscription-manager repos --list
```


#### Enable a repository

```shell
sudo subscription-manager repos --enable=repo_name
```

Ex:

```shell
sudo subscription-manager repos --enable=rhel-7-server-extras-rpms
```


#### Disable a repository

```shell
sudo subscription-manager repos --disable=repo_name
```

Ex:

```shell
sudo subscription-manager repos --disable=rhel-7-server-extras-rpms
```
