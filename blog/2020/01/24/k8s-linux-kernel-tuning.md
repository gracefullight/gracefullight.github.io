---
title: 쿠버네티스 리눅스 커널 튜닝하기
authors: me
tags: [k8s, docker, linux]
date: 2020-01-24 23:43:55
---

# 변경가능한 커널 설정

노드 레벨의 sysctl과 네임스페이스 sysctl과 같은 커널 파라미터를 sysctl 인터페이스로 변경할 수 있다.
변경 가능한 파라미터는 다음과 같다.

- **abi**: 실행 도메인 특성
- **fs**: 특정 파일 시스템, 파일 핸들링, inode, dentry, 쿼터 조정
- **kernel**: 전역 커널 설정 변경
- **net**: 네트워킹
- **sunrpc**: SUN rpc 호출
- **vm**: 메모리 조정, 버퍼 및 캐시 관리
- **user**: 사용자별 네임스페이스 제한

`taint, toleration` 을 같이 사용해 사이드이펙을 방지하라고 권하고 있다.

## ARP 캐시

> neighbour: arp_cache: neighbor table overflow!

쿠버네티스가 대량의 IP를 소비하면서 ARP 캐시 공간을 모두 사용할 경우 ARP 캐시 관련 변수 조절이 가능하다.
대규모 HPC 클러스터에서는 흔한 일이며 쿠버네티스의 주소 소진을 방지할 수 있다.
이 오류는 `nodes with 40+ cores` && `more than 16 segments in each node` 정도에서 발생하는 듯 하다.

- **net.ipv4.neigh.default.gc_thresh1**: gc_thresh1 represents the minimum number of entries that may be in the ARP cache. Garbage collection will not be triggered if the number of entries is below this setting.
- **net.ipv4.neigh.default.gc_thresh2**: gc_thresh2 represents the soft maximum number of entries that may be in the ARP cache. This setting is arguably the most important, as ARP garbage collection will be triggered ~5s after reaching this soft maximum.
- **net.ipv4.neigh.default.gc_thresh3**: gc_thresh3 represents the hard maximum number of entries in the ARP cache.

```bash
net.ipv4.neigh.default.gc_thresh1 = 80000
net.ipv4.neigh.default.gc_thresh2 = 90000
net.ipv4.neigh.default.gc_thresh3 = 100000
```

# 예시

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sysctl-example
spec:
  securityContext:
    sysctls:
      - name: kernel.shm_rmid_forced
        value: "0"
      - name: net.core.somaxconn
        value: "10000"
      - name: kernel.msgmax
        value: "65536"
      - name: fs.file-max
        value: "2097152"
      - name: net.ipv4.ip_local_port_range
        value: "1024 65536"
```

# 여담

- 파면 팔수록 리눅스부터 다시 정리해야되겠다는 느낌이 든다.

# 참조

- [Using sysctls in a Kubernetes Cluster](https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/)
- [리눅스 서버의 TCP 네트워크 성능을 결정짓는 커널 파라미터 이야기 - 2편](https://meetup.toast.com/posts/54)
- [How to increase the ARP cache garbage collection threshold](https://success.docker.com/article/how-to-increase-the-arp-cache-collection-threshold)
- [Scaling Kubernetes to 2,500 nodes](https://openai.com/blog/scaling-kubernetes-to-2500-nodes/)
