---
title: FSD +009
date: 2025-10-13T10:02:09.860+11:00
description: Fundamentals of software development +009
authors: me
tags:
  - fsd
---

## Exception

- Exeptions are throwable objects.
- **Checked Exceptions** are checked by the compiler and should be handled (thrown or caught).
- **Unchecked or runtime Exceptions** are not flagged by the compiler. Their occurrence during execution interrupts the program.
- Exceptions can be thrown by developers. Throwing an exception delegates handling the exception to a different class or different level of the program.
- Thrown exception is left not handled, it will cause runtime error.

### Error

- Java Errors usually indicate problems with the JVM or system resources.
  - it is not meant to be caught or handled by applications.
  - the base class is Error.
- Python is no separate Error class hierarchy. Errors are represented as exceptions.
  - ValueError, TypeError, MemoryError, SystemError, etc. are subclasses of Exception.

### Java vs Pythone Exceiptions

| Feature | Java | Python |
| --- | --- | --- |
| Syntax | try-catch-finally | try-except-else-finally |
| try | attempts to execute a block of code | attempts to execute a block of code |
| catch/except | execute alternative code if exception arises | execute alternative code if exception arises |
| finally (optional) | executes code regardless of try/catch outcome | executes code regardless of try/except outcome |
| else (optional) | X | executes code if no exception arises |

```java
public class ExceptionExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        try {
            System.out.print("Enter first number: ");
            int a = scanner.nextInt();
            System.out.print("Enter second number: ");
            int b = scanner.nextInt();
            int result = a / b; // This will raise ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Caught an exception: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Caught a number format exception: " + e.getMessage());
        } finally {
            System.out.println("This block always executes.");
        }
    }
}
```

```python
def div(a, b):
    return a / b

a = input("Enter first number: ")
b = input("Enter second number: ")

try:
    result = div(int(a), int(b))  # This will raise ZeroDivisionError
    print("Result:", result)
except ZeroDivisionError as e:
    print("Caught an exception:", e)
except ValueError as e:
    print("Caught a value error:", e)
else:
    print("No exception occurred.")
finally:
    print("This block always executes.")
```

### Throwing Exceptions

```python
class IncorrectAgeError(Exception):
    def __init__(self, age):
        self.age = age
        self.message = f"Age {age} is not valid. Age must be between 0 and 120."
        super().__init__(self.message)

number = int(input("Enter your age: "))

try:
    if number < 0 or number > 120:
        raise IncorrectAgeError(number)
    print(f"Your age is {number}.")
except IncorrectAgeError as e:
    print(e)
```

## File Handlers

- "r": Opens a file for reading, requires the file to exist
- "w": Opens a file for writing. If the file exists, it is truncated to zero length. If the file does not exist, a new text file is created.
- "a": Opens file for open for writing. The file is created if it does not exist.
- "+": Opens a file in updating mode (reading and writing). It can be used with reading (r+) and writing (w+) modes.
- "t": Opens a file in text mode (default mode).
- "b": Opens a file in binary mode. It can be used with reading (rb) and writing (wb) modes.

### File Handler Methods

```python
os.path.exists("file.txt")  # Check if file exists
os.remove("file.txt")  # Delete a file
os.remove("dir")  # Delete an empty directory
os.chdir("path/dir")  # Change current working directory
os.getcwd()  # Get current working directory
os.mkdir("path/dir")  # Create a new directory

file_handler = open("file.txt", "r")  # Open a file in read mode
file_handler.read()  # Read the entire file content
file_handler.readline()  # Read a single line from the file
file_handler.close()  # Close the file

file_handler = open("file.txt", "w")  # Open a file in write mode
file_handler.write("Hello, World!")  # Write to the file
file_handler.write("\n")  # Write a newline character
file_handler.close()  # Close the file


import csv
with open("file.txt", "r") as file_handler:  # Using 'with' to handle file
    csv_object = csv.reader(file_handler)
    for row in csv_object:
        print(row)
    file_handler.close()

with open("file.txt", "a") as file_handler:  # Append mode
    csv_writer = csv.writer(file_handler)
    row = ["1", "gracefullight", "100"]
    csv_writer.writerow(row)
    file_handler.close()

import json
with open("data.json", "r") as file_handler:
    data = json.load(file_handler)  # Load JSON data from file
    print(data)
    file_handler.close()

with open("data.json", "w") as file_handler:
    json.dump(data, file_handler)  # Write JSON data to file
    file_handler.close()
```

- InputStream: reads byte-based input from various sources like files, memory, or network connections.
- OutputStream: writes byte-based output to various network connections.

## Unit Testing

- tests and verifies the smallest unis of an application such as functions, procedures, modules, or objects.
- the conducted during the development phase of the SDLC.
- Developers aim to identify defects and code bugs, which can save time and reduce costs in later testing stages.
- software testing encompasses the fourmain testing phases, and unit testing is at the foundational level of the process.
  - Unit Testing
  - Integration Testing
  - System Testing
  - Acceptance Testing

### Python unit testing

- test cases are defined using classes that inherit from `unittest.TestCase`
- assertions are used to validate results `self.assertEquals()`
- the `unittest.TextTestRunner` class can be used to run tests

```python
import unittest

class TestMathOperations(unittest.TestCase):

    def test_addition(self):
        self.assertEqual(2 + 3, 5)

    def test_subtraction(self):
        self.assertEqual(5 - 2, 3)

    def test_multiplication(self):
        self.assertEqual(4 * 3, 12)

    def test_division(self):
        self.assertEqual(10 / 2, 5)
```
