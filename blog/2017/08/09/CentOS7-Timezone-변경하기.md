---
title: Centos7 Timezone 변경하기
authors: me
tags: [linux, timezone]
date: 2017-08-09 21:37:34
---

# 기존 방식

```bash
# 기존 설정 백업
$ mv /etc/localtime /etc/localtime.bak

# 타임존 연결
$ ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# 백업을 안하고 바로 연결시
$ ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
```

# timedatectl

timedatectl 명령어를 사용해 쉽게 바꿀 수 있다.

```bash
# 한줄로 깔끔하게
$ timedatectl set-timezone Asia/Seoul
```

# 여담

시간날 때 세팅용 쉘을 만들어야겠다.
