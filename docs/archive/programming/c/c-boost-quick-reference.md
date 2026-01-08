---
title: C++ Boost quick reference
---

#### Install Boost on Ubuntu:

```
sudo apt install libboost-all-dev
```

Or search for the particular boost package needed:

```
apt-cache search libboost
```

#### [shared_ptr](http://www.boost.org/doc/libs/1_55_0/libs/smart_ptr/shared_ptr.htm)

- Copyable and movable
- Uses reference counting; use in combination with [weak_ptr](http://www.boost.org/doc/libs/1_55_0/libs/smart_ptr/weak_ptr.htm) to avoid circular references

```
#include <boost/shared_ptr.hpp>
#include <string>

// std::string* str = new std::string(); becomes:
boost::shared_ptr<std::string> str(new std::string);

// it's a pointer, so don't forget to dereference it
*str = "hey!";
std::cout << *str << std::endl;
```

#### [scoped_ptr](http://www.boost.org/doc/libs/1_55_0/libs/smart_ptr/scoped_ptr.htm)

- Replace `shared_ptr` in the example above with `scoped_ptr` to use it
- Neither copyable nor movable
- Deleted when the pointer goes out of scope
- Useful to avoid memory leaks when you leave the function early
