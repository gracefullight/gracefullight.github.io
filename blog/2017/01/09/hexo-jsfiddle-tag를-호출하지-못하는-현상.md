---
title: hexo jsfiddle tag를 호출하지 못하는 현상
authors: me
tags:
  - hexo
  - javascript
date: 2017-01-09 23:04:03
---

[공식 문서](https://hexo.io/ko/docs/tag-plugins.html#jsFiddle)에 따르면 jsFiddle tag의 사용법은 이렇다.

```text
{% jsfiddle shorttag [tabs] [skin] [width] [height] %}
```

대괄호로 둘러 쌓인 부분은 생략이 가능하다.

shorttag는 URL 창에서 바로 보여질 수도 있지만 그렇지 않을경우
**Save** 또는 **Update** 버튼을 누르면 나오는 **Embed** 메뉴에서 확인할 수 있다.
![image from hexo](https://i.imgur.com/FzTXSX3.png)

## 문제점

https인 github.io에서 http로 jsfiddle을 호출해서 차단된다.

## 해결

**node_module\hexo\lib\plugins\tag\jsfiddle.js** 파일의 jsfiddle 치환 함수를 변경한다.

```javascript
function jsfiddleTag(args, content) {
  const id = args[0];
  const tabs =
    args[1] && args[1] !== "default" ? args[1] : "js,resources,html,css,result";
  const skin = args[2] && args[2] !== "default" ? args[2] : "light";
  const width = args[3] && args[3] !== "default" ? args[3] : "100%";
  const height = args[4] && args[4] !== "default" ? args[4] : "300";

  // http://jsfiddle.net > //jsfiddle.net
  return (
    '<iframe scrolling="no" width="' +
    width +
    '" height="' +
    height +
    '" src="//jsfiddle.net/' +
    id +
    "/embedded/" +
    tabs +
    "/" +
    skin +
    '" frameborder="0" allowfullscreen></iframe>'
  );
}
```
