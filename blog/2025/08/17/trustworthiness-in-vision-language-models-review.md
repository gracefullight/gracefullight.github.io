---
title: Trustworthiness in Vision-Language Models Review
date: 2025-08-17T10:02:41.350+10:00
description: Trustworthiness in Vision-Language Models Review
authors: me
tags:
  - vlm
---

## Overview

- Mitigates exposure of private data, produces harmful outputs, or is vulnerable to attacks.
- SOTA models: LLaVA, Flamingo, GPT-4

## Privacy

### Privacy Issues

- risk escalates significantly with relevant images as optimizing in the pixel domain is easier than in text
- can unintentionally memorize sensitive data, leading to leaks without knowledge of the model’s specifics
- Overfitting may also cause retention of sensitive attributes during inference
- gradient-based and backdoor attacks further jeopardize VLM privacy with open-source data

### Privacy Mitigation Methods

- New metrics have been created to assess a model’s ability to reproduce training instances and facilitate cross-model comparisons
- models utilizing multiple modalities provide better privacy
- safety modules can be integrated to boost resilience against violations
- adversarial training can enhance privacy but risks reducing accuracy
- New architecture: differentially private CLIP model

### Privacy Future Research Directions

- Cryptography-based Privacy Preservation
  - Secure multi-party computation (SMPC): divides secret information into shares among multiple parties, ensuring that individual shares reveal nothing unless combined
  - Homomorphic encryption (HE): allows computations on encrypted data without decryption, and has also been utilized for privacy preservation in transformers
- Federated Learning
  - enhances privacy in vision-language models (VLMs) by localizing model training, which protects training data from leakage.
  - challenges such as communication overhead among devices and statistical heterogeneity from diverse data distributions
- Data Manipulation and Finetunning
  - Data pseudonymization: substitutes sensitive information with synthetic alternatives.
  - Data Sanitization: removes duplicates to reduce memorization and privacy risks.
  - knowledge sanitization-fine-tuning: provide safe responses when leakage risks arise.

## Fairness and Bias

### Fairness and Bias Issues

- Bias from training data
  - disproportionately features men and lighter-skinned individuals
  - outdated vocabulary and imbalanced representation
  - clinical models may favor certain patient groups based on gender, language, etc.
- Bias from Model
  - Gender biases
  - misclassification of race-related elements and biased outputs

### Fairness and Bias Mitigation Methods

- New Datasets and Benchmarks
  - Harvard-FairVLMed, PATA, and BOLD enhance evaluations but often lack the scale of established benchmarks.
  - create synthetic datasets to improve fairness assessments
    - gender-balanced dataset generated with DALL-E-3 and another consisting of gender-swapped images
    - counterfactual image-text pairs that highlight biases in datasets like COCO Captions
  - new metrics
    - gender polarity
    - bias distance in embeddings
  - human evaluation
- De-biasing
  - adjust model instructions and architectures for improved fairness
  - detecting biased prompts in pre-trained models
  - Post-hoc Bias Mitigation (PBM) effectively reduce bias in image retrieval
  - Re-sampling underperforming clusters can enhance fairness
  - modification of facial features also mitigate biases
  - self-debiasing reduces biased text generation, especially when paired with other methods

### Fairness Future Research Directions

- Optimized De-biasing
  - Additive residual learning: for fairer image representations.
  - Calibration loss: retain semantically similar embeddings.
  - Counterfactual inference framework: help models learn correct responses through cause and effect.
  - Adversarial classifiers: predict image attributes from visual-textual similarities can be combined with instruction tuning to reduce bias.
- Disentangled Representation Learning (DRL): simplifies complex data by breaking it in to independent feature groups, improving model predictions.
  - Traditional DRL
    - Variational autoencoders (VAEs) for feature encoding based on impact
    - Generative adversarial networks (GANs) for separation.
  - Attention in text encoders can be adjusted for fairer outputs.
  - challenges: varying definitions of "disentanglement", ensuring fairness.
- Human-in-the-Loop (HITL): integrating human intervention into their training to improve precision and fairness
  - active learning
  - reinforcement learning with human feedback
  - explainable AI
  - challenges: human bias, finance, and ethical and legal issues persist

## Robustness

### Robustness Issues

