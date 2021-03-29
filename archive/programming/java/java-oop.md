---
title: Java OOP
---

See: [Object-oriented programming (OOP)](https://sites.google.com/site/bmaupinwiki/home/programming/general/object-oriented-programming-oop)

Sources: [Java All-In One Desk Reference For Dummies, Second Edition](http://www.amazon.com/gp/product/0470124512)

## Classes

#### Notes

- every class implicitly inherits the Object class
- subclasses don't inherit constructors

#### Class structure

- class
  - fields
    - (initializers near the fields they initialize)
  - constructors
  - methods
    - (inner classes after the methods that use them)

#### Instantiating a class

```
ClassName variableName = new ClassName();
```

or:

```
BaseClass variableName = new ChildClass();
```

(see below under inheritance for explanation on this one)

#### To inherit/subclass:

```
public class MyClass extends YourClass {
```

(see below under inheritance for more information)

#### Getting the type of an object

```
OBJECT.getClass().getName()
```

**Note:** this will return the class that the variable has been assigned to. For instance, if you declared your variable like this:

```
Base b1 = new Child();
```

Then b1.getClass().getName() will return Child.

#### Testing the type of an object

```
instanceof OBJECT
```

**Note:** this will return true for all classes that the object may be an instance of.

Ex:

```
Base b1 = new Child();

if (b1 instanceof Base) {
    // this will evaluate to true
}
if (b1 instanceof Child) {
    // this will also evaluate to true
}
```

## Inner classes

#### Notes

- Inner classes have access to all variables and methods of the outer class, even private variables and methods

#### Getting an instance of an outer class from an inner class

```
MyOuterClass.this
```

## Interfaces

#### Declaring an interface:

```
public interface Sortable {
    void sort():
}
```

#### Implementing an interface:

- Use the `implements` keyword in your class declaration to implement the interface
- Your class must implement every method declared by the interface

```
public class MyClass implements Sortable {
    public void sort() {
        // sorting code
    }
}
```

## Generics

#### Notes:

- Allows you to create generic classes that can be used with other classes without specifying the class type

  Ex:

  ArrayList is a generic container for arrays of any type.

#### Using a generic class

```
ArrayList<Employee> empList;
```

#### Creating a generic class

```
public class GenStack<E> {
    private LinkedList<E> list = new LinkedList<E>();

    public void push(E item) {
        list.addFirst(item);
    }

    public E pop() {
        return list.poll();
    }

    public E peek() {
        return list.peek();
    }

    public int size() {
        return list.size();
    }
}
```

(source: [http://media.wiley.com/product_ancillary/12/04701245/DOWNLOAD/Java_AIO_code_files.zip](http://media.wiley.com/product_ancillary/12/04701245/DOWNLOAD/Java_AIO_code_files.zip))

## Inheritance

#### Upcasting and downcasting

- java automatically treats instances/objects of child classes like base/parent classes. this is called **upcasting**

  Ex:

  ```
  class Base extends Child {...
  void baseMethod(Base b1) {...

  Child b1 = new Child();
  baseMethod(Child);
  ```

  - upcasting doesn't drop the methods and variables of the subclass, it just allows the subclass to be used in methods requiring an instance of a base class

- **Downcasting** can be done only if the object was assigned an instance of the child class

  Ex:

  ```
  void childMethod(Child c1) {...

  Base b1 = new Child();
  childMethod((Child) b1);
  ```

#### Assigning an object of a base type to an instance of a child type

Ex:

```
BaseClass variableName = new ChildClass();
```

Notes:

- This creates a variable of type BaseClass, and then assigns (references) an object of type ChildClass to it
- This is common as it allows you to create code that's based on the base class and more flexible
- variableName is of type BaseClass, but is assigned an object that is type ChildClass
- You can only see members of the BaseClass, but any methods that have been overridden in the ChildClass will be the ones called
- You can use variableName in any method explicitly requiring ChildClass by casting it to ChildClass:
  ```
  childClassMethod((ChildClass) variableName);
  ```

See here for more information: [http://stackoverflow.com/q/4447924/399105](http://stackoverflow.com/q/4447924/399105)
