---
title: Pythonic - 기본기
authors: me
tags: [python]
date: 2019-12-15 16:52:01

---

# The Basics

## Types

- 아무 것도 없는 타입은 `None`
- 주석
  - `#`
  - `""" """`
- 포매팅
  - `f’test {변수}'`
  - `"test {}".format(변수)`
- `list`, `dict`, `set` 등은 **immutable** 하지 않아 `copy` 메소드를 사용해 복사 필요
- 스왑
  - a, b = b, a 로 한 줄로 가능
- set
  - `{}` 으로 set 지정가능
  - 집합연산 가능
  - `set([])` 로 배열을 set으로 변환 가능
- enum
  - 튜플로 지정하면 됨
  - 튜플은 **freeze** 되어 있다.
  - `('a', 'b', 'c')`
- list
  - merge는 더하기로 가능 `[] + []`

## Operaters

- if
  - 값 체킹에는 `0.0` `''` `[]` `()` `{}` `set()` 등 모든 빈 값이 `false` 로 떨어진다.
    - 따라서 ~~len(foo) > 0~~ 보다 권장
  - ~~if foo != True~~ 보다 `if not foo` 를 권장
  - dict 키 검증 시에는 `if 'key' in d:` 를 권장 ~~if 'key' in d.keys():~~ 필요없다.
  - `y=None` `x = 1 if y else 2` 면 x=2 라는 문법이 된다.
- is 문은 값이 None 인지 확인할 때 권장
  - ~~if foo == None~~ 보다 `if foo is None` 을 권장
  - `if foo is not None`
- while
  - `while else` 구문 가능
    else 는 while 에 break 가 없을 경우 while 끝나고 실행
- for
  - `for in`
  - `for in else` 구문 가능
    else는 for 에 break 가 없을 경우 for 끝나고 실행
  - `for _ in range(10)` 처럼 underscore 는 index 를 안쓸때 권장
  - `for i, item in enumerate(['a', 'b', 'c'])` 처럼 index 넣어줄 수 있음
  - `for day, fruit in zip(days, fruit)` 처럼 패킹(zip) 함수 기본 제공
  - `for k, v in d.items()` 로 dict 타입 반복 가능
- func
  - `def func():` 로 함수선언
  - `def add(a: int, b: int) -> int:` 처럼 파라미터 및 리턴 타입 정의 가능
    - compile error 발생 안 함
    - 보여주기 위한 타입 기능
  - 매개변수를 위치 인수로 넣을 수 있음
    - `def menu(entree, drink)`라면 `menu(drink='a', entree='b')` 로 호출 가능
  - list 매개변수는 기본값으로 넣으면 안 됨 `def foo(list=[])` 면 리스트가 **한 번만** 생성됨 (함수 내부 초기화 필요)
  - `def func(*args)` 로 동적매개변수 처리 가능 **튜플로 처리됨**
  - `def func(**kargs)` 로 넣으면 dict로 전달가능 `func(key1='val', key2='val')`
  - 두 구문을 같이쓸 수 있지만 `*args`는 `**kargs` 보다 **먼저 와야한다.**
  - 함수 내부 `""" """` doc 주석을 넣으면 `help(func.__doc__), help(func)` 로 도움말 호출 가능
  - 클로져로 wrapper 함수를 만들면 **데코레이터**로 바로 적용 가능
  - `func(lists, lambda item: item.value())` 람다 처리가능 (value: returnValue)
- **비추천** `dic = {x: y for x, y in (zip(w, f)}` 처럼 한 번에 for문 dictionary 선언 가능
- genarator
  - def + yield
  - `gen = (i for i in range(10) if i % 2 == 0)` 처럼 한 번에 선언하면 제네레이터가 된다.
  - `tuple(gen)` 하면 튜플로 처리된다.
  - for 보다 빠를 수 있다.
