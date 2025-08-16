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
- Not systematic

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
- **Transition function**: To find neighbor or successor state
- **Goal state**
- **Objective function**: A way to measure how close to the goal state
- **Start state**

### Search state-space

- **Global Maximum**: A state that maximizes the objective function over the entire state space
- **Local Maximum**: A state that maximizes the objective function within a small area around it.
- **Plateau**: A state such that the objective function is constant in an area around it.
  - **Shoulder**: A plateau that has uphill edge.
  - **Flat**: A plateau whose edges go downhill.

### Advantages

- use little memory
- can often find reasonably good solution in large or infinite search spaces
- useful for solving pure optimization problems
- don't need to know the path to the solution.

## Hill climbing

> keeps track of one current state and on each iteration moves to the neighboring state with highest value.

- $f = max(-cost(X))$
- Steps
  - Evaluate the initial stat
  - If it is equal to the goal state, return. Otherwise, continue.
  - Find a neighboring state
  - Evaluate this state. If it is closer to the goal state than before, replace the initial state with this state.
  - Repeat steps 2-4 until it reaches a goal state (local or global maximum) or runs out of time.
- No search tree, No backtracking, Don't look ahead beyond the current state.
  - get stuck due to local maxima, plateaus, or ridges.

### Variations of HC

- **Simple HC**: greedy local search which expands the current state and moves on to the best neighbor.
- **Stochastic HC**: choose randomly among the neighbors going uphill.
- **First-choice HC**: generate random successor until one is better. Good for states with high numbers of successors.
- **Random restart**: conducts a series of hill climbing searches from random initial states until a goal state is found.
