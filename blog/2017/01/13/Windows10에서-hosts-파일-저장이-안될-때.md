---
title: Windows10에서 hosts 파일 저장이 안될 때
authors: me
tags: [windows]
date: 2017-01-13 23:11:42
---

실컷 hosts 파일을 변경했는데 다시 들어가보니 원래대로거나,
권한이 없다고 아예 저장이 안 되는 경우가 있다.

# 해결

## 백신

백신에 따라 hosts 파일을 보호하기 때문에 수정을 제한될 수 있다.
잠시 백신을 사용안함 상태로 변경하자.

## Windows10

Windows10 은 기본적으로 hosts 파일의 수정이 제한되어있다.

**바탕화면 우클릭 > 새로만들기 > 바로가기**를 실행한다.
![image from hexo](https://i.imgur.com/hNfy1ui.png)

**항목 위치 입력**에 host 파일 경로를 입력해 바로가기를 만든다.

```bash
# 아래 내용을 항목 위치 입력에 넣어 바로가기 생성
C:\Windows\System32\notepad.exe C:\windows\system32\drivers\etc\hosts
```

![image from hexo](https://i.imgur.com/vEDRV5f.png)

**관리자 권한으로 실행**한다.
![image from hexo](https://i.imgur.com/mKWOBBO.png)

이제 hosts 파일을 수정하면 된다.
