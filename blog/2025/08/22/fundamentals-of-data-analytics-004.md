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
- **Redundant attributes**: An attribute (feature or column of a dataset) is called redundant if it can be derived from any other attribute or set of attributes.
  - In the process of data integration in data mining, the use of multiple data stores may lead to the problem of redundancy in data.
  - Dimension naming or inconsistencies in an attribute can also lead to redundancies in the dataset.

#### Pearson correlation coefficient

- Correlation analysis can be used to detect redundancies in **Numerical data**
- It can measure how strongly one attribute implies the other on the basis of the available data.
- `> 0.5`: a strong **positive** correlation, A⬆️ B⬆️
- `< -0.5`: a strong **negative** correlation, A⬆️ B⬇️
- `0`: no correlation. A and B are independent.
- **correlation != causation**

$$r_{A,B} = \frac{n\sum{}xy - (\sum{}x)(\sum{}y)} {\sqrt{(n\sum_{} x^2 - (\sum_{} x)^2) \, (n\sum_{} y^2 - (\sum_{} y)^2)}}$$

$$r_{A,B} = \frac{\sum_{} (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{} (x_i - \bar{x})^2} \, \sqrt{\sum_{} (y_i - \bar{y})^2}}$$

- step-by-step derivation
  - 분산: $Var(X) = \frac{1}{n} \sum_{} (x_i - \bar{x})^2$
  - 공분산: $Cov(X,Y) = \frac{1}{n} \sum_{} (x_i - \bar{x})(y_i - \bar{y})$
  - 상관계수 (정규화): $\rho = \frac{\mathrm{Cov}(X,Y)}{\sigma_X \sigma_Y}$
  - 평균: $\bar{x} = \frac{1}{n} \sum_{}x_i \quad \bar{y} = \frac{1}{n} \sum_{} y_i$
  - 분자 전개
    - $\sum_{} (x_i - \bar{x})(y_i - \bar{y})$
    - $\sum_{} (x_i y_i - x_i \bar{y} - y_i \bar{x} + \bar{x}\bar{y})$
    - $\sum_{} (x_i y_i ) - \bar{y}\sum_{} x_i - \bar{x}\sum_{} y_i + n\bar{x}\bar{y}$
    - 평균 대입
      - $\sum_{}x_iy_i - \frac{1}{n}(\sum_{}y_i)(\sum{}x_i) - \frac{1}{n}(\sum{}x_1)(\sum{}y_1) + \frac{1}{n}(\sum{}x_1)(\sum{}y_1)$
      - $\sum{}x_iy_i - \frac{1}{n}(\sum{}x_i)(\sum{}y_i)$
  - 분모 전개
    - $\sqrt{\sum_{} (x_i - \bar{x})^2} \, \sqrt{\sum_{} (y_i - \bar{y})^2}$
    - $\sqrt{\sum_{} x_i^2 - 2\bar{x}\sum_{} x_i + n\bar{x}^2} \, \sqrt{\sum_{} y_i^2 - 2\bar{y}\sum_{} y_i + n\bar{y}^2}$
    - 평균 대입
      - $\sqrt{\sum_{} x_i^2 - \frac{2}{n}(\sum_{} x_i)(\sum_{} x_i) + \frac{1}{n}(\sum{}x_i)^2} \, \sqrt{\sum_{} y_i^2 - \frac{2}{n}(\sum_{} y_i) + \frac{1}{n}(\sum{}y_i)^2}$
      - $\sqrt{\sum_{} x_i^2 - \frac{1}{n}(\sum_{} x_i)^2} \, \sqrt{\sum_{} y_i^2 - \frac{1}{n}(\sum_{} y_i)^2}$
  - 재정의
    $$r_{A,B} = \frac{\sum{}x_iy_i - \frac{1}{n}(\sum{}x_i)(\sum{}y_i)} {\sqrt{(\sum_{} x_i^2 - \frac{1}{n}(\sum_{} x_i)^2) \, (\sum_{} y_i^2 - \frac{1}{n}(\sum_{} y_i)^2)}}$$
  - 분자/분모에 n 곱하고 인덱스 생략
    $$r_{A,B} = \frac{n\sum{}xy - (\sum{}x)(\sum{}y)} {\sqrt{(n\sum_{} x^2 - (\sum_{} x)^2) \, (n\sum_{} y^2 - (\sum_{} y)^2)}}$$

### Data Transformation

> The data is consolidated or transformed so that the patterns found are easier to understand, and the consequent mining process is more efficient.

- **Smoothing**: smoothing is used to remove noise from the data to improve clarity around the important features in the dataset
- **Normalization**: the method of scaling your data, into a regularized range, so that you can compare and represent it more accurately
- **Discretization** & Concept hierarchy generation
  - Discretisation is the process of putting values into buckets so that there are a limited number of possible states.
  - Discretisation transforms a continuous attribute into **a categorical attribute**, usually happens after the data is cleaned.
  - This process includes replacing lower-level data (primitive) with higher-level concepts through the use of concept hierarchies.
  - Street may be replaced with city, country or region.
  - Age may be replaced with senior, adult, younger and youth.
- **Binarization**: transforming data into binary numbers (e.g. 0, 1).
  - This helps make classifier algorithms more efficient.

#### Data Nomalization

