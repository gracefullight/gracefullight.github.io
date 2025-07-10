---
title: "youtube-dl로 유튜브 무료 다운로드하기"
authors: me
tags:
  - youtube
  - bash
date: 2018-03-26 19:55:54
---

유튜브, 비메오 등의 영상을 소장하고 싶거나 좋은 노래를 다운받아서 듣고 싶을 때 많은 고민을 하게 된다
Youtube Free Download 같은 사이트에서 광고를 한참 보다가 한개씩 다운받아야하고, 영상일 경우 저화질만 받을 수 있다

이 고민거리를 한 방에 해결해주는 [Youtube-DL](https://github.com/rg3/youtube-dl)(DownLoad)이 있다 시작해보자.

## 설치

커맨드와 매뉴얼 설치방법으로 나눴다.

### 윈도우

#### scoop 설치

쉽게 설치하기 위해서 윈도우 패키지 매니저인 [Scoop](https://scoop.sh/)을 먼저 설치하자.
시작표시줄 우측 클릭 후 속성에 들어가면 **win + x** 키를 누를 때 관리자 파워쉘로 접속할 수 있는 설정이 있다.
설정을 체크해주고, **win + x** 후 **a** 키를 누르면 관리자 파워쉘로 접근한다.

```ps
PS > iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

#### 패키지 설치

```bash
## ffmpeg 은 음악, 영상 파일 포맷 변환기이다.
$ scoop install ffmpeg youtube-dl
```

#### 수동 설치

위에 커맨드가 너무 어렵다면 매뉴얼대로 설치해보자.
[여기](https://yt-dl.org/latest/youtube-dl.exe)를 누르면 다운받는다 (사실 이게 더 쉽지만 쉘로 설치하는게 뭔가 나이스하니까)

비디오를 오디오로 변경해주기위해 [ffmpeg](https://ffmpeg.zeranoe.com/builds/)를 다운받아야한다.
링크를 따라가서 **Download Build** 버튼을 클릭해 압축을 풀어주자

**ffmpeg/bin** 안에 youtube-dl.exe 를 넣어준다

### 환경 변수 설정

1. **Win+R > sysdm.cpl**
2. **고급 > 환경 변수 > 시스템 변수 > Path 선택 > 편집 > 새로만들기** 에서 ffmpeg/bin 경로를 넣어준다.
3. D:\\ffmpeg\\bin
4. 확인 ✔️ X 3

**Win+R > cmd**를 친 뒤에 테스트를 해본다, 아니면 **Win+x > cmd (or Powershell)** 한 다음 열어도 된다.

```bash
## ffmpeg 세팅 확인
$ ffmpeg -version

ffmpeg version N-90433-g5b31dd1c6b Copyright (c) 2000-2018 the FFmpeg developers
built with gcc 7.3.0 (GCC)

## youtube-dl 세팅 확인
$ youtube-dl --version

2018.03.14
```

### 맥

```bash
## brew 로 한 번에 설치가 가능하다.
$ brew install youtube-dl
```

## 사용법

### mp4 다운로드

```bash
$ youtube-dl 주소

## mp4 best quality로 다운받고 싶다면
$ youtube-dl 주소 -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'

## 4K 영상을 다운받고 싶다면
$ youtube-dl 주소 -f '(bestvideo[vcodec=vp9]/bestvideo[ext=mp4]/bestvideo)+bestaudio/best'

## 비공개 비밀번호 입력 영상이라면
$ youtube-dl 주소 --video-password 비밀번호

## 로그인하고 받아야되는 영상이라면
$ youtube-dl 주소 -u 아이디 -p 비밀번호
```

### mp3 다운로드

```bash
## audio-quality는 기본값이 5고 0으로 갈수록 좋은 음질
$ youtube-dl 주소 -x --audio-format mp3 --audio-quality 0
```

### 예시

트위터의 경우 동영상 주소 복사 버튼을 클릭하면 나오는 주소로도 다운로드가 가능하다.

```bash
## 영상 다운로드
$ youtube-dl https://www.youtube.com/watch?v=IlSY06XGu3Y

## mp3 다운로드 일반음질 (128K)
$ youtube-dl https://www.youtube.com/watch?v=nfs8NYg7yQM -x --audio-format mp3

## mp3 다운로드 고음질 (VBR)
$ youtube-dl https://www.youtube.com/watch?v=nfs8NYg7yQM -x --audio-format mp3 --audio-quality 0
```

## 버전 업데이트

명령어 하나로 셀프 업데이트가 가능하다.

```bash
## 다운로드 오류 발생시 업데이트하면 해결된다.
$ youtube-dl -U
```

## 지원하는 사이트

유튜브 말고 수많은 사이트의 리소스 다운이 가능하다.
사이트 목록은 [여기](https://ytdl-org.github.io/youtube-dl/supportedsites.html)서 확인 가능하다.
