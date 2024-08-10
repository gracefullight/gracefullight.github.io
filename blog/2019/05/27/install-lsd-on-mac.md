---
title: Mac에서 lsd 설치하기 (ls 명령어 꾸미기)
authors: me
tags: [mac]
date: 2019-05-27 23:55:47
---

## lsd

![ls -al](https://i.imgur.com/ieTdKPd.png)

[LSDeluxe](https://github.com/Peltoche/lsd) 커맨드로 `ls` 명령어를 예쁘게 변경해보자.

### 설치

```bash
## 설치
$ brew install lsd

## alias 설정
$ vi ~/.zshrc

alias ls='lsd'
alias ll='ls -alhF'

$ source ~/.zshrc
```

설치는 했지만 아이콘이 깨져서 보일 것이다.

### 글꼴 설정

```bash
## 글꼴 설치
$ brew tap homebrew/cask-fonts
$ brew cask install font-hack-nerd-font
```

**iTerm2 > Preferences > Profiles > Text** 탭으로 이동해 **Non-ASCII Font**를 확장한 뒤 방금 설치한 Hack Regular Nerd Fonr Compelete 폰트를 설정해주자.

**Use ligatures** 옵션 또한 체크한다.

![Non-ASCII Font 설정](https://i.imgur.com/Cj7ckip.png)
