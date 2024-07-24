---
title: CAP, PACELC
date: 2024-07-24T11:45:17.503+09:00
description: CAP, PACELC
authors: me
tags: 
  - pe
  - pe/db
---

## CAP 이론 개념

- 분산시스템이 동시에 일관성, 가용성, 분할내성을 모두 만족시킬 수 없다는 이론
- 분산시스템의 특성을 이해하고 Trade-Off를 고려하여 데이터베이스를 설계하는 원칙

## CAP 이론 개념도, 구성요소

### CAP 이론 개념도

```mermaid
graph TB
  C((C, 일관성))
  A((A, 가용성))
  P((P, 분할내성))

  C ---|RDBMS| A
  A ---|NOSQL| P
  P ---|NOSQL| C
```

### CAP 이론 구성요소

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| C + P | 일부 노드 장애시에도 일관성 유지 | MongoDB |
| A + P | 일부 노드 장애시에도 시스템은 계속 응답 | DynamoDB |
| C + A | 네트워크 분할이 없을시 일관성, 가용성 보장 | RDBMS |

## PACELC 이론 개념도, 구성요소

### PACELC 이론 개념도

```mermaid
graph LR
  P((P))
  A((A))
  C1((C))
  L((L))
  C2((C))

  A ---|장애시| P
  C1 ---|분할시| P
  P ---|정상시| L
  P ---|미분할시| C2
```

- CAP이론을 보완하여 네트워크 분할 여부나 정상 작동 여부에 따라 지연시간과 일관성의 Trade-Off를 고려한 이론

### PACELC 이론 구성요소

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| PA/EL | 장애시 가용성, 정상시 지연시간 우선 고려 | DynamoDB, Cassandra |
| PA/EC | 장애시 가용성, 정상시 일관성 보장 | MongoDB |
| PC/EL | 장애시 일관성, 정상시 지연시간 우선 고려 | PNUT, CosmosDB |
| PC/EC | 장애시 일관성, 정상시 일관성 보장 | HBase |

## NoSQL 데이터베이스 도입시 고려사항

- MongoDB 등 NOSQL의 오픈소스 라이센스가 SSPL로 이동함에 따라 CSP 서비스 개발시 Fork 버전 사용 등 대안 마련
