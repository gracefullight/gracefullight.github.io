---
title: Do As I Can, Not As I Say Review
date: 2025-08-24T12:04:59.631+10:00
description: Do As I Can, Not As I Say Review
authors: me
tags:
  - vlm
---

# SayCan

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

- Ahn, M., Brohan, A., Brown, N., Chebotar, Y., Cortes, O., David, B., Finn, C., Fu, C., Gopalakrishnan, K., Hausman, K., Herzog, A., Ho, D., Hsu, J., Ibarz, J., Ichter, B., Irpan, A., Jang, E., Ruano, R. J., Jeffrey, K., Jesmonth, S., Joshi, N. J., Julian, R., Kalashnikov, D., Kuang, Y., Lee, K.-H., Levine, S., Lu, Y., Luu, L., Parada, C., Pastor, P., Quiambao, J., Rao, K., Rettinghouse, J., Reyes, D., Sermanet, P., Sievers, N., Tan, C., Toshev, A., Vanhoucke, V., Xia, F., Xiao, T., Xu, P., Xu, S., Yan, M., & Zeng, A. (2022). Do As I Can, Not As I Say: Grounding Language in Robotic Affordances. arXiv. `http://arxiv.org/abs/2204.01691`
