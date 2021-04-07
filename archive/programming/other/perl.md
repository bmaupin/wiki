---
title: Perl
---

#### Use Python instead: [http://www.linuxjournal.com/article/3882](http://www.linuxjournal.com/article/3882)

## special variables and arrays

| `$@` | `$EVAL_ERROR` | the Perl syntax error message from the last eval command |
| `@_` | | array of varables passed to the function |

## strings

#### string concatenation

use `.`

```
print $mystring . "\n";
```

#### find substring within string

```
if (index($str, $substr) != -1) {
    print "$str contains $substr\n";
}
```

## misc

#### if statements

```
if ($somevar) {
    do_something();
} elsif ($someothervar) {
    do_something_else();
} else {
    ...
}
```
