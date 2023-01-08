---
title: 800a0e7a Provider cannot be found.
authors: me
tags: [asp]
date: 2017-01-08 01:31:20
---

# 800a0e7a Provider cannot be found

ADODB.Connection error '800a0e7a' Provider cannot be found. It may not be properly installed.
공급자를 찾을 수 없습니다. 올바르게 설치가 되지 않았을 수 있습니다.

## 원인

64Bit Windows 에서 32Bit ASP 실행시 발생하는 오류이다.

## 해결

**IIS 관리자 > 응용프로그래밍 풀 > DefaultAppPool 우클릭 > 고급설정** 메뉴에서
**32bit 응용프로그래밍 사용** 옵션을 **TURE**로 변경 후 ASP 재시작
![image from hexo](https://i.imgur.com/9mRCLQ7.jpg)

# 여담

구글링시 재설치, 패치 등을 하라고 나오는데 현혹되지 말자.
