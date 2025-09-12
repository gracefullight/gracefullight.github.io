---
title: Introduction to AI @006
date: 2025-09-12T17:43:06.849+10:00
description: Introduction to AI @006
authors: me
tags:
  - iai
---

## Markov process or Markov chain

> the state sequence satisfies the Markov assumption

- The current state depends on only a finite fixed number of previous states.
- $P(X_t | X_{0:t-1}) = P(X_t | X_{t-1})$

## Decision Theory

- Choosing actions based on the desirability of their immediate outcomes.
- The outcome of taking action $a$ in state $s_0$ is deterministic then $Result(s_0, a)$.
- If the outcome is non-deterministic (stochastic), fully observable, the agent knows the current state $s_0$.
  - It is represented as a random variable whose values are the possible outcome states.
  - The transition model specifies the probabilities of possbile outcome states.
  - $P(s, a, s')$

## MEU, Maximum Expected Utility

> A rational agent should choose the action that maximizes its expcted utility.

- The MEU principle could be seen as defining all of AI.
- $action = argmax_a(EU(a|e))$
  - among this set of actions, give the highest expected utility.
- $EU(a|e) = \sum_{s'} (P(Result(a) = s' | a, e) * U(s'))$

## Sequential decision problem

> type of problem or scenario where a decision-maker must make **a series of choices or decisions** over time in order to achieve a desired outcome.

- a sequential decision-making problem or sequential decision-making task

### MDP, Markov Decision Process

> a sequential decision problem for a fully observable, stochastic environment environment with a Markovian transition model and additive rewards.

- a formal framework for modeling sequential decision problems.
- including states, actions, transition probabilities, and rewards
- used in reinforcement learning and operations research.

| Component | Description |
|-----------|-------------|
| **Environment** | fully observable, Stochastic |
| **States** | a set of states (with an initial state S₀) |
| **Transition model** | Markovian |
| **Reward** | additive |
| **Agent** | Make decisions at time step for actions<br/>Interacts with environment through percepts and actions |

### RL, Reinforcement Learning

- an agent interacts with an environment
- takes acitons to maximize a cumulative reward signal over time.
- learns a policy that balanes exploratino and exploittation
  - exploration: trying new actions.
  - exploitation: choosing known good actions.

## Sample MDP

### Environment

- The agent lives in a 4x3 fully observable stochastic environment
- Walls block the agent's path; Begin in the start state, the agent must choose an action at each time step
- Actions available to the agent in each state: Up, Down, Left, or Right
- The interaction with the environment terminates when the agent reaches one of the goal states, marked +1 or -1

#### 4x3 Grid World

|   | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **3** |   |   |   | *+1* |
| **2** |   | 🚫 |   | *-1* |
| **1** | *START* |   |   |   |

- START: Initial position (1,1)
- 🚫: Wall (impassable)
- +1: Goal state with positive reward
- -1: Goal state with negative reward

### Transition Model

- Stochastic environment with uncertainty
- When agent chooses an action, there's:
  - 0.8 probability of moving in intended direction
  - 0.1 probability of moving perpendicular to intended direction (each side)

### Reward Function

- The agent receives rewards each time step:
  - Small "living" reward each step (-0.04 in all states except the terminal states)
  - Big rewards come at the end (+1 for good and -1 for bad terminal states)

### Goal

- To maximize sum of rewards from the start state to a terminate state
