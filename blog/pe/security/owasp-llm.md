---
title: OWASP TOP 10 for LLM Applications
date: 2024-05-10T22:57:24.809+09:00
description: LLM 어플리케이션을 위한 OWASP 취약점 리스트
authors: me
tags:
  - pe
  - pe/security
---

## OWASP LLM 개요

- 기업에서 대규모 언어모델을 배포하고 관리할 때 발생할 수 있는 보안 위험에 대해 대비하기 위한 상위 10가지 취약점

## OWASP LLM Top 10 취약점

### 1. 프롬프트 인젝션

- Prompt Injection
- 공격자가 조작된 입력을 통해 LLM을 조종하여 데이터 및 민감 정보를 추출
- 권한 제어, 인간 승인, 사용자 프롬프트에서 신뢰할 수 없는 내용 분리, LLM을 신뢰할 수 없는 것으로 처리

### 2. 안전하지 않은 출력 처리

- Insecure Output Handling
- LLM 출력을 검증 없이 보낼 경우 XSS, CSRF, SSRF, 권한 상승, 원격 코드 실행 가능
- 출력을 사용자 입력처럼 취급하여 검증, 출력 인코딩으로 코드실행 차단

### 3. 훈련 데이터 중독

- Training Data Poisoning
- 훈련 데이터나 과정에 악의적인 데이터를 주입하여 보안 취약점, 편견, 백도어 삽입
- 공급망 검증, 데이터의 정당성 확인, 사용 사례별 훈련 모델 구축

### 4. 모델 서비스 거부

- Model Denial of Service
- 공격자가 LLM 서비스에 DoS 공격하여, 서비스 품질 저하나 높은 비용 초래
- 입력 유효성 검사, 리소스 사용 제한, API 호출 제한

### 5. 공급망 취약점

- Supply Chain Vulnerabilities
- 취약한 데이터, 모델, 서비스, 시스템으로 인해 LLM이 취약점에 노출
- 공급업체 평가, 플러그인 테스트, 최신 구성 요소 사용

### 6. 민감 정보 노출

- Sensitive Information Disclosure
- LLM이 민감 정보를 공개하여 저작권 침해, 사생활 침해가 발생
- 훈련 데이터 정제, 입력 유효성 검사, 파인 튜닝 시 민감 데이터 주의

### 7. 안전하지 않은 플러그인 설계

- Insecure Plugin Design
- 부적절한 입력 검증과 접근 제어 부족으로 인해 데이터 유출, 원격 코드 실행 등이 발생
- 매개 변수 제어, OWASP 가이드라인 적용, 철저한 테스트 및 검증

### 8. 과도한 권한

- Excessive Agency
- LLM 기반 시스템이 너무 많은 기능, 권한 또는 자율성을 가지고 있어 오용 가능
- 기능 제한, 권한 제어, 사용자 승인

### 9. 과도한 의존

- Overreliance
- LLM에 대한 과도한 의존은 잘못된 정보, 법적 문제, 보안 취약점을 유발
- LLM 출력의 지속적 검토 및 검증, 신뢰할 수 있는 소스와의 비교, 파인튜닝 통한 품질 향상

### 10. 모델 탈취

- Model Theft
- 무단 접근을 통해 LLM 모델이 유출되어 경제적 손실, 명성 손상, 민감 정보 접근 위험 발생
- 접근 제어 및 인증 강화, 네트워크 제한, 접근 로그 모니터링

## 참조

- [OWASP: OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
