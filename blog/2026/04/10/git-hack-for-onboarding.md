---
title: Git Tricks for Onboarding to a New Codebase
date: 2026-04-10T21:59:30.733+10:00
description: Use Git history to understand code ownership, bug hotspots, project momentum, and operational risk before opening a single file.
authors: me
tags:
  - git
---

## High-Churn Files

`git log --format=format: --name-only --since="1 year ago" | sort | uniq -c | sort -nr | head -20`

- Shows the most frequently changed files in the last year.
- These files often represent areas of the codebase with the highest maintenance burden.
- The top files can be cross-analyzed with bug hotspots to identify the highest-risk parts of the system.

## Code Ownership and Bus Factor

`git shortlog -sn --no-merges`

- Shows the number of commits by each author, excluding merge commits.
- If one person accounts for more than 60% of commits, the project may have a bus factor risk.
- If a top contributor has not been active in the last 6 months, it may indicate a maintenance gap.
- With only 3 out of 30 contributors active over the past year, this suggests a knowledge discontinuity caused by developer turnover.
- However, if the team uses squash merges, the commit history may be misleading for this analysis.

## Bug Hotspots

`git log -i -E --grep="fix|bug|broken" --name-only --format='' | sort | uniq -c | sort -nr | head -20`

- Shows the top 20 files with the most bug-related commits.
- By comparing this list with the high-churn files, we can identify code that is both frequently changed and bug-prone.
- While the accuracy depends on the quality of commit messages, even an approximate bug hotspot map can still be useful.

## Development Velocity: Acceleration or Stagnation

`git log --format='%ad' --date=format:'%Y-%m' | sort | uniq -c`

- Monthly commit counts provide a visual view of project activity over time.
- A consistent or increasing commit frequency suggests healthy development.
- A sudden drop, such as a 50% decrease in commits within a month, may signal the departure of key contributors or a shift in project focus.
- A sustained decline over 6-12 months suggests a loss of team momentum, while periodic spikes followed by stagnation may indicate a batch-style release pattern.
- In one real-world case, a CTO recognized from a commit velocity chart that a specific point in time aligned with the departure of a senior engineer.
- This data reflects not just code activity, but team dynamics.

## Reverts, Hotfixes, and Firefighting Signals

`git log --oneline --since="1 year ago" | grep -iE 'revert|hotfix|emergency|rollback'`

- Measures the frequency of urgent fixes and recovery actions.
- A few incidents per year are normal, but incidents every two weeks may signal a lack of trust in the deployment process.
- This often indicates deeper issues such as unstable tests, the absence of a staging environment, or complex rollback procedures.
- A result of zero may indicate either a stable codebase or poorly labeled commit messages.
- Crisis patterns tend to be clearly visible, and their mere presence is often enough to assess operational reliability.
