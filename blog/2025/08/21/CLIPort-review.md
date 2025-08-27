---
title: CLIPort Review
date: 2025-08-21T23:02:02.850+10:00
description: CLIPort Review
authors: me
tags:
  - vlm
---

## Key Idea

- CLIPort proposes a **two-stream architecture** for vision-based manipulation:
  - **Semantic pathway (what):** leverages CLIP for broad semantic understanding.
  - **Spatial pathway (where):** leverages Transporter for fine-grained spatial reasoning.
- This design is **inspired by the two-stream hypothesis in cognitive psychology** (ventral/dorsal pathways).  

## Framework Contributions

- **Benchmark Extension:** Expanded the Ravens benchmark with language-grounding tasks for manipulation.  
- **Two-Stream Architecture:** Uses pre-trained vision-language models (CLIP) to condition precise manipulation policies with language goals.
- **Empirical Results:** Demonstrates robustness on diverse manipulation tasks, including multi-task settings and real-robot experiments.

## Architectural Design

- CLIPort integrates **semantic (CLIP)** with **spatial (Transporter)** features by lateral fusion.
- The semantic stream is conditioned with **language features from CLIP’s text encoder** and fused with intermediate spatial features.  
- Enables **end-to-end learning of affordance predictions** (pick-and-place) without explicit object models, segmentations, or symbolic states.  

## Key Insights

- Formulates manipulation as **action detection** (where to act), instead of object detection.
- **Tabula rasa systems** (like plain Transporter) require new demonstrations for every goal/task. CLIPort addresses this with a **strong semantic prior** (from CLIP) to generalize across tasks and concepts.
- **Language-conditioned policies** provide an intuitive interface for specifying goals and transferring concepts.  

## Experimental Results

- **Simulation (PyBullet, UR5 robot with suction gripper):**
  - 10 language-conditioned tasks with thousands of unique instances.
  - Multi-task CLIPort outperformed or matched single-task models, even with fewer demonstrations.
  - CLIP-only or Transporter-only baselines saturate, while CLIPort exceeds 90% success with just 100 demos.
- **Generalization:**
  - CLIPort generalizes to **unseen attributes** (e.g., new colors, shapes, object categories).
  - Struggles with **completely novel attributes** (e.g., “pink” or “orange” never seen in training).
- **Real-World Robot Experiments (Franka Panda):**  
  - Achieved ~70% success on real tasks with just 179 demonstrations.
  - Performance trends were consistent with simulation, validating sim-to-real transfer.

## Conclusion

- CLIPort shows that **multi-task, language-conditioned policies** generalize across tasks better than object-centric or tabula rasa methods.
- With **action abstraction** and **spatio-semantic priors**, end-to-end models can learn new skills **without requiring hand-engineered pipelines**.
- Limitations remain for **dexterous 6-DoF manipulation** and complex continuous control.

## Ref

- Shridhar, M., Manuelli, L., & Fox, D. (2022). Cliport: What and where pathways for robotic manipulation. Conference on robot learning.
