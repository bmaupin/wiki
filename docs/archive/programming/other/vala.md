---
title: Vala
---

## misc

#### installing vala (ubuntu)

```
sudo aptitude install valac
```

#### installing vala IDE (ubuntu)

```
sudo aptitude install anjuta
```

#### location of vapi files (ubuntu 10.10)

/usr/share/vala-0.10/vapi

#### setting RPATH when compiling

```
valac -X -Wl,-rpath,/PATH/TO/LIB FILE.vala
```

#### various development library packages (ubuntu)

| library name | package name  | --pkg flag |
| ------------ | ------------- | ---------- |
| gee          | libgee-dev    | gee-1.0    |
| gio          |               | gio-2.0    |
| gtk          | libgtk2.0-dev | gtk+-2.0   |

Ex:

```
sudo aptitude install libgee-dev
valac --pkg gee-1.0 FILE.vala
```

## basics

#### debugging

use `debug`:

```
debug(some_int.to_string());
```

#### reference parameters (C# feature)

[http://live.gnome.org/Vala/Tutorial#Parameter_Directions](http://live.gnome.org/Vala/Tutorial#Parameter_Directions)

- declared using the `ref` keyword in method in the method declaration and when you call/invoke the method
- the actual variable is passed to the method and so can be modified by the method; temporary variables aren't created
- variables must be assigned, or they can be null if they're objects (not basic types)
- see above link for examples

#### output parameters (C# feature)

[http://live.gnome.org/Vala/Tutorial#Parameter_Directions](http://live.gnome.org/Vala/Tutorial#Parameter_Directions)

- like reference parameters, but declared using the "out" keyword in method declaration and invocation
- the values of the variables sent to the method aren't used, but if they are changed in the method then the actual values of the variables are changed
- it doesn't matter if the variables have values before being sent to the method (because the values aren't used anyway)
- each variable **must** be assigned a value in the method before it can be read and **before the method exits**
- see above link for examples

## delegates

(C# feature)
[http://live.gnome.org/Vala/Tutorial#Delegates](http://live.gnome.org/Vala/Tutorial#Delegates)

- delegates are used to allow methods/functions with a specific signature (combination of parameters and return type) to be passed as parameters to other methods
- any method with that signature may be used in methods requiring the delegate type as a parameter

#### using delegates:

1. first, declare the delegate type:

   ```
   delegate void DelegateType(int a);
   ```

1. next, declare some method:

   ```
   void print_a(int a) {
       stdout.printf("%d\n", a);
   }
   ```

1. now, declare a method that uses the delegate as a parameter:

   ```
   void f2(DelegateType d, int a) {
       // Calling a delegate
       d(a);
   }
   ```

1. lastly, call the function that uses the delegate, passing it a function with the same signature (parameters and return type):
   ```
   void main() {
       // Passing a method as delegate argument to another method
       f2(print_a, 5);
   }
   ```

something_test_this_string

## anonymous methods

(C# feature, like Python's lambda)

[https://wiki.gnome.org/Projects/Vala/Tutorial#Anonymous\_Methods\_.2F\_Closures](https://wiki.gnome.org/Projects/Vala/Tutorial#Anonymous_Methods_.2F_Closures)

- anonymous methods are not assigned to a method identifier, and have no name
- they're handy if the method is only used once
- they're particularly useful with delegates

#### anonymous method format:

```
(a) => { stdout.printf("%d\n", a); }
```

- the left side is the list of required parameters
- the right side is the method body
- the curly braces are optional if the body only contains one statement:
  ```
  (a) => stdout.printf("%d\n", a);
  ```

#### using anonymous methods with delegates:

1. declare the delegate type:

   ```
   delegate void PrintIntFunc(int a);
   ```

1. assign the anonymous method to a delegate variable:

   ```
   void main() {
       PrintIntFunc p1 = (a) => { stdout.printf("%d\n", a); };
       p1(10);
   }
   ```

1. or you can simply pass an anonymous method as a parameter to a function that requires a delegate variable:

   ```
   void some_method(PrintIntFunc print_func) {
       ...
   }

   some_method((a) => {
       stdout.printf("%d\n", a);
   });
   ```
