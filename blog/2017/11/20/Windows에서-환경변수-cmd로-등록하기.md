---
title: Windows에서 환경변수 cmd로 등록하기
authors: me
tags: [windows]
date: 2017-11-20 18:05:30
---

매번 `내 컴퓨터 > 설정 > 고급 설정 > 환경 변수`에 들어가는 걸 그만하고 싶은 사람이라면 다음과 같이 하면 된다.

# 추가

```cmd
$ setx path "%path%;새로운 경로"

$ refreshenv
```

# 설명

환경변수를 등록하고 그 변수를 반영한다.
