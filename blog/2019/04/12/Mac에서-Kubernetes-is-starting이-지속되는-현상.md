---
title: Mac에서 Kubernetes is starting이 지속되는 현상
authors: me
tags: [docker, k8s, mac]
date: 2019-04-12 19:30:42
---

## 원인

모하비 문제인지 최근 엣지 버전 Docker for Mac 이 문제인지 잘 모르겠지만,
부팅시에 **Kubernates is starting** 문구가 지속되며 CPU의 온도를 90도까지 올려버린다.

맥북이 트랜스포머가 되어 곧 제트기가 될 것처럼 굉음이 나는데 해결해보자.

## 해결

- **Docker > Prefereneces > Reset** 에서 Reset to factory defaults 로 공장 초기화를 진행한다.
- `~/.kube` 폴더를 강제로 삭제한다.
- 다시 쿠버네티스를 실행한다.

## 여담

쿠버네티스 뿐 아니라 도커 자체가 맥에서 CPU 가 튀는 현상이 있는데,
[여기](https://github.com/docker/for-mac/issues/1759) 이슈에서 관리가 되고 있다.

file watch 기능을 끄거나, 볼륨을 해제하거나, 맥 디스크 암호화 기능을 꺼보라는데 신뢰할 수 있는 방법은 아니다.

도커 켜놓고 잠자기 해놓으면 과열로 맥북 켜지지도 않을 수 있어서 해결될 때까진 윈도우에서 돌려야할 듯 싶다.
