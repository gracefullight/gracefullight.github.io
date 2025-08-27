---
title: Octo Review
date: 2025-08-27T20:54:09.447+10:00
description: Octo review
authors: me
tags:
  - vlm
---

## Octo

## Motivation

- Traditional robot learning trains policies **from scratch** on robot/task-specific datasets → costly data collection, narrow generalization.
- **Generalist Robot Policies (GRPs)** pretrained on diverse robots/tasks can be **finetuned with little in-domain data** while generalizing broadly.
- Real-world deployments face challenges across **robot embodiments, sensor setups, action spaces, task specs, and environments**.

## Prior GRPs & Gaps

- GRPs aim for **low-level visuomotor control** across tasks, environments, and robotic systems.
- Existing models often have **restricted inputs (e.g., a single camera)**, **lack efficient finetuning to new domains**, and importantly, **largest models are not publicly available**.

## Contribution (What is Octo?)

- **Octo**: a large transformer-based policy trained on **800k trajectories** from the Open X-Embodiment dataset.
- Accepts **language instructions or goal images**, and can be **finetuned within hours on consumer GPUs** to new sensors and action spaces.
- **First GRP** to support **effective finetuning to new observations and actions** and to be **fully open-source** (training pipeline, checkpoints, data).
- Novelty lies in combining: **transformer backbone + language/goal image conditioning + diffusion head** for expressive action distributions.

## Architecture

- **Input tokenizers**:  
  - Language via pretrained **T5-base**  
  - Images via shallow CNN → patch tokens  
- **Transformer backbone**: processes unified token sequence.  
- **Blockwise masking + Readout tokens**:  
  - Nonexistent modalities are masked  
  - Readout tokens *only attend* to past observations/tasks, not vice versa  
- **Diffusion action head**: predicts **continuous, multimodal, chunked actions**.  
- **Modularity**: new sensors/outputs can be added by only training lightweight encoders or heads; pretrained backbone remains unchanged.

![Octo Architecture](./octo-architecture.png)

## Training Data & Objective

- Mixture of **25 heterogeneous robot datasets**: diverse robots, sensors (with/without wrist cams), labels (with/without language).
- **Conditional diffusion decoding** predicts continuous, multimodal action distributions.  
  - Transformer runs **one forward pass**; denoising steps are contained in the small diffusion head.

## Experiments

- Evaluated on **7 robotic platforms across 4 institutions**.  
- Key questions:  
  1) Zero-shot multi-robot control?  
  2) Do Octo weights improve finetuning vs. scratch or standard pretrained representations?  
  3) Which design choices matter for generalist robot policies?

## Results

- Achieves **state-of-the-art zero-shot multi-robot control**, competitive with RT-1-X and RT-2-X.  
- Provides a **versatile policy initialization**: significantly outperforms baselines for **data-efficient finetuning** to new obs/action spaces.

## Limitations / Future Work

- Needs **better language conditioning**, **improved wrist camera support**, and **data beyond optimal demonstrations**.

## One-line Takeaway

- **Octo = modular, efficient, open-source GRP**:  
  A transformer + diffusion policy trained on large-scale multi-robot data that **adapts quickly with little in-domain data** to new sensors and action spaces, enabling broad generalization.

## Ref

- Mees, O., Ghosh, D., Pertsch, K., Black, K., Walke, H. R., Dasari, S., Hejna, J., Kreiman, T., Xu, C., & Luo, J. (2024). Octo: An open-source generalist robot policy. First Workshop on Vision-Language Models for Navigation and Manipulation at ICRA 2024.

| 구분 | **단순 비유 버전** | **실제 토큰화 버전** |
| --- | --- | --- |
| **언어** | `[문장]` | `[l₁, l₂, l₃, …]` <br/>→ 문장을 토큰화한 여러 개 |
| **목표 이미지**   | `[목표]` | `[g₁, g₂, g₃, …]` <br/>→ 이미지를 패치 단위로 쪼갠 여러 개 |
| **관찰(시점 t)** | `[관찰]` | `[oₜ¹, oₜ², oₜ³, …]` <br/>→ 카메라 프레임/센서를 패치 단위로 토큰화 |
| **리드토큰**  | `[ ]` (빈 슬롯) | `[TR,t]` <br/>→ 시점 t마다 하나 추가, 행동을 뽑는 전용 토큰   |
