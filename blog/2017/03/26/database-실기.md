---
title: Database 실기
authors: me
tags:
  - 정보처리
date: 2017-03-26 11:54:27
---

## DB 정의

- 통합된 데이터(Integrated Data): 검색의 효율성을 위해 **중복이 최소화된 데이터**의 모임
- 저장 데이터(Stored Data): 컴퓨터가 접근 가능한 **저장 매체에 저장된 데이터**
- 운영 데이터(Operational Data): 조직의 목적을 위해 존재 가치가 확실하고 **반드시 필요한 데이터**
- 공유 데이터(Shared Data): 여러 응용 프로그램들이 **공동으로 사용하는 데이터**

## DB 특징

- 실시간 접근성(Real Time Accessibility): 사용자의 **질의에 대해 즉시 처리하여 응답하는 특징**
- 계속적인 진화(Continuous Evolution): 삽입, 삭제, 갱신을 통하여 항상 **최근의 정확한 데이터를 동적으로 유지하는 특징**
- 동시 공유(Concurrent Sharing): 여러 사용자가 **동시에 원하는 데이터를 공용할 수 있는 특징**
- 내용에 의한 참조(Content Reference): 주소나 위치에 의해서가 아니라 **사용자가 요구하는 내용에 따라 참조하는 특징**
- 데이터의 논리적, 물리적 독립성(Independence)
  - 논리적 독립성: 응용 프로그램과 DB 를 독립시킴으로써 데이터의 논리적 구조를 변경시키더라도 응용 프로그램은 변경되지 않는 특징
  - 물리적 독립성: 응용 프로그램과 보조기억장치와 같은 물리적장치를 독립시킴으로써 새로운 디스크를 도입하더라도 응용 프로그램에는 영향을 주지 않고 데이터의 물리적 구조만 변경될 수 있는 특징

## 데이터 언어

- Data Language
- DDL(데이터 정의어): 데이터베이스를 구축하거나 변경할 목적으로 사용하는 언어
- DML(데이터 조작어): 데이터 처리를 위해 응용 프로그램과 DBMS 사이의 인터페이스를 위한 언어
- DCL(데이터 제어어): 보안 및 권한제어, 무결성, 회복, 병행제어를 위한 언어

## DB 사용자

- DB 관리자(DBA): DDL 과 DCL 을 통해 **DB 를 정의하고 제어**하는 사람 또는 그룹
- 데이터 관리자(Data Administrator): 기업 또는 조직 내에서 데이터에 대한 정의, 체계화, 감독 및 보안업무 등 **데이터에 대한 관리를 총괄**하고 정보 활용에 대한 계획 수립 및 통제를 수행한다.
- 데이터 설계자(Data Architect): **데이터의 구조를 체계적으로 정의**하는 사람
- 응용 프로그래머: 호스트 프로그래밍 언어에 DML 을 삽입하여 DB 에 접근하는 사람
- 일반 사용자(End User): 질의어를 통해 DBMS 에 접근하는 사람

## DBMS 개념

- 사용자와 DB 사이에서 사용자의 요구에 따라 정보를 생성해주고 DB 를 관리해주는 소프트웨어
- 기존 fs 가 갖는 데이터의 종속성과 중복성문제를 해결하기 위한 시스템으로 모든 응용 프로그램들이 DB 를 공유할 수 있도록 관리해준다.

> - 데이터 종속성으로 인한 문제점: 데이터 파일이 보조기억장치에 저장되는 방법이나 저장된 데이터의 접근 방법을 변경할 때 응용 프로그램도 같이 변경해야하는 문제점
> - 데이터 중복성으로 인한 문제점: 중복된 데이터 간에 데이터의 정확성이나 무결성을 효율적으로 유지할 수 없다는 문제점

## DBMS 필수기능

- 정의 기능(Definition Facility): 데이터의 타입과 구조, 데이터가 DB 에 저장될 때의 제약조건 등을 명시하는 기능
- 조작 기능(Manipulation Facility): 체계적 데이터 처리를 위해 데이터 접근 기능(CRUD)을 명시하는 기능
- 제어 기능(Control Facility): 데이터의 정확성과 안정성을 유지하기 위해 무결성, 보안 및 권한 검사, 병행제어 등을 명시하는 기능

## DSMS

- **데이터 스트림 관리 시스템**(Data Stream Management System)
- **대량의 스트림 데이터를 처리하고 관리하는 시스템**
- 온라인상의 데이터 스트림이라는 동적인 특성을 가진 데이터를 처리하고 관리하는 시스템
- 입력 순서에 따라 데이터의 처리결과가 달라질 수 있다.

## 스키마

- DB 의 구조와 제약 조건에 대한 전반적인 명세
- 개체, 속성, 관계 및 제약조건 등에 관해 전반적으로 정의
- 외부 스키마, 개념 스키마, 내부 스키마

> - 개체: 현실 세계의 객체로 유형 또는 무형의 정보를 대상으로 존재하며 서로 구별될 수 있는 것
> - 속성: 개체의 특성이나 상태를 기술하는 것으로 데이터의 가장 작은 단위
> - 관계: 2 개 이상의 개체 사이에 연관성을 기술한 것

### 스키마 특징

- 데이터의 구조적 특성을 의미
- 데이터 사전에 저장된다.
- 현실세계의 특정한 한 부분의 표현으로 특정 데이터 모델을 이용해 만들어진다.
- 시간에 따라 불변적이다.
- 데이터의 논리적 단위에 명칭을 부여하고 그 의미를 기술

### 데이터 사전

- 데이터 사전은 DB 에 저장되어 있는 모든 데이터 개체들에 대한 정보를 유지관리하는 시스템
- 시스템 카달로그

### 메타 데이터

- 데이터에 관한 데이터
- 저장되는 데이터와 직간접적으로 관계가 있는 정보를 제공하는 데이터

