---
title: "/etc/passwd 파일 구조"
authors: me
tags: [linux]
date: 2017-11-15 01:04:12
---

# 구조

> 로그인명:비빌번호:사용자 ID:그룹 ID:실제 유저명:홈 디렉토리:쉘

- 예시: root:x:0:0:superuser:/root:/bin/bash
- 주석이나 공백은 허용되지 않는다.

## 비밀번호 필드

- x 표시: 암호화된 비밀번호가 _/etc/shadow_ 파일에 저장되어 있다는 것
- \* 표시: 로그인할 수 없는 사용자
- 공백: 로그인시 비밀번호가 필요 없음

# 비밀번호 변경

- passwd 명령어는 누구나 알지만
- vipw 로 /etc/passwd 파일을 통째로 편집 가능
