---
title: Swift
---

## Misc

#### Resources

- Official documentation (The Swift Programming Language)
  - [EPUB](https://swift.org/documentation/#the-swift-programming-language)
  - [Online](https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/index.html)
    - [A Swift Tour](https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/GuidedTour.html)
- Sample code
  - [https://github.com/apple/swift-corelibs-foundation](https://github.com/apple/swift-corelibs-foundation)
  - [https://github.com/ibm-swift](https://github.com/ibm-swift)
  - [https://github.com/vapor](https://github.com/vapor)
  - [https://github.com/PerfectlySoft](https://github.com/PerfectlySoft)
  - [https://code.sealedabstract.com/drewcrawford/NaOH/blob/992f9db85af03fcf194fc743f141c91383965590/NaOH/ICantBelieveItsNotFoundation.swift](https://code.sealedabstract.com/drewcrawford/NaOH/blob/992f9db85af03fcf194fc743f141c91383965590/NaOH/ICantBelieveItsNotFoundation.swift)

#### Installation

Recommended: use [swiftenv](https://swiftenv.fuller.li)

1. Install swiftenv

   [https://swiftenv.fuller.li/en/latest/installation.html](https://swiftenv.fuller.li/en/latest/installation.html)

1. Get the latest version of Swift from [https://swift.org/download/](https://swift.org/download/)

1. Install Swift

   [https://swiftenv.fuller.li/en/latest/getting-started.html#installing-swift](https://swiftenv.fuller.li/en/latest/getting-started.html#installing-swift)

   ```
   swiftenv install 4.0.3
   ```

#### REPL

With swiftenv:

```
swift -I ~/.swiftenv/versions/$(swiftenv global)/usr/lib/swift/clang/include/
```