> - MARC(Machine Readable Cataloging): **목록 레코드를 식별**하여 축적유통할 수 있도록 코드화한 메타 데이터
> - DC(Dublin Core): 네트워크 환경에서 각종 **전자 정보**를 기술하는 메타 데이터
> - ONIX(ONline Information eXchange): 유통에 관한 통계와 체계적인 정보를 취급함으로써 **정상적인 유통 및 관리**를 위한 메타 데이터
> - MODS(Metadata Object Description Schema): **디지털 도서관**의 범용 서지 정보 표준 메타 데이터

#### 메타 데이터의 상호 운용성

- 하나의 표준적인 메타 데이터로 통합하여 표현하는 방법
- 상호 매핑을 통해 해결하는 방법
- **MDR**에 의한 해결방법
  - Meta Data Registry
  - 메타 데이터의 등록과 인증을 통해 메타 데이터를 유지관리하며, 메타 데이터의 명세를 공유하는 레지스트리

### 스키마 3 계층

#### 외부 스키마

- 사용자나 응용 프로그래머가 각 개인의 입장에서 필요로 하는 DB 의 논리적 구조를 정의
- 하나의 DBMS 에는 여러 개의 외부 스키마가 존재할 수 있으며 하나의 외부 스키마는 여러 개의 응용 프로그램이나 사용자에 의해 공유될 수 있다.

#### 개념 스키마

- 개체 간의 제약 조건을 나타내고 DB 의 접근 권한, 보안 정책 및 무결성 규정에 관한 명세를 정의
- DB 의 전체적인 논리적 구조로 데이터를 통합한 조직 전체의 DB 명세로서 하나만 존재한다.
- 기관이나 조직의 관점에서 DB 를 정의

#### 내부 스키마

- DB 의 물리적 구조를 정의
- 물리적 저장장치의 관점에서 본 전체 DB 의 명세로 하나만 존재
- 개념 스키마의 물리적 저장 구조에 대한 정의를 기술
- 시스템 프로그래머나 시스템 설계자가 보는 관점의 스키마

## DB 설계

- DB 스키마를 개발하는 과정
- 요구 조건 분석(Requirement Analysis)
- 개념적 설계(Conceptual Design)
- 논리적 설계(Logical Design)
- 물리적 설계(Physical Design)
- DB 구현(Database Implementation)

### 요구 조건 분석

- DB 를 사용할 사람이 필요로 하는 용도를 파악하는 작업

### 개념적 설계

- 현실 세계에 대한 인식을 추상적 개념으로 표현하는 과정

### 논리적 설계

- 시스템이 지원하는 논리적 데이터 구조로 변환시키는 과정

### 물리적 설계

- 저장 구조와 접근 경로를 결정하는 과정
- 응답 시간, DB 파일과 접근 경로 구조에 대한 저장 공간의 효율성, 트랜잭션 처리도 등을 고려

### DB 구현

- DB 를 실제로 구축하는 과정
- DBMS 의 DDL 로 기술된 명령문을 실행시켜 DB 스키마와 DB 파일을 생성
- DML 로 기술된 명령문을 가지는 프로그램 코드가 작성된다.

## ER 모델

- 네모: 개체 타입(Entity Type)
- 마름모: 관계 타입(Relationship Type)
- 타원: 속성
- 밑줄타원: 기본키 속성
- N:M: 개체 타입 간의 연관성
- 선: 개체 타입과 속성을 연결
- ISA: 특정 개체는 서로 구별되는 여러 하위 개체로 나눠질 수 있는데 이러한 상위 개체와 하위 개체 간의 관계를 ISA 관계라고 한다.
  - ex) 학생 개체 => 재학생, 휴학생, 졸업생 개체

### 개체 및 개체 타입

- 개체는 현실 세계의 객체로 유형 또는 무형의 정보 대상으로 존재하며 서로 구별될 수 있는 것
- 개체의 특성을 나타내는 속성을 갖는다.
- 하나의 개체를 **개체 어커런스** = 개체 인스턴스라한다.
- 개체 어커런스들의 집합에 대한 공통의 특성을 갖는 **개체 클래스를 개체 타입**이라 한다.

### 관계 및 관계 타입

- 관계는 2 개 이상의 개체 사이에 존재하는 연관성
- 개체 타입의 개수에 대한 차수와 개체 어커런스의 개수에 대한 대응 카디널리티를 갖는다.
- 차수에 따른 관계 종류
  - 단항(Unary): 관계에 참여하고 있는 개체타입이 1 개인 관계
  - 이항(Binary)
  - 삼항(Ternary)
  - n 항(n-ary)
  - **1:1**: 두 개체 타입이 모두 하나씩의 개체 어커런스를 갖는 관계
  - **1:N**: 한 개체 타입은 하나의 개체 어커런스, 다른 한 개체 타입은 여러개의 개체 어커런스를 갖는 관계
  - **N:M**: 두 개체 타입 모두 여러 개의 개체 어커런스를 갖는 관계
  - ISA

> ISA
>
> - disjoint: 상위 개체의 멤버가 하나의 하위 개체에만 포함될 때
> - overlapping: 상위 개체의 멤버가 여러 하위 개체에 포함될 때
> - total: 상위 개체의 멤버가 하위 개체에 속할 때
> - partial: 상위 개체의 멤버가 하위 개체에 속하지 않을 때

### 속성

- 개체의 특성이나 상태를 기술한 것
- 도메인: 속성이 가질 수 있는 모든 가능한 값들의 집합
- 단순 속성: 더 이상 다른 속성으로 나눌 수 없는 속성
- 복합 속성: 2 개 이상 속성들로 분해할 수 있는 속성

## 릴레이션

- 데이터를 원자값으로 갖는 이차원의 테이블
- 릴레이션의 구조는 물리적인 구조를 나타내는 것이 아닌 **논리적 구조**
- **릴레이션 스키마**: 릴레이션 구조
- **릴레이션 인스턴스**: 실제 값
- 속성: 릴레이션의 열(Column)
- 튜플: 릴레이션의 행(Row)

