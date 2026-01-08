---
title: Qt (C++)
---

## Lists

#### Create a new list

```
QList<QString> list;
```

#### Add an item to a list

```
list.append("first");
```

Can also be used to concatenate lists

```
list1.append(list2);
```

#### Direct access to a list item

```
list[0];
```

#### Iterate over a list

```
foreach (QString s, list)
 qDebug() << s;
```
