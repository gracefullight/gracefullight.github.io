---
title: Fundamentals of software development @007
date: 2025-09-08T10:05:07.256+10:00
description: Fundamentals of software development @007
authors: me
tags:
  - fsd
---

## Collection

> a data sturcucture that groups multiple elemtns togehter logically.

- referenced by the collection name, and its elements are accessed using indexing or look up methods.
- some collections allow dynamic sizing, expanding and shrinking with the data, others have a fixed size.
- can store mixed data types.
  - Java collections are typically type-safe using generics.
  - Python uses dynamic typing.

### Python List

```py
mylist = ["Tom", 30, 112.5]
len(mylist)
mylist[index]
mylist.append(item)
mylist.insert(index, item)
# returns a slice of a list from first to last-1
mylist[first:last]
mylist.index(item)

# replaces items from first to last-1 with a list
mylist[first:last] = [list-values] 
# adds list 2 at the end of list 1
mylist = list1 + list2
# adds list 2 at the end of list 1
list1.extend(list2)

mylist.remove(item)
mylist.pop(index)
mylist.pop()
del mylist[index]
del mylist
mylist.clear()

# Sorts the list alphanumerically, ascending
mylist.sort()
mylist.sort(reverse =True)
mylist.reverse()
mylist.count()
```

### Python Set

- unordered, not indexed.
- mutable, unique.

```py
myset = { 'hello', 5, True, 3.5 }

for x in myset:
  print(x)

myset.add(item)
# Merges myset iwth the otherset, rtaining unique values
myset.update(otherset)
# Adds other set items to a set (only unique items are retained)
mynewset = myset.union(otherset)
# Retain only the items that exists into set1 and set2
myset = set1.intersection(set2)

# report error if item not found
myset.remove(item)
myset.discard(item)

myset.pop()
myset.clear()
del myset
```

### Python Tuple

- a cllection of items of any type
- ordered, indexed
- **unchangable**, once a tuple is created the elemets are fixed

```py
mytuple = ("Tom", 30, 112.5)
len(mytuple)
mytuple[index]
mytuple[first:last]
mytuple = tuple + tuple2
```

### Python Dictionary

- a collection of items represented as key-value pairs
- unordered, indexed by uniaue keys
- itmes are mutable
- allow duplicate values but not duplicate keys

```py
mydata = {
  "name": "Tom",
  "age": 30,
  "role": "admin"
}

mydata.keys()
len(mydata)
mydata[key]
mydata[key] = new-value
del mydata[key]
del mydata

# Deletes an entry associated with key
val = mydata.pop(key)
# Updates/Inserts { k: v } entry into the dictionary
mydata.update({ k: v })
```
