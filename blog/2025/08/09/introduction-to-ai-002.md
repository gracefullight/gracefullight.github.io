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

## Frontier

- A set of nodes that are under consideration to be expanded.
- A set of leaf nodes in the search spanning tree are available for expansion at any given step.
- A search algorithm determines how to choose a node in the Frontier to grow the search spanning tree.

## Search Algorithm

```mermaid
graph LR;
  ClassicSearchAlgorithm["Classic Search Algorithm"]
  ClassicSearchAlgorithm --> UniformedSearch["Uniformed Search"]
  ClassicSearchAlgorithm --> InformedSearch["Informed Search"]

  UniformedSearch --> BlindSearch["Blind Search"]
    BlindSearch --> BreadthFirstSearch["Breadth First Search"]
    BlindSearch --> DepthFirstSearch["Depth First Search"]
  UniformedSearch --> UniformCostSearch["Uniform Cost Search"]

  InformedSearch --> GreedyBestFirstSearch["Greedy Best-First Search"]
  InformedSearch --> AStarSearch["A* Search"]
```

### Tree Search vs Graph Search

> Explored Set

- The frontier in graph search separates the search-space graph into two regions, the explored region and the unexplored region, so that Every path from the initial state to an unexplored state has to pass through a state in the frontier.

### Performance measures

- Completeness
- Cost Optimality
- Time complexity
- Space complexity

### BFS

> Queue

#### BFS Tree

```py
from collections import deque

def bfs_tree(start, goal_test, successors):
    """
    start: 시작 상태
    goal_test(s): 목표 검사 함수 -> bool
    successors(s): 상태 s에서 갈 수 있는 다음 상태들의 리스트 반환

    반환: 목표에 도달하는 경로(list) 또는 None
    (Tree-search: explored/중복 체크 안 함)
    """
    if goal_test(start):
        return [start]

    # 노드 = (state, parent_index)
    nodes = [(start, None)]
    frontier = deque([0])  # nodes의 인덱스를 큐에 저장

    while frontier:
        parent_idx = frontier.popleft()
        parent_state, _ = nodes[parent_idx]

        for nxt in successors(parent_state):
            nodes.append((nxt, parent_idx))
            child_idx = len(nodes) - 1

            if goal_test(nxt):
                # 경로 복원
                path, i = [], child_idx
                while i is not None:
                    path.append(nodes[i][0])
                    i = nodes[i][1]
                return list(reversed(path))

            frontier.append(child_idx)

    return None
```

```py
from collections import deque

def bfs_graph(start, goal_test, successors):
    """
    start: 시작 상태 (예: 'Arad')
    goal_test(s): s가 목표면 True
    successors(s): 상태 s에서 (다음상태, 비용) 혹은 그냥 다음상태 리스트 반환
                   아래에서는 다음상태 리스트라고 가정
    반환: start -> ... -> goal 경로 리스트, 없으면 None
    """
    # 노드 = (state, parent_index)
    frontier = deque([(start, None)])   # FIFO 큐
    frontier_states = {start}           # frontier에 있는 상태 집합 (중복 방지)
    explored = set()                    # 이미 확장한 상태(Closed)

    # 경로 복원을 위해 모든 노드를 배열에 따로 저장
    nodes = [(start, None)]             # nodes[i] = (state, parent_index)
    index_in_queue = deque([0])         # frontier에서의 인덱스(=nodes의 인덱스)

    if goal_test(start):
        return [start]

    while frontier:
        state, parent = frontier.popleft()
        node_idx = index_in_queue.popleft()
        frontier_states.discard(state)
        explored.add(state)

        for nxt in successors(state):
            if (nxt not in explored) and (nxt not in frontier_states):
                # child 노드 저장
                nodes.append((nxt, node_idx))
                child_idx = len(nodes) - 1

                if goal_test(nxt):
                    # 경로 복원
                    path = []
                    i = child_idx
                    while i is not None:
                        path.append(nodes[i][0])
                        i = nodes[i][1]
                    return list(reversed(path))

                # frontier에 삽입
                frontier.append((nxt, node_idx))
                index_in_queue.append(child_idx)
                frontier_states.add(nxt)

    return None
```

```py
graph = {
    "Arad": ["Sibiu", "Timisoara", "Zerind"],
    "Sibiu": ["Arad", "Fagaras"],
    "Timisoara": ["Arad", "Lugoj"],
    "Zerind": ["Arad"],
    "Fagaras": [],
    "Lugoj": []
}

path = bfs(
    start="Arad",
    goal_test=lambda s: s == "Lugoj",
    successors=lambda s: graph.get(s, [])
)
print(path) 
```
