---
title: 네트워크 스위치
date: 2024-07-13T10:58:57.218+09:00
description: Network Switch
authors: me
tags:
  - pe
  - pe/nw 
---

## 스위치 개념

- 여러 ==컴퓨터나 장치를 서로 연결==하고 데이터 ==패킷을 올바른 목적지로 전달==하고, 데이터를 효율적으로 전달하기 위해 트래픽을 관리하기 위한 장치
- 효율적 데이터 전달, ==브로드캐스팅 트래픽 감소==, QoS 지원, 네트워크 확장성, 보안 강화

## 스위치 유형, L4-L7 스위치 비교, 알고리즘

### 스위치 유형

| 구분 | 유형 | 설명 |
| --- | --- | --- |
| L7 어플리케이션 계층 | L7 스위치 | 콘텐츠 기반 라우팅, 고급 로드밸런싱 |
| L4 전송 계층 | L4 스위치 | TCP/UDP 포트 기반 라우팅, 세션 처리 |
| L3 네트워크 계층 | L3 스위치 | IP 주소 기반 패킷 전달 |
| L2 데이터링크 계층 | L2 스위치 | MAC 주소 기반 프레임 전달 |

### L4-L7 스위치 비교

| 구분 | L4 스위치 | L7 스위치 |
| --- | --- | --- |
| 동작계층 | 전송계층 | 응용계층 |
| 기준 | TCP/UDP 포트 | 어플리케이션 프로토콜 |
| 기능 | 로드밸런싱 | 컨텐츠 스위칭, 로드밸런싱, 가속 |
| 장점 | 단순, 성능 | QoS, 보안, 트래픽 제어 |
| 단점 | 컨텐츠 확인 불가 | 느림, 복잡 |

### 스위치 라우팅 알고리즘

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| Round Robin | - | - |
| Least Connection | - | - |
| Least Response Time | - | - |
| Hash Based | - | - |

## 스위치 고려사항

- 네트워크 규모와 트래픽에 따라 적절한 포트 수와 스위치 성능 선택 필요