- Out-of-Distribution (OOD) Robustness
  - ChatGPT excels in adversarial tasks but struggles with OOD robustness and informal medical responses
  - MLLMs often fail to generalize beyond training domains due to mapping issues
  - vision-language models face difficulties with open-domain concepts, especially when overfitting during fine-tuning
  - Large pre-trained image classifiers show initial robustness, which diminishes over time
  - Current visual question answering (VQA) models are limited to specific benchmarks, hindering generalization to OOD datasets
  - fine-tuning may impair model calibration in OOD contexts.
- Adversarial Attack Robustness
  - Studies indicate that open-sourced VLMs show performance gaps in red teaming tasks, highlighting the need for improved safety and security.
  - misalignment between language and vision modalities creates a "modality gap", complicating adversarial vulnerability.

### Robustness Mitigation Methods

- Improving Out-of-Distribution Robustness
  - enhance OOD detection and generalization. A simple maximum logit detector has been shown to outperform complex methods for anomaly segmentation
  - In-context learning (ICL) can also improve multimodal generalization
  - A fine-tuned CLIP excels in unsupervised OOD detection
  - The OGEN method synthesizes OOD features
  - Maximum Concept Matching aligns visual and textual features, and anchor-based finetuning leads to better domain shifts
- Defense Against Adversarial Attacks
  - VILLA is a two-stage framework for adversarial training of VLMs, featuring task-agnostic **adversarial pre-training** and **task-specific finetuning**
    - conducts adversarial training in the embedding space rather than on raw image pixels and text tokens, improving the model’s resilience against adversarial examples
    - SOTA performance across various tasks

### Robustness Future Research Directions

- Data Augmentation
  - MixGen: a data augmentation method that generates new image-text pairs by interpolating images and concatenating text to preserve semantics.
  - creating synthetic images involves extracting text prompts via an image captioning model for use in text-to-image diffusion, then mixing these with real datasets.
  - bimodal augmentation (BiAug): decouples objects and attributes to synthesize vision-language examples and hard negatives, using LLMs and an object detector to generate detailed descriptions and inpaint corresponding images.
- Improved Cross-Modal Alignment
  - Sharing learnable parameters
  - Applying bidirectional constraints
  - Adjusting cross-modal projections
- challenges: addressing the modality gap, which impacts robustness to OOD data and adversarial examples
  
## Safety

### Safety Issues

- Toxicity
  - LAION-400M: contains problematic content, including explicit materials and harmful stereotypes
  - Advanced models like GeminiProVision and GPT-4V show inherent biases
  - Assigning personas to ChatGPT can increase toxicity and reinforce harmful stereotypes
- Jailbreaking Risk
  - Perturbation can be performed effectively, while FigStep converts harmful content into images with an 82.5% attack rate across multiple VLMs
  - replaces captions with malicious prompts, enabling jailbreaks.

### Safety Mitigation Methods

- **Safety Fine-Tuning**
  - VLGuard
  - fine-tuned on synthetic data, reducing sensitivity to NSFW inputs and enhancing performance in cross-modal tasks
- Other approach
  - Reinforce-Detoxify: uses reinforcement learning to mitigate toxicity and bias in transformer models
  - simple mitigations improve automatic scores, these methods risk over-filtering marginalized texts and create discrepancies between automatic and human judgments

### Safety Future Research Directions

- Context Awareness
  - integrating Chain-of-Thought for improved reasoning can enhance CAER tasks with Large VLMs.
  - Dual-Aligned Prompt Tuning: combines explicit context from pre-trained LLMs with implicit modeling to create more context-aware prompts
  - Visual In-Context Learning: optimizes image retrieval and summarization to enhance task-specific interactions.
- Automated Red Teaming (ART)
  - RTVLM: a dataset that benchmarks VLMs across faithfulness, privacy, safety, and fairness
  - Arondight: automates multi-modal jailbreak attacks using reinforcement learning and uncovers significant security vulnerabilities
  - GPT-4 and GPT-4V are more robust against jailbreaks than open-source models
  - limited transferability of visual jailbreak methods compared to textual ones
  - connects unsafe outputs to prompts, improving the detection of vulnerabilities in text-to-image models

## Ref

- Kertesz, J., Li, B., Supnithi, T., & Takhom, A. (Eds.). (2025). Computational Data and Social Networks: 13th International Conference, CSoNet 2024, Bangkok, Thailand, December 16–18, 2024, Proceedings (Vol. 15417). Springer Nature Singapore. `https://doi.org/10.1007/978-981-96-6389-7`
