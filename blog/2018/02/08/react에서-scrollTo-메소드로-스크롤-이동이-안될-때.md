---
title: react에서 scrollTo 메소드로 스크롤 이동이 안될 때
authors: me
tags: [javascript, react]
date: 2018-02-08 17:16:14

---

`window.scrollTo(0, 0)` 를 아무리 해봐도 스크롤이 맨 위로 올라가지 않을 때 많은 구글링을 한 뒤 다음과 같은 해결책을 적용해보았다

- `react-scroll` 라이브러리를 써보고
- 혹시 window 가 레이아웃 컴포넌트에 갇혀있어서 그런가 window 를 App.js 에서 Top 기능을 쓰는 곳까지 내려보고
- jQuery 를 추가해서도 해보고
- 별 짓을 다하다가

아무 것도 안 되서 리프레쉬하러 옥상에 갔다가 갑자기 든 생각이 있었다

잠깐만 component 라는게 하나의 element 안에서 쇼를 하는 거 잖아.
그럼 element 안에서 스크롤을 이동하면?

# 해결

```jsx title="Footer.js"
class Footer extends Component {
  scrollToTop = (event) => {
    document.getElementById('root').scrollTo(0, 0);
  };

  render() {
    return (
      <div>
        <div className="top">
          <a onClick={this.scrollToTop}>위로가기</a>
        </div>
      </div>
    );
  }
}
```

index.js 에서 ReactDOM 을 렌더링해주는 element(나같은 경우엔 **div#root**)를 찾아서 그 엘레먼트의 스크롤을 올려주자

# 여담

책에서 봤는데 뇌가 쉴 때 가장 좋은 아이디어가 나온다고 했는데, 사실인 것 같다
