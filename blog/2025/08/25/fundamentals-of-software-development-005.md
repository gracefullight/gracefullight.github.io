---
title: FSD @005
date: 2025-08-25T20:15:17.132+10:00
description: Fundamentals of software development @005
authors: me
tags:
  - fsd
---

## Method

- a block of code grouped together and has a name
- can be invoked by its name to perform certain action
- can have parameters that represent the values needed for the method to run
- can have local variables usable only within its own code block.

### Function vs Procedure

- **Procedure: no return value**, **perform an action**
  - Example: `move(), run(), deposit(), eat()`
- **Function: have a return value**, **do not perform any action**
  - Example: `total(), sum(), area()`
- a function and behaves as a combined function procedure, but not recommended.

### Method Overloading

- Java allows methods in the same class to have the same name but different parameters.
- **method signature**: The method name together with the number and types of a method's parameter.

### Parameter vs Arguments

- Parameter: placeholder variables used at method definition, indicate the type and order of argument
- Arguments: data values passed to the method when the method is invoked or called.

### Patterns

#### The read pattern

```py
def <name>():
  <prompt>;
  return <type>
```

#### The update read-loop pattern

```py
<read function>
while (<value> != <end value>):
   <use the value>
   <read function>
```

#### The array-loop pattern

```py
for <value> in <range>:
  >use the item from array>
```

#### The any-pattern

```py
for <item> in <collection>:
  if (<test>):
    return True
return False
```

#### The every-pattern

```py
for <item> in <collection>:
  if (not(<test>)):
    return False
return True
```

#### The none-pattern

```py
for <item> in <collection>:
  if (<test>):
    return False
return True
```

#### Boolean Functions

```py
def isEven(number):
  if number % 2 == 0:
    return True
  else:
    return False

def isEven(number):
  return (number % 2 == 0)
```

### Recursion

- a technique where a method calls itself repeatedly.
- to provide a termination logic for a recursive method to avoid infinite execution.

```py
def factorial(n):
  return 1 if (n == 1 or n == 0) else n * factorial(n - 1)

def factorial(n):
  F = lambda n: n * F(n-1) if n > 1 else 1
  return F(n)
```

## Process in Programming

- **process** is the method used to solve a problem
- **Break it down-Build it up** is a technique structured approach to handle complex problems.
