---
title: Kubernetes의 모든 것
authors: me
tags: [k8s, docker]
date: 2019-06-09 12:23:59
---

매번 용어 찾아보는 게 귀찮아서 정리했다.
어떤 기능을 yaml 로 구성해야하는지 감이 오는 듯하다.

# 노드

- 컨테이너가 배치되는 서버
- 쿠버네티스 클러스터의 관리 대상으로 등록된 **도커 호스트**
- 쿠버네티스 클러스터는 마스터와 노드의 그룹으로 구성
- `kubectl get nodes`

## 마스터 노드

- 스웜의 매니저노드와 비슷한 느낌이다.
- kube-apiserver: 쿠버네티스 API를 노출하는 컴포넌트 kubectl로부터 리소스를 조작하라는 지시를 받음
- ectd: 고가용성을 갖춘 분산 Key/Value 스토어로 쿠버네티스 클러스터의 백킹스토어로 쓰인다. (CAS)
- kube-scheduler: 노드를 모니터링하고 컨테이너를 배치할 적절한 노드탐색
- kube-controller-manager: 리소스를 제어하는 컨트롤러 실행

> 일반적인 (non-managed, GKE 등이 없는) 환경에선 마스터 노드서버가 단일 장애지점 (SPOF)가 되지 않도록 마스터를 3대 두는 것이 필수다.

# 네임스페이스

- 쿠버네티스 클러스터 안의 가상 클러스터
- 네임스페이스마다 권한을 줄 수 있으므로 개발팀이 클 때 유용하다.
- 기본으론 `default, docker, kube-public, kube-system` 네임스페이스가 있다.
- `kubectl get namespace`

# 파드

- 컨테이너의 집합 중 가장 작은 단위로, 컨테이너의 실행 방법을 정의
- 적어도 하나 이상의 컨테이너로 이뤄져있다.
  - nginx reverse proxy + application web server
- 파드는 노드 안에 들어간다.
- 함꼐 배포해야 정합성, 일관성이 유지된다면, 같은 파드로 묶어 배포한다.
- 파드엔 각각 고유의 가상 IP가 할당된다.
- `kubectl get pod`

# 레플리카세트

- 같은 스펙을 갖는 파드를 여러 개 생성/관리 하는 역할
- 똑같은 파드의 레플리케이션 개수를 관리하는 리소스이다.
- 삭제된 파드는 복원할 수 없기 때문에 웹 어플리케이션과 같은 stateless 파드에 사용하기에 좋다.
- `kubectl get replicaset`
- 레플리카셋의 파드명은 container-1b2e3f 처럼 임의로 정해진다.

# 디플로이먼트

- 레플리카세트의 리비전을 관리 (빠른 버저닝)
- 리비전은 컨테이너 이미지가 수정된 경우에 생성된다.
- `kubectl rollout history deployment ..`

# 데몬셋

- 모든 시스템에서 실행되어야하는 파드와 템플릿 제공
- 노드 당 하나

# 서비스

- 파드의 집합에 접근하기 위한 경로를 정의
- 쿠버네티스 클러스터 내에서 파드의 집합에 대한 경로나 서비스 디스커버리를 제공하는 리소스
- 서비스의 대상이 되는 파드는 서비스에서 정의하는 레이블 셀렉터로 정해진다.
- 서비스의 접근은 같은 네임스페이스라면 서비스명만으로 접근이 가능하다.
  - `http://${svc} => http://${svc}.default => http://${svc}.default.svc.local`

## ClusterIP 서비스

- 서비스의 기본 타입
- 쿠버네티스 클러스터의 내부 IP 주소에 서비스를 공개할 수 있다.
- 다른 파드 그룹으로 접근할 때 서비스를 거쳐 가도록 할 수 있으며, 서비스명으로 네임 레졸루션이 가능해진다.
- 외부에서는 접근할 수 없다.

## NodePort 서비스

