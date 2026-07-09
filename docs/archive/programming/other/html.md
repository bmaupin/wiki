---
title: HTML
---

See: [http://www.w3schools.com/html/](http://www.w3schools.com/html/)

## Tips

#### Responsive design

- Add this meta tag to the head ([https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag#Viewport_basics](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag#Viewport_basics)):
  ```
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```

## Style

#### Folder structure

- assets
  - images
  - scripts
    - script.js
  - styles
    - style.css

#### Spacing

- Use 2 spaces for HTML

## General

#### Element attributes

- id
  - Javascript uses this to uniquely identify an element
- name
  - For forms, this becomes the key in the array of post variables ($\_POST)

## Forms

[http://www.w3schools.com/html/html_forms.asp](http://www.w3schools.com/html/html_forms.asp)

#### Simple form to send POST values to the current page:

```
<form method="post">
  Text input: <input type="text" name="input-text-name" />
  <input type="submit" name="input-submit-name" value="input-submit-value" />
</form>
```

(input-submit-value is the actual text that displays on the submit button)

sends these post variables to the page (contents of `$_POST` in php):

```
Array (
    [input-text-name] => THE TEXT YOU TYPED
    [input-submit-name] => input-submit-value
)
```

Alternative:
Instead of input type=submit, use a submit button:

```
<form...
<button type="submit" name="button-submit-name" value="button-submit-value">Submit</button>
```

which will send this (so you can send a different value besides the button text):

```
Array ([button-submit-name] => button-submit-value)
```

## Tables

[http://www.w3schools.com/html/html_tables.asp](http://www.w3schools.com/html/html_tables.asp)

#### Simple table

```
<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>row 1, cell 1</td>
    <td>row 1, cell 2</td>
  </tr>
  <tr>
    <td>row 2, cell 1</td>
    <td>row 2, cell 2</td>
  </tr>
</table>
```
