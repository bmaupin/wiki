This is my wiki. There are many like it, but this one is mine.

## Framework

This is a React Router application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

## Development

Run development server:

```bash
npm run dev
```

## Troubleshooting

#### `Error: A document with id ... already exists.`

If you see such an error as this:

```
file:///.../wiki/node_modules/@orama/orama/dist/esm/errors.js:48
    const error = new Error(sprintf(errors[code] ?? `Unsupported Orama Error code: ${code}`, ...args));
                  ^

Error: A document with id "/docs/archive/programming/python/python-3" already exists.
```

This is an error from Orama. You can query `/api/search` to see a list of all of the search documents and IDs. In this example:

- There was a page named `python.md`
  - This page gets an ID ending with `/python`
  - All of the headings in the page get converted to IDs numerically, e.g. `/python-0`, `/python-1`, etc.
- There was another page named `python-3.md` in the same directory
  - Orama tries to create an ID for it ending with `/python-3` which conflicts with the fourth heading in `python.md`, which has an ID ending with `/python-3`

The easiest solution would be to rename `python-3.md`, e.g. to `python3.md` or `python-three.md`
