---
title: ISP, BPR
date: 2024-07-22T14:55:48.908+09:00
description: Information Strategic Planning, Business Process Re-engineering
authors: me
tags:
  - pe
  - pe/mng
---

## ISP, BPR 개념

```mermaid
graph TB
  ISP <-->|상호보완| BPR
  BA --> ISP
  BA --> BPR
  EA --> BA
```

- ISP는 ==기업의 비전과 목표 달성을 위해 ICT기술을 어떻게 활용==할지 전략 수립, BPR은 ==기존 업무 프로세스를 검토하고 혁신==하여 효율성을 극대화하는 전략 수립
- 기업의 비지니스 아키텍처, 전사적 아키텍처를 개선하고 비지니스 목표를 달성하기 위한 필수 요소

## ISP, BPR 절차도, 세부절차

### ISP 절차도, 세부절차

```mermaid
graph LR
  환경분석 --> 현황분석 --> 목표모델설계 --> 실행계획수립
```

| 단계 | 내용 | 비고 |
| --- | --- | --- |
| 환경분석 | ==비지니스 환경과 내부 역량 파악==, ==기회, 위험요인 식별== | 외부 환경 분석, 내부 환경 분석 |
| 현황분석 | 현재 ==정보시스템 현황파악==, ==벤치마킹==, ==개선방향 설정== | 정보기술 분석, 업무체계 분석 |
| 목표 모델 설계 | ==정보시스템 비전 및 목표설정==, ==아키텍처 설계== | 정보화 전략, 운영관리 체계 |
| 실행계획수립 | 목표모델 실현을 위한 ==구체적 실행방안== 마련 | 추진전략수립, 추진일정수립 |

### BPR 절차도, 세부절차

```mermaid
graph LR
  고객가치파악 --> 현재프로세스분석 --> 프로세스목표설정 --> 개선프로세스설계
```

| 단계 | 내용 | 비고 |
| --- | --- | --- |
| 고객가치파악 | 고객중심 프로세스 개선 기반 마련 | 고객 가치 분석, 요구사항 파악 |
| 현재 프로세스 분석 | AS-IS 프로세스 문제점, 개선 기회 파악 | 프로세스 분석서 |
| 프로세스 목표 설정 | 개선 목표 및 효과 측정, 평가 기준 마련 | 개선 목표 설정, KPI 정의 |
| 개선 프로세스 설계 | 현신적 프로세스 구현을 위한 실행방안 마련 | RPA 등 자동화시스템 도입 |

## ISP, BPR 비교

| 구분 | ISP | BPR |
| --- | --- | --- |
| 관점 | 전략적 관점 | 전술적 관점 |
| 계획 | 장기적 계획 | 단기적 실행 |
| 개선포인트 | 정보시스템 중심 | 업무프로세스 중심 |

- ISP를 진행하고, 현행 비지니스 프로세스 수준이 낮을 경우 BPR을 상호보완적으로 활용하여 정보시스템에 최적화된 프로세스 수립

## ISP, BPR 도입 시 고려사항

- 성공적인 변화 관리를 위해 이사회, 경영진의 강력한 의지와 지원 필요
- 조직 구성원은 변화하는 환경에 적극적, 지속적 프로세스 개선 노력 필요
