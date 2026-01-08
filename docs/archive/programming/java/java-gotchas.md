---
title: Java gotchas
---

#### Java Strings have no built-in method to join an array of strings

#### Java doesn't support nested methods/functions

#### Java doesn't support optional method parameters

Instead, create another method with the same name and different parameters

Ex:

```
void doSomething(int var1) {
    doSomething(var1, 592)
}

void doSomething(int var1, int var2) {
    // do some stuff
}
```

#### The integer 0 isn't equal to the boolean false

So don't go trying to compare them

#### Chars must be assigned using single quotes, not double quotes

Ex:

```
char code = 'X';
```

not

```
char code = "X";
```

#### To get an accurate value when dividing integers, you must cast at least one of the integer values to double

Otherwise, you'll always get an integer. For example, 9/4 will always give you 2, not 2.25.

#### The switch statement only works on certain primary types, and not objects

- The switch statement only works with int, short, byte, or char types
- It doesn't work with long, floating-point primitive types, or objects

#### The size of an Array can't be changed

- Use a different class instead, like ArrayList

#### Some classes aren't threadsafe

- StringBuffer is threadsafe, StringBuilder isn't
