---
title: 3-상태 버퍼
date: 2024-07-06T15:33:10.505+09:00
description: Tri-State Buffer
authors: me
tags:
  - pe
  - pe/ca 
---

## 3-상태 버퍼의 개념

- 디지털 회로에서 사용되는 논리게이트의 한 종류로, 일반적인 0과 1의 논리 상태 외에 ==High Impedance== (Z) 상태를 가질 수 있는 ==버퍼게이트==이며 고 임피던스 상태에서는 회로에서 ==연결이 끊어진 것처럼 동작==하여, 다른 장치 출력에 영향을 주지 않고 버퍼의 출력 제어
- 회로 간 ==전기적 분리==가 가능하므로, 여러 장치가 동일한 데이터 ==버스==를 효과적으로 ==제어== 가능

## 3-상태 버퍼의 구성도, 구성요소, 적용방안

### 3-상태 버퍼의 구성도

![tri-state-buffer](./assets/tri-state-buffer.jpg)

### 3-상태 버퍼의 구성요소

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| 입력 | 입력 신호를 받는 단자 | 입력 신호 인입 |
| 출력 | 입력 신호를 출력으로 내보내는 단자 | 출력 신호 출력 |
| ==제어== | 버퍼의 상태를 제어하는 단자 | High/Low Impedance |

### 3-상태 버퍼의 적용방안

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| 데이터 ==버스 제어== | 여러 장치가 공유하는 데이터 버스에 연결하여 특정 시간에만 데이터 전송 | 버스 충돌 방지 |
| ==메모리== 인터페이스 | 메모리 칩 선택 및 데이터 입출력 제어 | 주소 디코더 활용하여 특정 메모리 칩만 활성화 |
| ==주변장치== 인터페이스 | 주변 장치가 데이터를 보낼 준비가 되었을 때만 버퍼 활성화 | 주변 장치와의 데이터 수신 |

## 3-상태 버퍼 고려사항

- 고임피던스 상태일 때 전류 소모가 적지만, 활성화 상태에서는 전류 소모가 발생할 수 있으므로 ==전력 관리==가 필요