### ER 모델을 관계형 데이터 모델로 변환

- 개념적인 데이터 모델인 ER 모델을 논리적 데이터 모델인 릴레이션 스키마로 변환하는 것
- **매핑 룰**(Mapping Rule)이라고 한다.
- N:M 관계이면 릴레이션 A 와 B 의 기본키를 모두 포함한 별도의 릴레이션으로 표현한다. 이 때 생성된 별도의 릴레이션을 교차 릴레이션 또는 **교차 엔티티**라고 한다.

### 관계의 표현

- 1:1(┼─┼): 양쪽에 반드시 1 개씩 존재
- 1:0 또는 1:1(┼─Θ├): 왼쪽에는 반드시 1 개, 오른쪽에는 없거나 1 개 존재
- `1:N(┼─<)`: 왼쪽에는 반드시 1 개, 오른쪽에는 반드시 여러개
- 1:1 또는 `1:N(┼─┤<)`: 왼쪽에는 반드시 1 개, 오른쪽에는 1 개 또는 여러개 존재
- 1:0 또는 1:1 또는 `1:N(┼─Θ│<)`: 왼쪽에는 반드시 1 개, 오른쪽에는 0 개 또는 1 개 또는 여러개 존재

### 식별관계

- Identifying
- 개체 A, B 사이의 관계에서 **A 개체의 기본키가 B 개체의 외래키이면서 동시에 기본키가 되는 관계**
- ER 도형에서 실선으로 표시

### 비식별관계

- Non-identifying
- 개체 A, B 사이의 관계에서 **A 개체의 기본키가 B 개체의 비기본키 영역에서 외래키가 되는 관계**
- B 개체의 존재 여부는 A 개체의 존재 여부와 관계없이 존재
- ER 도형에서 점선으로 표시

## 슈퍼키

- 한 릴레이션 내에 있는 속성들의 집합으로 구성된 키
- 모든 튜플에 대해 유일성은 만족하지만 최소성은 만족하지 못한다.

## 후보키

- Candidate Key
- 릴레이션을 구성하는 속성들 중에서 튜플을 유일하게 식별하기 위해 사용되는 속성들의 부분집합
- 유일성과 최소성을 모두 만족한다.

## 복합키

- 2 개 이상의 필드를 조합하여 만든 키

## 기본키

- Primary Key
- 후보키 중에서 특별히 선정된 키
- 중복된 값을 가질 수 없다.
- NULL 일 수 없다.

## 대체키

- Alternate Key
- 대체키는 후보키 중에서 선정된 기본키를 제외한 나머지 후보키

## 외래키

- Foreign Key
- 다른 릴레이션의 기본키를 참조하는 속성 또는 속성들의 집합

## 무결성

- Integrity
- DB 에 저장된 데이터 값과 그 것이 표현하는 현실 세계의 실제 값이 일치하는 정확성을 의미
- 무결성 제약조건(Constraint): DB 에 저장된 데이터의 정확성을 보장하기 위해 정확하지 않은 데이터가 DB 에 저장되는 것을 방지하기 위한 조건

### 무결성 종류

- **NULL 무결성**: 특성 속성 값이 NULL 이 될 수 없음
- **고유 무결성**(Unique): 특정 속성에 대해 각 튜플이 갖는 속성 값이 서로 달라야 한다.
- **도메인 무결성**: 특정 속성의 값이 그 속성이 정의된 도메인에 속해야한다.
- **키 무결성**: 하나의 릴레이션에는 적어도 하나의 키가 존재해야한다.
- **관계 무결성**(Relationship): 어느 한 튜플의 삽입 가능 여부 또는 한 릴레이션과 다른 릴레이션의 튜플들 사이의 관계에 대한 적절성 여부를 지정
- **참조 무결성**(Referential): 외래키 값은 NULL 이거나 참조 릴레이션의 기본키 값과 동일해야 한다.
- **개체 무결성**(Entity): 기본 릴레이션의 기본키를 구성하는 어떤 속성도 NULL 일 수 없다.

## 관계대수

- Relational Algebra
- 관계형 DB 에서 원하는 정보와 그 정보를 어떻게 유도하는가를 기술하는 절차적 언어
- 기본연산: SELECT, PROJECT, JOIN, DIVISION
- 집합연산: UNION, DIFFERENCE, INTERSECTION, CARTESIAN PRODUCT

### 순수 관계 연산자

#### SELECT

- 릴레이션에 존재하는 튜플들 중 특정 조건을 만족하는 튜플들의 부분집합을 구하여 새로운 릴레이션을 만든다.
- 튜플을 구하는 것이므로 수평 연산
- 시그마 **σ**를 사용한다.
- **σ** `<조건>(테이블)`

#### PROJECT

- 주어진 릴레이션에서 속성 리스트에 제시된 속성 값만을 추출하여 새로운 릴레이션을 만든다.
- 열에 해당하는 속성을 추출하는 것이므로 수직 연산
- 파이 **π**를 사용한다.
- **π** `<속성>(테이블)`

#### JOIN

- 공통 속성을 중심으로 2 개의 릴레이션을 하나로 합쳐서 새로운 릴레이션을 만든다.
- JOIN 연산의 결과는 CARTESIAN PRODUCT 연산을 수행한 다음 SELECT 연산을 수행한 것과 같다.
- ▷◁ 를 사용한다.
- 테이블**▷◁**(JOIN 조건)S
- **세타 조인**: 비교 연산자를 θ 로 일반화하여 θ 로 표현될 수 있는 조인
- **자연 조인**: 중복된 속성을 제거하여 같은 속성은 한 번만 나타나게 하는 연산

### 일반 집합 연산자

- 수학적 집합에서 사용하는 연산자
- 합집합(UNION): `R∪S ≤ R ＋ S`
- 교집합(INTERSECTION): `R∩S ≤ MIN(R, S)`
- 차집합(DIFFERENCE): `R－S ≤ R`
- 교차곱(CARTESIAN PRODUCT): (R×S) = (R)×(S)

