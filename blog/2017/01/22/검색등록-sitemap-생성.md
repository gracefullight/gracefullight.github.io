---
title: 검색등록 - sitemap 생성
authors: me
tags: [webmaster]
date: 2017-01-22 16:13:53
---

## sitemap 생성

모든 검색 엔진 크롤러는 sitemap.xml 을 참조해 데이터를 인덱싱하는 기능이 있다.

hexo 사용자는 [hexo-generator-seo-friendly-sitemap](https://github.com/ludoviclefevre/hexo-generator-seo-friendly-sitemap) 또는 [hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap) 플러그인을 설치하면 바로 생성이 되지만, 다른 경우라면 직접 sitemap 을 생성해줘야한다.

### 직접 생성하기

[xml-sitemaps](https://www.xml-sitemaps.com/)에서 무료로 생성할 수 있다.

![image from hexo](https://i.imgur.com/lSZPcQV.png)

내 사이트 URL 과 업데이트 빈도를 설정한 뒤 **Start** 버튼을 클릭하면
잠시 후 **sitemap.xml**을 다운 받을 수 있다.
이 후 서버로 업로드해 검색등록을 마무리하면 된다.
