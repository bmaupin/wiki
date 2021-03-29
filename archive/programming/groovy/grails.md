---
title: Grails
---

#### Resources

- [Grails Best Practices](http://www.infoq.com/articles/grails-best-practices)

#### Installation

Use the installation instructions from the Grails documentation:
[https://grails.org/download.html](https://grails.org/download.html)

The current recommended installation method is SDKMAN:

1. Install SDKMAN

   [http://sdkman.io/install.html](http://sdkman.io/install.html)

1. Install Grails

   ```
   sdk install grails X.X.X
   ```

1. Configure Java with SDKMAN
   ```
   sdk install java openjdk-8 /usr/lib/jvm/java-8-openjdk-amd64
   sdk use java openjdk-8
   ```

## Basics

#### Organization

- grails-app
  - /controllers
    - The C in MVC
    - Keep controllers as thin as possible (most logic should go into a service)
  - /domain
    - The M in MVC
    - Code specific to one domain can also be put here. If it's logic spread across domains, don't put it here. Put it in a service or /src
  - /services
    - "Services in Grails are the place to put the majority of the logic in your application" ([http://docs.grails.org/2.5.6/guide/services.html](http://docs.grails.org/2.5.6/guide/services.html))
    - One factor to consider is services support transactions and Spring dependency injection
  - /views
    - The V in MVC. These are mostly GSP pages, a mix of HTML and Groovy
    - Keep views as as thin as possible (most logic should go into a service)
- /src/groovy
  - Put everything else here

#### Add a page

1. At a minimum, the page must be added as an action to the controller:

   ```
   class BookController {
       def testpage() {}
   ```

1. Optionally, add a GSP page in the controller directory under the views directory with the same name as the action. E.g.:

   myapp/grails-app/views/book/testpage.jsp

1. The URL to the page will be in the format http://_site_/_app_/_controller_/_action_, e.g:

   http://localhost:8080/myapp/book/testpage

## Setup

#### Create .gitignore

```
grails integrate-with --git
```

## Controllers

#### Create a controller

```
grails create-controller book
```

## Services

[https://grails.github.io/grails-doc/latest/guide/services.html](https://grails.github.io/grails-doc/latest/guide/services.html)

#### Create a service

```
grails create-service servicename
```

If the service is related to a particular domain class, give it the same name:

```
grails create-service Book
```

(creates service BookService)

#### Call a service from a controller

[http://stackoverflow.com/a/6250979/399105](http://stackoverflow.com/a/6250979/399105)

Define the service outside the action:

```
class BookController {
    def bookService
    def list {
        bookService.listBooks()
    }
```

## Scripts

#### Types of scripts

- Gant scripts

  - Specialized scripts, run like this:
    ```
    grails my-script
    ```

- Groovy scripts
  - Normal Groovy scripts with access to the Grails environment, run like this:
    ```
    grails run-script scripts/MyScript.groovy
    ```

#### Accessing the database from a Grails script

[http://stackoverflow.com/q/675514/399105](http://stackoverflow.com/q/675514/399105)

## Console

#### Open the GUI console

```
grails console
```

#### To access classes from your package

```
import myapp.*
```
