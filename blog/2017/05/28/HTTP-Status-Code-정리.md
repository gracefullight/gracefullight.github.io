---
title: HTTP Status Code 정리
authors: me
tags:
  - http
date: 2017-05-28 18:31:31
---

API 나 AJAX 응답시에 코드로 날려주는게 표준이기도하고, 편하기도 해서 정리했다.
매번 검색해 쓰는 것도 귀찮고 포스팅마다 의미도 다르고해서.

## 100

순수하게 정보 제공만을 위한 코드

- **102** 임의의 동작이 백그라운드에서 발생하고 완료까지 시간이 걸린다고 나타낼 때 사용

## 200

- **200** Success, OK 성공
- **201** Created 새로운 리소스 생성
- **202** Accepted 요청은 성공했으나 처리되지 않음
- **203** Non-authoritative information 요청이 변형 프록시를 통해 라우팅 되는 경우
- **204** No Content 요청은 성공했으나 반환되는 내용이 없음
- **206** Partial Content 페이징된 응답을 위해 사용된다. 헤더가 전송되고 클라이언트가 허용 가능한 범위가 지정되는데 응답이 범위보다 큰 경우, 서버는 처리해야 하는 더 많은 데이터가 있음을 나타내는 이 코드를 응답한다.

## 300

리다이렉션

- **301** Moved Permanently 영구적으로 리다이렉트
- **302** Found 리다이렉트하지만 나중에 바뀔 수 있음, 사용자가 임의의 이유로 일시적인 리다이렉션 수행을 요구하는 것
- **304** Not Modified 클라이언트에 캐시된 리소스로 요청됨
- **307** Temporary Redirect
- **308** Permanent Redirect 자원에 대한 영구적인 리다이렉트를 지정, HTTP 메소드가 자원을 변경하는 것을 허용하지 않는다.

## 400

클라이언트 오류

- **400** Bad Request 구문적으로 잘못된 요청
- **401** Unauthorized 인증 필요 (실제로는 Unauthenticated 의 의미)
- **403** Forbidden 권한 부족 (실제로는 Unauthorized 의 의미)
- **404** Not Found
- **405** Method Not Allowed 메소드가 일치하지 않음
- **406** Not Acceptable 헤더 또는 내용이 서버에서 받아들일 수 없는 요청
- **407** Proxy Authentication Required 프록시 인증 필요
- **408** Request Timeout 요청시간 초과
- **409** Conflict 기존 리소스와 충돌
- **410** Gone 리소스가 영원히 사라짐
- **411** Length Required Content-Length 없음
- **413** Requested Entity Too Large 내용이 너무 큼 (첨부파일)
- **414** Requested URL Too Long URL 이 너무 김
- **422** Unprocessable Entity Validation 오류
- **429** Too Many Requests 요청 횟수 제한

## 500

서버 오류

- **500** Internal Server Error 서버 오류
- **501** Not Implemented 클라이언트가 아직 구현되지 않은 엔드포인트에 접근하는 경우
- **502** Bad Gateway 게이트웨이 오류
- **503** Service Unavailable 일시적인 오류 (터지거나 점검 중)
