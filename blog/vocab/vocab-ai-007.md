---
title: Vocabulary for AI @007
date: 2025-09-08T18:18:47.830+10:00
description: Vocabulary for AI @007
authors: me
tags:
  - vocab
---

## Vocabulary & Expressions

| Term/Expression | Definition | Simpler Paraphrase | Meaning |
| --- | --- | --- | --- |
| referee | A person who supervises a game or match to ensure the rules are followed | Umpire | 심판 |
| nonterminal state | The agent is still in the middle of the episode. The environment can continue to produce rewards, and the agent can still take actions. | ongoing state | 비종결 상태 |
| apprenticeship | a period of time working as an apprentice | internship | 수습 기간 |

## RL

| 항목 | **Policy evaluation** | **Passive learning**  | **Policy search** |
| --- | --- | --- | --- |
| **정책 (π)** | 고정, 외부에서 주어짐 | 고정, 외부에서 주어짐 | 없음 → 직접 탐색·개선 |
| **환경 모델 (P, R)** | 모두 알고 있음 (완전한 MDP) | 모름, 경험으로 추정 | 알 수도 있고 모를 수도 있음 |
| **학습 목표** | 주어진 정책 하에서 $U^\pi(s)$ 계산 | 주어진 정책 하에서 $U^\pi(s)$ 경험 기반 추정 | 최적 정책 $\pi^*$를 직접 찾기 |
| **접근 방식** | 벨만 방정식 기반 반복 계산 (iterative policy evaluation) | 환경을 실제로 탐험하면서 transition & reward 관찰, 그로부터 utility 추정 | 정책 파라미터를 조금씩 바꾸며 return 극대화 (policy gradient, evolutionary search 등) |
| **필요 데이터** | 없음 (모델이 다 주어짐) | 환경 경험 (trajectory, reward sequence) | 환경 경험 (보상 피드백), 때로는 gradient |
| **계산/학습 특징** | 계산 문제, 오차 없이 수렴 가능 | 샘플 효율 낮음, Monte Carlo/TD 방식 사용 | gradient variance 큼, local optimum 위험 |
| **적용 예시** | 교재의 Gridworld (모델식 다 알려진 경우) | 환경은 블랙박스, 정책 고정 실험 (시뮬레이션 따라다니기) | 로봇 제어, 연속 행동 공간 (PPO, REINFORCE 등) |
| **장점** | 정확·빠름, 모델만 있으면 해석 용이  | 모델이 없어도 가능, 실제 환경에서 학습 | 연속·복잡한 행동 직접 최적화 가능 |
| **단점** | 현실 환경은 모델을 모르는 경우가 많음 | 정책을 개선할 수는 없음 (평가 전용) | 학습 불안정, 많은 데이터 필요 |

$$R(S_t,π(S_t),S_{t+1})$$

> 시간 $t$에 상태 $S_t$에 있었고, 정책이 정한 행동 $π(S_t)$을 했더니, 다음 상태 $S_{t+1}$에 도착했다. 그때 받는 보상은 $R(S_t,π(S_t),S_{t+1})$이다.

- **현재 상태에서 정책이 정한 행동을 취해 다음 상태로 갔을 때 받은 보상**
- $S_t$: 시간 $t$에 에이전트가 위치한 현재 상태
- $π(S_t)$: 정책 π가 현재 상태 $S_t$에서 선택한 행동 (action)
- $S_{t+1}$: 그 행동을 수행한 뒤 도달한 다음 상태
- $R$: 이 세 가지 (현재 상태, 행동, 다음 상태)에 의해 결정되는 보상 함수

### Passive RL

- Direct Utility Estimation
- ADP (Adaptive Dynamic Programming)
- TD (Temporal Difference Learning)
