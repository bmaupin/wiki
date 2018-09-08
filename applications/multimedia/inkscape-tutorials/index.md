---
title: Inkscape/SVG tutorials
---

#### Draw a rectangle/circle
1. Select either the button to create a rectangle or a circle
1. Click on a color at the bottom for the fill color
1. Find a color for the stroke (the edges) and right-click > *Set stroke*


#### Set stroke (outline) width
Right-click the object > *Fill and Stroke* > *Stroke style* > *Width*


#### Get the size of an object/resize it
1. Click the Select button  
    ![](inkscape-select.png)
1. The object's dimensions will be at the top of the screen. They can be changed to resize it.
1. To lock the aspect ratio when resizing, click the lock at the top of the screen or hold down the Ctrl key and resize the image using the arrows around it.


#### Group objects so they can be moved together
1. Drag a box around the objects to group
1. *Object* > *Group*


#### Center objects within the page
1. First, resize the page as desired
*File* > *Document Properties* > *Custom size*
1. Drag a box around the objects to center
1. *Object* > *Align and Distribute*
1. Check *Treat selection as group*
1. Click *Center on vertical axis* and/or *Center on horizontal axis*


#### Resize document to fit image
*File* > *Document Properties* > expand *Resize page to content* > *Resize page to drawing or selection*


#### Change the background transparency
1. *File* > *Document Properties* > *Page*

1. Click to the right of *Background*

1. In the *RGB* tab change the alpha channel (A) as desired
    - 0: fully transparent
    - 1: fully opaque


#### Convert an SVG to a PNG file
[http://stackoverflow.com/a/14174624/399105](http://stackoverflow.com/a/14174624/399105)

```
inkscape -z -e test.png -w 1024 -h 1024 test.svg
```


#### Clean up/optimize SVG files
[https://jakearchibald.github.io/svgomg/](https://jakearchibald.github.io/svgomg/)

Helpful options:
- Always:
    - Enable *Multipass*

- For better display on websites:
    - Enable *Prefer viewBox to width/height*

- If you wish to be able to edit the SVG later:
    - Enable *Prettify code*
    - Disable *Merge paths*
