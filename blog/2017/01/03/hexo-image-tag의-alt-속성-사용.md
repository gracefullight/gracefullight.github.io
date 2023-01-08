---
title: hexo image tag의 alt 속성 사용
authors: me
tags: [hexo, javascript]
date: 2017-01-03 13:30:42
---

[공식 문서](https://hexo.io/ko/docs/tag-plugins.html#Image)에 따르면 image tag 의 사용법은 이렇다.

```html
![image from hexo]([class names] /path/to/image [width] [height] [title text [alt text]])
```

대괄호로 둘러 쌓인 부분은 생략이 가능하다.

# 문제점

## Input

test.png 에 test_title, test_alt 속성을 추가하고 싶은 경우 아래처럼 사용하면 되어야한다.

```html
![image from hexo](/test.png test_title test_alt)
```

## Output

하지만 결과는 참담하다.

```html
<img src="/test.png" title="test_title test_alt" />
```

# 해결

## Input

속성을 quotes 와 double quotes 로 두번 감싸줘야한다.

```html
![image from hexo](/test.png "'test_title'" "'test_alt'")
```

## Output

```html
<img src="/test.png" title="test_title" alt="test_alt" />
```

# 여담

공식 문서에 설명이 업데이트되면 좋겠다. 이미지에 캡션다는 법을 찾다가 결국 내 블로그에는 안 달기로 마음먹었다.
