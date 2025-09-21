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

| Predicted \ Actual | Positive | Negative | Total |
| ------------------- | -------- | -------- | ----- |
| **Positive**          | 110       | 5       | 115   |
| **Negative**          | 10      | 60       | 70    |
| **Total**              | 120      | 65       | 185   |

- $Accuracy = \frac{110 + 60}{185} = 0.91$
- $Error Rate = \frac{10 + 5}{185} = 0.08$
- $True Positive Rate (Sensitivity/Recall) = \frac{110}{115} = 0.95$
- $False Positive Rate = \frac{10}{70} = 0.14$
- $True Negative Rate (Specificty) = \frac{60}{70} = 0.85$
- $False Negative Rate = \frac{5}{115} = 0.04$
- $Precision = \frac{110}{120} = 0.91$
- $F1 = (2 * 0.91 * 0.95) / (0.91 + 0.95) = 0.92$

### ROC curve

> Receiver Operating Characteristic Curve

- a graphical plot that explains how well a binary classifier system performs as the threshold at which it calls a data point as positive is varied.
- ROC graphs were originally used in the communications area to look at false alarm rates.
- The x-axis is the false positive
- The y-axis is the true positive rate (sensitivity, recall)
- ROC graphs contain all the information in the confusion matrix.
  - TPR`(=TP/(TP+FN))`, FPR`(=FP/(FP+TN))`
- a visual tool to compare trade-offs between the ability of a classifier to correctly identify positive cases and the number of negative cases that are incorrectly identified.
- an essential evaluation metric for checking the performance of a classification model.

### AUC

> Area Under the ROC Curve

- AUC 0: the model predicts a negative class as a positive class and vice versa.
- AUC 0.5: the model has no discriminative capacity to differentiate between negative class and positive class
  - diagonal line from (0,0) to (1,1)
- AUC 0.7: 70% chance that the model will be able to differentiate between the positive and negative classes.
- AUC 1: the model predicts all positive class as positive class and all negative class as negative class.
- **ROC is a probability curve and AUC represents the degree of separability**
- It shows how capable the model is of differentiating between the classes.

## Training/testing split

- train-test split procedure is used to estimate the performance of machine learning algorithms
- should not be used
  - when the dataset is small
  - when the dataset is imbalanced
  - where additional configuration is required
  - `train_test_split(..., stratify=y)`
- most common approach to validate model performance
  - traning data is 80%
  - testing data is 20%

### k-fold cross-validation

- helps select the model which will perform best on unseen data
- overcoming the problem of overfitting and underfitting.
- a parameter called `k` defines the number of portions that a given data sample will be split into.
- k-fold cross-validation has less bias because it ensures that every single discovery from the main dataset has a chance to appear in both training and test sets.

```bash
Iteration of a 5-fold cross-validation

# X = Test set
# T = Train set
1st fold : XXXX TTTTTTTTTTTTT
2nd fold : TTTT XXXX TTTTTTTT
3rd fold : TTTTTT XXXX TTTTTT
4th fold : TTTTTTTT XXXX TTTT
5th fold : TTTTTTTTTTTTT XXXX
```

```py
k = 3
dataset = [1, 2, 3, 4, 5, 6]

fold1 = [5, 2]
fold2 = [1, 3]
fold3 = [4, 6]
```

- Model1 will be trained on fold1 and fold2, and tested on fold3
- Model2 will be trained on fold2 and fold3, and tested on fold1
- Model3 will be trained on fold1 and fold3, and tested on fold2
- we can take the accuracy as the average of all rounds to get the final accuracy.

## Bias-variance decomposition

> a formal method for understanding the prediction error of a model.

- the average of the distance between the target and model predictions.
- **simple model**: High bias, Low variance → Underfitting
  - not complex, high error component
- **complex model**: Low bias, High variance → Overfitting
  - quite sensitive to the specific training set

### Bias

> the average of the distance between the target and model predictions.

- how well the model can do for any training set.
- the difference between the expected value and the parameter that we want to estimate
- $\text{Bias} = E[\hat{\theta}] - \theta$
  - If the bias is exactly zero, the estimator is unbiased
  - If the bias is greater than zero, the estimator is positively biased
  - If the bias is less than zero, the estimator is negatively biased

### Variance

> the deviation between the average prediction value and the predicted value.

- Classifier error is also affected by variability in the training data because different training sets lead to different decision boundaries.
- High variance: it produces different results for different training sets.
  - sensitive to the particular training set.
  - models with less parameters tend to have lower variance.
- $Var(\hat{\theta}) = E[(\hat{\theta} - E[\hat{\theta}])^2]$

### Noise

> changes in the target value

- objects with the same attribute values leading to different class labels.
- these errors are unavoidable even when you know the correct decision boundary.

## Evaluating

### Underfitting

> the model did not capture enough patterns in the data

- The model provides poor performance on both the training and the test set.
- Reasons:
  - The training model is not trained as tightly as possible.
  - The model is not able to learn more.
    - model is not suitable for the task.
- Avoid underfitting by:
  - using more training data
  - choosing / training a more complex model
  - increase the number of parameters in the model, the type or complexity of the model, or the traninig time till a cost function is minimized.

### Overfitting

> the model captures noise and patterns which do not generalize well to new data.

- The model has extremely good performance on the training set, but poor performance on the test set.
- Reasons:
  - the training data is not a perfect standard
- Avoid overfitting by:
  - regularization
  - pruning (parameters, strucutres of classifiers)
  - reducing the descriptive length (minimize the sum of the model's complexity and the dscription of the traning data)
  - optimization (use a separate subset for validating the model)
  - expansion (use or generate more training data)
    - adding synthetic samples to the dataset.

## K-NN

> k-Nearest Neighbors

- a non-parametric technique
  - not involving any assumptions as to the form or parameters of a frequency distribution
- supervised learning classifier
  - uses proximity to make classifications or predictions about the grouping of an individual data point
  - defining new cases based on similarity measures (e.g., distance functions).
  - Euclidean: $d(x, y) = \sqrt{\sum_{} (x_i - y_i)^2}$
  - Minkowski: $d(x, y) = (\sum_{} |x_i - y_i|^p)^{1/p}$
  - Hamming: $d(x, y) = \sum_{} |x_i - y_i|$
- In weighted k-NN, weigh the votes according to distance
  - $w_i = \frac{1}{d^2}$
- If k is too small, it may be sensitive to noise points
- If k is too large, its neighbourhood may include points from other classes
- Choose an odd value for k, to eliminate ties

### Industrial Applications of KNN

- Retail business data analysis: Identify customer patterns and generate business value.
- Security and operational management: Simplify daily operations such as theft prevention.
- Credit card usage monitoring: Detect unusual patterns to identify fraudulent transactions.
- Transaction scrutiny software: Spot unfamiliar patterns and flag suspicious activity.
- Point-of-sale (POS) data analysis: Analyse register data for operational insights.
