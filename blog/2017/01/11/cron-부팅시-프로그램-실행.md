---
title: cron 부팅시 프로그램 실행
authors: me
tags: [linux]
date: 2017-01-11 15:11:08
---

리눅스에서 재부팅시 자동으로 프로그램을 실행해야하는 경우가 있다.
init.d에 등록하는 방법이 있지만 스케쥴 작업인 경우 크론에서 관리하는게 깔끔한 것 같다.

# 예제

```bash
$ crontab -e

@reboot /test/test.sh start
```

**@reboot**를 쓴 뒤 부팅시 실행시킬 명령어를 적어주면 된다.
