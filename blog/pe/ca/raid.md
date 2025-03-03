---
title: RAID
date: 2024-06-30T20:15:24.181+09:00
description: Redundant Array Independent Disks
authors: me
tags:
  - pe
  - pe/ca 
---

## RAID의 개념

- 디스크의 안정성과 성능을 위해 여러 개의 개별 디스크를 연결하여 대용량 디스크를 구성하는 기술
- 가용성 Fault Tolerant, 유지보수성 Hot-Swap, 고속 I/O Striping, 안정성 Mirroring, Parity Check, 확장성

## RAID의 유형, RAID5, RAID6 비교

### RAID의 유형

| 구분 | 개념도 | 특징 | 최소 디스크 수 |
| --- | --- | --- | --- |
| RAID0 | ![raid0](./assets/raid0.jpg) | 데이터 분산 저장, 스트라이핑, FT없음, 저비용, 고성능 | 2 |
| RAID1 | ![raid1](./assets/raid1.jpg) | 데이터 중복 저장, 미러링, 가장 안정적, 고비용 | 2 |
| RAID2 | | 해밍코드, 다수 패리티 디스크, 사용안함 | 3 |
| RAID3 | | 별도 패리티 디스크, 사용안함 | 3 |
| RAID4 | | 블록단위 별도 패리티 디스크, 사용안함 | 3 |
| RAID5 | ![raid5](./assets/raid5.jpg) | 패리티 스트라이핑, 데이터 무결성 보장 | 3 |
| RAID6 | ![raid6](./assets/raid6.jpg) | 이중 패리티 스트라이핑, 높은 신뢰성 | 4 |
| RAID01 | ![raid01](./assets/raid01.jpg) | 스트라이핑 후 미러링, 장애시 전체 복구, 고성능, 안정성 | 4 |
| RAID10 | ![raid10](./assets/raid10.jpg) | 미러링 후 스트라이핑, 손실된 데이터만 복구, 높은 안정성, 실무사용 | 4 |

- RAID50은 최소 디스크 6개 필요

### RAID5, 6 비교

| 구분 | RAID5 | RAID6 |
| --- | --- | --- |
| 개념도 | ![raid5](./assets/raid5.jpg) | ![raid6](./assets/raid6.jpg) |
| 최소 디스크 수 | 3개 | 4개 |
| 고장 허용 디스크 | 1개 | 2개 |
| 패리티 수 | 1 | 2 |
| 장점 | 저장효율성, 관리 용이성, 빠른 읽기 성능, 적절한 쓰기 성능 | 이중 디스크 장애허용, 높은 내결함성, 안정성 |
| 단점 | 복수 디스크 손상시 데이터 손실 | 느린 쓰기 성능, 복잡한 구현 |

## RAID 적용시 고려사항

- RAID는 백업이 아니므로, RTO, RPO를 고려한 별도의 증분 백업 전략 수립
