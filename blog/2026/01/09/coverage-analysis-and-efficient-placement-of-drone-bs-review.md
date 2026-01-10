---
title: Coverage analysis and Efficient placement of drone BS review
date: 2026-01-09T16:55:50.188+11:00
description: Coverage analysis and Efficient placement of drone BS review
authors: me
tags:
  - drone
---

## Summary

- This study reformulates Drone-BS 3D deployment as a SINR-based coverage probability optimization problem rather than a distance- or area-based one.
- By jointly considering LOS/NLOS propagation, altitude-dependent SINR behavior, and system constraints, the deployment problem is formulated as an NP-hard MINLP.
- A meta-heuristic optimizer (GWO) is used as a practical solver, demonstrating that high coverage can be achieved with a minimal number of Drone-BSs.

## Introduction

### Background

- In 5G networks, Drone-BSs (UAV-BSs) have attracted significant attention as a promising solution to enhance coverage and capacity in dense urban environments.
- Although the use of the mmWave band enables high data rates, determining the optimal 3D deployment (horizontal location and altitude) of Drone-BSs has emerged as a critical challenge.

### Limitations of Existing Studies

- Assumption of fixed Drone-BS altitude
- Reliance on heuristic-based approaches
- Consideration of limited system constraints

### Objective of This Study

- This study aims to derive an optimal Drone-BS deployment strategy by combining
- SINR-based downlink coverage probability analysis and
- a meta-heuristic optimization algorithm, namely the Grey Wolf Optimizer (GWO).

## Methods

### System Model

- Users (N) and Drone-BSs (M) are randomly distributed in an urban environment.
- A mmWave path loss model considering LOS and NLOS propagation conditions is applied.
- A predefined SINR threshold is used as the Quality-of-Service (QoS) criterion.

### Coverage Probability Analysis

- The probability that SINR exceeds a predefined threshold is derived based on stochastic geometry.
- Shadow fading is modeled as a Gaussian random variable.
- The downlink coverage probability is expressed using a Q-function formulation.

### Optimization Problem Formulation

- Objective function
  - Maximize the number of covered users.
- Constraints
  - Minimum number of deployed Drone-BSs
  - Drone-BS altitude limits
  - Total available bandwidth constraint
- The problem is formulated as a Mixed Integer Non-Linear Programming (MINLP) problem and is NP-hard.

### Solution Approach

- The Grey Wolf Optimizer (GWO) is employed to search for the optimal 3D locations (x, y, h) of Drone-BSs.

## Results

### Simulation Setup

- Area size: 2 × 2 km²
- Number of users: 200
- Maximum number of Drone-BSs: 10
- Carrier frequency: 28 GHz

### Key Findings

- The downlink coverage probability increases as the Drone-BS altitude increases.
- A coverage probability of approximately 0.76–0.82 can be achieved with only five Drone-BSs.
- Reducing the number of Drone-BSs leads to uncovered regions.
- Increasing the number of Drone-BSs may result in higher inter-cell interference.

## Discussion

### Performance Analysis

- The GWO-based deployment achieves high coverage performance while minimizing the number of Drone-BSs.
- Increasing altitude improves coverage but introduces a trade-off in terms of reduced energy efficiency.

### Limitations and Future Work

- The proposed approach does not consider blockage effects or handover and coverage overlap issues.
- These aspects are identified as important directions for future research.

## Terminology

- **Drone-BS**: Drone Base Station
- **GWO**: Grey Wolf Optimizer, a nature-inspired optimization algorithm based on the social hierarchy and hunting behavior of grey wolves.
- **LOS**: Line of Sight, a direct path between transmitter and receiver without obstructions.
- **MINLP**: Mixed Integer Non-Linear Programming, an optimization problem involving both integer and continuous variables with non-linear relationships.
- **NLOS**: Non-Line of Sight, a path between transmitter and receiver that is obstructed.
- **SINR**: Signal to Interference plus Noise Ratio, a measure of signal quality.
- **UVA-BS**: Unmanned Aerial Vehicle Base Station

## Ref

- Ouamri, M. A., Oteşteanu, M.-E., Barb, G., & Gueguen, C. (2022). Coverage Analysis and Efficient Placement of Drone-BSs in 5G Networks. The 1st International Conference on Computational Engineering and Intelligent Systems, 18. [https://doi.org/10.3390/engproc2022014018](https://doi.org/10.3390/engproc2022014018)
