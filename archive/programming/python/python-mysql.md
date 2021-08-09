---
title: Python MySQL
---

<!-- Tell web crawlers not to index this page as it's so light on content it generates a soft 404 (https://developers.google.com/search/docs/advanced/crawling/block-indexing) -->
<meta name="robots" content="noindex">

use [MySQLdb](http://mysql-python.sourceforge.net) or [SQLAlchemy](http://www.sqlalchemy.org/) (for greater abstraction)

## MySQLdb

#### MySQLdb.cursor.execute() query returns

(when using MySQLdb.cursors.DictCursor)

```
result[record_index][field][value]
```
