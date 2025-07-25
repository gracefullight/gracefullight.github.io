---
title: Linux startup 파일에서 피해야할 것
authors: me
tags:
  - linux
  - bash
date: 2017-11-19 22:53:29
---

스타트업 파일은 사용자가 로그인 할 때 시스템이 어떻게 반응해야 하는지를 결정한다.
스타트업 파일 수정시에 다음 사항들을 꼭 피해야한다.

## 주의

- 셸 스타트업 파일에 그래픽 명령을 넣지 않는다.
- 셸 스타트업 파일에 DISPLAY 환경 변수를 설정하지 않는다.
- 셸 스타트업 파일에 터미널 유형을 설정하지 않는다.
- 스타트업 파일에서 표준 출력으로 인쇄하는 명령을 실행하지 않는다.
- 셸 스타트업 파일에 LD_LIBRARY_PATH를 결코 설정하지 않는다.

> LD_LIBRARY_PATH 변수 조작시 런타임 링커가 모든 프로그램에 대해 이 디렉터리들을 찾기 때문에 충돌을 일으킬 수 있고, 라이브러리의 조합이 틀어질 수 있기 때문이다.

추가적으로 디폴트 스타트업 파일에 상세한 주석을 충분히 첨부한다.
