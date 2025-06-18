---
title: NVM
---

ⓘ NVM (Node Version Manager) is a tool for installing and managing versions of Node.js

## Setup

#### Install or update NVM

https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

#### Set the latest LTS as the default version of Node

⚠️ This will always point to the exact version of the latest LTS so as this changes you will periodically need to install the newer version; see _Troubleshooting_ below

```
nvm alias default lts/*
```

## Usage

#### List installed versions of Node.js

```
nvm list
```

#### Install a version of Node.js

e.g. install the latest version of Node 24:

```
nvm install 24
```

#### Uninstall a version of Node.js

```
nvm uninstall 24.1.0
```

## Troubleshooting

#### Node not installed

If you set the default version of Node to the latest LTS, it will need to be installed periodically:

```
nvm install lts/*
```

This is because `lts/*` is pinned to the exact LTS version (not the major version), so if the latest LTS is 22.16.0 but you have another version of Node 22 installed, it won't be used as the default:

```
$ nvm list
       v22.13.1
        v24.2.0
default -> lts/* (-> N/A)
```
