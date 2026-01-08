---
title: Programming languages
---

#### JVM languages

- Java
- Kotlin
  - Seems to be the first real JVM language other than Java to gain traction, likely due to backing by JetBrains (who created it) and Google (who added official support to Android)
- Groovy
  - Overall impression: nice but seems to be not worth investing in; overshadowed by Kotlin
  - Most similar to Java among the non-Java JVM languages
  - Allows for static or dynamic typing
  - Extends Java to include functional programming features
  - Has built-in support for lists, maps, JSON/XML handling
- Scala
  - Overall impression: never took off because it has too high of a learning curve and too many footguns (metaprogramming/macros, operator overloading, etc)
  - Statically typed, allowing for faster execution
  - Falls between object-oriented and functional
  - Introduces a number of features available in newer languages like C# and Haskell
- Clojure
  - Overall impression: never really gained much traction
  - Emphasis on functional programming while de-emphasizing object-oriented programming

#### Other

- Go
  - Overall impression: life is too short to use programming languages that aren't fun to write 🙃
  - Pros
    - Very fast
    - Great concurrency support
    - Great tools
    - Spec is consise and simple enough you can hold most of the language in your head
    - Cross-compiling is super simple
    - Compiles to a native executable
  - Cons
    - **Not fun to write**
      - Very pedantic; compiles will fail with unused libraries, variables, etc
      - No exceptions, only error codes, which must all be handled explictly which is annoying to do and the code ends up littered with error code handling
    - No support for generics
    - No REPL for quick hacking
    - No real decent UI library so far
    - Language authors encourage overly terse usage (single character variable names, etc)
    - Tabs instead of spaces; can be mostly ignored thanks to `gofmt` but still eww
