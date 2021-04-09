---
title: Python quick reference
---

## Strings

#### Replace

```
mystring = mystring.replace('oldtext', 'newtext')
```

#### Find

```
# String found
if mystring.find('text') != -1:
     ...
# String not found
else:
```

#### String formatting

(Available starting in 2.6, standard starting in 3.0)

```
'This is a string: {0}'.format('this too')
```

#### Zero-padded numbers

```
print('{:02d}'.format(2))
02
```

## Lists

#### Copy a list

```
copy_of_list1 = list(list1)
```

## Dictionaries

#### Sorting

```
for key in sorted(mydict):
```

#### Delete a key (and its value)

```
del mydict[somekey]
```

## Misc

#### Multi-line output

```
print 'test this ' \
    'and this'
sys.stderr.write('test this too '
    'and this')
```

#### Regular expressions

If you'll be using the regex more than once in your script:

```
import re
pattern = re.compile('regex here')
match = pattern.search(string)
if match:
    name = match.group(1)
    address = match.group(2)
```

To find multiple occurrences of a pattern:

```
import re
pattern = re.compile('regex here')
matches = pattern.findall(string)
if matches != []:
```

#### Backwards-compatible code (determining Python version)

```
import datetime
import sys
if sys.version_info < (2, 5):
    import time

date = '20100319'
if sys.version_info < (2, 5):
    somedate = datetime.datetime(*(time.strptime(date, '%Y%m%d')[0:6]))
else:
    somedate = datetime.datetime.strptime(date, '%Y%m%d')
```

#### Safely open a file

```
with open('file.txt', 'r') as f:
    output = f.read()
```

Multiple files:

```
with open('file1.txt', 'r') as file1, open('file2.txt', 'r') as file2:
```

#### Character encoding issues

- `str.decode(`_`encoding`_`)`
  - Decodes _from_ the provided encoding to unicode
- `str.encode(`_`encoding`_`)`
  - Encodes _from unicode_ (not utf8) to the provided encoding

For example, if you have a utf8 string which has been mistakenly decoded as a cp1252 string to utf8:

```
'it\xc3\xa2\xe2\x82\xac\xe2\x84\xa2s'
```

You need to first decode it from utf8 to unicode, then encode it from cp1252 to utf8:

```
'it\xc3\xa2\xe2\x82\xac\xe2\x84\xa2s'.decode('utf8').encode('cp1252')
```
