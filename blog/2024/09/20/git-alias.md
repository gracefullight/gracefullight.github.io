---
title: Git Alias
date: 2024-09-20T12:25:46.581+07:00
description: My Git Alias
authors: me
tags:
  - me
---

## Code

```bash
[alias]
  branch-name = "!git rev-parse --abbrev-ref HEAD"
  n = checkout -b
  c = checkout
  s = status
  p = "!git push -u origin $(git branch-name)"
  undo = reset HEAD~1
```

## Description

I share some useful Git aliases to streamline and simplify daily Git operations. These aliases are shortcuts for common Git commands, making them quicker and easier to execute. The following are the specific commands and their aliases:

- `branch-name`: Retrieves the current branch name using `git rev-parse --abbrev-ref HEAD`. This alias is particularly useful for the `p` command, as it automatically includes the current branch name when pushing to the remote repository.
- `n`: A shortcut to create a new branch with `checkout -b`.
- `c`: A simplified alias for `checkout`, used to switch between branches.
- `s`: Short for `status`, displays the current working directory status.
- `p`: Pushes the current branch to the remote repository using `git push -u origin` and automatically includes the branch name.
- `undo`: A quick command to undo the last commit by resetting the HEAD pointer to the previous commit.

These aliases are designed to improve productivity and reduce the time spent typing lengthy commands, especially when working with Git frequently.
