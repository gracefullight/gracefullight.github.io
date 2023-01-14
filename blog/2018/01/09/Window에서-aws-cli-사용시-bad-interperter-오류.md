---
title: Window에서 aws cli 사용시 bad interperter 오류
authors: me
tags: [windows, aws]
date: 2018-01-09 12:10:59
---

git bash에서 aws cli 명령어를 실행시에 c:\Program Files... bad interpreter 오류가 나오면서 실행이 안 될 때는 다음과 같이 하면 된다.

# 해결

**~/.bash_profile** 에 aws alias를 추가한다.

```bash
$ vi ~/.bash_profile
# aws script 경로를 강제로 지정한다
alias aws='python "C:\Program Files\Python\Scripts\aws"'
# 추가 후 저장
$ source ~/.bash_profile
```
