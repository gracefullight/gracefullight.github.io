---
title: FSD @008
date: 2025-09-15T10:02:30.848+10:00
description: Fundamentals of software development @008
authors: me
tags:
  - fsd
---

## OOP Principles

### Encapsulation

- bundles data attributes (fields) with methods that use the data in a single unit called "Object"
- hides sensitive data attributes by declaring the fields `private`.
- fields can be declared `protected` in the parent class, allowing access from the child class.
- exposes the data attributes values only through public getters/setters to allow access or modification of the field values.

### Intheritance

```py
class A:
    pass

class B(A):
    pass

class C(A):
    pass
```

- Superclass defines common method signatures (with/without implementation) and fields.
- Subclasses provide the implementations for (or override) these method signatures
- private attributes cannot be directly accessed from the child classes.
- to refer to superclass properties (fields, methods) or constructor, use the keyword `super()`

### Polymorphism

- means many forms.
- permits an object to have multiple types.
- allows object of different types but with a common parent to be stored in the same collection.
- enables inherited methods from the parent to perform different tasks when called by subclasses.

### Abstraction

- the process of hiding the implementation details and exposing only the necessary behavior to the user.
- abstract class must at least contain one abstract method.
- abstract class ccan have concrete methods.
- abtract methods are only prototypes in the parent class, the actual implementation is provided by the subclasses that inherit the abstract class.
- rules
  - if a class contains at least on abstract methods, it should be declared abstract.
  - if another class inherits an abstract class, it must implement all the abstract methods of that class.

```py
from abc import ABC, abstractmethod

class Person(ABC):
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def show(self):
        pass

    def show_name(self):
        print(f"Name: {self.name}")

class Student(Person):
    def __init__(self, name, id):
        self.id = id
        super().__init__(name)

    def show(self):
        super().show_name()
        print(f"ID: {self.id}")
```

- interfaces are complete abstract classes declared with the `interface` keyword.
- only contain prototype (abstract) methods with empty body code.
- cannot be instantiated nor inherited as they do not have constructors.
- a class can implement multiple interfaces.
- a class implementinig an interface must provide an implementation for all its abstract methods.
- add an access layer to further hide the methods impelmentation.
- act as a middleware inside the program, allowing human, machines, and other software to interact with the program's functionalities without knowing the implementation details.

```py
# interface A is a fully abstract class
# interface A must inherit ABC
# class B(A) must implement all abstract methods of A
# interface A methods have the @abstractmethod decorator with pass as body-code
from abc import ABC, abstractmethod

class Person(ABC):
    @abstractmethod
    def show_info(self):
        pass

class Student(Person):
    def __init__(self, name, id):
        self.name = name
        self.id = id
    
    def show_info(self):
        print(f"Name: {self.name}, ID: {self.id}")
```

## OOP Design Rules

- How to split the code into seperate classes and preserve encapsulation
- How to organizae the code into methods to hide the implementation details and expose the behavior
- How the objects interact at runtime
- How to name the class entities

> 5 Design Rules

- Encapsulation
  - hide fields behind methdos
  - requires fields to be private while allowing methods to be public
  - requires a methods related to a field (such as access, modify, use) be defind in the same class.
- Push code to the right
  - requires the code/methods used by objects of a class be written in the same class.
  - ensures methods are written for reusability and placed in the correct class so they can make use of the class's fields.
  - determines which class is responsible for defining the methods needed to achieve the program's goals.
- Spread plans across classes
  - involves planning the distribution of code across multiple classes from the start.
  - focuses on distributing responsibilities logically among different classes, so that each class has a clear and focused role.
  - by convention, this rule requires using the same method name (for the same goal) across all classes.
- Hide by default
  - hiding implementation details within a class and exposing only the necessary functionality to the outside.
  - helps in achieving encapsulation and abstraction.
  - promotes better design and maintainability.
- Follow naming conventions
  - use nouns to name fiels.
  - use nouns to name functions.
  - use verbs to name procedures.
  - if an entitiy is compsed of two or more words.
    - use camelCase/snake_case for fields and methods.
    - use PascalCase for class names.

## Menu Pattern

- consolidates the action-trieggers of a program into a single method.
- common design choice in applications with user interaction.
- the menu methods is executed in the program's main method.
  - offers users interactive CLI command choices.
- `menu()` requires a read-function in a while loop, allowing the menu() tor repeatedly read inpus from STDIN.

```py
<condition> = read_choice()

loop (<condition>):
    check (<condition>):
        case 1: do task <action_1()>
        case 2: do task <action_2()>
        ...
        case n: do task <action_n()>
        default: <alternative-action>
```

```py
menu(self):
    choice = input("Enter choice: (d/w/b/h/x): ").lower()
    while choice != "x":
        match choice:
            case "d":
                self.deposit()
            case "w":
                self.withdraw()
            case "b":
                self.show_balance()
            case "h":
                self.show_history()
            case "x":
                self.exit()
            case _:
                self.show_invalid_choice_message()

        choice = input("Enter choice: (d/w/b/h/x): ").lower()
```
