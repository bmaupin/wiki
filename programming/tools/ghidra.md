---
title: Ghidra
---

## General

#### Installation

1. Download the latest release from https://github.com/NationalSecurityAgency/ghidra/releases

1. Extract the release

1. Change to the extracted directory and run

   ```
   ./ghidraRun
   ```

#### Upgrade Ghidra

Simply follow the instructions above under _Installation_ to download and run the latest release. The previous release directory can be deleted. You will be prompted as needed to upgrade Ghidra projects.

#### Basic usage

1. If there are no projects, create one

   _File_ > _New Project_

1. Select a project

1. Import file

   _File_ > _Import File_

1. Double-click the file to open it

1. If prompted to analyse, click _Yes_

   Defaults should be fine in most cases

   1. Wait for the analysis to finish; see the status bar in the lower right

#### Go to a specific address

1. _Navigation_ > _Go To_

   - To go to a memory address (e.g. what you'll get from a backtrace in gdb), just type in the address

     💡 It's recommended to prefix the offset with `0x`, otherwise Ghidra may interpret it as decimal if it doesn't contain letters

   - To go to a file address (i.e. a binary offset in a file), use this syntax:
     ```
     file(offset)
     ```
     e.g.
     ```
     file(0x20e3a79)
     ```

## Functions

#### List functions

_Window_ > _Functions_

#### Show functions for a specific type

Put the type name in the _Filter_ box at the bottom of the _Functions_ window

#### Find references to a function

1. Select a function in the _Functions_ window
1. Go to the _Decompile_ window and right-click the function name near the top > _References_ > _Find references to ..._

#### Location of function parameters

ⓘ Function parameters can be on the stack or in registers

To see the location of function parameters from within a function:

1. Go to a function from the _Functions_ window or by double-clicking on it in the _Decompile_ window
1. Scroll to the top of the disassembly of the function in the _Listing_ window. From here you can see the location of the parameters, for example:

   ```
   Stack[0x4]4 this
   ```

   - The `this` parameter is on byte 4 of the stack ($esp+0x4) and is 4 bytes long

If you look at where the function is called from other parts of the code, the parameters are typically set in the assembly instructions immediately prior to the `CALL` in reverse order, e.g.

- `MOV` parameter 2 to $esp+0x4
- `MOV` parameter 1 to top of stack ($esp)
- `CALL`

👉 There may a discrepancy between the stack locations where a function is called and inside the function itself, because the address of the called function gets added to the stack. So a parameter at $esp+0x4 when called may end up at $esp+0x8 in the function.

## Types

#### Show type information

Right-click a type or variable > _Edit Data Type_

## Variables

#### Highlight a variable

ⓘ This makes it easier to see where a variable is used

Right-click > _Secondary Highlight_ > _Set Highlight_

#### Rename a variable

ⓘ If you can figure out what a variable does, renaming it will make it much easier to understand the function

Right-click > _Rename Variable_

## Debugging with Ghidra and gdb

Source: [Decompiling and Debugging with Ghidra](https://dev.to/glsolaria/decompiling-and-debugging-with-ghidra-15k3)

ⓘ Debugging with Ghidra is pretty CPU and memory intensive. For larger binaries it might be best to start with gdb first to narrow down the issue.

#### Prerequisites

- Python 3.7+
- python3-psutil
- python3-protobuf

#### Start debugger

1. Import the file into Ghidra, analyse it, and wait for the analysis to complete

1. In the Ghidra project window (the main window where the files are listed), right-click the file to debug > _Open With_ > _Debugger_

1. _Debugger_ > _Configure and Launch using ..._ > _gdb_

1. Interact with gdb as usual in the terminal (set breakpoints, etc.) then type `run` to start

   ⓘ For more info, see [gdb](./gdb)

#### Troubleshooting

If the path to the file you're debugging has quotes and you see `No such file or directory`:

1. Change to the directory using `cd`

   - Don't put quotes around the path

1. Load the file using `file`

## Troubleshooting

#### `Failed to exec spawn helper`

If you see a message containing `Failed to exec spawn helper`, e.g.

> Decompiler: Unable to initialize the DecompilerInterface: Cannot run program
> Failed to exec spawn helper

This could be due to the JDK being upgraded while Ghidra is running. This can happen, for example, on Ubuntu which will automatically upgrade certain packages for security. Check the logs to confirm, e.g.

```
$ tail /var/log/apt/history.log

Start-Date: 2025-07-25  09:46:43
Commandline: /usr/bin/unattended-upgrade
Upgrade: openjdk-21-jdk-headless:amd64 (21.0.7+6~us1-0ubuntu1~24.04, 21.0.8+9~us1-0ubuntu1~24.04.1), openjdk-21-jdk:amd64 (21.0.7+6~us1-0ubuntu1~24.04, 21.0.8+9~us1-0ubuntu1~24.04.1), openjdk-21-jre:amd64 (21.0.7+6~us1-0ubuntu1~24.04, 21.0.8+9~us1-0ubuntu1~24.04.1), openjdk-21-jre-headless:amd64 (21.0.7+6~us1-0ubuntu1~24.04, 21.0.8+9~us1-0ubuntu1~24.04.1)
End-Date: 2025-07-25  09:46:46
```