## 관계해석

- Relational Calculus
- E.F. Codd 가 수학의 Predicate Calculus(술어해석)에 기반을 두고 관계 DB 를 위해 제안
- 관계 데이터의 연산을 표현하는 방법
- 원하는 정보를 정의할 때 계산 수식을 사용한다.
- 원하는 정보가 무엇이라는 것만 정의하는 비절차적 특성을 지닌다.

## DDL

- DDL 로 정의된 내용은 메타데이터가 되며 시스템 카탈로그에 저장된다.

### CREATE SCHEMA

```SQL
CREATE SCHEMA 스키마명 AUTHORIZATION 유저;
```

### CREATE DOMAIN

```SQL
CREATE DOMAIN 도메인명 타입
    [DEFAULT 기본값]
    [CONSTRAINT 제약조건명 CHECK 제약조건];

CREATE DOMAIN GENDER CHAR(1)
    DEFAULT 'M'
    CONSTRAINT VALID-GENDER CHECK (VALUE IN ('M', 'F'));
```

### CREATE TABLE

```SQL
CREATE TABLE 테이블명 (
    속성명 타입 [NOT NULL],
    [PRIMARY KEY(속성),]
    [UNIQUE(속성)]
    [FOREIGN KEY(속성) REFERENCES 참조테이블(속성)
        [ON DELETE 옵션]
        [ON UPDATE 옵션]
    ]
    [CONSTRAINT 제약조건명] [CHECK(조건)]
);
```

### CREATE VIEW

```SQL
CREATE VIEW 뷰명[(속성명)]
AS SELECT 속성 FROM 테이블
[WITH CHECK OPTION];
```

- 속성명을 기술하지 않으면 SELECT 문의 속성명이 자동으로 사용된다.
- WITH CHECK OPTION 은 뷰에 대한 갱신이나 삽입연산이 실행될 때 뷰의 정의 조건을 위배하면 갱신이나 삽입 연산의 실행을 거부하도록 지정하기 위한 것이다.

### CREATE INDEX

```SQL
CREATE [UNIQUE] INDEX 인덱스명
    ON 테이블명(속성명 정렬)
    [CLUSTER];
```

- CLUSTER: 지정된 키에 따라 튜플들을 그룹으로 지정하기 위해 사용한다.

### CREATE TRIGGER

- 트리거는 DB 에서 데이터의 입력, 갱신, 삭제 등의 이벤트가 발생할 때마다 자동적으로 수행되는 사용자 정의 프로시저이다.

```SQL
CREATE TRIGGER 트리거명 [AFTER|BEFORE] [INSERT|DELETE|UPDATE]
    ON 테이블명
    REFERENCING [NEW|OLD] TABLE AS 테이블명
    FOR EACH ROW
    WHEN 조건

    BEGIN
    트리거 BODY
    END;

/* 학생 테이블에 값이 삽입되기 전에 학년 속성이 없으면 신입생 값을 넣어준다 */
CREATE TRIGGER 학년정보트리거 BEFORE INSERT ON 학생
REFERENCING NEW TABLE AS temp
FOR EACH ROW
WHEN temp.학년 = ''
BEGIN
    SET temp.학년 = '신입생';
END;
```

### ALTER TABLE

```SQL
ALTER TABLE 테이블명 ADD 속성명 타입 [DEFAULT '기본값'];
ALTER TABLE 테이블명 ALTER 속성명 [SET DEFAULT '기본값'];
ALTER TABLE 테이블명 DROP 속성명 [CASCADE];
```

### DROP

```SQL
DROP TABLE 테이블명 [CASCADE|RESTRICT];
DROP VIEW 뷰명 [CASCADE|RESTRICT];
```

## SELECT

```SQL
SELECT [DISTINCT] 속성 FROM 테이블
[WHERE 조건]
[GROUP BY 속성]
[HAVING 조건]
[ORDER BY 속성 순서]
```

## JOIN

### INNER JOIN

- EQUI JOIN: 대상 테이블에서 공통 속성을 기준으로 = 비교에 의해 같은 값을 가지는 행을 연결하여 결과를 생성하는 JOIN 방법

```SQL
SELECT 속성, 속성2
FROM 테이블1, 테이블2
WHERE 테이블1.속성 = 테이블2.속성;

SELECT 속성, 속성2
FROM 테이블1 NATURAL JOIN 테이블2;

SELECT 속성, 속성2
FROM 테이블1 JOIN 테이블2 USING(속성);
```

- NON-EQUI JOIN: =이 아닌 다른 비교연산자를 사용하는 JOIN 방법인데 잘 안쓴다.

### OUTER JOIN

- LEFT OUTER JOIN

```SQL
SELECT 속성, 속성2
FROM 테이블1 LEFT OUTER JOIN 테이블2
    ON 테이블1.속성 = 테이블2.속성;

SELECT 속성, 속성2
FROM 테이블1, 테이블2
WHERE 테이블1.속성 = 테이블2.속성(+);
```

- RIGHT OUTER JOIN

```SQL
SELECT 속성, 속성2
FROM 테이블1, 테이블2
WHERE 테이블1.속성(+) = 테이블2.속성;
```

### SELF JOIN

- 같은 테이블에서 2 개의 속성을 연결하여 EQUI JOIN 을 하는 JOIN 방법

## DML

### INSERT

```SQL
INSERT INTO 테이블[(속성)]
VALUES (데이터);
```

### DELETE

```SQL
DELETE FROM 테이블 WHERE 조건;
```

### UPDATE

```SQL
UPDATE 테이블
SET 속성 = 데이터
WEHRE 조건;
```

## DCL

- 데이터의 보안, 무결성, 회복, 병행 제어 등을 정의하는 데 사용하는 언어
- DBA 가 데이터 관리를 목적으로 사용
- COMMIT, ROLLBACK, GRANT, REVOKE

### GRANT

