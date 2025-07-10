---
title: Vue로 생성된 DOM에 Events를 붙여야할 때
authors: me
tags:
  - javascript
  - vue
date: 2017-11-22 16:10:11
---

data 값이 변경되고 나서 `.hover`, `.click`과 같은 jQuery 이벤트를 붙여야할 때, DOM이 다시 그려진 완료 시점을 잡아야한다.
Vue에서 `nextTick` 메소드로 이 시점을 잡을 수 있다.
(`ajax`로 데이터를 가져오지 않고 그려지는 DOM은 `mounted` 메소드 안에 붙힐 Event 로직을 짜면 된다.)

```js
new Vue({
  data: {
    members: [],
  },

  created: function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const vm = this;

    axios
      .get("/members")
      .then(function (response) {
        vm.members = response.data;

        /* promise가 지원되는 환경에서 */
        return vm.$nextTick();

        // promise 미지원시
        /* vm.$nextTick(function() {
          $('.members').hover();
        });
      */
      })
      .then(function () {
        $(".members").hover();
      });
  },
});
```

인스턴스 메소드를 사용하고 싶지 않다면 `Vue.nextTick`으로 바꿔주면 된다.
