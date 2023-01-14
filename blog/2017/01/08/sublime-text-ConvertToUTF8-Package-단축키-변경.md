---
title: sublime text ConvertToUTF8 Package 단축키 변경
authors: me
tags: [sublimetext]
date: 2017-01-08 17:31:18
---

실수로라도 Ctrl+Shift+C 키를 누르면 소스가 GBK 중국어 인코딩으로 바뀌어 저장된다.
이 단축키의 기본 설정을 UTF-8로 변경해보자.

# 해결

## 패키지 경로 이동

C:\Users\사용자 폴더\AppData\Roaming\Sublime Text3\Packages\ConvertToUTF8
![image from hexo](https://i.imgur.com/2OFwgU4.png)

## 기본 설정파일 변경

**Default (Windows).sublime-keymap** 파일을 열고 아래와 같이 수정한다.

```javascript
[
  {
    keys: ["ctrl+shift+c"],
    command: "convert_to_uft8",
    args: { encoding: "UTF-8", stamp: 0 },
  },
];
```

또는 파일 내용을 날려버려도 된다.
