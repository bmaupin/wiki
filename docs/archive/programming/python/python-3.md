---
title: Python 3
---

#### To convert a byte string into a byte array:

[http://stackoverflow.com/a/14267935/399105](http://stackoverflow.com/a/14267935/399105)

```
[byte_string[i:i+1] for i in range(len(byte_string))]
```

#### To reference one element in a byte string:

Use list slicing:

```
>>> byte_string = b'\x53\xef\x12'
>>> byte_string[0:1]
b'S'
>>> byte_string[1:2]
b'\xef'
```

Otherwise, you'll get the integer value of the byte:

```
>>> byte_string[0]
83
>>> byte_string[1]
239
```
