---
title: Helm chart의 모든 것
authors: me
tags: [k8s, helm, docker]
date: 2019-10-27 17:10:13
---

# Helm

> Helm is a tool for manaing Kubernetes charts.
> Charts are packages of pre-configured Kubernetes resources.

- 헬름은 쿠버네티스 차트를 관리하기 위한 도구
- 차트는 사전 구성된 쿠버네티스 리소스의 패키지
- 같은 어플레케이션을 여러 환경에 배포시 환경 변수, 도메인 등의 manifest 파일을 차트를 통해 관리
- 차트를 중심으로 하는 쿠버네티스 개발 종합 관리 도구

# 설치

```bash
# 설치
brew install kubernetes-helm

# 초기화
helm init

# tiller 파드 확인
kubectl -n kube-system get service,deployment,pod --selector app=helm

# 버전 확인
helm version
```

# 구성

- cli와 쿠버네티스 클러스터에 설치되는 서버인 tiller(틸러)로 구성

## chart

- 쿠버네티스는 service, deployment, ingress 등 리소스를 생성하고 manifest 파일을 적용하는 방식으로 어플리케이션을 배포한다. 이 manifest 파일을 생성하는 템플릿을 여러 개 패키징한 것
- helm repository 에 tgz 파일로 저장

### chart 구성

```bash
chart-example
├── charts # 차트가 의존하는 차트 디렉토리
├── templates # manifest 파일 템플릿 디렉토리
│   ├── NOTES.txt # 차트 사용법 등 참조 문서 템플릿
│   ├── _helper.tpl # manifest 렌더링에 사용되는 템플릿 헬퍼
│   └── example.yaml # 각종 K8S 리소스의 manifest 템플릿
├── Chart.yaml # 차트 정보가 정의 파일
└── values.yaml # 차트 기본값 value 파일
```

차트 설치시 `values.yaml` 에 override 할 값을 정의한 `yaml` 파일을 만들면 된다.

## repository

- local: 헬름 클라이언트가 설치된 로컬 리포, 로컬에서 생성한 패키지가 존재
- stable: stable charts repo, 기본값이며 [helm/charts](https://github.com/helm/charts/tree/master/stable) 차트 사용 가능
- incubator: stable 조건 미달 repo
  - `helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/`
- `helm search` 로 차트 검색 가능

# 명령어

## init

보통은 `helm init`
실서버에서는 `helm init --service-account tiller --node-selectors system --history-max 10`
업그레이드는 `helm init --upgrade`

- --service-account: 틸러가 사용할 서비스계정
- --node-selectors: 틸러를 배포할 노드 레이블
- --upgrade: 틸러 업그레이드
- --history-max: 리소스 하나당 유지할 최대 히스토리 수

## create

`helm create 차트명`

## package

`helm package 차트명`
차트를 압축파일로 패키징

- --version: 차트 버전 지정
  - 없을 경우 차트의 버전을 따른다.

## search

`helm search 검색어`

- -r, --regexp: 검색어를 정규표현식으로 사용
- -l, --versions: 버전 목록도 출력

## fetch

`helm fetch 차트경로`

- --version: 특정 버전 지정

## serve

`helm serve`
로컬 레포지토리로 사용할 웹 서버 시작

- --address: 서버가 개방할 주소
  - 기본값은 127.0.0.1:8879
- --repo-path: 차트 레포지토리가 될 로컬 디렉토리

## install

`helm install 차트명`
차트로 애플리케이션 설치

```bash
helm install stable/redis --name my-redis

helm install stable/redis --version 3.6.0 \
  --name my-redis \
  --namespace gracefullight \
  -f ./my-redis.yaml
```

- --dry-run
- --name: 릴리즈명
- --namespace: 설치 대상 네임스페이스
- -f, --values: yaml 파일 경로 (다수 가능)
- --version: 차트 버전 지정

## list

`helm list`
`helm list --namespace kube-system`

- --deleted: 삭제된 릴리즈 포함
- --namespace: 해당 네임스페이스만 확인

## get

`helm get 릴리즈명`
설치된 릴리스 상ㅇ세 정보를 yaml 으로 출력

- --revision: 릴리즈 리비전 확인

## delete

`helm delete 릴리즈명`

- --purge: 릴리즈 삭제하고 릴리즈명 해제
