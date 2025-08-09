---
title: Introduction to ai @002
date: 2025-08-09T18:31:59.650+10:00
description: Introduction to ai @002
authors: me
tags:
  - iai
---

## Environment

- All possible state and information about how the states are related.
- The costs from one state to each of its adjacent states are also given.

### Agent

- Simulated intelligence knows which state it is in.
- If it takes an action at a given state, it knows the next state and the corresponding cost.

## Characteristics of the environment

- Fully Observable: The agent always knows the current state of the environment at each point in time.
- Deterministic: The next state of the environment is completely determined by the current state and the action taken by the agent.
- Static: The environment is unchanged.
- Discrete: A limited number of distinct, clearly defined actions.
- Single agent: An agent operating by itself in an environment.

## Search problem

> Finding a path from a starting point to a goal point in a space.

- **The initial state**
- **State space**: The environment or area where the search takes place
- **A set of actions**: The possible actions that the agent can take in each state.
  - `ACTION (s)`
- **A transition model**:
  - takes in a state and an action.
  - returns the successor state, which is any state reachable from doing action `a` in state `s`.
  - `RESULT(s, a)`
- **A goal state**:
  - The target location or position that needs to be reached.
  - represented by a goal test function
- **A path cost function**:
  - The cost associated with a particular path taken through the state space.
  - `c(s1, a, s2)`