- the data should be standardised or normalised in order to avoid dependency on the selection of measurement units.
- This constitutes transforming data to lie within a common or smaller range, like `[0.0, 1.0]` or `[−1, 1]`.
- **Min-max normalization**

  - Min-max normalisation maps a value of $K$, indicated by $v_n$, to a new value $v'_n$ within the range $[new\_min_K, new\_max_K]$
    - $$v'_n = \frac{(v_n - min_K)}{(max_K - min_K)} \cdot (new\_max_K - new\_min_K) + new\_min_K$$
    - **calculates the relative position within the original range and reflects it in the new range accordingly.**
  - preserves the relationships between the original data values.
  - It will encounter an **out-of-bounds error** if a future input case for normalisation falls outside of the original data range for K.
- **Z-Score normalization**
  - normalises attribute values using the average (i.e., mean) and standard deviation of $K$.
    - $$v'_n = \frac{(v_n - \mu_K)}{\sigma_K}$$
    - It converts the **distance of a data point from the mean** into a unitless measure.
  - is **useful when there are outliers** that dominate the min-max normalisation
  - is **useful when the actual minimum and maximum of attribute $K$ are unknown.**
- **Decimal scaling normalization**
  - The number of decimal points moved is based on the maximum absolute value of $K$.
    - $$v'_n = \frac{v_n}{10^j}$$
    - where $j$ is the smallest integer such that $max(|v'_n|) < 1$.
    - **divides all values by the power of 10 just larger than the maximum absolute value,** bringing them into the range $(-1, 1)$.
- **Softmax normalization**
  - a nonlinear transformation that yields an 's'-shaped curve that approaches 0 and 1 asymptotically.
  - **New values will be mapped between 0 and 1** even if they are beyond the range of your existing data.
  - $$\alpha = \frac{\nu - \mu}{\lambda \, (\sigma / 2\pi)}, \qquad \nu' = \frac{1}{1 + e^{-\alpha}}$$
    - Center the data around the mean :: use $(\nu - \mu)$
    - Remove units by scaling with the standard deviation :: divide by $\sigma$.
    - Control how steep or flat the curve is :: adjust with $\lambda$.
    - Add $(2\pi)$ as a conventional constant to better match the logistic curve with statistical distributions.
    - the formula naturally arises by **centering at the mean, standardizing by the spread, letting the user control the slope, and refining with a scaling constant.**
- **Sigmoid normalization**
  - a nonlinear transformation similar to softmax. **It ranges between −1 and 1** (asymptotically), and has a fixed linear portion within $±mu$.
    - $$ \alpha = \frac{\nu - \mu}{\lambda \, (\sigma / 2\pi)}, \qquad \nu' = \frac{1 - e^{-\alpha}}{1 + e^{-\alpha}}$$
    - Center the data around the mean :: use $(\nu - \mu)$
    - Remove units by scaling with the standard deviation :: divide by $\sigma$.
    - Control how steep or flat the curve is :: adjust with $\lambda$.
    - Add $(2\pi)$ as a conventional constant to refine scaling with respect to statistical distributions.
    Apply the hyperbolic tangent :: map the result smoothly into the range $[-1, 1]$.
    - the formula naturally arises by centering at the mean, standardizing by spread, letting the user control the slope, and using tanh to compress all values into $[-1, 1]$.

#### Discretization & Concept hierarchy generation

- Data discretisation is a form of numerosity reduction that **transforms a continuous attribute into a categorical attribute.**
- Higher concept labels or a smaller number of intervals (i.e. binning) are used to replace the raw data in order to simplify the original data and increase the efficiency of mining.
- Discretisation is very beneficial for generating concept hierarchies automatically, which allow data mining at multiple levels of data abstraction.
- **One or more concept hierarchy can be defined** for the single attribute for accommodating the requirements of various users.

| Salary | Age | ➡️ | Salary | Age |
| --- | --- | --- | --- | --- |
| 2000 | 20 | - | `[2000, 2900)` | `[20, 25)` |
| 2800 | 25 | - | `[2000, 2900)` | `[25, 30)` |
| 3500 | 23 | - | `[2900, 3800)` | `[20, 25)` |
| 2400 | 26 | - | `[2000, 2900)` | `[25, 30)` |
| 5600 | 32 | - | `[5600, 6500)` | `[30, 35)` |
| 4200 | 36 | - | `[3800, 4700)` | `[35, 40]` |
| 5000 | 39 | - | `[4700, 5600)` | `[35, 40]` |
| 5000 | 40 | - | `[4700, 5600)` | `[35, 40]` |
| 3400 | 35 | - | `[2900, 3800)` | `[35, 40]` |
| 3600 | 34 | - | `[2900, 3800)` | `[30, 35)` |

- If dependent and independent variables have only a few values, a wide range of classification algorithms can be used.

```mermaid
graph TD
    A[All]
    A --> B[Canada]
    A --> C[USA]

    B --> B1[British Columbia]
    B --> B2[Ontario]

    B1 --> B11[Vancouver]
    B1 --> B12[Victoria]

    B2 --> B21[Toronto]
    B2 --> B22[Ottawa]

    C --> C1[New York]
    C --> C2[Illinois]

    C1 --> C11[New York]
    C1 --> C12[Buffalo]

    C2 --> C21[Chicago]
    C2 --> C22[Urbano]
```

### Data Reduction
