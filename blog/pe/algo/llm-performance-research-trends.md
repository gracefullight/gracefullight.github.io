---
title: 대규모 언어 모델 성능 향상을 위한 연구동향
date: 2025-01-19T20:19:23.465+09:00
description: LLM Performance Research Trends
authors: me
tags:
  - pe
  - pe/algo
---

## LLM 모델 성능 개요

- LLM 기술은 언어 이해, 번역, 생성에서 뛰어난 성능을 발휘하며, 인간 전문가 수준의 문제 해결 능력을 가짐
- 논리적 추론 능력, 정보 정확성 부족, 모델의 단일 작업 최적화의 한계점 존재

## LLM 모델 성능 향상 방안

### LLM 논리적 사고 능력 향상 방안

| 접근 방식 | 설명 | 주요 기술/모델 |
| --- | --- | --- |
| CoT (Chain of Thought) | LLM이 복잡한 문제를 단계별로 풀이하도록 유도하여 논리적 추론을 강화하는 방법 | GPT-4, PaLM |
| | 수학 문제, 법적 논증 등 단계적 사고가 필요한 작업에서 성능 대폭 개선 | |
| ToT (Tree of Thought) | 문제를 계층적으로 분해하고 각 경로의 결과를 비교해 최적의 답을 찾는 기법 | Anthropic Claude |
| | 다양한 결과를 시뮬레이션하여 복잡한 의사결정 문제를 해결할 때 유리 | |
| Meta-Reasoning | LLM이 자신의 추론 과정을 평가하고 잘못된 부분을 스스로 교정하는 기법 | Self-Reflection, ReAct |
| | 자기반성과 재구성(ReAct)을 통해 고난도 문제에서 정밀도 향상 | |
| Mutual Reasoning | 두 개 이상의 모델이 협력하여 상호 검증과 보완을 통해 오류를 줄이는 방식 | rStar |
| | 각 모델이 상대방의 결과를 비판적으로 평가함으로써 신뢰성을 강화 | |

### LLM 정확도 향상 방안

| 접근 방식 | 설명 | 주요 기술 |
| --- | --- | --- |
| RAG (Retrieval-Augmented Generation) | 모델이 외부 데이터베이스에서 정보를 검색한 후 해당 데이터를 응답 생성에 통합하는 기법 | Bing GPT, OpenAI ChatGPT |
| | 고정된 훈련 데이터의 한계를 극복하며 최신성과 신뢰성을 강화 | |
| RIG (Retrieval-Integrated Generation) | 모델이 실시간으로 검색 엔진과 통합되어 정보를 검색한 후 이를 즉시 응답에 반영하는 기술 | Google Gemini |
| | 최신 정보 활용이 필요한 실시간 데이터 환경에 적합 | |
| 맥락 검색 (Context Retrieval) | 문서와 질문 간의 연관성을 높이기 위해 추가적인 맥락 정보 제공 | Anthropic Contextual BM25 |
| | 유사도 기반 검색과 고정밀 검색 알고리즘을 결합하여 정확도 극대화 | |

### LLM 기능 확장 방안

| 접근 방식 | 설명 | 주요 기술 |
| --- | --- | --- |
| 모델 병합 (Model Merging) | 서로 다른 LLM을 결합하여 다양한 작업을 동시에 수행할 수 있도록 하는 방법 | DARE, Evolutionary Merging |
| | 하나의 모델은 자연어 처리에, 다른 모델은 이미지 분석에 최적화 | |
| 모델 결합 (Model Combination) | LLM과 다른 파운데이션 모델(예: 이미지, 음성 모델)을 통합하여 멀티모달 작업을 지원 | Whisper+GPT, SeamlessM4T |
| | 음성 텍스트 변환(Whisper)과 자연어 응답(GPT)을 결합하여 음성 비서, 다중언어 번역 등에 활용 | |
| 어댑터 기반 결합 | 모델이 다양한 작업과 모달리티를 지원할 수 있도록 가볍고 모듈화된 어댑터를 추가하는 방식 | Conv-based 어댑터 |
| | 어댑터를 통해 특정 작업에 맞춘 빠른 조정이 가능하며, 대규모 재훈련 불필요 | |

## 참조

- [IITP: 주간기술동향 2159호](https://iitp.kr/kr/1/knowledge/periodicalViewA.it?searClassCode=B_ITA_01&masterCode=publication&identifier=1344)
