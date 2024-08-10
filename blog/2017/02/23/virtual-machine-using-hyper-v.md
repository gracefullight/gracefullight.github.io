---
title: "Hyper-V를 사용한 VM 실행"
authors: me
tags: [windows]
date: 2017-02-23 13:53:08
---

윈도우에서 테스트용으로 사용할 서버가 필요하다.
Ubuntu, CentOS 환경을 구축한다던지, 여러 서버 프로그램을 테스트해본다던지..
가장 유명한 프로그램은 VMware이지만 유료이다. VirtualBox도 있지만 느리다.
그렇다면 다른 대안이 무엇이 있을까?

바로 Windows10을 쓰고 있다면 사용할 수 있는 Hyper-V 가상화 기술이다. (아쉽지만 Home Edition은 지원하지 않는다.)

속도면에서 느리지는 않을까? 서버 실행에 가장 많은 부하를 주는 [I/O의 테스트 결과](http://www.td21.com/bbs/2900)가 있다.

## Hyper-V 설정

### 지원 확인

cmd 또는 powershell을 열어 systeminfo.exe를 실행하자.

```bash
systeminfo.exe
```

결과 화면 중 아래 부분에

> **Hyper-V 요구사항**
>
> - VM 모니터 모드 확장 : 예
> - 펌웨어 가상화 사용: 예
> - 두 번재 수준 주소 변환: 예
> - 데이터 실행 방지 사용 가능: 예

처럼 표시되면 Hyper-V를 지원하는 컴퓨터이다.
그렇지 않다면 재부팅 후 BIOS로 접근해 Advanced 탭으로 이동한 후 옵션을 켜준다.

1. Intel Virtualization Technology 기능을 활성화
2. VT-d 옵션 활성화 (있는 경우)

### 활성화

**제어판 > 프로그램 및 기능 > Windows 기능 켜기/끄기 메뉴**로 이동한다.
![image from hexo](https://i.imgur.com/ryLmhrV.png)
Hyper-V 관련 기능을 체크해주고 **확인** 버튼을 눌러 다시 시작하자.

## 가상 컴퓨터 실행

### CentOS 다운로드

[CentOS 7 이미지](http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1611.iso)를 다운로드 받는다.
[kakao mirror](http://ftp.daumkakao.com/centos/7/isos/x86_64/)를 이용해도 된다.

### 가상 네트워크 생성

**시작 > Hyper-V 검색 > Hyper-V 관리자**로 이동한다.
![image from hexo](https://i.imgur.com/27U0Ffk.png)

**가상 스위치 관리자 > 외부 > 가상 스위치 만들기** 버튼으로 가상 스위치를 생성한다.
생성 후 이름 변경 및 연결할 외부 네트워크를 선택해주자.
![image from hexo](https://i.imgur.com/6ks2IGU.png)

### 가상 컴퓨터 생성

**새로만들기 > 가상 컴퓨터** 버튼을 클릭해 가상 컴퓨터 마법사로 가상 머신을 생성한다.
2세대로 생성해주자.

**네트워킹 구성** 탭에서는 금방 만들었던 가상 네트워크를 선택한다.
![image from hexo](https://i.imgur.com/2RZOkGZ.png)

**가상 하드디스크 연결** 탭에서는 물리적으로 어디에 저장할지 선택해준다.
![image from hexo](https://i.imgur.com/g8RPeBN.png)

**설치 옵션** 탭에서는 다운받았던 CentOS 이미지 파일을 선택한다.
![image from hexo](https://i.imgur.com/mcyzRmE.png)

### 보안 부팅 해제

**생성된 가상 컴퓨터의 옵션 > 보안 부팅** 탭에서 **보안 부팅 사용 체크박스를 해제**한다.
![image from hexo](https://i.imgur.com/z4HMHTk.png)

보안 부팅은 권한 없는 펌웨어, 운영 체제 또는 UEFI 드라이버(옵션 ROM)가 부팅 시 실행되지 않도록 하는 기능인데 켜주면 오류가 발생한다.

### 실행

만들어진 가상컴퓨터를 실행해 CentOS 설치를 진행하면 된다!
설치가 다 되고 쉘이 보이면 네트워크 서비스를 실행한다.

```bash
$ vi /etc/sysconfig/network-scripts/ifcfg-eth0

## onboot 속성을 yes로 변경해준다.
ONBOOT=yes

$ service network start
```

이제 yum을 활용해 서버를 구성하는 일만 남았다.

## 오류

잘 실행되던 가상서버가 **하이퍼바이저가 실행되고 있지 않으므로 가상 컴퓨터를 시작할 수 없습니다** 라는 오류를 뱉으며 실행이 되지 않을 경우 CMD 창에서 아래 명령어를 날리고 재부팅을 한다.

```bash
bcdedit /set hypervisorlaunchtype auto
```
