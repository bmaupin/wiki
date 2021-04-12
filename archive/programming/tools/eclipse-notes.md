---
title: Eclipse notes
---

#### Sources:

[Java All-In One Desk Reference For Dummies, Second Edition](http://www.amazon.com/gp/product/0470124512)

## Misc

#### Compare files that aren't in an Eclipse project

1. Open the Quick Access search box

   - Linux/Windows: Ctrl+3
   - Mac: ⌘+3

1. Type compare and select _Compare With Other Resource_

1. Select the files to compare > _OK_

#### Three-way compare

Alternatively, use [Meld](../../../programming/tools/meld)

1. Select the first file, then hold down Ctrl and select the other two files

1. Right-click > _Compare With_ > _Each Other_

1. Select the common ancestor (if you're merging the changes from file a to file b into file c, this is file a)
1. If the file you want to merge the changes into (file c) is on the left, click the button on the top-right that says "Copy All Non-Conflicting Changes from Right to Left" (and vice-versa if the file you want to merge the changes into is on the right).
1. Lastly, starting at the top of the page, click the Next Difference button to make sure all of your customizations in file "c" have been preserved, and then click save.

#### Upgrade Eclipse

1. Get the update site for the version you want to upgrade to:

   [https://wiki.eclipse.org/Eclipse_Project_Update_Sites](https://wiki.eclipse.org/Eclipse_Project_Update_Sites)

1. _Help_ > _Install New Software_ > _Work with_ > _Add_ > _Location_ > paste the update site you got from the previous step > _OK_ > _Cancel_

1. _Help_ > _Check for Updates_ > follow the steps to upgrade Eclipse

## Debugging

#### Step into

Executes the highlighted statement, and then suspends the thread

#### Step over

Skips the highlighted statement and executes the next statement, and then suspends the thread

#### Step return/run to return

Executes the highlighted statement and continues executing statements until the end of the current method is reached. Then, the thread is suspended

#### Tips

- Position the mouse cursor over a variable in the code pane when debuggin to get that variable's value

## Refactoring

Lets you change all occurrences of the thing you're refactoring (variable, method)

#### _Refactor_ > _Rename_

#### _Refactor_ > _Extract_

Lets you create a separate method from one or more statements. select the statement(s) then choose extract

#### _Refactor_ > _Extract local variable_

Replaces a repeated expression with a variable
