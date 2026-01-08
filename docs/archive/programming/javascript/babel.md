---
title: Babel
---

#### Compiling

- Certain features require polyfills. See here for the exact list: [https://babeljs.io/docs/usage/caveats/#polyfills](https://babeljs.io/docs/usage/caveats/#polyfills)

- In order to get this functionality, you have several options:

  - For applications

    - Use [babel-polyfill](https://babeljs.io/docs/usage/polyfill/): add it to your project (`yarn add babel-polyfill`) and include it before all other code

  - For libraries
    - Use [transform-runtime](https://babeljs.io/docs/plugins/transform-runtime) instead:
      ```
      yarn add --dev babel-plugin-transform-runtime
      yarn add babel-runtime
      ```

#### Using Babel with Node.js

1. Get the version of node you have installed

   ```
   node --version
   ```

1. Install babel-cli and the appropriate preset

   ```
   npm install --save-dev babel-cli babel-preset-node8
   ```

1. Update your package.json to call babel-node instead of node
   ```
     "scripts": {
       "start": "babel-node . --presets node8",
   ```
