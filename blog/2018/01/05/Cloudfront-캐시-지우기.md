---
title: Cloudfront 캐시 지우기
authors: me
tags: [aws]
date: 2018-01-05 13:41:12

---

클라우드프론트로 static website hosting 을 할 경우에 삭제된 s3 의 파일이 노출되는 경우가 있다.
캐싱처리되어서 보이는 현상인데 다음과 같이 해결하면 된다.

# 해결

**Invalidate** 기능을 사용해서 캐시를 지워버리자.
**Cloudfront Distributions > ID 클릭 > Invalidations** 에서 **Create Invalidation** 버튼을 누른다.

![image from hexo](https://i.imgur.com/qFe6hKj.png)

**Object Paths**에 캐시를 지울 경로를 입력한다.
예를 들어 assets/js 하위의 소스 맵 파일만 지운다면 다음과 같다.

```bash
/assets/js/*.map
```

입력 후에 **Invalidate** 버튼을 누르면 5~10 분 안에 리스트의 Status 가 Completed 로 변하고 기존 캐시가 사라진다.
