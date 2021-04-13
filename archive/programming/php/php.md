---
title: PHP
---

## Misc

#### REPL

```
php -a
```

## Naming Conventions

See: [http://php.net/manual/en/userlandnaming.rules.php](http://php.net/manual/en/userlandnaming.rules.php)

- Similar to [Python naming conventions](http://www.python.org/dev/peps/pep-0008/)
  - Function names should be lowercase, with words separated by underscores
  - Class names use the CapWords convention
  - Method names use camelCase
  - Constants are written in all capital letters with underscores separating words
  - Use lowercase true, false, and null:
    ```
    return true;
    ```

## Arrays

PHP arrays all act the same, whether or not they're "associative" or "numerically indexed." If it's associative, adding a new element (with no key), will take the last used integer and add 1 for the key (or 0 if no previously used integer as a key.

#### Parse all the elements of an array:

```
foreach ($array as $value) {
    function($value);
}
```

<p></p>

```
foreach ($array as $key => $value) {

}
```

#### Print all elements of an array:

```
print_r($array);
```

or:

```
var_dump($array);
```

or:

```
$var = var_export($array, true);
echo $var;
```

#### Create a simple array

```
$array = array($something, $something else, 2, 'blue');
```

#### Add elements to a numerically indexed array

```
$array = array();
$array[] = 'first value';
$array[] = 'second value';
```

#### Check for a value in an array

```
if (in_array($value, $array))
```

#### Check for a key in an array

```
if (array_key_exists($key, $array))
```

#### Remove a key (and all its values) from an array

```
unset($array[$key]);
```

#### Get the number of elements in an array

```
count($array);
```

#### Get a chunk of an array

```
$input = array("a", "b", "c", "d", "e");

$output = array_slice($input, 2);      // returns "c", "d", and "e"
$output = array_slice($input, -2, 1);  // returns "d"
$output = array_slice($input, 0, 3);   // returns "a", "b", and "c"

print_r(array_slice($input, 2, -1));    // Array([0] => c [1] => d)
print_r(array_slice($input, 2, -1, true));    // Array([2] => c [3] => d)
```

#### Get the last value of an array

```
end(array_values($array));
```

#### Add one array to another

```
$new_array = array_merge($array1, $array2);
```

## Strings

#### Define a string

(do this if you want to concatenate later and it isn't defined)

```
$string = '';
```

#### Concatenate a string

```
$string .= $something_else;
```

#### Check for a value in a string

```
strstr($string, $value);
```

Returns the portion of string, or FALSE if value is not found.

#### Replace a value in a string

```
$newstring = str_replace($oldsubstring, $newsubstring, $string);
```

#### Split (explode) a string into an array

```
explode($delimiter, $string [, $limit]);
```

Ex:

```
explode(',', 'this,that');
```

#### Strip whitespace

```
trim($string);
```

#### Print a variable within a string

```
echo "myvar={$myvar}<br />\n";
```

#### Print a formatted string

```
printf('There is a difference between %s and %s', 'good', 'evil');
```

#### Return a formatted string

```
$mystring = sprintf('There is a difference between %s and %s', 'good', 'evil');
```

#### Multi-line string

```
echo "First line<br />\n" .
     "Second line<br />\n";
```

#### Compare two strings

```
if ($string1 === 'test') {
```

<span style="color:red">**Warning:**</span> don't use `==` !!!

## Loops

#### Go to the next element in a loop

```
continue;
```

## Functions

#### Define a function

```
function my_function() {
}
```

#### Return a value from a function

```
return $value;
```

#### Check for the existence of a function

```
if (function_exists('my_function')) {
}
```

#### Default argument values

```
function my_function($myval1 = 1, $myval2 = null) {
}
```

\*All of the arguments with default values then become optional. for example, this function can now be called with no arguments

## Mysql

Use [mysqli](http://www.php.net/manual/en/mysqli-stmt.prepare.php#example-1591)

## OOP

#### Calling class methods

use `::` for static methods, and `->` for instance methods

Ex:

```
Class::method();
$instance->method();
```

#### Accessing object properties/variables

Use `->`:

```
$object->property;
```

## Exceptions

```
try {
    $ccache->initPassword('user@EXAMPLE.ORG', 'password');
} catch (Exception $e) {
    echo($e->getMessage() . "<br />\n");
    echo($e->getCode() . "<br />\n");
}
```

## Misc

#### Comparing to true

Use `=== true` if you want to match true itself (and not strings, or any other non-zero/false value):

```
echo "test" == true;
1
echo "test" === true;
```

(returns nothing)

#### Evaluation of variables

```
if ($variable) {
    variable is defined and anything but 0 or '0'
} else {
    variable isn't defined (or is null, see below)
    variable is defined but empty ($variable = '';)
    variable is set to 0 ($variable = '0'; or $variable = 0;)
}
```

#### Null variables

A variable is null if:

1. It hasn't been defined yet
1. It's been assigned the null value
   ```
   $myvar = null;  // (null is case-insensitive)
   ```
1. It's been unset using the unset() function

#### Check if a variable or an array is empty

```
empty($var)
```

or

```
empty($array)
```

#### If statements

```
if ($somevar) {
    do_something();
} elseif ($someothervar) {
    do_something_else();
} else {
    ...
}
```

#### Get the value of a global PHP setting

```
echo ini_get('memory_limit');
```

#### End the current script

```
exit();
```

or

```
exit;
```

or

```
exit(STATUS MESSAGE OR CODE);
```

#### Filesystem evaluation

dir

- is_file:
- is_dir: 1
- is_link:

file

- is_file: 1
- is_dir:
- is_link:

link

- is_file: 1
- is_dir:
- is_link: 1

#### Access POST variables

```
$somevar = $_POST['myvar'];
```

#### Logging

use error_log:

```
error_log('ERROR: log some stuff');
```
