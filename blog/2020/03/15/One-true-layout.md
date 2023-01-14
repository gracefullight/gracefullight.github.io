---
title: One true layout 만들기
authors: me
tags: [css, layout, html]
date: 2020-03-15 22:54:18
---

# One true layout

Header, Navigation, Aside, Section, Footer 로 이루어진 레이아웃을 만들 시에
`float` 을 사용해서 구성할 경우 틀어짐을 잡는 방법에 대한 내용이다.

[원문](http://www.positioniseverything.net/articles/onetruelayout/equalheight)으로 보이는 링크에서는 **진정한 하나의 레이아웃**을 찾는 과정 중 하나이며 **Eqaul Height Columns - revisited**로 소개되고 있다.

## 이슈

아래와 같은 레이아웃에는 `footer` 영역이 섹션에 붙어 올라온다.

```html
<style>
  body {
    width: 1000px;
    margin: 0 auto;
  }
  #aside {
    float: left;
    width: 200px;
  }
  #section {
    float: left;
    width: 800px;
  }
</style>
<body>
  <div id="header">header</div>
  <div id="nav">nav</div>
  <div id="wrap">
    <div id="aside">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed
        sollicitudin mauris. Aliquam faucibus facilisis vulputate. Curabitur
        condimentum placerat mattis. Duis at metus at tellus volutpat ultrices.
        Cras lorem eros, cursus et risus sit amet, gravida feugiat libero.
        Nullam id faucibus ipsum. Nulla a leo sed eros mattis bibendum. Nullam
        et sapien in orci tempus elementum eu sed augue. Pellentesque eu
        vestibulum arcu. Pellentesque vel finibus libero. Nulla facilisi.
        Quisque dolor enim, ornare eget elit ac, pharetra porta ex. Vivamus
        eleifend eu arcu nec consequat.
      </p>
    </div>
    <div id="section">
      <p>
        Nam pulvinar dictum nibh id ullamcorper. Suspendisse justo eros, tempor
        vel faucibus in, pellentesque congue enim. Proin non eleifend turpis,
        vel commodo purus. Fusce vitae nisl dapibus, tincidunt elit at, cursus
        lacus. Maecenas varius imperdiet sollicitudin. Nunc pharetra fringilla
        enim ut facilisis. Curabitur maximus nibh non rhoncus semper. Duis
        porta, purus ut tincidunt convallis, sem purus pharetra erat, eu
        vestibulum tellus mi id eros. Fusce congue, erat at blandit mollis,
        tellus ex semper velit, dapibus commodo ante turpis a neque. Fusce vel
        ex id sem auctor accumsan. Maecenas finibus nunc sem, ut gravida felis
        efficitur at. Pellentesque lobortis dui non ligula condimentum, at
        auctor dui blandit.
      </p>
    </div>
  </div>
  <div id="footer">footer</div>
</body>
```

## 해결방안

### overflow: hidden

래퍼에 이 속성을 넣는 것으로 해결 된다.

```css
body {
  width: 1000px;
  margin: 0 auto;
}
#aside {
  float: left;
  width: 200px;
}
#section {
  float: left;
  width: 800px;
}
#wrap {
  overflow: hidden;
}
```

### clear: both

또는 래퍼를 삭제하고 구획을 나누는 부분에 `sibling` 노드로 `clear: both` 속성을 주면 된다.

```html
<style>
  body {
    width: 1000px;
    margin: 0 auto;
  }

  .clear {
    clear: both;
  }

  #aside {
    float: left;
    width: 200px;
  }
  #section {
    float: left;
    width: 800px;
  }
</style>
<body>
  <div id="header">header</div>
  <div id="nav">nav</div>
  <div id="aside">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed
      sollicitudin mauris. Aliquam faucibus facilisis vulputate. Curabitur
      condimentum placerat mattis. Duis at metus at tellus volutpat ultrices.
      Cras lorem eros, cursus et risus sit amet, gravida feugiat libero. Nullam
      id faucibus ipsum. Nulla a leo sed eros mattis bibendum. Nullam et sapien
      in orci tempus elementum eu sed augue. Pellentesque eu vestibulum arcu.
      Pellentesque vel finibus libero. Nulla facilisi. Quisque dolor enim,
      ornare eget elit ac, pharetra porta ex. Vivamus eleifend eu arcu nec
      consequat.
    </p>
  </div>
  <div id="section">
    <p>
      Nam pulvinar dictum nibh id ullamcorper. Suspendisse justo eros, tempor
      vel faucibus in, pellentesque congue enim. Proin non eleifend turpis, vel
      commodo purus. Fusce vitae nisl dapibus, tincidunt elit at, cursus lacus.
      Maecenas varius imperdiet sollicitudin. Nunc pharetra fringilla enim ut
      facilisis. Curabitur maximus nibh non rhoncus semper. Duis porta, purus ut
      tincidunt convallis, sem purus pharetra erat, eu vestibulum tellus mi id
      eros. Fusce congue, erat at blandit mollis, tellus ex semper velit,
      dapibus commodo ante turpis a neque. Fusce vel ex id sem auctor accumsan.
      Maecenas finibus nunc sem, ut gravida felis efficitur at. Pellentesque
      lobortis dui non ligula condimentum, at auctor dui blandit.
    </p>
  </div>
  <!-- clear:both 노드 추가 -->
  <div class="clear"></div>

  <div id="footer">footer</div>
</body>
```
