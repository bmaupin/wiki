---
title: NPM
---

#### Install NPM

NPM comes with Node.js. To install Node.js:
[https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

#### List outdated packages

```
npm outdated
```

#### Upgrade a package

Upgrade a dependency:

```
npm install packagename@latest
```

Upgrade a dev dependency:

```
npm install packagename@latest --save-dev
```

#### List installed packages

```
npm ls
```

#### Scan for vulnerabilities

```
npm audit
```

#### Fix vulnerabilities

1. Try to fix automatically

   ```
   npm audit fix
   ```

1. If that doesn't work:
   ```
   rm -rf node_modules/*
   npm install
   ```
