---
title: Python binary data
---

#### open a binary file for reading

```
infile = open('my_file.bin', 'rb')
```

\*be sure to close the file handle when you're done with it:

```
infile.close()
```

#### read an entire binary file into memory

```
file = infile.read()
```

#### read a byte in a binary file

```
byte1 = infile.read(1)
```

#### put the file pointer at the beginning of the file

```
infile.seek(0)
```

#### get the integer value of binary data stored as ASCII

(Ex: a byte in a particular file is stored as `\x05`, you need to get the integer 5)

```
byte = infile.read(1)  # ord can only handle 1 character at a time
ord(byte)
```

#### get the integer value of binary data stored as little-endian hex

```
import struct
struct.unpack('i', data)
```

**Note:** the data must be exact according to the type of data; an integer must be 4 bytes long. for more information see: [http://docs.python.org/library/struct.html#format-characters](http://docs.python.org/library/struct.html#format-characters)
