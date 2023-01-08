---
title: sublime text에서 Git Bash 실행
authors: me
tags: [git, bash, sublimetext]
date: 2017-01-07 21:43:23
---

# 설치

## 패키지 설치

**Package Control**을 열어 Terminal 패키지를 설치한다.

## Git Bash 와의 연동

**Preferences > Package Settings > Terminal > Settings - User** 메뉴에서 터미널 경로를 수정한다.

```javascript
{
  // git-bash가 설치된 경로
  "terminal": "C:\\Program Files\\Git\\git-bash.exe",
  "parameters": []
}
```

# 단축키 추가

기본 단축키는 ctrl+shift+alt+t 라 어려우니 변경해주자.
**Preferences > Key Bindings** 메뉴에서 단축키를 추가한다.

```javascript
{ "keys": ["ctrl+alt+t"], "command": "open_terminal_project_folder" }
```

이제 ctrl+alt+t 키로 현재 프로젝트에서 깃 배쉬창을 바로 띄울 수 있다.
