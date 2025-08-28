---
title: Nonparametric Models
date: 2025-08-28T15:01:45.368+10:00
description: Nonparametric Models
authors: me
tags:
  - ai
---


## Nearest-neighbor Models

- 쿼리점 $x_q$에 대해 가장 가까운 $k$개의 이웃을 찾아 분류 또는 회귀에 사용한다.  
  - 분류: 다수결  
  - 회귀: 평균, 중앙값, 혹은 국소적 선형회귀  
- 거리 척도: Minkowski 거리  
  - $L_p(x_j, x_q) = \left( \sum_i |x_{j,i} - x_{q,i}|^p \right)^{1/p}$  
  - $p=2$ → 유클리드 거리  
  - $p=1$ → 맨해튼 거리  
  - 불리언 속성 → 해밍 거리  
  - 공분산 고려 → 마할라노비스 거리  
- 차원의 저주 (curse of dimensionality):  
  - 평균 이웃 부피: $\ell^n = k/N \;\;\Rightarrow\;\; \ell = (k/N)^{1/n}$  
  - $n$이 커질수록 $\ell$ 값이 커져 이웃이 “멀어진다”.  
  - 대부분의 점은 고차원 공간에서 경계(껍질)에 몰린다.  
  - 저차원: 보간(interpolation) 가능  
  - 고차원: 외삽(extrapolation)이 많아져 일반화 어려움  

## k-d trees

- 데이터를 차원별로 분할해 만든 이진 트리.  
- 각 노드에서 특정 차원의 중앙값 $m$을 기준으로 $x_i \le m$ 여부에 따라 좌/우로 분할한다.  
- 탐색: 쿼리점 기준으로 한쪽 브랜치로 내려가며 후보를 찾되, 경계와 가까우면 반대편 서브트리도 확인해야 한다.  
- 효율 조건: 데이터 수가 차원 수보다 훨씬 많아야 하며, 최소 $2^n$개 이상 필요하다.  
- 실용 범위:  
  - 약 10차원 이하에서는 수천 개 데이터  
  - 약 20차원 이하에서는 수백만 개 데이터  

## Support Vector Machines (SVM)

- 최대 마진 분리자(maximum margin separator)를 찾는다.  
- 목표: 경험적 손실 최소화 대신 일반화 손실 최소화  
- 결정 경계: $\{x : w \cdot x + b = 0\}$  
- 학습은 이차계획법(QP) 최적화 문제로 정식화된다.  
  - 이중 표현(dual form):  
    $\arg\max_\alpha \sum_j \alpha_j - \tfrac{1}{2} \sum_{j,k} \alpha_j \alpha_k y_j y_k (x_j \cdot x_k)$  
  - 제약조건: $\alpha_j \ge 0,\; \sum_j \alpha_j y_j = 0$  
- 최적 해에서 대부분 $\alpha_j = 0$이고, 경계 근처의 점들(서포트 벡터)만 $\alpha_j > 0$이다.  
- 예측 함수:  
  $h(x) = \text{sign}\Big(\sum_j \alpha_j y_j (x \cdot x_j) - b \Big)$  
- 장점:  
  - 서포트 벡터만 유지하면 되므로 효율적  
  - 비모수적 유연성 + 모수적 안정성(과적합 억제)  

## The Kernel Trick

- 커널 트릭: 실제 고차원 특징 공간 $F(x)$를 계산하지 않고, 내적만을 커널 함수로 대체한다.  
  - $K(x,z) = F(x)\cdot F(z)$  
- 대표 커널 함수:  
  - 다항 커널: $K(x,z) = (1 + x \cdot z)^d$  
  - 가우시안 커널 (RBF): $K(x,z) = e^{-\gamma \|x-z\|^2}$  
- 소프트 마진 분류기: 일부 오분류 허용, 오분류된 점을 올바른 쪽으로 이동시키는 거리만큼 패널티를 부여한다.  
- 커널 기법은 내적에만 의존하는 다른 알고리즘에도 적용 가능하다.  
- Mercer's theorem: “합리적인” 커널 함수는 항상 어떤 특징 공간에서의 내적에 해당한다.  
