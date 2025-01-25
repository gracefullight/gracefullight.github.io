---
title: AI를 이용한 사이버 공격 패러다임
date: 2025-01-19T19:01:10.702+09:00
description: AI Enabled Cyber Attack Paradigms
authors: me
tags:
  - pe
  - pe/sec
---

## AI를 이용한 사이버 공격 패러다임 개념

- AI와 ML 기술을 악용해 자동화된 피싱, 정교한 악성코드 생성, 탐지 회피 등을 수행하여 기존 보안 체계를 우회하는 사이버 공격 방식
- AI 기반 공격 도구의 등장, 대규모 데이터 분석과 자동화된 공격 가능, 공격자의 적응적 공격 체계 구축

## AI를 이용한 사이버 공격 개념도, 공격절차, 대응방안

### AI를 이용한 사이버 공격 개념도

```mermaid
graph TB
  Attacker(("공격자"))
  AI_Model["악성 AI 생성형 모델"]
  Attack_Vector["공격 벡터 설계"]
  Malware["악성코드 및 피싱 메시지 생성"]
  Target["표적 시스템"]
  Victim(("피해자"))
  Impact["1차 피해<br>데이터 탈취, 시스템 파괴"]
  SecondaryImpact["2차 피해<br>데이터 오용, 금전적 손실"]

  %% 공격 흐름
  Attacker -->|명령 전달| AI_Model
  AI_Model -->|공격 벡터 설계| Attack_Vector
  Attack_Vector -->|자동화된 악성코드 생성| Malware
  Malware -->|전파| Target
  Target -->|피해 발생| Impact
  
  %% 피해 흐름
  Impact -->|데이터 유출 및 판매| SecondaryImpact
  Victim -->|악성코드 실행| Malware
  Target -->|2차 피해 발생| Victim
```

- FraudGPT, WormGPT, DarkGPT 등을 활용하여 사이버 공격 벡터에 인공지능 접목

### AI를 이용한 사이버 공격절차

| 단계 | 내용 | 세부 내용 |
| --- | --- | --- |
| 1. 표적 식별 | 대상 시스템 및 취약점 파악 | AI 기반 데이터 분석으로 대상 시스템의 취약점 및 최적의 공격 경로를 탐색 |
| 2. 공격 벡터 설계 | 공격 방법 결정 | AI 모델을 활용해 피싱, 악성코드, 사회공학적 공격 등 설계 |
| 3. 공격 실행 | 자동화된 공격 수행 | LLM 기반 악성코드 및 피싱 메시지를 표적 시스템에 배포 |
| 4. 탐지 회피 | 보안 시스템 무력화 | 정상적인 데이터로 위장하거나 탐지 패턴을 AI로 분석해 우회 |
| 5. 데이터 탈취 및 결과 분석 | 공격 결과 수집 | 공격 성공 후 데이터 탈취, 시스템 무력화, 네트워크 장악 결과를 분석 및 활용 |

### AI를 이용한 사이버 공격 대응방안

| 구분 | 대응 방안 | 내용 |
| --- | --- | --- |
| AI for Security | AI 기반 보안 탐지 시스템 도입 | AI/ML 모델을 활용해 이상 트래픽 및 비정상 데이터 패턴 조기 탐지 |
| | 위협 인텔리전스 강화 | 알려진 위협과 미확인 위협 분석 및 경고 |
| | 자동화된 방어 체계 | SOAR, XDR 기반 자동화된 대응 체계를 통해 실시간 공격 차단 |
| | 피해 최소화 및 보안 강화 | 랜섬웨어 복구 및 데이터 복구, 보안 체계 강화를 통한 추가 공격 방지 |
| Security for AI | 적대적 AI 공격 방지 | AI 모델에 대한 적대적 공격 방어 기술 개발 |
| | 데이터 무결성 및 보호 강화 | AI 학습 데이터 포이즈닝 방지를 위해 데이터 접근 제어 및 암호화 적용 |
| | AI 보안 표준화 및 정책 개발 | 국제 표준화 작업(OWASP, ISO/IEC)과 보안 정책 수립 및 대응 |

## AI for Security, Security for AI

### AI for Security

```mermaid
graph LR
  Threats[보안 위협]
  Detection[위협 탐지]
  Intelligence[위협 인텔리전스]
  Automation[자동화된 대응]
  Tools[활용 기술]
  XDR[XDR]
  SOAR[SOAR]
  DarkBERT[DarkBERT]
  
  Threats --> Detection
  Detection --> Intelligence
  Intelligence --> Automation
  Automation --> Tools
  Tools --> XDR
  Tools --> SOAR
  Tools --> DarkBERT
```

- AI로 새로운 보안 위협을 탐지하고, 자동화된 대응 체계를 구축하여 위협 가시성, 위협 인텔리전스, 자동화된 대응 역량 강화

### Security for AI

| 프레임워크 | 설명 | 비고 |
| --- | --- | --- |
| SAIF | AI 모델과 데이터의 보안을 위한 포괄적인 프레임워크 | AI 모델의 신뢰성 및 데이터 무결성 |
| AI TRISM | AI 시스템의 신뢰성, 위험 관리, 보안에 중점을 둔 AI 보안 관리 프레임워크 | AI 거버넌스 및 위험 모니터링 |
| AI RMF | NIST의 AI 위험 관리 프레임워크로, AI 위험 식별, 분석, 대응 및 모니터링을 체계화. | AI 위험 평가 및 완화 계획 |
| OWASP | OWASP의 LLM Top 10을 통해 LLM의 주요 보안 취약점과 위협 요소 식별/대응 | 데이터 보호 및 모델 보안 |

- AI 기술 자체를 보호하고, 학습 데이터와 모델의 안전성을 보장하며, AI 생태계에서 발생하는 윤리적 문제와 보안 취약점에 대응

## AI 기반 사이버 보안 주요 고려사항

- 탐지 정확성을 높이기 위한 신뢰할 수 있는 학습 데이터 확보
- AI 거버넌스 프레임워크 도입을 통해 공정하고 투명한 AI 기술 구현

## 참조

- [IITP: 주간기술동향 2158호](https://iitp.kr/kr/1/knowledge/periodicalViewA.it?searClassCode=B_ITA_01&masterCode=publication&identifier=1343)
