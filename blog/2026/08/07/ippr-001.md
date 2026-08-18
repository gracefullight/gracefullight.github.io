---
title: IPPR 001
date: 2026-08-07T23:52:34.365+10:00
description: Image Processing and Pattern Recognition 001
authors: me
tags:
  - ippr
---

## Image Processing Operations

### Point Operation

$$b[m, n] = f(a[m, n])$$

- It only depends on the value of the pixel itself, not on the values of its neighbors.
- e.g. `current pixel + 20`.
- to increase the brightness of an image, adjust contrast, or apply a threshold to create a binary image.

### Local Operation

$$b[m, n] = f(a[m - 1, n - 1], a[m - 1, n], a[m - 1, n + 1], a[m, n - 1], a[m, n], a[m, n + 1], a[m + 1, n - 1], a[m + 1, n], a[m + 1, n + 1])$$

- It depends on the values of the pixel and its neighbors.
- e.g. `current pixel + average of 8 neighbors`.
- to blur an image, sharpen an image, detect edges, or convolution with a kernel.
- The most common type of neighborhoods are:
  - 4-neighbors:
    - top, bottom, left, right.
  - 8-neighbors:
    - top, bottom, left, right, and the 4 diagonal neighbors.

### Global Operation

$$b[m, n] = f(a[0, 0], a[0, 1], ..., a[M - 1, N - 1])$$

- It depends on the values of all pixels in the image.
- e.g. `current pixel + average of all pixels in the image`.
- to compute the histogram equalization, apply a global threshold, or perform a Fourier transform.

## Image Histogram

- It is a graph showing how many pixels in an image have each possible intensity value.
  - Intensity value: the brightness of a pixel.
- e.g. 8-bit grayscale image has 256 possible intensity values (0-255).
  - The histogram will graphically display 256 numbers showing the distribution of pixels among those gray-scale values.

### Histogram Equalization

```text
0                     255
|------████████--------|
       80~140에 몰림

0                     255
|--██--██--██--██--██--|
```

- It spreads out the intensity values that are concentrated in a narrow range, increasing the contrast of the image.
- It is useful when the images have been acquired under poor lighting conditions or have low contrast (different circumstances).

## Noise

- Any undesired information that contaminatest the image.
- During the analog-to-digital conversion process, it is a side effect of the physical conversion of patterns of light energy into electrical patterns.
- The shape of distribution of noise types used to describe many of them and is related closely to the histogram.

### Gaussian Noise

```text
frequency
 ^
 |             █
 |          █████
 |       █████████
 |    █████████████
 +----------------------> noise gray level
        -20  0  +20
```

- The most common type of noise, with a bell-shaped distribution.
- Natural noise process such as electronic noise in the image acquisition system.

### Uniform Noise

```text
frequency
 ^
 |       ┌───────────────┐
 |       │               │
 |       │               │
 +-------┴───────────────┴------> noise intensity
         a               b
```

- A type of noise with a distribution that is constant across the range of intensity values.
- The gray-level values of noise are evenly distributed across a specific range.
- It can be used to generate any toehr type of noise distribution, often used to degrade images for the **evaluation of image restoration algorithms**.
  - it provides the most unbiased or neutral noise model.

### Salt-and-pepper noise

```text
frequency
 ^
 | █                       █
 | █                       █
 | █                       █
 +----------------------------> gray level
   0                         255
```

- A distribution that has two spikes at the minimum and maximum intensity values.
- The presence of single dark pixels in bright regions, or single bright pixels in dark regions.
  - Typically affects a small set of pixels.
- It is usually quantified by the percentage of pixels which are corrupted by noise.
- It is typically caused by errors in data transmission, faulty memory locations, or malfunctioning pixel elements in camera sensors.

### Signal-to-Noise Ratio

$$SNR = 10 \log_{10} \frac{P_{signal}}{P_{noise}}$$

- SNR
- The ratio between the power of the signal and that of the noise.
- In a perfect image, the ratio of signal to noise is infinite.

### Noise Elimination

- Restore the true value of the pixels as much as possibole.
- It may undesirably reduce image information.
- Averaging the pixel with its neighbours will smooth the noise
  or other types of image filters can be applied to reduce noise.

## Filters

- Linear filters: low pass, high pass
- Non-linear filters: median
- Filters are used to improve an image
  - if the image is destined for human viewing, to make it more pleasant to look it or more readable.
  - if the image is the input to a pattern recognition process, to facilitate the following steps of automated image analysis.

### Convolution

$$I(r, c) \otimes F = \sum_{i=1}^{2M + 1} \sum_{j=1}^{2M+1} I(r+i-(M+1), c + j-(M+1)) F(i, j)$$

- Multiply the pixels of a neighborhood of $(r, c)$ by the corresponding coefficients of the filter $F$, and add them all together.

### Low Pass Filter

- Smoothing or softening, employes to remove high spatial frequency noise from a disital image.
- It replace each pixwel with a weighted sum of each pixel's neighbors.
- It is used to remove noise, might have the side-effect of generally smoothing or blurring images and reducing edge information.
- **Local averaging**: take the local average of the pixels in a neighborhood and replace the center pixel with that value.

### Gaussian Filter

$$H_{ij} = \frac{1}{2\pi\sigma^2} e^{-\frac{i^2 + j^2}{2\sigma^2}}$$

- yields a $2k+1 \times 2k+1$ kernel, where $k$ is the size of the filter and $\sigma$ is the standard deviation of the Gaussian distribution.
- A smoothing filter that computes a weighted average of neighboring pixels, giving larger weights to pixels closer to the center.

```text
1   4   7   4   1
4  16  26  16   4
7  26  41  26   7
4  16  26  16   4
1   4   7   4   1
```

- Smaller $\sigma$ values result in a more localized filter, which means weak smoothing and less blurring of the image.
- Larger $\sigma$ values result in a more spread-out filter, which means stronger smoothing and more blurring of the image.

### Median Filter

- A non-linear filter that replaces a pixel with the median of its neighbors.
- It is effective at removing salt-and-pepper noise and other isolated noise compared to low-pass linear filters.
- Less blurred, edges remain sharp, removes single pixel erros completely, but slower requires sorting the pixels in the neighborhood.

```bash
10  11  10
12 255  11
10  12  11

# 255 is salt-and-pepper noise, the median of the 9 pixels is 11, so the center pixel is replaced with 11.
10, 10, 11, 11, 11, 12, 12, 255

# to-be
10, 10, 11, 11, 11, 12, 12, 11
```

### High Pass Filter

- It extracts high-frequency components, such as edges and fine details, by subtracting a low-pass filtered image from the original image.
- Sometimes, it is desired to enhance the high frequencies without removing the low frequencies.

```text
Sharpened Image = Original Image + High-frequency component
  = Origial Image + (Original Image - Low-pass filtered Image)
```

## Conclusion

- Low-pass filter  → smooth / blur
- High-pass filter → edge / detail
- High-pass + original → sharpening
