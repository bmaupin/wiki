---
title: Python MySQL
---

use [MySQLdb](http://mysql-python.sourceforge.net) or [SQLAlchemy](http://www.sqlalchemy.org/) (for greater abstraction)

## MySQLdb

#### MySQLdb.cursor.execute() query returns

(when using MySQLdb.cursors.DictCursor)

```
result[record_index][field][value]
```
