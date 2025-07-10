---
title: Hyper-V Virtual Eternet 네트워크 제거
authors: me
tags:
  - windows
date: 2018-12-23 22:43:37
---

windows RS4, RS5 업데이트 이후로 Hyper-V 가 켜있으면 블루스크린이 발생한다.
에러 내용은 `vmswitch.sys driver_irql_not_less_or_equal` 또는 `kernel security check failed` 였다.

간헐적으로 발생되는 거라 시한폭탄을 들고 있는 거와 같다고 느껴져서,
이번 기회에 가상화는 맥북에서만 이용하려고 Hyper-V 를 모두 제거해봤다.

## Hyper-V 제거

### Docker for Windows 제거

Docker for Windows 를 먼저 제거한다.

### 남아있는 가상서비스 제거

Hyper-V 관리자에서 남아있는 가상 컴퓨터를 모두 삭제한다.

### 기능 제거

윈도우 실행에서 **OptionalFeatures**를 치면 바로 **Windows 기능 켜기/끄기** 메뉴로 들어가진다.
Hyper-V 를 Disable 시키고 재부팅 2번을 기다리자.

## 네트워크 초기화

### 가상 네트워크 제거

위의 상태로 제거해도 **네트워크 > 속성 > 어댑터 설정** 에는 Hyper-V virtual Eternet 이 보이는데,
**장치관리자 > 네트워크 어댑터** 에서 직접 삭제해주면 된다.

장치관리자는 윈도우 실행에서 **devmgmt.msc** 치면 바로 들어갈 수 있다.

### 이더넷 재설정

가상 스위치를 제거하면 인터넷이 아예 끊겨버리는데, 이더넷을 원래 상태로 복원하면 된다.
이더넷 설정에서 **Hyper-V Extensible Virtual Switch** 를 체크 해제하고 확인 버튼을 누른다.

![image from hexo](https://i.imgur.com/WgGtGF2.png)

재부팅하고 클린한 네트워크 환경을 맞아보자.

## 이슈

systeminfo 입력 후 OS 버전이 17763 버전일 경우 Docker for windows의 설치가 아예 되지 않는 듯 싶다.

```ps
PS1 > systeminfo
```
