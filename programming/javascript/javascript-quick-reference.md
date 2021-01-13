---
title: JavaScript quick reference
---

## [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript#Arrays)

#### Loop through an array

Use a simple for loop:

```javascript
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

Or use [`for...of`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for...of) for better readability:

```javascript
for (let element of array) {
  console.log(element);
}
```

Speed comparison: ([http://jsbench.github.io/#8ed37bb81a337674e317ab5625c701ea](http://jsbench.github.io/#8ed37bb81a337674e317ab5625c701ea))

Do not use:

- [`forEach`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach): `forEach` is slower and can't be used with `await`
- [`for...in`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for...in): `for...in` is meant for iterating over objects; if used for arrays it may iterate out of order ([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#Array_iteration_and_for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#Array_iteration_and_for...in))

#### Determine if a value is in an array

```javascript
array.includes(value);
```
