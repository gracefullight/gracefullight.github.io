---
title: TCAM, Ternary Content Addressable Memory
date: 2024-05-29T23:11:06.272+09:00
description: 내용 주소화 기억장치
authors: me
tags:
  - pe
  - pe/ca
---

## TCAM 개념

- ==0, 1, X==(Don't care) 세 가지 상태를 저장하는 메모리 셀로 구성되어, 데이터 검색과 비교를 내용 기반으로 병렬로 수행하는 메모리.
- RAM은 주소기반으로 데이터 읽기/쓰기, TCAM은 ==내용 기반으로 데이터 검색==
- CAM은 0,1 exact matching, TCAM은 0,1,X ==wildcard matching==

## TCAM의 구성도, 구성요소 활용사례

### TCAM의 구성도

```mermaid
graph LR
  SearchLine --> TCAM[TCAM 메모리 셀]
  TCAM --> MatchLine
  MatchLine --> Encoder[우선순위 인코더]
```

### TCAM의 구성요소

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| ==Search Line== | 검색어를 입력하는 라인| 각 비트는 0, 1, X 값 |
| ==메모리 셀== | 3진 데이터(0, 1, X) 상태 저장 | 낮은 공간 효율 |
| ==Match Line== | 검색 결과를 출력하는 라인 | 각 메모리 워드마다 하나씩 존재 |
| ==Priority Encoder== | 여러 Match Line 중 가장 높은 우선순위의 일치 결과를 선택 | 사용자 설정 가능 |

- TCAM의 구성요소는 3상태 저장, 고속 비교 및 우선순위 결정 기능을 통해 빠른 데이터 검색을 가능하게함.

### TCAM 활용사례

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| 네트워크 ==라우터== | IP 주소 기반 패킷 분류 및 포워딩 | 빠른 패킷 처리 속도 |
| 네트워크 ==방화벽== | 패킷 필터링 규칙과 패킷 헤더 비교 | 높은 보안성 |
| 데이터베이스 | 데이터 검색 및 필터링 | 복잡한 질의 처리 가능 |

## TCAM 발전방향

- 저전력 설계: TCAM은 ==높은 전력 소모== 단점
- 고집적화: 단위 면적 당 더 많은 메모리 셀 집적하여 용량 증대, 비용 절감
