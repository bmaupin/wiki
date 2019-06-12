---
title: SLAMD
---

## Installation

#### Install SLAMD server
1. Install Java (if necessary)
    - (Prefer Sun Java cause it's supposedly faster and possibly more compatible)
    - RHEL:
        1. Add RHEL Supplementary channel to system in RHN
        2. ```sudo yum install java-1.6.0-sun```

    - Ubuntu:
        1. Enable "partner" repository
            - System > Administration > Software Sources > Other Software > (check partner) > Close
            - Or uncomment partner lines in /etc/apt/sources.list

        2. ```sudo aptitude install sun-java6-jre```

2. Verify Java install
    ```
    java -version
    ```

3. Download SLAMD
    - [http://www.slamd.com/download.shtml](http://www.slamd.com/download.shtml)

4. Extract and copy to /opt
    ```
    unzip slamd-x.x.x.zip
    sudo mv slamd /opt
    sudo chown root. /opt/slamd -R
    ```

5. Set up firewall
    1. Open port 8080/tcp, for Tomcat
    2. If you'll want to connect SLAMD clients running on other servers, open ports 3000-3003 for SLAMD

6. Start SLAMD
    ```
    sudo /opt/slamd/bin/startup.sh
    ```

7. Browse to SLAMD server
    - *hostname*:8080

8. Click *Create Database*


#### Install SLAMD clients
1. Install Java (if necessary)
    - See instructions above

2. Download SLAMD client
    - [http://www.slamd.com/download.shtml](http://www.slamd.com/download.shtml)

3. Extract SLAMD client
    ```
    unzip slamd_client-x.x.x.zip
    ```

4. Configure SLAMD client
    ```
    cd slamd_client
    vim slamd_client.conf
    ```
    1. Edit SLAMD_ADDRESS line to reflect address/IP of SLAMD server
    2. Optionally set a value for CLIENT_ID

5. Start the SLAMD client manager
    ```
    nohup ./start_client_manager.sh &
    head nohup.out
    ```

    Look for this line:
    ```
    Successfully connected to the SLAMD server at server:3001
    ```

6. Verify connectivity to the server
    1. Browse to the SLAMD server
        - *hostname*:8080
    2. Click on SLAMD Server Status
    3. Scroll down to Client Manager Listener Status
    4. Look for your client by IP or client ID



## using SLAMD

#### Request clients
1. Browse to the SLAMD server
    - *hostname*:8080
2. Click on SLAMD Server Status
3. Scroll down to Client Manager Listener Status
4. Type a number where it says Request __ clients, and click Submit
5. Verify the number of clients you want from each of your client machines, and click Connect
6. You'll be taken back to the Server Status page
7. Scroll down to Client Listener Status, and verify your clients are connected


#### Schedule a job
1. Browse to the SLAMD server > Manage Jobs > Schedule a Job
2. Select a job type
3. Specify either a stop time or a duration (in seconds)
4. Specify the number of clients to use for the job
5. Specify the number of threads per client
6. Fill out the rest of the parameters as necessary
    - If you need help with any of the parameters, there should be a link at the top that says "Click here for help regarding these parameters"


#### Schedule a new LDAP Load Generator job
1. Follow the above steps for scheduling a job
2. If using SSL, make sure Use SSL is checked and the port is set to the correct SSL port
3. In the frequency section, make sure at least one of the searches has a non-zero value
4. Click Test Job Parameters to make sure SLAMD is able to connect to LDAP
