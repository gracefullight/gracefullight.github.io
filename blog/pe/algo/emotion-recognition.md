---
title: 감정 인식 기술
date: 2024-10-05T12:17:07.740+09:00
description: Emotion Recognition
authors: me
tags:
  - pe
  - pe/algo
---

## 감정 인식 기술 개념

- 자연어로 전달되는 감정을 분류하는 감정 분석 대비 표정, 음성, 자세 등을 관찰하여 광범위한 감정상태를 식별하는 기술
- 감정 임베딩과 대화형 봇 감정 인식 기술을 통해 다양한 상황과 사용자 요구 대응

## 감정 인식 기술 유형, 활용 분야

### 감정 임베딩 기술 유형

| 구분 | 설명 | 관련 기술 |
| --- | --- | --- |
| 감정 단어 임베딩 | 감정 정보를 단어 임베딩으로 임베딩하는데 중점 | Emo2Vec, SSWE |
| 이모티콘 임베딩 | 감정을 표현하기 위해 채팅 메세지 내부 이모티콘을 임베딩 | Emoji2Vec, DeepMoji |
| 다중감정 인식용 단어 인베딩 | 여러 감정 레이블을 동시 할당하여 감정을 더 자세히 설명 | 다중라벨분류, SGM |

### 대화형 봇  감정 인식 기술 유형

| 구분 | 설명 | 비고 |
| --- | --- | --- |
| 앙상블 모델 기반 감정인식 | 여러 개별 모델을 결합하여 포괄적, 강인한 모델 구성 | 주요 감정 모델 간 가중 평균 처리 |
| 지식 표현 기반 감정인식 | 사전 지식에 정서어휘, 상식, 언어패턴, 정서의미규칙 등 포함하여 표현향상 | 어휘기반 감성 지식 통합 |
| 감정인식 위한 전이학습 | 부족한 훈련 데이터 문제 완화, 유도적 전이학습 사용 | 순차전이학습, 다중작업학습 |
| 이모티콘수용 감정인식 | 이모티콘 기반에 SVM 등 분류기로 감정 주석 추가 | 이모티콘 포함 텍스트 희소 |
| 맥락이해기반 감정인식 | 상황적 표현 학습 위해 발화 및 컨텍스트 수준에서 셀프 어텐션 사용 | GPT-4o 등 LLM |

### 감정 인식 기술 활용분야

| 구분 | 활용분야 | 비고 |
| --- | --- | --- |
| 공공 | SNS 공개 데이터 분석, 감정 모니터링 자살예방, 테러리스트 탐지 | 범죄예방, 안전 |
| 의료 | 긴급 상황에서 환자의 감정 예측 | 환자 의도 파악 |
| 민간 | 대화형 봇 감정인식 활용 감정기반 응답시스템 구축 | 고객응대, 마케팅 |

## 감정 인식 기술 고려사항

- 사용자 데이터의 최소 수집 및 목적 제한을 위한 법, 제도 마련 필요
