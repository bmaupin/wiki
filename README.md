# My wiki\*

\*Not really a wiki since not meant to be collaborative, more of a dumping ground for personal documentation.

## Framework

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

Client-side search is provided by [docusaurus-search-local](https://github.com/cmfcmf/docusaurus-search-local)

## Usage

#### Override directory label

Directories will show up in the sidebar and the breadcrumbs with this formatting (see `formatSidebarItems` in [docusaurus.config.ts](./docusaurus.config.ts)):

- First letter will be capitalised
- Dashes (`-`) will be replaced with spaces

If you wish to override this formatting, create a `_category_.json` file in the directory with the desired label, e.g.

```json
{
  "label": "TypeScript"
}
```

#### Override page title

The page title is used in the sidebar and breadcrumbs

- If no title is provided, the filename will be used as-is (minus the extension)
- If an H1 element is added (e.g. `#` in markdown), it will be used for the page title
- You can also override the page title using [front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter), e.g.

  ```markdown
  ---
  title: Setting up a new TypeScript project
  ---
  ```

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
