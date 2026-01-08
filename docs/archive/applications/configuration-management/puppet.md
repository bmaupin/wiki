---
title: Puppet
---

See: [http://projects.puppetlabs.com/projects/puppet/wiki/Documentation_Start#TypeandLanguageReference](http://projects.puppetlabs.com/projects/puppet/wiki/Documentation_Start#TypeandLanguageReference)


## Basics

#### Vocabulary
See: [http://docs.puppetlabs.com/puppet/latest/reference/lang_visual_index.html](http://docs.puppetlabs.com/puppet/latest/reference/lang_visual_index.html)



## Types

#### [exec](http://docs.puppetlabs.com/references/latest/type.html#exec)
Executes a command/script

    exec { "my_command":
        command => "/path/to/script",
        onlyif => "/some/command", # only if this returns true
        unless => "/some/command",  # opposite of onlyif
        require => ...
    }


#### [service](http://docs.puppetlabs.com/references/latest/type.html#service)
Manages a system service

    service { "tomcat5":
        # turns it on at system startup
        enable => true,
        # makes sure it's running
        ensure => running,
        # in case the service doesn't have status or doesn't return non-0 when it's not running and 0 when it is
        status => "/sbin/service tomcat5 status | /bin/grep 'is running'",
        # puppet doesn't assume a service has status by default since many don't.  instead it just checks the process list for the name of the service
        hasstatus => true,
        # if these things change, restart the service
        subscribe => [
            File[ "/etc/tomcat5/server.xml" ],
            File[ "/etc/tomcat5/tomcat5.conf" ],
        ],
        require => ...
    }



## Metaparameters

These can be used with any type
See: [http://docs.puppetlabs.com/references/latest/metaparameter.html](http://docs.puppetlabs.com/references/latest/metaparameter.html)

#### [alias](http://docs.puppetlabs.com/references/latest/metaparameter.html#alias)
Allows you to create an alias for a type.  particularly useful for long commands/filenames/package names or when you're defining a type based on a variable, as seen in this example:

    file { sshdconfig:
        path => $operatingsystem ? {
            solaris => "/usr/local/etc/ssh/sshd_config",
            default => "/etc/ssh/sshd_config"
        },
        source => "..."
    }

    service { sshd:
        subscribe => File[ sshdconfig ]
    }


#### [before](http://docs.puppetlabs.com/references/latest/metaparameter.html#before)
Opposite of require

    exec { "/my/script":
        before => Exec[ "/another/command" ],
    }



## Misc

#### Conditionals

    if $variable == "value" or $variable == "somethingelse" {
        # define a type here, or do something else
    } elsif $variable == "other thing" {
    } else {
    }


#### Setting one variable based on the value of another

    $var1 = $var2 ? {
        var2_value1 => "set var1 value to this",
        var2_value2 => "set var1 value to that",
        default => "default value of var1"
    }


#### Do a dry run

    sudo puppet agent --noop --server=puppet.example.org



## Tricks

#### Remove a folder and all its contents (rm -rf)

    file { "/var/lib/tomcat6/webapps/host-manager":
        ensure => absent,
        force => true,
        backup => false,
    }


#### Ensure file permissions without managing content

    file { "/var/log/tomcat6-initd.log":
        owner => "tomcat",
        group => "root",
        mode => "0644",
        require => Package[ "tomcat" ],
    }
