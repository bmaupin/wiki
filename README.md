# My wiki\*

\*Not really a wiki since not meant to be collaborative, more of a dumping ground for personal documentation.

## Framework

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```
npm install
```

## Local Development

```
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```
npm run build
```

To test the static build locally:

```
npm run serve
```

## Deployment

TODO: keep for manual deployments? or delete?

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