```SQL
GRANT 권한 TO 유저;
GRANT 권한 ON 테이블 TO 유저 [WITH GRANT OPTION];
```

### REVOKE

```SQL
REVOKE 권한 FROM 유저;
REVOKE [GRANT OPTION FOR] 권한 ON 테이블 FROM 유저 [CASCADE];
```

- GRANT OPTION FOR 는 다른 사람에게 해당 권한을 부여하는 권한만을 취소한다.

## 내장 SQL

- DB 내의 데이터를 정의하거나 접근하는 SQL 문을 응용프로그램 내에 내포하여 프로그램이 실행될 때 함께 실행되도록 호스트 프로그램 언어에 삽입한 SQL.

### 커서

- 내장 SQL 의 실행 결과로 반환된 복수 개의 튜플을 접근할 수 있도록 해주는 개념
- 질의 결과로 반환된 테이블의 튜플을 순서대로 가리키는 튜플에 대한 포인터
- **DECLARE**: 커서 정의 등 커서에 관련된 선언을 하는 명령어
- **OPEN**: 커서 질의 결과인 첫번째 튜플을 가리키도록 설정하는 명령어
- **FETCH**: 다음 튜플로 커서를 이동시키는 명령어
- **CLOSE**: 커서를 닫기 위해 사용하는 명령어

```SQL
/* salary를 10% 증가시키는 갱신 연산 */
EXEC SQL DECLARE SECTION
    int department;
    int salary;
EXEC SQL END DECLARE SECTION

EXEC SQL DECLARE person CURSOR FOR
    SELECT salary FROM EMPLOYEE
    WHERE department = :department;

EXEC SQL OPEN person;
EXEC SQL FETCH person INTO :salary;

while(SQLSTATE == '00000'){
    EXEC SQL UPDATE EMPLOYEE SET salary = salary * 1.1
                WHERE CURRENT OF person;
    EXEC SQL FETCH person INTO :salary;
}

EXEC SQL CLOSE person;
```

## Stored Procedure

- 모듈별 프로그래밍 허용
- 빠른 SQL 실행: 한 번 실행된 후 메모리에 캐시되어 다음 실행에 빠르게 실행될 수 있다.
- 보안성
- 네트워크 통신량 감소

```SQL
CREATE [OR REPLACE] PROCEDURE 프로시저명(IN|OUT|INOUT 파라미터)
[지역변수 선언]
BEGIN
    프로시저 BODY;
END;
```

## 이상

- Anomaly
- 테이블에서 일부 속성들의 종속으로 데이터의 중복이 발생하고, 중복으로 인해 테이블 조작시 문제가 발생하는 현상 => **데이터 중복으로 인해 테이블 조작시 문제가 발생하는 현상**

### 삽입 이상

- Insertion Anomaly
- 데이터를 삽입할 때 의도와는 상관없이 원하지 않는 값들로 인해 삽입할 수 없게 되는 현상

### 삭제 이상

- Deletion Anomaly
- 테이블에서 한 튜플을 삭제할 때 의도와는 상관없는 값들도 함께 삭제되는 현상
- 연쇄 삭제

### 갱신 이상

- Update Anomaly
- 테이블에서 튜플에 있는 속성 값을 갱신할 때 일부 튜플의 정보만 갱신되어 정보에 불일치성(Inconsistency)이 생기는 현상

## 함수적 종속

- Functional Dependency
- X → Y 의 관계를 갖는 속성 X 와 Y 에서 X 를 결정자(Determinant), Y 를 종속자(Dependent)라고 한다.
- 완전 함수적 종속: 어떤 속성이 기본키에 대해 완전히 종속적일 때를 말한다.
- 부분 함수적 종속: 기본키의 일부에 대해 속성이 결정되는 경우.

## 정규화

- Normalization
- 테이블의 속성들이 상호 종속적인 관계를 갖는 특성을 이용해 테이블을 무손실 분해하는 과정
- 무손실 분해: NATURAL JOIN 을 통해 원래 테이블로 정보 손실 없이 복귀되는 경우 분해된 테이블이 무손실 분해되었다고 한다.

### 제 1 정규형

- 모든 속성의 도메인이 원자값만으로 되어 있는 정규형

### 제 2 정규형

- 테이블이 제 1 정규형이고 기본키가 아닌 모든 속성이 기본키에 대해 완전 함수적 종속을 만족하는 정규형

### 제 3 정규형

- 테이블이 제 2 정규형이고 기본키가 아닌 모든 속성이 기본키에 대해 이행적 함수 종속을 만족하지 않는 정규형
- 이행적 함수 종속: A → B 이고 B → C 일 때 A → C 를 만족하는 관계

### BCNF

- 테이블에서 모든 결정자가 후보키인 정규형
- 일반적으로 제 3 정규형에 후보키가 여러 개 존재하고, 이러한 후보키들이 서로 중첩되어 나타나는 경우에 적용 가능하다.

### 제 4 정규형

- 테이블에 다중 값 종속 A→→B 가 존재할 경우 테이블의 모든 속성이 A 에 함수적 종속 관계를 만족하는 정규형
- 다중 값 종속
  - 다치 종속 = MVD = Multi Valued Dependency
  - A, B, C 3 개의 속성을 가진 테이블 R 에서 어떤 복합 속성(A, C)에 대응하는 B 값의 집합이 A 값에만 종속되고 C 값에는 무관하면 B 는 A 에 다중 값 종속이라고 한다.

### 제 5 정규형

- 테이블의 모든 조인 종속이 테이블의 후보키를 통해서만 성립되는 정규형
- 테이블 속성에 대한 부분 집합 X, Y, Z...가 있을 때 테이블이 자신의 프로젝션 X, Y, Z...를 모두 조인한 결과와 동일한 경우 테이블은 조인 종속을 만족한다.

### 역정규화

- Denormalization
- 정규화로 인해 여러 개로 분해된 릴레이션들에서 원하는 정보를 얻기 위해서 조인을 사용하여 다시 연결해야되는데 조인을 자주 사용하면 응답 속도가 떨어지므로 정규화에 위배되지만 성능 향상을 위해 다시 테이블을 합치는 것

