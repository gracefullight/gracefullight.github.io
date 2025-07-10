---
title: Pi-hole과 라즈베리파이로 모든 광고 차단하기
authors: me
tags:
  - pihole
  - linux
  - raspberry
date: 2019-04-17 23:07:03
---

## 앞서

유튜브 광고가 많아졌다. 명색이 프로그래머인데 AdGuard를 정액제로 사용하고 싶지 않았다.
이 문서엔 없지만 피캡을 구현해보고 싶었다.

### 기기 구매

라즈베리파이3 B+ 스타터킷을 구매한다. 아래 재료가 있을 경우 빼고 구매해도 된다.

- SD 카드 리더기
- 5핀 충전기
- 라즈베리파이용 방열판
- 라즈베리파이 케이스

## 환경설정

### 포맷

SD 카드를 비워주기위해 파워쉘이나 CMD를 관리자 모드로 접근한다.

```ps1
PS > diskpart

DISKPART > list disk
DISKPART > select disk ${SD_CARD_DRIVE_NUMBER}

DISKPART > clean
```

### 라즈비안

운영체제인 [Raspbian Stretch Lite](https://www.raspberrypi.org/downloads/raspbian/) 버전을 다운로드한다.
데비안 기반이다.

### etcher

컴퓨터에 SD 카드용 이미지 굽는 [프로그램](https://github.com/balena-io/etcher)을 설치한다.

다운로드된 라즈비안과 etcher로 이미지를 굽는다.
직관적이라 1, 2, 3 선택하듯이 설치하면 된다.
도중에 깨질 경우 다시 포맷한다.

### ssh 접근

이미지 설치 후 다시 USB 를 인식시키면 Boot drive 가 보이는데 접근 후 루트에 **ssh** 란 이름의 터치파일을 만들어준다.

```bash
touch ssh
```

이 파일이 있어야 ssh 접근이 가능하다. 공유기에 꼽고 내부아이피 확인하자.

```bash
## ssh 접근
$ ssh pi@YOUR_RASPBERRY_INTERAL_IP

## 초기 비밀번호는 raspberry 이다.
```

## 패키지 설치

부팅 후 `apt-get` 을 사용할 시간이다.

```bash
sudo apt-get upgrade -y && sudo apt-get update
```

### vim

vim 도 없다.

```bash
sudo apt-get install vim
```

### oh-my-zsh

```bash
sudo apt-get install zsh
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

**agnoster theme**, **zsh-syntax-highlighting**, **zsh-autosuggestion** 세팅해주자.

## pi-hole

이제 파이홀을 설치할 수 있다.

라즈베리파이를 유선연결했으니 **eth0** 인터페이스만 잘 체크해주면, 나머진 기본옵션으로 다음 다음만 해주면 된다.

```bash
$ sudo curl -sSL https://install.pi-hole.net | bash

## 비밀번호 변경
$ sudo pihole -a -p
```

### dns-encrypt

이왕 DSN 가로채는 거 암호화도 해주자.
[매뉴얼](https://github.com/pi-hole/pi-hole/wiki/DNSCrypt-2.0) 내용을 정리했다.

```bash
$ cd /opt

## 설치
$ sudo wget https://github.com/jedisct1/dnscrypt-proxy/releases/download/2.0.22/dnscrypt-proxy-linux_arm-2.0.22.tar.gz

## 폴더 생성
$ sudo tar -xf dnscrypt-proxy-linux_arm-2.0.22.tar.gz
$ sudo mv linux-arm dnscrypt-proxy && cd dnscrypt-proxy

## 기본 설정 복사
$ sudo cp example-dnscrypt-proxy.toml dnscrypt-proxy.toml

## 설정 변경
$ sudo vi dnscrypt-proxy.toml

## 이 세 옵션을 찾아서 변경해준다.
server_names = ['dnscrypt.nl-ns0']
## 기본 53번 포트는 pi-hole에서 쓰고 있다.
listen_address = ['127.0.0.1:54', '[::1]:54']
require_dnssec = true

## 서비스 등록
$ sudo ./dnscrypt-proxy -service install

## 시작
$ sudo ./dnscrypt-proxy -service start

```

[dnscrypt.nl-ns0](https://dnscrypt.nl/) Public DNSCrypt 서버이다.
다른 서버는 [여기](https://github.com/dyne/dnscrypt-proxy/blob/master/dnscrypt-resolvers.csv)를 참조하자. 일본이나 싱가폴 쪽에 있으면 좋을텐데 아쉽다.

### Upstream DNS 변경

관리자 화면의 **Settings > DNS > Upstream DNS Servers** 탭에서 `'127.0.0.1:54', '[::1]:54'`를 넣어주고 저장한다.

### Primary DNS Address 변경

공유기 설정에 들어가서 라즈베리파이 내부 아이피를 기본 DNS 주소로 설정한다.
IPTIME 의 경우 **고급 설정 > 네트워크 관리 > 인터넷 설정 정보** 에 있다.

## BlockLists

**Settings > Blocklists** 에서 추가하고 **Save and Update** 하면 차단할 주소가 추가된다. 아래는 참고할만한 링크다.

- [레딧](https://www.reddit.com/r/pihole/comments/9oekfe/good_blocklists_for_pihole/)
- [Best blocking lists](https://discourse.pi-hole.net/t/update-the-best-blocking-lists-for-the-pi-hole-alternative-dns-servers-2019/13620)

### 확인

[Cloudflare Browsing Experience Security Check](https://www.cloudflare.com/ssl/encrypted-sni/)서 체크하자.

DNSSEC, TLS1.3에 초록불 들어오면 된다.
그리고 유튜브를 쾌적하게 즐기자.

## 여담

- **Query Log** 메뉴에서 어느 도메인을 확인하려는지 알 수 있다.
- Instagram 광고 차단 필터를 찾아봐야겠다.
- 정작 내 블로그엔 애드센스 달려있는데..
- 세팅비 2만원 받아도 되지않을까? :smile:
