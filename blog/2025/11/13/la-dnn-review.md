---
title: Location-Aware Deep Neural Network Review
date: 2025-11-13T23:51:35.479+11:00
description: Location-Aware Deep Neural Network Review
authors: me
tags:
  - drone
---

## Architecture

```mermaid
flowchart TB

%% =========================
%% Inputs
%% =========================
ExternalRFDataPoints[External RF Data Points]
InternalPoints[Internal Points]
BuildingFeatures[Building Features]

%% =========================
%% Step 1: Data Augmentation
%% =========================
subgraph Step1_DataAugmentation["Step 1 Data Augmentation"]
    ExternalRFDataPoints -->|find nearest neighbors via KNN| KNearest[Nearest External RF Points]
    KNearest -->|use wall counts| SyntheticSamples[Generate Synthetic Samples]
end

%% =========================
%% Step 2: Feature Engineering
%% =========================
subgraph Step2_FeatureEngineering["Step 2 Feature Engineering"]
    SyntheticSamples -->|add spatial info| SpatialCoords[Spatial Coordinates]
    ExternalRFDataPoints -->|extract RF metrics| RFMetrics[External RF Metrics]
    BuildingFeatures -->|material info| MaterialAttenuation[Material Attenuation Values]

    %% Loss calculations as arrow labels
    SpatialCoords -->|compute| FreeSpaceLoss[Free Space Loss]
    MaterialAttenuation -->|compute| BuildingLoss[Building Loss]
    RFMetrics -->|RSSI at drone location| DroneRSSI[Drone RSSI]

    %% Core RSSI = RSSI_drone - (FSPL + BuildingLoss)
    FreeSpaceLoss -->|combine| CoreRSSI[Core RSSI]
    BuildingLoss -->|combine| CoreRSSI
    DroneRSSI -->|combine| CoreRSSI

    %% Build Feature Vector
    FreeSpaceLoss --> FeatureVector[Feature Vector]
    BuildingLoss --> FeatureVector
    CoreRSSI --> FeatureVector
end

%% =========================
%% Step 3: Model Training
%% =========================
subgraph Step3_ModelTraining["Step 3 LA DNN Training"]
    FeatureVector -->|train| LADNNModel[LA DNN Layers 1024 512 256]
    LADNNModel --> TrainedModel[Trained LA DNN Model]
end

%% =========================
%% Step 4: Prediction & Visualization
%% =========================
subgraph Step4_PredAndVisualization["Step 4 Prediction and Visualization"]
    InternalPoints -->|internal point features| TrainedModel

    TrainedModel -->|predict RSSI and CQI for internal points| PredictedValues[Predicted RSSI CQI]

    PredictedValues -->|render| Heatmap3D[3D Heatmaps]
end

%% =========================
%% Final Output
%% =========================
Heatmap3D --> FinalOutput[Indoor RSSI CQI Predictions and 3D Visualizations]
```

## Wall Detection

![Wall Detection Process](./wall-detection.png)

1. Pre-process floor images to gray scale.
2. Apply Otsu's threshold and thinned method.
3. Enhance the contrast of wall lines using Canny edge detection.
4. Employ Hough Transform to detect and map wall lines.

## Ref

- Hason Rudd, D., Sanin, C., En, K. M., Gao, X., Islam, M. R., Hasan, M., Wang, X., Huo, A., & Xu, G. (2025). Location-Aware Deep Neural Network for Predicting Indoor 5G RSSI and CQI Using Drone-Based External RF Sensing. Procedia Computer Science, 270, 4765–4775. `https://doi.org/10.1016/j.procs.2025.09.602`