## 시스템 카탈로그

- DB 에 저장되어 있는 모든 데이터 개체들에 대한 정의나 명세에 대한 정보가 수록되어 있는 시스템 테이블

### 시스템 카탈로그의 구성요소

- SYSOBJECTS: 각 개체에 관한 정보를 한 행으로 관리
- SYSCOLUMNS: 각 테이블이 가지고 있는 모든 열에 대한 정보를 한 행으로 관리
- SYSINDEXES: 모든 인덱스에 대한 정보를 한 행로 관리
- SYSUSERS: 사용자와 그룹에 관한 정보를 한 행으로 관리
- SYSPROTECTS: 사용자 권한에 관한 정보를 한 행으로 관리

## 인덱스

- 데이터 레코드(튜플)에 빠르게 접근하기 위해 `<키 값, 포인터>` 쌍으로 구성되는 데이터 구조

### m-원 검색트리

- m-Way Search Tree
- 한 노드가 1 개의 키값과 2 개의 서브 노드를 갖는 이진 검색 트리를 일반화한 트리

### B-트리

- 인덱스를 구성하는 방법으로 많이 사용되는 균형된 m-원 검색트리
- 키 값과 레코드를 가리키는 포인터들이 트리 노드에 오름차순으로 저장
- 키 의 삽입과 삭제 시 노드의 분열과 합병이 발생할 수 있다.

### B\*-트리

- B-트리의 문제점인 빈번한 노드의 분할을 줄이는 목적으로 제시된 B-트리의 변형
- 각 노드가 가능한 한 최소 2/3 가 채워지도록 한 것이 특징

### B+-트리

- B-트리의 변형으로 단말 노드가 아닌 노드로 구성된 인덱스 세트와 단말 노드로만 구성된 순차 세트로 구분된다.

> **행 이주**로 인한 검색 효율 저하
>
> - VARCHAR 형식을 INDEX 로 잡을 때 값이 변경될 경우 다음 블록을 또 읽어서 검색해 검색 속도가 떨어지는 현상

## 트랜잭션

- DB 에서 하나의 논리적 기능을 수행하기 위한 일련의 연산 집합으로 작업의 단위이다.
- DBMS 에서 회복 및 병행 수행시 처리되는 작업의 논리적 단위

### 트랜잭션의 특성 (ACID)

#### 원자성

- Atomicity
- 트랜잭션의 연산은 DB 에 모두 반영되든지 아니면 전혀 반영되지 않아야한다.

#### 일관성

- Consistency
- 트랜잭션 수행이 성공적으로 완료되면 언제나 일관성 있는 DB 상태로 변환한다.

#### 독립성

- Isolation
- 한 트랜잭션이 데이터를 갱신하는 동안 이 트랜잭션이 완료되지 전에는 갱신중인 데이터를 다른 트랜잭션들이 접근하지 못하도록 해야한다.

#### 영속성

- Durability
- 트랜잭션의 실행이 성공적으로 실행 완료된 후에는 시스템에 오류가 발생하더라도 트랜잭션에 의해 변경된 내용은 계속 보존되어야 한다.

### 트랜잭션의 상태

- 활동(Active): 트랜잭션이 실행중인 상태
- 실패(Failed): 트랜잭션 실행중에 오류가 발생하여 중단된 상태
- 철회(Aborted): 트랜잭션이 비정상적으로 종료되어 ROLLBACK 연산을 수행한 상태
- 부분 완료(Partially Committed): 트랜잭션의 마지막 연산까지 수행하였지만 COMMIT 연산을 실행하기 전의 상태
- 완료(Committed): 트랜잭션이 성공적으로 완료되어 COMMIT 연산을 수행한 후의 상태

## 회복

- Recovery
- 트랜잭션을 실행하는 도중에 장애가 발생하여 DB 가 손상되었을 경우 손상되기 이전의 정상 상태로 복구하는 작업

### 장애 유형

- 실행 장애(Action Failure)
- 트랜잭션 장애(Transaction Failure)
- 시스템 장애(System Failure)
- 미디어 장애(Media Failure)

### 회복 관리기

- 로그: 트랜잭션 수행 중 작성된 DB 의 변경 내용에 대한 정보로 Redo 와 Undo 를 수행할 때 사용
- 메모리 덤프: 메모리에 있는 DB 전체 또는 일부 내용을 주기적으로 별도의 디스크나 다른 파일로 복사해 두는 작업

#### Redo

- DB 가 비정상적으로 종료되었을 때 디스크에 저장된 로그를 분석하여 **트랜잭션의 시작과 완료에 대한 기록이 있는 트랜잭션의 작업을 재작업**

#### Undo

- DB 가 비정상적으로 종료되었을 때 디스크에 저장된 로그를 분석하여 트랜잭션의 시작을 나타내는 START 는 있지만 완료를 나타내는 **COMMIT 이 없는 트랜잭션이 작업한 내용을 모두 취소**시킨다.

### 회복 기법

#### 연기 갱신 기법

- Deferred Update
- 트랜잭션이 성공적으로 종료될 때까지 DB 에 대한 실질적인 갱신을 연기하는 기법

#### 즉각 갱신 기법

- Immediate Update
- 트랜잭션이 데이터를 변경하면 트랜잭션이 부분 완료되기 전이라도 즉시 실제 DB 에 반영하는 기법

#### 그림자 페이지 기법

- Shadow Paging
- 갱신 이전의 DB 를 일정 크기의 페이지 단위로 구성하여 각 페이지마다 복사본인 그림자 페이지로 별도 보관해 두고, 실제 페이지를 대상으로 트랜잭션에 대한 변경 작업을 수행하는 기법

#### 검사점 기법

- Check Point
- 시스템 장애가 발생하였을 경우, Redo 와 Undo 를 수행하기 위해 로그 전체를 조사해야하는 경우를 피하기 위한 기법
- 검사점을 로그에 보관해 둔다.

