---
title: Free up storage space on mac
date: 2026-02-27T11:15:10.626+08:00
description: free up storage space on a mac
authors: me
tags:
  - oss
---

## Issue

- Mac storage setting didn't show the actual storage usage, and it was always showing "Other" taking up a lot of space.
- It also didn't check cache files, which took up at least 10GiB of space.

## CLI

- [Mole](https://github.com/tw93/Mole)
- `mo clean`

## GUI

- [OmniDiskSweeper](https://www.omnigroup.com/more)
- Click "Macintosh HD" and "Sweep Macintosh HD Drive..."
- You can manually select the files to delete including cache files.
