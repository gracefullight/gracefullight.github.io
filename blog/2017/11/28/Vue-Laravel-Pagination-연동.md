---
title: Vue - Laravel Pagination 연동
authors: me
tags: [javascript, php, vue, laravel]
date: 2017-11-28 15:36:34
---

Laravel에서 `paginate` 메소드를 `json`으로 받았을 시에 데이터는 다음과 같다.

```json title="response"
{
  "current_page": 1,
  "data": [{}, {}, {}],
  "from": 1,
  "last_page": 1,
  "next_page_url": null,
  "path": "https://example.com/ajax/list",
  "per_page": 15,
  "prev_page_url": null,
  "to": 8,
  "total": 8
}
```

이 데이터를 `blade`에서 `links` 메소드로 쉽게 사용할 수 있는 것 처럼 `Vue`에서도 그럴 수는 없을까?

[Laravel Vue Pagination](https://github.com/gilbitron/laravel-vue-pagination) 패키지를 활용하면 된다.
**SPA**일 경우에는 다운 받고 **Usage** 탭에 적힌대로 바로 사용하면 되지만, Multi Page일경우는 직접 컴포넌트를 가져와야한다.

# 사용법

```html
<ul>
  <li v-for="post in response.data" v-text="post.title"></li>
</ul>

<nav>
  <pagination
    :data="response"
    :limit="3"
    @pagination-change-page="fetchPosts"
  />
</nav>

<script>
  new Vue({
    data: {
      response: {
        data: [],
      },
    },

    methods: {
      fetchPosts: function (page) {
        var vm = this;
        axios
          .get("url", {
            params: {
              page: page || 1,
            },
          })
          .then(function (response) {
            vm.response = response;
          });
      },
    },
  });
</script>
```

# 예외처리

[Component 소스](https://github.com/gilbitron/laravel-vue-pagination/blob/master/src/laravel-vue-pagination.js#L25)의 _template_ 부분을 보면 nav로 감싸져있지 않기에 Laravel 기본 템플릿과 일치시키려면 `nav` 태그로 감싸주면 된다.
