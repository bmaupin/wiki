---
title: JavaScript
---

## General

#### Resources

- Books and other references
  - [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
  - [Exploring JS](http://exploringjs.com/)
  - [Eloquent JavaScript](http://eloquentjavascript.net/)
  - [Learning JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
  - [Mozilla JavaScript reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference)
- Style
  - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
  - [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
  - [Mozilla Coding Style](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style)
  - [Code Conventions for the JavaScript Programming Language](http://javascript.crockford.com/code.html)

#### Notes

- Interactive shells:

  - Use Chrome's built-in console (just create a blank page by going to about:blank and then press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd>)
  - Mozilla provides an interactive javascript shell:

    [https://developer.mozilla.org/en/Introduction_to_the_JavaScript_shell](https://developer.mozilla.org/en/Introduction_to_the_JavaScript_shell)

    - To install in ubuntu/elementary:

      ```
      sudo apt-get install rhino
      ```

      Then call `js` to run it

  - To write messages to the console:

    ```
    console.log("test");
    ```

## Basics

#### Gotchas

- Use `===` and `!==` instead of `==` and `!=` (similar to PHP)

- Use `let` (ES6) instead of `var` when declaring variables since var uses function-level scoping whereas let uses block-level scoping which will act in a way that programmers coming from other languages are more likely to expect.

- Functions can be declared multiple ways that change how the functions can be used. See the section on functions.

#### Style

(Also see style guide resources above)

- Quotes:
  - There is no difference between single/double quotes in JavaScript
  - Use single quotes to work with HTML easier (which uses double quotes)
    - If working on an existing project or with an API, use whatever the surrounding code uses
- Use two spaces for indentation

#### Declare a variable (ES6)

```
let variable = 'value';
```

## Strings

#### Using variables in strings

```
console.log(`text ${expression}`);
```

#### Concatenate variables, strings

```
'string' + variable
```

## [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript#Arrays)

#### Declare an array

```
let someArray = [];
let anotherArray = ["item1", item2"];
```

#### Add an item to the end of an array

```
myArray.push("some string");
```

#### Get the length of an array

```
myArray.length
```

## Objects

#### Iterate over an object

Use `for...in` ([https://stackoverflow.com/a/684692/399105](https://stackoverflow.com/a/684692/399105))

```
for (let prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(prop[obj]);
  }
}
```

## Exceptions

#### Throwing exceptions

Use this format:

```
throw new Error('Error text');
```

That's preferable to `throw 'text'` because that won't include the call stack ([https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch3.md#date-and-error](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch3.md#date-and-error))

## DOM

#### Notes:

- You cannot get the length element of an element with the same id but many nodes using getElementById. It will only get the first node. You need to refer to the element directly, e.g:

  ```
  document.form_name.radio_name.length;
  ```

  not:

  ```
  document.getElementById('radio_id').length;
  ```

#### Get a specific element by ID

```
let element = document.getElementById('some_id');
```

#### Get all elements of a specific type

```
let inputs = document.getElementsByTagName('input');
for (let i = 0; i < inputs.length; ++i) {
    alert(inputs[i].value);
}
```

#### Accessing an element's attributes

Normally element.attribute, e.g. element.id, element.name, element.src, element.value

## Specific tasks

#### Replace contents of a div

```
document.getElementById('div_id').innerHTML = 'new content'
```

## Async/promises

See [JavaScript async](../../../programming/javascript/javascript-async)
