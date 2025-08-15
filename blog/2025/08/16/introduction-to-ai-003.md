---
title: Introduction to AI @003
date: 2025-08-16T09:13:08.242+10:00
description: Introduction to AI @003
authors: me
tags:
  - iai
---

## Local Search Problem

> To find the state that gives the **optimal/best value** of the **evaluation function**

- It can be seen as an optimization problem.
- a computational problem that finds the best solution (a state) that satisfies the given constraints
- `evaluation function === objective function`
- Only cares about the optimal solution/best state without considering the paths to reach the best state (the optimal solution)

### Feasible region & solution

- **Feasible region**: the set of all possible or candidate solutions which are the solutions that satisfies the problem's constraints
- **Feasible solution**: a solution in the feasible region

### Search Problem vs Local Search Problem

> Path-based vs State-based

| Aspects | Search Problem | Local Search Problem |
| --- | --- | --- |
| State | All possible states - state-space landscape | Range of decision variables and constraints |
| Goal | Goal state & goal test | Evaluation function & objective function |
| Evaluation | Measure closeness to goal - distance/fitness | Minimize cost or maximize fitness |
| Transition/Successor | Transition function | Successor function |

### Discrete & Continuous Optimization

- **Discrete optimization**: optimization problems where the solution space is discrete (e.g., 8 queens problem)
- **Continuous optimization**: optimization problems where the solution space is continuous (e.g., real numbers, any value within a range)

### Information needed for Local Search

- **All possible states**: state-space landscape
- **Transition function**: To find neighbour or successor state
- **Goal state**
- **Objective function**: A way to measure how close to the goal state
- **Start state**

### Search state-space

- **Global Maximum**: A state that maximizes the objective function over the entire state space
- **Local Maximum**: A state that maximizes the objective function within a small area around it.
- **Plateau**: A state such that the objective function is constant in an area around it.
  - **Shoulder**: A plateau that has uphill edge.
  - **Flat**: A plateau whose edges go downhill.