#### 미디어 회복 기법

- Media Recovery
- DB 의 내용을 주기적으로 안전한 저장장치에 덤프해 놓는 기법

## 병행 제어

- Concurrency Control
- 다중 프로그램의 이점을 활용하여 동시에 여러 개의 트랜잭션을 병행 수행할 때 실행되는 트랜잭션들이 DB 의 일관성을 파괴하지 않도록 트랜잭션 간의 상호 작용을 제어하는 기술
- 여러 개의 트랜잭션들이 동시에 인터리빙하게 실행되는 것

> 인터리빙
>
> - 트랜잭션들이 번갈아가며 조금씩 자신이 처리해야 할 일을 처리하는 것

### 병행 제어의 필요성

- 갱신 분실(Lost Update): 2 개 이상의 트랜잭션이 같은 데이터를 공유하여 갱신할 때 갱신 결과의 일부가 없어지는 현상
- 모순성(Inconsistency): 복수의 사용자가 동시에 같은 데이터를 갱신할 때 DB 내의 데이터들이 상호 일치하지 않아 모순된 결과가 발생하는 현상
- 연쇄 복귀(Cascading Rollback): 병행 수행되던 트랜잭션들 중 어느 하나에 문제가 생겨 ROLLBACK 되는 경우 다른 트랜잭션들도 함께 ROLLBACK 되는 현상

### Lock

- 잠금이란 DB 관리에서 하나의 트랜잭션에 사용되는 데이터를 다른 트랜잭션이 접근하지 못하게 하는 것을 의미
- 교착상태(Dead Lock): 모든 트랜잭션들이 실행을 전혀 진전시키지 못하고 무한정 기다리고 있는 상태

> - 공유 잠금(Shared Lock): 트랜잭션이 데이터에 대해 공유 잠금을 걸면 트랜잭션은 데이터에 대해 읽기만 가능하고 기록은 불가능
> - 배타 잠금(Exclusive Lock): 트랜잭션이 데이터에 대해 배타 잠금을 걸면 트랜잭션은 데이터에 대해 읽기나 기록 모두 불가능

### 병행 제어 기법의 종류

#### 2 단계 잠금 규약 기법

- 트랜잭션 스케줄의 직렬성을 보장하는 대표적인 잠금 기법
- 교착상태를 예방할 수 없다.
- 확장(Growing) 단계: 트랜잭션이 잠금만 수행할 수 있고 잠금해제는 수행할 수 없는 단계
- 축소(Shrinking) 단계: 트랜잭션이 잠금해제만 수행할 수 있고 잠금은 수행할 수 없는 단계

#### 타임스탬프 순서 기법

- 시스템이 각 트랜잭션을 실행할 때 부여하는 값인 타임스탬프로 순서에 따라 트랜잭션 작업을 수행한다.
- 교착상태가 발생하지 않는다.

## 보안

- DB 일부분 또는 전체에 대해 권한이 없는 사용자가 접근을 수행하는 것을 금지하기 위해 사용하는 기술

### 보안 기술의 목표

- 정보 보호(Information Security): 정보의 불법적인 노출을 방지
- 정보 인증(Information Authentication): 고의적으로 정보를 수정하거나 허위 정보를 저장시키려는 것을 방지
- 사용자 인증(User Authentication): 패스워드나 음성, 지문 등을 대조하여 DB 를 이용하는 사람들의 신원을 확인

### 보안 기법

- 뷰 기법
- DCL 기법: 권한 부여 및 해제
- 암호화 기법
  - 개인키 암호화 기법: 동일한 키로 데이터를 암복호화한다.
  - 공개키 암호화 기법: 데이터를 암호화할 때 사용하는 공개키는 DB 사용자에게 공개하고 복호화할 때의 비밀키는 관리자가 비밀리에 관리

## 튜닝

- DB 튜닝이란 DB 응용 프로그램, DB 자체, 운영체제 등의 조정을 통하여 DBMS 의 성능을 향상시키는 작업

### 인덱스 튜닝

#### B-트리 인덱스

- 일반적으로 사용되는 인덱스 방식
- 루트 노드에서 하위 노드로 키 값의 크기를 비교해 나가면서 단말 노드에서 찾고자 하는 데이터를 검색

#### 비트맵 인덱스

- 인덱스 컬럼의 데이터를 Bit 값인 0 또는 1 로 변환하여 인덱스 키로 사용하는 방법
- 분포도가 좋은 컬럼에 적합하며 데이터가 Bit 로 구성되어 있기 때문에 효율적인 논리 연산이 가능하고 저장공간이 적다.

#### 역방향 인덱스

- 인덱스 컬럼의 데이터를 역으로 변환하여 인덱스 키로 사용하는 방법
- B-트리 인덱스에서 발생할 수 있는 불균형 문제를 해결
- 데이터의 분포도가 좋아져 검색 성능이 좋다.

#### 클러스터드 인덱스

- Clustered Index
- 인덱스 키의 순서에 따라 데이터가 정렬되어 저장되는 방식
- 실제 데이터가 순서대로 저장되어 있어 인덱스를 검색하지 않아도 원하는 데이터를 빠르게 찾을 수 있다.
- 데이터 삽입, 삭제시 순서를 유지하기 위해 데이터를 재정렬해야한다.
- 한 개의 릴레이션에 하나의 인덱스만 생성 가능하다.

#### 논클러스터드 인덱스

- Non-Clustered Index
- 인덱스의 키 값만 정렬되어 있고 실제 데이터는 정렬되지 않는 방식
- 데이터를 검색하기 위해 인덱스를 검색하고 실제 데이터의 위치를 확인해야 하므로 클러스터드 인덱스에 비해 검색속도가 떨어진다.
- 한 개의 릴레이션에 여러 개의 인덱스를 만들 수 있다.

#### 결합 인덱스

