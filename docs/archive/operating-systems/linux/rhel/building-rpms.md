---
title: Building RPMs
---

1. Set up the build environment

   1. Install necessary packages
      ```
      sudo yum -y install gcc rpm-build
      ```
   1. Create ~/.rpmmacros with the following content:

      ```
      %packager       John Doe <jdoe@example.org>
      %vendor         My Company

      %_topdir        %{getenv:HOME}/rpm
      ```

      (The `packager` and `vendor` lines are optional)

   1. Make sure the following folders exist, creating them if necessary:

      - rpm
      - rpm/BUILD
      - rpm/RPMS
      - rpm/SOURCES
      - rpm/SPECS
      - rpm/SRPMS

      ```
      cd ~ && mkdir rpm rpm/BUILD rpm/RPMS rpm/SOURCES rpm/SPECS rpm/SRPMS
      ```

1. Copy source tarballs and any other file you wish to be part of the package to rpm/SOURCES
1. Create a spec file for the package and put it in rpm/SPECS

   - For more information on creating a spec file, see: [How to create an RPM package](https://fedoraproject.org/wiki/How_to_create_an_RPM_package)

1. Build the RPM

   ```
   rpmbuild -ba rpm/SPECS/PACKAGE.spec
   ```

   Two RPMs will be created. The binary will be in rpm/RPMS/_architecture_, and the source RPM will be in rpm/SRPMS.
