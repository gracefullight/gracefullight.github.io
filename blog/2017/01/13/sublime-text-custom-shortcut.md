---
title: sublime text custom shortcut
authors: me
tags: [sublimetext]
date: 2017-01-13 19:48:32
---

서브라임 텍스트에서 단축키를 수정해보자.

# 설정

**Preferences > Key Bindings** 메뉴를 들어간다.
Default 와 User 로 나눠진 창에서 User 창에 내 단축키를 등록하면 된다.

# 단축키

> 다른 환경과 호환되는 사용하기 편한 단축키

```js
[
  // ctrl+d 로 줄삭제
  {
    keys: ["ctrl+d"],
    command: "run_macro_file",
    args: { file: "res://Packages/Default/Delete Line.sublime-macro" },
  },
  // 기존 ctrl+d의 기능을 옮김
  { keys: ["ctrl+shift+k"], command: "find_under_expand" },
  { keys: ["ctrl+k", "ctrl+shift+k"], command: "find_under_expand_skip" },
  // 들여쓰기 활성화
  { keys: ["f12"], command: "reindent", args: { single_line: false } },
  // 파일 새로고침
  { keys: ["f5"], command: "revert" },
  // f1키 누를시 package controller 띄우기 (기존 ctrl+shift+p 기능)
  {
    keys: ["f1"],
    command: "show_overlay",
    args: { overlay: "command_palette" },
  },
  // terminal package가 있을시 현재 프로젝트 터미널 띄우기
  { keys: ["ctrl+alt+t"], command: "open_terminal_project_folder" },
  // sidebarEnhancement package가 있을시 파일명 변경
  { keys: ["f2"], command: "side_bar_rename" },
  // sidebarEnhancement package가 있을시 새 파일 생성
  { keys: ["ctrl+n"], command: "side_bar_new_file2" },
];
```
