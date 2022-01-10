---
title: Oracle
---

## Client

#### Install Oracle client on Ubuntu

[https://gist.github.com/bmaupin/1d376476a2b6548889b4dd95663ede58](https://gist.github.com/bmaupin/1d376476a2b6548889b4dd95663ede58)

## SQL Developer

#### Install SQL Developer on Ubuntu

[https://gist.github.com/bmaupin/ad02e5b4a17abfc662d61664bced2773](https://gist.github.com/bmaupin/ad02e5b4a17abfc662d61664bced2773)

#### Using the OCI/thick client

1. Install the Oracle client (see above)

1. Close SQL Developer

1. Run this command to configure `java.library.path`

   ```
   echo "AddVMOption -Djava.library.path=/usr/lib/oracle/12.1/client64/lib" >> ~/.sqldeveloper/19.4.0/product.conf
   ```

   Change the paths as necessary

1. Open SQL Developer

1. _Tools_ > _Preferences_ > _Database_ > _Advanced_

1. Check _Use Oracle Client_

1. _Configure_

   1. _Client Type_ > _Instant Client_

   1. _Client Location_: /usr/lib/oracle/12.1/client64/lib

   1. Click _Test_ and make sure there are no errors

   1. Click _OK_

1. Check _Use OCI/Thick driver_, _OK_

#### Viewing tables

1. In the _Connections_ view on the left, expand _Tables_ under the applicable database connection

   - If you don't see the table you're looking for, it may be under a different user. Expand _Other Users_ under the connection name and then expand _Tables_ under the applicable user.

   - It may also be useful to look in _Views_ in case the table you're looking for is actually a view

     - If you still don't see the table you're looking for, you may not have permissions to see it (although you may still be able to query it)

#### Working with packages

1. In a SQL tab, type the name of the package

1. Right-click on the package name > _Popup Describe_ to view the function declarations in the package

1. Near the top of the package tab that opens up, click _Open Body_ to view the source

   - If you click _Open Body_ and nothing happens, it's possible your user does not have permissions to view the package body

## Database

#### Run Oracle Database XE (Express Edition) in a container

[https://github.com/oracle/docker-images/tree/master/OracleDatabase/SingleInstance#readme](https://github.com/oracle/docker-images/tree/master/OracleDatabase/SingleInstance#readme)

1. Check out Oracle's container image repo

   ```
   git clone https://github.com/oracle/docker-images.git
   cd docker-images/OracleDatabase/SingleInstance/dockerfiles
   ```

1. For 11.2.0.2, download the Oracle DB XE binaries and copy to docker-images/OracleDatabase/SingleInstance/dockerfiles/11.2.0.2

1. Build the container image

   - 18

     ```
     ./buildDockerImage.sh -v 18.4.0 -x -o --network=host
     ```

     (`-o --network=host` is only required if you're using Docker with `iptables: false`)

   - 11

     ```
     ./buildDockerImage.sh -v 11.2.0.2 -x -o --network=host
     ```

1. Run the container

   - Run it just once and automatically delete it when it's stopped

     - 18

       ```
       docker run --rm -p 1521:1521 oracle/database:18.4.0-xe
       ```

     - 11

       ```
       docker run --rm --shm-size=1g -p 1521:1521 oracle/database:11.2.0.2-xe
       ```

   - Stop the container using <kbd>Ctrl</kbd>+<kbd>C</kbd>

   - Run it so it can be stopped and restarted

     - Run it the first time

       - 18

         ```
         docker run --name oracledb -p 1521:1521 oracle/database:18.4.0-xe
         ```

       - 11

         ```
         docker run --name oracledb --shm-size=1g -p 1521:1521 -e oracle/database:11.2.0.2-xe
         ```

     - Run it after it's been stopped

       e.g.

       ```
       docker container start -a oracledb
       ```

     - Delete it when you're finished

       e.g.

       ```
       docker container rm oracledb
       ```

1. Connect to the database

   - If no password is provided, one will be generated and printed near the top of the output of `docker run`
   - SID: `XE`
   - User: `system`
