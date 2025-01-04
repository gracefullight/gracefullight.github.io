---
title: NoSQL 모델링
date: 2025-01-05T00:01:26.851+09:00
description: NoSQL Data Modeling
authors: me
tags:
  - pe
  - pe/db 
---

## NoSQL 유형, 모델링 절차

### NoSQL 유형

- Key-Value: 키와 값의 쌍으로 관리, 빠른 조회, Redis, DynamoDB
- Column Family: 열 기반 데이터 저장, 키 범위 처리 요구 개선, 유연성 극대화, HBase, Cassandra
- Document: 문서형태 데이터 저장, 빠른 조회, MongoDB, CouchDB
- Graph: 노드와 간선로 관계 저장, 모든 노드와 간선에 고유식별자, Neo4j
- Vector: 데이터 간 유사도, HNSW, Milvus

### NoSQL 모델링 절차

| 구분 | 절차 | 설명 |
| --- | --- | --- |
| 탐색 | 도메인 모델 파악 | 데이터 개체 간 관계 분석, 도메인 파악,<br/>ERD 작성하여 결과 도식화 |
| 설계 | 쿼리 결과 디자인 | 도메인 모델 기반 쿼리 결과값 정의<br/>데이터 출력과 저장에 효율적인 구조로 디자인 |
| - | 패턴 기반 데이터 모델링 | I/O 횟수를 최소화하기 위해 반정규화, 데이터 중복 저장 |
| - | 기능 최적화 | 필요시 Secondary Index 활용하여 전체 데이터 Scan 최소화 |
| 최적화 | 후보 NoSQL 선정 | 구조, 특징 분석 후 부하테스트, 안정성테스트 수행<br/> 후보쿼리 선정 |
| - | 데이터모델 최적화 및 HW 튜닝 | 선정된 쿼리에 적합한 데이터 모델 최적화,<br/>어플리케이션 인터페이스 설계<br/>NoSQL 설정 및 HW 튜닝 |

- 쿼리 성능 최적화를 위해 중첩데이터와 반정규화된 데이터 구조로 디자인 필요
