---
title: "550 : smtp auth address is not same to envfrom address (#5.5.0)"
authors: me
tags: [linux, php]
date: 2017-01-15 14:26:16
---

## 550 : smtp auth address is not same to envfrom address

stmp 로 메일 발송시 아래와 같은 오류가 발생하는 경우가 있다.

```bash
550 : smtp auth address is not same to envfrom address (#5.5.0)
The following From address failed: your@email.com : MAIL FROM command failed, smtp auth address is not same to envfrom address (#5.5.0)
```

### 해결

smtp 인증 username 과 보내는 메일주소가 같지 않아서 발생한다.
username 과 from email 을 일치시켜주면 해결된다.
