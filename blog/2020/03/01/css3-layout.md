---
title: CSS3 레이아웃
authors: me
tags: [css, layout, html]
date: 2020-03-01 14:52:04

---

# CSS3

사용할 수 없는 브라우저에서 신규 문법은 무시된다.

## BFC

**Block Formatting Context**이며 아래 조건에서 생성된다.

- 루트 요소
- `float: right, left`
- `position: absolute`
- `display: inline-block`
- `overflow` 값이 `visable` 외에 다른 값일 때
- flex item
- grid item
- table cell

# layout

## float

```html
<style>
  .box {
    float: left;
  }
  /* 다음 세 가지 방법으로 container 안에 box 를 넣어줄 수 있다. */
  .container {
    overflow: hidden;
  }
  .container {
    float: left;
  }
  .container {
    display: flow-root;
  }
</style>
<div class="container">
  <div class="box">
    <p>플로팅</p>
  </div>
</div>
```

- `overflow: hidden` 으로 플로팅 요소를 잡는 것은 `box-shadow`가 잘리는 등의 문제가 있다.
- `display: flow-root`는 모던 브라우저에서만 지원한다.

## position

- `static`: 기본 값이다. 코드상 노출된 순서대로 표시된다.
- `relative`: 오프셋(top, left...)와 함께 사용된다.
  - 새로운 *컨테이너 블록*이 되며 하위 `absolute` 를 가둘 수 있다 .
- `absolute`: 흐름에서 벗어나며 자신이 포함된 *컨테이너 블록*의 가장자리를 기준으로 오프셋만큼 이동한다.
  - 별도의 *컨테이너 블록*이 선언되지 않았을 경우, viewport가 된다.
- `fixed`: viewport를 기준으로 고정된다. 스크롤해도 변하지 않는다.
- `sticky`: static + fixed 로 문서와 함께 스크롤 되다가 설정한 위치가 되면 고정된다.
  - 모던 브라우저에서만 지원한다.

```html
<style>
  .container {
    width: 400px;
    height: 400px;
  }
  /* 이 박스는 맨 위(viewport)에서 10 10 씩 떨어져있다. */
  .box {
    position: absolute;
    top: 10px;
    right: 100px;
    width: 200px;
  }

  /* 컨테이너 블록으로 만들면 박스가 들어온다. */
  /* .container { position: relative; width: 400px; height: 400px; } */
</style>
<div class="container">
  <div class="box">
    <p>absolute</p>
  </div>
</div>
```

## multi-column

`column-count`, `column-width`로 단 효과를 낼 수 있다.

```html
<style>
  .columes {
    column-width: 200px;
    column-count: 2;
  }
</style>
<div class="columns">
  <p>첫 번째 단</p>
  <p>두 번째 단</p>
</div>
```

## axis

- **주축**과 **교차축**이 있다.
  - 기본은 `flex-direction: row`이며 교차축은 수직이다.
  - `flex-direction: column`이면 교차축은 수평이다.
- 아이템의 배치는 항상 `교차축(cross axis)`에서 이뤄진다.
- `교차축 === 블럭축(block axis)` 이다.
- 그리드에서는 `컬럼 축(column axis)`이라고도 한다.

## flexbox

> 1차원 레이아웃

- `display: flex` 설정시 자식은 flex item이 된다.
- flex item은 `min-content`로 설정한 너비보다 작아질 수 없으므로 컨테이너를 벗어난다.
  - `min-content`는 아이템 내부 단어 중 가장 긴 것을 기준으로 설정된다.
- `flex-wrap: wrap;` 속성 설정 시 여러 줄에 걸쳐 표현된다.
- 줄이 넘어가면 넘어간 줄이 _flex container_ 가 된다.

### 플렉스 아이템 배치

- `align-items`
  - `stretch`: 기본값으로 늘어난다.
  - `flex-start`: 요소가 컨테이너 상단에 붙는다.
  - `flex-end`: 바닥에 붙는다.
  - `center`: 중앙에 배치된다.
- `align-self`: flex item 에서 위 속성을 덮는다.

### 플렉스 아이템 정렬

- `justify-content`
  - `flex-direction: row`면 가로줄, `column`이면 세로줄에서 동작한다.
  - `flex-start`: 기본값
  - `flex-end`: 플렉스 컨테이너 끝에서부터 추가된다.
  - `space-between`: 아이템 사이의 공간을 똑같은 간격으로 설정한다.
  - `space-around` 모든 아이템 양쪽에 똑같은 간격의 *마진*을 설정한다.
  - `space-evenly` 모든 공백을 똑같이 설정한다.
    - 아이템-아이템 간 컨테이너-아이템 간의 간격이 똑같다.
  - `center`: 가운데 설정한다.
- `align-content`
  - **교차축 위에서 동작**한다.
  - `flex-wrap: wrap`이고 아이템 배치 공간보다 컨테이너가 길 때 사용할 수 있다.
  - 초기값은 start이다.
  - 나머지 동작은 justify-content와 같다.
- `margin-left: auto;` 를 사용하면 원하는 아이템을 반대방향에 배치할 수 있다.

