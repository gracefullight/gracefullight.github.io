---
title: Socket, TCP, HTTP, Websocket 통신
date: 2024-07-19T20:57:14.108+09:00
description: Socket, TCP, HTTP and Websocket Communication
authors: me
tags: 
  - pe
  - pe/nw
---

## 소켓 통신의 개요

### 소켓 통신의 개념

```mermaid
graph LR
  소켓 --> |신뢰성| TCP --> |웹 요청,응답 지원\n비연결, 무상태성| HTTP --> |실시간\n양방향| 웹소켓
```

- 네트워크 상에서 서로 다른 시스템 간에 데이터를 송수신할 수 있게하는 인터페이스 제공
- IP, Port를 활용하여 통신연결 설정

### 소켓 통신의 특징

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| 양방향 통신 | 데이터 양방향 송수신 가능 | 다양한 데이터 타입 |
| 실시간성 | 연결이 유지되는 동안 실시간 송수신 | 지연시간 최소화 |
| 프로토콜 독립적 | 다양한 네트워크 프로토콜 사용 가능 | TCP, UDP |

## TCP 소켓 구성도, 특징

### TCP 소켓 구성도

```mermaid
sequenceDiagram
    participant Client
    participant Server

    rect rgba(0, 0, 0, 0.1)
    Note right of Client: 3-Way Handshake
    Client->>Server: SYN
    Server->>Client: SYN-ACK
    Client->>Server: ACK
    end

    Note right of Client: Connection Established

    Client->>Server: Data [Window=1000]
    Client->>Server: Data
    Server->>Client: ACK

    rect rgba(0, 0, 0, 0.1)
    Note right of Client: 4-Way Handshake
    Client->>Server: FIN
    Server->>Client: ACK
    Server->>Client: FIN
    Client->>Server: ACK
    end
```

### TCP 소켓 특징

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| 신뢰성 | 데이터 손실 없이 정확히 전달 보장 | 순서보장 |
| 연결지향 | 통신 전 연결 설정 후 종료까지 유지 | 재연결 오버헤드 |
| 흐름제어 | 데이터 흐름제어로 수신자 처리속도 맞춤 설정 | 송수신 속도 불일치 해결 |

## HTTP 개념, 실시간 통신 기법

### HTTP 개념

- 요청, 응답 단일요청을 위해 비연결성, 무상태성, 효율성 특징
- 실시간 데이터 통신을 위해 폴링, 롱폴링 기법 사용

### HTTP 실시간 통신 기법

- HTTP 헤더 및 커넥션 오버헤드 증가로 HTML5에서 웹소켓으로 표준화 진행

#### 폴링

```mermaid
sequenceDiagram
    participant Client
    participant Server

    loop Polling
        Client->>Server: HTTP GET /data
        Server-->>Client: HTTP 200 OK /data
    end
```

#### 롱폴링

```mermaid
sequenceDiagram
    participant Client
    participant Server

    loop Long Polling
        Client->>Server: HTTP GET /data
        alt New Data Available
            Server-->>Client: HTTP 200 OK /data
        else No New Data
            Server-->>Client: HTTP 204 No Content /data
        end
    end
```

## 웹소켓

```mermaid
sequenceDiagram
    participant Client
    participant Server

    rect rgba(0, 0, 0, 0.1)
    Note right of Client: TCP Handshake
    Client->>Server: SYN
    Server->>Client: SYN-ACK
    Client->>Server: ACK
    end

    rect rgba(0, 0, 0, 0.1)
    Note right of Client: TLS Handshake
    Client->>Server: Client Hello
    Server->>Client: Server Hello, Certificate, Server Hello Done
    Client->>Server: Client Key Exchange, Change Cipher Spec, Finished
    Server->>Client: Change Cipher Spec, Finished
    end

    rect rgba(0, 0, 0, 0.1)
    Note right of Client: WebSocket Handshake
    Client->>Server: HTTP GET /chat (Upgrade: websocket)
    Server->>Client: HTTP 101 Switching Protocols
    end

    rect rgba(0, 0, 0, 0.1)
    Note right of Client: WebSocket Data Transmission
    Client->>Server: WebSocket Frame: "Hello"
    Server->>Client: WebSocket Frame: "Hello, Client"
    Client->>Server: WebSocket Frame: "Goodbye"
    Server->>Client: WebSocket Frame: "Goodbye, Client"
    Client->>Server: WebSocket Close Frame
    Server->>Client: WebSocket Close Frame
    end
```

- 전이중통신, 지속연결, 확장성
- 초기 핸드쉐이킹 비용이 크므로 DNS캐시, TLS 인증서 캐시, HSTS 등 연결 비용 감소 기법 활용
