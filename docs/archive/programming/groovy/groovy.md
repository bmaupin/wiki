---
title: Groovy
---

## Misc

#### Interactive shell

```
groovysh
```

- When defining variables in the Groovy shell, drop the `def`:
  ```
  data = new URL('http://localhost:8080').getText()
  ```

## Strings

#### Convert a string to lower case

```
s = s.toLowerCase()
```

#### Replace characters in a string

```
s = s.replaceAll(' ', '-')
```

#### Convert a string to an integer

```
if (s.isInteger()) {
    s = s.toInteger()
}
```

## [Lists](http://groovy-lang.org/groovy-dev-kit.html#Collections-Lists)

#### Create a new empty list

```
def myList = []
```

#### Method signature when returning a list literal

```
Use List<E>:
List<String> myfunction() {...
```

#### Check if an item is in a list

```
1 in [1, 2, 3]
```

#### Check if an item is not in a list

```
!(1 in [1, 2, 3])
```

#### Iterate over a list

```
myList.each{
    println it
```

To name the item:

```
myList.each{ item ->
    println item
```

#### Add an item to a list

```
myList.add(item)
```

#### Get the size/length of a list

```
myList.size()
```

#### Transform each item of a list and return as a list

Use `.collect`:

```
return myList.collect { someMethod(it) }
```

## [Maps](http://groovy-lang.org/groovy-dev-kit.html#Collections-Maps)

#### General

Groovy maps are `java.util.LinkedHashMap`

#### Create a new empty map

```
def map = [:]
```

#### Method signature when returning a map literal

Use `Map<K, V>`:

```
Map<String, String> myfunction() {...
```

#### Check if an item is in a map

```
[a:1,b:2,c:3].containsValue(3)
[a:1,b:2,c:3].containsKey('a')
```
