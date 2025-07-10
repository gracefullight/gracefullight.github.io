---
title: "Temporary failure in name resolution, 일시적인 실패"
authors: me
tags:
  - linux
  - dns
date: 2017-01-10 22:58:08
---

모듈 설치시 domain을 사용하거나, telnet 도메인 포트를 호출해봤는데
**name resolution에서 일시적인실패** 또는 **Temporary failure** 문구의 에러가 보이는 경우가 있다.

## 원인

nameserver를 찾지 못해서 발생한다.

## 해결

Root 계정으로 접속 후 nameserver 설정을 추가한다.

```bash
$ vi /etc/resolv.conf

## 아래 내용을 추가
nameserver 58.227.193.227
nameserver 221.143.20.131
```

저장하면 서비스 재시작이 필요없이 바로 적용된다.

## 여담

- 통신사별 [DNS 정보](http://letmelove.net/blog/72) 페이지를 첨부한다.
- 아마존 DNS 오류로 이 페이지의 조회수가 급증했다.
