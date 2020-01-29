---
title: JavaScript async
---

## Quick reference

#### Gotchas
- Don't use `await `inside a Promise constructor. Make the function that handles the Promise `async` or use `.then`
([https://eslint.org/docs/rules/no-async-promise-executor](https://eslint.org/docs/rules/no-async-promise-executor))
- Don't use `throw` inside a Promise constructor; use `reject`
([https://stackoverflow.com/a/33446005/399105](https://stackoverflow.com/a/33446005/399105))
- Don't use `async`/`await` in a forEach loop. Just use a regular for loop
([https://stackoverflow.com/q/37576685/399105](https://stackoverflow.com/q/37576685/399105))


#### [async](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function) (ES2017)
- Functions marked as `async` return a Promise implicitly (using the return keyword)
- If a function returns a promise explicitly (`return new Promise...`) it doesn't need to be marked as `async`
- Prefer the use of `async` to returning a Promise explicitly when possible


#### [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) (ES2017)
- The `await` operator is used to wait for a Promise
- It can only be used inside an `async` function


#### [.then](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) (ES6)
- Used after calling a function that returns a Promise
- Prefer `await` to `.then` when possible


#### [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) (ES6)
- Prefer `async` to returning a Promise when possible
- Only use Promises in situations where you can't use `async`/`await`, e.g.:
    - Use the Promise constructor to wrap callback/asynchronous functions that do not already support promises/`async`
    - Use `.then` to call an `async` function (or function that returns a Promise) when you can't make that function
    `async`



## Async/await (ES2017, preferred)
**Important:** async/await is merely syntactic sugar for Promises, so you must understand Promises first. See below for
more information.

#### `async`
`async` is syntactic sugar used to create a function which implicitly returns a Promise:

```javascript
async function returnPromise() {
  // ...
}
```


#### Throwing an error inside an async function
Use `throw` as you would with synchronous code


#### Calling an async function
Use `await` (**Note:** As mentioned above, `await` can only be used inside an `async` function. To call an async function from a
non-async function you must use `.then` (see below under Promises))

```javascript
value = await returnPromise();
```


#### Catching errors
Use `try`/`catch` as you would with synchronous code

```javascript
try {
  await doSomething();
} catch {
  // ...
}
```



## Promises (ES6)
[https://developer.mozilla.org/docs/Web/JavaScript/Guide/Using_promises](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Using_promises)

#### Creating a Promise using the Promise constructor
**Note:** using `async` is preferred. See above for more information.

```javascript
function returnPromise() {
  return new Promise((resolve, reject) => {
    if (successCondition) {
      resolve(valueToReturnOnSuccess);
    } else {
      reject(messageToReturnOnFailure);
    }
  });
}
```

Calling `reject` is optional; if any exceptions are encountered, the Promise rejection will be automatically handled:

```javascript
function returnPromise() {
  return new Promise(resolve => {
    if (successCondition) {
      resolve(valueToReturnOnSuccess);
    }
  });
}
```


#### Throwing errors in Promises

Use `reject` as detailed above. Do not use `throw` ([https://stackoverflow.com/a/33446005/399105](https://stackoverflow.com/a/33446005/399105))


#### Using a Promise
**Note:** using `await` is preferred. See above for more information.

Use `.then`:

```javascript
promise().then(value => {
  // do something with value
});
```


#### Catching errors

If you don't explicitly handle errors when using `.then`, they will be passed to the calling function (similarly to
what happens with synchronous code when you don't handle errors).

If you do wish to explicitly handle errors, use `.catch` (here's why:
[https://stackoverflow.com/a/24663315/399105](https://stackoverflow.com/a/24663315/399105)):

```javascript
promise()
  .then(value => {
    return value;
  })
  .catch(reason => {
    return reason;
  });
```



#### [`Promise.all`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

You can use `Promise.all` to fulfill an array of promises asynchronously. The easiest way to call `Promise.all` is to
use `await`:

```javascript
await Promise.all(arrayOfPromises);
```



## Examples

#### Using await to call a function that returns a Promise
[https://stackoverflow.com/a/39914235/399105](https://stackoverflow.com/a/39914235/399105)

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later');
}
```
