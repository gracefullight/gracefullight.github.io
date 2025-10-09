---
title: IAI +010
date: 2025-10-09T14:19:13.025+11:00
description: Introduction to AI +010
authors: me
tags:
  - iai
---

## Generative AI

- Gen AI refers to a category of AI models designed to generte new content, synt99hetic data that resembles a given dataset.
- Gen AI models create new content, including text, images, audio, and video.

```mermaid
graph TB
  subgraph AI[Artificial Intelligence]
    subgraph ML[Machine Learning]
      subgraph DL[Deep Learning]
        GenAI[Generative AI]

        GenAI -> GAN
        GenAI -> VAE
        GenAI -> AutoregressiveModels
        GenAI -> DiffusionModels
      end
    end
  end
```

### Historcal context of Gen AI

- 1980s: The development of statistical approaches to AI emerged, focusing on probabilistic models
- 1990s: Hidden Markov Models (HMMs) became popular in speech recognition and sequence generation tasks, making a shift towards using statistical methods in generative processes.
- 1990s-2000s: The resurgence of Neural Networks, with the introduction of deep learning techniques. However, hardware and data limitations hampered progress.
- 2010s: The advent of deep learning algorithms, especially convolutional neural networks (CNNs) and recurrent neural networks (RNNs), transformed the landscape of AI.
- 2013: VAEs were introduced, providing a probabilistic approach to data generation, allowing for smooth latent space interpolation and structure.
- 2014: GANs, a novel framework where two neural networks (a generator and a discriminator) are trained simultaneously, allowing for the generation of highly realistic images and other data types.
- 2015-2020: Generative models began to find applications beyond image synthesis, including text generation, music composition, and even video generation. OpenAI's GPT-2 showcased the potential of transformer-based models for generating coherent text.
- 2020s: The introduction of larger and more capable models like OpenAI's GPT-3 and subsequent iterations revolutionized natural language processing.
  - DALL-E and Stable Diffusion pushed the boundaries of image generation, allowing users to create images from textual descriptions. This sparked creative exploration and practical applications in marketing, art, and design.
- Present: The integration of multiple data modalities (text, image, audio) led to the development of models like CLIP and GPT-4, which can understand and generate content across different formats, enhancing the versatility of generative AI.
