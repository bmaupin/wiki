---
title: GDB (GNU Debugger)
---

## Getting started

#### 👉 Gotchas

- If you have a multi-line command to run in gdb, you'll need to paste the first line separately and press Enter before pasting the rest

#### Basic usage

1. Start a binary with gdb

   ```
   gdb /path/to/binary
   ```

1. Set a breakpoint

   ```
   break function_name
   ```

   Or to break on a memory address:

   ```
   break *0x09319b91
   ```

1. Run the binary

   ```
   run
   ```

#### Step through the code

⚠️ `next` and `step` may perform erratically when debugging a stripped binary; use `nexti` and `stepi` instead

- Use `next`/`n` to run the next line of code and stop at the next line in the current function
- Use `nexti`/`ni` to run the current instruction and stop at the next instruction in the current function
- Use `step`/`s` to run the next line of code, entering into any functions
- Use `stepi`/`si` to run the current instruction, entering into any functions
- Use `finish`/`fin` to run through the end of the current function

💡 Pressing Enter runs the last command again

#### Troubleshoot a crash

1. Start a binary with gdb (see above)

1. Wait for the crash

1. Do a backtrace

   ```
   bt
   ```

#### Restart a running program from the beginning

Just type `run` again

## Variables

#### Built-in variables

- Stack: `$sp` or `$esp`
- Program counter: `$pc`
  - This points to the memory address of the current instruction

## Registers

#### Show all the registers

```
info registers
```

## Functions

#### Show the parameters of a function

If you don't have debugging symbols

1. Open the binary with Ghidra

1. Go to the top of the function

1. In the _Listing_ look at the parameters, e.g.

   ```
   wchar_t *    Stack[0x8]:4    param_2
   ```

   - Parameter is 4 bytes long, on the stack at position 0x8

1. In Ghidra, copy the memory address

1. In gdb, set a breakpoint for the address

1. Examine the stack, e.g.

   ```
   x/wx $sp+0x8
   ```

1. Print the value at that address

   In our example above, to print a `wchar_t`, use this function: https://stackoverflow.com/a/1406427/399105

## Breakpoints

ⓘ If you use `start` instead of `run`, gdb may automatically break if it finds a `main` function, even if no break point was created

#### Create a breakpoint

```
break function_name
```

Or to break on a memory address:

```
break *0x09319b91
```

#### List breakpoints

```
info break
```

#### Delete breakpoint

Use the breakpoint number (see _List breakpoints_) to delete a specific breakpoint, e.g.

```
delete 2
```

#### Delete all breakpoints

```
delete
```

## Printing

#### Integer

Print the value of an unsigned integer:

```
p (unsigned int)0x00003266
```

Or to print a memory address:

```
print *(int*)($sp+0xc)
```

#### Byte

Print a byte

```
x/xw $sp+0x10
```

Print 5 bytes

```
x/5xw $sp
```

#### String

Print a string:

```
x/s 0xde7f322c
```
