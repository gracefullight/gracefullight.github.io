---
title: 블로그 댓글 기능 비교
date: 2024-05-01T21:57:18.696+09:00
description: Disqus, Gitalk, Docsly, Giscus 기능 비교
authors: me
tags:
  - me
---

## 개요

- 데이터베이스가 필요 없으면서 블로그에 무료로 댓글을 붙힐 수 있는 기능이 필요했다.
- Hexo 블로그 시스템에서는 [Disqus](https://github.com/disqus/disqus-react)를 사용했었지만, 형편없는 어드민 UX와 많은 트레킹 스크립트로 Gitalk 로 이사를 왔다.
- [Gitalk](https://github.com/gitalk/gitalk)는 생각보다 괜찮았다. 하지만 Docusaurus 기반 블로그로 이전하게 되면서 문제가 발생했다.
  - 트리쉐이킹 없는 모듈을 호출해야했고, `document.title` 을 가지고오는 로직이 꼬이는지 가끔 댓글 타이틀을 잘못 가지고 왔다.
- [Docsly](https://www.docsly.dev/)는 원하는 위치에 댓글을 다는 게 재밌어보였다.
  - 플로팅 푸터로 가운데에 댓글을 쓰는 기능이 들어간다. 그런데 powered by docsly 워터마크가 꽤 크게 노출되어 블로그가 docsly로 운영되는 듯한 느낌을 준다.
- [Giscus](https://github.com/giscus/giscus)는 Github discussion 기반으로 코멘트를 남기는데 모든 기능을 다 만족했다.

## 기능 비교

| 구분         | Disqus    | Gitalk    | Docsly | Giscus      |
| ------------ | --------- | --------- | ------ | ----------- |
| 오픈소스     | △         | O         | X      | O           |
| 업데이트지원 | ~2022     | ~2021     | 2024~  | 2024~       |
| 리액트지원   | △ (Class) | △ (Class) | O      | O           |
| 데이터저장   | Closed    | Issues    | Closed | Discussions |
| 워터마킹     | O         | X         | O      | X           |

## 결론

- [giscus/giscus-component](https://github.com/giscus/giscus-component) 쓰자.
