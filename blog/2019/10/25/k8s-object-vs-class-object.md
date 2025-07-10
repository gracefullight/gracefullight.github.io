---
title: 쿠버네티스 오브젝트와 클래스 오브젝트 비교
authors: me
tags:
  - k8s
  - docker
  - java
date: 2019-10-25 15:49:57
---

## 앞서

쿠버네티스를 이해하는 건 어렵다. DevOps 의 전반적인 플로우를 알아야 이 플로우도 이해가 가기 때문이라 생각한다.
생소한 용어들도 어렵다. [한 판을 정리](/2019/06/09/kubernetes의-모든-것/) 했지만 매번 참조해야되는 듯하다.

## 오브젝트 비교

| 개념                        | JAVA 클래스                      | 쿠버네티스 오브젝트                                                 |
| --------------------------- | -------------------------------- | ------------------------------------------------------------------- |
| 캡슐화                      | Class                            | Container image                                                     |
| 인스턴스                    | Object                           | Container                                                           |
| 재사용단위                  | jar                              | Container image                                                     |
| 컴포지션                    | Class A Contains Class B         | Sidecar pattern                                                     |
| 상속                        | Class A extends Class B          | A container's from parent image                                     |
| 배포단위                    | jar, war...                      | Pod                                                                 |
| 빌드 및 런타임 아이솔레이션 | Module, Package, Class           | Namespace, Pod, Container                                           |
| 초기화                      | Consturctor                      | Init container                                                      |
| 초기화 후 트리거            | Init method                      | postStart                                                           |
| 종료 전 트리거              | Destroy                          | preStop                                                             |
| Cleanup                     | finalize(), shutdown hook        | [Defer container](https://github.com/kubernetes/community/pull/483) |
| 비동기, 병렬 실행           | ThreadPoolExecutor, ForkJoinPool | Job                                                                 |
| 스케쥴링                    | Timer, ScheduledExecutorService  | CronJob                                                             |
| 백그라운드                  | Daemon thread                    | DaemonSet                                                           |
| 설정관리                    | System.getenv(), Properties      | ConfigMap, Secret                                                   |

## 여담

- 개념 설정 전에 이 표를 알았더라면 훨씬 이해가 쉬웠을텐데
