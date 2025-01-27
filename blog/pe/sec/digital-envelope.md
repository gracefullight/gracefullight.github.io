---
title: 전자봉투
date: 2025-01-27T10:22:35.321+09:00
description: Digital Envelope
authors: me
tags:
  - pe
  - pe/sec
---

## 전자봉투 개념

- 비밀키를 수신자의 공개키로 암호화하여 전송한 뒤 평문을 암호화하여 온라인에서 기밀성을 보장하는 암호화 기술
- 승인된 사용자만 메시지 복호화 가능 / 무결성, 부인방지 지원 / 대칭키 암호화

## 전자봉투 생성 매커니즘, 개봉 절차, 핵심 기술

### 전자봉투 생성 매커니즘

```mermaid
sequenceDiagram
    participant Sender as 송신자
    participant EnvelopeModule as 전자봉투 모듈
    participant Recipient as 수신자

    Sender->>EnvelopeModule: 데이터와 수신자 정보 제공

    note over EnvelopeModule: 대칭키 생성
    note over EnvelopeModule: 데이터 암호화
    note over EnvelopeModule: 데이터 해시 생성
    note over EnvelopeModule: 송신자의 개인키로 해시 서명

    EnvelopeModule->>Recipient: 수신자의 공개키 요청
    Recipient-->>EnvelopeModule: 수신자의 공개키 전달

    note over EnvelopeModule: 수신자의 공개키로 대칭키 암호화

    EnvelopeModule->>Sender: 전자봉투 전달<br/>(암호화된 대칭키 + 암호문 + 전자서명)
```

- 수신자의 공개키로 비밀키를 암호화한 전자봉투를 전송

### 전자봉투 개봉절차

```mermaid
sequenceDiagram
  participant Sender as 송신자
  participant Recipient as 수신자
  participant EnvelopeModule as 전자봉투 모듈

  Sender ->> Recipient: 인터넷으로 전자봉투 전송<br/>(암호화된 대칭키 + 암호문 + 전자서명)
  Recipient->>EnvelopeModule: 전자봉투 전달

  note over EnvelopeModule: 수신자의 비밀키로 대칭키 복호화
  note over EnvelopeModule: 복호화된 대칭키로 암호문 복호화
  note over EnvelopeModule: 데이터 해시 재생성
  note over EnvelopeModule: 송신자의 공개키로 서명 검증

  EnvelopeModule->>Recipient: 복호화된 데이터 + 서명 검증 결과
```

- 전자봉투를 통해 전자서명의 위조불가, 부인방지, 서명자 인증, 변경불가, 재사용 불가와 함께 기밀성 제공

### 전자봉투 핵심 기술

| 기술 | 설명 | 알고리즘 |
|---|---|---|
| 해시함수 | 단방향성과 충돌회피성을 활용하여 고정 길이의 메시지 다이제스트를 생성하는 방식 | MD5, SHA-256 |
| 대칭키 암호화 | 동일한 키(비밀키)를 이용해 암호화 및 복호화를 수행하는 방식 | DES, ARIA, SEED |
| 비대칭키 암호화 | 공개키와 비밀키를 이용해 서로 다른 키로 암호화와 복호화를 수행하는 방식 | RSA, 디피헬만 |
