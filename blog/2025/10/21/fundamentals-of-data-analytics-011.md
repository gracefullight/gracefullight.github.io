---
title: FDA +011
date: 2025-10-21T22:11:19.042+11:00
description: fda +011
authors: me
tags:
  - fda
---

## Bias

- Bias quantifies how much on average the predicted values differ from the actual values.
- High bias implies the model is under-performing.

## Variance

- Variance quantifies how sensitive the model is to small changes in the training samples.

## Ensemble Methods

- The intuition behind ensemble methods is to decrease bias and variance by using multiple machine learning algorithms.
- Any machine learning algorithm can be used in ensemble methods.
  - decision trees, neural networks, logistic regressions, etc.
- Base models are as diverse as possible.
- Train each base model to predict as accurately as possible.

### Sequential ensemble methods

- Arrange weak learners in a sequence, such that weak learners learn from next learner in the sequence to create better predictive models.
- Each model fits the residual of its predecessor.

### Parallel ensemble methods

- to use different variations of the same dataset, of the smae classifier, and aggregate the results.

### Bootstraping

- Sampling technique that creates multiple subsets of datasets from the original dataset.
- when inferring results for a population from results found on a collection of smaller random samples of that population.

### Bagging

> **B**ootstrap **agg**regat**ing**

- Generates subsets (bags) of traning data by sampling from the original training dataset with replacement.
- To overcome the complexity of models that overfit the training data.

### Random Forest

- Shallow trees have lower variance and higher bias, whereas deep trees have low bias but high variance.
  - Shallow trees are chosen for sequential ensemble methods
  - Deep trees are chosen for bagging methods (or parallel ensemble methods).
