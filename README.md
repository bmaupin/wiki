# My wiki\*

\*Not really a wiki since not meant to be collaborative, more of a dumping ground for personal documentation.

## Framework

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

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

## Development

1. Install dependencies

   ```
   npm install
   ```

1. Start the local dev server

   ```
   npm run dev
   ```

   or

   ```
   npm start
   ```

## Build

```
npm run build
```

To test the static build locally:

```
npm run serve
```

## Search

Client-side search is provided by [docusaurus-search-local](https://github.com/cmfcmf/docusaurus-search-local)

- It creates a full text index at build time located at build/search-index-docs-default-current.json
  - It's fairly large but only seems to be loaded when a search is ran
