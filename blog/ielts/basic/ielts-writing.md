---
title: IELTS Writing
date: 2023-10-09T10:06:36.118+09:00
description: IELTS Writing
authors: me
tags:
  - ielts
  - me
---

## Part1

### Format

```mermaid
graph TD
    Introduction --> Line1[빈줄]
    Line1 --> Body1

    subgraph Introduction[Introduction + Overview]
        direction LR
        IntroLength[2문장]
        Intro[그래프 소개]
        Overview[전반적 특징]

        Intro --> Overview
    end

    subgraph Body1
        direction LR
        Body1Length[4-6문장]
        Body1Child1[주요 세부 특징]
    end

    Body1 --> Line2[빈줄]
    Line2 --> Body2

    subgraph Body2
        direction LR
        Body2Length[4-6문장]
        Body2Child1[나머지 세부 특징]
    end
```

### Map 패턴

> be p.p.
> be 에는 was, has been (now), will be (future)

- 변경
  - A be replaced **by** B: 사물은 by 이다.
  - A be converted into B
- 추가
  - A be built
  - A constructred
  - A developed
- 파괴
  - A be demolished
- 잔존
  - remained unchanged
- 위치 표현
  - next to 건물
  - behind 건물
  - on the north/west/south/east side of 건물,마을,지명
- 마을
  - the town, the park, the island

### Process 패턴

- 종류, 형태, 수일치, 시제 파악.
- In the `#` stage / progress / step / phase.
- 수동: 가공식품, 제품
  - is p.p. are p.p.
  - cheese, smoked fish, canned fruit, cement...
- 능동: 생물, 자연현상: salmon, moth, water, CO2, rock
  - lay eggs -> hatch -> trow into -> migrate

## Part2

> 입장, 근거, 예시, 설명, 정리
> 5문장만 써, 더 하려하지마.

### Types

- 찬성 또는 반대: Agree / Disagree
- 두 가지 견해: Both Views
- 장점과 단점: Advantage & Disadvantage
- 원인 / 문제점과 해결책: Cause / Problem & Solution
- 두 가지 과제: Two-part Question

### Format

```mermaid
graph TD
    Introduction --> Line1[빈줄]
    Line1 --> Body1

    subgraph Introduction
        direction LR
        IntroLength[2-3문장]
        Intro[주제소개 및 나의 의견]
    end

    subgraph Body1
        direction LR
        Body1Length[4-6문장]
        Body1Child1[내 의견에 대한 주장]
        Body1Child2[주장에 대한 근거]
        Body1Child3[부연설명/경험/연구결과]

        Body1Child1 --> Body1Child2 --> Body1Child3
    end

    Body1 --> Line2[빈줄]
    Line2 --> Body2

    subgraph Body2
        direction LR
        Body2Length[4-6문장]
        Body2Child1[내 의견에 대한 주장]
        Body2Child2[주장에 대한 근거]
        Body2Child3[부연설명/경험/연구결과]

        Body2Child1 --> Body2Child2 --> Body2Child3
    end

    Body2 --> Line3[빈줄]
    Line3 --> Conclusion

    subgraph Conclusion
        direction LR
        ConcLength[1-2문장]
        Conc1[서론 주장 강조 요약]
        Conc2[본론 이유 강조 요약]

        Conc1-->Conc2
    end
```

## Grammar

- The number increased ... and the figure reached
  - === `, with the figure reaching`
  - 다른 목적어를 연결하는 경우
- The number increased ... and it reached
  - === `, reaching`
  - 같은 주어를 연결하는 경우
