---
title: 맥 추천 패키지
authors: me
tags:
  - me
  - mac
date: 2019-12-29 13:57:47
---

여러 맥 기기의 환경을 구성하다보니 적어 놓는 게 나을 듯 싶었다.

## brew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### formulae

#### main formulae

```bash
brew install fzf \
  git \
  go \
  kubernetes-cli \
  mas \
  node \
  python \
  stern \
  tree \
  wget
```

- fzf
- git
- go
- java
- kubernetes-cli
- mas
- node
- python
- stern
- tree
- wget

#### sub formulae

> [docker for mac](https://docs.docker.com/docker-for-mac/install/)

```bash
brew tap spring-io/tap
```

```bash
brew install git \
  hadolint \
  helm \
  kubectx \
  k9s \
  spring-boot \
  thefuck \
  volta \
  youtube-dl \
  zsh-autosuggestions \
  zsh-syntax-highlighting
```

- git
- helm
- kubectx
- springboot
- thefuck
- volta
- youtube-dl
- zsh-autosuggestions
- zsh-syntax-highlighting

### cask

```bash
brew tap homebrew/cask-fonts
```

```bash
brew cask install adguard \
  appcleaner \
  bitwarden \
  dbeaver-community \
  firefox \
  font-cascadia \
  font-hack-nerd-font \
  fork \
  gather \
  google-chrome \
  hiddenbar \
  iina \
  iterm2 \
  java \
  jetbrains-toolbox \
  keepingyouawake \
  keka \
  macs-fan-control \
  monitorcontrol \
  microsoft-edge \
  orange \
  pika \
  podman-desktop \
  postman \
  rectangle \
  rocket \
  slack \
  telegram-desktop \
  visual-studio-code \
  yt-music \
  zoom \
  zulu
```

- adguard: 💰
- appcleaner: 앱 클리너
- bitwarden: 비밀번호 관리
- dbeaver-community: DBMS 클라이언트
- firefox: 파이어폭스
- font-cascadia: Cascadis Code 폰트
- font-hack-nerd-font: iTerm2 용 터미널 폰트
- fork: 무료 중 최고의 git client
- gather: 게더타운
- google-chrome: 크롬
- hiddenbar: 작업표시줄의 프로그램 숨기기
- iina: 깔끔한 인터페이스의 미디어 플레이어
- iterm2: 터미널
- jetbrains-toolbox: jetbrains IDE 버전 관리
- keepingyouawake: 잠자기 모드 제어
- keka: 압축 프로그램
- macs-fan-control: 팬 조절
- monitorcontrol: 외장모니터 제어
- microsoft-edge: edge
- orange: orange3 데이터 분석
- pika: 색상 선택기
- podman-desktop: docker desktop 대체
- postman: 포스트맨
- rectangle: 창 크기 조절
- rocket: 이모지 선택기
- slack: 슬랙
- telegram-desktop: 텔레그램
- visual-studio-code: vscode
- yt-music: 유튜브 뮤직 플레이어
- zoom: 줌
- zulu: 자바

## App store

```bash
mas install 497799835 \
  1355679052 \
  869223134 \
  1295203466 \
  1471801525 \
  897118787 \
  425424353 \
  1475628500
```

- xcode: **497799835**
- dropover: **1355679052** 드래그 후 흔들면 가상폴더로 저장
- kakaotalk: **869223134** 카카오톡
- microsoft remote desktop: **1295203466** 윈도우 원격
- polyglot: **1471801525** 사파리 번역기
- shazam: **897118787** 음악 찾기
- unicorn https: **1475628500** Encrypt DNS query

## Bunblefile

> [bundle](https://github.com/Homebrew/homebrew-bundle)

`brew bundle install`

```bash title="Brewfile"
tap "homebrew/bundle"
tap "homebrew/cask"
tap "homebrew/cask-drivers"
tap "homebrew/cask-fonts"
tap "spring-io/tap"

cask_args appdir: "~/Applications", require_sha: true

brew "fzf" # fuzzy finder
brew "gh" # github clone
brew "git" # git
brew "hadolint" # dockerfile linter
brew "helm" # helm chart
brew "k9s" # k8s dashboard
brew "kubectx" # k8s context switcher
brew "mas" # app store
brew "mkcert" # local certification
brew "skaffold" # k8s deploy
brew "thefuck" # fix typo
brew "tree" # tree
brew "volta" # nodejs version manager
brew "wget" # wget
brew "zsh" # zsh
brew "zsh-autosuggestions"
brew "zsh-syntax-highlighting"
brew "spring-io/tap/spring-boot" # spring cli

cask "appcleaner" # 앱 클리너
cask "bitwarden" # 비밀번호 관리
cask "dbeaver-community" # dbms client
cask "firefox" # 파이어폭스
cask "font-cascadia-code" # ms 개발 폰트
cask "font-hack-nerd-font" # 터미널 폰트
cask "fork" # git gui
cask "gather" # gathertown
cask "hiddenbar" # 작업표시줄 숨기기
cask "iina" # 플레이어
cask "iterm2" # 터미널
cask "jetbrains-toolbox"
cask "keepingyouawake" # 잠자기 해제
cask "keka" # 압축 프로그램
## cask "logitech-options" # 로지텍 사용자만
cask "macs-fan-control" # 팬 조절
cask "microsoft-edge" # edge
cask "monitorcontrol" # 외장 모니터 조절
cask "orange" # orange3
cask "pika" # 색상 선택기
cask "podman-desktop" # docker desktop 대체
cask "postman" # postman
cask "rectangle" # 창 조절
cask "rocket" # 이모지
cask "slack" # slack
cask "telegram-desktop" # telegram
cask "visual-studio-code" # vscode
cask "zoom" # zoom
cask "zulu" # zulu jdk

mas "Dropover", id: 1355679052
mas "Microsoft Remote Desktop", id: 1295203466 # remote desktop
mas "Polyglot", id: 1471801525 # translator
mas "Shazam", id: 897118787 # music finder
mas "Xcode", id: 497799835 # xcode
mas "카카오톡", id: 869223134 # kakaotalk
```
