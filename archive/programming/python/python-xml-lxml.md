---
title: Python XML (lxml)
---

[http://codespeak.net/lxml/](http://codespeak.net/lxml/)

[http://codespeak.net/lxml/tutorial.html](http://codespeak.net/lxml/tutorial.html)

## XML vocabulary

- Each node is an element
- Each element has a tag
- Elements can have attributes within the tags
- Elements can have text between opening and closing tags

<pre>
<<em>element-tag</em>>
    <<em>subElement-tag attribute="value"</em> />
    <<em>subElement-tag</em>>><em>element text</em></<em>subElement-tag</em>>
</<em>element-tag</em>></pre>

## Parsing

#### Parse XML text

```
import lxml.etree
root = lxml.etree.fromstring(xml_text)
```

#### Parse XML from file

```
root = lxml.etree.parse(infile_name)
```

Note: `infile_name` can be the full path to the file as a string or a file object

#### Parse HTML from URL (keeping the doctype declaration)

Python 3:

```
import urllib.request
import lxml.etree
import lxml.html
parser = lxml.etree.HTMLParser()
with urllib.request.urlopen('https://pypi.python.org/simple') as f:
    page = lxml.html.parse(f, parser)
```

Python 2:

```
import lxml.html
# put the page into an lxml Element type
page = lxml.html.parse(source_url)
# must refer to page.getroot() to get the lxml root object
page.getroot().find('ELEMENT-TAG')
```

#### Parse HTML from URL (losing the doctype declaration)

```
import lxml.html
# put the page into an lxml Element type
page = lxml.html.parse(source_url).getroot()
```

#### Setting encoding when parsing

```
parser = lxml.etree.XMLParser(encoding='utf-8')
root = lxml.etree.parse(infile, parser)

parser = lxml.html.HTMLParser(encoding='utf-8')
page = lxml.html.parse(infile, parser)
```

## Iterating

#### Iterate every element and all child elements in the tree:

```
for element in root.iter()
```

#### Iterate only specific elements in the tree:

```
for element in root.iter('child'):
```

#### Iterate only immediate child elements in the tree:

```
for element in root:  # elements act like lists
```

## Processing XML

#### Get an element that's the child of root

`root.find('`_`element-tag`_`')`

#### Find an element anywhere in the tree

`root.find('.//`_`element-tag`_`')`

#### Get the tag

_`element`_`.tag`

```
>>> a1.tag
'a'
```

#### Get the text

_`element`_`.text`

```
>>> a1.text
'Google'
```

#### Get the attributes

_`element`_`.attrib`

```
>>> e.attrib
{'style': 'display:none;', 'id': 'sites-status', 'class': 'sites-status'}
```

#### Get a specific attribute

_`element`_`.get('`_`attribute-name`_`')`

```
>>> a1.get('href')
'http://www.google.com'
```

#### Get a child element

_`element`_`.find('`_`child-element-tag`_`') # this is if it's an immediate child`

_`element`_`.find('.//`_`child-element-tag`_`') # this is if it's a child but not necessarily immediate`

Or:
(elements behave like lists)

_`element`_`[0]`

#### Get a specific element by ID

```
page.getroot().get_element_by_id('desired_id')
```

## Printing

#### Printing XML

```
lxml.etree.tostring(
    # the element you want to print
    root,
    # (recommended) set encoding
    encoding='utf-8',
    # (recommended) include XML declaration
    xml_declaration=True,
    # (recommended) add whitespace to output
    pretty_print=True,
    # (optional) add a standalone attribute
    standalone='yes'
)
```

#### Printing HTML

```
lxml.html.tostring(
    # don't forget to add .getroot() if you didn't do it when parsing
    page.getroot(),
    # (recommended) set encoding
    encoding='utf-8',
    # (recommended) include the doctype declaration
    doctype=page.docinfo.doctype,
    pretty_print=True,
    # (optional) add for XHTML output (HTML is default)
    method='xml'
)
```

## Generating XML

```
import lxml.etree
# create an element
root = lxml.etree.Element('root')
# create a child element
child = lxml.etree.SubElement(root, 'child')
# set an attribute
child.set('attribute-name', 'attribute-value')

>>> print(lxml.etree.tostring(root, pretty_print=True))
<root>
  <child attribute-name="attribute-value"/>
</root>
```
