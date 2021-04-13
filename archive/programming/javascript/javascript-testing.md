---
title: JavaScript testing
---

Current preferred testing framework as of 2017: Jest

## Jest

#### Set up Jest

1. Install Jest

   ```
   yarn add --dev jest
   ```

   Or:

   ```
   npm install --save-dev jest
   ```

1. Update package.json

   ```
     "scripts": {
       "test": "jest"
   ```

1. If you wish to report coverage

   1. Update package.json

      ```
        "scripts": {
          "test": "jest --coverage"
      ```

   1. Install coverage library

      ```
      yarn add --dev coveralls
      ```

      Or:

      ```
      npm install --save-dev coveralls
      ```

   1. Make sure linter ignores coverage folder

      - Point eslint to specific folder

        ```
          "scripts": {
            "lint": "eslint src/*",
        ```

      - Or, add coverage to .eslintignore

1. Configure linter for Jest
   1. Add this to your .eslintrc or .eslintrc.js:
      ```
        "env": {
          "jest": true,
      ```
1. Run jest to make sure it's working

   ```
   yarn test
   ```

   Or:

   ```
   npm test
   ```

1. Create your first test

   1. In the same folder as the Javascript file you want to test, create a `__tests__` folder

   1. Create a tests file with the same name as the Javascript file you're testing, but with a .test.js extension

   1. Write your test

      [https://facebook.github.io/jest/docs/en/getting-started.html](https://facebook.github.io/jest/docs/en/getting-started.html)
