---
title: FDA +010
date: 2025-10-08T12:52:09.297+11:00
description: FDA +010
authors: me
tags:
  - fda
---

## SVM

### Convex Hull

![Convex Hull](./convex-hulls.png)

- the lines surrounding the outermost points of each class.
- since the classes are linearly separable, convex hulls do not intersect.

### Margins

- the distance between data points of different classes seprarated by a hyperplane.
- multiple possible hyperplanes can separate the classes, but the optimal hyperplane maximizes the margin.
- Maximum Margin Hyperplane
  - a separation line/plane orthogonal to the shortest line connecting the convex hull.
  - the line that is farthest apart from each convex hull.
  - it separates the data points with the widest margin.

### Kernels

- kernel is used to represent kernel functions
  - which are used to convert low-dimensional space to high-dimensional space
  - by applying a function on low-dimensional data points to come up with higher dimensions
    - which can be used to linearly separate the data points of classes using a hyperplane.
- the function of a kernel is to take data as input and transform it into the required form.
  - different algorithms use different types of kernel functions.
  - linear, non-linear, polynomial, radial basis function (RBF), and sigmoid.
