---
title: 따라하면 되는 Git 사용 명령어
authors: me
tags: [git]
date: 2017-01-07 19:05:58
---

Git 은 설치되어 있고, 프로젝트를 clone 했다고 가정합니다.

## 작업흐름

### 프로젝트에서 git bash 실행

### 서버 repository 의 최종 버전을 다운로드

```bash
git pull origin master
```

### 오늘 작업 브랜치 설정 또는 선택

```bash
## 작업 브랜치 설정
$ git checkout -b 브랜치명
## 작업 브랜치 선택
$ git checkout 브랜치명
```

### 즐거운 코딩

```javascript
console.log("코딩!!!");
```

### 브랜치 작업내역 저장 및 커밋

```bash
$ git add .
$ git commit -m '커밋 메세지 (필수)'
## 또는 한방에 커밋
$ git commit -am '커밋 메세지'
```

### master 브랜치로 이동

```bash
git checkout master
```

### 작업한 브랜치 병합 후 테스트

```bash
git merge 브랜치명
```

### 서버 repository 변경점 다운로드

```bash
git pull origin master
```

### 서버 repository 변경점 업로드

```bash
git push origin master
```

### 작업 브랜치 제거

```bash
git branch -D 브랜치명
```

## 기타 자주쓰는 명령어

```bash
## 모든 브랜치 확인
$ git branch
## 원격 브랜치 확인
$ git branch -r
## master 브랜치에서 변경된 파일만 보기
$ git diff --name-status master
## 현재 브랜치 변경된 파일 정보 보기
$ git status
## 커밋 로그 한줄 보기
$ git log --pretty=oneline
```
