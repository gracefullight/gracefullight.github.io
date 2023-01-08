---
title: chkconfig run level 설명
authors: me
tags: [linux, notes]
date: 2017-01-13 11:11:32
---

chkconfig 로 부팅시 자동실행 서비스를 등록할 수 있다.

```bash
$ chkconfig service on
```

이 명령어를 사용하면 2345 레벨이 활성화 된다.
그렇다면 레벨은 뭘까?

# Run Level

Run Level 은 서비스의 실행을 단계별로 구분하여 적용하는 것을 말한다.

- **0** - halt (Do NOT set init default to this)
- **1** - Single user mode
- **2** - Multiuser, without NFS (The same as 3, if you do not have networking)
- **3** - Full multiuser mode
- **4** - unused
- **5** - X11
- **6** - reboot (Do NOT set init default to this)

- **0** : 시스템 종료시
- **1** : 싱글 유저 모드 (시스템 복원모드, 기본적으로 관리자 권한의 쉘을 얻게 된다)
- **2** : NFS가 지원되지 않는 다중 사용자 모드 (네트워크를 사용하지 않는 텍스트 유저 모드)
- **3** : 완전 다중 사용자 모드 (일반적인 로그인 시, CLI 환경)
- **4** : 미지정 (사용안함, 임의로 정할 수 있음)
- **5** : 3번과 같으나 GUI (X11) 환경
- **6** : 재부팅

모듈 설치시에는 on 또는 345 설정이 큰 차이가 없다.
