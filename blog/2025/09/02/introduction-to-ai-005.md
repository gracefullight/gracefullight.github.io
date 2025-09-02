---
title: Introduction to AI @005
date: 2025-09-02T12:56:15.922+10:00
description: Introduction to AI @005
authors: me
tags:
  - iai
---

## Neural Network Development History

- 1950s-1960s: Early Foundations
  - McCulloch & Pitts (1943): mathematical neuron model
  - Rosenblatt’s Perceptron (1958): first trainable network
  - Minsky & Papert (1969): limitations (XOR problem) → AI Winter
- 1970s–1980s: First Revival
  - Werbos (1974); Rumelhart, Hinton, Williams (1986): Backpropagation
  - Hopfield Networks (1982): associative memory
  - Renewed optimism but limited by hardware
- 1990s: Consolidation
  - LeCun’s CNN (LeNet, 1989): digit recognition
  - Elman, Jordan: Recurrent Neural Networks
  - Symbolic AI still dominated mainstream
- 2000s: Deep Learning Foundations
  - Better hardware (GPUs) + large datasets
  - Hinton (2006): Deep Belief Networks (unsupervised pretraining)
  - Connectionism regains attention
- 2010s: Deep Learning Boom
  - ImageNet (2012): AlexNet breakthrough
  - RNNs, LSTMs, GRUs → speech & translation
  - Transformers (2017): revolutionized NLP
- 2020s: Scaling & Foundation Models
  - Large Language Models (GPT, BERT, etc.)  
  - Multimodal AI: vision, text, speech integration
  - Connectionism dominates AI research & industry

## Neural Network Models

- a collection of units (neurons) connected together
- The properties of the network are determined by its topology and the properties of the neurons.
- Roughly speaking, the neuron fires when a linear combination of its inputs exceeds some (hard or soft) threshold.

![Simple Neuron](./simple-neuron.png)

- $in_j = \sum_{i=0}^{n} w_{ij}a_i$
- $out_j = g(in_j)$
- $a_j = g(\sum_{i=0}^{n} w_{ij} a_i)$

## Activation function

### ReLU function

$$ReLU(x) = max(0, x)$$

- an abbreviation for rectified linear unit
- Commonly used

### Softplus function

$$Softplus(x) = \log(1 + e^x)$$

- A smooth version of the ReLU function

### Logistic or Sigmoid function

$$Logistic(x) = \frac{1}{1 + e^{-x}}$$

- Non-linear, can represent a nonlinear function

### Tanh function

$$ tanh(x) = \frac{e^{2x} -1}{e^{2x} + 1} $$

## Topology of a neural network

- Feed-forward network (FFN):
  - Every node receives inputs from "upstream" nodes and delivers output to "downstream" nodes.
  - There are no loops.
  - FFN represents a function of its current inputs, thus it has no internal state other than the weights themselves.
- Recurrent Network (RNN):
  - A recurrent network feeds its outputs back into its own inputs.
  - In a recurrent network, the neuron values can eventually settle down, keep cycling, or behave unpredictably.
  - can support short-term memory

| FFN | RNN |
| --- | --- |
| ![FFN](./ffn.png)| ![RNN](./rnn.png) |

## Training Process

- Go through each training sample.
- If correctly classified → do nothing.
- If misclassified → update the weights:
- $w_i \leftarrow w_i + \alpha(y - \hat{y})x_i$

### Perceptron for Binary Classification

- A perceptron separates data into two classes with a hyperplane.
- if $w \cdot x \geq 0 \rightarrow 1$
- if $w \cdot x \le 0 \rightarrow 0$
