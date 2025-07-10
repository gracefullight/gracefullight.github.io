---
title: AWS 용어 정리
authors: me
tags:
  - aws
date: 2017-07-16 16:03:14
---

AWS의 생태계에 들어가기 위해선 먼저 용어에 익숙해져야 될 것 같았다.
사용법은 쉬운데.. 약어가 처음 접하는 사람에게 조금 부담스러웠다.

## 용어

| 서비스명                        | 약어 | 설명                                 |
| ------------------------------- | ---- | ------------------------------------ |
| **Elastic Compute Cloud**       | EC2  | 클라우드 서버                        |
| EC2 Container Service           | ECS  | Docker 컨테이너 서버                 |
| **Elastic Load Balancing**      | ELB  | 트래픽, 부하 분산 서비스             |
| Lambda                          | -    | 클라우드 Function                    |
| Scale Up                        | -    | 인스턴스 물리용량 증가               |
| Scale Out                       | -    | 인스턴스 복제                        |
| **Auto Scaling**                | -    | 인스턴스 Scale 자동화                |
| **Route 53**                    | -    | DNS 서비스                           |
| **Virtual Private Cloud**       | VPC  | 내부망 구축 서비스                   |
| **Relational Database Service** | RDS  | RDBMS 구축 서비스                    |
| DynamoDB                        | -    | NoSQL 구축 서비스                    |
| **Simple Storage Service**      | S3   | 데이터 스토리지 서비스 (파일서버)    |
| **CloudFront**                  | -    | CDN 서비스                           |
| Glacier                         | -    | 저렴한 스토리지 서비스 (주로 백업용) |
| **Elastic Block Store**         | EBS  | EC2의 가상 하드디스크                |
| Identity and Access Management  | IAM  | 인증, 권한 부여                      |
| **CloudWatch**                  | -    | AWS 리소스 모니터링                  |
| Elastic Beanstalk               | EB   | PaaS                                 |
| LightSail                       | -    | 저렴한 EC2 (VPS)                     |

## 여담

전체적으로 GCP보다 용어가 직관적이지 않은 느낌 (App Engine, Compute Engine을 보면 얼마나 멋진가)이였는데, 풀어 놓고 적어보니 GCP도 AE, CE 이렇게 적으면 못 알아 먹었겠구나.
