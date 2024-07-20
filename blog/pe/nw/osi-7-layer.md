---
title: OSI 7 레이어
date: 2024-05-04T16:03:22.755+09:00
description: OSI 7 레이어 설명
authors: me
tags:
  - pe
  - pe/nw
---

## OSI 7 레이어 개념

- Open Systems Interconnection Reference Model
- ISO 에서 제시한 표준화된 네트워크 기본 모델
- 프로토콜 계층화
  - 계층별 기능 분담
  - 확장성과 유연성 확보

## OSI 7 레이어 개념도, 구성

### OSI 7 레이어 개념도

![OSI 7 레이어](/img/pe/osi-7.webp)

- 같은 계층간 논리통신을 제공하기 위하여 터널링 기법(가상통신, Peer to Peer)을 사용
- 하부 계층 내려갈 때는 캡슐화, 그 반대는 역캡슐화 가정

### OSI 7 레이어 구성

> 물데네전세표응

| 계층       | 용도                                    | 대표프로토콜      | 전송단위 |
| ---------- | --------------------------------------- | ----------------- | -------- |
| 응용       | 최종 사용자와 인터페이스                | HTTP, SMTP        | 데이터   |
| 표현       | 프로토콜/데이터 변환, 암호화            | ASCII, MPEG, JPEG | 데이터   |
| 세션       | 대화의 동기 위한 SLA                    | RPC, TLS, SSH     | 메세지   |
| 전송       | 응용 간 논리적 통로 제공                | TCP, UCP, SCTP    | 세그먼트 |
| 네트워크   | 망 통한 호스트간 통로, 라우팅 경로 설정 | IP, ICMP, ARP     | 패킷     |
| 데이터링크 | 인접 노드간 링크 제공, 포워딩           | PPP, L2TP         | 프레임   |
| 물리       | 전기적, 기계적 수단 제공, 비트스트림    | 이더넷, Wi-Fi     | Bit      |

## OSI 7 레이어와 TCP/IP와의 비교

| TCP/IP 비교                            | 프로토콜 구조                                     |
| -------------------------------------- | ------------------------------------------------- |
| ![tcp/ip](/img/pe/osi-tcp-hybrid.webp) | ![tcp/ip protocol](/img/pe/osi-tcp-protocol.webp) |

- TCP/IP는 인터넷 구현을 위한 프로토콜로 Defacto 표준.
- OSI 7 레이어는 컴퓨터 구조를 포함하므로 실제는 TCP/IP의 Hybrid 모델로 구현.

## 참조

- [Cloudflare: What is the OSI Model?](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)
- [Cisco: The TCP/IP and OSI Networking Models](https://www.ciscopress.com/articles/article.asp?p=1757634&seqNum=2)
