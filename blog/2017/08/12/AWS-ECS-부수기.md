---
title: AWS ECS 부수기
authors: me
tags: [aws, docker, k8s]
date: 2017-08-12 00:39:25
---

ECS 는 서울 리젼이 아직 없어서 그런가, 구글링해도 사용할만한 데이터가 너무 적었다.
(기초 설명은 잘 되있다. 하지만 Hello World Application 을 올리려고 ECS 를 쓰는 건 아니니까..)

# 용어

## Cluster

> Amazon ECS 클러스터는 작업을 배치할 수 있는 컨테이너 인스턴스의 논리적 그룹화입니다.
> 이 공식 설명을 보고 Cluster 에 대한 감을 잡기가 쉽지 않았다.

- 간단히하면 Docker Container 를 올리는 EC2 Instance 이다.
- K8S 의 그 클러스터이다.

## Task

- Task 는 작업이라고 번역되며, 하나의 Task Definition JSON 은 하나의 Docker-compose YAML 이라고 보자.

## Container Definition

- 배포되는 각 컨테이너의 정의
- 파드의 개념

## Task Definition

- 컨테이너의 집합인 Task의 정의
- 파드의 개념

## Service

> Amazon ECS 는 단일 ECS 클러스터에서 작업 정의에 지정된 수("원하는 개수")의 인스턴스를 동시에 실행 및 관리할 수 있게 해줍니다.
> 어떤 이유로 작업이 실패 또는 중지되는 경우 Amazon ECS 서비스 스케줄러가 작업 정의의 다른 인스턴스를 시작하여 이를 대체하고 서비스의 원하는 작업 수를 유지합니다.

- Task 를 자동으로 관리할 수 있게 하는 기능, LB 나 Auto Scaling 모두 여기서 적용이 된다.
- 롤링 업데이트 시에 배포 및 오토 스케일링을 담당한다.
- K8S의 서비스, 디플로이먼트, 레플리카세트의 역할

## Repository

AWS Docker 레지스트리 서비스로 AWS Private DockerHub 라고 보자.

# 네트워크 모드

| 모드    | 내용                                                                             |
| ------- | -------------------------------------------------------------------------------- |
| default | 네트워크 모드 기본값으로 bridge와 같음                                           |
| awsvpc  | AWS에서만 제공되는 네트워크 모드 (ENI가 Task 자체 VPC의 IP 주소할당)             |
| bridge  | DockerContainer를 호스트와 같은 네트워크에 배치해 라우팅 없이 컨테이너 접근 가능 |
| host    | Task가 배치되는 호스트의 네트워크를 공유하는 모드 (Fargate 사용 불가)            |
| none    | Task에 속한 컨테이너의 외부 접근이 불가능하고 포트 매핑 사용불가                 |

# 볼륨 생성

-v 또는 --volume 으로 Host 의 폴더를 Mount 하는 기능이 꼭 필요한데, 설정 창에선 찾기가 너무 힘들었다.
ECS 에서는 **작업 정의 생성** 시에 하단에 **볼륨 추가** 를 꼭 먼저 클릭해 볼륨부터 추가해야한다.

![image from hexo](https://i.imgur.com/C4iUL0x.png)
이름엔 --name 옵션 사용하듯이 닉네임을 넣고
소스 경로엔 Host directory 경로를 넣자.

추가가 되면 **컨테이너 추가** 시에 **탑재 지점** 메뉴의 **소스 볼륨** select box 에서 선택할 수 있다.

![image from hexo](https://i.imgur.com/BJrFNCX.png)

이 짓을 하는 것보단 [공식 문서](https://docs.aws.amazon.com/ko_kr/AmazonECS/latest/developerguide/task_definition_parameters.html)의 Task Definition JSON Parameter 를 보고 JSON 으로 때려박는게 편하다.

예시 JSON 은 아래와 같다.
(3306 과 3307 을 열고 Host 의 Data 폴더를 Mount 하는 기본 구성의 MariaDB Image)

```json title="mariadb"
{
  "requiresAttributes": [
    {
      "value": null,
      "name": "com.amazonaws.ecs.capability.docker-remote-api.1.21",
      "targetId": null,
      "targetType": null
    }
  ],
  "taskDefinitionArn": "your task definition arn",
  "networkMode": "bridge",
  "status": "ACTIVE",
  "revision": 3,
  "taskRoleArn": null,
  "containerDefinitions": [
    {
      "volumesFrom": [],
      "memory": null,
      "extraHosts": null,
      "dnsServers": null,
      "disableNetworking": null,
      "dnsSearchDomains": null,
      "portMappings": [
        {
          "hostPort": 3306,
          "containerPort": 3306,
          "protocol": "tcp"
        },
        {
          "hostPort": 3307,
          "containerPort": 3307,
          "protocol": "tcp"
        }
      ],
      "hostname": null,
      "essential": true,
      "entryPoint": null,
      "mountPoints": [
        {
          "containerPath": "/var/lib/mysql",
          "sourceVolume": "dbdata",
          "readOnly": null
        }
      ],
      "name": "maria",
      "ulimits": null,
      "dockerSecurityOptions": null,
      "environment": [
        {
          "name": "MYSQL_DATABASE",
          "value": "db"
        },
        {
          "name": "MYSQL_PASSWORD",
          "value": "db_pw"
        },
        {
          "name": "MYSQL_ROOT_PASSWORD",
          "value": "root_pw"
        },
        {
          "name": "MYSQL_USER",
          "value": "db_user"
        }
      ],
      "links": null,
      "workingDirectory": null,
      "readonlyRootFilesystem": false,
      "image": "mariadb:latest",
      "command": [
        "mysqld",
        "--character-set-server=utf8",
        "--collation-server=utf8_general_ci"
      ],
      "user": null,
      "dockerLabels": null,
      "logConfiguration": null,
      "cpu": 0,
      "privileged": null,
      "memoryReservation": 500
    }
  ],
  "placementConstraints": [],
  "volumes": [
    {
      "host": {
        "sourcePath": "/ecs/dbdata"
      },
      "name": "dbdata"
    }
  ],
  "family": "mariadb"
}
```

## 고민

Container 를 Task 별로 생성해야하는데, 그럼 Task JSON 에서 link 옵션을 연결할 수가 없다. 이 경우엔 어떻게 Task Definition 을 짜야되나?
EC2 에 접근해서 매번 link 를 생성해서 다시 올려야되나?

이 부분을 해결하기 위해선 [ecs-task-kite](https://github.com/awslabs/ecs-task-kite)를 사용하거나 VPC 를 구성해 수동으로 연결해 주는 방법 밖에 없다.

쉬운 방법으로 가자면 DB 는 (모든 컨테이너가 하나의 데이터를 바라봐야하는) `RDS`나 `ElastiCache`처럼 AWS 의 서비스 사용하고 VPC 를 구성해 Backend, Frontend 단의 서버만 ECS Task 를 만들어서 가변적으로 돌리는 게 좋아보인다.

물론 동기화를 할 수도 있는데... 삽질할 시간에 더 잘 나온 포스팅을 기다려본다.

# 여담

그냥 모니터링 컨테이너 하나 더 띄우고, HAProxy 컨테이너 올리고 EC2 에 다 때려박고 싶다.

> [AWS Korea week in review](https://aws.amazon.com/ko/blogs/korea/week-in-review-28-08-17/)에 소개되었다.
