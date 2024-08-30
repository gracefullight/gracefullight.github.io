---
title: OTT
date: 2024-08-30T17:43:40.478+09:00
description: Over The Top
authors: me
tags: 
  - pe
  - pe/conv
---

## OTT 개념

- 인터넷을 통해 미디어 콘텐츠를 제공하는 서비스로 셋탑박스 유무에 상관없이 다양한 기기를 통해 콘텐츠에 접근 가능

## OTT 구성도, 구성요소, 서비스 사업자 유형

### OTT 구성도

```mermaid
graph LR
  CP[Content Provider]
  CMS[Content Management System]
  CDN[Content Delivery Network]
  user((사용자))

  CP --> CMS --> CDN --> user
```

### OTT 구성요소

| 구분 | 내용 | 비고 |
| --- | --- | --- |
| CP | 콘텐츠 구매, 자체 제작 | 다양한 콘텐츠 확보 |
| CMS | 콘텐츠 메타데이터 관리, 송출 | DRM, 추천, 압축 |
| CDN | 콘텐츠의 효율적인 스트리밍 | 지역 캐싱 |

### OTT 서비스 사업자 유형

## OTT 고려사항

| 구분 | 목적 | 비고 |
| --- | --- | --- |
| 네트워크 안정성 | 압축, 효율, 비용절감 | H265, H266 |
| 인터페이스 디자인 | 디지털 역기능 방지 | 접근성, 사용성 |
| 지역기반 캐싱서버 | ISP와의 상생 | 망사용료 이슈 대응 |
