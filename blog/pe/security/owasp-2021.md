---
title: OWASP 2021 TOP 10
date: 2024-05-02T18:51:04.579+09:00
description: OWASP 2021 TOP 10 취약점 리스트
authors: me
tags:
  - pe
  - pe/security
---

## OWASP 개요

- Open Web Application Security Project
- 소프트웨어의 보안 취약점을 분석하고 연구하는 비영리 단체

## OWASP 2024 Top 10 취약점

### 1. 접근 권한 취약점

- Broken Access Control
- 사용자가 권한을 벗어나 행동할 수 없도록 정책 시행
- 취약한 경우 모든 데이터를 무단으로 열람, 수정, 삭제 가능

### 2. 암호화 오류

- Cryptographic Failures
- 적절한 암호화가 없을시 민감 데이터 노출 가능

### 3. 인젝션

- Injection
- SQL, NoSQL, ORM, LDAP의 인젝션 취약점
- 사용자 제공 데이터 조작을 위한 공격, XSS 포함

### 4. 안전하지 않은 설계

- Insecure Design
- 설계 단계에서 발생하는 보안 결함
- 요구사항 및 리소스 관리, 보안 설계, 보안 개발 생명 주기

### 5. 보안 설정 오류

- Security Misconfiguration
- 어플리케이션 보안 설정이 누락되거나 클라우드 서비스 권한이 잘못된 경우

### 6. 취약하고 오래된 컴포넌트

- Vulnerable and Outdated Components
- 취약한 어플리케이션, 라이브러리, 프레임워크 등의 보안 위협

### 7. 식별 및 인증 오류

- Identification and Authentication Failures
- 취약한 인증에서 식별까지 포함된 보안 결함
- 사용자 신원확인, 인증, 세션관리 취약점

### 8. 소프트웨어 및 데이터 무결성 오류

- Software and Data Integrity Failures
- 안전하지 않은 역직렬화가 병합된 항목으로, 어플리케이션이 신뢰할 수 없는 소스, 저장소, 라이브러리, 모듈에 의존하는 경우 발생

### 9. 보안 로깅 및 모니터링 오류

- Security Logging and Monitoring Failures
- 로깅으로 공격 발생 감지 및 대응까지 포함

### 10. 서버 측 요청 위조

- Server-Side Request Forgery
- 어플리케이션이 사용자 제공 URL의 유효성을 검사하지 않고 원격 리소스를 가져올 때 발생

## 참조

- [OWASP: OWASP Top Ten](https://owasp.org/www-project-top-ten/)
