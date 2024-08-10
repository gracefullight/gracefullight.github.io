---
title: 카카오 og tag 캐시 제거
authors: me
tags: [kakao]
date: 2017-01-13 13:24:55
---

og image 또는 og tag 를 변경하면 페북, 네이버는 시간이 지나면 갱신되나 카카오는 캐싱되어서 바뀌지 않는다.
(Description 같은 경우 반영이 되나, Image 는 캐시를 지울 때까지 반영이 안 되는 것 같다)

## 해결

[Kakao Developers](https://developers.kakao.com/)에서 캐시를 삭제하여 해결이 가능하다.

### Cache 삭제

[Cache Tool](https://developers.kakao.com/docs/cache)에서 URL 을 입력하고 캐시를 삭제한다.
![image from hexo](https://i.imgur.com/vu3jbb5.png)

### linkinfo 삭제

[카카오 스토리 링크 캐시삭제](https://dev.kakao.com/docs/restapi/tool#story-api#/v1/api/story/linkinfo)에서 내 앱으로 인증한 뒤 캐시삭제를 요청한다.
![image from hexo](https://i.imgur.com/c4WfaXn.png)
