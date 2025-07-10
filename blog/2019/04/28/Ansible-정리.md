---
title: Ansible 정리
authors: me
tags:
  - ansible
date: 2019-04-28 23:32:15
---

## 앤서블

서버 구성 관리 자동화 프로그램

### 용어

- 애드훅: 일회성 실행
- 플레이북: yaml 로 재사용

### CMDB

- Configuration Management DataBase (구성 관리 데이터베이스)
- 분산 설치된 서버, 스토리지, 네트워크 장비 등의 CPU, 메모리, 디스크 등의 하드웨어 정보와 OS, 응용프로그램 종류 등의 소프트웨어 정보 관리
- 다양한 시스템의 정보를 한 번에 파악 가능하고, 각 장비 간 연관 관계 파악이 쉬워 예방, 장애 파악, 유지보수에 좋음
- 앤서블 CMDB 는 앤서블 호스트 파일 또는 지정된 인벤토리를 통해 설정 관리 대상 시스템의 정보를 setup 모듈을 통해 수집, 저장
- 앤서블 vault 로 중요 정보 암호화 가능
- Device42, servicenow 등이 지원
- ansible-cmdb 를 사용해 간단한 대시보드로 볼 수 있다.

## 최적화

### pipelining

- 앤서블 실행 단계를 한 단계로 줄일 수 있음
- 플레이북 내에서는 ansible_ssh_pipelining 으로 설정 가능
- /etc/ansible/ansible.cfg 에서 설정 가능

### forks

- 한 번에 실행할 수 있는 노드의 수 제어 (default: 5)
- serial 은 단순히 전체 노드에서 어느 정도를 실행할 것인지를 설정하는 거라 forks 와는 다르다.

### async

- 태스크 별 지정된 주기에 체크하고 모든 노드의 동일 태스크가 완료되어야 다음 태스크 실행
- 주기를 0으로 설정하면 상태 체크 없이 다음 태스크가 진행된다.

### strategy free

- 상태 체크는 하지만 다른 노드의 진행을 기다리지 않고 각 노드 간 독립적으로 태스크 진행
- 빠르게 작업이 끝나는 노드가 생기므로 forks 수의 제한을 가능한 늘려줘야한다.

### 설정 확인

`ansible-config dump --only-changed` 로 변경된 설정 확인 가능

### 블록

- `with_items, with_nested, with_dict, with_file`을 사용해 여러 개의 태스크를 한 번에 실행 가능

### fact_caching

- 기본적으로 앤서블의 fact 는 실행 시마다 수집되는데, 이 옵션을 설정으로 디스크 또는 메모리에 캐싱해 fact 수집 시간을 단축시킴
- 기본 값은 24시간

### ansible-vault

- 평문 파일을 `aes256`으로 암복호화

### no_log

- 플레이북 실행시 `-v, -vv, -vvv`의 옵션으로 암호화 파일의 유추가 가능한데, `no_log` 옵션을 줘서 해결 가능

## 여담

- 설정이 많고, 모듈도 많아서 사용할 때 홈페이지를 참고해가며 삽질해야할 듯
- Docker 설치 전 **물리적인 서버**의 설정을 맞춰줄 때나 디버깅할 때 필수로 보인다.
- 시스템 관리자가 아니거나 AWS 쓴다면 사용할 일이 거의 없을 것 같다.
- [AWX](https://github.com/ansible/awx)로 Web 콘솔에서 관리가 가능하다.
