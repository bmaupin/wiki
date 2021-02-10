---
title: Bash/shell scripting
---

[http://tldp.org/LDP/abs/html/index.html](http://tldp.org/LDP/abs/html/index.html)

## Variables

#### `$?`

Return value of last run process

#### `$1`

The first argument passed to the script

#### `$0`

The name of the script

#### Declaring variables

To declare a variable within a script:

```
myvariable="value"
```

**Note:** do not put spaces before or after equals sign!

To declare a variable outside a script that is to be used within a script:

```
export myvariable="value"
```

Or pass it at the same time you call the script (which only declares it for the context of the script):

```
myvariable="value" ./myscript
```

#### Using variables

```
echo "This is my variable: ${myvariable}"
```

#### Check to make sure a variable is set and not null

```
if [ -n "$1" ]
```

#### Check the value of a variable

```
if [ "$LOCATION" == "home" ]; then
```

- Spaces padding brackets and equals signs are required!
- Use `[]` instead of `[[]]`
- Always quote variable names, otherwise the script will crash if the variable isn't set
- Use `==` for equality and `!=` for inequality for strings, `-eq` and `-ne` for integers. [Other comparison operators](http://tldp.org/LDP/abs/html/comparison-ops.html)

## Output redirection

#### `>`

Redirect stdout

#### `>/dev/null`

Don't show stdout

#### `2>`

Redirect stderr

#### `2>&1`

Direct stderr to stdout

#### `&>`

Redirect all output

## Conditionals

#### If statements

```
if [ condition ]; then
elif...
fi
```

#### And/or

```
if [ condition ] && [ condition ] || [ condition ]; then
...
```

#### Case statements

Example from an init script:

```
case "$1" in
    start)
    start
    RETVAL=$?
    ;;
    stop)
    stop
    RETVAL=$?
    ;;
    restart)
    stop
    start
    ;;
esac
```

#### Check if a directory exists

```
if [ -d /path/to/folder ]; then
fi
```

#### Check if a file exists

```
if [ -f /path/to/file ]; then
fi
```

#### Check if a file exists and is readable

```
if [ -r /path/to/file ]; then
fi
```

#### Check if a file exists and is executable

```
if [ -x /path/to/file ]; then
fi
```

## Command-line arguments

#### First argument

```
$1
```

#### Second argument

```
$2
```

#### Number of arguments

```
$#
```

## Scripting tips

#### Environment variables

Make sure to export environment variables if they're needed by a command in your script (and not just used internally by your script):

```
export http_proxy=http://proxy.example.org:3128/
export https_proxy=http://proxy.example.org:3128/
```

#### `cp`

Use:

```
/bin/cp -f
```

Because often vendors will alias cp so that it will always ask before overwriting files:

```
$ alias cp
alias cp='cp -i'
```

#### `curl`

- Prefer curl to wget since curl will nearly always be present while wget may not be
- Use `-s` to hide the progress bar:

  ```
  curl -s ...
  ```

#### `ln`

Don't fail if the link already exists:

```
ln -fs
```

#### `mkdir`

Create child directories and don't fail if the directory already exists:

```
mkdir -p
```

#### `rm`

Don't fail if the directory/file has already been deleted:

```
rm -f
```

#### `systemctl`

Use `--no-pager` to not page results, e.g.

```
systemctl status docker --no-pager || sudo systemctl start docker
```

#### `telnet`

```
sleep 0 | telnet server.example.org 22 || true
```

## Misc

#### For loops

```
list="item1 item2"
for item in $list; do
    do something with $item
done
```

#### `|| :`

Placed at the end of a command to force the exit status to 0 (success)

#### `$(dirname $0)`

Get name of directory script resides in
