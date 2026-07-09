---
title: Data structures
---

See:

- [Big-O Algorithm Complexity Cheat Sheet](http://bigocheatsheet.com/)

## [Data structures](http://en.wikipedia.org/wiki/Data_structure)

#### Common data structures

- [Array](http://en.wikipedia.org/wiki/Array_data_structure)

  Also known as: fixed array, flat array

  - "A data structure consisting of a collection of elements (values or variables), each identified by at least one array index or key."
  - [Search time complexity](http://en.wikipedia.org/wiki/Big_O_notation): if sorted: O(log n) (logarithmic), if unsorted: O(n) (linear)

- [Dynamic array](http://en.wikipedia.org/wiki/Dynamic_array)

  Also known as: array list, vector growable array, resizable array, dynamic table, mutable array

  - C++: vector, Java: ArrayList, Python: list
  - "A random access, variable-size list data structure that allows elements to be added or removed."
  - Backed by a fixed-size array, resizes itself as necessary
  - Search time complexity: if sorted, O(n) (linear), if unsorted, O(log n) (logarithmic)

- [Linked list](http://en.wikipedia.org/wiki/Linked_list)
  - Lists made of nodes that contain a data item and a pointer/reference to the next (and possibly previous) node.
  - Advantage: items can be easily inserted or removed without reorganizing entire list.
  - Search time complexity: O(n) (linear)
- [Hash table](http://en.wikipedia.org/wiki/Hash_table)

  Also known as: hash map

  - "A data structure used to implement an associative array, a structure that can map keys to values"; keys must be unique
  - Search time complexity: O(1) (constant)

- [Linked tree](<http://en.wikipedia.org/wiki/Tree_(data_structure)#Data_type_vs._data_structure>)
  - Consists of nodes with optional data elements and one or more child pointers/references, and possibly parent pointers, representing a heirarchical or ordered set of data elements.
  - Search time complexity: O(log n) (logarithmic)
- [Trie](http://en.wikipedia.org/wiki/Trie)

  Also known as: digital tree

  - "An ordered tree data structure that is used to store a dynamic set or associative array where the keys are usually strings. Unlike a binary search tree, no node in the tree stores the key associated with that node; instead, its position in the tree defines the key with which it is associated."

## [Abstract data types (ADTs)](http://en.wikipedia.org/wiki/Abstract_data_type)

**Definition:** conceptual data types or classes of data types that have similar behaviours.

(Classes of data types that have similar behaviour and that separate the logical properties from the implementation details. )

- ADTs have no standardized definitions and may be implemented differently in different programming languages
- ADTs are normally made up of concrete data structures

#### Common ADTs:

- [Container](<http://en.wikipedia.org/wiki/Container_(abstract_data_type)>)
  - "An abstract data type (ADT) whose instances are collections of other objects"
- [Deque](http://en.wikipedia.org/wiki/Double-ended_queue)
  - "A double-ended queue (abbreviated to deque) is an abstract data type that implements a queue for which elements can only be added to or removed from the front (head) or back (tail)"
- [Graph](<http://en.wikipedia.org/wiki/Graph_(abstract_data_type)>)
  - "Represents arbitrary relationships between members of any data set, represented as networks of nodes and edges"
- [List](<http://en.wikipedia.org/wiki/List_(abstract_data_type)>)

  Also known as: sequence

  - "An abstract data type that implements a finite ordered collection of values, where the same value may occur more than once."
  - Common operations: insert, delete, read from a specific location

- [Map](http://en.wikipedia.org/wiki/Associative_array)

  Also known as: associative array, symbol table, dictionary

  - "An abstract data type composed of a collection of (key, value) pairs, such that each possible key appears at most once in the collection."
  - Most frequently implemented using a hash table

- [Multimap](http://en.wikipedia.org/wiki/Multimap)

  Also known as: multihash

  - A map that allows duplicate keys

- [Multiset](<http://en.wikipedia.org/wiki/Set_(abstract_data_type)#Multiset>)
  Also known as: bag
  - A set that allows duplicate values
- [Priority queue](http://en.wikipedia.org/wiki/Priority_queue)
  - "An abstract data type which is like a regular queue or stack data structure, but where additionally each element has a "priority" associated with it. In a priority queue, an element with high priority is served before an element with low priority. If two elements have the same priority, they are served according to their order in the queue."
  - Typically implemented using a heap.
- [Queue](<http://en.wikipedia.org/wiki/Queue_(abstract_data_type)>)
  - "A particular kind of abstract data type or collection in which the entities in the collection are kept in order and the principal (or only) operations on the collection are the addition of entities to the rear terminal position and removal of entities from the front terminal position" (FIFO: First In, First Out)
  - Commonly implemented using a doubly-linked list
- [Set](<http://en.wikipedia.org/wiki/Set_(abstract_data_type)>)
  - "An abstract data structure that can store specific values, without any particular order, and no repeated values. Values themselves are not retrieved from sets, rather one tests a value for membership to obtain a boolean 'in' or 'not in.'"
- [Stack](<http://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)
  - "An abstract data type in which elements are added and removed from only one end"; a "last in, first out" (LIFO) structure
  - Common operations: push, pop
- [Tree](<http://en.wikipedia.org/wiki/Tree_(data_structure)#Data_type_vs._data_structure>)
  - "A widely used abstract data type that simulates a hierarchical tree structure, with a root value and subtrees of children, represented as a set of linked nodes."
