---
title: Windows10에서 Telnet 사용
authors: me
tags: [telnet, windows]
date: 2017-01-05 17:18:35
---

특정 포트가 열려있는지 확인하기 위해서 텔넷을 사용해야할 때가 있다.

# 설치

제어판 > 프로그램 추가/제거에 들어간다.
![image from hexo](https://i.imgur.com/y2gGXyr.png)

**Windows 기능 켜기/끄기** 버튼 클릭 후 아래로 끝까지 내리면 **텔넷 클라이언트**가 보이는데, 체크한 후 **확인** 버튼을 눌러 설치한다.

# 사용법

cmd 창을 연 뒤

```bash
# telnet 아이피(호스트) 포트
$ telnet 111.222.333.444 3306
```
