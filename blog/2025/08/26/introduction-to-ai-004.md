---
title: Introduction to AI @004
date: 2025-08-26T15:29:06.764+10:00
description: Introduction to AI @004
authors: me
tags:
  - iai
---

## Influencing improvement

- Agent's component
- Agent's prior knowledge, which influence that mode lit builds
- the feedback available to learn from.

### Components

- Given an intelligent agent that performs some intelligent tasks, any components of agent program can be improved by learning.

### Prior knowledge

- Inductive learning (귀납적 학습): learning a general function or rule (possibly incorrect) from specific input-output pairs
  - Bottom to top
  - Specific to general
- Deductive learning (연역적 학습): going from a general rule to a new specific rule that is logically entailed, but is useful because it allows more efficient processing
  - Top to bottom
  - general to specific

### Feedback

- **feedback** on its percept sequence
- **no feedback** on its percept sequence
- **rewards** for taking a sequence of actions based on its percept sequence

| - | Supervised Learning | Unsupervised Learning |
| --- | --- | --- |
| Training Data | labeled | unlabeled |
| Computational complexity | simpler | Computationally complex |
| Accuracy | high | less accurate |

#### Supervised learning

- the agent observes some examples of input-output pairs first and then learns a function or a relationship that maps from inputs to output.
- Attributes/Features: the inputs are independent variables in the problem domain
- Target attribute: the output is the dependent variable which is dependent on the inputs.
- Model: the learned function or relationship
- The agent learns a model using examples and uses this model to predict the outcomes for new inputs.

#### Unsupervised learning

- The agent collects adequate examples in the problem domain but it does not get any explicit feedback to the examples.
- The agent can make sense of the examples through identifying clusters or frequent patterns in the data.
- When shown a large number of examples, the agent can learn to identify clusters of similar examples.

#### Reinforcement learning

- the agent learns from a series of actions which can be rewards or punishments to improve its performance in completing the task under consideration.
- the feedback helps the agent to enforce positive actions and reduce the negative actions through adjusting the policy.

## Supervised Learning Technique

- Decisinon tree
- Random forests
- Linear regrasssion
- Logistic regression
- K nearest neighbours
- Support vector machines
- Neural networks

### Regression problem

- to predict a continuous value as the output for a given input
- weather temperature: solar radiation, wind direction and speed, geographic location..
- how to predict the output value of a new data instance on the basis of observed features from the existing data (historical examples) in the problem domain.
- **Elements**
  - Collection of existing or historical data samples which are represented by a set of attributes or independent variables
  - The output values of the existing data samples
    - the output variable or attribute must be continuous
- **Regressor**: a function describes the relationship between the attributes of a data sample and the output.
  - takes the values of attributes of a data sample and predicts the output value of this given data sample.

#### Evaluate a regressor

- R Square/Adjust R Square
- MSE Mean Square Error/RMSE Root Mean Square Error
- MAD Mean Absolute Error

#### Examples of regression problems

- Predict the fuel price using the Brent crude oil price, financial performance of the oil related companies (cash flow, projects lined up, etc.) and/or  geopolitical risks (OPEC announcements, government sanctions, etc.)
- Predict the house price of a suburb from the suburb's profile
- Predict the blood pressure of a patient based on the patient's health profile
- Predict the electricity price using temperature, demand and time.

### Classification problem

- to predict discrete or categorical value as the output for a given input
- Pass or Failed given learning outcomes, student ID, prior learning, attitude, commitment and attendance.
- how to put a new data instance into one of predefined categories or classes on the basis of observed features from the existing data in the problem domain.
- **Elements**
  - Collection of existing or historical data samples with class labels
  - Predefined categories or classes
  - Adequate samples in each category or class in the existing or historical data.
- **Logic-based techniques**
  - Decision tree
  - Learning set of rules
- **Perceptron-based techniques**
  - Single-layer perceptron
  - Multi-layer perceptron
  - RBF network
- **SVM**
- **Statistical learning techniques**
  - Naive Bayes classifier
  - Bayesian networks
- **Instance-based learning**
  - K-nearest neighbor (KNN)

#### Evaluate a classifier

