---
title: C++ data structures
---

#### Common operations among all containers:

- begin()
- end()
  - Return iterators

## Sequence containers

#### Common sequence container operations:

- assign()
- clear()
- insert()
- erase()
- pop_back()
  - Removes an item from the back of the container
- push_back()
  - Appends an item to the back of the container
- swap()
- rbegin()
- rend()
  - Reverse iterators

#### Vector

- Sequence container optimized for adding and removing elements from the end
- Array-style indexing
- Expands dynamically
- The vector is most efficient if:
  - You **reserve()** the correct amount of storage at the beginning so the vector never has to reallocate.
  - You only add and remove elements from the back end.
- The best choice only if you have a pretty good idea of how many objects you need.
- Indexing and iteration are fast
- Inserting an object anywhere at the end is slow
- Increasing the size of the vector frequently can be slow
- Special operations:
  - vector.reserve()
    - Allocate storage

#### Deque

- Sequence container optimized for adding and removing elements from either end
- Far more efficient than vector if you are adding an unknown quantity of objects
- Special operations:
  - deque.pop_front()
  - deque.push_front()

#### List

- Designed for rapid insertion and removal of elements in the middle of the sequence (whereas for vector and deque this is a much more costly operation).
- So slow when randomly accessing elements that it does not have an [] operator
- Better not to use a list if you think you might be traversing it a lot, looking for objects
- Special operations (in addition to the operations deque has):
  - list.reverse()
  - list.sort()
    - Generic reverse() and sort() are appropriate for deques, vectors, arrays, but not lists
  - list.splice(iterator, list2)
    - Removes all the elements from list2
  - list.remove(location)
  - list.merge(list2)
    - Both lists need to be sorted first
  - list.unique()
    - Removes all duplicates; the list needs to be sorted first

#### Stack

- Implemented using deque by default
- Iteration through a stack is not possible
- May be better to just use a vector, unless you specifically want to restrict to stack-like operations
- Special operations:
  - stack.push()
    - Push a new item onto the stack
  - stack.top()
    - Fetches the top element
  - stack.pop()
    - Discards the top element, but doesn't return it

#### Queue

- FIFO container: you can only enter elements at one end, and pull them off the other end
- In most cases you can just use a deque unless you specifically want to restrict to queue-like behaviour
- Implemented using deque by default

#### Priority_queue

- Like a queue, but elements are sorted by a priority defined by a provided function
- Implemented using vector by default

## Association containers

#### Common association container operations:

- insert()
  - For sets and maps
- count()
  - Count the occurrence of a particular key
- find()
  - Returns an iterator for the first occurrence of a given key

#### Set

- A sorted list with no duplicates. Best and fastest when that's exactly what you want.

#### Multiset

#### Map

- An associative key-value array

#### Multimap
