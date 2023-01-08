---
title: Clipboard JS 사용법 - 브라우저 텍스트 복사
authors: me
tags: [javascript, clipboard]
date: 2016-12-21 17:57:06
---

# Clipboard JS

텍스트 복사는 zeroclipboard 를 사용하라고 많이 나오는데, flash 를 이용해 복사하는 방법이다.
더 쉽고 간편하게 [ClipboardJS](https://clipboardjs.com) 라이브러리를 사용해보자

## 설치

```bash
# npm
$ npm install clipboard --save

$ yarn add clipboard
```

## 소스

```html
<script src="/bower_components/clipboard/dist/clipboard.min.js"></script>

<!-- 1. URL copy -->
<a href="#" id="btnCopyUrl" data-clipboard-action="copy">url 복사</a>
<script>
  $(function ({
      // 복사 버튼을 만들시 data-clipboard-text 안에 복사할 문구를 넣어준다
      $('#btnCopyUrl').attr('data-clipboard-text', document.location.href);
      // callback 설정
      var clipboard = new Clipboard('#btnCopyUrl');
      clipboard.on('success', function(e) {
          alert('복사되었습니다');
      });
      clipboard.on('error', function(e) {
          console.log(e);
      });
  });
</script>

<!-- 2. Text copy -->
<textarea id="textBody" cols="30" rows="5"></textarea>
<button
  type="button"
  id="btnCopyText"
  data-clipboard-action="copy"
  data-clipboard-target="#textBody"
>
  텍스트복사
</button>
```

# 설명

html5 attribute 를 사용해 쉽게 제어가 가능하다.

신규 브라우저들은 다 지원하지만 (window.clipboard 객체가 있는 브라우저)
iPhone 에선 clipboard 액세스가 모두 막혀있어서 복사를 할 수 없다.
