---
title: thefuck 설치하기
authors: me
tags: [bash, git]
date: 2018-05-29 19:24:45
---

# thefuck

## 이게 뭐죠

커맨드로 명령어를 실행하다보면 생각보다 오타를 많이 치게 된다
tab tab 자동완성 기능과 Oh-My-Zsh 의 syntax highlighting 기능을 사용한다면 충분히 커버가 가능할 것 같지만 현실은 그렇지 않다.

```bash
# git checkout master를 치고 싶었으나..
$ git checktou master
git: 'checktou' is not a git command. See 'git --help'.

The most similar command is
        checkout
```

[thefuck](https://github.com/nvbn/thefuck) 을 활용하면 오타가 나 분노한 나의 마음을 표출할 수 있다.

![예제](https://raw.githubusercontent.com/nvbn/thefuck/master/example.gif)

## 설치

다들 python 3.6 버전 정도는 갖고 있다고 가정한다.

```bash
$ pip install thefuck
```

## alias 설정

fuck 만 쳐도 thefuck 의 기능을 사용하기 위해 alias 설정을 해주자.

### git bash

`bash_profile` 에 아래처럼 추가해준다.

```bash
vi ~/.bash_profile

eval "$(thefuck --alias)"
```

### 환경 변수 설정

1. **Win+R > sysdm.cpl**
2. **고급 > 환경 변수 > 시스템 변수 > 새로만들기** 에서 **PYTHONIOENCODING** 값을 **utf-8**로 준다.
3. 확인 ✔️ X 3

### powershell

ps 를 주로 사용한다면 설치 후 `$PROFILE` 파일에 값을 넣어주면 된다.

```ps
PS > Notepad $PROFILE

$env:PYTHONIOENCODING="utf-8"
iex "$(thefuck --alias)"
```

profile 파일이 없다고 오류가 발생하면, 아래 명령어로 profile 파일을 만들어주자.

```ps
PS > New-item -type file -force $PROFILE
```

## 활용하기

```bash
$ git checkuot master
git: 'checkuot' is not a git command. See 'git --help'.

The most similar command is
        checkout

$ fuck
git checkout master [enter/↑/↓/ctrl+c]
Already on 'master'
Your branch is up to date with 'origin/master'.
```

오타 걱정 없이 쉘 커맨드를 실행할 수 있게 되었다.
