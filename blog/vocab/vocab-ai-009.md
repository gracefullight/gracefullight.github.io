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
| lurking | remaining hidden so as to wait in ambush | hidden | 숨어있는, 잠복하는 |
| bleak | (of an area of land) lacking vegetation and exposed to the elements | desolate | 황량한, 적막한 |
| albeit | although | though | 비록 ~일지라도 |
| stench | a strong and very unpleasant smell | foul smell | 악취 |
| woeful | characterized by, expressive of, or causing sorrow or misery | sorrowful | 슬픈, 비참한 |
| As for | with regard to; concerning | regarding | ~에 관하여 |
| ignorance | lack of knowledge or information | unawareness | 무지, 무식 |
| utterly | completely and without qualification; absolutely | completely | 완전히, 전적으로 |
| prudent | acting with or showing care and thought for the future | wise | 신중한, 현명한 |

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
