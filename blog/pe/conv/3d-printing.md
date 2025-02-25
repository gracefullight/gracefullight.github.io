---
title: 3D 프린팅
date: 2024-08-26T17:55:57.665+09:00
description: 3D Printing
authors: me
tags:
  - pe
  - pe/conv
---

## 3D 프린팅

- 디지털 모델을 기반으로 재료를 적층하여 제조해 기존에 만들 수 없는 복잡한 형상을 효율적으로 제조하는 프린팅 기법

## 3D 프린팅 공정 분류 및 설명

### 3D 프린팅 공정 분류

```mermaid
graph LR
  subgraph 전처리
    모델링
    편집_변환[편집 및 변환]
  end

  subgraph 프린팅
    빌드
  end

  subgraph 후처리
    출력물_검사[출력물 검사]
  end

  전처리 --- 프린팅 --- 후처리
```

- 소재와 출력 기법에 따라 다양한 공정이 존재하나 SW측면에서 전처리, 프린팅, 후처리로 구분

### 3D 프린팅 공정 설명

| 구분 | 설명 | 예시 |
| --- | --- | --- |
| 모델링 | 물체를 3D로 역공학 | 3D 스캐닝, 리버싱 |
| | 모델 설계 | 3D 모델링 SW |
| | 모델 시뮬레이션 | 시뮬레이션 SW |
| 편집 및 변환 | 모델 파일 무결성 | STL 편집 SW |
| | 모델링 재료, 경도 결정 | 슬라이싱 SW |
| 프린팅 | 프린터 헤드, 베드 조작, 빌드 | 호스트 SW |
| 출력물 검사 | 출력물 검증, 후가공 | 출력물 검사 SW |

## 3D 프린팅시 고려사항

- 재료 선택: 사용 목적에 맞는 재료, 성질, 비용
- 설계 요소: 구조적 무결성, 지지구도, CAD 사용
- 후처리: 표면 마감, 지지구조 제거, 경화, 품질향상, 기능성
