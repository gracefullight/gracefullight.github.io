---
title: 검색등록 - 5. Naver
authors: me
tags:
  - webmaster
date: 2017-01-22 15:50:40
---

## Naver 검색 등록

네이버에 내 사이트를 등록해보자.
[네이버 웹마스터](https://webmastertool.naver.com/)로 이동한다.

### 웹 마스터

#### 등록

**사이트 추가 +** 버튼을 누른 뒤 내 사이트를 추가한다.
![image from hexo](https://i.imgur.com/9BR0yDZ.png)

#### 인증

**HTML 태그** 방식으로 인증을 진행하자.
![image from hexo](https://i.imgur.com/Dg01Tk8.png)
페이지에 태그를 추가하고 **확인** 버튼을 누르면 페이지 소유권이 확인되어 웹마스터 도구를 이용할 수 있다.

#### sitemap 등록

**요청 > 사이트맵 제출** 메뉴에서 sitemap 을 제출한다.
![image from hexo](https://i.imgur.com/KL5ely9.png)

#### robots.txt 설정

**robots.txt**에 sitemap 위치를 알려주는 라인을 추가한다.

```txt title="robots.txt"
User-agent: *
Sitemap: https://gracefullight.github.io/sitemap.xml
```

#### RSS 등록

**요청 > RSS 제출** 메뉴에서 RSS Feed 를 제출한다.

#### 수집주기 설정

사이트의 최신상태를 검색에 반영하기 위해 **설정 > 수집 설정** 메뉴의 **수집주기 설정** 옵션을 **빠르게**로 바꿔준다.

#### 강제 수집 요청

**요청 > 웹 페이지 수집** 메뉴에서 해당 페이지를 수집시킬 수 있다.
![image from hexo](https://i.imgur.com/8CWbvl2.png)

#### 최적화 확인

**현황 > 사이트 최적화** 메뉴에서 내 사이트가 검색에 노출이 잘 될 수 있는 구조인지 확인해본다.
![image from hexo](https://i.imgur.com/ZkwGZgU.png)
최적화 되어있지 않다면 og 태그 및 meta 태그를 적절히 수정해 맞춰주자.
