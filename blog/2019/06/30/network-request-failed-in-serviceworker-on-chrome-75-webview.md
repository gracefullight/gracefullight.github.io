---
title: Chrome 75 Webview에서 서비스워커의 fetch request 가 실패하는 문제
authors: me
tags: [pwa, chrome, serviceworker]
date: 2019-06-30 13:50:12
---

# 발단

- 서비스워커는 n:m (사이트:디바이스)로 모든 클라이언트 기기에 설치된다.
- 배포 후 아무 문제 없이 동작하였으나, 190604 이후 웹뷰에서 `net::ERR_ABORTED` 페이지가 보인다는 버그가 들어오기 시작했다.
- 랜덤하게 발생되고 있어 추적이 어려웠으나 4일에 Chrome의 메이저 버전이 업데이트 되었다라는 것을 확인했고 디버깅을 시작했다.

# 디버깅

![chromium#973048](https://i.imgur.com/u7ViPk6.png)

- 서비스워커가 내려오지 않은 경우 페이지가 100% 정상동작을 하였다.
- 서비스워커가 내려온 경우 랜덤하게 페이지가 로드되지 않았다.
- 문제는 서비스워커로 확인되었고, 세부적인 디버깅 내역은 다음과 같다.
  - fetchListener 내부 cacheStorage 접근 예외처리: 재현
  - fetchListener 제거: 재현 안됨
- Chrome 75버전의 웹뷰에서 서비스워커의 fetching 방식이 변경되었다는 걸 확인할 수 있었다.
- 74, 75버전의 Diff를 찾을 수 있어 서비스워커 코어가 어마어마하게 변경되었다는 걸 확인할 수 있었으나 *이 코드를 디버깅하는 것보다 퇴사 후 행복하게 사는 게 멋질 것*이란 판단이 들었다.
- 다행히 구글러와 연락이 닿아 private 버그리포팅을 했고, Chrome은 오픈소스라 구글에서도 일일히 확인하기 힘들다라는 답변을 들을 수 있었다.

# 웹뷰와 서비스워커

- 웹뷰의 서비스워커와 브라우저의 서비스워커는 다른 인스턴스이므로 서로 공유되지 않는다.
- 그렇다면 웹뷰에서 재접속시에 앱 셸을 빠르게 로드하는 이점 뿐이라는 말이다. `=== 어드벤티지 없음`
- [WebView UA in Lollipop and Above](https://developer.chrome.com/multidevice/user-agent)에 따르면 안드로이드 롤리팝 이후부터 User Agent에 wv란 값을 물고 들어온다.

# 해결

## 예외처리

- Chrome 엔진이 업데이트 된다고 서비스워커가 제거되지 않는다.
- 따라서 **UA 에 android, wv 값이 있는 경우 서비스워커를 설치하지 않을 뿐 아니라 설치된 서비스워커를 제거해주는 로직**이 있어야한다.
- 아니라면 [A way to immediately unregister a service worker](https://github.com/w3c/ServiceWorker/issues/614) 기능을 브라우저 벤더들이 개발해줘야한다.
- 더 특정한 버전을 줘서 예외처리를 한다면 다음과 같을 것이다.

> Chrome 75.0.3770.67 ~ 75.0.3770.101 버전의 모든 안드로이드 웹뷰에서 서비스워커 설치를 차단, 이미 설치가 되어있다면 삭제

## 패치

- 몇일 뒤에 다른 업체에서 public 하게 [버그리포팅](https://bugs.chromium.org/p/chromium/issues/detail?id=977784)을 올렸고 버그를 찾아서 조만간 패치될 예정이다.
- `This is affecting tens of thousands of our readers` 로 보아 나와 같은 빡침이 느껴져서 아련했다.
- 패치된 코드는 [여기](https://chromium-review.googlesource.com/c/chromium/src/+/1675358)서 볼 수 있다.

# 여담

- 브라우저에 버그 발생시 대처하는 방법은 거의 불가능하다.
- 실수는 여기든 저기든 다 똑같구나
