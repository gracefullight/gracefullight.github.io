---
title: Paypal 기부 버튼 만들기
authors: me
tags: [paypal]
date: 2017-07-03 00:48:55
---

기존에 Paypal 버튼을 만들기가 되게 복잡했는데, 최근 Paypal.Me 가 생기면서 아주 간단해졌다!

[Paypal.Me](https://www.paypal.com/KR/webapps/mpp/paypal-me?locale.x=ko_KR)에 들어가서 서비스 가입만 하면 된다.
_Paypal 계정이 없으면 가입 후에 계좌 인증이 필요하다_

## 소스

아래 소스를 추가해주자.
기존 페이팔 버튼의 소스에서 action 부분만 변경해주었다.

```html
<!-- https://www.paypal.me/GracefulLight/3 으로 금액을 붙혀 보내면 초기 금액을 설정할 수 있다. -->
<form action="https://www.paypal.me/GracefulLight" method="get" target="_blank">
  <table border="0" cellpadding="10" cellspacing="0" align="center">
    <tr>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center">
        <input
          type="image"
          src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
          alt="Donate"
          border="0"
          name="submit"
        />
      </td>
    </tr>
  </table>
</form>
```

## 결과

![image from hexo](https://i.imgur.com/rHzzZUM.png)

새삼 예쁜 것 같다.
