---
title: Javascript로 로컬에 이미지 다운로드
authors: me
tags: [javascript]
date: 2017-01-16 21:57:31
---

버튼을 눌러 이미지를 **다운로드** 받고 싶다면 어떻게 해야될까?
Client Side 에서 할 수 있는 가장 쉬운 방법은 [download attribute](https://www.w3schools.com/TAgs/att_a_download.asp)를 사용하는 것이다.
하지만 예상했듯이 이 속성은 IE 에서 지원하지 않는다.

# For IE

## base64

먼저 이미지를 base64 인코딩해야한다.
FileReader 또는 Canvas 를 이용해 변환할 수 있는데 [stackoverflow 의 명쾌한 답변](https://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript)을 참조하자.
jQuery 환경이라면 [Reading binary data using jquery ajax](http://www.henryalgus.com/reading-binary-files-using-jquery-ajax/)를 참조해도 된다.

base64encode 가 된 이미지 데이터가 뽑아지면 시작할 수 있다.

```bash
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAAD2CAAAAADAeSUUAAADN0lEQVR42u3aQY7CMBAEQP7/afaKtEu2exwk4lROKITEZSQGT/vxiI/ny/H7zOv513ffXZl89viad6M6+cDGxsa+CDsZUP5uMqx3d8gntB3nH1ODjY2NvR373S/88TUtMuG1E5qMExsbGxv7eChJUTl+4nP5wMbGxsZu2UlbJy9RyQS1SxpsbGzsu7FXCkPeTkoihGTQeUPqhF4aNjY29tez81T0+19/JN/GxsbG/mL2rHEzi2OTxc968BwpsLGxsTdiz0Lc/I9+voBprzwhhMbGxsbeiN1S2xvNWkuzZtD6aLGxsbGvxW4f0BaqtpU/C4/bhRA2Njb2TuwkTF0ZVn4+/+zKJEb7lbCxsbG3YM9aRe0CJo8NkivzFhU2Njb2ruwW3/71r0vL6FnDXUvY2NjYl2XPAto8mm0LUrIImcUG2NjY2Luy1xv6eTCwMomzAlZPEzY2NvbF2ceDWIld82XJSjjRbsfExsbG3om9EgbkDak2GM5L6bApho2Njb0F+/imeclJWj/t61nwEBU2bGxs7I3Yn2vifKLN1MKKxQk2Njb2ZdlnFYzZ9bMG00rbCxsbG/sO7Lw13261zIvlMXVW5B7tDGFjY2NvwZ4lpDmpLYenXYmNjY29ETv5u5+XkDYYaFtL7ZKm2KmEjY2NfVl2u10mWYS009q2hNoC9scZbGxs7I3YM+SsjJ3V0lqZ3MfKd4uNjY39lexk6Hlkm4fHs40+7dacomhhY2Njb8TOi1MeCZw7oflER1t2sLGxsS/Onq1d2hC3XYq0japZCIGNjY29K7u9Xds8WmlU5SWwiH6xsbGxt2DnP/dthNBS12FFScPGxsbelN02aNrFRh4tzJ5SbO7BxsbGvgE7Aa8EACvlc6X9hI2Njb0T+1keySBmm3jy0Le92z9JCDY2NvbF2W0BOLfwHJ9vW0v1UgQbGxt7I3ZStFbKTLKMab+TZFH0T+SAjY2NvR07b7vP4ti2TK5MSvRcbGxs7Nuz2wfnT1nZalncBxsbG/vG7PWtlmdt5VlpimFjY2Pvx06aRHlBarfs5O3+9ut5u/rAxsbG3og9W1TkxWYWP7T3zBtV2NjY2BuxfwBOAYaS/PUQNQAAAABJRU5ErkJggg==
```

## blob

이제 이미지 데이터를 Blob Object 로 변환해야한다.

```javascript
// imageSrc는 위의 이미지 데이터이다.
// 실제 데이터는 iVBO...부터이므로 split한다.
const imgData = atob(imageSrc.split(",")[1]);
const len = imgData.length;
const buf = new ArrayBuffer(len); // 비트를 담을 버퍼를 만든다.
const view = new Uint8Array(buf); // 버퍼를 8bit Unsigned Int로 담는다.
let blob, i;

for (i = 0; i < len; i++) {
  view[i] = imgData.charCodeAt(i) & 0xff; // 비트 마스킹을 통해 msb를 보호한다.
}
// Blob 객체를 image/png 타입으로 생성한다. (application/octet-stream도 가능)
blob = new Blob([view], { type: "image/png" });
```

## msSaveOrOpenBlob

IE10+ 에서 사용가능한 [msSaveOrOpenBlob](https://msdn.microsoft.com/ko-kr/library/hh779016.aspx)가 필요하다.

> msSaveBlob 메서드는 **저장** 단추만 사용자에게 제공하는 반면
> msSaveOrOpenBlob 메소드는 **저장 및 열기** 단추를 모두 제공한다는 것이 차이점이다.

```javascript
// blob과 저장될 파일명을 받는다.
window.navigator.msSaveOrOpenBlob(blob, "new_file_name.png");
```

# Not IE

IE 가 세상에 존재하지 않는다면 코드는 아주 예쁘게 짤 수 있다.

```html
<a href="data:image/png;base64,iVBORw0KG..." download="new_file_name.png">
  <img src="data:image/png;base64,iVBORw0KG..." />
</a>
```

a 태그가 보기 싫다면 아래 구문을 포함해 함수로 만든다.

```javascript
const a = document.createElement("a");
a.style = "display: none";
a.href = img.src;
a.download = "new_file_name.png";

document.body.appendChild(a);
a.click();

setTimeout(function () {
  // 다운로드가 안되는 경우 방지
  document.body.removeChild(a);
}, 100);
```

## Blob 재사용

IE 때문에 만들었던 Blob 객체를 URL 기능을 이용해 재사용해보자.

```javascript
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.style = "display: none";
a.href = url;
a.download = "new_file_name.png";

document.body.appendChild(a);
a.click();

setTimeout(function () {
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // 메모리 해제
}, 100);
```

# 소스

```js
/**
 * [downloadImage]
 * @param  {[string]} img       [base64encoded image data]
 * @param  {[string]} fileName  [new file name]
 * @return [image file]
 */
function downloadImage(img, fileName) {
  let imgData = atob(img.src.split(",")[1]),
    len = imgData.length,
    buf = new ArrayBuffer(len),
    view = new Uint8Array(buf),
    blob,
    i;

  for (i = 0; i < len; i++) {
    view[i] = imgData.charCodeAt(i) & 0xff; // masking
  }

  blob = new Blob([view], {
    type: "application/octet-stream",
  });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    //var url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style = "display: none";
    //a.href = url;
    a.href = img.src;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    setTimeout(function () {
      document.body.removeChild(a);
      //URL.revokeObjectURL(url);
    }, 100);
  }
}
```

# 여담

![image from hexo](https://i.imgur.com/36Rf76J.gif title:"실망시키지 않는 IE")
