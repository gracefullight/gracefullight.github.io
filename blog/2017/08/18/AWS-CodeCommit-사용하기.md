---
title: AWS CodeCommit 사용하기
authors: me
tags: [server, aws, git]
date: 2017-08-18 22:34:22
---

AWS 에서 제공하는 Cloud Git Repository 인 CodeCommit 으로 소스코드를 관리해보자.

# 설정

공식 문서가 아주 잘 되어있다. 문서를 보고 시작해도 된다.

- [Mac](http://docs.aws.amazon.com/ko_kr/codecommit/latest/userguide/setting-up-ssh-unixes.html)
- [Windows](http://docs.aws.amazon.com/ko_kr/codecommit/latest/userguide/setting-up-ssh-windows.html)

## IAM 유저 생성

IAM 에서 유저를 만든 뒤에 **AWSCodeCommitFullAccess** 권한을 추가한다.

## 키 파일 업로드

ssh 키를 생성하고 Public Key 파일(id_rsa.pub)을 해당 유저의 **Security credentials** 메뉴에서 업로드한다.
키가 등록되면 **SSH key ID**가 보이는데 메모해 놓자.

## config

사용할 유저의 ssh config 를 설정해줘야한다.
User 에 들어가는 값은 위에서 적어놓은 **SSH key ID** 값이다.

```bash
$ vi ~/.ssh/config

# 아래 내용을 맨 위에 넣어주자.
Host git-codecommit.*.amazonaws.com
  User EXAMPLEEXAMPLEEXAMPLE
  IdentityFile ~/.ssh/id_rsa

# 저장한 뒤 권한을 바꿔준다.
chmod 600 ~/.ssh/config
```

## 테스트

설정이 완료된 후에 서울리젼으로 ssh 연결을 시도해보자.

```bash
$ ssh git-codecommit.ap-northeast-2.amazonaws.com

# 다음과 같은 메세지가 리턴되면 성공이다.
You have successfully authenticated over SSH. You can use Git to interact with AWS CodeCommit. Interactive shells are not supported.Connection to git-codecommit.
ap-northeast-2.amazonaws.com closed by remote host.
Connection to git-codecommit.ap-northeast-2.amazonaws.com closed.
```

# 연동

이제 AWS CodeCommit 과 내 소스를 연결시켜보자.

```bash
# 이미 존재하는 프로젝트의 경우
$ git remote remove origin
$ git remote add origin ssh://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/레파지토리명

# 처음 시작하는 경우
$ git clone ssh://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/레파지토리명

# 권한이 없거나 ssh 계정을 물어볼 때
# origin의 path 앞에 SSH key ID를 추가하자
$ git remote add origin ssh://EXAMPLEEXAMPLEEXAMPLE@git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/레파지토리명
```

`git pull origin master`시에 정상적으로 가져오는 걸 확인할 수 있다.

## ssh 연동이 잘 되지 않을시

메뉴얼대로 따라해도 연동이 안될 때는 당황하지 말고 `IAM > Users > Security credentials`에서 `HTTPS Git credentials for AWS CodeCommit`를 만들어주고 CodeCommit Repository 연결을 `http`로 하면 된다.

# Webhook

Github, Bitbucket 와 달리 Webhook 설정하는 법이 조금은 복잡하다. (GCP 의 Pub/Sub 와 비슷한 느낌)

> CodeDeploy 서비스를 사용하면 쉬워질 것 같은데, 그럼 CodePipeline 도 쓰고 싶을 것 같고 CI 세팅을 해야되고 다음 기회에

## Lambda

람다는 웹(URL)으로 호출할 수 있는 Javascript function 이다.

### 설정

먼저 **Lambda > 함수 > 함수생성 > 새로 작성** 메뉴에서 webhook 이란 이름의 함수를 생성한다.
**트리거 구성** 메뉴에서 CodeCommit 을 선택하고 입력 폼을 잘 채워주자.

![image from hexo](https://i.imgur.com/qpDqsjv.png)

**기존 브랜치로 푸시, master 브랜치**를 선택했다.
**사용자 지정데이터**에는 webhook 을 걸 URL 경로를 넣어준다. (예: https://yourdomain.com/webhook)

### 소스

이미 세팅된 [함수](https://gist.github.com/babelop/42e5580b7898719887516649b3053bc7)를 사용하자.

```js
"use strict";

const url = require("url");
const https = require("https");

exports.handler = (event, context, callback) => {
  const webhook_url = event.Records[0].customData;

  if (!webhook_url) {
    const error = new Error("Web-hook URL not provided as custom data.");
    callback(error);
  } else {
    console.log("POST web-hook to " + webhook_url);
    const options = url.parse(webhook_url);
    options["method"] = "POST";

    const req = https.request(options, (res) => {
      let body = "";
      console.log("Status:", res.statusCode);
      console.log("Headers:", JSON.stringify(res.headers));
      res.setEncoding("utf8");
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        console.log("Successfully triggered web-hook.");
        // If we know it's JSON, parse it.
        if (res.headers["content-type"] === "application/json") {
          body = JSON.parse(body);
        }
        callback(null, body);
      });
    });

    req.on("error", callback);
    req.end();
  }
};
```

https 커넥션이 아닌 경우 `http` 모듈을 사용해서 request 를 보내면 될 것 같다.

등록 후엔 **CodeCommit > 트리거 > webhook > 트리거 테스트**를 진행하면 정상적으로 호출이 된다.

## 로그

호출 로그는 **CloudWatch > 로그**에서 생성한 Lambda 명으로 확인할 수 있다.

로그 스트림이 설정되지 않았을 경우엔 **Lambda > 구성 > 기존 역할**에 표시된 역할(Rule)이 해당 Lambda 함수를 잡고 있는지 확인해야한다.
**IAM > Rules > 해당 룰 > Permissions**에서 **Show policy**를 누르면 **Resource 속성**에서 확인할 수 있고 다르다면 제대로 연결시켜주면 된다.

# 여담

> [AWS Korea week in review](https://aws.amazon.com/ko/blogs/korea/week-in-review-28-08-17/)에 소개되었다.
