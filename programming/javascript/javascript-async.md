---
title: JavaScript async
---

## General

#### Gotchas
- Don't use async/await in a forEach loop. Just use a regular for loop ([https://stackoverflow.com/a/37576787/399105](https://stackoverflow.com/a/37576787/399105))

#### [async](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function) (ES8)
- Functions marked as `async` return a Promise implicitly (using the return keyword)
- If a function returns a promise explicitly (`return new Promise...`) it doesn't need to be marked as `async`
- Prefer the use of `async` to returning a Promise explicitly when possible

#### [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) (ES8)
- The `await` operator is used to wait for a Promise
- It can only be used inside an `async` function

#### [.then](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) (ES6)
- Used after calling a function that returns a Promise
- Prefer `await` to `.then` when possible

#### [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) (ES6)
- Prefer `async` to returning a Promise when possible
- Returning a Promise explicitly may be needed in certain situations, such as handling onload/onerror events or with functions that only use callbacks (you can call resolve() in the callback to return a Promise)



## Async/await (ES8, preferred)
**Important:** since async/await is based on Promises, you must understand Promises first. See below for more.

#### Creating an async function
Use `async` when possible:

    async function returnPromise() {
      // ...
    }


#### Calling an async function
Use await

    await value = returnPromise();



## Promises (ES6)
[https://developer.mozilla.org/docs/Web/JavaScript/Guide/Using_promises](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Using_promises)

#### Creating a Promise
**Note:** using `async` is preferred. See above for more information.

    function returnPromise() {
      return new Promise((resolve, reject) => {
        if (successCondition) {
          resolve(valueToReturnOnSuccess);
        } else {
          reject(messageToReturnOnFailure);
        }
      });
    }

Calling reject() is optional; if any exceptions are encountered, the Promise rejection will be automatically handled:

    function returnPromise() {
      return new Promise(resolve => {
        if (successCondition) {
          resolve(valueToReturnOnSuccess);
        }
      });
    }


#### Using a Promise
**Note:** using `await` is preferred. See above for more information.

Use `then`:

    let promise = returnPromise();
    promise.then(successValue => {
      // fulfillment
    }, errorMessage => ) {
      // rejection
    });

If you don't explicitly handle the error, it will be thrown as an exception:

    promise.then(successValue => {
      // fulfillment
    });



## Error handling

#### await by itself
If you use await to handle a Promise, it functions just like synchronous code (with one exception below)

- try/catch can be used to catch errors
- If try/catch aren't used, errors will continue to be passed up the stack as normal for synchronous code

Exception:
If you use await within an asynchronous callback inside a Promise, throw() won't be caught by the Promise as a rejection. The solution is to wrap all async code inside Promises, then you don't need to worry about this.


#### .then
If you use `.then` to handle a promise, you must explicitly handle errors



## Examples

#### Using await to call a function that returns a Promise
[https://stackoverflow.com/a/39914235/399105](https://stackoverflow.com/a/39914235/399105)

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function demo() {
      console.log('Taking a break...');
      await sleep(2000);
      console.log('Two seconds later');
    }

    demo();
