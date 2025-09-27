---
title: Vocabulary for AI 009
date: 2025-09-27T14:31:42.774+10:00
description: Vocabulary for AI 009
authors: me
tags:
  - vocab
---

## Vocabulary & Expressions

| Term/Expression | Definition | Simpler Paraphrase | Meaning |
| --- | --- | --- | --- |
| canonical | conforming to a general rule or acceptable procedure | standard | 정통의, 표준의 |
| assert | state a fact or belief confidently and forcefully | declare | 단언하다, 주장하다 |

## Knowledge Base

- TELL, ASKS, TELL
  - TELLs the knowledge base what it preceives
  - ASKs the knowledge base what action it should perform
    - reasoning may be done about the current state of the world
    - about the outcomes of possible action sequences and so on
  - TELLs the knowledge base which action was chosen, and returns the action so that it can be executed
- `MAKE-PERCEPT-SENTENCE`
  - constructs a sentence asserting that the agent preceived the given percept at the given time.
- `MAKE-ACTION-QUERY`
  - constructs a sentence that asks what action should be done at the current time.
- `MAKE-ACTION-SENTENCE`
  - constructs a sentence asserting that the chosen action was executed.
