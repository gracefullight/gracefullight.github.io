---
title: Vee-Validate Custom Validation
authors: me
tags: [javascript, vue]
date: 2017-10-15 13:57:29
---

커스텀 validation을 추가해야할 때가 있다.
created에 \$validator 인스턴스를 확장해주면 된다.

# 소스

```js
const option = {
  created: function() {
    this.$validator.extend('customRule', {
      getMessage: function(field, args) {
        return '오류 메세지';
      },

      validate: function(value, args) {
        // 체크 로직
        return true;
      }
    });
  }
}
```

모듈형태거나 전역설정이면 `import { Validator } from 'vee-validate';` 후에 `Validator.extend`로 접근하면 된다.

# 사용법

추가한 룰 이름으로 v-validate 속성에 넣어주면 끝이다.

```html
<input type="text" name="help" v-validate="'required|customRule'" />
```

## 스크립트 상에서 추가

attach 메소드로 붙히면 된다.

```js
this.$validator.attach('help', 'customRule');
```

다른 사용법은 [공식문서](https://vee-validate.logaretm.com/rules.html#custom-rules)를 참조하자
