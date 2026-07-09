---
title: Python OOP
---

[http://www.diveintopython.net/object_oriented_framework/defining_classes.html](http://www.diveintopython.net/object_oriented_framework/defining_classes.html)

[New-style and classic classes](http://docs.python.org/reference/datamodel.html#newstyle)

- `type` is the type of all types
- `object` is the base of all other types

#### new-style class:

```
class SomeClass(object):
    pass
```

#### new-style subclass:

```
class SomeSubclass(SomeClass):
    pass
```

#### new instance:

```
instance = SomeClass()
```

#### old-style class:

```
class SomeClass:
    pass
```

#### to create class (new):

```
new_class = type('class_name', (object,), {})
```

or

```
new_class = type('class_name', (), {})
```

or

```
class new_class(object): pass

>>> new_class
<class '__main__.new_class'>
>>> type(new_class)
<type 'type'>
>>> new_class.__dict__.keys()
['__dict__', '__module__', '__weakref__', '__doc__']
```

#### to create object/instance (new):

```
new_object = new_class()

>>> new_object
<__main__.new_class object at 0xb7f3e6ec>
>>> type(new_object)
<class '__main__.new_class'>
>>> new_object.__dict__.keys()
[]
```

#### to create class (old):

```
class old_class: pass

>>> old_class
<class __main__.old_class at 0xb7f3671c>
>>> type(old_class)
<type 'classobj'>
>>> old_class.__dict__.keys()
['__module__', '__doc__']
```

#### to create instance (old):

```
old_instance = old_class()

>>> old_instance
<__main__.old_class instance at 0xb7f3e80c>
>>> type(old_instance)
<type 'instance'>
>>> old_instance.__dict__.keys()
[]
```

#### to assign value

```
class.<item> = value
```

#### to assign values using variables:

```
setattr(class, item, value)
```

#### to get value:

```
class.item
```

#### to get value using variables:

```
getattr(class, item)
```

#### to show available methods/attributes:

```
class.__dict__.keys()
```
