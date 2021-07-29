---
title: Python MySQL
# Remove this page from the sitemap so it hopefully doesn't get indexed as it's generating a soft 404
sitemap: false
---

use [MySQLdb](http://mysql-python.sourceforge.net) or [SQLAlchemy](http://www.sqlalchemy.org/) (for greater abstraction)

## MySQLdb

#### MySQLdb.cursor.execute() query returns

(when using MySQLdb.cursors.DictCursor)

```
result[record_index][field][value]
```
