---
title: Object-oriented programming (OOP)
---

## Basics/definitions

**Class:** a custom data type
Also called: type

**Object:** a specific instance of a class
Also called: instance

- When an object is created from a class, this is called **instantiation.**
- Many objects can be instantiated from a single class.

**Method:** functions defined in and associated with a particular class
Also called: function

**Field:** a variable defined in a class.
Also called: variable

**Member:** a field or method of a class
Also called: attribute

## Concepts

**Operator overloading:** defining custom functionality for a built-in operator (+, =, ==) so it will work with a user-defined class.

**Dynamic dispatch:** when a method of an object is called, the object determines which code gets executed by doing a lookup.

**Polymorphism:** using the same interface for different objects, which allows those different objects to be used in the same code.

## Classes

**Abstract class (Java, Vala):** class containing at least one abstract method that must be declared using the abstract keyword, can't be instantiated, but can be subclassed

**Final class (Java):** class declared using the final keyword that can't be subclassed/extended/inherited

## Variables

**Class/static variable:** a variable declared within a class body (but not within any of its methods) that is not associated with any instance of the class and is accessible to all methods of the class, including static methods.

- Declared in Java and C++ (in the header file) using the static keyword

**Instance variable:** a variable declared within a class body (but not within any of its methods) not declared using the static keyword, which is only accessible from methods accessing an instance of a class and not from static methods at all

## Methods

**Class/static method:** method that isn't associated with any instance of a class and doesn't need the class to be instantiated before it can be called

- Declared in Java and C++ (in the header file) using the static keyword

**Abstract method:** method declared using the abstract keyword, with no body, that must be overridden
Also called: pure virtual method (C++)

**Final method (Java):** method declared using the final keyword that can't be overridden by a subclass

**Virtual method/function (C++, Vala):** functions in a base class must be declared as virtual so inherited classes can use their own overridden functions when upcasting.

- This isn't necessary in Java, because it happens by default

**Method overloading:** some languages (C++, Java) support multiple methods with the same name but different signatures

**Method overriding:** using a method in a derived class with the same signature as a method in the base class. If the method is called on an instance of the derived class, it will use the overridden method defined in the derived class.

**Constructor:** a special method of a class that is automatically called when a class is instantiated. Anything required to initially set up the class (initialization of attributes, etc.) is done in the constructor.

- Constructors are only called once (when the class is instantiated).
- Constructors have no return type.
- Constructors usually aren't mandatory; if you instantiate a class with no constructor, an object with no members (fields or methods) will be created.
- Constructors usually must be the first method listed in a class.
- In Java, the constructor has the same name as the class. In Python, the constructor is the `__init__()` method.
- The constructor of a derived class may explicitly call the

**Destructor:** in some languages (C++), a method that's called when an object is deleted to properly clean up any data.

**Method signature**
Also called: declaration, prototype

Usually includes the method name, and the number, types and order of its parameters

## Inheritance

**Inheriting:** inheritance is when one class is created based on another class. The derived class inherits members of the base class, such as attributes and methods
Also called: extending, subclassing

**Multiple inheritance:** inheriting from more than one base class at the same time. Allowed in some languages like C++. In Java, you can only inherit from one class; the concept of multiple inheritance in Java is best achieved by using multiple interfaces.

**Base class:** a class at the top of the inheritance tree that is used as a base for derived classes
Also called: superclass, parent class

**Derived class:** a class created from another class and inherits the members of the class it's derived from
Also called: subclass, child class

**Upcasting:** when a derived class is treated like its base type.
Upcasting is automatic in some languages such as Java and C++.
The “up” in upcasting is because the casting is moving up the inheritance tree.

**Downcasting**

## Interfaces

#### Notes

- Like a class, but can only include abstract methods and final fields (variables). Cannot be used as a base class
- Placed in its own file, like a class
- Name is normally an adjective
- Advantages: classes can extend only one other class, but can implement as many interfaces as you want
- Methods of an interface are automatically abstract and public
- Fields (variables) of an interface are automatically public, final, and static

## Access control

**Public:** The members of a class are accessible by anyone

**Private:** The members of a class are only accessible within that class

**Protected:** The members of a class are only accessible within that class and from subclasses