- `globals()`, `locals()` 로 전역, 로컬변수 확인가능
- excpetion
  - `try: except IndexError as ex: finally:`
  - `try: except: else: finally:` 가 있다면 try => else => finally 로 실행
  - `raise IndexError('test error')` 처럼 raise 로 에러 발생 가능
  - 기본에러는 exception hierarchy 참조

## Package

- `__init__.py` 가 있어야한다.
- ~~import package.utils~~ 또는 `from package import utils` 해서 `utils.func` 롤 호출
- `from package import utils as NamedUtil` 처럼 as 문으로 네임스페이스 변경 가능
- **비추천** `from package.folder import *` 로 folder 레벨의 모든 python import 가 가능한데
  `folder.__init__.py` 에 `__all__ = ['py', 'py2']` 처럼 선언해줘야한다.
- setup.py 를 만들어 패키지를 배포시킬 수 있다.
  - PyCharm: Tools > Create setup.py > run setup.py > sdist 로 출력
  - Cli: `python setup.py sdist`
- PyPI 에 서드파티 라이브러리를 등록하면 `pip install termcolor` 처럼 설치 가능
- import 라이브러리 순서는 위에서부터 **표준, pip, 로컬패키지, 로컬파일**
- `if __name__ == '__main__': main()` 은 **entrypoint 스크립트**에서 사용되는 패턴이다.

## Class

- 생성자 `__init__(self):`, `Instance()` 로 new 없이 생성
- 소멸자 `__del__(self):`, `del instance` 로 삭제
- class method 의 첫 인자로는 self를 받아야 this처럼 사용이 가능하다. 두 번째 부터 파라미터를 받을 수 있다.

### protected

- proteced 변수는 `_var` 처럼 underscore 하나를 넣는다.
- `@property`, `@property_name.setter` 데코레이터를 통해 **getter/setter** 처리가 가능하다.

```python
class Instance(object):
    @property
    def foo(self):
        return self._foo

    @foo.setter
    def foo(self, bar):
        self._foo = bar

intance = Instance()
instance.foo = bar
```

### private

- private 변수는 `self.__foo` 로 underscore 두 개를 넣는다.
- 인스턴스 밖에서 접근이 불가능하다.

### class variable

- 클래스 변수는 모든 오브젝트 초기화시에 공유되므로 list, dict.. 등을 사용하지 않아야한다.
- 상수처럼 쓰는게 좋을 듯

### class method

- class 메소드는 `@classmethod` 데코레이터로 가능하다.

```python
class Instance(object):
    @classmethod
    def foo(cls):
        # cls 로 클래스 접근가능
        return cls.bar

Instance.foo()
```

### static method

- static 메소드는 `@staticmethod` 데코레이터로 정의할 수 있으나 잘 사용되지는 않는다.

### 상속

```python
class Parent(object):
    def __init__(self):
        pass

class Child(Parent):
    def __init__(self):
        super().__init__
```

- 다중상속 하지말자
- `class Twins(Parent, Parent2)` 로 되지만 메소드명이 같을 경우 왼쪽에 선언된 것만 실행된다.

### 추상

```python
import abc

class Parent(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def foo(self):
        pass

class Child(Parent):
    def foo(self):
        print('foo')
```

### 특수 메소드

- 많지만 `__str__` 이 제일 많이 쓴다. `toString()` 과 같다.
- `__len__` (len(instance))
- `__eq__` (instance == instance2)
- `__add__` (instance + instance2)
- 등등..
- 클래스 기본기능을 해치는 개인적인 느낌

# 여담

- MSA의 시대에 살고 있는 어플리케이션 레이어의 개발자는 어쩔 수 없이 폴리글랏 프로그래머가 되기 마련이다.
- 하나의 언어에 능통하면 다른 언어로 넘어가는 데에는 익숙함의 문제지만,
  그 언어를 제대로 사용하기 위해 가장 중요한 건 스타일 가이드, 린팅과 주기적인 Docs, Release Notes 확인이라고 생각한다.
