---
title: JavaScript package management
---

## NPM

#### Install NPM
NPM comes with Node.js. To install Node.js:
[https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)


#### List outdated packages

    npm outdated


#### Upgrade a package
Upgrade a dependency:

    npm install packagename@latest

Upgrade a dev dependency:

    npm install packagename@latest --save-dev


#### List installed packages

    npm ls



## Yarn

#### Install Yarn
[https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install)


#### Install a package as a dependency

    yarn add packagename


#### Install a package as a dev dependency

    yarn add --dev packagename


#### Upgrade a package

    yarn add packagename
