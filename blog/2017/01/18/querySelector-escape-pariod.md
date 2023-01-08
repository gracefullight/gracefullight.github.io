---
title: id에 .(pariod)이 있는 element querySelector
authors: me
tags: [javascript]
date: 2017-01-18 15:38:37
---

# 원인

document.querySelector를 사용해 id에 .이 포함된 element를 선택시

```html
<div id="id.has.pariod"></div>
<script>
  var $div = document.querySelector('#id.has.pariod');
  console.log($div);
  // => undefined;
</script>
```

undefined를 반환하며 선택이 되지 않는다.
.(pariod)는 class 선택자라 중복이되어 발생하는 오류이다.

# 해결

.에 역슬래시를 2개 붙혀 escape 시킨다.

```javascript
var $div = document.querySelector('#id\\.has\\.pariod');
console.log($div);
// => <div id="id.has.pariod"></div>
```
