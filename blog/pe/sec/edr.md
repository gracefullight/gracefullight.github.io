---
title: EDR, 엔드포인트 감지 및 응답
date: 2024-07-26T14:17:11.518+09:00
description: Endpoint Detection and Response
authors: me
tags:
  - pe
  - pe/sec 
---

## EDR 개념

- IDS, IPS 기능을 포함하여 네트워크의 엔드포인트에서 발생하는 보안 이벤트를 실시간으로 감지하고 대응하는 기술
- 복잡한 위협 환경 실시간 대응 가능, 포렌식 및 분석 기능 제공, 통합 정책 적용, 관리 용이

## EDR 구성도, 구성요소, 적용방안

## EDR 구성도

```mermaid
graph LR
    A[엔드포인트] --> B[데이터 수집 에이전트]
    B --> C[중앙 관리 서버]
    C --> D[위협 분석 엔진]
    D --> E[실시간 경고 시스템]
    E --> F[대응 및 격리 조치]
    F --> G[보고 및 포렌식 분석]
    C --> H[보안 오케스트레이션]
```

### EDR 구성요소

| 구분 | 내용 | 비고 |
|---|---|---|
| 데이터 수집 에이전트 | 엔드포인트에서 데이터를 실시간으로 수집 | 다양한 OS 지원 |
| 중앙 관리 서버 | 수집된 데이터를 중앙에서 관리 및 저장 | 확장 가능성 |
| 위협 분석 엔진 | 수집된 데이터를 분석하여 위협을 탐지 | AI/ML 기반 |
| 실시간 경고 시스템 | 위협이 탐지되면 관리자에게 경고 알림을 전송 | 즉각적인 대응 |
| 대응 및 격리 조치 | 탐지된 위협에 대해 즉각적인 대응 및 격리 조치 수행 | 자동화 가능 |
| 보고 및 포렌식 분석 | 위협에 대한 보고서 작성 및 포렌식 분석 제공 | 감사 및 컴플라이언스 |
| 보안 오케스트레이션 | 다양한 보안 솔루션과의 연계 및 조정 | 통합 관리 |

### EDR 적용방안

| 엔드포인트 | 내용 | 비고 |
|---|---|---|
| 데스크탑/노트북 | 실시간 위협 탐지 및 대응, 사용자 활동 모니터링 | 다양한 OS 지원 |
| 서버 | 중요 데이터 보호, 서버 자원 모니터링 및 침입 탐지 | 고가용성 필요 |
| 모바일 기기 | 모바일 보안 위협 탐지 및 데이터 유출 방지 | BYOD 정책 준수 |
| IoT 장치 | IoT 특화 위협 탐지 및 대응, 장치 간 통신 모니터링 | 경량 에이전트 필요 |

## EDR 고려사항

- 조직의 성장으로 인한 엔드포인트 확장성과, 다양한 운영체제, 디바이스 호환성 고려 필요
- 생성형 AI 기반 검증, 감사용 데이터로 보안 로그를 활용할 수 있도록 로깅 포맷의 정형화 필요
