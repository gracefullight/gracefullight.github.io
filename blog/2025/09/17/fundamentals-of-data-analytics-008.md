---
title: FDA +008
date: 2025-09-17T12:02:35.760+10:00
description: FDA +008
authors: me
tags:
  - fda
---

## Mearues of performance

### Accuracy

$$ A = \frac{TP + TN}{TP + TN + FP + FN} $$

- the ratio of correct predictions to all predictions
- it is the number of true positives and true negatives (the correct predictions) divided by the total number of predictions.

### Error rate

$$ E = \frac{FP + FN}{TP + TN + FP + FN} $$

- the ratio of incorrect predictions to all predictions
- It is equivalent to $1 – Accuracy$.
- It is the number of false positives and false negatives divided by the total number of predictions.

### True positive rate, Recall, Sensitivity

$$ TPR = \frac{TP}{P} = \frac{TP}{TP + FN} $$

- the proportion of actual positives for which the test result is positive.
- it shows how sensitive the model is to detecting positive instances.
- the ratio of true positives to all positives
- the data points that were correctly predicted as positive divided by the number of true positives and false negatives.

### False positive rate, Fall Out, False Alarm

$$ FPR = \frac{FP}{N} = \frac{FP}{FP + TN} $$

- the proportion of actual negatives for which the test result is positive.
- It is equivalent to $1 – Specificity$.
  - large values of specificity indicate small false negative rates.

### The true negative rate, Specificity

$$ SPC = TNR = \frac{TN}{N} = \frac{TN}{FP + TN} $$

- the proportion of actual negatives for which the test result is negative
- It shows how well the model does at identifying actual negatives as negative.

### The false negative rate, Miss Rate

$$ FNR = \frac{FN}{TP+FN} $$

- the proportion of the actual positives for which the test result is negative.
- It is equivalent to $1 – Sensitivity$.
  - large values of sensitivity indicate small false positive rates.
- It is a common trick that often change classifiers to bias them towards making `type 1 FP` versus `type 2 FN` errors.
  - This can often change classifier to bias towards making FP errors rather than FN errors.
  - It depends on which are worse to make
  - They are biased if there are different numbers of items in each class

### Precision, Positive Predictive Value

- PPV, Positive Predictive Value
- a measure of how accurate and precise the positive predictions are
- It is the ratio of true positives to predicted positives.

### Accuracy and Error rate

- in practice, the previous measures don't always work well
  - they are biased, especially if there are different numbers of items in each class.
- if **the data is imbalanced**, it's much better to use **a true positive rate or true negative rate instead**.

### F1

$$ F = 2 * \frac{Precision * Recall}{Precision + Recall} $$

- known as F-score or F-measure
- a measure of the accuracy of the test
- It is the harmonic mean of the recall and precision, where an F1 score reaches its best value at 1 (perfect precision and recall).
- It allows the Recall and Precision to be assessed in the same calculation.
