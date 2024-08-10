---
title: PWA 홈 설치의 모든 것 (A2HS)
authors: me
tags: [pwa, javascript, a2hs, serviceworker]
date: 2019-02-17 21:39:40
---

PWA의 캐싱과 푸쉬 기능은 익히 알려져 있지만, 홈 설치에 대해선 제대로 되어있는 문서가 거의 없다.
기능은 기존 바로가기의 전체화면 버전이라 간단해보이지만 구현해보면 **빙산의 일각**인 걸 절실히 깨닫게 된다.

## A2HS

> Add To Home Screen, 홈 설치, 웹 앱 설치

### 사전지식

아래 사전지식이 없으면 이 문서가 읽기 힘들 수 있다.

- es6
- 서비스워커
- 캐싱 전략

### 조건

홈 설치가 되려면 다음과 같은 조건이 필요하다.
크롬 측 설명인데 다른점이 많아서 하나씩 까보자.

- HTTPS
- 서비스워커 설치
- start_url 이 오프라인 사용가능
- 최소 192px 아이콘 지원
- manifest.json 에 name 과 short_name 값 등록

#### HTTPS

HTTPS 를 통해 서비스가 제공되어야한다고 나오는데,
도메인 뿐아니라 페이지의 모든 리소스가 HTTPS 프로톨콜로 전송되어야한다.

#### 서비스워커 설치

PWA 를 시작하는데 필수 요소니 자세한 설명은 생략

#### start_url 오프라인 사용가능

어느 캐싱전략을 사용해도 상관없으나 오프라인 모드로 연결이 되어야한다.
국내 서비스일 경우 크게 느리지 않으므로 Network First Strategy 로 캐싱하는 걸 추천한다.
국외 서비스일 경우 로드되는 리소스까지 캐싱전략을 세워야될 수 있다.

여기서 start_url 에 querystring 을 추가해 사용하는 경우가 대부분일텐데 캐싱되는 URL 은 querystring 이 없다는 걸 감안해야한다.

예를 들어보자.

```json
{
  // 보통 fetch request 로 접근되는 경로는 다음과 같다.
  "start_url": "/",
  // 검색 파라미터가 달려있다면 이런 모양일 것이다.
  "start_url": "/?NaPm=",

  // 하지만 manifest.json 에 들어있는 경로는 다음과 같을 것이다.
  "start_url": "/?pwa=1&utm_source=pwa"
}
```

유저가 접근시 `['NaPm', 'pwa', 'utm_source']` 등의 파라미터를 제거해야 경로가 캐시처리되며 오프라인 접근이 될 것이다.

#### 아이콘 지원

크롬에선 최소 192px 의 아이콘을 지원하라고 나와있지만 스플래시 스크린에서 사용되는 아이콘은 **512px** 이 우선이다. 게다가 엣지 등의 다른 브라우저는 512px 도 있어야한다.

큰 사이즈의 이미지가 있을 경우 설치시에 네이티브 코드에서 이미지를 리사이징해서 아이콘을 만드므로 512px 하나만 있어도 되지만 홈 설치 시간이 느려지는 원인이 되므로 **최소 192px, 512px 두 개**는 지원해주자.

여력이 된다면 더 많은 사이즈의 이미지를 지원해줘도 된다. 이미지 업로드 하는 페이지의 리사이징 비용과 이미지별 트래픽 비용도 추가되겠지만 항상 유저의 속도가 중요한 것 아닌가?

이미지가 많을 경우 아래 쪽에 언급할 compatible 기능에서 문제가 생길 수 있다.

#### 앱 이름

name 속성은 스플래시 스크린에 사용되며, short_name 은 바로가기 앱 명에 사용된다.
name 속성에 빈 값이 들어갈 경우 (빈 값엔 space 및 'ㄱ' 한자 1키도 포함된다.) short_name 으로 대체된다.
두 속성이 모두 빈 값일 경우 홈 설치가 비활성화 된다.

이 기능은 스펙에 명시되어 있어서 변경 불가능하다.

크롬에선 스플래시 스크린 하단에 앱 이름이 노출되며 기타 브라우저에선 중앙에 노출된다.
최근에 하단으로 변경된 것으로 보인다.

### 고려 대상

필수 조건에는 없지만 고려해야할 대상들은 아래와 같다.

- background_color
- theme_color
- display
- related_applications

#### background_color

이 속성은 스플래시 스크린의 배경색을 담당하는데, 배경색은 스플래시 스크린 상의 앱 이름 (name 속성)의 색상에 영향을 미친다.

