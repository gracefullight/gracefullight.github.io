---
title: 소프트웨어 안정성 분석
date: 2024-03-03T11:55:00.000+09:00
description: 소프트 웨어 안정성 분석 필요성 및 기법
authors: me
tags:
  - pe
  - pe/engineering
---

> 131

## 소프트웨어 안정성 분석 개요

```mermaid
block-beta
columns 4
  block:group1:1
    columns 1
    위험원분석및위험평가["위험원 분석 및 위험 평가"]
    위험감소대책수립["위험 감소 대책 수립"]
    위험감소대책적용["위험 감소 대책 적용"]
  end

  V모델:2
  
  block:group2:1
    columns 1
    SW안정성평가["SW 안정성 평가"]
    위험감소대책적용2["위험 감소 대책 적용"]
  end

  SW안전확보활동["SW 안전 확보 활동"]:4
```

- 각 개발 수명주기에서 안전 보증, 확인 활동 수행
- SW시스템의 오류, 장애, 실패를 예방하고, 위험을 회피, 전가, 감수, 수용하기 위해 시스템 위험요소를 식별하고 평가하는 과정.
- IoT와 안전필수시스템(자율주행, UAM 등)의 기능적 사고로 인한 인명피해방지를 위해 필요

## 소프트웨어 안정성 분석 주요 기법

### FTA, Fault Tree Analysis

```mermaid
graph TB
  TOP_EVENT[Top Event]
  BASIC_EVENT1[Basic Event]
  INTERMEDIATE_EVENT[Intermediate Event]

  TOP_EVENT -->|AND|BASIC_EVENT1
  TOP_EVENT -->|AND|INTERMEDIATE_EVENT

  subgraph MinimalCutSets[Minimal Cut Sets, 최소절단집합]
    BASIC_EVENT2[Basic Event]
    BASIC_EVENT3[Basic Event]
  end
  
  INTERMEDIATE_EVENT -->|OR|BASIC_EVENT2
  INTERMEDIATE_EVENT -->|OR|BASIC_EVENT3
```

- 시스템 주요 실패 이벤트를 트리구조롤 분석하여 원인 규명
- Top-Down 방식
- 분석범위의 정의 및 분석수준의 결정 -> 대상제품의 특성 파악 -> 정상사상 정의 -> 결함수의 구성 -> 결함트리의 정성적 분석 -> 결함트리의 정량적 분석 -> 분석결과의 평가 및 보고

### FMEA, Failure Mode and Effects Analysis

```mermaid
graph TD
  정의[프로세스 및 부품 정의]
  정의 --> 고장유형식별[고장유형 식별]
  고장유형식별 --> 원인평가[원인평가, Cause]
  고장유형식별 --> 영향평가[영향평가, Effect]
  고장유형식별 --> 심각도평가[심각도평가, Severity]
  원인평가 --> 계산[RPN 계산, 심각도X감지확률X발생확률]
  영향평가 --> 계산
  심각도평가 --> 계산
  계산 --> 분석[결과 분석 및 우선순위 결정]
  분석 --> 조치[위험 감소 조치 계획 및 실행]
```

- 분석 과제 정의 및 분석 준비 -> 분석 실시 -> 분석 결과의 정리 및 심층 분석

### HAZOP, Hazard and Operability study

```mermaid
graph LR
  검토구간설정[검토 구간 설정, Study node]
  공정변수설정[공정 변수 설정, Process Parameter]
  가이드워드적용[가이드워드 적용, 이탈 분석]
  이탈원인평가[이탈 원인 평가]
  세이프가드수립[세이프가드 수립]

  검토구간설정 --> 공정변수설정
  공정변수설정 --> 가이드워드적용
  가이드워드적용 --> 이탈원인평가
  이탈원인평가 --> 세이프가드수립
```

- 목적 및 분석범위 설정 -> 분석팀 구성 -> 예비조사 -> 브레인스토밍 -> 분석결과 기록

## 소프트웨어 안정성 분석시 고려사항

- ISO 26262 등 해당 산업의 규제 및 표준을 준수하여 분석 수행
