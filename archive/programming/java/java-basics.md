---
title: Java basics
---

#### Sources:

[Java All-In One Desk Reference For Dummies, Second Edition](http://www.amazon.com/gp/product/0470124512)

## Naming conventions

#### Variables/methods

Camel case where first word is uncapitalized:

```
myMethod
```

#### Classes

Camel case where first word is capitalized:

```
MyClass
```

#### Constants (variables declared using the _final_ keyword)

Use all caps:

```
final int PI = 3.14;
```

## Primitive types

#### Notes

- not objects

#### Primitive wrapper objects

| int | Integer |
| short | Short |
| long | Long |
| byte | Byte |
| float | Float |
| double | Double |
| char | Character |
| boolean | Boolean |

since Java 1.5, conversion to and from wrapper objects is automatic

#### Parsing objects to primitive types

```
int x = Integer.parseInt("100");
```

## Variables

#### Declare a constant

(variable that can only be assigned once)

```
final TYPE CONSTANTNAME;
```

#### Initializers

- Block of code that initializes variables
- Don't use these, but you should be able to recognize them:

```
public int myNumber;

{
    // code to initialize myNumber
}
```

## Strings

#### Notes

- When doing a lot of string manipulation, use StringBuilder
  - If you're using threads, use StringBuffer
- String, StringBuilder, and StringBuffer all implement CharSequence interface

## Lists

#### Notes

- use List ([http://download.oracle.com/javase/tutorial/collections/interfaces/list.html](http://download.oracle.com/javase/tutorial/collections/interfaces/list.html))
  - See below
- If you'll be doing a lot of modification to your list/array (insertions, deletions, additions), use a LinkedList

#### Lists

```
List<String> myList = new ArrayList<String>();
myList.add(someString);
myList.get(int index);
myList.remove(int index);
myList.size();
myList.isEmpty();
```

#### Get the last element of a list

```
myList.get(myList.size() - 1);
```

#### Nested Lists

```
List<ArrayList<String>> listOlists = new ArrayList<ArrayList<String>>();
```

#### Nested Arrays

```
int scores[][] = new int[5][2];

scores[0][1] = 93;
scores[0][2] = 74;
```

## Associative arrays

Use Map ([http://download.oracle.com/javase/tutorial/collections/interfaces/map.html](http://download.oracle.com/javase/tutorial/collections/interfaces/map.html))

```
Map<String, Integer> m = new HashMap<String, Integer>();
m.put("key", value);
m.get("key");
m.isEmpty();
m.containsKey("key");
```

Simpler usage:

```
Map map = new HashMap();
```

#### Iterate over a Map

- Java 8+:

  ```
  nameCounts.forEach((key, value) -> {
      doSomething(key, value);
  });
  ```

- < Java 8: [Iterate through a HashMap](https://stackoverflow.com/q/1066589/399105)

#### Sort a Map by value

[Sort a Map<Key, Value> by values](https://stackoverflow.com/q/109383/399105)

## Loops

#### For loop

```
for (int i=1; i<11; i++) {
    System.out.println("Count is: " + i);
}
```

(counts from 1 to 10)

#### Enhanced for loop

```
for (type identifier : array) {
}

String[] things = { "first thing", "second thing", "third thing" };
for (String thing : things) {
    System.out.println(thing);
}
```

## Conditionals

#### Format of if statements

```
if ( EXPRESSION ) {
    doSomething();
} else if ( EXPRESSION ) {
    doSomethingElse();
}
```

**Note:** the parentheses after the if statement are required.

## Access

| Modifier    | Class | Package | Subclass | World |
| ----------- | ----- | ------- | -------- | ----- |
| public      | Y     | Y       | Y        | Y     |
| protected   | Y     | Y       | Y        | N     |
| no modifier | Y     | Y       | N        | N     |
| private     | Y     | N       | N        | N     |

## Exceptions

#### Catch the Exception class to get all exceptions

```
try {
    doSomething();
} catch (Exception e) {
}
```

#### Useful methods of exceptions

| String getMessage() | A text message that describes the error |
| void PrintStackTrace() | Prints stack trace to stderr |
| String toString()| Returns a description of the exception which includes the name of the exception class followed by a colon and the getMessage message |
