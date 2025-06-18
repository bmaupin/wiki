---
title: SDKMAN
---

SDKMAN is a tool for managing Java installations and related tools, like [NVM](../javascript/nvm) for Java.

## Setup

#### Install SDKMAN

[https://sdkman.io/install](https://sdkman.io/install)

#### Add a locally installed version of Java to SDKMAN

1. Install a version of Java on your system, e.g.

   ```
   sudo apt install openjdk-17-jdk
   ```

1. Add it to SDKMAN

   ```
   sdk install java 17-openjdk /usr/lib/jvm/java-17-openjdk-amd64
   ```

## Usage

#### List the installed versions of Java

Type `sdk use java` and press <kbd>Tab</kbd>

#### List default versions of all software managed by SDKMAN

Run this command in a new shell (in case the version has been changed in the current shell):

```
sdk current
```

#### List the default version of Java

Run this command in a new shell (in case the version has been changed in the current shell):

```
sdk current java
```

#### Change the version of Java used for the current session

e.g.

```
sdk use java 17-openjdk
```

#### Change the version of Java used by default

e.g.

```
sdk default java 17-openjdk
```
