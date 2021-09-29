---
title: Setting up a new TypeScript project
---

## Node.js

1. Create a new npm project

   1. Create a new directory and cd into it

   1. Initialize a new npm project

      ```
      npm init
      ```

1. Install `ts-node` and `typescript`

   ```
   npm i ts-node typescript
   ```

1. Create `tsconfig.json`

   ```
   npx tsc --init
   ```

   - If you forget this step, you may get weird TypeScript errors, such as

     ```
     Cannot find name 'require'.
     ```

1. Update `package.json`

   - Update references to files with `.js` extensions, e.g.

     ```json
     "main": "app.ts"
     ```

     (Even if this is a fresh TypeScript project, you may have references to `.js` files depending on how you used `npm init`)

   - Update anything in `scripts` using `node` to use `ts-node`, e.g.

     From:

     ```json
     "start": "node ."
     ```

     To:

     ```json
     "start": "ts-node ."
     ```
