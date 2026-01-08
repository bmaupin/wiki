---
title: Graylog search
---

See: [Graylog search query language](https://docs.graylog.org/docs/query-language)

ⓘ Unless otherwise noted, these notes are based on Graylog 3

#### Tips

- Graylog searches are case-sensitive. So if you configured application name as `myApplication`, you must use the query `application_name:myApplication`

- Graylog adds an implicit `OR` between every item separated by a space. Make sure to use `AND` if you want each search result to include all of your search terms.

  For example:

  ```
  application_name:app1 application_name:app2
  ```

  Is the same thing as:

  ```
  application_name:app1 OR application_name:app2
  ```

- Dashes with values in them get interpreted as `OR`, for example, this:

  ```
  5e51c34c-ae0a-4047-899f-8886658bd727
  ```

  Gets interpreted as:

  ```
  5e51c34c OR ae0a OR 4047 OR 899f OR 8886658bd727
  ```

  To remedy this, put values with dashes in them in quotes, e.g. `"5e51c34c-ae0a-4047-899f-8886658bd727"` or `applicationname:"my-awesome-application"`

#### Wildcard searches

Wildcard searches at the end of a string should work fine, e.g.

```
application_name:myapp*
```

Wildcard searches at the beginning of a string, however, will not work (e.g. `application_name:*production` )

Instead, you can use a regex, e.g.

```
application_name:/.*production/
```

#### Get count of messages

I haven't found a way to do this in the search box itself...

1. Do a search

1. Under _All Messages_ mouse over one of the columns (e.g. source) and click the dropdown arrow > _Statistics_

#### Get list of top unique values for a field

1. Do a search

1. Under _All Messages_ mouse over one of the columns (e.g. source) and click the dropdown arrow > _Show top values_

#### Add a column to the search results

1. In the _All Messages_ box, click the small dropdown arrow near the top right > _Edit_
1. Under _Fields_, add any new fields you'd like to add > _Save_
