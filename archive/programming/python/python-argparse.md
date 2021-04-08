---
title: Python argparse
---

#### Docs

[https://docs.python.org/3/library/argparse.html](https://docs.python.org/3/library/argparse.html)

#### Overview

```
import argparse

def parse_arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument('infile_name', metavar='INPUT_FILE')
    parser.add_argument('outfile_name', metavar='INPUT_FILE')

    parser.add_argument('-a', '--adjust', action='store_true', help='Adjust subtitle timecodes')

    args = parser.parse_args()
    return args

args = parse_arguments()

args.infile_name
args.outfile_name
```

#### Positional (required) arguments

```
parser = argparse.ArgumentParser()
parser.add_argument('infile_name', metavar='INPUT_FILE')
parser.add_argument('outfile_name', metavar='INPUT_FILE')

args = parser.parse_args()

args.infile_name
args.outfile_name
```

#### Boolean arguments

This is an example of an optional boolean argument:

```
parser = argparse.ArgumentParser()
parser.add_argument('-a', '--adjust', action='store_true', help='Adjust subtitle timecodes')

args = parser.parse_args()

if args.adjust == True:
...
```
