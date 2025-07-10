---
title: "C# String Split"
authors: me
tags:
  - c#
date: 2017-01-10 16:48:41
---

javascript 의 split 을 생각하고 split 을 사용했다간 예상치 못한 오류를 맞게된다.

## 원인

일반 Split 함수는 Char 로만(한 글자로만) 자를 수 있다.

## 해결

```cs
string str = "cat__dog__animal__person";
string[] animals = Regex.Split(str, "__");
```

Regex.Split 을 사용하면 된다.
