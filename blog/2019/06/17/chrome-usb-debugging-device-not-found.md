---
title: chrome usb 디버깅 장치를 못 찾거나 연결이 안될 때
authors: me
tags: [chrome, windows]
date: 2019-06-17 21:16:40
---

usb 디버깅 승인 후 `chrome://inspect#devices` 탭에 접근하면 기기가 보이면서 디버깅이 가능해야하는데,
그렇지 못한 경우에 아래처럼 진행해주면 된다.

## 해결

먼저 usb 디버깅 권한을 모두 초기화하고 다시 연결한다.

```bash
## 디버깅 서버를 죽인 후 다시 실행한다.
$ adb kill-server
$ adb usb
```

개발자도구의 **More tools > Remote devices**의 목록에서 확인할 수 있다.

## 여담

- PTP 연결을 하라는데 이건 안드로이드 구버전에 대한거라 필요 없다.
- 웹뷰 디버깅시에는 디버깅 권한이 있는 앱이여야 가능하다.
