---
title: Fundamentals of data analytics @006
date: 2025-09-09T21:02:16.207+10:00
description: Fundamentals of data analytics @006
authors: me
tags:
  - fda
---

## Unsupervised machine learning

| Item | Supervised machine learning | Unsupervised machine learning |
| --- | --- | --- |
| **Data availability** | Input and output variables will be given. | Only the input data will be given. |
| **Labeling** | Algorithms are trained using labelled data. | Algorithms are used against data which is not labelled. |
| **Algorithms** | Support Vector Machine, Linear and Logistic Regression and Classification Trees. | Cluster algorithms, K-means, Hierarchical clustering, etc. |
| **Complexity** | simpler method. | computationally complex. |
| **Learning mode** | The learning method takes place offline. | The learning method takes place in real-time. |
| **Reliability** | highly accurate and trustworthy method. | less accurate and less trustworthy method. |

![Processing data](./processing-data.png)

- most common tasks are **clustering**, **anomaly detection**, and **neural networks**.
- infer underlying patterns without human supervision or intervention and enable us to discover both the differences and similarities in a dataset.
- can be considered ideal solutions for exploratory data mining.

## Clustering

> objects (unlabelled data) are organised into groups, where the members of each group are similar in some way to each other and less similar to those in other groups.

- **Classification** assigns objects/data to the predefined (labelled) classes
- **Clustering** groups the objects/data based on the similarities between them
- used in pattern recognition, image analysis and bioinformatics.
- different clustering algorithms can produce different results based on their own definition of a cluster
- the parameters (such as the distance function, density threshold and the number of expected clusters) of the clustering algorithm should be set based on the particular characteristics of the dataset and the user’s intention

| Domain | Use cases |
| --- | --- |
| Biology and bioinformatics | Cluster algorithms have been used in biological systematics for comparing the genus differences in organisms. |
| Medicine | Cluster analysis can be used to detect underlying factors of particular diseases, such as coronary artery disease. It is also used to describe patterns of antibiotic resistance. |
| Market basket | Cluster analysis has gained increasing popularity in market research. It can be used to classify different groups of consumers by behaviour analysis. It helps to build a better understanding of market segmentation, pricing and new product testing. |
| Computer science | Clustering is a powerful tool for various tasks in the area of computer science, such as reforming functionality in software evolution, object recognition in computer vision and lexical ambiguity in natural language process. |
| Car insurance | Identify customer groups with high average claim costs. |

- **Similarity Measure**: Numerical measure of how alike two data objects often fall between 0 (no similarity) and 1 (complete similarity)
- **Dissimilarity, or Distance Measure**: Numerical measure of how different two data objects are range from 0 (objects are alike) to $\infty$ (objects are different)
- **Proximity**: Refers to a similarity or dissimilarity

### Distance measures

> Distance metrics or dissimilarity measures

- basically deal with finding the proximity or distance between data points and determining if they can be clustered together.
- **Manhattan distance**: distance between two vectors if they could only move right angles.
  - $Dist(A, B) = \sum_{} |a_{i} - b_{i}|$
  - no diagonal movement involved in calculating the distance.
- **Euclidean distance**: can best be explained as the length of a segment connecting two points.
  - $ Dist(A, B) = \sqrt{\sum_{} (a_{i} - b_{i})^{2}} $
  - calculated from the cartesian coordinates of the points using the Pythagorean theorem.
  - Typically, one needs to **normalize the data before using this distance measure**.
  - the dimensionality increases of your data, the less useful Euclidean distance becomes
- **Cosine similarity**: the cosine of the angle between two vectors.
  - $ Dist(A, B) = \frac{\sum_{} (x_i \cdot y_i)}{\sqrt{\sum_{} x_i^2 \cdot \sum_{} y_i^2}} $
  - a way to counteract Euclidean distance’s problem with high dimensionality.
  - has the same inner product of the vectors if they were normalized to both have length one
  - The magnitude of vectors is not taken into account, merely their direction.
    - In practice, this means that the differences in values are not fully taken into account.
- **Single link**: the shortest distance between points
- **Complete link**: the largest distance between points.
- **Average link**: average distance between points.
- **Centroid**: the distance between centroids.

#### Weighted distance measures

$$ Dist(A, B) = \sqrt{\sum_{} w_i (a_{i} - b_{i})^{2}} $$

- a weight to the attributes as some attributes are more important than others.
- force clustering to pay more attention to higher weight attributes and form clusters that depend more on those heavily weighted attributes.

#### Dissimilarity

- **Simple matching coefficient, SMC**: invariant, if the binary variable is symmetric.
  - $ d(i,j) = \frac{b+c}{a+b+c+d} $
    - the proportion of mismatches (b+c) out of all attributes (a+b+c+d).
  - The simple matching coefficient is used when 0 and 1 are equally important, treating matches of both 1s and 0s the same way.
- **Jaccard coefficient**: non-invariant, if the binary variable is asymmetric.
  - $ d(i,j) = \frac{b+c}{a+b+c} $
    - ignores cases where both are 0 (d), and only considers mismatches relative to at least one positive case.
  - The Jaccard coefficient is used when 1 (presence) is more meaningful than 0 (absence).

#### Similarity Matrix

- After calculating all distances, we can create a similarity matrix
- containing the distance between each pair of data points.

![Similarity matrix](./similarity-matrix.png)

| ID | Gender | Age | Salary |
| --- | --- | --- | --- |
| 1 | M | 45 | 45000 |
| 2 | F | 32 | 54000 |
| 3 | F | 23 | 32000 |
| 4 | M | 36 | 58000 |

- Gender: binarized
- Age: normalized
- Salary: normalized

| ID | Gender | Age | Salary |
| --- | --- | --- | --- |
| 1 | 1 | 1 | 0.25 |
| 2 | 0 | 0.6 | 0.7 |
| 3 | 0 | 0 | 0 |
| 4 | 1 | 0.7 | 0.8 |

- $dist(ID2, ID3) = \sqrt{(0-0)^2 + (0.6-0)^2 + (0.7-0)^2} = 0.92$
- $dist(ID2, ID4) = \sqrt{(0-1)^2 + (0.6-0.7)^2 + (0.7-0.8)^2} = 1.02$