- Confusion matrix
- Precision
- Recall/Sensitivity
- Specificity
- F1-Score
- Area Under Curve & Receiver Operating Characteristics Curve (AUC-ROC)

#### Examples of classification problems

- banking, healthcare, medical diagnosis, marketing (sentiment aalysis), telecommunication, agriculture, security (fraud detection).
- e-mails into spam or non-spam class
- loan applications into an approved or a rejected class.
- patients into having a certain disease or not having that disease groups.
- text into positive or negative sentiment.
- customers into churn or non-churn classes.

### Overfitting

- general phenomenon with all types of learning models.
- a modeling error that occurs when a function is too closely or exactly fit to a limited set of data points.
- more likely as the complexity of models and the number of input attributes increase
- less likely as the number of training examples is large.

## Decision Tree

- if-then statements to define patterns in data
- A if-then statement splits the training data into two or more branches based on some values
- **Best Split**: The results of each branch should be as homogeneous as possible, or has the lowest *impurity* possible.
  - Information gain
  - Gini index

### Implement Decision Tree

- the split (a feature and a condition) that leads to the lowest *impurity* in the resulting child nodes, in a greedy manner
- For categorical features: each unique value can be a split condition.
- For continuous features: midpoints between consecutive sorted unique values are used as split conditions.
- For each potential split condition, the algorithm calculates the impurity of the resulting child nodes.
- The lowest impurity node becomes the split point for that branch.
- The process is then repeated recursively for each child node until all leaf nodes are pure, or the stopping criteria are met.

### The selectino of best split attributes

- **ID3**: employs a top-down, greedy search through the space of possible branches with no backtracking *using information gain*
- C4.5: *using information gain ratio*
- CART: *using Gini Index*
- Gini Index
- Chi-Square
- Reduction in Variance

### Entropy

> the fundamental quantity in information theory. It is a measure of the uncertainty of a random variable.

- the fundamental quantity in information theory. It is a measure of the uncertainty of a random variable
- A more homogeneous node with a clear majority class has low impurity and low entropy, while a more mixed distribution of classes has high impurity and high entropy.

### Information gain

> the decrease in entropy.

- The information gain from the attribute test on (split on A) is the expected reduction in entropy.
- Information gain computes the difference between entropy before the split and average entropy after the split of the dataset based on given attribute values
- $Entropy(S) = - \sum_{} p_i \log_2 p_i$
- $Gain(S,A)=Entropy(S) − Entropy_{remain}(S,A)$

### Gini index

- **For classification**, another impurity measure commonly used for classification tasks in decision trees.
- a lower Gini index indicates lower impurity, meaning that the samples in the node predominantly belong to a single class
- a bit more computational efficient than entropy as it does not involve logarithm calculations. but results are quite similar.
- $Gini(S) = 1 - \sum_{i=1}^{K} p_i^2$

### Variance

- **For regression tree**, the target variable is continuous rather than categorical.
- use variance as a measure of impurity in regression trees.
- lower variance indicates that the data points are closely clustered around the mean
- $Var(S) = \frac{1}{N} \sum_{} (y_i - \mu)^2$

### Prediction

- For classification tasks: the predicted class label is **the majority class** among the training samples in the leaf node.
- For regression tasks: the predicted value is **the mean of the target values** of the training samples in the leaf node.

### Dealing with Overfitting

- **Overfitting**: a common issue in decision trees, where the model captures noise or outliers in the training data rather than the underlying pattern.
- the model performs poorly when applied to new, unseen data.

#### Setting Stopping Criteria

- prevent the tree from becoming overly complex, which may lead to overfitting
- applied during the tree construction process
- limiting the maximum depth of the tree
- setting a minimum number of samples per leaf node
- requiring a minimum impurity decrease for a split

#### Pruning Strategies

- applied after the tree has been fully grown
- removing branches from the fully grown tree to simplify its structure
- ensure that it captures the underlying patterns in the data rather than noise or outliers
- Pruned trees perform significantly better than unpruned trees when the data contain a large amount of noise.

#### Ensemble Methods

- combine multiple decision trees to form a more robust and accurate model.
- address overfitting by averaging the predictions of the individual trees, reducing variance and improving generalization.
- Random Forests
- Gradient Boosted Trees
