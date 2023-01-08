---
title: Google Analytics Javascript API 사용하기
authors: me
tags: [javascript, ga]
date: 2019-01-14 21:42:16

---

# GA Client JS API

[문서](https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/web-js)가 있는데 생각보다 사용하기가 어렵다. 하나하나 시작해보자.

## 인증 토큰 발급

[Cridentials page](https://console.developers.google.com/apis/credentials)에서 Create credentials 를 눌러 OAuth Client ID 를 발급받는다.

## 예제

받은 Client ID 를 메타태그에 넣어준다.

```html example
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello Analytics Reporting API V4</title>
  <meta name="google-signin-client_id" content="OAuth 2.0 Client ID">
  <meta name="google-signin-scope" content="https://www.googleapis.com/auth/analytics.readonly">
</head>
<body>
<h1>Analytics Reporting API V4</h1>
<p>
  <div class="g-signin2" data-onsuccess="queryReports"></div>
</p>

<!-- The API response will be printed here. -->
<textarea cols="80" rows="20" id="query-output"></textarea>

<script>
  // Replace with your view ID.
  var VIEW_ID = '136416454';

  // Query the API and print the results to the page.
  function queryReports() {
    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: '6daysAgo'
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions'
              }
            ]
          }
        ]
      }
    }).then(function (response) {
      var formattedJson = JSON.stringify(response.result, null, 2);
      document.getElementById('query-output').value = formattedJson;
    }, console.error.bind(console));
  }
</script>
<script src="https://apis.google.com/js/client:platform.js"></script>
</body>
</html>

```

## 파라미터 확인

문서의 내용을 확인하기 보다 [Query Explorer](https://ga-dev-tools.appspot.com/query-explorer/)에서 테스트 후에 그 값들을 Body 로 옮겨 적는 게 확인하기 쉽다.
