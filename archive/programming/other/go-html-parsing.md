---
title: Go HTML parsing
---

Use "golang.org/x/net/html"

#### Node

- Data

  - For an ElementNode, this is the element tag
  - For a TextNode, this is the text (including whitespace)

- Type
  - ElementNode (3)
  - TextNode (1)
    - A text node is any text between other nodes. It may consist entirely of whitespace.
