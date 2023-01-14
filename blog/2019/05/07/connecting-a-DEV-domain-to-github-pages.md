---
title: DEV 도메인과 Github Pages 연결하기
authors: me
tags: [github, dns]
date: 2019-05-07 00:10:55

---

# 도메인 구입

[Google Domains](https://domains.google.com/m/registrar/search) 에서 구입한다.

- 미국 주소가 있어야된다는 말이 나오는데, 무시하고 구매하기를 하자.
- 도메인 기관에서 연락이 갈 수 있다는 내용에 주소를 대한민국으로 변경 후 입력해주고
- 결제지 우편번호는 대충 쓰고 미국으로 하고 넘어가면 쉽게 구매할 수 있다.

# DNS 설정

**DNS > 맞춤 리소스 레코드** 탭에서 Github Domain IP 를 A 레코드로 추가한다.

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

## http 예외

http 로 서빙하는 경우가 있다면 www.gracefullight.dev 도 사용할 수 있게 CNAME 을 등록하자.

```txt
www CNAME 1h gracefullight.github.io.
```

물론 HSTS 를 적용하는 경우 필요없다.

## CNAME 파일 추가

public 경로 아래 CNAME 파일을 생성 후 도메인을 적는다.

```txt title="CNAME"
gracefullight.dev
```

# github pages 설정

github.com/gracefullight/gracefullight.github.io/settings 의 **GitHub Pages** 탭으로 이동해
**Custom domain** 에 설정할 도메인을 넣고, **Enforce HTTPS** 를 체크한다.

아래 문구가 보이면 성공한 것이다.

> Your site is published at https://gracefullight.dev/

# 웹마스터 설정

## Google

구글 검색에서 도메인 변경을 다시 인덱싱해주기 위해 마이그레이션이 필요하다.
새로운 사이트를 등록해 준 뒤 이전 버전의 서치콘솔에서 기존 사이트의 설정버튼을 누르면 바로 설정이 가능하다.

![주소 변경](https://i.imgur.com/ao5p5uZ.png)

## 기타

네이버와 빙은 같은 site verification 코드가 나와서 사이트만 추가해주면 되는데,
얀덱스의 경우는 코드를 변경하고 빌드해줘야한다.

# 여담

- CNAME 변경하면 Github setting의 Custom domain이 빠지기 때문에 다시 등록해줘야하는 번거로움이 있다.
- 애널리틱스는 도메인만 바꿔주면 바로 연동된다.
- 애드센스가 도메인 승인이 2주가 걸려서 그전까진 애드-프리 사이트가 될 듯하다.
