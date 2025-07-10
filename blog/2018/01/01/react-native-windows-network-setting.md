---
title: 리액트 네이티브 윈도우 네트워크 설정 (react-native)
authors: me
tags:
  - react
  - javascript
date: 2018-01-01 23:50:31
---

리액트 네이티브로 개발한 앱을 `Expo`로 구동 중 `network response timed out` 에러 메세지가 보인다면 다음과 같이 해결하면 된다.

## 방화벽

인바운드로 19000, 19001 포트를 열어줘야한다.
**방화벽 > 고급 설정 > 인바운드 규칙 > 새 규칙 > 포트** 에서 아래와 같이 설정해주고 이름은 `react-native-expo` 등 원하는 이름으로 규칙을 생성하자.

![image from hexo](https://i.imgur.com/fQkG1tn.png)

## Hostname 설정

### 아이피 확인

ipconfig로 현재 Wifi가 설정된 내부 아이피 주소를 확인한다.

```bash
무선 LAN 어댑터 Wi-Fi:
  연결별 DNS 접미사. . . . :
  링크-로컬 IPv6 주소 . . . . :
  IPv4 주소 . . . . . . . . . : 192.168.0.7
  서브넷 마스크 . . . . . . . : 255.255.255.0
  기본 게이트웨이 . . . . . . : 192.168.0.1
```

**192.168.0.7** 을 기억해 놓자.

### 설정 추가

`REACT_NATIVE_PACKAGER_HOSTNAME` 환경 변수를 설정해줘야한다.

Git Bash 환경에서는 다음과 같다.

```bash
export REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.7
```

## 실행

`yarn start` 후에 Expo 앱으로 QRCode를 찍으면 정상적으로 실행이 가능하다.
