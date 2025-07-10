---
title: AWS Cli S3 파일 업로드
authors: me
tags:
  - aws
date: 2017-10-25 08:16:50
---

웹 상에서 파일을 업로드할 때 md5 checksum 오류가 발생해 파일이 전체가 다 안 올라가는 경우도 있고, 세션이 만료되 올라가는 도중에 끊기기도 하는 것 같다.

## 업로드 방법

업로드 할 bucket 의 이름을 조회한다.

```bash
aws s3 ls
```

앞이 복사할 폴더이고 뒤가 파일이 복사될 s3 bucket 경로이다.

```bash
aws s3 cp ./ s3://{bucket_name}/{path}/ --recursive --exclude "*.mp4" --acl public-read
```

mp4 를 제외한 폴더의 모든 하위 파일들을 public-read 권한으로 업로드했다.

## 옵션 확인

[cli docs](http://docs.aws.amazon.com/cli/latest/reference/s3/cp.html)에서 디테일한 옵션은 확인 가능하다.
