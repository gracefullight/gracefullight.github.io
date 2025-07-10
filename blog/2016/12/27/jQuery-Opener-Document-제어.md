---
title: jQuery Opener Document 제어
authors: me
tags:
  - javascript
  - jquery
date: 2016-12-27 23:58:18
---

## pure javascript

부모창을 제어하는 구문은 아래처럼 사용한다.

```javascript
document.parent.getElementById("id");
window.opener.document.getElementById("id");
```

## jQuery

jQuery를 사용하고 있다면 생각보다 쉽게 요소 선택을 할 수 있다.

```javascript
const $id = $("#id", opener.document); // parent.document도 가능
$id.val("value");
```

2열처럼 바로 값 변경도 가능하다.
