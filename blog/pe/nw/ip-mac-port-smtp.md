---
title: IP, MAC, Port, SMTP
date: 2024-07-21T15:36:44.065+09:00
description: Internet Protocol, Medium Access Control Address, Port, Simple Mail Transfer Protocol
authors: me
tags: 
  - pe
  - pe/nw
---

## 전자메일 전송 과정 개요

```mermaid
graph LR
  IP주소 --> |ARP| MAC주소 --> |데이터전송| 포트25 --> |SMTP| 전자메일주소
```

- 메일 클라이언트로 메일 전송시 SMTP 서버의 IP주소와 포트로 서버 연결, 네트워크 IP주소에 해당하는 MAC주소를 찾아 패킷을 전송하고, 수신자의 전자메일 주소로 최종 배달

## IP, MAC, Port, 전자메일 주소 설명

| 계층 | 구분 | 내용 |
| --- | --- | --- |
| L7 | 전자메일 주소 | 전자메일을 받는 개인, 조직을 식별하기 위한 주소 |
| L4 | 포트 | IP 위에서 어플리케이션 상호 구분을 위해 사용하는 번호 |
| L3 | IP | 호스트, 라우터 간 패킷 전달을 위해 사용하는 주소체계 |
| L2 | MAC | 물리적으로 연결된 노드 간 프레임 전송을 위한 주소체계 |

## SMTP 메일 전송 과정

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Note right of Client: Connection Request
    rect rgba(0, 0, 0, 0.1)
    Client->>Server: TCP 연결 요청
    Server-->>Client: 220 OK
    end
    
    Note right of Client: Mail Information Exchange
    rect rgba(0, 0, 0, 0.1)
    Client->>Server: HELO/EHLO
    Server-->>Client: 250 OK
    Client->>Server: MAIL FROM:<주소>
    Server-->>Client: 250 OK
    Client->>Server: RCPT TO:<주소>
    Server-->>Client: 250 OK
    end
    
    Note right of Client: Mail Data Transmission
    rect rgba(0, 0, 0, 0.1)
    Client->>Server: DATA
    Server-->>Client: 354 Start
    Client->>Server: 메일 내용 전송
    Client->>Server: .
    Server-->>Client: 250 OK
    end

    Note right of Client: Connection Termination
    rect rgba(0, 0, 0, 0.1)
    Client->>Server: QUIT
    Server-->>Client: 221 Bye
    end
```

| 단계 | 내용 | 비고 |
| --- | --- | --- |
| 연결 설정 | 서버의 SMTP 포트로 TCP 연결 | 연결 수락 |
| 메일 정보 전송 | HELO/EHLO 명령으로 인사 후 메일 주소 교환 | 각 명령에 OK 수신 |
| 메일 데이터 전송 | DATA 전송 후 헤더, 본문 전송, `.` 전송 후 본문 마침 | 354 Start, 250 OK |
| 연결 종료 | QUIT 명령 수신 후 연결 종료 | 221 Bye |
