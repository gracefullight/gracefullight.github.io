---
title: .NET에서 MySQL 사용자 변수 사용
authors: me
tags: [c#, mysql]
date: 2017-01-10 16:51:23
---

@value, @reg 같은 사용자 변수가 들어간 쿼리에서 오류가 발생한다.

# 해결

Connection을 맺을 때 **Allow User Variables=True** 옵션을 추가해줘야한다.

```cs
string conf = "Server=$Server;Port=$port;Database=$DataBase;Uid=$User;Pwd=$Password;Allow User Variables=True";
```
