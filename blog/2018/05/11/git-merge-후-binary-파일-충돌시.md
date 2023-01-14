---
title: git merge 후 binary 파일 충돌시
authors: me
tags: [git]
date: 2018-05-11 21:27:29
---

바이너리 파일은 diff 가 안 되서 확인을 할 수가 없는데,
merge 시에 내 바이너리를 쓸 지 받은 것의 바이너리를 쓸 지 여부를 지정해주면 된다.

# merge strategy

```bash
# 받아온 브랜치의 바이너리 파일을 사용
$ git merge -X theirs origin/브랜치

# 내 로컬 바이너리 파일을 사용
$ git merge -X ours origin/브랜치
```

# gc 해제

이렇게 받다보면 unlink of file failed 란 오류가 발생할 수가 있는데,
git 가비지 컬렉터 옵션을 해당 프로젝트에서만 꺼주면 된다.
기능에는 아무 문제 없다. 궁금하면 `git help gc`를 해보시길..

```bash
# gc 기능 끄기
$ git config --local gc.auto 0
```
