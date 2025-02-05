---
title: 요구 공학 정리
date: 2024-04-21T11:35:08.988+09:00
description: Requirements Engineering
authors: me
tags:
  - me
---

## 스텝

> [IEEE: 10 small steps to better requirements](https://ieeexplore.ieee.org/document/1605174)

1. Mission & Scope: 미션과 스코프 식별
2. Stakeholders: 이해관계자 실별
3. Goals: 목표 식별
4. Goal Conflicts: 상이한 이해관계자 간의 목표 절충
5. Scenarios: 요구사항을 시나리오 형태로 기술
6. Shall Statement: 해야한다 형태로 기술
7. Justification: 특정 기능이 포함되어야 하는 이유를 정확히 설명
8. Assumptions: 비기능 요구사항과 각종 제약사항 분석
9. Agreed Priorities: 핵심 기능과 기타 요구사항 분리
10. Acceptance Criteria: 요구사항이 제대로 구현되었는지를 판단하는 기준 정의

## 위험요인

- Overlooking a crucial requirements
- Inadequate Customer representation
- Modeling only functional requirements: 비기능 요구사항, 예외 시나리오 파악 필요
- Not inspecting requirements
- Attempting to perfect requirements before beginning construction: 완벽한 요구사항 도출, 분석은 현실적으로 불가능.
- Representing requirements in the form of designs: 설계how가 아닌 요구사항을 실현할 what에 대해 집중.

## 어려움

- Incomplete or hidden requirements
- Poor communication between the team and customer
- Underspecifided requirements
- Poor communication within the team

피하기 위해 Terminology, Abbreviation 등 기술적 용어와 약자를 우선 정의.
자연어 명세를 피하기 위해 각종 UML 다이어그램 활용.

## UML

- Class Diagram
- Sequence
- Activity
- State Machine
- Use Case

위 순서대로 잘 그리면 된다.
