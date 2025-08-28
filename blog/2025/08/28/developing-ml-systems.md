---
title: Developing ML Systems
date: 2025-08-28T16:04:52.968+10:00
description: Developing ML Systems
authors: me
tags:
  - ai
---

## Problem formulation (문제 정의)

- **The first step is to figure out what problem you want to solve.**  
  1) “사용자에게 어떤 문제를 해결해주고 싶은가?” → 모호하지 않고 구체적으로 정의해야 함.  
  2) “그 문제 중 어떤 부분을 머신러닝으로 풀 수 있는가?” → 예: 사진을 라벨로 매핑하는 함수 학습.  
- 이를 구체화하려면 ML 컴포넌트에 대해 **loss function** 을 지정해야 한다.  
- 문제를 쪼개보면 일부는 전통적 SW 엔지니어링으로 해결 가능하고, 일부만 ML로 다뤄야 할 수 있다.  
- 학습 유형은 지도·비지도·강화·준지도(semisupervised)까지 연속선상에 있음.  
  - **Semisupervised learning**: 일부 라벨만 활용해 비라벨 데이터에서 더 많은 정보 추출.  
  - **Weakly supervised learning**: 부정확·노이즈 라벨을 사용.  
- 결론: **Noise와 label 부족은 “지도 ↔ 비지도” 사이의 연속체를 형성**한다.  

## Data collection & management (데이터 수집/관리)

- 데이터는 직접 제작, 크라우드소싱, 사용자 행동에서 수집 가능.  
- 부족할 때는 **transfer learning** 활용.  
- **Privacy 검토**와 동의, 공정성, **federated learning** 등 고려 필요.  
- **Data provenance**(출처 관리): 데이터 정의, 값의 범위, 생성 주체, 중단 여부, 정의 변경 이력 등 추적 → 파이프라인 안정성이 알고리즘보다 중요.  
- 항상 자문: “이 데이터는 내 문제를 풀기에 적절한가? 입력과 출력 모두 충분히 담고 있는가?”  
- **Learning curve** 로 데이터 확장 효과/학습 plateau 확인.  
- 방어적 태도 필요: 입력 오류, 누락, 적대적 사용자, 철자 불일치 등 처리.  
- **Data augmentation** (회전, 이동, 노이즈 추가 등)으로 모델 강건성 향상.  
- 불균형 데이터는 **undersampling, oversampling, SMOTE/ADASYN, boosting** 등으로 완화.  
- 아웃라이어는 로그 변환 등으로 영향 축소, 트리 모델은 상대적으로 강건.  

## Feature engineering (특징 엔지니어링)

- **Quantization**: 연속값을 구간(bin)으로 강제.  
- **One-hot encoding**: 범주형 속성을 다중 Boolean으로 변환.  
- 도메인 지식 기반 새 특성 추가 (예: 날짜 → 주말/공휴일 여부).  
- **“At the end of the day, some ML projects succeed and some fail… the most important factor is the features used.” (Pedro Domingos)**  

## Exploratory data analysis (EDA) & visualization

- 목표: 예측/검증이 아닌 **데이터 이해**.  
- **Histograms, scatter plots** 로 분포/결측/오류/이상치 확인.  
- 클러스터링 → 프로토타입 시각화, 이상치 탐지 (“고양이 vs 사자 옷 입은 고양이”).  
- 차원 축소 (예: **t-SNE**)로 고차 데이터를 2D/3D로 시각화.  

## Model selection & training

- 데이터가 정리되면 모델 구축 단계.  
- **Random forests** → 범주형 특징 많고 일부 무관할 때.  
- **Nonparametric methods** → 데이터 많고 지식 부족, 특징 선택 고민 줄이고 싶을 때.  
- **Logistic regression** → 선형 분리 가능(또는 feature engineering 후).  
- **SVM** → 데이터 크기 작고 차원 높을 때.  
- **Deep neural nets** → 패턴 인식(이미지·음성).  
- 하이퍼파라미터는 경험 + 탐색으로 조율.  
- 검증 데이터 남용 시 **validation overfitting** 위험 → 여러 검증셋 필요.  
- 성능 평가: **ROC curve, AUC, confusion matrix**.  
- 중요한 건 **아이디어–실험–검증 반복 사이클을 빠르게 하는 것**.  

## Trust, interpretability, explainability

- 단순히 지표 성능만으로는 신뢰 부족 → 규제·언론·사용자도 신뢰성 원함.  
- **Accountability:** 오류 발생 시 책임 주체와 항소 절차 필요.  
- **Interpretability:** 모델 내부를 직접 이해 (트리, 선형회귀).  
  - 핵심 질문: **“If I change x, how will the output change?”**  
- **Explainability:** 블랙박스 모델 + 별도 모듈로 설명 (예: LIME).  
- 단순 설명이 잘못된 확신을 줄 수 있음. → 테스트와 실제 성능이 더 큰 신뢰를 준다.  
- “안전하다고 설명만 있는 실험기 vs 100회 무사비행한 비행기” 비유.  

## Operation, monitoring, maintenance

- 운영 단계에서는 **롱테일 입력(long tail)** 문제 등장 → 예상 못한 입력 지속 발생. → 실시간 모니터링과 사람 평가자 필요.  
- **Nonstationarity:** 세상과 사용자 행동 변화 → 최신 데이터 vs 안정적 모델 트레이드오프.  
- 신선도 요구 다름: 어떤 문제는 매일/매시간 새 모델, 어떤 문제는 수개월 동일 모델.  
- 배포 자동화 → 작은 변경은 자동 승인, 큰 변경은 리뷰.  
- **Online vs Offline model**: 기존 모델 점진적 수정 vs 매번 처음부터 재학습.  
- 데이터 자체가 바뀔 수도 있음 (스팸 이메일 → 스팸 문자, 음성, 영상 등).  

## Checklist

### Tests for Features and Data

- [ ] Feature expectations are captured in a schema.
- [ ] All features are beneficial.
- [ ] No feature’s cost is too much.
- [ ] Features adhere to meta-level requirements.
- [ ] The data pipeline has appropriate privacy controls.
- [ ] New features can be added quickly.
- [ ] All input feature code is tested.

### Tests for Model Development

- [ ] Every model specification undergoes a code review.
- [ ] Every model is checked in to a repository.
- [ ] Offline proxy metrics correlate with actual metrics.
- [ ] All hyperparameters have been tuned.
- [ ] The impact of model staleness is known.
- [ ] A simpler model is not better.
- [ ] Model quality is sufficient on all important data slices.
- [ ] The model has been tested for considerations of inclusion.

### Tests for Machine Learning Infrastructure

- [ ] Training is reproducible.
- [ ] Model specification code is unit tested.
- [ ] The full ML pipeline is integration tested.
- [ ] Model quality is validated before attempting to serve it.
- [ ] The model allows debugging by observing the step-by-step computation of training or inference on a single example.
- [ ] Models are tested via a canary process before they enter production serving environments.
- [ ] Models can be quickly and safely rolled back to a previous serving version.

### Monitoring Tests for Machine Learning

- [ ] Dependency changes result in notification.
- [ ] Data invariants hold in training and serving inputs.
- [ ] Training and serving features compute the same values.
- [ ] Models are not too stale.
- [ ] The model is numerically stable.
- [ ] The model has not experienced regressions in training speed, serving latency, throughput, or RAM usage.
- [ ] The model has not experienced a regression in prediction quality on served data.

### Ref

- Breck, E., Cai, S., Nielsen, E., Salib, M., & Sculley, D. (2016). What’s your ML test score? A rubric for ML production systems. NIPS Workshop on Reliable Machine Learning in the Wild.
