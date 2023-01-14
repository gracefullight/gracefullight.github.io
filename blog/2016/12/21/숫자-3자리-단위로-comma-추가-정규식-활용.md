---
title: 숫자 3자리 단위로 comma 추가 - 정규식 활용
authors: me
tags: [javascript]
date: 2016-12-21 23:48:07
---

# 소스

```js
// function
function comma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// prototype
Number.prototype.format = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
```

# 설명

첫번째는 함수 호출방식이고, 두번째는 NumberValue.format(); 으로 호출하면 된다.
