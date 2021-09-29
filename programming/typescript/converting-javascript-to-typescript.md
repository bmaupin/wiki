---
title: Converting JavaScript to TypeScript
---

## Node.js

1. Follow the steps in [Setting up a new TypeScript project](./setup)

1. Rename \*.js files to \*.ts

1. Fix all TypeScript warnings

   You should see the warnings when you open up the TypeScript files if you're using vscode. Otherwise, you can run:

   ```
   npx tsc
   ```

   - If you're getting TypeScript warnings for a package that has types and you're using `require`, try using `import` instead. e.g.

     From:

     ```javascript
     const { config, createLogger, format, transports } = require('winston');
     ```

     To:

     ```typescript
     import { config, createLogger, format, transports } from 'winston';
     ```
