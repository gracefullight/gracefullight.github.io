---
title: 의사결정나무
date: 2024-05-03T20:53:34.498+09:00
description: 의사결정나무
authors: me
tags:
  - pe
  - pe/algo
---

## 의사결정나무 개요

### 의사결정나무 개념

- 주어진 입력값들의 조합을 ==의사결정규칙==에 따라 ==출력값을 예측==하는 모형
- ==의사결정규칙==을 트리구조로 나타내어 ==분류와 예측==을 수행하는 분석 방법

## 의사결정나무 구성, 유형, 절차

### 의사결정나무 구성

- 루트 노드: 최상단 노드, 첫 분류 조건
- 부모 노드: 상위 노드
- 자식 노드: 하위 노드
- 리프 노드: 결과를 예측하는 말단 노드
- 엣지: 샘플을 분류하기 위한 조건
- 뎁스: 루트 노드에서 특정 노드까지 도달하기 위해 거쳐야하는 엣지 수

### 의사결정나무 유형

- 분류트리: ==범주형 변수==를 예측하기 위해 사용되는 트리 모델, 데이터를 여러 범주로 분류
- 회귀트리: ==연속형 변수==의 값을 예측하기 위한 트리모델

| 구분     | 분류트리                         | 회귀트리                        |
| -------- | -------------------------------- | ------------------------------- |
| 대상     | 범주형 변수 대상                 | 연속형 변수 대상                |
| 특징     | 불순도를 기준으로 최적 분류 결정 | 분산을 최소화하는 방향으로 분할 |
| 평가방법 | ==지니지수, 엔트로피==               | ==오차제곱합==                      |
| 사용시기 | 명확한 범주를 가진 데이터 분류   | 연속적 수치 예측, 트렌드 예측   |

### 의사결정나무 절차

```mermaid
graph LR
  성장 --> 가지치기 --> 최적나무모형선택[최적 나무 모형 선택] --> 해석및예측[해석 및 예측]
```

- 성장: 분석목적에 따른 트리 생성
- 가지치기: 불필요한 가지를 제거하여 과대적합, 과소적합 방지
- 타당성 평가: 가장 적은 엔트로피를 갖는 나무를 평가하고 최적 모형 선택
- 해석 및 예측: 구축된 나무모형 해석

## 의사결정나무 평가모델

- 지니계수: Gini Index
  - 데이터의 불순도를 측정하는 지표
  - 0에 가까울수록 노드의 데이터가 한 클래스로 분류된 것이고, 1에 가까울수록 데이터 분산
- 엔트로피: Entropy
  - 데이터의 확률분포가 가지는 정보량을 수치로 표현
  - 작을 수록 잘 분류된 것
- 오차제곱합: Mean Squared Error, MSE
  - 예측치와 실제치의 차이를 측정하는 지표
  - MSE가 작을수록 모델의 예측 성능이 좋다고 평가