- 쿠버네티스 클러스터 외부에서 접근할 수 있는 서비스
- 서비스를 L4 레벨에서 노출하는 것이므로 TCP/UDP 모두 다룰 수 있다.
- `kubectl get svc ...`

## LoadBanlancer 서비스

- 로컬 쿠버네티스 환경에선 사용할 수 없다.

## ExternalName 서비스

- 쿠버네티스 클러스터에서 외부 호스트를 네임 레졸루션하기 위한 별칭이다.
- gracefullighut.dev 를 gracefullight 로 접근 가능하게 만든다.

# 인그레스

- 서비스를 쿠버네티스 클러스터 외부로 노출
- NodePort 서비스는 L4라 HTTP/S의 경로기반 라우팅이 불가능한데, 인그레스는 L7 레벨로 제어가 가능하다.
- 주로 HTTP/S 서비스를 노출하는 경우 사용한다.
- 로컬 쿠버네티스 환경에서는 인그레스를 사용해 서비스를 노출시킬 수 없으므로 [nginx ingress controller](https://github.com/kubernetes/ingress-nginx) 를 사용한다.

# 컨피그맵

- 설정 정보를 정의 후 파드에 전달

# 퍼시스턴트볼륨

- 파드가 사용할 스토리지의 크기 및 종류를 정의

## 퍼시스턴트볼륨 클레임

- 퍼시스턴트 볼륨을 동적으로 확보

# 스토리지클래스

- 퍼시스턴트 볼륨이 확보하는 스토리지의 종류를 정의

# 스테이트풀세트

- 같은 스펙으로 모두 동일한 파드를 여러 개 생성하고 관리
- 스테이트풀셋의 파드명은 backend-0, backend-1 처럼 인덱스로 정해진다.

# 잡

- 일회성 파드를 여러 개 생성하고 종료 보장

# 시크릿

- 인증 정보 등 비밀 데이터 정의

# 롤

- 네임스페이스 안에서 조작 가능한 쿠버네티스 리소스의 규칙 정의
- 각 쿠버네티스 API 사용 권한 정의
- **지정된 네임스페이스 내에서만 유효**

## 롤 바인딩

- 쿠버네티스 리소스 사용자와 롤을 연결

## RBAC

- Role-based access control (RBAC) is a method of regulating access to computer or network resources based on the roles of individual users within an enterprise.
- [Docs](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

## 권한 디버깅

```bash
# can-i 문으로 권한 확인 가능
$ kubectl auth can-i ...

# kubectl auth can-i create deployments
# yes
```

# 클러스터롤

- 클러스터 전체적으로 조작 가능한 쿠버네티스 리소스의 규칙 정의
- **클러스터 전체에서 유효**

## 클러스터롤 바인딩

- 쿠버네티스 리소스 사용자와 클러스터롤을 연결
- 일반 사용자 및 그룹/서비스 계정과 클러스터롤을 연결

# 서비스 계정

- 파드가 쿠버네티스 리소스를 조작할 때 사용하는 계정
- 구글의 서비스 계정 비슷한 듯

# 노드어피니티

- 노드 셀렉터보다 더 세밀한 선택이 가능 (스케줄링 정책 조건 등)

# 테인트

- taint
- 오염 조건을 추가해 노드 스케줄링에서 제외
- 파드를 특정 노드로 강제할 수 있다.

# 컨트롤 플레인

- kubelet, kubenetes master 등 컨트롤 플레인은 시스템 내 모든 쿠버네티스 오브젝트의 레코드를 유지하면서, 오브젝트의 상태를 관리하는 제어 루프를 지속적으로 구동

# Dynamic Admission Control

- 웹훅으로 동작
- ValidationWebhookConfiguration
- MutatingWebhookConfiguration

# 클러스터 데몬

- 클러스터 모든 서비스에 검사, 실행 필요시 사용

# 클러스터어시스턴스

- SSL 인증 배포 등 자동화
- cert-manager
