---
title: Git GUI 클라이언트 분석 (windows)
authors: me
tags: [git]
date: 2018-11-20 21:43:03
---

Git 고수들은 CLI 만 사용한다지만
난 Rebase 와 Squash 를 하다보면 몇 개의 문서를 다시 열어보는지 모르겠다.

그래서 [공식 GUI Clients](https://git-scm.com/download/gui/windows)에서 무료 Git 클라이언트를 파해쳐봤다.

# 분석

21세기 디자인이면서 커밋 그래프가 제공되고 git flow가 가능하며 쉬운 rebase 가 지원되는 클라이언트는 **[git kraken](https://www.gitkraken.com/)** 과 **[git fork](https://git-fork.com/)** 였다.

나머진 다음과 같은 단점이 있었다.

- SourceTree
  - 윈도우즈에서 UI 가 너무 후지다.
  - 인증이 왜 이렇게 어려운지 모르겠다.
  - 느리다.
- Github Desktop
  - 딱 깃헙용이다.
  - 되는 기능이 많지 않다.
  - 커밋 그래프도 없다.
- Tortoise Git
  - 왠지 SVN이 떠올라서 패스했다.
- Git Extensions
  - 21세기 디자인은 아닌 것 같다.
- GitEye
  - 솔직히 Git Clients 의 끝인 듯 싶다.
  - 하지만 워크벤치 쓰는 듯한 느낌이라 직관적이진 않다.
- gitg
  - 너무 간단하다.
- ungit
  - 너무 간단하다.
- git-cola
  - cli를 옮겨놓은 느낌이다.
- Cyeligent Git Tool
  - free 인데 라이센스를 물어본다.
  - 설치 폴더를 설정할 수 없다.
- Aurees
  - 좋아보였으나 바이러스가 감염됨으로 다운로드 불가능하다.
- CodeReview
  - diff 용이다.
- gmaster
  - non-commercial use 이고,
  - 그래프가 너무 느리게 그려진다.
- GitAhead
  - 좋아보이지만 non-commercial use
- Guitar
  - diff 용
- RepoZ
  - 애드온 같은 느낌이다.

## Git Kraken

- 느렸는데 최근 빨라졌다.
- 근데 아직도 느리다. 일렉트론 기반이라 그런 것 같다.
- 예쁜 그래프가 있다.
- 쉬운 rebase 를 제공한다.
- git flow 가능하다.
- 검은색 테마가 가능하다.
- non-commercial use 라 회사에서 못 쓴다.

## Git Fork

- 빠르고 직관적이다.
- 그래프가 지원된다.
- 쉬운 rebase 가 가능하다.
- 검은 테마가 가능하다.
- 완전한 무료이다.
- 지속적인 버전 업데이트가 되고 있다.
- 구글에서 git fork를 검색하면 정말 fork 하는 방법만 나오고 검색이 되지 않는다.

# 결론

**[GitFork](https://git-fork.com/)** 를 쓰자.
첫 실행 시에 `git config` 설정 UI 가 뜨는데 제대로 입력해줘야한다.

그리고 `workspace` 를 설정하는 란엔 사용하는 workspace 만을 등록하자.
전체를 등록할 경우 모든 폴더의 `.git` 디렉토리를 읽어오는 것 같다.
