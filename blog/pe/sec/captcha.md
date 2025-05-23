---
title: 캡차
date: 2025-01-29T11:10:00.560+09:00
description: Completely Automated Public Turing test to tell Computers and Humans Apart
authors: me
tags:
  - pe
  - pe/sec
---

## 캡차 개념

- 인간을 구별할 수 있지만 컴퓨터는 구별하기 힘든 의도적인 이미지나 텍스트를 제시하여 봇이 접근하는 것을 방어하는 기술
- 웹사이트의 로그인, 회원가입, 댓글 작성, 투표 등에서 주로 사용

## 캡차 개념도, 유형, 보안 강화 방안

### 캡차 개념도

```mermaid
graph LR
    A[사용자 요청] -->|캡차 필요| B[캡차 문제 생성]
    B --> C{사용자 입력}
    C -->|정답 입력| D[검증]
    D -->|성공| E[요청 처리]
    D -->|실패| F[재시도 요청]
    
    subgraph "자동화 봇 탐지"
        B --> G[자동화 탐지 시스템]
        G --> H[비정상적인 패턴 차단]
    end
```

### 캡차 유형

| 구분 | 세부 유형 | 설명 |
| --- | --- | --- |
| 텍스트 방식 | 텍스트를 이미지화 | 사용자가 왜곡된 문자/숫자를 해독하여 입력 |
| | 질문 응답 | 간단한 수학 문제나 논리 문제를 풀도록 유도 |
| 오디오방식 | 입력텍스트를 오디오로 출력 | 시각 장애인을 위한 대체 방법으로, 음성으로 캡차 제공 |
| 이미지방식 | 이미지 분류 | 특정 조건에 맞는 이미지를 선택하도록 요구 |
| | 이미지 퍼즐 | "나는 로봇이 아닙니다" 체크박스, 퍼즐 조각 맞추기 |

### 캡차 보안 강화 방안

| 구분 | 방안 | 내용 |
| --- | --- | --- |
| 난독화 강화 | 텍스트 왜곡 및 노이즈 추가 | OCR(광학 문자 인식) 기술을 우회하기 어렵게 함 |
| 멀티모달 적용 | 이미지 + 오디오 조합 | 시각/청각 장애인을 고려하면서 보안성 강화 |
| 사용자 행동 감지 | 마우스 움직임 및 키 입력 분석 | 인간 사용자의 행동 패턴을 학습하여 봇 탐지 |
| AI 대응 | 동적 캡차 생성 | 캡차 패턴을 인공지능이 학습하지 못하도록 랜덤화 |
| 인증 연계 | MFA(다중 인증) 활용 | 로그인 과정에서 추가적인 보안 요소로 활용 |
