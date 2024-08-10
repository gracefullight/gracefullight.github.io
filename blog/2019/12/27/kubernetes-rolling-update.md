---
title: 쿠버네티스 롤링 업데이트와 배포
authors: me
tags: [k8s, docker]
date: 2019-12-27 20:43:20
---

## Deployment

Deployment 의 파드 교체 전략에는 **RollingUpdate** 와 **Recreate** 가 있다.
기본 값은 **RollingUpdate** 이며 간단한 설정이 적용된 디플로이먼트는 아래와 같을 것이다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-rolling-update
  label:
    app: test
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 3
      maxSerge: 4
  selector:
    matchLabels:
      app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      containers:
        - name: test
          image: echo
          ports:
            - containerPort: 8080
```

여기서 롤링업데이트 속성을 좀 더 자세히 알아보자.

### RollingUpdate

#### maxUnavailable

- 롤링 업데이트 중 동시에 삭제할 수 있는 파드의 최대 갯수
- 기본 값은 replicas의 25% 이다.
- `replicas: 4`의 경우 1개 파드 삭제, `replicas: 8`의 경우 2개 파드 동시 삭제
- 퍼센트 및 직접 지정이 가능하다.
- 위의 예시 디플로이먼트에서 롤링업데이트 시작 시 파드 3개가 바로 죽는다.
- 이 값을 높게 설정하면 동시에 교체되는 파드가 늘어나므로 롤링 업데이트 시간이 줄어든다.
  - 하지만 롤링업데이트 중에 남아 있는 파드에 요청 수가 몰릴 수 있다.
  - 따라서 `1`로 설정해 파드를 하나씩 교체하는 것이 안전할 수 있다.

#### maxSurge

- 롤링 업데이트 중 동시에 생성하는 파드 갯수
- 기본 값은 replicas의 25% 이다.
- `replicas: 4`면서 `maxSurge: 4`면 롤링 업데이트 시작 시 새 버전의 파드가 4개 추가로 생성된다.
- 이 값을 높게 설정하면 필요한 파드를 빨리 생성하므로 파드 교체 시간이 단축된다.
  - 하지만 필요한 시스템 자원이 급증할 수 있다.

### Probe

세부 설정은 [Docs](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes)를 참조하자

#### livenessProbe

- 애플리케이션 헬스 체크 기능
- 애플리케이션이 의존하는 컨테이너 안의 파일의 존재여부 확인
- Unhealthy 상태의 경우 파드 재시작

#### readinessProbe

- 컨테이너 외부에서 HTTP 등의 트래픽을 발생시켜 처리할 수 있는 상태인지 확인
- `tcpSocket`으로 포트 지정도 가능하다.

### 응답 중인 파드 교체

응답 중인 파드가 교체되는 경우 `SIGTERM` 신호를 보내 파드가 삭제되는데,
`Graceful Shutdown` 상태로 만들기 위해서 종료 처리가 오래 걸리는 파드엔 **terminationGracePeriodSeconds** 를 설정해주는 것이 좋다.

```yaml
spec:
  # 기본값 30
  terminationGracePeriodSeconds: 40
  containers:
    - name: maria
      image: maria:latest
```

*Nginx*처럼 `SIGTERM` 시그널을 받고 바로 종료되는 어플리케이션이 있는 파드라면, 라이플사이클 훅을 활용해 안전하게 종료시키는 것이 중요하다.

```yaml
spec:
  containers:
    - name: nginx
      image: nginx:latest
      ports:
        - containerPort: 80
      lifecycle:
        # 파드 종료 전 훅
        preStop:
          exec:
            command: ["/usr/sbin/nginx", "-s", "quit"]
```

### 파드 1:1 교체

그렇다면 `replicas: 1`인 파드를 1:1 교체 시에는 어떤 전략을 가져가야할까
답은 아래와 같다.

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    # 롤링 업데이트 시 삭제 되는 파드 수
    maxUnavailable: 0
    # 롤링 업데이트 시 새로 생성되는 파드 수
    maxSurge: 1
```

여기에 파드가 트래픽을 받을 수 있는지 `readinessProbe`를 추가해주면 된다.

```yaml
readinessProbe:
  httpGet:
    path: /ping
    port: 80
  initialDelaySeconds: 5
  periodSeconds: 5
  successThreshold: 1
  failureThreshold: 3
  timeoutSeconds: 3
```

5초 후에 5초마다 `/ping` 을 보내 성공여부를 확인한다.
타임아웃은 3초며 3번까지 재시도한다.

### Blue/Green

- 디플로이먼트를 2개 만들고, 서비스의 selector 값을 라벨에 따라 변경하자.
- 서비스메시를 연동하면 카나리아 배포 방식도 가능하다.