- 인덱스들이 자주 조합되어 사용하는 경우는 하나의 결합 인덱스를 생성한다.
- 결합 인덱스의 컬럼 순서는 데이터 분포도가 좋은 컬럼을 선행 컬럼으로 설정

> 분포도
>
> - 선택성(Selectivity)
> - 전체 레코드 중 조건에 맞는 레코드의 숫자가 적은 경우 분포도가 좋다고 한다.
> - 분포도가 10~15%인 경우 효율적인 인덱스 검색을 할 수 있다.

## 객체 지향 DB

- 오버로딩: 하나의 메소드 이름으로 다른 파라미터를 지정하여 사용하는 기법
- 오버라이딩: 슈퍼 클래스에 있는 메소드를 서브 클래스에서 상속받아 다른 기능을 수행하는 메소드로 재정의하는 기법

## 분산 DB

### 분산 DB 시스템의 구성요소

- 분산 처리기: 지리적으로 분산되어 있는 컴퓨터 시스템
- 분산 DB: 지리적으로 분산되어 있는 DB
- 통신 네트워크: 분산 처리기들을 통신망으로 연결하여 논리적으로 하나의 시스템처럼 작동할 수 있도록 하는 네트워크

### 분산 DB 의 목표

#### 위치 투명성

- Location Transparency
- DB 의 실제 위치를 알 필요 없이 단지 DB 의 논리적인 명칭만으로 접근할 수 있다.

#### 중복 투명성

- Replication Transparency
- 데이터가 여러 곳에 중복되어 있더라도 사용자는 마치 하나의 데이터만 존재하는 것처럼 사용할 수 있고 시스템이 자동으로 여러 데이터에 대한 작업을 수행한다.

#### 병행 투명성

- Concurrency Transparency
- 다수의 트랜잭션들이 동시에 실행되더라도 그 트랜잭션들의 수행 결과는 서로 영향을 받지 않는다.

#### 장애 투명성

- Failure Transparency
- 장애에도 불구하고 트랜잭션은 정확하게 수행된다.

## 멀티미디어 DB

- 텍스트, 그래픽, 정지 화상, 동영상, 음성 등이 복합적으로 구성된 DB
- 비정형 데이터이기 때문에 미디어별로 별도의 검색 방법이 필요하다.
- 데이터의 구조가 복잡하고 관계를 구성하기가 어렵다.

## 주기억장치 DB

- DB 전체를 주기억장치에 상주시킨 후 DB 연산을 수행하는 시스템

## 데이터 웨어하우스

- Data Warehouse
- 급증하는 다량의 데이터를 효과적으로 분석하여 정보화하고 이를 여러 계층의 사용자들이 효율적으로 사용할 수 있도록 한 DB

## 데이터 마트

- Data Mart
- 소규모 단일 주제의 데이터 웨어하우스를 말한다.

## 데이터 마이닝

- Data Mining
- 데이터 웨어하우스에 저장된 데이터 집합에서 사용자의 요구에 따라 유용하고 가능성 있는 정보를 발견하기 위한 기법

### 데이터 마이닝 기법

- 연관(Association): 연관 관계를 발견하기 위한 방법
- 연속(Sequence): 트랜잭션의 향후 발생 가능성을 예측하는 방법
- 분류(Classfication): 다른 그룹과의 차별적인 특성을 도출하기 위한 방법
- 클러스터링(Clustering): 상호 간에 유사한 특성을 갖는 데이터를 집단화하는 방법
- 특성화(Characterization): 데이터의 요약 과정을 통해 특성을 발견하는 방법
- 패턴 분석(Pattern Analysis): DB 내의 명시된 패턴을 찾는 방법
- 경향 분석(Trend Analysis): 동적으로 변화하는 데이터를 분석하는 방법

## OLAP

- Online Analytical Processing
- 다차원으로 이루어진 데이터로부터 통계적인 요약 정보를 분석하여 의사결정에 활용하는 방식

### OLAP 연산

- Roll-up: 구체적인 내용의 상세 데이터로부터 요약된 형태의 데이터로 접근하는 기능
- Drill-down: 단계적으로 요약된 형태의 데이터로부터 구체적인 내용의 상세 데이터로 접근하는 기능
- Drill-through: 데이터 웨어하우스나 OLTP 에 존재하는 상세 데이터에 접근하는 기능
- Drill-across: 다른 데이터 큐브의 데이터에 접근하는 기능
- Pivoting: 보고서의 행, 열, 페이지 차원을 바꿔 볼 수 있는 기능
- Slicing: 다차원 데이터 항목을 다양한 각도에서 조회하고 비교하는 기능
- Dicing: Slicing 을 더 세분화하는 기능

### OLAP 종류

- ROLAP(Relational-OLAP): 관계형 DB 와 관계형 질의어를 사용하여 다차원 데이터를 저장 및 분석
- MOLAP(Multi-dimension OLAP): 데이터 검색 속도를 향상시키기 위해 큐브 캐시라고 하는 주기억장치 속에 데이터 큐브를 보관
- HOLAP(Hybrid OLAP): ROLAP 과 MOLAP 의 특성을 모두 가졌고, 요약을 메모리에 저장하고 기본 데이터나 다른 요약들은 관계형 DB 에 저장

## OLTP

- Online Transaction Processing
- 온라인 업무 처리 형태의 하나로 네트워크 상의 여러 이용자가 실시간으로 DB 의 데이터를 갱신하거나 검색하는 등의 단위 작업을 처리하는 방식

## ODBC

- 프로그램과 DB 의 종류에 관계없이 자유롭게 DB 에 접근하여 사용할 수 있도록 만든 표준 인터페이스
- Application: DB 에 접속할 때 ODBC API 를 사용
- Driver Manager: Application 과 ODBC Driver 간의 통신을 관리하는 라이브러리
- DSN(Domain Service Name): 서버에 연결할 때 필요한 드라이버와 DB 정보를 저장
- ODBC Driver: ODBC API 가 지원하는 함수를 구현하는 라이브러리
