---
title: Fabric
---

#### Using Fabric
1. Install Fabric
    - Linux

            sudo apt-get install python-pip python-setuptools
            sudo pip install fabric

        Or:

            sudo apt-get install fabric

    - Windows
        - [http://www.fabfile.org/installing.html#activepython-and-pypm](http://www.fabfile.org/installing.html#activepython-and-pypm)

    - OS X
        - [http://www.flipflops.org/2013/05/18/installing-hombrew-and-fabric-on-osx/](http://www.flipflops.org/2013/05/18/installing-hombrew-and-fabric-on-osx/)

2. Create fabfile.py. Ex:

        from fabric.api import run, sudo

        def uname():
        run('uname -a')

        def poweroff():
        sudo('poweroff')

3. Run fab. Ex:

        fab -k -H myserver1,myserver2 uname


#### Specifying username

    fab -k -u myuser -H myserver1,myserver2 uname


#### Running in parallel on multiple servers

    fab -IPk -u myuser -H myserver1,myserver2 uname


#### Capturing output

    result = run('grep IPADDR /etc/sysconfig/network-scripts/ifcfg-*')


#### Specify user, host, etc in fabfile.py (or in python interpreter)

    from fabric.api import env
    env.user = 'myuser'
    env.host_string = ['myserver1.example.org']


#### Continue to next task if there's an error

    from fabric.api import env
    env.warn_only = True


#### Continue to next host if there's an error

    from fabric.api import env
    env.skip_bad_hosts = True


#### Running a command as a different user

    sudo('whoami', user='tomcat')


#### Starting/restarting a service
You need to use set -m ([http://stackoverflow.com/a/21030592/399105](http://stackoverflow.com/a/21030592/399105)):

    sudo('set -m; '/sbin/service httpd restart')


#### Using parameters with tasks
[http://stackoverflow.com/a/8960883/399105](http://stackoverflow.com/a/8960883/399105)

Tasks can be configured to accept parameters. To send parameters to tasks:

    fab task:hello
    fab task:something=hello
    fab task:foo=99,bar=100

**Note:** parameter values are passed as strings only!


#### Hiding output of a command
[http://stackoverflow.com/a/9621835/399105](http://stackoverflow.com/a/9621835/399105)

    from __future__ import with_statement
    from fabric.api import hide, run

    with hide('output'):
        result = run('ls -1 /opt/vmware/vfabric-tc-server-standard/')

You can also hide the notification that the command is running as well as any warnings:

    with hide('output', 'running', 'warnings'):

Or hide everything:

    with hide('everything'):


#### Modifying sudo parameters
For example, to use sudo -i:

    from fabric.api import env, sudo

    with settings(sudo_prefix='sudo -i -p \'{}\''.format(env.sudo_prompt)):
        sudo(...
