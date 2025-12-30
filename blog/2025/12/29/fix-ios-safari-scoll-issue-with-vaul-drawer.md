---
title: shadcn/ui Drawer & Dialog 사용 시 iOS Safari 스크롤 오류 해결
date: 2025-12-29T21:19:46.800+11:00
description: "shadcn/ui의 Drawer(Vaul)와 Dialog를 함께 사용할 때 발생하는 iOS Safari 스크롤 튕김 현상(Jump to Top)의 원인 분석 및 Scroll Lock 충돌 문제 해결"
authors: me
tags:
  - react
  - shadcn
---


shadcn/ui(Vaul)를 사용하여 모바일 웹을 개발하던 중, iOS Safari에서 Drawer 내부의 Dialog를 호출할 때 발생하는 스크롤 충돌 버그를 해결했다.

## 문제 상황

모바일 뷰에서 '더보기' Drawer를 열고 내부 메뉴를 클릭하여 '공유하기' Dialog를 띄우는 기능이었다.

1. **Drawer Open**: 스크롤이 있는 페이지에서 Drawer를 연다.
2. **Interaction**: 메뉴 클릭 시 Drawer가 닫히고 Dialog가 열린다.
3. **Bug**: 이 전환 과정에서 **배경 스크롤이 최상단으로 초기화(Jump to Top)** 되거나, 화면이 고정되어 먹통이 된다.

## 원인 분석: Scroll Lock Race Condition

- Vaul(Drawer)도 Radix Dialog 기반이라, Drawer close 직후 Dialog open이 같은 프레임/틱에서 일어나면 중첩된 overlay의 스크롤 락/바디 스타일 변경이 겹치며 iOS Safari에서 스크롤 복원/점프가 발생할 수 있다

## 해결 방법

### 1. Timing (실행 시점 분리)

`onClose`나 클릭 핸들러에서 즉시 Dialog를 띄우지 않고, `onAnimationEnd` 이벤트를 활용하여 Drawer의 정리가 완전히 끝난 후 Dialog를 호출해야 한다.

```tsx
<Drawer
  onAnimationEnd={(open) => {
    // Drawer가 완전히 닫힌 후(!open) 실행
    if (!open) {
      setDialogOpen(true);
    }
  }}
>
```

## 2. Configuration (iOS 호환성 옵션)

Vaul 컴포넌트에 다음 옵션을 추가하여 Safari의 불완전한 스타일 재계산을 방지한다.

```tsx
<Drawer
  disablePreventScroll={true}
  repositionInputs={false}
  shouldScaleBackground={false}
>
```

- `disablePreventScroll={true}`
  - Vaul이 body에 강제로 스크롤 락 스타일을 적용하지 않도록 한다
  - iOS에서 발생하는 스크롤 점프 현상을 완화
  - 단, Drawer가 열려 있는 동안 배경 스크롤이 허용될 수 있음
- `repositionInputs={false}`
  - 가상 키보드 대응을 위한 viewport 재배치 로직 비활성화
  - iOS Safari에서 input + 모달 조합 시 발생하는 레이아웃 충돌 방지
- `shouldScaleBackground={false}`
  - Drawer 오픈 시 배경을 scale 처리하지 않음
  - 불필요한 body 스타일 변경을 줄여 안정성 확보

이 옵션들은 완전한 해결책이라기보다는 iOS Safari 환경에서의 리스크를 줄이기 위한 방어설정에 가깝긴하다.

## Ref

- [Github Issue: Vaul Drawer iOS Scroll Bug](https://github.com/emilkowalski/vaul/issues?q=is:issue+ios+scroll)
