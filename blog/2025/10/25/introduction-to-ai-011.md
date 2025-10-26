---
title: IAI +011
date: 2025-10-25T21:50:14.442+11:00
description: IAI +011
authors: me
tags:
  - iai
---

## Uncertain Domain

- Agent may need to handle uncertainty
- Environment is partially observable
  - Fully observable: An agent knows where it is.
  - The drone never knows its exact position, only an estimated one.
  - The true user intent is not directly observable, only noisy speech data.
  - It cannot see the whole environment or detect humans perfectly.
  - The true health state (disease present or not) is hidden.
- Environment is non-deterministic
  - AI Trading Agent
    - even if the agent takes the same action, the outcome can vary dramatically.
    - from market prices changes unpredictably due to external events (news, other traders, economic data).
    - network latency, competing traders' behavior are stochasic and independent, random fluctuations can affect the outcome.
    - buy action could lead to profit, loss, or no change depending on uncontrollable external factors.
  - AI Helpdesk Chatbot
    - even when the chatbot executes the same action, it sends queries to multiple backend systems, the result may differ each time.
    - network latency or failures, backend load, concurrent requests, and external dependencies can lead to different response times or outcomes.
    - same command doesn't guarantee the same outcome.
- Autonomous Driving
  - Partial Observability
    - Sensors cannot detect everything, blind spots, weather effects, occluded vehicles.
  - Non-Determinism
    - Even if the car signals a turn and starts moving, other drivers might brake suddenly, pedestrians might cross unexpectedly, or traffic lights might malfunction.
    - depending on random external events.
- Medical
  - Partial Observability
    - The patient's internal health state is not directly visible.
    - tests can be inaccurate or incomplete: false positives/negatives, missing data
  - Non-Determinism
    - The same treatment can have different effects on different patients due to genetics, lifestyle, or random biological responses.
    - A drug may succeed, fail, or cause side effects.
