---
title: Java tips
---

#### sources:

[Java All-In One Desk Reference For Dummies, Second Edition](http://www.amazon.com/gp/product/0470124512)

#### getters and setters

don't make variables in a class public. if you need the variable to be publicly accessible, create a get method:

```
public Object getVar() {
    return var;
}
```

if you need the variable to be publicly modifiable, create a set method:

```
public Object setVar(Object myVar) {
    var = myVar;
}
```

#### preventing instantiation of a class

create a private constructor that does nothing:

```
public class MyClass {
    private MyClass() {}
}
```

#### template for equals method:

```
public boolean equals(Object obj) {
    // an object must equal itself
    if (this == obj)
        return true;

    // no object equals null
    if (this == null)
        return false;

    // objects of different types are never equal
    if (this.getClass() != obj.getClass())
        return false;

    // cast to an Employee, then compare the fields
    Employee emp = (Employee) obj;
    return this.lastName.equals(emp.getLastName())
        && this.firstName.equals(emp.getFirstName());
}
```

(source: [http://media.wiley.com/product_ancillary/12/04701245/DOWNLOAD/Java_AIO_code_files.zip](http://media.wiley.com/product_ancillary/12/04701245/DOWNLOAD/Java_AIO_code_files.zip))

#### random number generator:

```
int low = 1;      // the lowest value in the range
int high = 6;     // the highest value in the range
int rnd = (int)(Math.random() * (high - low + 1)) + low;
```

(source: [Java All-In One Desk Reference For Dummies, Second Edition](http://www.amazon.com/gp/product/0470124512), p.136)

#### class constructors

class constructors can call other class constructors using the `this` keyword

- `this` can only be used in the very first statement of the constructor

Ex:

```
public class MyClass {
    public MyClass(int first, int second) {
        // do something
    }

    public MyClass(int first, int second, int third) {
        this(first, second);
        third = ...
    }
}
```
