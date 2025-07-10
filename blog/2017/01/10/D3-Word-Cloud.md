---
title: D3 Word Cloud
authors: me
tags:
  - javascript
  - d3
date: 2017-01-10 16:27:06
---

d3 와 d3-cloud 를 사용해 R 의 Word Cloud 를 javascript 로 구현해보자.

## 설치

```bash
## npm
$ npm install d3
$ npm install d3.layout.cloud
## bower
$ bower install d3
$ bower install d3-cloud
```

## 예제

### 소스

```html
<script src="/bower_components/d3/d3.min.js"></script>
<script src="/bower_components/d3-cloud/build/d3.layout.cloud.js"></script>

<script>
  var fill = function (i) {
    return d3.schemeCategory20b[i];
  };
  var layout = d3.layout
    .cloud()
    .size([500, 500])
    .words(
      [
        "텍스트",
        "마이닝",
        "샘플",
        "좋아요",
        "R",
        "Word",
        "Cloud",
        "text",
        "mining",
      ].map(function (d) {
        return { text: d, size: 10 + Math.random() * 90, test: "haha" };
      }),
    )
    .padding(5)
    .rotate(function () {
      return ~~(Math.random() * 2) * 90;
    })
    .font("Impact")
    .fontSize(function (d) {
      return d.size;
    })
    .on("end", draw);

  layout.start();

  function draw(words) {
    d3.select("body")
      .append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
      .append("g")
      .attr(
        "transform",
        "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")",
      )
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", function (d) {
        return d.size + "px";
      })
      .style("font-family", "Impact")
      .style("fill", function (d, i) {
        return fill(i);
      })
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function (d) {
        return d.text;
      });
  }
</script>
```

[d3-cloud](https://github.com/jasondavies/d3-cloud)의 예제소스는 nodejs 환경에서만 돌릴 수 있어 모든 웹에서 예제를 사용할 수 있게 수정했다.

### 결과

![image from hexo](https://i.imgur.com/BnCfjGK.png)
