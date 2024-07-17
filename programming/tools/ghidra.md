---
title: Ghidra
---

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
