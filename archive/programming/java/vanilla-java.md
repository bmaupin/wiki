---
title: Vanilla Java
---

## basics

#### compiling java source files (.java)

```
javac FILE.java
```

#### running compiled java source files (.class)

```
java FILE
```

#### including jar files

use -cp

Ex:

```
javac -cp ".:unboundid-ldapsdk-se.jar" ldap.java
java -cp ".:unboundid-ldapsdk-se.jar" ldap
```

## misc

#### print to stdout

```
System.out.println("Weighted random is " + result);
```
