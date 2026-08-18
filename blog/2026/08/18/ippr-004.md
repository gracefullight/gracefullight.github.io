---
title: IPPR 004
date: 2026-08-18T23:16:05.459+10:00
description: Image Processing and Pattern Recognition 004
authors: me
tags:
  - ippr
---

## Point Cloud

- The simplest form of a 3D model, a collection of individual points plotted in 3D space.
- **Photogrammetry**: science of making measurements from photographs
  - it uses photos of an object taking a different locations
- `Vertices -> Edges -> Faces -> Polygons -> Surfaces`
- PCL: Point Cloud Library

## NeRFs

- Neural Radiance Fields
- [NeRF Studio](https://docs.nerf.studio/)

## Gaussian Splatting

- Instead of building objects using polygons, it represents everything using millions of tiny soft 3D shapes called **Gaussians**.
- Less computational costs, more efficient.
- Run in parallel using GPU rasterization.

1. First, it builds a rough point cloud from images
2. Then, replaces those points with these Gaussian blobs
3. It will optimize them until it match original photos as closely as possible.
