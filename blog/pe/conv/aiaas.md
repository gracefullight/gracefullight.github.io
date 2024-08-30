---
title: AIaaS
date: 2024-08-26T07:46:49.399+09:00
description: AI as a Service
authors: me
tags:
  - pe
  - pe/conv
---

## AIaaS 개념

```mermaid
graph LR
  PaaS --> |모델| AIaaS
  Saas --> |LLM| AIaaS
```

- AI 학습, 모델링, 자연어처리, CV, 음성인식 등의 AI 기술을 온디맨드로 제공하는 클라우드 서비스 모델

## AIaaS 서비스 구성도, 서비스 유형, 적용사례

### AIaaS 서비스 구성도

```mermaid
graph LR
  subgraph AIaaS_Platform[AIaaS 플랫폼]
    direction LR
    ML서비스
    NLP서비스
    CV서비스
    음성인식서비스
    LL서비스
  end

  사용자((사용자)) --> |API 호출, 관리, 모니터링| AIaaS_Platform --> |분석, 저장| 클라우드스토리지[(클라우드 스토리지)]
```

### AIaaS 서비스 유형

| 유형 | 내용 | 비고 |
| --- | --- | --- |
| AIaaS 플랫폼 | AI모델 개발, 학습, 배포, 관리 | CSP 사용 |
| ML 서비스 | 머신러닝 모델 학습, 예측, 분류, 평가 | 인공신경망 |
| NLP 서비스 | 텍스트 분석, 번역, 감정분석 | 챗봇 |
| CV 서비스 | 이미지 분석, 비디오 분석, 인식 | YoLo |
| 음성인식 서비스 | STT, 음성 분석 | DeepSpeech |
| LLM 서비스 | 생성형 AI 서비스 제공 | Llama |

### AIaaS 적용사례

- ChatGPT
- Copilot
- Gemini

## AIaaS 고려사항

- 비용, 성능
- 데이터 프라이버시, 폐기 정책
