---
title: CSS
---

## Tips

- For anything but the most basic layout, flexbox will probably be the cleanest solution. See below for more info on flexbox.

## Misc

#### Resources

- CSS tips: [Writing Less Damn Code](http://www.heydonworks.com/article/on-writing-less-damn-code)

#### Putting CSS directly in HTML:

```
<style type="text/css">
body
{
    color: purple;
    background-color: #d8da3d;
}
</style>
```

#### Putting CSS directly in an HTML element:

```
<span style="color: red;">No password is required</span>
```

**Padding:** how much space is between the edges of the element and its contents

**Margin:** how much space is between the edges of the element and the next element

## Syntax

#### Apply a style to a particular element

```
h1 {
    text-align: center;
}
```

Applies to all h1 elements

#### Use a period to apply to a specific class

```
.comment {
    font-size: 0.8em;
}
```

Applies to all elements with the comment class:

```
<div class="comment">
```

#### Use pound/hash to apply to a specific id

```
#search {
    background-color: blue;
}
```

Applies to elements with the specified id:

```
<div id="search">
```

#### Combining selectors

```
h1.center {
    text-align: center;
}
```

Applies to:

```
<h1 class="center"/>

div#search {...
```

Applies to:

```
<div id="search">
```

#### Use a space for specific contexts

```
h1 b {
    property: value;
}
```

Only applies in this case:

```
<h1>
  <b>
```

#### Use a comma for multiple selectors

```
h1, h2, h3 {
    font-weight: bold;
}
```

Applies to:

```
<h1>
<h2>
<h3>
```

#### Use an asterisk to apply to all values

```
* {
    color:red
}
```

Applies to all elements that accept the color property

```
div * {
    color:red
}
```

Applies only to elements that are children of a dev

#### Comments

```
/* Commented text here */
```

## Flexbox

[https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)

#### Align items horizontally

Add this to the parent element:

```
display: flex;
```

#### Allow items to move to the next line if the display is too small

Add this to the parent element:

```
display: flex;
flex-flow: row wrap;
```

#### Center a div

Add this to the parent element:

```
align-items: center;
display: flex;
justify-content: center;
```
