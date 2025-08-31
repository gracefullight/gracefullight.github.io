---
title: Do As I Can, Not As I Say Review
date: 2025-08-24T12:04:59.631+10:00
description: Do As I Can, Not As I Say Review
authors: me
tags:
  - vlm
---

## Say Can

- The core of SayCan is using an LLM to decompose high-level instructions into low-level skills, and reinforcement-learned affordance value functions to evaluate whether each skill is feasible in the current environment.
- The Say × Can structure is modular: different LLMs or affordance models can be swapped in, but each module’s inherent biases are carried into the system.
- To mitigate limitations, loop-based strategies are essential — CoT and RLHF provide feedback loops for LLMs, while closed-loop feedback enables affordance functions to adapt during execution.

## Motivation (Why LLMs alone fall short)

- **LLMs lack embodiment.** They haven’t acted in the physical world, so using them for decision-making on a specific robot is unreliable.
- **LLMs don’t know robot’s abilities or state.** They may split instructions into subtasks, but without context of capabilities and environment, plans can be irrelevant.
- **Prompting alone isn’t enough.** Structured prompts help, but they don’t guarantee admissible or executable steps.

## Core Proposal (What SayCan adds)

- **Ground with pretrained skills.** Constrain LLM to propose actions that the robot can actually perform in context.
- **Say × Can factorization.**
  - **Say (task-grounding):** LLM estimates relevance of each skill to the instruction.
  - **Can (world-grounding):** Affordance functions estimate probability of success from current state.

## Probabilistic Formulation

- **Two probabilities multiplied:**  
  - $ p(\ell_\pi|i) $: LLM score of relevance.
  - $ p(c_\pi|s,\ell_\pi) $: affordance score of success.
  - Select: $ \pi = \arg\max p(c_\pi|s,\ell_\pi)\,p(\ell_\pi|i) $.

## Planning Procedure

- Planning is structured as a **dialog**: user gives high-level instruction, LLM produces a step sequence, loop until "done."
- Benefit: **Interpretability**—scores provide transparency.
- Caveat: Without affordances, chosen steps may be irrelevant to the current scene.

## Affordances via RL

- **Affordance = value function.** In sparse reward settings, value ≈ success probability.  
- TD RL and MDP formalism used to learn $ Q_\pi(s,a) $.

## Implementation

- **Skill training:**  
  - BC-Z (behavioral cloning) and MT-Opt (reinforcement learning).
  - Multi-task BC/RL amortizes training cost.
- **Language conditioning:** Pretrained sentence encoder frozen, text embeddings as input.
- **Action space:** 6-DoF end-effector, gripper open/close, base x-y & yaw deltas, terminate.

## Metrics

- **Plan success rate:** 2/3 human raters agree that the plan is valid.
- **Execution success rate:** 2/3 raters agree robot achieved the task.

## Key Results

- **Grounding nearly doubles performance** vs non-grounded baselines.
- **Understands sequence order** (approach → pick → bring).
- **Failures:** Long-horizon tasks (early termination), negation, ambiguous references.
- **Error split:** ~65% LLM, 35% affordance.  

## Ablations

- **Remove LLM (task-grounding):**
  - BC-NL: 0% all tasks.
  - BC-USE: 60% on single primitives, 0% otherwise.
- **Remove affordances (world-grounding):**
  - No-VF: 67%, Generative: 74% vs 84% (SayCan).

## Scaling & Models

- **PaLM > FLAN.** PaLM-SayCan achieves 84% plan / 74% execute.
- Stronger LMs improve robotics performance.

## Extensibility

- **Add new skills easily:** register skill, affordance, prompt example.
- **Chain-of-Thought:** Add "Explanation" → helps with negation and reasoning-heavy queries.  
- **Multilingual:** Almost no performance drop (English, Chinese, French, Spanish).  

## Open-Source Variant

- CLIPort for pick-and-place.
- Affordances approximated by ViLD open-vocabulary object detector.  
- GPT-3 as language model.

## Limitations & Future Work

- **Limits:** Inherits LLM biases; skill library is bottleneck; hard to react to skill failures.
- **Closed-loop extensions:** Huang et al. use environment feedback + inner monologue for replanning.
- **Future directions:** Expand/robustify skills, explore new grounding sources (non-robotic), test if natural language is the right ontology, combine planning + language, use LMs for policy pretraining.

## Ref

- ichter, b., Brohan, A., Chebotar, Y., Finn, C., Hausman, K., Herzog, A., Ho, D., Ibarz, J., Irpan, A., Jang, E., Julian, R., Kalashnikov, D., Levine, S., Lu, Y., Parada, C., Rao, K., Sermanet, P., Toshev, A. T., Vanhoucke, V., Xia, F., Xiao, T., Xu, P., Yan, M., Brown, N., Ahn, M., Cortes, O., Sievers, N., Tan, C., Xu, S., Reyes, D., Rettinghouse, J., Quiambao, J., Pastor, P., Luu, L., Lee, K.-H., Kuang, Y., Jesmonth, S., Joshi, N. J., Jeffrey, K., Ruano, R. J., Hsu, J., Gopalakrishnan, K., David, B., Zeng, A., & Fu, C. K. (2023). Do As I Can, Not As I Say: Grounding Language in Robotic Affordances Proceedings of The 6th Conference on Robot Learning, Proceedings of Machine Learning Research. `https://proceedings.mlr.press/v205/ichter23a.html`
