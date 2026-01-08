---
title: Java quick reference
---

## Strings

#### Comparing strings

In Java, `String` is a subclass of `Object`, so you need to compare them using `.equals`, e.g.

```java
if (myString.equals("my text") {
```

not

```java
if (myString == "my text") {
```

(`==` evaluates whether it's the same object, not whether the object has the same contents, etc.)

#### String formatting

```java
String.format("%s is a string", "this");
String.format("%d is an integer", 2);
String.format("%f is an floating point number", 2.0);
```
