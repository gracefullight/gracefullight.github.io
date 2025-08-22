---
title: Fundamentals of data analytics @004
date: 2025-08-22T17:30:22.877+10:00
description: Fundamentals of data analytics @004
authors: me
tags:
  - fda
---

## Data Preparation

- In real world applications, data can be inconsistent, incomplete, and noisy.
- Data Collection problems: when data is collected incorrectly
- Incomplete Data: when information is missing
- Data entry problems: when data is entered incorrectly
- Contradictions in data: when the data says something in one place, and then says a different thing elsewhere in the dataset. We can think of this data as noisy.
- Discrepancy in naming conventions: when data descriptions are unclear, people may misinterpret their meaning.
- Duplicated records: when integrating data from different sources, the same data may get entered multiple times.
- Data transmission problems: when data is sent between different people or databases or companies, things can get lost in the process.

### Data mining tasks

- Classification
- Estimation
- Prediction
- Characterisation
- Discrimination
- Affinity grouping
- Clustering
- Time series analysis

## Data Cleaning

- Missing data
  - **Ignore the record**
  - **Fill the missing value manually**
  - **Fill missing values with calculated values**
    - The missing values can be filled using the average value for a particular attribute
    - or by using attribute mean for all samples belonging to the same class as the given record.
    - also be filled using methods such as Bayesian classification or decision trees to automatically infer the values.
- Noisy data: a meaningless variation that cannot be interpreted properly by machines
  - **Binning**
    - binning methods use the neighbour's data, this is referred to as local smoothing
    - can replace all data in a segment by its mean or boundary values
  - **Clustering**
    - grouping of data points according to a distance measure
    - use a clustering algorithm to classify each data point into a specific group
    - can detect outliers
  - **Regression**
    - a data mining function that deals with the prediction of a continuous value rather than a class
    - maps data values to a function
    - Using regression to fit data by finding a mathematical equation may be used to smooth noisy data.

### Binning

```mermaid
graph TB
  subgraph Data
    Bin1["Bin1: 4, 8, 15"]
    Bin2["Bin2: 21, 21, 24"]
    Bin3["Bin3: 25, 28, 34"]
  end

  subgraph Means["Means, 평균처리"]
    Bin1_1["Bin1: 9, 9, 9"]
    Bin1_2["Bin2: 22, 22, 22"]
    Bin1_3["Bin3: 29, 29, 29"]
  end

  subgraph Boundaries["Boundaries, 경계처리"]
    Bin1_Boundary["Bin1: 4, 4, 15"]
    Bin2_Boundary["Bin2: 21, 21, 24"]
    Bin3_Boundary["Bin3: 25, 25, 34"]
  end

  Data --> Means
  Data --> Boundaries
```

| Price | Equi-width | Equi-depth |
| --- | --- | --- |
| 7 | `[0, 10]` | `[7, 20]`|
| 20 | `[11, 20]` | `[7, 20]`|
| 22 | `[21, 30]` | `[22, 50]`|
| 50 | `[41, 50]`| `[22, 50]`|
| 51 | `[51, 60]`| `[51, 53]`|
| 53 | `[51, 60]` | `[51, 53]`|

- **Equi-width**: Bins have equal width.
- **Equi-depth**: Bins have the same number of values in them or almost the same number if they don't divide equally.

#### Equi-width binning

> Equal-interval binning, split the whole range of numbers into intervals with equal size.

- Price: **4, 8, 9, 15, 21, 21, 22, 26, 27, 28, 29, 36**
- Equal-width binning
  - Bin1 **[4, 12]**: 4, 8, 9
  - Bin2 **(12, 20]**: 15
  - Bin3 **(20, 28]**: 21, 21, 22, 26, 27, 28
  - Bin4 **(28, 36]**: 29, 36
- Smoothing by bin means
  - Bin1: 7, 7, 7
  - Bin2: 15
  - Bin3: 24, 24, 24, 24, 24, 24
  - Bin4: 33, 33
- Smoothing by bin boundaries
  - Bin1: 4, **9, 9**
  - Bin2: 15
  - Bin3: **21, 21, 21**, **28, 28, 28**
  - Bin4: 29, 36

#### Equi-depth binning

> Equal-frequency binning, use intervals containing an equal number of values.

- Price: **4, 8, 9, 15, 21, 21, 22, 26, 27, 28, 29, 36**
- Equal-depth binnning
  - Bin1: 4, 8, 9
  - Bin2: 15, 21, 21
  - Bin3: 22, 26, 27
  - Bin4: 28, 29, 36
- Smoothing by bin means: each value in a bin is replaced by the mean value of the bin.
  - Bin1: 7, 7, 7
  - Bin2: 19, 19, 19
  - Bin3: 25, 25, 25
  - Bin4: 31, 31, 31
- Smoothing by bin boundaries: each bin value is replace by the closest boundary value.
  - Bin1: 4, **9, 9**
  - Bin2: 15, **21, 21**
  - Bin3: 22, **27, 27**
  - Bin4: **28, 28**, 36

### Data Integration

> provides unified data by combining data from various heterogeneous data sources into a coherent data store

- The sources can include flat files, databases or multiple data cubes.
- Careful integration may help to avoid and reduce inconsistencies and redundancies in the final dataset.
- Building an enterprise's **data warehouse** is considered one of the most popular data integration implementations.

### Data Transformation

### Data Reduction