앱 이름은 배경색이 거므스름한지의 여부에 따라 흰색 또는 검정색으로 노출된다.
이 공식은 [contrast ratio](https://www.w3.org/TR/WCAG20/#contrast-ratiodef) 란 스펙으로 정의되어 있으며, 안드로이드 내부에 구현되어있는 소스는 [다음](https://source.chromium.org/chromium/chromium/src/+/main:ui/android/java/src/org/chromium/ui/util/ColorUtils.java;l=57;)과 같다.

```java
private static final float CONTRAST_LIGHT_ITEM_THRESHOLD = 3f;

/**
 * Calculates the contrast between the given color and white, using the algorithm provided by
 * the WCAG v2 in http://www.w3.org/TR/WCAG20/#contrast-ratiodef.
 */
private static float getContrastForColor(int color) {
    float bgR = Color.red(color) / 255f;
    float bgG = Color.green(color) / 255f;
    float bgB = Color.blue(color) / 255f;
    bgR = (bgR < 0.03928f) ? bgR / 12.92f : (float) Math.pow((bgR + 0.055f) / 1.055f, 2.4f);
    bgG = (bgG < 0.03928f) ? bgG / 12.92f : (float) Math.pow((bgG + 0.055f) / 1.055f, 2.4f);
    bgB = (bgB < 0.03928f) ? bgB / 12.92f : (float) Math.pow((bgB + 0.055f) / 1.055f, 2.4f);
    float bgL = 0.2126f * bgR + 0.7152f * bgG + 0.0722f * bgB;
    return Math.abs((1.05f) / (bgL + 0.05f));
}

/**
 * Check whether lighter or darker foreground elements (i.e. text, drawables etc.)
 * should be used depending on the given background color.
 * @param backgroundColor The background color value which is being queried.
 * @return Whether light colored elements should be used.
 */
public static boolean shouldUseLightForegroundOnBackground(int backgroundColor) {
    return getContrastForColor(backgroundColor) >= CONTRAST_LIGHT_ITEM_THRESHOLD;
}
```

#### theme_color

이 속성은 주소창의 색상 또는 standalone 모드 시의 상단 상태바의 색상으로 노출된다.
하지만 IOS Safari 에서는 `['black', 'black-translucent']` 두 가지 색상으로만 선택이 가능하다.

이 것도 위의 Contrast 알고리즘을 활용해 거므스름한 여부에 따라 설정하면 된다.

#### display

크롬 문서엔 standalone, fullscreen, minimal-ui 모두 A2HS 의 기능을 활용할 수 있다고 설명되어 있으나, 실제로는 앞의 두 속성만 가능하다.
삼성브라우저는 minimal-ui 속성을 지원하지 않는다.

#### related_applications

앱을 가지고 있을 경우 앱 다운로드를 유도할 수 있는데, manifest 에 아래 속성만 넣으면 된다.
id 는 apk 업로드할 때 그 것과 같다.

```json
{
  "prefer_related_applications": true,
  "related_applications": [
    {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
    }
  ]
}
```

## Install Banner

**App Install Prompt** 또는 각각 브라우저마다 불리는 용어가 다른 이 기능은 PWA 접속시 홈 화면에 추가하라는 유도 배너를 말한다. 이 기능은 브라우저별로 이벤트 및 노출 유무가 천차만별이다.

### 스펙

|         | 배너 | 설치아이콘 | 배너재노출일 | 브라우저아이콘 |
| ------- | ---- | ---------- | ------------ | -------------- |
| Chrome  | 노출 | -          | ~3 months    | -              |
| Firefox | -    | 노출       | -            | 표시           |
| Samsung | 노출 | 노출       | ~2 weeks     | 표시           |
| Edge    | 노출 | -          | ?            | 표시           |
| UC      | ?    | -          | ?            | ?              |
| Opera   | 노출 | -          | ?            | 표시           |
| Whale   | ?    | -          | -            | -              |

크롬 빼고는 지원되는 브라우저에서 홈 설치시에 브라우저 아이콘이 모두 노출된다.
이러면 웹 푸쉬를 받을 시에 원래 브라우저에 뱃지가 생긴다고 보면 된다.

배너를 닫을 시에 재노출 기간이 비상식적으로 길다.
배너는 `prompt()` 메소드로 강제 노출이 불가능하며, 버튼을 클릭하는 액션이 있어야만 한다.
재노출일을 초기화할 시에는 브라우저의 데이터를 모두 삭제해야한다.
(서비스워커 삭제로 불가능, 계정 또는 브라우저에 저장되는 값으로 추정됨)

UC 브라우저는 문서도 있고 설치가 되었던 것 같은데 최근 설치가 되지 않는다.
Whale 는 크로미움 기반이라 설치가 되었던 것 같은데 최근 설치가 되지 않는다.

## IOS Safari

모바일계의 IE인 사파리는 [Web App Manifest](https://webkit.org/status/#?search=manifest) 기능을 아직 개발 중에 있다.
그리고 [매우 불친절한 개발자 문서1](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) 와 [불친절한 개발자 문서2](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html)만 가지고 있다.

### 사파리 버그

사파리에서만 나타나는 크리티컬한 버그가 몇 가지 있다.

#### OAuth 인증 불가

정확히 말하면 타 도메인 또는 새 창을 사용하는 SSO 와 OAuth 인증이 불가능하다.
사파리 자체 버그로 IOS 12.2.0 버전에 수정되었다.

#### 제스처 사용 불가

뒤로가기 제스처 사용이 불가능하다.
이를 위해 하이브리드 웹앱처럼 하단 네비게이션 바를 만들어줄 수 있다.
이 버그도 IOS 12.2.0 버전에 수정되었다.

### 전용 속성

홈 화면 아이콘과 스플래시 스크린, 테마 색상을 `meta`, `link` 태그로 만들어줘야한다.
이를 위해 manifest.json 의 값을 가져와 canvas 를 통해 프론트에서 이미지를 만들어야한다.

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="AppTitle" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-itunes-app" content="app-id=myAppStoreID" />
<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
<link rel="apple-touch-startup-image" href="icon.png" />
```

## Compatible

Chrome, Safari, Edge 등 호환성을 맞추다보면 머리에 쥐가 날지도 모른다.
이럴 때 브라우저별 호환성을 맞춰주는 google 에서 제공되는 라이브러리가 있다.

[pwa.compat](https://github.com/GoogleChromeLabs/pwacompat) 으로 다음과 같이 로드하면 된다.

```html
<link rel="manifest" href="manifest.json" />
<script async src="path/to/pwacompat.min.js"></script>
```

다음과 같은 호환성이 해결된다.

- Safari 전용 속성
- Safari 홈 화면 아이콘과 스플래시 이미지
- Edge, IE 전용 속성
- meta 태그로 추가되지 않은 manifest.json 속성

### 단점

manifest.json 과 icon 배열의 수만큼 request 수가 증가한다.
static resource 이므로 HTTP Cache 로 해결 가능하다.

## 버그

삼성브라우저에서 앱 이름에 " 큰따옴표가 들어간 경우 설치가 실패한다.
Manifest JSON 을 파싱하면서 브라우저 내에서 오류가 발생한다.

## 통계

홈 설치를 한 뒤에 유저가 얼마나 설치했을지 통계를 내는 것 또한 중요한데,
`beforeInstallPrompt` 나 `appInstalled` 이벤트는 브라우저 호환성이 보장되지 않는다.

따라서 위 이벤트로 로깅하는 건 무의미하고, start_url 에 들어온 파라미터로 통계를 내면 된다.

## 테스트

크롬 개발자도구의 **application > Manifest > Add to homescreen** 으로 이벤트를 발생시킬 수 있다고 하나 잘 되진 않는다.

홈 설치 조건을 만족시킬 경우, 크롬 설정 아이콘에서 "앱 명 추가" 라는 설정 메뉴가 하나 더 보이는데 이 기능으로 조건을 만족하는지와 브라우저 PWA 정도는 테스트 가능하다.

모바일 디버깅용으론 [eruda](https://github.com/liriliri/eruda)를 사용하자.

## 여담

IE7-8 호환성 맞추던 시절이 떠올랐다.
아직 픽스될 버그가 많으며, 안정될 때까지 최소 1년은 더 필요할 것으로 보인다.
추가되고 고쳐져야할 기능도 몇 가지 있다.

- 브라우저 호환성 (주소창 옆 아이콘으로 통일될 듯)
- 이벤트 호환성
- manifest href 에 blob 형태 지원 (현재 json decode 하면서 경로 오류 발생)
- manifest가 변경될 경우 업데이트알림 ([이슈](https://github.com/w3c/manifest/issues/446))

개인 홈페이지에 적용할 경우 [Web App Manifest Generator](https://tomitm.github.io/appmanifest/) 를 이용하는게 속 편하다.

[Desktop PWA](https://docs.microsoft.com/ko-kr/microsoft-edge/progressive-web-apps/microsoft-store) 나 [TWA](https://developer.android.com/reference/android/support/customtabs/TrustedWebUtils) 는 다루지 않았다.

## 레퍼런스

- [W3C Spec](https://www.w3.org/TR/appmanifest/)
- [Progressive Web Apps Book](https://abookapart.com/products/progressive-web-apps)
- 브라우저별
  - [Chrome](https://developers.google.com/web/updates/2018/06/a2hs-updates), [App Install Prompt](https://developers.google.com/web/fundamentals/app-install-banners/)
  - [Safari](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html), [Safari App Banners](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html)
  - [Samsung](https://developer.samsung.com/internet/android/web-guide)
  - [Edge](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps)
  - [Firefox](https://developer.mozilla.org/ko/docs/Apps/Progressive/Installable_PWAs)
  - [UC](https://plus.ucweb.com/docs/pwa/welcome-to-pwa/pwa)
  - [Opera](https://dev.opera.com/blog/web-app-install-banners/)
- 웹문서
  - [Progressive Web Apps on iOS are here](https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7)
  - [PWAs on iOS 12.2 beta](https://medium.com/@firt/pwas-on-ios-12-2-beta-the-good-the-bad-and-the-not-sure-yet-if-good-a37b6fa6afbf)
  - [A2HS for PWAs Is Big](https://ng-chicago.github.io/2018/06/18/add-2-home-screen/)
- github
  - [github/pwa-bugs](https://github.com/PWA-POLICE/pwa-bugs)
  - [github/awesome-meta-and-manifest](https://github.com/gokulkrishh/awesome-meta-and-manifest)
  - [github/pwa-tips-tricks](https://github.com/deanhume/pwa-tips-tricks)
