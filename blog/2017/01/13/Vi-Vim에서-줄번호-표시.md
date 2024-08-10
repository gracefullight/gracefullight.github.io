---
title: "Vi, Vim에서 줄번호 표시"
authors: me
tags: [bash, vim]
date: 2017-01-13 11:40:21
---

## Vi 줄번호

Vi Editor의 줄번호를 표시해보자

파일을 연 다음 아래 명령어를 입력한다.

### 표시하기

```bash
:set number
```

![image from hexo](https://i.imgur.com/B8J9zVJ.png)

### 추가적으로 라인이동에 필요한 단축키

- **G** (shift+g) 문서 맨 끝으로 이동
- **gg** (1G) 문서 처음으로 이동
- **`{{number}}` + G** number 번째의 라인으로 이동 (예시 : 300G)
