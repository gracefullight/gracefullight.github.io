---
title: 나를 위한 면접 (Backend Developer Interview Questions)
authors: me
tags: [interview]
date: 2018-02-18 14:13:34

---

[BE Interview Questions](https://github.com/arialdomartini/Back-End-Developer-Interview-Questions)를 아는 만큼 답해보았다
지극히 주관적이라 정답이 아닐 수 있습니다

# Design Patterns

## Why are global and static objects evil?

- 전역변수는 어디서 변경되었는지 추적이 힘듦
- 그리고 자바의 경우 콜스택이 끝나면 비워지는 지역변수와 달리 메모리의 static 영역에 계속 상주해 있음

## Tell me about Inversion of Control and how does it improve the design of code

- 클래스 안에 다른 클래스의 기능이 필요하다면 내부에서 생성자를 이용해 두 클래스 간의 종속이 생겨버리는데
- IoC를 통한다면 DI 패턴으로 구현해 `new A(new B())` 처럼 종속성을 분리시킬 수 있음
- TypeHint를 통해 의존성을 확인할 수 있으므로 더 직관적이기도 하다
- [What is Inversion of Control?](https://stackoverflow.com/questions/3058/what-is-inversion-of-control)

## Active-Record is the design pattern that promotes objects to include functions such as Insert, Update, and Delete, and properties that correspond to the columns in some underlying database table. In your opinion and experience, which are the limits and pitfalls of the this pattern?

- 장점
  - 하나의 구조로 모든 모델을 제어할 수 있게 해준다.
  - 또한 모든 DB 마다 다른 쿼리문 (예를 들어 페이징)을 손쉽게 처리할 수도 있다.
  - 무엇보다 엄청 빠르게 DB 조작이 가능해진다.
- 단점
  - DB를 잊어버리게 되는 것 아닐까? ActiveRecord로 개발을 시작하는 건 아니다라고 본다.
  - 여러 테이블의 조인이 힘들고 (조인 조건을 만족하기 위해) 계산이 들어간 쿼리문이라면 어차피 RAW 쿼리를 날려야한다.
  - 프로시져를 사용할 수도 없고, 관계형 모델들은 select를 키값을 통해 여러 번 select 한 뒤 합쳐주는 것 뿐이라 성능상의 이슈도 있다.
  - 결국 필요한 곳에서만 (RESTful 구조의) 사용해서 개발하는 게 좋을 것 같다

## Data-Mapper is a design pattern that promotes the use of a layer of Mappers that moves data between objects and a database while keeping them independent of each other and the mapper itself. On the contrary, in Active-Record objects directly incorporate operations for persisting themselves to a database, and properties corresponding to the underlying database tables. Do you have an opinion on those patterns? When would you use one against the other?

> The big benefit of the Data Mapper pattern is, **your domain objects don't need to know anything about how they are stored in the database**. This means that your objects will be lighter because they don't have to inherit the full ORM, but also there will be a stricter, more formal process for interacting with the database because you can't just call the save() method anywhere in your code

- 데이터 매퍼는 DB 스키마와 독립적인 모델을 갖고 싶을 때 사용한다
- ActiveRecord의 속도보다 성능이 필요한 경우 사용하면 된다.
- [What's the difference between Active Record and Data Mapper](http://culttt.com/2014/06/18/whats-difference-active-record-data-mapper/)

## Why it is often said that the introduction of null is a "Billion dollar mistake"? Would you discuss the techniques to avoid it, such as the Null Object Pattern introduced by the GOF book, or Option types?

- null 로 변수를 생성하는 건 안하는 거랑 똑같지만, 안 해주면 프로그램이 뻗어버려서 null 타입 체크를 하거나 default값을 추가한다.
- [10억 달러짜리 실수](http://bangjunyoung.blogspot.kr/2014/06/the-billion-dollar-mistake.html)

## Many state that, in Object-Oriented Programming, Composition is often a better option than Inheritance. What's you opinion?

- 부모-자식 관계면 상속이지만, Has 관계이면 컴포지션
- [잘못 알려진 디자인 패턴의 두번째 원칙](https://arload.wordpress.com/2009/02/18/misconception_of_gof_dp/)

## What is an Anti-corruption Layer?

- 추상화 한 레이어를 하나 더 두고 하위 도메인들을 쉽게 접근할 수 있게 하는 방법, facade 처럼

## Singleton is a design pattern that restricts the instantiation of a class to one single object. Writing a Thread-Safe Singleton class is not so obvious. Would you try?

- `Volatile`

## How would you deal with Dependency Hell?

- 의존성 컨테이너를 사용한다.
- 패키지 매니저툴을 이용하며 버전을 명시한다.
- maven, composer, npm 등등

## Is goto evil?

- 적절하게, 가독성 있게 사용하면 괜찮다.
- [리눅스 커널](https://github.com/torvalds/linux/blob/master/fs/dlm/main.c) 이런 느낌으로

# Code Design

## It is often heard that one of the most important goals in Object-Oriented Design is to have High Cohesion and Loose Coupling. What does it mean? Why is it that important and how is it achieved?

- Coupling
  - 모듈 간에 상호 의존하는 정도
  - 각 모듈 간의 결합도가 약해야 하며 의존하는 모듈이 적어야한다.
  - 결합도가 강하면 시스템 구현 및 유지보수 작업이 어렵다.
- Cohesion
  - 정보 은닉 개념을 확장한 것
  - 명령어나 호출문 등 모듈의 내부 요소들의 서로 관련되어 있는 정도
  - 모듈이 독립적인 기능으로 정의되어 있는 정도
  - 독립적인 모듈이 되기 위해서는 각 모듈의 응집도가 강해야한다

## Why does array index start with '0' in most of languages?

- 배열이 참조하는 메모리의 위치를 나타내므로 (시작 위치에서의 기준점)

## Are comments in code useful? Some say they should be avoided as much as possible, and hopefully made unnecessary

- 변수명, 메소드명으로 명확하게 표현할 수 있으면 좋은데, 그러긴 현실적으로 힘들고
- JSDoc 같은 구문으로 주석을 단다면 참조하는 다른 소스에서도 hover만으로 모든 설명을 볼 수 있어서도 좋고

## What is the difference between design and architecture?

- Software architecture is more about the design of the entire system, while software design emphasizes on module / component / class level.
- **Architecture**: MVC, 3-tier layered design, etc.
- **Design**: What are the responsibilities, functions, of module x? Of class Y? What can it do, and what not?
- [Software Design vs. Software Architecture](https://stackoverflow.com/questions/704855/software-design-vs-software-architecture)

## C++ supports multiple inheritance, and Java allows a class to implement multiple interfaces. What impact does using these facilities have on orthogonality? Is there a difference in impact between using multiple inheritance and multiple interfaces? Is there a difference between using delegation and using inheritance?

- implements가 좀 더 유연하다 클래스 안에서 직접 구현해야되는거니까

## Pros and cons of holding domain logic in Stored Procedures

- 장점
  - 한 번 만든걸 계속 호출해서 쓸 수 있음
  - 컴파일 언어의 경우 쿼리만 변경하는거니 유지보수가 좋을 수 있음
  - 계산이 들어가는 쿼리의 경우 SP는 캐싱되므로 이만한게 없음
- 단점
  - DB에 완전 종속됨
  - DBA가 있어야함
  - git에서 변경점 추적 불가능

## In your opinion, why have Object-Oriented Design dominated the market for so many years?

- 관심사의 분리

# Languages

## Tell me the 3 worse defects of your preferred language

- PHP
  - 컴파일 언어가 아니라 느림 (PHP7부턴 달라짐, OpCache를 사용하면 되긴함)
  - 쓰레드가 없음 (PHP React나 Guzzle promise 같은 걸 사용하면 event driven 방식으로 되긴 함)
  - 인식이 안 좋음
  - 함수명이 너무 제각각임 (어떤 건 snake_case 어떤건 붙혀서)

## Why is there a rising interest on Functional Programming?

- 각 실행 단계를 이뮤터블로 만들어 Side effect를 없앤다.
- 테스트가 쉽다.
- 가독성이 높아진다

## What is a closure, and what is useful for? What's in common between closures and classes?

- FE 인터뷰에 정리해놓았다

## What are generics useful for?

- 타입 캐스팅

## What are high-order functions? What are they useful for?

- 함수를 파라미터로 전달받거나, 함수를 리턴하는 함수로 다형성을 지원해 재사용이 가능하다

## What does it mean when a language treats functions as first-class citizens?

- 변수나 데이터에 할당 가능
- 파라미터로 넘길 수 있어야함
- 리턴값으로 리턴이 가능해야함

## Show me an example where an Anonymous Function can be useful

- 모든 콜백에서 유용함

## Whats the Stack and what's the Heap? What's a Stack Overflow?

- Stack: LIFO
- Heap: 최소 또는 최대 값이 루트에 있는 완전 이진 트리
- Stack Overflow: 지식인 또는 Stack이 꽉 찼는데 삽입하려 들 때

## Some languages, especially the ones that promote a Functional approach, allow a technique called Pattern Matching. Do you know it? How is Pattern Matching different from Switch clauses?

- C#에서 `is` 구문을 말하는건가?
- `switch`는 하나의 타입에서만 비교가 가능한데, 패턴매칭을 쓰면 더 동적으로 비교가 가능하다

## If Cat is an Animal

`is TakeCare<Cat> a TakeCare<Animal> ?`

- 같지는 않지만 집어넣을 수는 있다

## In the last years there has been a lot of hype on Node. What's your opinion on the use in the back end of a language that was initially conceived to run in the browser?

- **Atwood's Law**: any application that can be written in JavaScript, will eventually be written in JavaScript.

### 참고

- [The Principle of Least Power](https://blog.codinghorror.com/the-principle-of-least-power/)

# Web development

## Why first-party cookies and third-party cookies are treated so differently?

- **first-party cookie**
- 자사 쿠키는 방문하는 웹사이트가 설정하며 해당 사이트에서만 사용
- **third-party cookie**
- 타사 쿠키에서 분석 등의 용도로 사용

## How would you manage Web Services API versioning?

- 시맨틱 버저닝

## From a Back End perspective, are there any disadvantages or drawbacks on the adoption of Single Page Applications?

- **백엔드 관점**
- 장점: 웹을 SPA로 가면 API가 필요하고, 디바이스 확장성에 대해 좋음
- 단점: SEO 때문에 어차피 SSR 해줘야됨

## Why do we usually put so much effort for having stateless services? What's so good in stateless code and why and when statefullness is bad?

- [stateful vs stateless](http://egloos.zum.com/outspace/v/3124886)

## REST and SOAP: when would you choose one, and when the other?

- [SOAP이냐 REST이냐](http://greatkim91.tistory.com/79)

## In Web development, Model-View Controller and Model-View-View-Model approaches are very common, both in the Back End and in the Front End. What are they, and why are they advisable?

- **MVC**
  - Controller로 사용자의 입력이 들어옵니다.
  - Controller는 Model을 데이터 업데이트 및 불러오고
  - Model은 해당 데이터를 보여줄 View를 선택해서 화면에 보여주게 됩니다.
- **MVVM**
  - View에 입력이 들어오면 Command 패턴으로 ViewModel에 명령을 합니다.
  - ViewModel은 필요한 데이터를 Model에 요청 합니다.
  - Model은 ViewModel에 필요한 데이터를 응답 합니다.
  - ViewModel은 응답 받은 데이터를 가공해서 저장 합니다.
  - View는 ViewModel과의 Data Binding으로 인해 자동으로 갱신 됩니다.
- [MVC, MVP, MVVM 비교](https://magi82.github.io/android-mvc-mvp-mvvm/)

# Databases

## How would you migrate an application from a database to another, for example from MySQL to PostgreSQL? If you had to manage that project, which issues would you expect to face?

- **Oracle => MySQL**
- date 처리에서 애를 먹었는데, 덤프를 바로 옮기지 않고 데이터를 가져와 다시 넣는 방식으로 마이그레이션 했다
- Right join (+ 조인)을 Left로 바꾸는데 시간이 걸렸다
- **MySQL => Maria**
- 완벽 호환, utf8mb4로 콜렉션과 차셋도 바꿔줌

## Why databases treat null as a so special case? For example, why in SQL SELECT \* FROM table WHERE field = null does not match records with null field?

- 저걸 처리하기 위해선 IS NULL 구문을 사용해야함

## ACID is an acronym that refers to Atomicity, Consistency, Isolation and Durability, 4 properties guaranteed by a database transaction in most of the database engines. What do you know about this topic? Would you like to elaborate?

- **원자성**
  - Atomicity
  - 트랜잭션 내의 명령은 반드시 완벽히 수행
  - 모두가 수행되거나 오류시 전부가 취소되어야함
- **일관성**
  - Consistency
  - DB의 전체 요소는 트랜잭션 수행 전과 트랜잭션 수행 완료 후의 상태가 같아야함
- **독립성**
  - Isolation = 격리성 = 순차성
  - 둘 이상의 트랜잭션이 병행 실행되는 경우 다른 트랜잭션 연산이 끼어들 수 없음
  - 수행 중인 트랜잭션은 완료될 때 까지 다른 트랜잭션에서 참조 불가
- **영속성**
  - Durability = 지속성
  - 시스템이 고장나도 영구적으로 반영

## How would you manage database schema migrations, that is, how would you automate the changes a database schema is affected to, as the application evolve, version after version?

- 프레임워크에서 migration 기능을 지원한다면 그걸 사용할 것이다

## How is Lazy Loading achieved? When is it useful? What are its pitfalls?

- 장점: 실제 로직이 실행될 때 로드가 되므로, 자원 소모를 해당 액션이 실행되기 전까지로 미룰 수 있다
- 단점: N+1 problem.

## The so called "N + 1 problem" is an issue that occurs when the code needs to load the children of a parent-child relationship with a ORMs that have lazy-loading enabled, and that therefore issue a query for the parent record, and then one query for each child record. How to fix it?

- Eager loading을 사용하거나 JPA의 경우 join fetch를 사용한다

# In your opinion, is it always needed to use database normalization? When is it advisable to use denormalized databases?

- 삽입, 삭제, 갱신 이상이 해결된다면, join의 감소를 위해 비정규화도 적절히 필요하다

# NoSQL

## What is Eventual Consistency?

> 데이터 삽입이 끝났지만 어떤 클라이언트에서는 업데이트 된 내용을 확인할 수 없다, 하지만 곧 확인할 수 있다

- [NoSQL에 대해서 간단히 알아보자!](https://embian.wordpress.com/2013/06/27/nosql-2/)

## The Brewer's Theorem, most commonly known as the CAP theorem, states that in the presence of a Network Partition (the P in CAP), a system's designer has to choose between Consistency (the C in CAP) and Availability (the A in CAP). Can you think about examples of CP, AP and CA systems?

- 일관성, 가용성, 분단허용성
- **Consistent - Available** : Postgres, MySQL같은 전통적인 RBMS
- **Consistent - Partition Tolerant** : BitTable, Hypertable, HBase, MongoDB, Terrastore, Redis, Scalaris, MemcacheDB, BerkeleyDB
- **Available - Partition Tolerant** : Amazon Dynamo, Cassandra, CouchDB, Amazon SimpleDB, Riak

- [CAP Theorem, 오해와 진실](http://eincs.com/2013/07/misleading-and-truth-of-cap-theorem/)
- [NoSQL에 대해서 #2](https://blog.outsider.ne.kr/520)

## How would you explain the recent rise in interest for NoSQL?

- Redis

## In which case would you use a document database like MongoDB instead of a relational database like MySQL or PostgreSQL?

- 단순 반복적인 질의기능 및 잦은 확장이 주로 필요한 서비스

- [NoSQL – 도대체 어떻게 선택해야 할까?](https://kimws.wordpress.com/2012/02/26/nosql-%EB%8F%84%EB%8C%80%EC%B2%B4-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%84%A0%ED%83%9D%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C/)

# code versioning

## Could you describe GitHub Flow and GitFlow workflows?

- Git Flow: feature > develop > release > hotfix > master
- GitHub Flow: feature 별 브랜치 > master, PR

## What's a rebase?

- 여러 브랜치를 하나의 브랜치(커밋)으로 합치기

# Concurrency

## Why do we need Concurrency, anyway?

- I/O를 기다리지 않고 다른 일을 처리하고 싶을 때, CPU 코어들을 최대한 쓰고 싶을 때

## Why is testing multithreading / concurrent code so difficult?

- 언제 값이 변경되는지 잡기가 힘들어서

## What is a Race Condition? Code an example, using whatever language you like

- 두 개 이상의 스레드에서 공유된 리소스에 접근할 때 순서에 따라 결과가 달라지는 현상
- for 문으로도 보여줄 수 있다

## What is a Deadlock? Would you be able to write some code that is affected by deadlocks?

- 이미 리소스를 점유한 스레드의 Lock이 해제될 까지 서로의 스레드가 계속 기다리는 현상

## What is Process Starvation? If you need, let's review its definition

- 우선 순위가 낮은 프로세스가 우선 순위가 높은 프로세스 때문에 계속 기다리는 현상

## What is a Wait Free algorithm?

- 전체 쓰레드가 공유 자원을 일관적으로 사용하면서도 대기하지 않고 그냥 진행되는 것

- [Lock Free](http://ozt88.tistory.com/38)
- [Lock-Free and Wait-Free, definition and examples](http://concurrencyfreaks.blogspot.kr/2013/05/lock-free-and-wait-free-definition-and.html)

# Distributed Systems

<!-- How to test a distributed system?
In which case would you apply asynchronously communication between two systems?
What are the general pitfalls of Remote Procecure Call?
If you are building a distributed system for scalability and robustness, what are the different things you'd think of in the case you are working in a closed and secure network environment or in geographically distributed and public system?
How to manage Fault Tolerance in a Web application? And in a Desktop one?
How to deal with failures in Distributed Systems?
Let's talk about the several approaches to Reconciliation after network partitions
-->

## What are the Fallacies of Distributed Computing?

- The network is reliable.
- Latency is zero.
- Bandwidth is infinite.
- The network is secure.
- Topology doesn't change.
- There is one administrator.
- Transport cost is zero.
- The network is homogeneous.
- [Fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing)

## When would you use Request/Reply and when Publish/Subscribe?

- 클라이언트에서 요청을 한 뒤 업데이트가 되야하면 Request/Reply
- 요청이 없어도 업데이트가 되야하면 Pub/Sub

## Suppose the system you are working on does not support transactionality. How would you implement it from scratch?

- 임시 테이블과 트랜잭션 성공테이블을 나눈다

# Software Lifecycle and Team Management

## What is the biggest difference between Agile and Waterfall?

- 고객과의 커뮤니케이션
- 일정 주기를 가지고 점진적인 기능개발

## How would you manage a very late project

- 차를 만들지 않고 바퀴부터 만들겠다
- 앱 환경에 따라 나중에 개발할 부분을 먼저 찾겠다

## Are Program Managers useful?

- 항상 필요하다
- 클라이언트나 보스로 부터의 의견 절충을 해주지 않으면 설계도가 나와 건물 다 올렸는데 철근 추가하는 미친 짓을 해야되니까.

# logic and algorithms

## How would you sort a 10GB file? How would your approach change with a 10TB one?

- 머지 소트

## How would you programmatically detect file duplicates?

- contents를 md5나 sha1 해싱 후 비교

# Software Architecture

## When is a cache not useful or even dangerous?

- 서버로 데이터를 전송할 때

## Why does Event-Driven Architecture improve scalability?

- 노드 간의 이벤트가 있을때마다 로직을 처리할 수 있어서
- 의존성을 줄일 수 있어서
- 장애 복구가 쉬워서 (이벤트만 발급)

## Scale out vs scale up: how are they different? When to apply one, when the other?

- **Scale out**: 서버 대수를 늘리는 것, 수평 스케일, 분산처리
- **Scale Up**: 서버 제원을 늘리는 것, 수직 스케일, 서버가 부담을 받을 때

## What is CQRS (Command Query Responsibility Segregation)? How is it different from the oldest Command-Query Separation Principle?

- 명령과 쿼리 분리
- 큐 기반
- 플럭스 플로우의 백엔드

- [나만 모르고 있던 CQRS & EventSourcing](http://www.popit.kr/cqrs-eventsourcing/)

## What is Three-Tier architecture?

- HTTP를 처리하는 Web Server
- 웹 애플리케이션을 실행하는 WAS(Web Application Server)
- 그리고 DBMS 로 각각의 계층으로 분리하는 3 Tier 방식의 아키텍처

- [3 Tier 아키텍쳐](https://lesstif.gitbooks.io/web-service-hardening/content/web-server.html#3-tier-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98)
- [다층구조](https://ko.wikipedia.org/wiki/%EB%8B%A4%EC%B8%B5_%EA%B5%AC%EC%A1%B0)

## How would you design a software system for scalability?

```
   => Front        => Back
LB => Front  => LB => Back => DB => Replication DB
   => Front        => Back
   => Static Resources
```

## What are the strategies to deal with the C10k problem?

- **C10k**
- 하나의 시스템 당 동접 수가 10k를 효율적 운영방안
- 이벤트 드리븐과 비동기, LB로 부하 분산, 세션 수 제한 (기다리게)

## How would you design a decentralized (that is, with no central server) P2P system?

- BlockChain Node와 SockJS로의 P2P 데이터 동기화

## What are the disadvantages of the Publish-Subscribe pattern at scale?

- 디버깅
- sub에서 메시지를 받았는지는 모른다

## When is it OK to use tight coupling?

- 강결합은 나쁜 것으로만 배워서 잘 모르겠다.
- 이 답변은 너무 모호한 설명인 듯

> A major advantage of a tightly coupled architecture is that it enables the rapid and efficient processing of large volumes of data, provides a single point of truth instead of several, often redundant, data sources, and enables open access to data throughout the organization.

- [When is tight coupling essential or a good thing?](https://stackoverflow.com/questions/28777799/when-is-tight-coupling-essential-or-a-good-thing)

# Service Oriented Architecture and Microservices

## What are the differences between Soa and Microservices?

- **서비스 지향 아키텍처**는 하나의 입구
- **마이크로서비스**는 여러 개의 입구

- [Difference between Microservices Architecture and SOA](https://stackoverflow.com/questions/25501098/difference-between-microservices-architecture-and-soa)

## Let's talk about web services versioning, version compatibility and breaking changes

> 시맨틱 버저닝

## What are the pros and cons of MicroService architecture

- 장점
  - 기능을 모듈로서 개발이 가능함
  - DB 또는 언어를 알맞게 선택이 가능함
  - 개별 디버깅, QA가 쉬움
- 단점
  - 혼자 개발 못함
  - 엄청난 문서화가 필요함
  - 다른 서비스와 통신하는 비용 필요

# Security

## How do you write secure code? In your opinion, is it one of the developer's duties, or does it require a specialized role in the company? And why?

- 린팅
- 소나큐브
- Gitlab 13.8 의 보안 체크
- 방화벽

<!-- Why is it said that cryptography is not something you should try to invent or design yourself?
What is two factor authentication? How would you implement it in an existing web application?
If not carefully handled, there is always a risk of logs containing sensitive information, such as passwords. How would you deal with this?
-->

## What do you know about Cross-Site Scripting?

## What do you know about Cross-Site Forgery Attack?

- CSRF는 인증된 사용자를 통해 공격자가 원하는 명령을 수행하게 하는 기법
- CSRF 토큰을 사용해 페이지가 처음 로드 될 때 토큰 값을 가지고 있고, 서버에 요청을 보낼 때 토큰을 같이 보내 비교한다

## How does HTTPS work?

- [https ssl 보안 프로토콜 접속절차](http://plming.tistory.com/143)
- [SSL-TLS HTTPS 적용](https://lesstif.gitbooks.io/web-service-hardening/content/ssl-tls-https.html)

## What's a Man-in-the-middle Attack, and why does HTTPS help protect against it?

- 전송 구간에서도 암호화가 되어 전송되니까 중간자공격이 통할리가.

## How can you prevent the user's session from being stolen?

- Session Expire를 당연히 줘야하고, IP 체크

# General

<!-- Why does Functional Programming matter? When should a functional programming language be used?
How do companies like Microsoft, Google, Opera and Mozilla profit from their browsers?
Why does opening a TCP socket have a large overhead?
What is Encapsulation important for?
What is a real-time system and how is it different from an ordinary system?
What's the relationship between real-time languages and heap memory allocation?
Immutability is the practice of setting values once, at the moment of their creation, and never changing them. How can immutability help write safer code?
What are the pros and cons of mutable and immutable values.
What's the Object-Relational impedance mismatch?
Which principles would you apply to define the size of a cache?
-->

## What's the difference between TCP and HTTP

- 4번째 레이어와 7번째 레이어
- HTTP는 response 받으면 응답을 끊지만 TCP는 끊을 때까지 계속 연결
- TCP가 하위니까 속도가 더 빠름

## What are the tradeoffs of client-side rendering vs. server-side rendering

- CSR은 CDN에
- SSR은 Bot만이 들어올 수 있게.

<!-- How could you develop a reliable communication protocol based on a non-reliable one -->
