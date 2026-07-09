---
title: SQL
---

#### Insert
```sql
INSERT INTO table VALUES ('value1', value2', value3');
INSERT INTO table (column1, column2, column3) VALUES ('value1', 'value2', 'value3');
```


#### Delete
```sql
DELETE FROM table WHERE column1 = 'value1';
```


#### Update
```sql
UPDATE table SET column1 = 'value1' WHERE column2 = 'value2';
```


#### Insert or update
For MySQL, use replace:
```sql
REPLACE INTO table VALUES ('value1', 'value2', 'value3');
```


#### Query based on the result of another query
Use [IN](http://www.w3schools.com/sql/sql_in.asp)


#### Update based on a subquery
```sql
UPDATE testdb.users SET password = (select userpass from devdb.users WHERE userid = 'ADMIN') where userid = 'ADMIN';
```


#### Using a column from one table for a query in another
Use [JOIN](http://www.w3schools.com/sql/sql_join.asp)


#### Define a range of values
Use [BETWEEN](http://www.w3schools.com/sql/sql_between.asp):
```sql
UPDATE inventory.systems SET model = 'Dell PowerEdge M620' WHERE id BETWEEN 2293 AND 2308;
```
