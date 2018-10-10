---
title: Server software
---

Notes:
- In general, these will be listed in order of preference
- Open-source unless otherwise noted


#### Blog
- [WordPress](http://wordpress.org/)
    - Blogging software that can also act as a full-blown CMS

- [Ghost](https://ghost.org/)
    - Simple and lightweight blog server (doesn't include search by default, for example)


#### Chat/instant messaging server
- [Openfire](http://www.igniterealtime.org/projects/openfire/)
    - Uses XMPP (Jabber) protocol

- [ejabberd](https://www.process-one.net/en/ejabberd/)
    - Uses XMPP (Jabber) protocol


#### CMS (content management system)
- [WordPress](http://wordpress.org/)
    - The most popular CMS
    - Also a blogging platform

- [Kotti](http://kotti.pylonsproject.org/)
    - Written in Python
    - Based on Pyramid framework


#### Code hosting/repository management/issue tracking
- [Gogs](http://gogs.io/)
    - Very fast and lightweight
    - [Less features than GitLab](http://www.apertoire.net/gogs-an-alternative-to-gitlab/#comparison:5880767147774326ded8eaa664656f14) but fully free and open-source

- [GitLab](https://about.gitlab.com/)
    - [Community and enterprise editions](https://about.gitlab.com/features/#compare)


#### Configuration management
- [SaltStack](http://saltstack.com/)
    - Written in Python
    - Improvements over Puppet:
        - Maintains constant client connections so changes are immediate
        - More integrated and easier to configure orchestration than Puppet's MCollective
        - Handles SSL keys better than Puppet
        - The community version of SaltStack has the same features as the enterprise version
        - Uses YAML, which is arguably easier to write than Puppet DSL


#### Directory server
- [OpenLDAP](http://www.openldap.org/)
    - Fastest implementation of LDAP
        - [Compared to 389/Fedora DS](http://www.connexitor.com/blog/pivot/entry.php?id=130)
        - [Compared to OpenDS and ApacheDS](http://www.connexitor.com/blog/pivot/entry.php?id=131)
        - [Compared to Oracle Internet Directory and OpenDS](http://www.symas.com/index.php/blog/more-benchmarking/)
        - [Compared to AD](http://www.mail-archive.com/ldap@umich.edu/msg01464.html)
    - Most scalable implementation of LDAP
        - [http://connexitor.com/blog/pivot/entry.php?id=203](http://connexitor.com/blog/pivot/entry.php?id=203)
- [OpenDJ](http://www.forgerock.com/en-us/products/directory-services/)/[OpenDS](http://www.opends.org/)
    - OpenDJ: fork of OpenDS after Oracle acquired Sun and stopped development of OpenDS
    - Written in Java, slightly slower than OpenLDAP ([http://www.symas.com/index.php/blog/more-benchmarking/](http://www.symas.com/index.php/blog/more-benchmarking/))
    - Easier to set up than OpenLDAP
- [389 Directory Server](http://directory.fedoraproject.org/) (formerly Fedora Directory Server)
    - Slower than OpenLDAP ([http://www.connexitor.com/blog/pivot/entry.php?id=130](http://www.connexitor.com/blog/pivot/entry.php?id=130))
    - Sold commercially as Red Hat Directory Server
- [Apache Directory Server](http://directory.apache.org/)
    - Written in Java, much slower than OpenLDAP ([http://www.connexitor.com/blog/pivot/entry.php?id=131](http://www.connexitor.com/blog/pivot/entry.php?id=131))


#### Email/communication
- [Zimbra Collaboration Server](http://www.zimbra.com/)
    - Email, calendar, address book, document sharing, chat, VOIP, web interface


#### File storage/collaboration
- [Zimbra Collaboration Server](http://www.zimbra.com/)

- [ownCloud](https://owncloud.org/)
    - Versioning
    - Collaborative editing of .odt and .doc files
    - Full text file search
    - REST API
    - [Community and Enterprise editions](https://owncloud.com/community-enterprise/)

- [Seafile](http://seafile.com/)
    - Versioning
    - Markdown support
    - [Community and Professional editions](http://seafile.com/en/product/private_server/)
        - Some features only available in the paid edition, like full text file search, HA


#### Question and answer (like stackexchange.com)
- [Askbot](http://askbot.org/doc/)
    - Written in Python, on Django web framework
    - Similar origins as OSQA

- [OSQA](http://www.osqa.net/)
    - Written in Python, on Django web framework


#### System monitoring
- [Shinken](http://www.shinken-monitoring.org/)
    - Compatible with Nagios
    - Completely redesigned to be more powerful, efficient, flexible than Nagios

- [Icinga](https://www.icinga.org/)
    - Compatible with Nagios
    - Rewrite of Nagios with updated web interface, more database connectors, and REST API


#### Wiki
- [MediaWiki](https://www.mediawiki.org)
    - The best free wiki software available

- [Confluence](https://www.atlassian.com/software/confluence)
    - The best commercial wiki software available
    - Free for open-source, nonprofits, and classroom use
