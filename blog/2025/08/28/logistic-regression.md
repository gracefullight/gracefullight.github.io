---
title: Logistic regression
date: 2025-08-28T12:02:22.472+10:00
description: Logistic regression
authors: me
tags:
  - ai
---

## 단변량 선형 회귀 (Univariate Linear Regression)

- 입력이 하나 $x$인 경우, 가설: $h(x) = w_1x + w_0$  
- 손실 함수: 제곱 오차 (Squared Error)  
- 경사 하강법으로 최적의 $(w_0, w_1)$ 찾기  
  - $w_0 \leftarrow w_0 + \alpha (y - h(x))$  
  - $w_1 \leftarrow w_1 + \alpha (y - h(x)) \cdot x$  
- 손실 함수가 볼록(Convex) → 전역 최소값(Global Minimum) 보장  

## 배치 / 확률적 경사 하강법 (Batch vs SGD)

- 배치 경사 하강법(Batch GD): 모든 데이터 사용 → 정확하지만 느림, 대규모 데이터 비효율적  
- SGD(Stochastic GD): 무작위 예시 하나(또는 작은 minibatch)만으로 업데이트 → 빠르고 효율적  
- 미니배치(Minibatch): 속도 + 안정성 균형 가능  
- 학습률 $\alpha$ 감소 스케줄 → 수렴 보장  

## 다변량 선형 회귀 (Multivariable Linear Regression)

- 입력이 $n$차원인 경우, 가설: $h(x) = w \cdot x = \sum_i w_i x_i$  
- 정규 방정식 (Normal Equation): $w^* = (X^TX)^{-1}X^Ty$  
- $(X^TX)^{-1}X^T$ = 유사역행렬(Pseudoinverse)  
- 고차원에서는 과적합 위험이 크므로 정규화 필요  

## 정규화 (Regularization)

- 비용 함수: $Cost(h) = Loss(h) + \lambda \cdot Complexity(h)$  
- 복잡도 함수: $Complexity(h_w) = \sum_i |w_i|^q$  
- $q = 1$ → L1 정규화 (희소 모델, 많은 $w_i = 0$)  
- $q = 2$ → L2 정규화 (가중치 제곱합 최소화)  
- L1 → 회전 불변성 없음 (축이 중요한 경우 적합)  
- L2 → 회전 불변성 있음 (축이 임의적일 때 적합)  

## 퍼셉트론 학습 규칙 (Perceptron Learning Rule)

- 선형 함수 + Hard Threshold → 선형 분류기  
- 가중치 업데이트: $w_i \leftarrow w_i + \alpha (y - h(x)) \cdot x_i$  
- 선형 분리 가능(linearly separable) → 완벽한 분리자로 수렴  
- 분리 불가능한 경우 → 수렴 보장 없음, $\alpha$ 스케줄 필요  

## 로지스틱 회귀 (Logistic Regression)

- Hard Threshold 문제  
  - 불연속, 미분 불가능 → 학습 불안정  
  - 항상 0 또는 1 확정 예측 → 경계 근처 비효율적  
- 해결책: 로지스틱 함수 $g(z) = \frac{1}{1 + e^{-z}}$  
- 가설: $h_w(x) = g(w \cdot x) = \frac{1}{1 + e^{-w \cdot x}}$  
- 출력 $\in (0,1)$ → 확률로 해석 가능, soft boundary 형성  
- 경계 중앙에서 0.5, 멀어질수록 0 또는 1에 가까움  

### 로지스틱 함수의 도함수 성질

- 로지스틱 함수: $g(z) = \frac{1}{1+e^{-z}}$  
- 미분: $g'(z) = \frac{e^{-z}}{(1+e^{-z})^2}$  
- $1 - g(z) = \frac{e^{-z}}{1+e^{-z}}$  
- 따라서 $g(z)(1-g(z)) = \frac{e^{-z}}{(1+e^{-z})^2}$  
- 결론: $g'(z) = g(z)(1-g(z))$  

### 로지스틱 회귀 가중치 업데이트 유도 과정

- 손실 함수: $Loss(w) = (y - h_w(x))^2$  
- $\frac{\partial}{\partial w_i} Loss(w) = \frac{\partial}{\partial w_i}(y - h_w(x))^2$  
- $= 2(y - h_w(x)) \cdot \frac{\partial}{\partial w_i}(y - h_w(x))$  
- $= -2(y - h_w(x)) \cdot \frac{\partial}{\partial w_i} h_w(x)$  
- $h_w(x) = g(w \cdot x)$ 이므로 $\frac{\partial}{\partial w_i} h_w(x) = g'(w \cdot x) \cdot x_i$  
- $g'(w \cdot x) = h_w(x)(1-h_w(x))$  
- 최종: $\frac{\partial}{\partial w_i} Loss(w) = -2(y - h_w(x)) \cdot h_w(x)(1-h_w(x)) \cdot x_i$  
- 경사 하강법 업데이트:  
  $w_i \leftarrow w_i - \alpha \cdot \frac{\partial}{\partial w_i} Loss(w)$  
- 따라서:  
  $w_i \leftarrow w_i + \alpha (y - h_w(x)) \cdot h_w(x)(1-h_w(x)) \cdot x_i$  

## 결론

- 발전 흐름: 선형 회귀 → 경사 하강법 → 다변량 확장 → 정규화 → 퍼셉트론 → 로지스틱 회귀  
- L1 vs L2 정규화  
  - L1: 희소 모델 (축 중요)  
  - L2: 회전 불변 (축 임의적)  
- 퍼셉트론: 선형 분리 가능할 때만 완벽 동작  
- 로지스틱 회귀: soft boundary 제공 → 확률적 예측 + 현실 데이터에 강함
