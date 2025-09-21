---
title: FDA +009
date: 2025-09-21T17:18:52.228+10:00
description: FDA +009
authors: me
tags:
  - fda
---

## Linear Separability

- the data is linearly separable if
  - it can be separated by a point on a single dimension line of data points
  - by a line on a two-dimensional representation of data points
  - by a plane (a two-dimensional surface) in a three-dimensional representation of the data points
- If it is non-linearly separable, look at other options for classification.

### Hyperplane

- the conceptual divide between data
- **Weight vector**: represented and generated in weight space.
- Choosing the hyperplane
  - Minimum distance between samples
  - Least-squares method
  - Gradient Descent

## Artificial Neural Networks, ANN

- Strength: for high dimensionality problems, the complex relations between variables
- Weaknesses: theoretically complex, computationally intensive, needs large data sets, complicated to implement
- Kinds of ANN
  - Perceptrons, Multilayer Perceptrons
  - Deep learning neural networks
  - Kohonen networks
  - Convolutional neural networks
  - Radial Basis Functions
  - Recurrent neural networks
  - Support Vector Machines
  - Competitive learning
  - Boltzmann machines

## Multilayer Perceptrons, MLP

- Challenges
  - Decide on the network topology.
    - how many hidden layers are needed
    - how many neurons in each of the hidden layers
  - Find values for the weights which make the network produce the correct output values for the given input values.
- Neural networks only accept numeric data.
  - need to convert the categorical into numeric.
  - One-Hot encoding, Thermometer encoding.
- high values may need to be scaled into a similar range as neural networks
  - need to do a log transform to pull the values into a target range.
  - `[-1, +1]` or `[0, 1]`
- input neurons should be as small as possible.
  - adding neurons `->` more parameters and weights `->` amplify any bias. (overtrain the network)
- one categorical attribute may have many attribute values
  - each adding a parameter `->` adding risk of overtraining

## Resilient Propagation, RProp

- directly adjust the weight step based on the local gradient information
- introduces a weight update value $u_{ij}$ for each weight $w_{ij}$
- updates it based on the sign of the partial derivative of the error with respect to the weight
- update value $u_{ij}$
  - if sign changes (i.e. jumped over local minima) `->` $u_{ij}$ slightly decreased.
  - if sign remains the same `->` $u_{ij}$ slightly increased.
- weight $w_{ij}$
  - if derivative is $+ve$ (i.e. error increasing) `->` $w_{ij}$ decreased by $u_{ij}$
  - if the derivative is negative (i.e. error decreasing) `->` $w_{ij}$ increased by $u_{ij}$
  - if the derivative changes sign, the last weight update is reverted. (backtracks the last weight update)
