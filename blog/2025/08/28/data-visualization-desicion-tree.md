---
title: 데이터 시각화 의사 결정 트리
date: 2025-08-28T20:48:43.168+10:00
description: 데이터 시각화 의사 결정 트리
authors: me
tags:
  - data
---

## Color Legend

| Icon | Category | Description | Example |
|---|---|---|---|
| 🟡 | Distribution | 분포를 보여주고 싶을 때 | Histogram, Density plot |
| ⚫ | Correlation | 상관관계를 보여주고 싶을 때 | Scatterplot, Correlogram |
| 🟢 | Ranking | 순위를 보여주고 싶을 때 | Bar chart, Lollipop chart |
| 🔴 | Part of a whole | 전체 중 일부를 보여주고 싶을 때 | Pie chart, Treemap |
| 🔵 | Evolution | 시간에 따른 변화를 보여주고 싶을 때 | Line chart, Area chart |
| 🟣 | Maps | 지도를 활용해서 공간적 정보를 보여줄 때 | Choropleth map, Bubble Map |
| 🟤 | Flow | 흐름(흐름도, 이동 경로 등)을 보여줄 때 | Flow map, Sankey-like |

## Categoric

- One Variable
  - ⚫ Waffle
  - 🟢 Bar Plot
  - 🟢 Lollipop
  - 🟢 Word Cloud
  - 🔴 Circular Packing
  - 🔴 Doughnut
  - 🔴 Pie
  - 🔴 Treemap
- Two or More Variables
  - Two Independent Lists
    - 🔴 Venn Diagram
  - Nested
    - 🟢 Bar Plot
    - 🔴 Circular Packing
    - 🔴 Dendrogram
    - 🔴 Sunburst
    - 🔴 Treemap
  - Subgroup
    - ⚫ Grouped Scatter
    - ⚫ Heatmap
    - 🟢 Lollipop
    - 🟢 Parallel Plot
    - Spider
    - 🔴 Grouped Bar Plot
    - 🔴 Grouped Bar Plot
    - 🟤 Sankey Diagram
  - Adjacency
    - 🟤 Arc
    - 🟤 Chord
    - 🟤 Network
    - 🟤 Sankey
    - ⚫ Heatmap
  
## Relational

- Network
  - ⚫ Heatmap
  - 🟢 Hive
  - 🟤 Arc
  - 🟤 Chord
  - 🟤 Network
  - 🟤 Sankey
- Nested
  - No Value
    - 🔴 Circular Packing
    - 🔴 Dendrogram
    - 🔴 Sunburst
    - 🔴 Treemap
    - 🟤 Sankey
  - Value for Leaf
    - 🔴 Circular Packing
    - 🔴 Dendrogram
    - 🔴 Sunburst
    - 🔴 Treemap
    - 🟤 Sankey
  - Value for Edges
    - 🔴 Dendrogram
    - 🟤 Chord
    - 🟤 Sankey
  - Value for Connection
    - Edge Bundling

## Map

- 🟣 Bubble Map
- 🟣 Choropleth
- 🟣 Connected Map
- 🟣 Map
- 🟣 Map Hexbin

## Time Series

- One Series
  - 🟡 Box Plot
  - 🟡 Violin
  - 🟡 Ridge Line
  - 🔵 Area
  - 🔵 Line Plot
  - 🟢 Bar Plot
  - 🟢 Lollipop
- Several Series
  - 🟡 Box Plot
  - 🟡 Violin
  - 🟡 Ridge Line
  - ⚫ Heatmap
  - 🔵 Line Plot
  - 🔵 Stacked Area
  - 🔵 Stream Graph

## Categoric and Numeric

- One Numeric + One Categoric
  - One Observation, per Group
    - ⚫ Waffle
    - 🟢 Bar Plot
    - 🟢 Lollipop
    - 🟢 Word Cloud
    - 🔴 Circular Packing
    - 🔴 Doughnut
    - 🔴 Pie
    - 🔴 Treemap
  - Several Observations, per Group
    - 🟡 Box Plot
    - 🟡 Violin
    - 🟡 Ridge Line
    - 🟡 Density
    - 🟡 Histogram
- One Category, Several Numeric
  - No Order
    - 🟡 Box Plot
    - 🟡 Violin
    - ⚫ Grouped Scatter
    - ⚫ 2D Density
    - ⚫ PCA
    - ⚫ Correlogram
  - A Numeric is Ordered
    - ⚫ Connected Scatter
    - 🔵 Area
    - 🔵 Line Plot
    - 🔵 Stacked Area
    - 🔵 Stream Graph
  - One Value Per Group
    - ⚫ Grouped Scatter
    - ⚫ Heatmap
    - 🟢 Lollipop
    - 🟢 Parallel Plot
    - 🟢 Spider Plot
    - 🔴 Grouped Bar Plot
    - 🔴 Grouped Bar Plot
    - 🟤 Sankey Diagram
- Several Categories, One Numeric
  - Subgroup
    - One Observation. per Group
      - ⚫ Grouped Scatter
      - ⚫ Heatmap
      - 🟢 Lollipop
      - 🟢 Parallel Plot
      - 🟢 Spider Plot
      - 🔴 Grouped Bar Plot
      - 🔴 Grouped Bar Plot
      - 🟤 Sankey Diagram
    - Several Observations, per Group
      - 🟡 Box Plot
      - 🟡 Violin
  - Nested
    - One Observation. per Group
      - 🟢 Bar Plot
      - 🔴 Circular Packing
      - 🔴 Dendrogram
      - 🔴 Sunburst
      - 🔴 Treemap
    - Several Observations. per Group
      - 🟡 Box Plot
      - 🟡 Violin
  - Adjacency
    - ⚫ Heatmap
    - 🟤 Arc
    - 🟤 Chord
    - 🟤 Network
    - 🟤 Sankey

## Numeric

- One Numeric Variable
  - 🟡 Density
  - 🟡 Histogram
- Two Numeric Variables
  - Not Ordered
    - Few Points
      - 🟡 Box Plot
      - 🟡 Histogram
      - ⚫ Scatter Plot
    - Many Points
      - 🟡 Density
      - 🟡 Violin
      - ⚫ 2D Density
      - 🔵 Marginal Distribution
  - Ordered
    - ⚫ Connected Scatter
    - 🔵 Area Plot
    - 🔵 Line Plot
- Three Numeric Variables
  - Not Ordered
    - 🟡 Box Plot
    - 🟡 Violin
    - ⚫ Bubble Plot
    - ⚫ 3d Scatter or Surface
  - Ordered
    - 🔵 Area
    - 🔵 Line Plot
    - 🔵 Stacked Area
    - 🔵 Stream Graph
- Several Numeric Variables
  - Ordered
    - 🔵 Area
    - 🔵 Line Plot
    - 🔵 Stacked Area
    - 🔵 Stream Graph
  - Not Ordered
    - 🟡 Box Plot
    - 🟡 Ridge Line
    - 🟡 Violin
    - ⚫ Correlogram
    - ⚫ Heatmap
    - ⚫ PCA
    - 🔴 Dendrogram

## Ref

- [from Data to Viz](https://www.data-to-viz.com/)
