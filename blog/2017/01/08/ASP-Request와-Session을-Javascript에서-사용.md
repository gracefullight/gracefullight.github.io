---
title: ASP - Request와 Session을 Javascript에서 사용
authors: me
tags: [asp, javascript]
date: 2017-01-08 01:40:10
---

## 선행

classic asp 는 기본 json 모듈이 없기 때문에 [여기](https://code.google.com/archive/p/aspjson/downloads)에서 모듈을 다운로드 해야한다.

## 소스

```asp
<!--#include virtual = "/JSON_2.0.4.asp"-->
<%
'request TO JSON
Dim req:Set req = jsObject()

FOR EACH i IN Request.QueryString
    IF Request.QueryString(i).count > 1 THEN
        i = Replace(i,"&", "")
        Set req(i) = jsArray()
        FOR EACH j IN Request.QueryString(i)
            req(i)(null) = j
        NEXT
    ELSE
        req(i) = Request.QueryString(i)
    END IF
NEXT

FOR EACH x IN Request.Form
    IF Request.Form(x).count > 1 THEN
        Set req(x) = jsArray()
        FOR EACH y IN Request.Form(x)
            req(x)(null) = y
        NEXT
    ELSE
        req(x) = Request.Form(y)
    END IF
NEXT
'session TO JSON
Dim sess:Set sess = jsObject()
FOR EACH k IN Session.Contents
    sess(k) = Session.Contents(k)
NEXT
%>
<!DOCTYPE html>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript">
    var request = JSON.parse('<%=req.flush%>');
    var session = JSON.parse('<%=sess.flush%>');
    Object.freeze(request);
    Object.freeze(session);
</script>
```

## 설명

1 줄에서 JSON 모듈을 include 시켜주고 6~27 줄에서 Get 방식과 Post 방식의 Request 를 모두 파싱한다. 30~33 줄에서 Session 을 파싱한다.
40 줄에서 request 와 session 을 javascript 변수로 받고, 클라이언트가 변조하지 못하게 Object.freeze 로 얼려버린다.
