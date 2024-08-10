---
title: Redmine Bitnami 플러그인 설치
authors: me
tags: [linux]
date: 2017-01-13 18:15:52
---

빛나미로 설치된 레드마인에 플러그인을 추가해보자

## 플러그인 폴더 이동

root 권한으로 접근해야한다.

```bash
cd /opt/redmine/apps/redmine/htdocs/plugins
```

## 플러그인 설치

```bash
git clone 플러그인
```

## 레드마인 쉘 접속

```bash
cd /opt/redmine
./use_redmine
```

## 레드마인 번들 업데이트

번들은 플러그인이라고 생각하면 된다.

```bash
cd apps/redmine/htdocs
rake redmine:plugins:migrate RAILS_ENV=production
```

**rake 명령어가 실행이 안될시**

```bash
bundle install --without development test
rake redmine:plugins:migrate RAILS_ENV=production
```

## 레드마인 재시작

```bash
exit
cd /opt/redmine
./ctlscript.sh restart
```

이제 레드마인 관리자에서 플러그인을 관리할 수 있다.
