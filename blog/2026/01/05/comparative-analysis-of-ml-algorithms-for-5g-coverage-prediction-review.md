---
title: Comparative analysis of ML algorithms for 5G coverage prediction review
date: 2026-01-05T19:24:21.458+11:00
description: Comparative analysis of ML algorithms for 5G coverage prediction review
authors: me
tags:
  - drone
---

## Summary

- Model performance in 5G coverage prediction is primarily determined by the alignment between data characteristics, feature design, and model inductive bias, rather than by model complexity alone.
- Using real-world 5G NR drive-test data with physics-informed numerical features, this study demonstrates that Random Forest can achieve SOTA performance, outperforming more complex models such as XGBoost and deep neural networks.
- The results highlight the continued importance of domain-informed feature engineering and show that deep learning becomes advantageous only when the data representation and scale justify its use.

## Introduction

- Coverage prediction in 5G networks is a core component of network planning, optimization, and resource allocation.
- Conventional propagation and path loss models are limited in their ability to accurately capture the complexity of dense urban environments and the unique characteristics of 5G systems.
- Machine Learning and Deep Learning have emerged as promising alternatives, as they can model complex non-linear relationships across multiple parameters.
- However, prior studies typically suffer from several limitations:
  - Most focus on 4G networks or rely on a limited set of input features.
  - Comparisons across a wide range of algorithms are often insufficient.
  - Systematic analyses of feature importance are largely lacking.

**The objectives of this study are to:**

- Conduct a comprehensive comparison of multiple ML and DL algorithms using a unified dataset.
- Identify dominant feature parameters that significantly influence 5G coverage prediction.
- Demonstrate performance improvements over previously reported methods.

## Methods

### Data Collection

- Real-world 5G NR drive test measurements conducted in Bandung, Indonesia (Batununggal area).
- Approximately 1,500 SS-RSRP samples collected.
- Deployment includes 10 gNodeBs, each configured with three sectors.
- Measurement vehicle speed maintained below 30 km/h to minimize fast fading effects.

### Input Features (10 Total)

- 2D Distance between Transmitter and Receiver
- Frequency
- Transmitter Tilt Angle
- Transmitter Azimuth Angle
- Altitude
- Elevation Angle
- Azimuth Offset Angle
- Tilting Offset Angle
- Horizontal Distance of Receiver from Transmitter Antenna Boresight
- Vertical Distance of Receiver from Transmitter Antenna Boresight

### Algorithms

**Machine Learning (Classification-based):**

- Logistic Regression
- K-Nearest Neighbors (KNN)
- Naive Bayes
- Random Forest
- Support Vector Machine (SVM)
- XGBoost
- LightGBM
- AdaBoost
- Bayesian Network Classifier

**Deep Learning:**

- Multi-Layer Perceptron (MLP)
- Long Short-Term Memory (LSTM)
- Convolutional Neural Network (CNN)

### Training and Validation

- Experiments conducted using Google Colab.
- 10-fold cross-validation applied for all models.
- Hyperparameter optimization performed only on the best-performing models.

### Evaluation Metrics

- **Regression Metrics:** RMSE, MAE, R²
- **Classification Metrics:** Accuracy, Precision, Recall, F1-score

## Results

### Machine Learning

**Random Forest:**

- RMSE = 1.14 dB
- MAE = 0.12
- R² = 0.97
- Accuracy / Precision / Recall / F1-score ≈ 98.4%

### Deep Learning

**Convolutional Neural Network (CNN):**

- RMSE = 0.289
- MAE = 0.289
- R² = 0.78
- Accuracy = 75%
- Precision = 85.6%
- Recall = 87.8%
- F1-score = 89.9%

- MLP and LSTM exhibit inferior performance compared to CNN.

### Feature Importance

- The 2D Transmitter–Receiver Distance is identified as the most dominant feature across all algorithms.
- Incorporating horizontal and vertical distances from the antenna boresight significantly improves prediction accuracy.

### Comparison with Previous Studies

- Both Random Forest and CNN achieve lower RMSE values compared to prior studies.
- Random Forest, in particular, demonstrates state-of-the-art performance relative to existing 4G and 5G coverage prediction research.

## Discussion

- **Random Forest**
  - Highly effective for small-to-medium-sized datasets with numerical features.
  - Offers strong interpretability and robust performance stability.
- **Convolutional Neural Network**
  - Well-suited for grid-based or spatial data representations.
  - Shows greater potential when image-based or satellite-derived features are incorporated.
  - In this study, CNN was applied by transforming numerical features into a matrix-like structure.
- The results empirically demonstrate that feature design and selection can be more critical than the choice of learning algorithm itself.
