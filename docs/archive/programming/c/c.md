---
title: C
---

See:

- [Thinking in C++, Chapter 3](http://www.mindviewinc.com/Books/downloads.html) ([PDF](http://www.planetpdf.com/developer/article.asp?ContentID=6634))
- [http://www.mindviewinc.com/CDs/ThinkingInC/](http://www.mindviewinc.com/CDs/ThinkingInC/)
- [http://www.cprogramming.com/](http://www.cprogramming.com/)

## General

#### Coding style

[Google C++ Style Guide](http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml)

#### Comments

```
/* This is a comment */
```

(No single-line comments, i.e. `//`)

#### Data types:

- char
- int
- float
- double

Notes:

- C has no built-in data type for strings (only characters), so you can use an array of characters instead
- C has no boolean data type. Use int (0 and 1) or see here:

  [http://stackoverflow.com/a/1921557/399105](http://stackoverflow.com/a/1921557/399105)

## Variables

#### Declare a variable:

**Note:** variable declarations must come before other types of statements in the given code block!

_`type name`_

Ex:

```
int myVariable;
int a, b, c, d;
```

#### Declare a constant (variable that can only be assigned once):

```
const int x;
```

#### Pointers

- Various uses:
  - To pass by reference instead of pass by value. This allows modification of the original object as well as can be less expensive than passing by value (which makes a copy of the object passed).
  - When a request to create an object on the heap is made, a pointer will be returned.
  - Arrays are pointers, as are strings (character arrays).
- The pointer must be the same type as the variable it's pointing to.
- When declaring a pointer, these mean the same thing ([use the first](http://stackoverflow.com/a/398414/399105)):

  ```
  int _p;
  int_ p;
  ```

Referencing and dereferencing:

```
// int *p is used to declare a pointer variable that holds an address
void f(int *p) {
    // prints the address of the variable
    printf("%p\n", p);
    // prints the value of the variable. This is called dereferencing
    printf("%d\n", \*p);
...

int x = 47;
// use & in front of a variable to get the address of it (reference)
f(&x);
```

## Structures

- About as close as you get in C to an object; structures are types that can themselves contain a group of related types

#### Declare a struct:

```
struct Student {
    int grade1;
    int grade2;
};
```

(make sure you don't forget to end it with a semicolon)

#### Declare a struct variable:

```
struct Student student1;
```

(treat it like a normal variable type except with the addition of struct)

#### Access a member of a struct:

```
student1.grade1 = 97;
```

#### Access a member of a struct pointer

```
struct Student \*sp = &student1; // define the pointer
cout << sp->grade1 << endl; // access a member of the struct pointer
```

## Arrays

- Ordered list containing elements of the same type
- The size of the array must be declared beforehand
- An array without brackets acts as a pointer (you don't need to use the ampersand)

#### Declare an array:

_`type name[number_of_elements];`_

Ex:

```
int examplearray[100];
```

#### Declare a multidimensional array:

_`type name[number_of_elements][number_of_subelements];`_

## Functions

- Functions that do not return values have a return type of void
- A prototype (declaring the function return type, name, arguments, and then ending with a semicolon) must be declared above main() if the function itself will be declared below####
  Define a function:

_`return_type name (type arg1, type arg2, ...) { }`_

Ex:

```
int main()
{
```

(this is a function that returns an integer)

#### Declare a function with variable-lenth arguments:

Use an ellipsis as the last argument

Ex:

```
int some_function (int x, ...)
{
    va_list a_list;
    va_start(a_list, x);
}
```

## Errors

C uses error constants like:

- EINVAL: Invalid argument.
- EPERM: Operation not permitted.

For more information, see: [http://en.wikipedia.org/wiki/Errno](http://en.wikipedia.org/wiki/Errno)

## Misc

#### Display something to the screen

```
printf("text to display\n");
```

String formatting:

```
printf("You entered %d", this_is_a_number);
```

#### "static" modifier

- When used inside a function to declare a variable, it simply means that once the variable has been initialized, it remains in memory until the end of the program
  - It also prevents that variable from being reinitialized if the function is called again (it retains its previous value)

#### Enums

Enums create named integers whose values are automatically assigned:

```
enum ShapeType {
    circle,
    square,
    rectangle
};
ShapeType shape = circle;
```
