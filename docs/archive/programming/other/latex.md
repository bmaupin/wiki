---
title: LaTeX
---

## Misc

#### Beginner's guide
[http://ctan.math.washington.edu/tex-archive/info/lshort/english/lshort.pdf](http://ctan.math.washington.edu/tex-archive/info/lshort/english/lshort.pdf)


#### Installing Latex
```
sudo apt install texlive
```


#### Installing Texmaker, a popular Latex editor
```
sudo apt install texmaker
```


#### Characters that must be escaped
`# $ % ^ & _ { } ~ \`


#### Comments:
Use `%`

Block comments:
```latex
\begin{comment}
Stuff to comment
\end{comment}
```

**Note:** block comments require:

```latex
\usepackage{verbatim}
```



## Formatting

#### Italicize

```latex
The cake was \emph{huge} for a cup cake
```


#### Bullets

```latex
$\bullet$
```

Or:

```latex
$\cdot$(for a small dot)
```
