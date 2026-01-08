---
title: Python
---

## misc modules

#### dates and times

prefer datetime over time

#### SOAP

use suds

[https://fedorahosted.org/suds/](https://fedorahosted.org/suds/)

[What SOAP client libraries exist for Python, and where is the documentation for them?](https://stackoverflow.com/q/206154/399105)

#### URL parsing

use urlparse (in the standard library)

[http://docs.python.org/library/urlparse.html](http://docs.python.org/library/urlparse.html)

#### XML/XSL

use lxml:

[python lxml](python-xml-lxml)

## functions

#### using keyword arguments

```
def myfunction(this, that='a test'):
    print '%s %s' % (this, that)

>>> myfunction('this is', 'not a test')
this is not a test
>>> myfunction('this is')
this is a test
>>> myfunction(this='this is')
this is a test
>>> myfunction('this is', that='not a test')
this is not a test
>>> myfunction(this='this is', that='not a test')
this is not a test
>>> myfunction(that='not a test', this='this is')
this is not a test
>>> myfunction(that='not a test', 'this is')
  File "<stdin>", line 1
SyntaxError: non-keyword arg after keyword arg
>>> myfunction()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: myfunction() takes at least 1 argument (0 given)
```

#### using arbitrary positional arguments

using an asterisk before the argument name will return a tuple

```
def myfunction(this, *that):
    print this
    print that

>>> myfunction(1, 2)
1
(2,)
>>> myfunction(1, [2, 3, 4])
1
([2, 3, 4],)
```

#### using arbitrary keyword arguments

using two asterisks before the argument name returns a dict

```
def myfunction(this, **that):
    print this
    print that

>>> myfunction(1, 'test')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: myfunction() takes exactly 1 argument (2 given)
>>> myfunction(1, var='test')
1
{'var': 'test'}
```

## gotchas

#### script location changes depending how it's run

Ex:

```
$ ~/workspace/scripts/python/test/test.py
sys.argv: ['/home/user/workspace/scripts/python/test/test.py']
os.getcwd: /home/user
os.path.dirname(sys.argv[0]: /home/user/workspace/scripts/python/test

$ python workspace/scripts/python/test/test.py
sys.argv: ['workspace/scripts/python/test/test.py']
os.getcwd: /home/user
os.path.dirname(sys.argv[0]: workspace/scripts/python/test

$ python ~/workspace/scripts/python/test/test.py
sys.argv: ['/home/user/workspace/scripts/python/test/test.py']
os.getcwd: /home/user
os.path.dirname(sys.argv[0]: /home/user/workspace/scripts/python/test
```

possible solution:

```
script_path = os.path.dirname(sys.argv[0])
if script_path.startswith('/'):  # absolute path
    my_path = script_path
else:  # relative path
    my_path = '%s/%s' (os.getcwd(), script_path)
```

## file objects

see: [http://docs.python.org/library/stdtypes.html#file-objects](http://docs.python.org/library/stdtypes.html#file-objects)

#### file.next()

reads the next line in the file, including the newline
(unless you specifically need to get just one line, use this instead:

```
for line in file:
```

#### file.read()

reads the entire file, including newlines

#### file.write(data)

writes exactly the data to the file; doesn't add newlines automatically

## misc

#### os.path

dir

- isfile: False
- isdir: True
- islink: False

file

- isfile: True
- isdir: False
- islink: False

link

- isfile: True
- isdir: False
- islink: True
