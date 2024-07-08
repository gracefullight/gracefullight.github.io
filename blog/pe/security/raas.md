---
title: RaaS, Ransomware as a Service
date: 2024-07-08T21:52:18.071+09:00
description: Ransomware as a Service
authors: me
tags: 
  - pe
  - pe/security 
---

## 랜섬웨어의 개념

- 몸값(Ransome)과 소프트웨어의 합성어로 시스템을 감염시커 사용 불가능한 샅애로 만들거나, 데이터를 암호화해 사용할 수 없게한 뒤 금전을 요구하는 악성프로그램
- 다크웹 등 익명 N/W를 통해 누구나 랜섬웨어를 의뢰, 구매하여 공격에 활용할 수 있는 RaaS 형태로 진화

## RaaS의 매커니즘, 공격절차, 대응방안

### RaaS의 매커니즘

```mermaid
graph LR
  제작자((제작자))
  RaaS플랫폼
  다크웹
  공격자((공격자))
  피해자((피해자))

  제작자 -->|1. 제작| RaaS플랫폼
  제작자 -->|등록| 다크웹
  공격자 -->|2. 구매| 다크웹
  공격자 -->|3. 공격| 피해자
  공격자 -->|4. 수익배분\n5.업데이트제공| RaaS플랫폼
```
