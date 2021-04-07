---
title: Go (golang) basics
---

#### Resources:

- Code samples
  - Errors
    - [https://golang.org/src/net/http/server.go](https://golang.org/src/net/http/server.go)
    - [https://golang.org/src/io/io.go](https://golang.org/src/io/io.go)
- Misc
  - [Go Playground](http://play.golang.org/) (Online Go interpreter)
- References
  - [A Tour of Go](https://tour.golang.org)
  - [An Introduction to Programming in Go](http://www.golang-book.com/)
  - [Effective Go](https://golang.org/doc/effective_go.html)
  - [The Go Programming Language Specification](https://golang.org/ref/spec)
- Style
  - [Go: Best Practices for Production Environments](http://peter.bourgon.org/go-in-production/#formatting-and-style)

## Tools

#### Renaming/refactoring

```
gofmt -r 'tocXmlNav -> tocNav' -w .
```

## Strings

#### String formatting

```
s := fmt.Sprintf("Hello, %s", "world")
```

#### String concatenation

```
newString = oldString + " new stuff"
```

#### Convert integer to string

```
strconv.Itoa(42)
```

## Arrays/slices

#### Create a slice

```
tags := []string{}
```

#### Append to a slice

```
tags = append(tags, tag1, tag2, ...)
```

#### Get the length of an arrray/slice

```
len(slice)
```

#### Iterate over a slice

```
for i, tag := range tags {
```

Drop index if you don't need it:

```
for _, tag := range tags {
```

#### Check if a value is in an array/slice

```
found := false
for _, tag := range tags {
    if tag == token.Data {
        found = true
    }
}
if found == false {...
```

#### Sort a slice

Sort a string slice

```
sort.StringSlice.Sort(tags)
```

#### Join a slice

```
strings.Join(tags, ",")
```

## Maps

#### Create a map

```
m = make(map[string]string)
```

#### Add a value to a map

```
m["key"] = "value"
```

#### Iterate over a map

```
for k, v := range m {
 fmt.Printf("%s: %s\n", k, v)
}
```

Or if you only need the key:

```
for k := range m {
```

#### Test if a key exists in a map

[http://stackoverflow.com/a/2050629/399105](http://stackoverflow.com/a/2050629/399105)

```
if val, ok := m["foo"]; ok {
    //do something here
}
```

#### Delete an item from a map

```
delete(m, "key")
```

## Structs

#### Create a struct

```
type SomeType struct {
}
```

#### Create an instance of a struct

```
st := &SomeType{}
```

## File I/O

#### Write to a file

```
if err := ioutil.WriteFile(pathToFile, data, 0644); err != nil {
    log.Fatalf("ioutil.WriteFile error: %s", err)
}
```

`data` is a byte array (`[]byte`). To convert a string to a byte array:

```
[]byte(mimetypeContent)
```
