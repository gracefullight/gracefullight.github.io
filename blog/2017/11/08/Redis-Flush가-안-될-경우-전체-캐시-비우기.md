---
title: Redis Flush가 안 될 경우 전체 캐시 비우기
authors: me
tags:
  - redis
date: 2017-11-08 10:29:42
---

FLUSH 명령어는 보안상 empty 값으로 대체되어있는 경우가 많은데, 이 경우 전체를 비우는 명령어가 없어서 편법을 써야한다.

## 해결

```bash
redis-cli -a '비밀번호' KEYS "*" | xargs redis-cli -a '비밀번호' DEL
```

이 명령은 모든 키 리스트를 가져와 하나씩 지워준다.