### 반응형 플렉스박스

- `flex-grow`: flex-basis에 설정한 값보다 커질 수 있는지 설정한다.
- `flex-shrink`: flex-basis에 설정한 값보다 작아질 수 있는지 설정한다.
  - 500px 컨테이너에 200px 플렉스 아이템이 3개 있다면 활성화시 영역 안에 들어올 것이다.
- `flex-basis`: flex-direction 에 따라 너비나 높이의 기본값을 지정한다.
  - `flex-basis: content`: 주축의 컨텐츠 크기로 설정된다.
  - `flex-basis: auto`: 플렉스 아이템에 `width` 속성이 있다면 그 값을 flex-basis 로 사용한다. 특별한 경우가 아니라면 auto가 권장된다.
- 보통 세 속성을 합쳐서 `flex: 0 0 200px;` 처럼 적는다.

### 플렉스박스 방향

> 플렉스박스와 그리드는 `dir=ltr` `dir=rtl` 속성에 좌,우 영향을 받는다.

- `flex-direction: row-reverse`
- `flex-direction: column-reverse`

## grid

> 2차원 레이아웃

```html
<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* grid-column-gap, grid-row-gap 축약 */
    grid-gap: 20px;
    /* 가장 최근 명세에서는 `grid-` prefix 가 빠졌다 */
    gap: 20px;
  }
</style>
<div class="container">
  <div class="item">
    <h2>grid 1</h2>
  </div>
  <div class="item">
    <h2>grid 2</h2>
  </div>
  <div class="item">
    <h2>grid 3</h2>
  </div>
  <div class="item">
    <h2>grid 4</h2>
  </div>
  <div class="item">
    <h2>grid 5</h2>
  </div>
  <div class="item">
    <h2>grid 6</h2>
  </div>
</div>
```

### fr

- _fraction_
- 유연한 너비를 나타내는 단위이다.

### 그리드 트랙

- 그리드의 열과 행을 나타낸다.

### 그리드 배치

> 프로그래머의 수는 0부터 시작이지만 그리드 배치에서는 1부터여야한다.

- LTR 의 경우는 왼쪽 끝이 1 이다.
- RTL 의 경우는 오른쪽 끝이 1 이다.
- 반대편 끝은 -1 이다.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.item1 {
  grid-column: 1 / 3;
  grid-row: 1;
}
.item2 {
  grid-column: 3;
  grid-row: 1;
}
.item3 {
  grid-column: 1;
  grid-row: 2 / 4;
}
.item4 {
  grid-column: 2 / 4;
  grid-row: 2;
}
.item5 {
  grid-column: 2 / 4;
  grid-row: 3;
}
```

`grid-column: auto / span 2;` 처럼 시작 위치를 auto로 잡고 끝 위치를 span 2로 잡으면 자동 배치 기능에 의해 그리드 아이템 위치는 자동으로 정해지고 너비는 항상 컬럼 두 개만큼 확장한다.

### 그리드 정렬

- `justify-items`로 설정하며 각 영역 안에서 정렬된다.
- 초기값은 `stretch`이다.

### named area

- 그리드에 이름을 직접 지정할 수도 있다.
- `.`은 공백을 나타낸다.
- 영역은 반드시 사각형이여야한다.
- `align-items`, `justify-items` 속성 변경시 반복이 무시된다. (stretch가 아니므로)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-template-areas:
    'a a b'
    '. d d'
    'c e e';
}

.item1 {
  grid-area: a;
}
.item2 {
  grid-area: b;
}
.item3 {
  grid-area: c;
}
.item4 {
  grid-area: d;
}
.item5 {
  grid-area: e;
}
```

### 반응형 그리드

- `auto-fill`: 너비가 허용하는만큼 최대한 많이, 다만 아이템 갯수가 부족하면 빈 공간을 남긴다.
- `auto-fit`: 아이템 갯수가 부족하면 남은 공간은 균등하게 분배된다.
- `minmax`: 너비의 최소, 최대크기를 지정할 수 있다.
  - 아래 예시라면 200px 의 컬럼이 몇 개 들어가는지 계산한 뒤, 남은 공간을 컬럼에 균등하게 분배된다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* 컨텐츠에 따라 그리드가 길어진다. */
  grid-auto-rows: minmax(150px, auto);
}
```

### 그리드 흐름

- `grid-auto-flow` 속성으로 조절한다.
  - `row`: 기본값이며 왼쪽 위부터 오른쪽으로 칸을 채워나간다.
  - `column`: 줄을 채우고 다음 컬럼을 채운다.
  - `dense`: 빈 공간에 채워넣는다.
  - `sparse`: 기본값이며 빈 공간을 내버려둔다.

이 외에 `order` 속성으로 직접 순서 제어가 가능하다.
다만 `dense`나 `order`는 탭 순서까지 변경해주지 않아 접근성을 벗어난다.

# supports

구 브라우져와의 호환을 위해 `@supports (display: grid)` 처럼 서포트 피쳐쿼리를 사용할 수 있다.
