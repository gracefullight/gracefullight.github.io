---
title: Linux 폴더 구조
authors: me
tags:
  - linux
date: 2017-07-23 20:37:34
---

윈도우도 Program Files 가 무슨 폴더인지 보자마자 알듯 리눅스도 폴더명이 친숙해지면 더 쉬워지지 않을까 했다. (보통 /home, /etc, /var, /tmp 정도만 왔다 갔다 하니까)
이 정도만 정리해 놓으면 CPU 정보를 볼때 왜 /proc/cpuinfo를 까야되는지 한 번에 감이 올 것 같다.

## Directory Structure

| 경로                        | 설명                                                |
| --------------------------- | --------------------------------------------------- |
| /                           | Root                                                |
| /bin                        | 기본 명령어 프로그램 (ex. ls, cp)                   |
| /dev                        | 장치 파일                                           |
| /etc                        | 시스템 설정 및 사용자 정보, 네트워킹 설정 파일      |
| /home                       | 유저 폴더                                           |
| /lib                        | 실행파일이 사용할 수 있는 공유 라이브러리 코드 파일 |
| /proc                       | 시스템 통계                                         |
| /sys                        | 장치와 시스템 인터페이스 제공                       |
| /sbin                       | 시스템 실행 파일                                    |
| /tmp                        | 임시 파일                                           |
| /usr                        | 리눅스 시스템 파일 (사용자 파일이 아님)             |
| /var                        | 변수 서브디렉토리로 프로그램 런타임 정보 기록       |
| /boot                       | 커널 부트 로더 파일                                 |
| /media                      | 제거 가능한 미디어를 위한 마운트 포인트             |
| /opt                        | 제3자 소프트웨어 파일                               |
| /usr/include                | C컴파일러 헤더파일                                  |
| /usr/info                   | GNU 정보 매뉴얼                                     |
| /usr/local                  | 관리자 소프트웨어 설치 파일                         |
| /usr/man                    | 매뉴얼 페이지                                       |
| /usr/share                  | 다른 유닉스 머신과 작업해야 할 파일                 |
| /vmlinuz 또는 /boot/vmlinuz | 리눅스 커널                                         |

## 여담

[Linux Kernel](https://github.com/torvalds/linux)을 이해하는 그 날까지
