---
title: Jest
---


#### Fix `SyntaxError: Unexpected token import`

Jest cannot out of the box handle es6 code such as imports

1. Install babel-jest and dependencies

    ```
    npm install --save-dev babel-jest @babel/core @babel/preset-env
    ```

1. Add this to .babelrc:

    ```json
    "presets": ["@babel/preset-env"]
    ```


#### Fix `ReferenceError: regeneratorRuntime is not defined`

This is caused by code using async/await

1. Install @babel/plugin-transform-runtime and @babel/runtime

    ```
    npm install --save-dev @babel/plugin-transform-runtime @babel/runtime
    ```

1. Add this to .babelrc:

    ```json
    "plugins": ["@babel/plugin-transform-runtime"],
    ```


#### Fix `Error: connect ECONNREFUSED 127.0.0.1:80`

Add this to package.json:

```json
  "jest": {
    "testURL": "file://test"
  },
```
