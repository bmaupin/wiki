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

1. *Tools* > *Preferences* > *Database* > *Advanced*

1. Check *Use Oracle Client*

1. *Configure*

    1. *Client Type* > *Instant Client*
    
    1. *Client Location*: /usr/lib/oracle/12.1/client64/lib
    
    1. Click *Test* and make sure there are no errors
    
    1. Click *OK*
    
1. Check *Use OCI/Thick driver*, *OK*


#### Viewing tables

1. In the *Connections* view on the left, expand *Tables* under the applicable database connection

    - If you don't see the table you're looking for, it may be under a different user. Expand *Other Users* under the connection name and then expand *Tables* under the applicable user.

    - It may also be useful to look in *Views* in case the table you're looking for is actually a view

        - If you still don't see the table you're looking for, you may not have permissions to see it (although you may still be able to query it)


#### Working with packages

1. In a SQL tab, type the name of the package

1. Right-click on the package name > *Popup Describe* to view the function declarations in the package

1. Near the top of the package tab that opens up, click *Open Body* to view the source

    - If you click *Open Body* and nothing happens, it's possible your user does not have permissions to view the package body
