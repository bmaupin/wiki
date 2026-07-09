---
title: C++
---

See:

- [C](c)
- [Thinking in C++](http://www.mindviewinc.com/Books/downloads.html) ([PDF](http://www.planetpdf.com/developer/article.asp?ContentID=6634))

## Libraries

#### C++ Standard Library

**Note:** The C++ Standard Library/stdlib is often called "**STL**." This is inaccurate, but is noted here so it can be recognized ([http://stackoverflow.com/a/5205571/399105](http://stackoverflow.com/a/5205571/399105))

#### Boost

Besides the standard library, [Boost](http://www.boost.org/) is a collection of incredibly useful C++ libraries.

Install Boost on Ubuntu:

```
sudo apt install libboost-all-dev
```

Or search for the particular boost package needed:

```
apt-cache search libboost
```

## OOP

Also see: [Object-oriented programming (OOP)](https://sites.google.com/site/bmaupinwiki/home/programming/general/object-oriented-programming-oop)

Objects created using the new keyword must be deleted when you're done using them using the delete keyword

#### Creating objects

There are two ways to create objects in C++ (heap memory can also be allocated in C using malloc() and must be freed using free()):

1. Create the object on the **stack**/static storage:

   ```
   std::string str;
   ```

   - Must know the exact quantity, lifetime, and type of objects
   - The compiler determines how long the object lasts and can automatically destroy it.

1. Create the object on the **heap** by using the **`new`** keyword
   ```
   std::string* str = new std::string();
   ```
   - Uses:
     - When you need a variable to exist outside of its local scope (after the current function returns)
     - Use the heap when creating large objects or a large number of objects since stack space is limited. This may include a variable created within a recursive function if it is recursively invoked too many times.
     - Each thread has its own stack but shares the same heap
   - When using the `new` keyword, you get back a pointer
   - The programmer must determine programmatically when to destroy the object, and then perform the destruction using the **`delete`** keyword. A better way to handle this is to use a **[smart pointer](http://en.wikipedia.org/wiki/Smart_pointer)** (like `std::tr1::unique_ptr`, `boost::scoped_ptr`, `boost::shared_ptr`), which will take care of safely destroying the object when it's no longer in use:
     ```
     boost::scoped_ptr<pipe> sp(new pipe);
     ```
     [http://stackoverflow.com/a/395519/399105](http://stackoverflow.com/a/395519/399105)
   - Storage is managed dynamically at runtime
   - Amount of time required to allocate storage on the heap is significantly longer than the time to create storage on the stack
   - Third-party garbage collectors exist for C++ that automatically discover when an object is no longer in use and destroy it.

#### Access control

These are placed in the header files

- Private (default for classes)
- Public (default for structs)
- Protected

#### Friend keyword

Used to give access to all or part of a private class to another class.

#### Virtual functions

Functions in a base class must be declared as virtual so inherited classes can use their own overridden functions when upcasting.

## Misc

#### Other differences from C

- In C, a function declaration with an empty argument list means that function can have any number of arguments, but in C++ it means it has no arguments:
  ```
  int func2();
  ```
- C++ introduces `//` comments; C doesn't have them
- C++ has bool types, as well as true and false keywords. C doesn't.
- In C, variables must be declared at the beginning of the scope, but in C++ they can be declared/defined at any point in the scope.
