---
title: WordPress (PHP)
---

#### to access database, use wpdb class:

[http://codex.wordpress.org/Function_Reference/wpdb_Class](http://codex.wordpress.org/Function_Reference/wpdb_Class)

#### plugin API

[http://codex.wordpress.org/Plugin_API](http://codex.wordpress.org/Plugin_API)

#### plugin API/action reference

[http://codex.wordpress.org/Plugin_API/Action_Reference](http://codex.wordpress.org/Plugin_API/Action_Reference)

#### wp function reference

[http://codex.wordpress.org/Function_Reference](http://codex.wordpress.org/Function_Reference)

#### wpmu function reference

[http://codex.wordpress.org/WPMU_Functions](http://codex.wordpress.org/WPMU_Functions)####

## buddypress

**note:** Buddypress currently only allows forums to be used in conjunction with groups. This will be changing soon as BBpress will be made a standalone Wordpress plugin and removed from Buddypress. see: [http://buddypress.org/2010/08/buddypress-and-bbpress-the-future/](http://buddypress.org/2010/08/buddypress-and-bbpress-the-future/)

#### disable admin bar

in wp-config.php:

```
define('BP_DISABLE_ADMIN_BAR', true);
```

#### allow site blogs to use buddypress features (as opposed to just main blog):

in wp-config.php:

```
define('BP_ENABLE_MULTIBLOG', true);
```
