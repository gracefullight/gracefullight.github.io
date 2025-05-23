---
title: Pollack's Rule, 폴락의 법칙
date: 2024-05-30T17:10:58.984+09:00
description: 폴락의 법칙
authors: me
tags:
  - pe
  - pe/ca
---

## 폴락의 법칙 개념

- 마이크로프로세서의 성능은 면적(트랜지스터 수)의 제곱근과 비례한다는 법칙
  - 성능은 면적의 제곱근에 비례 `<->` 면적은 성능의 제곱에 비례

## 폴락의 법칙 관계도, 특징

### 폴락의 법칙 관계도

```mermaid
xychart-beta
  title "폴락의 규칙: 성능 vs 면적"
  x-axis [1, 2, 3, 4, 5, 6, 7, 8, 9]
  y-axis "성능" 1 --> 5
  line [1, 1.4, 1.7, 2, 2.2, 2.4, 2.6, 2.8, 3]
```

- 성능 향상을 위해 트랜지스터를 늘리는 것보다 프로세서를 병렬로 활용하는 것이 효율적

### 폴락의 법칙 특징

| 구분 | 내용 | 지표 |
| --- | --- | --- |
| 복잡성 증가 | 트랜지스터 수 증가, 설계 복잡도 증가 | LOC 측정 |
| 생산성 감소 | 개발 기간 증가, 생산 비용 증가 | 프로젝트 생산성 평가 지표 |
| 품질과 생산성 | 오류 발생 가능성 증가, 생산 수율 감소 | 프로세스 관리 |

### 폴락의 법칙으로 인한 프로세서 발전 동향

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| 멀티코어 프로세서 | 분할, 병렬처리 프로세서 개발 | 라이젠, 인텔, 애플M |
| 저전력 프로세서 | 에너지효율적인 프로세서 개발 | 퀄컴, 애플A |
| 연산 가능한 메모리 | 메모리에서 연산 처리 | PIM |
