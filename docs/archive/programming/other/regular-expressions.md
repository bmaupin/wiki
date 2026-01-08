---
title: Regular expressions
---

#### useful sites

- [regex tester](http://regexpal.com/)
- [regular expressions in python](http://docs.python.org/library/re.html)
- [regular expressions in vim](http://www.softpanorama.org/Editors/Vimorama/vim_regular_expressions.shtml)
- [perl regular expressions](http://perldoc.perl.org/perlre.html)

#### characters that must be escaped:

`[`, `\`, `^`, `$`, `.`, `|`, `?`, `*`, `+`, `(`, `)`

#### character matches

| `\d` | single character that is a digit |
| `\n` | line feed (0x0A) |
| `\r` | carriage return (0x0D) |
| `\s` | whitespace character (includes tabs and line breaks) |
| `\t` | tab character (ASCII 0x09) |
| `\w` | "word character" (alphanumeric characters plus underscore) |
| `.` | single character, except line break characters. It is short for `[^\n]` (UNIX regex flavors) or `[^\r\n]` (Windows regex flavors) |
| `[]` | match a character class |
| `-` | inside a character class to specify a range of characters |
| `^` | after the opening square bracket will negate the character class |

\*remember that Windows text files use \r\n to terminate lines, while UNIX text files use \n.

\*if your regular expression engine supports Unicode, use \uFFFF to insert a Unicode character. E.g. \u20AC matches the euro currency sign.

#### anchors

(anchors do not match any characters. they match a position.)

| `^` | matches at the start of the string |
| `$` | matches at the end of the string |
| `\b` | matches at a word boundary. A word boundary is a position between a character that can be matched by \w and a character that cannot be matched by \w |
| `\B` | matches at every position where \b cannot match. |

#### other matches

| `|` | or |
| `?` | makes the preceding token in the regular expression optional<br>E.g.: colou?r matches colour or color. |
| `*` | attempt to match the preceding token zero or more times |
| `+` | attempt to match the preceding token once or more<br>E.g.: `<[A-Za-z][A-Za-z0-9]*>` matches an HTML tag without any attributes. `<[A-Za-z0-9]+>` is easier to write but matches invalid tEleven characters with special meanings: the opening square bracket `[`, the backslash `\`, the caret `^`, the dollar sign `$`, the period or dot `.`, the vertical bar or pipe symbol `|`, the question mark `?`, the asterisk or star `*`, the plus sign `+`, the opening round bracket `(` and the closing round bracket `)`. These special characters are often called "metacharacters".ags such as `<1>`. |
| `{}` | specify amount of repetition<br>E.g.: Use `\b[1-9][0-9]{3}\b` to match a number between 1000 and 9999. `\b[1-9][0-9]{2,4}\b` matches a number between 100 and 99999.<br>Use `{3,}` to match 3 or more repetitions |
| `()` | create a group |
| `\#` | match a group (use slash plus a number, starting at 1, to indicate which group, i.e. `\1` for the first group |
| `(?i)` | case insensitive regex |
| `(?=pattern)` | zero-width positive look-ahead assertion. For example, `/\w+(?=\t)/` matches a word followed by a tab, without including the tab. |

#### matches that must be escaped in vim:

`+` `(` `)` `|`

#### examples:

`q[^x]` matches qu in question. It does not match Iraq since there is no character after the q for the negated character class to match.

`\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b`

search for an email address

`^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$`

verify properly formatted email address

`:%s/^\s\+\(o\|*\|+\)\s//g`

(vim) remove whitespace followed by one of o, \*, +, and one more whitespace character at beginning of line (for copying stuff from Google docs to remove formatting)
